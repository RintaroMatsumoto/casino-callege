import { useState, useCallback, useEffect } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'

const SHOE_Y = 8
const CARD_BACK = 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 5px, #334155 5px, #334155 10px)'

let injected = false
function useStyles() {
  useEffect(() => {
    if (injected) return; injected = true
    const s = document.createElement('style')
    s.textContent = `@keyframes cfIn { 0% { transform: scale(0.7) translateY(-20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
@keyframes chipB { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`
    document.head.appendChild(s)
  }, [])
}

type DealCard = { id: number; card: Card; x: number; y: number; faceUp: boolean }

export default function BlackjackGame() {
  useStyles()
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'play' | 'result'>('bet')
  const [deck, setDeck] = useState<Card[]>([])
  const [player, setPlayer] = useState<Card[]>([])
  const [dealer, setDealer] = useState<Card[]>([])
  const [cards, setCards] = useState<DealCard[]>([])
  const [result, setResult] = useState<{ label: string; net: number; pScore: number; dScore: number } | null>(null)
  const [message, setMessage] = useState('ベットしてディール')

  const dealSeq = useCallback((p1: Card, p2: Card, d1: Card, d2: Card) => {
    const dealt: DealCard[] = [
      { id: 0, card: d1, x: 40, y: 10, faceUp: true },
      { id: 1, card: p1, x: 40, y: 130, faceUp: true },
      { id: 2, card: d2, x: 90, y: 10, faceUp: false },
      { id: 3, card: p2, x: 90, y: 130, faceUp: true },
    ]
    dealt.forEach((c, i) => setTimeout(() => setCards(prev => [...prev, c]), 200 + i * 350))
    return 200 + dealt.length * 350 + 200
  }, [])

  const deal = () => {
    if (bet > balance || bet <= 0) return
    setBalance(b => b - bet)
    setResult(null); setCards([]); setPlayer([]); setDealer([])
    const d = shuffleDeck(createDeck())
    const p1 = d[0], p2 = d[2], d1 = d[1], d2 = d[3]
    setPlayer([p1, p2]); setDealer([d1, { ...d2, hidden: true }]); setDeck(d.slice(4))
    setPhase('play')
    setMessage('配っています...')
    const t = dealSeq(p1, p2, d1, d2)
    setTimeout(() => {
      const pv = handValue([p1, p2]), dv = handValue([d1, { ...d2, hidden: false }])
      const pS = pv.soft <= 21 ? pv.soft : pv.hard, dS = dv.soft <= 21 ? dv.soft : dv.hard
      if (pS === 21 && dS === 21) { setBalance(b => b + bet); setResult({ label: '両者BJ！ プッシュ', net: 0, pScore: pS, dScore: dS }); setMessage('プッシュ'); setPhase('result') }
      else if (pS === 21) { setBalance(b => b + Math.floor(bet * 2.5)); setResult({ label: 'BJ！ 3:2', net: Math.floor(bet * 1.5), pScore: pS, dScore: dS }); setMessage('BJ！'); setPhase('result') }
      else if (dS === 21) { setResult({ label: 'ディーラーBJ', net: -bet, pScore: pS, dScore: dS }); setMessage('ディーラーBJ'); setPhase('result') }
      else { setMessage('ヒット or スタンド') }
    }, t)
  }

  const hit = () => {
    if (phase !== 'play' || !deck.length) return
    const card = deck[0]; setDeck(d => d.slice(1))
    const np = [...player, card]; setPlayer(np)
    const idx = np.length - 1
    setCards(prev => [...prev, { id: prev.length, card, x: 40 + idx * 48, y: 130, faceUp: true }])
    const v = handValue(np), score = v.soft <= 21 ? v.soft : v.hard
    if (score > 21) {
      setTimeout(() => {
        setDealer(dealer.map(c => ({ ...c, hidden: false })))
        const dv = handValue(dealer.map(c => ({ ...c, hidden: false })))
        setResult({ label: 'バースト', net: -bet, pScore: score, dScore: dv.soft <= 21 ? dv.soft : dv.hard })
        setMessage('バースト！'); setPhase('result')
      }, 500)
    }
  }

  const stand = () => {
    if (phase !== 'play') return
    setPhase('play')
    setDealer(dealer.map(c => ({ ...c, hidden: false })))
    setTimeout(() => {
      let d = [...deck], h: Card[] = dealer.map(c => ({ ...c, hidden: false }))
      while (true) {
        const v = handValue(h); if ((v.soft <= 21 ? v.soft : v.hard) >= 17) break
        h.push(d[0]); d = d.slice(1); setDealer([...h])
      }
      const pv = handValue(player), pS = pv.soft <= 21 ? pv.soft : pv.hard
      const dv = handValue(h), dS = dv.soft <= 21 ? dv.soft : dv.hard
      let net = -bet, label = '負け'
      if (dS > 21) { net = bet; label = 'ディーラーバースト！'; setBalance(b => b + bet * 2) }
      else if (pS > dS) { net = bet; label = '勝ち！'; setBalance(b => b + bet * 2) }
      else if (pS === dS) { net = 0; label = 'プッシュ'; setBalance(b => b + bet) }
      setResult({ label, net, pScore: pS, dScore: dS })
      setMessage(net > 0 ? '勝ち！' : net === 0 ? 'プッシュ' : '負け')
      setPhase('result')
    }, 800)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-xl">🃏</span><h1 className="text-base font-bold text-white">ブラックジャック</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div><div className="text-[9px] text-casino-muted">BET ${bet}</div></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 25%, #1a8a3a 0%, #0f6a28 55%, #0a4a1a 100%)', borderRadius: 16, padding: 14, border: '4px solid #3d2b1f', height: 340, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 44, left: '50%', marginLeft: -55, width: 110, height: 65, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
          {phase === 'bet' ? <><span className="text-[8px] text-white/20">BET</span><div style={{ width: 36, height: 36, borderRadius: '50%', background: bet === 10 ? '#f8fafc' : '#22c55e', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#1e293b', animation: 'chipB 0.3s ease-out' }}>{bet}</div></> :
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#22c55e', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{bet}</div>}
        </div>
        <div className="absolute top-1 left-3 text-[7px] text-white/25">ディーラー</div>
        <div className="absolute" style={{ bottom: 106, left: 3 }}><span className="text-[7px] text-white/25">プレイヤー</span></div>
        <div style={{ position: 'absolute', top: SHOE_Y, right: 6, width: 28, height: 42, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 6, color: '#c4a882', fontWeight: 700 }}>Shoe</span></div>
        {cards.map((c, i) => (
          <div key={c.id} style={{ position: 'absolute', left: c.x, top: c.y, zIndex: 10 + i, animation: `${i < 2 ? 'cfIn' : ''} 0.25s ease-out` }}>
            <PlayingCard card={c.card} faceUp={c.faceUp} />
          </div>
        ))}
        {result && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.75)', borderRadius: 12, padding: '8px 18px', textAlign: 'center', zIndex: 100, animation: 'cfIn 0.3s ease-out' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: result.net > 0 ? '#22c55e' : result.net === 0 ? '#f4a81d' : '#ef4444' }}>{result.label}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>P:{result.pScore} D:{result.dScore}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: result.net >= 0 ? '#22c55e' : '#ef4444', marginTop: 2 }}>{result.net >= 0 ? `+$${result.net}` : `-$${Math.abs(result.net)}`}</div>
          </div>
        )}
      </div>
      {phase === 'bet' && (
        <div className="flex items-center gap-2 mt-3 justify-center flex-wrap">
          {[5, 10, 25, 50].map(v => <div key={v} onClick={() => setBet(v)} style={{ width: 36, height: 36, borderRadius: '50%', background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff', border: bet === v ? '2px solid #f4a81d' : '2px solid transparent', transform: bet === v ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, transition: 'all 0.15s' }}>{v}</div>)}
          <button onClick={deal} disabled={bet > balance} className="ml-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">ディール</button>
        </div>
      )}
      {phase === 'play' && <div className="flex gap-2 mt-3 justify-center"><button onClick={hit} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">ヒット</button><button onClick={stand} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">スタンド</button></div>}
      {phase === 'result' && <div className="flex mt-3 justify-center"><button onClick={() => { setPhase('bet'); setCards([]); setResult(null); setMessage('ベットしてディール') }} className="px-5 py-2 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-xs">もう一度</button></div>}
      {message && <div className="text-center text-[10px] text-casino-muted/70 mt-2">{message}</div>}
    </div>
  )
}

function PlayingCard({ card, faceUp }: { card: Card; faceUp: boolean }) {
  const color = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  if (!faceUp) return <div style={{ width: 42, height: 58, borderRadius: 4, background: CARD_BACK, border: '1px solid #475569', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
  return (
    <div style={{ width: 42, height: 58, borderRadius: 4, background: '#f8fafc', border: '1px solid #94a3b8', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', position: 'relative', animation: 'cfIn 0.25s ease-out' }}>
      <span style={{ position: 'absolute', top: 2, left: 3, fontSize: 10, fontWeight: 700, lineHeight: 1, color }}>{card.rank}</span>
      <span style={{ position: 'absolute', top: 11, left: 3, fontSize: 7, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 20, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 10, fontWeight: 700, lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.rank}</span>
      <span style={{ position: 'absolute', bottom: -2, right: 3, fontSize: 7, lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.suit}</span>
    </div>
  )
}

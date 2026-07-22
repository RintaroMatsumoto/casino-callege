import { useState, useCallback, useEffect } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'
import { ChipTray, PayoutBox } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const CARD_BACK = 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 5px, #334155 5px, #334155 10px)'
let injected = false

export default function BlackjackGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes bjCard { 0% { transform: translateY(-30px) scale(0.8); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'play' | 'result'>('bet')
  const [deck, setDeck] = useState<Card[]>([])
  const [player, setPlayer] = useState<Card[]>([])
  const [dealer, setDealer] = useState<Card[]>([])
  const [show, setShow] = useState(false)
  const [result, setResult] = useState<{ label: string; net: number; payout: number; odds: string } | null>(null)

  const deal = useCallback(() => {
    if (bet > balance || bet <= 0) return
    setBalance(b => b - bet); setResult(null); setShow(false)
    const d = shuffleDeck(createDeck())
    const p1 = d[0], p2 = d[2], d1 = d[1], d2 = d[3]
    setPlayer([p1, p2]); setDealer([d1, { ...d2, hidden: true }]); setDeck(d.slice(4)); setPhase('play')
    setTimeout(() => setShow(true), 300)
    setTimeout(() => {
      const pv = handValue([p1, p2]), dv = handValue([d1, { ...d2, hidden: false }])
      const pS = pv.soft <= 21 ? pv.soft : pv.hard, dS = dv.soft <= 21 ? dv.soft : dv.hard
      if (pS === 21 && dS === 21) { setBalance(b => b + bet); setResult({ label: '両者BJ プッシュ', net: 0, payout: bet, odds: '1:1' }); setPhase('result') }
      else if (pS === 21) { const p = Math.floor(bet * 2.5); setBalance(b => b + p); setResult({ label: 'ブラックジャック!', net: Math.floor(bet * 1.5), payout: p, odds: '3:2' }); setPhase('result') }
      else if (dS === 21) { setResult({ label: 'ディーラーBJ', net: -bet, payout: 0, odds: '-' }); setPhase('result') }
    }, 1200)
  }, [bet, balance])

  const hit = () => {
    if (phase !== 'play' || !deck.length) return
    const card = deck[0]; setDeck(d => d.slice(1))
    const np = [...player, card]; setPlayer(np); setShow(false); setTimeout(() => setShow(true), 50)
    const v = handValue(np), s = v.soft <= 21 ? v.soft : v.hard
    if (s > 21) { setTimeout(() => { setDealer(dealer.map(c => ({ ...c, hidden: false }))); setResult({ label: 'バースト', net: -bet, payout: 0, odds: '-' }); setPhase('result') }, 500) }
  }

  const stand = () => {
    if (phase !== 'play') return
    setDealer(dealer.map(c => ({ ...c, hidden: false })))
    setTimeout(() => {
      let d = [...deck], h: Card[] = dealer.map(c => ({ ...c, hidden: false }))
      while (true) { const v = handValue(h); if ((v.soft <= 21 ? v.soft : v.hard) >= 17) break; h.push(d[0]); d = d.slice(1); setDealer([...h]) }
      const pv = handValue(player), pS = pv.soft <= 21 ? pv.soft : pv.hard, dv = handValue(h), dS = dv.soft <= 21 ? dv.soft : dv.hard
      let net = -bet, label = '負け', payout = 0, odds = '-'
      if (dS > 21) { net = bet; label = 'ディーラーバースト!'; payout = bet * 2; odds = '1:1'; setBalance(b => b + bet * 2) }
      else if (pS > dS) { net = bet; label = 'プレイヤーの勝ち!'; payout = bet * 2; odds = '1:1'; setBalance(b => b + bet * 2) }
      else if (pS === dS) { net = 0; label = 'プッシュ'; payout = bet; odds = '1:1'; setBalance(b => b + bet) }
      setResult({ label, net, payout, odds }); setPhase('result')
    }, 800)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><span className="text-xl">🃏</span><h1 className="text-base font-bold text-white">ブラックジャック</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {phase === 'bet' && <div className="mb-1"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} /></div>}
      <div style={{ background: 'radial-gradient(ellipse at 50% 25%, #1a8a3a 0%, #0f6a28 55%, #0a4a1a 100%)', borderRadius: 14, padding: 12, border: '4px solid #3d2b1f', height: 320, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 36, left: '50%', marginLeft: -35, width: 70, height: 50, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {phase === 'bet' ? <span className="text-[7px] text-white/20">BET</span> : null}
          {phase !== 'bet' && <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#1e293b' }}>{bet}</div>}
        </div>
        <div style={{ position: 'absolute', top: 6, right: 5, width: 24, height: 36, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 5, color: '#c4a882' }}>S</span></div>
        <div className="absolute top-1 left-3 text-[7px] text-white/25">D</div>
        <div className="absolute" style={{ bottom: 90, left: 3 }}><span className="text-[7px] text-white/25">P</span></div>
        {show && <>
          {dealer.map((c, i) => <div key={'d' + i} style={{ position: 'absolute', left: 40 + i * 46, top: 10, zIndex: 10 }}><CardView card={c} /></div>)}
          {player.map((c, i) => <div key={'p' + i} style={{ position: 'absolute', left: 40 + i * 46, top: 130, zIndex: 10, animation: 'bjCard 0.25s ease-out' }}><CardView card={c} /></div>)}
        </>}
        {result && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.8)', borderRadius: 10, padding: '6px 12px', textAlign: 'center', zIndex: 50, minWidth: 160 }}><PayoutBox label={result.label} bet={bet} odds={result.odds} payout={result.payout} net={result.net} /></div>}
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        {phase === 'bet' && <button onClick={deal} disabled={bet > balance} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">ディール</button>}
        {phase === 'play' && <><button onClick={hit} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">👆 ヒット</button><button onClick={stand} className="px-5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">✋ スタンド</button></>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setShow(false); setResult(null) }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button>}
      </div>
    </div>
  )
}

function CardView({ card }: { card: Card }) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  if (card.hidden) return <div style={{ width: 38, height: 54, borderRadius: 3, background: CARD_BACK, border: '1px solid #475569', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
  return <div style={{ width: 38, height: 54, borderRadius: 3, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'bjCard 0.25s ease-out', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
    <span style={{ position: 'absolute', top: 2, left: 2, fontSize: 9, fontWeight: 700, lineHeight: 1, color: c }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 10, left: 2, fontSize: 6, lineHeight: 1, color: c }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18, lineHeight: 1, color: c }}>{card.suit}</span>
  </div>
}

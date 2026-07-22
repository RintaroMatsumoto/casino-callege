import { useState, useCallback, useEffect } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'

type DealAnim = {
  id: number
  card: Card
  endX: number
  endY: number
  faceUp: boolean
}

type Phase = 'bet' | 'dealing' | 'play' | 'dealerTurn' | 'result'

// Card back SVG as data URI for consistent rendering
const CARD_BACK = 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 5px, #334155 5px, #334155 10px)'

// Inject keyframes once
let injected = false
function ensureStyles() {
  if (injected) return
  injected = true
  const s = document.createElement('style')
  s.textContent = `
    @keyframes cfIn { 0% { transform: scale(0.7) translateY(-30px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    @keyframes cfFlip { 0% { transform: rotateY(180deg); } 100% { transform: rotateY(0deg); } }
    @keyframes cfSlide { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(var(--tx)) translateY(var(--ty)); } }
    @keyframes chipBounce { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
  `
  document.head.appendChild(s)
}

// Pre-calculate hand positions
const SHOE_X = 240, SHOE_Y = 8
function playerX(i: number) { return 40 + i * 48 }
function dealerX(i: number) { return 40 + i * 48 }
const PLAYER_Y = 130, DEALER_Y = 10

export default function BlackjackGame() {
  useEffect(() => { ensureStyles() }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<Phase>('bet')
  const [deck, setDeck] = useState<Card[]>([])
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [message, setMessage] = useState('ベットしてからディール')
  const [dealing, setDealing] = useState<DealAnim[]>([])
  const [currentDeal, setCurrentDeal] = useState(0)
  const [resultData, setResultData] = useState<{ label: string; net: number; pScore: number; dScore: number } | null>(null)

  const dealSequence = useCallback((p1: Card, p2: Card, d1: Card, d2: Card) => {
    const anims: DealAnim[] = [
      { id: 0, card: d1, endX: dealerX(0), endY: DEALER_Y, faceUp: true },
      { id: 1, card: p1, endX: playerX(0), endY: PLAYER_Y, faceUp: true },
      { id: 2, card: d2, endX: dealerX(1), endY: DEALER_Y, faceUp: false },
      { id: 3, card: p2, endX: playerX(1), endY: PLAYER_Y, faceUp: true },
    ]
    setDealing(anims)
    setCurrentDeal(0)
    setPhase('dealing')
    setMessage('配っています...')

    anims.forEach((_, i) => {
      setTimeout(() => setCurrentDeal(i + 1), 200 + i * 350)
    })

    return anims.length * 350 + 600
  }, [])

  const deal = useCallback(() => {
    if (bet > balance || bet <= 0) return
    setBalance(b => b - bet)
    setResultData(null)
    setPlayerCards([])
    setDealerCards([])
    setDealing([])
    setCurrentDeal(0)

    const d = shuffleDeck(createDeck())
    const p1 = d[0], d1 = d[1], p2 = d[2], d2 = d[3]
    const rest = d.slice(4)
    setDeck(rest)
    setPlayerCards([p1, p2])
    setDealerCards([d1, { ...d2, hidden: true }])

    const totalTime = dealSequence(p1, p2, d1, d2)

    setTimeout(() => {
      const pv = handValue([p1, p2]), dv = handValue([d1, { ...d2, hidden: false }])
      const pS = pv.soft <= 21 ? pv.soft : pv.hard, dS = dv.soft <= 21 ? dv.soft : dv.hard
      if (pS === 21 && dS === 21) { setBalance(b => b + bet); setResultData({ label: '両者BJ！ プッシュ', net: 0, pScore: pS, dScore: dS }); setMessage('プッシュ'); setPhase('result') }
      else if (pS === 21) { setBalance(b => b + Math.floor(bet * 2.5)); setResultData({ label: 'ブラックジャック！ 3:2', net: Math.floor(bet * 1.5), pScore: pS, dScore: dS }); setMessage('BJ！'); setPhase('result') }
      else if (dS === 21) { setResultData({ label: 'ディーラーBJ...', net: -bet, pScore: pS, dScore: dS }); setMessage('ディーラーBJ'); setPhase('result') }
      else { setPhase('play'); setMessage('ヒット or スタンド') }
    }, totalTime)
  }, [bet, balance, dealSequence])

  const hit = () => {
    if (phase !== 'play' || !deck.length) return
    const card = deck[0]
    setDeck(d => d.slice(1))
    const newCards = [...playerCards, card]
    setPlayerCards(newCards)
    const idx = newCards.length - 1
    setDealing(prev => [...prev, { id: prev.length, card, endX: playerX(idx), endY: PLAYER_Y, faceUp: true }])
    setTimeout(() => setCurrentDeal(d => d + 1), 50)

    const v = handValue(newCards)
    const score = v.soft <= 21 ? v.soft : v.hard
    if (score > 21) {
      setTimeout(() => {
        setDealerCards(dealerCards.map(c => ({ ...c, hidden: false })))
        const dv = handValue(dealerCards.map(c => ({ ...c, hidden: false })))
        const dS = dv.soft <= 21 ? dv.soft : dv.hard
        setResultData({ label: 'バースト', net: -bet, pScore: score, dScore: dS })
        setMessage('バースト！')
        setPhase('result')
      }, 500)
    }
  }

  const stand = () => {
    if (phase !== 'play') return
    setPhase('dealerTurn')
    setMessage('ディーラー...')
    setDealerCards(dealerCards.map(c => ({ ...c, hidden: false })))

    setTimeout(() => {
      let d = [...deck], h: Card[] = dealerCards.map(c => ({ ...c, hidden: false }))
      while (true) {
        const v = handValue(h)
        if ((v.soft <= 21 ? v.soft : v.hard) >= 17) break
        h.push(d[0]); d = d.slice(1)
        setDealerCards([...h])
      }
      const pv = handValue(playerCards), pS = pv.soft <= 21 ? pv.soft : pv.hard
      const dv = handValue(h), dS = dv.soft <= 21 ? dv.soft : dv.hard
      let net = -bet, label = 'ディーラーの勝ち'
      if (dS > 21) { net = bet; label = 'ディーラーバースト！'; setBalance(b => b + bet * 2) }
      else if (pS > dS) { net = bet; label = 'プレイヤーの勝ち！'; setBalance(b => b + bet * 2) }
      else if (pS === dS) { net = 0; label = 'プッシュ'; setBalance(b => b + bet) }
      setResultData({ label, net, pScore: pS, dScore: dS })
      setMessage(net > 0 ? '勝ち！' : net === 0 ? 'プッシュ' : '負け')
      setPhase('result')
    }, 800)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-xl">🃏</span><h1 className="text-base font-bold text-white">ブラックジャック</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>

      {/* Table */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% 25%, #1a8a3a 0%, #0f6a28 55%, #0a4a1a 100%)',
        borderRadius: 16, padding: '14px 12px', border: '4px solid #3d2b1f',
        height: 340, position: 'relative', overflow: 'hidden',
      }}>
        {/* Bet circle */}
        {phase === 'bet' ? (
          <div style={{ position: 'absolute', bottom: 50, left: '50%', marginLeft: -55, width: 110, height: 65, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
            <span className="text-[8px] text-white/20">BET</span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: bet === 10 ? '#f8fafc' : '#22c55e', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#1e293b', animation: 'chipBounce 0.3s ease-out' }}>{bet}</div>
          </div>
        ) : (
          <div style={{ position: 'absolute', bottom: 50, left: '50%', marginLeft: -20, width: 40, height: 40, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#22c55e', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{bet}</div>
          </div>
        )}

        {/* Label areas */}
        <div className="absolute top-1 left-3 text-[7px] text-white/25">ディーラー</div>
        <div className="absolute" style={{ bottom: 110, left: 3 }}><span className="text-[7px] text-white/25">プレイヤー</span></div>

        {/* Shoe */}
        <div style={{ position: 'absolute', top: SHOE_Y, right: 6, width: 28, height: 42, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', zIndex: 0 }}>
          <span style={{ fontSize: 6, color: '#c4a882', fontWeight: 700, display: 'flex', justifyContent: 'center', paddingTop: 16 }}>Shoe</span>
        </div>

        {/* Cards */}
        {dealing.map((anim, i) => {
          const dealt = i < currentDeal
          const isCurrent = i === currentDeal - 1
          const delay = i * 0.05
          return (
            <div key={anim.id} style={{
              position: 'absolute',
              left: dealt ? anim.endX : SHOE_X,
              top: dealt ? anim.endY : SHOE_Y,
              transition: dealt && !isCurrent ? 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
              transitionDelay: isCurrent ? '0s' : `${delay}s`,
              zIndex: 10 + i,
              animation: dealt && isCurrent ? 'cfIn 0.25s ease-out' : 'none',
            }}>
              <PlayingCard card={anim.card} faceUp={anim.faceUp} />
            </div>
          )
        })}

        {/* Result overlay */}
        {resultData && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.75)', borderRadius: 12, padding: '8px 18px', textAlign: 'center', zIndex: 100, animation: 'cfIn 0.3s ease-out' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: resultData.net > 0 ? '#22c55e' : resultData.net === 0 ? '#f4a81d' : '#ef4444', marginBottom: 2 }}>{resultData.label}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>P: {resultData.pScore} / D: {resultData.dScore}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: resultData.net >= 0 ? '#22c55e' : '#ef4444', marginTop: 2 }}>{resultData.net >= 0 ? `+$${resultData.net}` : `-$${Math.abs(resultData.net)}`}</div>
          </div>
        )}
      </div>

      {/* Controls */}
      {phase === 'bet' && (
        <div className="flex items-center gap-2 mt-3 justify-center flex-wrap">
          {[5, 10, 25, 50].map(v => (
            <div key={v} onClick={() => setBet(v)} style={{ width: 36, height: 36, borderRadius: '50%', background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff', border: bet === v ? '2px solid #f4a81d' : '2px solid transparent', transform: bet === v ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.15s', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{v}</div>
          ))}
          <button onClick={deal} disabled={bet > balance} className="ml-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">ディール</button>
        </div>
      )}

      {phase === 'play' && (
        <div className="flex gap-2 mt-3 justify-center">
          <button onClick={hit} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">ヒット</button>
          <button onClick={stand} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">スタンド</button>
        </div>
      )}

      {phase === 'result' && (
        <div className="flex mt-3 justify-center">
          <button onClick={() => { setPhase('bet'); setDealing([]); setCurrentDeal(0); setResultData(null); setMessage('ベットしてからディール') }} className="px-5 py-2 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-xs">もう一度</button>
        </div>
      )}

      {message && <div className="text-center text-[10px] text-casino-muted/70 mt-2">{message}</div>}
    </div>
  )
}

function PlayingCard({ card, faceUp }: { card: Card; faceUp: boolean }) {
  const color = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'

  if (!faceUp) {
    return <div style={{ width: 42, height: 58, borderRadius: 4, background: CARD_BACK, border: '1px solid #475569', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
  }
  return (
    <div style={{ width: 42, height: 58, borderRadius: 4, background: '#f8fafc', border: '1px solid #94a3b8', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', position: 'relative', animation: 'cfFlip 0.3s ease-out' }}>
      <span style={{ position: 'absolute', top: 2, left: 3, fontSize: 10, fontWeight: 700, lineHeight: 1, color }}>{card.rank}</span>
      <span style={{ position: 'absolute', top: 11, left: 3, fontSize: 7, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 20, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 10, fontWeight: 700, lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.rank}</span>
      <span style={{ position: 'absolute', bottom: -2, right: 3, fontSize: 7, lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.suit}</span>
    </div>
  )
}


// Inject keyframes
const style = document.createElement('style')
style.textContent = `@keyframes cardFlip { 0% { transform: rotateY(180deg) scale(0.8); opacity: 0.5; } 100% { transform: rotateY(0deg) scale(1); opacity: 1; } }`
document.head.appendChild(style)

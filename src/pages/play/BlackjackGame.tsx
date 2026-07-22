import { useState, useEffect } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const CARD_BACK = 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 5px, #334155 5px, #334155 10px)'
const CW = 48, CH = 68
let injected = false

export default function BlackjackGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes bjCard { 0% { transform: translateY(-40px) scale(0.8); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(INIT_BALANCE)
  const [bet, setBet] = useState(10000)
  const [phase, setPhase] = useState<'bet' | 'dealing' | 'play' | 'dealer' | 'result'>('bet')
  const [deck, setDeck] = useState<Card[]>([])
  const [player, setPlayer] = useState<Card[]>([])
  const [dealer, setDealer] = useState<Card[]>([])
  const [pcards, setPcards] = useState<Card[]>([])
  const [dcards, setDcards] = useState<Card[]>([])
  const [res, setRes] = useState<{ label: string; net: number; payout: number; odds: string } | null>(null)
  const [dScore, setDScore] = useState(0)
  const [pScore, setPScore] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const STEPS = ['ベット', '配布', 'プレイ', '結果']

  const deal = () => {
    if (bet > balance || bet <= 0) return
    setBalance(b => b - bet); setRes(null); setPcards([]); setDcards([]); setPlayer([]); setDealer([])
    setStepIdx(1); setPhase('dealing')
    const d = shuffleDeck(createDeck())
    const p1 = d[1], d1 = d[2], p2 = d[3], d2 = d[4]
    setPlayer([p1, p2]); setDealer([d1, { ...d2, hidden: true }]); setDeck(d.slice(5))
    setTimeout(() => setPcards([p1]), 300); setTimeout(() => setDcards([d1]), 600)
    setTimeout(() => setPcards([p1, p2]), 900); setTimeout(() => setDcards([d1, { ...d2, hidden: true }]), 1200)
    setTimeout(() => {
      const pv = handValue([p1, p2]), dv = handValue([d1, { ...d2, hidden: false }])
      const pS = pv.soft <= 21 ? pv.soft : pv.hard, dS = dv.soft <= 21 ? dv.soft : dv.hard
      setPScore(pS); setDScore(dS); setStepIdx(2)
      if (pS === 21 && dS === 21) { setBalance(b => b + bet); setRes({ label: '両者BJ', net: 0, payout: bet, odds: '1:1' }); setDcards([d1, d2]); setStepIdx(3); setPhase('result') }
      else if (pS === 21) { const p = Math.floor(bet * 2.5); setBalance(b => b + p); setRes({ label: 'ブラックジャック! 3:2', net: Math.floor(bet * 1.5), payout: p, odds: '3:2' }); setDcards([d1, d2]); setStepIdx(3); setPhase('result') }
      else if (dS === 21) { setRes({ label: 'ディーラーBJ', net: -bet, payout: 0, odds: '-' }); setDcards([d1, d2]); setStepIdx(3); setPhase('result') }
      else { setPhase('play'); setStepIdx(2) }
    }, 1800)
  }

  const hit = () => {
    if (phase !== 'play' || !deck.length) return
    const card = deck[0]; setDeck(d => d.slice(1))
    const np = [...player, card]; setPlayer(np); setPcards(prev => [...prev, card])
    const v = handValue(np), s = v.soft <= 21 ? v.soft : v.hard; setPScore(s)
    if (s > 21) { setTimeout(() => {
      setDcards(dealer.map(c => ({ ...c, hidden: false })))
      setDScore(handValue(dealer.map(c => ({ ...c, hidden: false }))).soft)
      setRes({ label: 'バースト... 21オーバー', net: -bet, payout: 0, odds: '-' }); setStepIdx(3); setPhase('result')
    }, 500) }
  }

  const stand = () => {
    if (phase !== 'play') return
    setPhase('dealer')
    const revealed = dealer.map(c => ({ ...c, hidden: false })); setDcards(revealed); setDealer(revealed)
    let d = [...deck], h: Card[] = [...revealed]
    const iv = setInterval(() => {
      const v = handValue(h); const s = v.soft <= 21 ? v.soft : v.hard; setDScore(s)
      if (s >= 17) { clearInterval(iv); finish(h); return }
      h.push(d[0]); d = d.slice(1); setDcards(prev => [...prev, h[h.length - 1]]); setDealer([...h])
    }, 600)
  }

  const finish = (h: Card[]) => {
    const pv = handValue(player), pS = pv.soft <= 21 ? pv.soft : pv.hard, dv = handValue(h), dS = dv.soft <= 21 ? dv.soft : dv.hard
    let net = -bet, label = 'ディーラーの勝ち', payout = 0, odds = '-'
    if (dS > 21) { net = bet; label = 'ディーラーバースト!'; payout = bet * 2; odds = '1:1'; setBalance(b => b + bet * 2) }
    else if (pS > dS) { net = bet; label = 'プレイヤーの勝ち!'; payout = bet * 2; odds = '1:1'; setBalance(b => b + bet * 2) }
    else if (pS === dS) { net = 0; label = 'プッシュ（引き分け）'; payout = bet; odds = '1:1'; setBalance(b => b + bet) }
    setRes({ label, net, payout, odds }); setStepIdx(3); setPhase('result')
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3"><span className="text-2xl">🃏</span><h1 className="text-lg font-bold text-white">ブラックジャック</h1></div>
        <div className="text-right"><div className="text-base font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>

      <PhaseBadge phase={phase} steps={STEPS} current={stepIdx} />

      {phase === 'bet' && <div className="mb-2"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} />
        <TipBox text="BETサークルにチップを置き「ディール」で開始。A=1か11、J/Q/K=10、2-10=そのまま。21に近づけ、超えると負け。" />
      </div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 25%, #1a8a3a 0%, #0f6a28 55%, #0a4a1a 100%)', borderRadius: 16, padding: 16, border: '4px solid #3d2b1f', height: 400, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', marginLeft: -45, width: 90, height: 65, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {phase === 'bet' ? <span className="text-[10px] text-white/30">BET</span> : null}
          {phase !== 'bet' && <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f8fafc', border: '3px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#1e293b' }}>{bet >= 1000 ? (bet/1000).toFixed(0) + 'K' : bet}</div>}
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 48, borderRadius: 3, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 7, color: '#c4a882', fontWeight: 700 }}>Shoe</span></div>
        <div className="absolute top-1 left-3 text-[9px] text-white/25 font-bold">D</div>
        <div className="absolute" style={{ bottom: 105, left: 3 }}><span className="text-[9px] text-white/25 font-bold">P</span></div>
        {dcards.map((c, i) => <div key={'d' + i} style={{ position: 'absolute', left: 40 + i * 56, top: 12, zIndex: 10, animation: 'bjCard 0.3s ease-out' }}><CardView card={c} /><div className="text-center text-[9px] font-bold mt-1" style={{ color: dScore > 21 ? '#ef4444' : '#f4a81d' }}>{i === 1 && !c.hidden && dScore ? dScore : ''}</div></div>)}
        {pcards.map((c, i) => <div key={'p' + i} style={{ position: 'absolute', left: 40 + i * 56, top: 155, zIndex: 10, animation: 'bjCard 0.3s ease-out' }}><CardView card={c} /></div>)}
        {pScore > 0 && <div className="absolute text-sm font-bold" style={{ left: 40 + pcards.length * 56 + 6, top: 175, color: pScore > 21 ? '#ef4444' : '#f4a81d' }}>{pScore}</div>}

        {res && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.85)', borderRadius: 12, padding: '10px 18px', textAlign: 'center', zIndex: 50, minWidth: 200 }}><PayoutBox label={res.label} bet={bet} odds={res.odds} payout={res.payout} net={res.net} /></div>}
      </div>

      <div className="flex gap-3 mt-3 justify-center">
        {phase === 'bet' && <button onClick={deal} disabled={bet > balance} className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm disabled:opacity-30">ディール</button>}
        {phase === 'play' && <><button onClick={hit} className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">👆 ヒット（カードを引く）</button><button onClick={stand} className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">✋ スタンド（止まる）</button></>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setPcards([]); setDcards([]); setRes(null); setPScore(0); setDScore(0); setStepIdx(0) }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-sm"><RotateCcw size={16} /> もう一度</button>}
      </div>

      {phase === 'play' && <TipBox text="自分の手札の合計が21を超えないように注意。ディーラーは17以上で必ず止まる（S17ルール）。" />}
      {phase === 'dealer' && <TipBox text="ディーラーが17以上になるまでカードを引いています。超えたらプレイヤーの勝ち。" />}
    </div>
  )
}

function CardView({ card }: { card: Card }) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  if (card.hidden) return <div style={{ width: CW, height: CH, borderRadius: 4, background: CARD_BACK, border: '1px solid #475569', boxShadow: '0 3px 8px rgba(0,0,0,0.4)' }} />
  return <div style={{ width: CW, height: CH, borderRadius: 4, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'bjCard 0.25s ease-out', boxShadow: '0 3px 8px rgba(0,0,0,0.3)' }}>
    <span style={{ position: 'absolute', top: 3, left: 3, fontSize: 12, fontWeight: 700, lineHeight: 1, color: c }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 16, left: 3, fontSize: 8, lineHeight: 1, color: c }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 24, lineHeight: 1, color: c }}>{card.suit}</span>
  </div>
}

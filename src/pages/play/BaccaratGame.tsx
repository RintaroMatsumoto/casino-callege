import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

function hTotal(cards: CardType[]): number {
  let t = 0; for (const c of cards) t += c.rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(c.rank) ? 10 : parseInt(c.rank); return t % 10
}

function dealG() {
  const d = shuffleDeck(createDeck()); const p = [d[0], d[2]], b = [d[1], d[3]]; let deck = d.slice(4)
  const pt = hTotal(p), bt = hTotal(b); let pThird = false, bThird = false
  const isNatural = pt >= 8 || bt >= 8
  if (!isNatural) {
    if (pt <= 5) { p.push(deck[0]); deck = deck.slice(1); pThird = true }
    const pv = pThird ? (p[2].rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(p[2].rank) ? 10 : parseInt(p[2].rank)) : 0
    if (bt <= 2 || (bt === 3 && pv !== 8) || (bt === 4 && pv >= 2 && pv <= 7) || (bt === 5 && pv >= 4 && pv <= 7) || (bt === 6 && (pv === 6 || pv === 7))) { b.push(deck[0]); bThird = true }
  }
  return { player: p, banker: b, pTotal: hTotal(p), bTotal: hTotal(b), isNatural, pThird, bThird, result: hTotal(p) > hTotal(b) ? 'player' as const : hTotal(b) > hTotal(p) ? 'banker' as const : 'tie' as const }
}

export default function BaccaratGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes bSlide { 0% { transform: translateX(40px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(INIT_BALANCE)
  const [bet, setBet] = useState(10000)
  const [phase, setPhase] = useState<'bet' | 'deal' | 'result'>('bet')
  const [g, setG] = useState(dealG)
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('ベットしてください')
  const [msgType, setMsgType] = useState('info')
  const [lr, setLr] = useState<{ net: number; label: string; payout: number; odds: string } | null>(null)
  const [commission, setCommission] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [stepIdx, setStepIdx] = useState(0)

  const STEPS = ['ベット', '配布', '結果']

  const place = (on: 'player' | 'banker' | 'tie') => {
    if (bet > balance) return; setStepIdx(1)
    setBalance(b => b - bet); setPhase('deal'); setShow(false)
    const game = dealG(); setG(game)
    setTimeout(() => {
      setShow(true)
      if (game.result === 'tie') {
        const payout = on === 'tie' ? bet * 9 : bet; const net = on === 'tie' ? bet * 8 : 0
        setBalance(b => b + payout); setLr({ net, label: 'タイ!', payout, odds: on === 'tie' ? '8:1' : '1:1' })
        setMsg(on === 'tie' ? 'タイ! +$' + net.toLocaleString() : 'タイ...賭け金返却')
        setMsgType(on === 'tie' ? 'win' : 'info')
      } else if (on === game.result) {
        const isBanker = on === 'banker'
        const payout = isBanker ? Math.floor(bet * 1.95) : bet * 2; const net = payout - bet
        setBalance(b => b + payout)
        if (isBanker) setCommission(c => c + Math.ceil(bet * 0.05))
        setLr({ net, label: (on === 'player' ? 'プレイヤー' : 'バンカー') + 'の勝ち', payout, odds: isBanker ? '0.95:1' : '1:1' })
        setMsg('+' + net.toLocaleString()); setMsgType('win')
      } else {
        setLr({ net: -bet, label: (game.result === 'player' ? 'プレイヤー' : 'バンカー') + 'の勝ち', payout: 0, odds: '-' })
        setMsg('-' + bet.toLocaleString()); setMsgType('lose')
      }
      setHistory(h => [...h.slice(-19), game.result]); setStepIdx(2); setPhase('result')
    }, 600)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3"><span className="text-2xl">💎</span><h1 className="text-lg font-bold text-white">バカラ</h1></div>
        <div className="text-right"><div className="text-base font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      <PhaseBadge phase={phase} steps={STEPS} current={stepIdx} />
      {commission > 0 && <div className="flex justify-end mb-1 text-xs"><span className="text-casino-gold font-bold">COMMISSION: ${commission.toLocaleString()}</span></div>}

      {phase === 'bet' && <div className="mb-2"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} />
        <TipBox text="Player/Banker/Tieの3択。9に近い方が勝ち。Bankerに賭けて勝つと5%のコミッションがかかる。Tieは8:1の高配当だが確率は約9.5%。" />
        <div className="flex gap-2 mt-2"><button onClick={() => place('player')} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">プレイヤー ${bet.toLocaleString()}</button><button onClick={() => place('banker')} className="flex-1 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm">バンカー ${bet.toLocaleString()}</button><button onClick={() => place('tie')} className="flex-1 py-2.5 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-sm">タイ ${bet.toLocaleString()} (8:1)</button></div>
      </div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 16, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 42, borderRadius: 3, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 7, color: '#c4a882', fontWeight: 700 }}>S</span></div>
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1.5"><span className="text-sm font-bold text-cyan-400">BANKER</span>{phase === 'result' && <span className="text-2xl font-bold" style={{ color: g.result === 'banker' ? '#22c55e' : '#94a3b8' }}>{g.bTotal}</span>}{g.bThird && phase === 'result' && <span className="text-xs text-cyan-300">(3枚目)</span>}</div>
          <div className="flex gap-1.5 min-h-[60px]">{g.banker.map((c, i) => <div key={i} style={{ animation: show ? 'bSlide 0.3s ease-out ' + i * 0.15 + 's both' : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {g.isNatural && phase === 'result' && <div className="flex justify-center my-1"><span className="text-sm font-bold text-casino-gold animate-pulse">ナチュラル！ (8 or 9)</span></div>}
        {phase === 'result' && <div className="flex justify-center my-2"><div style={{ background: g.result === 'banker' ? '#0d948822' : g.result === 'player' ? '#dc262622' : '#6b728022', border: '1px solid ' + (g.result === 'banker' ? '#0d9488' : g.result === 'player' ? '#dc2626' : '#6b7280'), borderRadius: 20, padding: '4px 18px' }}><span className={'text-sm font-bold ' + (g.result === 'banker' ? 'text-cyan-400' : g.result === 'player' ? 'text-red-400' : 'text-gray-400')}>{g.result === 'player' ? 'プレイヤー' : g.result === 'banker' ? 'バンカー' : 'タイ'} の勝ち</span></div></div>}
        <div>
          <div className="flex items-center gap-3 mb-1.5"><span className="text-sm font-bold text-red-400">PLAYER</span>{phase === 'result' && <span className="text-2xl font-bold" style={{ color: g.result === 'player' ? '#22c55e' : '#94a3b8' }}>{g.pTotal}</span>}{g.pThird && phase === 'result' && <span className="text-xs text-red-300">(3枚目)</span>}</div>
          <div className="flex gap-1.5 min-h-[60px]">{g.player.map((c, i) => <div key={i} style={{ animation: show ? 'bSlide 0.3s ease-out ' + (i + 2) * 0.15 + 's both' : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {lr && phase === 'result' && <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {lr.net >= 0 ? <PayoutBox label={lr.label} bet={bet} odds={lr.odds} payout={lr.payout} net={lr.net} /> :
            <div className="text-center text-sm text-red-400"><div className="font-bold text-base">LOSE</div><div>{lr.label}</div><div className="text-lg font-bold mt-1"> -${bet.toLocaleString()} </div></div>}
        </div>}
      </div>

      {/* Scoreboard */}
      {history.length > 0 && <div className="flex gap-1 mt-2 justify-center flex-wrap">
        {history.map((r, i) => <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: r === 'player' ? '#dc2626' : r === 'banker' ? '#0d9488' : '#6b7280', fontSize: 9, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{r === 'player' ? 'P' : r === 'banker' ? 'B' : 'T'}</div>)}
      </div>}

      {msg && <div className={'mt-2 text-center text-sm font-bold ' + (msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold')}>{msg}</div>}
      {phase === 'result' && <div className="flex mt-3 justify-center"><button onClick={() => { setPhase('bet'); setLr(null); setMsg('ベットしてください'); setStepIdx(0) }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-sm"><RotateCcw size={16} /> もう一度</button></div>}
    </div>
  )
}

function BCard({ card }: { card: CardType }) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  return <div style={{ width: 44, height: 62, borderRadius: 4, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'bSlide 0.3s ease-out', boxShadow: '0 3px 8px rgba(0,0,0,0.25)' }}>
    <span style={{ position: 'absolute', top: 3, left: 3, fontSize: 11, fontWeight: 700, lineHeight: 1, color: c }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 14, left: 3, fontSize: 7, lineHeight: 1, color: c }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 22, lineHeight: 1, color: c }}>{card.suit}</span>
  </div>
}

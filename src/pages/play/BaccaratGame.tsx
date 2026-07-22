import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { ChipTray, PayoutBox } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

function hTotal(cards: CardType[]): number {
  let t = 0; for (const c of cards) t += c.rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(c.rank) ? 10 : parseInt(c.rank); return t % 10
}

function dealG() {
  const d = shuffleDeck(createDeck()); const p = [d[0], d[2]], b = [d[1], d[3]]; let deck = d.slice(4)
  const pt = hTotal(p), bt = hTotal(b); let pThird = false
  if (pt < 8 && bt < 8) {
    if (pt <= 5) { p.push(deck[0]); deck = deck.slice(1); pThird = true }
    const pv = pThird ? (p[2].rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(p[2].rank) ? 10 : parseInt(p[2].rank)) : 0
    if (bt <= 2 || (bt === 3 && pv !== 8) || (bt === 4 && pv >= 2 && pv <= 7) || (bt === 5 && pv >= 4 && pv <= 7) || (bt === 6 && (pv === 6 || pv === 7))) b.push(deck[0])
  }
  return { player: p, banker: b, pTotal: hTotal(p), bTotal: hTotal(b), result: hTotal(p) > hTotal(b) ? 'player' as const : hTotal(b) > hTotal(p) ? 'banker' as const : 'tie' as const }
}

export default function BaccaratGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes bSlide { 0% { transform: translateX(30px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'deal' | 'result'>('bet')
  const [g, setG] = useState(dealG)
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('ベットしてください')
  const [msgType, setMsgType] = useState('info')
  const [lr, setLr] = useState<{ net: number; label: string; payout: number; odds: string } | null>(null)
  const [commission, setCommission] = useState(0)

  const place = (on: 'player' | 'banker') => {
    if (bet > balance) return
    setBalance(b => b - bet); setPhase('deal'); setShow(false)
    const game = dealG(); setG(game)
    setTimeout(() => { setShow(true)
      if (game.result === 'tie') { setBalance(b => b + bet); setLr({ net: 0, label: 'タイ', payout: bet, odds: '1:1' }); setMsg('タイ! 返却'); setMsgType('info') }
      else if (on === game.result) {
        const isBanker = on === 'banker'
        const payout = isBanker ? Math.floor(bet * 1.95) : bet * 2
        const net = payout - bet
        setBalance(b => b + payout)
        if (isBanker) setCommission(c => c + Math.ceil(bet * 0.05))
        setLr({ net, label: (on === 'player' ? 'プレイヤー' : 'バンカー') + 'の勝ち', payout, odds: isBanker ? '0.95:1' : '1:1' })
        setMsg('+' + net); setMsgType('win')
      } else {
        setLr({ net: -bet, label: (game.result === 'player' ? 'プレイヤー' : 'バンカー') + 'の勝ち', payout: 0, odds: '-' })
        setMsg('-' + bet); setMsgType('lose')
      }
      setPhase('result')
    }, 600)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><span className="text-xl">💎</span><h1 className="text-base font-bold text-white">バカラ</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {phase === 'bet' && <div className="mb-1"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} /></div>}

      {/* Commission display */}
      {commission > 0 && <div className="flex justify-end mb-1 text-[9px]"><span className="text-casino-gold font-bold">COMM: ${commission}</span></div>}

      {phase === 'bet' && <div className="flex gap-2 mb-2"><button onClick={() => place('player')} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">プレイヤー $' + {bet}</button><button onClick={() => place('banker')} className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs">バンカー $' + {bet}</button></div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 14, padding: 12, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 6, right: 5, width: 24, height: 34, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 5, color: '#c4a882' }}>S</span></div>
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1"><span className="text-[9px] font-bold text-cyan-400">BANKER</span>{phase === 'result' && <span className="text-sm font-bold" style={{ color: g.result === 'banker' ? '#22c55e' : '#666' }}>{g.bTotal}</span>}</div>
          <div className="flex gap-1 min-h-[50px]">{g.banker.map((c, i) => <div key={i} style={{ animation: show ? 'bSlide 0.3s ease-out ' + i * 0.15 + 's both' : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {phase === 'result' && <div className="flex justify-center my-2"><div style={{ background: g.result === 'banker' ? '#0d948822' : g.result === 'player' ? '#dc262622' : '#6b728022', border: '1px solid ' + (g.result === 'banker' ? '#0d9488' : g.result === 'player' ? '#dc2626' : '#6b7280'), borderRadius: 20, padding: '2px 14px' }}><span className={'text-xs font-bold ' + (g.result === 'banker' ? 'text-cyan-400' : g.result === 'player' ? 'text-red-400' : 'text-gray-400')}>{g.result === 'player' ? 'プレイヤー' : g.result === 'banker' ? 'バンカー' : 'タイ'}の勝ち</span></div></div>}
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="text-[9px] font-bold text-red-400">PLAYER</span>{phase === 'result' && <span className="text-sm font-bold" style={{ color: g.result === 'player' ? '#22c55e' : '#666' }}>{g.pTotal}</span>}</div>
          <div className="flex gap-1 min-h-[50px]">{g.player.map((c, i) => <div key={i} style={{ animation: show ? 'bSlide 0.3s ease-out ' + (i + 2) * 0.15 + 's both' : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {lr && phase === 'result' && <div className="mt-3 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {lr.net >= 0 ? <PayoutBox label={lr.label} bet={bet} odds={lr.odds} payout={lr.payout} net={lr.net} /> :
            <div className="text-center text-xs text-red-400"><div className="font-bold">LOSE</div><div>{lr.label}</div><div>-$' + {bet}</div></div>}
        </div>}
      </div>
      {msg && <div className={'mt-1 text-center text-xs font-bold ' + (msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold')}>{msg}</div>}
      {phase === 'result' && <div className="flex mt-2 justify-center"><button onClick={() => { setPhase('bet'); setLr(null); setMsg('ベットしてください') }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button></div>}
    </div>
  )
}

function BCard({ card }: { card: CardType }) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  return <div style={{ width: 36, height: 50, borderRadius: 3, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative' }}>
    <span style={{ position: 'absolute', top: 1, left: 2, fontSize: 8, fontWeight: 700, lineHeight: 1, color: c }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 8, left: 2, fontSize: 6, lineHeight: 1, color: c }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 16, lineHeight: 1, color: c }}>{card.suit}</span>
  </div>
}

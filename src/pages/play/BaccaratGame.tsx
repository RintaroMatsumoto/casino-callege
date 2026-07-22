import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

let injected = false

function handTotal(cards: CardType[]): number {
  let t = 0; for (const c of cards) t += c.rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(c.rank) ? 10 : parseInt(c.rank); return t % 10
}

function dealGame() {
  const d = shuffleDeck(createDeck()); const player = [d[0], d[2]], banker = [d[1], d[3]]; let deck = d.slice(4)
  const pt = handTotal(player), bt = handTotal(banker); let pThird = false
  if (pt < 8 && bt < 8) {
    if (pt <= 5) { player.push(deck[0]); deck = deck.slice(1); pThird = true }
    const pv = pThird ? (player[2].rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(player[2].rank) ? 10 : parseInt(player[2].rank)) : 0
    if (bt <= 2 || (bt === 3 && pv !== 8) || (bt === 4 && pv >= 2 && pv <= 7) || (bt === 5 && pv >= 4 && pv <= 7) || (bt === 6 && (pv === 6 || pv === 7))) banker.push(deck[0])
  }
  return { player, banker, pTotal: handTotal(player), bTotal: handTotal(banker), result: handTotal(player) > handTotal(banker) ? 'player' as const : handTotal(banker) > handTotal(player) ? 'banker' as const : 'tie' as const }
}

export default function BaccaratGame() {
  useEffect(() => {
    if (injected) return; injected = true
    const s = document.createElement('style')
    s.textContent = `@keyframes bSlide { 0% { transform: translateX(50px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }`
    document.head.appendChild(s)
  }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'dealing' | 'result'>('bet')
  const [g, setG] = useState(dealGame)
  const [showCards, setShowCards] = useState(false)
  const [message, setMessage] = useState('賭ける場所を選んでください')
  const [msgType, setMsgType] = useState<'win' | 'lose' | 'info'>('info')
  const [lastResult, setLastResult] = useState<{ net: number; label: string; payout: number } | null>(null)

  const placeBet = (on: 'player' | 'banker') => {
    if (bet > balance) return
    setBalance(b => b - bet)
    setPhase('dealing'); setShowCards(false)
    const game = dealGame(); setG(game)
    setTimeout(() => { setShowCards(true)
      if (game.result === 'tie') { setBalance(b => b + bet); setLastResult({ net: 0, label: 'タイ', payout: bet }); setMessage('タイ！ 賭け金返却'); setMsgType('info') }
      else if (on === game.result) { const payout = on === 'banker' ? Math.floor(bet * 1.95) : bet * 2; const net = payout - bet; setBalance(b => b + payout); setLastResult({ net, label: `${on === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち`, payout }); setMessage(`${on === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち！ +$${net}`); setMsgType('win') }
      else { setLastResult({ net: -bet, label: `${game.result === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち`, payout: 0 }); setMessage(`${game.result === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち... -$${bet}`); setMsgType('lose') }
      setPhase('result')
    }, 600)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-xl">💎</span><h1 className="text-base font-bold text-white">バカラ</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {phase === 'bet' && (
        <div className="bg-casino-card rounded-xl p-3 border border-casino-border mb-3">
          <div className="flex gap-2 mb-2">
            {[5, 10, 25, 50].map(v => <div key={v} onClick={() => setBet(v)} style={{ width: 34, height: 34, borderRadius: '50%', background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff', border: bet === v ? '2px solid #f4a81d' : '2px solid transparent', transform: bet === v ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, transition: 'all 0.15s' }}>{v}</div>)}
          </div>
          <div className="flex gap-2"><button onClick={() => placeBet('player')} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">プレイヤー</button><button onClick={() => placeBet('banker')} className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs">バンカー</button></div>
        </div>
      )}
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 14, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, right: 6, width: 26, height: 38, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 6, color: '#c4a882', fontWeight: 700 }}>S</span></div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1"><span className="text-2xs font-bold text-cyan-400">バンカー</span>{phase === 'result' && <span className="text-sm font-bold" style={{ color: g.result === 'banker' ? '#22c55e' : '#666' }}>{g.bTotal}</span>}</div>
          <div className="flex gap-1 min-h-[52px]">{g.banker.map((c, i) => <div key={i} style={{ animation: showCards ? `bSlide 0.3s ease-out ${i * 0.15}s both` : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {phase === 'result' && <div className="flex justify-center my-2"><div style={{ background: `${g.result === 'banker' ? '#0d948822' : g.result === 'player' ? '#dc262622' : '#6b728022'}`, border: `1px solid ${g.result === 'banker' ? '#0d9488' : g.result === 'player' ? '#dc2626' : '#6b7280'}`, borderRadius: 20, padding: '4px 16px' }}><span className={`text-xs font-bold ${g.result === 'banker' ? 'text-cyan-400' : g.result === 'player' ? 'text-red-400' : 'text-gray-400'}`}>{g.result === 'player' ? 'プレイヤー' : g.result === 'banker' ? 'バンカー' : 'タイ'} の勝ち</span></div></div>}
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="text-2xs font-bold text-red-400">プレイヤー</span>{phase === 'result' && <span className="text-sm font-bold" style={{ color: g.result === 'player' ? '#22c55e' : '#666' }}>{g.pTotal}</span>}</div>
          <div className="flex gap-1 min-h-[52px]">{g.player.map((c, i) => <div key={i} style={{ animation: showCards ? `bSlide 0.3s ease-out ${(i + 2) * 0.15}s both` : 'none' }}><BCard card={c} /></div>)}</div>
        </div>
        {lastResult && phase === 'result' && <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center justify-center gap-2 mb-1">{lastResult.net > 0 ? <TrendingUp size={16} className="text-emerald-400" /> : lastResult.net < 0 ? <TrendingDown size={16} className="text-red-400" /> : <span className="text-yellow-400 text-xs font-bold">—</span>}
            <span className={`text-xs font-bold ${lastResult.net > 0 ? 'text-emerald-400' : lastResult.net < 0 ? 'text-red-400' : 'text-yellow-400'}`}>{lastResult.net > 0 ? 'WIN' : lastResult.net < 0 ? 'LOSE' : 'PUSH'}</span></div>
          <div className="text-center text-2xs text-casino-muted">${bet}→${lastResult.payout}（{lastResult.net >= 0 ? `+${lastResult.net}` : lastResult.net}）</div>
        </div>}
      </div>
      {message && <div className={`mt-2 text-center text-xs font-bold ${msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}
      {phase === 'result' && <div className="flex mt-3 justify-center"><button onClick={() => { setPhase('bet'); setLastResult(null); setMessage('賭ける場所を選んでください'); setMsgType('info') }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button></div>}
    </div>
  )
}

function BCard({ card }: { card: CardType }) {
  const color = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  return <div style={{ width: 38, height: 54, borderRadius: 3, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'bSlide 0.3s ease-out' }}>
    <span style={{ position: 'absolute', top: 2, left: 2, fontSize: 9, fontWeight: 700, lineHeight: 1, color }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 10, left: 2, fontSize: 6, lineHeight: 1, color }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18, lineHeight: 1, color }}>{card.suit}</span>
  </div>
}

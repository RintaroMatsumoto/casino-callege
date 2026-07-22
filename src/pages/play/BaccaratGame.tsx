import { useState } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { CardFace } from '../../games/Card'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

function handTotal(cards: CardType[]): number {
  let t = 0; for (const c of cards) t += c.rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(c.rank) ? 10 : parseInt(c.rank); return t % 10
}

function chipCount(b: number) { const v = [500, 100, 25, 5, 1]; const c: Record<number, number> = {}; let r = Math.max(0, b); for (const x of v) { c[x] = Math.floor(r / x); r %= x } return c }

function dealGame() {
  const d = shuffleDeck(createDeck()); const player = [d[0], d[2]], banker = [d[1], d[3]]; let deck = d.slice(4)
  const pt = handTotal(player), bt = handTotal(banker)
  if (pt < 8 && bt < 8) {
    let pThird = false
    if (pt <= 5) { player.push(deck[0]); deck = deck.slice(1); pThird = true }
    const pv = pThird ? (player[2].rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(player[2].rank) ? 10 : parseInt(player[2].rank)) : 0
    if (bt <= 2 || (bt === 3 && pv !== 8) || (bt === 4 && pv >= 2 && pv <= 7) || (bt === 5 && pv >= 4 && pv <= 7) || (bt === 6 && (pv === 6 || pv === 7))) banker.push(deck[0])
  }
  const pTotal = handTotal(player), bTotal = handTotal(banker)
  const result = pTotal > bTotal ? 'player' as const : bTotal > pTotal ? 'banker' as const : 'tie' as const
  return { player, banker, pTotal, bTotal, result }
}

export default function BaccaratGame() {
  const [g, setG] = useState(dealGame)
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'result'>('bet')
  const [lastResult, setLastResult] = useState<{ result: string; payout: number; net: number } | null>(null)
  const [message, setMessage] = useState('賭ける場所を選んでください')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')

  const placeBet = (on: 'player' | 'banker') => {
    setBalance(b => b - bet)
    const game = dealGame(); setG(game)
    if (game.result === 'tie') {
      setBalance(b => b + bet)
      setLastResult({ result: 'タイ', payout: bet, net: 0 })
      setMessage('タイ！ 賭け金返却'); setMessageType('info')
    } else if (on === game.result) {
      const payout = on === 'banker' ? Math.floor(bet * 1.95) : bet * 2
      setBalance(b => b + payout)
      const net = payout - bet
      setLastResult({ result: `${on === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち`, payout, net })
      const commission = on === 'banker' ? `（コミッション5%: -$${Math.ceil(bet * 0.05)}）` : ''
      setMessage(`${on === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち！ +$${net} ${commission}`)
      setMessageType('win')
    } else {
      setLastResult({ result: `${game.result === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち`, payout: 0, net: -bet })
      setMessage(`${game.result === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち... -$${bet}`)
      setMessageType('lose')
    }
    setPhase('result')
  }

  const chips = chipCount(balance)

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3"><span className="text-2xl">💎</span><h1 className="text-lg font-bold text-white">バカラ</h1></div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${balance.toLocaleString()}</div>
          <div className="text-[10px] text-casino-muted">{Object.entries(chips).filter(([, c]) => c > 0).map(([v, c]) => `${v}×${c}`).join(' ')}</div>
        </div>
      </div>

      {phase === 'bet' && (
        <div className="bg-casino-card rounded-xl p-3 border border-casino-border mb-3">
          <div className="text-xs text-casino-muted mb-2">ベット額: <span className="text-casino-gold font-bold">${bet}</span></div>
          <div className="flex gap-2 mb-3">
            {[5, 10, 25, 50].map(v => (
              <button key={v} onClick={() => setBet(v)}
                className={`w-9 h-9 rounded-full text-xs font-bold border-2 ${bet === v ? 'border-casino-gold scale-110' : 'border-transparent opacity-60'}`}
                style={{ background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff' }}>{v}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => placeBet('player')} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">プレイヤー</button>
            <button onClick={() => placeBet('banker')} className="flex-1 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm">バンカー</button>
          </div>
        </div>
      )}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5"><span className="text-xs font-bold text-cyan-400">バンカー</span>{phase === 'result' && <span className="text-lg font-bold" style={{ color: g.result === 'banker' ? '#22c55e' : '#94a3b8' }}>{g.bTotal}</span>}</div>
          <div className="flex gap-1.5 min-h-[62px]">{g.banker.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>

        {phase === 'result' && (
          <div className="flex justify-center my-3">
            <div style={{ background: `${g.result === 'banker' ? '#0d948822' : g.result === 'player' ? '#dc262622' : '#6b728022'}`, border: `1px solid ${g.result === 'banker' ? '#0d9488' : g.result === 'player' ? '#dc2626' : '#6b7280'}`, borderRadius: 20, padding: '4px 18px' }}>
              <span className={`text-sm font-bold ${g.result === 'banker' ? 'text-cyan-400' : g.result === 'player' ? 'text-red-400' : 'text-gray-400'}`}>
                {g.result === 'player' ? 'プレイヤー' : g.result === 'banker' ? 'バンカー' : 'タイ'} の勝ち
              </span>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-1.5"><span className="text-xs font-bold text-red-400">プレイヤー</span>{phase === 'result' && <span className="text-lg font-bold" style={{ color: g.result === 'player' ? '#22c55e' : '#94a3b8' }}>{g.pTotal}</span>}</div>
          <div className="flex gap-1.5 min-h-[62px]">{g.player.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>

        {lastResult && (
          <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              {lastResult.net > 0 ? <TrendingUp size={16} className="text-emerald-400" /> : lastResult.net < 0 ? <TrendingDown size={16} className="text-red-400" /> : <span className="text-yellow-400 text-sm font-bold">—</span>}
              <span className={`text-sm font-bold ${lastResult.net > 0 ? 'text-emerald-400' : lastResult.net < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {lastResult.net > 0 ? 'WIN' : lastResult.net < 0 ? 'LOSE' : 'PUSH'}
              </span>
            </div>
            <div className="text-center text-xs text-casino-muted">
              $10 → ${lastResult.payout}（{lastResult.net >= 0 ? `+${lastResult.net}` : lastResult.net}）
              {lastResult.net <= 0 && '（賭け金含まず）' || lastResult.net > 0 && lastResult.payout > 10 * 2 && '（コミッション5%控除済）'}
            </div>
          </div>
        )}
      </div>

      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : messageType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}

      <div className="flex mt-4 justify-center">
        {phase === 'result' && (
          <button onClick={() => { setPhase('bet'); setLastResult(null); setG(dealGame()); setMessage('賭ける場所を選んでください'); setMessageType('info') }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm">
            <RotateCcw size={14} /> もう一度
          </button>
        )}
      </div>
    </div>
  )
}

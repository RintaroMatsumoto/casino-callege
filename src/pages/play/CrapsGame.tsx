import { useState } from 'react'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

function chipCount(b: number) { const v = [500, 100, 25, 5, 1]; const c: Record<number, number> = {}; let r = Math.max(0, b); for (const x of v) { c[x] = Math.floor(r / x); r %= x } return c }

export default function CrapsGame() {
  const [balance, setBalance] = useState(1000)
  const [dice, setDice] = useState<[number, number]>([1, 1])
  const [rolling, setRolling] = useState(false)
  const [phase, setPhase] = useState<'bet' | 'comeout' | 'point' | 'result'>('bet')
  const [point, setPoint] = useState<number | null>(null)
  const [message, setMessage] = useState('「ロール」でスタート')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [lastResult, setLastResult] = useState<{ sum: number; win: boolean; payout: number; net: number; desc: string } | null>(null)

  const roll = () => {
    if (rolling) return
    setRolling(true)
    let count = 0
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
      count++
      if (count >= 8) { clearInterval(interval); const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1; setDice([d1, d2]); resolve(d1 + d2); setRolling(false) }
    }, 80)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum)
    if (phase === 'comeout') {
      if (sum === 7 || sum === 11) {
        setBalance(b => b + 20)
        setLastResult({ sum, win: true, payout: 20, net: 10, desc: `ナチュラル ${sum}` })
        setMessage(`ナチュラル ${sum}！ +$10`); setMessageType('win'); setPhase('result')
      } else if (sum === 2 || sum === 3 || sum === 12) {
        setLastResult({ sum, win: false, payout: 0, net: -10, desc: `クラップス ${sum}` })
        setMessage(`クラップス ${sum}... -$10`); setMessageType('lose'); setPhase('result')
      } else {
        setPoint(sum); setPhase('point')
        setMessage(`ポイント ${sum} 成立！ ${sum}か7を待つ`)
      }
    } else {
      if (sum === point) {
        setBalance(b => b + 20)
        setLastResult({ sum, win: true, payout: 20, net: 10, desc: `ポイント ${point}！` })
        setMessage(`ポイント ${point}！ +$10`); setMessageType('win'); setPhase('result')
      } else if (sum === 7) {
        setLastResult({ sum, win: false, payout: 0, net: -10, desc: 'セブンアウト' })
        setMessage(`セブンアウト！ -$10`); setMessageType('lose'); setPhase('result')
      } else {
        setMessage(`ロール ${sum}... まだ続く`)
      }
    }
  }

  const startGame = () => { setPhase('comeout'); setBalance(b => b - 10); setLastResult(null); roll() }
  const chips = chipCount(balance)

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3"><span className="text-2xl">🎲</span><h1 className="text-lg font-bold text-white">クラップス</h1></div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${balance.toLocaleString()}</div>
          <div className="text-[10px] text-casino-muted">{Object.entries(chips).filter(([, c]) => c > 0).map(([v, c]) => `${v}×${c}`).join(' ')}</div>
        </div>
      </div>

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        {/* Dice */}
        <div className="flex justify-center gap-6 mb-4">
          {dice.map((val, i) => (
            <div key={i} style={{ width: 64, height: 64, borderRadius: 10, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 6 }}>
              {[1, 2, 3, 4, 5, 6].map(p => (
                <div key={p} style={{ width: 12, height: 12, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dotVisible(val, p) ? 'visible' : 'hidden' }} />
              ))}
            </div>
          ))}
        </div>

        {lastRoll !== null && <div className="text-center mb-2"><span className="text-2xl font-bold" style={{ color: rollColor(lastRoll) }}>{lastRoll}</span></div>}
        {point && <div className="flex justify-center mb-2"><div style={{ background: '#f4a81d', color: '#1e293b', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>⏺</span> POINT {point}</div></div>}
        <div className="flex justify-center"><div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '2px 10px' }}><span className="text-xs text-white">Pass Line $10</span></div></div>

        {/* Result */}
        {lastResult && (
          <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              {lastResult.win ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}
              <span className={`text-sm font-bold ${lastResult.win ? 'text-emerald-400' : 'text-red-400'}`}>{lastResult.win ? 'WIN' : 'LOSE'}</span>
            </div>
            <div className="text-center text-xs text-casino-muted">
              {lastResult.desc}<br />$10 → ${lastResult.win ? '20' : '0'}（{lastResult.win ? `+$10` : `-$10`}）
            </div>
          </div>
        )}
      </div>

      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : messageType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}

      <div className="flex gap-3 mt-4 justify-center">
        {phase === 'bet' && <button onClick={startGame} className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">Pass Line $10 でスタート</button>}
        {phase !== 'bet' && phase !== 'result' && <button onClick={() => { if (!rolling) roll() }} disabled={rolling} className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">{rolling ? '振っている...' : '🎲 ロール！'}</button>}
        {phase === 'result' && (
          <button onClick={() => { setPhase('bet'); setPoint(null); setLastResult(null); setMessage('「ロール」でスタート') }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm">
            <RotateCcw size={14} /> もう一度
          </button>
        )}
      </div>
    </div>
  )
}

function dotVisible(val: number, pos: number): boolean {
  const dots: Record<number, number[]> = { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }
  return dots[val]?.includes(pos) ?? false
}
function rollColor(s: number) { return s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d' }

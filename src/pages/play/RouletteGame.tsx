import { useState } from 'react'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

const NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])

function chipCount(b: number) { const v = [500, 100, 25, 5, 1]; const c: Record<number, number> = {}; let r = Math.max(0, b); for (const x of v) { c[x] = Math.floor(r / x); r %= x } return c }

const BET_OPTIONS = [
  { id: 'red', label: '赤', payout: '1:1' },
  { id: 'black', label: '黒', payout: '1:1' },
  { id: 'even', label: '偶数', payout: '1:1' },
  { id: 'odd', label: '奇数', payout: '1:1' },
  { id: 'low', label: '1-18', payout: '1:1' },
  { id: 'high', label: '19-36', payout: '1:1' },
]

export default function RouletteGame() {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [selected, setSelected] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastResult, setLastResult] = useState<{ num: number; win: boolean; payout: number; net: number } | null>(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')

  const spin = () => {
    if (spinning || selected === null || bet > balance) return
    setSpinning(true)
    setBalance(b => b - bet)
    const idx = Math.floor(Math.random() * NUMBERS.length)
    const num = NUMBERS[idx]
    setRotation(r => r + 360 * 5 + (idx / NUMBERS.length) * 360)

    setTimeout(() => {
      let won = false
      if ((selected === 'red' && REDS.has(num)) || (selected === 'black' && !REDS.has(num) && num !== 0) ||
          (selected === 'even' && num !== 0 && num % 2 === 0) || (selected === 'odd' && num % 2 === 1) ||
          (selected === 'low' && num >= 1 && num <= 18) || (selected === 'high' && num >= 19 && num <= 36)) won = true
      if (won) {
        setBalance(b => b + bet * 2)
        setLastResult({ num, win: true, payout: bet * 2, net: bet })
        setMessage(`「${num}」！ +${bet} 獲得！`)
        setMessageType('win')
      } else {
        setLastResult({ num, win: false, payout: 0, net: -bet })
        setMessage(`「${num}」はずれ... -${bet}`)
        setMessageType('lose')
      }
      setSpinning(false)
    }, 3000)
  }

  const chips = chipCount(balance)

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3"><span className="text-2xl">🎡</span><h1 className="text-lg font-bold text-white">ルーレット</h1></div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${balance.toLocaleString()}</div>
          <div className="text-[10px] text-casino-muted">{Object.entries(chips).filter(([, c]) => c > 0).map(([v, c]) => `${v}×${c}`).join(' ')}</div>
        </div>
      </div>

      {/* Bet selector */}
      <div className="bg-casino-card rounded-xl p-3 border border-casino-border mb-3">
        <div className="text-xs text-casino-muted mb-2">ベット額: <span className="text-casino-gold font-bold">${bet}</span></div>
        <div className="flex gap-2 mb-2">
          {[5, 10, 25, 50].map(v => (
            <button key={v} onClick={() => setBet(v)}
              className={`w-9 h-9 rounded-full text-xs font-bold border-2 ${bet === v ? 'border-casino-gold scale-110' : 'border-transparent opacity-60'}`}
              style={{ background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff' }}>{v}</button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {BET_OPTIONS.map(o => (
            <button key={o.id} onClick={() => setSelected(o.id)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${selected === o.id ? 'bg-casino-gold text-black' : 'bg-casino-royal text-white hover:bg-casino-card'}`}>
              {o.label} ({o.payout})
            </button>
          ))}
        </div>
      </div>

      {/* Wheel */}
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center mb-3">
          <div style={{ width: 200, height: 200, position: 'relative' }}>
            <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%', transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
              <circle cx="160" cy="160" r="158" fill="#4a3020" /><circle cx="160" cy="160" r="140" fill="none" stroke="#2a1a0f" strokeWidth="8" />
              {NUMBERS.map((n, i) => { const a1 = (i * 360 / 37 - 90) * Math.PI / 180, a2 = ((i + 1) * 360 / 37 - 90) * Math.PI / 180; return <polygon key={n} points={`${160 + 135 * Math.cos(a1)},${160 + 135 * Math.sin(a1)} ${160 + 135 * Math.cos(a2)},${160 + 135 * Math.sin(a2)} ${160 + 95 * Math.cos(a2)},${160 + 95 * Math.sin(a2)} ${160 + 95 * Math.cos(a1)},${160 + 95 * Math.sin(a1)}`} fill={n === 0 ? '#16a34a' : REDS.has(n) ? '#dc2626' : '#1e293b'} /> })}
              {NUMBERS.map((n, i) => <text key={n} x={160 + 115 * Math.cos((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} y={160 + 115 * Math.sin((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="central">{n}</text>)}
            </svg>
            <div style={{ position: 'absolute', top: -8, left: '50%', marginLeft: -6, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '12px solid #f4a81d', zIndex: 10 }} />
          </div>
        </div>

        {/* Result Panel */}
        {lastResult && (
          <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              {lastResult.win ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}
              <span className={`text-sm font-bold ${lastResult.win ? 'text-emerald-400' : 'text-red-400'}`}>{lastResult.win ? 'WIN' : 'LOSE'}</span>
            </div>
            <div className="text-center text-xs text-casino-muted">
              <span className="font-bold text-white">{lastResult.num}</span>
              {' '}({lastResult.num === 0 ? 'Green' : REDS.has(lastResult.num) ? 'Red' : 'Black'})
              <br />${lastResult.win ? `${bet} → ${bet * 2}（+${bet}）` : `${bet} 失う`}
            </div>
          </div>
        )}
      </div>

      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>{message}</div>}

      <div className="flex gap-3 mt-4 justify-center">
        <button onClick={spin} disabled={spinning || selected === null || bet > balance}
          className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">
          {spinning ? '回転中...' : 'スピン！'}
        </button>
        {lastResult && !spinning && (
          <button onClick={() => { setLastResult(null); setMessage('') }}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-casino-card border border-casino-border text-casino-muted text-sm">
            <RotateCcw size={14} /> クリア
          </button>
        )}
      </div>
    </div>
  )
}

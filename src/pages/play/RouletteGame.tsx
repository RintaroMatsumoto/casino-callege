import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

const NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])

const BETS = [
  { id: 'red', label: '赤', payout: '1:1', color: '#dc2626' },
  { id: 'black', label: '黒', payout: '1:1', color: '#1e293b' },
  { id: 'even', label: '偶数', payout: '1:1', color: '#334155' },
  { id: 'odd', label: '奇数', payout: '1:1', color: '#334155' },
  { id: 'low', label: '1-18', payout: '1:1', color: '#334155' },
  { id: 'high', label: '19-36', payout: '1:1', color: '#334155' },
]

let injected = false

export default function RouletteGame() {
  useEffect(() => {
    if (injected) return; injected = true
    const s = document.createElement('style')
    s.textContent = `@keyframes chipLand { 0% { transform: scale(0) translateY(-30px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }`
    document.head.appendChild(s)
  }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [selected, setSelected] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<{ num: number; win: boolean; net: number; label: string } | null>(null)
  const [message, setMessage] = useState('')

  const spin = () => {
    if (spinning || selected === null || bet > balance) return
    setSpinning(true)
    setBalance(b => b - bet)
    const idx = Math.floor(Math.random() * NUMBERS.length)
    const num = NUMBERS[idx]
    setRotation(r => r + 360 * 5 + (idx / NUMBERS.length) * 360)
    setTimeout(() => {
      let win = (selected === 'red' && REDS.has(num)) || (selected === 'black' && !REDS.has(num) && num !== 0) ||
                (selected === 'even' && num !== 0 && num % 2 === 0) || (selected === 'odd' && num % 2 === 1) ||
                (selected === 'low' && num >= 1 && num <= 18) || (selected === 'high' && num >= 19 && num <= 36)
      const label = `${num} (${num === 0 ? 'Green' : REDS.has(num) ? 'Red' : 'Black'})`
      if (win) { setBalance(b => b + bet * 2); setResult({ num, win: true, net: bet, label }) }
      else { setResult({ num, win: false, net: -bet, label }) }
      setSpinning(false)
    }, 3000)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-xl">🎡</span><h1 className="text-base font-bold text-white">ルーレット</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 14, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center mb-3">
          <div style={{ width: 180, height: 180, position: 'relative' }}>
            <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%', transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
              <circle cx="160" cy="160" r="158" fill="#4a3020" /><circle cx="160" cy="160" r="140" fill="none" stroke="#2a1a0f" strokeWidth="8" />
              {NUMBERS.map((n, i) => { const a = (i * 360 / 37 - 90) * Math.PI / 180, b = ((i + 1) * 360 / 37 - 90) * Math.PI / 180; return <polygon key={n} points={`${160 + 135 * Math.cos(a)},${160 + 135 * Math.sin(a)} ${160 + 135 * Math.cos(b)},${160 + 135 * Math.sin(b)} ${160 + 95 * Math.cos(b)},${160 + 95 * Math.sin(b)} ${160 + 95 * Math.cos(a)},${160 + 95 * Math.sin(a)}`} fill={n === 0 ? '#16a34a' : REDS.has(n) ? '#dc2626' : '#1e293b'} /> })}
              {NUMBERS.map((n, i) => <text key={n} x={160 + 115 * Math.cos((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} y={160 + 115 * Math.sin((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="central">{n}</text>)}
            </svg>
            <div style={{ position: 'absolute', top: -8, left: '50%', marginLeft: -5, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '10px solid #f4a81d', zIndex: 10 }} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-0.5 mb-2 max-w-sm mx-auto">
          <div style={{ background: '#16a34a', color: '#fff', textAlign: 'center', fontSize: 9, fontWeight: 700, padding: '3px 0', borderRadius: 2 }}>0</div>
          {Array.from({ length: 36 }, (_, i) => i + 1).map(n => <div key={n} style={{ background: REDS.has(n) ? '#dc2626' : '#1e293b', color: '#fff', textAlign: 'center', fontSize: 8, fontWeight: 700, padding: '4px 0', borderRadius: 2 }}>{n}</div>)}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {BETS.map(o => <div key={o.id} onClick={() => setSelected(o.id)} style={{ background: selected === o.id ? '#f4a81d' : o.color, color: '#fff', padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: '1px solid #475569', transition: 'all 0.15s' }}>{o.label} <span style={{ fontSize: 8, opacity: 0.7 }}>{o.payout}</span></div>)}
        </div>
        {selected && !spinning && !result && <div className="flex justify-center mt-3" style={{ animation: 'chipLand 0.3s ease-out' }}><div style={{ width: 34, height: 34, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#1e293b', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{bet}</div></div>}
        {result && !spinning && <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center justify-center gap-2 mb-1">{result.win ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}<span className={`text-sm font-bold ${result.win ? 'text-emerald-400' : 'text-red-400'}`}>{result.win ? 'WIN' : 'LOSE'}</span></div>
          <div className="text-center text-xs text-casino-muted">{result.label}<br />${result.win ? `${bet}→${bet * 2} (+${bet})` : `${bet} 失う`}</div>
        </div>}
      </div>
      {message && <div className={`mt-2 text-center text-xs font-bold ${result?.win ? 'text-emerald-400' : 'text-red-400'}`}>{message}</div>}
      <div className="flex gap-2 mt-3 justify-center">
        {[5, 10, 25, 50].map(v => <div key={v} onClick={() => setBet(v)} style={{ width: 34, height: 34, borderRadius: '50%', background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : '#f97316', color: v === 10 ? '#1e293b' : '#fff', border: bet === v ? '2px solid #f4a81d' : '2px solid transparent', transform: bet === v ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, transition: 'all 0.15s' }}>{v}</div>)}
        <button onClick={spin} disabled={spinning || selected === null || bet > balance} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">{spinning ? '回転中' : 'スピン'}</button>
        {result && !spinning && <button onClick={() => { setResult(null); setMessage('') }} className="px-3 py-1.5 rounded-lg bg-casino-card border border-casino-border text-casino-muted text-xs"><RotateCcw size={12} /></button>}
      </div>
    </div>
  )
}

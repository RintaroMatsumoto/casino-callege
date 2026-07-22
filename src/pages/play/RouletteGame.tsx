import { useState } from 'react'
import { ChipDisplay } from '../../games/Card'

const NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])

export default function RouletteGame() {
  const [balance, setBalance] = useState(1000)
  const [selectedBet, setSelectedBet] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')

  const spin = () => {
    if (spinning || selectedBet === null) return
    setSpinning(true)
    const idx = Math.floor(Math.random() * NUMBERS.length)
    const num = NUMBERS[idx]
    setRotation(r => r + 360 * 5 + (idx / NUMBERS.length) * 360)

    setTimeout(() => {
      let won = 0
      if (selectedBet === 'red' && REDS.has(num)) won = 10
      else if (selectedBet === 'black' && !REDS.has(num) && num !== 0) won = 10
      else if (selectedBet === 'even' && num !== 0 && num % 2 === 0) won = 10
      else if (selectedBet === 'odd' && num % 2 === 1) won = 10
      else if (selectedBet === 'low' && num >= 1 && num <= 18) won = 10
      else if (selectedBet === 'high' && num >= 19 && num <= 36) won = 10

      if (won > 0) {
        setBalance(b => b + 20)
        setMessage(`「${num}」！ +$10 獲得！`)
        setMessageType('win')
      } else {
        setBalance(b => b - 10)
        setMessage(`「${num}」はずれ...`)
        setMessageType('lose')
      }
      setSpinning(false)
    }, 3000)
  }

  const betLabels: Record<string, string> = { red: '赤', black: '黒', even: '偶数', odd: '奇数', low: '1-18', high: '19-36' }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3"><span className="text-2xl">🎡</span><h1 className="text-xl font-bold text-white">ルーレット</h1></div>
        <div className="flex items-center gap-2"><ChipDisplay value={balance} size={28} /><span className="text-sm font-bold text-white">${balance.toLocaleString()}</span></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center mb-4">
          <div style={{ width: 200, height: 200, position: 'relative' }}>
            <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%', transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
              <circle cx="160" cy="160" r="158" fill="#4a3020" /><circle cx="160" cy="160" r="140" fill="none" stroke="#2a1a0f" strokeWidth="8" />
              {NUMBERS.map((n, i) => { const a1 = (i * 360 / 37 - 90) * Math.PI / 180, a2 = ((i + 1) * 360 / 37 - 90) * Math.PI / 180; return <polygon key={n} points={`${160 + 135 * Math.cos(a1)},${160 + 135 * Math.sin(a1)} ${160 + 135 * Math.cos(a2)},${160 + 135 * Math.sin(a2)} ${160 + 95 * Math.cos(a2)},${160 + 95 * Math.sin(a2)} ${160 + 95 * Math.cos(a1)},${160 + 95 * Math.sin(a1)}`} fill={n === 0 ? '#16a34a' : REDS.has(n) ? '#dc2626' : '#1e293b'} /> })}
              {NUMBERS.map((n, i) => <text key={n} x={160 + 115 * Math.cos((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} y={160 + 115 * Math.sin((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="central">{n}</text>)}
            </svg>
            <div style={{ position: 'absolute', top: -8, left: '50%', marginLeft: -6, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '12px solid #f4a81d', zIndex: 10 }} />
          </div>
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {['red', 'black', 'even', 'odd', 'low', 'high'].map(id => (
            <div key={id} onClick={() => setSelectedBet(id)} style={{ background: selectedBet === id ? '#f4a81d' : (id === 'red' ? '#dc2626' : '#334155'), color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1px solid #475569' }}>{betLabels[id]}</div>
          ))}
        </div>
      </div>
      <div className="flex mt-4 justify-center">
        <button onClick={spin} disabled={spinning || selectedBet === null} className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">{spinning ? '回転中...' : 'スピン！'}</button>
      </div>
      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>{message}</div>}
    </div>
  )
}

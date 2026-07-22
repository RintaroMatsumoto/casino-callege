import { useState } from 'react'
import { ChipDisplay } from '../../games/Card'

export default function CrapsGame() {
  const [balance, setBalance] = useState(1000)
  const [point, setPoint] = useState<number | null>(null)
  const [phase, setPhase] = useState<'comeout' | 'point'>('comeout')
  const [dice, setDice] = useState<[number, number]>([1, 1])
  const [rolling, setRolling] = useState(false)
  const [message, setMessage] = useState('シューター！ カムアウトロール！')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')
  const [passBet] = useState(10)
  const [lastRoll, setLastRoll] = useState<number | null>(null)

  const roll = () => {
    if (rolling) return
    setRolling(true)
    let count = 0
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
      count++
      if (count >= 8) {
        clearInterval(interval)
        const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1
        setDice([d1, d2])
        resolveRoll(d1 + d2)
        setRolling(false)
      }
    }, 80)
  }

  const resolveRoll = (sum: number) => {
    setLastRoll(sum)
    if (phase === 'comeout') {
      if (sum === 7 || sum === 11) { setBalance(b => b + 20); setMessage(`ナチュラル ${sum}！ 勝ち！`); setMessageType('win') }
      else if (sum === 2 || sum === 3 || sum === 12) { setMessage(`クラップス ${sum}... 負け`); setMessageType('lose') }
      else { setPoint(sum); setPhase('point'); setMessage(`ポイント ${sum} 成立！`); setMessageType('info') }
    } else {
      if (sum === point) { setBalance(b => b + 20); setMessage(`ポイント ${point}！ 勝ち！`); setMessageType('win'); setPoint(null); setPhase('comeout') }
      else if (sum === 7) { setMessage(`セブンアウト！ 負け`); setMessageType('lose'); setPoint(null); setPhase('comeout') }
      else { setMessage(`ロール ${sum}`); setMessageType('info') }
    }
  }

  const dColor = (s: number) => s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d'

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3"><span className="text-2xl">🎲</span><h1 className="text-xl font-bold text-white">クラップス</h1></div>
        <div className="flex items-center gap-2"><ChipDisplay value={balance} size={28} /><span className="text-sm font-bold text-white">${balance.toLocaleString()}</span></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center gap-6 mb-4">
          {dice.map((val, i) => (
            <div key={i} style={{ width: 64, height: 64, borderRadius: 10, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 6 }}>
              {[1, 2, 3, 4, 5, 6].map(p => (
                <div key={p} style={{ width: 12, height: 12, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dotVisible(val, p) ? 'visible' : 'hidden' }} />
              ))}
            </div>
          ))}
        </div>
        {lastRoll !== null && <div className="text-center mb-3"><span className="text-2xl font-bold" style={{ color: dColor(lastRoll) }}>{lastRoll}</span></div>}
        {point && <div className="flex justify-center mb-3"><div style={{ background: '#f4a81d', color: '#1e293b', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span>⏺</span> POINT {point}</div></div>}
        <div className="flex justify-center"><div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '2px 10px', display: 'flex', alignItems: 'center', gap: 4 }}><span className="text-xs text-white">Pass Line</span><ChipDisplay value={passBet} size={18} /></div></div>
      </div>
      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : messageType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}
      <div className="flex mt-4 justify-center">
        <button onClick={roll} disabled={rolling} className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">{rolling ? '振っている...' : '🎲 ロール！'}</button>
      </div>
    </div>
  )
}

function dotVisible(val: number, pos: number): boolean {
  const dots: Record<number, number[]> = { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }
  return dots[val]?.includes(pos) ?? false
}

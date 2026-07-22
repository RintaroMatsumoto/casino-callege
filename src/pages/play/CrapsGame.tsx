import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

let injected = false

export default function CrapsGame() {
  useEffect(() => {
    if (injected) return; injected = true
    const s = document.createElement('style')
    s.textContent = `
@keyframes diceShake { 0% { transform: rotate(0deg); } 25% { transform: rotate(12deg) scale(1.05); } 75% { transform: rotate(-12deg) scale(1.05); } 100% { transform: rotate(0deg); } }
@keyframes chipDrop { 0% { transform: translateY(-40px) scale(0); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`
    document.head.appendChild(s)
  }, [])

  const [balance, setBalance] = useState(1000)
  const [dice, setDice] = useState<[number, number]>([1, 1])
  const [rolling, setRolling] = useState(false)
  const [phase, setPhase] = useState<'bet' | 'comeout' | 'point' | 'result'>('bet')
  const [point, setPoint] = useState<number | null>(null)
  const [message, setMessage] = useState('「ロール」でスタート')
  const [msgType, setMsgType] = useState<'win' | 'lose' | 'info'>('info')
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [result, setResult] = useState<{ sum: number; win: boolean; net: number; label: string } | null>(null)

  const roll = () => {
    if (rolling || phase === 'bet' || phase === 'result') return
    setRolling(true)
    let count = 0
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
      count++
      if (count >= 8) { clearInterval(interval); const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1; setDice([d1, d2]); resolve(d1 + d2); setRolling(false) }
    }, 70)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum)
    if (phase === 'comeout') {
      if (sum === 7 || sum === 11) { setBalance(b => b + 20); setResult({ sum, win: true, net: 10, label: `ナチュラル ${sum}` }); setMessage(`+$10！`); setMsgType('win'); setPhase('result') }
      else if (sum === 2 || sum === 3 || sum === 12) { setResult({ sum, win: false, net: -10, label: `クラップス ${sum}` }); setMessage(`-$10`); setMsgType('lose'); setPhase('result') }
      else { setPoint(sum); setPhase('point'); setMessage(`ポイント ${sum}`); setMsgType('info') }
    } else {
      if (sum === point) { setBalance(b => b + 20); setResult({ sum, win: true, net: 10, label: `ポイント ${point}！` }); setMessage(`+$10！`); setMsgType('win'); setPhase('result') }
      else if (sum === 7) { setResult({ sum, win: false, net: -10, label: 'セブンアウト' }); setMessage(`-$10`); setMsgType('lose'); setPhase('result') }
      else { setMessage(`ロール ${sum}`); setMsgType('info') }
    }
  }

  const startGame = () => { setPhase('comeout'); setBalance(b => b - 10); setResult(null); roll() }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-xl">🎲</span><h1 className="text-base font-bold text-white">クラップス</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 12, left: '50%', marginLeft: -45, width: 90, height: 50, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[8px] text-white/20">PASS LINE</span></div>
        {(phase === 'comeout' || phase === 'point') && <div style={{ position: 'absolute', bottom: 28, left: '50%', marginLeft: -15, zIndex: 5, animation: 'chipDrop 0.3s ease-out' }}><div style={{ width: 30, height: 30, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#1e293b' }}>10</div></div>}
        {point && <div style={{ position: 'absolute', top: 8, left: '50%', marginLeft: -28, background: '#f4a81d', color: '#1e293b', padding: '2px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700, zIndex: 5 }}>⏺ {point}</div>}
        <div className="flex justify-center gap-4 mb-2" style={{ marginTop: point ? 28 : 0 }}>
          {dice.map((val, i) => <div key={i} style={{ width: 56, height: 56, borderRadius: 8, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 5, animation: rolling ? 'diceShake 0.08s linear infinite' : 'none' }}>
            {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: 10, height: 10, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dotV(val, p) ? 'visible' : 'hidden' }} />)}
          </div>)}
        </div>
        {lastRoll !== null && <div className="text-center" style={{ fontSize: 24, fontWeight: 700, color: dColor(lastRoll), marginBottom: 4 }}>{lastRoll}</div>}
        {result && <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center justify-center gap-2 mb-1">{result.win ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}<span className={`text-sm font-bold ${result.win ? 'text-emerald-400' : 'text-red-400'}`}>{result.win ? 'WIN' : 'LOSE'}</span></div>
          <div className="text-center text-xs text-casino-muted">{result.label}<br />$10→${result.win ? '20' : '0'} ({result.win ? '+$10' : '-$10'})</div>
        </div>}
      </div>
      {message && <div className={`mt-2 text-center text-xs font-bold ${msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}
      <div className="flex gap-2 mt-3 justify-center">
        {phase === 'bet' && <button onClick={startGame} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">Pass Line $10</button>}
        {phase !== 'bet' && phase !== 'result' && <button onClick={roll} disabled={rolling} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">{rolling ? '...' : '🎲 ロール'}</button>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setPoint(null); setResult(null); setMessage('「ロール」でスタート') }} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button>}
      </div>
    </div>
  )
}

function dotV(val: number, pos: number): boolean {
  return { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }[val]?.includes(pos) ?? false
}
function dColor(s: number) { return s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d' }

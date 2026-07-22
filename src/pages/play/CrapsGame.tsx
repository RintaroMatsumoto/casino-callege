import { useState, useEffect } from 'react'
import { ChipTray, PayoutBox } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

export default function CrapsGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes dShake { 0% { transform: rotate(0deg); } 25% { transform: rotate(10deg); } 75% { transform: rotate(-10deg); } 100% { transform: rotate(0deg); } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [dice, setDice] = useState<[number, number]>([1, 1])
  const [rolling, setRolling] = useState(false)
  const [phase, setPhase] = useState<'bet' | 'comeout' | 'point' | 'result'>('bet')
  const [point, setPoint] = useState<number | null>(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<string>('info')
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [result, setResult] = useState<{ sum: number; win: boolean; net: number; payout: number; label: string; odds: string } | null>(null)
  const [call, setCall] = useState<string | null>(null)
  const [puckOn, setPuckOn] = useState(false)

  const CALLS: Record<number, string> = { 2: 'Aces! Snake eyes!', 3: 'Three! Yo!', 7: 'Seven! Front line winner!', 11: 'Yo-leven!', 12: 'Boxcars! Midnight!' }

  const roll = () => {
    if (rolling || phase === 'bet' || phase === 'result') return
    setRolling(true); let c = 0
    const iv = setInterval(() => { setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]); c++; if (c >= 8) { clearInterval(iv); const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1; setDice([d1, d2]); resolve(d1 + d2); setRolling(false) } }, 70)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum); setCall(CALLS[sum] || sum + '!')
    if (phase === 'comeout') {
      if (sum === 7 || sum === 11) { setBalance(b => b + bet * 2); setResult({ sum, win: true, net: bet, payout: bet * 2, label: 'ナチュラル ' + sum, odds: '1:1' }); setMsg('+$' + bet); setMsgType('win'); setPhase('result') }
      else if (sum === 2 || sum === 3 || sum === 12) { setResult({ sum, win: false, net: -bet, payout: 0, label: 'クラップス ' + sum, odds: '-' }); setMsg('-$' + bet); setMsgType('lose'); setPhase('result') }
      else { setPoint(sum); setPuckOn(true); setPhase('point'); setMsg('ポイント ' + sum) }
    } else {
      if (sum === point) { setBalance(b => b + bet * 2); setResult({ sum, win: true, net: bet, payout: bet * 2, label: 'ポイント ' + point + '!', odds: '1:1' }); setMsg('+$' + bet); setMsgType('win'); setPhase('result'); setPuckOn(false) }
      else if (sum === 7) { setResult({ sum, win: false, net: -bet, payout: 0, label: 'セブンアウト', odds: '-' }); setMsg('-$' + bet); setMsgType('lose'); setPhase('result'); setPuckOn(false) }
      else { setMsg('ロール ' + sum) }
    }
  }

  const startGame = () => { setPhase('comeout'); setBalance(b => b - bet); setResult(null) }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><span className="text-xl">🎲</span><h1 className="text-base font-bold text-white">クラップス</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {phase === 'bet' && <div className="mb-1"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} /></div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 14, padding: 20, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 12, left: '50%', marginLeft: -45, width: 90, height: 50, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
          <span className="text-[7px] text-white/20">PASS</span>
          {phase !== 'bet' && <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#1e293b' }}>{bet}</div>}
        </div>
        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 50, height: 18, borderRadius: 4, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[6px] text-white/30">STICK</span></div>
        {point && <div style={{ position: 'absolute', top: 26, left: '50%', marginLeft: -20, background: puckOn ? '#f4a81d' : '#64748b', color: '#1e293b', padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 700, zIndex: 5, display: 'flex', alignItems: 'center', gap: 3 }}><span>{puckOn ? 'ON' : 'OFF'}</span> {point}</div>}

        <div className="flex justify-center gap-4" style={{ marginTop: point ? 46 : 20 }}>
          {dice.map((val, i) => <div key={i} style={{ width: 52, height: 52, borderRadius: 8, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 4, animation: rolling ? 'dShake 0.08s linear infinite' : 'none' }}>
            {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: 9, height: 9, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dV(val, p) ? 'visible' : 'hidden' }} />)}
          </div>)}
        </div>
        {lastRoll !== null && <div className="text-center" style={{ fontSize: 22, fontWeight: 700, color: dC(lastRoll), marginTop: 2 }}>{lastRoll}</div>}
        {call && <div className="text-center text-xs font-bold text-casino-gold animate-pulse">{call}</div>}

        {result && <div className="mt-3 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {result.win ? <PayoutBox label={result.label} bet={bet} odds={result.odds} payout={result.payout} net={result.net} /> :
            <div className="text-center text-xs text-red-400"><div className="font-bold">LOSE</div><div>{result.label}</div><div> -${bet} </div></div>}
        </div>}
      </div>

      {msg && <div className={'mt-1 text-center text-xs font-bold ' + (msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold')}>{msg}</div>}

      <div className="flex gap-2 mt-2 justify-center">
        {phase === 'bet' && <button onClick={startGame} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">Pass ${bet}</button>}
        {phase !== 'bet' && phase !== 'result' && <button onClick={roll} disabled={rolling} className="px-6 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">{rolling ? '...' : '🎲 ロール'}</button>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setPoint(null); setResult(null); setCall(null) }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button>}
      </div>
    </div>
  )
}

function dV(val: number, p: number) { return ({ 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] })[val]?.includes(p) ?? false }
function dC(s: number) { return s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d' }

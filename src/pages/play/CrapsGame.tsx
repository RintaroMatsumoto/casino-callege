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
  const [betType, setBetType] = useState<'pass' | 'dontpass'>('pass')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<string>('info')
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [result, setResult] = useState<{ sum: number; win: boolean; net: number; payout: number; label: string; odds: string } | null>(null)
  const [call, setCall] = useState<string | null>(null)
  const [puckOn, setPuckOn] = useState(false)

  const CALLS: Record<number, string> = { 2: 'Aces!', 3: 'Yo!', 7: 'Seven!', 11: 'Yo-leven!', 12: 'Boxcars!' }
  const WIN_C = { pass: [7, 11] as number[], lose: [2, 3, 12] as number[] }
  const WIN_D = { pass: [2, 3] as number[], lose: [7, 11, 12] as number[] } // don't pass

  const roll = () => {
    if (rolling || phase === 'bet' || phase === 'result') return
    setRolling(true); let c = 0
    const iv = setInterval(() => { setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]); c++; if (c >= 8) { clearInterval(iv); const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1; setDice([d1, d2]); resolve(d1 + d2); setRolling(false) } }, 70)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum); setCall(CALLS[sum] || sum + '!')
    const winNums = betType === 'pass' ? WIN_C.pass : WIN_D.pass
    const loseNums = betType === 'pass' ? WIN_C.lose : WIN_D.lose

    if (phase === 'comeout') {
      if (winNums.includes(sum)) { setBalance(b => b + bet * 2); setResult({ sum, win: true, net: bet, payout: bet * 2, label: (betType === 'pass' ? 'ナチュラル' : 'ドントパス') + ' ' + sum, odds: '1:1' }); setMsg('+$' + bet); setMsgType('win'); setPhase('result') }
      else if (loseNums.includes(sum) || (betType === 'dontpass' && sum === 12)) { setResult({ sum, win: false, net: -bet, payout: 0, label: (betType === 'pass' ? 'クラップス' : 'パス') + ' ' + sum, odds: '-' }); setMsg('-$' + bet); setMsgType('lose'); setPhase('result') }
      else { setPoint(sum); setPuckOn(true); setPhase('point'); setMsg(betType === 'pass' ? 'ポイント ' + sum : 'ドント ポイント ' + sum) }
    } else {
      if (betType === 'pass' && sum === point) { setBalance(b => b + bet * 2); setResult({ sum, win: true, net: bet, payout: bet * 2, label: 'ポイント ' + point + '!', odds: '1:1' }); setMsg('+$' + bet); setMsgType('win'); setPhase('result'); setPuckOn(false) }
      else if (betType === 'pass' && sum === 7) { setResult({ sum, win: false, net: -bet, payout: 0, label: 'セブンアウト', odds: '-' }); setMsg('-$' + bet); setMsgType('lose'); setPhase('result'); setPuckOn(false) }
      else if (betType === 'dontpass' && sum === 7) { setBalance(b => b + bet * 2); setResult({ sum, win: true, net: bet, payout: bet * 2, label: 'ドントパス 7!', odds: '1:1' }); setMsg('+$' + bet); setMsgType('win'); setPhase('result'); setPuckOn(false) }
      else if (betType === 'dontpass' && sum === point) { setResult({ sum, win: false, net: -bet, payout: 0, label: 'ポイント ' + point, odds: '-' }); setMsg('-$' + bet); setMsgType('lose'); setPhase('result'); setPuckOn(false) }
      else { setMsg('ロール ' + sum) }
    }
  }

  const startGame = (type: 'pass' | 'dontpass') => { setBetType(type); setPhase('comeout'); setBalance(b => b - bet); setResult(null) }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><span className="text-xl">🎲</span><h1 className="text-base font-bold text-white">クラップス</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {phase === 'bet' && <div className="mb-1"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} />
        <div className="flex gap-2 mt-1"><button onClick={() => startGame('pass')} className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">Pass Line ${bet}</button><button onClick={() => startGame('dontpass')} className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">Don't Pass ${bet}</button></div>
      </div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 14, padding: 20, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 12, left: '50%', marginLeft: -40, width: 80, height: 46, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
          <span className="text-[6px] text-white/20">{betType === 'pass' ? 'PASS' : "DON'T"}</span>
          {phase !== 'bet' && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#1e293b' }}>{bet}</div>}
        </div>
        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 46, height: 16, borderRadius: 3, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[5px] text-white/30">STICK</span></div>
        {point && <div style={{ position: 'absolute', top: 24, left: '50%', marginLeft: -18, background: puckOn ? '#f4a81d' : '#64748b', color: '#1e293b', padding: '1px 7px', borderRadius: 8, fontSize: 8, fontWeight: 700, zIndex: 5, display: 'flex', alignItems: 'center', gap: 2 }}><span style={{ fontSize: 7 }}>{puckOn ? 'ON' : 'OFF'}</span> {point}</div>}

        <div className="flex justify-center gap-4" style={{ marginTop: point ? 42 : 18 }}>
          {dice.map((val, i) => <div key={i} style={{ width: 48, height: 48, borderRadius: 6, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 4, animation: rolling ? 'dShake 0.08s linear infinite' : 'none' }}>
            {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: 8, height: 8, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dV(val, p) ? 'visible' : 'hidden' }} />)}
          </div>)}
        </div>
        {lastRoll !== null && <div className="text-center" style={{ fontSize: 20, fontWeight: 700, color: dC(lastRoll), marginTop: 2 }}>{lastRoll}</div>}
        {call && <div className="text-center text-[10px] font-bold text-casino-gold animate-pulse">{call}</div>}

        {result && <div className="mt-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {result.win ? <PayoutBox label={result.label} bet={bet} odds={result.odds} payout={result.payout} net={result.net} /> :
            <div className="text-center text-xs text-red-400"><div className="font-bold">LOSE</div><div>{result.label}</div><div> -${bet} </div></div>}
        </div>}
      </div>
      {msg && <div className={'mt-1 text-center text-xs font-bold ' + (msgType === 'win' ? 'text-emerald-400' : msgType === 'lose' ? 'text-red-400' : 'text-casino-gold')}>{msg}</div>}
      <div className="flex gap-2 mt-2 justify-center">
        {phase !== 'bet' && phase !== 'result' && <button onClick={roll} disabled={rolling} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">{rolling ? '...' : '🎲 ロール'}</button>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setPoint(null); setResult(null); setCall(null) }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button>}
      </div>
    </div>
  )
}

function dV(val: number, p: number) { return ({ 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] })[val]?.includes(p) ?? false }
function dC(s: number) { return s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d' }

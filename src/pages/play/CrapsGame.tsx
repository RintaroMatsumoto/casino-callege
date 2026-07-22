import { useState, useEffect } from 'react'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

export default function CrapsGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes dShake { 0% { transform: rotate(0deg); } 25% { transform: rotate(12deg); } 75% { transform: rotate(-12deg); } 100% { transform: rotate(0deg); } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(INIT_BALANCE)
  const [bet, setBet] = useState(10000)
  const [dice, setDice] = useState<[number, number]>([1, 1])
  const [rolling, setRolling] = useState(false)
  const [phase, setPhase] = useState<'bet' | 'comeout' | 'point' | 'result'>('bet')
  const [point, setPoint] = useState<number | null>(null)
  const [betType, setBetType] = useState<'pass' | 'dontpass'>('pass')
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [res, setRes] = useState<{ sum: number; win: boolean; net: number; payout: number; label: string; odds: string } | null>(null)
  const [call, setCall] = useState<string | null>(null)
  const [puckOn, setPuckOn] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)

  const STEPS = ['ベット', 'カムアウト', 'ポイント', '結果']
  const CALLS: Record<number, string> = { 2: 'Aces!', 3: 'Yo!', 7: 'Seven!', 11: 'Yo-leven!', 12: 'Boxcars!' }

  const roll = () => {
    if (rolling || phase === 'bet' || phase === 'result') return
    setRolling(true); let c = 0; setStepIdx(phase === 'comeout' ? 1 : 2)
    const iv = setInterval(() => { setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]); c++; if (c >= 8) { clearInterval(iv); const d1 = Math.floor(Math.random() * 6) + 1, d2 = Math.floor(Math.random() * 6) + 1; setDice([d1, d2]); resolve(d1 + d2); setRolling(false) } }, 70)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum); setCall(CALLS[sum] || sum + '!')
    if (phase === 'comeout') {
      if ((betType === 'pass' && (sum === 7 || sum === 11)) || (betType === 'dontpass' && (sum === 2 || sum === 3))) { setBalance(b => b + bet * 2); setRes({ sum, win: true, net: bet, payout: bet * 2, label: (betType === 'pass' ? 'ナチュラル' : 'ドントパス') + ' ' + sum, odds: '1:1' }); setPhase('result'); setStepIdx(3) }
      else if ((betType === 'pass' && (sum === 2 || sum === 3 || sum === 12)) || (betType === 'dontpass' && (sum === 7 || sum === 11))) { setRes({ sum, win: false, net: -bet, payout: 0, label: '負け ' + sum, odds: '-' }); setPhase('result'); setStepIdx(3) }
      else if (betType === 'dontpass' && sum === 12) { setBalance(b => b + bet); setRes({ sum, win: false, net: 0, payout: bet, label: '12 プッシュ(引き分け)', odds: '-' }); setPhase('result'); setStepIdx(3) }
      else { setPoint(sum); setPuckOn(true); setPhase('point'); setStepIdx(2) }
    } else {
      if ((betType === 'pass' && sum === point) || (betType === 'dontpass' && sum === 7)) { setBalance(b => b + bet * 2); setRes({ sum, win: true, net: bet, payout: bet * 2, label: betType === 'pass' ? 'ポイント ' + point + '!' : 'ドントパス 7!', odds: '1:1' }); setPhase('result'); setStepIdx(3); setPuckOn(false) }
      else if ((betType === 'pass' && sum === 7) || (betType === 'dontpass' && sum === point)) { setRes({ sum, win: false, net: -bet, payout: 0, label: betType === 'pass' ? 'セブンアウト' : 'ポイント ' + point, odds: '-' }); setPhase('result'); setStepIdx(3); setPuckOn(false) }
    }
  }

  const startGame = (t: 'pass' | 'dontpass') => { setBetType(t); setPhase('comeout'); setBalance(b => b - bet); setRes(null); setStepIdx(1) }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3"><span className="text-2xl">🎲</span><h1 className="text-lg font-bold text-white">クラップス</h1></div>
        <div className="text-right"><div className="text-base font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      <PhaseBadge phase={phase} steps={STEPS} current={stepIdx} />
      {phase === 'bet' && <div className="mb-2"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} />
        <TipBox text="カムアウトロール: 7か11なら勝ち、2/3/12なら負け。それ以外はポイント成立。ポイント後に7が出ると「セブンアウト」で負け。" />
        <div className="flex gap-2 mt-2"><button onClick={() => startGame('pass')} className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">Pass Line ${bet.toLocaleString()}</button><button onClick={() => startGame('dontpass')} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">Don't Pass ${bet.toLocaleString()}</button></div>
      </div>}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 24, border: '4px solid #3d2b1f', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', marginLeft: -50, width: 100, height: 60, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
          <span className="text-[8px] text-white/20">{betType === 'pass' ? 'PASS LINE' : "DON'T PASS"}</span>
          {phase !== 'bet' && <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#1e293b' }}>{bet >= 1000 ? (bet/1000).toFixed(0)+'K' : bet}</div>}
        </div>
        <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 60, height: 22, borderRadius: 4, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[7px] text-white/30 font-bold">STICKMAN</span></div>
        {point && <div style={{ position: 'absolute', top: 32, left: '50%', marginLeft: -24, background: puckOn ? '#f4a81d' : '#64748b', color: '#1e293b', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700, zIndex: 5, display: 'flex', alignItems: 'center', gap: 3 }}><span>{puckOn ? 'ON' : 'OFF'}</span> {point}</div>}

        <div className="flex justify-center gap-6" style={{ marginTop: point ? 55 : 24 }}>
          {dice.map((val, i) => <div key={i} style={{ width: 60, height: 60, borderRadius: 8, background: '#fff', border: '2px solid #94a3b8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 5, animation: rolling ? 'dShake 0.08s linear infinite' : 'none' }}>
            {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: 10, height: 10, borderRadius: '50%', background: '#1e293b', alignSelf: 'center', justifySelf: 'center', visibility: dV(val, p) ? 'visible' : 'hidden' }} />)}
          </div>)}
        </div>
        {lastRoll !== null && <div className="text-center" style={{ fontSize: 28, fontWeight: 700, color: dC(lastRoll), marginTop: 4 }}>{lastRoll}</div>}
        {call && <div className="text-center text-sm font-bold text-casino-gold animate-pulse">{call}</div>}

        {res && <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {res.win ? <PayoutBox label={res.label} bet={bet} odds={res.odds} payout={res.payout} net={res.net} /> :
            <div className="text-center text-sm text-red-400"><div className="font-bold text-base">LOSE</div><div>{res.label}</div><div className="text-lg font-bold mt-1"> -${bet.toLocaleString()} </div></div>}
        </div>}
      </div>

      <div className="flex gap-3 mt-3 justify-center">
        {phase !== 'bet' && phase !== 'result' && <button onClick={roll} disabled={rolling} className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm disabled:opacity-30">{rolling ? '振っている...' : '🎲 ロール！'}</button>}
        {phase === 'result' && <button onClick={() => { setPhase('bet'); setPoint(null); setRes(null); setCall(null); setStepIdx(0) }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-sm"><RotateCcw size={16} /> もう一度</button>}
      </div>
      {phase === 'point' && <TipBox text={`ポイントは${point}。${point}が出れば勝ち、7が出ればセブンアウトで負け。7が出る確率は約16.7%。`} />}
    </div>
  )
}

function dV(val: number, p: number) { return ({ 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] })[val]?.includes(p) ?? false }
function dC(s: number) { return s === 7 || s === 11 ? '#22c55e' : s === 2 || s === 3 || s === 12 ? '#ef4444' : '#f4a81d' }

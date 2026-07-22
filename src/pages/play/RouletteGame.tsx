import { useState, useEffect } from 'react'
import { ChipTray, PayoutBox } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const NUM = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])

const BETS = [
  { id: 'straight', label: 'ストレート', payout: 35, desc: '単一数字' },
  { id: 'split', label: 'スプリット', payout: 17, desc: '2数字間' },
  { id: 'street', label: 'ストリート', payout: 11, desc: '3数字列' },
  { id: 'corner', label: 'コーナー', payout: 8, desc: '4数字交差点' },
  { id: 'sixline', label: 'シックスライン', payout: 5, desc: '6数字' },
  { id: 'red', label: '赤', payout: 1 }, { id: 'black', label: '黒', payout: 1 },
  { id: 'even', label: '偶数', payout: 1 }, { id: 'odd', label: '奇数', payout: 1 },
  { id: 'low', label: '1-18', payout: 1 }, { id: 'high', label: '19-36', payout: 1 },
  { id: 'dozen1', label: '1st12', payout: 2 }, { id: 'dozen2', label: '2nd12', payout: 2 }, { id: 'dozen3', label: '3rd12', payout: 2 },
]

let injected = false

export default function RouletteGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes rChip { 0% { transform: scale(0) translateY(-20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [selected, setSelected] = useState<string>('red')
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<{ num: number; win: boolean; net: number; payout: number; odds: string } | null>(null)
  const [msg, setMsg] = useState('')

  const spin = () => {
    if (spinning || selected === null || bet > balance) return
    setSpinning(true); setBalance(b => b - bet)
    const idx = Math.floor(Math.random() * NUM.length), num = NUM[idx]
    setRotation(r => r + 360 * 5 + idx / NUM.length * 360)
    setTimeout(() => {
      const isRed = REDS.has(num)
      const winMap: Record<string, boolean> = {
        red: isRed, black: !isRed && num !== 0, even: num !== 0 && num % 2 === 0, odd: num % 2 === 1,
        low: num >= 1 && num <= 18, high: num >= 19 && num <= 36,
        dozen1: num >= 1 && num <= 12, dozen2: num >= 13 && num <= 24, dozen3: num >= 25 && num <= 36,
      }
      const bt = BETS.find(b => b.id === selected)
      const odds = bt ? bt.payout : 1
      const win = winMap[selected] || false
      const pay = win ? bet * (odds + 1) : 0; const net = win ? bet * odds : -bet
      if (win) setBalance(b => b + pay)
      setResult({ num, win, net, payout: pay, odds: odds + ':1' }); setMsg(win ? '+' + net : '-' + bet); setSpinning(false)
    }, 3000)
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><span className="text-xl">🎡</span><h1 className="text-base font-bold text-white">ルーレット</h1></div>
        <div className="text-right"><div className="text-sm font-bold text-white">${balance.toLocaleString()}</div></div>
      </div>
      {!spinning && !result && <div className="mb-1"><ChipTray balance={balance} bet={bet} onBet={(v) => { if (v <= balance) setBet(v) }} /></div>}

      {/* Bet type selector */}
      <div className="flex gap-1 mb-1 flex-wrap">
        {BETS.filter(b => ['straight', 'split', 'street', 'corner', 'sixline', 'red', 'black', 'even', 'odd'].includes(b.id)).map(o => (
          <div key={o.id} onClick={() => setSelected(o.id)}
            style={{ background: selected === o.id ? '#f4a81d' : (o.id === 'red' ? '#dc2626' : o.id === 'black' ? '#1e293b' : '#334155'), color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 7, fontWeight: 700, cursor: 'pointer', border: '1px solid #475569' }}>
            {o.label}<span style={{ fontSize: 6, opacity: 0.7, marginLeft: 1 }}>{o.payout}:1</span>
          </div>
        ))}
      </div>

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 14, padding: 10, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center mb-2"><div style={{ width: 150, height: 150, position: 'relative' }}>
          <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%', transform: 'rotate(' + rotation + 'deg)', transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
            <circle cx="160" cy="160" r="158" fill="#4a3020" /><circle cx="160" cy="160" r="140" fill="none" stroke="#2a1a0f" strokeWidth="8" />
            {NUM.map((n, i) => { const a = (i * 360 / 37 - 90) * Math.PI / 180, b = ((i + 1) * 360 / 37 - 90) * Math.PI / 180; return <polygon key={n} points={`${160 + 135 * Math.cos(a)},${160 + 135 * Math.sin(a)} ${160 + 135 * Math.cos(b)},${160 + 135 * Math.sin(b)} ${160 + 95 * Math.cos(b)},${160 + 95 * Math.sin(b)} ${160 + 95 * Math.cos(a)},${160 + 95 * Math.sin(a)}`} fill={n === 0 ? '#16a34a' : REDS.has(n) ? '#dc2626' : '#1e293b'} /> })}
            {NUM.map((n, i) => <text key={n} x={160 + 115 * Math.cos((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} y={160 + 115 * Math.sin((i * 360 / 37 + 360 / 74 - 90) * Math.PI / 180)} fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="central">{n}</text>)}
          </svg>
          <div style={{ position: 'absolute', top: -6, left: '50%', marginLeft: -4, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '8px solid #f4a81d', zIndex: 10 }} />
        </div></div>

        {/* Number grid */}
        <div className="grid grid-cols-12 gap-0.5 mb-2 max-w-sm mx-auto">
          <div style={{ background: '#16a34a', color: '#fff', textAlign: 'center', fontSize: 8, fontWeight: 700, padding: '3px 0', borderRadius: 2, cursor: 'pointer' }} onClick={() => setSelected('straight')}>0</div>
          {Array.from({ length: 36 }, (_, i) => i + 1).map(n => <div key={n} onClick={() => setSelected('straight')} style={{ background: REDS.has(n) ? '#dc2626' : '#1e293b', color: '#fff', textAlign: 'center', fontSize: 7, fontWeight: 700, padding: '4px 0', borderRadius: 2, cursor: 'pointer', opacity: selected === 'red' && REDS.has(n) ? 1 : selected === 'black' && !REDS.has(n) ? 1 : selected === 'straight' ? 1 : 0.4 }}>{n}</div>)}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {BETS.filter(b => ['red', 'black', 'even', 'odd', 'low', 'high', 'dozen1', 'dozen2', 'dozen3'].includes(b.id)).map(o => (
            <div key={o.id} onClick={() => setSelected(o.id)} style={{ background: selected === o.id ? '#f4a81d' : (o.id === 'red' ? '#dc2626' : '#334155'), color: '#fff', padding: '3px 7px', borderRadius: 3, fontSize: 7, fontWeight: 700, cursor: 'pointer', border: '1px solid #475569' }}>{o.label}<span style={{ fontSize: 6, opacity: 0.7, marginLeft: 1 }}>{o.payout}:1</span></div>))}
        </div>

        {selected && !spinning && !result && <div className="flex justify-center mt-2" style={{ animation: 'rChip 0.3s ease-out' }}><div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f8fafc', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#1e293b' }}>{bet}</div></div>}

        {result && !spinning && <div className="mt-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          {result.win ? <PayoutBox label={result.num + ' (' + (result.num === 0 ? 'Green' : REDS.has(result.num) ? 'Red' : 'Black') + ')'} bet={bet} odds={result.odds} payout={result.payout} net={result.net} /> :
            <div className="text-center text-xs text-red-400"><div className="font-bold">LOSE</div><div>{result.num}</div><div> -${bet} </div></div>}
        </div>}

        {/* Result highlight on grid */}
        {result && !spinning && <div className="text-center text-[9px] font-bold text-white mt-1">結果: {result.num}</div>}
      </div>
      {msg && <div className={'mt-1 text-center text-xs font-bold ' + (result?.win ? 'text-emerald-400' : 'text-red-400')}>{msg}</div>}
      <div className="flex gap-2 mt-2 justify-center">
        <button onClick={spin} disabled={spinning || selected === null || bet > balance} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30">{spinning ? '回転中' : 'スピン'}</button>
        {result && !spinning && <button onClick={() => { setResult(null); setMsg('') }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-casino-card border border-casino-border text-casino-muted text-xs"><RotateCcw size={12} /> 次</button>}
      </div>
    </div>
  )
}

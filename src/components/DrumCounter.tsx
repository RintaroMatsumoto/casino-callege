import { useEffect, useState } from 'react'

const COUNTER_KEY = 'cc-counter'

function Digit({ value }: { value: number }) {
  return (
    <div className="relative w-10 h-14 bg-gradient-to-b from-casino-royal to-[#1a1a35] rounded border border-casino-border overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-black/20 border-b border-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white font-mono tracking-wider"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {value}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/5 to-transparent" />
    </div>
  )
}

export default function DrumCounter() {
  const [count, setCount] = useState(0)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // この端末だけでカウント（サーバー不要）
    const stored = parseInt(localStorage.getItem(COUNTER_KEY) || '0')
    const newCount = stored + 1
    setCount(newCount)
    localStorage.setItem(COUNTER_KEY, String(newCount))
  }, [])

  useEffect(() => {
    if (count > 0) { setAnimated(true); const t = setTimeout(() => setAnimated(false), 600); return () => clearTimeout(t) }
  }, [count])

  const digits = String(count).padStart(5, '0').split('').map(Number)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {digits.map((d, i) => (
          <div key={i} className={`transition-transform duration-300 ${animated ? 'scale-105' : 'scale-100'}`}>
            <Digit value={d} />
          </div>
        ))}
      </div>
      <span className="text-[9px] text-casino-muted tracking-widest uppercase font-semibold">Your Visits</span>
    </div>
  )
}

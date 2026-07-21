import { useEffect, useState } from 'react'

function Digit({ value }: { value: number }) {
  return (
    <div className="relative w-10 h-14 bg-gradient-to-b from-casino-royal to-[#1a1a35] rounded border border-casino-border overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-black/20 border-b border-black/30" />
      <div className="absolute inset-x-0 flex items-center justify-center h-full">
        <span className="text-2xl font-bold text-white font-mono tracking-wider" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {value}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/5 to-transparent" />
    </div>
  )
}

export default function DrumCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/counter', { method: 'POST' })
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => {
        // fallback: read-only
        fetch('/api/counter')
          .then(r => r.json())
          .then(d => setCount(d.count))
          .catch(() => setCount(0))
      })
  }, [])

  if (count === null) return null

  const digits = String(count).padStart(5, '0').split('').map(Number)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {digits.map((d, i) => (
          <Digit key={i} value={d} />
        ))}
      </div>
      <span className="text-[9px] text-casino-muted tracking-widest uppercase font-semibold">Total Visitors</span>
    </div>
  )
}

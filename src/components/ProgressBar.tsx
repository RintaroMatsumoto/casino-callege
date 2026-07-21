import { useMemo } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useLocation } from 'react-router-dom'
import { CheckCircle, Circle, BookOpen } from 'lucide-react'

const TOTAL_PHASES = 7

export default function ProgressBar() {
  const { user } = useAuth()
  const location = useLocation()

  const progress = useMemo(() => {
    if (!user) return { visited: [], pct: 0, streak: 0 }
    const visited: string[] = []
    for (let i = 0; i < TOTAL_PHASES; i++) {
      const key = `cc-progress-${i}`
      const stored = JSON.parse(localStorage.getItem(key) || '{}')
      if (stored.visited) visited.push(String(i))
    }
    return { visited, pct: Math.round((visited.length / TOTAL_PHASES) * 100), streak: 0 }
  }, [user, location.pathname])

  if (!user) return null

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-casino-card/30 border border-casino-border">
      <BookOpen size={14} className="text-casino-gold shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-[10px] text-casino-muted mb-1">
          <span>Progress</span>
          <span>{progress.visited.length}/{TOTAL_PHASES} phases ({progress.pct}%)</span>
        </div>
        <div className="h-1.5 bg-casino-royal rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-casino-gold to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${progress.pct}%` }} />
        </div>
        <div className="flex gap-1 mt-1.5">
          {Array.from({ length: TOTAL_PHASES }, (_, i) => (
            progress.visited.includes(String(i))
              ? <CheckCircle key={i} size={10} className="text-casino-gold" />
              : <Circle key={i} size={10} className="text-casino-muted/30" />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react'

const contentModules: Record<string, () => Promise<{ default: string }>> = {
  'phase-0-fundamentals.md': () => import('../content/phase-0-fundamentals.md?raw'),
  'phase-1-blackjack.md': () => import('../content/phase-1-blackjack.md?raw'),
  'phase-2-roulette.md': () => import('../content/phase-2-roulette.md?raw'),
  'phase-3-craps.md': () => import('../content/phase-3-craps.md?raw'),
  'phase-4-poker.md': () => import('../content/phase-4-poker.md?raw'),
  'phase-5-baccarat.md': () => import('../content/phase-5-baccarat.md?raw'),
  'phase-6-other-career.md': () => import('../content/phase-6-other-career.md?raw'),
}

const phaseMeta: Record<string, { title: string; file: string; lessons: number; time: string; emoji: string }> = {
  '0': { title: 'Phase 0: 基礎 (Fundamentals)', file: 'phase-0-fundamentals.md', lessons: 12, time: '5.5h', emoji: '🏠' },
  '1': { title: 'Phase 1: Blackjack', file: 'phase-1-blackjack.md', lessons: 24, time: '11h', emoji: '🃏' },
  '2': { title: 'Phase 2: Roulette', file: 'phase-2-roulette.md', lessons: 15, time: '6.5h', emoji: '🎡' },
  '3': { title: 'Phase 3: Craps', file: 'phase-3-craps.md', lessons: 21, time: '9.5h', emoji: '🎲' },
  '4': { title: 'Phase 4: Poker', file: 'phase-4-poker.md', lessons: 12, time: '5h', emoji: '♠️' },
  '5': { title: 'Phase 5: Baccarat（バカラ）⭐ 世界最大のカジノゲーム', file: 'phase-5-baccarat.md', lessons: 15, time: '6h', emoji: '💎' },
  '6': { title: 'Phase 6: その他ゲーム + 実践・キャリア', file: 'phase-6-other-career.md', lessons: 12, time: '5h', emoji: '🎯' },
}

export default function PhasePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const meta = id ? phaseMeta[id] : null
  const currentIndex = id ? parseInt(id) : 0

  useEffect(() => {
    if (!meta) return
    setLoading(true)
    const loader = contentModules[meta.file]
    if (loader) {
      loader().then(m => setContent(m.default)).catch(() => setContent('# Not found')).finally(() => setLoading(false))
    } else {
      setContent('# Not found')
      setLoading(false)
    }
  }, [meta])

  useEffect(() => {
    if (meta) {
      const key = `cc-progress-${id}`
      const current = JSON.parse(localStorage.getItem(key) || '{}')
      if (!current.visited) {
        localStorage.setItem(key, JSON.stringify({ ...current, visited: true, lastVisit: Date.now() }))
      }
    }
  }, [id, meta])

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Phase not found</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">Dashboardに戻る</button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-casino-card/50 text-casino-muted hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{meta.emoji}</span>
            <h1 className="text-2xl font-bold text-white">{meta.title}</h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-casino-muted">
            <span className="flex items-center gap-1"><BookOpen size={12} /> {meta.lessons} lessons</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {meta.time}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-casino-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-casino-muted text-sm">Loading content...</p>
        </div>
      ) : (
        <div className="prose max-w-none animate-fadeIn">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-casino-border flex justify-between">
        {currentIndex > 0 ? (
          <button onClick={() => navigate(`/phase/${currentIndex - 1}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-casino-card hover:bg-casino-card/70 border border-casino-border text-white text-sm transition-colors">
            <ArrowLeft size={16} />
            ← Phase {currentIndex - 1}
          </button>
        ) : <div />}
        {currentIndex < 6 ? (
          <button onClick={() => navigate(`/phase/${currentIndex + 1}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-casino-gold/10 hover:bg-casino-gold/20 border border-casino-gold/30 text-casino-gold text-sm font-semibold transition-colors">
            Phase {currentIndex + 1} →
            <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={() => navigate('/quiz/6')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-casino-gold to-yellow-600 text-white text-sm font-bold transition-colors">
            <CheckCircle size={16} />
            最終試験に挑戦
          </button>
        )}
      </div>
    </div>
  )
}

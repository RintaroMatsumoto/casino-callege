import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { allPhases } from '../data/slides'
import SlideViewer from '../components/SlideViewer'

export default function PhasePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const idx = id ? parseInt(id) : 0
  const phase = idx >= 0 && idx < allPhases.length ? allPhases[idx] : null

  if (!phase) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Phase not found</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">Dashboardに戻る</button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 h-10 border-b border-casino-border flex items-center px-3 bg-casino-dark/80">
        <button onClick={() => navigate('/')} className="p-1 hover:bg-casino-card/50 rounded text-casino-muted hover:text-white mr-2">
          <ArrowLeft size={16} />
        </button>
        <span className="text-lg mr-1.5">{phase.emoji}</span>
        <span className="text-sm font-bold text-white">{phase.title}</span>
      </div>

      {/* Slide viewer */}
      <div className="flex-1 overflow-hidden">
        <SlideViewer
          phaseId={String(idx)}
          slides={phase.slides}
          phaseTitle={phase.title}
          phaseEmoji={phase.emoji}
        />
      </div>
    </div>
  )
}

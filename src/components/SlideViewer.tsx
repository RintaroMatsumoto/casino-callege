import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { illustrationMap } from './illustrations'
import type { PhaseSlides } from '../data/slides/types'

interface Props {
  phaseId: string
  slides: PhaseSlides['slides']
  phaseTitle: string
  phaseEmoji: string
}

const SLIDE_KEY_PREFIX = 'cc-slide-'

function getSlideProgress(phaseId: string): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(`${SLIDE_KEY_PREFIX}${phaseId}`) || '{}')
  } catch { return {} }
}

function saveSlideProgress(phaseId: string, progress: Record<string, boolean>) {
  localStorage.setItem(`${SLIDE_KEY_PREFIX}${phaseId}`, JSON.stringify(progress))
}

export default function SlideViewer({ phaseId, slides, phaseTitle, phaseEmoji }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [slideProg, setSlideProg] = useState<Record<string, boolean>>(() => getSlideProgress(phaseId))
  const contentRef = useRef<HTMLDivElement>(null)
  const total = slides.length
  const slide = slides[currentIdx]
  const doneCount = slides.filter(s => slideProg[s.id]).length
  const allDone = doneCount >= total

  const markDone = useCallback((id: string) => {
    setSlideProg(prev => {
      if (prev[id]) return prev
      const next = { ...prev, [id]: true }
      saveSlideProgress(phaseId, next)
      return next
    })
  }, [phaseId])

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= total) return
    setCurrentIdx(idx)
    markDone(slides[idx].id)
    contentRef.current?.scrollTo(0, 0)
  }, [total, slides, markDone])

  // Mark current slide as done
  useEffect(() => { if (slide) markDone(slide.id) }, [slide?.id, markDone])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1)
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(currentIdx + 1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIdx, goTo])

  if (!slide) return <div className="text-center py-20 text-casino-muted">No slides for this phase</div>

  const SVG = slide.svg ? illustrationMap[slide.svg] : null

  return (
    <div className="flex flex-col h-full">
      {/* Slide counter bar */}
      <div className="shrink-0 px-4 py-2 border-b border-casino-border bg-casino-dark/50">
        <div className="flex items-center justify-between text-[10px] text-casino-muted mb-1">
          <span>{doneCount}/{total}</span>
          <span className="flex items-center gap-1">{phaseEmoji} {phaseTitle}</span>
        </div>
        <div className="h-1 bg-casino-royal rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-casino-gold to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / total) * 100}%` }} />
        </div>
      </div>

      {/* Slide content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-4 md:p-8 animate-fadeIn">
        {/* SVG illustration */}
        {SVG && <div className="w-full max-w-2xl mb-6"><SVG /></div>}

        {/* Section tag */}
        <span className="text-[10px] text-casino-gold font-semibold tracking-wider bg-casino-gold/10 px-2 py-0.5 rounded uppercase mb-3">
          {slide.section}
        </span>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6 leading-tight">
          {slide.emoji && <span className="mr-2">{slide.emoji}</span>}{slide.title}
        </h2>

        {/* Bullet points */}
        <ul className="space-y-2.5 max-w-lg w-full">
          {slide.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-casino-text leading-relaxed">
              <span className="text-casino-gold mt-1 shrink-0">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Note */}
        {slide.note && (
          <p className="mt-6 text-xs text-casino-muted italic max-w-lg text-center">💡 {slide.note}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="shrink-0 border-t border-casino-border bg-casino-dark">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button onClick={() => goTo(currentIdx - 1)} disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-casino-card hover:bg-casino-card/70 border border-casino-border text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-casino-gold w-4' : slideProg[slides[i].id] ? 'bg-casino-gold/50' : 'bg-casino-muted/20'}`} />
            ))}
          </div>

          <button onClick={() => goTo(currentIdx + 1)} disabled={currentIdx >= total - 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-casino-gold/10 hover:bg-casino-gold/20 border border-casino-gold/30 text-casino-gold text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            {allDone ? 'Finish ✓' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

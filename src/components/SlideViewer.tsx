import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { illustrationMap } from './illustrations'
import type { PhaseSlides } from '../data/slides/types'

interface Props {
  phaseId: string
  slides: PhaseSlides['slides']
}

function getSlideProgress(phaseId: string): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(`cc-slide-${phaseId}`) || '{}') } catch { return {} }
}
function saveSlideProgress(phaseId: string, p: Record<string, boolean>) {
  localStorage.setItem(`cc-slide-${phaseId}`, JSON.stringify(p))
}

export default function SlideViewer({ phaseId, slides }: Props) {
  const [idx, setIdx] = useState(0)
  const [prog, setProg] = useState<Record<string, boolean>>(() => getSlideProgress(phaseId))
  const total = slides.length
  const slide = slides[idx]
  const done = slides.filter(s => prog[s.id]).length

  const mark = useCallback((id: string) => {
    setProg(p => { if (p[id]) return p; const n = { ...p, [id]: true }; saveSlideProgress(phaseId, n); return n })
  }, [phaseId])

  const go = useCallback((i: number) => {
    if (i < 0 || i >= total) return
    setIdx(i)
    mark(slides[i].id)
  }, [total, slides, mark])

  useEffect(() => { if (slide) mark(slide.id) }, [slide?.id, mark])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(idx - 1)
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(idx + 1) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [idx, go])

  if (!slide) return <div className="text-center py-20 text-casino-muted">No slides</div>

  const SVG = slide.svg ? illustrationMap[slide.svg] : null

  return (
    <div className="flex flex-col h-full bg-casino-dark">
      {/* Thin progress bar */}
      <div className="h-0.5 bg-casino-royal shrink-0">
        <div className="h-full bg-casino-gold transition-all duration-300" style={{ width: `${(done / total) * 100}%` }} />
      </div>

      {/* Slide number + dots */}
      <div className="shrink-0 flex items-center justify-between px-4 py-1.5 border-b border-casino-border">
        <span className="text-[10px] text-casino-muted font-mono">{idx + 1}/{total}</span>
        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-casino-gold' : prog[slides[i].id] ? 'bg-casino-gold/40' : 'bg-casino-muted/20'}`} />
          ))}
        </div>
        <span className="text-[10px] text-casino-muted font-mono">{done}/{total}</span>
      </div>

      {/* SVG fills the main area */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-2 md:p-4">
        {SVG ? (
          <div className="w-full max-w-4xl">
            <SVG />
            {/* Title shown only as a tiny overlay */}
            <p className="text-center text-xs text-casino-muted mt-2">
              {slide.section && <span className="text-casino-gold font-semibold mr-2">{slide.section}</span>}
              {slide.emoji && <span className="mr-1">{slide.emoji}</span>}
              {slide.title}
            </p>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-white font-bold mb-2">{slide.emoji} {slide.title}</p>
            <ul className="space-y-2">
              {slide.bullets.map((b, i) => <li key={i} className="text-sm text-casino-muted">{b}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Minimal navigation */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-casino-border bg-casino-card/30">
        <button onClick={() => go(idx - 1)} disabled={idx === 0}
          className="px-4 py-2 rounded-lg bg-casino-card border border-casino-border text-white text-sm disabled:opacity-30 hover:bg-casino-card/70 transition-colors">
          <ChevronLeft size={16} />
        </button>

        {slide.note && (
          <span className="text-[10px] text-casino-muted italic text-center px-4">{slide.note}</span>
        )}

        <button onClick={() => go(idx + 1)} disabled={idx >= total - 1}
          className="px-4 py-2 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-sm font-semibold disabled:opacity-30 hover:bg-casino-gold/20 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

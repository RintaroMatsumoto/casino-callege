export interface SectionItem {
  id: string
  name: string
  done: boolean
}

export interface PhaseProgress {
  sections: SectionItem[]
  lastVisit: number
}

const PROGRESS_PREFIX = 'cc-prog-'

export function getPhaseProgress(phaseId: string): PhaseProgress {
  const raw = localStorage.getItem(`${PROGRESS_PREFIX}${phaseId}`)
  if (raw) {
    try {
      const p = JSON.parse(raw) as PhaseProgress
      return p
    } catch { /* fall through */ }
  }
  return { sections: [], lastVisit: 0 }
}

export function savePhaseProgress(phaseId: string, progress: PhaseProgress) {
  localStorage.setItem(`${PROGRESS_PREFIX}${phaseId}`, JSON.stringify(progress))
}

export function getCompletedSectionCount(phaseId: string): number {
  const p = getPhaseProgress(phaseId)
  return p.sections.filter(s => s.done).length
}

export function getTotalSectionCount(phaseId: string): number {
  const p = getPhaseProgress(phaseId)
  return p.sections.length
}

export function getAllPhasesProgress(): { visited: number; total: number; phasePcts: number[] } {
  let visited = 0
  let total = 0
  const phasePcts: number[] = []
  for (let i = 0; i < 7; i++) {
    const slides: Record<string, boolean> = JSON.parse(localStorage.getItem(`cc-slide-${i}`) || '{}')
    const slideCount = Object.keys(slides).length
    const done = Object.values(slides).filter(v => v).length
    if (slideCount > 0) {
      visited += done
      total += slideCount
      phasePcts.push(Math.round((done / slideCount) * 100))
    } else {
      // Fallback to old section progress
      const p = getPhaseProgress(String(i))
      const doneOld = p.sections.filter(s => s.done).length
      const totOld = p.sections.length
      if (totOld > 0) {
        visited += doneOld
        total += totOld
        phasePcts.push(Math.round((doneOld / totOld) * 100))
      } else {
        phasePcts.push(0)
      }
    }
  }
  return { visited, total, phasePcts }
}

/** Parse markdown headings to section items */
export function parseSections(phaseId: string, markdown: string): SectionItem[] {
  // Already have saved sections? Return them.
  const existing = getPhaseProgress(phaseId)
  if (existing.sections.length > 0) return existing.sections

  // Extract ## headings
  const lines = markdown.split('\n')
  const sections: SectionItem[] = []
  let idx = 0
  for (const line of lines) {
    const match = line.match(/^#{2,3}\s+(.+)/)
    if (match) {
      const raw = match[1].replace(/[*`~]/g, '').trim()
      const clean = raw.replace(/^[🏠🃏🎡🎲♠️💎🎯📖💰📊🔴🟢⚫🟣🟠]+/, '').trim()
      const id = `p${phaseId}-s${idx}`
      sections.push({ id, name: clean, done: false })
      idx++
    }
  }
  return sections
}

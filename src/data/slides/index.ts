import type { PhaseSlides } from './types'
import phase0 from './phase-0'
import phase1 from './phase-1'
import phase2 from './phase-2'
import phase3 from './phase-3'
import phase4 from './phase-4'
import phase5 from './phase-5'
import phase6 from './phase-6'

export { phase0, phase1, phase2, phase3, phase4, phase5, phase6 }

export const allPhases: PhaseSlides[] = [phase0, phase1, phase2, phase3, phase4, phase5, phase6]

export function getAllSlides() {
  return allPhases.flatMap(p => p.slides)
}


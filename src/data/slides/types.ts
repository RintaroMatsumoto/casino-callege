export interface Slide {
  id: string
  section: string
  title: string
  svg?: string
  bullets: string[]
  note?: string
  emoji?: string
}

export interface PhaseSlides {
  title: string
  emoji: string
  slides: Slide[]
}


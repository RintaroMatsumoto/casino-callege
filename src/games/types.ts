export type Suit = '♠' | '♥' | '♦' | '♣'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export interface Card {
  rank: Rank
  suit: Suit
  hidden?: boolean
}

export function cardValue(rank: Rank): number[] {
  if (rank === 'A') return [1, 11]
  if (['K', 'Q', 'J'].includes(rank)) return [10]
  return [parseInt(rank)]
}

export function handValue(cards: Card[]): { soft: number; hard: number } {
  let total = 0, aces = 0
  for (const c of cards) {
    if (c.hidden) continue
    if (c.rank === 'A') aces++
    else total += cardValue(c.rank)[0]
  }
  const hard = total + aces
  const soft = aces > 0 ? total + 10 + aces : hard
  return { hard, soft }
}

export function handString(cards: Card[]): string {
  return handValue(cards).soft <= 21 ? `${handValue(cards).soft}` : `${handValue(cards).hard}`
}

export function isRed(suit: Suit): boolean {
  return suit === '♥' || suit === '♦'
}

export const SUITS: Suit[] = ['♠', '♥', '♦', '♣']
export const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit })
    }
  }
  return deck
}

export function shuffleDeck(deck: Card[]): Card[] {
  const d = [...deck]
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[d[i], d[j]] = [d[j], d[i]]
  }
  return d
}

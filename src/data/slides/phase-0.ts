import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Fundamentals',
  emoji: '\u{1F3E0}',
  slides: [
    { id: '0-0', section: 'S0', title: 'Casino 3 Zones', svg: 'learning-path', bullets: ['Table games (with dealer)', 'Slot machines (unmanned)', 'Poker room (vs players)'], note: 'This course focuses on table games' },
    { id: '0-1', section: 'S0', title: 'Card Composition', svg: 'card-values', bullets: ['52 cards x 4 suits', 'A,2-10,J,Q,K (13 ranks)', 'No jokers used'], note: 'Standard 52-card deck' },
    { id: '0-2', section: 'S0', title: 'Card Values (BJ)', svg: 'card-values', bullets: ['Number cards = face value', 'Face cards (10,J,Q,K) = 10', 'Ace = 1 or 11'], note: 'Values differ by game' },
    { id: '0-3', section: 'S0', title: 'Card Values (Baccarat)', svg: 'card-values', bullets: ['Ace = 1', '2-9 = face value', '10,J,Q,K = 0'], note: 'Only last digit counts' },
    { id: '0-4', section: 'S0', title: 'Chip Colors & Values', svg: 'chip-all-colors', bullets: ['White $1 / Red $5 / Green $25', 'Black $100 / Purple $500 / Orange $1K', 'Darker = higher value'], note: 'Roulette uses separate color chips' },
    { id: '0-5', section: 'S0', title: 'Probability Basics', svg: 'dice-sum-prob', bullets: ['Probability = desired / total outcomes', '2 dice = 36 combinations', '7 is most common (16.67%)'], note: 'Foundation of all casino math' },
    { id: '0-6', section: 'S0', title: 'Expected Value (EV)', svg: 'martingale-tree', bullets: ['EV = long-term average result', 'All casino games have negative EV', 'This is the house edge'], note: 'Understanding EV explains why you cannot beat the casino long-term' },
    { id: '0-7', section: 'S0', title: 'House Edge Comparison', svg: 'allgame-he-compare', bullets: ['BJ basic strategy: 0.5-1.0%', 'European roulette: 2.70%', 'American roulette: 5.26%'], note: 'Lower = better for player' },
    { id: '0-8', section: 'S0', title: '4 Shuffle Types', svg: 'shuffle4-types', bullets: ['Wash: spread & mix on table', 'Riffle: interleave 2 halves', 'Strip: pull random packets', 'Overhand: take from top'], note: 'Riffle is the standard casino shuffle' },
    { id: '0-9', section: 'S0', title: 'Dealer Role', svg: 'skill-tree', bullets: ['Game flow: deal cards / manage bets', 'Security: coordinate with Eye in Sky', 'Service: face of the casino'], note: 'Accuracy > Speed. Report mistakes immediately' },
    { id: '0-10', section: 'S0', title: 'Casino Revenue Structure', bullets: ['Slots: 60-70% of revenue', 'Table games: 20-30%', 'Remaining: poker/food/hotel'], note: 'Slots are the biggest money maker' },
  ]
}
export default slides

import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Roulette',
  emoji: '\u{1F3A1}',
  slides: [
    { id: '2-0', section: 'S1', title: 'What is Roulette', svg: 'wheel-compare', bullets: ['Dealer (croupier) spins wheel and ball', 'Players bet on where ball lands', 'Simplest casino table game'], note: 'Pure chance, no skill involved' },
    { id: '2-1', section: 'S1', title: '3 Wheel Types', svg: 'wheel-compare', bullets: ['European (single zero): 37 pockets HE 2.70%', 'American (double zero): 38 pockets HE 5.26%', 'Triple zero: 39 pockets HE 7.69%'], note: 'European roulette is best for players' },
    { id: '2-2', section: 'S1', title: 'Number Layout & Colors', svg: 'wheel-eu', bullets: ['1-10, 19-28: odd=red / even=black', '11-18, 29-36: odd=black / even=red', '0 and 00 are green'], note: 'All numbers 1-36 sum to 666' },
    { id: '2-3', section: 'S2', title: 'Straight Up', svg: 'inside-straight', bullets: ['Bet on a single number', '35:1 payout', 'Win rate: 2.70% (EU) / 2.63% (US)'], note: 'Highest payout, lowest probability' },
    { id: '2-4', section: 'S2', title: 'Split Bet', svg: 'inside-split', bullets: ['2 adjacent numbers', '17:1 payout', 'Place chip on the line between numbers'], note: 'Covers 2 numbers with 1 chip' },
    { id: '2-5', section: 'S2', title: 'Street Bet', svg: 'inside-street', bullets: ['Row of 3 numbers', '11:1 payout', 'Place on outer line of the row'], note: '3 numbers covered' },
    { id: '2-6', section: 'S2', title: 'Corner Bet', svg: 'inside-corner', bullets: ['4 numbers forming a square', '8:1 payout', 'Place at the intersection'], note: 'Also called square bet' },
    { id: '2-7', section: 'S2', title: 'Six Line', svg: 'inside-sixline', bullets: ['2 adjacent rows = 6 numbers', '5:1 payout', '1 chip covers 6 numbers'], note: 'Also called double street' },
    { id: '2-8', section: 'S2', title: 'Top Line (5-number)', svg: 'inside-topline', bullets: ['0-00-1-2-3: 5 numbers', '6:1 payout', 'American wheel only HE 7.89%'], note: 'Worst bet in roulette' },
    { id: '2-9', section: 'S2', title: 'Red / Black', svg: 'outside-redblack', bullets: ['Bet on 18 numbers of that color', '1:1 payout', '0/00 are green and lose'], note: 'Almost 50/50 but not quite' },
    { id: '2-10', section: 'S2', title: 'Odd / Even', svg: 'outside-odd-even', bullets: ['Bet on 18 numbers', '1:1 payout', '0 is neither odd nor even'], note: 'Same odds as red/black' },
    { id: '2-11', section: 'S2', title: 'High / Low', svg: 'outside-lowhigh', bullets: ['1-18 (low) or 19-36 (high)', '1:1 payout', '18 numbers each, win rate 48.6%'], note: 'Same house edge as even money bets' },
    { id: '2-12', section: 'S2', title: 'Dozen / Column', svg: 'outside-dozen', bullets: ['Bet on 12 numbers', '2:1 payout', '1st/2nd/3rd dozen or 3 columns'], note: 'Covers 1/3 of the wheel' },
    { id: '2-13', section: 'S3', title: 'Voisins du Zero', svg: 'call-voisins', bullets: ['Covers 17 numbers around zero', 'Requires 9 chips', 'French for "neighbors of zero"'], note: 'Covers 22 to 25 on the wheel' },
    { id: '2-14', section: 'S3', title: 'Tiers du Cylindre', svg: 'call-tiers', bullets: ['Covers 1/3 of the wheel (12 numbers)', 'Requires 6 chips', 'French for "third of the cylinder"'], note: 'Opposite side from Voisins' },
    { id: '2-15', section: 'S3', title: 'Orphelins', svg: 'call-orphelins', bullets: ['Numbers not in Voisins or Tiers', 'Requires 5 chips', 'French for "orphans"'], note: 'Covers 8 numbers' },
    { id: '2-16', section: 'S3', title: 'Jeu Zero', svg: 'call-jeu-zero', bullets: ['Covers 7 numbers near zero', 'Requires 4 chips', 'French for "zero game"'], note: 'Popular in French casinos' },
    { id: '2-17', section: 'S4', title: 'Ball Trajectory', svg: 'ball-trajectory', bullets: ['Spin wheel clockwise', 'Throw ball counter-clockwise', 'Ball hits deflectors into pockets'], note: 'Timing and force affect results' },
    { id: '2-18', section: 'S4', title: 'En Prison Rule', svg: 'en-prison-flow', bullets: ['If zero hits, even bets are imprisoned', 'Next win returns bet (no payout)', 'HE drops from 2.70% to 1.35%'], note: 'French variation only' },
    { id: '2-19', section: 'S4', title: 'La Partage Rule', bullets: ['If zero hits, half of even bets returned', 'Similar to En Prison HE = 1.35%', 'French roulette feature'], note: 'Best roulette rule for players' },
    { id: '2-20', section: 'S5', title: 'Color Chip Management', svg: 'color-chip-mgmt', bullets: ['Each player has unique color', 'Chips have no face value written', 'Managed via lammer value indicator'], note: 'Unique to roulette' },
    { id: '2-21', section: 'S5', title: 'Dealer Procedure', svg: 'dealer-timeline', bullets: ['Place your bets period', 'Rien ne va plus (no more bets)', 'Spin and throw ball', 'Announce result and pay'], note: 'Strict timing prevents cheating' },
    { id: '2-22', section: 'S6', title: 'Martingale Critique', svg: 'martingale-tree', bullets: ['Double bet after every loss', '7 losses = $635 with $5 start', 'Table limits cause inevitable crash'], note: 'Expected value remains unchanged long-term' },
    { id: '2-23', section: 'S6', title: 'House Edge Analysis', svg: 'allgame-he-compare', bullets: ['European: 1/37 = 2.70%', 'American: 2/38 = 5.26%', 'Top Line (US): 7.89%'], note: 'Always play European when available' },
  ]
}
export default slides

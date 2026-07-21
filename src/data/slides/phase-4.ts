import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Poker (Texas Hold\'em)',
  emoji: '\u2660\uFE0F',
  slides: [
    { id: '4-0', section: 'S1', title: 'Texas Hold\'em', svg: 'table-preflop', bullets: ['2 hole cards + 5 community cards', 'Make best 5-card hand', 'Dealer is facilitator, not opponent'], note: 'Players compete against each other' },
    { id: '4-1', section: 'S1', title: 'Button & Blinds', svg: 'blinds-rotation', bullets: ['Button: acts last, most advantageous', 'SB: small blind (forced bet)', 'BB: big blind (2x SB forced bet)'], note: 'Button rotates clockwise each hand' },
    { id: '4-2', section: 'S1', title: 'Betting Rounds', svg: 'betting-rounds', bullets: ['Preflop -> Flop -> Turn -> River -> Showdown', 'Betting occurs in each round', 'Flop: 3 cards, Turn: 1, River: 1'], note: '4 betting rounds total' },
    { id: '4-3', section: 'S2', title: 'Royal Flush', svg: 'hand1-royalflush', bullets: ['A-K-Q-J-10 all same suit', 'Probability: 0.000032%', 'Best hand in poker'], note: 'The unbeatable hand' },
    { id: '4-4', section: 'S2', title: 'Straight Flush', svg: 'hand2-straight-flush', bullets: ['5 consecutive same suit', 'Probability: 0.0279%', 'One rank below royal'], note: 'Second-best possible hand' },
    { id: '4-5', section: 'S2', title: 'Four of a Kind', svg: 'hand3-fourkind', bullets: ['4 cards same rank', 'Probability: 0.168%', 'Also called quads'], note: 'Nearly unbeatable' },
    { id: '4-6', section: 'S2', title: 'Full House', svg: 'hand4-fullhouse', bullets: ['3 of a kind + 1 pair', 'Probability: 2.60%', '"Aces full of Kings" format'], note: 'Strong hand, often wins' },
    { id: '4-7', section: 'S2', title: 'Flush', svg: 'hand5-flush', bullets: ['5 cards all same suit', 'Probability: 3.03%', 'Cards need not be consecutive'], note: 'High card determines strength' },
    { id: '4-8', section: 'S2', title: 'Straight', svg: 'hand6-straight', bullets: ['5 consecutive cards', 'Probability: 4.62%', 'A-2-3-4-5 is the weakest straight'], note: 'Wheel is the lowest straight' },
    { id: '4-9', section: 'S2', title: 'Three of a Kind', svg: 'hand7-threekind', bullets: ['3 cards same rank', 'Probability: 4.83%', 'Also called trips or a set'], note: 'Distinguish from full house' },
    { id: '4-10', section: 'S2', title: 'Two Pair', svg: 'hand8-twopair', bullets: ['2 pairs of different ranks', 'Probability: 23.5%', 'Higher pair determines winner'], note: 'Common winning hand' },
    { id: '4-11', section: 'S2', title: 'One Pair', svg: 'hand9-onepair', bullets: ['1 pair of same rank', 'Probability: 43.8% (most common)', 'Most hands make at least a pair'], note: 'Kicker cards decide ties' },
    { id: '4-12', section: 'S2', title: 'High Card', svg: 'hand10-highcard', bullets: ['No pair, no draw', 'Probability: 17.4%', 'Highest card alone wins'], note: 'Also called "nothing"' },
    { id: '4-13', section: 'S3', title: 'Burn & Deal', svg: 'burn-deal-timing', bullets: ['Burn 1 card before each round', 'Flop: 3 cards (not all at once)', 'Turn and River: 1 card each'], note: 'Burning prevents marked card cheating' },
    { id: '4-14', section: 'S3', title: 'Pot Calculation', svg: 'sidepot', bullets: ['Preflop + all round bets = total pot', 'All-in triggers side pot', 'Main pot contested by all players'], note: 'Side pots isolate all-in players' },
    { id: '4-15', section: 'S3', title: 'Rake', svg: 'rake-flow', bullets: ['5% of each pot (capped $3-5)', 'Casino revenue from poker', 'Pot rake vs time rake options'], note: 'No house edge, just commission' },
    { id: '4-16', section: 'S4', title: 'Counting Outs', svg: 'outs-flush', bullets: ['Flush draw: 9 outs', 'Open-ended straight: 8 outs', 'Gutshot straight: 4 outs'], note: 'Rule of 4 and 2 for win % estimate' },
    { id: '4-17', section: 'S4', title: 'Pot Odds', svg: 'pot-odds-calc', bullets: ['Call cost / final pot size', 'Call if win % > pot odds', 'Implied odds add future bets'], note: 'Fundamental math decision tool' },
    { id: '4-18', section: 'S5', title: 'Cheating Methods', svg: 'collusion3', bullets: ['Collusion (teamwork)', 'Chip dumping', 'Soft play (not attacking friends)'], note: 'Angle shooting is a gray area' },
    { id: '4-19', section: 'S5', title: 'Tournament Basics', svg: 'blind-growth', bullets: ['All players start equal chips', 'Blinds increase periodically', 'Last player standing wins'], note: 'WSOP Main Event is most famous' },
  ]
}
export default slides

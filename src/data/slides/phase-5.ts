import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Baccarat',
  emoji: '\u{1F48E}',
  slides: [
    { id: '5-0', section: 'S1', title: 'Baccarat Basics', bullets: ['World\'s largest casino revenue source', 'Player vs Banker - bet on either', 'Zero player decisions - pure luck'], note: 'Rules are determined automatically by tableau' },
    { id: '5-1', section: 'S1', title: 'Deal Order', svg: 'bac-deal-order', bullets: ['Player 1st card -> Banker 1st card', 'Player 2nd card -> Banker 2nd card', 'Optional 3rd card based on tableau'], note: 'Strict dealing order enforced' },
    { id: '5-2', section: 'S1', title: 'Natural Check', svg: 'bac-natural-flow', bullets: ['8 or 9 on first 2 cards = natural', 'Natural ends the round immediately', '9 beats 8 when both natural'], note: 'No more cards drawn' },
    { id: '5-3', section: 'S1', title: 'Player Tableau', svg: 'bac-tableau-player', bullets: ['Total 0-5: draw 3rd card', 'Total 6-7: stand', 'Total 8-9: natural end'], note: 'Memory trick: 5 or less = draw, 6+ = stand' },
    { id: '5-4', section: 'S1', title: 'Banker Tableau', svg: 'bac-tableau-banker', bullets: ['Total 0-2: always draw', 'Total 3: depends on Player 3rd card', 'Total 7: always stand'], note: 'Memorizing the tableau chart is the dealer skill' },
    { id: '5-5', section: 'S2', title: '3 Bet Types', svg: 'bac-probability-pie', bullets: ['Banker wins: 45.86% (HE 1.06%)', 'Player wins: 44.62% (HE 1.24%)', 'Tie: 9.52% (HE 14.36%)'], note: 'Tie has extremely high house edge' },
    { id: '5-6', section: 'S2', title: 'Commission Calculation', svg: 'bac-commission-table', bullets: ['5% commission on Banker wins', '$100 bet = $5 commission', 'Track cumulative commission on lamp'], note: 'Always collect commission before payout' },
    { id: '5-7', section: 'S3', title: 'EZ Baccarat', svg: 'bac-dragon7-panda8', bullets: ['No commission version', 'Dragon 7: Banker 3-card 7 pays 40:1', 'Panda 8: Player 3-card 8 pays 25:1'], note: 'Popular Asian variation' },
    { id: '5-8', section: 'S3', title: 'Mini Baccarat', bullets: ['Smaller table version', 'Lower minimum bets', 'Single dealer handles everything'], note: 'Usually 1 dealer vs normal 3-4 staff' },
    { id: '5-9', section: 'S4', title: 'Squeeze Stage 1: Peel', svg: 'bac-squeeze-stage1', bullets: ['Lift card corner slowly', 'First glimpse of value', 'Builds anticipation'], note: 'VIP ritual' },
    { id: '5-10', section: 'S4', title: 'Squeeze Stage 2: Cut', svg: 'bac-squeeze-stage2', bullets: ['Lift card partially', 'Reveal side edges', 'More information revealed'], note: 'Continue slowly' },
    { id: '5-11', section: 'S4', title: 'Squeeze Stage 3: Release', svg: 'bac-squeeze-stage3', bullets: ['Drop card to full view', 'Reveal complete value', 'Ready for comparison'], note: 'Let the card fall naturally' },
    { id: '5-12', section: 'S4', title: 'Squeeze Stage 4: Compare', svg: 'bac-squeeze-stage4', bullets: ['Compare Player vs Banker totals', 'Announce winner', 'Proceed to payout'], note: 'Dealer must not rush the VIP' },
    { id: '5-13', section: 'S4', title: 'Palette Use', svg: 'bac-palette-use', bullets: ['Wooden spatula to push cards', 'Used at high limit tables', 'Elegant dealing style'], note: 'Prevents hand contact with cards' },
    { id: '5-14', section: 'S5', title: 'Big Road', svg: 'bac-big-road', bullets: ['Chronological result display', 'Red = Banker win', 'Blue = Player win / Green = Tie'], note: 'Visualize streak patterns' },
    { id: '5-15', section: 'S5', title: 'Big Eye Road', svg: 'bac-big-eye', bullets: ['Derived from Big Road pattern', 'Evaluates continuity', 'Red and blue 2-color display'], note: 'First derived road' },
    { id: '5-16', section: 'S5', title: 'Small Road', svg: 'bac-small-road', bullets: ['Second derived pattern', 'Skips 1 column in detection', 'For experienced players'], note: 'More sensitive than Big Eye' },
    { id: '5-17', section: 'S5', title: 'Cockroach Road', svg: 'bac-cockroach', bullets: ['Third derived pattern', 'Skips 2 columns', 'Only shown in some casinos'], note: 'Most detailed pattern tracking' },
    { id: '5-18', section: 'S6', title: 'Phil Ivey Case', svg: 'bac-edge-sorting-ivey', bullets: ['2012: Won $20M via edge sorting', 'Exploited card back asymmetry', 'Court ruled against Ivey - $11M returned'], note: 'Casinos now rotate cards 180 randomly' },
    { id: '5-19', section: 'S6', title: 'VIP Salon', svg: 'bac-vip-salon', bullets: ['Separate room from main floor', 'Minimum bets $100-$10,000+', 'Personal host + private space'], note: 'Asia-Pacific market drives baccarat revenue' },
  ]
}
export default slides

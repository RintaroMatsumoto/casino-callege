import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Poker (Texas Hold\'em)',
  emoji: '\u2660\uFE0F',
  slides: [
    // ============================================================
    // S1: DEFINITION - What is Texas Hold'em
    // ============================================================
    {
      id: '4-0',
      section: 'S1',
      title: 'Texas Hold\'em',
      svg: 'poker-hands',
      bullets: [
        'Each player receives 2 hole cards face down',
        '5 community cards dealt face up in center',
        'Make best 5-card hand from any combination of 7',
        'Dealer is facilitator only, does not participate',
        'Action starts left of dealer, moves clockwise',
        'Winner takes entire pot (split only on tie)',
        'Most popular poker variant worldwide since 2000'
      ],
      note: 'Players compete against each other, not the house'
    },
    {
      id: '4-1',
      section: 'S1',
      title: 'Button & Blinds',
      svg: 'blinds-rotation',
      bullets: [
        'Button rotates clockwise one seat each hand',
        'Small Blind: forced bet, typically 1/2 of BB',
        'Big Blind: forced bet, minimum bet size',
        'Button acts last post-flop (positional advantage)',
        'Blinds create action and ensure minimum pot size',
        'Heads-up: dealer is small blind, opponent is big blind',
        'Position is the most important strategic factor'
      ],
      note: 'Button position is most profitable'
    },
    {
      id: '4-2',
      section: 'S1',
      title: 'Preflop',
      svg: 'table-preflop',
      bullets: [
        'First betting round after hole cards dealt',
        'UTG (Under the Gun) acts first preflop',
        'Button acts last preflop',
        'Minimum raise is 2x Big Blind by default',
        'Options: fold, call, raise, or all-in',
        '169 distinct starting hand combinations total',
        'AA is the strongest starting hand (82% vs random)'
      ],
      note: 'Tight preflop play wins long-term'
    },
    {
      id: '4-3',
      section: 'S1',
      title: 'Flop',
      svg: 'table-flop',
      bullets: [
        'First 3 community cards dealt face up',
        '1 card burned before dealing flop',
        'Action starts with Small Blind post-flop',
        'Small Blind checks or bets first',
        'Flop texture determines relative hand strength',
        'Set mining: call preflop hoping to hit trips on flop',
        'C-bet (continuation bet) is standard flop strategy'
      ],
      note: 'Flop changes hand values dramatically'
    },
    {
      id: '4-4',
      section: 'S1',
      title: 'Turn & River',
      svg: 'betting-rounds',
      bullets: [
        'Turn is 4th community card (one card dealt)',
        'River is 5th and final community card',
        'Betting doubles on turn in limit games',
        'River is the last betting opportunity',
        'No more cards after river',
        'Action remains SB-first post-flop throughout',
        'Board may pair, complete draws, or miss'
      ],
      note: 'River decisions are final'
    },
    {
      id: '4-5',
      section: 'S1',
      title: 'Showdown',
      svg: 'table-showdown',
      bullets: [
        'Last aggressor shows first if no final bet',
        'If final bet called, caller sees cards first',
        'Players can muck (fold) without showing cards',
        'Best 5-card hand from any combo wins the pot',
        'Kickers determine winner when hands are equal',
        'Tied hands split the pot equally among players'
      ],
      note: 'Only the best 5 cards matter'
    },
    // ============================================================
    // S2: RULES - Hand Rankings
    // ============================================================
    {
      id: '4-6',
      section: 'S2',
      title: 'Royal Flush',
      svg: 'hand1-royalflush',
      bullets: [
        'A-K-Q-J-10 all same suit (e.g. all spades)',
        'Probability: 0.000154% (1 in 649,740 hands)',
        'Only 4 possible combinations in the deck',
        'Highest possible hand, cannot be beaten',
        'Often pays a separate jackpot in casino rooms',
        'Also called a royal flush or royal'
      ],
      note: 'The unbeatable hand'
    },
    {
      id: '4-7',
      section: 'S2',
      title: 'Straight Flush',
      svg: 'hand2-strflush',
      bullets: [
        '5 consecutive cards all same suit',
        'Probability: 0.00139% (1 in 72,193 hands)',
        '36 possible straight flush combos',
        'Ace can be high (A-K-Q-J-10) or low (A-2-3-4-5)',
        'Ranked by highest card in the sequence',
        'Second highest hand classification'
      ],
      note: 'Directly below royal flush'
    },
    {
      id: '4-8',
      section: 'S2',
      title: 'Four of a Kind',
      svg: 'hand3-fourkind',
      bullets: [
        '4 cards of same rank plus 1 kicker card',
        'Probability: 0.0240% (1 in 4,165 hands)',
        '624 possible quads combinations',
        'Also called quads',
        'Higher rank quads beat lower rank quads',
        'Kicker only matters if board has all 4 of a rank'
      ],
      note: 'Also known as quads'
    },
    {
      id: '4-9',
      section: 'S2',
      title: 'Full House',
      svg: 'hand4-fullhouse',
      bullets: [
        '3 cards of one rank plus 2 of another rank',
        'Probability: 0.1441% (1 in 694 hands)',
        '3,744 possible full house combinations',
        'Named format: "Kings full of Jacks" (KKKJJ)',
        'Higher three-of-a-kind rank determines winner',
        'If trips equal, pair rank decides'
      ],
      note: 'Also called a boat'
    },
    {
      id: '4-10',
      section: 'S2',
      title: 'Flush',
      svg: 'hand5-flush',
      bullets: [
        '5 cards all same suit, any ranks',
        'Probability: 0.1965% (1 in 508 hands)',
        '5,108 possible flush combinations',
        'Ace-high flush is the strongest flush',
        'Suit itself does not affect hand ranking',
        'Board with 3 of same suit makes flush possible'
      ],
      note: 'All cards same suit'
    },
    {
      id: '4-11',
      section: 'S2',
      title: 'Straight',
      svg: 'hand6-straight',
      bullets: [
        '5 consecutive cards, mixed suits',
        'Probability: 0.3925% (1 in 255 hands)',
        '10,200 possible straight combinations',
        'A-2-3-4-5 is the lowest straight (wheel)',
        '10-J-Q-K-A is the highest straight (broadway)',
        'Straight possible when board connects numerically'
      ],
      note: 'Ace can be high or low'
    },
    {
      id: '4-12',
      section: 'S2',
      title: 'Three of a Kind',
      svg: 'hand7-threekind',
      bullets: [
        '3 cards of same rank plus 2 kickers',
        'Probability: 2.1128% (1 in 47 hands)',
        '54,912 possible trips combinations',
        'Set: pocket pair + one board card of same rank',
        'Trips: one hole card + two board cards of same rank',
        'Set is well-hidden, trips is more obvious'
      ],
      note: 'Also called trips or a set'
    },
    {
      id: '4-13',
      section: 'S2',
      title: 'Two Pair',
      svg: 'hand8-twopair',
      bullets: [
        '2 different pairs of cards plus 1 kicker',
        'Probability: 4.7539% (1 in 21 hands)',
        '123,552 possible two pair combinations',
        'Higher pair determines winner first',
        'If higher pair tied, lower pair decides',
        'Kicker matters if both pairs are identical'
      ],
      note: 'Most common multi-way winning hand'
    },
    {
      id: '4-14',
      section: 'S2',
      title: 'One Pair',
      svg: 'hand9-onepair',
      bullets: [
        '1 pair of same rank plus 3 kickers',
        'Probability: 42.2569% (1 in 2.37 hands)',
        '1,098,240 possible one pair combinations',
        'Most common made hand (42.3% of all hands)',
        'Higher pair always beats lower pair',
        'Kickers decide the winner very frequently'
      ],
      note: 'Pair of Aces is best one-pair hand'
    },
    {
      id: '4-15',
      section: 'S2',
      title: 'High Card',
      svg: 'hand10-highcard',
      bullets: [
        'No pair, no straight, no flush',
        'Probability: 50.1177% (1 in 2 hands)',
        '1,302,540 possible high card combinations',
        'Most common outcome: no made hand at all',
        'Ace-high is the strongest high card hand',
        'Also called nothing, air, or high card'
      ],
      note: 'Also known as nothing'
    },
    // ============================================================
    // S3: NUMBERS - Mathematics and Probability
    // ============================================================
    {
      id: '4-16',
      section: 'S3',
      title: 'Betting Structures',
      svg: 'string-bet',
      bullets: [
        'Limit: fixed bet size each round (e.g. $2/$4)',
        'No-Limit: any amount up to your full stack',
        'Pot-Limit: max bet equals current pot size',
        'Limit: small bet pre-flop and flop, big bet turn and river',
        'No-Limit allows all-in wager at any time',
        'Pot-Limit is standard in Omaha and PLO',
        'Minimum raise must be at least the previous bet size'
      ],
      note: 'Structure determines strategy completely'
    },
    {
      id: '4-17',
      section: 'S3',
      title: 'Counting Outs',
      svg: 'outs-flush',
      bullets: [
        'Flush draw: 9 outs (13 suit cards minus 4 known)',
        'Open-ended straight draw: 8 outs',
        'Gutshot straight draw: 4 outs (inside straight)',
        'Double gutshot straight draw: 8 outs',
        'Overcards: 6 outs (3 per overcard rank)',
        'Open-ended + flush draw: 15 outs (monster combo)',
        'Rule of 4: multiply outs by 4 for turn+river win %',
        'Rule of 2: multiply outs by 2 for one street win %'
      ],
      note: 'Outs are unseen cards that improve your hand'
    },
    {
      id: '4-18',
      section: 'S3',
      title: 'Pot Odds',
      svg: 'pot-odds-calc',
      bullets: [
        'Formula: call cost / (pot size + call cost)',
        'Example: pot is $100, opponent bets $50',
        'Call cost $50, final pot becomes $200',
        'Pot odds = $50 / $200 = 25% required equity',
        'Call if your win percentage exceeds pot odds',
        'Implied odds: add expected future bets to pot size',
        'Reverse implied odds: future money you will lose'
      ],
      note: 'Fundamental expected value calculation'
    },
    {
      id: '4-19',
      section: 'S3',
      title: 'Pot Calculation',
      svg: 'sidepot',
      bullets: [
        'Total pot = sum of all bets from every round',
        'Preflop pot = SB + BB + calls + raises',
        'Each round adds bets to the running total',
        'Multi-way pot = number of callers x bet size',
        'Dead money: blinds from folded players',
        'Pot committed: money already invested in current hand',
        'Re-calculate pot after every betting action'
      ],
      note: 'Always track the current pot size'
    },
    {
      id: '4-20',
      section: 'S3',
      title: 'Side Pot Calculation',
      svg: 'poker-hands',
      bullets: [
        'All-in player triggers side pot creation',
        'Main pot: money all players can win',
        'Side pot: contested only by non-all-in players',
        'Multiple all-ins create multiple side pots',
        'Side pot #1 excludes shortest stack contributions',
        'Each side pot isolated to its contributing players',
        'Side pots awarded in reverse order at showdown'
      ],
      note: 'All-in players cannot win side pot money'
    },
    {
      id: '4-21',
      section: 'S3',
      title: 'Rake Calculation',
      svg: 'rake-flow',
      bullets: [
        'Typical rake: 5% of pot up to $3-$5 maximum cap',
        'No flop no drop: no rake taken if flop not dealt',
        'Rake collected after each hand completes',
        'Time rake: hourly fee per player instead of per-pot',
        'Rake cap protects low-stakes cash game players',
        'Promotional rake funds bad beat and high hand jackpots',
        'Casino earns only from rake, no house edge on play'
      ],
      note: 'Rake is the house commission'
    },
    // ============================================================
    // S4: STRATEGY - Advanced Play Concepts
    // ============================================================
    {
      id: '4-22',
      section: 'S4',
      title: 'Bluff Theory',
      svg: 'blinds-rotation',
      bullets: [
        'Bluff succeeds when opponents fold better hands',
        'Optimal bluff frequency: ratio of bluffs to value bets',
        'Continuation bet: bluff when you raised preflop',
        'Semi-bluff: bet with a drawing hand (has equity)',
        'Bluff catching: calling with a marginal made hand',
        'Show bluffs selectively to balance your image',
        'Board texture determines bluff credibility and timing'
      ],
      note: 'Semi-bluffs are mathematically superior'
    },
    {
      id: '4-23',
      section: 'S4',
      title: 'Position & Aggression',
      svg: 'table-preflop',
      bullets: [
        'Play more hands in late position (button, cutoff)',
        'Play fewer hands in early position (UTG, UTG+1)',
        'In position: act last, see opponent action first',
        'Out of position: act first, at a disadvantage',
        'Aggressive betting forces opponents to make mistakes',
        'Value bet: bet when you expect to have the best hand',
        'Fold equity: chance opponent folds to your bet'
      ],
      note: 'Position is power in poker'
    },
    // ============================================================
    // S5: DEALER - House Procedures
    // ============================================================
    {
      id: '4-24',
      section: 'S5',
      title: 'Dealer Procedure',
      svg: 'burn-deal-timing',
      bullets: [
        'Shuffle deck minimum 3 times before each hand',
        'Burn 1 card face down before flop, turn, and river',
        'Deal 2 hole cards clockwise starting from SB',
        'Flop: 3 cards dealt face up at the same time',
        'Turn: 1 card dealt face up after burn',
        'River: 1 card dealt face up after burn',
        'Dealer should mute table conversation during active hand'
      ],
      note: 'Burning prevents marked card cheating'
    },
    // ============================================================
    // S6: MISCONCEPTIONS - Common Errors in Thinking
    // ============================================================
    {
      id: '4-25',
      section: 'S6',
      title: 'Collusion Myths',
      svg: 'collusion3',
      bullets: [
        'Myth: collusion is easy to get away with',
        'Chip dumping: one player intentionally loses to partner',
        'Soft play: not betting against a friend\'s weak hand',
        'Signaling: communicating hand strength via patterns',
        'Detection: tracking software analyzes betting patterns',
        'Detection: win rate anomalies trigger security alerts',
        'Collusion is a felony offense in most US states'
      ],
      note: 'Collusion is illegal and detectable'
    },
    {
      id: '4-26',
      section: 'S6',
      title: 'Angle Shooting Myths',
      svg: 'angle-shooting',
      bullets: [
        'Myth: angles are clever play, not cheating',
        'String bet: pushing chips in multiple separate motions',
        'False declaration: mis-stating action verbally',
        'Hiding chips: placing large chips behind smaller stacks',
        'Acting out of turn to gauge opponent reaction',
        'Mis-calling hand values to confuse opponents',
        'Floor rulings on angles result in warnings or bans'
      ],
      note: 'Angle shooting damages game integrity'
    },
    // ============================================================
    // S7: EDGE CASES - Tournament and Special Situations
    // ============================================================
    {
      id: '4-27',
      section: 'S7',
      title: 'Tournament Rules',
      svg: 'blind-growth',
      bullets: [
        'All players start with equal chip stacks',
        'Blind levels increase at set intervals (15-60 min)',
        'Bubble: last elimination before money, most tense moment',
        'Final table: 9 or 10 players play hand-for-hand',
        'ICM calculates dollar value of tournament chips',
        'Pay jumps are significant at final table eliminations',
        'Chop agreements split remaining prize pool among finalists'
      ],
      note: 'WSOP Main Event uses 60-minute levels'
    },
    {
      id: '4-28',
      section: 'S7',
      title: 'Chip Race Procedure',
      svg: 'chip-race',
      bullets: [
        'Occurs when low-denomination chips are removed from play',
        'High-denomination chips replace low-denomination ones',
        'Odd chips: randomly distributed among affected players',
        'Chip race removes smallest denomination from the table',
        'Dealer conducts race at the tournament table',
        'Players cannot lose chips from a race (only gain)',
        'Eliminates small chips for efficiency at higher blinds'
      ],
      note: 'Coloring up simplifies chip management'
    },
    {
      id: '4-29',
      section: 'S7',
      title: 'Bad Beat & Jackpots',
      svg: 'poker-hands',
      bullets: [
        'Bad beat: very strong hand loses to even stronger hand',
        'Typical qualifier: AA vs quads beaten by straight flush',
        'Jackpot payout: $50,000 to over $1,000,000 depending',
        'Qualifying hands: quads or better must lose to better',
        'Both players must use both hole cards (typical rule)',
        'Rake contribution funds the bad beat jackpot pool',
        'High hand jackpots: paid hourly for best showndown hand'
      ],
      note: 'Bad beat jackpots can exceed $1 million'
    }
  ]
}

export default slides

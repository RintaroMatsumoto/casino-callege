import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Roulette',
  emoji: '\u{1F3A1}',
  slides: [
    // ── S1: Fundamentals ─────────────────────────────────────────────
    {
      id: '2-0',
      section: 'S1',
      title: 'How Roulette Works',
      svg: 'wheel-compare',
      bullets: [
        'DEFINITION: Roulette is a casino game where a dealer spins a wheel with numbered pockets and throws a ball in the opposite direction; players bet on which pocket the ball lands in',
        'RULES: The wheel rotates continuously while the ball decelerates through deflectors and falls into one pocket; winning bets are paid after the result is marked',
        'NUMBERS: Wheel has 37 (European) or 38 (American) pockets numbered 0 through 36 plus optional 00; pockets alternate red/black except green zero(s)',
        'STRATEGY: European single-zero wheels offer the lowest house edge at 2.70%; always prefer European roulette over American variants',
        'DEALER: The croupier spins the wheel, throws the ball, calls "Rien ne va plus," announces the winning number and color, then pays all bets in order',
        'MISCONCEPTIONS: The dealer can influence where the ball lands on a properly maintained wheel; roulette is purely random and no strategy changes the house edge',
        'EDGE CASES: Some casinos allow "call bets" announced verbally before the spin; in France En Prison and La Partage rules further reduce house edge to 1.35% on even-money bets'
      ],
      note: 'Roulette is a game of pure chance with a fixed house edge on every bet type'
    },
    {
      id: '2-1',
      section: 'S1',
      title: 'European Wheel',
      svg: 'wheel-eu',
      bullets: [
        'DEFINITION: The European roulette wheel has 37 pockets numbered 0 through 36 with a single green zero slot',
        'RULES: Numbers are arranged in a specific sequence around the wheel alternating low (1-18) and high (19-36) and alternating red/black as much as possible',
        'NUMBERS: Sequence clockwise from 0: 32-15-19-4-21-2-25-17-34-6-27-13-36-11-30-8-23-10-5-24-16-33-1-20-14-31-9-22-18-29-7-28-12-35-3-26; 37 total pockets',
        'STRATEGY: European roulette has a house edge of 1/37 = 2.70% on all bets except one; this is the best roulette variant for players',
        'DEALER: The dealer must spin the wheel at a consistent speed and announce the number clearly; in European casinos the dealer uses a rake to collect chips',
        'MISCONCEPTIONS: Many players think the single-zero wheel is rare outside Europe; it is the standard in most modern online casinos worldwide',
        'EDGE CASES: Some European wheels use the "en prison" rule where even-money bets are imprisoned on zero; the sequence layout is mathematically balanced to minimize bias'
      ],
      note: 'European wheel HE = 1/37 = 2.70%, the lowest standard house edge in roulette'
    },
    {
      id: '2-2',
      section: 'S1',
      title: 'American Wheel',
      svg: 'wheel-us',
      bullets: [
        'DEFINITION: The American roulette wheel has 38 pockets numbered 0, 00, and 1-36 with two green zero slots',
        'RULES: The 0 and 00 are positioned opposite each other on the wheel; the number sequence differs from the European layout',
        'NUMBERS: Sequence clockwise from 0: 0-28-9-26-30-11-7-20-32-17-5-22-34-15-3-24-36-13-1-00-27-10-25-29-12-8-19-31-18-6-21-33-16-4-23-35-14-2; 38 total pockets',
        'STRATEGY: House edge is 2/38 = 5.26% on all standard bets; the Top Line (0-00-1-2-3) carries an even worse edge of 7.89%',
        'DEALER: American dealers use a "dolly" (marker) to indicate the winning number and typically use drop boxes for each table; they must manage color chips for each player',
        'MISCONCEPTIONS: Players believe the extra 00 only adds 2.56% to the house edge; it actually doubles it from 2.70% to 5.26%',
        'EDGE CASES: Some American casinos offer "surrender" on even-money bets reducing the edge to 2.63%; the double-zero layout changes the odds of every bet type'
      ],
      note: 'American wheel HE = 2/38 = 5.26%, roughly double the European edge'
    },
    {
      id: '2-3',
      section: 'S1',
      title: 'Triple Zero Wheel',
      svg: 'wheel-triple',
      bullets: [
        'DEFINITION: The triple-zero roulette wheel adds a third green pocket marked "000" alongside 0 and 00 for 39 total pockets',
        'RULES: The third zero is placed between the existing zeros or elsewhere on the wheel; all standard betting rules apply with adjusted odds',
        'NUMBERS: 39 pockets total (0, 00, 000, and 1-36); the house edge is 3/39 = 7.69% on every bet type',
        'STRATEGY: Triple-zero roulette is the worst variant for players with a house edge of 7.69%; it should always be avoided when alternatives exist',
        'DEALER: Dealers must manage three zero pockets on the layout which slightly complicates payout calculations for outside bets',
        'MISCONCEPTIONS: Casinos market triple-zero tables with lower minimum bets as a "value" option; the increased house edge more than offsets the lower minimum',
        'EDGE CASES: Triple-zero wheels are primarily found in high-traffic US casinos and cruise ships; no En Prison or La Partage rules are ever offered on triple-zero tables'
      ],
      note: 'Triple-zero HE = 3/39 = 7.69%, the worst roulette variant available'
    },
    // ── S2: Inside Bets ─────────────────────────────────────────────
    {
      id: '2-4',
      section: 'S2',
      title: 'Straight Up',
      svg: 'inside-straight',
      bullets: [
        'DEFINITION: A straight-up bet is a wager on a single number including zero(s); the chip is placed directly on the chosen number square',
        'RULES: Player places one chip on a single number; if that number hits, the bet wins at 35-to-1 odds; the original bet remains on the table',
        'NUMBERS: Probability of winning on European wheel = 1/37 = 2.7027%; payout = 35:1; expected return = (35*1 + (-1)*36)/37 = -1/37 = -2.70%; on American wheel = 1/38 = 2.6316%',
        'STRATEGY: Straight-up bets offer the highest payout but the lowest probability; players who want larger wins with smaller bankrolls often play straight-up numbers',
        'DEALER: The dealer places a dolly on the winning number and pays straight-up winners by stacking 35 chips plus leaving the original; payouts are calculated from the bet value marker',
        'MISCONCEPTIONS: Betting a "lucky number" every spin does not improve odds; each spin is independent with the same 1/37 or 1/38 probability regardless of past results',
        'EDGE CASES: On triple-zero wheels straight-up probability drops to 1/39 = 2.564%; some casinos limit maximum straight-up bet amounts to manage risk exposure'
      ],
      note: 'Straight up: 35:1 payout, 2.70% win rate (EU) or 2.63% (US)'
    },
    {
      id: '2-5',
      section: 'S2',
      title: 'Split Bet',
      svg: 'inside-split',
      bullets: [
        'DEFINITION: A split bet covers two adjacent numbers on the layout; the chip is placed on the line dividing the two numbers',
        'RULES: One chip covers both numbers; either number wins; the chip must be exactly on the shared border between the two number squares',
        'NUMBERS: Payout = 17:1; probability (EU) = 2/37 = 5.4054%; expected return = (17*2 + (-1)*35)/37 = -1/37 = -2.70%; probability (US) = 2/38 = 5.2632%',
        'STRATEGY: Splits offer better coverage than straight-ups while maintaining the same house edge; common for covering zero and adjacent numbers',
        'DEALER: The dealer identifies split winners by the chip position on the line; payout is 17 chips per chip bet plus the original',
        'MISCONCEPTIONS: Players think betting multiple splits on adjacent numbers creates a "system"; each split bet is independent with the same 2.70% house edge',
        'EDGE CASES: A split can cover 0 and 00 on American wheels; some layouts allow splits between the last number in a row and the first in the next row'
      ],
      note: 'Split: 17:1 payout, covers 2 numbers with chip on the dividing line'
    },
    {
      id: '2-6',
      section: 'S2',
      title: 'Street Bet',
      svg: 'inside-street',
      bullets: [
        'DEFINITION: A street bet covers three consecutive numbers in a single row on the layout; the chip is placed on the outer left edge of the row',
        'RULES: One chip covers all three numbers in the row; the chip sits on the outside line at the beginning of the row opposite the zero row',
        'NUMBERS: Payout = 11:1; probability (EU) = 3/37 = 8.1081%; expected return = (11*3 + (-1)*34)/37 = -1/37 = -2.70%; probability (US) = 3/38 = 7.8947%',
        'STRATEGY: Street bets balance coverage and payout; three streets cover the entire 1-36 range with 12 chips at 11:1 payout each',
        'DEALER: The dealer sees the chip on the outer boundary of the row and pays 11 chips per chip plus the original when any of the three numbers hits',
        'MISCONCEPTIONS: Players confuse street bets with six-line bets; a street covers 3 numbers, a six-line covers 6 numbers (two adjacent streets)',
        'EDGE CASES: On some layouts the 0, 00, and 1-2-3 row can form a special street; the zero row itself (0-00) is not a street and requires a split'
      ],
      note: 'Street: 11:1 payout, covers 3 numbers in one row'
    },
    {
      id: '2-7',
      section: 'S2',
      title: 'Corner Bet',
      svg: 'inside-corner',
      bullets: [
        'DEFINITION: A corner bet (also called a square bet) covers four numbers that form a square on the layout; the chip is placed at the intersection of the four numbers',
        'RULES: One chip covers all four numbers where they meet at a common corner; all four numbers must be adjacent in a 2x2 block',
        'NUMBERS: Payout = 8:1; probability (EU) = 4/37 = 10.8108%; expected return = (8*4 + (-1)*33)/37 = -1/37 = -2.70%; probability (US) = 4/38 = 10.5263%',
        'STRATEGY: Corner bets offer the highest probability among inside bets while still paying 8:1; useful for covering a cluster of numbers you predict',
        'DEALER: The dealer reads the chip at the cross-intersection; payout is 8 chips per chip plus the original chip',
        'MISCONCEPTIONS: Players think a corner bet covers a "section" of the wheel; the layout arrangement does not match wheel adjacency',
        'EDGE CASES: Not all squares on the layout form valid corners (e.g., between rows 1-3 and 4-6); the 0-00-1-2-3 area is covered by the Top Line bet, not a corner'
      ],
      note: 'Corner: 8:1 payout, covers 4 numbers in a square'
    },
    {
      id: '2-8',
      section: 'S2',
      title: 'Six Line Bet',
      svg: 'inside-sixline',
      bullets: [
        'DEFINITION: A six-line bet (also called a double street) covers all six numbers in two adjacent rows; the chip is placed on the line between two streets at the outer edge',
        'RULES: One chip covers six numbers across two consecutive rows; the chip sits on the outer line where the two streets meet',
        'NUMBERS: Payout = 5:1; probability (EU) = 6/37 = 16.2162%; expected return = (5*6 + (-1)*31)/37 = -1/37 = -2.70%; probability (US) = 6/38 = 15.7895%',
        'STRATEGY: Six-line bets offer the best probability among inside bets; covering all six six-lines (36 numbers) with 6 chips guarantees covering every non-zero number',
        'DEALER: The dealer pays 5 chips per chip bet plus the original when any of the six numbers wins',
        'MISCONCEPTIONS: Some players call this a "double street" and confuse it with a street bet; a six-line bet is simply two adjacent street bets combined into one wager',
        'EDGE CASES: Six-line bets cannot include zero(s); the rows are strictly 1-36 in groups of 1-3, 4-6, 7-9, 10-12, 13-15, 16-18, 19-21, 22-24, 25-27, 28-30, 31-33, 34-36'
      ],
      note: 'Six Line: 5:1 payout, covers 6 numbers across two rows'
    },
    {
      id: '2-9',
      section: 'S2',
      title: 'Top Line (Five Number)',
      svg: 'inside-topline',
      bullets: [
        'DEFINITION: The Top Line bet (also called the five-number bet or basket bet) covers 0, 00, 1, 2, and 3; it is only available on American double-zero wheels',
        'RULES: One chip placed at the corner intersection where 0, 00, and the 1-2-3 row meet on the layout; covers all five numbers',
        'NUMBERS: Payout = 6:1; probability = 5/38 = 13.1579%; expected return = (6*5 + (-1)*33)/38 = -3/38 = -7.89%; this is the worst bet in roulette',
        'STRATEGY: The Top Line bet should never be played; its house edge of 7.89% is nearly three times worse than the standard American 5.26% edge',
        'DEALER: The dealer must recognize the unique chip placement at the corner of the 0-00-1-2-3 intersection and pay 6 chips per chip plus the original',
        'MISCONCEPTIONS: Players assume the Top Line is just another inside bet with standard house edge; it is mathematically worse because the 6:1 payout for 5 numbers is not proportional',
        'EDGE CASES: If the payout were fair at 5 numbers the true odds would be 33:5 = 6.6:1; the casino pays only 6:1 creating the inflated edge; single-zero wheels and triple-zero wheels do not have this bet'
      ],
      note: 'Top Line: 6:1 payout, HE = 7.89%, the worst bet in roulette'
    },
    // ── S3: Outside Bets ────────────────────────────────────────────
    {
      id: '2-10',
      section: 'S3',
      title: 'Red / Black',
      svg: 'outside-redblack',
      bullets: [
        'DEFINITION: A red or black bet wagers that the ball will land on a pocket of that color; 18 red and 18 black numbers exist on both European and American wheels',
        'RULES: Numbers 1-36 are colored red or black; 0 and 00 are green; if zero hits all red and black bets lose (unless En Prison or La Partage applies)',
        'NUMBERS: Probability (EU) = 18/37 = 48.6486%; payout = 1:1; expected return = (1*18 + (-1)*19)/37 = -1/37 = -2.70%; probability (US) = 18/38 = 47.3684%',
        'STRATEGY: Even-money bets like red/black have the same house edge as all other standard bets; the 1:1 payout means smaller swings than inside bets',
        'DEALER: The dealer pays even-money bets by placing one chip next to the bet for every chip wagered; color chips are tracked via the lammer value marker',
        'MISCONCEPTIONS: Players believe betting on red after multiple blacks "due" to hit; each spin is independent with exactly 18/37 probability of red every time',
        'EDGE CASES: With En Prison rule on European wheels, zero causes the bet to be imprisoned rather than lost; with La Partage, half the bet is returned; both reduce HE to 1.35%'
      ],
      note: 'Red/Black: 1:1 payout, 18 numbers each, zero(s) are green and lose'
    },
    {
      id: '2-11',
      section: 'S3',
      title: 'Odd / Even',
      svg: 'outside-oddeven',
      bullets: [
        'DEFINITION: An odd or even bet wagers that the winning number will be odd or even; numbers 1-36 are used and 0/00 do not count as either',
        'RULES: All numbers 1-36 are classified as odd or even; zero(s) are neither and cause all odd/even bets to lose',
        'NUMBERS: Probability (EU) = 18/37 = 48.6486%; payout = 1:1; expected return = (1*18 + (-1)*19)/37 = -2.70%; probability (US) = 18/38 = 47.3684%',
        'STRATEGY: Odd/even bets are identical to red/black in probability and payout; switching between them does not change expected value',
        'DEALER: The dealer evaluates odd/even bets after the number is announced; payout is 1:1 same as all even-money outside bets',
        'MISCONCEPTIONS: Some players avoid betting odd/even because zero is "neither" and therefore any other bet is better; the house edge is identical to all standard bets',
        'EDGE CASES: Some French roulette tables color the "Pair" (even) and "Impair" (odd) betting areas differently; the En Prison rule applies to odd/even bets on French tables'
      ],
      note: 'Odd/Even: 1:1 payout, 18 numbers each, 0 is neither odd nor even'
    },
    {
      id: '2-12',
      section: 'S3',
      title: 'Low / High',
      svg: 'outside-lowhigh',
      bullets: [
        'DEFINITION: A low bet (1-18) or high bet (19-36) wagers that the winning number falls in that range; both cover exactly 18 numbers',
        'RULES: Low covers numbers 1 through 18; High covers numbers 19 through 36; zero(s) are not in either range and cause the bet to lose',
        'NUMBERS: Probability (EU) = 18/37 = 48.6486%; payout = 1:1; expected return = (1*18 + (-1)*19)/37 = -2.70%; probability (US) = 18/38 = 47.3684%',
        'STRATEGY: Low/High is mathematically identical to Red/Black and Odd/Even; choose based on personal preference as all have the same house edge',
        'DEALER: The dealer pays 1:1 on winning low or high bets; these bets are typically placed in large labeled boxes at the end of the layout',
        'MISCONCEPTIONS: Players think "low" (1-18) has an advantage because it includes more "cold" numbers; all numbers in the range have equal probability',
        'EDGE CASES: On wheels with En Prison or La Partage, low/high bets receive the same favorable treatment as other even-money bets when zero hits'
      ],
      note: 'Low/High: 1:1 payout, 1-18 or 19-36, 18 numbers each'
    },
    {
      id: '2-13',
      section: 'S3',
      title: 'Dozen Bet',
      svg: 'outside-dozen',
      bullets: [
        'DEFINITION: A dozen bet covers 12 consecutive numbers: 1st dozen (1-12), 2nd dozen (13-24), or 3rd dozen (25-36)',
        'RULES: One chip is placed in the box labeled "1st 12," "2nd 12," or "3rd 12"; wins if any of the 12 numbers in that range hits',
        'NUMBERS: Payout = 2:1; probability (EU) = 12/37 = 32.4324%; expected return = (2*12 + (-1)*25)/37 = -1/37 = -2.70%; probability (US) = 12/38 = 31.5789%',
        'STRATEGY: Dozen bets cover one-third of the non-zero numbers; covering two dozen bets (24 numbers) with two chips is a common strategy to cover 64.86% of the wheel (EU)',
        'DEALER: The dealer pays 2 chips per chip wagered plus the original chip; dozen bet areas are located below the main number grid',
        'MISCONCEPTIONS: Players think betting two dozens guarantees profit; if zero hits both dozens lose resulting in a net loss of 2 chips',
        'EDGE CASES: Dozen bets are sometimes confused with column bets; both cover 12 numbers and pay 2:1 but use different number groupings'
      ],
      note: 'Dozen: 2:1 payout, covers 12 numbers (1-12, 13-24, or 25-36)'
    },
    {
      id: '2-14',
      section: 'S3',
      title: 'Column Bet',
      svg: 'outside-column',
      bullets: [
        'DEFINITION: A column bet covers the 12 numbers in a vertical column on the layout; there are three columns labeled 2-to-1 at the bottom',
        'RULES: The three columns group numbers as follows: Column 1 = 1-4-7-10-13-16-19-22-25-28-31-34; Column 2 = 2-5-8-11-14-17-20-23-26-29-32-35; Column 3 = 3-6-9-12-15-18-21-24-27-30-33-36',
        'NUMBERS: Payout = 2:1; probability (EU) = 12/37 = 32.4324%; expected return = (2*12 + (-1)*25)/37 = -2.70%; probability (US) = 12/38 = 31.5789%',
        'STRATEGY: Column bets are mathematically identical to dozen bets with the same 2:1 payout and probability; choosing between dozens and columns is purely personal preference',
        'DEALER: The dealer identifies column wins by the winning number and pays 2:1; the column bet boxes are at the bottom of the layout below the dozen boxes',
        'MISCONCEPTIONS: Some players believe columns have "hot" or "cold" patterns; each spin is independent and the probability of any column hitting is always 12/37',
        'EDGE CASES: Layouts may vary in column label placement; some European tables label columns "2-1" with arrows pointing to the corresponding column'
      ],
      note: 'Column: 2:1 payout, covers 12 numbers in a vertical column'
    },
    {
      id: '2-15',
      section: 'S3',
      title: 'Snake Bet',
      svg: 'outside-snake',
      bullets: [
        'DEFINITION: The snake bet covers 12 numbers that form a zigzag pattern across the layout resembling a snake: 1-5-9-12-14-16-19-23-27-30-32-34',
        'RULES: The snake bet is a special combination bet covering specific numbers in a snake-like path; it pays 2:1 as a dozen-equivalent bet',
        'NUMBERS: The 12 snake numbers on a standard layout: 1, 5, 9, 12, 14, 16, 19, 23, 27, 30, 32, 34; payout = 2:1; probability (EU) = 12/37 = 32.4324%',
        'STRATEGY: The snake bet has identical house edge to dozen and column bets at 2.70% (EU) or 5.26% (US); it is purely an aesthetic alternative',
        'DEALER: The dealer must know the specific 12 snake numbers; the bet is placed using individual chips on each number or via a special betting area on some tables',
        'MISCONCEPTIONS: New players think the snake pattern has special significance; the pattern is purely cosmetic and has no mathematical advantage over any other 12-number bet',
        'EDGE CASES: The snake bet is not available at all casinos; where offered it may be called "the snake" or "tierce"; some tables use a different snake pattern with different numbers'
      ],
      note: 'Snake: 2:1 payout, 12 numbers in zigzag pattern, same HE as dozen'
    },
    // ── S4: Called Bets ─────────────────────────────────────────────
    {
      id: '2-16',
      section: 'S4',
      title: 'Voisins du Zero',
      svg: 'call-voisins',
      bullets: [
        'DEFINITION: Voisins du Zero (French for "neighbors of zero") covers the 17 numbers on the wheel that surround the zero pocket from 22 to 25 going the long way',
        'RULES: This call bet requires exactly 9 chips placed in specific positions: 2 chips on 4-7 split, 1 chip on 12-15, 1 on 18-21, 1 on 19-22, 1 on 32-35, 1 on 25-29, 1 on 22-25, and 1 chip on the 0-2-3 street (0, 2, 3)',
        'NUMBERS: Covers 17 numbers: 22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25; total chip cost = 9 chips; payout varies by which number hits (from 35:1 down to 5:1)',
        'STRATEGY: Voisins covers nearly half the wheel (17/37 = 45.95%); it is popular in French casinos for covering the zero section heavily',
        'DEALER: The dealer must memorize the 9-chip placement pattern; called bets are announced verbally before the spin and the dealer places the chips accordingly',
        'MISCONCEPTIONS: Players think Voisins reduces house edge because it covers many numbers; each individual bet within the combination still carries the standard 2.70% house edge',
        'EDGE CASES: Voisins is only available on European single-zero wheels; it is called a "call bet" (announced bet) and is not available on American tables'
      ],
      note: 'Voisins: 9 chips covering 17 numbers around zero, French only'
    },
    {
      id: '2-17',
      section: 'S4',
      title: 'Tiers du Cylindre',
      svg: 'call-tiers',
      bullets: [
        'DEFINITION: Tiers du Cylindre (French for "third of the cylinder") covers the 12 numbers on the opposite side of the wheel from Voisins, approximately one-third of the wheel',
        'RULES: This call bet requires exactly 6 chips placed as split bets on six pairs: 5-8, 10-11, 13-16, 23-24, 27-30, 33-36',
        'NUMBERS: Covers 12 numbers: 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27; total chip cost = 6 chips; any hit pays 17:1 on that split',
        'STRATEGY: Tiers covers exactly one-third of the wheel (12/37 = 32.43%) using only 6 chips; it is the most economical call bet',
        'DEALER: The dealer places 6 chips on the six designated split positions; the bet is announced as "Tiers" and the dealer must know the exact placement',
        'MISCONCEPTIONS: Players believe Tiers has different odds than a standard dozen bet; the house edge is identical at 2.70%',
        'EDGE CASES: Tiers is a fixed combination that cannot be modified; some casinos offer "Tiers 5-8" as a variant; only available on European wheels'
      ],
      note: 'Tiers: 6 chips covering 12 numbers on one-third of the wheel'
    },
    {
      id: '2-18',
      section: 'S4',
      title: 'Orphelins',
      svg: 'call-orphelins',
      bullets: [
        'DEFINITION: Orphelins (French for "orphans") covers the 8 numbers that are not included in either Voisins du Zero or Tiers du Cylindre',
        'RULES: Requires exactly 5 chips placed as: 1 chip straight-up on 1, 1 chip straight-up on 6, 1 chip straight-up on 9, 1 chip on 14-17 split, and 1 chip on 17-20 split (or 1 chip on 17-18-19 street depending on variant)',
        'NUMBERS: Covers 8 numbers: 1, 6, 9, 14, 17, 20, 31, 34; total chip cost = 5 chips; payout varies by which number hits (35:1 for straights, 17:1 for splits)',
        'STRATEGY: Orphelins covers the leftover numbers after Voisins and Tiers; it is the smallest of the three main call bet groups',
        'DEALER: The dealer places chips on the specific orphan numbers; two standard variants exist ("Orphelins en plein" and "Orphelins a cheval")',
        'MISCONCEPTIONS: Players think "orphan" numbers are harder to hit; each number still has exactly 1/37 probability regardless of grouping',
        'EDGE CASES: The two variants of Orphelins use slightly different chip placements; "Orphelins en plein" uses more straight-up bets while "Orphelins a cheval" uses more split bets'
      ],
      note: 'Orphelins: 5 chips covering 8 "orphan" numbers not in Voisins/Tiers'
    },
    {
      id: '2-19',
      section: 'S4',
      title: 'Jeu Zero',
      svg: 'call-jeuzero',
      bullets: [
        'DEFINITION: Jeu Zero (French for "zero game") covers the 7 numbers closest to the zero pocket on the wheel: 0, 4, 7, 12, 15, 18, 21',
        'RULES: Requires exactly 4 chips placed as: 1 chip on 0-3 split, 1 chip on 12-15 split, 1 chip on 18-21 split, and 1 chip on 19-22-26-32 corner (or 1 chip on 4-7 split in some versions)',
        'NUMBERS: Covers 7 numbers: 0, 4, 7, 12, 15, 18, 21, 19, 22, 26, 32 (depending on variant, the actual coverage may be 7 distinct numbers); total chip cost = 4 chips',
        'STRATEGY: Jeu Zero is the most focused call bet targeting the zero region; it uses only 4 chips making it accessible for smaller bankrolls',
        'DEALER: The dealer announces "Jeu Zero" and places 4 chips in the designated pattern; this is the smallest and most precise call bet',
        'MISCONCEPTIONS: Players think Jeu Zero gives special protection on zero; the house edge on each component bet remains the standard 2.70%',
        'EDGE CASES: Jeu Zero is sometimes grouped under "Voisins" as a subset; the exact chip placement varies by casino; only available on European wheels'
      ],
      note: 'Jeu Zero: 4 chips covering 7 numbers near zero, the smallest call bet'
    },
    {
      id: '2-20',
      section: 'S4',
      title: 'Neighbors and Finals',
      svg: 'wheel-eu',
      bullets: [
        'DEFINITION: Neighbors bet covers a number plus the two numbers on each side of it on the wheel (5 numbers total); Finals bet covers all numbers ending in the same digit (e.g., all numbers ending in 7: 7, 17, 27)',
        'RULES: A neighbors bet on "5 and neighbors" covers numbers 5 plus the two adjacent numbers on each side; a finals bet on "final 7" covers all numbers ending in 7 across the layout',
        'NUMBERS: Neighbors bet covers 5 numbers with varying chip placement; finals bet on a single digit covers 3 or 4 numbers (1-36): final 0 covers 10, 20, 30 (3 numbers); final 6 covers 6, 16, 26, 36 (4 numbers)',
        'STRATEGY: Neighbors bets focus on wheel-adjacent numbers rather than layout-adjacent numbers; finals bets target numbers sharing a digit which is useful for themed betting',
        'DEALER: The dealer must know wheel positions to place neighbors bets correctly; finals bets require identifying all numbers on the layout ending with the called digit',
        'MISCONCEPTIONS: Players think neighbors bets have different odds because they use wheel positions; each number within the combination still has 1/37 probability',
        'EDGE CASES: Neighbors bets are typically limited to 5-number coverage; "neighbors and their neighbors" (9-number) variants exist at some casinos; finals bets on 0 covers only 3 numbers (10, 20, 30)'
      ],
      note: 'Neighbors: 5 numbers on wheel; Finals: numbers ending in same digit'
    },
    // ── S5: Special Rules ───────────────────────────────────────────
    {
      id: '2-21',
      section: 'S5',
      title: 'En Prison Rule',
      svg: 'enprison-flow',
      bullets: [
        'DEFINITION: En Prison is a French roulette rule that applies to even-money outside bets (Red/Black, Odd/Even, Low/High) when the ball lands on zero; the bet is "imprisoned" for the next spin',
        'RULES: When zero hits, the even-money bet is not lost but marked with a "prison" indicator (a small token); on the next spin if the bet wins, the chip is returned without profit; if zero hits again the bet may be imprisoned again or lost depending on the casino',
        'NUMBERS: With En Prison, the house edge on even-money bets drops from 2.70% to 1.35% (EU); calculation: the bet wins on 18 numbers (net +1), loses on 18 numbers (net -1), and on zero the bet is imprisoned giving another chance with same 18/37 win probability',
        'STRATEGY: When playing European roulette with En Prison, always use even-money bets to benefit from the reduced 1.35% house edge; this is the best bet in roulette',
        'DEALER: The dealer marks the imprisoned bet with a special token and does not collect it; on the next spin the dealer resolves the imprisoned bet first before taking new bets',
        'MISCONCEPTIONS: Players think En Prison means the bet is lost; the bet is merely held over for one spin and can be recovered',
        'EDGE CASES: Some casinos limit En Prison to one spin only (if zero hits twice in a row the bet is forfeited); others continue re-imprisoning; the rule only applies to even-money bets, not inside bets'
      ],
      note: 'En Prison: even-money bets imprisoned on zero, HE drops to 1.35%'
    },
    {
      id: '2-22',
      section: 'S5',
      title: 'La Partage Rule',
      svg: 'enprison-flow',
      bullets: [
        'DEFINITION: La Partage (French for "sharing") is a rule where even-money bets lose only half their value when the ball lands on zero; the other half is returned to the player',
        'RULES: When zero hits, the dealer immediately splits the even-money bet in half; half is returned to the player and half is collected by the house',
        'NUMBERS: With La Partage the house edge on even-money bets drops from 2.70% to 1.35% (EU); calculation: expected return = (18/37)*1 + (18/37)*(-1) + (1/37)*(-0.5) = -0.5/37 = -1.35%',
        'STRATEGY: La Partage offers identical player advantage to En Prison (1.35% HE); La Partage is simpler and preferred by players who want immediate resolution rather than waiting for the next spin',
        'DEALER: The dealer collects half the bet and returns the other half immediately; no tracking or markers are needed as with En Prison',
        'MISCONCEPTIONS: Players believe La Partage only applies in France; many European and online casinos offer La Partage on single-zero tables',
        'EDGE CASES: La Partage and En Prison are mutually exclusive (a casino offers one or the other, not both); neither rule is available on American or triple-zero wheels'
      ],
      note: 'La Partage: half of even-money bet returned on zero, HE = 1.35%'
    },
    // ── S6: Mechanics ───────────────────────────────────────────────
    {
      id: '2-23',
      section: 'S6',
      title: 'Ball Trajectory',
      svg: 'ball-trajectory',
      bullets: [
        'DEFINITION: Ball trajectory describes the path of the roulette ball from the moment it is thrown by the dealer until it settles into a pocket; understanding trajectory is the basis of visual ballistics',
        'RULES: The dealer spins the wheel clockwise at a consistent speed, then throws the ball counter-clockwise along the outer track; the ball orbits several times, loses momentum, drops onto the rotating wheel, bounces off deflectors, and lands in a pocket',
        'NUMBERS: A typical spin takes 10-20 seconds from ball throw to result; the ball travels approximately 5-8 revolutions around the track; a wheel rotating at 30 RPM and ball at 20 RPM creates a relative speed difference critical to trajectory analysis',
        'STRATEGY: Some players attempt to predict the landing zone by timing the ball and wheel speeds; this is called visual ballistics and is controversial',
        'DEALER: The dealers are trained to spin with consistent speed and release point to ensure randomness; some dealers develop a consistent "signature" spin',
        'MISCONCEPTIONS: Players think the ball "wants" to land in certain pockets due to the deflectors; modern wheel manufacturing ensures true randomness',
        'EDGE CASES: Wheel speed and ball speed vary with temperature, humidity, and wheel wear; casinos regularly oil and maintain wheels to prevent predictable trajectory patterns'
      ],
      note: 'Ball trajectory spans 10-20 seconds, 5-8 revolutions before landing'
    },
    {
      id: '2-24',
      section: 'S6',
      title: 'Dealer Timeline (60-Second Round)',
      svg: 'dealer-timeline',
      bullets: [
        'DEFINITION: A standard roulette round follows a strict 60-second timeline from the "place your bets" announcement to the payout completion; this ensures game integrity and prevents late bets',
        'RULES: Seconds 0-30: players place bets; Second 30: dealer says "Rien ne va plus" (no more bets); Seconds 30-40: dealer spins wheel and throws ball; Seconds 40-50: ball orbits and lands; Seconds 50-60: dealer announces result, marks with dolly, pays winners, and clears losing bets',
        'NUMBERS: The betting window is exactly 30 seconds; the ball is in motion for approximately 10-20 seconds; payout processing takes 20-30 seconds; total round time is approximately 60-90 seconds',
        'STRATEGY: Experienced players place their bets early to avoid rushed decisions; betting late is impossible because the dealer enforces "Rien ne va plus" strictly',
        'DEALER: The dealer controls the entire timeline; they must enforce betting deadlines, maintain consistent spin speed, and calculate payouts accurately under time pressure',
        'MISCONCEPTIONS: Players think they can place bets after the ball is thrown; any late bets are rejected by the dealer and may result in ejection from the casino',
        'EDGE CASES: High-limit tables may have longer betting windows; automated roulette (electronic) has a fixed digital timer with no dealer discretion'
      ],
      note: '60-second round: 30s betting, 20s ball flight, 10-30s payout'
    },
    {
      id: '2-25',
      section: 'S6',
      title: 'Color Chip Management',
      svg: 'colorchip-mgmt',
      bullets: [
        'DEFINITION: Color chip management is a system unique to roulette where each player receives chips of a distinct color with no face value printed on them; value is assigned via a lammer (marker) at the table',
        'RULES: When buying in, the player selects a chip color and the dealer sets its value on the lammer (e.g., $1, $5, $25); the player cannot change the value of their chips during the session without the dealers approval',
        'NUMBERS: Typical chip values range from $0.25 to $100 per chip depending on table limits; a standard table has 8-10 chip colors each corresponding to one player; the minimum bet is usually 1 chip or the table minimum',
        'STRATEGY: Color chips prevent confusion when multiple players bet on the same numbers; always confirm your chip value with the dealer before betting',
        'DEALER: The dealer gives each player a unique color and sets the lammer value; the dealer tracks all chip values and manages buy-ins, payouts, and color changes',
        'MISCONCEPTIONS: Players think they can change their chip value at any time; chip value can only be changed by the dealer at the start of a new round',
        'EDGE CASES: Some casinos use "value chips" (regular casino checks) instead of color chips on higher-limit tables; color chips cannot be removed from the roulette table and must be cashed at the same table'
      ],
      note: 'Color chips: unique per player, value set by lammer marker, no printed value'
    },
    {
      id: '2-26',
      section: 'S6',
      title: 'Betting Methods',
      svg: 'wheel-compare',
      bullets: [
        'DEFINITION: Bets can be placed as "inside bets" (specific numbers on the layout grid) or "outside bets" (larger area bets on the periphery); called bets are announced verbally in French roulette',
        'RULES: Inside bets require chips placed directly on number squares, lines, or intersections; outside bets go in designated boxes; called bets are announced to the dealer before the spin and placed by the dealer',
        'NUMBERS: There are 11 standard inside bet types (straight, split, street, corner, six-line, top line) and 5 standard outside bet types (red/black, odd/even, low/high, dozen, column); called bets add 5 more (voisins, tiers, orphelins, jeu zero, neighbors/finals)',
        'STRATEGY: Combine inside and outside bets to create coverage patterns; using the same chip denomination for all bets simplifies tracking; maximum bet limits apply per number (not per chip position)',
        'DEALER: The dealer must verify all bets are within layout limits and placed correctly before spinning; the dealer uses a rake to reach bets on the layout without touching the wheel',
        'MISCONCEPTIONS: Players think stacking multiple chips on one number increases probability; each chip is a separate bet with independent 1/37 probability',
        'EDGE CASES: Some tables have "maximum bet" limits per number (e.g., $100 max straight-up); betting more than the maximum requires approval from the pit boss'
      ],
      note: '11 inside + 5 outside bet types; called bets announced verbally'
    },
    // ── S7: Systems & Fallacies ─────────────────────────────────────
    {
      id: '2-27',
      section: 'S7',
      title: 'Martingale Critique',
      svg: 'martingale-tree',
      bullets: [
        'DEFINITION: The Martingale system is a negative progression betting strategy where the player doubles their bet after every loss to recover all previous losses plus a small profit when they eventually win',
        'RULES: Start with a base bet (e.g., $5 on Red); after each loss, double the previous bet; after a win, return to the base bet; the theory is that a win will eventually occur to recover all losses',
        'NUMBERS: Starting with $5, after 7 consecutive losses the bet sequence is: $5, $10, $20, $40, $80, $160, $320; total loss after 7 losses = $635; the 8th bet would be $640; probability of 7 consecutive losses on even-money EU bet = (19/37)^7 = 0.94% or about 1 in 106 sequences',
        'STRATEGY: Martingale appears low-risk because most sequences end quickly with a $5 profit; however the 1% chance of a catastrophic loss makes the expected value negative at exactly -2.70% per bet',
        'DEALER: The dealer does not track or enforce betting systems; table limits (e.g., $5 minimum, $500 maximum) naturally break Martingale progressions',
        'MISCONCEPTIONS: Players believe Martingale is a "guaranteed" winning system; the system cannot overcome the house edge and exposes players to large losses for small gains',
        'EDGE CASES: A player with an infinite bankroll and no table limits could theoretically never lose with Martingale; in practice both bankroll and table limits make the system guaranteed to eventually fail; expected loss per sequence = -2.70% of total wagered'
      ],
      note: 'Martingale: double after loss; 7 losses = $635; table limits guarantee failure'
    },
    {
      id: '2-28',
      section: 'S7',
      title: 'D Alembert / Fibonacci / Labouchere',
      svg: 'allgame-he-compare',
      bullets: [
        'DEFINITION: These three negative-progression betting systems offer alternatives to the Martingale: D Alembert increases bets by 1 unit after a loss; Fibonacci follows the Fibonacci sequence; Labouchere uses a number sequence to determine bet sizes',
        'RULES: D Alembert: increase bet by 1 after a loss, decrease by 1 after a win (base $5 -> $6 after loss, etc.); Fibonacci: bet follows 1-1-2-3-5-8-13-21-34... where each bet is the sum of the two previous; Labouchere: write a sequence (e.g., 1-2-3-4), bet = first + last; remove both on win, add bet size to end on loss',
        'NUMBERS: D Alembert after 7 losses from $5: $5+$6+$7+$8+$9+$10+$11 = $56 total loss; Fibonacci after 7 losses: 1+1+2+3+5+8+13 = 33 units; Labouchere with sequence 1-2-3-4: first bet = 5, after loss sequence = 1-2-3-4-5, next bet = 6; all systems have zero effect on house edge',
        'STRATEGY: All three systems are slower progressions than Martingale (less aggressive recovery, less catastrophic loss); D Alembert is the most conservative; Labouchere is the most customizable',
        'DEALER: The dealer is indifferent to betting systems; all bet amounts must comply with table limits; the dealer processes each bet as a separate wager regardless of the system used',
        'MISCONCEPTIONS: Players think varying bet sizes changes the expected value; every bet carries the same -2.70% house edge regardless of bet size history',
        'EDGE CASES: D Alembert is often called a "casino banker" system; Fibonacci sequences can grow quickly (after 15 losses: 610 units); Labouchere requires the player to remember the sequence and is more prone to player error'
      ],
      note: 'All progressive systems have zero effect on the fixed -2.70% house edge'
    },
    // ── S8: Advanced Concepts ───────────────────────────────────────
    {
      id: '2-29',
      section: 'S8',
      title: 'Wheel Bias Detection',
      svg: 'wheel-eu',
      bullets: [
        'DEFINITION: Wheel bias detection is the process of identifying physical imperfections in a roulette wheel that cause certain numbers to land more frequently than probability would predict',
        'RULES: Bias detection requires recording thousands of spins and analyzing results using statistical tests (e.g., chi-squared test); a wheel is considered biased if results deviate from expected distribution beyond 3 standard deviations',
        'NUMBERS: After 10,000 spins on a fair European wheel, each of the 37 numbers should appear approximately 270 times (10,000/37 = 270.27); standard deviation = sqrt(10000 * (1/37) * (36/37)) = approximately 16.3; a number appearing 270 + (3 * 16.3) = 319 times is statistically suspicious',
        'STRATEGY: Professional advantage players historically tracked wheel bias by recording thousands of spins and betting on biased numbers; the Eudaemons used a hidden computer in the 1970s to analyze bias',
        'DEALER: The dealer does not benefit from bias detection; casinos regularly test wheels for bias and replace them if detected',
        'MISCONCEPTIONS: Players think bias is common in modern casinos; modern wheel manufacturing (since the 1990s) produces wheels with tolerances far exceeding randomness requirements',
        'EDGE CASES: Bias detection is nearly impossible in modern casinos due to: (1) frequent wheel maintenance and replacement, (2) random wheel and layout swapping between tables, (3) digital RNG-based electronic roulette which has no physical bias; historical cases are mostly from the 1970s-1980s'
      ],
      note: 'Wheel bias: 3+ sigma deviation over 10,000+ spins; virtually nonexistent today'
    },
    {
      id: '2-30',
      section: 'S8',
      title: 'Dealer Signature',
      svg: 'dealer-timeline',
      bullets: [
        'DEFINITION: Dealer signature theory proposes that a dealer may develop a consistent spin speed and ball release point that causes the ball to land in a predictable sector of the wheel',
        'RULES: The theory suggests that if a dealer spins the wheel at exactly the same speed and releases the ball at the same point every time, the ball may land in the same relative sector; players attempt to identify and bet on these sectors',
        'NUMBERS: For dealer signature to be exploitable the dealer would need to be consistent within approximately 1/2 of a wheel revolution (+- 5 pockets); on a 37-pocket wheel this represents a 10/37 = 27% landing zone vs. the expected 2.70% for a single number',
        'STRATEGY: Players track a dealers spins and look for patterns in the landing sector; if a dealer consistently lands in sector A, the player bets on that sector',
        'DEALER: Casinos train dealers to vary their spin speed and release point specifically to prevent signature development; dealers are rotated between tables every 20-30 minutes',
        'MISCONCEPTIONS: Dealer signature is highly controversial with most experts dismissing it as theoretically impossible given the ball bounces across multiple deflectors before landing',
        'EDGE CASES: Even if a dealer had a perfect signature, the ball bounces off multiple diamond-shaped deflectors (typically 8-16 on a standard wheel) which randomizes the final pocket; statistical studies have found no evidence of exploitable dealer signature in modern casinos'
      ],
      note: 'Dealer signature: controversial theory, most studies find no evidence'
    },
    {
      id: '2-31',
      section: 'S8',
      title: 'Visual Ballistics',
      svg: 'ball-trajectory',
      bullets: [
        'DEFINITION: Visual ballistics is the practice of predicting the approximate landing zone of the roulette ball by visually tracking the wheel and ball speeds and calculating the relative stopping point',
        'RULES: The player observes the wheel rotation speed and ball orbit speed, estimates the number of revolutions remaining, and places a bet on the predicted sector before "Rien ne va plus" is called',
        'NUMBERS: With a perfect estimate of wheel speed (RPM) and ball speed (RPM), the landing sector can be calculated as: ball revolutions * ball track distance - wheel revolutions * wheel circumference = landing offset from release point; typical wheel: 30 RPM, ball: 20 RPM, relative difference = 10 RPM',
        'STRATEGY: The player must mentally calculate the landing sector in approximately 5-10 seconds and place chips before betting closes; this requires significant practice and fast mental arithmetic',
        'DEALER: The dealer enforces the betting deadline regardless of player calculations; dealers are trained to vary spin parameters to defeat visual ballistics attempts',
        'MISCONCEPTIONS: Many players claim to use visual ballistics but most cannot demonstrate consistent profits; the ball deflectors (diamonds) introduce significant randomness that makes precise prediction impossible',
        'EDGE CASES: Some casinos use mirrored wheel rims or deflector hoods specifically to make visual tracking difficult; electronic roulette eliminates visual ballistics entirely since the outcome is determined by a digital RNG'
      ],
      note: 'Visual ballistics: predictive method, legally gray, debated effectiveness'
    },
    // ── S9: Math ────────────────────────────────────────────────────
    {
      id: '2-32',
      section: 'S9',
      title: 'Payout Calculation',
      svg: 'allgame-he-compare',
      bullets: [
        'DEFINITION: Payout calculation determines the amount won for each bet type based on the ratio of winning numbers to total numbers; each bet has a fixed payout ratio that determines the house edge',
        'RULES: Payouts are calculated as (probability of win * payout) + (probability of loss * (-1)) = expected return; the house edge is the negative of the expected return for every bet type',
        'NUMBERS: Straight: 35:1 (1/37 win), Split: 17:1 (2/37), Street: 11:1 (3/37), Corner: 8:1 (4/37), Six Line: 5:1 (6/37), Top Line: 6:1 (5/38, HE 7.89%), Column/Dozen/Snake: 2:1 (12/37), Even-money: 1:1 (18/37); all standard bets on EU have HE = 1/37 = 2.70%',
        'STRATEGY: Exact payout calculation: for a straight-up $10 bet on EU, if win return = $10 * 35 + original $10 = $360 (net +$350); probability = 1/37; expected value = ($350 * 1/37) + (-$10 * 36/37) = -$10/37 = -$0.27 per $10 bet on European wheel',
        'DEALER: The dealer must instantly calculate payouts for multiple bets; they use chip stacking to count payouts efficiently (e.g., 35 chips for a straight-up win are stacked in groups of 5 for quick verification)',
        'MISCONCEPTIONS: Players confuse "to 1" and "for 1" payout terminology; 35:1 means you get 35 chips plus your original chip (36 total); some casinos use "for 1" notation where the original is not returned',
        'EDGE CASES: In American roulette all standard bets have HE = 2/38 = 5.26%; the Top Line has HE = (6*5 - 33)/38 = -3/38 = -7.89%; En Prison and La Partage reduce even-money HE to 1/74 = 1.35% on European wheels; triple-zero has HE = 3/39 = 7.69%'
      ],
      note: 'All standard bets: HE = 2.70% (EU) or 5.26% (US); only Top Line differs'
    },
  ]
}

export default slides

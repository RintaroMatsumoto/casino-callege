import type { PhaseSlides } from './types'

const slides: PhaseSlides = {
  title: 'Fundamentals',
  emoji: '\u{1F3E0}',
  slides: [
    {
      id: '0-0', section: 'S0', title: 'Casino 3 Zones', svg: 'learning-path', bullets: [
        'DEFINITION: The casino floor is divided into three distinct operational zones: table games (dealer-mediated), slot machines (automated RNG), and poker rooms (player-versus-player with casino rake).',
        'RULES: Table games require a dealer to manage cards, chips, and bet settlement; slot machines operate 24/7 on RNG with zero human interaction; poker rooms generate revenue via time rake or per-hand commission rather than house-banked play.',
        'RULES: Table minimums range from $5 to $100,000 per hand; slot denominations range from $0.01 to $100 per spin; poker rake is typically 5% of the pot capped at $5-$15 per hand.',
        'NUMBERS: Table games contribute 20-30% of total casino revenue; slot machines contribute 60-70%; poker rooms and all other table games contribute less than 5% combined.',
        'STRATEGY: Dealers work exclusively in the table games zone; understanding zone differences explains why dealers must master game-specific procedures while slot zones require only maintenance staff and cashier attendants.',
        'PROCEDURE: A dealer never handles slot machine payouts or poker table chips; dealers must know when to call a floor supervisor for rule disputes versus resolving matters within standard procedure.',
        'MISCONCEPTION: Many players believe the casino controls poker outcomes because dealers handle chips; in reality, poker is exclusively player-versus-player and the casino collects only the rake regardless of who wins.',
        'EDGE CASE: Electronic table games (ETGs) blend slot automation with table-game rules and betting limits, creating a hybrid zone where dealers supervise but do not handle cards, requiring familiarity with touch-screen interfaces.',
      ], note: 'This course focuses on the table games zone only.'
    },
    {
      id: '0-1', section: 'S0', title: 'Deck Composition', svg: 'card-values', bullets: [
        'DEFINITION: A standard 52-card deck consists of 4 suits (Spades, Hearts, Clubs, Diamonds), each containing 13 ranks (Ace, 2 through 10, Jack, Queen, King), with no duplicate cards.',
        'RULES: Suits are divided into two colors: Spades and Clubs are black; Hearts and Diamonds are red. Suit color matters in Poker (flushes and flushes royal) but is completely irrelevant in Blackjack and Baccarat.',
        'RULES: Jokers are excluded from all standard casino table games; a casino-grade deck also has a manufacturer seal and is opened in front of players to verify integrity before first use.',
        'NUMBERS: The total number of possible 2-card combinations from a single deck is C(52,2) = 1,326; from a 6-deck shoe, this becomes C(312,2) = 48,516; an 8-deck baccarat shoe contains C(416,2) = 86,320 combinations.',
        'STRATEGY: The 52-card structure is the mathematical foundation of every table game; house edges, basic strategy tables, and card counting systems are all derived from this fixed composition.',
        'PROCEDURE: Dealers must verify deck integrity before each shift by counting all cards face-up, fanning them to check for damage or markings, and ensuring the manufacturer seal was intact.',
        'MISCONCEPTION: Beginners often think card counting requires memorizing every card dealt; counters actually track only the running ratio of high cards (10-Ace) to low cards (2-6), not specific card positions.',
        'EDGE CASE: Spanish 21 removes all four 10-value cards from each suit, creating a 48-card deck; this shifts the house edge significantly and changes basic strategy, requiring dealers to memorize modified procedures.',
      ], note: 'Standard 52-card deck with 4 suits and 13 ranks.'
    },
    {
      id: '0-2', section: 'S0', title: 'Card Values (Blackjack)', svg: 'card-values', bullets: [
        'DEFINITION: In Blackjack, number cards 2-10 are worth their face value, all face cards (Jack, Queen, King) are worth 10, and the Ace can be valued as either 1 or 11 at the player\'s discretion.',
        'RULES: A hand counting the Ace as 11 is called a "soft" hand; if drawing another card would cause the soft hand to exceed 21, the Ace automatically reverts to 1 without player choice.',
        'RULES: The dealer must stand on 17 or higher (exact rule varies: H17 vs S17) and must hit on 16 or lower; the dealer does not choose Ace values but follows fixed house rules automatically.',
        'NUMBERS: Probability of a natural blackjack (Ace + 10-value card) from a single deck is 4.83%; from a 6-deck shoe it is 4.75%; the house edge with basic strategy is 0.50% for S17 and 0.67% for H17.',
        'STRATEGY: The Ace\'s dual value creates the blackjack bonus payout (3:2) and is why basic strategy recommends splitting Aces and 8s but never splitting 10s, 5s, or 4s.',
        'PROCEDURE: Dealers announce "blackjack" when they or a player shows an Ace with a 10-value card; they immediately resolve by paying 3:2 or collecting losing bets before continuing with remaining hands.',
        'MISCONCEPTION: Many players think a dealer must stand on all 17s; in Atlantic City and most modern casinos, the dealer hits soft 17 (H17), increasing the house edge by approximately 0.20%.',
        'EDGE CASE: When the dealer shows an Ace, players are offered "insurance" (a side bet paying 2:1 that the dealer has blackjack); insurance is a sucker bet with a 7.40% house edge and should never be taken.',
      ], note: 'Number cards = face value. Face cards = 10. Ace = 1 or 11.'
    },
    {
      id: '0-3', section: 'S0', title: 'Card Values (Baccarat)', svg: 'card-values', bullets: [
        'DEFINITION: In Baccarat, Aces are worth 1, number cards 2-9 are worth their face value, and all 10-value cards and face cards (10, Jack, Queen, King) are worth exactly 0.',
        'RULES: Hand value is calculated by summing all card values and taking only the last digit (modulo 10); for example 7+6=13 becomes 3, and 10+8=18 becomes 8; the highest possible hand value is 9.',
        'RULES: A third card may be drawn automatically based on a fixed third-card table; no player or dealer decisions affect the draw, making Baccarat a purely mechanical game with zero skill element.',
        'NUMBERS: Banker hand wins 45.86% of hands, Player hand wins 44.62%, and Tie occurs 9.52%; house edge on Banker (after 5% commission) is 1.06%, on Player is 1.24%, and on Tie is 14.36%.',
        'STRATEGY: Baccarat\'s zero-value face cards mean the game has no "blackjack" moment and no player decisions; it is the purest game of chance in the casino and the only major game allowing a Banker bet.',
        'PROCEDURE: The dealer (croupier) deals two cards face-up to Player and then Banker positions, announces the totals, and applies the third-card drawing rules mechanically from a printed reference card.',
        'MISCONCEPTION: Novice players think they can influence outcomes by choosing when to draw or by "squeezing" cards slowly; in Baccarat, all drawing rules are fixed and no player action affects the result.',
        'EDGE CASE: In EZ Baccarat, the Banker bet pays 1:1 with no commission, but a Banker three-card total of 7 pushes instead of winning; this variant has a slightly lower house edge of 1.02% on Banker.',
      ], note: 'Only the last digit of the total counts. 10/J/Q/K = 0.'
    },
    {
      id: '0-4', section: 'S0', title: 'Chip Colors & Values', svg: 'chip-all-colors', bullets: [
        'DEFINITION: US-standard casino chip colors follow a fixed hierarchy: White $1, Red $5, Green $25, Black $100, Purple $500, and Orange $1,000, with higher denominations using progressively darker colors.',
        'RULES: Casino chips contain RFID tags, UV markings, and precise weight specifications (8.5-10 grams each) to prevent counterfeiting; each casino may customize edge spots but must follow the standard color-value convention.',
        'RULES: Players purchase chips at the cage or directly at the table; chips are interchangeable across all table games within the same casino property but must be cashed out at the cage before leaving.',
        'NUMBERS: A full rack of 100 chips represents $500 (red), $2,500 (green), $10,000 (black), or $50,000 (purple); a typical casino chip float (total chips in circulation) exceeds $10 million.',
        'STRATEGY: Color-coding lets dealers instantly verify bet amounts at a glance across a full table, speeds up payout calculations, and prevents disputes by making wagered amounts visually obvious.',
        'PROCEDURE: Dealers "color up" by exchanging lower-denomination chips for higher ones when a player cashes out; they "color in" by breaking larger chips into smaller denominations as needed during active play.',
        'MISCONCEPTION: Players often believe all casinos worldwide use identical chip colors; while the $1/$5/$25/$100 standard is nearly universal in the US, European and Asian casinos often use different color schemes.',
        'EDGE CASE: Roulette uses non-denominational colored chips assigned uniquely to each player; these chips have no cash value outside that specific roulette game and must be exchanged for standard chips before leaving the table.',
      ], note: 'White $1 / Red $5 / Green $25 / Black $100 / Purple $500 / Orange $1K.'
    },
    {
      id: '0-5', section: 'S0', title: 'Probability Foundation', svg: 'dice-sum-prob', bullets: [
        'DEFINITION: Probability is the number of desired outcomes divided by the total number of possible outcomes, forming the mathematical foundation for every house edge calculation in casino gaming.',
        'RULES: Independent events (dice rolls, roulette spins, slot reels) have outcomes that do not affect each other; dependent events (card draws without replacement) change probability as cards are removed from the deck.',
        'RULES: The probability of multiple independent events all occurring is the product of their individual probabilities; for two consecutive coin flips both landing heads, P = 0.5 x 0.5 = 0.25 or 25%.',
        'NUMBERS: Two six-sided dice produce 36 total combinations; the number 7 appears in 6 combinations (16.67% or 5:1 against), while 2 and 12 each appear in only 1 combination (2.78% or 35:1 against).',
        'STRATEGY: Probability determines every house edge; without understanding probability, a dealer cannot explain why certain bets are mathematically bad or why the casino always wins over the long term.',
        'PROCEDURE: Dealers must calculate payouts quickly using probability-derived odds; craps dealers memorize true odds payouts for all 36 dice combinations and must compute odds bets on the fly.',
        'MISCONCEPTION: The gambler\'s fallacy causes players to believe a number is "due" after several rolls without it; each dice roll is independent with constant probability, so a roulette number missing 200 spins still has a 1/38 chance on the next spin.',
        'EDGE CASE: When casinos offer "promotional odds" like 2:1 on craps hardways instead of the standard 7:1, the house edge reverses; dealers must know the exact probability impact to explain the promotion correctly.',
      ], note: 'Foundation of all casino math. Probability = desired outcomes / total outcomes.'
    },
    {
      id: '0-6', section: 'S0', title: 'Expected Value (EV)', svg: 'martingale-tree', bullets: [
        'DEFINITION: Expected Value is the long-term average result of a bet, calculated by multiplying each possible outcome\'s probability by its net gain and summing all results; all casino games have negative EV for the player.',
        'RULES: EV formula is Sum of (Probability of Outcome x Net Gain for that Outcome); a fair game has EV = 0, casino games range from EV = -0.01 to EV = -0.35 per dollar wagered.',
        'RULES: EV applies over hundreds of thousands of trials; short-term results deviate significantly due to variance (standard deviation), which is why players can win in a session despite negative EV.',
        'NUMBERS: A $10 Pass Line bet in craps has EV = -$0.141 (1.41% house edge); a $10 blackjack hand with basic strategy has EV = -$0.05 (0.50% edge); a $10 slot spin at 10% house edge has EV = -$1.00.',
        'STRATEGY: Negative EV means no betting system (Martingale, Fibonacci, Labouchere, Paroli) can overcome the math; Martingale doubling after losses increases risk linearly without changing EV, ultimately hitting the table maximum bet limit.',
        'PROCEDURE: Dealers do not explain EV to players unless specifically asked; when asked, the correct response is to refer the player to a floor supervisor, as discussing house math is restricted policy.',
        'MISCONCEPTION: Most players believe a "hot streak" or winning session proves the math is wrong; variance creates streaks in both directions, but EV guarantees the casino profit over sufficient trials measured in the millions.',
        'EDGE CASE: Card counting shifts blackjack EV by +0.5% to +1.5% in the player\'s favor; a counter with +1% edge betting $100 per hand has positive EV of +$1.00 per hand, which is why casinos identify and ban counters.',
      ], note: 'EV explains why you cannot beat the casino long-term. Every bet has negative expected value.'
    },
    {
      id: '0-7', section: 'S0', title: 'House Edge Comparison', svg: 'allgame-he-compare', bullets: [
        'DEFINITION: House edge is the mathematical percentage of each bet the casino expects to keep on average over the long term, calculated from the game rules and independent of short-term outcomes.',
        'RULES: House edge varies by game type, specific bet within the game, and player skill level; Blackjack with perfect basic strategy has the lowest edge while keno and slot machines have the highest.',
        'RULES: The house edge is baked into the game rules and cannot be eliminated by any betting strategy; reducing the house edge requires changing game rules (fewer decks, S17, late surrender) or playing perfectly.',
        'NUMBERS: Blackjack basic strategy 0.50%, Baccarat Banker 1.06%, Craps Pass Line 1.41%, European Roulette 2.70%, American Roulette 5.26%, Casino War 2.88%, Slots 7-15%, Keno 25-35%.',
        'STRATEGY: Dealers must know house edges to explain game rules accurately and to understand why certain bets (insurance in blackjack, tie in baccarat, 5-number bet in roulette) are particularly disadvantageous.',
        'PROCEDURE: Dealers never quote specific house edge percentages to players unless authorized by floor management; the standard response is "I am not permitted to discuss the mathematical details of the game."',
        'MISCONCEPTION: Players often think higher table minimums mean better odds; house edge is independent of bet size, so a $100 blackjack table has the same 0.50% house edge as a $5 table with identical rules.',
        'EDGE CASE: Progressive jackpot slots temporarily reach negative house edge (player advantage) when the jackpot exceeds its breakeven point; professional slot advantage players track these thresholds and play only when EV turns positive.',
      ], note: 'Lower house edge = better for the player. Blackjack (0.50%) is the lowest; Keno (25-35%) is the highest.'
    },
    {
      id: '0-8', section: 'S0', title: '4 Shuffle Types', svg: 'shuffle4-types', bullets: [
        'DEFINITION: The four standard casino shuffle techniques are the Wash (spreading and mixing all cards on the table), Riffle (interleaving two halves), Strip (pulling random-sized packets), and Overhand (transferring top packets to the bottom).',
        'RULES: The Wash is performed only on new decks: all cards are spread face-down and swirled across the table surface for 30-60 seconds until thoroughly randomized, then gathered into a single pile.',
        'RULES: The Riffle requires splitting the deck exactly in half and using thumbs to interleave cards one-by-one from each half; casino standard requires a minimum of 3 riffles before any game deal.',
        'RULES: The Strip involves pulling 15-25 card blocks from the top repeatedly to break up sequences; the Overhand takes small packets (5-15 cards) from the top and transfers them to the bottom in sequence.',
        'NUMBERS: Seven riffle shuffles are mathematically required to fully randomize a 52-card deck (Gilbert-Shannon-Reeds model); fewer than 3 riffles leave statistically measurable order; automatic shufflers reduce human error by 99%.',
        'STRATEGY: Proper shuffle technique prevents card order predictability that advantage players or card counters could exploit; automatic shuffling machines increase hands per hour by 15-20% and eliminate dealer fatigue errors.',
        'PROCEDURE: Dealers perform wash for new decks, then 2-3 riffles, then a strip, then another riffle before placing cards in the shoe; auto-shuffler tables require the dealer to run cards through the machine once and then transfer to the shoe.',
        'MISCONCEPTION: Players often suspect auto-shufflers are programmed to produce specific losing sequences; auto-shufflers use independently verified RNG algorithms and are tested monthly by state gaming control boards.',
        'EDGE CASE: In high-limit rooms, players may request hand-shuffled play; dealers must be proficient in multiple riffle techniques (dovetail, hindu, table riffle) to accommodate preferences while maintaining shuffle security standards.',
      ], note: 'Wash for new decks, Riffle as the primary shuffle, Strip to break sequences, Overhand for minor adjustments.'
    },
    {
      id: '0-9', section: 'S0', title: 'Dealer Role & Responsibilities', svg: 'skill-tree', bullets: [
        'DEFINITION: The casino dealer is responsible for three core functions: managing game flow (dealing cards, spinning roulette, settling bets), ensuring security (watching for cheats, coordinating with the Eye in Sky), and providing customer service as the face of the casino.',
        'RULES: Dealers must follow fixed procedural steps for every game action: accept bets before the dealing cutoff, never touch placed bets after cards are dealt, announce hand values clearly, and pay winning bets from left to right.',
        'RULES: Dealers must maintain a consistent game pace of 40-60 hands per hour for blackjack and 20-30 spins per hour for roulette; game pace is monitored by pit bosses and directly affects revenue per table per shift.',
        'NUMBERS: A dealer handles $50,000 to $500,000 in chips per shift; the average dealer error costs the casino $50-$200 per incident; the industry standard accuracy target is 99.5% or higher for all transactions.',
        'STRATEGY: The dealer is the most critical security asset on the floor; they see every hand, every bet placement, and every player interaction at close range that surveillance cameras cannot fully capture.',
        'PROCEDURE: Dealers use the cut-card procedure after every shuffle: a player inserts a colored plastic card at a random position in the deck, then the dealer completes the cut by moving the top portion to the bottom.',
        'MISCONCEPTION: New dealers often prioritize speed over accuracy; accuracy is always prioritized because a single mis-pay can cost more in losses than an entire hour of table revenue at the game\'s house edge.',
        'EDGE CASE: When a player disputes a hand or payout, the dealer immediately stops the game, calls "Floor!" loudly while raising a hand, and never touches the chips or cards until the floor supervisor arrives to make a ruling.',
      ], note: 'Accuracy over speed. Report mistakes immediately. Never touch chips or cards during a dispute.'
    },
    {
      id: '0-10', section: 'S0', title: 'Casino Revenue Model', svg: 'allgame-he-compare', bullets: [
        'DEFINITION: Casino revenue comes from three primary sources: slot machines contribute 60-70% of total revenue, table games contribute 20-30%, and non-gaming sources (hotels, restaurants, entertainment, retail) contribute 10-15%.',
        'RULES: Slot machines have the highest house edge at 7-15% and the highest "handle" (total amount wagered) because they operate 24 hours a day with no human labor cost per spin and no dealer breaks.',
        'RULES: Table games require significant labor including dealers, floor supervisors, pit bosses, and surveillance, which reduces net revenue despite lower house edges; a single blackjack table needs 3-5 staff members per shift.',
        'NUMBERS: The average slot machine generates $150-$300 in daily revenue; a blackjack table generates $1,000-$3,000; Nevada total gaming revenue was over $15.5 billion in 2023 with Las Vegas Strip accounting for $8.9 billion.',
        'STRATEGY: The revenue model explains why casinos aggressively promote slots over tables, why table minimums increase during peak hours, and why dealers are paid hourly wages with tips rather than a percentage of table win.',
        'PROCEDURE: Dealers track their "drop" (total chips placed in the locked drop box) each shift; the count room team verifies the drop box contents against the table\'s theoretical win for that shift.',
        'MISCONCEPTION: Players think casinos profit most from high-stakes table games; the vast majority of casino profit comes from low-denomination slot machines played by casual tourists, not from high-roller baccarat or blackjack.',
        'EDGE CASE: Asian-focused casino markets (Macau, Singapore) invert this model, with 80-90% of revenue from table games (primarily Baccarat) rather than slots, requiring different staffing ratios and operational priorities.',
      ], note: 'Slots drive 60-70% of revenue. Table games contribute 20-30%. Non-gaming fills the rest.'
    },
    {
      id: '0-11', section: 'S0', title: 'Casino Hierarchy', svg: 'skill-tree', bullets: [
        'DEFINITION: The casino organizational hierarchy follows a strict chain of command: Gaming Control Board (state regulator), Casino Owner/Board of Directors, General Manager, Casino Manager, Shift Manager, Pit Boss, Floor Supervisor, and Dealer at the table.',
        'RULES: The pit boss oversees 4-8 tables and handles player disputes, credit line authorizations, and game integrity reviews; the floor supervisor reports to the pit boss and handles immediate table-level issues including rule clarifications.',
        'RULES: The count room and surveillance teams report independently from table games staff to prevent collusion; the shift manager coordinates across slots, tables, cage, security, and surveillance departments for one 8-hour shift.',
        'NUMBERS: A typical casino employs 200-1,000 dealers across three shifts; pit bosses oversee 6-10 tables each; floor supervisors cover 2-4 tables; the general manager reports directly to the board and oversees 500-5,000 total employees.',
        'STRATEGY: Dealers must know exactly who to escalate to for each issue type: floor supervisor for rule disputes, pit boss for credit or comp authorization, shift manager for table closure, and surveillance for suspected cheating.',
        'PROCEDURE: Dealers address all supervisors by title ("Floor," "Pit," "Manager"); when a supervisor arrives, the dealer stops dealing immediately, summarizes the situation in 2-3 sentences, and follows the supervisor\'s directive without argument.',
        'MISCONCEPTION: New dealers think they can make independent house-rule decisions; any deviation from standard published procedure requires floor supervisor approval, including accepting late bets or waiving the cut-card requirement.',
        'EDGE CASE: In high-limit salons, the hierarchy compresses: a dedicated pit boss may oversee only 1-2 tables, and the shift manager may personally authorize credit lines exceeding $100,000 at the table without additional approvals.',
      ], note: 'Clear chain of command: Dealer -> Floor -> Pit Boss -> Shift Manager -> Casino Manager.'
    },
    {
      id: '0-12', section: 'S0', title: 'Dealer Career Path', svg: 'skill-tree', bullets: [
        'DEFINITION: The dealer career path has four stages: Dealer School (8-16 weeks of training), Entry-Level Dealer (90-day probationary period), Senior Dealer, and supervisory or specialist roles (Floor Supervisor, Tournament Dealer, High-Limit Dealer).',
        'RULES: Dealer school costs $500-$2,000 and covers game rules, chip-handling mechanics, payout math, shuffle techniques, and customer service; graduation requires passing a skills test administered by the casino or state gaming commission.',
        'RULES: Licensing requires a background check, fingerprinting, and sometimes a written rules exam; licensing fees range from $50-$500 and must be renewed annually; any felony conviction or gaming-related misdemeanor typically disqualifies an applicant.',
        'NUMBERS: Entry-level dealer base salary is $25,000-$35,000 annually plus $15,000-$40,000 in tips (tokes); senior dealers earn $35,000-$50,000 base; pit bosses earn $50,000-$80,000; the median US dealer income is approximately $45,000.',
        'STRATEGY: The dealer role is the primary entry point into casino management; most pit bosses, shift managers, and even general managers began their careers as dealers, making it the most strategically important entry-level position in the industry.',
        'PROCEDURE: New dealers "break in" by working swing shifts and less popular games (Pai Gow Poker, Let It Ride, Three Card Poker) before earning seniority to choose preferred games like blackjack and Day Shift schedules.',
        'MISCONCEPTION: Aspiring dealers think dealing is easy money with no advancement path; dealing requires intensive math skills, sustained high-accuracy performance under pressure, and career advancement requires additional game certifications and supervisory exams.',
        'EDGE CASE: Tribal casinos require dealers to obtain certification from the National Indian Gaming Commission (NIGC) in addition to state licensing; international dealers may need work visas and multi-language proficiency for Macau or Marina Bay Sands positions.',
      ], note: 'School (8-16 weeks) -> Entry Dealer (90-day probation) -> Senior Dealer -> Supervisor/Specialist.'
    },
  ]
}
export default slides

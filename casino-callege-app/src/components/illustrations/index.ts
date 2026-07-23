import React from 'react'

// ---- Blackjack (30 components) ----
import { BJTableTopSvg, BJGameFlowSvg, BJPeekCheckSvg, BJShuffleWashSvg, BJShuffleRiffleSvg, BJShuffleStripSvg, BJShuffleOverhandSvg, BJLoadShoeSvg, BJLoadCardSvg, BJSignalHitSvg, BJSignalStandSvg, BJSignalDoubleSvg, BJSignalSplitSvg, BJSignalSurrenderSvg, BJSignalInsuranceSvg, BJDealOrderSvg, BJStrategyChartSvg, BJS17vsH17Svg, BJPayout3to2Svg, BJInsuranceProofSvg, BJDecksHESvg, BJBustProbSvg, BJHiLoSvg, BJRCtoTCSvg, BJTeamPlaySvg, BJShuffleTrackSvg, BJEdgeSortingSvg, BJHoleCardSvg, BJChipTraySvg, BJPayoutCalcSvg } from './blackjack'

// ---- Craps (40 components) ----
import { CrapsTableTopSvg, CrapsTableSideSvg, DiceGrid36Svg, DiceFaceDetailSvg, DiceSumProbSvg, PassLineTreeSvg, DontPassTreeSvg, CrapsHard4Svg, CrapsHard6Svg, CrapsHard8Svg, CrapsHard10Svg, PlaceBet4Svg, PlaceBet5Svg, PlaceBet6Svg, PlaceBet8Svg, PlaceBet9Svg, PlaceBet10Svg, Any7BetSvg, AnyCrapsBetSvg, HornBetSvg, WorldBetSvg, FieldBetSvg, OddsBetLayoutSvg, Odds3x4x5xSvg, StaffBoxmanSvg, StaffBaseDealerSvg, StaffStickmanSvg, StaffAllSvg, SevenOutMomentSvg, DicePassSvg, PuckOnOffSvg, DiceSet3VSvg, DiceSet2VSvg, DiceSetHardwaySvg, DiceSetAll7sSvg, StickmanCallsSvg, Place6PayoutSvg, PastPostingDetectSvg, DiceTroubleFlowSvg, ChipTidyingSvg } from './craps'

// ---- Roulette (25 components) ----
import { WheelEUSvg, WheelUSSvg, WheelTripleSvg, WheelCompareSvg, InsideStraightSvg, InsideSplitSvg, InsideStreetSvg, InsideCornerSvg, InsideSixLineSvg, InsideTopLineSvg, OutsideRedBlackSvg, OutsideOddEvenSvg, OutsideLowHighSvg, OutsideDozenSvg, OutsideColumnSvg, OutsideSnakeSvg, CallVoisinsSvg, CallTiersSvg, CallOrphelinsSvg, CallJeuZeroSvg, BallTrajectorySvg, EnPrisonFlowSvg, MartingaleTreeSvg, ColorChipMgmtSvg, DealerTimelineSvg } from './roulette'

// ---- Poker (25 components) ----
import { TablePreflopSvg, TableFlopSvg, TableShowdownSvg, Hand1RoyalFlushSvg, Hand2StraightFlushSvg, Hand3FourKindSvg, Hand4FullHouseSvg, Hand5FlushSvg, Hand6StraightSvg, Hand7ThreeKindSvg, Hand8TwoPairSvg, Hand9OnePairSvg, Hand10HighCardSvg, BlindsRotationSvg, BettingRoundsSvg, BurnDealTimingSvg, SidePotSvg, RakeFlowSvg, OutsFlushSvg, PotOddsCalcSvg, StringBetSvg, Collusion3Svg, AngleShootingSvg, BlindGrowthSvg, ChipRaceSvg } from './poker'

// ---- Baccarat (20 components) ----
import { BacDealOrderSvg, BacNaturalFlowSvg, BacTableauPlayerSvg, BacTableauBankerSvg, BacCommissionTableSvg, BacProbabilityPieSvg, BacSqueezeStage1Svg, BacSqueezeStage2Svg, BacSqueezeStage3Svg, BacSqueezeStage4Svg, BacPaletteUseSvg, BacBigRoadSvg, BacBigEyeSvg, BacSmallRoadSvg, BacCockroachSvg, BacCommissionLampSvg, BacDragon7Panda8Svg, BacEdgeSortingIveySvg, BacCardRotate180Svg, BacVIPSalonSvg } from './baccarat'

// ---- Common (5 components) ----
import { AllGameHECompareSvg, Shuffle4TypesSvg, LearningPathSvg, SkillTreeSvg, ChipAllColorsSvg } from './common-extra'

function toKebab(name: string): string {
  return name.replace(/Svg$/, '').replace(/([A-Z])([A-Z]+)([A-Z])/g, '$1$2-$3').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').toLowerCase()
}

const allComponents: Record<string, React.FC> = {
  BJTableTopSvg, BJGameFlowSvg, BJPeekCheckSvg, BJShuffleWashSvg, BJShuffleRiffleSvg, BJShuffleStripSvg, BJShuffleOverhandSvg, BJLoadShoeSvg, BJLoadCardSvg, BJSignalHitSvg, BJSignalStandSvg, BJSignalDoubleSvg, BJSignalSplitSvg, BJSignalSurrenderSvg, BJSignalInsuranceSvg, BJDealOrderSvg, BJStrategyChartSvg, BJS17vsH17Svg, BJPayout3to2Svg, BJInsuranceProofSvg, BJDecksHESvg, BJBustProbSvg, BJHiLoSvg, BJRCtoTCSvg, BJTeamPlaySvg, BJShuffleTrackSvg, BJEdgeSortingSvg, BJHoleCardSvg, BJChipTraySvg, BJPayoutCalcSvg,
  CrapsTableTopSvg, CrapsTableSideSvg, DiceGrid36Svg, DiceFaceDetailSvg, DiceSumProbSvg, PassLineTreeSvg, DontPassTreeSvg, CrapsHard4Svg, CrapsHard6Svg, CrapsHard8Svg, CrapsHard10Svg, PlaceBet4Svg, PlaceBet5Svg, PlaceBet6Svg, PlaceBet8Svg, PlaceBet9Svg, PlaceBet10Svg, Any7BetSvg, AnyCrapsBetSvg, HornBetSvg, WorldBetSvg, FieldBetSvg, OddsBetLayoutSvg, Odds3x4x5xSvg, StaffBoxmanSvg, StaffBaseDealerSvg, StaffStickmanSvg, StaffAllSvg, SevenOutMomentSvg, DicePassSvg, PuckOnOffSvg, DiceSet3VSvg, DiceSet2VSvg, DiceSetHardwaySvg, DiceSetAll7sSvg, StickmanCallsSvg, Place6PayoutSvg, PastPostingDetectSvg, DiceTroubleFlowSvg, ChipTidyingSvg,
  WheelEUSvg, WheelUSSvg, WheelTripleSvg, WheelCompareSvg, InsideStraightSvg, InsideSplitSvg, InsideStreetSvg, InsideCornerSvg, InsideSixLineSvg, InsideTopLineSvg, OutsideRedBlackSvg, OutsideOddEvenSvg, OutsideLowHighSvg, OutsideDozenSvg, OutsideColumnSvg, OutsideSnakeSvg, CallVoisinsSvg, CallTiersSvg, CallOrphelinsSvg, CallJeuZeroSvg, BallTrajectorySvg, EnPrisonFlowSvg, MartingaleTreeSvg, ColorChipMgmtSvg, DealerTimelineSvg,
  TablePreflopSvg, TableFlopSvg, TableShowdownSvg, Hand1RoyalFlushSvg, Hand2StraightFlushSvg, Hand3FourKindSvg, Hand4FullHouseSvg, Hand5FlushSvg, Hand6StraightSvg, Hand7ThreeKindSvg, Hand8TwoPairSvg, Hand9OnePairSvg, Hand10HighCardSvg, BlindsRotationSvg, BettingRoundsSvg, BurnDealTimingSvg, SidePotSvg, RakeFlowSvg, OutsFlushSvg, PotOddsCalcSvg, StringBetSvg, Collusion3Svg, AngleShootingSvg, BlindGrowthSvg, ChipRaceSvg,
  BacDealOrderSvg, BacNaturalFlowSvg, BacTableauPlayerSvg, BacTableauBankerSvg, BacCommissionTableSvg, BacProbabilityPieSvg, BacSqueezeStage1Svg, BacSqueezeStage2Svg, BacSqueezeStage3Svg, BacSqueezeStage4Svg, BacPaletteUseSvg, BacBigRoadSvg, BacBigEyeSvg, BacSmallRoadSvg, BacCockroachSvg, BacCommissionLampSvg, BacDragon7Panda8Svg, BacEdgeSortingIveySvg, BacCardRotate180Svg, BacVIPSalonSvg,
  AllGameHECompareSvg, Shuffle4TypesSvg, LearningPathSvg, SkillTreeSvg, ChipAllColorsSvg,
}

export const illustrationMap: Record<string, React.FC> = {}
for (const [name, Component] of Object.entries(allComponents)) {
  illustrationMap[toKebab(name)] = Component
}

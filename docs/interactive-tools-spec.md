# インタラクティブツール設計書

Wizard of Oddsの計算機 + BlackjackInfoのStrategy Trainer を吸収・発展させたツール群。

---

## 1. BJ Basic Strategy Trainer

### 概要
BlackjackInfoのStrategy Trainerを基に、ディーラー視点とプレイヤー視点の両方を練習できるように拡張。

### 画面設計
```
┌─────────────────────────────────────────┐
│  Basic Strategy Trainer                  │
│  Mode: [Player View] [Dealer View]      │
│─────────────────────────────────────────│
│  Dealer: [K][?]                         │
│  Total: 10                              │
│  ┌──────────────────┐                   │
│  │  Your Hand       │                   │
│  │  [5♠][7♣] = 12  │                   │
│  └──────────────────┘                   │
│                                          │
│  What should the player do?              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ Hit  │ │Stand │ │Double│ │Split │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│  [Surrender]                             │
│                                          │
│  ⚠ Advice: Basic Strategy says HIT      │
│  📊 Stats: 12/20 correct (60%)          │
└─────────────────────────────────────────┘
```

### 機能仕様
| 機能 | 説明 |
|------|------|
| モード切替 | Player View（プレイヤー目線）/ Dealer View（ディーラー目線） |
| ルール設定 | デッキ数(1-8) / S17-H17 / DAS / Surrender / ペネトレーション |
| フィードバック | 正誤即時表示 + 戦略表の該当セルをハイライト |
| 統計 | セッションごとの正解率・弱点ハンド・経過時間 |
| 難易度 | Easy（よくある手のみ）/ Medium（全ハンド）/ Hard（頻度順ランダム） |
| データソース | `data/blackjack-strategy.csv` |

### 実装方針
- フロントエンドのみ（Next.js + React + TypeScript）
- CSVをJSONに変換して読み込み
- 状態管理: React useState + useReducer
- 戦略判定: プレイヤーの手札とディーラーのアップカードでCSVをルックアップ

---

## 2. ペイアウト計算練習機（全ゲーム対応）

### 概要
ディーラーとして必須のペイアウト計算を、全ゲーム・全ベット種で練習。

### 画面設計
```
┌─────────────────────────────────────────┐
│  Payout Calculator Practice              │
│  Game: [Blackjack|Roulette|Craps]       │
│─────────────────────────────────────────│
│  🎯 Problem:                             │
│  "Place bet $24 on 6 (craps). How much  │
│   do you pay if it wins?"               │
│                                          │
│  Your answer: [___]                      │
│                                          │
│  [Check Answer] [Show Hint] [Next]      │
│                                          │
│  ✅ Correct! $24 × 7/6 = $28            │
│  📊 Your streak: 5 correct in a row     │
└─────────────────────────────────────────┘
```

### 対応ベット種
| ゲーム | ベット種 | 問題パターン数 |
|--------|---------|--------------|
| Blackjack | BJ 3:2 / 6:5 / Even Money / Insurance | 20+ |
| Roulette | 全インサイド + アウトサイドベット | 15+ |
| Craps | Pass / Place / Hardway / Buy / Prop / Field | 30+ |
| Baccarat | Banker / Player / Tie | 5+ |

### 実装方針
- 各ベットの配当計算式をデータ化
- 乱数で問題を生成（現実的なベット額範囲で）
- 段階的難易度: 整数→少数→複数ベット同時

---

## 3. ハウスエッジ計算機

### 概要
Wizard of OddsのBlackjack House Edge Calculatorを吸収し、全ゲーム対応に拡張。

### 画面設計
```
┌─────────────────────────────────────────┐
│  House Edge Calculator                   │
│  Game: [Blackjack]                       │
│─────────────────────────────────────────│
│  Rules:                                  │
│  Decks: [6]   ◄━━━━━━━━━►               │
│  Soft 17: [Dealer Hits ◄]               │
│  Double: [Any 2 cards ◄]                │
│  DAS: [Yes ◄]                            │
│  Surrender: [Late ◄]                     │
│  BJ Pays: [3 to 2 ◄]                    │
│  Peek: [Yes ◄]                           │
│                                          │
│  📊 House Edge: 0.66%                    │
│  💡 Tip: Changing to S17 reduces HE     │
│          to 0.44%!                       │
└─────────────────────────────────────────┘
```

### 対応ゲーム
| ゲーム | 設定可能パラメータ |
|--------|-----------------|
| Blackjack | デッキ数、S17/H17、DAS、Surrender、BJ配当、ダブル制限、ペック |
| Roulette | バリアント（EU/US/Triple）、En Prison、La Partage |
| Craps | オッズ倍率、コミッション方式、バリアント（US/AU） |
| Baccarat | デッキ数、コミッション率、Tie配当 |

---

## 4. フラッシュカード（用語学習）

### 概要
用語集データから自動生成される暗記カード。

### 画面設計
```
┌─────────────────────────────────────────┐
│  Flashcards: Phase 1 Blackjack          │
│  Progress: 15/30 terms                  │
│─────────────────────────────────────────│
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │     "House Edge"                │    │
│  │                                 │    │
│  │  [Tap to flip]                  │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                          │
│  [Easy] [Medium] [Hard] [Again]         │
│                                          │
│  📊 Mastery: 65% (Mastered: 10/30)      │
└─────────────────────────────────────────┘
```

### 機能
- 用語 ↔ 定義の表裏
- カテゴリ・Phase・難易度でフィルタ
- 忘却曲線に基づく復習スケジューリング（SM-2アルゴリズム）
- データソース: `data/glossary-detailed.json`

---

## 5. ルーレットベット練習機

### 概要
ルーレットレイアウト上でベットの種類とペイアウトを視覚的に学習。

### 機能
- インタラクティブなルーレットレイアウト（SVG）
- ベットチップをドラッグ&ドロップで配置
- 「このベットの配当は？」クイズモード
- コールベットの視覚的表示（Voisins/Tiers/Orphelins）

---

## 6. クラップスペイアウト練習機

### 概要
最も複雑なクラップスのペイアウトを集中的に練習。

### 機能
- ランダムな出目とベットの組み合わせを生成
- 「この状況でのペイアウトは？」クイズ
- 時間制限モード（実際のテーブル速度に合わせる）
- 段階的難易度（ライン→プレイス→ハードウェイ→プロップ→複合）

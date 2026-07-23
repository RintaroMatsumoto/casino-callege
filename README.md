# CasinoCallege

カジノディーラー養成プラットフォーム。

> 📋 **全記録・現在の計画**: `docs/project-record.md`

---

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| **コンセプト** | 実際のディーラースクール教育カリキュラムに準拠した本格的なカジノ学習プラットフォーム |
| **ターゲット** | カジノディーラー志望者、カジノ業界新人、カジノを本格的に学びたい人 |
| **データ保存** | ローカル完結（LocalStorage）— 初版はバックエンド不要 |
| **プラットフォーム** | Webアプリ（静的ホスティング可能） |

## コアバリュー

- **ディーラー教育カリキュラム準拠**: 北米標準（Blackjack → Roulette → Craps → Poker → Baccarat）に加え、日本のIR開業（2029-2030）を見据えた内容も準備
- **「ゲームの遊び方」ではなく「ディーラーの仕事」** を教える教育プラットフォーム
- 確率・ハウスエッジ・ペイアウト計算などの数学的基礎を重視
- インタラクティブな練習ツール（チップ計算、ペイアウト計算機、戦略トレーナー）

## カリキュラム（全7フェーズ）

| Phase | タイトル | 内容 | 目安 |
|-------|---------|------|------|
| 0 | 基礎 | 用語・エチケット・チップ操作・数学基礎・カードハンドリング | 2 weeks |
| 1 | Blackjack | シュー/ピッチゲーム、ペイアウト、ベーシックストラテジー、ゲームプロテクション | 4 weeks |
| 2 | Roulette | アメリカン/ヨーロピアン、全ベットのペイアウト計算、チップ管理 | 2 weeks |
| 3 | Craps | テーブルレイアウト、ダイスハンドリング、全ベット種、複数ディーラー連携 | 3 weeks |
| 4 | Poker | ハンドランキング、ポット管理、レーキ、トーナメント手順 | 2 weeks |
| 5 | その他ゲーム | Baccarat（タブロー）、Three Card Poker、Let It Ride、Big Six Wheel | 2 weeks |
| 6 | 実践・試験対策 | ゲームプロテクション、カスタマーサービス、速度ドリル | 1 week |

## 技術スタック（推奨）

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS**
- **LocalStorage**（学習進捗・ノート）
- デプロイ: Vercel / Cloudflare Pages

## ディレクトリ構成（案）

```
CasinoCallege/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── curriculum/
│   ├── phase-0-fundamentals/
│   ├── phase-1-blackjack/
│   ├── phase-2-roulette/
│   ├── phase-3-craps/
│   ├── phase-4-poker/
│   ├── phase-5-other/
│   └── phase-6-advanced/
├── components/
│   ├── chip-counter/
│   ├── payout-calculator/
│   ├── card-deck/
│   ├── roulette-wheel/
│   ├── craps-table/
│   └── quiz/
├── lib/
│   ├── blackjack/
│   ├── roulette/
│   ├── craps/
│   ├── baccarat/
│   └── poker/
├── data/
│   ├── glossary.json
│   ├── blackjack-strategy.csv
│   ├── roulette-payouts.json
│   └── quiz-questions.json
└── public/
```

## 実装順序（フェーズ別）

1. Phase 0（基礎） + Phase 1（Blackjack） — ディーラー教育の入門
2. Phase 2（Roulette）
3. Phase 5 の Baccarat（シンプルなため早期追加）
4. Phase 3（Craps）— 最も複雑なので後回し
5. Phase 4（Poker）
6. Phase 6（試験対策・総合）

## 参考GitHubリポジトリ

| リポジトリ | 活用ポイント |
|-----------|------------|
| [Childebrand94/blackjack-trainer](https://github.com/Childebrand94/blackjack-trainer) | Vite + Tailwind で教育的UI。Basic Strategy モードのデザイン参考 |
| [vincentho66/blackjack-trainer](https://github.com/vincentho66/blackjack-trainer) | React + Recharts。カードカウンティングHUD、モンテカルロシミュレーション。高機能 |
| [rundef/node-poker-odds-calculator](https://github.com/rundef/node-poker-odds-calculator) | ★82。npm パッケージ `poker-odds-calculator`。オッズ計算エンジンとして転用可 |
| [Ferboinkles/Roulette-simulator](https://github.com/Ferboinkles/Roulette-simulator) | Svelte製。ルーレット確率学習UIの参考に |
| [graemeerickson/blackjack_strategy](https://github.com/graemeerickson/blackjack_strategy) | JS + LocalStorage。シンプルなアーキテクチャ参考 |

## 市場調査サマリー

| 指標 | 数値 |
|------|------|
| 世界ギャンブル市場（2025） | **USD 456.7B**（Mordor Intelligence） |
| 世界ギャンブル市場（2030予測） | **USD 634.0B**、CAGR 6.56% |
| 最大市場 | アジア太平洋（マカオ・シンガポール） |
| 米国ディーラー雇用数 | **~87,000人**（BLS） |
| ディーラー平均年収 | $28K-$35K + チップ |
| 年間ディーラー求人数（米国） | **約10,000人**（離職補充＋新規） |
| オンライン教育市場 | **$200B+**、CAGR ~14% |
| TAM（ディーラー訓練市場） | **$2-5B**（全世界推定） |
| SAM（オンライン特化） | **$200-500M** |

## 主要トレンド

- **日本IR（統合型リゾート）開業**（2029-2030予定、大阪MGM）→ 数千人のディーラー需要
- **米国30+州**でカジノ/スポーツベッティング合法化
- **オンラインカジノ**のライブディーラー需要急増
- **アジア太平洋**が世界最大かつ最速成長の市場
- 従来の対面スクール（$1,500-$3,000）より低コストなオンライン代替への需要

## 競合優位性

- **ブルーオーシャン**: 本格的なディーラー教育特化オンラインプラットフォームはほぼ存在しない
- **カリキュラムベース**: 単なるゲーム攻略サイトではなく、実際のディーラースクールの教育体系に準拠
- **日本市場ファースト**: 日本IR開業に先駆けた日本語コンテンツで先行者利益を獲得
- **スケーラブル**: グローバル展開可能（英語版→アジア言語版）

---

*Created: 2026-07-20*

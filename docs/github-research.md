# GitHub調査レポート

CasinoCallege に参考になりそうなGitHub上のプロジェクトを調査。

## ブラックジャック系（最も参考になる）

| プロジェクト | スター | 言語 | 特長 |
|---|---|---|---|
| [Childebrand94/blackjack-trainer](https://github.com/Childebrand94/blackjack-trainer) | ★6 | JS + Vite | ベーシックストラテジー + ハイローカウンティング学習。3モード（Basic Strategy / Card Counting / Realistic）。Tailwind + ESLint 構成 |
| [vincentho66/blackjack-trainer](https://github.com/vincentho66/blackjack-trainer) | ★4 | JS + Vite + React | モンテカルロシミュレーション、銀行ロールチャート、Hi-Lo カウント、Kelly Criterion ベット設計。プロダクション品質に近い |
| [graemeerickson/blackjack_strategy](https://github.com/graemeerickson/blackjack_strategy) | ★4 | JS | ベーシックストラテジー練習用。LocalStorage 使用 → アーキテクチャがシンプルで参考になる |

## ポーカー系

| プロジェクト | スター | 言語 | 特長 |
|---|---|---|---|
| [rundef/node-poker-odds-calculator](https://github.com/rundef/node-poker-odds-calculator) | ★82 | TypeScript | プリフロップ＆ポストフロップのオッズ計算。CLI + API 両対応。npm パッケージとしても公開 (`poker-odds-calculator`) |
| [axross/holdem](https://github.com/axross/holdem) | ★27 | TypeScript | Texas Hold'em のオッズ計算 + データモデル。型定義がしっかりしており参考になる |

## ルーレット / その他シミュレーション

| プロジェクト | スター | 言語 | 特長 |
|---|---|---|---|
| [Ferboinkles/Roulette-simulator](https://github.com/Ferboinkles/Roulette-simulator) | ★2 | Svelte | ルーレットの確率学習シミュレーター。UI がシンプルで教育的 |
| [dnparadice/casino](https://github.com/dnparadice/casino) | ★3 | Python | 複数ゲーム（ポーカー・ルーレット）のシミュレーション。確率・ASCII アート表示 |
| [ingwatson/casino](https://github.com/ingwatson/casino) | ★2 | Python | スロットマシンの RTP（還元率）・確率シミュレーター |

## カード・ゲーム用 npm パッケージ（そのまま使える）

| パッケージ | 用途 |
|---|---|
| poker-odds-calculator | ポーカーのオッズ計算エンジン（TypeScript） |
| deckofcards | トランプデッキの管理・シャッフル・配布 |
| pokersolver | ポーカーの役判定 |

## 分析

### 最も参考になるリポジトリ
- **vincentho66/blackjack-trainer** — Vite + React + Recharts 構成で、CasinoCallege と同じ方向性。モンテカルロシミュレーション、カードカウンティングHUD、戦略アシスタントなど非常に高機能。直接フォークして拡張できるレベル
- **Childebrand94/blackjack-trainer** — Tailwind使用・教育的UIでデザインの参考になる

### CasinoCallege に足りていない GitHub 上のもの
- バカラ・クラップス・スロットの**教育特化型**ウェブアプリはほぼ存在しない → 独自価値が出せる領域
- 「カジノ全体を俯瞰的に学べる統合プラットフォーム」というコンセプト自体がユニーク

# CasinoCallege — プロジェクト全記録

> **最終更新**: 2026-07-22
> **状態**: 140点SVGイラスト + 2カラム目次レイアウト + 7Phase教科書コンテンツ + 全世界アクセスカウンター(D1) + カジノテーブル背景（緑ラシャ+ルーレット+トランプ） + SEO全16ルート対応。アプリ稼働中。

---

## 核（内部哲学）

「Gold Rushで一番儲かったのは、ツルハシとジーンズを売った人たちだった」

カジノで勝つ方法を追う（鉱夫）より、カジノ業界で働く人を育てる（ツルハシ屋）。
この哲学はユーザーには見せない。内部指針。

---

## プロジェクトの歩み

### 第1期: 構想と市場調査（2026-07-20 am）
- ディーラー教育特化のオンラインプラットフォーム構想
- 市場調査: 世界ギャンブル市場$456.7B(2025)→$634B(2030)。日本IR開業で2,000-3,000人のディーラー需要
- 競合調査: Wizard of Odds, BJ21.com, BlackjackInfo — 全競合がプレイヤー視点で、**ディーラー視点かつ日本語は誰もやっていない**

### 第2期: コンテンツ構築（2026-07-20 am〜pm）
- 情報源: Wikipedia全ゲーム記事・用語集 + Wizard of Odds全ルール/確率 + Mordor Intelligence市場データ
- 7Phaseの教育コンテンツをMarkdownで作成。2回の全面改稿
- 日本IR詳細、ディーラー物理技法、Kelly基準/統計学基礎の補完

### 第3期: Webアプリ化（2026-07-20 pm）
- Vite + React 19 + TypeScript + Tailwind CSS 4 + react-router-dom
- Cloudflare Pagesにデプロイ。GitHub: RintaroMatsumoto/casino-callege
- ダッシュボード、Phase表示、用語集(100語)、クイズ(40問)、ダークモード、モバイル対応

### 第6期: SEO対策 全22ルート対応 + ブログ + 構造化データ（2026-07-22 完了）

**フェーズ1: 基本SEO導入（2026-07-22 am）**
- `index.html`: lang=ja, title, description, keywords, canonical, OG 全種, Twitter Card, JSON-LD(WebSite+無料)
- `react-helmet-async` 導入: Layout.tsx の `helmetForPath()` で全Phase/Glossary/Quizに個別title+description
- プリレンダリング: `scripts/postbuild.mjs` でビルド後に静的HTML自動生成（当初16ルート）
- サイト基盤: `_redirects`(SPA fallback), `_headers`(security+cache), `robots.txt`, `sitemap.xml`
- 競合調査: 英語/日本語 10+サイト分析。ブログ・YouTube・SNS ロードマップ策定

**フェーズ2: 高度SEO対応（2026-07-22 pm）**
- **Cloudflare Pages Functions**: `functions/[[path]].ts` 作成。全リクエストをエッジでインターセプトしパスに応じて動的meta注入。Yahoo Japan対応のセーフティネット
- **Course 構造化データ**: `PhasePage.tsx` に Course スキーマ追加（react-helmet + postbuild二重注入）。全7Phaseが個別のCourseマークアップを持つ
- **ブログ開設**: `/blog` + `/blog/:slug` ルート追加。初回5記事公開（カジノディーラー完全ガイド、BJ基本動作、大阪IR、用語100選、ルーレット計算）
- **サイドバー**: 「ブログ」リンク追加（用語集の下）
- **プリレンダリング拡張**: 22ルートに拡張（blog含む）。7件のCourseスキーマ自動注入
- **全記録**: `docs/seo-strategy.md`

### 第7期: ブログ完全独立化 + 競合分析による全面強化（2026-07-22 完了）

**アーキテクチャ変更**: ブログ記事を `src/content/blog/*.md` に移動。`scripts/build-blog.mjs` でJS不要の独立HTMLを自動生成。BlogPost.tsx削除、BlogList.tsxは `<a href>` で静的HTMLへ誘導。

**競合分析**: Vegas Gaming Academy / StepDealer(カジノディーラーの歩き方) / casino-dealer.jp のブログ構成・カテゴリ設計・タグ戦術・記事スタイルを調査。

**実装機能**:
- 9カテゴリ + 一覧 + カテゴリ別ページ
- タグシステム + 63タグ別ページ
- 目次(TOC)自動生成 / 著者情報 / SNSシェア(𝕏/LINE/コピー) / 関連記事 / CTA
- Article + BreadcrumbList 構造化データ
- RSSフィード (blog/rss.xml)
- パンくずリスト

**記事拡充**: 5新規追加（ディーラー仕事内容、スクール比較、BJ戦略、バカラ暗記、クラップス完全攻略）+ 既存5記事リライト = 計10記事

**生成ページ数**: 10記事 + 7カテゴリ + 63タグ + RSS = **83ページ**

**ブログ戦略ロードマップ策定**: 画像追加・ピラー記事・Yahoo知恵袋対策・PDF配布・シリーズ連載などを `docs/seo-strategy.md` に記録

### 第5期: UI洗練 — カジノテーブル背景 + 全ページ対応（2026-07-21 夜）

- ダッシュボードの背景を「浮遊カード/チップ」から**カジノテーブル（緑ラシャ地）** に全面リニューアル
- ルーレットホイール（SVG精細版）:
  - 37ポケット（正しい配置順: 0,32,15,19,4,21,2,25...）
  - ポケット間の金属ピケット区切り線
  - 各ポケットに番号表示
  - **木製リム**（茶色グラデーション）
  - ボールトラック + 光る球がCSS軌道アニメーション
- トランプ5枚（A♠ K♠ Q♠ J♠ 10♠）:
  - HTML divで実装（SVGのrotateY非互換問題を回避）
  - CSS 3D Transform (rotateY) で順次フリップ
- スポットライト（テーブルを横切る光）
- **全ページ対応**: Layout.tsx に移動。Dashboard/Phase/Glossary/Quiz全てで表示
- **React状態ゼロ**: useState/useEffect不使用。クラッシュしない設計

### 削除・断念したもの

| 機能 | 理由 |
|------|------|
| Firebase Authentication (Googleログイン) | サーバー要らず → localStorage完結 → 結局不要に |
| Cloudflare D1 progress API | 同上 |
| 進捗管理（スライド/セクション/Phase） | ユーザー不要 |
| スライド形式ビューワー | マークダウン教科書に回帰 |
| ドラム式カウンターのlarge版 | コンパクト化してヘッダー右上に |
| ダークモード/ライトモード切替 | CSSにライトテーマ未定義のためトグルボタン削除 |

---

## ファイル構成

```
CasinoCallege/
├── docs/content/                  # 原本
│   ├── phase-0-fundamentals.md     16KB
│   ├── phase-1-blackjack.md        27KB (12節)
│   ├── phase-2-roulette.md         12KB (6節)
│   ├── phase-3-craps.md            22KB (13節)
│   ├── phase-4-poker.md            10KB (7節)
│   ├── phase-5-baccarat.md         18KB (15節)
│   ├── phase-6-other-career.md     12KB (7節)
│   ├── mathematics-reference.md    16KB
│   ├── statistics-foundation.md     8KB
│   ├── kelly-bankroll-risk.md       8KB
│   ├── dealer-techniques.md        10KB
│   ├── japan-ir.md                  5KB
│   └── supplements.md               5KB
│
├── data/
│   ├── glossary-detailed.json      29KB (100語)
│   ├── glossary.json               17KB
│   ├── quiz-questions.json         10KB (40問)
│   ├── q-and-a.json                11KB (40問)
│   ├── roulette-payouts.json        3KB
│   └── blackjack-strategy.csv       1KB
│
├── docs/                            # 企画・設計書
│   ├── project-record.md           (本ファイル)
│   ├── manifesto.md                (内部哲学)
│   ├── quality-standards.md        (品質基準)
│   ├── quality-gap-analysis.md     (ギャップ分析)
│   ├── competitor-analysis.md      (競合分析)
│   ├── curriculum-framework.md     (カリキュラム設計)
│   ├── improvement-plan.md         (改善計画)
│   ├── absorption-report.md        (競合吸収レポート)
│   ├── subscription-model.md       (課金モデル)
│   ├── gamification-design.md      (ゲーミフィケーション)
│   ├── interactive-tools-spec.md   (インタラクティブツール)
│   ├── market-research.md          (市場調査)
│   └── github-research.md          (GitHub調査)
│
├── casino-callege-app/              # Webアプリ
│   ├── src/pages/
│   │   ├── Dashboard.tsx           (Phaseカード一覧 + 統計)
│   │   ├── PhasePage.tsx           (2カラム目次 + SVG埋め込み)
│   │   ├── GlossaryPage.tsx        (100語検索/カテゴリ)
│   │   └── QuizPage.tsx            (40問・正誤判定)
│   ├── src/components/
│   │   ├── Layout.tsx              (レイアウト + CasinoBackground)
│   │   ├── Sidebar.tsx             (ナビゲーション)
│   │   ├── DrumCounter.tsx         (世界アクセスカウンター)
│   │   ├── CasinoBackground.tsx    (緑ラシャ+ルーレット+トランプ)
│   │   └── illustrations/          # SVG 140点
│   │       ├── index.ts            (バレル + 自動slug生成)
│   │       ├── blackjack.tsx       (30点)
│   │       ├── craps.tsx           (40点)
│   │       ├── roulette.tsx        (25点)
│   │       ├── poker.tsx           (25点)
│   │       ├── baccarat.tsx        (20点)
│   │       └── common-extra.tsx    (5点)
│   ├── src/content/                # Phase 0-6 教育コンテンツ
│   └── dist/                       # ビルド成果物 → Cloudflare
│
└── ProjectBase/                    # APIキー等 (Git非対象)
```

---

## コアPhase現状

| Phase | サイズ | 節数 | 状態 |
|-------|--------|------|------|
| 0: 基礎 | 16KB | 8 Lessons | 良好 |
| 1: BJ | 27KB | 12節 | 教科書形式。手信号・戦略・カウンティング・プロテクション |
| 2: ルーレット | 12KB | 6節 | 全ベット・コールベット・ディーリング手順 |
| 3: クラップス | 22KB | 13節 | 確率導出・全ベットHE・スティックマン全コール |
| 4: ポーカー | 10KB | 7節 | ハンドランク・ディーリング・ポット/レーキ/オッズ |
| 5: バカラ | 18KB | 15節 | タブロー完全暗記・VIP対応・ビーズロード |
| 6: 実践 | 12KB | 7節 | 組織・面接・プロテクション・日本IR・健康管理 |
| **合計** | **117KB** | | |

### 補助ファイル

| ファイル | サイズ | 内容 |
|---------|--------|------|
| mathematics-reference.md | 16KB | 全ゲーム数値リファレンス |
| statistics-foundation.md | 8KB | 統計学基礎（大数の法則・信頼区間等） |
| kelly-bankroll-risk.md | 8KB | Kelly基準・破産確率・マルチンゲール批判 |
| dealer-techniques.md | 10KB | カード/チップ操作の物理技法 |
| japan-ir.md | 5KB | MGM大阪・必要ディーラー数・スケジュール |
| supplements.md | 5KB | スロット・アジアンゲーム・歴史・法律 |

---

## SVGイラスト一覧（140点）

### Blackjack 30点
`bj-table-top`, `bj-game-flow`, `bj-peek-check`, `bj-shuffle-wash`, `bj-shuffle-riffle`, `bj-shuffle-strip`, `bj-shuffle-overhand`, `bj-load-shoe`, `bj-load-card`, `bj-signal-hit`, `bj-signal-stand`, `bj-signal-double`, `bj-signal-split`, `bj-signal-surrender`, `bj-signal-insurance`, `bj-deal-order`, `bj-strategy-chart`, `bj-s17-h17`, `bj-payout-3to2`, `bj-insurance-proof`, `bj-decks-he`, `bj-bust-prob`, `bj-hilo`, `bj-rc-tc`, `bj-team-play`, `bj-shuffle-track`, `bj-edge-sorting`, `bj-hole-card`, `bj-chip-tray`, `bj-payout-calc`

### Craps 40点
`craps-table-top`, `craps-table-side`, `dice-grid36`, `dice-face-detail`, `dice-sum-prob`, `passline-tree`, `dontpass-tree`, `hard4`, `hard6`, `hard8`, `hard10`, `place4`, `place5`, `place6`, `place8`, `place9`, `place10`, `any7-bet`, `anycraps-bet`, `horn-bet`, `world-bet`, `field-bet`, `odds-layout`, `odds-3x4x5x`, `staff-boxman`, `staff-basedealer`, `staff-stickman`, `staff-all`, `sevenout-moment`, `dice-pass`, `puck-onoff`, `dice-set-3v`, `dice-set-2v`, `dice-set-hardway`, `dice-set-all7s`, `stickman-calls`, `place6-payout`, `pastposting-detect`, `dice-trouble-flow`, `chip-tidying`

### Roulette 25点
`wheel-eu`, `wheel-us`, `wheel-triple`, `wheel-compare`, `inside-straight`, `inside-split`, `inside-street`, `inside-corner`, `inside-sixline`, `inside-topline`, `outside-redblack`, `outside-oddeven`, `outside-lowhigh`, `outside-dozen`, `outside-column`, `outside-snake`, `call-voisins`, `call-tiers`, `call-orphelins`, `call-jeuzero`, `ball-trajectory`, `enprison-flow`, `martingale-tree`, `colorchip-mgmt`, `dealer-timeline`

### Poker 25点
`table-preflop`, `table-flop`, `table-showdown`, `hand1-royalflush`, `hand2-strflush`, `hand3-fourkind`, `hand4-fullhouse`, `hand5-flush`, `hand6-straight`, `hand7-threekind`, `hand8-twopair`, `hand9-onepair`, `hand10-highcard`, `blinds-rotation`, `betting-rounds`, `burn-deal-timing`, `sidepot`, `rake-flow`, `outs-flush`, `pot-odds-calc`, `string-bet`, `collusion3`, `angle-shooting`, `blind-growth`, `chip-race`

### Baccarat 20点
`bac-deal-order`, `bac-natural-flow`, `bac-tableau-player`, `bac-tableau-banker`, `bac-commission-table`, `bac-probability-pie`, `bac-squeeze1`, `bac-squeeze2`, `bac-squeeze3`, `bac-squeeze4`, `bac-palette-use`, `bac-bigroad`, `bac-bigeye`, `bac-smallroad`, `bac-cockroach`, `bac-commission-lamp`, `bac-dragon7-panda8`, `bac-edge-sorting`, `bac-card-rotate`, `bac-vip-salon`

### Common 5点
`allgame-he-compare`, `shuffle4-types`, `learning-path`, `skill-tree`, `chip-all-colors`

---

## Webアプリ機能

| 機能 | 状態 |
|------|------|
| ダッシュボード | ✅ |
| 2カラムPhase表示（目次+本文） | ✅ |
| SVGイラスト埋め込み | ✅ 140点 |
| 用語集（100語・検索・フィルタ） | ✅ |
| クイズ（40問・正誤判定） | ✅ |
| レスポンシブ | ✅ |
| 全世界アクセスカウンター | ✅ Cloudflare D1 + Pages Functions |
| SEO 基本メタタグ（lang/title/OG/Twitter/JSON-LD） | ✅ |
| ルート別個別title+description | ✅ react-helmet-async |
| プリレンダリング 全16ルート静的HTML | ✅ scripts/postbuild.mjs |
| sitemap.xml / robots.txt / _redirects / _headers | ✅ |
| カジノテーブル背景（緑ラシャ+木枠） | ✅ Layout全ページ |
| ルーレットアニメーション（37ポケット+球） | ✅ CSS only |
| トランプフリップアニメーション（5枚） | ✅ CSS 3D Transform |
| スポットライトアニメーション | ✅ CSS keyframes |
| インタラクティブツール | ❌ 未着手 |
| フォーラム/コミュニティ | ❌ 未着手 |
| 課金システム | ❌ 未着手 |

---

## 今後の方針

### SEO（優先度高）

- Cloudflare Pages Functions で動的meta配信（Yahoo Japan対応）
- Course 構造化データ追加（Googleリッチリザルト）
- ブログ開設 `/blog/`（ロングテールKW攻略）
- YouTubeチャンネル開設（7Phase連動チュートリアル）
- SNS開始（Twitter/X + note.com）

### 機能（優先度中）

- インタラクティブツール（BJ strategy trainer, payout calculator）
- 7Phase教育コンテンツの品質向上

### 保留

- ログイン/進捗/課金は追加しない

---

## 技術スタック

| 層 | 選択 |
|----|------|
| フレームワーク | React 19 + TypeScript |
| ビルド | Vite 8 |
| スタイル | Tailwind CSS 4 |
| ルーティング | React Router 7 |
| アイコン | Lucide React |
| バックエンド | Cloudflare D1 (counter) + Pages Functions |
| マークダウン | react-markdown + remark-gfm |
| ホスティング | Cloudflare Pages |
| リポジトリ | GitHub (RintaroMatsumoto/casino-callege) |

---

## 主要URL

| 用途 | URL |
|------|-----|
| 本番 | https://casino-callege.pages.dev |
| GitHub | https://github.com/RintaroMatsumoto/casino-callege |
| ローカル | http://localhost:5173 |

---

## 決定事項

| 決定 | 理由 |
|------|------|
| 「養成プラットフォーム」とは言わない | 教科書。養成は場と責任を伴う |
| ターゲットは「遊ぶ人も、働く人も、知りたい人も」 | ディーラーだけじゃない。カジノに関わる全員 |
| ツルハシ屋哲学は内部のみ | ユーザーに見せるものではない |
| 練習問題は書かない | 文字稼ぎ |
| SVG内テキストは英語限定 | 日本語はエンコーディングで文字化けする。再発防止のため |
| 全ゲーム平等（バカラだけ⭐なし） | 差別は不要 |

# CasinoCallege SEO戦略・全記録

> **作成**: 2026-07-22
> **状態**: フェーズ3完了（ブログ完全独立化 + カテゴリ/タグ/RSS + 競合分析に基づく全面強化）
> **プリレンダリング**: 16 SPAルート + 83 ブログページ（10記事 + 7カテゴリ + 63タグ + RSS）
> **Courseスキーマ**: 7Phase
> **ブログ記事**: 10本（5新規 + 5全面リライト）
> **ブログ機能**: カテゴリ/タグ/関連記事/TOC/著者/シェア/CTA/RSS/Articleスキーマ/パンくず
> **未着手**: YouTube, SNS運用, 画像追加, ピラー記事(10,000字級), PDF配布, 内部リンク最適化

---

## フェーズ1: 基本SEO導入（2026-07-22 ✅ 完了）

### 実施内容

| # | 施策 | ファイル | 詳細 |
|---|------|---------|------|
| 1 | HTML基本タグ | `index.html` | lang=ja, title, description, keywords, canonical |
| 2 | OG / Twitter Card | `index.html` | og:type/site_name/title/description/url/image/locale, twitter:card/title/description/image |
| 3 | 構造化データ | `index.html` | JSON-LD WebSite + educationalLevel + offers(無料) |
| 4 | ルート別メタタグ | `src/components/Layout.tsx` | react-helmet-async で全Phase/Glossary/Quizに個別title+description |
| 5 | プリレンダリング | `scripts/postbuild.mjs` | ビルド後、16ルートの静的HTMLを自動生成（各ルートに個別meta埋め込み） |
| 6 | サイト基盤 | `public/_redirects` | SPAフォールバック `/* /index.html 200` |
| 7 | サイト基盤 | `public/_headers` | セキュリティ + キャッシュポリシー |
| 8 | サイト基盤 | `public/robots.txt` | クロール許可 + sitemap参照 |
| 9 | サイト基盤 | `public/sitemap.xml` | 全16ルートのURLマップ |

### プリレンダリング16ルート

```
/                  → CasinoCallege — カジノディーラー養成プラットフォーム
/phase/0           → Phase 0: 基礎
/phase/1           → Phase 1: ブラックジャック
/phase/2           → Phase 2: ルーレット
/phase/3           → Phase 3: クラップス
/phase/4           → Phase 4: ポーカー
/phase/5           → Phase 5: バカラ
/phase/6           → Phase 6: キャリア
/glossary          → カジノ用語集
/quiz/0..6         → クイズ Phase 0..6
```

### ビルドパイプライン

```bash
npm run build  # tsc -b → vite build → node scripts/postbuild.mjs
```

### インストール済みパッケージ

| パッケージ | 用途 |
|-----------|------|
| `react-helmet-async` | ルート別動的metaタグ |

### キーファイル

| パス | 役割 |
|------|------|
| `casino-callege-app/index.html` | ベースmetaタグ・構造化データ |
| `casino-callege-app/src/main.tsx` | HelmetProvider追加 |
| `casino-callege-app/src/components/Layout.tsx` | `helmetForPath()` ルート別meta |
| `casino-callege-app/scripts/postbuild.mjs` | プリレンダリング自動生成 |
| `casino-callege-app/public/_redirects` | SPAフォールバック |
| `casino-callege-app/public/_headers` | セキュリティ+キャッシュ |
| `casino-callege-app/public/robots.txt` | クロール制御 |
| `casino-callege-app/public/sitemap.xml` | サイトマップ |
| `casino-callege-app/package.json` | `"build"` に postbuild 追加 |

---

## 競合調査結果（2026-07-22）

### 主要競合

| カテゴリ | サイト | 特徴 | CasinoCallegeとの差 |
|---------|--------|------|-------------------|
| 英語オンライン校 | Vegas Gaming Academy | WordPress, $79/月, 12,000+生徒 | 有料。モダンUI。英語のみ |
| 英語オンライン校 | Casino College Online | レガシーPHP, $99, DealerSim | 有料。非モバイル最適化 |
| 英語情報サイト | The Art of Casino | アフィリエイト型, ブログ中心 | 情報サイト。教材ではない |
| 日本語オフライン校 | Japan Casino School | 東京+大阪, 2004年創業 | オフライン。オンライン完結の無料競合なし |
| 日本語情報サイト | casino-dealer.jp | 用語集・学校比較・アフィリエイト | 情報サイト。体系的教育課程なし |
| 日本語情報サイト | StepDealer | 2025年開設, キャリア特化 | 新興。体系的教材なし |

### 競合のSEO手法

- 全員が **WordPress + ブログ** でコンテンツマーケティング
- FAQ構造化データ（Vegas Gaming Academy）
- YouTubeチャンネル連携
- 日本語組は note.com / Twitter / Instagram で発信
- Japan Casino School は TV・新聞メディア露出で強力なバックリンク

### CasinoCallegeの競合優位性

| 項目 | CasinoCallege | 競合 |
|------|--------------|------|
| 価格 | **無料** | $50-$400+ |
| 技術スタック | React 19 + Vite 8 (モダン) | WordPress / レガシーPHP |
| 日本語対応 | **全面日本語** | 英語のみ or 部分対応 |
| カリキュラム体系 | **7Phase 体系的教育** | アドホックな講座 |
| オンライン完結 | **Web完結・インストール不要** | 対面必須 or 動画のみ |
| インタラクティブ要素 | SVG図解140点 + クイズ | テキスト/動画主体 |
| 大阪IR対応 | **日本IR情報含む** | 未対応 |

### 市場ポジショニング

**最大のチャンス**: 大阪IR開業(2029-2030)に向け、**日本語で無料で学べるオンラインディーラー教材は現時点で皆無**。

---

## フェーズ2: 高度SEO対応（✅ 完了）

### Cloudflare Pages Functions（動的meta配信）
`functions/[[path]].ts` 作成。全リクエストをエッジでインターセプトしパスに応じて動的meta注入。Yahoo Japan対応のセーフティネット。

### Course 構造化データ追加
全7Phaseに個別の `Course` スキーマ（react-helmet + postbuild二重注入）。無料・Beginnerレベル。

### ブログ開設（SPA統合版）
初回5記事。BlogList.tsx + BlogPost.tsx。react-helmetで動的meta。

---

## フェーズ3: ブログ完全独立化 + 競合分析による全面強化（✅ 完了）

### ブログアーキテクチャ変更
- **SPA依存から脱却**: ブログ記事を `src/content/blog/*.md` に移動し、独立したHTMLにビルド
- `scripts/build-blog.mjs` で markdown → セルフコンテナントHTML を自動生成
- JS不要、CSSインライン、OG/Twitter完備、Article+BreadcrumbList構造化データ
- BlogPost.tsx 削除。BlogList.tsx は `<a href>` で静的HTMLへ誘導

### 競合分析（Vegas Gaming Academy / StepDealer / casino-dealer.jp）
全3サイトのブログ構成・記事スタイル・カテゴリ設計・タグ戦術を徹底調査。

### 実装した機能一覧

| 機能 | 競合からの学び |
|------|--------------|
| **9カテゴリ + 一覧 + カテゴリ別ページ** | StepDealerの4カテゴリ設計を拡張 |
| **タグシステム + 63タグ別ページ** | casino-dealer.jpの豊富なタグから |
| **目次(TOC)自動生成** | 日本ブログの標準装備（h2/h3から生成）|
| **著者情報 + アイコン** | VGAの著者名表示に倣う |
| **SNSシェア（𝕏 / LINE / コピー）** | casino-dealer.jpのX連携から拡張 |
| **関連記事（タグ/カテゴリ一致）** | VGAのRecent Postsを自動化 |
| **CTA「カリキュラムを見る」** | VGAのコース案内に相当 |
| **パンくずリスト** | UX定番＋構造化データ |
| **Articleスキーマ（JSON-LD）** | Googleリッチリザルト対策 |
| **RSSフィード（blog/rss.xml）** | 業界標準購読手段 |

### ブログ記事一覧（計10本）

| # | 記事 | カテゴリ |
|---|------|---------|
| 1 | カジノディーラーになるには？完全ガイド2026 | キャリア |
| 2 | ブラックジャックディーラーの基本動作と手信号 | ブラックジャック |
| 3 | 大阪IR開業でディーラー需要が急増する理由 | 業界情報 |
| 4 | カジノ用語100選 | 基礎知識 |
| 5 | ルーレットペイアウト計算完全マスター | ルーレット |
| 6 | カジノディーラーの仕事内容とは？ | キャリア |
| 7 | カジノスクール比較2026 | キャリア |
| 8 | ブラックジャックベーシックストラテジー完全解説 | ブラックジャック |
| 9 | バカラのタブローを完全暗記する方法 | バカラ |
| 10 | クラップスのルールとベット完全攻略 | クラップス |

### 生成ページ数
10記事 + 7カテゴリ + カテゴリ一覧 + 63タグ + タグ一覧 + RSS = **83ページ**

---

## フェーズ4: 次のアクション（優先度順）

### 高優先度（すぐやる）
| # | 施策 | 詳細 |
|---|------|------|
| 1 | **全記事に画像追加** | 写真AC / Pexels / Bing Image Creator でアイキャッチ+本文画像 |
| 2 | **3本のピラー記事（10,000字級）** | 「カジノルール完全ガイド」「資格・学校ガイド」を追加 |
| 3 | **Yahoo知恵袋キラー記事** | 実際のQ&Aに答える形でロングテールKWを攻略 |
| 4 | **無料PDF配布** | BJ戦略表・ポーカーハンド表・面接質問集 |

### 中優先度
| # | 施策 |
|---|------|
| 5 | シリーズ連載「カジノディーラー入門講座（全10回）」 |
| 6 | ディーラー体験談インタビュー記事 |
| 7 | note.com への転載（相互リンク） |
| 8 | 全記事の内部リンク網を最適化 |

### 低優先度（長期的）
| # | 施策 |
|---|------|
| 9 | YouTubeチャンネル開設 |
| 10 | Twitter/X 毎日発信 |
| 11 | バックリンク獲得キャンペーン |
| 12 | 和文フォント最適化 / Core Web Vitals |
| 13 | `.jp` ドメイン取得検討 |

---

## 参考リンク

| 項目 | URL |
|------|-----|
| 本番サイト | https://casino-callege.pages.dev |
| GitHub | https://github.com/RintaroMatsumoto/casino-callege |
| Cloudflare Pages | https://dash.cloudflare.com/?to=pages |
| Cloudflare Pages Functions ドキュメント | https://developers.cloudflare.com/pages/functions/ |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters/ |
| Google Course 構造化データ | https://developers.google.com/search/docs/appearance/structured-data/course |

---

## 過去の決定事項

| 決定 | 理由 |
|------|------|
| SPA (CSR) を維持 | Next.js移行は工数过大。プリレンダリング+Functionsで代替 |
| `react-helmet-async` 採用 | 軽量。React 19互換。Helmetの後継 |
| 言語は日本語統一 | 英語対応はフェーズ2以降。まず日本語市場を完全攻略 |
| OG画像は未作成 | 現時点では `og-image.png` プレースホルダ。後日Canvaなどで作成 |

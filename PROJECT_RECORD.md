# CasinoCallege プロジェクト記録

## プロジェクト概要
カジノゲームの教科書Webアプリ。React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + React Router 7。
Cloudflare Pages でホスティング（https://casino-callege.pages.dev）。
GitHub: RintaroMatsumoto/casino-callege

## 技術スタック
- React 19 + TypeScript
- Vite 8 (ビルド)
- Tailwind CSS 4
- React Router 7
- Cloudflare Pages (ホスティング)
- D1 Database (アクセスカウンター)
- lucide-react (アイコン)
- react-markdown + remark-gfm (マークダウンレンダリング)

## ディレクトリ構造
- `casino-callege-app/` - Gitルート、全ソースコード
- `src/components/` - Reactコンポーネント
- `src/pages/` - ページコンポーネント
- `src/content/` - マークダウン教科書データ（7Phase）
- `src/components/illustrations/` - SVG図解（140個）
- `dist/` - ビルド出力（.gitignore）

## 主要コンポーネント

### CasinoBackground.tsx
- `fixed inset-0 z-0` の背景
- 緑のフェルト + ウッドフレーム + スポットライト（CSSアニメーション）
- ルーレット（SVG + オービットボール）: 左上、サイドバーを避けて配置
- カード山札アニメーション: 右上、山→手札に8秒サイクルで配る

#### カードアニメーション詳細
- 52枚からランダムに5枚を選択（useState + useEffect + useMemo([seed])）
- 8秒ごとに自動シャッフル（setInterval）
- 山札：上中央、裏向きで積まれた状態
- 手札：下段に横一列（0, 48, 96, 144, 192px）
- 各カードが山から斜め下にスライド→到着後表返し
- `::before` 擬似要素の opacity で裏表を切り替え（backface-visibility不使用）
- 左右対称: A(-98) K(-49) Q(0) J(+49) 10(+98)

#### ルーレットのボール軌道
- `transformOrigin: '3px calc(clamp(30px,5vw,70px))'`
- コンテナサイズに追従して中心を回る

### Layout.tsx
- サイドバー（w-64、lg以上でstatic） + メインコンテンツの横並び
- ヘッダー（h-14）にアクセスカウンター（DrumCounter）
- CasinoBackground を常時表示

### ページ一覧
| パス | コンポーネント | 説明 |
|------|--------------|------|
| `/` | Dashboard | カリキュラム一覧 |
| `/phase/:id` | PhasePage | 教科書（マークダウンレンダリング+目次） |
| `/glossary` | GlossaryPage | 用語集（検索+カテゴリフィルター） |
| `/quiz/:phaseId` | QuizPage | クイズ（全40問） |

## 日本語化対応（2026-07-21 完了）
全UIテキストを日本語に統一。対象ファイル8つ：
- Sidebar.tsx / Layout.tsx / Dashboard.tsx
- PhasePage.tsx / QuizPage.tsx / GlossaryPage.tsx
- common-extra.tsx / roulette.tsx（SVG図解内テキスト）

## デプロイ
- Cloudflare Pages（git連携）
- wrangler.toml: `pages_build_output_dir = "dist"`
- 手動デプロイ: `npx wrangler pages deploy dist --branch=main`
- API Token: ProjectBase/cloudflareAPI.txt に保存

## 過去の失敗と教訓
1. wrangler.toml に `[pages]` セクションを追記してビルドを壊した
   - 以降の全プッシュでデプロイが停止
   - 原因を認めず遠回しな言い訳を繰り返した
2. カードのランダム問題
   - useMemo([]) → useLocation → Math.random直書き → keyトリックと迷走
   - 最終的に useState+useEffect+useMemo([seed]) のシンプルな8秒タイマーに
3. 問題を認めずに小手先の修正を積み重ねる悪癖
   - ユーザーに何度も同じことを言わせた

## 未実施項目
- 各Phaseの内容拡充（現状薄い）
- SVG図解内テキストの完全日本語化（一部残っている可能性）

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { buildAllBlogPages } from './build-blog.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')

const ROUTES = [
  { path: '/',           out: 'index.html',              title: 'CasinoCallege — カジノ大学', desc: '実際のディーラースクール教育カリキュラムに準拠した本格的なカジノ学習プラットフォーム。全7Phaseのカリキュラムでブラックジャック、ルーレット、クラップス、ポーカー、バカラを無料で学ぶ。' },
  { path: '/phase/0',    out: 'phase/0/index.html',       title: 'Phase 0: 基礎 — CasinoCallege', desc: 'カジノの基礎、専門用語、数学的基礎、チップ操作、カードハンドリングを学ぶ。ディーラーになるための第一歩。' },
  { path: '/phase/1',    out: 'phase/1/index.html',       title: 'Phase 1: ブラックジャック — CasinoCallege', desc: 'ブラックジャックのディーリング技術を習得。シュー/ピッチゲーム、ペイアウト計算、ベーシックストラテジー、ゲームプロテクションを網羅。' },
  { path: '/phase/2',    out: 'phase/2/index.html',       title: 'Phase 2: ルーレット — CasinoCallege', desc: 'アメリカン/ヨーロピアンルーレットの全ベットタイプ、ペイアウト計算、チップ管理を学ぶ。' },
  { path: '/phase/3',    out: 'phase/3/index.html',       title: 'Phase 3: クラップス — CasinoCallege', desc: 'カジノで最も複雑なテーブルゲーム、クラップスを完全マスター。テーブルレイアウト、ダイスハンドリング、全ベット種を学習。' },
  { path: '/phase/4',    out: 'phase/4/index.html',       title: 'Phase 4: ポーカー — CasinoCallege', desc: 'ポーカールームのディーリング手順を学ぶ。ハンドランキング、ポット管理、レーキ、トーナメント進行を習得。' },
  { path: '/phase/5',    out: 'phase/5/index.html',       title: 'Phase 5: バカラ — CasinoCallege', desc: 'マカオで売上の91%を占めるバカラ（プントバンコ）のディーリング技術を学ぶ。' },
  { path: '/phase/6',    out: 'phase/6/index.html',       title: 'Phase 6: キャリア — CasinoCallege', desc: 'ディーラーとしてのキャリア構築、面接対策、カジノ運営の知識、日本IR開業情報を網羅。' },
  { path: '/glossary',   out: 'glossary/index.html',      title: 'カジノ用語集 — CasinoCallege', desc: 'ブラックジャック、ルーレット、クラップス、ポーカー、バカラなどカジノゲームの専門用語を網羅した用語集。' },
  { path: '/quiz/0',     out: 'quiz/0/index.html',        title: 'クイズ Phase 0 — CasinoCallege', desc: 'カジノ基礎知識の確認クイズ。用語、数学基礎、チップ計算の理解度をチェック。' },
  { path: '/quiz/1',     out: 'quiz/1/index.html',        title: 'クイズ Phase 1 — CasinoCallege', desc: 'ブラックジャックの知識確認クイズ。基本戦略、ペイアウト、カードカウンティングの基礎をテスト。' },
  { path: '/quiz/2',     out: 'quiz/2/index.html',        title: 'クイズ Phase 2 — CasinoCallege', desc: 'ルーレットの知識確認クイズ。ベットタイプ、ハウスエッジ、ペイアウト計算をテスト。' },
  { path: '/quiz/3',     out: 'quiz/3/index.html',        title: 'クイズ Phase 3 — CasinoCallege', desc: 'クラップスの知識確認クイズ。ベット種別、配当、ハウスエッジをテスト。' },
  { path: '/quiz/4',     out: 'quiz/4/index.html',        title: 'クイズ Phase 4 — CasinoCallege', desc: 'ポーカーの知識確認クイズ。ハンドランキング、ポットオッズ、ディーリング手順をテスト。' },
  { path: '/quiz/5',     out: 'quiz/5/index.html',        title: 'クイズ Phase 5 — CasinoCallege', desc: 'バカラ・その他ゲームの知識確認クイズ。タブロー、コミッション、サイドベットをテスト。' },
  { path: '/quiz/6',     out: 'quiz/6/index.html',        title: 'クイズ Phase 6 — CasinoCallege', desc: 'キャリア・実践の知識確認クイズ。面接対策、カジノ運営、日本IR情報をテスト。' },
]

const COURSE_SCHEMAS = (() => {
  const schemas = []
  for (let i = 0; i <= 6; i++) {
    const names = ['Phase 0: 基礎', 'Phase 1: ブラックジャック', 'Phase 2: ルーレット', 'Phase 3: クラップス', 'Phase 4: ポーカー', 'Phase 5: バカラ', 'Phase 6: キャリア']
    const kws = ['カジノ 基礎, カジノ用語, チップ操作', 'ブラックジャック ディーラー, BJ 戦略, カードカウンティング', 'ルーレット ディーラー, ペイアウト計算', 'クラップス ディーラー, ルール, ダイス', 'ポーカー ディーラー, ハンドランキング', 'バカラ ディーラー, タブロー', 'カジノディーラー キャリア, 大阪IR']
    schemas.push({
      path: `/phase/${i}`,
      schema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: names[i],
        description: `カジノディーラー養成のための${names[i]}。${kws[i]}を学ぶ。`,
        provider: { '@type': 'Organization', name: 'CasinoCallege', sameAs: 'https://casino-callege.pages.dev' },
        educationalLevel: 'Beginner',
        teaches: kws[i],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY', availability: 'https://schema.org/InStock' },
      }),
    })
  }
  return schemas
})()

const template = readFileSync(join(dist, 'index.html'), 'utf-8')

for (const route of ROUTES) {
  const outPath = join(dist, route.out)
  const outDir = dirname(outPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${route.desc}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${route.title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${route.desc}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="https://casino-callege.pages.dev${route.path}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${route.title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${route.desc}"`)

  const cs = COURSE_SCHEMAS.find(s => route.path.startsWith(s.path))
  if (cs) {
    const tag = `<script type="application/ld+json">${cs.schema}</script>`
    html = html.replace('</head>', `${tag}</head>`)
  }

  writeFileSync(outPath, html)
  console.log(`  ✓ ${route.out}`)
}

const blogPosts = buildAllBlogPages()

const blogIndexHtml = template
  .replace(/<title>.*?<\/title>/, '<title>ブログ — CasinoCallege</title>')
  .replace(/<meta name="description" content="[^"]*"/, '<meta name="description" content="カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。"')
  .replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="ブログ — CasinoCallege"')
  .replace(/<meta property="og:description" content="[^"]*"/, '<meta property="og:description" content="カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。"')
  .replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="https://casino-callege.pages.dev/blog"')
  .replace(/<meta name="twitter:title" content="[^"]*"/, '<meta name="twitter:title" content="ブログ — CasinoCallege"')
  .replace(/<meta name="twitter:description" content="[^"]*"/, '<meta name="twitter:description" content="カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。"')

const blogIndexDir = join(dist, 'blog')
if (!existsSync(blogIndexDir)) mkdirSync(blogIndexDir, { recursive: true })
writeFileSync(join(blogIndexDir, 'index.html'), blogIndexHtml)
console.log('  ✓ blog/index.html (SPA fallback)')

console.log(`\n✨ Prerendered ${ROUTES.length} SPA routes (${COURSE_SCHEMAS.length} with Course schema) + ${blogPosts.length} blog posts (standalone)`)

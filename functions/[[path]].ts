const ROUTES: Record<string, { title: string; desc: string }> = {
  '/':          { title: 'CasinoCallege — カジノディーラー養成プラットフォーム', desc: '実際のディーラースクール教育カリキュラムに準拠した本格的なカジノ学習プラットフォーム。全7Phaseでブラックジャック、ルーレット、クラップス、ポーカー、バカラを無料で学ぶ。' },
  '/phase/0':   { title: 'Phase 0: 基礎 — CasinoCallege', desc: 'カジノの基礎、専門用語、数学的基礎、チップ操作、カードハンドリングを学ぶ。ディーラーになるための第一歩。' },
  '/phase/1':   { title: 'Phase 1: ブラックジャック — CasinoCallege', desc: 'ブラックジャックのディーリング技術を習得。シュー/ピッチゲーム、ペイアウト計算、ベーシックストラテジー、ゲームプロテクションを網羅。' },
  '/phase/2':   { title: 'Phase 2: ルーレット — CasinoCallege', desc: 'アメリカン/ヨーロピアンルーレットの全ベットタイプ、ペイアウト計算、チップ管理を学ぶ。' },
  '/phase/3':   { title: 'Phase 3: クラップス — CasinoCallege', desc: 'カジノで最も複雑なテーブルゲーム、クラップスを完全マスター。テーブルレイアウト、ダイスハンドリング、全ベット種を学習。' },
  '/phase/4':   { title: 'Phase 4: ポーカー — CasinoCallege', desc: 'ポーカールームのディーリング手順を学ぶ。ハンドランキング、ポット管理、レーキ、トーナメント進行を習得。' },
  '/phase/5':   { title: 'Phase 5: バカラ — CasinoCallege', desc: 'マカオで売上の91%を占めるバカラ（プントバンコ）のディーリング技術を学ぶ。タブロー、コミッション管理、サイドベットを網羅。' },
  '/phase/6':   { title: 'Phase 6: キャリア — CasinoCallege', desc: 'ディーラーとしてのキャリア構築、面接対策、カジノ運営の知識、日本IR開業情報を網羅した実践編。' },
  '/glossary':  { title: 'カジノ用語集 — CasinoCallege', desc: 'ブラックジャック、ルーレット、クラップス、ポーカー、バカラなどカジノゲームの専門用語を網羅した用語集。' },
}

const BLOG_ROUTES: Record<string, { title: string; desc: string }> = {
  '/blog/casino-dealer-guide-2026':     { title: 'カジノディーラーになるには？完全ガイド2026 — CasinoCallege', desc: 'カジノディーラーになるための完全ガイド。必要なスキル、資格、給料、求人情報、おすすめの学習方法を徹底解説。' },
  '/blog/blackjack-dealer-basics':      { title: 'ブラックジャックディーラーの基本動作と手信号 — CasinoCallege', desc: 'ブラックジャックディーラーに求められる基本動作と手信号を徹底解説。カード配布、チップ管理、ゲーム進行のポイント。' },
  '/blog/osaka-ir-dealer-demand':       { title: '大阪IR開業でディーラー需要が急増する理由 — CasinoCallege', desc: '2029-2030年開業予定の大阪IRで必要とされるディーラー数、求められるスキル、今から準備すべきことを解説。' },
  '/blog/casino-terminology-100':       { title: 'カジノ用語100選：ディーラーを目指す人が覚えるべき基本用語 — CasinoCallege', desc: 'カジノディーラーを目指す人が最初に覚えるべき100の専門用語をカテゴリ別に解説。用語集としても使える一覧。' },
  '/blog/roulette-payout-master':       { title: 'ルーレットディーラーのペイアウト計算完全マスター — CasinoCallege', desc: 'ルーレットの全ベットタイプのペイアウト計算方法を徹底解説。ディーラーとして正確な計算ができるようになる実践ガイド。' },
}

function metaForPath(path: string): { title: string; desc: string } | null {
  const normalised = path.replace(/\/$/, '')
  if (ROUTES[normalised]) return ROUTES[normalised]
  if (normalised.startsWith('/quiz/')) return { title: `クイズ — CasinoCallege`, desc: 'カジノディーラー知識をチェックする無料クイズ。各Phaseごとの問題で理解度を確認。' }
  if (normalised.startsWith('/blog/')) return BLOG_ROUTES[normalised] || { title: 'ブログ — CasinoCallege', desc: 'カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。' }
  return null
}

function injectMeta(html: string, path: string): string {
  const meta = metaForPath(path)
  if (!meta) return html

  const canonical = `https://casino-callege.pages.dev${path.replace(/\/$/, '') || '/'}`
  const ogImage = 'https://casino-callege.pages.dev/og-image.png'

  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.desc}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.desc}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.desc}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ].join('\n    ')

  return html
    .replace(/<title>.*?<\/title>/, tags)
    .replace(/<meta name="description" content="[^"]*"/, '')
    .replace(/<link rel="canonical"[^>]*\/>/, '')
}

export async function onRequest(context: { request: Request; env: { ASSETS: { fetch: (req: Request) => Promise<Response> } } }) {
  const { request, env } = context
  const url = new URL(request.url)

  const response = await env.ASSETS.fetch(request)
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('text/html')) return response

  const html = await response.text()
  const modified = injectMeta(html, url.pathname)

  return new Response(modified, {
    status: response.status,
    headers: response.headers,
  })
}

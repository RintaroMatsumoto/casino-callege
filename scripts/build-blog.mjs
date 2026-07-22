import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '..', 'src', 'content', 'blog')
const outDir = join(__dirname, '..', 'dist', 'blog')
const SITE_URL = 'https://casino-callege.pages.dev'

const CATEGORIES = [
  { id: 'career', label: 'キャリア', emoji: '🎯' },
  { id: 'blackjack', label: 'ブラックジャック', emoji: '🃏' },
  { id: 'roulette', label: 'ルーレット', emoji: '🎡' },
  { id: 'craps', label: 'クラップス', emoji: '🎲' },
  { id: 'poker', label: 'ポーカー', emoji: '♠️' },
  { id: 'baccarat', label: 'バカラ', emoji: '💎' },
  { id: 'industry', label: '業界情報', emoji: '📊' },
  { id: 'basics', label: '基礎知識', emoji: '📖' },
  { id: 'english', label: '語学・スキル', emoji: '🌐' },
]

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a14;color:#c8c8d0;font-family:"Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;line-height:1.8;-webkit-font-smoothing:antialiased;padding:0 16px}
.wrap{max-width:740px;margin:0 auto;padding:24px 0}
.breadcrumb{font-size:12px;color:#666;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:4px}
.breadcrumb a{color:#888;text-decoration:none}
.breadcrumb a:hover{color:#f4a81d}
.breadcrumb span{color:#555}
.top-link{display:inline-flex;align-items:center;gap:6px;color:#888;font-size:13px;text-decoration:none;margin-bottom:12px;transition:color .2s}
.top-link:hover{color:#fff}
article{background:rgba(22,22,40,.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid #2a2a3e;border-radius:14px;padding:36px 32px}
.category{display:inline-block;font-size:11px;font-weight:600;color:#f4a81d;background:rgba(244,168,29,.12);padding:3px 10px;border-radius:4px;margin-bottom:14px;letter-spacing:.3px}
h1{font-size:28px;font-weight:700;color:#fff;margin-bottom:12px;line-height:1.35;letter-spacing:.3px}
.meta{display:flex;flex-wrap:wrap;gap:12px 20px;font-size:12px;color:#888;padding-bottom:16px;border-bottom:1px solid #2a2a3e;margin-bottom:24px}
.meta span{display:flex;align-items:center;gap:5px}
.author{display:flex;align-items:center;gap:10px;margin-bottom:20px;padding:12px 16px;background:rgba(244,168,29,.05);border-radius:8px;border:1px solid rgba(244,168,29,.1)}
.author-icon{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f4a81d,#d4890a);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0}
.author-info{font-size:12px;color:#aaa}
.author-info strong{color:#fff;font-size:13px}
.toc{background:rgba(244,168,29,.04);border:1px solid rgba(244,168,29,.12);border-radius:8px;padding:16px 20px;margin-bottom:28px}
.toc-title{font-size:12px;font-weight:600;color:#f4a81d;margin-bottom:8px}
.toc a{display:block;font-size:13px;color:#aaa;text-decoration:none;padding:3px 0;padding-left:12px;border-left:2px solid transparent;transition:all .2s}
.toc a:hover{color:#f4a81d;border-left-color:#f4a81d;padding-left:16px}
h2{font-size:21px;font-weight:700;color:#fff;margin-top:36px;margin-bottom:14px;padding-bottom:6px;border-bottom:1px solid rgba(244,168,29,.15)}
h3{font-size:17px;font-weight:700;color:#fff;margin-top:24px;margin-bottom:10px}
p{font-size:14px;color:#c8c8d0;margin-bottom:14px;line-height:1.9}
strong{color:#fff}
ul,ol{padding-left:22px;margin-bottom:14px}
li{font-size:14px;color:#c8c8d0;margin-bottom:7px;line-height:1.8}
.tbl-wrap{overflow-x:auto;margin-bottom:18px;border-radius:8px;border:1px solid #2a2a3e}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{border:1px solid #2a2a3e;padding:10px 14px;text-align:left}
th{background:#14142a;color:#f4a81d;font-weight:600;white-space:nowrap}
td{color:#c8c8d0}
code{background:#1a1a2e;color:#f4a81d;padding:1px 5px;border-radius:3px;font-size:13px}
.cta-box{margin-top:32px;padding:24px;background:linear-gradient(135deg,rgba(244,168,29,.06),rgba(244,168,29,.02));border:1px solid rgba(244,168,29,.2);border-radius:10px;text-align:center}
.cta-box p{font-size:14px;color:#ccc;margin-bottom:12px}
.cta-box .btn{display:inline-block;padding:10px 28px;background:linear-gradient(135deg,#f4a81d,#d4890a);color:#0a0a14;font-weight:700;font-size:14px;border-radius:6px;text-decoration:none;transition:transform .2s}
.cta-box .btn:hover{transform:translateY(-1px)}
.related{margin-top:28px}
.related-title{font-size:13px;font-weight:600;color:#f4a81d;margin-bottom:12px}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.related-grid a{display:block;padding:12px 14px;background:rgba(22,22,40,.6);border:1px solid #2a2a3e;border-radius:8px;text-decoration:none;font-size:13px;color:#ccc;transition:all .2s}
.related-grid a:hover{border-color:rgba(244,168,29,.3);color:#f4a81d;background:rgba(244,168,29,.04)}
.related-grid .cat{font-size:10px;color:#888;margin-bottom:2px}
.share{display:flex;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid #2a2a3e}
.share a{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;transition:opacity .2s}
.share a:hover{opacity:.8}
.share-twitter{background:#1d9bf0;color:#fff}
.share-line{background:#06c755;color:#fff}
.share-copy{background:#2a2a3e;color:#aaa;cursor:pointer}
.footer{margin-top:40px;text-align:center;padding:24px 0;border-top:1px solid #2a2a3e}
.footer a{color:#f4a81d;text-decoration:none;font-size:13px}
.footer a:hover{text-decoration:underline}
.footer-links{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-bottom:8px}
.footer-links a{color:#888;font-size:12px}
.footer p{font-size:11px;color:#555;margin:4px 0}
.tag{display:inline-block;font-size:10px;color:#888;background:rgba(255,255,255,.04);padding:2px 8px;border-radius:3px;margin:2px;text-decoration:none}
.tag:hover{color:#f4a81d;background:rgba(244,168,29,.1)}
@media(max-width:600px){article{padding:24px 18px}h1{font-size:22px}.related-grid{grid-template-columns:1fr}}
`.trim()

function parseMD(text) {
  const lines = text.split('\n')
  let front = {}, inFront = false, frontCount = 0, bodyStart = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { frontCount++; if (frontCount === 1) { inFront = true; continue }; if (frontCount === 2) { inFront = false; bodyStart = i + 1; break } }
    if (inFront) {
      const m = lines[i].match(/^(\w+):\s*(.+)/)
      if (m) front[m[1]] = m[2].trim()
    }
  }
  return { front, body: lines.slice(bodyStart).join('\n') }
}

function buildTOC(body) {
  const lines = body.split('\n')
  const items = []
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)/)
    const m3 = line.match(/^###\s+(.+)/)
    if (m2) items.push({ level: 2, text: m2[1] })
    else if (m3) items.push({ level: 3, text: m3[1] })
  }
  if (items.length < 2) return ''
  return `<div class="toc"><div class="toc-title">📋 目次</div>` + items.map((item, i) => {
    const id = `s${i}`
    return `<a href="#${id}">${item.text}</a>`
  }).join('') + `</div>`
}

function renderMD(md) {
  const lines = md.split('\n')
  const out = []
  let inTable = false, headingIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; const next = i + 1 < lines.length ? lines[i + 1] : ''
    if (line.startsWith('| ') || line.startsWith('|---')) {
      if (!inTable) { out.push('<div class="tbl-wrap"><table>'); inTable = true }
      if (line.startsWith('|---')) continue
      const cells = line.split('|').filter(Boolean).map(s => s.trim())
      const tag = (i === 0 || lines[i-1].startsWith('|---')) ? 'th' : 'td'
      out.push(`<tr>${cells.map(c => `<${tag}>${inlineMD(c)}</${tag}>`).join('')}</tr>`)
      continue
    } else if (inTable) { out.push('</table></div>'); inTable = false }
    if (line.startsWith('---')) continue
    if (line.startsWith('## ')) {
      headingIndex++
      out.push(`<h2 id="s${headingIndex}">${inlineMD(line.slice(3))}</h2>`)
    } else if (line.startsWith('### ')) {
      headingIndex++
      out.push(`<h3 id="s${headingIndex}">${inlineMD(line.slice(4))}</h3>`)
    } else if (/^\d+\.\s/.test(line)) {
      if (!out.length || !out[out.length-1].startsWith('<ol>')) out.push('<ol>')
      out.push(`<li>${inlineMD(line.replace(/^\d+\.\s*/, ''))}</li>`)
      if (!/^\d+\.\s/.test(next)) out.push('</ol>')
    } else if (line.startsWith('- ')) {
      if (!out.length || !out[out.length-1].startsWith('<ul>')) out.push('<ul>')
      out.push(`<li>${inlineMD(line.slice(2))}</li>`)
      if (!next.startsWith('- ')) out.push('</ul>')
    } else if (line.trim() === '') { /* skip */ }
    else { out.push(`<p>${inlineMD(line)}</p>`) }
  }
  if (inTable) out.push('</table></div>')
  return out.join('\n')
}

function inlineMD(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>')
}

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') }

function buildPage(post, allPosts) {
  const { front, body } = post
  const title = front.title || ''
  const desc = front.description || ''
  const date = front.date || ''
  const readTime = front.readTime || ''
  const category = front.category || ''
  const catObj = CATEGORIES.find(c => c.label === category)
  const catId = catObj ? catObj.id : 'basics'
  const slug = front.slug || ''
  const tags = (front.tags || '').split(',').map(s => s.trim()).filter(Boolean)
  const canonical = `${SITE_URL}/blog/${slug}/`
  const catPage = `${SITE_URL}/blog/category/${catId}/`
  const imageUrl = `${SITE_URL}/og-image.png`

  const content = renderMD(body)
  const toc = buildTOC(body)

  const related = allPosts
    .filter(p => p.slug !== slug && (p.category === category || (p.tags || []).some(t => (tags || []).includes(t))))
    .slice(0, 3)

  const shareText = esc(`${title} — CasinoCallege`)
  const shareUrl = canonical

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    datePublished: date,
    author: { '@type': 'Person', name: 'CasinoCallege編集部' },
    publisher: { '@type': 'Organization', name: 'CasinoCallege', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
    image: imageUrl,
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  })

  const categorySchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CasinoCallege', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: category, item: catPage },
      { '@type': 'ListItem', position: 4, name: title, item: canonical },
    ],
  })

  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(title)} — CasinoCallege</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${imageUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${imageUrl}">
<script type="application/ld+json">${articleSchema}</script>
<script type="application/ld+json">${categorySchema}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<a href="/blog/" class="top-link">← ブログ一覧</a>
<div class="breadcrumb"><a href="${SITE_URL}">CasinoCallege</a><span>›</span><a href="/blog/">ブログ</a><span>›</span><a href="/blog/category/${catId}/">${category}</a><span>›</span>${esc(title)}</div>

<article>
<span class="category">${esc(category)}</span>
<h1>${esc(title)}</h1>
<div class="meta">
<span>📅 ${date}</span>
<span>⏱ ${readTime}</span>
${tags.map(t => `<a href="/blog/tag/${esc(t)}/" class="tag">#${esc(t)}</a>`).join('')}
</div>

<div class="author">
<div class="author-icon">C</div>
<div class="author-info">By <strong>CasinoCallege編集部</strong><br>カジノディーラー養成プラットフォーム</div>
</div>

${toc}
${content}

<div class="cta-box">
<p>🎓 カジノディーラーを目指すなら、<strong>CasinoCallege</strong>で無料学習を始めよう</p>
<a href="/" class="btn">カリキュラムを見る</a>
</div>

${related.length ? `<div class="related"><div class="related-title">📖 関連記事</div><div class="related-grid">${related.map(p => {
  const cat = p.category || ''
  return `<a href="/blog/${p.slug}/"><div class="cat">${cat}</div>${esc(p.title)}</a>`
}).join('')}</div></div>` : ''}

<div class="share">
<a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener" class="share-twitter">𝕏 ポスト</a>
<a href="https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener" class="share-line">LINE 送る</a>
<a onclick="navigator.clipboard.writeText('${esc(shareUrl)}');this.textContent='✓ コピーしました'" class="share-copy">🔗 リンクをコピー</a>
</div>
</article>

<div class="footer">
<div class="footer-links">
<a href="/">ホーム</a>
<a href="/blog/">ブログ</a>
<a href="/glossary">用語集</a>
<a href="/phase/0">学習を始める</a>
</div>
<a href="${SITE_URL}">CasinoCallege — カジノ大学</a>
<p>プレイヤー、ディーラー、そして好奇心を持つすべての人へ</p>
</div>
</div>
</body>
</html>`
}

function buildCategoryIndex(allPosts) {
  let html = `<!doctype html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>ブログカテゴリ一覧 — CasinoCallege</title><meta name="description" content="CasinoCallegeブログのカテゴリ一覧。カジノディーラー学習に役立つ情報をカテゴリから探す。"><link rel="canonical" href="${SITE_URL}/blog/category/"><style>${CSS.replace(/article\{/,'article{max-width:740px;margin:0 auto')}</style></head><body><div class="wrap"><a href="/blog/" class="top-link">← ブログ一覧</a><article><h1>📂 カテゴリ一覧</h1><div class="meta">全${allPosts.length}記事</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">`
  for (const cat of CATEGORIES) {
    const count = allPosts.filter(p => (p.category || '') === cat.label).length
    if (!count) continue
    html += `<a href="/blog/category/${cat.id}/" style="display:block;padding:16px;background:rgba(22,22,40,.6);border:1px solid #2a2a3e;border-radius:8px;text-decoration:none;transition:all .2s"><div style="font-size:24px;margin-bottom:4px">${cat.emoji}</div><div style="font-size:14px;font-weight:600;color:#fff">${cat.label}</div><div style="font-size:11px;color:#888">${count}記事</div></a>`
  }
  html += `</div></article></div></body></html>`
  return html
}

function buildTagIndex(allPosts) {
  const tagCounts = {}
  for (const p of allPosts) {
    for (const t of (p.tags || []) ) { tagCounts[t] = (tagCounts[t] || 0) + 1 }
  }
  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  let html = `<!doctype html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>タグ一覧 — CasinoCallege</title><link rel="canonical" href="${SITE_URL}/blog/tag/"><style>${CSS.replace(/article\{/,'article{max-width:740px;margin:0 auto')}</style></head><body><div class="wrap"><a href="/blog/" class="top-link">← ブログ一覧</a><article><h1>🏷 タグ一覧</h1><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">`
  for (const [tag, count] of sorted) {
    html += `<a href="/blog/tag/${esc(tag)}/" style="display:inline-block;padding:8px 16px;background:rgba(244,168,29,.08);border:1px solid rgba(244,168,29,.2);border-radius:20px;text-decoration:none;color:#f4a81d;font-size:13px;transition:all .2s">#${esc(tag)} <span style="color:#888;font-size:11px">(${count})</span></a>`
  }
  html += `</div></article></div></body></html>`
  return html
}

function buildRSS(allPosts) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n<title>CasinoCallege ブログ</title>\n<link>${SITE_URL}/blog/</link>\n<description>カジノディーラー学習に役立つ情報を発信</description>\n<language>ja</language>\n<atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>\n`
  for (const p of allPosts) {
    const url = `${SITE_URL}/blog/${p.slug}/`
    xml += `<item>\n<title>${esc(p.title)}</title>\n<link>${url}</link>\n<description>${esc(p.description || '')}</description>\n<pubDate>${new Date(p.date).toUTCString()}</pubDate>\n<guid>${url}</guid>\n<category>${esc(p.category || '')}</category>\n</item>\n`
  }
  xml += `</channel>\n</rss>`
  return xml
}

function extractInfo(raw) {
  const { front, body } = parseMD(raw)
  return {
    title: front.title || '',
    description: front.description || '',
    date: front.date || '',
    readTime: front.readTime || '',
    category: front.category || '',
    slug: front.slug || '',
    tags: (front.tags || '').split(',').map(s => s.trim()).filter(Boolean),
    body,
  }
}

export function buildAllBlogPages() {
  const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))
  const allPosts = files.map(f => {
    const raw = readFileSync(join(contentDir, f), 'utf-8')
    return extractInfo(raw)
  }).sort((a, b) => b.date.localeCompare(a.date))

  // Generate individual articles
  for (const post of allPosts) {
    const raw = readFileSync(join(contentDir, `${post.slug}.md`), 'utf-8')
    const parsed = parseMD(raw)
    const html = buildPage({ front: parsed.front, body: parsed.body }, allPosts)
    const dir = join(outDir, post.slug)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
    console.log(`  ✓ blog/${post.slug}/index.html`)
  }

  // Generate category pages
  const catDir = join(outDir, 'category')
  if (!existsSync(catDir)) mkdirSync(catDir, { recursive: true })
  writeFileSync(join(catDir, 'index.html'), buildCategoryIndex(allPosts))
  console.log('  ✓ blog/category/index.html')

  for (const cat of CATEGORIES) {
    const posts = allPosts.filter(p => p.category === cat.label)
    if (!posts.length) continue
    const d = join(catDir, cat.id)
    if (!existsSync(d)) mkdirSync(d, { recursive: true })
    const page = buildListingPage(`${cat.emoji} ${cat.label}`, `${cat.label}の記事一覧`, posts, `/blog/category/${cat.id}/`)
    writeFileSync(join(d, 'index.html'), page)
    console.log(`  ✓ blog/category/${cat.id}/index.html`)
  }

  // Generate tag pages
  const tagDir = join(outDir, 'tag')
  if (!existsSync(tagDir)) mkdirSync(tagDir, { recursive: true })
  writeFileSync(join(tagDir, 'index.html'), buildTagIndex(allPosts))
  console.log('  ✓ blog/tag/index.html')

  const tagMap = {}
  for (const p of allPosts) {
    for (const t of p.tags) {
      if (!tagMap[t]) tagMap[t] = []
      tagMap[t].push(p)
    }
  }
  for (const [tag, posts] of Object.entries(tagMap)) {
    const d = join(tagDir, tag)
    if (!existsSync(d)) mkdirSync(d, { recursive: true })
    const page = buildListingPage(`#${tag}`, `${tag}の記事一覧`, posts, `/blog/tag/${tag}/`)
    writeFileSync(join(d, 'index.html'), page)
    console.log(`  ✓ blog/tag/${tag}/index.html`)
  }

  // RSS
  writeFileSync(join(outDir, 'rss.xml'), buildRSS(allPosts))
  console.log('  ✓ blog/rss.xml')

  return allPosts
}

function buildListingPage(title, desc, posts, baseUrl) {
  const canonical = `${SITE_URL}${baseUrl}`
  return `<!doctype html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${esc(title)} — CasinoCallege ブログ</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canonical}"><style>${CSS.replace(/article\{/,'article{max-width:740px;margin:0 auto')}</style></head><body><div class="wrap"><a href="/blog/" class="top-link">← ブログ一覧</a><article><h1>${esc(title)}</h1><div class="meta">${posts.length}記事</div><div style="display:grid;gap:10px">${posts.map(p => {
    const cat = esc(p.category || '')
    return `<a href="/blog/${p.slug}/" style="display:block;padding:16px;background:rgba(22,22,40,.6);border:1px solid #2a2a3e;border-radius:8px;text-decoration:none;transition:all .2s"><div style="font-size:11px;color:#f4a81d;margin-bottom:4px">${cat}</div><div style="font-size:15px;font-weight:600;color:#fff">${esc(p.title)}</div><div style="font-size:12px;color:#888;margin-top:4px">${p.date} · ${p.readTime}</div></a>`
  }).join('')}</div></article></div></body></html>`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('📝 Building blog pages...')
  const posts = buildAllBlogPages()
  console.log(`\n✨ Built ${posts.length} blog posts + categories + tags + RSS`)
}

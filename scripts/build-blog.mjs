import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '..', 'src', 'content', 'blog')
const outDir = join(__dirname, '..', 'dist', 'blog')

const SITE_URL = 'https://casino-callege.pages.dev'

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a14;color:#c8c8d0;font-family:"Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding:24px 20px}
.top-link{display:inline-flex;align-items:center;gap:6px;color:#888;font-size:13px;text-decoration:none;margin-bottom:16px}
.top-link:hover{color:#fff}
article{background:rgba(22,22,40,.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid #2a2a3e;border-radius:12px;padding:32px 28px}
.category{display:inline-block;font-size:11px;font-weight:600;color:#f4a81d;background:rgba(244,168,29,.1);padding:2px 10px;border-radius:4px;margin-bottom:12px}
h1{font-size:26px;font-weight:700;color:#fff;margin-bottom:12px;line-height:1.3}
.meta{display:flex;gap:12px;font-size:12px;color:#888;padding-bottom:16px;border-bottom:1px solid #2a2a3e;margin-bottom:24px}
h2{font-size:20px;font-weight:700;color:#fff;margin-top:32px;margin-bottom:12px}
h3{font-size:17px;font-weight:700;color:#fff;margin-top:24px;margin-bottom:8px}
p{font-size:14px;color:#c8c8d0;margin-bottom:12px;line-height:1.8}
strong{color:#fff}
ul,ol{padding-left:20px;margin-bottom:12px}
li{font-size:14px;color:#c8c8d0;margin-bottom:6px;line-height:1.7}
table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px}
th,td{border:1px solid #2a2a3e;padding:8px 12px;text-align:left}
th{background:#14142a;color:#f4a81d;font-weight:600}
td{color:#c8c8d0}
.footer{margin-top:40px;text-align:center;padding:20px 0;border-top:1px solid #2a2a3e}
.footer a{color:#f4a81d;text-decoration:none;font-size:13px}
.footer a:hover{text-decoration:underline}
.footer p{font-size:12px;color:#666}
@media(max-width:600px){article{padding:20px 16px}h1{font-size:22px}}
`.trim()

function parseMD(text) {
  const lines = text.split('\n')
  let front = {}, inFront = false, frontCount = 0, bodyStart = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontCount++
      if (frontCount === 1) { inFront = true; continue }
      if (frontCount === 2) { inFront = false; bodyStart = i + 1; break }
    }
    if (inFront) {
      const m = lines[i].match(/^(\w+):\s*(.+)/)
      if (m) front[m[1]] = m[2].trim()
    }
  }
  const body = lines.slice(bodyStart).join('\n')
  return { front, body }
}

function renderMD(md) {
  const lines = md.split('\n')
  const out = []
  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const next = i + 1 < lines.length ? lines[i + 1] : ''

    if (line.startsWith('| ') || line.startsWith('|---')) {
      if (!inTable) {
        out.push('<div class="tbl-wrap"><table>')
        inTable = true
      }
      if (line.startsWith('|---')) continue
      const cells = line.split('|').filter(Boolean).map(s => s.trim())
      const tag = i === 0 || lines[i-1].startsWith('|---') ? 'th' : 'td'
      out.push(`<tr>${cells.map(c => `<${tag}>${inlineMD(c)}</${tag}>`).join('')}</tr>`)
      continue
    } else if (inTable) {
      out.push('</table></div>')
      inTable = false
    }
    if (line.startsWith('---')) continue
    if (line.startsWith('## ')) {
      out.push(`<h2>${inlineMD(line.slice(3))}</h2>`)
    } else if (line.startsWith('### ')) {
      out.push(`<h3>${inlineMD(line.slice(4))}</h3>`)
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ')) {
      if (!out.length || !out[out.length-1].startsWith('<ol>')) out.push('<ol>')
      out.push(`<li>${inlineMD(line.replace(/^\d+\.\s*/, ''))}</li>`)
      if (!(next.match(/^\d+\.\s/))) out.push('</ol>')
    } else if (line.startsWith('- ')) {
      if (!out.length || !out[out.length-1].startsWith('<ul>')) out.push('<ul>')
      out.push(`<li>${inlineMD(line.slice(2))}</li>`)
      if (!next.startsWith('- ')) out.push('</ul>')
    } else if (line.trim() === '') {
      // skip
    } else {
      out.push(`<p>${inlineMD(line)}</p>`)
    }
  }
  if (inTable) out.push('</table></div>')
  return out.join('\n')
}

function inlineMD(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

function slugify(title) {
  return title
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildPage(post) {
  const { front, body } = post
  const title = front.title || 'CasinoCallege Blog'
  const desc = front.description || ''
  const date = front.date || ''
  const readTime = front.readTime || ''
  const category = front.category || ''
  const slug = front.slug || slugify(title)
  const canonical = `${SITE_URL}/blog/${slug}/`

  const content = renderMD(body)

  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${escHtml(title)} — CasinoCallege</title>
<meta name="description" content="${escHtml(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(desc)}">
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<a href="/blog/" class="top-link">← ブログ一覧に戻る</a>
<article>
<span class="category">${escHtml(category)}</span>
<h1>${escHtml(title)}</h1>
<div class="meta">
<span>${date}</span>
<span>${readTime}</span>
</div>
${content}
</article>
<div class="footer">
<a href="/">CasinoCallege — カジノ大学</a>
<p>カジノディーラー養成プラットフォーム</p>
</div>
</div>
</body>
</html>`
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

export function buildAllBlogPages() {
  const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))
  const results = []

  for (const file of files) {
    const raw = readFileSync(join(contentDir, file), 'utf-8')
    const post = parseMD(raw)
    const front = post.front
    const slug = front.slug || slugify(front.title || file.replace('.md', ''))
    const html = buildPage(post)
    const dir = join(outDir, slug)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
    results.push({ slug, title: front.title, desc: front.description, date: front.date, readTime: front.readTime, category: front.category })
    console.log(`  ✓ blog/${slug}/index.html`)
  }

  return results
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('📝 Building blog pages...')
  const posts = buildAllBlogPages()
  console.log(`\n✨ Built ${posts.length} blog posts`)
}

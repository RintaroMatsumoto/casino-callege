import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight, List, X, BookOpen, Clock } from 'lucide-react'
import { illustrationMap } from '../components/illustrations'

const phaseMeta: Record<string, { title: string; file: string; lessons: number; time: string }> = {
  '0': { title: 'Phase 0: Fundamentals', file: 'phase-0-fundamentals.md', lessons: 12, time: '5.5h' },
  '1': { title: 'Phase 1: Blackjack', file: 'phase-1-blackjack.md', lessons: 24, time: '11h' },
  '2': { title: 'Phase 2: Roulette', file: 'phase-2-roulette.md', lessons: 15, time: '6.5h' },
  '3': { title: 'Phase 3: Craps', file: 'phase-3-craps.md', lessons: 21, time: '9.5h' },
  '4': { title: 'Phase 4: Poker', file: 'phase-4-poker.md', lessons: 12, time: '5h' },
  '5': { title: 'Phase 5: Baccarat', file: 'phase-5-baccarat.md', lessons: 15, time: '6h' },
  '6': { title: 'Phase 6: Career', file: 'phase-6-other-career.md', lessons: 12, time: '5h' },
}

const contentModules: Record<string, () => Promise<{ default: string }>> = {
  'phase-0-fundamentals.md': () => import('../content/phase-0-fundamentals.md?raw'),
  'phase-1-blackjack.md': () => import('../content/phase-1-blackjack.md?raw'),
  'phase-2-roulette.md': () => import('../content/phase-2-roulette.md?raw'),
  'phase-3-craps.md': () => import('../content/phase-3-craps.md?raw'),
  'phase-4-poker.md': () => import('../content/phase-4-poker.md?raw'),
  'phase-5-baccarat.md': () => import('../content/phase-5-baccarat.md?raw'),
  'phase-6-other-career.md': () => import('../content/phase-6-other-career.md?raw'),
}

type TocItem = { id: string; text: string; level: number }

function parseTOC(markdown: string): TocItem[] {
  const items: TocItem[] = []
  for (const line of markdown.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+)/)
    if (m) {
      const text = m[2].replace(/[*`~]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+/g, '-').replace(/(^-|-$)/g, '')
      items.push({ id, text, level: m[1].length })
    }
  }
  return items
}

export default function PhasePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [tocOpen, setTocOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  const meta = id ? phaseMeta[id] : null
  const currentIndex = id ? parseInt(id) : 0
  const toc = useMemo(() => parseTOC(content), [content])

  useEffect(() => {
    if (!meta) return
    setLoading(true)
    const loader = contentModules[meta.file]
    if (loader) loader().then(m => { setContent(m.default); setLoading(false) }).catch(() => setLoading(false))
    else setLoading(false)
  }, [meta])

  useEffect(() => {
    if (!meta || !id) return
    localStorage.setItem(`cc-progress-${id}`, JSON.stringify({ visited: true, lastVisit: Date.now() }))
  }, [id, meta])

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('phase-content')
      if (!article) return
      const headings = article.querySelectorAll('h1, h2, h3')
      let current = ''
      headings.forEach(h => { const r = h.getBoundingClientRect(); if (r.top <= 100) current = h.id })
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [content])

  const markdownComponents = useMemo(() => ({
    h1: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children).replace(/[*`~]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+/g, '-').replace(/(^-|-$)/g, '')
      return <h1 id={id}>{children as React.ReactNode}</h1>
    },
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children).replace(/[*`~]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 id={id}>{children as React.ReactNode}</h2>
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children).replace(/[*`~]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+/g, '-').replace(/(^-|-$)/g, '')
      return <h3 id={id}>{children as React.ReactNode}</h3>
    },
    code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
      const text = String(children || '').trim()
      if (illustrationMap[text]) { const Illo = illustrationMap[text]; return <Illo /> }
      return <code className={className}>{children as React.ReactNode}</code>
    },
  }), [])

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Phase not found</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">Dashboard</button>
      </div>
    )
  }

  return (
    <div className="flex gap-0 h-[calc(100vh-56px)] overflow-hidden">
      {/* TOC sidebar */}
      <aside className={`shrink-0 w-56 border-r border-casino-border bg-casino-royal/50 overflow-y-auto sidebar-scroll ${tocOpen ? 'fixed inset-y-14 left-0 z-30' : 'hidden'} lg:block lg:static`}>
        <div className="sticky top-0 bg-casino-royal/90 backdrop-blur p-3 border-b border-casino-border flex items-center justify-between">
          <span className="text-xs font-bold text-white">TOC</span>
          <button onClick={() => setTocOpen(false)} className="lg:hidden text-casino-muted hover:text-white"><X size={14} /></button>
        </div>
        <nav className="p-2 pb-8">
          {toc.map(item => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)}
              className={`block text-xs py-1.5 transition-colors truncate ${item.level === 1 ? 'font-semibold mt-1 text-white' : ''} ${item.level === 2 ? 'pl-3 text-casino-muted hover:text-white' : ''} ${item.level === 3 ? 'pl-6 text-casino-muted/70 hover:text-casino-muted' : ''} ${activeId === item.id ? 'text-casino-gold! border-r-2 border-casino-gold' : ''}`}>
              {item.text}
            </a>
          ))}
        </nav>
      </aside>

      {tocOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setTocOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-10 border-b border-casino-border flex items-center justify-between px-3 shrink-0 bg-casino-dark/80">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="p-1 hover:bg-casino-card/50 rounded text-casino-muted hover:text-white"><ArrowLeft size={16} /></button>
            <span className="text-sm font-bold text-white truncate">{meta.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-casino-muted flex items-center gap-1"><BookOpen size="10"/>{meta.lessons}</span>
            <span className="text-[10px] text-casino-muted flex items-center gap-1"><Clock size="10"/>{meta.time}</span>
            <button onClick={() => setTocOpen(true)} className="lg:hidden p-1 text-casino-muted hover:text-white"><List size={16} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-casino-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div id="phase-content" className="prose max-w-none p-4 md:p-6 lg:px-10 lg:py-8 animate-fadeIn">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </div>
          )}

          <div className="px-6 py-4 border-t border-casino-border flex justify-between bg-casino-dark/50">
            {currentIndex > 0 ? (
              <button onClick={() => navigate(`/phase/${currentIndex - 1}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-casino-card hover:bg-casino-card/70 border border-casino-border text-white text-sm">
                <ArrowLeft size={14} /> Prev
              </button>
            ) : <div />}
            {currentIndex < 6 ? (
              <button onClick={() => navigate(`/phase/${currentIndex + 1}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-casino-gold/10 hover:bg-casino-gold/20 border border-casino-gold/30 text-casino-gold text-sm font-semibold">
                Next <ArrowRight size={14} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

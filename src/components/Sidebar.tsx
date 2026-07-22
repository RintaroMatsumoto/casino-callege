import { useNavigate, useLocation } from 'react-router-dom'
import { X, Home, Library, HelpCircle, TrendingUp, Zap, Gem, DollarSign, Layout, Newspaper } from 'lucide-react'
import CasinoAffiliate from './CasinoAffiliate'

const phases = [
  { id: '0', label: 'Phase 0: 基礎', icon: Home },
  { id: '1', label: 'Phase 1: ブラックジャック', icon: Zap },
  { id: '2', label: 'Phase 2: ルーレット', icon: Gem },
  { id: '3', label: 'Phase 3: クラップス', icon: TrendingUp },
  { id: '4', label: 'Phase 4: ポーカー', icon: HelpCircle },
  { id: '5', label: 'Phase 5: バカラ', icon: DollarSign },
  { id: '6', label: 'Phase 6: その他+実践', icon: Layout },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateTo = (path: string) => {
    navigate(path)
    onClose()
  }

  const isActive = (id: string) => location.pathname.includes(`/phase/${id}`)

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-64 bg-casino-royal border-r border-casino-border
      transform transition-transform duration-200 shrink-0
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Header */}
      <div className="h-14 border-b border-casino-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-casino-gold to-yellow-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">CasinoCallege</p>
            <p className="text-casino-muted text-[10px] leading-none mt-0.5">カジノゲームの教科書</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 text-casino-muted hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1 sidebar-scroll overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Dashboard */}
        <button
          onClick={() => navigateTo('/')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === '/' ? 'bg-casino-gold/10 text-casino-gold' : 'text-casino-muted hover:text-white hover:bg-casino-card/50'}`}
        >
          <Home size={16} />
          ダッシュボード
        </button>

        {/* Phases */}
        <div className="pt-3 pb-1 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-casino-muted/60">カリキュラム</p>
        </div>
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => navigateTo(`/phase/${p.id}`)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive(p.id) ? 'bg-casino-gold/10 text-casino-gold' : 'text-casino-muted hover:text-white hover:bg-casino-card/50'}`}
          >
            <p.icon size={16} />
            {p.label}
          </button>
        ))}

        {/* Tools */}
        <div className="pt-3 pb-1 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-casino-muted/60">ツール</p>
        </div>
        <button
          onClick={() => navigateTo('/glossary')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === '/glossary' ? 'bg-casino-gold/10 text-casino-gold' : 'text-casino-muted hover:text-white hover:bg-casino-card/50'}`}
        >
          <Library size={16} />
          用語集
        </button>
        <button
          onClick={() => navigateTo('/blog')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname.startsWith('/blog') ? 'bg-casino-gold/10 text-casino-gold' : 'text-casino-muted hover:text-white hover:bg-casino-card/50'}`}
        >
          <Newspaper size={16} />
          ブログ
        </button>

        {/* Affiliate */}
        <div className="px-3 pt-4">
          <CasinoAffiliate />
        </div>
      </nav>
    </aside>
  )
}

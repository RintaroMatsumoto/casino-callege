import { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import LoginButton from './LoginButton'
import { BookOpen, Menu, Sun, Moon } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const location = useLocation()

  const toggleDark = useCallback(() => setDark(d => !d), [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const pageTitle = location.pathname === '/' ? 'Dashboard'
    : location.pathname.startsWith('/phase/') ? `Phase ${location.pathname.split('/')[2]}`
    : location.pathname === '/glossary' ? '用語集 (Glossary)'
    : location.pathname.startsWith('/quiz/') ? `Quiz - Phase ${location.pathname.split('/')[2]}`
    : 'CasinoCallege'

  return (
    <div className="h-screen flex bg-casino-dark text-casino-text overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-casino-border flex items-center justify-between px-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-casino-card/50 text-zinc-400">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-casino-gold" />
            <span className="font-bold text-white text-sm tracking-wide">{pageTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <LoginButton />
            <button onClick={toggleDark} className="p-1.5 rounded-lg hover:bg-casino-card/50 text-zinc-400">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

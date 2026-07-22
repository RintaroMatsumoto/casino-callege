import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Sidebar from './Sidebar'
import DrumCounter from './DrumCounter'
import CasinoBackground from './CasinoBackground'
import { BookOpen, Menu } from 'lucide-react'

function helmetForPath(pathname: string) {
  if (pathname === '/') return <Helmet><title>CasinoCallege — カジノディーラー養成プラットフォーム</title><meta name="description" content="実際のディーラースクール教育カリキュラムに準拠した本格的なカジノ学習プラットフォーム。全7Phaseのカリキュラムでブラックジャック、ルーレット、クラップス、ポーカー、バカラを無料で学ぶ。" /></Helmet>
  if (pathname.startsWith('/phase/0')) return <Helmet><title>Phase 0: 基礎 — CasinoCallege</title><meta name="description" content="カジノの基礎、専門用語、数学的基礎、チップ操作、カードハンドリングを学ぶ。ディーラーになるための第一歩。" /></Helmet>
  if (pathname.startsWith('/phase/1')) return <Helmet><title>Phase 1: ブラックジャック — CasinoCallege</title><meta name="description" content="ブラックジャックのディーリング技術を習得。シュー/ピッチゲーム、ペイアウト計算、ベーシックストラテジー、ゲームプロテクションを網羅。" /></Helmet>
  if (pathname.startsWith('/phase/2')) return <Helmet><title>Phase 2: ルーレット — CasinoCallege</title><meta name="description" content="アメリカン/ヨーロピアンルーレットの全ベットタイプ、ペイアウト計算、チップ管理を学ぶ。ディーラーとしての正確なペイアウト技術を習得。" /></Helmet>
  if (pathname.startsWith('/phase/3')) return <Helmet><title>Phase 3: クラップス — CasinoCallege</title><meta name="description" content="カジノで最も複雑なテーブルゲーム、クラップスを完全マスター。テーブルレイアウト、ダイスハンドリング、全ベット種を学習。" /></Helmet>
  if (pathname.startsWith('/phase/4')) return <Helmet><title>Phase 4: ポーカー — CasinoCallege</title><meta name="description" content="ポーカールームのディーリング手順を学ぶ。ハンドランキング、ポット管理、レーキ、トーナメント進行を習得。" /></Helmet>
  if (pathname.startsWith('/phase/5')) return <Helmet><title>Phase 5: バカラ — CasinoCallege</title><meta name="description" content="マカオで売上の91%を占めるバカラ（プントバンコ）のディーリング技術を学ぶ。タブロー、コミッション管理、サイドベットを網羅。" /></Helmet>
  if (pathname.startsWith('/phase/6')) return <Helmet><title>Phase 6: キャリア — CasinoCallege</title><meta name="description" content="ディーラーとしてのキャリア構築、面接対策、カジノ運営の知識、日本IR開業情報を網羅した実践編。" /></Helmet>
  if (pathname === '/glossary') return <Helmet><title>カジノ用語集 — CasinoCallege</title><meta name="description" content="ブラックジャック、ルーレット、クラップス、ポーカー、バカラなどカジノゲームの専門用語を網羅した用語集。検索・カテゴリフィルター対応。" /></Helmet>
  if (pathname.startsWith('/quiz/')) return <Helmet><title>クイズ — CasinoCallege</title><meta name="description" content="カジノディーラー知識をチェックする無料クイズ。各Phaseごとの問題で理解度を確認。" /></Helmet>
  if (pathname === '/blog') return <Helmet><title>ブログ — CasinoCallege</title><meta name="description" content="カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。業界情報、学習方法、キャリアガイド。" /></Helmet>
  return null
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const pageTitle = location.pathname === '/' ? 'ダッシュボード'
    : location.pathname.startsWith('/phase/') ? `Phase ${location.pathname.split('/')[2]}`
    : location.pathname === '/glossary' ? '用語集'
    : location.pathname.startsWith('/quiz/') ? `クイズ - Phase ${location.pathname.split('/')[2]}`
    : 'CasinoCallege'

  return (
    <>
      {helmetForPath(location.pathname)}
      <div className="h-screen flex bg-casino-dark text-casino-text overflow-hidden">
      <CasinoBackground />
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
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
            <DrumCounter />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  )
}

import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'

const GAME_META: Record<string, { emoji: string; name: string; phase: string }> = {
  'blackjack': { emoji: '🃏', name: 'ブラックジャック', phase: 'Phase 1' },
  'roulette': { emoji: '🎡', name: 'ルーレット', phase: 'Phase 2' },
  'craps': { emoji: '🎲', name: 'クラップス', phase: 'Phase 3' },
  'poker': { emoji: '♠️', name: 'ポーカー', phase: 'Phase 4' },
  'baccarat': { emoji: '💎', name: 'バカラ', phase: 'Phase 5' },
}

export default function PlayGame() {
  const navigate = useNavigate()
  const path = window.location.pathname
  const gameId = path.split('/play/')[1]
  const meta = gameId ? GAME_META[gameId] : null

  if (!meta) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">ゲームが見つかりません</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">ダッシュボード</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-16 animate-fadeIn">
      <div className="text-7xl mb-6">{meta.emoji}</div>
      <h1 className="text-3xl font-bold text-white mb-2">{meta.name}</h1>
      <p className="text-casino-muted text-sm mb-2">{meta.phase} で学んだゲーム</p>

      <div className="flex items-center justify-center gap-2 mt-8 mb-8">
        <Construction size={20} className="text-casino-gold" />
        <span className="text-casino-gold font-semibold text-lg">Coming Soon</span>
        <Construction size={20} className="text-casino-gold" />
      </div>

      <p className="text-casino-muted text-sm max-w-md mx-auto leading-relaxed mb-10">
        現在開発中です。準備ができ次第、ここで実際にプレイできるようになります。
        しばらくお待ちください。
      </p>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-casino-card border border-casino-border text-white hover:bg-casino-card/70 transition-colors"
      >
        <ArrowLeft size={16} /> ダッシュボードに戻る
      </button>
    </div>
  )
}

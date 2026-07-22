import { useNavigate } from 'react-router-dom'
import { Zap, Gem, TrendingUp, HelpCircle, Home, DollarSign, Layout } from 'lucide-react'

const phases = [
  { id: '0', icon: Home, title: 'Phase 0', subtitle: '基礎', desc: 'カジノの基礎、用語、数学', color: 'from-blue-500 to-cyan-500', lessons: 12, time: '5.5h' },
  { id: '1', icon: Zap, title: 'Phase 1', subtitle: 'ブラックジャック', desc: '世界で最も人気のあるテーブルゲーム', color: 'from-amber-500 to-orange-600', lessons: 24, time: '11h' },
  { id: '2', icon: Gem, title: 'Phase 2', subtitle: 'ルーレット', desc: 'チップ管理とペイアウト計算', color: 'from-green-500 to-emerald-600', lessons: 15, time: '6.5h' },
  { id: '3', icon: TrendingUp, title: 'Phase 3', subtitle: 'クラップス', desc: '最も複雑なテーブルゲーム', color: 'from-red-500 to-rose-600', lessons: 21, time: '9.5h' },
  { id: '4', icon: HelpCircle, title: 'Phase 4', subtitle: 'ポーカー', desc: 'ディーラーの数学と手順', color: 'from-purple-500 to-violet-600', lessons: 12, time: '5h' },
  { id: '5', icon: DollarSign, title: 'Phase 5', subtitle: 'バカラ', desc: 'マカオ最大のゲーム（売上の91%）', color: 'from-yellow-400 to-amber-600', lessons: 15, time: '6h' },
  { id: '6', icon: Layout, title: 'Phase 6', subtitle: 'キャリア', desc: '面接対策、カジノ運営、日本IR', color: 'from-indigo-500 to-purple-600', lessons: 12, time: '5h' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Casino<span className="text-casino-gold">Callege</span>
        </h1>
          <p className="text-casino-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            カジノゲームの教科書。
            <br />プレイヤー、ディーラー、そして好奇心を持つすべての人へ。
          </p>
      </div>

      <h2 className="text-lg font-bold text-white mb-4">カリキュラム</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => navigate(`/phase/${p.id}`)}
            className="text-left bg-casino-card rounded-xl p-4 border border-casino-border hover:border-casino-gold/30 hover:bg-casino-card/80 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                <p.icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{p.title}</span>
                  <span className="text-[10px] text-casino-muted bg-casino-royal px-1.5 py-0.5 rounded">{p.lessons} レッスン</span>
                </div>
                <p className="text-sm text-casino-gold font-semibold">{p.subtitle}</p>
                <p className="text-xs text-casino-muted mt-0.5 line-clamp-1">{p.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <h2 className="text-lg font-bold text-white mb-4 mt-10">ゲームをプレイ</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { id: 'blackjack', emoji: '🃏', label: 'ブラックジャック', color: 'from-amber-500 to-orange-600', phase: 'Phase 1' },
          { id: 'roulette', emoji: '🎡', label: 'ルーレット', color: 'from-green-500 to-emerald-600', phase: 'Phase 2' },
          { id: 'craps', emoji: '🎲', label: 'クラップス', color: 'from-red-500 to-rose-600', phase: 'Phase 3' },
          { id: 'poker', emoji: '♠️', label: 'ポーカー', color: 'from-purple-500 to-violet-600', phase: 'Phase 4' },
          { id: 'baccarat', emoji: '💎', label: 'バカラ', color: 'from-yellow-400 to-amber-600', phase: 'Phase 5' },
        ].map(g => (
          <button
            key={g.id}
            onClick={() => navigate(`/play/${g.id}`)}
            className="bg-casino-card rounded-xl p-4 border border-casino-border hover:border-casino-gold/30 hover:bg-casino-card/80 transition-all group text-center"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center mx-auto mb-2`}>
              <span className="text-lg">{g.emoji}</span>
            </div>
            <p className="text-sm font-bold text-white">{g.label}</p>
            <p className="text-[10px] text-casino-muted mt-0.5">{g.phase}</p>
            <span className="inline-block mt-2 text-[10px] text-casino-gold bg-casino-gold/10 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

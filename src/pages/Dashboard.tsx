import { useNavigate } from 'react-router-dom'
import { Zap, Gem, TrendingUp, HelpCircle, Home, Library, BarChart3, Target, DollarSign, Layout } from 'lucide-react'

const phases = [
  { id: '0', icon: Home, title: 'Phase 0', subtitle: '基礎 Fundamentals', desc: 'カジノのしくみ・用語・数学の基本', color: 'from-blue-500 to-cyan-500', lessons: 12, time: '5.5h' },
  { id: '1', icon: Zap, title: 'Phase 1', subtitle: 'Blackjack', desc: '世界一のテーブルゲームを極める', color: 'from-amber-500 to-orange-600', lessons: 24, time: '11h' },
  { id: '2', icon: Gem, title: 'Phase 2', subtitle: 'Roulette', desc: 'チップ管理と配当計算の基礎', color: 'from-green-500 to-emerald-600', lessons: 15, time: '6.5h' },
  { id: '3', icon: TrendingUp, title: 'Phase 3', subtitle: 'Craps', desc: '花形ゲームのすべて', color: 'from-red-500 to-rose-600', lessons: 21, time: '9.5h' },
  { id: '4', icon: HelpCircle, title: 'Phase 4', subtitle: 'Poker', desc: 'ディーラー数学と実務', color: 'from-purple-500 to-violet-600', lessons: 12, time: '5h' },
  { id: '5', icon: DollarSign, title: 'Phase 5', subtitle: 'Baccarat', desc: '世界最大のカジノゲーム。アジアVIPの中心', color: 'from-yellow-400 to-amber-600', lessons: 15, time: '6h' },
  { id: '6', icon: Layout, title: 'Phase 6', subtitle: 'その他+実践', desc: 'カーニバルゲーム+キャリア+面接対策', color: 'from-indigo-500 to-purple-600', lessons: 12, time: '5h' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Casino<span className="text-casino-gold">Callege</span>
        </h1>
        <p className="text-casino-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          カジノゲームの教科書。
          <br />遊ぶ人も、働く人も、知りたい人も。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: BarChart3, label: '総レッスン数', value: '150+' },
          { icon: Target, label: '総学習時間', value: '60h+' },
          { icon: Library, label: '用語集', value: '100語' },
        ].map(s => (
          <div key={s.label} className="bg-casino-card rounded-xl p-4 border border-casino-border text-center">
            <s.icon size={20} className="text-casino-gold mx-auto mb-1.5" />
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-casino-muted uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Phase cards */}
      <h2 className="text-lg font-bold text-white mb-4">カリキュラム (Curriculum)</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => navigate(`/phase/${p.id}`)}
            className="text-left bg-casino-card rounded-xl p-4 border border-casino-border hover:border-casino-gold/30 hover:bg-casino-card/80 transition-all group"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                <p.icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{p.title}</span>
                  <span className="text-[10px] text-casino-muted bg-casino-royal px-1.5 py-0.5 rounded">{p.lessons} lessons</span>
                </div>
                <p className="text-sm text-casino-gold font-semibold">{p.subtitle}</p>
                <p className="text-xs text-casino-muted mt-0.5 line-clamp-1">{p.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>


    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { Zap, Gem, TrendingUp, HelpCircle, Home, DollarSign, Layout } from 'lucide-react'
import DrumCounter from '../components/DrumCounter'

const phases = [
  { id: '0', icon: Home, title: 'Phase 0', subtitle: 'Fundamentals', desc: 'Casino basics, terms, math', color: 'from-blue-500 to-cyan-500', lessons: 12, time: '5.5h' },
  { id: '1', icon: Zap, title: 'Phase 1', subtitle: 'Blackjack', desc: 'The world\'s most popular table game', color: 'from-amber-500 to-orange-600', lessons: 24, time: '11h' },
  { id: '2', icon: Gem, title: 'Phase 2', subtitle: 'Roulette', desc: 'Chip management and payout math', color: 'from-green-500 to-emerald-600', lessons: 15, time: '6.5h' },
  { id: '3', icon: TrendingUp, title: 'Phase 3', subtitle: 'Craps', desc: 'The most complex table game', color: 'from-red-500 to-rose-600', lessons: 21, time: '9.5h' },
  { id: '4', icon: HelpCircle, title: 'Phase 4', subtitle: 'Poker', desc: 'Dealer math and procedures', color: 'from-purple-500 to-violet-600', lessons: 12, time: '5h' },
  { id: '5', icon: DollarSign, title: 'Phase 5', subtitle: 'Baccarat', desc: 'The biggest game in Macau (91% revenue)', color: 'from-yellow-400 to-amber-600', lessons: 15, time: '6h' },
  { id: '6', icon: Layout, title: 'Phase 6', subtitle: 'Career', desc: 'Interview prep, casino operations, Japan IR', color: 'from-indigo-500 to-purple-600', lessons: 12, time: '5h' },
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
          The casino game textbook.
          <br />For players, dealers, and the curious.
        </p>
        <div className="mt-6">
          <DrumCounter />
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-4">Curriculum</h2>
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

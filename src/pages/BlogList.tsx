import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const POSTS = [
  { slug: 'casino-dealer-guide-2026', title: 'カジノディーラーになるには？完全ガイド2026', desc: '必要なスキル、資格、給料、求人情報、おすすめの学習方法を徹底解説。', date: '2026-07-22', readTime: '12分', category: 'キャリア' },
  { slug: 'blackjack-dealer-basics', title: 'ブラックジャックディーラーの基本動作と手信号', desc: 'カード配布、チップ管理、ゲーム進行、正しい手信号を徹底解説。', date: '2026-07-22', readTime: '8分', category: 'ブラックジャック' },
  { slug: 'osaka-ir-dealer-demand', title: '大阪IR開業でディーラー需要が急増する理由', desc: '2029-2030年開業予定の大阪IRで必要なディーラー数、求められるスキルを解説。', date: '2026-07-22', readTime: '6分', category: '業界情報' },
  { slug: 'casino-terminology-100', title: 'カジノ用語100選：ディーラーを目指す人が覚えるべき基本用語', desc: '最初に覚えるべき100の専門用語をカテゴリ別に解説。', date: '2026-07-22', readTime: '10分', category: '基礎知識' },
  { slug: 'roulette-payout-master', title: 'ルーレットディーラーのペイアウト計算完全マスター', desc: '全ベットタイプのペイアウト計算方法を徹底解説。', date: '2026-07-22', readTime: '7分', category: 'ルーレット' },
]

export default function BlogList() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 bg-casino-dark/80 backdrop-blur-sm rounded-xl border border-casino-border p-5">
        <h1 className="text-2xl font-bold text-white mb-2">CasinoCallege ブログ</h1>
        <p className="text-casino-muted text-sm">カジノディーラー学習に役立つ情報を発信</p>
      </div>

      <div className="space-y-3">
        {POSTS.map(p => (
          <button
            key={p.slug}
            onClick={() => navigate(`/blog/${p.slug}`)}
            className="w-full text-left bg-casino-card rounded-xl p-5 border border-casino-border hover:border-casino-gold/30 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-casino-gold bg-casino-gold/10 px-2 py-0.5 rounded">{p.category}</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-casino-gold transition-colors mb-1.5">{p.title}</h2>
            <p className="text-sm text-casino-muted line-clamp-2 mb-3">{p.desc}</p>
            <div className="flex items-center gap-3 text-[10px] text-casino-muted">
              <span className="flex items-center gap-1"><Calendar size={10} />{p.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{p.readTime}</span>
              <span className="flex items-center gap-1 ml-auto text-casino-gold group-hover:underline text-xs">読む <ArrowRight size={12} /></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

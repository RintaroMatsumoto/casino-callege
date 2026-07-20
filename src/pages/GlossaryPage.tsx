import { useState, useMemo } from 'react'
import { Search, X, BookOpen } from 'lucide-react'

const GLOSSARY_DATA: { term: string; category: string; definition: string }[] = [
  { term: 'Action', category: 'general', definition: '賭けられた総金額。カジノがVIP顧客を評価する際の指標。' },
  { term: 'Ante', category: 'poker', definition: '全プレイヤーがハンド開始前に強制的に支払うベット。ポットの種銭。' },
  { term: 'Bankroll', category: 'general', definition: 'ギャンブルに充てる総資金。適切な管理が長期的な成功に不可欠。' },
  { term: 'Basic Strategy', category: 'blackjack', definition: 'BJにおける数学的に最適なプレイをまとめた戦略表。1956年に最初に発表された。' },
  { term: 'Blackjack', category: 'blackjack', definition: 'A+10点札の組み合わせ。通常3:2で支払われる最強の手。発生確率約4.8%。' },
  { term: 'Boxman', category: 'craps', definition: 'クラップスでチップバンクの後ろに座り、ディーラーを監督する従業員。' },
  { term: 'Burn Card', category: 'general', definition: '不正防止のため、配布前に捨てる一番上のカード。BJ・Pokerで使用。' },
  { term: 'Bust', category: 'blackjack', definition: '手札の合計が21を超えること。即座に負けとなる。' },
  { term: 'Card Counting', category: 'blackjack', definition: '出たカードを記憶し、残りのデッキの有利不利を判断する合法的技術。' },
  { term: 'Chip', category: 'general', definition: 'カジノ内で現金の代わりに使う専用トークン。色別に異なる価値を持つ。' },
  { term: 'Come Bet', category: 'craps', definition: 'ポイント成立後に置けるパスラインと同機能のベット。' },
  { term: 'Commission', category: 'general', definition: '特定のベットにかかる手数料。通常5%。バカラBanker・クラップス買いベット等。' },
  { term: 'Croupier', category: 'general', definition: 'ディーラーのフランス語。欧州で使われる呼称。' },
  { term: 'Dealer', category: 'general', definition: 'カジノでゲームの進行とベット管理を担当する従業員。' },
  { term: 'Double Down', category: 'blackjack', definition: 'ベットを2倍にし、追加1枚だけカードを引くアクション。' },
  { term: 'Don\'t Pass', category: 'craps', definition: 'パスラインの逆ベット。シューターが負けることに賭ける。HE 1.36%。' },
  { term: 'En Prison', category: 'roulette', definition: '0が出た場合に偶数マネーベットを次のスピンに保留するフランス式ルール。' },
  { term: 'Expected Value', category: 'general', definition: '長期的に平均して得られる1ベットあたりの損益。カジノ数学の基本概念。' },
  { term: 'Field Bet', category: 'craps', definition: 'ワンロールベット。2,3,4,9,10,11,12に賭ける。2と12にボーナス配当。' },
  { term: 'Hardway', category: 'craps', definition: '両方のダイスが同じ目で出ることに賭けるベット。Hard 8(4-4)等。' },
  { term: 'Hit', category: 'blackjack', definition: 'カードをもう1枚引くこと。手信号はテーブルを指で叩く。' },
  { term: 'Hole Card', category: 'blackjack', definition: 'ディーラーの裏向きのカード。プレイヤーには見えない。' },
  { term: 'House Edge', category: 'general', definition: '各ベットに対するカジノの数学的優位性（%）。収益の源泉。' },
  { term: 'Insurance', category: 'blackjack', definition: 'ディーラーがAを示した場合のサイドベット。BJの場合2:1で支払い。長期的に損。' },
  { term: 'Kelly Criterion', category: 'general', definition: '最適なベットサイズを決定する数学的公式。投資・ギャンブルに応用。' },
  { term: 'Martingale', category: 'general', definition: '負けるたびにベット額を2倍にするベットシステム。長期的には破綻する。' },
  { term: 'Natural', category: 'general', definition: '最初のカードだけで自動勝ちとなる手。BJの21、クラップスの7/11。' },
  { term: 'Odds Bet', category: 'craps', definition: 'パスライン後方の追加ベット。HE 0%のフェアな賭け。' },
  { term: 'Pass Line', category: 'craps', definition: 'クラップスの基本ベット。7/11で勝ち、2/3/12で負け。HE 1.41%。' },
  { term: 'Payout', category: 'general', definition: '勝ちベットに対する支払い。通常比率で表示（3:2, 1:1等）。' },
  { term: 'Pit Boss', category: 'general', definition: '複数テーブルを監督するカジノの上司。クレーム対応・VIP対応を担当。' },
  { term: 'Push', category: 'general', definition: '引き分け。賭けたチップがそのまま戻ってくる。' },
  { term: 'Rake', category: 'poker', definition: 'ポーカーの各ポットからカジノが徴収する手数料。通常5%。' },
  { term: 'Risk of Ruin', category: 'general', definition: '所定の条件でプレイを続けた場合にバンクロールがゼロになる確率。' },
  { term: 'Shoe', category: 'blackjack', definition: '複数デッキのカードを収納し、1枚ずつ配るための器具。' },
  { term: 'Shooter', category: 'craps', definition: 'クラップスで現在サイコロを振っているプレイヤー。' },
  { term: 'Split', category: 'blackjack', definition: 'ペアを2つの独立した手に分けるアクション。ベットを2倍にする。' },
  { term: 'Stand', category: 'blackjack', definition: 'カードをこれ以上引かないこと。手信号は手のひらを水平に振る。' },
  { term: 'Stickman', category: 'craps', definition: 'クラップスの中央に立つ従業員。サイコロ操作と出目宣告を担当。' },
  { term: 'Straight Up', category: 'roulette', definition: '単一の番号に賭けるルーレットベット。35:1の配当。' },
  { term: 'Surrender', category: 'blackjack', definition: 'ベットの半分を放棄して即座にハンドを終了する選択肢。' },
  { term: 'Tableau', category: 'baccarat', definition: 'バカラの3枚目ドローを決定する固定ルール表。' },
  { term: 'True Count', category: 'blackjack', definition: 'Running Countを残りデッキ数で割った値。実際のプレイヤー有利度を示す。' },
  { term: 'Vigorish', category: 'general', definition: '特定のベットにかかる手数料の別名。コミッションとも呼ぶ。' },
  { term: 'Volatility', category: 'general', definition: '結果のブレ幅。高ボラティリティ=大きな変動。スロットの特性評価に使用。' },
  { term: 'Whale', category: 'general', definition: '1回のセッションで数百万〜数億円を賭ける超VIP顧客。' },
  { term: 'Zero (0)', category: 'roulette', definition: 'ルーレットの緑のポケット。これが出ると全インサイドベットが負け。' },
]

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'general', label: 'General' },
  { key: 'blackjack', label: 'Blackjack' },
  { key: 'roulette', label: 'Roulette' },
  { key: 'craps', label: 'Craps' },
  { key: 'poker', label: 'Poker' },
  { key: 'baccarat', label: 'Baccarat' },
]

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() =>
    GLOSSARY_DATA.filter(t => {
      if (category !== 'all' && t.category !== category) return false
      if (search && !t.term.toLowerCase().includes(search.toLowerCase()) && !t.definition.includes(search)) return false
      return true
    }),
    [search, category]
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={24} className="text-casino-gold" />
        <h1 className="text-2xl font-bold text-white">用語集 (Glossary)</h1>
        <span className="text-xs text-casino-muted bg-casino-card px-2 py-1 rounded">{GLOSSARY_DATA.length} terms</span>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-casino-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-9 pr-8 py-2.5 bg-casino-card border border-casino-border rounded-lg text-white text-sm placeholder:text-casino-muted/50 focus:outline-none focus:border-casino-gold/50"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-casino-muted hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${category === c.key ? 'bg-casino-gold/20 text-casino-gold border border-casino-gold/30' : 'bg-casino-card border border-casino-border text-casino-muted hover:text-white'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="grid gap-2">
        {filtered.map(t => (
          <div key={t.term} className="bg-casino-card rounded-lg p-4 border border-casino-border hover:border-casino-gold/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white text-sm">{t.term}</span>
              <span className="text-[10px] text-casino-gold bg-casino-gold/10 px-1.5 py-0.5 rounded uppercase">{t.category}</span>
            </div>
            <p className="text-sm text-casino-muted leading-relaxed">{t.definition}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-casino-muted py-12">No terms found for your search.</p>
      )}
    </div>
  )
}

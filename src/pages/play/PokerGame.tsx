import { useState } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { CardFace } from '../../games/Card'
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react'

const HAND_NAMES: Record<string, string> = {
  '9': 'ロイヤルフラッシュ', '8': 'ストレートフラッシュ', '7': 'フォーカード',
  '6': 'フルハウス', '5': 'フラッシュ', '4': 'ストレート',
  '3': 'スリーカード', '2': 'ツーペア', '1': 'ワンペア', '0': 'ハイカード',
}

function evaluate(cards: CardType[]) {
  const v = cards.map(c => c.rank === 'A' ? 14 : c.rank === 'K' ? 13 : c.rank === 'Q' ? 12 : c.rank === 'J' ? 11 : c.rank === '10' ? 10 : parseInt(c.rank))
  const s = [...v].sort((a, b) => b - a), suits = cards.map(c => c.suit)
  const flush = suits.every(x => x === suits[0])
  const straight = (() => { if (s[0] === 14 && s[1] === 5 && s[2] === 4 && s[3] === 3 && s[4] === 2) return 5; for (let i = 0; i < 4; i++) if (s[i] - s[i + 1] !== 1) return 0; return s[0] })()
  const m = new Map<number, number>(); v.forEach(x => m.set(x, (m.get(x) || 0) + 1))
  const g = [...m.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])
  if (straight === 14 && flush) return { rank: 9, name: HAND_NAMES['9'] }
  if (flush && straight) return { rank: 8, name: HAND_NAMES['8'] }
  if (g[0][1] === 4) return { rank: 7, name: HAND_NAMES['7'] }
  if (g[0][1] === 3 && g[1]?.[1] === 2) return { rank: 6, name: HAND_NAMES['6'] }
  if (flush) return { rank: 5, name: HAND_NAMES['5'] }
  if (straight) return { rank: 4, name: HAND_NAMES['4'] }
  if (g[0][1] === 3) return { rank: 3, name: HAND_NAMES['3'] }
  if (g[0][1] === 2 && g[1]?.[1] === 2) return { rank: 2, name: HAND_NAMES['2'] }
  if (g[0][1] === 2) return { rank: 1, name: HAND_NAMES['1'] }
  return { rank: 0, name: HAND_NAMES['0'] }
}

const AI_NAMES = ['佐藤さん', '鈴木さん', '田中さん']

function createGame() { const d = shuffleDeck(createDeck()); return { deck: d, player: [d.pop()!, d.pop()!], ai: AI_NAMES.map(() => [d.pop()!, d.pop()!]), community: [] as CardType[], phase: 'preflop' as 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' } }

export default function PokerGame() {
  const [g, setG] = useState(createGame)
  const [message, setMessage] = useState('プリフロップ！ 「次へ」で進む')
  const [result, setResult] = useState<{ myHand: string; aiHands: string[]; winner: string; winnerHand: string } | null>(null)

  const next = () => {
    const d = [...g.deck], c = [...g.community]
    if (g.phase === 'preflop') { c.push(d.pop()!, d.pop()!, d.pop()!); setG({ ...g, deck: d, community: c, phase: 'flop' }); setMessage('フロップ！') }
    else if (g.phase === 'flop') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'turn' }); setMessage('ターン！') }
    else if (g.phase === 'turn') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'river' }); setMessage('リバー！') }
    else showdown()
  }

  const fold = () => { setResult({ myHand: '', aiHands: [], winner: 'あなた', winnerHand: 'フォールド' }); setMessage('フォールド') }

  const showdown = () => {
    const myEval = evaluate([...g.player, ...g.community])
    const aiEvals = g.ai.map(ai => evaluate([...ai, ...g.community]))
    let best = -1, bestIdx = -1
    ;[myEval, ...aiEvals].forEach((h, i) => { if (h.rank > best) { best = h.rank; bestIdx = i } })
    const winner = bestIdx === 0 ? 'あなた' : AI_NAMES[bestIdx - 1]
    setResult({ myHand: myEval.name, aiHands: aiEvals.map(h => h.name), winner, winnerHand: [myEval, ...aiEvals][bestIdx].name })
    setMessage(bestIdx === 0 ? `あなたの勝ち！ ${myEval.name}` : `${AI_NAMES[bestIdx - 1]}の勝ち！ ${aiEvals[bestIdx - 1].name}`)
    setG({ ...g, phase: 'showdown' })
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-3"><span className="text-2xl">♠️</span><h1 className="text-lg font-bold text-white">テキサスホールデム</h1></div>

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        {/* AI hands */}
        <div className="flex justify-center gap-2 mb-3">
          {g.ai.map((hand, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                <CardFace card={{ ...hand[0], hidden: g.phase !== 'showdown' }} size="sm" />
                <CardFace card={{ ...hand[1], hidden: g.phase !== 'showdown' }} size="sm" />
              </div>
              <span className="text-[10px] text-white/60">{AI_NAMES[i]}</span>
              {g.phase === 'showdown' && result && <span className="text-[8px] text-casino-muted">{result.aiHands[i]}</span>}
            </div>
          ))}
        </div>

        {/* Community */}
        <div className="flex justify-center gap-1.5 mb-3 min-h-[50px]">
          {g.phase === 'preflop' ? <span className="text-xs text-white/40">プリフロップ</span> : g.community.map((c, i) => (
            <div key={i} style={{ transition: 'all 0.3s ease', transform: 'translateY(0)', opacity: 1 }}><CardFace card={c} /></div>
          ))}
        </div>

        {/* Player */}
        <div className="flex justify-center gap-1.5 mb-2">{g.player.map((c, i) => <CardFace key={i} card={c} />)}</div>
        {g.phase === 'showdown' && result && <div className="text-center text-xs text-emerald-400 font-bold">{result.myHand}</div>}

        {/* Result */}
        {result && (
          <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              {result.winner === 'あなた' ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}
              <span className={`text-sm font-bold ${result.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400'}`}>{result.winner === 'あなた' ? 'WIN' : 'LOSE'}</span>
            </div>
            <div className="text-center text-xs text-casino-muted">{result.winner} の勝ち（{result.winnerHand}）</div>
          </div>
        )}
      </div>

      <div className={`mt-3 text-center text-sm font-bold ${result ? (result.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400') : 'text-casino-gold'}`}>{message}</div>

      <div className="flex gap-3 mt-4 justify-center">
        {!result ? (
          <>
            <button onClick={next} className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">{g.phase === 'river' ? 'ショーダウン' : '次へ'}</button>
            <button onClick={fold} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">フォールド</button>
          </>
        ) : (
          <button onClick={() => { setG(createGame()); setResult(null); setMessage('プリフロップ！ 「次へ」で進む') }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm">
            <RotateCcw size={14} /> もう一度
          </button>
        )}
      </div>
    </div>
  )
}

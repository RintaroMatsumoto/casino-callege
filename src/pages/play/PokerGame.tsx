import { useState } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { CardFace } from '../../games/Card'

const HAND_NAMES: Record<string, string> = {
  '9': 'ロイヤルフラッシュ', '8': 'ストレートフラッシュ', '7': 'フォーカード',
  '6': 'フルハウス', '5': 'フラッシュ', '4': 'ストレート',
  '3': 'スリーカード', '2': 'ツーペア', '1': 'ワンペア', '0': 'ハイカード',
}

function evaluateHand(cards: CardType[]) {
  const vals = cards.map(c => c.rank === 'A' ? 14 : c.rank === 'K' ? 13 : c.rank === 'Q' ? 12 : c.rank === 'J' ? 11 : c.rank === '10' ? 10 : parseInt(c.rank))
  const sorted = [...vals].sort((a, b) => b - a)
  const suits = cards.map(c => c.suit)
  const isFlush = suits.every(s => s === suits[0])
  const isStraight = (() => {
    if (sorted[0] === 14 && sorted[1] === 5 && sorted[2] === 4 && sorted[3] === 3 && sorted[4] === 2) return 5
    for (let i = 0; i < 4; i++) if (sorted[i] - sorted[i + 1] !== 1) return 0
    return sorted[0]
  })()
  const counts = new Map<number, number>()
  vals.forEach(v => counts.set(v, (counts.get(v) || 0) + 1))
  const groups = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])

  if (isStraight === 14 && isFlush) return { rank: 9, name: HAND_NAMES['9'] }
  if (isFlush && isStraight) return { rank: 8, name: HAND_NAMES['8'] }
  if (groups[0][1] === 4) return { rank: 7, name: HAND_NAMES['7'] }
  if (groups[0][1] === 3 && groups[1]?.[1] === 2) return { rank: 6, name: HAND_NAMES['6'] }
  if (isFlush) return { rank: 5, name: HAND_NAMES['5'] }
  if (isStraight) return { rank: 4, name: HAND_NAMES['4'] }
  if (groups[0][1] === 3) return { rank: 3, name: HAND_NAMES['3'] }
  if (groups[0][1] === 2 && groups[1]?.[1] === 2) return { rank: 2, name: HAND_NAMES['2'] }
  if (groups[0][1] === 2) return { rank: 1, name: HAND_NAMES['1'] }
  return { rank: 0, name: HAND_NAMES['0'] }
}

const AI_NAMES = ['佐藤さん', '鈴木さん', '田中さん']

function createGame() {
  const deck = shuffleDeck(createDeck())
  return { deck, player: [deck.pop()!, deck.pop()!], ai: AI_NAMES.map(() => [deck.pop()!, deck.pop()!]), community: [] as CardType[], phase: 'preflop' as 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' }
}

export default function PokerGame() {
  const [g, setG] = useState(createGame)
  const [message, setMessage] = useState('プリフロップ！')
  const [results, setResults] = useState<{ player: string; ai: string[]; winner: string } | null>(null)

  const next = () => {
    const d = [...g.deck], comm = [...g.community]
    if (g.phase === 'preflop') { comm.push(d.pop()!, d.pop()!, d.pop()!); setG({ ...g, deck: d, community: comm, phase: 'flop' }); setMessage('フロップ！') }
    else if (g.phase === 'flop') { d.pop(); comm.push(d.pop()!); setG({ ...g, deck: d, community: comm, phase: 'turn' }); setMessage('ターン！') }
    else if (g.phase === 'turn') { d.pop(); comm.push(d.pop()!); setG({ ...g, deck: d, community: comm, phase: 'river' }); setMessage('リバー！') }
    else showdown()
  }

  const fold = () => { setResults({ player: '', ai: [], winner: 'あなたはフォールドしました' }); setMessage('フォールド') }

  const showdown = () => {
    const pHand = evaluateHand([...g.player, ...g.community])
    const aHands = g.ai.map(ai => evaluateHand([...ai, ...g.community]))
    let bestR = -1, bestI = -1
    ;[pHand, ...aHands].forEach((h, i) => { if (h.rank > bestR) { bestR = h.rank; bestI = i } })
    const winner = bestI === 0 ? 'あなた' : AI_NAMES[bestI - 1]
    setResults({ player: pHand.name, ai: aHands.map(h => h.name), winner })
    setMessage(bestI === 0 ? `あなたの勝ち！ ${pHand.name}` : `${AI_NAMES[bestI - 1]}の勝ち！ ${aHands[bestI - 1].name}`)
    setG({ ...g, phase: 'showdown' })
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-4"><span className="text-2xl">♠️</span><h1 className="text-xl font-bold text-white">テキサスホールデム</h1></div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="flex justify-center gap-2 mb-3">
          {g.ai.map((hand, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5"><CardFace card={{ ...hand[0], hidden: g.phase !== 'showdown' }} size="sm" /><CardFace card={{ ...hand[1], hidden: g.phase !== 'showdown' }} size="sm" /></div>
              <span className="text-[10px] text-white/60">{AI_NAMES[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mb-3 min-h-[50px]">{g.phase === 'preflop' ? <span className="text-xs text-white/40">プリフロップ</span> : g.community.map((c, i) => <CardFace key={i} card={c} />)}</div>
        <div className="flex justify-center gap-1.5">{g.player.map((c, i) => <CardFace key={i} card={c} />)}</div>
        {results && (
          <div className="mt-3 space-y-1 text-center text-xs">
            <div className="text-emerald-400 font-bold">あなた: {results.player}</div>
            {results.ai.map((h, i) => <div key={i} className="text-casino-muted">{AI_NAMES[i]}: {h}</div>)}
            <div className={`text-sm font-bold mt-1 ${results.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400'}`}>{results.winner}</div>
          </div>
        )}
      </div>
      <div className={`mt-3 text-center text-sm font-bold ${results ? (results.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400') : 'text-casino-gold'}`}>{message}</div>
      <div className="flex gap-3 mt-4 justify-center">
        {!results ? (
          <>
            <button onClick={next} className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">{g.phase === 'river' ? 'ショーダウン' : '次へ'}</button>
            <button onClick={fold} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">フォールド</button>
          </>
        ) : (
          <button onClick={() => { setG(createGame()); setResults(null); setMessage('プリフロップ！') }} className="px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm">もう一度</button>
        )}
      </div>
    </div>
  )
}

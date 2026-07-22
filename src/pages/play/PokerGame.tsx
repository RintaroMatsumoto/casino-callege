import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { RotateCcw } from 'lucide-react'

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

const AI = ['佐藤', '鈴木', '田中']
let injected = false

function newGame() { const d = shuffleDeck(createDeck()); return { deck: d, player: [d.pop()!, d.pop()!], ai: AI.map(() => [d.pop()!, d.pop()!]), community: [] as CardType[], phase: 'preflop' as 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' } }

export default function PokerGame() {
  useEffect(() => {
    if (injected) return; injected = true
    const s = document.createElement('style')
    s.textContent = `@keyframes cardDeal { 0% { transform: translateX(60px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }
@keyframes burnAnim { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`
    document.head.appendChild(s)
  }, [])

  const [g, setG] = useState(newGame)
  const [msg, setMsg] = useState('プリフロップ！ 次へ')
  const [result, setResult] = useState<{ myHand: string; aiHands: string[]; winner: string; winnerHand: string } | null>(null)
  const [showCards, setShowCards] = useState(false)

  const next = () => {
    const d = [...g.deck], c = [...g.community]
      if (g.phase === 'preflop') { d.pop(); c.push(d.pop()!, d.pop()!, d.pop()!); setG({ ...g, deck: d, community: c, phase: 'flop' }); setMsg('フロップ！'); setShowCards(false); setTimeout(() => setShowCards(true), 50) }
    else if (g.phase === 'flop') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'turn' }); setMsg('ターン！'); setShowCards(false); setTimeout(() => setShowCards(true), 50) }
    else if (g.phase === 'turn') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'river' }); setMsg('リバー！'); setShowCards(false); setTimeout(() => setShowCards(true), 50) }
    else showdown()
  }

  const fold = () => { setResult({ myHand: '', aiHands: [], winner: 'あなた', winnerHand: 'フォールド' }); setMsg('フォールド') }

  const showdown = () => {
    const my = evaluate([...g.player, ...g.community]), aiE = g.ai.map(ai => evaluate([...ai, ...g.community]))
    let best = -1, idx = -1; [my, ...aiE].forEach((h, i) => { if (h.rank > best) { best = h.rank; idx = i } })
    const w = idx === 0 ? 'あなた' : AI[idx - 1]
    setResult({ myHand: my.name, aiHands: aiE.map(h => h.name), winner: w, winnerHand: [my, ...aiE][idx].name })
    setMsg(idx === 0 ? `勝ち！ ${my.name}` : `${AI[idx - 1]}の勝ち！`)
    setG({ ...g, phase: 'showdown' })
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 mb-2"><span className="text-xl">♠️</span><h1 className="text-base font-bold text-white">テキサスホールデム</h1></div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 14, border: '4px solid #3d2b1f', height: 360, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 50, right: 8, width: 28, height: 40, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 3px, #4a3020 3px, #4a3020 6px)', border: '1px solid #3d2b1f', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 6, color: '#c4a882' }}>D</span></div>
        <div className="flex justify-center gap-1" style={{ marginTop: 4 }}>
          {g.ai.map((hand, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="flex gap-0.5"><PCard card={hand[0]} hidden={g.phase !== 'showdown'} sz={32} /><PCard card={hand[1]} hidden={g.phase !== 'showdown'} sz={32} /></div>
              <span className="text-[8px] text-white/60">{AI[i]}</span>
              {g.phase === 'showdown' && result && <span className="text-[7px] text-casino-muted">{result.aiHands[i]}</span>}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-1" style={{ marginTop: 16, minHeight: 46, position: 'relative' }}>
          {g.phase !== 'preflop' && <div style={{ width: 22, height: 32, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 3px, #334155 3px, #334155 6px)', border: '1px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5, color: '#64748b' }}>B</div>}
          {g.phase === 'preflop' ? <span className="text-xs text-white/40">プリフロップ</span> : g.community.map((c, i) => <div key={i} style={{ animation: showCards ? `cardDeal 0.3s ease-out ${i * 0.1}s both` : 'none' }}><PCard card={c} hidden={false} sz={36} /></div>)}
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 40, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[8px] text-white/20">POT</span></div>
        <div className="flex justify-center gap-1" style={{ marginTop: 16 }}>{g.player.map((c, i) => <div key={i} style={{ animation: 'cardDeal 0.3s ease-out both' }}><PCard card={c} hidden={false} sz={38} /></div>)}</div>
        {result && <div className="mt-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}><div className="text-center text-xs text-casino-muted"><span className={result.winner === 'あなた' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{result.winner}</span>の勝ち{result.winnerHand && <span>（{result.winnerHand}）</span>}</div></div>}
      </div>
      <div className={`mt-2 text-center text-xs font-bold ${result ? (result.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400') : 'text-casino-gold'}`}>{msg}</div>
      <div className="flex gap-2 mt-3 justify-center">
        {!result ? <>
          <button onClick={next} className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">{g.phase === 'river' ? 'ショーダウン' : '次へ'}</button>
          <button onClick={fold} className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs">フォールド</button>
        </> : <button onClick={() => { setG(newGame()); setResult(null); setMsg('プリフロップ！ 次へ'); setShowCards(false) }} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold text-xs font-bold"><RotateCcw size={12} /> もう一度</button>}
      </div>
    </div>
  )
}

function PCard({ card, hidden, sz = 36 }: { card: CardType; hidden: boolean; sz?: number }) {
  const color = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  if (hidden) return <div style={{ width: sz, height: sz * 1.4, borderRadius: 3, background: 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 3px, #334155 3px, #334155 6px)', border: '1px solid #475569' }} />
  return <div style={{ width: sz, height: sz * 1.4, borderRadius: 3, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'cardDeal 0.3s ease-out' }}>
    <span style={{ position: 'absolute', top: 2, left: 2, fontSize: sz * 0.25, fontWeight: 700, lineHeight: 1, color }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 2 + sz * 0.25, left: 2, fontSize: sz * 0.18, lineHeight: 1, color }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: sz * 0.45, lineHeight: 1, color }}>{card.suit}</span>
  </div>
}

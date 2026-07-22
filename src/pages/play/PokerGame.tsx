import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const HAND_NAMES: Record<string, string> = {
  '9': 'ロイヤルフラッシュ', '8': 'ストレートフラッシュ', '7': 'フォーカード',
  '6': 'フルハウス', '5': 'フラッシュ', '4': 'ストレート',
  '3': 'スリーカード', '2': 'ツーペア', '1': 'ワンペア', '0': 'ハイカード',
}
const HAND_EXPLAIN: Record<string, string> = {
  '9': '同スートA-K-Q-J-10、最強！', '8': '同スート5連続数字', '7': '同じ数字4枚', '6': 'スリーカード+ワンペア',
  '5': '同スート5枚', '4': '5連続数字', '3': '同じ数字3枚', '2': 'ペア×2', '1': 'ペア×1', '0': '役なし、一番高いカード勝負',
}

function rv(r: string) { return r === 'A' ? 14 : r === 'K' ? 13 : r === 'Q' ? 12 : r === 'J' ? 11 : r === '10' ? 10 : parseInt(r) }

function evaluate(cards: CardType[]) {
  let best = { rank: -1, name: '' }
  for (let a = 0; a < cards.length; a++) for (let b = a + 1; b < cards.length; b++) for (let c = b + 1; c < cards.length; c++) for (let d = c + 1; d < cards.length; d++) for (let e = d + 1; e < cards.length; e++) {
    const hand = [cards[a], cards[b], cards[c], cards[d], cards[e]]
    const vals = hand.map(x => rv(x.rank)).sort((x, y) => y - x), suits = hand.map(x => x.suit)
    const flush = suits.every(x => x === suits[0])
    const straight = (() => { if (vals[0] === 14 && vals[1] === 5 && vals[2] === 4 && vals[3] === 3 && vals[4] === 2) return 5; for (let i = 0; i < 4; i++) if (vals[i] - vals[i + 1] !== 1) return 0; return vals[0] })()
    const m = new Map<number, number>(); vals.forEach(x => m.set(x, (m.get(x) || 0) + 1))
    const g = [...m.entries()].sort((x, y) => y[1] - x[1] || y[0] - x[0])
    let rank = 0
    if (straight === 14 && flush) rank = 9; else if (flush && straight) rank = 8; else if (g[0][1] === 4) rank = 7
    else if (g[0][1] === 3 && g[1]?.[1] === 2) rank = 6; else if (flush) rank = 5; else if (straight) rank = 4
    else if (g[0][1] === 3) rank = 3; else if (g[0][1] === 2 && g[1]?.[1] === 2) rank = 2; else if (g[0][1] === 2) rank = 1
    if (rank > best.rank) best = { rank, name: HAND_NAMES[String(rank)] }
  }
  return best
}

const AI = ['佐藤', '鈴木', '田中']
let injected = false

function newGame() {
  const d = shuffleDeck(createDeck())
  return { deck: d, player: [d.pop()!, d.pop()!], ai: AI.map(() => [d.pop()!, d.pop()!]), community: [] as CardType[], phase: 'preflop' as 'preflop' | 'flop' | 'turn' | 'river' | 'showdown', pot: 0 }
}

export default function PokerGame() {
  useEffect(() => { if (!injected) { injected = true; const s = document.createElement('style'); s.textContent = `@keyframes pCard { 0% { transform: translateX(50px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }`; document.head.appendChild(s) } }, [])

  const [g, setG] = useState(newGame)
  const [msg, setMsg] = useState('プリフロップ')
  const [res, setRes] = useState<{ my: string; ai: string[]; winner: string; wHand: string; wRank: number } | null>(null)
  const [show, setShow] = useState(false)
  const [balance, setBalance] = useState(INIT_BALANCE)
  const [stepIdx, setStepIdx] = useState(0)

  const STEPS = ['プリフロップ', 'フロップ', 'ターン', 'リバー', '結果']

  const next = () => {
    const d = [...g.deck], c = [...g.community]
    if (g.phase === 'preflop') { d.pop(); c.push(d.pop()!, d.pop()!, d.pop()!); setG({ ...g, deck: d, community: c, phase: 'flop', pot: g.pot + 20 }); setStepIdx(1); setMsg('フロップ！'); setShow(false); setTimeout(() => setShow(true), 50) }
    else if (g.phase === 'flop') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'turn', pot: g.pot + 20 }); setStepIdx(2); setMsg('ターン！'); setShow(false); setTimeout(() => setShow(true), 50) }
    else if (g.phase === 'turn') { d.pop(); c.push(d.pop()!); setG({ ...g, deck: d, community: c, phase: 'river', pot: g.pot + 20 }); setStepIdx(3); setMsg('リバー！'); setShow(false); setTimeout(() => setShow(true), 50) }
    else showdown()
  }

  const fold = () => { setRes({ my: '', ai: [], winner: 'あなた', wHand: 'フォールド', wRank: -1 }); setMsg('フォールド'); setStepIdx(4) }

  const showdown = () => {
    const my = evaluate([...g.player, ...g.community]), aiE = g.ai.map(ai => evaluate([...ai, ...g.community]))
    let best = -1, idx = -1; [my, ...aiE].forEach((h, i) => { if (h.rank > best) { best = h.rank; idx = i } })
    const w = idx === 0 ? 'あなた' : AI[idx - 1]
    setRes({ my: my.name, ai: aiE.map(h => h.name), winner: w, wHand: [my, ...aiE][idx].name, wRank: [my, ...aiE][idx].rank })
    if (idx === 0) setBalance(b => b + g.pot)
    setMsg(idx === 0 ? '勝ち！ ' + my.name + '！' : AI[idx - 1] + 'の勝ち！')
    setG({ ...g, phase: 'showdown' }); setStepIdx(4)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-2"><span className="text-2xl">♠️</span><h1 className="text-lg font-bold text-white">テキサスホールデム</h1></div>
      <div className="flex items-center justify-between mb-1"><div className="text-base font-bold text-white">${balance.toLocaleString()}</div><div className="text-sm text-casino-gold font-bold">POT: ${g.pot}</div></div>
      <PhaseBadge steps={STEPS} current={stepIdx} />
      {g.phase === 'preflop' && !res && <TipBox text="手持ち2枚+場の5枚で最強の5枚の役を作る。役の強さ: ロイヤルフラッシュ>ストレートフラッシュ>フォーカード>...>ハイカード。" />}

      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 14, border: '4px solid #3d2b1f', height: 380, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: 60, height: 40, borderRadius: 20, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px' }}>
          <span className="text-xs font-bold text-casino-gold">${g.pot}</span>
        </div>
        <div className="flex justify-center gap-2" style={{ marginTop: 2 }}>
          {g.ai.map((hand, i) => <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex gap-1"><PCard card={hand[0]} hidden={g.phase !== 'showdown'} sz={36} /><PCard card={hand[1]} hidden={g.phase !== 'showdown'} sz={36} /></div>
            <span className="text-[8px] text-white/60">{AI[i]}</span>
            {g.phase === 'showdown' && res && <span className="text-[8px] text-casino-muted">{res.ai[i]}</span>}
          </div>)}
        </div>
        <div className="flex justify-center items-center gap-1.5" style={{ marginTop: 16, minHeight: 50 }}>
          {g.phase !== 'preflop' && <div style={{ width: 24, height: 34, borderRadius: 2, background: 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 3px, #334155 3px, #334155 6px)', border: '1px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, color: '#64748b' }}>B</div>}
          {g.phase === 'preflop' ? <span className="text-sm text-white/40">プリフロップ</span> : g.community.map((c, i) => <div key={i} style={{ animation: show ? 'pCard 0.3s ease-out ' + i * 0.1 + 's both' : 'none' }}><PCard card={c} hidden={false} sz={40} /></div>)}
        </div>
        <div className="flex justify-center gap-1.5" style={{ marginTop: 18 }}>{g.player.map((c, i) => <div key={i} style={{ animation: 'pCard 0.3s ease-out both' }}><PCard card={c} hidden={false} sz={44} /></div>)}</div>
        {res && <div className="mt-2 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="text-center text-sm text-casino-muted">
            <span className={res.winner === 'あなた' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{res.winner}</span>の勝ち
            {res.wHand && <span>（{res.wHand}）</span>}
            <div className="text-xs text-casino-muted mt-1">{res.wRank >= 0 ? HAND_EXPLAIN[String(res.wRank)] : ''}</div>
            {res.winner === 'あなた' && <div className="text-emerald-400 font-bold text-sm mt-1">+${g.pot}</div>}
          </div>
        </div>}
      </div>
      <div className={'mt-2 text-center text-sm font-bold ' + (res ? (res.winner === 'あなた' ? 'text-emerald-400' : 'text-red-400') : 'text-casino-gold')}>{msg}</div>
      <div className="flex gap-3 mt-3 justify-center">
        {!res ? <><button onClick={next} className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">{g.phase === 'river' ? 'ショーダウン！' : '次へ'}</button><button onClick={fold} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">フォールド</button></>
          : <button onClick={() => { setG(newGame()); setRes(null); setMsg('プリフロップ'); setShow(false); setStepIdx(0) }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-sm"><RotateCcw size={16} /> もう一度</button>}
      </div>
      {g.phase === 'showdown' && res && res.wRank >= 0 && <TipBox text={HAND_EXPLAIN[String(res.wRank)]} />}
    </div>
  )
}

function PCard({ card, hidden, sz = 40 }: { card: CardType; hidden: boolean; sz?: number }) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  if (hidden) return <div style={{ width: sz, height: sz * 1.4, borderRadius: 4, background: 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 3px, #334155 3px, #334155 6px)', border: '1px solid #475569' }} />
  return <div style={{ width: sz, height: sz * 1.4, borderRadius: 4, background: '#f8fafc', border: '1px solid #94a3b8', position: 'relative', animation: 'pCard 0.3s ease-out', boxShadow: '0 3px 8px rgba(0,0,0,0.25)' }}>
    <span style={{ position: 'absolute', top: 2, left: 3, fontSize: sz * 0.28, fontWeight: 700, lineHeight: 1, color: c }}>{card.rank}</span>
    <span style={{ position: 'absolute', top: 2 + sz * 0.28 + 1, left: 3, fontSize: sz * 0.2, lineHeight: 1, color: c }}>{card.suit}</span>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: sz * 0.5, lineHeight: 1, color: c }}>{card.suit}</span>
  </div>
}

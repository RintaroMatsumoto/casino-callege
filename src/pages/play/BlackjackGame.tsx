import { useState } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue, handString } from '../../games/types'
import { CardFace, ChipDisplay } from '../../games/Card'
import { RotateCcw, Lightbulb } from 'lucide-react'

type GameState = {
  deck: Card[]
  player: Card[]
  dealer: Card[]
  bet: number
  balance: number
  action: 'play' | 'result'
  message: string
  result: 'win' | 'lose' | 'push' | 'bj' | null
  canDouble: boolean
}

function initState(): GameState {
  const d = shuffleDeck(createDeck())
  return {
    deck: d.slice(4), player: [d[0], d[2]], dealer: [d[1], { ...d[3], hidden: true }],
    bet: 10, balance: 1000, action: 'play',
    message: 'アクションを選んでください', result: null, canDouble: true,
  }
}

function dealerDraw(deck: Card[], hand: Card[]): Card[] {
  let h: Card[] = hand.map(c => ({ ...c, hidden: false }))
  let d = [...deck]
  while (true) {
    const v = handValue(h)
    const score = v.soft <= 21 ? v.soft : v.hard
    if (score >= 17) break
    h.push(d[0]); d = d.slice(1)
  }
  return h
}

function payoutCalc(player: Card[], dealer: Card[], bet: number) {
  const pv = handValue(player), dv = handValue(dealer.map(c => ({ ...c, hidden: false })))
  const pScore = pv.soft <= 21 ? pv.soft : pv.hard, dScore = dv.soft <= 21 ? dv.soft : dv.hard
  const pBJ = player.length === 2 && pScore === 21, dBJ = dealer.length === 2 && dScore === 21
  if (pBJ && dBJ) return { result: 'push' as const, amount: bet }
  if (pBJ) return { result: 'bj' as const, amount: Math.floor(bet * 2.5) }
  if (dBJ) return { result: 'lose' as const, amount: 0 }
  if (pScore > 21) return { result: 'lose' as const, amount: 0 }
  if (dScore > 21) return { result: 'win' as const, amount: bet * 2 }
  if (pScore > dScore) return { result: 'win' as const, amount: bet * 2 }
  if (pScore === dScore) return { result: 'push' as const, amount: bet }
  return { result: 'lose' as const, amount: 0 }
}

export default function BlackjackGame() {
  const [g, setG] = useState<GameState>(initState)
  const [showHint, setShowHint] = useState(false)

  const hit = () => {
    if (g.action !== 'play') return
    const newPlayer = [...g.player, g.deck[0]]
    const rest = g.deck.slice(1)
    const pv = handValue(newPlayer)
    const pScore = pv.soft <= 21 ? pv.soft : pv.hard
    if (pScore > 21) {
      setG({ ...g, player: newPlayer, deck: rest, action: 'result', message: 'バースト！ ディーラーの勝ち', result: 'lose', canDouble: false })
    } else {
      setG({ ...g, player: newPlayer, deck: rest, message: `現在 ${pScore}`, canDouble: false })
    }
  }

  const stand = () => {
    if (g.action !== 'play') return
    const dealerFinal = dealerDraw(g.deck, g.dealer)
    const { result, amount } = payoutCalc(g.player, dealerFinal, g.bet)
    const msgs: Record<string, string> = { win: 'プレイヤーの勝ち！', lose: 'ディーラーの勝ち', push: 'プッシュ（引き分け）', bj: 'ブラックジャック！' }
    setG({ ...g, dealer: dealerFinal, action: 'result', message: msgs[result!] || '', result, balance: g.balance + amount, canDouble: false })
  }

  const double = () => {
    if (g.action !== 'play' || !g.canDouble) return
    const newBet = g.bet * 2
    const newPlayer = [...g.player, g.deck[0]]
    const rest = g.deck.slice(1)
    const pv = handValue(newPlayer)
    const pScore = pv.soft <= 21 ? pv.soft : pv.hard
    if (pScore > 21) {
      setG({ ...g, player: newPlayer, deck: rest, bet: newBet, action: 'result', message: 'バースト！ ディーラーの勝ち', result: 'lose', canDouble: false })
    } else {
      const dealerFinal = dealerDraw(rest, g.dealer)
      const { result, amount } = payoutCalc(newPlayer, dealerFinal, newBet)
      const msgs: Record<string, string> = { win: 'ダブルダウン成功！', lose: 'ディーラーの勝ち', push: 'プッシュ', bj: 'ブラックジャック！' }
      setG({ ...g, player: newPlayer, dealer: dealerFinal, deck: rest, bet: newBet, action: 'result', message: msgs[result!] || '', result, balance: g.balance + amount, canDouble: false })
    }
  }

  const newGame = () => setG(initState())
  const pScore = (() => { const v = handValue(g.player); return v.soft <= 21 ? v.soft : v.hard })()

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3"><span className="text-2xl">🃏</span><h1 className="text-xl font-bold text-white">ブラックジャック</h1></div>
        <div className="flex items-center gap-2"><ChipDisplay value={g.balance} size={28} /><span className="text-sm font-bold text-white">${g.balance.toLocaleString()}</span></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: '20px 16px', border: '4px solid #3d2b1f', minHeight: 380 }}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-white/70">ディーラー</span>
            {g.action === 'result' && <span className="text-xs font-bold" style={{ color: handValue(g.dealer).soft > 21 ? '#ef4444' : '#f4a81d' }}>({handString(g.dealer)})</span>}
          </div>
          <div className="flex gap-1.5 flex-wrap min-h-[62px]">{g.dealer.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>
        <div className="flex justify-center mb-4">
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChipDisplay value={g.bet} size={22} /><span className="text-sm font-bold text-white">${g.bet}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-white/70">プレイヤー</span>
            <span className="text-xs font-bold" style={{ color: pScore > 21 ? '#ef4444' : '#f4a81d' }}>({pScore})</span>
          </div>
          <div className="flex gap-1.5 flex-wrap min-h-[62px]">{g.player.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>
        {g.action === 'result' && (
          <div className="mt-4 text-center">
            <div className={`text-lg font-bold ${g.result === 'win' || g.result === 'bj' ? 'text-emerald-400' : g.result === 'push' ? 'text-yellow-400' : 'text-red-400'}`}>{g.message}</div>
            {g.result === 'bj' && <div className="text-xs text-casino-gold mt-1">3:2 配当！ +${Math.floor(g.bet * 1.5)}</div>}
          </div>
        )}
      </div>
      {g.action === 'play' && (
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          <button onClick={hit} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">ヒット</button>
          <button onClick={stand} className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">スタンド</button>
          <button onClick={double} disabled={!g.canDouble} className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm disabled:opacity-30">ダブル</button>
          <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-casino-card border border-casino-border text-casino-muted hover:text-white text-sm"><Lightbulb size={14} /> ヒント</button>
        </div>
      )}
      {showHint && (
        <div className="mt-3 p-3 rounded-lg bg-casino-card border border-casino-gold/20 text-xs text-casino-muted leading-relaxed">
          <span className="text-casino-gold font-bold">基本戦略：</span>
          {pScore >= 17 ? '17以上はスタンド。' : pScore >= 13 && pScore <= 16 ? '13-16はディーラー7以上ならヒット、2-6ならスタンド。' : pScore === 12 ? '12はディーラー4-6ならスタンド、他はヒット。' : pScore === 11 ? '11はダブルダウン！' : pScore === 10 ? '10はディーラー9以下ならダブル。' : pScore === 9 ? '9はディーラー3-6ならダブル。' : '8以下はヒット。'}
        </div>
      )}
      {g.action === 'result' && (
        <div className="flex mt-4 justify-center">
          <button onClick={newGame} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm hover:bg-casino-gold/20"><RotateCcw size={14} /> もう一度</button>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { CardFace } from '../../games/Card'
import { RotateCcw } from 'lucide-react'

function handTotal(cards: CardType[]): number {
  let t = 0
  for (const c of cards) t += c.rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(c.rank) ? 10 : parseInt(c.rank)
  return t % 10
}

function dealGame() {
  const d = shuffleDeck(createDeck())
  const player = [d[0], d[2]], banker = [d[1], d[3]]
  let deck = d.slice(4)
  const pt = handTotal(player), bt = handTotal(banker)

  if (pt < 8 && bt < 8) {
    if (pt <= 5) { player.push(deck[0]); deck = deck.slice(1) }
    const pv = player.length === 3 ? (player[2].rank === 'A' ? 1 : ['K', 'Q', 'J'].includes(player[2].rank) ? 10 : parseInt(player[2].rank)) : 0
    const draw = bt <= 2 || (bt === 3 && pv !== 8) || (bt === 4 && pv >= 2 && pv <= 7) || (bt === 5 && pv >= 4 && pv <= 7) || (bt === 6 && (pv === 6 || pv === 7))
    if (draw) { banker.push(deck[0]) }
  }

  const pTotal = handTotal(player), bTotal = handTotal(banker)
  const result = pTotal > bTotal ? 'player' as const : bTotal > pTotal ? 'banker' as const : 'tie' as const
  return { player, banker, pTotal, bTotal, result }
}

export default function BaccaratGame() {
  const [g, setG] = useState(dealGame)
  const [balance, setBalance] = useState(1000)
  const [_betOn, setBetOn] = useState<'player' | 'banker' | null>(null)
  const [madeBet, setMadeBet] = useState(false)
  const [message, setMessage] = useState('賭ける場所を選んでください')
  const [messageType, setMessageType] = useState<'win' | 'lose' | 'info'>('info')

  const placeBet = (on: 'player' | 'banker') => {
    setBetOn(on)
    setBalance(b => b - 10)
    setMadeBet(true)
    const game = dealGame()
    setG(game)
    if (game.result === 'tie') { setBalance(b => b + 10); setMessage('タイ！ 賭け金返却'); setMessageType('info') }
    else if (on === game.result) {
      const payout = on === 'banker' ? 19 : 20
      setBalance(b => b + payout)
      setMessage(`${on === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち！ +$${payout - 10}`)
      setMessageType('win')
    } else {
      setMessage(`${game.result === 'player' ? 'プレイヤー' : 'バンカー'}の勝ち... あなたは${on === 'player' ? 'プレイヤー' : 'バンカー'}にベット`)
      setMessageType('lose')
    }
  }

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3"><span className="text-2xl">💎</span><h1 className="text-xl font-bold text-white">バカラ</h1></div>
        <div className="flex items-center gap-2"><span className="text-sm font-bold text-white">${balance.toLocaleString()}</span></div>
      </div>
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5"><span className="text-xs font-bold text-cyan-400">バンカー</span>{madeBet && <span className="text-lg font-bold" style={{ color: g.result === 'banker' ? '#22c55e' : '#94a3b8' }}>{g.bTotal}</span>}</div>
          <div className="flex gap-1.5 min-h-[62px]">{g.banker.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>
        {madeBet && (
          <div className="flex justify-center my-3">
            <div style={{ background: `${g.result === 'banker' ? '#0d948822' : g.result === 'player' ? '#dc262622' : '#6b728022'}`, border: `1px solid ${g.result === 'banker' ? '#0d9488' : g.result === 'player' ? '#dc2626' : '#6b7280'}`, borderRadius: 20, padding: '4px 18px' }}>
              <span className={`text-sm font-bold ${g.result === 'banker' ? 'text-cyan-400' : g.result === 'player' ? 'text-red-400' : 'text-gray-400'}`}>{g.result === 'player' ? 'プレイヤー' : g.result === 'banker' ? 'バンカー' : 'タイ'} の勝ち</span>
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-1.5"><span className="text-xs font-bold text-red-400">プレイヤー</span>{madeBet && <span className="text-lg font-bold" style={{ color: g.result === 'player' ? '#22c55e' : '#94a3b8' }}>{g.pTotal}</span>}</div>
          <div className="flex gap-1.5 min-h-[62px]">{g.player.map((c, i) => <CardFace key={i} card={c} />)}</div>
        </div>
      </div>
      {message && <div className={`mt-3 text-center text-sm font-bold ${messageType === 'win' ? 'text-emerald-400' : messageType === 'lose' ? 'text-red-400' : 'text-casino-gold'}`}>{message}</div>}
      <div className="flex gap-3 mt-4 justify-center">
        {!madeBet ? (
          <>
            <button onClick={() => placeBet('player')} className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">プレイヤーに $10</button>
            <button onClick={() => placeBet('banker')} className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm">バンカーに $10</button>
          </>
        ) : (
          <button onClick={() => { setMadeBet(false); setBetOn(null); setMessage('賭ける場所を選んでください'); setMessageType('info'); setG(dealGame()) }} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm"><RotateCcw size={14} /> もう一度</button>
        )}
      </div>
    </div>
  )
}

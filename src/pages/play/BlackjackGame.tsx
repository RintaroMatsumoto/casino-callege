import { useState, useCallback } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'
import { CardFace } from '../../games/Card'
import { RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react'

type RoundResult = {
  playerCards: Card[]; dealerCards: Card[]; playerScore: number; dealerScore: number
  bet: number; payout: number; net: number; result: 'win' | 'lose' | 'push' | 'bj'
  playerBJ: boolean; dealerBJ: boolean; bust: boolean
}

function initDeck() { const d = shuffleDeck(createDeck()); return d }

function dealerPlay(deck: Card[], hand: Card[]): Card[] {
  let h: Card[] = hand.map(c => ({ ...c, hidden: false })), d = [...deck]
  while (true) {
    const v = handValue(h), s = v.soft <= 21 ? v.soft : v.hard
    if (s >= 17) break
    h.push(d[0]); d = d.slice(1)
  }
  return h
}

function calcResult(player: Card[], dealer: Card[], bet: number): RoundResult {
  const pv = handValue(player), dv = handValue(dealer.map(c => ({ ...c, hidden: false })))
  const pScore = pv.soft <= 21 ? pv.soft : pv.hard, dScore = dv.soft <= 21 ? dv.soft : dv.hard
  const pBJ = player.length === 2 && pScore === 21, dBJ = dealer.length === 2 && dScore === 21
  const bust = pScore > 21

  if (pBJ && dBJ) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: bet, net: 0, result: 'push', playerBJ: true, dealerBJ: true, bust: false }
  if (pBJ) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: Math.floor(bet * 2.5), net: Math.floor(bet * 1.5), result: 'bj', playerBJ: true, dealerBJ: false, bust: false }
  if (dBJ || bust) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: 0, net: -bet, result: 'lose', playerBJ: false, dealerBJ: dBJ, bust }
  if (dScore > 21) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: bet * 2, net: bet, result: 'win', playerBJ: false, dealerBJ: false, bust: false }
  if (pScore > dScore) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: bet * 2, net: bet, result: 'win', playerBJ: false, dealerBJ: false, bust: false }
  if (pScore === dScore) return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: bet, net: 0, result: 'push', playerBJ: false, dealerBJ: false, bust: false }
  return { playerCards: player, dealerCards: dealer, playerScore: pScore, dealerScore: dScore, bet, payout: 0, net: -bet, result: 'lose', playerBJ: false, dealerBJ: false, bust: false }
}

function chipCount(balance: number): Record<number, number> {
  const vals = [500, 100, 25, 5, 1], chips: Record<number, number> = {}
  let remaining = Math.max(0, balance)
  for (const v of vals) { chips[v] = Math.floor(remaining / v); remaining %= v }
  return chips
}

export default function BlackjackGame() {
  const [deck, setDeck] = useState(initDeck)
  const [player, setPlayer] = useState<Card[]>([])
  const [dealer, setDealer] = useState<Card[]>([])
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [phase, setPhase] = useState<'bet' | 'play' | 'result'>('bet')
  const [message, setMessage] = useState('ベット額を選んでから「ディール」')
  const [lastResult, setLastResult] = useState<RoundResult | null>(null)
  const [dealt, setDealt] = useState(false)

  const deal = useCallback(() => {
    if (bet > balance || bet <= 0) return
    const d = shuffleDeck(createDeck())
    const p = [d[0], d[2]]
    const dl = [d[1], { ...d[3], hidden: true }]
    setDeck(d.slice(4))
    setPlayer(p)
    setDealer(dl)
    setBalance(b => b - bet)
    setDealt(false)
    setLastResult(null)
    setTimeout(() => setDealt(true), 50)
    setPhase('play')
    setMessage('アクションを選んでください')
  }, [bet, balance])

  const hit = () => {
    if (phase !== 'play') return
    const newPlayer = [...player, deck[0]]
    setPlayer(newPlayer)
    setDeck(d => d.slice(1))
    const v = handValue(newPlayer), s = v.soft <= 21 ? v.soft : v.hard
    if (s > 21) {
      const finalDealer = dealerPlay(deck.slice(1), dealer)
      setDealer(finalDealer)
      const r = calcResult(newPlayer, finalDealer, bet)
      setLastResult(r)
      setPhase('result')
      setMessage('バースト！ ディーラーの勝ち')
    } else {
      setMessage(`現在 ${s}`)
    }
  }

  const stand = () => {
    if (phase !== 'play') return
    const finalDealer = dealerPlay(deck, dealer)
    setDealer(finalDealer)
    const r = calcResult(player, finalDealer, bet)
    setLastResult(r)
    setBalance(b => b + r.payout)
    setPhase('result')
    const msgs: Record<string, string> = { win: 'プレイヤーの勝ち！', lose: 'ディーラーの勝ち', push: 'プッシュ（引き分け）', bj: 'ブラックジャック！' }
    setMessage(msgs[r.result])
  }

  const pv = handValue(player), pScore = pv.soft <= 21 ? pv.soft : pv.hard
  const chips = chipCount(balance)

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      {/* Bankroll Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🃏</span>
          <h1 className="text-lg font-bold text-white">ブラックジャック</h1>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${balance.toLocaleString()}</div>
          <div className="text-[10px] text-casino-muted">
            {Object.entries(chips).filter(([, c]) => c > 0).map(([v, c]) => `${v}×${c}`).join(' ')}
          </div>
        </div>
      </div>

      {/* Chip selector (bet phase) */}
      {phase === 'bet' && (
        <div className="bg-casino-card rounded-xl p-4 border border-casino-border mb-3">
          <div className="text-xs text-casino-muted mb-2">ベット額を選ぶ</div>
          <div className="flex gap-2 items-center">
            {[5, 10, 25, 50, 100].map(v => (
              <button key={v} onClick={() => { if (v <= balance) setBet(v) }}
                className={`w-10 h-10 rounded-full text-xs font-bold border-2 transition-all ${bet === v ? 'border-casino-gold scale-110' : 'border-transparent opacity-60'}`}
                style={{ background: v === 5 ? '#dc2626' : v === 10 ? '#f8fafc' : v === 25 ? '#22c55e' : v === 50 ? '#f97316' : '#1e293b', color: v === 10 ? '#1e293b' : '#fff' }}>
                {v}
              </button>
            ))}
            <span className="text-sm font-bold text-white ml-2">× <span className="text-casino-gold">${bet}</span></span>
          </div>
          <button onClick={deal} disabled={bet > balance || bet <= 0}
            className="mt-3 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm disabled:opacity-30">
            ディール！
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 16, padding: 20, border: '4px solid #3d2b1f' }}>
        {/* Dealer */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-white/70">ディーラー</span>
            {lastResult && <span className={`text-xs font-bold ${lastResult.dealerScore > 21 ? 'text-red-400' : 'text-casino-gold'}`}>({lastResult.dealerScore})</span>}
          </div>
          <div className="flex gap-1.5 flex-wrap min-h-[62px]">
            {dealer.map((c, i) => (
              <div key={i} style={{ transition: 'all 0.3s ease', transform: dealt ? 'translateY(0)' : 'translateY(-20px)', opacity: dealt ? 1 : 0, transitionDelay: `${i * 0.15}s` }}>
                <CardFace card={c} />
              </div>
            ))}
          </div>
        </div>

        {/* Bet chip */}
        <div className="flex justify-center mb-4">
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 10, padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="text-[10px] text-white/70">BET</span>
            <span className="text-sm font-bold text-casino-gold">${bet}</span>
          </div>
        </div>

        {/* Player */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-white/70">プレイヤー</span>
            {player.length > 0 && <span className={`text-xs font-bold ${pScore > 21 ? 'text-red-400' : 'text-casino-gold'}`}>({pScore})</span>}
          </div>
          <div className="flex gap-1.5 flex-wrap min-h-[62px]">
            {player.map((c, i) => (
              <div key={i} style={{ transition: 'all 0.3s ease', transform: dealt ? 'translateY(0)' : 'translateY(-20px)', opacity: dealt ? 1 : 0, transitionDelay: `${(i + 2) * 0.15}s` }}>
                <CardFace card={c} />
              </div>
            ))}
          </div>
        </div>

        {/* Result Panel */}
        {lastResult && (
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {lastResult.result === 'win' && <TrendingUp size={16} className="text-emerald-400" />}
              {lastResult.result === 'lose' && <TrendingDown size={16} className="text-red-400" />}
              {lastResult.result === 'push' && <Minus size={16} className="text-yellow-400" />}
              {lastResult.result === 'bj' && <TrendingUp size={16} className="text-emerald-400" />}
              <span className={`text-sm font-bold ${lastResult.result === 'win' || lastResult.result === 'bj' ? 'text-emerald-400' : lastResult.result === 'push' ? 'text-yellow-400' : 'text-red-400'}`}>
                {lastResult.bust ? 'バースト' : lastResult.result === 'bj' ? 'ブラックジャック！' : lastResult.result === 'win' ? 'WIN' : lastResult.result === 'lose' ? 'LOSE' : 'PUSH'}
              </span>
            </div>
            <div className="text-xs text-casino-muted text-center space-y-0.5">
              {lastResult.playerBJ && lastResult.dealerBJ && <div>両者ブラックジャック！ 賭け金返却</div>}
              {lastResult.playerBJ && !lastResult.dealerBJ && <div>BJ！ 3:2配当 +${Math.floor(lastResult.bet * 1.5)}</div>}
              {lastResult.dealerBJ && !lastResult.playerBJ && <div>ディーラーがブラックジャック...</div>}
              {lastResult.bust && <div>${lastResult.bet} 失う</div>}
              {!lastResult.bust && !lastResult.playerBJ && !lastResult.dealerBJ && lastResult.result === 'win' && <div>${lastResult.bet} → ${lastResult.payout}（+${lastResult.net}）</div>}
              {!lastResult.bust && !lastResult.playerBJ && !lastResult.dealerBJ && lastResult.result === 'lose' && <div>${lastResult.bet} 失う</div>}
              {lastResult.result === 'push' && <div>賭け金 ${lastResult.bet} 返却</div>}
            </div>
          </div>
        )}
      </div>

      {message && <div className={`mt-3 text-center text-sm font-bold ${lastResult ? (lastResult.result === 'win' || lastResult.result === 'bj' ? 'text-emerald-400' : lastResult.result === 'push' ? 'text-yellow-400' : 'text-red-400') : 'text-casino-gold'}`}>{message}</div>}

      {/* Actions */}
      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        {phase === 'play' && (
          <>
            <button onClick={hit} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">ヒット</button>
            <button onClick={stand} className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm">スタンド</button>
          </>
        )}
        {phase === 'result' && (
          <button onClick={() => { setPhase('bet'); setPlayer([]); setDealer([]); setDealt(false); setMessage('ベット額を選んでから「ディール」') }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold text-sm">
            <RotateCcw size={14} /> もう一度
          </button>
        )}
      </div>
    </div>
  )
}

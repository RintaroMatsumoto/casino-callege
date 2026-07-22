import { useNavigate, useParams } from 'react-router-dom'
import BlackjackGame from './BlackjackGame'
import RouletteGame from './RouletteGame'
import CrapsGame from './CrapsGame'
import PokerGame from './PokerGame'
import BaccaratGame from './BaccaratGame'

const GAMES: Record<string, { component: () => JSX.Element }> = {
  blackjack: { component: BlackjackGame },
  roulette: { component: RouletteGame },
  craps: { component: CrapsGame },
  poker: { component: PokerGame },
  baccarat: { component: BaccaratGame },
}

export default function PlayGame() {
  const navigate = useNavigate()
  const { gameId } = useParams<{ gameId: string }>()

  if (!gameId || !GAMES[gameId]) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">ゲームが見つかりません</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">ダッシュボード</button>
      </div>
    )
  }

  const GameComponent = GAMES[gameId].component

  return (
    <div>
      <button onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-xs text-casino-muted hover:text-white mb-4 transition-colors">
        ← ダッシュボードに戻る
      </button>
      <GameComponent />
    </div>
  )
}

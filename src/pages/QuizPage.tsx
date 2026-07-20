import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Trophy } from 'lucide-react'

const QUESTIONS = [
  { id: 1, phase: 0, q: 'トランプ1組（デッキ）は何枚？', options: ['48枚', '52枚', '54枚', '50枚'], answer: 1, explain: 'ジョーカーを含まない標準デッキは52枚です。' },
  { id: 2, phase: 0, q: '$25グリーンチップ2枚 + $5レッドチップ3枚の合計は？', options: ['$55', '$65', '$70', '$60'], answer: 1, explain: '$25×2=$50 + $5×3=$15 = $65' },
  { id: 3, phase: 0, q: '「ハウスエッジ」の正しい説明は？', options: ['カジノの総収益', '各ベットに対するカジノの数学的優位性(%)', 'プレイヤーの勝率', 'テーブルの最低賭け額'], answer: 1, explain: 'ハウスエッジは各ベットに対するカジノの優位性を%で表したものです。' },
  { id: 4, phase: 1, q: 'ブラックジャックで21を超えることを何という？', options: ['プッシュ', 'バースト', 'スプリット', 'ナチュラル'], answer: 1, explain: '21を超えることを「バースト」といい、自動的に負けになります。' },
  { id: 5, phase: 1, q: 'BJの3:2ペイアウトで$10ベットがBJ。獲得額は？', options: ['$10', '$15', '$25', '$20'], answer: 2, explain: '$10×1.5=$15(賞金)+$10(元ベット)=$25' },
  { id: 6, phase: 1, q: 'Hi-Loカードカウンティングで「7」の値は？', options: ['+1', '-1', '0', '+2'], answer: 2, explain: '2-6は+1、7-9は0、10-Aは-1です。7は中立カード。' },
  { id: 7, phase: 1, q: '16 vs ディーラー10。最適なアクションは？', options: ['Stand', 'Hit', 'Surrender', 'Double'], answer: 2, explain: 'Surrenderが最適（-0.500）。出来ない場合はHit（-0.535）。Stand（-0.540）は避ける。' },
  { id: 8, phase: 2, q: 'ヨーロピアンルーレットのハウスエッジは？', options: ['5.26%', '2.70%', '1.35%', '7.89%'], answer: 1, explain: 'シングルゼロの欧州ルーレットのハウスエッジは2.70%です。' },
  { id: 9, phase: 2, q: 'ルーレットのストレートアップベットの配当は？', options: ['17:1', '35:1', '11:1', '8:1'], answer: 1, explain: '単一の番号に賭けるストレートアップは35:1で支払われます。' },
  { id: 10, phase: 2, q: '「En Prison」ルールの効果は？', options: ['ベット没収', '次のスピンに保留', '配当2倍', 'ベット半減'], answer: 1, explain: '0が出た場合にベットを次のスピンに保留。勝てば返還、負ければ没収。' },
  { id: 11, phase: 3, q: 'クラップスでハウスエッジが0%のベットは？', options: ['パスライン', 'ドントパス', 'オッズベット', 'Any 7'], answer: 2, explain: 'オッズベットのみハウスエッジ0%。真の確率で支払われます。' },
  { id: 12, phase: 3, q: 'クラップスのスティックマンの主な役割は？', options: ['チップ管理', 'サイコロ操作と出目宣告', 'ベットの監督', 'スタッフ全体の監督'], answer: 1, explain: 'スティックマンはサイコロ操作、出目宣告、センターベット管理を担当。' },
  { id: 13, phase: 3, q: 'プレイス6に$30賭けて勝った時の獲得額は？', options: ['$30', '$35', '$42', '$60'], answer: 1, explain: '$30×7/6=$35。プレイス6/8は7:6で支払われます。' },
  { id: 14, phase: 4, q: 'テキサスホールデムで最強のハンドは？', options: ['ストレートフラッシュ', 'フォーカード', 'ロイヤルフラッシュ', 'フルハウス'], answer: 2, explain: 'ロイヤルフラッシュ(A-K-Q-J-10同スート)がポーカー最強ハンドです。' },
  { id: 15, phase: 4, q: 'フロップでフラッシュドロー(アウツ9枚)の完成確率は？', options: ['18%', '35%', '50%', '25%'], answer: 1, explain: '4倍の法則で9×4=36%。厳密には約35%です。' },
  { id: 16, phase: 5, q: 'バカラで最もハウスエッジが低いベットは？', options: ['Player 勝ち', 'Banker 勝ち', 'Tie', 'Tie 9:1'], answer: 1, explain: 'Banker勝ちが1.06%で最も低い(5%コミッション込み)。Playerは1.24%。' },
  { id: 17, phase: 5, q: 'Three Card Pokerでディーラーがクオリファイする条件は？', options: ['Jハイ以上', 'Qハイ以上', 'Kハイ以上', '何でも'], answer: 1, explain: 'ディーラーはQハイ以上でクオリファイ(勝負を受ける資格がある)。' },
  { id: 18, phase: 5, q: 'Pai Gow Pokerで7枚をどう分ける？', options: ['3枚+4枚', '5枚+2枚', '6枚+1枚', '4枚+3枚'], answer: 1, explain: 'ハイハンド5枚+ローハンド2枚に分けます。ハイがローより強くなければファウル。' },
  { id: 19, phase: 6, q: 'ディーラー面接で最も重視されるのは？', options: ['学歴', '正確さと信頼性', '外見', '年齢'], answer: 1, explain: '正確さ・チップ操作の速さ・誠実さが最重視されます。学歴はほぼ関係ありません。' },
  { id: 20, phase: 6, q: 'カジノ収入の60-70%を占めるのは？', options: ['テーブルゲーム', 'スロットマシン', 'ポーカールーム', '飲食部門'], answer: 1, explain: 'スロットマシンがカジノ収入の60-70%を占めます。ディーラー不要で最も効率的な収益源。' },
]

export default function QuizPage() {
  const { phaseId } = useParams<{ phaseId: string }>()
  const navigate = useNavigate()

  const phaseQuestions = useMemo(() => {
    if (phaseId === undefined) return QUESTIONS
    const p = parseInt(phaseId)
    if (p === 6) return QUESTIONS
    return QUESTIONS.filter(q => q.phase === p)
  }, [phaseId])

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const q = phaseQuestions[current]
  const total = phaseQuestions.length
  
  const score = useMemo(() => 
    phaseQuestions.filter((q, i) => answers[i] === q.answer).length,
    [answers, phaseQuestions]
  )

  const restart = () => {
    setAnswers({})
    setCurrent(0)
    setShowResult(false)
    setSubmitted(false)
  }

  const answerQuestion = (optIdx: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [current]: optIdx }))
    setSubmitted(true)
    if (current < total - 1) {
      setTimeout(() => { setCurrent(c => c + 1); setSubmitted(false) }, 1200)
    } else {
      setTimeout(() => setShowResult(true), 800)
    }
  }

  if (phaseQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">No questions for this phase</h2>
        <button onClick={() => navigate('/')} className="text-casino-gold hover:underline">Dashboardに戻る</button>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10 animate-fadeIn">
        <Trophy size={48} className="mx-auto mb-4 text-casino-gold" />
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-4xl font-bold text-casino-gold mb-2">{score}/{total}</p>
        <p className="text-casino-muted text-sm mb-6">{score/total*100 >= 80 ? 'Excellent! 認定証の要件を満たしています。' : 'もう少し頑張りましょう。80%以上を目指してください。'}</p>
        <div className="flex justify-center gap-3">
          <button onClick={restart} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-casino-card border border-casino-border text-white hover:bg-casino-card/70 transition-colors">
            <RotateCcw size={16} /> もう一度
          </button>
          <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-lg bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-semibold hover:bg-casino-gold/20 transition-colors">
            Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-casino-muted mb-2">
          <span>Question {current + 1} / {total}</span>
          <span>Score: {Object.values(answers).filter((a, i) => a === phaseQuestions[i].answer).length}/{current}</span>
        </div>
        <div className="h-1.5 bg-casino-card rounded-full overflow-hidden">
          <div className="h-full bg-casino-gold rounded-full transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-casino-card rounded-xl p-6 border border-casino-border animate-fadeIn">
        <p className="text-xs text-casino-gold font-semibold mb-2">Phase {q.phase} Question</p>
        <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">{q.q}</h3>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isSelected = answers[current] === i
            const isCorrect = i === q.answer
            let bg = 'bg-casino-royal border-casino-border hover:border-casino-gold/30'
            if (submitted) {
              if (isCorrect) bg = 'bg-emerald-900/20 border-emerald-600'
              else if (isSelected) bg = 'bg-red-900/20 border-red-600'
            }
            return (
              <button
                key={i}
                onClick={() => answerQuestion(i)}
                disabled={submitted}
                className={`w-full text-left p-3.5 rounded-lg border transition-colors ${bg} ${!submitted ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-casino-royal border border-casino-border flex items-center justify-center text-xs text-casino-muted font-mono shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-white">{opt}</span>
                  {submitted && isCorrect && <CheckCircle size={18} className="text-emerald-400 ml-auto shrink-0" />}
                  {submitted && isSelected && !isCorrect && <XCircle size={18} className="text-red-400 ml-auto shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>

        {submitted && (
          <div className="mt-4 p-3 rounded-lg bg-casino-gold/5 border border-casino-gold/20 flex items-start gap-3">
            <Lightbulb size={16} className="text-casino-gold shrink-0 mt-0.5" />
            <p className="text-sm text-casino-muted">{q.explain}</p>
          </div>
        )}
      </div>
    </div>
  )
}

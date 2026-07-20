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
  { id: 21, phase: 0, q: '「期待値(Expected Value)」の正しい説明は？', options: ['必ず得られる金額', '長期的に平均して得られる損益', '最も可能性の高い結果', '勝率と同じ'], answer: 1, explain: 'EVは長期的な1試行あたりの平均損益。数学的に計算され、マイナスなら必ず長期的に負ける。' },
  { id: 22, phase: 0, q: '$100のブラックチップは何枚で$1,000になる？', options: ['5枚', '8枚', '10枚', '20枚'], answer: 2, explain: '$100×10枚=$1,000。基本の換算を覚えよう。' },
  { id: 23, phase: 0, q: '「RTP（Return to Player）」の意味は？', options: ['Return to Player（還元率）', 'Real Time Play', 'Rate of Theoretical Profit', 'Round Table Poker'], answer: 0, explain: 'RTPはプレイヤーへの平均還元率。RTP 95%=長期的に$100あたり$95戻る。' },
  { id: 24, phase: 1, q: 'ダブルダウンの正しい手信号は？', options: ['テーブルを叩く', '人差し指を1本立てる', '手を水平に振る', '両手を上げる'], answer: 1, explain: '追加チップをベット脇に置き人差し指1本。カメラに確実に見えるように。' },
  { id: 25, phase: 1, q: 'BJでプレイヤーがプッシュする確率は約何%？', options: ['約3%', '約8.5%', '約15%', '約20%'], answer: 1, explain: 'BJのプッシュ確率は約8.5%。ディーラーとプレイヤーが同点になる頻度。' },
  { id: 26, phase: 1, q: '「S17」の意味は？', options: ['Seventeen decks', 'Stand on Soft 17', 'Super 17 bonus', 'Split seventeen'], answer: 1, explain: 'S17=Dealer Stands on Soft 17。H17よりプレイヤーに約0.22%有利なルール。' },
  { id: 27, phase: 2, q: 'ルーレットの全番号(1-36)の合計は？', options: ['555', '666', '777', '888'], answer: 1, explain: '1+2+...+36=666。偶然だが話題になる数字。' },
  { id: 28, phase: 2, q: 'フランス式ルーレットのLa Partageで、0が出た場合の赤/黒ベットは？', options: ['全額没収', '半分返却', '2倍になる', '次のスピンに持ち越し'], answer: 1, explain: 'La Partageでは0で偶数マネーベットの半分が返却。HEが2.70%→1.35%に半減。' },
  { id: 29, phase: 3, q: 'クラップスのフィールドベットで2と12が両方3:1の場合のHEは？', options: ['0%', '2.78%', '5.56%', '1.41%'], answer: 0, explain: '2と12が両方3:1のフィールドベットはHE 0%という超レアなベット。カジノはまず提供しない。' },
  { id: 30, phase: 3, q: 'クラップスで「Boxcars(ボックスカーズ)」は何の出目？', options: ['2 (1-1)', '7 (4-3等)', '11 (6-5)', '12 (6-6)'], answer: 3, explain: '6-6をBoxcars（貨物列車）と呼ぶ。2つの6が貨車のように見えるから。' },
  { id: 31, phase: 4, q: 'テキサスホールデムでプリフロップ最強のハンドは？', options: ['AK suited', 'AA', 'KK', 'QQ'], answer: 1, explain: 'ポケットA(AA)が約85.2%の勝率で最強。KKは82.4%。' },
  { id: 32, phase: 4, q: 'ポーカーで「バーンカード」を捨てる理由は？', options: ['デッキを減らすため', '次のカードの裏面を見られないようにするため', '運気リセット', 'シャッフルミスを隠すため'], answer: 1, explain: 'マークされたカードの裏面で次カードが特定されるのを防ぐ伝統的不正防止策。' },
  { id: 33, phase: 5, q: 'バカラ（プントバンコ）の「タブロー」とは？', options: ['カードの価値表', '3枚目ドローを決める固定ルール表', 'ベットの配当表', 'プレイヤーの戦略表'], answer: 1, explain: 'タブローは3枚目のカードを引くか否かを自動決定する固定ルール。プレイヤーの意思は一切介在しない。' },
  { id: 34, phase: 5, q: 'バカラで「Dragon 7」の配当は？', options: ['8:1', '25:1', '40:1', '9:1'], answer: 2, explain: 'EZ BaccaratのDragon 7はBankerが3枚で7を作って勝った場合に40:1。通常はプッシュ。' },
  { id: 35, phase: 5, q: 'バカラのBankerベットのコミッションは何%？', options: ['3%', '5%', '10%', '1%'], answer: 1, explain: 'Banker勝ちの賞金から5%のコミッション。これによりBankerベットのHEは1.06%に。' },
  { id: 36, phase: 6, q: 'ディーラーがミスをした場合の正しい対応は？', options: ['自分でこっそり修正', '無視する', 'すぐにピットボスを呼ぶ', 'お客さんに謝って続ける'], answer: 2, explain: '即座に上司（ピットボス）を呼ぶ。自己修正は不正と誤解される可能性。誠実さが最重要。' },
  { id: 37, phase: 6, q: '日本初のIRが開業する場所は？', options: ['東京', '大阪（夢洲）', '沖縄', '北海道'], answer: 1, explain: '大阪市此花区・夢洲（ゆめしま）。MGM+オリックス運営。2029-2030年開業目標。' },
  { id: 38, phase: 6, q: 'カジノの「ホールド率」の計算式は？', options: ['収益÷ドロップ', 'ドロップ÷収益', '収益÷来店人数', 'ドロップ÷台数'], answer: 0, explain: 'ホールド率=収益÷ドロップ×100%。お客さんが持ち込んだ総現金のうち何%をカジノが確保したか。' },
  { id: 39, phase: 5, q: 'バカラで「ナチュラル9」と「ナチュラル8」、強いのは？', options: ['ナチュラル9', 'ナチュラル8', '同じ', '状況による'], answer: 0, explain: 'ナチュラル9が最強。9＞8の順。どちらも最初の2枚で出たら即勝負決定。' },
  { id: 40, phase: 3, q: 'クラップスのオッズベットでポイント6の配当は？', options: ['2:1', '3:2', '6:5', '1:1'], answer: 2, explain: 'オッズベットの6と8は6:5。4/10=2:1、5/9=3:2。ハウスエッジ0%の魔法のベット。' },
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

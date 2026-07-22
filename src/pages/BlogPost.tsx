import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const posts: Record<string, { title: string; desc: string; date: string; readTime: string; category: string; content: string }> = {
  'casino-dealer-guide-2026': {
    title: 'カジノディーラーになるには？完全ガイド2026',
    desc: '必要なスキル、資格、給料、求人情報、おすすめの学習方法を徹底解説。',
    date: '2026-07-22', readTime: '12分', category: 'キャリア',
    content: `
## カジノディーラーになるには？

カジノディーラーは、単にカードを配るだけの仕事ではない。ゲームの進行、チップ管理、不正防止、そして何よりもプレイヤーに対するホスピタリティが求められる専門職である。

本稿では、2026年現在の最新情報に基づき、カジノディーラーになるための完全ガイドを提供する。

### 必要なスキル

1. **計算力**: ペイアウト計算は暗算で行う。特にルーレットとクラップスでは複雑な配当計算が求められる。
2. **手先の器用さ**: カードのシャッフル、チップカット、ダイス操作など、細かい手作業の習得が必要。
3. **コミュニケーション能力**: プレイヤーとの円滑なやり取り、クレーム対応ができる。
4. **ストレス耐性**: 高速なゲーム進行、大量の金銭管理、長時間の立ち仕事に対応できる。
5. **英語力**: 国際的なカジノでは英語が必須。基本的なゲーム用語は英語で覚える。

### 資格について

日本には国家資格としての「カジノディーラー資格」は存在しない。ただし、JCDA（日本カジノディーラー協会）の認定資格が業界標準として認知されている。

海外では、各州や各カジノが独自の認定制度を持つ。ラスベガスではディーラースクールの修了証が実質的な資格として機能する。

### 給与相場

| 地域 | 初任給（年収） | 経験者（年収） |
|------|--------------|--------------|
| アメリカ（ラスベガス） | $28,000〜$35,000 | $45,000〜$70,000（チップ含む） |
| マカオ | $25,000〜$40,000 | $50,000〜$80,000 |
| 日本（IR開業後予想） | ¥4,000,000〜¥5,000,000 | ¥6,000,000〜¥10,000,000 |

### 学習方法

1. **オンライン教材**: CasinoCallege のような無料オンラインプラットフォームで基礎を学ぶ
2. **ディーラースクール**: 対面での実技指導を受ける（期間: 6〜12週間）
3. **自主練習**: 自宅でのカードシャッフル練習、ペイアウト計算の反復練習
4. **インターンシップ**: カジノでの実地研修

### 大阪IRに向けた準備

2029-2030年に開業予定の大阪IR（MGM+オリックス）では、2,000〜3,000人のディーラーが必要と見積もられている。今から準備を始めることで、開業時に即戦力となることが可能だ。

特に以下の準備が推奨される：
- 英語力の向上（外国人客対応のため）
- 複数ゲームの習得（BJ＋ルーレット＋バカラの3ゲームが基本）
- 日本独自のホスピタリティ（おもてなし）の意識
    `,
  },
  'blackjack-dealer-basics': {
    title: 'ブラックジャックディーラーの基本動作と手信号',
    desc: 'ブラックジャックディーラーの基本動作と正しい手信号を徹底解説。',
    date: '2026-07-22', readTime: '8分', category: 'ブラックジャック',
    content: `
## ブラックジャックディーラーの基本動作

ブラックジャックディーラーは、以下の一連の流れを正確かつスムーズに行う必要がある。

### ゲームの流れ

1. **シャッフル**: ランダム性を確保するため、複数のシャッフル技法を使い分ける
2. **カット**: プレイヤーにカットカードを挿入してもらう
3. **バーン**: 最初の1枚を捨てる（不正防止）
4. **配布**: プレイヤー→ディーラー→プレイヤー→ディーラーの順
5. **ゲーム進行**: 各プレイヤーのアクションに対応
6. **精算**: 勝ちベットの支払いと負けベットの回収

### 手信号一覧

| アクション | 手信号（フェイスアップゲーム） | 意味 |
|-----------|-------------------------------|------|
| Hit | テーブルを指でトントンと叩く | カードをもう1枚引く |
| Stand | 手のひらを水平に振る | カードを引かない |
| Double Down | 人差し指を1本立てる | ベットを2倍にして1枚だけ引く |
| Split | Vサイン（ピースサイン） | ペアを2つの手に分ける |
| Surrender | 水平に手を切る動作 | ベットの半分を放棄 |
| Insurance | 人差し指でテーブルを指す | ディーラーBJに備える |

### カード配布の注意点

- カードは常に手首のスナップを使い、1枚ずつ正確に配る
- 配布順序は絶対に間違えない（右端のプレイヤーから反時計回り）
- カードの角度はプレイヤーから見えるように、ディーラーからは見えないように
- バーンカードは必ず1枚ずつ、決まった位置に捨てる

### チップ管理

- チップの仕分けは色別に行う（白$1, 赤$5, 緑$25, 黒$100）
- ペイアウトは常に確認しながら行う（ベット額の2倍、3:2など）
- 高額ベットはピットボスの確認を得る
    `,
  },
  'osaka-ir-dealer-demand': {
    title: '大阪IR開業でディーラー需要が急増する理由',
    desc: '2029-2030年開業予定の大阪IRとディーラー需要について解説。',
    date: '2026-07-22', readTime: '6分', category: '業界情報',
    content: `
## 大阪IR開業でディーラー需要が急増する理由

2029-2030年、大阪・夢洲（ゆめしま）に日本初のIR（統合型リゾート）が開業する。運営はMGMリゾーツとオリックスの合弁企業が務める。

### 必要とされるディーラー数

大阪IRのカジノフロア規模は約10,000平方メートル、テーブル数は約300〜400台と見積もられている。これを運営するために必要なディーラー数は：

- **直接雇用ディーラー**: 2,000〜3,000人
- **関連スタッフ（ピットボス、マネージャー等）**: 500〜800人
- **バックアップ要員**: 200〜300人

合計で約3,000〜4,000人の雇用が見込まれている。

### 現在の育成状況

日本国内には現在、以下のディーラースクールが存在する：

- Japan Casino School（東京・大阪）— 2004年創業、最大手
- IGS Japan（東京）— 外国人講師在籍
- BLOW Casino Dealer School（東京・大阪）— アミューズメントカジノ併設

しかし、これらのスクールの年間卒業生は合計でも500人程度と推定され、3,000人という需要に対して大幅に不足している。

### オンライン学習の重要性

対面スクールだけでは人材供給が追いつかないため、オンライン学習の重要性が高まる。CasinoCallegeのような無料オンラインプラットフォームは：

- 場所や時間を選ばず学習可能
- 基礎知識を事前に習得し、スクールでの実技指導を効率化
- 費用ゼロで始められる（スクールは通常$1,500〜$3,000）

### 求められる人材像

大阪IRで求められるディーラー像：
- 日本語＋英語のバイリンガル
- 複数ゲーム（BJ＋ルーレット＋バカラ）をこなせるマルチプレイヤー
- 日本の「おもてなし」精神を理解している
- 国際的なカジノ基準に従ったプロフェッショナルな対応ができる
    `,
  },
  'casino-terminology-100': {
    title: 'カジノ用語100選：ディーラーを目指す人が覚えるべき基本用語',
    desc: 'カジノディーラーを目指す人が最初に覚えるべき専門用語をカテゴリ別に解説。',
    date: '2026-07-22', readTime: '10分', category: '基礎知識',
    content: `
## カジノ用語100選

カジノディーラーを目指すなら、専門用語の理解は必須だ。ここでは、基本的な用語をカテゴリ別に紹介する。

### 一般用語

| 用語 | 意味 |
|------|------|
| ハウスエッジ | 各ベットに対するカジノの数学的優位性（%） |
| RTP | Return to Player（プレイヤー還元率） |
| アクション | 賭けられた総金額 |
| バンクロール | ギャンブルに充てる総資金 |
| コンプ | カジノが優良顧客に提供する無料サービス |
| マーカー | カジノが発行する短期信用（借金） |
| ピットボス | 複数テーブルを監督する中間管理職 |
| アイ・イン・ザ・スカイ | 天井の監視カメラシステム |
| ドロップ | カジノに持ち込まれた総現金額 |
| ホールド率 | カジノの収益÷ドロップ |

### ブラックジャック用語

| 用語 | 意味 |
|------|------|
| ナチュラル（BJ） | A+10点札の組み合わせ。3:2で支払い |
| バースト | 合計が21を超えること |
| プッシュ | 引き分け。チップ返却 |
| スプリット | ペアを2つの手に分ける |
| ダブルダウン | ベット2倍＋1枚だけ追加 |
| インシュアランス | ディーラーBJに備えるサイドベット |
| サレンダー | ベットの半分を放棄 |
| シュー | 複数デッキを収納する配布器具 |
| ペネトレーション | シャッフル前に使用されるカードの割合 |
| カードカウンティング | 出たカードを記憶し有利不利を判断する技術 |

### ルーレット用語

| 用語 | 意味 |
|------|------|
| ストレートアップ | 単一の番号に賭ける（35:1） |
| スプリット | 2つの番号の間に賭ける（17:1） |
| ストリート | 3つの番号に賭ける（11:1） |
| コーナー | 4つの番号に賭ける（8:1） |
| インサイドベット | 番号に直接賭けるベットの総称 |
| アウトサイドベット | 番号グループに賭けるベットの総称 |
| アンプリズン | 0が出た場合にベットを次スピンに保留 |
| ラ・パルタージュ | 0が出た場合にベットの半分を返却 |
| ヴォワザン・デュ・ゼロ | ゼロの隣人（フレンチベット） |
| ティエール・デュ・シリンダー | シリンダーの1/3（フレンチベット） |

### クラップス用語

| 用語 | 意味 |
|------|------|
| パスライン | 基本ベット。7/11で勝ち、2/3/12で負け |
| カムアウト | シューターの最初のロール |
| ポイント | カムアウトで確定する数字（4,5,6,8,9,10） |
| オッズベット | HE 0%の追加ベット |
| セブンアウト | ポイント成立後に7が出て負けること |
| シューター | 現在ダイスを振っているプレイヤー |
| スティックマン | ダイス操作と出目宣告を担当 |
| ボックスマン | チップバンク後ろに座り監督する従業員 |
| ハードウェイ | 両方同じ目で出るベット |
| イレブン（Yo） | 11。「セブン」と聞き間違えない発音 |

### ポーカー用語

| 用語 | 意味 |
|------|------|
| ブラインド | カードを見る前に強制ベット |
| フロップ | 最初の3枚のコミュニティカード |
| ターン | 4枚目のコミュニティカード |
| リバー | 5枚目で最後のコミュニティカード |
| ショーダウン | 最終的なハンド公開 |
| ブラフ | 弱い手で強気にベットする戦術 |
| ポジション | テーブルでの座る位置 |
| ポットオッズ | コール額÷（ポット+コール額） |
| レーキ | 各ポットからカジノが徴収する手数料 |
| キッカー | 勝敗を決めるサイドカード |

### バカラ用語

| 用語 | 意味 |
|------|------|
| タブロー | 3枚目ドローを決める固定ルール表 |
| ナチュラル | 最初の2枚で8か9 |
| パンク | バカラでバースト（0に）すること |
| スクイーズ | カードをゆっくりめくるVIPの習慣 |
| パレット | カードを届ける木製ヘラ |
| コミッション | Bankerベットの5%手数料 |
| ビーズロード | バカラの結果記録シート |
| ドラゴン7 | EZ Baccaratのサイドベット（40:1） |
| パンダ8 | EZ Baccaratのサイドベット（25:1） |
| インパウンド | 未払いコミッションの保留状態 |

以上の100語をマスターすれば、カジノディーラーの基礎用語はほぼカバーできる。詳細はCasinoCallegeの用語集（/glossary）も参照してほしい。
    `,
  },
  'roulette-payout-master': {
    title: 'ルーレットディーラーのペイアウト計算完全マスター',
    desc: 'ルーレットの全ベットタイプのペイアウト計算方法を徹底解説。',
    date: '2026-07-22', readTime: '7分', category: 'ルーレット',
    content: `
## ルーレットディーラーのペイアウト計算完全マスター

ルーレットディーラーにとって最も重要なスキルの一つが、正確かつ迅速なペイアウト計算である。本稿では全ベットタイプの計算方法を解説する。

### インサイドベットの配当

| ベット名 | 対象 | 配当倍率 | 計算例（$10ベット） |
|---------|------|---------|------------------|
| ストレートアップ | 単一の番号 | 35:1 | $10×35 = $350（賞金）+ $10 = $360 |
| スプリット | 2つの番号の間 | 17:1 | $10×17 = $170 + $10 = $180 |
| ストリート | 3つの番号（横一列） | 11:1 | $10×11 = $110 + $10 = $120 |
| コーナー | 4つの番号（交点） | 8:1 | $10×8 = $80 + $10 = $90 |
| シックスライン | 6つの番号（2列） | 5:1 | $10×5 = $50 + $10 = $60 |

### アウトサイドベットの配当

| ベット名 | 対象 | 配当倍率 | 計算例（$10ベット） |
|---------|------|---------|------------------|
| 赤/黒 | 色 | 1:1 | $10×1 + $10 = $20（元本相当） |
| 奇数/偶数 | 奇数/偶数 | 1:1 | $10 + $10 = $20 |
| 1-18 / 19-36 | 数字の範囲 | 1:1 | $10 + $10 = $20 |
| ダズン | 12個の数字（1-12等） | 2:1 | $10×2 = $20 + $10 = $30 |
| カラム | 縦1列（12個） | 2:1 | $10×2 = $20 + $10 = $30 |

### 特殊ベット（フレンチ/ヨーロピアン）

- **Voisins du Zero（ゼロの隣人）**: 9枚のチップで17数字をカバー
- **Tiers du Cylindre（シリンダーの1/3）**: 6枚のチップで12数字をカバー
- **Orphelins（孤児たち）**: 5枚のチップで8数字をカバー
- **Jeu Zero（ゼロの遊び）**: 4枚のチップで7数字をカバー

### ディーラーとしての計算のコツ

1. **チップの種類を統一する**: ペイアウトはベットチップと同じ色で行う
2. **スタック単位で計算**: 20枚($100)のスタックを基準に計算を高速化
3. **暗算のパターンを覚える**: 35:1なら「ベット×35+元本」のパターンを暗記
4. **確認の習慣**: 必ず2回確認してからプレイヤーにプッシュする

### アメリカン vs ヨーロピアンの違い

| 項目 | アメリカン（US） | ヨーロピアン（EU） |
|------|-----------------|------------------|
| ポケット数 | 38（0+00） | 37（0のみ） |
| ハウスエッジ | 5.26% | 2.70% |
| En Prison | なし | あり（フランス式） |
| La Partage | なし | あり（フランス式） |

配当計算自体は同じだが、En Prison や La Partage のルールが適用される場合は精算処理が変わるので注意が必要だ。
    `,
  },
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = slug ? posts[slug] : null

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">記事が見つかりません</h2>
        <button onClick={() => navigate('/blog')} className="text-casino-gold hover:underline">ブログ一覧</button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.desc} />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-1 text-casino-muted hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={14} /> ブログ一覧に戻る
        </button>

        <article className="bg-casino-dark/80 backdrop-blur-sm rounded-xl border border-casino-border p-5 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-casino-gold bg-casino-gold/10 px-2 py-0.5 rounded">{post.category}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-xs text-casino-muted mb-8 pb-6 border-b border-casino-border">
            <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
          </div>
          <div className="max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
      </div>
    </>
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const nodes: React.ReactNode[] = []
  let tableRows: string[] = []

  const flushTable = (key: number) => {
    if (tableRows.length < 2) { tableRows = []; return }
    const headers = tableRows[0].split('|').filter(Boolean).map(s => s.trim())
    const rows = tableRows.slice(2).filter(r => r.startsWith('|')).map(r => r.split('|').filter(Boolean).map(s => s.trim()))
    nodes.push((
      <div key={key} className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>{headers.map((h, i) => <th key={i} className="border border-casino-border bg-casino-royal px-3 py-2 text-casino-gold font-semibold text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-casino-border px-3 py-2 text-casino-text">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
    tableRows = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('| ') || line.startsWith('|---')) {
      tableRows.push(line)
      continue
    }
    flushTable(i)
    if (line.startsWith('## ')) {
      nodes.push(<h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      nodes.push(<h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">{line.slice(4)}</h3>)
    } else if (line.trim() === '') {
      nodes.push(<div key={i} className="h-3" />)
    } else if (line.startsWith('- **')) {
      const m = line.match(/- \*\*(.+?)\*\*: (.+)/)
      nodes.push(m
        ? <p key={i} className="text-sm text-casino-text mb-2 leading-relaxed"><strong className="text-white">{m[1]}</strong>: {m[2]}</p>
        : <p key={i} className="text-sm text-casino-text mb-2 leading-relaxed">{line.slice(2)}</p>)
    } else if (line.startsWith('- ')) {
      nodes.push(<li key={i} className="text-sm text-casino-text ml-4 mb-1.5 list-disc leading-relaxed">{line.slice(2)}</li>)
    } else {
      nodes.push(<p key={i} className="text-sm text-casino-text leading-relaxed mb-3">{line}</p>)
    }
  }
  flushTable(lines.length)
  return nodes
}

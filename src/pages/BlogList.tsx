import { Calendar, Clock, ArrowRight } from 'lucide-react'

const POSTS = [
  { slug: 'what-is-dealer-job', title: 'カジノディーラーの仕事内容とは？1日の流れから向き不向きまで', desc: 'カジノディーラーの1日のスケジュール、業務内容、必要なスキル、向き不向きを詳しく解説。', date: '2026-07-25', readTime: '5分', category: 'キャリア' },
  { slug: 'roulette-winning-strategy-truth', title: 'ルーレット必勝法の真実──なぜどの戦略も長期的には負けるのか', desc: 'ルーレットに必勝法は存在しない。マーチンゲール、逆マーチンゲール、ジェイムズボンドなど有名な戦略を数学的に検証する。', date: '2026-07-25', readTime: '9分', category: 'ルーレット' },
  { slug: 'osaka-ir-dealer-demand', title: '大阪IR開業でディーラー需要が急増する理由', desc: '2029-2030年開業予定の大阪IRによって数千人のディーラー需要が生まれる。その背景と準備すべきことを解説。', date: '2026-07-25', readTime: '4分', category: '業界情報' },
  { slug: 'japan-ir-reality', title: '大阪IRの本当の話──開業までに起きること', desc: '2029-2030年開業予定の大阪IR。楽観論と悲観論の間で、実際に何が起きるのか。元公務員の視点から分析する。', date: '2026-07-25', readTime: '11分', category: '業界インサイダー' },
  { slug: 'house-edge-complete-comparison', title: 'カジノ全ゲームのハウスエッジ完全比較', desc: 'カジノにある全ての主要ゲームとベット種別のハウスエッジを一覧比較。どこが一番有利で、どこが一番儲かるのか。', date: '2026-07-25', readTime: '8分', category: 'データで見る業界の真実' },
  { slug: 'dealer-women-career', title: '女性ディーラーとして働く──リアルな環境とキャリア', desc: 'カジノディーラーに女性は多い。女性ならではのメリット、気をつけるべきこと、キャリア形成を解説。', date: '2026-07-25', readTime: '7分', category: 'キャリア' },
  { slug: 'dealer-speed-training', title: 'ディーラーのスピードを上げる練習法──正確さを保ちながら速くなる', desc: 'ディーラーはスピードが命だが、正確さを犠牲にしてはいけない。効率的な練習方法で着実にスピードアップする方法を解説。', date: '2026-07-25', readTime: '6分', category: '基礎知識' },
  { slug: 'dealer-school-certification-guide', title: 'ディーラースクールと資格の選び方', desc: 'ディーラースクールの選び方と各種認定資格を解説。大阪IR開業が近づく2026年、スクール選びの基準は変わった。', date: '2026-07-25', readTime: '6分', category: 'キャリア' },
  { slug: 'dealer-salary-million-myth', title: 'カジノディーラー年収1000万の真実', desc: '「ディーラーは年収1000万」という噂の真偽を検証。実際の給与データと、1000万を実現する条件を解説。', date: '2026-07-25', readTime: '7分', category: 'キャリア' },
  { slug: 'dealer-salary-guide', title: 'カジノディーラーの給与と年収のすべて', desc: 'カジノディーラーの給与体系、年収相場、チップの仕組みを徹底解説。', date: '2026-07-25', readTime: '7分', category: 'キャリア' },
  { slug: 'dealer-personality-guide', title: 'カジノディーラーに向いている人の性格とは', desc: 'カジノディーラーに必要な性格特性と適性を詳しく解説。自分に合っているか診断するチェックリスト付き。', date: '2026-07-25', readTime: '6分', category: 'キャリア' },
  { slug: 'dealer-no-experience-guide', title: '未経験からカジノディーラーになる方法', desc: '未経験からカジノディーラーを目指す人のための完全ガイド。', date: '2026-07-25', readTime: '8分', category: 'キャリア' },
  { slug: 'dealer-is-it-tough', title: 'カジノディーラーの「きつい」を分解する──5つの現実', desc: '立ち仕事、クレーム対応、夜勤、プレッシャー。ディーラーの「きつい」と言われる理由を分解し、それぞれの対策を解説。', date: '2026-07-25', readTime: '8分', category: 'キャリア' },
  { slug: 'dealer-hourly-wage-comparison', title: 'ディーラーの時給を全比較──世界と日本のリアル', desc: 'ラスベガス、マカオ、シンガポール、そして日本IRの推定ディーラー時給を比較。チップ込みの実質収入まで試算。', date: '2026-07-25', readTime: '10分', category: 'データで見る業界の真実' },
  { slug: 'dealer-english-necessity', title: 'カジノディーラーに英語は必須なのか──3段階で考える', desc: 'カジノディーラーに求められる英語レベルを3段階で解説。場所やゲームによって必要なレベルが異なる。', date: '2026-07-25', readTime: '6分', category: 'キャリア' },
  { slug: 'dealer-certification-faq', title: 'カジノディーラー資格に関するFAQ', desc: 'カジノディーラーの資格や認定制度についてよくある質問をまとめた。', date: '2026-07-25', readTime: '5分', category: 'キャリア' },
  { slug: 'dealer-career-path-statistics', title: 'ディーラーのキャリアパス統計──何年でピットボスになれるのか', desc: 'ディーラーのキャリアステップと所要年数のデータ。給与の上がり方、スキル別の市場価値も分析。', date: '2026-07-25', readTime: '9分', category: 'データで見る業界の真実' },
  { slug: 'dealer-career-change-30s', title: '30代からのディーラー転職──未経験でも間に合うのか', desc: '30代で未経験からカジノディーラーに転職する方法。年齢の壁、活かせる経験、学習計画を解説。', date: '2026-07-25', readTime: '9分', category: 'キャリア' },
  { slug: 'craps-rules-simple', title: 'クラップスのルールをわかりやすく──複雑に見えるけど実は単純', desc: 'クラップスは難しそうに見えるが、基本の流れはシンプル。パスラインベットだけで遊ぶ方法から解説する。', date: '2026-07-25', readTime: '8分', category: 'クラップス' },
  { slug: 'craps-basics-complete', title: 'クラップスのルールとベット完全攻略', desc: 'クラップスのルール、全ベット種、ペイアウト計算を完全解説。', date: '2026-07-25', readTime: '4分', category: 'クラップス' },
  { slug: 'chip-counting-practice', title: 'ディーラーのチップ計算練習法──暗算力を鍛える5つのドリル', desc: 'ディーラーに必須のチップ計算スキル。自宅でできる暗算練習ドリルを5つ紹介。ペイアウト計算を0.5秒でできるようになる方法。', date: '2026-07-25', readTime: '7分', category: '基礎知識' },
  { slug: 'casino-revenue-structure', title: 'カジノの収益構造──どこで誰が儲けているのか', desc: 'カジノの収益の内訳を解説。テーブルゲーム、スロット、ホテル、飲食。どの部門が一番儲かっていて、なぜなのか。', date: '2026-07-25', readTime: '10分', category: '業界インサイダー' },
  { slug: 'casino-glossary-complete', title: 'カジノ用語集【保存版】──ディーラー志望者が覚えるべき100語', desc: 'カジノディーラーを目指す人が最初に覚えるべき厳選100語。ゲーム別・場面別に分類。初心者必携。', date: '2026-07-25', readTime: '5分', category: '基礎知識' },
  { slug: 'card-shuffling-methods', title: 'カードシャッフルの種類と練習方法──初心者からプロまで', desc: 'リフルシャッフル、ストリップシャッフル、ファローシャッフル。カジノディーラーが使うシャッフル技術の種類と練習方法を解説。', date: '2026-07-25', readTime: '7分', category: '基礎知識' },
  { slug: 'card-counting-for-beginners', title: 'カードカウンティング入門──初心者が知っておくべき基礎とリスク', desc: 'カードカウンティングの基本を初心者向けに解説。Hi-Lo方式の仕組み、練習方法、そしてカジノ側の対策まで。', date: '2026-07-25', readTime: '10分', category: 'ブラックジャック' },
  { slug: 'blackjack-hand-signals-complete', title: 'ブラックジャックディーラーの手信号完全解説', desc: 'ディーラーが使う全手信号を写真や図なしでテキストで完全解説。カメラに映す位置や注意点まで。', date: '2026-07-25', readTime: '6分', category: 'ブラックジャック' },
  { slug: 'baccarat-tableau-master', title: 'バカラのタブローを完全暗記する方法', desc: 'バカラのタブロー（3枚目のルール）を完全暗記するための効率的な学習法を解説。', date: '2026-07-25', readTime: '4分', category: 'バカラ' },
  { slug: 'rookie-dealer-first-day', title: '新人ディーラーの初日──現場は教えてくれない', desc: 'ディーラーになった人間の"初日"を描く。スクールでは教えてくれない、現場の空気と緊張と失敗。', date: '2026-07-24', readTime: '8分', category: '物語でわかるカジノ' },
  { slug: 'dealer-sees-everything', title: 'ディーラーはすべてを見ている──あるカードカウンターの顛末', desc: 'カードカウンティングを試みた客と、それに気づいたディーラーの駆け引き。実際にあった話を基にした再現ストーリー。', date: '2026-07-24', readTime: '8分', category: '物語でわかるカジノ' },
  { slug: 'dealer-learning-time-analysis', title: 'ディーラーになるまで何時間かかるのか──学習時間の実態', desc: 'CasinoCallegeの学習データから、ディーラーになるまでに必要な学習時間を分析。ゲーム別・スキル別の習得時間を公開。', date: '2026-07-24', readTime: '10分', category: 'データで見る業界の真実' },
  { slug: 'dealer-interview-secrets', title: 'カジノディーラー面接の裏側──採用する側が見ているもの', desc: 'カジノ側はディーラーの面接で何を見ているのか。実際の採用基準と評価ポイントを業界関係者への取材基に解説。', date: '2026-07-24', readTime: '8分', category: '業界インサイダー' },
  { slug: 'casino-superstitions-and-legends', title: 'カジノの迷信と伝説──ディーラーが語る不思議な話', desc: 'カジノには数え切れない迷信がある。ディーラーが実際に目撃した「不思議な出来事」を集めた。', date: '2026-07-24', readTime: '7分', category: '物語でわかるカジノ' },
  { slug: 'casino-inside-after-hours', title: 'カジノの裏側──閉店後に何が起きているのか', desc: 'プレイヤーが知らないカジノの裏側。閉店後の業務、カウントルーム、セキュリティ。元公務員が調べたカジノの"役所仕事"的な側面。', date: '2026-07-24', readTime: '7分', category: '物語でわかるカジノ' },
  { slug: 'casino-industry-japan-vs-world', title: '日本のカジノ業界は世界と何が違うのか', desc: '元公務員が調べた、日本と世界のカジノ業界の構造的な違い。規制、文化、教育、働き方まで。', date: '2026-07-24', readTime: '12分', category: '業界インサイダー' },
  { slug: 'casino-high-roller-story', title: 'ハイローラーという生き物──カジノが追う10億円の客', desc: 'カジノが最も大切にする客「ハイローラー」。彼らの生態と、カジノ側の接待の実態を描く。', date: '2026-07-24', readTime: '9分', category: '物語でわかるカジノ' },
  { slug: 'casino-first-time-experience', title: 'カジノに初めて行った日の話──元公務員の体験記', desc: 'カジノ経験ゼロの元公務員が、ラスベガスのカジノに初めて足を踏み入れた日の話。期待と現実と気づき。', date: '2026-07-24', readTime: '7分', category: '物語でわかるカジノ' },
  { slug: 'roulette-payout-master', title: 'ルーレットペイアウト計算完全マスター', desc: 'ルーレットの全18種類のベットとペイアウト計算を完全解説。暗算をマスターするコツも紹介。', date: '2026-07-23', readTime: '5分', category: 'ルーレット' },
  { slug: 'dealers-mind-one-hand', title: 'ディーラーの頭の中: あるハンドの12秒', desc: 'ディーラーが実際にブラックジャックの1ハンドで何を考え何を見てどう判断しているのか。地の文ゼロ、思考の独白だけで描く12秒間。', date: '2026-07-23', readTime: '6分', category: '物語でわかるカジノ' },
  { slug: 'dealer-school-curriculum-inside', title: 'ディーラースクールのカリキュラム全部見せます', desc: 'ラスベガスとマカオのディーラースクールで実際に使われているカリキュラムを日本語で完全公開。「なぜこの順番なのか」の教育論も含めて解説する。', date: '2026-07-23', readTime: '16分', category: '業界インサイダー' },
  { slug: 'casino-terminology-100', title: 'カジノ用語100選', desc: 'カジノで使われる必須用語100選をわかりやすく解説。初心者からディーラー志望者まで。', date: '2026-07-23', readTime: '4分', category: '基礎知識' },
  { slug: 'casino-school-comparison-2026', title: 'カジノスクール比較2026', desc: '日本と海外の主なカジノディーラースクールを比較。料金、カリキュラム、特徴を徹底解説。', date: '2026-07-23', readTime: '10分', category: 'キャリア' },
  { slug: 'casino-rules-complete-guide', title: 'カジノルール完全ガイド', desc: 'ブラックジャック、ルーレット、バカラ、クラップス、ポーカーのルールを完全解説。', date: '2026-07-23', readTime: '15分', category: '基礎知識' },
  { slug: 'casino-dealer-guide-2026', title: 'カジノディーラーになるには？完全ガイド2026', desc: 'カジノディーラーに必要なスキル、資格、給与相場、学習方法を完全網羅。', date: '2026-07-23', readTime: '5分', category: 'キャリア' },
  { slug: 'blackjack-dealer-basics', title: 'ブラックジャックディーラーの基本動作と手信号', desc: 'ブラックジャックディーラーに必要な基本動作、手信号、進行手順を完全解説。', date: '2026-07-23', readTime: '4分', category: 'ブラックジャック' },
  { slug: 'blackjack-basic-strategy', title: 'ブラックジャックのベーシックストラテジー完全解説', desc: 'ブラックジャックのベーシックストラテジーを完全解説。ハード/ソフト/ペアの全パターン対応。', date: '2026-07-23', readTime: '10分', category: 'ブラックジャック' },
  { slug: 'basic-strategy-japan-data', title: 'データで見えた「日本人がベーシックストラテジーで最も間違える手」TOP10', desc: 'CasinoCallegeの学習データ1,247件を分析。日本人学習者がベーシックストラテジーのどの局面で間違えやすいのか、完全データで公開する。', date: '2026-07-23', readTime: '14分', category: 'データで見る業界の真実' },
]

export default function BlogList() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 bg-casino-dark/80 backdrop-blur-sm rounded-xl border border-casino-border p-5">
        <h1 className="text-2xl font-bold text-white mb-2">CasinoCallege ブログ</h1>
        <p className="text-casino-muted text-sm">カジノディーラー学習に役立つ情報を発信</p>
      </div>

      <div className="space-y-3">
        {POSTS.map(p => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}/`}
            className="block text-left bg-casino-card rounded-xl p-5 border border-casino-border hover:border-casino-gold/30 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-casino-gold bg-casino-gold/10 px-2 py-0.5 rounded">{p.category}</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-casino-gold transition-colors mb-1.5">{p.title}</h2>
            <p className="text-sm text-casino-muted line-clamp-2 mb-3">{p.desc}</p>
            <div className="flex items-center gap-3 text-[10px] text-casino-muted">
              <span className="flex items-center gap-1"><Calendar size={10} />{p.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{p.readTime}</span>
              <span className="flex items-center gap-1 ml-auto text-casino-gold group-hover:underline text-xs">読む <ArrowRight size={12} /></span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

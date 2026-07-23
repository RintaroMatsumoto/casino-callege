const ROUTES: Record<string, { title: string; desc: string }> = {
  '/':          { title: 'CasinoCallege — カジノディーラー養成プラットフォーム', desc: '実際のディーラースクール教育カリキュラムに準拠した本格的なカジノ学習プラットフォーム。全7Phaseでブラックジャック、ルーレット、クラップス、ポーカー、バカラを無料で学ぶ。' },
  '/phase/0':   { title: 'Phase 0: 基礎 — CasinoCallege', desc: 'カジノの基礎、専門用語、数学的基礎、チップ操作、カードハンドリングを学ぶ。ディーラーになるための第一歩。' },
  '/phase/1':   { title: 'Phase 1: ブラックジャック — CasinoCallege', desc: 'ブラックジャックのディーリング技術を習得。シュー/ピッチゲーム、ペイアウト計算、ベーシックストラテジー、ゲームプロテクションを網羅。' },
  '/phase/2':   { title: 'Phase 2: ルーレット — CasinoCallege', desc: 'アメリカン/ヨーロピアンルーレットの全ベットタイプ、ペイアウト計算、チップ管理を学ぶ。' },
  '/phase/3':   { title: 'Phase 3: クラップス — CasinoCallege', desc: 'カジノで最も複雑なテーブルゲーム、クラップスを完全マスター。テーブルレイアウト、ダイスハンドリング、全ベット種を学習。' },
  '/phase/4':   { title: 'Phase 4: ポーカー — CasinoCallege', desc: 'ポーカールームのディーリング手順を学ぶ。ハンドランキング、ポット管理、レーキ、トーナメント進行を習得。' },
  '/phase/5':   { title: 'Phase 5: バカラ — CasinoCallege', desc: 'マカオで売上の91%を占めるバカラ（プントバンコ）のディーリング技術を学ぶ。タブロー、コミッション管理、サイドベットを網羅。' },
  '/phase/6':   { title: 'Phase 6: キャリア — CasinoCallege', desc: 'ディーラーとしてのキャリア構築、面接対策、カジノ運営の知識、日本IR開業情報を網羅した実践編。' },
  '/glossary':  { title: 'カジノ用語集 — CasinoCallege', desc: 'ブラックジャック、ルーレット、クラップス、ポーカー、バカラなどカジノゲームの専門用語を網羅した用語集。' },
}

const BLOG_ROUTES: Record<string, { title: string; desc: string }> = {
  '/blog/what-is-dealer-job':                { title: 'カジノディーラーの仕事内容とは？1日の流れから向き不向きまで — CasinoCallege', desc: 'カジノディーラーの1日のスケジュール、業務内容、必要なスキル、向き不向きを詳しく解説。' },
  '/blog/roulette-winning-strategy-truth':   { title: 'ルーレット必勝法の真実──なぜどの戦略も長期的には負けるのか — CasinoCallege', desc: 'ルーレットに必勝法は存在しない。マーチンゲール、逆マーチンゲール、ジェイムズボンドなど有名な戦略を数学的に検証する。' },
  '/blog/osaka-ir-dealer-demand':            { title: '大阪IR開業でディーラー需要が急増する理由 — CasinoCallege', desc: '2029-2030年開業予定の大阪IRによって数千人のディーラー需要が生まれる。その背景と準備すべきことを解説。' },
  '/blog/japan-ir-reality':                  { title: '大阪IRの本当の話──開業までに起きること — CasinoCallege', desc: '2029-2030年開業予定の大阪IR。楽観論と悲観論の間で、実際に何が起きるのか。元公務員の視点から分析する。' },
  '/blog/house-edge-complete-comparison':    { title: 'カジノ全ゲームのハウスエッジ完全比較 — CasinoCallege', desc: 'カジノにある全ての主要ゲームとベット種別のハウスエッジを一覧比較。どこが一番有利で、どこが一番儲かるのか。' },
  '/blog/dealer-women-career':               { title: '女性ディーラーとして働く──リアルな環境とキャリア — CasinoCallege', desc: 'カジノディーラーに女性は多い。女性ならではのメリット、気をつけるべきこと、キャリア形成を解説。' },
  '/blog/dealer-speed-training':             { title: 'ディーラーのスピードを上げる練習法──正確さを保ちながら速くなる — CasinoCallege', desc: 'ディーラーはスピードが命だが、正確さを犠牲にしてはいけない。効率的な練習方法で着実にスピードアップする方法を解説。' },
  '/blog/dealer-school-certification-guide': { title: 'ディーラースクールと資格の選び方 — CasinoCallege', desc: 'ディーラースクールの選び方と各種認定資格を解説。大阪IR開業が近づく2026年、スクール選びの基準は変わった。' },
  '/blog/dealer-salary-million-myth':        { title: 'カジノディーラー年収1000万の真実 — CasinoCallege', desc: '「ディーラーは年収1000万」という噂の真偽を検証。実際の給与データと、1000万を実現する条件を解説。' },
  '/blog/dealer-salary-guide':               { title: 'カジノディーラーの給与と年収のすべて — CasinoCallege', desc: 'カジノディーラーの給与体系、年収相場、チップの仕組みを徹底解説。' },
  '/blog/dealer-personality-guide':          { title: 'カジノディーラーに向いている人の性格とは — CasinoCallege', desc: 'カジノディーラーに必要な性格特性と適性を詳しく解説。自分に合っているか診断するチェックリスト付き。' },
  '/blog/dealer-no-experience-guide':        { title: '未経験からカジノディーラーになる方法 — CasinoCallege', desc: '未経験からカジノディーラーを目指す人のための完全ガイド。' },
  '/blog/dealer-is-it-tough':                { title: 'カジノディーラーの「きつい」を分解する──5つの現実 — CasinoCallege', desc: '立ち仕事、クレーム対応、夜勤、プレッシャー。ディーラーの「きつい」と言われる理由を分解し、それぞれの対策を解説。' },
  '/blog/dealer-hourly-wage-comparison':     { title: 'ディーラーの時給を全比較──世界と日本のリアル — CasinoCallege', desc: 'ラスベガス、マカオ、シンガポール、そして日本IRの推定ディーラー時給を比較。チップ込みの実質収入まで試算。' },
  '/blog/dealer-english-necessity':          { title: 'カジノディーラーに英語は必須なのか──3段階で考える — CasinoCallege', desc: 'カジノディーラーに求められる英語レベルを3段階で解説。場所やゲームによって必要なレベルが異なる。' },
  '/blog/dealer-certification-faq':          { title: 'カジノディーラー資格に関するFAQ — CasinoCallege', desc: 'カジノディーラーの資格や認定制度についてよくある質問をまとめた。' },
  '/blog/dealer-career-path-statistics':     { title: 'ディーラーのキャリアパス統計──何年でピットボスになれるのか — CasinoCallege', desc: 'ディーラーのキャリアステップと所要年数のデータ。給与の上がり方、スキル別の市場価値も分析。' },
  '/blog/dealer-career-change-30s':          { title: '30代からのディーラー転職──未経験でも間に合うのか — CasinoCallege', desc: '30代で未経験からカジノディーラーに転職する方法。年齢の壁、活かせる経験、学習計画を解説。' },
  '/blog/craps-rules-simple':                { title: 'クラップスのルールをわかりやすく──複雑に見えるけど実は単純 — CasinoCallege', desc: 'クラップスは難しそうに見えるが、基本の流れはシンプル。パスラインベットだけで遊ぶ方法から解説する。' },
  '/blog/craps-basics-complete':             { title: 'クラップスのルールとベット完全攻略 — CasinoCallege', desc: 'クラップスのルール、全ベット種、ペイアウト計算を完全解説。' },
  '/blog/chip-counting-practice':            { title: 'ディーラーのチップ計算練習法──暗算力を鍛える5つのドリル — CasinoCallege', desc: 'ディーラーに必須のチップ計算スキル。自宅でできる暗算練習ドリルを5つ紹介。ペイアウト計算を0.5秒でできるようになる方法。' },
  '/blog/casino-revenue-structure':          { title: 'カジノの収益構造──どこで誰が儲けているのか — CasinoCallege', desc: 'カジノの収益の内訳を解説。テーブルゲーム、スロット、ホテル、飲食。どの部門が一番儲かっていて、なぜなのか。' },
  '/blog/casino-glossary-complete':          { title: 'カジノ用語集【保存版】──ディーラー志望者が覚えるべき100語 — CasinoCallege', desc: 'カジノディーラーを目指す人が最初に覚えるべき厳選100語。ゲーム別・場面別に分類。初心者必携。' },
  '/blog/card-shuffling-methods':            { title: 'カードシャッフルの種類と練習方法──初心者からプロまで — CasinoCallege', desc: 'リフルシャッフル、ストリップシャッフル、ファローシャッフル。カジノディーラーが使うシャッフル技術の種類と練習方法を解説。' },
  '/blog/card-counting-for-beginners':       { title: 'カードカウンティング入門──初心者が知っておくべき基礎とリスク — CasinoCallege', desc: 'カードカウンティングの基本を初心者向けに解説。Hi-Lo方式の仕組み、練習方法、そしてカジノ側の対策まで。' },
  '/blog/blackjack-hand-signals-complete':   { title: 'ブラックジャックディーラーの手信号完全解説 — CasinoCallege', desc: 'ディーラーが使う全手信号を写真や図なしでテキストで完全解説。カメラに映す位置や注意点まで。' },
  '/blog/baccarat-tableau-master':           { title: 'バカラのタブローを完全暗記する方法 — CasinoCallege', desc: 'バカラのタブロー（3枚目のルール）を完全暗記するための効率的な学習法を解説。' },
  '/blog/rookie-dealer-first-day':           { title: '新人ディーラーの初日──現場は教えてくれない — CasinoCallege', desc: 'ディーラーになった人間の"初日"を描く。スクールでは教えてくれない、現場の空気と緊張と失敗。' },
  '/blog/dealer-sees-everything':            { title: 'ディーラーはすべてを見ている──あるカードカウンターの顛末 — CasinoCallege', desc: 'カードカウンティングを試みた客と、それに気づいたディーラーの駆け引き。実際にあった話を基にした再現ストーリー。' },
  '/blog/dealer-learning-time-analysis':     { title: 'ディーラーになるまで何時間かかるのか──学習時間の実態 — CasinoCallege', desc: 'CasinoCallegeの学習データから、ディーラーになるまでに必要な学習時間を分析。ゲーム別・スキル別の習得時間を公開。' },
  '/blog/dealer-interview-secrets':          { title: 'カジノディーラー面接の裏側──採用する側が見ているもの — CasinoCallege', desc: 'カジノ側はディーラーの面接で何を見ているのか。実際の採用基準と評価ポイントを業界関係者への取材基に解説。' },
  '/blog/casino-superstitions-and-legends':  { title: 'カジノの迷信と伝説──ディーラーが語る不思議な話 — CasinoCallege', desc: 'カジノには数え切れない迷信がある。ディーラーが実際に目撃した「不思議な出来事」を集めた。' },
  '/blog/casino-inside-after-hours':         { title: 'カジノの裏側──閉店後に何が起きているのか — CasinoCallege', desc: 'プレイヤーが知らないカジノの裏側。閉店後の業務、カウントルーム、セキュリティ。元公務員が調べたカジノの"役所仕事"的な側面。' },
  '/blog/casino-industry-japan-vs-world':    { title: '日本のカジノ業界は世界と何が違うのか — CasinoCallege', desc: '元公務員が調べた、日本と世界のカジノ業界の構造的な違い。規制、文化、教育、働き方まで。' },
  '/blog/casino-high-roller-story':          { title: 'ハイローラーという生き物──カジノが追う10億円の客 — CasinoCallege', desc: 'カジノが最も大切にする客「ハイローラー」。彼らの生態と、カジノ側の接待の実態を描く。' },
  '/blog/casino-first-time-experience':      { title: 'カジノに初めて行った日の話──元公務員の体験記 — CasinoCallege', desc: 'カジノ経験ゼロの元公務員が、ラスベガスのカジノに初めて足を踏み入れた日の話。期待と現実と気づき。' },
  '/blog/roulette-payout-master':            { title: 'ルーレットペイアウト計算完全マスター — CasinoCallege', desc: 'ルーレットの全18種類のベットとペイアウト計算を完全解説。暗算をマスターするコツも紹介。' },
  '/blog/dealers-mind-one-hand':             { title: 'ディーラーの頭の中: あるハンドの12秒 — CasinoCallege', desc: 'ディーラーが実際にブラックジャックの1ハンドで何を考え何を見てどう判断しているのか。地の文ゼロ、思考の独白だけで描く12秒間。' },
  '/blog/dealer-school-curriculum-inside':   { title: 'ディーラースクールのカリキュラム全部見せます — CasinoCallege', desc: 'ラスベガスとマカオのディーラースクールで実際に使われているカリキュラムを日本語で完全公開。「なぜこの順番なのか」の教育論も含めて解説する。' },
  '/blog/casino-terminology-100':            { title: 'カジノ用語100選 — CasinoCallege', desc: 'カジノで使われる必須用語100選をわかりやすく解説。初心者からディーラー志望者まで。' },
  '/blog/casino-school-comparison-2026':     { title: 'カジノスクール比較2026 — CasinoCallege', desc: '日本と海外の主なカジノディーラースクールを比較。料金、カリキュラム、特徴を徹底解説。' },
  '/blog/casino-rules-complete-guide':       { title: 'カジノルール完全ガイド — CasinoCallege', desc: 'ブラックジャック、ルーレット、バカラ、クラップス、ポーカーのルールを完全解説。' },
  '/blog/casino-dealer-guide-2026':          { title: 'カジノディーラーになるには？完全ガイド2026 — CasinoCallege', desc: 'カジノディーラーに必要なスキル、資格、給与相場、学習方法を完全網羅。' },
  '/blog/blackjack-dealer-basics':           { title: 'ブラックジャックディーラーの基本動作と手信号 — CasinoCallege', desc: 'ブラックジャックディーラーに必要な基本動作、手信号、進行手順を完全解説。' },
  '/blog/blackjack-basic-strategy':          { title: 'ブラックジャックのベーシックストラテジー完全解説 — CasinoCallege', desc: 'ブラックジャックのベーシックストラテジーを完全解説。ハード/ソフト/ペアの全パターン対応。' },
  '/blog/basic-strategy-japan-data':         { title: 'データで見えた「日本人がベーシックストラテジーで最も間違える手」TOP10 — CasinoCallege', desc: 'CasinoCallegeの学習データ1,247件を分析。日本人学習者がベーシックストラテジーのどの局面で間違えやすいのか、完全データで公開する。' },
}

function metaForPath(path: string): { title: string; desc: string } | null {
  const normalised = path.replace(/\/$/, '')
  if (ROUTES[normalised]) return ROUTES[normalised]
  if (normalised.startsWith('/quiz/')) return { title: `クイズ — CasinoCallege`, desc: 'カジノディーラー知識をチェックする無料クイズ。各Phaseごとの問題で理解度を確認。' }
  if (normalised.startsWith('/blog/')) return BLOG_ROUTES[normalised] || { title: 'ブログ — CasinoCallege', desc: 'カジノディーラー学習に役立つ情報を発信するCasinoCallege公式ブログ。' }
  return null
}

function injectMeta(html: string, path: string): string {
  const meta = metaForPath(path)
  if (!meta) return html

  const canonical = `https://casino-callege.pages.dev${path.replace(/\/$/, '') || '/'}`
  const ogImage = 'https://casino-callege.pages.dev/og-image.png'

  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.desc}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.desc}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.desc}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ].join('\n    ')

  return html
    .replace(/<title>.*?<\/title>/, tags)
    .replace(/<meta name="description" content="[^"]*"/, '')
    .replace(/<link rel="canonical"[^>]*\/>/, '')
}

export async function onRequest(context: { request: Request; env: { ASSETS: { fetch: (req: Request) => Promise<Response> } } }) {
  const { request, env } = context
  const url = new URL(request.url)

  const response = await env.ASSETS.fetch(request)
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('text/html')) return response

  const html = await response.text()
  const modified = injectMeta(html, url.pathname)

  return new Response(modified, {
    status: response.status,
    headers: response.headers,
  })
}

import { useState, useMemo } from 'react'
import { Search, X, BookOpen } from 'lucide-react'

const GLOSSARY_DATA: { term: string; category: string; definition: string }[] = [
  { term: 'Action', category: 'general', definition: '賭けられた総金額。カジノがVIP顧客の価値を評価する際の最重要指標。1時間に$10,000のactionがあるプレイヤーは高待遇を受ける。' },
  { term: 'Ante', category: 'poker', definition: '全プレイヤーがハンド開始前に強制的に支払うベット。ポットの種銭として機能する。BJの一部バリアントでも使われる。' },
  { term: 'Bankroll', category: 'general', definition: 'ギャンブルに充てる総資金。適切な管理（50-100倍のテーブルミニマムを推奨）が長期的な成功に不可欠。' },
  { term: 'Basic Strategy', category: 'blackjack', definition: 'BJにおける数学的に最適なプレイをまとめた戦略表。1956年にBaldwin, Cantey, Maisel, McDermottが最初に発表。全約340通りの手札×ディーラーアップカードの組み合わせを網羅。' },
  { term: 'Blackjack', category: 'blackjack', definition: 'A+10点札の組み合わせ。通常3:2で支払われる最強の手。発生確率はシングルデッキで約4.83%、6デッキで約4.75%。6:5テーブルでは回避すべき。' },
  { term: 'Boxman', category: 'craps', definition: 'クラップスでチップバンクの後ろに座り、全ディーラーを監督する従業員。唯一着席が許されるポジション。チップの色替えや高額ベットの承認も担当。' },
  { term: 'Burn Card', category: 'general', definition: '不正防止のため、コミュニティカード配布前に捨てる一番上のカード。BJでは最初の1枚、Pokerではフロップ・ターン・リバーの前に各1枚。' },
  { term: 'Bust', category: 'blackjack', definition: '手札の合計が21を超えること。即座に負け。プレイヤーが先にバーストした場合、ディーラーが後でバーストしても関係なく負け。これがBJのハウスエッジの中核。' },
  { term: 'Card Counting', category: 'blackjack', definition: '出たカードを記憶し残りのデッキの有利不利を判断する合法的技術。Hi-Loが最も一般的。カジノは出入り禁止で対応できるが逮捕は不可（ただし外部機器使用は違法）。' },
  { term: 'Chip', category: 'general', definition: 'カジノ内で現金の代わりに使う専用トークン。色別：白$1、赤$5、緑$25、黒$100、紫$500、橙$1,000。ルーレット専用チップは額面表記なし。' },
  { term: 'Come Bet', category: 'craps', definition: 'ポイント成立後に置けるパスラインと同機能のベット。次のロールが「ミニカムアウト」として扱われる。後方にオッズベットを付けられる。' },
  { term: 'Commission', category: 'general', definition: '特定のベットにかかる手数料。通常5%。バカラBankerベット、クラップスのBuy/Layベットに適用。一部カジノでは勝った時のみ徴収。' },
  { term: 'Croupier', category: 'general', definition: 'ディーラーのフランス語。語源は「馬の後ろに乗る人」で、元々はギャンブラーの後ろで予備資金を持つ人を指した。欧州ではルーレットディーラーを指すことが多い。' },
  { term: 'Cut Card', category: 'general', definition: 'シューの終了を示すプラスチックカード。最後の約1-1.5デッキ前に挿入される。到達したらそのハンド終了後にシャッフル。ペネトレーション管理に使用。' },
  { term: 'Dealer', category: 'general', definition: 'カジノでゲームの進行とベット管理を担当する従業員。テーブルゲームの顔。北米では最初にBJを、欧州ではルーレットを学ぶ。クラップスが最も高度なスキルを要する。' },
  { term: 'Deck', category: 'general', definition: 'トランプ1組（52枚）。BJでは1-8デッキ使用。バカラでは6-8デッキ。デッキ数の増加はハウスエッジの微増につながる。' },
  { term: 'Double Down', category: 'blackjack', definition: 'ベットを2倍にし追加1枚だけカードを引くアクション。10-11に10が来て20-21を作るのが最も強力な使い方。手信号は人差し指1本を立てる。' },
  { term: 'Don\'t Pass', category: 'craps', definition: 'パスラインの逆ベット。カムアウトの2-3で勝ち、12でプッシュ（地域により2でプッシュ）。ポイント成立後は7で勝ち。HE 1.36%でパスライン(1.41%)よりわずかに有利。' },
  { term: 'Drop', category: 'general', definition: 'カジノに持ち込まれた総現金額。ケージ（両替所）での入金総額で測定。ドロップ×ホールド率＝カジノ収益。経営分析の最重要指標の一つ。' },
  { term: 'En Prison', category: 'roulette', definition: 'フランス式ルーレットの特別ルール。0が出た場合に偶数マネーベットを次のスピンに「囚人」として保留。勝てば返却。HEを2.70%→1.35%に半減させる。' },
  { term: 'Expected Value (EV)', category: 'general', definition: '長期的に平均して得られる1ベットあたりの損益。EVがマイナスなら長期的に必ず負ける。カジノの全ゲームはEVがマイナスになるよう設計されている（オッズベット除く）。' },
  { term: 'Eye in the Sky', category: 'general', definition: '天井に設置された監視カメラシステム。全テーブルを24時間録画。手信号はこのカメラに見えるように行う必要がある。紛争解決と不正防止の最終手段。' },
  { term: 'Field Bet', category: 'craps', definition: 'ワンロールベット。2,3,4,9,10,11,12に賭ける。2と12にボーナス配当（通常2:1〜3:1）。2と12が両方3:1ならHE 0%の珍しいベットに。' },
  { term: 'Flop', category: 'poker', definition: 'テキサスホールデムで最初に配られる3枚のコミュニティカード。バーンカードを1枚捨ててから配る。多くのハンドの勝敗がここで大きく動く。' },
  { term: 'Hardway', category: 'craps', definition: '両方のダイスが同じ目で出ることに賭けるベット。Hard 4(2-2)、Hard 6(3-3)、Hard 8(4-4)、Hard 10(5-5)。7または「イージーウェイ」（異なる目）で負け。' },
  { term: 'Hit', category: 'blackjack', definition: 'カードをもう1枚引くこと。手信号はテーブルを指でトントンと叩く（フェイスアップ）またはカードをテーブルにこする（ハンドヘルド）。声より手信号が優先。' },
  { term: 'Hold Percentage', category: 'general', definition: 'ドロップ（持ち込まれた総現金）に対するカジノの収益割合。BJでは15-18%、スロットでは5-10%が標準。この数字がカジノ経営の健全性を示す。' },
  { term: 'Hole Card', category: 'blackjack', definition: 'ディーラーの伏せたカード。プレイヤーは見られない。アップカードが10かAの場合はディーラーが先に確認しBJなら即終了。ノーホールカードゲームでは配られない。' },
  { term: 'House Edge', category: 'general', definition: '各ベットに対するカジノの数学的優位性（%）。ゲームによって0%（クラップスオッズ）〜35%（キノ）まで大きく異なる。これがカジノ収益の源泉。詳しくは数学リファレンス参照。' },
  { term: 'Insurance', category: 'blackjack', definition: 'ディーラーがAを示した場合のみ提供されるサイドベット。ディーラーBJで2:1支払い。6デッキでBJ確率30.8%（必要な勝率33.3%に届かない）→基本戦略では絶対に取らない。' },
  { term: 'Kelly Criterion', category: 'general', definition: '最適なベットサイズを決定する数式。f*=(bp-q)/b。アドバンテージが正の場合に破産確率を最小化しつつ成長率を最大化。実践では1/2または1/4ケリーが推奨される。' },
  { term: 'Martingale', category: 'general', definition: '負けるたびにベット額を2倍にする古典的ベットシステム。$5→$10→$20→$40→$80→$160→$320。7連敗で$635の損失。テーブルリミットと有限バンクロールにより長期的に破綻。期待値を変えられない。' },
  { term: 'Natural', category: 'general', definition: '最初のカードで自動勝ち。BJ=A+10点札、クラップス=カムアウト7/11、バカラ=2枚で8か9。ナチュラルが出ると即座にそのハンド/ラウンドが終了する。' },
  { term: 'Odds Bet', category: 'craps', definition: 'パスライン/カムの後方に追加するベット。ハウスエッジ0%の真にフェアな賭け。3-4-5Xオッズでポイント4/10=3倍、5/9=4倍、6/8=5倍。クラップスの最重要ベット。' },
  { term: 'Pass Line', category: 'craps', definition: 'クラップスの基本ベット。カムアウトで7/11=勝、2/3/12=負、それ以外=ポイント成立。ポイント後に同値が出れば勝、7が出ればセブンアウト（負+シューター交代）。HE 1.41%。' },
  { term: 'Payout', category: 'general', definition: '勝ちベットに対する支払い。比率表示（例: 3:2は$10賭けて$15の賞金+元本で$25戻り）。BJ 3:2が伝統的だが、6:5テーブルが増加中（HE約1.4%悪化）。' },
  { term: 'Pit Boss', category: 'general', definition: '複数テーブルを監督する中間管理職。クレーム対応・VIP承認・高額ベット承認・コンプ発行権限を持つ。ディーラーからの昇進ポジション。年収$40,000〜$70,000。' },
  { term: 'Point', category: 'craps', definition: 'カムアウトロールで確定する数字（4,5,6,8,9,10）。パックを「ON」にしてポイント番号に置く。以後は「ポイント再現で勝ち」「7でセブンアウト」。平均3.38ロールで決着。' },
  { term: 'Push', category: 'general', definition: '引き分け。賭けたチップがそのまま返却される。BJのプッシュ確率は約8.5%。クラップスのドントパスでは12（または2）でプッシュ。' },
  { term: 'Rake', category: 'poker', definition: 'ポーカーの各ポットからカジノが徴収する手数料。キャッシュゲームでは通常5%（上限$3-5）。トーナメントでは参加費の一部。これがポーカールームの収益源。' },
  { term: 'Risk of Ruin', category: 'general', definition: '所定のバンクロール・ベットサイズ・ゲーム条件で無限にプレイした場合に破産する確率。計算式: R≈exp(-2×EV×B/σ²)。200ベットでBJ基本戦略は約13.5%のRoR。' },
  { term: 'RTP', category: 'slots', definition: 'Return to Player（プレイヤー還元率）。スロットマシンの設定値で、RTP 95%=長期平均で$100賭けて$95戻る。HE=100%-RTP。州法で最低値規制あり（NV75%、NJ83%）。' },
  { term: 'Shoe', category: 'blackjack', definition: '複数デッキのカードを収納し1枚ずつ押し出して配る器具。4-8デッキ収納。連続シャッフルマシン（CSM）はこの代替。ペネトレーション（カット位置）でカウンティング難易度が変わる。' },
  { term: 'Shooter', category: 'craps', definition: 'クラップスで現在サイコロを振っているプレイヤー。パスラインまたはドントパスへのベットが必須。片手で投げ、両ダイスを同時に、向こう側の壁に当てる必要がある。' },
  { term: 'Split', category: 'blackjack', definition: 'ペアを2つの独立した手に分けるアクション。ベットを同額追加。A-Aは常にスプリット（BJチャンス2倍）、10-10は絶対にスプリットしない（既に20）。手信号はVサイン。' },
  { term: 'Stand', category: 'blackjack', definition: 'カードをこれ以上引かないこと。手信号は手のひらを水平に振る（フェイスアップ）またはカードをチップの下にスライド（ハンドヘルド）。17以上は基本スタンド。' },
  { term: 'Stickman', category: 'craps', definition: 'クラップス中央に立つ従業員。湾曲したスティックでダイスを操作、出目を独特の口調で宣告、センターベット（プロップベット）を管理。最もおしゃべりなポジション。' },
  { term: 'Straight Up', category: 'roulette', definition: '単一の番号に賭けるルーレットベット。35:1の配当。勝率は2.63%（US）/2.70%（EU）。チップは番号のマスの中に置く必要がある。' },
  { term: 'Surrender', category: 'blackjack', definition: '最初の2枚でベットの半分を放棄してハンド終了。Late Surrender（HE 0.08%改善）が一般的。Early Surrender（極めてレア）はHE 0.24%改善。16vs10の最適解。' },
  { term: 'Tableau', category: 'baccarat', definition: 'プントバンコで3枚目のカードを引くか否かを決める固定ルール表。プレイヤーの意思は一切介在しない純粋な運ゲーの根幹。ディーラーはこれを完全暗記する必要がある。' },
  { term: 'Tilt', category: 'general', definition: '(1)スロットマシンの異常/故障状態。(2)ポーカーで感情的に判断を誤る状態。語源は昔の機械式スロットの傾きセンサー。感情的tiltはポーカー最大のバンクロール破壊要因。' },
  { term: 'True Count', category: 'blackjack', definition: 'Running Count÷残りデッキ数。この値で実際のプレイヤー有利度を判断。TC+1あたり約+0.5%のアドバンテージ。TC+2以上で増額、0以下で最小ベットが基本戦術。' },
  { term: 'Vigorish (Vig)', category: 'general', definition: '特定のベットにかかる手数料の別名。バカラBankerの5%、スポーツベットの10%が代表的。語源はロシア語の「勝ち」から来たという説がある。' },
  { term: 'Volatility', category: 'general', definition: '結果のブレ幅を示す統計量。高ボラティリティ=短期的に大きな勝ち負け。BJ（基本戦略）は中程度、ストレートアップルーレットは超高ボラティリティ。リスク許容度で選ぶ。' },
  { term: 'Whale', category: 'general', definition: '1回のセッションで$100,000以上のクレジットラインを持つ超VIP。専任ホスト、プライベートジェット、ペントハウススイート、負けた場合のリベート交渉など最高待遇を受ける。' },
  { term: 'Zero (0)', category: 'roulette', definition: 'ルーレットの緑のポケット。EUは1つのゼロ（37ポケット、HE2.70%）、USは0+00（38ポケット、HE5.26%）、トリプルゼロ（39ポケット、HE7.69%）も存在。' },
  { term: 'All-In', category: 'poker', definition: '手持ちの全チップを賭けること。オールイン後にサイドポットが発生する。ノーリミットホールデムの最大の武器であり最大のリスク。' },
  { term: 'Baccarat', category: 'baccarat', definition: '世界最大のカジノゲーム。マカオ収入の91%を占める。プントバンコ（運ゲー）が最も一般的。プレイヤーはPlayer/Banker/Tieの3択のみ。タブローで3枚目ドローが自動決定。' },
  { term: 'Bluff', category: 'poker', definition: '弱い手で強気にベット/レイズして相手をフォールドさせる戦術。成功率は相手の傾向×ボードテクスチャ×自分のテーブルイメージで決まる。頻度のバランスが重要。' },
  { term: 'Cage', category: 'general', definition: 'カジノ内の金庫・両替所。現金↔チップの交換、高額当選金の支払い、クレジット（マーカー）の発行を行う。厳重なセキュリティの下で運営される。' },
  { term: 'Cash Game', category: 'poker', definition: 'チップが現金と等価のポーカーゲーム。いつでも参加・退出可能。トーナメントと異なり、チップを失うと買い足せる（リバイ）。レーキがカジノの収益源。' },
  { term: 'Comp', category: 'general', definition: 'Complimentary（無料サービス）。カジノが優良顧客に提供する部屋・食事・ショーチケット等。一般的に理論損失の30-40%相当がコンプとして還元される。' },
  { term: 'CSM', category: 'blackjack', definition: 'Continuous Shuffling Machine（連続シャッフルマシン）。使用済みカードを即座に再シャッフルする装置。カードカウンティングを完全に無効化するが、プレイ速度も向上させる。' },
  { term: 'Candle', category: 'slots', definition: 'スロットマシン上部のランプ。点灯パターンで「両替必要」「ジャックポット当選」「トラブル発生」等を知らせる。色と点滅速度で意味が異なる。' },
  { term: 'DAS', category: 'blackjack', definition: 'Double After Split（スプリット後のダブルダウン許可）。許可されているとHEが約0.14%改善しプレイヤー有利。戦略表で「DAS可」「DAS不可」を区別する重要ルール。' },
  { term: 'Dragon 7', category: 'baccarat', definition: 'EZ Baccaratのサイドベット。Bankerが3枚目を引いて合計7で勝った場合、40:1の配当。Banker本来の勝ちはプッシュになる代わりにこの高配当ベットが追加される。' },
  { term: 'Draw', category: 'poker', definition: '(1)カードを引くこと。(2)完成していない手のこと。フラッシュドロー（9アウツ）、ストレートドロー（8アウツ）、ガットショット（4アウツ）など。ドローを追うかどうかはポットオッズで判断。' },
  { term: 'Edge Sorting', category: 'general', definition: 'カードの裏面印刷の僅かなズレを利用して特定カードを識別する技術。2012年Phil Iveyがバカラで約$20M獲得→訴訟敗訴。カジノはカードのランダムローテーションで対策。' },
  { term: 'H17', category: 'blackjack', definition: 'Dealer Hits Soft 17（ディーラーがソフト17でヒットする）。S17よりHEが約0.22%悪化しカジノ有利。多くの低額テーブルはH17を採用。テーブルフェルトに記載がある。' },
  { term: 'Hard Hand', category: 'blackjack', definition: 'Aがない、またはAが1としてしか数えられない手。Hard 12-16が基本戦略で最も判断が難しいゾーン。特に16 vs 10はサレンダー→ヒット→スタンドの順で不利。' },
  { term: 'Hardway', category: 'craps', definition: '両方のダイスが同じ目で出ることに賭けるベット。Hard 4(2-2), 6(3-3), 8(4-4), 10(5-5)。7またはイージーウェイ（異なる目での同じ合計）で負け。HE 2.78%（US）。' },
  { term: 'Impound', category: 'general', definition: 'バカラでBankerベットのコミッションが未払いのまま保留される状態。コミッションランプに表示され、精算時にまとめて支払う。アジアVIPに多い運用方式。' },
  { term: 'Inside Bet', category: 'roulette', definition: '番号に直接賭けるルーレットベットの総称。ストレートアップ(35:1)、スプリット(17:1)、ストリート(11:1)、コーナー(8:1)、シックスライン(5:1)。配当は高いが勝率は低い。' },
  { term: 'Jackpot', category: 'slots', definition: 'スロットマシンの最高賞金。固定ジャックポットとプログレッシブ（複数台リンクで賞金が積み上がる）がある。当選確率は数千万〜数億分の1。' },
  { term: 'Keno', category: 'general', definition: '1〜80の数字から選び、抽選で当たりを決める数当てゲーム。カジノゲーム中最大のハウスエッジ（最大35%）。中国起源で、マカオやラスベガスに専用ラウンジがある。' },
  { term: 'Kicker', category: 'poker', definition: '勝敗を決めるサイドカード。例: 両者ともA-Aを持っている場合、キッカー（5枚目のカード）で勝敗が決まる。A-A-K（キッカーK）はA-A-Q（キッカーQ）に勝つ。' },
  { term: 'La Partage', category: 'roulette', definition: 'フランス式ルーレットルール。0が出た場合に偶数マネーベットの半分を返却。En Prisonと同様にHEを1.35%に低下させる。フランス語で「分担」の意。' },
  { term: 'Marker', category: 'general', definition: '(1)カジノが発行する短期信用（借金）。30日以内の返済が必要。(2)ルーレットで勝ち番号に置くドーリー（目印）。高額プレイヤーはマーカー（信用枠）の大きさがステータス。' },
  { term: 'Muck', category: 'poker', definition: '(1)フォールドしたカードを捨てる山。(2)ショーダウンでカードを見せずに捨てること。負けを認める行為だが、相手のハンドを見る権利を放棄することにもなる。' },
  { term: 'Natural', category: 'general', definition: '最初のカードで自動勝ちとなる手。BJの21（A+10）、クラップスのカムアウト7/11、バカラの8/9。ナチュラルが出たら即座にそのラウンドが終了し、3枚目は引かれない。' },
  { term: 'Outside Bet', category: 'roulette', definition: '番号のグループに賭けるルーレットベットの総称。赤/黒、奇数/偶数、1-18/19-36（配当1:1）、ダズン/カラム（配当2:1）。勝率は高い（最大48.6%）が配当は低い。' },
  { term: 'Pai Gow', category: 'general', definition: '中国発祥のドミノゲーム。Pai Gow Pokerはこれをトランプにアレンジした米国生まれのゲーム。7枚を5枚+2枚に分割。バンカーが「ハウスウェイ」という固定ルールで手を組む。' },
  { term: 'Palette', category: 'baccarat', definition: 'バカラでカードをプレイヤーに届けるための木製ヘラ。特に高額テーブルで使用。ディーラーが直接手を伸ばさず、エレガントにカードを配るための道具。' },
  { term: 'Penetration', category: 'blackjack', definition: 'シューのカードのうち、シャッフル前に使用される割合。75%ペネ=6デッキ中4.5デッキ使用。深いペネほどカードカウンターに有利。浅いペネはカジノの対策。' },
  { term: 'Place Bet', category: 'craps', definition: '特定のポイントナンバーに直接賭けるベット。6/8（7:6, HE0.46%）が最も有利。5/9（7:5, HE1.11%）、4/10（9:5, HE1.67%）。プレイス6/8は$6単位で賭ける。' },
  { term: 'Position', category: 'poker', definition: 'テーブルでの座る位置。Button（最終行動）が最も有利、Small Blind（最初に行動）が最も不利。ポジションによってプレイできるハンドの範囲が変わる。' },
  { term: 'Pot Odds', category: 'poker', definition: 'コール額÷(ポット+コール額)。この確率より高い勝率があればコールが長期的にプラスEV。例: $50コールでポット$100→$50/$150=33.3%以下の勝率ならフォールド。' },
  { term: 'Progressive', category: 'slots', definition: '複数台または複数カジノがリンクしたスロットで、ジャックポットがプレイのたびに積み上がる方式。Mega Millions、Megabucksなど数百万〜数千万ドルに達することも。' },
  { term: 'Prop Bet', category: 'craps', definition: 'Proposition Bet（プロポジションベット）の略。1ロールで決着するセンターベット。Any 7（HE16.67%）、Any Craps（HE11.11%）など。最もハウスエッジが高く避けるべきベット群。' },
  { term: 'Rainbow', category: 'poker', definition: 'フロップの3枚がすべて異なるスートであること。レインボーボードではフラッシュドローの可能性がなく、ハンドの読みが変わる。' },
  { term: 'River', category: 'poker', definition: 'テキサスホールデムの5枚目で最後のコミュニティカード。リバー後は最後のベッティングラウンド。ここで勝敗が決まることが多い。「リバーされる」=最後の1枚で逆転される。' },
  { term: 'Running Count', category: 'blackjack', definition: 'Hi-Loカウンティングで出たカードの合計値。2-6=+1, 7-9=0, 10-A=-1。次のステップでTrue Countに変換。最初は0からスタート（バランスカウントの場合）。' },
  { term: 'S17', category: 'blackjack', definition: 'Dealer Stands on Soft 17（ディーラーがソフト17でスタンドする）。H17よりHEが約0.22%改善しプレイヤー有利。高額テーブルに多い。戦略表の一部がH17と異なる。' },
  { term: 'Scatter', category: 'slots', definition: '特定のリールやラインに関係なく、どこに出ても有効なスロットのシンボル。フリースピンのトリガーとして使われることが多い。通常3つ以上のスキャッターでボーナス発動。' },
  { term: 'Seven-Out', category: 'craps', definition: 'ポイント成立後にシューターが7を出すこと。全パスラインベットが負け、ドントパスが勝ち、ダイスが次のシューターに移動する。クラップスの最もドラマチックな瞬間。' },
  { term: 'Showdown', category: 'poker', definition: '最終ベッティングラウンド終了後に残ったプレイヤーがハンドを公開し勝者を決める段階。通常は最後にレイズしたプレイヤーから公開。負けたハンドはマックしてもよい。' },
  { term: 'Sic Bo', category: 'general', definition: '中国発祥の大小（ダイス3個）ゲーム。出目の合計や特定の組み合わせに賭ける。マカオで人気。バカラに次ぐアジア主要ゲーム。HEはベットにより2.78%〜30%超。' },
  { term: 'Side Pot', category: 'poker', definition: 'プレイヤーがオールインした後に残ったプレイヤー間で発生する追加ポット。オールインプレイヤーはメインポットのみ獲得可能で、サイドポットの対象外。' },
  { term: 'Squeeze', category: 'baccarat', definition: 'バカラでカードを1枚ずつゆっくりめくりながら見るVIPの習慣。縁起担ぎとエンターテインメントの要素。ディーラーは急かさず待つことがアジアVIP対応の基本。' },
  { term: 'Stack', category: 'general', definition: 'チップ20枚の山。ディーラーはこのスタックを素早く10枚ずつに分割できる必要がある。基本単位のため、カットやカウントはすべてスタック単位で行われる。' },
  { term: 'Straddle', category: 'poker', definition: 'ビッグブラインドの左隣のプレイヤーが、カードを見る前にブラインドの2倍を自発的に賭ける行為。実質的に「3つ目のブラインド」として機能し、ゲームを大きくする効果がある。' },
  { term: 'Suit', category: 'general', definition: 'トランプの4種類のマーク（♠スペード、♥ハート、♦ダイヤ、♣クラブ）。BJやバカラではスートはゲームに影響しない。ポーカーでのみフラッシュ条件として使用。' },
  { term: 'Three Card Poker', category: 'general', definition: '1994年Derek Webb考案。3枚のポーカーで手早く遊べる。ディーラーQハイ以上でクオリファイ。独自のハンドランキング（ストレートフラッシュ=0.22%が最強）。' },
  { term: 'TITO', category: 'slots', definition: 'Ticket-In Ticket-Out。紙チケットをスロットに挿入し、終了時にチケットで払い出す方式。現金不要でセキュリティ向上。現代のスロットマシンの標準方式。' },
  { term: 'Tournament', category: 'poker', definition: '参加費を払い全員が同じチップでスタートするポーカー大会。ブラインドが段階的に上がり、最後の1人になるまで続く。WSOPメインイベントが最も有名。' },
  { term: 'Turn', category: 'poker', definition: 'テキサスホールデムの4枚目のコミュニティカード。ターンで勝敗が大きく動くことが多い。ベット額はプリフロップ/フロップの2倍になる（リミットゲームの場合）。' },
  { term: 'Upcard', category: 'blackjack', definition: 'ディーラーの表向きのカード。全プレイヤーに見えている。基本戦略の判断はこのアップカードと自分の手札の組み合わせで決まる。最も重要な一枚。' },
  { term: 'Voisins du Zero', category: 'roulette', definition: 'フレンチベットの一つ。「ゼロの隣人」の意。0の両隣の17数字をカバー。9枚のチップを特定の配置で置く。0-2-3トリオ、4つのスプリット、1つのコーナーベットから成る。' },
  { term: 'Wash', category: 'general', definition: '(1)新カードをテーブルに広げて混ぜる初期シャッフル技法。(2)不着な勝ち金をチップとして渡すことで、帳簿上の辻褄を合わせる違法行為（マネーロンダリング手法）。' },
  { term: 'Wild Symbol', category: 'slots', definition: '他のシンボルの代わりになる万能シンボル。ただしスキャッターやジャックポットシンボルの代わりにならない場合が多い。ジョーカーと同じ概念。' },
  { term: 'Yo', category: 'craps', definition: '11（イレブン）のクラップス用語。「seven（セブン）」と聞き間違えないように「Yo-leven」と発音する。カムアウトではナチュラルでパスラインが勝つ。' },
]

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'general', label: 'General' },
  { key: 'blackjack', label: 'Blackjack' },
  { key: 'roulette', label: 'Roulette' },
  { key: 'craps', label: 'Craps' },
  { key: 'poker', label: 'Poker' },
  { key: 'baccarat', label: 'Baccarat' },
  { key: 'slots', label: 'Slots & Tech' },
]

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() =>
    GLOSSARY_DATA.filter(t => {
      if (category !== 'all' && t.category !== category) return false
      if (search && !t.term.toLowerCase().includes(search.toLowerCase()) && !t.definition.includes(search)) return false
      return true
    }),
    [search, category]
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={24} className="text-casino-gold" />
        <h1 className="text-2xl font-bold text-white">用語集 (Glossary)</h1>
        <span className="text-xs text-casino-muted bg-casino-card px-2 py-1 rounded">{GLOSSARY_DATA.length} terms</span>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-casino-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-9 pr-8 py-2.5 bg-casino-card border border-casino-border rounded-lg text-white text-sm placeholder:text-casino-muted/50 focus:outline-none focus:border-casino-gold/50"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-casino-muted hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${category === c.key ? 'bg-casino-gold/20 text-casino-gold border border-casino-gold/30' : 'bg-casino-card border border-casino-border text-casino-muted hover:text-white'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="grid gap-2">
        {filtered.map(t => (
          <div key={t.term} className="bg-casino-card rounded-lg p-4 border border-casino-border hover:border-casino-gold/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white text-sm">{t.term}</span>
              <span className="text-[10px] text-casino-gold bg-casino-gold/10 px-1.5 py-0.5 rounded uppercase">{t.category}</span>
            </div>
            <p className="text-sm text-casino-muted leading-relaxed">{t.definition}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-casino-muted py-12">No terms found for your search.</p>
      )}
    </div>
  )
}

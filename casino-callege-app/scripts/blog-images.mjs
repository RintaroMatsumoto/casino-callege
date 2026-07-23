export function heroForCategory(category, slug) {
  const images = {
    'キャリア': careerHero(),
    'ブラックジャック': blackjackHero(),
    'ルーレット': rouletteHero(),
    'クラップス': crapsHero(),
    'バカラ': baccaratHero(),
    'ポーカー': pokerHero(),
    '業界情報': industryHero(),
    '基礎知識': basicsHero(),
    '語学・スキル': englishHero(),
  }
  return images[category] || defaultHero(slug)
}

function svg(tag, content) {
  const encoded = Buffer.from(content).toString('base64')
  return `data:image/svg+xml;base64,${encoded}`
}

function careerHero() {
  return svg('career', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">CASINO DEALER</text>
  <text x="400" y="105" text-anchor="middle" fill="#888" font-size="11" letter-spacing="2">PROFESSIONAL CAREER GUIDE</text>
  <line x1="300" y1="120" x2="500" y2="120" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <rect x="280" y="150" width="80" height="50" rx="4" fill="rgba(34,197,94,0.15)" stroke="#22c55e" stroke-width="1"/><text x="320" y="178" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">CAREER</text>
  <rect x="380" y="150" width="80" height="50" rx="4" fill="rgba(244,168,29,0.1)" stroke="#f4a81d" stroke-width="1"/><text x="420" y="178" text-anchor="middle" fill="#f4a81d" font-size="10" font-weight="bold">SALARY</text>
  <rect x="480" y="150" width="80" height="50" rx="4" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/><text x="520" y="178" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="bold">SKILLS</text>
  <rect x="330" y="220" width="100" height="50" rx="4" fill="rgba(244,168,29,0.1)" stroke="rgba(244,168,29,0.3)" stroke-width="1"/><text x="380" y="246" text-anchor="middle" fill="#f4a81d" font-size="10" font-weight="bold">INTERVIEW</text>
  <rect x="450" y="220" width="100" height="50" rx="4" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" stroke-width="1"/><text x="500" y="246" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="bold">CERTIFY</text>
  <circle cx="400" cy="270" r="3" fill="#f4a81d"/>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function blackjackHero() {
  return svg('blackjack', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg1)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">♠ ♥ ♣ ♦</text>
  <text x="400" y="110" text-anchor="middle" fill="#f4a81d" font-size="14" font-weight="bold">BLACKJACK</text>
  <text x="400" y="130" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">21 — THE KING OF CASINO GAMES</text>
  <line x1="280" y1="145" x2="520" y2="145" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <rect x="300" y="170" width="48" height="68" rx="3" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/><text x="324" y="192" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">A</text><text x="324" y="208" text-anchor="middle" fill="#ef4444" font-size="9">♥</text>
  <rect x="356" y="170" width="48" height="68" rx="3" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/><text x="380" y="192" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">K</text><text x="380" y="208" text-anchor="middle" fill="#e2e8f0" font-size="9">♠</text>
  <rect x="412" y="165" width="48" height="68" rx="3" fill="#1e293b" stroke="#f4a81d" stroke-width="1.5"/><text x="436" y="187" text-anchor="middle" fill="#f4a81d" font-size="14" font-weight="bold">?</text><text x="436" y="203" text-anchor="middle" fill="#f4a81d" font-size="9">?</text>
  <rect x="468" y="170" width="48" height="68" rx="3" fill="#0a0a14" stroke="#555" stroke-width="1"/><text x="492" y="192" text-anchor="middle" fill="#555" font-size="14">?</text>
  <text x="400" y="280" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">Dealer must draw to 16, stand on 17</text>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function rouletteHero() {
  return svg('roulette', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg2)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <circle cx="400" cy="170" r="80" fill="none" stroke="#f4a81d" stroke-width="2"/>
  <circle cx="400" cy="170" r="75" fill="none" stroke="rgba(244,168,29,0.2)" stroke-width="1"/>
  <circle cx="400" cy="170" r="50" fill="none" stroke="#334155" stroke-width="1"/>
  <circle cx="400" cy="170" r="20" fill="none" stroke="#f4a81d" stroke-width="1"/>
  <text x="400" y="174" text-anchor="middle" fill="#f4a81d" font-size="9">0</text>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">ROULETTE</text>
  <text x="400" y="100" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">WHERE FORTUNE SPINS</text>
  <line x1="340" y1="110" x2="460" y2="110" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <text x="310" y="320" text-anchor="middle" fill="#ef4444" font-size="20">🔴</text>
  <text x="400" y="320" text-anchor="middle" fill="#e2e8f0" font-size="20">⚫</text>
  <text x="490" y="320" text-anchor="middle" fill="#16a34a" font-size="20">🟢</text>
  <text x="400" y="355" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function crapsHero() {
  return svg('craps', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg3)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">CRAPS</text>
  <text x="400" y="100" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">THE MOST EXCITING GAME IN THE CASINO</text>
  <line x1="280" y1="115" x2="520" y2="115" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <rect x="300" y="140" width="60" height="60" rx="8" fill="rgba(244,168,29,0.08)" stroke="rgba(244,168,29,0.2)" stroke-width="1"/><text x="330" y="168" text-anchor="middle" fill="#e2e8f0" font-size="20">⚀</text><text x="330" y="188" text-anchor="middle" fill="#888" font-size="9">DICE</text>
  <rect x="380" y="140" width="60" height="60" rx="8" fill="rgba(244,168,29,0.08)" stroke="rgba(244,168,29,0.2)" stroke-width="1"/><text x="410" y="168" text-anchor="middle" fill="#e2e8f0" font-size="20">⚂</text><text x="410" y="188" text-anchor="middle" fill="#888" font-size="9">Come Out</text>
  <rect x="460" y="140" width="60" height="60" rx="8" fill="rgba(244,168,29,0.08)" stroke="rgba(244,168,29,0.2)" stroke-width="1"/><text x="490" y="168" text-anchor="middle" fill="#e2e8f0" font-size="20">⚄</text><text x="490" y="188" text-anchor="middle" fill="#888" font-size="9">Point</text>
  <rect x="300" y="220" width="60" height="40" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" stroke-width="1"/><text x="330" y="244" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">Pass</text>
  <rect x="380" y="220" width="60" height="40" rx="4" fill="rgba(244,168,29,0.08)" stroke="rgba(244,168,29,0.3)" stroke-width="1"/><text x="410" y="244" text-anchor="middle" fill="#f4a81d" font-size="11" font-weight="bold">Don't</text>
  <rect x="460" y="220" width="60" height="40" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/><text x="490" y="244" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">Odds</text>
  <text x="400" y="310" text-anchor="middle" fill="#22c55e" font-size="11">7 out ✦ Natural ✦ Point Established</text>
  <text x="400" y="340" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function baccaratHero() {
  return svg('baccarat', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg4)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">BACCARAT</text>
  <text x="400" y="100" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">PUNTO BANCO — THE MACAU GIANT</text>
  <line x1="290" y1="115" x2="510" y2="115" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <rect x="250" y="140" width="60" height="80" rx="4" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/><text x="280" y="175" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">K</text><text x="280" y="190" text-anchor="middle" fill="#ef4444" font-size="10">♥</text>
  <rect x="320" y="140" width="60" height="80" rx="4" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/><text x="350" y="175" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">8</text><text x="350" y="190" text-anchor="middle" fill="#e2e8f0" font-size="10">♠</text>
  <rect x="400" y="130" width="60" height="80" rx="4" fill="#1e293b" stroke="#f4a81d" stroke-width="1.5"/><text x="430" y="165" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold">?</text><text x="430" y="180" text-anchor="middle" fill="#f4a81d" font-size="10">?</text>
  <rect x="470" y="140" width="60" height="80" rx="4" fill="#0a0a14" stroke="#555" stroke-width="1"/><text x="500" y="175" text-anchor="middle" fill="#555" font-size="16">?</text>
  <text x="400" y="260" text-anchor="middle" fill="#f4a81d" font-size="12">Player 0+4=4  vs  Banker 5+2=7</text>
  <text x="400" y="280" text-anchor="middle" fill="#22c55e" font-size="10">Banker wins — Commission 5%</text>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function pokerHero() {
  return svg('poker', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg5)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">POKER</text>
  <text x="400" y="100" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">TEXAS HOLD'EM — ALL YOU NEED IS A PAIR</text>
  <line x1="280" y1="115" x2="520" y2="115" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <text x="400" y="200" text-anchor="middle" fill="#e2e8f0" font-size="40" font-family="serif">♠</text>
  <text x="400" y="265" text-anchor="middle" fill="#ef4444" font-size="30" font-family="serif">♥</text>
  <text x="400" y="160" text-anchor="middle" fill="#f4a81d" font-size="11">Royal Flush: A♠ K♠ Q♠ J♠ 10♠</text>
  <text x="400" y="295" text-anchor="middle" fill="#888" font-size="10">Full House &gt; Flush &gt; Straight</text>
  <text x="400" y="320" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function industryHero() {
  return svg('industry', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg6)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">CASINO INDUSTRY</text>
  <text x="400" y="105" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">JAPAN INTEGRATED RESORTS 2029-2030</text>
  <line x1="250" y1="120" x2="550" y2="120" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <text x="400" y="170" text-anchor="middle" fill="#22c55e" font-size="28" font-weight="bold">OSAKA IR</text>
  <text x="400" y="200" text-anchor="middle" fill="#888" font-size="12">MGM ✦ ORIX ✦ Yumeshima</text>
  <rect x="250" y="230" width="80" height="40" rx="4" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.2)" stroke-width="1"/><text x="290" y="254" text-anchor="middle" fill="#f4a81d" font-size="20" font-weight="bold">3K+</text><text x="290" y="268" text-anchor="middle" fill="#555" font-size="8">Jobs Created</text>
  <rect x="360" y="230" width="80" height="40" rx="4" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" stroke-width="1"/><text x="400" y="254" text-anchor="middle" fill="#3b82f6" font-size="20" font-weight="bold">'29</text><text x="400" y="268" text-anchor="middle" fill="#555" font-size="8">Target Year</text>
  <rect x="470" y="230" width="80" height="40" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.2)" stroke-width="1"/><text x="510" y="254" text-anchor="middle" fill="#22c55e" font-size="20" font-weight="bold">¥1T</text><text x="510" y="268" text-anchor="middle" fill="#555" font-size="8">Investment</text>
  <text x="400" y="320" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function basicsHero() {
  return svg('basics', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg7)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">CASINO BASICS</text>
  <text x="400" y="105" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">EVERYTHING YOU NEED TO KNOW</text>
  <line x1="280" y1="120" x2="520" y2="120" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <rect x="150" y="150" width="80" height="60" rx="6" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.15)" stroke-width="1"/><text x="190" y="178" text-anchor="middle" fill="#f4a81d" font-size="22">🃏</text><text x="190" y="198" text-anchor="middle" fill="#888" font-size="9">Cards</text>
  <rect x="250" y="150" width="80" height="60" rx="6" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.15)" stroke-width="1"/><text x="290" y="178" text-anchor="middle" fill="#f4a81d" font-size="22">🎡</text><text x="290" y="198" text-anchor="middle" fill="#888" font-size="9">Roulette</text>
  <rect x="350" y="150" width="80" height="60" rx="6" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.15)" stroke-width="1"/><text x="390" y="178" text-anchor="middle" fill="#f4a81d" font-size="22">🎲</text><text x="390" y="198" text-anchor="middle" fill="#888" font-size="9">Dice</text>
  <rect x="450" y="150" width="80" height="60" rx="6" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.15)" stroke-width="1"/><text x="490" y="178" text-anchor="middle" fill="#f4a81d" font-size="22">♠️</text><text x="490" y="198" text-anchor="middle" fill="#888" font-size="9">Poker</text>
  <rect x="550" y="150" width="80" height="60" rx="6" fill="rgba(244,168,29,0.06)" stroke="rgba(244,168,29,0.15)" stroke-width="1"/><text x="590" y="178" text-anchor="middle" fill="#f4a81d" font-size="22">💎</text><text x="590" y="198" text-anchor="middle" fill="#888" font-size="9">Baccarat</text>
  <text x="400" y="260" text-anchor="middle" fill="#555" font-size="10">House Edge ✦ Payouts ✦ Rules ✦ Strategies</text>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function englishHero() {
  return svg('english', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg8)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="80" text-anchor="middle" fill="#f4a81d" font-size="16" font-weight="bold" letter-spacing="3">LANGUAGE & SKILLS</text>
  <text x="400" y="105" text-anchor="middle" fill="#888" font-size="10" letter-spacing="2">ENGLISH FOR CASINO DEALERS</text>
  <line x1="280" y1="120" x2="520" y2="120" stroke="rgba(244,168,29,0.3)" stroke-width="1"/>
  <text x="400" y="180" text-anchor="middle" fill="#f4a81d" font-size="32" font-weight="bold">ENGLISH</text>
  <text x="400" y="210" text-anchor="middle" fill="#888" font-size="11">"Hit or Stand?" ✦ "Place your bets" ✦ "No more bets"</text>
  <text x="400" y="240" text-anchor="middle" fill="#555" font-size="10">Dealer English ✦ Customer Service ✦ Table Talk</text>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

function defaultHero(_slug) {
  return svg('default', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs><linearGradient id="bg9" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a0a14"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs>
  <rect width="800" height="400" fill="url(#bg9)"/>
  <rect x="40" y="40" width="720" height="320" rx="16" fill="rgba(244,168,29,0.03)" stroke="rgba(244,168,29,0.08)" stroke-width="1"/>
  <text x="400" y="180" text-anchor="middle" fill="#f4a81d" font-size="24" font-weight="bold">CasinoCallege</text>
  <text x="400" y="210" text-anchor="middle" fill="#888" font-size="11">カジノ大学</text>
  <text x="400" y="280" text-anchor="middle" fill="#555" font-size="10">CasinoCallege — カジノ大学</text>
  </svg>`)
}

// Casino chip color reference chart (US standard)
export function ChipColors() {
  const chips = [
    { color: '#f8fafc', border: '#cbd5e1', label: '$1', name: 'White' },
    { color: '#ef4444', border: '#b91c1c', label: '$5', name: 'Red' },
    { color: '#22c55e', border: '#15803d', label: '$25', name: 'Green' },
    { color: '#1e293b', border: '#0f172a', label: '$100', name: 'Black' },
    { color: '#a855f7', border: '#7e22ce', label: '$500', name: 'Purple' },
    { color: '#f97316', border: '#c2410c', label: '$1,000', name: 'Orange' },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-3 my-4">
      {chips.map(c => (
        <div key={c.label} className="flex flex-col items-center gap-1.5">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill={c.color} stroke={c.border} strokeWidth="3"/>
            <circle cx="24" cy="24" r="16" fill="none" stroke={c.border} strokeWidth="1" strokeDasharray="4 3"/>
            <text x="24" y="29" textAnchor="middle" fill={c.label === '$1' ? '#475569' : '#fff'} fontSize="11" fontWeight="bold" fontFamily="monospace">{c.label}</text>
          </svg>
          <span className="text-[10px] text-casino-muted">{c.name}</span>
        </div>
      ))}
    </div>
  )
}

// Blackjack table layout (top-down view, semicircular)
export function BJTable() {
  return (
    <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto my-4">
      {/* Table body */}
      <ellipse cx="250" cy="200" rx="240" ry="100" fill="#0d4f2c" stroke="#1e6b3e" strokeWidth="2"/>
      {/* Dealer area */}
      <rect x="180" y="10" width="140" height="30" rx="4" fill="#1a4731" stroke="#2a5f3f"/>
      <text x="250" y="30" textAnchor="middle" fill="#a0c4a8" fontSize="9">DEALER</text>
      {/* Shoe */}
      <rect x="325" y="42" width="28" height="18" rx="3" fill="#5c4033" stroke="#3d2b1f"/>
      <text x="339" y="54" textAnchor="middle" fill="#c4a882" fontSize="7">SHOE</text>
      {/* Betting spots */}
      {[40,95,150,205,260,315,370].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="130" r="20" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6"/>
          <text x={x} y="134" textAnchor="middle" fill="#4ade80" fontSize="8" opacity="0.6">{i+1}</text>
        </g>
      ))}
      {/* Chip tray */}
      <rect x="200" y="170" width="100" height="12" rx="3" fill="#3d2b1f" stroke="#5c4033"/>
      <text x="250" y="179" textAnchor="middle" fill="#c4a882" fontSize="7">CHIPS</text>
      {/* Arrows */}
      <text x="60" y="155" fill="#f4a81d" fontSize="8">First Base →</text>
      <text x="380" y="155" fill="#f4a81d" fontSize="8">← Third Base</text>
    </svg>
  )
}

// Blackjack game flow
export function BJFlow() {
  const steps = [
    { label: 'BET', sub: 'プレイヤーが賭ける' },
    { label: 'DEAL', sub: 'カード2枚ずつ配布' },
    { label: 'CHECK', sub: 'ディーラーBJ確認' },
    { label: 'PLAY', sub: 'Hit/Stand/Double等' },
    { label: 'DEALER', sub: '≤16で引く ≥17で止める' },
    { label: 'PAY', sub: '精算' },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-1.5 my-4">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center">
          <div className="flex flex-col items-center bg-casino-card rounded-lg px-3 py-2 border border-casino-border min-w-[60px]">
            <span className="text-casino-gold font-bold text-xs">{s.label}</span>
            <span className="text-[9px] text-casino-muted text-center leading-tight mt-0.5">{s.sub}</span>
          </div>
          {i < steps.length - 1 && (
            <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0">
              <line x1="0" y1="6" x2="14" y2="6" stroke="#f4a81d" strokeWidth="1.5"/>
              <polygon points="14,3 20,6 14,9" fill="#f4a81d"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

// Craps table layout 
export function CrapsTable() {
  return (
    <svg viewBox="0 0 600 160" className="w-full max-w-2xl mx-auto my-4">
      {/* Table body */}
      <rect x="10" y="10" width="580" height="140" rx="8" fill="#1a3a2a" stroke="#2a5a3a" strokeWidth="2"/>
      {/* Left side */}
      <rect x="20" y="20" width="240" height="120" rx="4" fill="#0d2b1a" stroke="#1e5c33" strokeWidth="1"/>
      {/* Right side */}
      <rect x="340" y="20" width="240" height="120" rx="4" fill="#0d2b1a" stroke="#1e5c33" strokeWidth="1"/>
      {/* Center props area */}
      <rect x="260" y="45" width="80" height="50" rx="4" fill="#2a1a3a" stroke="#4a3a5a" strokeWidth="1"/>
      <text x="300" y="75" textAnchor="middle" fill="#c4a0e0" fontSize="8">PROP</text>
      {/* Pass Line */}
      <rect x="30" y="80" width="60" height="20" rx="3" fill="none" stroke="#f4a81d" strokeWidth="1.5"/>
      <text x="60" y="93" textAnchor="middle" fill="#f4a81d" fontSize="7">PASS</text>
      {/* Don't Pass */}
      <rect x="100" y="80" width="60" height="20" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1"/>
      <text x="130" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">DON'T PASS</text>
      {/* Place numbers */}
      {[4,5,6,8,9,10].map((n, i) => (
        <g key={n}>
          <rect x={180 + i * 20} y="40" width="18" height="16" rx="2" fill="none" stroke="#4ade80" strokeWidth="1"/>
          <text x={189 + i * 20} y="52" textAnchor="middle" fill="#4ade80" fontSize="8">{n}</text>
        </g>
      ))}
      {/* Staff labels */}
      <text x="300" y="140" textAnchor="middle" fill="#f4a81d" fontSize="9">▾ BOXMAN ▾</text>
      <text x="140" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">BASE L</text>
      <text x="460" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">BASE R</text>
      <text x="300" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8">▴ STICKMAN ▴</text>
    </svg>
  )
}

// Roulette wheel with number placement (European single zero)
export function RouletteWheel() {
  const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
  const reds = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36])
  const cx = 160, cy = 160, outerR = 150, innerR = 110
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto my-4">
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="#2d1a0a" stroke="#5c3a1a" strokeWidth="3"/>
      <circle cx={cx} cy={cy} r={innerR} fill="#1a0a00" stroke="#3a2a1a" strokeWidth="1"/>
      {/* Numbers */}
      {numbers.map((n, i) => {
        const angle = (i * 360 / 37 - 90) * Math.PI / 180
        const midR = (outerR + innerR) / 2
        const tx = cx + midR * Math.cos(angle)
        const ty = cy + midR * Math.sin(angle)
        const isRed = reds.has(n)
        const isGreen = n === 0
        const fill = isGreen ? '#16a34a' : isRed ? '#dc2626' : '#1e293b'
        return (
          <g key={n}>
            <rect x={tx-12} y={ty-8} width="24" height="16" rx="3" fill={fill} stroke={fill} strokeWidth="1"
              transform={`rotate(${i*360/37},${tx},${ty})`}/>
            <text x={tx} y={ty+4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold"
              transform={`rotate(${i*360/37},${tx},${ty})`}>{n}</text>
          </g>
        )
      })}
      {/* Center */}
      <circle cx={cx} cy={cy} r="18" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
      <text x={cx} y={cy+5} textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">ROULETTE</text>
    </svg>
  )
}

// House edge comparison bar chart
export function HouseEdgeChart() {
  const data = [
    { game: 'Craps Odds', he: 0, color: '#22c55e' },
    { game: 'BJ (Basic)', he: 0.5, color: '#4ade80' },
    { game: 'Baccarat Banker', he: 1.06, color: '#a3e635' },
    { game: 'Craps Pass', he: 1.41, color: '#facc15' },
    { game: 'Roulette EU', he: 2.70, color: '#f97316' },
    { game: 'Roulette US', he: 5.26, color: '#ef4444' },
    { game: 'Craps Any 7', he: 16.67, color: '#dc2626' },
  ]
  const max = 18
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto my-4">
      {data.map((d, i) => {
        const y = 15 + i * 26
        const w = (d.he / max) * 320
        return (
          <g key={d.game}>
            <text x="0" y={y+12} fill="#cbd5e1" fontSize="9" textAnchor="end" className="font-mono">{d.game}</text>
            <rect x="120" y={y} width={w} height="18" rx="3" fill={d.color} opacity="0.8"/>
            <text x={125+Math.max(w,20)} y={y+13} fill="#f1f5f9" fontSize="9" fontWeight="bold" className="font-mono">{d.he}%</text>
          </g>
        )
      })}
    </svg>
  )
}

// Baccarat tableau visual
export function BaccaratTableau() {
  const rows = [
    { bTotal: '0-2', action: 'H H H H H H H H H H' },
    { bTotal: '3', action: 'H H H H H H H H S H' },
    { bTotal: '4', action: 'S S H H H H H H S S' },
    { bTotal: '5', action: 'S S S S H H H H S S' },
    { bTotal: '6', action: 'S S S S S S H H S S' },
    { bTotal: '7', action: 'S S S S S S S S S S' },
  ]
  return (
    <svg viewBox="0 0 420 170" className="w-full max-w-lg mx-auto my-4">
      <text x="60" y="15" fill="#f4a81d" fontSize="9" fontWeight="bold">Banker→</text>
      <text x="420" y="15" fill="#f4a81d" fontSize="9" fontWeight="bold" textAnchor="end">Player's 3rd card</text>
      {rows.map((r, i) => {
        const actions = r.action.split(' ')
        return (
          <g key={r.bTotal}>
            <rect x="0" y={20+i*24} width="35" height="20" rx="3" fill="#1e293b" stroke="#334155"/>
            <text x="17" y={34+i*24} textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">{r.bTotal}</text>
            {actions.map((a, j) => {
              const isH = a === 'H'
              return (
                <g key={j}>
                  <rect x={40+j*38} y={20+i*24} width="35" height="20" rx="3" fill={isH ? '#166534' : '#450a0a'} stroke={isH ? '#22c55e' : '#991b1b'}/>
                  <text x={57+j*38} y={34+i*24} textAnchor="middle" fill={isH ? '#4ade80' : '#fca5a5'} fontSize="10" fontWeight="bold">{a}</text>
                </g>
              )
            })}
          </g>
        )
      })}
      {/* Player labels on top */}
      {[0,1,2,3,4,5,6,7,8,9].map((n, i) => (
        <text key={n} x={57+i*38} y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">{n}</text>
      ))}
    </svg>
  )
}

// Card value comparison (BJ vs Baccarat)
export function CardValues() {
  const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  return (
    <svg viewBox="0 0 600 110" className="w-full max-w-2xl mx-auto my-4">
      <text x="30" y="22" fill="#94a3b8" fontSize="9">Card</text>
      <text x="30" y="52" fill="#f4a81d" fontSize="9">BJ value</text>
      <text x="30" y="82" fill="#0d9488" fontSize="9">Baccarat value</text>
      {cards.map((c, i) => {
        const bjVal = c === 'A' ? '1/11' : ['10','J','Q','K'].includes(c) ? '10' : c
        const bacVal = c === 'A' ? '1' : ['10','J','Q','K'].includes(c) ? '0' : c
        return (
          <g key={c}>
            <rect x={50+i*42} y="4" width="38" height="22" rx="3" fill="#1e293b" stroke="#334155"/>
            <text x={69+i*42} y="19" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">{c}</text>
            <rect x={50+i*42} y="32" width="38" height="22" rx="3" fill="#1e293b" stroke="#f4a81d66"/>
            <text x={69+i*42} y="47" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">{bjVal}</text>
            <rect x={50+i*42} y="60" width="38" height="22" rx="3" fill="#1e293b" stroke="#0d948866"/>
            <text x={69+i*42} y="75" textAnchor="middle" fill="#0d9488" fontSize="11" fontWeight="bold">{bacVal}</text>
          </g>
        )
      })}
    </svg>
  )
}

// Dice probability visualization (craps)
export function DiceProbabilities() {
  const data = [
    { sum: 2, ways: 1, dice: '⚀⚀' },
    { sum: 3, ways: 2, dice: '⚀⚁ ⚁⚀' },
    { sum: 4, ways: 3, dice: '⚀⚂ ⚁⚁ ⚂⚀' },
    { sum: 5, ways: 4, dice: '⚀⚃ ⚁⚂ ⚂⚁ ⚃⚀' },
    { sum: 6, ways: 5, dice: '⚀⚄ ⚁⚃ ⚂⚂ ⚃⚁ ⚄⚀' },
    { sum: 7, ways: 6, dice: '⚀⚅ ⚁⚄ ⚂⚃ ⚃⚂ ⚄⚁ ⚅⚀' },
    { sum: 8, ways: 5, dice: '⚁⚅ ⚂⚄ ⚃⚃ ⚄⚂ ⚅⚁' },
    { sum: 9, ways: 4, dice: '⚂⚅ ⚃⚄ ⚄⚃ ⚅⚂' },
    { sum: 10, ways: 3, dice: '⚃⚅ ⚄⚄ ⚅⚃' },
    { sum: 11, ways: 2, dice: '⚄⚅ ⚅⚄' },
    { sum: 12, ways: 1, dice: '⚅⚅' },
  ]
  const maxWays = 6
  return (
    <svg viewBox="0 0 450 260" className="w-full max-w-lg mx-auto my-4">
      {data.map((d, i) => {
        const y = 10 + i * 22
        const barW = (d.ways / maxWays) * 120
        const isSeven = d.sum === 7
        return (
          <g key={d.sum}>
            <text x="0" y={y+14} fill={isSeven ? '#f4a81d' : '#94a3b8'} fontSize="10" fontWeight={isSeven ? 'bold' : 'normal'}>
              {d.sum}
            </text>
            <rect x="22" y={y+2} width={barW} height="16" rx="3" fill={isSeven ? '#f4a81d' : '#334155'} opacity={isSeven ? 1 : 0.6}/>
            <text x={26+barW} y={y+14} fill={isSeven ? '#f4a81d' : '#64748b'} fontSize="9">{d.ways}/36</text>
          </g>
        )
      })}
    </svg>
  )
}

// Poker hand ranking visual
export function PokerHandRanking() {
  const hands = [
    { name: 'Royal Flush', ex: 'A♠ K♠ Q♠ J♠ 10♠', pct: '0.000032%' },
    { name: 'Straight Flush', ex: '9♥ 8♥ 7♥ 6♥ 5♥', pct: '0.0279%' },
    { name: 'Four of a Kind', ex: 'A♣ A♦ A♥ A♠ 5♠', pct: '0.168%' },
    { name: 'Full House', ex: 'K♠ K♦ K♥ 8♠ 8♦', pct: '2.60%' },
    { name: 'Flush', ex: 'A♠ 9♠ 7♠ 4♠ 2♠', pct: '3.03%' },
    { name: 'Straight', ex: '9♠ 8♣ 7♦ 6♥ 5♠', pct: '4.62%' },
    { name: 'Three of a Kind', ex: 'Q♠ Q♦ Q♥ 9♠ 2♣', pct: '4.83%' },
    { name: 'Two Pair', ex: 'J♠ J♣ 8♦ 8♠ 3♣', pct: '23.5%' },
    { name: 'One Pair', ex: '10♠ 10♣ 9♠ 5♦ 2♣', pct: '43.8%' },
    { name: 'High Card', ex: 'A♠ J♣ 9♦ 5♠ 2♣', pct: '17.4%' },
  ]
  return (
    <svg viewBox="0 0 380 260" className="w-full max-w-sm mx-auto my-4">
      {hands.map((h, i) => (
        <g key={h.name}>
          <rect x="0" y={i*25} width="380" height="23" rx="2" fill={i % 2 === 0 ? '#1a1a2e22' : 'transparent'}/>
          <text x="5" y={15+i*25} fill="#f1f5f9" fontSize="9" fontWeight="600">{h.name}</text>
          <text x="140" y={15+i*25} fill="#64748b" fontSize="8" className="font-mono">{h.ex}</text>
          <text x="340" y={15+i*25} fill="#f4a81d" fontSize="8" textAnchor="end" className="font-mono">{h.pct}</text>
        </g>
      ))}
    </svg>
  )
}

// Casino organization chart
export function CasinoOrgChart() {
  const levels = [
    [{ label: 'GM', color: '#ef4444' }],
    [{ label: 'Casino Mgr', color: '#f97316' }],
    [{ label: 'Shift Mgr', color: '#eab308' }, { label: 'Surveillance', color: '#64748b' }, { label: 'Cage', color: '#64748b' }],
    [{ label: 'Pit Boss', color: '#22c55e' }],
    [{ label: 'Dealer', color: '#3b82f6' }, { label: 'Dealer', color: '#3b82f6' }, { label: 'Dealer', color: '#3b82f6' }],
  ]
  const cellW = 90, cellH = 24
  return (
    <svg viewBox="0 0 350 170" className="w-full max-w-sm mx-auto my-4">
      {levels.map((row, ri) => {
        const totalW = row.length * cellW + (row.length - 1) * 10
        const startX = (350 - totalW) / 2
        const y = 5 + ri * 33
        return row.map((cell, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect x={startX + ci * (cellW + 10)} y={y} width={cellW} height={cellH} rx="4" fill={cell.color + '22'} stroke={cell.color + '66'} strokeWidth="1"/>
            <text x={startX + ci * (cellW + 10) + cellW/2} y={y + 16} textAnchor="middle" fill={cell.color} fontSize="9" fontWeight="600">{cell.label}</text>
            {ri > 0 && (
              <line x1={(startX + ci * (cellW + 10) + cellW/2)} y1={y-2} x2={(startX + ci * (cellW + 10) + cellW/2)} y2={y-5} stroke="#334155" strokeWidth="1"/>
            )}
          </g>
        ))
      })}
      {/* Lines from row to row */}
      {[1,2].map(ri => {
        const prevRow = levels[ri-1], currRow = levels[ri]
        const prevW = prevRow.length * cellW + (prevRow.length - 1) * 10
        const currW = currRow.length * cellW + (currRow.length - 1) * 10
        const prevStartX = (350 - prevW) / 2
        const currStartX = (350 - currW) / 2
        const prevY = 5 + (ri-1) * 33 + cellH
        const currY = 5 + ri * 33
        return (
          <g key={`conn-${ri}`}>
            <line x1={prevStartX + prevW/2} y1={prevY} x2={currStartX + currW/2} y2={currY-5} stroke="#334155" strokeWidth="1"/>
            <line x1={currStartX} y1={currY-5} x2={currStartX + currW} y2={currY-5} stroke="#334155" strokeWidth="1"/>
          </g>
        )
      })}
    </svg>
  )
}

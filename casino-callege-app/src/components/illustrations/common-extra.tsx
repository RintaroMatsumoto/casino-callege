export function AllGameHECompareSvg() {
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg mx-auto my-4">
      <rect width="400" height="240" fill="#1a1a2e"/>
      <text x="200" y="18" fill="#f4a81d" fontSize="11" fontWeight="bold" textAnchor="middle">House Edge Comparison</text>
      {[{g:"クラップスオッズ",h:0,c:"#22c55e"},{g:"BJ基本戦略",h:0.5,c:"#4ade80"},{g:"バカラBanker",h:1.06,c:"#a3e635"},{g:"クラップスPass",h:1.41,c:"#facc15"},{g:"ルーレットEU",h:2.7,c:"#f97316"},{g:"ルーレットUS",h:5.26,c:"#ef4444"},{g:"Any 7",h:16.67,c:"#dc2626"}].map((d,i)=>{
        const y=30+i*28
        return (
          <g key={d.g}>
            <text x="110" y={y+12} fill="#e2e8f0" fontSize="9" textAnchor="end">{d.g}</text>
            <rect x="115" y={y} width={(d.h/18)*250} height="18" rx="3" fill={d.c} opacity="0.85"/>
            <text x={125+(d.h/18)*250+5} y={y+13} fill="#f1f5f9" fontSize="9" fontWeight="bold">{d.h}%</text>
          </g>
        )
      })}
    </svg>
  )
}

export function Shuffle4TypesSvg() {
  return (
    <svg viewBox="0 0 600 80" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="80" fill="#1a1a2e"/>
      {[{n:"Wash",d:"Spread & mix"},{n:"Riffle",d:"Thumb release"},{n:"Strip",d:"Pull packets"},{n:"Overhand",d:"Take from top"}].map((s,i)=>(
        <g key={s.n}>
          <rect x={10+i*148} y="5" width="140" height="70" rx="4" fill="#1e293b" stroke="#334155"/>
          <text x={80+i*148} y="28" fill="#f4a81d" fontSize="11" fontWeight="bold" textAnchor="middle">{s.n}</text>
          <text x={80+i*148} y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">{s.d}</text>
        </g>
      ))}
    </svg>
  )
}

export function LearningPathSvg() {
  return (
    <svg viewBox="0 0 700 60" className="w-full max-w-2xl mx-auto my-4">
      <rect width="700" height="60" fill="#1a1a2e"/>
      {[{n:"Phase 0",s:"基礎"},{n:"Phase 1",s:"BJ"},{n:"Phase 2",s:"ルーレット"},{n:"Phase 3",s:"クラップス"},{n:"Phase 4",s:"ポーカー"},{n:"Phase 5",s:"バカラ"},{n:"Phase 6",s:"キャリア"}].map((p,i)=>(
        <g key={p.n}>
          <rect x={5+i*98} y="10" width="80" height="25" rx="4" fill={i===0?"#0d9488":"#1e293b"} stroke={i===0?"#0d9488":"#334155"}/>
          <text x={45+i*98} y="27" fill={i===0?"#fff":"#e2e8f0"} fontSize="9" fontWeight="bold" textAnchor="middle">{p.n}</text>
          <text x={45+i*98} y="48" fill="#94a3b8" fontSize="7" textAnchor="middle">{p.s}</text>
          {i<6 && (<><line x1={85+i*98} y1="22" x2={93+i*98} y2="22" stroke="#f4a81d" strokeWidth="1"/><polygon points={`${93+i*98},19 ${99+i*98},22 ${93+i*98},25`} fill="#f4a81d"/></>)}
        </g>
      ))}
    </svg>
  )
}

export function SkillTreeSvg() {
  return (
    <svg viewBox="0 0 500 160" className="w-full max-w-lg mx-auto my-4">
      <rect width="500" height="160" fill="#1a1a2e"/>
      <rect x="200" y="2" width="100" height="22" rx="4" fill="#f4a81d22" stroke="#f4a81d"/>
      <text x="250" y="17" fill="#f4a81d" fontSize="10" fontWeight="bold" textAnchor="middle">Dealer Skills</text>
      <line x1="250" y1="24" x2="250" y2="35" stroke="#f4a81d"/>
      <line x1="250" y1="35" x2="90" y2="35" stroke="#f4a81d"/><line x1="90" y1="35" x2="90" y2="45" stroke="#f4a81d"/>
      <line x1="250" y1="35" x2="250" y2="45" stroke="#f4a81d"/>
      <line x1="250" y1="35" x2="410" y2="35" stroke="#f4a81d"/><line x1="410" y1="35" x2="410" y2="45" stroke="#f4a81d"/>
      {[{x:20,l:"基礎",c:"#0d9488"},{x:200,l:"テーブルゲーム",c:"#f4a81d"},{x:375,l:"キャリア",c:"#3b82f6"}].map(b=>(
        <g key={b.l}>
          <rect x={b.x} y="48" width="150" height="20" rx="3" fill={b.c+"22"} stroke={b.c}/>
          <text x={b.x+75} y="62" fill={b.c} fontSize="9" fontWeight="bold" textAnchor="middle">{b.l}</text>
        </g>
      ))}
      <text x="15" y="88" fill="#94a3b8" fontSize="7">Probability, Terms, Chips, Shuffle</text>
      <text x="185" y="88" fill="#94a3b8" fontSize="7">BJ, ルーレット, クラップス, ポーカー, バカラ</text>
      <text x="375" y="88" fill="#94a3b8" fontSize="7">Interview, Security, Health, Salary</text>
    </svg>
  )
}

export function ChipAllColorsSvg() {
  return (
    <svg viewBox="0 0 500 90" className="w-full max-w-lg mx-auto my-4">
      <rect width="500" height="90" fill="#1a1a2e"/>
      {[{c:"#f8fafc",b:"#cbd5e1",v:"$1",n:"White"},{c:"#ef4444",b:"#dc2626",v:"$5",n:"Red"},{c:"#22c55e",b:"#16a34a",v:"$25",n:"Green"},{c:"#1e293b",b:"#0f172a",v:"$100",n:"Black"},{c:"#a855f7",b:"#7e22ce",v:"$500",n:"Purple"},{c:"#f97316",b:"#c2410c",v:"$1K",n:"Orange"}].map((ch,i)=>(
        <g key={ch.v}>
          <circle cx={55+i*75} cy="40" r="22" fill={ch.c} stroke={ch.b} strokeWidth="2"/>
          <circle cx={55+i*75} cy="40" r="15" fill="none" stroke={ch.b} strokeWidth="1" strokeDasharray="4 3"/>
          <text x={55+i*75} y="45" fill={ch.v==="$1"?"#475569":"#fff"} fontSize="11" fontWeight="bold" textAnchor="middle">{ch.v}</text>
          <text x={55+i*75} y="72" fill="#94a3b8" fontSize="8" textAnchor="middle">{ch.n}</text>
        </g>
      ))}
      <text x="250" y="88" fill="#64748b" fontSize="7" textAnchor="middle">US Standard Casino Chips</text>
    </svg>
  )
}

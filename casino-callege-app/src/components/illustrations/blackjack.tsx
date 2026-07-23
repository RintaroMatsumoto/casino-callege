export function BJTableTopSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <path d="M60,180 Q300,5 540,180" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <path d="M300,10 L300,195" stroke="#f4a81d" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="140" cy="140" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="200" cy="110" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="255" cy="90" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="300" cy="82" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="345" cy="90" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="400" cy="110" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <circle cx="460" cy="140" r="13" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <rect x="240" y="5" width="120" height="16" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1" />
      <text x="300" y="16" textAnchor="middle" fill="#f4a81d" fontSize="9" fontWeight="bold">DEALER</text>
      <rect x="380" y="170" width="44" height="18" rx="2" fill="#1a1a2e" stroke="#f4a81d" strokeWidth="1" />
      <text x="402" y="183" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">SHOE</text>
      <rect x="155" y="170" width="50" height="18" rx="2" fill="#1a1a2e" stroke="#f4a81d" strokeWidth="1" />
      <text x="180" y="183" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">CHIPS</text>
      <rect x="365" y="185" width="10" height="6" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
      <text x="60" y="160" fill="#94a3b8" fontSize="8">{`1st Base ->`}</text>
      <text x="540" y="160" fill="#94a3b8" fontSize="8" textAnchor="end">{`<- 3rd Base`}</text>
    </svg>
  )
}

export function BJGameFlowSvg() {
  return (
    <svg viewBox="0 0 600 95" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="95" fill="#1a1a2e" />
      <rect x="10" y="30" width="72" height="30" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="46" y="49" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">BET</text>
      <line x1="82" y1="45" x2="100" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGold)" />
      <rect x="105" y="30" width="72" height="30" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="141" y="49" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">DEAL</text>
      <line x1="177" y1="45" x2="195" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGold)" />
      <rect x="200" y="30" width="72" height="30" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="236" y="49" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">CHECK</text>
      <line x1="272" y1="45" x2="290" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGold)" />
      <rect x="295" y="30" width="72" height="30" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="331" y="49" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">PLAY</text>
      <line x1="367" y1="45" x2="385" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGold)" />
      <rect x="390" y="30" width="80" height="30" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="430" y="49" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">DEALER</text>
      <line x1="470" y1="45" x2="488" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGold)" />
      <rect x="493" y="30" width="72" height="30" rx="4" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
      <text x="529" y="49" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">PAY</text>
      <defs>
        <marker id="arrowGold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  )
}

export function BJPeekCheckSvg() {
  return (
    <svg viewBox="0 0 600 260" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="260" fill="#1a1a2e" />
      <rect x="175" y="15" width="250" height="36" rx="5" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="38" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">Dealer Upcard A or 10?</text>
      <line x1="215" y1="51" x2="215" y2="75" stroke="#94a3b8" strokeWidth="2" />
      <text x="205" y="70" fill="#22c55e" fontSize="10">Yes</text>
      <line x1="300" y1="51" x2="300" y2="75" stroke="#94a3b8" strokeWidth="2" />
      <rect x="190" y="80" width="100" height="34" rx="5" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="240" y="101" textAnchor="middle" fill="#e2e8f0" fontSize="11">Peek for BJ</text>
      <line x1="240" y1="114" x2="240" y2="140" stroke="#94a3b8" strokeWidth="2" />
      <rect x="155" y="145" width="170" height="34" rx="5" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="240" y="166" textAnchor="middle" fill="#e2e8f0" fontSize="11">Dealer has Blackjack?</text>
      <line x1="200" y1="179" x2="200" y2="205" stroke="#94a3b8" strokeWidth="2" />
      <text x="190" y="200" fill="#22c55e" fontSize="10">Yes</text>
      <line x1="280" y1="179" x2="280" y2="205" stroke="#94a3b8" strokeWidth="2" />
      <text x="270" y="200" fill="#ef4444" fontSize="10">No</text>
      <rect x="125" y="210" width="95" height="30" rx="5" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5" />
      <text x="172" y="230" textAnchor="middle" fill="#1a1a2e" fontSize="10" fontWeight="bold">Hand Over</text>
      <rect x="260" y="210" width="85" height="30" rx="5" fill="#22c55e" stroke="#22c55e" strokeWidth="1.5" />
      <text x="302" y="230" textAnchor="middle" fill="#1a1a2e" fontSize="10" fontWeight="bold">Continue</text>
      <line x1="385" y1="51" x2="385" y2="75" stroke="#94a3b8" strokeWidth="2" />
      <text x="375" y="70" fill="#ef4444" fontSize="10">No</text>
      <rect x="370" y="80" width="100" height="34" rx="5" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="420" y="101" textAnchor="middle" fill="#e2e8f0" fontSize="11">Deal and Play</text>
      <line x1="420" y1="114" x2="420" y2="210" stroke="#94a3b8" strokeWidth="2" />
      <rect x="385" y="210" width="75" height="30" rx="5" fill="#22c55e" stroke="#22c55e" strokeWidth="1.5" />
      <text x="422" y="230" textAnchor="middle" fill="#1a1a2e" fontSize="10" fontWeight="bold">Continue</text>
    </svg>
  )
}

export function BJShuffleWashSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="40" y="130" width="520" height="50" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="90" y="80" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(-35 110 108)" />
      <rect x="150" y="85" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(15 170 113)" />
      <rect x="210" y="78" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(-20 230 106)" />
      <rect x="270" y="82" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(25 290 110)" />
      <rect x="330" y="80" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(-10 350 108)" />
      <rect x="390" y="83" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(18 410 111)" />
      <rect x="450" y="79" width="40" height="56" rx="3" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform="rotate(-30 470 107)" />
      <ellipse cx="220" cy="98" rx="35" ry="15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      <ellipse cx="380" cy="98" rx="35" ry="15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="300" y="30" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Wash: spread and mix</text>
    </svg>
  )
}

export function BJShuffleRiffleSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="170" y="50" width="56" height="70" rx="4" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="172" y="52" width="52" height="66" rx="3" fill="#f4a81d" stroke="#f4a81d" strokeWidth="0.5" />
      <rect x="374" y="50" width="56" height="70" rx="4" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="376" y="52" width="52" height="66" rx="3" fill="#f4a81d" stroke="#f4a81d" strokeWidth="0.5" />
      <ellipse cx="255" cy="42" rx="25" ry="12" fill="#e2e8f0" />
      <ellipse cx="285" cy="42" rx="25" ry="12" fill="#e2e8f0" />
      <rect x="226" y="100" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(-25 241 104)" />
      <rect x="240" y="108" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(-15 255 112)" />
      <rect x="250" y="116" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(-8 265 120)" />
      <rect x="260" y="124" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(2 275 128)" />
      <rect x="270" y="132" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(12 285 136)" />
      <rect x="284" y="116" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(18 299 120)" />
      <rect x="294" y="108" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(25 309 112)" />
      <rect x="300" y="100" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(35 315 104)" />
      <text x="300" y="30" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Riffle: thumb release</text>
    </svg>
  )
}

export function BJShuffleStripSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="100" y="80" width="60" height="50" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <rect x="180" y="80" width="60" height="50" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <rect x="260" y="80" width="60" height="50" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <rect x="340" y="80" width="60" height="50" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <ellipse cx="145" cy="140" rx="28" ry="18" fill="#e2e8f0" />
      <ellipse cx="315" cy="140" rx="28" ry="18" fill="#e2e8f0" />
      <line x1="155" y1="135" x2="220" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="325" y1="135" x2="390" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="300" y="30" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Strip: pull packets</text>
    </svg>
  )
}

export function BJShuffleOverhandSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="280" y="60" width="60" height="65" rx="4" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <rect x="282" y="62" width="56" height="15" rx="2" fill="#f4a81d" />
      <rect x="282" y="79" width="56" height="15" rx="2" fill="#f4a81d" />
      <rect x="282" y="96" width="56" height="15" rx="2" fill="#f4a81d" />
      <rect x="282" y="113" width="56" height="10" rx="2" fill="#f4a81d" />
      <ellipse cx="240" cy="155" rx="35" ry="22" fill="#e2e8f0" />
      <rect x="225" y="140" width="30" height="8" rx="2" fill="#f4a81d" transform="rotate(-5 240 144)" />
      <rect x="228" y="132" width="30" height="7" rx="2" fill="#f4a81d" transform="rotate(-3 243 135)" />
      <rect x="232" y="124" width="28" height="7" rx="2" fill="#f4a81d" />
      <ellipse cx="310" cy="45" rx="25" ry="15" fill="#e2e8f0" />
      <text x="300" y="30" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Overhand</text>
    </svg>
  )
}

export function BJLoadShoeSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="180" y="65" width="200" height="50" rx="5" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <rect x="185" y="70" width="190" height="40" rx="3" fill="#0f172a" />
      <rect x="380" y="72" width="80" height="36" rx="2" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="382" y="74" width="76" height="8" fill="#1e293b" />
      <rect x="382" y="84" width="76" height="8" fill="#1e293b" />
      <rect x="382" y="94" width="76" height="8" fill="#1e293b" />
      <ellipse cx="435" cy="50" rx="25" ry="16" fill="#e2e8f0" />
      <text x="200" y="62" fill="#94a3b8" fontSize="9">Shoe</text>
      <text x="435" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="10">{`Insert deck face-down ->`}</text>
    </svg>
  )
}

export function BJLoadCardSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="50" y="60" width="500" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="55" y="65" width="490" height="45" rx="3" fill="#0f172a" />
      <rect x="60" y="80" width="80" height="18" rx="2" fill="#22c55e" opacity="0.3" />
      <rect x="145" y="80" width="80" height="18" rx="2" fill="#22c55e" opacity="0.3" />
      <rect x="230" y="80" width="80" height="18" rx="2" fill="#22c55e" opacity="0.3" />
      <rect x="315" y="80" width="80" height="18" rx="2" fill="#22c55e" opacity="0.3" />
      <rect x="400" y="80" width="80" height="18" rx="2" fill="#22c55e" opacity="0.3" />
      <line x1="425" y1="72" x2="425" y2="108" stroke="#ef4444" strokeWidth="3" />
      <text x="425" y="125" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Cut Card 75%</text>
      <text x="425" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">75% mark</text>
      <text x="300" y="50" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">Cut Card Position</text>
    </svg>
  )
}

export function BJSignalHitSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <line x1="280" y1="155" x2="500" y2="155" stroke="#334155" strokeWidth="2" />
      <ellipse cx="380" cy="110" rx="28" ry="20" fill="#e2e8f0" />
      <line x1="375" y1="130" x2="370" y2="155" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="385" y1="130" x2="390" y2="155" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="380" y1="90" x2="375" y2="130" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="388" y1="92" x2="388" y2="130" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <path d="M365,145 Q380,165 395,145" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M360,140 Q380,170 400,140" fill="none" stroke="#22c55e" strokeWidth="1" />
      <text x="300" y="50" textAnchor="middle" fill="#f4a81d" fontSize="16" fontWeight="bold">HIT: tap table</text>
    </svg>
  )
}

export function BJSignalStandSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <line x1="250" y1="145" x2="470" y2="145" stroke="#334155" strokeWidth="2" />
      <ellipse cx="360" cy="110" rx="30" ry="22" fill="#e2e8f0" />
      <line x1="360" y1="88" x2="350" y2="120" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="368" y1="88" x2="365" y2="120" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="376" y1="88" x2="378" y2="120" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="384" y1="90" x2="390" y2="120" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <path d="M335,90 Q345,85 355,95 Q365,105 375,95 Q385,85 395,95" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M330,80 Q340,75 350,85 Q360,95 370,85 Q380,75 390,85" fill="none" stroke="#22c55e" strokeWidth="1" />
      <text x="300" y="50" textAnchor="middle" fill="#f4a81d" fontSize="16" fontWeight="bold">STAND: wave hand</text>
    </svg>
  )
}

export function BJSignalDoubleSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <line x1="250" y1="160" x2="450" y2="160" stroke="#334155" strokeWidth="2" />
      <ellipse cx="320" cy="118" rx="26" ry="18" fill="#e2e8f0" />
      <line x1="328" y1="100" x2="328" y2="135" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="320" y1="136" x2="315" y2="160" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="335" y1="136" x2="340" y2="160" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="400" cy="139" r="12" fill="#22c55e" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="412" cy="149" r="12" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="395" cy="150" r="12" fill="#ef4444" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="160" y="30" fill="#f4a81d" fontSize="13" fontWeight="bold">{`DOUBLE: 1 finger + chips`}</text>
    </svg>
  )
}

export function BJSignalSplitSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <line x1="250" y1="160" x2="450" y2="160" stroke="#334155" strokeWidth="2" />
      <ellipse cx="320" cy="115" rx="28" ry="20" fill="#e2e8f0" />
      <line x1="305" y1="95" x2="295" y2="135" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="335" y1="95" x2="345" y2="135" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="318" y1="135" x2="312" y2="160" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="328" y1="135" x2="332" y2="160" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="405" cy="139" r="11" fill="#22c55e" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="415" cy="150" r="11" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="160" y="30" fill="#f4a81d" fontSize="13" fontWeight="bold">{`SPLIT: V-sign + chips`}</text>
    </svg>
  )
}

export function BJSignalSurrenderSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <line x1="250" y1="155" x2="450" y2="155" stroke="#334155" strokeWidth="2" />
      <ellipse cx="340" cy="115" rx="26" ry="18" fill="#e2e8f0" />
      <line x1="350" y1="97" x2="355" y2="135" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <line x1="340" y1="133" x2="335" y2="155" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <line x1="348" y1="133" x2="350" y2="155" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <line x1="356" y1="133" x2="362" y2="155" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <line x1="285" y1="145" x2="320" y2="145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <text x="235" y="30" fill="#f4a81d" fontSize="13" fontWeight="bold">{`SURRENDER: draw line`}</text>
    </svg>
  )
}

export function BJSignalInsuranceSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <path d="M50,110 Q300,70 550,110" fill="none" stroke="#334155" strokeWidth="2" />
      <line x1="200" y1="108" x2="400" y2="108" stroke="#f4a81d" strokeWidth="5" strokeLinecap="round" />
      <circle cx="260" cy="95" r="11" fill="#22c55e" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="275" cy="90" r="11" fill="#ef4444" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="290" cy="96" r="11" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="305" cy="91" r="11" fill="#22c55e" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="320" cy="94" r="11" fill="#ef4444" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="335" cy="89" r="11" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="230" y1="108" x2="225" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <line x1="370" y1="108" x2="375" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <text x="300" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Insurance Bar</text>
      <text x="300" y="40" textAnchor="middle" fill="#f4a81d" fontSize="18" fontWeight="bold">INSURANCE</text>
    </svg>
  )
}

export function BJDealOrderSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {[1, 2, 3, 4, 5, 6, 7].map((n) => {
        const x = 45 + (n - 1) * 80
        return (
          <g key={n}>
            <rect x={x} y="65" width="48" height="48" rx="6" fill="#1e293b" stroke={n === 1 ? "#22c55e" : n === 7 ? "#ef4444" : "#334155"} strokeWidth="2" />
            <text x={x + 24} y={95} textAnchor="middle" fill="#f4a81d" fontSize="20" fontWeight="bold">{n}</text>
          </g>
        )
      })}
      <line x1="70" y1="55" x2="590" y2="55" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowDeal)" />
      <defs>
        <marker id="arrowDeal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      <text x="69" y="140" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">First Base</text>
      <text x="565" y="140" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Third Base</text>
      <text x="320" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Deal Order: left to right</text>
    </svg>
  )
}

export function BJStrategyChartSvg() {
  const cols = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"]
  const rows = [
    { hand: "8",  data: ["H","H","H","H","H","H","H","H","H","H"] },
    { hand: "9",  data: ["H","D","D","D","D","H","H","H","H","H"] },
    { hand: "10", data: ["D","D","D","D","D","D","D","D","H","H"] },
    { hand: "11", data: ["D","D","D","D","D","D","D","D","D","D"] },
    { hand: "12", data: ["H","H","S","S","S","H","H","H","H","H"] },
    { hand: "13", data: ["S","S","S","S","S","H","H","H","H","H"] },
    { hand: "14", data: ["S","S","S","S","S","H","H","H","H","H"] },
    { hand: "15", data: ["S","S","S","S","S","H","H","H","H","H"] },
    { hand: "16", data: ["S","S","S","S","S","H","H","H","H","H"] },
    { hand: "17", data: ["S","S","S","S","S","S","S","S","S","S"] },
  ]
  const cMap: Record<string, string> = { S: "#22c55e", H: "#ef4444", D: "#f4a81d", P: "#a855f7" }
  const cellW = 42
  const cellH = 22
  const startX = 55
  const startY = 38

  return (
    <svg viewBox="0 0 580 310" className="w-full max-w-2xl mx-auto my-4">
      <rect width="580" height="310" fill="#1a1a2e" />
      <text x="290" y="20" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Basic Strategy: Hard Hands</text>
      <text x="12" y="56" fill="#94a3b8" fontSize="9">Hand</text>
      {cols.map((c, ci) => (
        <text key={c} x={startX + 5 + ci * (cellW + 2) + cellW / 2} y={56} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">{c}</text>
      ))}
      {rows.map((row, ri) => (
        <g key={row.hand}>
          <text x={startX - 10} y={startY + ri * (cellH + 2) + 15} textAnchor="end" fill="#e2e8f0" fontSize="11" fontWeight="bold">{row.hand}</text>
          {row.data.map((d, di) => (
            <g key={di}>
              <rect x={startX + di * (cellW + 2)} y={startY + ri * (cellH + 2)} width={cellW} height={cellH} rx={3} fill={cMap[d] || "#334155"} opacity={0.75} />
              <text x={startX + di * (cellW + 2) + cellW / 2} y={startY + ri * (cellH + 2) + 15} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{d}</text>
            </g>
          ))}
        </g>
      ))}
      <rect x="55" y="275" width="14" height="14" rx="2" fill="#22c55e" opacity={0.75} />
      <text x="73" y="287" fill="#e2e8f0" fontSize="9">Stand</text>
      <rect x="145" y="275" width="14" height="14" rx="2" fill="#ef4444" opacity={0.75} />
      <text x="163" y="287" fill="#e2e8f0" fontSize="9">Hit</text>
      <rect x="225" y="275" width="14" height="14" rx="2" fill="#f4a81d" opacity={0.75} />
      <text x="243" y="287" fill="#e2e8f0" fontSize="9">Double</text>
      <rect x="325" y="275" width="14" height="14" rx="2" fill="#a855f7" opacity={0.75} />
      <text x="343" y="287" fill="#e2e8f0" fontSize="9">Split</text>
      <text x="55" y="305" fill="#94a3b8" fontSize="8">Dealer Upcard columns 2 3 4 5 6 7 8 9 10 A</text>
    </svg>
  )
}

export function BJS17vsH17Svg() {
  return (
    <svg viewBox="0 0 600 180" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="180" fill="#1a1a2e" />
      <rect x="25" y="25" width="265" height="130" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
      <text x="157" y="52" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">S17</text>
      <text x="157" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="11">{`A+6 -> Stand`}</text>
      <text x="157" y="95" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">{`Player +0.22%`}</text>
      <text x="157" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Dealer stands on soft 17</text>
      <text x="157" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9">(favorable to player)</text>

      <rect x="310" y="25" width="265" height="130" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
      <text x="442" y="52" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">H17</text>
      <text x="442" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="11">{`A+6 -> Hit`}</text>
      <text x="442" y="95" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">{`Casino +0.22%`}</text>
      <text x="442" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Dealer hits on soft 17</text>
      <text x="442" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9">(favorable to house)</text>
    </svg>
  )
}

export function BJPayout3to2Svg() {
  return (
    <svg viewBox="0 0 600 270" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="270" fill="#1a1a2e" />
      <text x="300" y="28" textAnchor="middle" fill="#f4a81d" fontSize="16" fontWeight="bold">3:2 Blackjack Payout</text>
      <rect x="150" y="40" width="130" height="30" rx="0" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="215" y="60" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">Bet</text>
      <rect x="280" y="40" width="130" height="30" rx="0" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="345" y="60" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">Payout</text>
      {[
        ["$5", "$7.50"],
        ["$10", "$15"],
        ["$15", "$22.50"],
        ["$25", "$37.50"],
        ["$50", "$75"],
        ["$100", "$150"],
      ].map((row, i) => (
        <g key={i}>
          <rect x="150" y={72 + i * 28} width="130" height="26" rx="0" fill={i % 2 === 0 ? "#1e293b" : "#1a1a2e"} stroke="#334155" strokeWidth="0.5" />
          <text x="215" y={90 + i * 28} textAnchor="middle" fill="#e2e8f0" fontSize="13">{row[0]}</text>
          <rect x="280" y={72 + i * 28} width="130" height="26" rx="0" fill={i % 2 === 0 ? "#1e293b" : "#1a1a2e"} stroke="#334155" strokeWidth="0.5" />
          <text x="345" y={90 + i * 28} textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">{row[1]}</text>
        </g>
      ))}
    </svg>
  )
}

export function BJInsuranceProofSvg() {
  return (
    <svg viewBox="0 0 600 220" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="220" fill="#1a1a2e" />
      <text x="50" y="35" fill="#94a3b8" fontSize="10">Insurance win probability</text>
      <rect x="50" y="55" width="185" height="40" rx="4" fill="#ef4444" />
      <text x="142" y="80" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Actual: 30.8%</text>
      <line x1="50" y1="115" x2="350" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="50" y="125" width="200" height="40" rx="4" fill="#f4a81d" opacity={0.85} />
      <text x="150" y="150" textAnchor="middle" fill="#1a1a2e" fontSize="14" fontWeight="bold">Fair: 33.3%</text>
      <text x="300" y="145" fill="#f4a81d" fontSize="16" fontWeight="bold" transform="rotate(0 300 145)">30.8%</text>
      <text x="300" y="110" fill="#ef4444" fontSize="16" fontWeight="bold">33.3%</text>
      <text x="300" y="180" fill="#94a3b8" fontSize="13">{`Difference -> 2.5% house edge`}</text>
      <text x="50" y="195" fill="#ef4444" fontSize="13" fontWeight="bold">Insurance loses long-term</text>
    </svg>
  )
}

export function BJDecksHESvg() {
  const data = [
    { label: "1 deck", val: 0.0016 },
    { label: "2 deck", val: 0.0046 },
    { label: "4 deck", val: 0.0060 },
    { label: "6 deck", val: 0.0064 },
    { label: "8 deck", val: 0.0066 },
  ]
  const maxW = 360
  const scale = maxW / 0.008

  return (
    <svg viewBox="0 0 600 260" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="260" fill="#1a1a2e" />
      <text x="300" y="25" textAnchor="middle" fill="#f4a81d" fontSize="15" fontWeight="bold">House Edge by Deck Count</text>
      {data.map((d, i) => (
        <g key={d.label}>
          <text x="80" y={58 + i * 38} textAnchor="end" fill="#e2e8f0" fontSize="11">{d.label}</text>
          <rect x="95" y={45 + i * 38} width={d.val * scale} height="22" rx="3" fill="#22c55e" opacity={0.8} />
          <text x={105 + d.val * scale} y={61 + i * 38} fill="#e2e8f0" fontSize="11">{(d.val * 100).toFixed(2)}%</text>
        </g>
      ))}
      <line x1="95" y1="235" x2="455" y2="235" stroke="#334155" strokeWidth="2" />
      <text x="275" y="252" textAnchor="middle" fill="#94a3b8" fontSize="9">More decks = higher house edge</text>
    </svg>
  )
}

export function BJBustProbSvg() {
  const data = [
    { hand: 12, prob: 31 },
    { hand: 13, prob: 39 },
    { hand: 14, prob: 56 },
    { hand: 15, prob: 58 },
    { hand: 16, prob: 62 },
    { hand: 17, prob: 69 },
    { hand: 18, prob: 77 },
    { hand: 19, prob: 85 },
    { hand: 20, prob: 92 },
  ]
  const barH = 17
  const maxBarW = 380
  const scaleX = maxBarW / 100

  return (
    <svg viewBox="0 0 600 260" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="260" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Player Bust Probability by Hand Total</text>
      {data.map((d, i) => (
        <g key={d.hand}>
          <text x="55" y={52 + i * (barH + 6)} textAnchor="end" fill="#e2e8f0" fontSize="11">{d.hand}</text>
          <rect x="65" y={42 + i * (barH + 6)} width={d.prob * scaleX} height={barH} rx="3" fill="#ef4444" opacity={0.85} />
          <text x={75 + d.prob * scaleX} y={56 + i * (barH + 6)} fill="#e2e8f0" fontSize="10">{d.prob}%</text>
        </g>
      ))}
      <text x="300" y="248" textAnchor="middle" fill="#94a3b8" fontSize="10">Higher total = higher bust chance</text>
    </svg>
  )
}

export function BJHiLoSvg() {
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
  const values = [1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1]

  return (
    <svg viewBox="0 0 600 145" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="145" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">Hi-Lo Card Counting</text>
      {ranks.map((r, i) => {
        const x = 20 + i * 44
        const v = values[i]
        const bg = v === 1 ? "#22c55e" : v === -1 ? "#ef4444" : "#334155"
        const label = v === 1 ? `+1` : v === -1 ? `-1` : `0`
        return (
          <g key={i}>
            <rect x={x} y="40" width="40" height="28" rx="4" fill={bg} opacity={0.85} />
            <text x={x + 20} y={59} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">{r}</text>
            <rect x={x} y="74" width="40" height="28" rx="4" fill={bg} opacity={0.6} />
            <text x={x + 20} y={93} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{label}</text>
          </g>
        )
      })}
      <text x="300" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">2-6: +1    7-9: 0    10-A: -1</text>
    </svg>
  )
}

export function BJRCtoTCSvg() {
  return (
    <svg viewBox="0 0 600 170" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="170" fill="#1a1a2e" />
      <rect x="20" y="50" width="120" height="50" rx="6" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <text x="80" y="72" textAnchor="middle" fill="#f4a81d" fontSize="10">Running Count</text>
      <text x="80" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">RC: +9</text>
      <text x="190" y="78" fill="#94a3b8" fontSize="36">{`/`}</text>
      <rect x="210" y="55" width="130" height="40" rx="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="275" y="73" textAnchor="middle" fill="#94a3b8" fontSize="9">3 decks remaining</text>
      <text x="275" y="87" textAnchor="middle" fill="#94a3b8" fontSize="9">(approx)</text>
      <text x="385" y="78" fill="#94a3b8" fontSize="36">{`=`}</text>
      <rect x="410" y="50" width="120" height="50" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
      <text x="470" y="72" textAnchor="middle" fill="#22c55e" fontSize="10">True Count</text>
      <text x="470" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">TC: +3</text>
      <line x1="470" y1="115" x2="470" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="410" y="133" width="120" height="28" rx="5" fill="#22c55e" opacity={0.2} stroke="#22c55e" strokeWidth="1" />
      <text x="470" y="152" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Advantage: +1.5%</text>
    </svg>
  )
}

export function BJTeamPlaySvg() {
  return (
    <svg viewBox="0 0 600 180" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="180" fill="#1a1a2e" />
      <rect x="40" y="45" width="130" height="70" rx="8" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="105" cy="65" r="16" fill="#94a3b8" />
      <rect x="82" y="82" width="46" height="28" rx="3" fill="#94a3b8" />
      <text x="105" y="65" textAnchor="middle" fill="#1a1a2e" fontSize="9">:)</text>
      <text x="105" y="130" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">Spotter</text>
      <text x="105" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">(counts cards)</text>

      <rect x="430" y="45" width="130" height="70" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
      <circle cx="495" cy="65" r="16" fill="#e2e8f0" />
      <rect x="472" y="82" width="46" height="28" rx="3" fill="#e2e8f0" />
      <text x="495" y="65" textAnchor="middle" fill="#1a1a2e" fontSize="9">$</text>
      <text x="495" y="130" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Big Player</text>
      <text x="495" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">(big bets)</text>

      <line x1="170" y1="80" x2="250" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="250,80 240,74 240,86" fill="#94a3b8" />
      <text x="210" y="72" textAnchor="middle" fill="#f4a81d" fontSize="10">Signal</text>

      <line x1="290" y1="80" x2="430" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="430,80 420,74 420,86" fill="#94a3b8" />
      <text x="360" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9">Enters table</text>
    </svg>
  )
}

export function BJShuffleTrackSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="30" y="45" width="540" height="52" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="40" y="52" width="160" height="38" rx="3" fill="#22c55e" opacity={0.35} />
      <text x="120" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Zone A</text>
      <text x="120" y="88" textAnchor="middle" fill="#22c55e" fontSize="8">10s / Aces High</text>
      <rect x="208" y="52" width="184" height="38" rx="3" fill="#f4a81d" opacity={0.25} />
      <text x="300" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Zone B</text>
      <text x="300" y="88" textAnchor="middle" fill="#f4a81d" fontSize="8">Mixed</text>
      <rect x="400" y="52" width="160" height="38" rx="3" fill="#ef4444" opacity={0.35} />
      <text x="480" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Zone C</text>
      <text x="480" y="88" textAnchor="middle" fill="#ef4444" fontSize="8">Low Cards</text>
      <line x1="40" y1="110" x2="200" y2="155" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />
      <line x1="310" y1="110" x2="310" y2="155" stroke="#f4a81d" strokeWidth="2" markerEnd="url(#arrowYellow)" />
      <line x1="560" y1="110" x2="400" y2="155" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
      <text x="300" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">Zones tracked through shuffle</text>
      <defs>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#22c55e" />
        </marker>
        <marker id="arrowYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f4a81d" />
        </marker>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
        </marker>
      </defs>
    </svg>
  )
}

export function BJEdgeSortingSvg() {
  return (
    <svg viewBox="0 0 600 210" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="210" fill="#1a1a2e" />
      <text x="300" y="25" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Edge Sorting</text>
      <rect x="70" y="50" width="180" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <circle cx="160" cy="110" r="35" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="160" cy="110" r="4" fill="#f4a81d" />
      <line x1="160" y1="50" x2="160" y2="75" stroke="#334155" strokeWidth="1" />
      <line x1="160" y1="145" x2="160" y2="170" stroke="#334155" strokeWidth="1" />
      <line x1="70" y1="110" x2="125" y2="110" stroke="#334155" strokeWidth="1" />
      <line x1="195" y1="110" x2="250" y2="110" stroke="#334155" strokeWidth="1" />
      <text x="160" y="188" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Normal cut</text>
      <text x="160" y="202" textAnchor="middle" fill="#94a3b8" fontSize="8">Centered diamond</text>

      <rect x="350" y="50" width="180" height="120" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
      <circle cx="440" cy="107" r="35" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="437" cy="104" r="4" fill="#f4a81d" />
      <line x1="350" y1="107" x2="405" y2="107" stroke="#334155" strokeWidth="1" />
      <line x1="475" y1="107" x2="530" y2="107" stroke="#334155" strokeWidth="1" />
      <line x1="437" y1="50" x2="437" y2="73" stroke="#334155" strokeWidth="1" />
      <line x1="437" y1="142" x2="437" y2="170" stroke="#334155" strokeWidth="1" />
      <text x="440" y="188" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Off-center (0.3mm)</text>
      <text x="440" y="202" textAnchor="middle" fill="#94a3b8" fontSize="8">Shifted diamond</text>

      <path d="M250,158 L260,150 L268,158 L260,166 Z" fill="none" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="280" y="162" fill="#f4a81d" fontSize="9">{`0.3mm diff ->`}</text>
    </svg>
  )
}

export function BJHoleCardSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Hole Card Peeking Technique</text>
      {[
        { x: 40, grade: "A", label: "Lift too high", status: "Bad", color: "#ef4444", angle: 20 },
        { x: 240, grade: "B", label: "Wrong angle", status: "Bad", color: "#ef4444", angle: -15 },
        { x: 440, grade: "C", label: "Flat peek", status: "Good", color: "#22c55e", angle: 3 },
      ].map((p) => (
        <g key={p.grade}>
          <rect x={p.x} y="40" width="145" height="135" rx="6" fill="#1e293b" stroke={p.color} strokeWidth="2" />
          <rect x={p.x + 30} y="70" width="80" height="50" rx="4" fill="#f4a81d" stroke="#e2e8f0" strokeWidth="1" transform={`rotate(${p.angle} ${p.x + 70} ${95})`} />
          <line x1={p.x + 70} y1="55" x2={p.x + 55} y2="65" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          <line x1={p.x + 72} y1="55" x2={p.x + 80} y2="68" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          <text x={p.x + 112} y="155" textAnchor="middle" fill={p.color} fontSize="12" fontWeight="bold">{p.label}</text>
          <text x={p.x + 112} y="171" textAnchor="middle" fill={p.color} fontSize="10">({p.status})</text>
          {p.status === "Good" && (
            <circle cx={p.x + 112} cy="140" r="9" fill="#22c55e" />
          )}
          {p.status === "Good" && (
            <text x={p.x + 112} y="144" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">V</text>
          )}
          {p.status === "Bad" && (
            <line x1={p.x + 104} y1="135" x2={p.x + 120} y2="148" stroke="#ef4444" strokeWidth="2.5" />
          )}
          {p.status === "Bad" && (
            <line x1={p.x + 120} y1="135" x2={p.x + 104} y2="148" stroke="#ef4444" strokeWidth="2.5" />
          )}
        </g>
      ))}
    </svg>
  )
}

export function BJChipTraySvg() {
  const chips = [
    { val: "$1", color: "#e2e8f0", text: "White", textColor: "#1a1a2e" },
    { val: "$5", color: "#ef4444", text: "Red", textColor: "#fff" },
    { val: "$25", color: "#22c55e", text: "Green", textColor: "#fff" },
    { val: "$100", color: "#0f172a", text: "Black", textColor: "#e2e8f0" },
    { val: "$500", color: "#a855f7", text: "Purple", textColor: "#fff" },
    { val: "$1000", color: "#f97316", text: "Orange", textColor: "#fff" },
  ]

  return (
    <svg viewBox="0 0 600 330" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="330" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="15" fontWeight="bold">Chip Tray Layout</text>
      {chips.map((c, i) => {
        const y = 40 + i * 42
        return (
          <g key={c.val}>
            <line x1="60" y1={y + 11} x2="80" y2={y + 11} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowChip)" />
            <text x="82" y={y + 15} fill="#94a3b8" fontSize="8">Remove</text>
            <circle cx="150" cy={y + 11} r="14" fill={c.color} stroke="#334155" strokeWidth="1.5" />
            <circle cx="170" cy={y + 11} r="14" fill={c.color} stroke="#334155" strokeWidth="1.5" />
            <circle cx="190" cy={y + 11} r="14" fill={c.color} stroke="#334155" strokeWidth="1.5" />
            <text x="210" y={y + 16} fill="#e2e8f0" fontSize="11">{c.val}</text>
            <text x="270" y={y + 16} fill="#94a3b8" fontSize="9">{c.text}</text>
            <rect x={c.color === "#e2e8f0" ? 310 : 315} y={y + 3} width={c.color === "#e2e8f0" ? 12 : 16} height="16" rx="2" fill={c.color} stroke="#334155" strokeWidth="1" />
          </g>
        )
      })}
      <line x1="60" y1="292" x2="400" y2="292" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      <text x="60" y="310" fill="#94a3b8" fontSize="9">Removal order arrows on the left</text>
      <defs>
        <marker id="arrowChip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  )
}

export function BJPayoutCalcSvg() {
  return (
    <svg viewBox="0 0 600 250" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="250" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="15" fontWeight="bold">Blackjack Payout Calculation</text>

      <rect x="30" y="45" width="130" height="40" rx="6" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <text x="95" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">Original Bet</text>
      <text x="95" y="79" textAnchor="middle" fill="#f4a81d" fontSize="16" fontWeight="bold">$25</text>

      <text x="170" y="69" textAnchor="middle" fill="#94a3b8" fontSize="18">{`x`}</text>

      <rect x="190" y="45" width="110" height="40" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
      <text x="245" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">BJ Multiplier</text>
      <text x="245" y="79" textAnchor="middle" fill="#22c55e" fontSize="15" fontWeight="bold">3:2 = 1.5</text>

      <text x="310" y="69" textAnchor="middle" fill="#94a3b8" fontSize="18">{`=`}</text>

      <rect x="330" y="40" width="140" height="50" rx="6" fill="#1e293b" stroke="#f4a81d" strokeWidth="2" />
      <text x="400" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9">Payout (winnings)</text>
      <text x="400" y="78" textAnchor="middle" fill="#22c55e" fontSize="17" fontWeight="bold">$25 x 1.5</text>

      <line x1="400" y1="95" x2="400" y2="115" stroke="#94a3b8" strokeWidth="1.5" />

      <rect x="330" y="118" width="140" height="40" rx="6" fill="#22c55e" opacity={0.15} stroke="#22c55e" strokeWidth="1.5" />
      <text x="400" y="135" textAnchor="middle" fill="#22c55e" fontSize="10">Winnings</text>
      <text x="400" y="152" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">$37.50</text>

      <text x="480" y="142" textAnchor="middle" fill="#94a3b8" fontSize="18">{`+`}</text>

      <rect x="495" y="118" width="90" height="40" rx="6" fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="540" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Return bet</text>
      <text x="540" y="152" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">$25.00</text>

      <line x1="300" y1="170" x2="300" y2="195" stroke="#94a3b8" strokeWidth="1.5" />

      <rect x="180" y="198" width="240" height="42" rx="8" fill="#f4a81d" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="216" textAnchor="middle" fill="#1a1a2e" fontSize="12">Total Return</text>
      <text x="300" y="234" textAnchor="middle" fill="#1a1a2e" fontSize="18" fontWeight="bold">$62.50</text>
    </svg>
  )
}

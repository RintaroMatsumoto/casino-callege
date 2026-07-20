export function CrapsTableTopSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {/* table outline bathtub shape */}
      <ellipse cx="300" cy="100" rx="280" ry="85" fill="none" stroke="#f4a81d" strokeWidth="3" />
      {/* center PROP area */}
      <rect x="270" y="50" width="60" height="100" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="300" y="95" textAnchor="middle" fill="#f4a81d" fontSize="9" fontWeight="bold">PROP</text>
      <text x="300" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="7">BETS</text>
      {/* left side */}
      <rect x="60" y="75" width="160" height="50" rx="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <text x="140" y="97" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">PASS LINE</text>
      <text x="140" y="112" textAnchor="middle" fill="#94a3b8" fontSize="7">Come-out / Point</text>
      {/* right side */}
      <rect x="380" y="75" width="160" height="50" rx="4" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="97" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">DON'T PASS</text>
      <text x="460" y="112" textAnchor="middle" fill="#94a3b8" fontSize="7">Bar 12</text>
      {/* place numbers left */}
      {[4, 5, 6].map((n, i) => (
        <g key={`pl-${n}`}>
          <rect x={72 + i * 50} y="30" width="36" height="28" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1" />
          <text x={90 + i * 50} y="49" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">{n}</text>
        </g>
      ))}
      {/* place numbers right */}
      {[8, 9, 10].map((n, i) => (
        <g key={`pr-${n}`}>
          <rect x={422 + i * 50} y="30" width="36" height="28" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1" />
          <text x={440 + i * 50} y="49" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">{n}</text>
        </g>
      ))}
      {/* come/don't come */}
      <rect x="140" y="140" width="80" height="30" rx="3" fill="none" stroke="#22c55e" strokeWidth="1" />
      <text x="180" y="159" textAnchor="middle" fill="#22c55e" fontSize="9">COME</text>
      <rect x="380" y="140" width="80" height="30" rx="3" fill="none" stroke="#ef4444" strokeWidth="1" />
      <text x="420" y="159" textAnchor="middle" fill="#ef4444" fontSize="9">DON'T COME</text>
      {/* field bet */}
      <rect x="240" y="140" width="120" height="30" rx="3" fill="none" stroke="#f4a81d" strokeWidth="1" />
      <text x="300" y="159" textAnchor="middle" fill="#f4a81d" fontSize="9">FIELD</text>
      {/* mirror labels */}
      <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="7">Both ends mirrored - Table seats up to 16 players</text>
    </svg>
  );
}

export function CrapsTableSideSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {/* table surface */}
      <rect x="80" y="90" width="440" height="40" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="114" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">TABLE LAYOUT / FELT</text>
      {/* Boxman seated center */}
      <circle cx="300" cy="70" r="16" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <rect x="292" y="54" width="16" height="10" rx="3" fill="#3b82f6" />
      <text x="300" y="48" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">BOXMAN</text>
      <text x="300" y="148" textAnchor="middle" fill="#94a3b8" fontSize="7">(Seated)</text>
      {/* Base Dealer Left */}
      <circle cx="180" cy="70" r="16" fill="none" stroke="#22c55e" strokeWidth="2" />
      <rect x="172" y="54" width="16" height="18" rx="3" fill="#22c55e" />
      <text x="180" y="48" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">BASE DEALER</text>
      <text x="180" y="138" textAnchor="middle" fill="#94a3b8" fontSize="7">(Standing)</text>
      {/* Base Dealer Right */}
      <circle cx="420" cy="70" r="16" fill="none" stroke="#22c55e" strokeWidth="2" />
      <rect x="412" y="54" width="16" height="18" rx="3" fill="#22c55e" />
      <text x="420" y="48" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">BASE DEALER</text>
      <text x="420" y="138" textAnchor="middle" fill="#94a3b8" fontSize="7">(Standing)</text>
      {/* Stickman opposite side */}
      <circle cx="300" cy="190" r="16" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <rect x="292" y="174" width="16" height="18" rx="3" fill="#f4a81d" />
      <text x="300" y="168" textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">STICKMAN</text>
      <text x="300" y="210" textAnchor="middle" fill="#94a3b8" fontSize="7" visibility="hidden">.</text>
      {/* stick */}
      <line x1="300" y1="174" x2="300" y2="130" stroke="#f4a81d" strokeWidth="1.5" />
      {/* player positions */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`p${i}`} cx={130 + i * 120} cy="170" r="8" fill="#94a3b8" opacity="0.5" />
      ))}
      <text x="60" y="174" fill="#94a3b8" fontSize="8">Players</text>
    </svg>
  );
}

export function DiceGrid36Svg() {
  const diceFaces: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
    6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]],
  };

  const rows = [1, 2, 3, 4, 5, 6];
  const cols = [1, 2, 3, 4, 5, 6];

  return (
    <svg viewBox="0 0 600 400" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="400" fill="#1a1a2e" />
      <text x="300" y="20" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">
        36 Possible Dice Combinations (6x6)
      </text>
      <text x="300" y="35" textAnchor="middle" fill="#94a3b8" fontSize="9">
        Rows = Die 1 value, Columns = Die 2 value
      </text>

      {rows.map((r, ri) =>
        cols.map((c, ci) => {
          const sum = r + c;
          const isSeven = sum === 7;
          const cx = 60 + ci * 86;
          const cy = 55 + ri * 52;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={cx - 38}
                y={cy - 18}
                width={76}
                height={44}
                rx={4}
                fill={isSeven ? "#f4a81d" : "none"}
                fillOpacity={isSeven ? 0.15 : 1}
                stroke={isSeven ? "#f4a81d" : "#334155"}
                strokeWidth={isSeven ? 2 : 1}
              />
              {/* die 1 */}
              <rect x={cx - 30} y={cy - 10} width={22} height={22} rx={3} fill="#1e293b" stroke="#475569" strokeWidth="1" />
              {diceFaces[r].map((p, pi) => (
                <circle key={`d1-${pi}`} cx={cx - 19 + p[0] * 6} cy={cy + 1 + p[1] * 6} r="2.5" fill="#e2e8f0" />
              ))}
              {/* die 2 */}
              <rect x={cx + 8} y={cy - 10} width={22} height={22} rx={3} fill="#1e293b" stroke="#475569" strokeWidth="1" />
              {diceFaces[c].map((p, pi) => (
                <circle key={`d2-${pi}`} cx={cx + 19 + p[0] * 6} cy={cy + 1 + p[1] * 6} r="2.5" fill="#e2e8f0" />
              ))}
              {/* sum */}
              <text
                x={cx}
                y={cy + 15}
                textAnchor="middle"
                fill={isSeven ? "#f4a81d" : "#e2e8f0"}
                fontSize={isSeven ? "12" : "10"}
                fontWeight={isSeven ? "bold" : "normal"}
              >
                Sum: {sum}
              </text>
            </g>
          );
        })
      )}
      <text x="300" y="380" textAnchor="middle" fill="#94a3b8" fontSize="8">
        Gold-highlighted cells = Sum of 7 (6 out of 36 combinations, most likely outcome)
      </text>
    </svg>
  );
}

export function DiceFaceDetailSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {/* die face */}
      <rect x="60" y="30" width="120" height="120" rx="10" fill="#1e293b" stroke="#f4a81d" strokeWidth="3" />
      {/* pips - showing face 5 */}
      {[[-30, -30], [-30, 30], [0, 0], [30, -30], [30, 30]].map((p, i) => (
        <circle key={i} cx={120 + p[0]} cy={90 + p[1]} r="8" fill="#e2e8f0" />
      ))}
      {/* dimension lines */}
      <line x1="60" y1="165" x2="180" y2="165" stroke="#3b82f6" strokeWidth="1" />
      <line x1="60" y1="160" x2="60" y2="170" stroke="#3b82f6" strokeWidth="1" />
      <line x1="180" y1="160" x2="180" y2="170" stroke="#3b82f6" strokeWidth="1" />
      <text x="120" y="180" textAnchor="middle" fill="#3b82f6" fontSize="10">19.05 mm (3/4 inch)</text>
      {/* side dimension */}
      <line x1="200" y1="30" x2="200" y2="150" stroke="#3b82f6" strokeWidth="1" />
      <line x1="195" y1="30" x2="205" y2="30" stroke="#3b82f6" strokeWidth="1" />
      <line x1="195" y1="150" x2="205" y2="150" stroke="#3b82f6" strokeWidth="1" />
      <text x="212" y="95" fill="#3b82f6" fontSize="10">19.05 mm</text>
      {/* pip detail callout */}
      <rect x="260" y="40" width="120" height="80" rx="6" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <circle cx="300" cy="65" r="12" fill="#e2e8f0" />
      <text x="300" y="70" textAnchor="middle" fill="#1a1a2e" fontSize="8">0.43mm</text>
      <line x1="225" y1="65" x2="255" y2="65" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
      {/* labels */}
      <text x="320" y="105" fill="#e2e8f0" fontSize="9">Pip depth: 0.43mm</text>
      <text x="320" y="120" fill="#94a3b8" fontSize="8">Drilled then filled</text>
      {/* serial & logo area */}
      <rect x="420" y="40" width="150" height="80" rx="6" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="495" y="60" textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">SERIAL NUMBER</text>
      <rect x="435" y="70" width="120" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
      <text x="495" y="84" textAnchor="middle" fill="#94a3b8" fontSize="7">CS-2024-XXXXXX</text>
      <text x="495" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">LOGO LOCATION</text>
      <rect x="465" y="110" width="60" height="8" rx="2" fill="#334155" />
    </svg>
  );
}

export function DiceSumProbSvg() {
  const probs: [number, number, string, string][] = [
    [2, 2.78, "#475569", "#475569"],
    [3, 5.56, "#475569", "#475569"],
    [4, 8.33, "#475569", "#475569"],
    [5, 11.11, "#475569", "#475569"],
    [6, 13.89, "#475569", "#475569"],
    [7, 16.67, "#f4a81d", "#f4a81d"],
    [8, 13.89, "#475569", "#475569"],
    [9, 11.11, "#475569", "#475569"],
    [10, 8.33, "#475569", "#475569"],
    [11, 5.56, "#475569", "#475569"],
    [12, 2.78, "#475569", "#475569"],
  ];

  return (
    <svg viewBox="0 0 600 250" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="250" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">Dice Sum Probability Distribution</text>
      {probs.map(([sum, prob, color, _], i) => (
        <g key={i}>
          <text x="40" y={48 + i * 17} fill={color} fontSize="10" fontWeight="bold" textAnchor="end">
            Sum {sum}
          </text>
          <rect
            x="55"
            y={38 + i * 17}
            width={prob * 20}
            height="14"
            rx="3"
            fill={color}
            fillOpacity={sum === 7 ? 0.9 : 0.4}
          />
          <text x={60 + prob * 20} y={50 + i * 17} fill={color} fontSize="9">
            {prob}%
          </text>
        </g>
      ))}
      <line x1="55" y1="232" x2="55" y2="228" stroke="#94a3b8" strokeWidth="1" />
      <line x1="55" y1="232" x2="495" y2="232" stroke="#94a3b8" strokeWidth="1" />
      <line x1="495" y1="232" x2="495" y2="228" stroke="#94a3b8" strokeWidth="1" />
      <text x="275" y="245" textAnchor="middle" fill="#94a3b8" fontSize="7">Probability (%)</text>
    </svg>
  );
}

export function PassLineTreeSvg() {
  return (
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="300" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">Pass Line Decision Tree</text>
      {/* root */}
      <rect x="235" y="28" width="130" height="28" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="300" y="47" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">COME-OUT ROLL</text>
      {/* 7/11 branch */}
      <line x1="235" y1="56" x2="80" y2="85" stroke="#22c55e" strokeWidth="2" />
      <rect x="10" y="85" width="140" height="26" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
      <text x="80" y="102" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">7 or 11 = WIN</text>
      <text x="80" y="118" textAnchor="middle" fill="#94a3b8" fontSize="7">Probability: 22.2%</text>
      {/* 2/3/12 branch */}
      <line x1="300" y1="56" x2="300" y2="85" stroke="#ef4444" strokeWidth="2" />
      <rect x="230" y="85" width="140" height="26" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
      <text x="300" y="102" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">2, 3, or 12 = LOSE</text>
      <text x="300" y="118" textAnchor="middle" fill="#94a3b8" fontSize="7">Probability: 11.1%</text>
      {/* Point branch */}
      <line x1="365" y1="56" x2="520" y2="85" stroke="#3b82f6" strokeWidth="2" />
      <rect x="440" y="85" width="150" height="26" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1" />
      <text x="515" y="102" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Point = 4,5,6,8,9,10</text>
      <text x="515" y="118" textAnchor="middle" fill="#94a3b8" fontSize="7">Probability: 66.7%</text>
      {/* point resolution */}
      <line x1="515" y1="111" x2="515" y2="140" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="360" y="140" width="310" height="50" rx="4" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="515" y="157" textAnchor="middle" fill="#3b82f6" fontSize="9">Roll Point again before 7 = WIN</text>
      <text x="515" y="172" textAnchor="middle" fill="#ef4444" fontSize="9">Roll 7 before Point = LOSE</text>
      <text x="515" y="187" textAnchor="middle" fill="#94a3b8" fontSize="7">Varies by point number</text>
      {/* final result */}
      <line x1="515" y1="190" x2="515" y2="220" stroke="#f4a81d" strokeWidth="2" />
      <rect x="210" y="220" width="180" height="28" rx="5" fill="#f4a81d" fillOpacity="0.15" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="240" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">FINAL: 49.29% WIN</text>
      <text x="300" y="258" textAnchor="middle" fill="#94a3b8" fontSize="7">House Edge: 1.41% (lowest on table)</text>
    </svg>
  );
}

export function DontPassTreeSvg() {
  return (
    <svg viewBox="0 0 600 280" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="280" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">Don't Pass Decision Tree</text>
      {/* root */}
      <rect x="235" y="28" width="130" height="28" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="300" y="47" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">COME-OUT ROLL</text>
      {/* 2/3 win */}
      <line x1="235" y1="56" x2="60" y2="80" stroke="#22c55e" strokeWidth="2" />
      <rect x="5" y="80" width="110" height="24" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
      <text x="60" y="96" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">2 or 3 = WIN</text>
      {/* 12 push */}
      <line x1="260" y1="56" x2="200" y2="80" stroke="#94a3b8" strokeWidth="2" />
      <rect x="145" y="80" width="110" height="24" rx="4" fill="#94a3b8" fillOpacity="0.2" stroke="#94a3b8" strokeWidth="1" />
      <text x="200" y="96" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">12 = PUSH</text>
      {/* 7/11 lose */}
      <line x1="340" y1="56" x2="400" y2="80" stroke="#ef4444" strokeWidth="2" />
      <rect x="345" y="80" width="110" height="24" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
      <text x="400" y="96" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">7 or 11 = LOSE</text>
      {/* point */}
      <line x1="365" y1="56" x2="530" y2="80" stroke="#3b82f6" strokeWidth="2" />
      <rect x="460" y="80" width="130" height="24" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1" />
      <text x="525" y="96" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Point Established</text>
      {/* point resolution */}
      <line x1="525" y1="104" x2="525" y2="140" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="380" y="140" width="290" height="50" rx="4" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="525" y="157" textAnchor="middle" fill="#22c55e" fontSize="9">Roll 7 before Point = WIN</text>
      <text x="525" y="172" textAnchor="middle" fill="#ef4444" fontSize="9">Roll Point before 7 = LOSE</text>
      <text x="525" y="187" textAnchor="middle" fill="#94a3b8" fontSize="7">Player is the underdog on point</text>
      {/* final */}
      <line x1="525" y1="190" x2="300" y2="220" stroke="#f4a81d" strokeWidth="2" />
      <rect x="200" y="215" width="200" height="28" rx="5" fill="#f4a81d" fillOpacity="0.15" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="234" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">HOUSE EDGE: 1.36%</text>
      <text x="300" y="252" textAnchor="middle" fill="#94a3b8" fontSize="7">Slightly better than Pass Line!</text>
    </svg>
  );
}

export function CrapsHard4Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">HARD 4 (2 + 2)</text>
      {/* hard 4 */}
      <rect x="40" y="50" width="180" height="80" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="2" />
      <text x="130" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">HARD 4 = 2 + 2</text>
      <rect x="78" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <circle cx="86" cy="93" r="3" fill="#e2e8f0" />
      <circle cx="98" cy="105" r="3" fill="#e2e8f0" />
      <rect x="114" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <circle cx="122" cy="93" r="3" fill="#e2e8f0" />
      <circle cx="134" cy="105" r="3" fill="#e2e8f0" />
      <text x="155" y="104" fill="#22c55e" fontSize="18" fontWeight="bold">{'\u2713'}</text>
      {/* easy 4 */}
      <rect x="280" y="50" width="280" height="80" rx="6" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="420" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">EASY 4 = 1+3 or 3+1</text>
      <rect x="310" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <circle cx="324" cy="99" r="3" fill="#e2e8f0" />
      <rect x="346" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      {[[-4, -6], [0, 0], [4, 6]].map((p, i) => (
        <circle key={i} cx={360 + p[0]} cy={99 + p[1]} r="3" fill="#e2e8f0" />
      ))}
      <text x="390" y="104" fill="#ef4444" fontSize="18">{'\u2717'}</text>
      {/* same reversed */}
      <rect x="410" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      {[[-4, -6], [0, 0], [4, 6]].map((p, i) => (
        <circle key={`r-${i}`} cx={424 + p[0]} cy={99 + p[1]} r="3" fill="#e2e8f0" />
      ))}
      <rect x="446" y="85" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <circle cx={460} cy={99} r="3" fill="#e2e8f0" />
      <text x="490" y="104" fill="#ef4444" fontSize="18">{'\u2717'}</text>
      {/* payout */}
      <rect x="200" y="155" width="200" height="30" rx="5" fill="#f4a81d" fillOpacity="0.2" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="176" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PAYOUT 7:1</text>
    </svg>
  );
}

export function CrapsHard6Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">HARD 6 (3 + 3)</text>
      {/* hard 6 */}
      <rect x="30" y="45" width="190" height="75" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="2" />
      <text x="125" y="68" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">HARD 6 = 3 + 3</text>
      {[0, 1].map((_, i) => (
        <rect key={i} x={75 + i * 40} y="80" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      ))}
      {[0, 1].map((_, i) => (
        <g key={`pips-${i}`}>
          <circle cx={83 + i * 40} cy={88} r="3" fill="#e2e8f0" />
          <circle cx={89 + i * 40} cy={94} r="3" fill="#e2e8f0" />
          <circle cx={95 + i * 40} cy={100} r="3" fill="#e2e8f0" />
        </g>
      ))}
      <text x="160" y="99" fill="#22c55e" fontSize="18" fontWeight="bold">{'\u2713'}</text>
      {/* easy 6 */}
      <rect x="280" y="45" width="290" height="75" rx="6" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="425" y="68" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">EASY 6 = 1+5, 2+4, 4+2, 5+1</text>
      <text x="425" y="85" textAnchor="middle" fill="#ef4444" fontSize="14">4 combinations {'\u2717'}</text>
      <text x="425" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">(2 of which are symmetrical duplicates)</text>
      {/* payout */}
      <rect x="200" y="150" width="200" height="30" rx="5" fill="#f4a81d" fillOpacity="0.2" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="171" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PAYOUT 9:1</text>
    </svg>
  );
}

export function CrapsHard8Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">HARD 8 (4 + 4)</text>
      {/* hard 8 */}
      <rect x="30" y="45" width="190" height="75" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="2" />
      <text x="125" y="68" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">HARD 8 = 4 + 4</text>
      {[0, 1].map((_, i) => (
        <rect key={i} x={75 + i * 40} y="80" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      ))}
      {[0, 1].map((_, i) => (
        <g key={`pips-${i}`}>
          {[[-4, -6], [-4, 6], [4, -6], [4, 6]].map((p, pi) => (
            <circle key={pi} cx={89 + i * 40 + p[0]} cy={94 + p[1]} r="3" fill="#e2e8f0" />
          ))}
        </g>
      ))}
      <text x="160" y="99" fill="#22c55e" fontSize="18" fontWeight="bold">{'\u2713'}</text>
      {/* easy 8 */}
      <rect x="280" y="45" width="290" height="75" rx="6" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="425" y="68" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">EASY 8 = 2+6, 3+5, 5+3, 6+2</text>
      <text x="425" y="85" textAnchor="middle" fill="#ef4444" fontSize="14">4 combinations {'\u2717'}</text>
      <text x="425" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">(2 of which are symmetrical duplicates)</text>
      {/* payout */}
      <rect x="200" y="150" width="200" height="30" rx="5" fill="#f4a81d" fillOpacity="0.2" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="171" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PAYOUT 9:1</text>
    </svg>
  );
}

export function CrapsHard10Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">HARD 10 (5 + 5)</text>
      {/* hard 10 */}
      <rect x="30" y="45" width="190" height="75" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="2" />
      <text x="125" y="68" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">HARD 10 = 5 + 5</text>
      {[0, 1].map((_, i) => (
        <rect key={i} x={75 + i * 40} y="80" width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      ))}
      {[0, 1].map((_, i) => (
        <g key={`pips-${i}`}>
          {[[-4, -6], [-4, 6], [0, 0], [4, -6], [4, 6]].map((p, pi) => (
            <circle key={pi} cx={89 + i * 40 + p[0]} cy={94 + p[1]} r="3" fill="#e2e8f0" />
          ))}
        </g>
      ))}
      <text x="160" y="99" fill="#22c55e" fontSize="18" fontWeight="bold">{'\u2713'}</text>
      {/* easy 10 */}
      <rect x="280" y="45" width="290" height="75" rx="6" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="425" y="68" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">EASY 10 = 4+6, 6+4</text>
      <text x="425" y="85" textAnchor="middle" fill="#ef4444" fontSize="14">2 combinations {'\u2717'}</text>
      <text x="425" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">(symmetrical duplicates)</text>
      {/* payout */}
      <rect x="200" y="150" width="200" height="30" rx="5" fill="#f4a81d" fillOpacity="0.2" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="171" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PAYOUT 7:1</text>
    </svg>
  );
}

function DicePips({ value, x, y }: { value: number; x: number; y: number }) {
  const patterns: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-5, -5], [5, 5]],
    3: [[-5, -5], [0, 0], [5, 5]],
    4: [[-5, -5], [-5, 5], [5, -5], [5, 5]],
    5: [[-5, -5], [-5, 5], [0, 0], [5, -5], [5, 5]],
    6: [[-5, -6], [-5, 0], [-5, 6], [5, -6], [5, 0], [5, 6]],
  };
  return (
    <g>
      <rect x={x - 14} y={y - 14} width="28" height="28" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      {patterns[value].map((p, i) => (
        <circle key={i} cx={x + p[0]} cy={y + p[1]} r="3" fill="#e2e8f0" />
      ))}
    </g>
  );
}

export function PlaceBet4Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 4</text>
      <DicePips value={1} x={100} y={80} />
      <text x="130" y="84" fill="#e2e8f0" fontSize="12">+</text>
      <DicePips value={3} x={160} y={80} />
      <text x="190" y="84" fill="#94a3b8" fontSize="10">or</text>
      <DicePips value={2} x={240} y={80} />
      <text x="270" y="84" fill="#e2e8f0" fontSize="12">+</text>
      <DicePips value={2} x={300} y={80} />
      <rect x="370" y="60" width="180" height="40" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="75" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Payout 9:5</text>
      <text x="460" y="90" textAnchor="middle" fill="#ef4444" fontSize="9">HE 6.67%</text>
      <text x="300" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">3 ways to roll (1+3, 2+2, 3+1)</text>
      <rect x="100" y="155" width="400" height="30" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
      <text x="300" y="176" textAnchor="middle" fill="#ef4444" fontSize="10">Highest house edge among place bets: 6.67%</text>
    </svg>
  );
}

export function PlaceBet5Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 5</text>
      <DicePips value={1} x={80} y={80} /><DicePips value={4} x={120} y={80} />
      <DicePips value={2} x={170} y={80} /><DicePips value={3} x={210} y={80} />
      <DicePips value={3} x={260} y={80} /><DicePips value={2} x={300} y={80} />
      <DicePips value={4} x={350} y={80} /><DicePips value={1} x={390} y={80} />
      <rect x="420" y="60" width="150" height="40" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="495" y="75" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">Payout 7:5</text>
      <text x="495" y="90" textAnchor="middle" fill="#f4a81d" fontSize="9">HE 4.00%</text>
      <text x="300" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">4 ways to roll (1+4, 2+3, 3+2, 4+1)</text>
    </svg>
  );
}

export function PlaceBet6Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 6</text>
      <DicePips value={1} x={60} y={80} /><DicePips value={5} x={100} y={80} />
      <DicePips value={2} x={150} y={80} /><DicePips value={4} x={190} y={80} />
      <DicePips value={3} x={240} y={80} /><DicePips value={3} x={280} y={80} />
      <DicePips value={4} x={330} y={80} /><DicePips value={2} x={370} y={80} />
      <DicePips value={5} x={420} y={80} /><DicePips value={1} x={460} y={80} />
      <rect x="230" y="120" width="280" height="40" rx="5" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
      <text x="370" y="135" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Payout 7:6</text>
      <text x="370" y="150" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">HE 0.46% - BEST ON TABLE!</text>
      <text x="300" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">5 ways to roll (1+5, 2+4, 3+3, 4+2, 5+1)</text>
    </svg>
  );
}

export function PlaceBet8Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 8</text>
      <DicePips value={2} x={60} y={80} /><DicePips value={6} x={100} y={80} />
      <DicePips value={3} x={150} y={80} /><DicePips value={5} x={190} y={80} />
      <DicePips value={4} x={240} y={80} /><DicePips value={4} x={280} y={80} />
      <DicePips value={5} x={330} y={80} /><DicePips value={3} x={370} y={80} />
      <DicePips value={6} x={420} y={80} /><DicePips value={2} x={460} y={80} />
      <rect x="230" y="120" width="280" height="40" rx="5" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
      <text x="370" y="135" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Payout 7:6</text>
      <text x="370" y="150" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">HE 0.46% - BEST ON TABLE!</text>
      <text x="300" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">5 ways to roll (2+6, 3+5, 4+4, 5+3, 6+2)</text>
    </svg>
  );
}

export function PlaceBet9Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 9</text>
      <DicePips value={3} x={80} y={80} /><DicePips value={6} x={120} y={80} />
      <DicePips value={4} x={180} y={80} /><DicePips value={5} x={220} y={80} />
      <DicePips value={5} x={280} y={80} /><DicePips value={4} x={320} y={80} />
      <DicePips value={6} x={380} y={80} /><DicePips value={3} x={420} y={80} />
      <rect x="230" y="125" width="200" height="40" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="330" y="140" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">Payout 7:5</text>
      <text x="330" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">HE 4.00%</text>
      <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">4 ways to roll (3+6, 4+5, 5+4, 6+3)</text>
    </svg>
  );
}

export function PlaceBet10Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE BET 10</text>
      <DicePips value={4} x={100} y={80} /><DicePips value={6} x={140} y={80} />
      <DicePips value={5} x={210} y={80} /><DicePips value={5} x={250} y={80} />
      <DicePips value={6} x={320} y={80} /><DicePips value={4} x={360} y={80} />
      <rect x="400" y="65" width="160" height="40" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1.5" />
      <text x="480" y="80" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Payout 9:5</text>
      <text x="480" y="95" textAnchor="middle" fill="#ef4444" fontSize="9">HE 6.67%</text>
      <text x="300" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">3 ways to roll (4+6, 5+5, 6+4)</text>
      <rect x="100" y="155" width="400" height="30" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
      <text x="300" y="176" textAnchor="middle" fill="#ef4444" fontSize="10">High house edge among place bets</text>
    </svg>
  );
}

export function Any7BetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">ANY 7 (BIG RED)</text>
      {/* combos */}
      <DicePips value={1} x={60} y={70} /><DicePips value={6} x={95} y={70} />
      <DicePips value={2} x={140} y={70} /><DicePips value={5} x={175} y={70} />
      <DicePips value={3} x={220} y={70} /><DicePips value={4} x={255} y={70} />
      <DicePips value={4} x={300} y={70} /><DicePips value={3} x={335} y={70} />
      <DicePips value={5} x={380} y={70} /><DicePips value={2} x={415} y={70} />
      <DicePips value={6} x={460} y={70} /><DicePips value={1} x={495} y={70} />
      <text x="300" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="10">
        6 ways out of 36 = 16.67% chance
      </text>
      <text x="300" y="125" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
        But only pays 4:1 (should pay 5:1 at true odds!)
      </text>
      <rect x="200" y="150" width="200" height="30" rx="5" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
      <text x="300" y="171" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">HE 16.67% - AVOID!</text>
    </svg>
  );
}

export function AnyCrapsBetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">ANY CRAPS (2, 3, or 12)</text>
      {/* 2 */}
      <rect x="60" y="50" width="130" height="50" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <DicePips value={1} x={95} y={68} /><DicePips value={1} x={130} y={68} />
      <text x="125" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Snake Eyes</text>
      {/* 3 */}
      <rect x="210" y="50" width="130" height="50" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <DicePips value={1} x={245} y={68} /><DicePips value={2} x={280} y={68} />
      <text x="275" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Ace-Deuce</text>
      {/* 12 */}
      <rect x="360" y="50" width="130" height="50" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <DicePips value={6} x={395} y={68} /><DicePips value={6} x={430} y={68} />
      <text x="425" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Boxcars</text>
      <text x="300" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10">4/36 = 11.11% probability</text>
      <text x="300" y="148" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Pays 7:1 but true odds are 8:1</text>
      <rect x="220" y="158" width="160" height="28" rx="5" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
      <text x="300" y="178" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">HE 11.11%</text>
    </svg>
  );
}

export function HornBetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">HORN BET</text>
      {/* 4 sections */}
      {[[2, "Snake Eyes"], [3, "Ace-Deuce"], [11, "Yo-leven"], [12, "Boxcars"]].map(([num, label], i) => (
        <g key={i}>
          <rect x={30 + i * 140} y="45" width="125" height="65" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
          <text x={92 + i * 140} y="65" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">{num}</text>
          <text x={92 + i * 140} y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">{label}</text>
          <text x={92 + i * 140} y="100" textAnchor="middle" fill="#f4a81d" fontSize="7">1/4 of bet</text>
        </g>
      ))}
      <line x1="155" y1="55" x2="165" y2="55" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="295" y1="55" x2="305" y2="55" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="435" y1="55" x2="445" y2="55" stroke="#94a3b8" strokeWidth="0.5" />
      <text x="300" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="11">Bet split equally among 2, 3, 11, 12</text>
      <rect x="180" y="150" width="240" height="30" rx="5" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="300" y="171" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">4-way equal split bet</text>
    </svg>
  );
}

export function WorldBetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">WORLD BET (WHIRL)</text>
      {/* horn section */}
      <rect x="15" y="40" width="280" height="50" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="155" y="60" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">HORN (2, 3, 11, 12)</text>
      <text x="155" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">4/5 of total bet</text>
      {/* any 7 section */}
      <rect x="305" y="40" width="280" height="50" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <text x="445" y="60" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">ANY 7</text>
      <text x="445" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">1/5 of total bet</text>
      {/* connecting */}
      <line x1="295" y1="65" x2="305" y2="65" stroke="#94a3b8" strokeWidth="1" />
      {/* description */}
      <text x="300" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="11">Combines Horn bet with Any 7</text>
      <text x="300" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Only bet that covers all one-roll outcomes</text>
      <rect x="180" y="155" width="240" height="30" rx="5" fill="#f4a81d" fillOpacity="0.1" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="300" y="176" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">5-way bet: Horn + Any 7</text>
    </svg>
  );
}

export function FieldBetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">FIELD BET</text>
      {/* field numbers */}
      <g>
        {[2, 3, 4, 9, 10, 11, 12].map((n, i) => (
          <g key={`field-${n}`}>
            <rect x={20 + i * 78} y="45" width="68" height="36" rx="4" fill="#0f3460" stroke="#22c55e" strokeWidth="1.5" />
            <text x={54 + i * 78} y="68" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">{n}</text>
          </g>
        ))}
      </g>
      {/* non-field numbers */}
      <g>
        {[5, 6, 7, 8].map((n, i) => (
          <g key={`nonfield-${n}`}>
            <rect x={110 + i * 78} y="100" width="68" height="36" rx="4" fill="#0f3460" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x={144 + i * 78} y="120" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">{n}</text>
            <text x={144 + i * 78} y="133" textAnchor="middle" fill="#ef4444" fontSize="14">{'\u2717'}</text>
          </g>
        ))}
      </g>
      <text x="300" y="160" textAnchor="middle" fill="#e2e8f0" fontSize="10">16/36 = 44.4% chance to win (one-roll bet)</text>
      <text x="300" y="180" textAnchor="middle" fill="#f4a81d" fontSize="10">2 and 12 pay 2:1 (or 3:1 in some casinos)</text>
    </svg>
  );
}

export function OddsBetLayoutSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">ODDS BET PLACEMENT</text>
      {/* table felt */}
      <rect x="50" y="60" width="500" height="80" rx="6" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="150" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="10">PASS LINE</text>
      {/* pass line chip */}
      <circle cx="150" cy="110" r="14" fill="#22c55e" stroke="#14532d" strokeWidth="1" />
      <text x="150" y="114" textAnchor="middle" fill="#1a1a2e" fontSize="8" fontWeight="bold">PASS</text>
      {/* odds chip behind */}
      <circle cx="220" cy="110" r="14" fill="#3b82f6" stroke="#1e3a5f" strokeWidth="1" />
      <text x="220" y="114" textAnchor="middle" fill="#1a1a2e" fontSize="8" fontWeight="bold">ODDS</text>
      {/* arrow */}
      <line x1="170" y1="110" x2="205" y2="110" stroke="#f4a81d" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#f4a81d" />
        </marker>
      </defs>
      {/* label */}
      <text x="300" y="100" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">TAKE ODDS (behind Pass Line)</text>
      <text x="300" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Place odds chips behind your Pass Line bet</text>
      <text x="300" y="138" textAnchor="middle" fill="#94a3b8" fontSize="8">after a point is established</text>
      {/* info */}
      <rect x="150" y="148" width="300" height="30" rx="4" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="1" />
      <text x="300" y="162" textAnchor="middle" fill="#22c55e" fontSize="9">Odds bet pays TRUE odds - 0% house edge!</text>
      <text x="300" y="176" textAnchor="middle" fill="#94a3b8" fontSize="7">Combined Pass Line + Odds HE drops below 0.5%</text>
    </svg>
  );
}

export function Odds3x4x5xSvg() {
  return (
    <svg viewBox="0 0 600 250" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="250" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">3X-4X-5X MAX ODDS</text>
      {/* point 4/10 */}
      <rect x="30" y="40" width="170" height="60" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1.5" />
      <text x="115" y="62" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Point 4 / 10</text>
      <text x="115" y="80" textAnchor="middle" fill="#f4a81d" fontSize="18" fontWeight="bold">3x Max</text>
      <text x="115" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">True odds 2:1</text>
      {/* point 5/9 */}
      <rect x="215" y="40" width="170" height="60" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="300" y="62" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">Point 5 / 9</text>
      <text x="300" y="80" textAnchor="middle" fill="#f4a81d" fontSize="18" fontWeight="bold">4x Max</text>
      <text x="300" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">True odds 3:2</text>
      {/* point 6/8 */}
      <rect x="400" y="40" width="170" height="60" rx="5" fill="#0f3460" stroke="#22c55e" strokeWidth="1.5" />
      <text x="485" y="62" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Point 6 / 8</text>
      <text x="485" y="80" textAnchor="middle" fill="#22c55e" fontSize="18" fontWeight="bold">5x Max</text>
      <text x="485" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">True odds 6:5</text>
      {/* explanation */}
      <text x="300" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="11">
        In 3x-4x-5x odds, the maximum free odds bet on any point
      </text>
      <text x="300" y="168" textAnchor="middle" fill="#e2e8f0" fontSize="11">
        always pays exactly 6x the Pass Line bet when you win!
      </text>
      {/* example */}
      <rect x="130" y="185" width="340" height="45" rx="5" fill="#f4a81d" fillOpacity="0.1" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="204" textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">$10 Pass + Max Odds always wins $60 on odds</text>
      <text x="300" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">Point 4/10: $30 odds x 2:1 = $60, Point 6/8: $50 odds x 6:5 = $60</text>
    </svg>
  );
}

// Simple stick figure helper
function StickFigure({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 24} r="10" fill="none" stroke={color} strokeWidth="2" />
      <line x1={x} y1={y - 14} x2={x} y2={y + 4} stroke={color} strokeWidth="2" />
      <line x1={x} y1={y - 4} x2={x + 12} y2={y - 14} stroke={color} strokeWidth="1.5" />
      <line x1={x} y1={y - 4} x2={x - 12} y2={y - 14} stroke={color} strokeWidth="1.5" />
      <line x1={x} y1={y + 4} x2={x + 10} y2={y + 20} stroke={color} strokeWidth="1.5" />
      <line x1={x} y1={y + 4} x2={x - 10} y2={y + 20} stroke={color} strokeWidth="1.5" />
      <text x={x} y={y + 40} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{label}</text>
    </g>
  );
}

export function StaffBoxmanSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">BOXMAN (Center, Seated)</text>
      <StickFigure x={300} y={100} color="#3b82f6" label="BOXMAN" />
      <text x="300" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">{'{'}Sits between two base dealers{'}'}</text>
      <text x="300" y="160" textAnchor="middle" fill="#94a3b8" fontSize="8">Supervises game, settles disputes, watches for cheating</text>
      <rect x="260" y="90" width="12" height="20" rx="2" fill="#3b82f6" />
      <text x="340" y="120" fill="#94a3b8" fontSize="7">Chip tray</text>
      <text x="340" y="132" fill="#94a3b8" fontSize="7">in front</text>
    </svg>
  );
}

export function StaffBaseDealerSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">BASE DEALER (Standing)</text>
      <StickFigure x={300} y={100} color="#22c55e" label="BASE DEALER" />
      {/* arms extended as if dealing */}
      <line x1={288} y1={86} x2={258} y2={66} stroke="#22c55e" strokeWidth="1.5" />
      <line x1={312} y1={86} x2={342} y2={66} stroke="#22c55e" strokeWidth="1.5" />
      <text x="300" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">Handles bets on one side of the table</text>
      <text x="300" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Pays winners, collects losers, places chips</text>
    </svg>
  );
}

export function StaffStickmanSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="12" fontWeight="bold">STICKMAN (Opposite Side)</text>
      <StickFigure x={300} y={100} color="#f4a81d" label="STICKMAN" />
      {/* stick */}
      <line x1="312" y1="86" x2="350" y2="50" stroke="#f4a81d" strokeWidth="2" />
      <rect x="346" y="46" width="8" height="8" rx="1" fill="#f4a81d" />
      <text x="300" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">Controls the dice with a long stick</text>
      <text x="300" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Calls results, manages center prop bets</text>
    </svg>
  );
}

export function StaffAllSvg() {
  return (
    <svg viewBox="0 0 600 220" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="220" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">FULL CRAPS CREW (4 Members)</text>
      {/* Table */}
      <rect x="80" y="70" width="440" height="25" rx="4" fill="#0f3460" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="88" textAnchor="middle" fill="#e2e8f0" fontSize="10">CRAPS TABLE LAYOUT</text>
      {/* Boxman center */}
      <StickFigure x={300} y={130} color="#3b82f6" label="BOXMAN" />
      {/* Base Dealer L */}
      <StickFigure x={180} y={130} color="#22c55e" label="DEALER L" />
      {/* Base Dealer R */}
      <StickFigure x={420} y={130} color="#22c55e" label="DEALER R" />
      {/* Stickman opposite - show below table */}
      <StickFigure x={300} y={48} color="#f4a81d" label="STICKMAN" />
      {/* stick */}
      <line x1={312} y1={34} x2={340} y2={10} stroke="#f4a81d" strokeWidth="2" />
      <rect x={336} y={6} width="8" height="8" rx="1" fill="#f4a81d" />
      <text x="300" y="172" textAnchor="middle" fill="#94a3b8" fontSize="8">4-person crew runs the game 24/7</text>
    </svg>
  );
}

export function SevenOutMomentSvg() {
  return (
    <svg viewBox="0 0 600 250" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="250" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="15" fontWeight="bold">SEVEN OUT MOMENT - 4 Simultaneous Actions</text>
      {/* timeline */}
      <line x1="30" y1="45" x2="570" y2="45" stroke="#475569" strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={30 + i * 180} cy="45" r="5" fill="#ef4444" />
          <text x={30 + i * 180} y="40" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">T+{i}</text>
        </g>
      ))}
      {/* action 1 */}
      <rect x="15" y="65" width="135" height="55" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <text x="82" y="82" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">1. Stickman</text>
      <text x="82" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8">Calls "Seven out!"</text>
      <text x="82" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Says "Seven out, line away"</text>
      {/* action 2 */}
      <rect x="160" y="65" width="135" height="55" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <text x="227" y="82" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">2. Dealers</text>
      <text x="227" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8">Collect all losing</text>
      <text x="227" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">bets on layout</text>
      {/* action 3 */}
      <rect x="305" y="65" width="135" height="55" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <text x="372" y="82" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">3. Dealers</text>
      <text x="372" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8">Pay Don't Pass /</text>
      <text x="372" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Don't Come winners</text>
      {/* action 4 */}
      <rect x="450" y="65" width="135" height="55" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="1" />
      <text x="517" y="82" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">4. Boxman</text>
      <text x="517" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8">Records the 7-out</text>
      <text x="517" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">on tracking sheet</text>
      {/* result */}
      <rect x="100" y="140" width="400" height="35" rx="5" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
      <text x="300" y="164" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">DICE PASS TO NEXT SHOOTER</text>
      {/* dice at bottom */}
      <rect x="260" y="190" width="35" height="35" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
      {[[-5, -7], [-5, 0], [-5, 7], [5, -7], [5, 0], [5, 7]].map((p, i) => (
        <circle key={i} cx={277 + p[0]} cy={207 + p[1]} r="3" fill="#ef4444" />
      ))}
      <text x="305" y="200" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
      <rect x={318} y="190" width="35" height="35" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
      <circle cx={335} cy={207} r="3" fill="#ef4444" />
      <text x="310" y="215" textAnchor="middle" fill="#ef4444" fontSize="9">7!</text>
    </svg>
  );
}

export function DicePassSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="18" textAnchor="middle" fill="#f4a81d" fontSize="13" fontWeight="bold">DICE PASS SEQUENCE</text>
      {/* step 1 */}
      <rect x="15" y="35" width="125" height="55" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="77" y="52" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">1. Stickman</text>
      <text x="77" y="66" textAnchor="middle" fill="#e2e8f0" fontSize="8">Pushes dice</text>
      <text x="77" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">to shooter</text>
      {/* step 2 */}
      <rect x="155" y="35" width="125" height="55" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="217" y="52" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">2. Shooter</text>
      <text x="217" y="66" textAnchor="middle" fill="#e2e8f0" fontSize="8">Picks 2 dice</text>
      <text x="217" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">from selection</text>
      {/* step 3 */}
      <rect x="295" y="35" width="125" height="55" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="357" y="52" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">3. Shooter</text>
      <text x="357" y="66" textAnchor="middle" fill="#e2e8f0" fontSize="8">Throws dice</text>
      <text x="357" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">to opposite wall</text>
      {/* step 4 */}
      <rect x="435" y="35" width="125" height="55" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1" />
      <text x="497" y="52" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">4. Stickman</text>
      <text x="497" y="66" textAnchor="middle" fill="#e2e8f0" fontSize="8">Retrieves dice</text>
      <text x="497" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">after result</text>
      {/* arrows */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={140 + i * 140} y1="62" x2={155 + i * 140} y2="62" stroke="#f4a81d" strokeWidth="1" markerEnd={i < 2 ? "url(#arrowhead)" : undefined} />
      ))}
      {/* dice visualization */}
      <rect x={50} y={110} width="20" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
      <circle cx={60} cy={120} r="2" fill="#e2e8f0" />
      <rect x={75} y={110} width="20" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
      <circle cx={85} cy={120} r="2" fill="#e2e8f0" />
      {/* trajectory arc */}
      <path d="M 140 130 Q 300 180 460 130" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 3" />
      {/* final dice */}
      <rect x={480} y={110} width="20" height="20" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1" />
      {[[-2, -3], [2, 3]].map((p, i) => (
        <circle key={i} cx={490 + p[0]} cy={120 + p[1]} r="2" fill="#f4a81d" />
      ))}
      <rect x={505} y={110} width="20" height="20" rx="3" fill="#1e293b" stroke="#f4a81d" strokeWidth="1" />
      <circle cx={515} cy={120} r="2" fill="#f4a81d" />
      <text x="300" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8">Dice must hit the back wall to be a valid roll</text>
      <text x="300" y="170" textAnchor="middle" fill="#94a3b8" fontSize="8">Stickman controls all dice movement with the stick</text>
    </svg>
  );
}

export function PuckOnOffSvg() {
  return (
    <svg viewBox="0 0 600 230" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="230" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">THE PUCK (ON/OFF)</text>
      {/* OFF state */}
      <rect x="30" y="40" width="260" height="110" rx="6" fill="#0f3460" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="160" y="62" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">OFF</text>
      <circle cx="160" cy="110" r="30" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
      <text x="160" y="115" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OFF</text>
      <text x="160" y="133" textAnchor="middle" fill="#94a3b8" fontSize="8">{'{'}Black side up{'}'}</text>
      <text x="160" y="148" textAnchor="middle" fill="#e2e8f0" fontSize="10">Come-out roll phase</text>
      {/* ON state */}
      <rect x="310" y="40" width="260" height="110" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="1.5" />
      <text x="440" y="62" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">ON</text>
      <circle cx="440" cy="110" r="30" fill="#e2e8f0" stroke="#22c55e" strokeWidth="2" />
      <text x="440" y="108" textAnchor="middle" fill="#1a1a2e" fontSize="12" fontWeight="bold">ON</text>
      <text x="440" y="126" textAnchor="middle" fill="#1a1a2e" fontSize="8" fontWeight="bold">6</text>
      <text x="440" y="142" textAnchor="middle" fill="#94a3b8" fontSize="8">{'{'}White side up{'}'}</text>
      <text x="440" y="158" textAnchor="middle" fill="#e2e8f0" fontSize="10">Point established phase</text>
      {/* description */}
      <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">The puck marks whether the game is in Come-out or Point phase</text>
      <text x="300" y="202" textAnchor="middle" fill="#94a3b8" fontSize="9">When ON, it sits on the point number box</text>
    </svg>
  );
}

// Dice view helpers for dice sets (top-down 2D view)
function DiceTopView({ value, x, y, size = 28 }: { value: number; x: number; y: number; size?: number }) {
  const patterns: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-5, -5], [5, 5]],
    3: [[-5, -5], [0, 0], [5, 5]],
    4: [[-5, -5], [-5, 5], [5, -5], [5, 5]],
    5: [[-5, -5], [-5, 5], [0, 0], [5, -5], [5, 5]],
    6: [[-5, -7], [-5, 0], [-5, 7], [5, -7], [5, 0], [5, 7]],
  };
  const hs = size / 2;
  return (
    <g>
      <rect x={x - hs} y={y - hs} width={size} height={size} rx={4} fill="#1e293b" stroke="#f4a81d" strokeWidth="1.5" />
      {patterns[value].map((p, i) => (
        <circle key={i} cx={x + p[0] * (size / 28)} cy={y + p[1] * (size / 28)} r={size / 10} fill="#e2e8f0" />
      ))}
    </g>
  );
}

export function DiceSet3VSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">DICE SET: 3-V (Hardway Set for 6/8)</text>
      <text x="300" y="42" textAnchor="middle" fill="#94a3b8" fontSize="9">Top view: 3-3 showing, V shape formation</text>
      {/* left die */}
      <DiceTopView value={3} x={230} y={110} size={60} />
      <text x={230} y="148" textAnchor="middle" fill="#94a3b8" fontSize="7">Die 1</text>
      {/* right die */}
      <DiceTopView value={3} x={370} y={110} size={60} />
      <text x={370} y="148" textAnchor="middle" fill="#94a3b8" fontSize="7">Die 2</text>
      {/* V indicator */}
      <line x1={260} y1={95} x2={300} y2={80} stroke="#f4a81d" strokeWidth="1.5" />
      <line x1={300} y1={80} x2={340} y2={95} stroke="#f4a81d" strokeWidth="1.5" />
      <text x={300} y={74} textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">V</text>
      <text x={300} y={168} textAnchor="middle" fill="#94a3b8" fontSize="8">Favors hardways and inside numbers</text>
      <text x={300} y={183} textAnchor="middle" fill="#94a3b8" fontSize="8">Left die: 3 top / 2 facing you | Right die: 3 top / 2 facing you</text>
    </svg>
  );
}

export function DiceSet2VSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">DICE SET: 2-V</text>
      <text x="300" y="42" textAnchor="middle" fill="#94a3b8" fontSize="9">Top view: 2-2 showing, V shape formation</text>
      {/* left die */}
      <DiceTopView value={2} x={230} y={110} size={60} />
      <text x={230} y="148" textAnchor="middle" fill="#94a3b8" fontSize="7">Die 1</text>
      {/* right die */}
      <DiceTopView value={2} x={370} y={110} size={60} />
      <text x={370} y="148" textAnchor="middle" fill="#94a3b8" fontSize="7">Die 2</text>
      {/* V indicator */}
      <line x1={260} y1={95} x2={300} y2={80} stroke="#f4a81d" strokeWidth="1.5" />
      <line x1={300} y1={80} x2={340} y2={95} stroke="#f4a81d" strokeWidth="1.5" />
      <text x={300} y={74} textAnchor="middle" fill="#f4a81d" fontSize="10" fontWeight="bold">V</text>
      <text x={300} y={168} textAnchor="middle" fill="#94a3b8" fontSize="8">Good for avoiding the 7 on the come-out</text>
      <text x={300} y="183" textAnchor="middle" fill="#94a3b8" fontSize="8">Commonly used to reduce 7 probability</text>
    </svg>
  );
}

export function DiceSetHardwaySvg() {
  return (
    <svg viewBox="0 0 600 220" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="220" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">DICE SET: HARDWAY (All Paired Faces)</text>
      {/* pairs */}
      {[[2, 70], [3, 195], [4, 320], [5, 445]].map(([val, cx], i) => (
        <g key={i}>
          <DiceTopView value={val as number} x={cx} y={100} size={50} />
          <DiceTopView value={val as number} x={cx + 45} y={100} size={50} />
        </g>
      ))}
      <text x={115} y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10">2+2</text>
      <text x={240} y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10">3+3</text>
      <text x={365} y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10">4+4</text>
      <text x={490} y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10">5+5</text>
      <text x="300" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">All faces paired - each die shows the same number</text>
      <text x="300" y="188" textAnchor="middle" fill="#f4a81d" fontSize="10">Favors: Hard 4, 6, 8, 10 / Reduces 7 probability</text>
    </svg>
  );
}

export function DiceSetAll7sSvg() {
  return (
    <svg viewBox="0 0 600 220" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="220" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">DICE SET: ALL 7s (All Opposite Faces Sum to 7)</text>
      {/* pairs */}
      {[[1, 90], [6, 160], [2, 250], [5, 320], [3, 410], [4, 480]].map(([v1, cx], i) => {
        const v2 = 7 - v1;
        return (
          <g key={i}>
            <DiceTopView value={v1} x={cx} y={100} size={40} />
            <text x={cx + 30} y="104" fill="#f4a81d" fontSize="10" fontWeight="bold">7</text>
            <DiceTopView value={v2} x={cx + 58} y={100} size={40} />
          </g>
        );
      })}
      <text x="300" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Standard factory dice layout - opposites sum to 7</text>
      <text x="300" y="173" textAnchor="middle" fill="#94a3b8" fontSize="9">(1 opposite 6), (2 opposite 5), (3 opposite 4)</text>
      <text x="300" y="193" textAnchor="middle" fill="#f4a81d" fontSize="10">Default orientation on every standard casino die</text>
    </svg>
  );
}

export function StickmanCallsSvg() {
  const calls: [number, string][] = [
    [2, "SNAKE EYES"],
    [3, "ACE DEUCE"],
    [4, "LITTLE JOE"],
    [5, "FEVER"],
    [6, "JIMMIE HICKS"],
    [7, "SEVEN OUT"],
    [8, "EIGHTER FROM DECATUR"],
    [9, "NINA"],
    [10, "BIG DICK"],
    [11, "YO-LEVEN"],
    [12, "BOXCARS"],
  ];

  return (
    <svg viewBox="0 0 600 420" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="420" fill="#1a1a2e" />
      <text x="300" y="20" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">STICKMAN CALLS - Dice Sum Nicknames</text>
      {/* header */}
      <rect x="80" y="28" width="160" height="22" rx="3" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="160" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">SUM</text>
      <rect x="240" y="28" width="280" height="22" rx="3" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="380" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">NICKNAME</text>
      {/* rows */}
      {calls.map(([sum, name], i) => (
        <g key={sum}>
          <rect x="80" y={55 + i * 32} width="160" height="26" rx="3" fill={sum === 7 ? "#0f3460" : "none"} stroke={sum === 7 ? "#ef4444" : "#334155"} strokeWidth="1" />
          <text x="160" y={73 + i * 32} textAnchor="middle" fill={sum === 7 ? "#ef4444" : "#f4a81d"} fontSize="11" fontWeight="bold">{sum}</text>
          <rect x="240" y={55 + i * 32} width="280" height="26" rx="3" fill={sum === 7 ? "#0f3460" : "none"} stroke={sum === 7 ? "#ef4444" : "#334155"} strokeWidth="1" />
          <text x="380" y={73 + i * 32} textAnchor="middle" fill={sum === 7 ? "#ef4444" : "#e2e8f0"} fontSize="10">{name}</text>
        </g>
      ))}
    </svg>
  );
}

export function Place6PayoutSvg() {
  const payouts: [number, number][] = [[6, 7], [12, 14], [30, 35], [60, 70], [120, 140], [300, 350], [600, 700]];

  return (
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="300" fill="#1a1a2e" />
      <text x="300" y="20" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PLACE 6 / 8 PAYOUT TABLE</text>
      <text x="300" y="36" textAnchor="middle" fill="#94a3b8" fontSize="9">Payout ratio: 7 to 6</text>
      {/* header */}
      <rect x="100" y="45" width="180" height="24" rx="3" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="190" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">BET AMOUNT</text>
      <rect x="280" y="45" width="220" height="24" rx="3" fill="#0f3460" stroke="#475569" strokeWidth="1" />
      <text x="390" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">PAYOUT (including original bet)</text>
      {/* rows */}
      {payouts.map(([bet, pay], i) => (
        <g key={i}>
          <rect x="100" y={74 + i * 28} width="180" height="22" rx="3" fill={i % 2 === 0 ? "#0f3460" : "none"} stroke="#334155" strokeWidth="0.5" fillOpacity={i % 2 === 0 ? 0.5 : 0} />
          <text x="190" y={89 + i * 28} textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">${bet}</text>
          <rect x="280" y={74 + i * 28} width="220" height="22" rx="3" fill={i % 2 === 0 ? "#0f3460" : "none"} stroke="#334155" strokeWidth="0.5" fillOpacity={i % 2 === 0 ? 0.5 : 0} />
          <text x="390" y={89 + i * 28} textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">${pay}</text>
        </g>
      ))}
      <text x="300" y="278" textAnchor="middle" fill="#94a3b8" fontSize="8">Always bet in multiples of $6 for correct payout on 6 and 8</text>
    </svg>
  );
}

export function PastPostingDetectSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">PAST POSTING DETECTION</text>
      {/* Before */}
      <rect x="20" y="40" width="160" height="70" rx="5" fill="#0f3460" stroke="#22c55e" strokeWidth="1.5" />
      <text x="100" y="60" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">BEFORE</text>
      <text x="100" y="78" textAnchor="middle" fill="#e2e8f0" fontSize="9">Dice still in air</text>
      <text x="100" y="96" textAnchor="middle" fill="#94a3b8" fontSize="8">{"{"}Bets still accepted{"}"}</text>
      <circle cx="100" cy="113" r="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="1" />
      <text x="100" y="117" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">OK</text>
      {/* During */}
      <rect x="220" y="40" width="160" height="70" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="2" />
      <text x="300" y="60" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">DURING</text>
      <text x="300" y="78" textAnchor="middle" fill="#e2e8f0" fontSize="9">Dice have landed</text>
      <text x="300" y="96" textAnchor="middle" fill="#f4a81d" fontSize="8">Late bet attempt!</text>
      <rect x="280" y="102" width="40" height="16" rx="3" fill="#f4a81d" fillOpacity="0.3" stroke="#f4a81d" strokeWidth="1" />
      <text x="300" y="114" textAnchor="middle" fill="#f4a81d" fontSize="8" fontWeight="bold">CAUGHT!</text>
      {/* After */}
      <rect x="420" y="40" width="160" height="70" rx="5" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="500" y="60" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">AFTER</text>
      <text x="500" y="78" textAnchor="middle" fill="#e2e8f0" fontSize="9">Result announced</text>
      <text x="500" y="96" textAnchor="middle" fill="#ef4444" fontSize="8">Bet rejected</text>
      <rect x="480" y="102" width="40" height="16" rx="3" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1" />
      <text x="500" y="114" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">X</text>
      {/* arrows between */}
      <line x1="180" y1="75" x2="220" y2="75" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <line x1="380" y1="75" x2="420" y2="75" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* bottom note */}
      <text x="300" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Dealers are trained to detect and call "No bet!" on past posting</text>
      <text x="300" y="168" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Stickman calls "No more bets!" before each roll</text>
    </svg>
  );
}

export function DiceTroubleFlowSvg() {
  return (
    <svg viewBox="0 0 600 280" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="280" fill="#1a1a2e" />
      <text x="300" y="20" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">DICE TROUBLE FLOWCHART</text>
      {/* start */}
      <rect x="220" y="32" width="160" height="28" rx="5" fill="#0f3460" stroke="#f4a81d" strokeWidth="1.5" />
      <text x="300" y="51" textAnchor="middle" fill="#f4a81d" fontSize="11" fontWeight="bold">DICE OFF TABLE?</text>
      {/* yes branch */}
      <line x1="260" y1="60" x2="260" y2="85" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="180" y="85" width="160" height="28" rx="5" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
      <text x="260" y="104" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">YES</text>
      {/* boxman check */}
      <line x1="260" y1="113" x2="260" y2="138" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="170" y="138" width="180" height="28" rx="5" fill="#0f3460" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="260" y="157" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">BOXMAN CHECK</text>
      {/* check result */}
      <line x1="260" y1="166" x2="260" y2="190" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="165" y="190" width="90" height="26" rx="4" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" />
      <text x="210" y="207" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">OK (same)</text>
      <rect x="265" y="190" width="90" height="26" rx="4" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="310" y="207" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">NOT OK</text>
      {/* results */}
      <line x1="210" y1="216" x2="210" y2="240" stroke="#22c55e" strokeWidth="1" />
      <rect x="155" y="240" width="110" height="24" rx="4" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="1" />
      <text x="210" y="256" textAnchor="middle" fill="#22c55e" fontSize="9">Same dice back</text>
      <line x1="310" y1="216" x2="310" y2="240" stroke="#ef4444" strokeWidth="1" />
      <rect x="255" y="240" width="110" height="24" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
      <text x="310" y="256" textAnchor="middle" fill="#ef4444" fontSize="9">New dice issued</text>
      {/* no branch */}
      <line x1="340" y1="60" x2="500" y2="85" stroke="#22c55e" strokeWidth="1.5" />
      <rect x="440" y="85" width="130" height="28" rx="5" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
      <text x="505" y="104" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">NO - Continue</text>
    </svg>
  );
}

export function ChipTidyingSvg() {
  return (
    <svg viewBox="0 0 600 230" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="230" fill="#1a1a2e" />
      <text x="300" y="22" textAnchor="middle" fill="#f4a81d" fontSize="14" fontWeight="bold">CHIP TIDYING: BEFORE vs AFTER</text>
      {/* Before - chaos */}
      <rect x="20" y="40" width="260" height="120" rx="6" fill="#0f3460" stroke="#ef4444" strokeWidth="2" />
      <text x="150" y="60" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">BEFORE</text>
      {/* scattered chips */}
      {[[70, 90], [110, 80], [150, 95], [90, 115], [130, 110], [170, 105], [100, 135], [140, 130], [180, 120]].map((p, i) => (
        <circle key={i} cx={p[0] + 60} cy={p[1]} r="8" fill={["#22c55e", "#3b82f6", "#ef4444", "#f4a81d"][i % 4]} opacity="0.7" />
      ))}
      {/* red X over chaos */}
      <line x1="70" y1="135" x2="230" y2="55" stroke="#ef4444" strokeWidth="3" opacity="0.5" />
      <line x1="230" y1="135" x2="70" y2="55" stroke="#ef4444" strokeWidth="3" opacity="0.5" />
      {/* After - neat stacks */}
      <rect x="320" y="40" width="260" height="120" rx="6" fill="#0f3460" stroke="#22c55e" strokeWidth="2" />
      <text x="450" y="60" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">AFTER</text>
      {/* neat stacks */}
      {[[360, 130], [420, 130], [480, 130], [540, 130]].map((p, i) => (
        <g key={i}>
          {[0, 1, 2].map((h) => (
            <rect key={h} x={p[0] - 10} y={p[1] - h * 12 - 10} width="20" height="10" rx="5" fill={["#22c55e", "#3b82f6", "#ef4444", "#f4a81d"][i]} />
          ))}
          <text x={p[0]} y={p[1] + 14} textAnchor="middle" fill="#94a3b8" fontSize="7">{["Green", "Blue", "Red", "Gold"][i]}</text>
        </g>
      ))}
      {/* checkmark */}
      <text x="560" y="55" fill="#22c55e" fontSize="24" fontWeight="bold">{'\u2713'}</text>
      {/* footer */}
      <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">Dealers organize chips by color/denomination during downtime</text>
      <text x="300" y="202" textAnchor="middle" fill="#94a3b8" fontSize="9">Neat stacks allow fast payout calculations and error detection</text>
    </svg>
  );
}

export function WheelEUSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <defs>
        <clipPath id="euClip"><circle cx="110" cy="100" r="80" /></clipPath>
      </defs>
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="3" />
      <circle cx="110" cy="100" r="65" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="110" cy="100" r="45" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="110" cy="100" r="25" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="110" cy="100" r="8" fill="#f4a81d" />
      {[0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26].map((n, i) => {
        const angle = (i * 360) / 37 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 72 * Math.cos(rad);
        const y = 100 + 72 * Math.sin(rad);
        const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n);
        const isGreen = n === 0;
        const color = isGreen ? "#22c55e" : isRed ? "#ef4444" : "#0f172a";
        const visible = i < 16;
        if (!visible) return null;
        return (
          <g key={i}>
            <rect x={x - 5} y={y - 8} width="10" height="16" fill={color} rx="2"
              transform={`rotate(${angle}, ${x}, ${y})`} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize="7" fill="#e2e8f0"
              transform={`rotate(${angle}, ${x}, ${y})`}>{n}</text>
          </g>
        );
      })}
      <text x="110" y="100" textAnchor="middle" fontSize="7" fill="#e2e8f0" dominantBaseline="central">0</text>
      <text x="200" y="70" fontSize="12" fill="#f4a81d" fontWeight="bold">EUROPEAN</text>
      <text x="200" y="88" fontSize="11" fill="#e2e8f0">37 pockets</text>
      <text x="200" y="108" fontSize="11" fill="#e2e8f0">House Edge</text>
      <text x="200" y="128" fontSize="18" fill="#22c55e" fontWeight="bold">2.70%</text>
      <text x="350" y="85" fontSize="10" fill="#94a3b8">Single zero wheel</text>
      <text x="350" y="105" fontSize="10" fill="#94a3b8">18 red | 18 black | 1 green</text>
      <text x="350" y="125" fontSize="10" fill="#94a3b8">French variation: La Partage</text>
    </svg>
  );
}

export function WheelUSSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="3" />
      <circle cx="110" cy="100" r="65" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="110" cy="100" r="45" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="110" cy="100" r="8" fill="#f4a81d" />
      <circle cx="110" cy="55" r="8" fill="#22c55e" />
      <circle cx="110" cy="145" r="8" fill="#22c55e" />
      <text x="110" y="58" textAnchor="middle" fontSize="7" fill="#e2e8f0">0</text>
      <text x="110" y="148" textAnchor="middle" fontSize="7" fill="#e2e8f0">00</text>
      {[0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1].map((n, i) => {
        const angle = (i * 360) / 38 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 72 * Math.cos(rad);
        const y = 100 + 72 * Math.sin(rad);
        const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n);
        const color = isRed ? "#ef4444" : "#0f172a";
        if (i >= 10) return null;
        return (
          <g key={i}>
            <rect x={x - 5} y={y - 8} width="10" height="16" fill={color} rx="2"
              transform={`rotate(${angle}, ${x}, ${y})`} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize="7" fill="#e2e8f0"
              transform={`rotate(${angle}, ${x}, ${y})`}>{n}</text>
          </g>
        );
      })}
      <text x="200" y="70" fontSize="12" fill="#f4a81d" fontWeight="bold">AMERICAN</text>
      <text x="200" y="88" fontSize="11" fill="#e2e8f0">38 pockets</text>
      <text x="200" y="108" fontSize="11" fill="#e2e8f0">House Edge</text>
      <text x="200" y="128" fontSize="18" fill="#ef4444" fontWeight="bold">5.26%</text>
      <text x="350" y="85" fontSize="10" fill="#94a3b8">Double zero wheel</text>
      <text x="350" y="105" fontSize="10" fill="#94a3b8">18 red | 18 black | 2 green</text>
      <text x="350" y="125" fontSize="10" fill="#94a3b8">Predominant in Americas</text>
    </svg>
  );
}

export function WheelTripleSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="3" />
      <circle cx="110" cy="100" r="8" fill="#f4a81d" />
      <circle cx="110" cy="42" r="7" fill="#22c55e" />
      <circle cx="110" cy="158" r="7" fill="#22c55e" />
      <circle cx="50" cy="110" r="7" fill="#22c55e" />
      <text x="110" y="45" textAnchor="middle" fontSize="6" fill="#e2e8f0">0</text>
      <text x="110" y="161" textAnchor="middle" fontSize="6" fill="#e2e8f0">00</text>
      <text x="53" y="113" textAnchor="middle" fontSize="6" fill="#e2e8f0">000</text>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((n, i) => {
        const angle = (i * 360) / 39 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 72 * Math.cos(rad);
        const y = 100 + 72 * Math.sin(rad);
        const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n);
        const color = isRed ? "#ef4444" : "#0f172a";
        if (i >= 10) return null;
        return (
          <g key={i}>
            <rect x={x - 5} y={y - 8} width="10" height="16" fill={color} rx="2"
              transform={`rotate(${angle}, ${x}, ${y})`} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize="6" fill="#e2e8f0"
              transform={`rotate(${angle}, ${x}, ${y})`}>{n}</text>
          </g>
        );
      })}
      <text x="200" y="70" fontSize="12" fill="#f4a81d" fontWeight="bold">TRIPLE ZERO</text>
      <text x="200" y="88" fontSize="11" fill="#e2e8f0">39 pockets</text>
      <text x="200" y="108" fontSize="11" fill="#e2e8f0">House Edge</text>
      <text x="200" y="128" fontSize="18" fill="#ef4444" fontWeight="bold">7.69%</text>
      <text x="350" y="85" fontSize="10" fill="#94a3b8">Triple zero wheel</text>
      <text x="350" y="105" fontSize="10" fill="#94a3b8">3 green: 0, 00, 000</text>
      <text x="350" y="125" fontSize="10" fill="#ef4444">AVOID this wheel</text>
    </svg>
  );
}

export function WheelCompareSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="90" cy="100" r="55" fill="#2d2d1a" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="90" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="90" cy="100" r="8" fill="#f4a81d" />
      <text x="90" y="125" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="bold">EU</text>
      <text x="90" y="162" textAnchor="middle" fontSize="9" fill="#e2e8f0">2.70%</text>
      <text x="90" y="178" textAnchor="middle" fontSize="7" fill="#94a3b8">37 pockets</text>
      <circle cx="245" cy="100" r="55" fill="#2d2d1a" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="245" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="245" cy="100" r="8" fill="#f4a81d" />
      <circle cx="230" cy="80" r="5" fill="#22c55e" />
      <circle cx="260" cy="80" r="5" fill="#22c55e" />
      <text x="245" y="125" textAnchor="middle" fontSize="9" fill="#f4a81d" fontWeight="bold">US</text>
      <text x="245" y="162" textAnchor="middle" fontSize="9" fill="#ef4444">5.26%</text>
      <text x="245" y="178" textAnchor="middle" fontSize="7" fill="#94a3b8">38 pockets</text>
      <circle cx="400" cy="100" r="55" fill="#2d2d1a" stroke="#f4a81d" strokeWidth="2" />
      <circle cx="400" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="400" cy="100" r="8" fill="#f4a81d" />
      <circle cx="385" cy="78" r="4" fill="#22c55e" />
      <circle cx="415" cy="78" r="4" fill="#22c55e" />
      <circle cx="400" cy="66" r="4" fill="#22c55e" />
      <text x="400" y="125" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">000</text>
      <text x="400" y="162" textAnchor="middle" fontSize="9" fill="#ef4444">7.69%</text>
      <text x="400" y="178" textAnchor="middle" fontSize="7" fill="#94a3b8">39 pockets</text>
      <text x="300" y="48" textAnchor="middle" fontSize="12" fill="#f4a81d" fontWeight="bold">WHEEL COMPARISON</text>
    </svg>
  );
}

export function InsideStraightSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="60" height="50" fill="#ef4444" rx="4" />
      <text x="110" y="80" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">17</text>
      <circle cx="110" cy="75" r="14" fill="none" stroke="#f4a81d" strokeWidth="3" />
      <circle cx="110" cy="75" r="10" fill="#f4a81d" opacity="0.3" />
      <text x="110" y="78" textAnchor="middle" fontSize="8" fill="#f4a81d" fontWeight="bold">$5</text>
      <line x1="200" y1="75" x2="330" y2="75" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="200" y="60" fontSize="10" fill="#22c55e" fontWeight="bold">Straight Up</text>
      <text x="200" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">35:1</text>
      <text x="200" y="125" fontSize="10" fill="#94a3b8">Single number bet</text>
      <text x="350" y="65" fontSize="9" fill="#94a3b8">1 way to win</text>
      <text x="350" y="85" fontSize="9" fill="#94a3b8">37 ways to lose (EU)</text>
      <text x="350" y="105" fontSize="9" fill="#94a3b8">Highest payout on table</text>
      <text x="350" y="125" fontSize="9" fill="#94a3b8">2.70% probability (EU)</text>
    </svg>
  );
}

export function InsideSplitSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="60" height="50" fill="#0f172a" rx="4" />
      <rect x="80" y="100" width="60" height="50" fill="#ef4444" rx="4" />
      <text x="110" y="80" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">17</text>
      <text x="110" y="130" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">18</text>
      <circle cx="110" cy="100" r="10" fill="#f4a81d" opacity="0.3" />
      <rect x="100" y="96" width="20" height="8" fill="#f4a81d" rx="2" />
      <text x="110" y="103" textAnchor="middle" fontSize="7" fill="#f4a81d" fontWeight="bold">$5</text>
      <line x1="200" y1="100" x2="330" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="200" y="60" fontSize="10" fill="#22c55e" fontWeight="bold">Split</text>
      <text x="200" y="130" fontSize="18" fill="#f4a81d" fontWeight="bold">17:1</text>
      <text x="200" y="155" fontSize="10" fill="#94a3b8">Bet on line between 2 numbers</text>
      <text x="350" y="65" fontSize="9" fill="#94a3b8">2 ways to win</text>
      <text x="350" y="85" fontSize="9" fill="#94a3b8">Chip placed on shared line</text>
    </svg>
  );
}

export function InsideStreetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="60" height="50" fill="#ef4444" rx="4" />
      <rect x="140" y="50" width="60" height="50" fill="#0f172a" rx="4" />
      <rect x="200" y="50" width="60" height="50" fill="#ef4444" rx="4" />
      <text x="110" y="80" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">7</text>
      <text x="170" y="80" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">8</text>
      <text x="230" y="80" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">9</text>
      <rect x="73" y="95" width="194" height="6" fill="#f4a81d" rx="2" />
      <text x="170" y="94" textAnchor="middle" fontSize="7" fill="#1a1a2e" fontWeight="bold">$5</text>
      <line x1="300" y1="75" x2="420" y2="75" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="300" y="60" fontSize="10" fill="#22c55e" fontWeight="bold">Street / Trio</text>
      <text x="300" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">11:1</text>
      <text x="300" y="130" fontSize="10" fill="#94a3b8">3-number row bet</text>
      <text x="300" y="150" fontSize="9" fill="#94a3b8">Chip on outer edge of row</text>
    </svg>
  );
}

export function InsideCornerSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="60" height="50" fill="#ef4444" rx="4" />
      <rect x="140" y="50" width="60" height="50" fill="#0f172a" rx="4" />
      <rect x="80" y="100" width="60" height="50" fill="#0f172a" rx="4" />
      <rect x="140" y="100" width="60" height="50" fill="#ef4444" rx="4" />
      <text x="110" y="80" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">10</text>
      <text x="170" y="80" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">11</text>
      <text x="110" y="130" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">13</text>
      <text x="170" y="130" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">14</text>
      <circle cx="140" cy="100" r="8" fill="#f4a81d" opacity="0.4" />
      <rect x="134" y="96" width="12" height="8" fill="#f4a81d" rx="2" />
      <text x="140" y="103" textAnchor="middle" fontSize="6" fill="#1a1a2e" fontWeight="bold">$5</text>
      <line x1="260" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="260" y="60" fontSize="10" fill="#22c55e" fontWeight="bold">Corner / Square</text>
      <text x="260" y="130" fontSize="18" fill="#f4a81d" fontWeight="bold">8:1</text>
      <text x="260" y="155" fontSize="10" fill="#94a3b8">4 numbers meeting at corner</text>
      <text x="260" y="175" fontSize="9" fill="#94a3b8">Chip on intersection point</text>
    </svg>
  );
}

export function InsideSixLineSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={80 + i * 50} y="50" width="48" height="40" fill={i % 2 === 0 ? "#ef4444" : "#0f172a"} rx="3" />
      ))}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i + "b"} x={80 + i * 50} y="91" width="48" height="40" fill={i % 2 === 0 ? "#0f172a" : "#ef4444"} rx="3" />
      ))}
      {[0,1,2,3,4,5].map(i => (
        <text key={i + "n"} x={104 + i * 50} y="74" textAnchor="middle" fontSize="12" fill="#e2e8f0" fontWeight="bold">{1 + i}</text>
      ))}
      {[0,1,2,3,4,5].map(i => (
        <text key={i + "m"} x={104 + i * 50} y="115" textAnchor="middle" fontSize="12" fill="#e2e8f0" fontWeight="bold">{7 + i}</text>
      ))}
      <rect x="72" y="125" width="320" height="6" fill="#f4a81d" rx="2" />
      <text x="232" y="124" textAnchor="middle" fontSize="7" fill="#1a1a2e" fontWeight="bold">$5</text>
      <line x1="420" y1="90" x2="540" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="420" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Six Line</text>
      <text x="420" y="115" fontSize="18" fill="#f4a81d" fontWeight="bold">5:1</text>
      <text x="420" y="140" fontSize="9" fill="#94a3b8">2 rows of 3 numbers</text>
      <text x="420" y="158" fontSize="9" fill="#94a3b8">Chip on outer corner</text>
    </svg>
  );
}

export function InsideTopLineSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="60" height="40" fill="#22c55e" rx="4" />
      <rect x="142" y="50" width="60" height="40" fill="#22c55e" rx="4" />
      <rect x="80" y="92" width="60" height="40" fill="#ef4444" rx="4" />
      <rect x="142" y="92" width="60" height="40" fill="#0f172a" rx="4" />
      <rect x="204" y="92" width="60" height="40" fill="#ef4444" rx="4" />
      <text x="110" y="74" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">0</text>
      <text x="172" y="74" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">00</text>
      <text x="110" y="116" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">1</text>
      <text x="172" y="116" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">2</text>
      <text x="234" y="116" textAnchor="middle" fontSize="14" fill="#e2e8f0" fontWeight="bold">3</text>
      <rect x="73" y="126" width="196" height="6" fill="#f4a81d" rx="2" />
      <text x="171" y="125" textAnchor="middle" fontSize="7" fill="#1a1a2e" fontWeight="bold">$5</text>
      <line x1="320" y1="85" x2="460" y2="85" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="320" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Top Line</text>
      <text x="320" y="110" fontSize="18" fill="#f4a81d" fontWeight="bold">6:1</text>
      <text x="320" y="140" fontSize="9" fill="#ef4444">US only | HE 7.89%</text>
      <text x="320" y="158" fontSize="9" fill="#94a3b8">Covers 0-00-1-2-3</text>
    </svg>
  );
}

export function OutsideRedBlackSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="100" height="60" fill="#ef4444" rx="6" />
      <text x="130" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">RED</text>
      <rect x="190" y="50" width="100" height="60" fill="#0f172a" rx="6" />
      <text x="240" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">BLACK</text>
      <circle cx="130" cy="75" r="12" fill="#f4a81d" opacity="0.5" />
      <text x="130" y="78" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">$10</text>
      <line x1="350" y1="80" x2="470" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="350" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Red / Black</text>
      <text x="350" y="105" fontSize="18" fill="#f4a81d" fontWeight="bold">1:1</text>
      <text x="350" y="135" fontSize="9" fill="#94a3b8">Even money outside bet</text>
      <text x="350" y="155" fontSize="9" fill="#94a3b8">18 out of 37 (EU) / 38 (US)</text>
    </svg>
  );
}

export function OutsideOddEvenSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="100" height="60" fill="#1e3a5f" rx="6" />
      <text x="130" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">ODD</text>
      <rect x="190" y="50" width="100" height="60" fill="#1e3a5f" rx="6" />
      <text x="240" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">EVEN</text>
      <circle cx="240" cy="75" r="12" fill="#f4a81d" opacity="0.5" />
      <text x="240" y="78" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">$10</text>
      <line x1="350" y1="80" x2="470" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="350" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Odd / Even</text>
      <text x="350" y="105" fontSize="18" fill="#f4a81d" fontWeight="bold">1:1</text>
      <text x="350" y="135" fontSize="9" fill="#94a3b8">18 numbers each</text>
      <text x="350" y="155" fontSize="9" fill="#94a3b8">Zero is NOT odd or even</text>
    </svg>
  );
}

export function OutsideLowHighSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="100" height="60" fill="#1e3a5f" rx="6" />
      <text x="130" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">1-18</text>
      <rect x="190" y="50" width="100" height="60" fill="#1e3a5f" rx="6" />
      <text x="240" y="86" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="bold">19-36</text>
      <circle cx="130" cy="75" r="12" fill="#f4a81d" opacity="0.5" />
      <text x="130" y="78" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">$10</text>
      <line x1="350" y1="80" x2="470" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="350" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Low / High</text>
      <text x="350" y="105" fontSize="18" fill="#f4a81d" fontWeight="bold">1:1</text>
      <text x="350" y="135" fontSize="9" fill="#94a3b8">Manque (1-18) / Passe (19-36)</text>
      <text x="350" y="155" fontSize="9" fill="#94a3b8">Zero loses on both</text>
    </svg>
  );
}

export function OutsideDozenSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="90" height="60" fill="#1e3a5f" rx="6" />
      <text x="125" y="78" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontWeight="bold">1st 12</text>
      <text x="125" y="93" textAnchor="middle" fontSize="8" fill="#94a3b8">1-12</text>
      <rect x="178" y="50" width="90" height="60" fill="#1e3a5f" rx="6" />
      <text x="223" y="78" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontWeight="bold">2nd 12</text>
      <text x="223" y="93" textAnchor="middle" fontSize="8" fill="#94a3b8">13-24</text>
      <rect x="276" y="50" width="90" height="60" fill="#1e3a5f" rx="6" />
      <text x="321" y="78" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontWeight="bold">3rd 12</text>
      <text x="321" y="93" textAnchor="middle" fontSize="8" fill="#94a3b8">25-36</text>
      <circle cx="223" cy="75" r="12" fill="#f4a81d" opacity="0.5" />
      <text x="223" y="78" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">$5</text>
      <line x1="430" y1="80" x2="540" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="430" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Dozen Bet</text>
      <text x="430" y="105" fontSize="18" fill="#f4a81d" fontWeight="bold">2:1</text>
      <text x="430" y="135" fontSize="9" fill="#94a3b8">12 numbers per dozen</text>
      <text x="430" y="155" fontSize="9" fill="#94a3b8">Also called P12, M12, D12</text>
    </svg>
  );
}

export function OutsideColumnSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="80" y="50" width="80" height="120" fill="#1e3a5f" rx="4" />
      <text x="120" y="115" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontWeight="bold">2:1</text>
      {[2,5,8,11,14,17,20,23,26,29,32,35].map((n, i) => (
        <text key={n} x="120" y={58 + i * 9} textAnchor="middle" fontSize="7" fill="#94a3b8">{n}</text>
      ))}
      <rect x="73" y="175" width="94" height="6" fill="#f4a81d" rx="2" />
      <text x="120" y="174" textAnchor="middle" fontSize="6" fill="#1a1a2e" fontWeight="bold">$5</text>
      <line x1="220" y1="110" x2="360" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="220" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Column Bet</text>
      <text x="220" y="135" fontSize="18" fill="#f4a81d" fontWeight="bold">2:1</text>
      <text x="220" y="160" fontSize="9" fill="#94a3b8">12 numbers per column</text>
      <text x="220" y="178" fontSize="9" fill="#94a3b8">Chip placed at bottom of column</text>
    </svg>
  );
}

export function OutsideSnakeSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i} x={60 + i * 30} y="50" width="28" height="22" fill={[1,5,9,12,14,16,19,23,27,30,32,34].includes(i + 1) ? "#ef4444" : i % 2 === 0 ? "#ef4444" : "#0f172a"} rx="2" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i + "b"} x={60 + i * 30} y="74" width="28" height="22" fill={i % 2 === 0 ? "#0f172a" : "#ef4444"} rx="2" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i + "c"} x={60 + i * 30} y="98" width="28" height="22" fill={i % 2 === 0 ? "#ef4444" : "#0f172a"} rx="2" />
      ))}
      <polyline points="74,61 104,86 134,61 164,86 194,61 224,86 254,61 284,86 314,61 344,86 374,61 404,86"
        fill="none" stroke="#f4a81d" strokeWidth="2" opacity="0.8" />
      <text x="240" y="142" textAnchor="middle" fontSize="10" fill="#f4a81d" fontWeight="bold">Snake Bet: 12 red numbers, zigzag</text>
      <line x1="420" y1="110" x2="540" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="4,3" />
      <text x="420" y="50" fontSize="10" fill="#22c55e" fontWeight="bold">Snake Bet</text>
      <text x="420" y="135" fontSize="18" fill="#f4a81d" fontWeight="bold">2:1</text>
      <text x="420" y="160" fontSize="9" fill="#94a3b8">Covers unique pattern of 12</text>
      <text x="420" y="178" fontSize="9" fill="#94a3b8">1,5,9,12,14,16,19,23,27,30,32,34</text>
    </svg>
  );
}

export function CallVoisinsSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <path d="M50,65 A80,80 0 0,1 80,22 L80,50 A60,60 0 0,0 58,70 Z" fill="#ef4444" opacity="0.6" />
      <path d="M80,22 A80,80 0 0,1 150,24 A80,80 0 0,1 170,45 L155,52 A60,60 0 0,0 135,38 A60,60 0 0,0 80,50 Z" fill="#ef4444" opacity="0.6" />
      <path d="M170,45 A80,80 0 0,1 180,100 L150,100 A60,60 0 0,0 155,52 Z" fill="#ef4444" opacity="0.6" />
      <text x="110" y="58" textAnchor="middle" fontSize="8" fill="#e2e8f0">Voisins</text>
      <text x="110" y="48" textAnchor="middle" fontSize="7" fill="#f4a81d">(17 numbers)</text>
      <text x="110" y="70" textAnchor="middle" fontSize="6" fill="#e2e8f0">22-18-29-7-28-12-35</text>
      <text x="110" y="80" textAnchor="middle" fontSize="6" fill="#e2e8f0">3-26-0-32-15-19-4</text>
      <text x="110" y="90" textAnchor="middle" fontSize="6" fill="#e2e8f0">21-2-25</text>
      <circle cx="110" cy="100" r="4" fill="#f4a81d" />
      <text x="200" y="55" fontSize="11" fill="#22c55e" fontWeight="bold">Voisins du Zero</text>
      <text x="200" y="72" fontSize="10" fill="#e2e8f0">Neighbors of Zero</text>
      <text x="200" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">17 numbers</text>
      <text x="200" y="125" fontSize="10" fill="#e2e8f0">9 chips required</text>
      <text x="350" y="55" fontSize="9" fill="#94a3b8">Largest call bet section</text>
      <text x="350" y="72" fontSize="9" fill="#94a3b8">Covers 45.9% of wheel (EU)</text>
      <text x="350" y="89" fontSize="9" fill="#94a3b8">2 chips: 0-2-3 trio</text>
      <text x="350" y="106" fontSize="9" fill="#94a3b8">1 chip: 4-7 split</text>
      <text x="350" y="123" fontSize="9" fill="#94a3b8">5 chips: 5 corners</text>
    </svg>
  );
}

export function CallTiersSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <path d="M140,170 A80,80 0 0,1 30,140 L45,130 A60,60 0 0,0 135,155 Z" fill="#3b82f6" opacity="0.6" />
      <path d="M30,140 A80,80 0 0,1 25,60 L45,70 A60,60 0 0,0 45,130 Z" fill="#3b82f6" opacity="0.6" />
      <path d="M25,60 A80,80 0 0,1 110,20 L110,40 A60,60 0 0,0 45,70 Z" fill="#3b82f6" opacity="0.6" />
      <text x="110" y="155" textAnchor="middle" fontSize="8" fill="#e2e8f0">Tiers</text>
      <text x="110" y="165" textAnchor="middle" fontSize="7" fill="#3b82f6">(12 numbers)</text>
      <text x="110" y="177" textAnchor="middle" fontSize="6" fill="#e2e8f0">27-13-36-11-30-8</text>
      <text x="110" y="187" textAnchor="middle" fontSize="6" fill="#e2e8f0">23-10-5-24-16-33</text>
      <circle cx="110" cy="100" r="4" fill="#f4a81d" />
      <text x="200" y="55" fontSize="11" fill="#22c55e" fontWeight="bold">Tiers du Cylindre</text>
      <text x="200" y="72" fontSize="10" fill="#e2e8f0">Thirds of the Wheel</text>
      <text x="200" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">12 numbers</text>
      <text x="200" y="125" fontSize="10" fill="#e2e8f0">6 chips | 6 splits</text>
      <text x="350" y="55" fontSize="9" fill="#94a3b8">Opposite side of Voisins</text>
      <text x="350" y="72" fontSize="9" fill="#94a3b8">Covers 32.4% of wheel</text>
      <text x="350" y="89" fontSize="9" fill="#94a3b8">Split pairs: 5/8, 10/11,</text>
      <text x="350" y="106" fontSize="9" fill="#94a3b8">13/16, 23/24, 27/30, 33/36</text>
    </svg>
  );
}

export function CallOrphelinsSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <path d="M160,120 A80,80 0 0,1 180,100 L155,100 A60,60 0 0,0 145,115 Z" fill="#22c55e" opacity="0.5" />
      <path d="M180,100 A80,80 0 0,1 160,55 L145,65 A60,60 0 0,0 155,100 Z" fill="#22c55e" opacity="0.5" />
      <path d="M160,55 A80,80 0 0,1 120,22 L120,42 A60,60 0 0,0 145,65 Z" fill="#22c55e" opacity="0.5" />
      <path d="M170,170 A80,80 0 0,1 180,100 L155,100 A60,60 0 0,0 150,155 Z" fill="#22c55e" opacity="0.5" />
      <text x="110" y="88" textAnchor="middle" fontSize="8" fill="#e2e8f0">Orphelins</text>
      <text x="110" y="78" textAnchor="middle" fontSize="7" fill="#22c55e">(8 numbers)</text>
      <text x="110" y="62" textAnchor="middle" fontSize="5" fill="#e2e8f0">17-34-6</text>
      <text x="110" y="54" textAnchor="middle" fontSize="5" fill="#e2e8f0">1-20-14</text>
      <text x="110" y="46" textAnchor="middle" fontSize="5" fill="#e2e8f0">31-9</text>
      <circle cx="110" cy="100" r="4" fill="#f4a81d" />
      <text x="200" y="55" fontSize="11" fill="#22c55e" fontWeight="bold">Orphelins</text>
      <text x="200" y="72" fontSize="10" fill="#e2e8f0">The Orphans</text>
      <text x="200" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">8 numbers</text>
      <text x="200" y="125" fontSize="10" fill="#e2e8f0">5 chips required</text>
      <text x="350" y="55" fontSize="9" fill="#94a3b8">"Leftover" numbers not in</text>
      <text x="350" y="72" fontSize="9" fill="#94a3b8">Voisins or Tiers</text>
      <text x="350" y="89" fontSize="9" fill="#94a3b8">Straight: 1 (1 chip);</text>
      <text x="350" y="106" fontSize="9" fill="#94a3b8">Splits: 6/9, 14/17,</text>
      <text x="350" y="123" fontSize="9" fill="#94a3b8">17/20, 31/34 (4 chips)</text>
    </svg>
  );
}

export function CallJeuZeroSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <circle cx="110" cy="100" r="80" fill="#2d2d1a" />
      <circle cx="110" cy="100" r="80" fill="none" stroke="#f4a81d" strokeWidth="2" />
      <path d="M50,65 A80,80 0 0,1 80,22 L80,50 A60,60 0 0,0 58,70 Z" fill="#fbbf24" opacity="0.5" />
      <path d="M80,22 A80,80 0 0,1 120,24 A80,80 0 0,1 140,40 L125,50 A60,60 0 0,0 110,38 A60,60 0 0,0 80,50 Z" fill="#fbbf24" opacity="0.5" />
      <text x="110" y="48" textAnchor="middle" fontSize="8" fill="#e2e8f0">Jeu Zero</text>
      <text x="110" y="58" textAnchor="middle" fontSize="7" fill="#fbbf24">(7 numbers)</text>
      <text x="110" y="70" textAnchor="middle" fontSize="6" fill="#e2e8f0">12-35-3-26-0</text>
      <text x="110" y="80" textAnchor="middle" fontSize="6" fill="#e2e8f0">32-15</text>
      <circle cx="110" cy="100" r="4" fill="#f4a81d" />
      <text x="200" y="55" fontSize="11" fill="#22c55e" fontWeight="bold">Jeu Zero</text>
      <text x="200" y="72" fontSize="10" fill="#e2e8f0">Zero Game</text>
      <text x="200" y="100" fontSize="18" fill="#f4a81d" fontWeight="bold">7 numbers</text>
      <text x="200" y="125" fontSize="10" fill="#e2e8f0">4 chips required</text>
      <text x="350" y="55" fontSize="9" fill="#94a3b8">Numbers closest to zero</text>
      <text x="350" y="72" fontSize="9" fill="#94a3b8">Smallest called bet section</text>
      <text x="350" y="89" fontSize="9" fill="#94a3b8">Straight: 26 (1 chip)</text>
      <text x="350" y="106" fontSize="9" fill="#94a3b8">Splits: 0/3, 12/15,</text>
      <text x="350" y="123" fontSize="9" fill="#94a3b8">32/35 (3 chips)</text>
    </svg>
  );
}

export function BallTrajectorySvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="40" y="20" width="140" height="30" fill="#334155" rx="4" />
      <text x="110" y="40" textAnchor="middle" fontSize="9" fill="#e2e8f0" fontWeight="bold">Track</text>
      <line x1="110" y1="50" x2="110" y2="70" stroke="#f4a81d" strokeWidth="1" />
      <circle cx="110" cy="70" r="6" fill="#f4a81d" />
      <text x="110" y="73" textAnchor="middle" fontSize="5" fill="#1a1a2e">Ball</text>
      <line x1="110" y1="76" x2="110" y2="100" stroke="#f4a81d" strokeWidth="1" />
      <rect x="60" y="100" width="100" height="24" fill="#334155" rx="4" />
      <text x="110" y="116" textAnchor="middle" fontSize="9" fill="#e2e8f0" fontWeight="bold">Deflectors</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={65 + i * 13} y="106" width="4" height="12" fill="#f4a81d" rx="1" opacity="0.6" />
      ))}
      <line x1="110" y1="124" x2="110" y2="148" stroke="#f4a81d" strokeWidth="1" />
      <rect x="60" y="148" width="100" height="22" fill="#22c55e" opacity="0.3" rx="4" />
      <text x="110" y="164" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="bold">Pocket</text>
      <circle cx="110" cy="148" r="4" fill="#f4a81d" />
      <text x="200" y="55" fontSize="11" fill="#f4a81d" fontWeight="bold">Ball Trajectory</text>
      <text x="200" y="72" fontSize="10" fill="#e2e8f0">Cross-section of wheel</text>
      <text x="330" y="55" fontSize="9" fill="#94a3b8">1. Ball spun in track</text>
      <text x="330" y="72" fontSize="9" fill="#94a3b8">2. Hits diamond deflectors</text>
      <text x="330" y="89" fontSize="9" fill="#94a3b8">3. Loses momentum, drops</text>
      <text x="330" y="106" fontSize="9" fill="#94a3b8">4. Bounces between pockets</text>
      <text x="330" y="123" fontSize="9" fill="#94a3b8">5. Settles in final pocket</text>
      <text x="330" y="150" fontSize="10" fill="#f4a81d">Outcome is random each spin</text>
    </svg>
  );
}

export function EnPrisonFlowSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="50" y="20" width="80" height="28" fill="#334155" rx="4" />
      <text x="90" y="39" textAnchor="middle" fontSize="9" fill="#e2e8f0">Spin</text>
      <line x1="90" y1="48" x2="90" y2="62" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points="85,62 95,62 90,70" fill="#f4a81d" />
      <text x="110" y="65" fontSize="8" fill="#94a3b8">Zero?</text>
      <line x1="90" y1="70" x2="90" y2="82" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="50" y="82" width="80" height="28" fill="#ef4444" opacity="0.3" rx="4" />
      <text x="90" y="101" textAnchor="middle" fontSize="9" fill="#ef4444">Yes</text>
      <line x1="130" y1="96" x2="170" y2="96" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="170" y="82" width="80" height="28" fill="#f4a81d" opacity="0.3" rx="4" stroke="#f4a81d" strokeWidth="2" strokeDasharray="4,2" />
      <text x="210" y="101" textAnchor="middle" fontSize="8" fill="#f4a81d">In Prison</text>
      <line x1="250" y1="96" x2="290" y2="96" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="290" y="82" width="80" height="28" fill="#334155" rx="4" />
      <text x="330" y="101" textAnchor="middle" fontSize="8" fill="#e2e8f0">Next Spin</text>
      <line x1="330" y1="110" x2="290" y2="140" stroke="#22c55e" strokeWidth="1.5" />
      <rect x="245" y="140" width="90" height="22" fill="#22c55e" opacity="0.3" rx="4" />
      <text x="290" y="155" textAnchor="middle" fontSize="8" fill="#22c55e">Win: bet returned</text>
      <line x1="370" y1="96" x2="390" y2="96" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="390" y="82" width="70" height="28" fill="#ef4444" opacity="0.3" rx="4" />
      <text x="425" y="101" textAnchor="middle" fontSize="8" fill="#ef4444">Lose</text>
      <text x="300" y="185" textAnchor="middle" fontSize="13" fill="#22c55e" fontWeight="bold">House Edge 1.35%</text>
      <text x="300" y="195" textAnchor="middle" fontSize="8" fill="#94a3b8">French Roulette En Prison rule (even money bets only)</text>
    </svg>
  );
}

export function MartingaleTreeSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      {[{bet:5,loss:5},{bet:10,loss:15},{bet:20,loss:35},{bet:40,loss:75},{bet:80,loss:155},{bet:160,loss:315},{bet:320,loss:635}].map((s, i) => {
        const x = 30 + i * 78;
        return (
          <g key={i}>
            <rect x={x} y="20" width="62" height="40" fill={i >= 5 ? "#ef4444" : i >= 3 ? "#f4a81d" : "#1e3a5f"} rx="4" opacity={i >= 5 ? 0.4 : 0.8} />
            <text x={x + 31} y="38" textAnchor="middle" fontSize="9" fill="#e2e8f0" fontWeight="bold">${s.bet}</text>
            <text x={x + 31} y="52" textAnchor="middle" fontSize="7" fill="#94a3b8">Loss: ${s.loss}</text>
            {i < 6 && (
              <g>
                <line x1={x + 62} y1="40" x2={x + 78} y2="40" stroke="#ef4444" strokeWidth="1.5" />
                <text x={x + 70} y={38} fontSize="8" fill="#ef4444" textAnchor="middle">L</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="300" y="90" textAnchor="middle" fontSize="12" fill="#f4a81d" fontWeight="bold">Martingale Progression</text>
      <text x="300" y="108" textAnchor="middle" fontSize="9" fill="#e2e8f0">Double after each loss</text>
      <text x="300" y="132" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="bold">Total loss: $635</text>
      <text x="300" y="155" textAnchor="middle" fontSize="10" fill="#f4a81d">7 losses = table limit hit</text>
      <text x="300" y="178" textAnchor="middle" fontSize="9" fill="#94a3b8">Risk: small wins, catastrophic losses</text>
    </svg>
  );
}

export function ColorChipMgmtSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <text x="300" y="25" textAnchor="middle" fontSize="11" fill="#f4a81d" fontWeight="bold">Casino Chip Color Value System</text>
      {[{color:"white",val:1,hex:"#e2e8f0"},{color:"red",val:5,hex:"#ef4444"},{color:"green",val:25,hex:"#22c55e"},{color:"black",val:100,hex:"#0f172a"},{color:"purple",val:500,hex:"#a855f7"},{color:"orange",val:1000,hex:"#f4a81d"}].map((c, i) => {
        const x = 30 + i * 92;
        return (
          <g key={i}>
            <circle cx={x + 30} cy="60" r="18" fill={c.hex} stroke={c.color === "white" ? "#94a3b8" : "none"} strokeWidth="1" />
            <text x={x + 30} y="58" textAnchor="middle" fontSize="7" fill={i === 0 ? "#1a1a2e" : "#fff"} fontWeight="bold">${c.val}</text>
            <text x={x + 30} y="74" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">{c.color}</text>
            <text x={x + 30} y="92" textAnchor="middle" fontSize="8" fill="#94a3b8">${c.val}</text>
          </g>
        );
      })}
      <rect x="30" y="108" width="120" height="24" fill="#334155" rx="4" />
      <text x="90" y="125" textAnchor="middle" fontSize="8" fill="#e2e8f0">Cash Buy-In</text>
      <line x1="150" y1="120" x2="180" y2="120" stroke="#f4a81d" strokeWidth="1.5" />
      <polygon points="175,116 185,120 175,124" fill="#f4a81d" />
      <rect x="185" y="108" width="140" height="24" fill="#334155" rx="4" />
      <text x="255" y="125" textAnchor="middle" fontSize="8" fill="#e2e8f0">Color Chips (non-value)</text>
      <line x1="325" y1="120" x2="355" y2="120" stroke="#f4a81d" strokeWidth="1.5" />
      <polygon points="350,116 360,120 350,124" fill="#f4a81d" />
      <rect x="360" y="108" width="140" height="24" fill="#334155" rx="4" />
      <text x="430" y="125" textAnchor="middle" fontSize="8" fill="#e2e8f0">Value Chips (cashable)</text>
      <text x="300" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">Each player has unique color for tracking</text>
      <text x="300" y="172" textAnchor="middle" fontSize="8" fill="#94a3b8">Must exchange color chips to value chips before cashing out</text>
      <text x="300" y="188" textAnchor="middle" fontSize="8" fill="#f4a81d">Roulette chips have no value off the table</text>
    </svg>
  );
}

export function DealerTimelineSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill="#1a1a2e" />
      <rect x="15" y="30" width="570" height="6" fill="#334155" rx="3" />
      <circle cx="15" cy="33" r="3" fill="#e2e8f0" />
      <circle cx="585" cy="33" r="3" fill="#e2e8f0" />
      {[{x:15,label:"0s",title:"Place Bets",detail:"Players place chips on layout",color:"#22c55e"},{x:130,label:"15s",title:"",detail:"",color:"#94a3b8"},{x:260,label:"30s",title:"",detail:"",color:"#94a3b8"},{x:380,label:"45s",title:"Rien ne va plus",detail:"No more bets!",color:"#ef4444"},{x:460,label:"50s",title:"Spin",detail:"Croupier spins wheel",color:"#f4a81d"},{x:510,label:"55s",title:"Ball Drops",detail:"Ball settles in pocket",color:"#f4a81d"},{x:555,label:"60s",title:"Payout",detail:"Winners paid, next round",color:"#22c55e"}].map((t, i) => (
        <g key={i}>
          <circle cx={t.x} cy="33" r="6" fill={t.color} />
          <text x={t.x} y="48" textAnchor="middle" fontSize="7" fill={t.color}>{t.label}</text>
          {t.title && (
            <g>
              <line x1={t.x} y1="39" x2={t.x} y2="55" stroke={t.color} strokeWidth="1" />
              <text x={t.x + (t.x > 400 ? -3 : 0)} y={68} textAnchor={t.x > 400 ? "end" : "start"} fontSize="8" fill={t.color} fontWeight="bold" transform={""}>{t.title}</text>
              <text x={t.x + (t.x > 400 ? -3 : 0)} y={80} textAnchor={t.x > 400 ? "end" : "start"} fontSize="7" fill="#94a3b8">{t.detail}</text>
            </g>
          )}
        </g>
      ))}
      <text x="300" y="108" textAnchor="middle" fontSize="11" fill="#f4a81d" fontWeight="bold">Dealer Timeline (Typical 60-second Round)</text>
      <rect x="15" y="118" width="570" height="4" fill="#334155" rx="2" />
      <rect x="15" y="118" width="370" height="4" fill="#22c55e" opacity="0.4" rx="2" />
      <text x="15" y="134" fontSize="7" fill="#22c55e">Betting Phase</text>
      <rect x="390" y="118" width="195" height="4" fill="#f4a81d" opacity="0.4" rx="2" />
      <text x="390" y="134" fontSize="7" fill="#f4a81d">Resolution Phase</text>
      <text x="300" y="155" textAnchor="middle" fontSize="8" fill="#94a3b8">Timer varies by casino (45-90 seconds typical)</text>
      <text x="300" y="170" textAnchor="middle" fontSize="8" fill="#94a3b8">Electronic tables may run faster (30-45 seconds)</text>
      <text x="300" y="185" textAnchor="middle" fontSize="8" fill="#94a3b8">Online RNG roulette: near-instant rounds</text>
    </svg>
  );
}

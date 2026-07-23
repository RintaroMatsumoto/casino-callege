
const B = "#1a1a2e";
const G = "#f4a81d";
const W = "#e2e8f0";
const M = "#94a3b8";
const GN = "#22c55e";
const R = "#ef4444";
const P = "#a855f7";

const SmallCard = ({
  x,
  y,
  suit,
  rank,
  color,
  textColor,
}: {
  x: number;
  y: number;
  suit: string;
  rank: string;
  color: string;
  textColor: string;
}) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={30} height={44} rx={3} fill={color} stroke={M} strokeWidth={0.5} />
    <text x={3} y={12} fontSize={11} fontWeight="bold" fill={textColor} fontFamily="monospace">
      {rank}
    </text>
    <text x={3} y={24} fontSize={11} fill={textColor} fontFamily="monospace">
      {suit}
    </text>
  </g>
);

const BigCard = ({
  x,
  y,
  suit,
  rank,
  color,
  textColor,
}: {
  x: number;
  y: number;
  suit: string;
  rank: string;
  color: string;
  textColor: string;
}) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={36} height={52} rx={4} fill={color} stroke={M} strokeWidth={0.5} />
    <text x={4} y={14} fontSize={14} fontWeight="bold" fill={textColor} fontFamily="monospace">
      {rank}
    </text>
    <text x={4} y={28} fontSize={14} fill={textColor} fontFamily="monospace">
      {suit}
    </text>
  </g>
);

// ---------------------------------------------------------------------------
// 1. TablePreflopSvg
// ---------------------------------------------------------------------------
export function TablePreflopSvg() {
  const seats = [
    { id: 1, label: "SB", cx: 100, cy: 120 },
    { id: 2, label: "BB", cx: 160, cy: 120 },
    { id: 3, label: "UTG", cx: 220, cy: 120 },
    { id: 4, label: "MP", cx: 305, cy: 55 },
    { id: 5, label: "HJ", cx: 400, cy: 55 },
    { id: 6, label: "CO", cx: 500, cy: 120 },
    { id: 9, label: "BTN", cx: 430, cy: 170 },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <ellipse cx={300} cy={100} rx={240} ry={70} fill="none" stroke={GN} strokeWidth={2} />
      <ellipse cx={300} cy={100} rx={230} ry={63} fill="#0f3460" opacity={0.4} />
      {seats.map((s) => (
        <g key={s.id}>
          <circle cx={s.cx} cy={s.cy} r={16} fill={s.label === "BTN" ? G : M} />
          <text
            x={s.cx}
            y={s.cy + 4}
            textAnchor="middle"
            fontSize={9}
            fill={B}
            fontWeight="bold"
            fontFamily="monospace"
          >
            {s.label}
          </text>
        </g>
      ))}
      <text x={300} y={178} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">
        PREFLOP: Blinds Posted | 9-Handed | Action on UTG
      </text>
      <text x={430} y={142} textAnchor="middle" fontSize={8} fill={G} fontFamily="monospace">
        D
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 2. TableFlopSvg
// ---------------------------------------------------------------------------
export function TableFlopSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <ellipse cx={300} cy={110} rx={250} ry={75} fill="none" stroke={GN} strokeWidth={2} />
      <g transform="translate(210,80)">
        <SmallCard x={0} y={0} suit="\u2665" rank="A" color={W} textColor={R} />
        <SmallCard x={36} y={0} suit="\u2665" rank="K" color={W} textColor={R} />
        <SmallCard x={72} y={0} suit="\u2663" rank="7" color={W} textColor="#000" />
      </g>
      <circle cx={120} cy={120} r={14} fill={GN} />
      <text x={120} y={124} textAnchor="middle" fontSize={8} fill={B} fontWeight="bold">
        SB
      </text>
      <circle cx={460} cy={70} r={14} fill={G} />
      <text x={460} y={74} textAnchor="middle" fontSize={8} fill={B} fontWeight="bold">
        BTN
      </text>
      <circle cx={500} cy={130} r={14} fill={M} />
      <text x={500} y={134} textAnchor="middle" fontSize={8} fill={B} fontWeight="bold">
        MP
      </text>
      <text x={300} y={18} textAnchor="middle" fontSize={11} fill={G} fontWeight="bold" fontFamily="monospace">
        FLOP
      </text>
      <text x={300} y={188} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        3 Community Cards | First to act: SB (position 1)
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 3. TableShowdownSvg
// ---------------------------------------------------------------------------
export function TableShowdownSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <ellipse cx={300} cy={110} rx={250} ry={75} fill="none" stroke={GN} strokeWidth={2} />
      <g transform="translate(190,80)">
        <SmallCard x={0} y={0} suit="\u2665" rank="A" color={W} textColor={R} />
        <SmallCard x={36} y={0} suit="\u2665" rank="K" color={W} textColor={R} />
        <SmallCard x={72} y={0} suit="\u2665" rank="Q" color={W} textColor={R} />
        <SmallCard x={108} y={0} suit="\u2665" rank="J" color={W} textColor={R} />
        <SmallCard x={144} y={0} suit="\u2665" rank="10" color={W} textColor={R} />
      </g>
      <g transform="translate(130,92)">
        <BigCard x={0} y={0} suit="\u2660" rank="9" color={W} textColor="#000" />
        <BigCard x={20} y={0} suit="\u2660" rank="8" color={W} textColor="#000" />
      </g>
      <text x={150} y={110} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        P1
      </text>
      <g transform="translate(430,92)">
        <BigCard x={0} y={0} suit="\u2666" rank="K" color={W} textColor={R} />
        <BigCard x={16} y={0} suit="\u2663" rank="K" color={W} textColor="#000" />
      </g>
      <text x={446} y={110} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        P2
      </text>
      <rect x={270} y={70} width={60} height={28} rx={4} fill={G} opacity={0.9} />
      <text x={300} y={82} textAnchor="middle" fontSize={10} fill={B} fontWeight="bold" fontFamily="monospace">
        POT
      </text>
      <text x={300} y={93} textAnchor="middle" fontSize={7} fill={B} fontFamily="monospace">
        $1,200
      </text>
      <text x={300} y={16} textAnchor="middle" fontSize={11} fill={P} fontWeight="bold" fontFamily="monospace">
        SHOWDOWN
      </text>
      <text x={300} y={188} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        P1: 9\u2660 8\u2660 (Straight) | P2: K\u2666 K\u2663 (Three Kings)
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 4. Hand1RoyalFlushSvg
// ---------------------------------------------------------------------------
export function Hand1RoyalFlushSvg() {
  const cards = [
    { suit: "\u2660", rank: "A" },
    { suit: "\u2660", rank: "K" },
    { suit: "\u2660", rank: "Q" },
    { suit: "\u2660", rank: "J" },
    { suit: "\u2660", rank: "10" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Royal Flush
      </text>
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${130 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill="#000" fontFamily="monospace">
            {c.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill="#000" fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        0.000032%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        The rarest hand in poker. A-K-Q-J-10 all same suit.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 5. Hand2StraightFlushSvg
// ---------------------------------------------------------------------------
export function Hand2StraightFlushSvg() {
  const cards = [
    { suit: "\u2665", rank: "9" },
    { suit: "\u2665", rank: "8" },
    { suit: "\u2665", rank: "7" },
    { suit: "\u2665", rank: "6" },
    { suit: "\u2665", rank: "5" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Straight Flush
      </text>
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${130 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={R} fontFamily="monospace">
            {c.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill={R} fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        0.0279%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        5 sequential cards of the same suit.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 6. Hand3FourKindSvg
// ---------------------------------------------------------------------------
export function Hand3FourKindSvg() {
  const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
  const colors = ["#000", R, R, "#000"];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Four of a Kind
      </text>
      {suits.map((s, i) => (
        <g key={i} transform={`translate(${95 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={colors[i]} fontFamily="monospace">
            A
          </text>
          <text x={6} y={44} fontSize={22} fill={colors[i]} fontFamily="monospace">
            {s}
          </text>
        </g>
      ))}
      <g transform="translate(383,42)">
        <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
        <text x={6} y={22} fontSize={20} fontWeight="bold" fill="#000" fontFamily="monospace">
          5
        </text>
        <text x={6} y={44} fontSize={22} fill="#000" fontFamily="monospace">
          {"\u2660"}
        </text>
      </g>
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        0.168%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        All four cards of one rank + kicker.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 7. Hand4FullHouseSvg
// ---------------------------------------------------------------------------
export function Hand4FullHouseSvg() {
  const kings = [
    { suit: "\u2660", color: "#000" },
    { suit: "\u2665", color: R },
    { suit: "\u2666", color: R },
  ];
  const eights = [
    { suit: "\u2663", color: "#000" },
    { suit: "\u2660", color: "#000" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Full House
      </text>
      {kings.map((k, i) => (
        <g key={i} transform={`translate(${95 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={k.color} fontFamily="monospace">
            K
          </text>
          <text x={6} y={44} fontSize={22} fill={k.color} fontFamily="monospace">
            {k.suit}
          </text>
        </g>
      ))}
      {eights.map((e, i) => (
        <g key={i} transform={`translate(${311 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={e.color} fontFamily="monospace">
            8
          </text>
          <text x={6} y={44} fontSize={22} fill={e.color} fontFamily="monospace">
            {e.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        2.60%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        Three of a kind + One pair.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 8. Hand5FlushSvg
// ---------------------------------------------------------------------------
export function Hand5FlushSvg() {
  const cards = [
    { suit: "\u2660", rank: "A" },
    { suit: "\u2660", rank: "9" },
    { suit: "\u2660", rank: "7" },
    { suit: "\u2660", rank: "4" },
    { suit: "\u2660", rank: "2" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Flush
      </text>
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${130 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill="#000" fontFamily="monospace">
            {c.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill="#000" fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        3.03%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        5 cards of the same suit, not in sequence.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 9. Hand6StraightSvg
// ---------------------------------------------------------------------------
export function Hand6StraightSvg() {
  const cards = [
    { suit: "\u2660", rank: "9", color: "#000" },
    { suit: "\u2665", rank: "8", color: R },
    { suit: "\u2666", rank: "7", color: R },
    { suit: "\u2663", rank: "6", color: "#000" },
    { suit: "\u2660", rank: "5", color: "#000" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Straight
      </text>
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${130 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={c.color} fontFamily="monospace">
            {c.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill={c.color} fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        4.62%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        5 cards in sequence, mixed suits.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 10. Hand7ThreeKindSvg
// ---------------------------------------------------------------------------
export function Hand7ThreeKindSvg() {
  const queens = [
    { suit: "\u2660", color: "#000" },
    { suit: "\u2665", color: R },
    { suit: "\u2666", color: R },
  ];
  const kickers = [
    { suit: "\u2663", rank: "9", color: "#000" },
    { suit: "\u2660", rank: "2", color: "#000" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Three of a Kind
      </text>
      {queens.map((q, i) => (
        <g key={i} transform={`translate(${95 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={q.color} fontFamily="monospace">
            Q
          </text>
          <text x={6} y={44} fontSize={22} fill={q.color} fontFamily="monospace">
            {q.suit}
          </text>
        </g>
      ))}
      {kickers.map((k, i) => (
        <g key={i} transform={`translate(${311 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={k.color} fontFamily="monospace">
            {k.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill={k.color} fontFamily="monospace">
            {k.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        4.83%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        Three cards of the same rank + two kickers.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 11. Hand8TwoPairSvg
// ---------------------------------------------------------------------------
export function Hand8TwoPairSvg() {
  const jacks = [
    { suit: "\u2660", color: "#000" },
    { suit: "\u2665", color: R },
  ];
  const eights = [
    { suit: "\u2666", color: R },
    { suit: "\u2663", color: "#000" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        Two Pair
      </text>
      {jacks.map((j, i) => (
        <g key={i} transform={`translate(${95 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={j.color} fontFamily="monospace">
            J
          </text>
          <text x={6} y={44} fontSize={22} fill={j.color} fontFamily="monospace">
            {j.suit}
          </text>
        </g>
      ))}
      {eights.map((e, i) => (
        <g key={i} transform={`translate(${239 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={e.color} fontFamily="monospace">
            8
          </text>
          <text x={6} y={44} fontSize={22} fill={e.color} fontFamily="monospace">
            {e.suit}
          </text>
        </g>
      ))}
      <g transform="translate(383,42)">
        <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
        <text x={6} y={22} fontSize={20} fontWeight="bold" fill="#000" fontFamily="monospace">
          3
        </text>
        <text x={6} y={44} fontSize={22} fill="#000" fontFamily="monospace">
          {"\u2660"}
        </text>
      </g>
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        23.5%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        Two different pairs + kicker.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 12. Hand9OnePairSvg
// ---------------------------------------------------------------------------
export function Hand9OnePairSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        One Pair
      </text>
      <g transform="translate(95,42)">
        <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
        <text x={6} y={22} fontSize={20} fontWeight="bold" fill="#000" fontFamily="monospace">10</text>
        <text x={6} y={44} fontSize={22} fill="#000" fontFamily="monospace">{"\u2660"}</text>
      </g>
      <g transform="translate(167,42)">
        <rect width={56} height={80} rx={6} fill={W} stroke={G} strokeWidth={1.5} />
        <text x={6} y={22} fontSize={20} fontWeight="bold" fill={R} fontFamily="monospace">10</text>
        <text x={6} y={44} fontSize={22} fill={R} fontFamily="monospace">{"\u2665"}</text>
      </g>
      {[
        { r: "9", s: "\u2666", c: R },
        { r: "5", s: "\u2663", c: "#000" },
        { r: "2", s: "\u2660", c: "#000" },
      ].map((k, i) => (
        <g key={i} transform={`translate(${239 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={k.c} fontFamily="monospace">
            {k.r}
          </text>
          <text x={6} y={44} fontSize={22} fill={k.c} fontFamily="monospace">
            {k.s}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        43.8%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        One pair + three kickers. The most common made hand.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 13. Hand10HighCardSvg
// ---------------------------------------------------------------------------
export function Hand10HighCardSvg() {
  const cards = [
    { suit: "\u2660", rank: "A", color: "#000" },
    { suit: "\u2665", rank: "J", color: R },
    { suit: "\u2663", rank: "9", color: "#000" },
    { suit: "\u2666", rank: "5", color: R },
    { suit: "\u2660", rank: "2", color: "#000" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={28} textAnchor="middle" fontSize={13} fill={G} fontWeight="bold" fontFamily="monospace">
        High Card
      </text>
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${130 + i * 72},42)`}>
          <rect width={56} height={80} rx={6} fill={W} stroke={M} strokeWidth={1} />
          <text x={6} y={22} fontSize={20} fontWeight="bold" fill={c.color} fontFamily="monospace">
            {c.rank}
          </text>
          <text x={6} y={44} fontSize={22} fill={c.color} fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <text x={300} y={148} textAnchor="middle" fontSize={11} fill={M} fontFamily="monospace">
        17.4%
      </text>
      <text x={300} y={170} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        No pair or better. Ace-high wins.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 14. BlindsRotationSvg
// ---------------------------------------------------------------------------
export function BlindsRotationSvg() {
  const tables = [
    {
      x: 40,
      label: "Hand 1",
      btn: 3,
      sb: 4,
      bb: 5,
      color: G,
    },
    {
      x: 250,
      label: "Hand 2",
      btn: 4,
      sb: 5,
      bb: 6,
      color: P,
    },
    {
      x: 460,
      label: "Hand 3",
      btn: 5,
      sb: 6,
      bb: 7,
      color: GN,
    },
  ];
  function miniTable(cx: number, label: string, btn: number, sb: number, bb: number, color: string) {
    const seats = [
      { pos: 1, cx: cx + 6, cy: 80 },
      { pos: 2, cx: cx + 6, cy: 110 },
      { pos: 3, cx: cx + 28, cy: 70 },
      { pos: 4, cx: cx + 28, cy: 120 },
      { pos: 5, cx: cx + 50, cy: 70 },
      { pos: 6, cx: cx + 50, cy: 120 },
      { pos: 7, cx: cx + 72, cy: 80 },
      { pos: 8, cx: cx + 72, cy: 110 },
    ];
    return (
      <g key={label}>
        <ellipse cx={cx + 40} cy={95} rx={44} ry={30} fill="none" stroke={color} strokeWidth={1.5} />
        {seats.map((s) => {
          const isImportant = s.pos === btn || s.pos === sb || s.pos === bb;
          const fill = s.pos === btn ? color : s.pos === sb ? M : s.pos === bb ? M : "transparent";
          const text =
            s.pos === btn ? "D" : s.pos === sb ? "S" : s.pos === bb ? "B" : "";
          return (
            <g key={s.pos}>
              {isImportant && <circle cx={s.cx} cy={s.cy} r={6} fill={fill} />}
              {isImportant && (
                <text
                  x={s.cx}
                  y={s.cy + 3}
                  textAnchor="middle"
                  fontSize={6}
                  fill={B}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {text}
                </text>
              )}
            </g>
          );
        })}
        <text x={cx + 40} y={150} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
          {label}
        </text>
        <text x={cx + 40} y={163} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
          BTN@{btn} SB@{sb} BB@{bb}
        </text>
      </g>
    );
  }
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={22} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Blinds Rotation (Clockwise)
      </text>
      {tables.map((t) => miniTable(t.x, t.label, t.btn, t.sb, t.bb, t.color))}
      <text x={202} y={100} fontSize={28} fill={G} fontFamily="monospace">
        {"\u2192"}
      </text>
      <text x={410} y={100} fontSize={28} fill={G} fontFamily="monospace">
        {"\u2192"}
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 15. BettingRoundsSvg
// ---------------------------------------------------------------------------
export function BettingRoundsSvg() {
  const steps = [
    { label: "PREFLOP", sub: "Blinds | UTG acts", bet: "1BB+", color: GN },
    { label: "FLOP", sub: "3 cards | SB acts", bet: "1BB", color: G },
    { label: "TURN", sub: "1 card", bet: "2BB", color: P },
    { label: "RIVER", sub: "1 card", bet: "2BB", color: R },
    { label: "SHOWDOWN", sub: "Show cards", bet: "", color: W },
  ];
  const startX = 30;
  const w = 100;
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      {steps.map((s, i) => {
        const x = startX + i * (w + 8);
        return (
          <g key={i}>
            <rect x={x} y={35} width={w} height={80} rx={8} fill="none" stroke={s.color} strokeWidth={2} />
            <text x={x + w / 2} y={55} textAnchor="middle" fontSize={9} fontWeight="bold" fill={s.color} fontFamily="monospace">
              {s.label}
            </text>
            <text x={x + w / 2} y={72} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
              {s.sub}
            </text>
            <text x={x + w / 2} y={88} textAnchor="middle" fontSize={8} fill={G} fontFamily="monospace">
              {s.bet}
            </text>
            {i < steps.length - 1 && (
              <text x={x + w + 2} y={75} fontSize={16} fill={M} fontFamily="monospace">
                {"\u2192"}
              </text>
            )}
          </g>
        );
      })}
      <text x={300} y={145} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        Bet size doubles on Turn and River in most games
      </text>
      <text x={300} y={165} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Preflop (blinds force action) | Flop (3 community cards) | Turn (4th card) | River (5th card) | Showdown
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 16. BurnDealTimingSvg
// ---------------------------------------------------------------------------
export function BurnDealTimingSvg() {
  const steps = [
    { label: "Shuffle", color: G },
    { label: "Cut", color: G },
    { label: "Deal (2 each)", color: W },
    { label: "Bet (Preflop)", color: GN },
    { label: "BURN 1", color: R },
    { label: "Flop (3 cards)", color: W },
    { label: "Bet", color: GN },
    { label: "BURN 1", color: R },
    { label: "Turn (1 card)", color: W },
    { label: "Bet", color: GN },
    { label: "BURN 1", color: R },
    { label: "River (1 card)", color: W },
    { label: "Bet", color: GN },
    { label: "Showdown", color: P },
  ];
  const startY = 28;
  const h = 11;
  const col2X = 310;
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={18} textAnchor="middle" fontSize={11} fill={G} fontWeight="bold" fontFamily="monospace">
        Burn &amp; Deal Timeline
      </text>
      {steps.map((s, i) => {
        const col = i < 7 ? 0 : 1;
        const row = i < 7 ? i : i - 7;
        const x = col === 0 ? 30 : col2X;
        const y = startY + row * h;
        const dotX = col === 0 ? 26 : 306;
        return (
          <g key={i}>
            <circle cx={dotX} cy={y + 3} r={3} fill={s.color} />
            <line x1={dotX} y1={y + 3} x2={dotX} y2={s.color === R ? y + 3 : startY + 7 * h - 4} stroke={M} strokeWidth={0.5} opacity={0.3} />
            <text x={x} y={y + 5} fontSize={8} fill={s.color === R ? R : W} fontFamily="monospace">
              {s.label}
            </text>
          </g>
        );
      })}
      <text x={555} y={172} textAnchor="end" fontSize={7} fill={M} fontFamily="monospace">
        Burn before every community card deal
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 17. SidePotSvg
// ---------------------------------------------------------------------------
export function SidePotSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={20} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Side Pot Calculation
      </text>
      {/* Player A - all-in $100 */}
      <circle cx={120} cy={95} r={14} fill={R} />
      <text x={120} y={99} textAnchor="middle" fontSize={8} fill={W} fontWeight="bold" fontFamily="monospace">
        A
      </text>
      <text x={120} y={122} textAnchor="middle" fontSize={7} fill={R} fontFamily="monospace">
        ALL-IN
      </text>
      <text x={120} y={134} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        $100
      </text>
      {/* Player B - $200 */}
      <circle cx={280} cy={95} r={14} fill={G} />
      <text x={280} y={99} textAnchor="middle" fontSize={8} fill={B} fontWeight="bold" fontFamily="monospace">
        B
      </text>
      <text x={280} y={122} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        $200
      </text>
      <text x={280} y={134} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        $200
      </text>
      {/* Player C - $300 */}
      <circle cx={440} cy={95} r={14} fill={GN} />
      <text x={440} y={99} textAnchor="middle" fontSize={8} fill={B} fontWeight="bold" fontFamily="monospace">
        C
      </text>
      <text x={440} y={122} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        $300
      </text>
      <text x={440} y={134} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        $300
      </text>
      {/* Main pot */}
      <rect x={210} y={42} width={140} height={30} rx={6} fill={R} opacity={0.15} stroke={R} strokeWidth={1} />
      <text x={280} y={58} textAnchor="middle" fontSize={9} fill={R} fontWeight="bold" fontFamily="monospace">
        MAIN POT
      </text>
      <text x={280} y={69} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        $300 (A+B+C)
      </text>
      {/* Side pot */}
      <rect x={330} y={58} width={130} height={30} rx={6} fill={G} opacity={0.15} stroke={G} strokeWidth={1} />
      <text x={395} y={74} textAnchor="middle" fontSize={9} fill={G} fontWeight="bold" fontFamily="monospace">
        SIDE POT
      </text>
      <text x={395} y={85} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        $200 (B+C only)
      </text>
      <text x={300} y={175} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        A is all-in for $100 | B &amp; C continue for $200 side pot | C keeps $100 unmatched
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 18. RakeFlowSvg
// ---------------------------------------------------------------------------
export function RakeFlowSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={24} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Rake Flow
      </text>
      <rect x={80} y={50} width={80} height={40} rx={8} fill={G} opacity={0.2} stroke={G} strokeWidth={1.5} />
      <text x={120} y={66} textAnchor="middle" fontSize={9} fill={G} fontWeight="bold" fontFamily="monospace">
        Pot
      </text>
      <text x={120} y={80} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        $100
      </text>
      <text x={180} y={75} fontSize={18} fill={M} fontFamily="monospace">
        {"\u2192"}
      </text>
      <rect x={210} y={50} width={90} height={40} rx={8} fill={P} opacity={0.2} stroke={P} strokeWidth={1.5} />
      <text x={255} y={66} textAnchor="middle" fontSize={9} fill={P} fontWeight="bold" fontFamily="monospace">
        5% Rake
      </text>
      <text x={255} y={80} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        = $5
      </text>
      <text x={320} y={75} fontSize={18} fill={M} fontFamily="monospace">
        {"\u2192"}
      </text>
      <rect x={350} y={50} width={100} height={40} rx={8} fill={R} opacity={0.2} stroke={R} strokeWidth={1.5} />
      <text x={400} y={66} textAnchor="middle" fontSize={9} fill={R} fontWeight="bold" fontFamily="monospace">
        Drop Box
      </text>
      <text x={400} y={80} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        (House fee)
      </text>
      <text x={300} y={118} textAnchor="middle" fontSize={9} fill={M} fontFamily="monospace">
        Rake: 5% (max $3-$5)
      </text>
      <text x={300} y={140} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        Winner gets $95 | House keeps $5 for running the game
      </text>
      <text x={120} y={50} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Before rake
      </text>
      <text x={400} y={50} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        After rake
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 19. OutsFlushSvg
// ---------------------------------------------------------------------------
export function OutsFlushSvg() {
  const spades = [
    { suit: "\u2660", rank: "A" },
    { suit: "\u2660", rank: "K" },
    { suit: "\u2660", rank: "7" },
    { suit: "\u2660", rank: "3" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={22} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Counting Outs: Flush Draw
      </text>
      {spades.map((c, i) => (
        <g key={i} transform={`translate(${100 + i * 62},40)`}>
          <rect width={46} height={66} rx={5} fill={W} stroke={G} strokeWidth={1.5} />
          <text x={5} y={18} fontSize={17} fontWeight="bold" fill="#000" fontFamily="monospace">
            {c.rank}
          </text>
          <text x={5} y={36} fontSize={18} fill="#000" fontFamily="monospace">
            {c.suit}
          </text>
        </g>
      ))}
      <g transform="translate(348,40)">
        <rect width={46} height={66} rx={5} fill={W} stroke={R} strokeWidth={1.5} strokeDasharray="3,2" />
        <text x={5} y={18} fontSize={17} fontWeight="bold" fill={R} fontFamily="monospace">5</text>
        <text x={5} y={36} fontSize={18} fill={R} fontFamily="monospace">{"\u2665"}</text>
      </g>
      <text x={371} y={120} textAnchor="middle" fontSize={8} fill={R} fontFamily="monospace">
        NOT a spade
      </text>
      <text x={300} y={145} textAnchor="middle" fontSize={10} fill={GN} fontWeight="bold" fontFamily="monospace">
        Need 1 more spade. 13 total - 4 seen = 9 OUTS
      </text>
      <text x={300} y={168} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        With 9 outs and 2 cards to come, you have about 35% chance to complete the flush.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 20. PotOddsCalcSvg
// ---------------------------------------------------------------------------
export function PotOddsCalcSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={22} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Pot Odds Calculation
      </text>
      {/* Pot */}
      <rect x={40} y={45} width={90} height={36} rx={6} fill={G} opacity={0.2} stroke={G} strokeWidth={1.5} />
      <text x={85} y={60} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">Pot</text>
      <text x={85} y={74} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">$100</text>
      {/* + */}
      <text x={148} y={68} fontSize={16} fill={M} fontFamily="monospace">+</text>
      {/* Bet */}
      <rect x={170} y={45} width={90} height={36} rx={6} fill={P} opacity={0.2} stroke={P} strokeWidth={1.5} />
      <text x={215} y={60} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">Bet</text>
      <text x={215} y={74} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">$50</text>
      {/* = */}
      <text x={280} y={68} fontSize={16} fill={M} fontFamily="monospace">=</text>
      {/* Total */}
      <rect x={300} y={45} width={100} height={36} rx={6} fill={GN} opacity={0.2} stroke={GN} strokeWidth={1.5} />
      <text x={350} y={60} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">Total</text>
      <text x={350} y={74} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">$150</text>
      {/* Your call */}
      <rect x={420} y={45} width={110} height={36} rx={6} fill={R} opacity={0.2} stroke={R} strokeWidth={1.5} />
      <text x={475} y={60} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">Your Call</text>
      <text x={475} y={74} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">$50</text>
      {/* Formula */}
      <text x={300} y={110} textAnchor="middle" fontSize={11} fill={G} fontWeight="bold" fontFamily="monospace">
        $50 / ($150 + $50) = 25%
      </text>
      <text x={300} y={135} textAnchor="middle" fontSize={10} fill={W} fontFamily="monospace">
        You need to win 25%+ of the time for this call to be profitable.
      </text>
      <text x={300} y={158} textAnchor="middle" fontSize={9} fill={GN} fontFamily="monospace">
        Call if win probability &gt; 25%
      </text>
      <text x={300} y={178} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Pot odds = Call / (Total pot after call). Break-even point.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 21. StringBetSvg
// ---------------------------------------------------------------------------
export function StringBetSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={20} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        String Bet (Illegal)
      </text>
      {/* Panel 1 */}
      <rect x={15} y={35} width={180} height={110} rx={8} fill={R} opacity={0.1} stroke={R} strokeWidth={2} />
      <text x={105} y={60} textAnchor="middle" fontSize={10} fill={R} fontWeight="bold" fontFamily="monospace">NG</text>
      <text x={105} y={78} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">"I call your</text>
      <text x={105} y={93} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">$50... and raise</text>
      <text x={105} y={108} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">you another $100"</text>
      <text x={105} y={130} textAnchor="middle" fontSize={7} fill={R} fontFamily="monospace">Split chip throw</text>
      {/* Panel 2 */}
      <rect x={210} y={35} width={180} height={110} rx={8} fill={G} opacity={0.1} stroke={G} strokeWidth={2} />
      <text x={300} y={60} textAnchor="middle" fontSize={10} fill={G} fontWeight="bold" fontFamily="monospace">WATCH</text>
      <text x={300} y={78} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">Player moves</text>
      <text x={300} y={93} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">chips forward</text>
      <text x={300} y={108} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">in batches</text>
      <text x={300} y={130} textAnchor="middle" fontSize={7} fill={G} fontFamily="monospace">Watching reaction</text>
      {/* Panel 3 */}
      <rect x={405} y={35} width={180} height={110} rx={8} fill={GN} opacity={0.1} stroke={GN} strokeWidth={2} />
      <text x={495} y={60} textAnchor="middle" fontSize={10} fill={GN} fontWeight="bold" fontFamily="monospace">OK</text>
      <text x={495} y={78} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">"Raise to</text>
      <text x={495} y={93} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">$150" then</text>
      <text x={495} y={108} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">push all chips</text>
      <text x={495} y={130} textAnchor="middle" fontSize={7} fill={GN} fontFamily="monospace">Declare amount first</text>
      <text x={300} y={175} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        In most rooms, the first action stands. Declaring "call" ends your action. String betting is a serious rule violation.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 22. Collusion3Svg
// ---------------------------------------------------------------------------
export function Collusion3Svg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={20} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Collusion: Illegal Team Play
      </text>
      {/* Chip Dumping */}
      <rect x={15} y={35} width={180} height={115} rx={8} fill={R} opacity={0.1} stroke={R} strokeWidth={2} />
      <text x={105} y={58} textAnchor="middle" fontSize={10} fill={R} fontWeight="bold" fontFamily="monospace">
        Chip Dumping
      </text>
      <circle cx={75} cy={90} r={10} fill={R} />
      <text x={75} y={94} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">A</text>
      <circle cx={135} cy={90} r={10} fill={G} />
      <text x={135} y={94} textAnchor="middle" fontSize={7} fill={B} fontFamily="monospace">B</text>
      <text x={105} y={115} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">A loses</text>
      <text x={105} y={127} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">chips on</text>
      <text x={105} y={139} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">purpose to B</text>
      {/* Soft Play */}
      <rect x={210} y={35} width={180} height={115} rx={8} fill={G} opacity={0.1} stroke={G} strokeWidth={2} />
      <text x={300} y={58} textAnchor="middle" fontSize={10} fill={G} fontWeight="bold" fontFamily="monospace">
        Soft Play
      </text>
      <circle cx={275} cy={90} r={10} fill={P} />
      <text x={275} y={94} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">A</text>
      <circle cx={325} cy={90} r={10} fill={G} />
      <text x={325} y={94} textAnchor="middle" fontSize={7} fill={B} fontFamily="monospace">B</text>
      <text x={300} y={115} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">Both check</text>
      <text x={300} y={127} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">down strong</text>
      <text x={300} y={139} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">hands</text>
      {/* Signaling */}
      <rect x={405} y={35} width={180} height={115} rx={8} fill={P} opacity={0.1} stroke={P} strokeWidth={2} />
      <text x={495} y={58} textAnchor="middle" fontSize={10} fill={P} fontWeight="bold" fontFamily="monospace">
        Signaling
      </text>
      <circle cx={465} cy={90} r={10} fill={W} />
      <text x={465} y={94} textAnchor="middle" fontSize={7} fill={B} fontFamily="monospace">A</text>
      <circle cx={525} cy={90} r={10} fill={W} />
      <text x={525} y={94} textAnchor="middle" fontSize={7} fill={B} fontFamily="monospace">B</text>
      <text x={495} y={115} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">Chip</text>
      <text x={495} y={127} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">placement =</text>
      <text x={495} y={139} textAnchor="middle" fontSize={7} fill={W} fontFamily="monospace">hand strength</text>
      <text x={300} y={175} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Collusion violates casino rules. Penalties include forfeiture of funds and permanent ban.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 23. AngleShootingSvg
// ---------------------------------------------------------------------------
export function AngleShootingSvg() {
  const panels = [
    { x: 15, title: "Out of Turn", desc: "Acting before position to confuse opponents", color: R },
    { x: 160, title: "Hide Chips", desc: "Concealing high value chips behind smaller ones", color: G },
    { x: 305, title: "False Declare", desc: "Saying 'raise' then placing only a call amount", color: P },
    { x: 450, title: "Slow Roll", desc: "Deliberately delaying reveal with the nuts", color: R },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={18} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Angle Shooting
      </text>
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={30} width={135} height={90} rx={6} fill={p.color} opacity={0.1} stroke={p.color} strokeWidth={1.5} />
          <text x={p.x + 67} y={50} textAnchor="middle" fontSize={8} fill={p.color} fontWeight="bold" fontFamily="monospace">
            {p.title}
          </text>
          <text x={p.x + 67} y={68} textAnchor="middle" fontSize={6.5} fill={W} fontFamily="monospace">
            {p.desc.split(" ").slice(0, 3).join(" ")}
          </text>
          <text x={p.x + 67} y={80} textAnchor="middle" fontSize={6.5} fill={W} fontFamily="monospace">
            {p.desc.split(" ").slice(3, 6).join(" ")}
          </text>
          {p.desc.split(" ").length > 6 && (
            <text x={p.x + 67} y={92} textAnchor="middle" fontSize={6.5} fill={W} fontFamily="monospace">
              {p.desc.split(" ").slice(6).join(" ")}
            </text>
          )}
        </g>
      ))}
      <text x={300} y={145} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Angle shooting exploits ambiguity in rules without technically breaking them.
      </text>
      <text x={300} y={162} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        It is considered unethical and many rooms penalize it under "etiquette violation" rules.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 24. BlindGrowthSvg
// ---------------------------------------------------------------------------
export function BlindGrowthSvg() {
  const levels = [
    [1, 100, 1],
    [5, 500, 3],
    [10, 2500, 8],
    [15, 7000, 15],
    [20, 10000, 25],
  ];
  const graphW = 460;
  const graphH = 100;
  const graphX = 90;
  const graphY = 50;
  const maxBlind = 10000;
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={20} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Blind Growth (Exponential)
      </text>
      {/* Axes */}
      <line x1={graphX} y1={graphY} x2={graphX} y2={graphY + graphH} stroke={M} strokeWidth={1} />
      <line x1={graphX} y1={graphY + graphH} x2={graphX + graphW} y2={graphY + graphH} stroke={M} strokeWidth={1} />
      {/* Y axis labels */}
      <text x={graphX - 5} y={graphY + 8} textAnchor="end" fontSize={7} fill={M} fontFamily="monospace">$10k</text>
      <text x={graphX - 5} y={graphY + graphH / 2 + 4} textAnchor="end" fontSize={7} fill={M} fontFamily="monospace">$5k</text>
      <text x={graphX - 5} y={graphY + graphH + 4} textAnchor="end" fontSize={7} fill={M} fontFamily="monospace">$0</text>
      {/* Axes labels */}
      <text x={graphX + graphW / 2} y={graphY + graphH + 18} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace">
        Level
      </text>
      <text x={15} y={graphY + graphH / 2} textAnchor="middle" fontSize={8} fill={W} fontFamily="monospace" transform={`rotate(-90, 15, ${graphY + graphH / 2})`}>
        Blind ($)
      </text>
      {/* Curve points */}
      {levels.map((lvl, i) => {
        const x = graphX + ((lvl[0] - 1) / 19) * graphW;
        const y = graphY + graphH - (lvl[1] / maxBlind) * graphH;
        const next = levels[i + 1];
        const nx = next ? graphX + ((next[0] - 1) / 19) * graphW : x;
        const ny = next ? graphY + graphH - (next[1] / maxBlind) * graphH : y;
        return (
          <g key={i}>
            {next && <line x1={x} y1={y} x2={nx} y2={ny} stroke={G} strokeWidth={2} opacity={0.8} />}
            <circle cx={x} cy={y} r={3} fill={G} />
            <text x={x} y={y - 8} textAnchor="middle" fontSize={7} fill={G} fontFamily="monospace">
              ${lvl[1]}
            </text>
            <text x={x} y={graphY + graphH + 10} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
              {lvl[0]}
            </text>
          </g>
        );
      })}
      <text x={300} y={190} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        Starting Blinds $100/$200 to Final Blinds $5,000/$10,000 in a typical 20-level tournament
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 25. ChipRaceSvg
// ---------------------------------------------------------------------------
export function ChipRaceSvg() {
  const chipColors = [R, G, P, G, M, R, P, G, M, R, G, P, M, G, R];
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto my-4">
      <rect width="600" height="200" fill={B} />
      <text x={300} y={22} textAnchor="middle" fontSize={12} fill={G} fontWeight="bold" fontFamily="monospace">
        Chip Race (Round Up)
      </text>
      {/* Scattered chips */}
      {chipColors.map((c, i) => (
        <g key={i}>
          <circle cx={60 + (i % 5) * 22 + (Math.random() * 8 - 4)} cy={50 + Math.floor(i / 5) * 22 + (Math.random() * 6 - 3)} r={6} fill={c} stroke={W} strokeWidth={0.5} />
          <text x={60 + (i % 5) * 22 + (Math.random() * 8 - 4)} y={53 + Math.floor(i / 5) * 22 + (Math.random() * 6 - 3)} textAnchor="middle" fontSize={5} fill={W} fontFamily="monospace">
            25
          </text>
        </g>
      ))}
      <text x={155} y={130} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        Low value chips
      </text>
      {/* Arrow */}
      <text x={235} y={95} fontSize={22} fill={G} fontFamily="monospace">
        {"\u2192"}
      </text>
      {/* Dealer */}
      <rect x={270} y={50} width={80} height={30} rx={6} fill={G} opacity={0.15} stroke={G} strokeWidth={1} />
      <text x={310} y={68} textAnchor="middle" fontSize={8} fill={G} fontFamily="monospace">
        Dealer
      </text>
      <text x={310} y={98} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        Exchanges
      </text>
      {/* Arrow */}
      <text x={370} y={95} fontSize={22} fill={G} fontFamily="monospace">
        {"\u2192"}
      </text>
      {/* One neat chip */}
      <circle cx={440} cy={95} r={20} fill={G} stroke={W} strokeWidth={1.5} />
      <text x={440} y={98} textAnchor="middle" fontSize={9} fill={B} fontWeight="bold" fontFamily="monospace">
        500
      </text>
      <text x={440} y={130} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        Higher value
      </text>
      <text x={440} y={143} textAnchor="middle" fontSize={7} fill={M} fontFamily="monospace">
        chip
      </text>
      <text x={300} y={172} textAnchor="middle" fontSize={9} fill={W} fontFamily="monospace">
        Chip Race: round up small denominations to prevent unnecessary low-value chips in play.
      </text>
      <text x={300} y={188} textAnchor="middle" fontSize={8} fill={M} fontFamily="monospace">
        Dealer colours up by exchanging large stacks of low chips for fewer high-denomination chips.
      </text>
    </svg>
  );
}

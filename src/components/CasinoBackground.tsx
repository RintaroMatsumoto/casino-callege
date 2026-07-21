export default function CasinoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Green felt */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.12) 100%), linear-gradient(180deg, #1a8a3a 0%, #147a30 40%, #0f6a28 70%, #1a8a3a 100%)',
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      {/* Wood frame */}
      <div className="absolute top-0 left-0 right-0 h-2.5" style={{ background: 'linear-gradient(180deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-2.5" style={{ background: 'linear-gradient(0deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-2.5" style={{ background: 'linear-gradient(90deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-2.5" style={{ background: 'linear-gradient(270deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />

      {/* Spotlight */}
      <div className="absolute w-[clamp(200px,40vw,500px)] h-[clamp(300px,50vw,700px)] -skew-x-[30deg]" style={{
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.1), transparent)',
        animation: 'spotlight 10s ease-in-out infinite',
        left: '-30%', top: '-40%',
      }} />

      {/* Roulette wheel — top-left, visible on lg+ only */}
      <div className="hidden lg:block absolute" style={{
        top: 45, left: 25, width: 180, height: 180, opacity: 0.85,
      }}>
        <svg viewBox="0 0 320 320" className="w-full h-full">
          <circle cx="160" cy="160" r="158" fill="#4a3020" stroke="#3d2b1f" strokeWidth="2" />
          <circle cx="160" cy="160" r="152" fill="none" stroke="#5a3a20" strokeWidth="6" />
          <circle cx="160" cy="160" r="144" fill="none" stroke="#6a4a2a" strokeWidth="1" />
          <circle cx="160" cy="160" r="140" fill="none" stroke="#2a1a0f" strokeWidth="8" />
          {[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26].map((n,i)=>{
            const a1 = (i * 360 / 37 - 90) * Math.PI / 180
            const a2 = ((i+1) * 360 / 37 - 90) * Math.PI / 180
            const r1 = 135, r2 = 95
            const x1 = 160 + r1 * Math.cos(a1), y1 = 160 + r1 * Math.sin(a1)
            const x2 = 160 + r1 * Math.cos(a2), y2 = 160 + r1 * Math.sin(a2)
            const x3 = 160 + r2 * Math.cos(a2), y3 = 160 + r2 * Math.sin(a2)
            const x4 = 160 + r2 * Math.cos(a1), y4 = 160 + r2 * Math.sin(a1)
            const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n)
            return <polygon key={n} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill={n===0?'#16a34a':isRed?'#dc2626':'#1e293b'} stroke="#64748b" strokeWidth="1"/>
          })}
          {Array.from({length: 37}, (_,i)=>{
            const a = (i * 360 / 37 - 90) * Math.PI / 180
            return <line key={i} x1={160 + 136 * Math.cos(a)} y1={160 + 136 * Math.sin(a)} x2={160 + 94 * Math.cos(a)} y2={160 + 94 * Math.sin(a)} stroke="#94a3b8" strokeWidth="1" opacity="0.6"/>
          })}
          {[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26].map((n,i)=>{
            const a = (i * 360 / 37 + 360/74 - 90) * Math.PI / 180
            return <text key={n} x={160 + 115 * Math.cos(a)} y={160 + 115 * Math.sin(a)} fill="#e2e8f0" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="central">{n}</text>
          })}
          <circle cx="160" cy="160" r="85" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="160" cy="160" r="50" fill="#0f172a" stroke="#475569" strokeWidth="2" />
          <circle cx="160" cy="160" r="36" fill="none" stroke="#334155" strokeWidth="1" />
          <circle cx="160" cy="160" r="10" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="160" cy="160" r="4" fill="#cbd5e1" />
        </svg>
        <div className="absolute" style={{
          width: 10, height: 10, top: 0, left: '50%', marginLeft: -5,
          borderRadius: '50%', background: '#f8fafc', boxShadow: '0 0 6px rgba(248,250,252,0.8), 0 0 12px rgba(248,250,252,0.4)',
          animation: 'orbitBall 3s linear infinite',
          transformOrigin: '5px 79px',
        }} />
      </div>

      {/* Poker cards — face-down deck dealing one by one */}
      <div className="hidden lg:block absolute" style={{
        top: 50, right: 25, width: 280, height: 80, opacity: 0.9,
      }}>
        {/* Static deck — always visible */}
        <div className="cd-deck" />

        {[
          { rank: 'A', suit: '♠', color: '#1e293b' },
          { rank: 'K', suit: '♠', color: '#1e293b' },
          { rank: 'Q', suit: '♠', color: '#1e293b' },
          { rank: 'J', suit: '♠', color: '#1e293b' },
          { rank: '10', suit: '♠', color: '#1e293b' },
        ].map((card, i) => (
          <div key={card.rank} className={`cd-w cd-w-${i}`}>
            <div className={`cd-i cd-i-${i}`}>
              <div className="cd-f" style={{ color: card.color }}>
                <span>{card.rank}</span>
                <span style={{ fontSize: 18 }}>{card.suit}</span>
              </div>
              <div className="cd-b" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spotlight {
          0%, 100% { transform: translateX(-30%) skewX(-30deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(130%) skewX(-30deg); opacity: 0; }
        }
        @keyframes orbitBall { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .cd-w {
          position: absolute; top: 2px;
          width: 38px; height: 54px;
          perspective: 600px;
        }
        .cd-w-0 { left: 234px; z-index: 1; }
        .cd-w-1 { left: 233px; z-index: 2; }
        .cd-w-2 { left: 232px; z-index: 3; }
        .cd-w-3 { left: 231px; z-index: 4; }
        .cd-w-4 { left: 230px; z-index: 5; }
        .cd-w-0 { top: -3px; } .cd-w-1 { top: -2px; } .cd-w-2 { top: -1px; }
        .cd-w-3 { top: 0px; } .cd-w-4 { top: 1px; }

        .cd-deck {
          position: absolute; left: 229px; top: 2px;
          width: 40px; height: 56px;
          border-radius: 3px;
          background: repeating-linear-gradient(45deg, #1e293b 0, #1e293b 4px, #334155 4px, #334155 8px);
          border: 1px solid #475569;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          z-index: 0;
        }

        .cd-i {
          width: 100%; height: 100%;
          transform-style: preserve-3d;
        }
        .cd-f, .cd-b {
          position: absolute; inset: 0;
          border-radius: 3px;
          backface-visibility: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .cd-f {
          background: #f8fafc; border: 1px solid #94a3b8;
          font-size: 10px; font-weight: bold; font-family: serif;
          transform: rotateY(0deg);
        }
        .cd-b {
          background: repeating-linear-gradient(45deg, #1e293b 0, #1e293b 4px, #334155 4px, #334155 8px);
          border: 1px solid #475569;
          transform: rotateY(180deg);
        }

        @keyframes c0 {
          0%, 14%  { transform: rotateY(180deg) translateX(0); z-index: 20; }
          15%, 18% { transform: rotateY(180deg) translateX(-234px); z-index: 20; }
          19%, 20% { transform: rotateY(0deg) translateX(-234px); z-index: 20; }
          21%, 79% { transform: rotateY(0deg) translateX(-234px); z-index: 1; }
          80%, 81% { transform: rotateY(180deg) translateX(-234px); z-index: 1; }
          82%, 85% { transform: rotateY(180deg) translateX(0); z-index: 1; }
          86%, 100%{ transform: rotateY(180deg) translateX(0); }
        }
        @keyframes c1 {
          0%, 18%  { transform: rotateY(180deg) translateX(0); }
          19%, 22% { transform: rotateY(180deg) translateX(-185px); z-index: 20; }
          23%, 24% { transform: rotateY(0deg) translateX(-185px); z-index: 20; }
          25%, 83% { transform: rotateY(0deg) translateX(-185px); z-index: 2; }
          84%, 85% { transform: rotateY(180deg) translateX(-185px); z-index: 2; }
          86%, 89% { transform: rotateY(180deg) translateX(0); z-index: 2; }
          90%, 100%{ transform: rotateY(180deg) translateX(0); }
        }
        @keyframes c2 {
          0%, 22%  { transform: rotateY(180deg) translateX(0); }
          23%, 26% { transform: rotateY(180deg) translateX(-136px); z-index: 20; }
          27%, 28% { transform: rotateY(0deg) translateX(-136px); z-index: 20; }
          29%, 87% { transform: rotateY(0deg) translateX(-136px); z-index: 3; }
          88%, 89% { transform: rotateY(180deg) translateX(-136px); z-index: 3; }
          90%, 93% { transform: rotateY(180deg) translateX(0); z-index: 3; }
          94%, 100%{ transform: rotateY(180deg) translateX(0); }
        }
        @keyframes c3 {
          0%, 26%  { transform: rotateY(180deg) translateX(0); }
          27%, 30% { transform: rotateY(180deg) translateX(-87px); z-index: 20; }
          31%, 32% { transform: rotateY(0deg) translateX(-87px); z-index: 20; }
          33%, 91% { transform: rotateY(0deg) translateX(-87px); z-index: 4; }
          92%, 93% { transform: rotateY(180deg) translateX(-87px); z-index: 4; }
          94%, 97% { transform: rotateY(180deg) translateX(0); z-index: 4; }
          98%, 100%{ transform: rotateY(180deg) translateX(0); }
        }
        @keyframes c4 {
          0%, 30%  { transform: rotateY(180deg) translateX(0); }
          31%, 34% { transform: rotateY(180deg) translateX(-38px); z-index: 20; }
          35%, 36% { transform: rotateY(0deg) translateX(-38px); z-index: 20; }
          37%, 95% { transform: rotateY(0deg) translateX(-38px); z-index: 5; }
          96%, 97% { transform: rotateY(180deg) translateX(-38px); z-index: 5; }
          98%, 100%{ transform: rotateY(180deg) translateX(0); z-index: 5; }
        }

        .cd-i-0 { animation: c0 12s ease-in-out infinite; }
        .cd-i-1 { animation: c1 12s ease-in-out infinite; }
        .cd-i-2 { animation: c2 12s ease-in-out infinite; }
        .cd-i-3 { animation: c3 12s ease-in-out infinite; }
        .cd-i-4 { animation: c4 12s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

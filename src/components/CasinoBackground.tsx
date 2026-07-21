export default function CasinoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.12) 100%), linear-gradient(180deg, #1a8a3a 0%, #147a30 40%, #0f6a28 70%, #1a8a3a 100%)',
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 left-0 right-0 h-2.5" style={{ background: 'linear-gradient(180deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-2.5" style={{ background: 'linear-gradient(0deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-2.5" style={{ background: 'linear-gradient(90deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-2.5" style={{ background: 'linear-gradient(270deg, #5a3a20 0%, #3d2b1f 50%, #2a1a0f 100%)' }} />

      <div className="absolute w-[clamp(200px,40vw,500px)] h-[clamp(300px,50vw,700px)] -skew-x-[30deg]" style={{
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.1), transparent)',
        animation: 'spotlight 10s ease-in-out infinite',
        left: '-30%', top: '-40%',
      }} />

      <div className="absolute roulette" style={{
        top: 'clamp(70px,10vh,100px)',
        width: 'clamp(60px,10vw,140px)', height: 'clamp(60px,10vw,140px)',
        opacity: 0.7,
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
          width: 6, height: 6, top: 0, left: '50%', marginLeft: -3,
          borderRadius: '50%', background: '#f8fafc', boxShadow: '0 0 6px rgba(248,250,252,0.8)',
          animation: 'orbitBall 3s linear infinite',
          transformOrigin: '3px 79px',
        }} />
      </div>

      <div className="absolute cd-box" style={{
        top: 'clamp(74px,12vh,110px)', right: 'clamp(10px,2vw,25px)',
        opacity: 0.75,
      }}>
        <div className="cd-deck" />
        {['A','K','Q','J','10'].map((r, i) => (
          <div key={r} className={`cd cd-${i}`}>
            <span className="cd-r">{r}</span>
            <span className="cd-s">{'\u2660'}</span>
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

        .roulette {
          left: clamp(10px, 2vw, 25px);
        }
        @media (width >= 64rem) {
          .roulette {
            left: calc(256px + clamp(10px, 2vw, 30px));
          }
        }

        .cd-box { width: 260px; height: 70px; }
        .cd-deck {
          position: absolute; left: 199px; top: 2px;
          width: 40px; height: 54px; border-radius: 3px;
          background: repeating-linear-gradient(45deg, #1e293b 0, #1e293b 4px, #334155 4px, #334155 8px);
          border: 1px solid #475569; box-shadow: 0 2px 8px rgba(0,0,0,0.4); z-index: 0;
        }
        .cd {
          position: absolute; top: 1px;
          width: 38px; height: 52px; border-radius: 3px;
          background: #f8fafc; border: 1px solid #94a3b8;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }
        .cd::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          border-radius: 3px;
          background: repeating-linear-gradient(45deg, #1e293b 0, #1e293b 4px, #334155 4px, #334155 8px);
          border: 1px solid #475569;
        }
        .cd-0 { left: 204px; z-index: 5; top: -3px; }
        .cd-1 { left: 203px; z-index: 4; top: -2px; }
        .cd-2 { left: 202px; z-index: 3; top: -1px; }
        .cd-3 { left: 201px; z-index: 2; top: 0px; }
        .cd-4 { left: 200px; z-index: 1; top: 1px; }
        .cd-r { font-size: 10px; font-weight: bold; font-family: serif; line-height: 1; color: #1e293b; }
        .cd-s { font-size: 16px; line-height: 1; color: #1e293b; }

        @keyframes m0 {
          0%, 2%  { transform: translateX(0); }
          3%, 9%  { transform: translateX(-204px); }
          10%, 68% { transform: translateX(-204px); }
          69%, 75% { transform: translateX(0); }
          76%, 100% { transform: translateX(0); }
        }
        @keyframes b0 {
          0%, 8%  { opacity: 1; }
          9%, 10% { opacity: 0; }
          11%, 66% { opacity: 0; }
          67%, 68% { opacity: 1; }
          69%, 100% { opacity: 1; }
        }
        @keyframes m1 {
          0%, 6%  { transform: translateX(0); }
          7%, 13% { transform: translateX(-159px); }
          14%, 65% { transform: translateX(-159px); }
          66%, 72% { transform: translateX(0); }
          73%, 100% { transform: translateX(0); }
        }
        @keyframes b1 {
          0%, 12% { opacity: 1; }
          13%, 14% { opacity: 0; }
          15%, 63% { opacity: 0; }
          64%, 65% { opacity: 1; }
          66%, 100% { opacity: 1; }
        }
        @keyframes m2 {
          0%, 10% { transform: translateX(0); }
          11%, 17% { transform: translateX(-114px); }
          18%, 62% { transform: translateX(-114px); }
          63%, 69% { transform: translateX(0); }
          70%, 100% { transform: translateX(0); }
        }
        @keyframes b2 {
          0%, 16% { opacity: 1; }
          17%, 18% { opacity: 0; }
          19%, 60% { opacity: 0; }
          61%, 62% { opacity: 1; }
          63%, 100% { opacity: 1; }
        }
        @keyframes m3 {
          0%, 14% { transform: translateX(0); }
          15%, 21% { transform: translateX(-69px); }
          22%, 59% { transform: translateX(-69px); }
          60%, 66% { transform: translateX(0); }
          67%, 100% { transform: translateX(0); }
        }
        @keyframes b3 {
          0%, 20% { opacity: 1; }
          21%, 22% { opacity: 0; }
          23%, 57% { opacity: 0; }
          58%, 59% { opacity: 1; }
          60%, 100% { opacity: 1; }
        }
        @keyframes m4 {
          0%, 18% { transform: translateX(0); }
          19%, 25% { transform: translateX(-24px); }
          26%, 56% { transform: translateX(-24px); }
          57%, 63% { transform: translateX(0); }
          64%, 100% { transform: translateX(0); }
        }
        @keyframes b4 {
          0%, 24% { opacity: 1; }
          25%, 26% { opacity: 0; }
          27%, 54% { opacity: 0; }
          55%, 56% { opacity: 1; }
          57%, 100% { opacity: 1; }
        }

        .cd-0 { animation: m0 8s ease-in-out infinite; }
        .cd-0::before { animation: b0 8s ease-in-out infinite; }
        .cd-1 { animation: m1 8s ease-in-out infinite; }
        .cd-1::before { animation: b1 8s ease-in-out infinite; }
        .cd-2 { animation: m2 8s ease-in-out infinite; }
        .cd-2::before { animation: b2 8s ease-in-out infinite; }
        .cd-3 { animation: m3 8s ease-in-out infinite; }
        .cd-3::before { animation: b3 8s ease-in-out infinite; }
        .cd-4 { animation: m4 8s ease-in-out infinite; }
        .cd-4::before { animation: b4 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default function CasinoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Green felt table */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.15) 100%), linear-gradient(180deg, #0f5c2a 0%, #0a4a1e 50%, #0f5c2a 100%)',
      }} />
      {/* Felt texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      {/* Wood frame */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: 'linear-gradient(180deg, #3d2b1f 0%, #2a1a0f 50%, #3d2b1f 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: 'linear-gradient(0deg, #3d2b1f 0%, #2a1a0f 50%, #3d2b1f 100%)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'linear-gradient(90deg, #3d2b1f 0%, #2a1a0f 50%, #3d2b1f 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'linear-gradient(270deg, #3d2b1f 0%, #2a1a0f 50%, #3d2b1f 100%)' }} />
      {/* Spotlight */}
      <div className="absolute w-[400px] h-[600px] -skew-x-[30deg]" style={{
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04), transparent)',
        animation: 'tableLight 10s ease-in-out infinite',
        left: '-20%', top: '-30%',
      }} />
      <style>{`@keyframes tableLight{0%,100%{transform:translateX(-30%) skewX(-30deg);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(130%) skewX(-30deg);opacity:0}}`}</style>
    </div>
  )
}

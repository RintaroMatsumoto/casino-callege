const DENOMS = [
  { value: 1, color: '#f8fafc', text: '#475569', border: '#cbd5e1' },
  { value: 5, color: '#dc2626', text: '#fff', border: '#b91c1c' },
  { value: 25, color: '#22c55e', text: '#fff', border: '#16a34a' },
  { value: 100, color: '#1e293b', text: '#fff', border: '#0f172a' },
  { value: 500, color: '#a855f7', text: '#fff', border: '#7e22ce' },
]

export function ChipTray({ balance, bet, onBet }: { balance: number; bet: number; onBet: (v: number) => void }) {
  return (
    <div className="bg-casino-dark/80 rounded-lg p-2 border border-casino-border">
      <div className="text-[8px] text-casino-muted/60 mb-1">CHIP TRAY</div>
      <div className="flex gap-1.5 items-end">
        {DENOMS.map(d => (
          <button key={d.value} onClick={() => onBet(d.value)}
            style={{ width: 28, height: 28, borderRadius: '50%', background: d.color, border: `2px solid ${d.border}`, color: d.text, fontSize: 8, fontWeight: 700, cursor: balance >= bet + d.value ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: balance >= bet + d.value ? 1 : 0.3 }}
            disabled={balance < bet + d.value}>
            {d.value}
          </button>
        ))}
        <span className="ml-2 text-[9px] font-bold text-white">${bet}</span>
      </div>
    </div>
  )
}

export function PayoutBox({ label, bet, odds, payout, net }: { label: string; bet: number; odds: string; payout: number; net: number }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '6px 10px', fontSize: 10 }}>
      <div className="text-casino-gold font-bold text-xs mb-1">{label}</div>
      <div className="text-casino-muted space-y-0.5">
        <div>Bet ${bet} x {odds} = ${payout}</div>
        <div className={net >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>Net: {net >= 0 ? '+$' + net : '-$' + Math.abs(net)}</div>
      </div>
    </div>
  )
}

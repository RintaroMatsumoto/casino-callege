export const INIT_BALANCE = 100000000

const DENOMS = [
  { value: 1000000, color: '#a855f7', text: '#fff', border: '#7e22ce' },
  { value: 100000, color: '#1e293b', text: '#fff', border: '#0f172a' },
  { value: 10000, color: '#f97316', text: '#fff', border: '#c2410c' },
  { value: 1000, color: '#22c55e', text: '#fff', border: '#16a34a' },
  { value: 100, color: '#dc2626', text: '#fff', border: '#b91c1c' },
  { value: 10, color: '#f8fafc', text: '#475569', border: '#cbd5e1' },
]

function chipLabel(v: number): string {
  if (v >= 1000000) return (v / 1000000).toFixed(0) + 'M'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return String(v)
}

export function ChipTray({ balance, bet, onBet }: { balance: number; bet: number; onBet: (v: number) => void }) {
  return (
    <div className="bg-casino-dark/80 rounded-xl p-3 border border-casino-border">
      <div className="text-[10px] text-casino-muted/60 mb-1.5 font-bold">CHIP TRAY — ${balance.toLocaleString()}</div>
      <div className="flex gap-2 items-end">
        {DENOMS.map(d => (
          <button key={d.value} onClick={() => onBet(d.value)}
            style={{ width: 36, height: 36, borderRadius: '50%', background: d.color, border: `2px solid ${d.border}`, color: d.text, fontSize: 9, fontWeight: 700, cursor: balance >= bet + d.value ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: balance >= bet + d.value ? 1 : 0.3 }}
            disabled={balance < bet + d.value}>
            {chipLabel(d.value)}
          </button>
        ))}
        <span className="ml-3 text-sm font-bold text-casino-gold">BET ${bet.toLocaleString()}</span>
      </div>
    </div>
  )
}

export function PayoutBox({ label, bet, odds, payout, net }: { label: string; bet: number; odds: string; payout: number; net: number }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
      <div className="text-casino-gold font-bold text-sm mb-1.5">{label}</div>
      <div className="text-casino-muted space-y-1">
        <div>Bet: <span className="text-white font-bold">${bet.toLocaleString()}</span> × {odds}</div>
        <div>Payout: <span className="text-white font-bold">${payout.toLocaleString()}</span></div>
        <div className={net >= 0 ? 'text-emerald-400 font-bold text-sm' : 'text-red-400 font-bold text-sm'}>
          {net >= 0 ? '+' : ''}${net.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export function PhaseBadge({ steps, current }: { phase?: string; steps: string[]; current: number }) {
  return (
    <div className="flex gap-2 items-center justify-center my-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: i <= current ? '#f4a81d' : '#334155' }} />
          <span style={{ fontSize: 9, fontWeight: i <= current ? 700 : 400, color: i <= current ? '#f4a81d' : '#64748b' }}>{s}</span>
          {i < steps.length - 1 && <span className="text-[#334155] text-[8px]">▸</span>}
        </div>
      ))}
    </div>
  )
}

export function TipBox({ text }: { text: string }) {
  return (
    <div className="mt-2 p-3 rounded-lg bg-casino-card/50 border border-casino-gold/20 text-[10px] text-casino-muted leading-relaxed">
      <span className="text-casino-gold font-bold mr-1">📖</span> {text}
    </div>
  )
}

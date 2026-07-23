export const INIT_BALANCE = 100000000

const DENOMS = [
  { value: 1000000, color: '#a855f7', text: '#fff', border: '#7e22ce' },
  { value: 100000, color: '#1e293b', text: '#fff', border: '#0f172a' },
  { value: 10000, color: '#f97316', text: '#fff', border: '#c2410c' },
  { value: 1000, color: '#22c55e', text: '#fff', border: '#16a34a' },
  { value: 100, color: '#dc2626', text: '#fff', border: '#b91c1c' },
  { value: 10, color: '#f8fafc', text: '#475569', border: '#cbd5e1' },
]

function cl(v: number): string {
  if (v >= 1000000) return (v / 1000000).toFixed(0) + 'M'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return String(v)
}

export function ChipTray({ balance, bet, onBet }: { balance: number; bet: number; onBet: (v: number) => void }) {
  return (
    <div className="bg-casino-dark/80 rounded-xl p-4 border border-casino-border mb-3">
      <div className="text-sm text-casino-muted/60 mb-2 font-bold">💰 BALANCE: ${balance.toLocaleString()}</div>
      <div className="flex gap-3 items-end">
        {DENOMS.map(d => (
          <button key={d.value} onClick={() => onBet(d.value)}
            style={{ width: 44, height: 44, borderRadius: '50%', background: d.color, border: '3px solid ' + d.border, color: d.text, fontSize: 11, fontWeight: 700, cursor: balance >= bet + d.value ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: balance >= bet + d.value ? 1 : 0.3 }}
            disabled={balance < bet + d.value}>
            {cl(d.value)}
          </button>
        ))}
        <div className="ml-4 text-lg font-bold text-casino-gold">BET ${bet.toLocaleString()}</div>
      </div>
    </div>
  )
}

export function PayoutBox({ label, bet, odds, payout, net }: { label: string; bet: number; odds: string; payout: number; net: number }) {
  return (
    <div className="space-y-2">
      <div className="text-casino-gold font-bold text-lg">{label}</div>
      <div className="text-white/70 space-y-1 text-sm">
        <div>Bet: <span className="text-white font-bold">${bet.toLocaleString()}</span></div>
        <div>Odds: {odds}</div>
        <div>Payout: <span className="text-white font-bold">${payout.toLocaleString()}</span></div>
        <div className={'pt-1 border-t border-white/10 text-base font-bold ' + (net >= 0 ? 'text-emerald-400' : 'text-red-400')}>
          {net >= 0 ? '+' : ''}${net.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export function PhaseBadge({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex gap-3 items-center justify-center my-3 flex-wrap">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: i <= current ? '#f4a81d' : '#334155' }} />
          <span style={{ fontSize: 13, fontWeight: i <= current ? 700 : 400, color: i <= current ? '#f4a81d' : '#64748b' }}>{s}</span>
          {i < steps.length - 1 && <span className="text-[#334155] text-sm">→</span>}
        </div>
      ))}
    </div>
  )
}

export function TipBox({ text }: { text: string }) {
  return (
    <div className="mt-3 p-4 rounded-xl bg-casino-card/80 border border-casino-gold/20 text-sm text-casino-muted leading-relaxed">
      <span className="text-casino-gold font-bold mr-2">📖 TIP</span> {text}
    </div>
  )
}

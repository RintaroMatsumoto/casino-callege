import type { Card as CardType } from './types'
import { isRed } from './types'

export function CardFace({ card, size = 'md' }: { card: CardType; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? { w: 36, h: 50, r: 12, s: 18 } : size === 'lg' ? { w: 56, h: 78, r: 16, s: 28 } : { w: 44, h: 62, r: 14, s: 22 }
  if (card.hidden) {
    return (
      <div style={{ width: dims.w, height: dims.h, borderRadius: dims.r, background: 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 4px, #334155 4px, #334155 8px)', border: '1px solid #475569', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
    )
  }
  const color = isRed(card.suit) ? '#dc2626' : '#1e293b'
  return (
    <div style={{ width: dims.w, height: dims.h, borderRadius: dims.r, background: '#f8fafc', border: '1px solid #94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: 3, left: 4, fontSize: size === 'sm' ? 9 : size === 'lg' ? 13 : 10, fontWeight: 700, fontFamily: 'serif', lineHeight: 1, color }}>{card.rank}</span>
      <span style={{ position: 'absolute', top: 13, left: 4, fontSize: size === 'sm' ? 7 : size === 'lg' ? 10 : 8, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ fontSize: dims.s, lineHeight: 1, color }}>{card.suit}</span>
      <span style={{ position: 'absolute', bottom: 3, right: 4, fontSize: size === 'sm' ? 9 : size === 'lg' ? 13 : 10, fontWeight: 700, fontFamily: 'serif', lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.rank}</span>
      <span style={{ position: 'absolute', bottom: -3, right: 4, fontSize: size === 'sm' ? 7 : size === 'lg' ? 10 : 8, lineHeight: 1, color, transform: 'rotate(180deg)' }}>{card.suit}</span>
    </div>
  )
}

export function ChipDisplay({ value, size = 32 }: { value: number; size?: number }) {
  const colors: Record<number, { bg: string; border: string; text: string }> = {
    1: { bg: '#f8fafc', border: '#cbd5e1', text: '#475569' },
    5: { bg: '#dc2626', border: '#b91c1c', text: '#fff' },
    25: { bg: '#22c55e', border: '#16a34a', text: '#fff' },
    100: { bg: '#1e293b', border: '#0f172a', text: '#fff' },
    500: { bg: '#a855f7', border: '#7e22ce', text: '#fff' },
  }
  const c = colors[value] || colors[1]
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: c.bg, border: `2px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(0,0,0,0.08)', fontSize: size * 0.3, fontWeight: 700, color: c.text, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', border: `1.5px dashed ${c.border}`, opacity: 0.4 }} />
      {value}
    </div>
  )
}

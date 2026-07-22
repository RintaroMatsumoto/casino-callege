import type { FC } from 'react'

type GameType = 'blackjack' | 'roulette' | 'craps' | 'poker' | 'baccarat'

type Props = {
  game: GameType
  className?: string
}

const labelStyle: React.CSSProperties = {
  position: 'absolute',
  color: 'rgba(255,255,255,0.35)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  pointerEvents: 'none',
  userSelect: 'none',
}

function BlackjackMarkings() {
  return (
    <>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 80, height: 80, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
      <div style={{ ...labelStyle, top: 'calc(50% - 52px)', left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>BET</div>
      <div style={{ position: 'absolute', top: 'calc(50% - 90px)', left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
      <div style={{ ...labelStyle, top: 'calc(50% - 106px)', left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>INSURANCE</div>
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.12)', fontSize: 20, fontWeight: 900, letterSpacing: 3, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>BLACKJACK 3:2</div>
      <div style={{ position: 'absolute', bottom: 'calc(50% + 48px)', left: 'calc(50% + 55px)', width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
      </div>
      <div style={{ ...labelStyle, bottom: 'calc(50% + 72px)', left: 'calc(50% + 55px)', fontSize: 7, color: 'rgba(255,255,255,0.15)', width: 20, textAlign: 'center' }}>YOU</div>
    </>
  )
}

const numStyle: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 10,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.3)',
  pointerEvents: 'none',
  userSelect: 'none',
}

function RouletteMarkings() {
  const nums = [
    [3,6,9,12,15,18,21,24,27,30,33,36],
    [2,5,8,11,14,17,20,23,26,29,32,35],
    [1,4,7,10,13,16,19,22,25,28,31,34],
  ]
  const reds = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36])
  const cellW = 28, cellH = 24, gap = 2
  const gridW = 12 * (cellW + gap) + gap
  const gridH = 3 * (cellH + gap) + gap
  const left = '50%', top = '50%'
  const baseLeft = `calc(${left} - ${gridW / 2}px)`
  const baseTop = `calc(${top} - ${gridH / 2}px - 20px)`

  return (
    <>
      <div style={{ position: 'absolute', left: baseLeft, top: baseTop, width: gridW, height: gridH, pointerEvents: 'none' }}>
        {nums.map((row, ri) =>
          row.map((n, ci) => (
            <div key={n} style={{
              ...numStyle,
              left: gap + ci * (cellW + gap),
              top: gap + ri * (cellH + gap),
              width: cellW, height: cellH,
              borderRadius: 3,
              border: `1px solid ${reds.has(n) ? 'rgba(220,38,38,0.25)' : 'rgba(255,255,255,0.1)'}`,
              background: reds.has(n) ? 'rgba(220,38,38,0.08)' : 'rgba(255,255,255,0.03)',
              fontSize: 9,
              color: reds.has(n) ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.3)',
            }}>{n}</div>
          ))
        )}
        <div key="zero" style={{
          ...numStyle,
          left: gap,
          top: gap - cellH - gap,
          width: cellW, height: cellH,
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          fontSize: 9,
        }}>0</div>
      </div>

      <div style={{ position: 'absolute', left: `calc(${left} - ${gridW / 2}px)`, top: `calc(${baseTop} - 60px)`, width: gridW, height: 18, display: 'flex', gap, pointerEvents: 'none' }}>
        {[{ l: '1-18', c: 'rgba(255,255,255,0.15)' }, { l: 'EVEN', c: 'rgba(255,255,255,0.15)' }, { l: 'RED', c: 'rgba(220,38,38,0.25)' }, { l: 'BLACK', c: 'rgba(255,255,255,0.15)' }, { l: 'ODD', c: 'rgba(255,255,255,0.15)' }, { l: '19-36', c: 'rgba(255,255,255,0.15)' }].map((z, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${z.c}`, borderRadius: 3, fontSize: 8, fontWeight: 700, color: z.c, letterSpacing: 1 }}>{z.l}</div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: `calc(${left} - ${gridW / 2}px)`, top: `calc(${baseTop} + ${gridH}px + 6px)`, width: gridW, height: 18, display: 'flex', gap, pointerEvents: 'none' }}>
        {[{ l: '1st 12', c: 'rgba(255,255,255,0.15)' }, { l: '2nd 12', c: 'rgba(255,255,255,0.15)' }, { l: '3rd 12', c: 'rgba(255,255,255,0.15)' }].map((z, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${z.c}`, borderRadius: 3, fontSize: 8, fontWeight: 700, color: z.c, letterSpacing: 1 }}>{z.l}</div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: `calc(${left} + ${gridW / 2}px + 8px)`, top: `calc(${top} - ${gridH / 2}px - 20px)`, width: 24, height: gridH, display: 'flex', flexDirection: 'column', gap, pointerEvents: 'none' }}>
        {['2:1', '2:1', '2:1'].map((l, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 3, fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.25)', writingMode: 'vertical-lr', letterSpacing: 2 }}>{l}</div>
        ))}
      </div>
    </>
  )
}

function CrapsMarkings() {
  return (
    <>
      <div style={{ position: 'absolute', top: 'calc(50% - 70px)', left: '50%', transform: 'translateX(-50%)', width: 140, height: 140, border: '2px solid rgba(255,255,255,0.15)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', pointerEvents: 'none' }} />
      <div style={{ ...labelStyle, top: 'calc(50% - 80px)', left: '50%', transform: 'translateX(-50%)', fontSize: 8 }}>PASS LINE</div>

      <div style={{ position: 'absolute', top: 'calc(50% - 76px)', left: '50%', transform: 'translateX(-50%)', width: 120, height: 18, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: 1 }}>DON'T PASS BAR</span>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 36, borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, pointerEvents: 'none' }}>
        {[2,3,4,9,10,11,12].map(n => (
          <span key={n} style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{n}</span>
        ))}
      </div>
      <div style={{ ...labelStyle, bottom: 80, left: '50%', transform: 'translateX(-50%)', fontSize: 7, color: 'rgba(255,255,255,0.15)' }}>FIELD</div>

      {[
        { x: 'calc(50% - 130px)', y: 'calc(50% - 40px)', nums: '4,5,6' },
        { x: 'calc(50% - 130px)', y: 'calc(50% + 16px)', nums: '8,9,10' },
      ].map((zone, i) => (
        <div key={i} style={{ position: 'absolute', left: zone.x, top: zone.y, width: 50, height: 44, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>PLACE<br />{zone.nums}</span>
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: 100, left: 'calc(50% - 90px)', width: 50, height: 30, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>COME</span>
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 'calc(50% + 40px)', width: 50, height: 30, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>DON'T<br />COME</span>
      </div>

      <div style={{ position: 'absolute', top: 'calc(50% - 14px)', left: 'calc(50% + 80px)', width: 40, height: 40, borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 2, pointerEvents: 'none' }}>
        {[4,6,8,10].map(n => (
          <span key={n} style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.15)', width: 16, textAlign: 'center' }}>{n}</span>
        ))}
        <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.1)', width: '100%', textAlign: 'center', marginTop: 2 }}>HARDWAY</span>
      </div>
    </>
  )
}

const spotStyle: React.CSSProperties = {
  position: 'absolute',
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 9,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.2)',
  pointerEvents: 'none',
  userSelect: 'none',
}

function PokerMarkings() {
  const positions = [
    { top: 'calc(50% - 120px)', left: 'calc(50% - 120px)' },
    { top: 'calc(50% - 150px)', left: 'calc(50% - 40px)' },
    { top: 'calc(50% - 150px)', left: 'calc(50% + 4px)' },
    { top: 'calc(50% - 120px)', left: 'calc(50% + 84px)' },
    { top: 'calc(50% - 40px)', left: 'calc(50% + 120px)' },
    { top: 'calc(50% + 4px)', left: 'calc(50% + 120px)' },
    { top: 'calc(50% + 84px)', left: 'calc(50% + 84px)' },
    { top: 'calc(50% + 108px)', left: 'calc(50% + 4px)' },
    { top: 'calc(50% + 108px)', left: 'calc(50% - 40px)' },
    { top: 'calc(50% + 84px)', left: 'calc(50% - 120px)' },
  ]

  return (
    <>
      <div style={{ position: 'absolute', top: 'calc(50% - 30px)', left: 'calc(50% - 40px)', width: 80, height: 50, borderRadius: 8, border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>COMMUNITY</span>
      </div>

      {positions.map((pos, i) => (
        <div key={i} style={{ ...spotStyle, top: pos.top, left: pos.left }}>
          {i === 0 ? 'D' : `P${i}`}
        </div>
      ))}

      <div style={{ position: 'absolute', top: 'calc(50% - 16px)', left: '50%', transform: 'translate(-50%, -50%)', width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      </div>
      <div style={{ ...labelStyle, top: 'calc(50% + 18px)', left: '50%', transform: 'translateX(-50%)', fontSize: 7 }}>POT</div>
    </>
  )
}

function BaccaratMarkings() {
  return (
    <>
      <div style={{ position: 'absolute', top: 'calc(50% - 80px)', left: 'calc(50% - 110px)', width: 90, height: 60, borderRadius: 8, border: '2px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(220,38,38,0.3)', letterSpacing: 2 }}>PLAYER</span>
      </div>
      <div style={{ position: 'absolute', top: 'calc(50% - 80px)', left: 'calc(50% + 20px)', width: 90, height: 60, borderRadius: 8, border: '2px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(6,182,212,0.3)', letterSpacing: 2 }}>BANKER</span>
      </div>
      <div style={{ position: 'absolute', top: 'calc(50% + 40px)', left: '50%', transform: 'translateX(-50%)', width: 100, height: 36, borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>TIE 8:1</span>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', width: 120, height: 24, borderRadius: 4, border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.12)', letterSpacing: 1 }}>COMMISSION TRACKING</span>
      </div>
    </>
  )
}

const markingsMap: Record<GameType, FC> = {
  blackjack: BlackjackMarkings,
  roulette: RouletteMarkings,
  craps: CrapsMarkings,
  poker: PokerMarkings,
  baccarat: BaccaratMarkings,
}

export function FeltMarkings({ game, className = '' }: Props) {
  const Markings = markingsMap[game]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <Markings />
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

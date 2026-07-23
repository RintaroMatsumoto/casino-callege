import { useState, useEffect } from 'react'
import type { Card } from '../../games/types'
import { createDeck, shuffleDeck, handValue } from '../../games/types'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const CW = 64, CH = 90
const BACK = 'repeating-linear-gradient(45deg, #1e293b 0, #1e293b 5px, #334155 5px, #334155 10px)'
let injected = false
const TIPS: Record<string,string> = {
  bet:'チップで賭け金を決め「ディール」。A=1か11、J/Q/K=10。21を目指し超えると負け。最初の2枚で21ならBJ！3:2配当。',
  play:'合計を見て決断。ディーラーは17以上で止まる(S17)。16以下はヒットが基本だがディーラーの見えるカードも参考に。',
  dealer:'ディーラーが17以上になるまで引き続ける。超えたらプレイヤーの勝ち。',
}

const MAX_SLOTS = 6

function getCorrectAction(p: Card[], up: Card): 'hit' | 'stand' {
  const pv = handValue(p)
  const ps = pv.soft <= 21 ? pv.soft : pv.hard
  const soft = pv.soft !== pv.hard && pv.soft <= 21
  const r = up.rank
  const dv = ['J','Q','K'].includes(r) ? 10 : r === 'A' ? 11 : parseInt(r)
  if (soft) {
    if (ps >= 19) return 'stand'
    if (ps === 18) return dv <= 6 ? 'stand' : 'hit'
    return 'hit'
  }
  if (ps >= 17) return 'stand'
  if (ps >= 13 && ps <= 16) return dv >= 2 && dv <= 6 ? 'stand' : 'hit'
  if (ps === 12) return dv >= 4 && dv <= 6 ? 'stand' : 'hit'
  return 'hit'
}

export default function BlackjackGame() {
  useEffect(() => {
    if (!injected) {
      injected = true
      const s = document.createElement('style')
      s.textContent = `
        @keyframes cIn { 0% { transform: translateY(-40px) scale(0.7); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 8px rgba(250,204,21,0.3); } 50% { box-shadow: 0 0 24px rgba(250,204,21,0.8); } }
        @keyframes flipBack { 0%,45% { opacity: 1; transform: scaleX(1); } 50%,100% { opacity: 0; transform: scaleX(0); } }
        @keyframes flipFront { 0%,50% { opacity: 0; transform: scaleX(0); } 55%,100% { opacity: 1; transform: scaleX(1); } }
        @keyframes flashRed { 0%,100% { box-shadow: 0 0 0 transparent; } 50% { box-shadow: 0 0 28px rgba(239,68,68,0.9); } }
        @keyframes flashGreen { 0%,100% { box-shadow: 0 0 0 transparent; } 50% { box-shadow: 0 0 28px rgba(34,197,94,0.9); } }
        @keyframes fbPop { 0% { transform: translate(-50%,-50%) scale(0.5); opacity: 0; } 20% { transform: translate(-50%,-50%) scale(1.1); opacity: 1; } 40% { transform: translate(-50%,-50%) scale(1); } }
      `
      document.head.appendChild(s)
    }
  }, [])

  const [bal, setBal] = useState(INIT_BALANCE)
  const [bet, setBet] = useState(10000)
  const [ph, setPh] = useState<'bet' | 'deal' | 'play' | 'dealer' | 'res'>('bet')
  const [deck, setDeck] = useState<Card[]>([])
  const [p, setP] = useState<Card[]>([]); const [d, setD] = useState<Card[]>([])
  const [pc, setPc] = useState<Card[]>([]); const [dc, setDc] = useState<Card[]>([])
  const [rs, setRs] = useState<{label:string;net:number;payout:number;odds:string}|null>(null)
  const [dS, setDS] = useState(0); const [pS, setPS] = useState(0); const [si, setSi] = useState(0)
  const [drama, setDrama] = useState<'glow' | 'reveal' | 'dealer-21' | 'bust' | null>(null)
  const [fb, setFb] = useState<{correct:boolean;action:'hit'|'stand'} | null>(null)
  const [st, setSt] = useState({correct:0,total:0})
  const S = ['BET','DEAL','PLAY','RESULT']

  const deal = () => {
    if (bet > bal || bet <= 0) return
    setBal(b => b - bet); setRs(null); setPc([]); setDc([]); setP([]); setD([]); setSi(1); setPh('deal'); setDrama(null); setFb(null)
    const dd = shuffleDeck(createDeck()); const p1 = dd[1], d1 = dd[2], p2 = dd[3], d2 = dd[4]
    setP([p1, p2]); setD([d1, { ...d2, hidden: true }]); setDeck(dd.slice(5))
    setTimeout(() => setPc([p1]), 300); setTimeout(() => setDc([d1]), 600)
    setTimeout(() => setPc([p1, p2]), 900); setTimeout(() => setDc([d1, { ...d2, hidden: true }]), 1200)
    setTimeout(() => {
      const pv = handValue([p1, p2]), dv = handValue([d1, { ...d2, hidden: false }])
      const ps = pv.soft <= 21 ? pv.soft : pv.hard, ds = dv.soft <= 21 ? dv.soft : dv.hard
      setPS(ps); setDS(ds)
      if (ps === 21 && ds === 21) { setBal(b => b + bet); setRs({label:'両者BJ プッシュ',net:0,payout:bet,odds:'1:1'}); setDc([d1,d2]); setSi(3); setPh('res') }
      else if (ps === 21) { const p = Math.floor(bet * 2.5); setBal(b => b + p); setRs({label:'ブラックジャック!',net:Math.floor(bet*1.5),payout:p,odds:'3:2'}); setDc([d1,d2]); setSi(3); setPh('res') }
      else if (ds === 21) { setRs({label:'ディーラーBJ',net:-bet,payout:0,odds:'-'}); setDc([d1,d2]); setSi(3); setPh('res') }
      else { setPh('play'); setSi(2) }
    }, 1800)
  }

  const hit = () => {
    if (ph !== 'play' || !deck.length) return
    const card = deck[0]; setDeck(dd => dd.slice(1)); const np = [...p, card]; setP(np); setPc(prev => [...prev, card])
    const v = handValue(np), s = v.soft <= 21 ? v.soft : v.hard; setPS(s)
    if (d[0]) {
      const correct = getCorrectAction(np, d[0])
      const isCorrect = correct === 'hit'
      setFb({correct: isCorrect, action: correct})
      setSt(prev => ({correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1}))
      setTimeout(() => setFb(null), 1500)
    }
    if (s > 21) { setTimeout(() => { setDc(d.map(c => ({...c,hidden:false}))); setDS(handValue(d.map(c => ({...c,hidden:false}))).soft); setRs({label:'バースト!',net:-bet,payout:0,odds:'-'}); setSi(3); setPh('res') }, 500) }
  }

  const stand = () => {
    if (ph !== 'play') return
    if (d[0]) {
      const correct = getCorrectAction(p, d[0])
      const isCorrect = correct === 'stand'
      setFb({correct: isCorrect, action: correct})
      setSt(prev => ({correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1}))
      setTimeout(() => setFb(null), 1500)
    }
    setPh('dealer'); setDrama('glow')
    setTimeout(() => {
      setDrama('reveal')
      const rev = d.map(c => ({...c,hidden:false})); setDc(rev); setD(rev)
      const v = handValue(rev), s = v.soft <= 21 ? v.soft : v.hard; setDS(s)
      setTimeout(() => {
        if (s === 21) { setDrama('dealer-21'); setTimeout(() => { setDrama(null); finish(rev) }, 600); return }
        let dd = [...deck], h: Card[] = [...rev]
        const iv = setInterval(() => {
          const v2 = handValue(h); const s2 = v2.soft <= 21 ? v2.soft : v2.hard; setDS(s2)
          if (s2 >= 17) {
            clearInterval(iv)
            if (s2 > 21) { setDrama('bust'); setTimeout(() => { setDrama(null); finish(h) }, 600); return }
            setDrama(null); finish(h); return
          }
          h.push(dd[0]); dd = dd.slice(1); setDc(prev => [...prev, h[h.length-1]]); setD([...h])
        }, 600)
      }, 600)
    }, 500)
  }

  const finish = (h: Card[]) => {
    const pv = handValue(p), ps = pv.soft <= 21 ? pv.soft : pv.hard, dv = handValue(h), ds = dv.soft <= 21 ? dv.soft : dv.hard
    let net = -bet, label = '負け', payout = 0, odds = '-'
    if (ds > 21) { net = bet; label = 'ディーラーバースト!'; payout = bet*2; odds = '1:1'; setBal(b => b + bet*2) }
    else if (ps > ds) { net = bet; label = 'プレイヤーの勝ち!'; payout = bet*2; odds = '1:1'; setBal(b => b + bet*2) }
    else if (ps === ds) { net = 0; label = 'プッシュ'; payout = bet; odds = '1:1'; setBal(b => b + bet) }
    setRs({label,net,payout,odds}); setSi(3); setPh('res')
  }

  const renderSlots = (cards: Card[], isDealer: boolean) => {
    const score = isDealer ? dS : pS
    return Array.from({length: MAX_SLOTS}).map((_, i) => {
      const c = cards[i]
      const isHole = isDealer && i === 1
      return (
        <div key={(isDealer ? 'd' : 'p') + i} style={{width: CW, minHeight: CH, position: 'relative'}}>
          {!c && (
            <div style={{
              width: CW, height: CH,
              border: '2px dashed rgba(255,255,255,0.08)',
              borderRadius: 6,
              transition: 'opacity 0.5s ease',
            }}/>
          )}
          {c && (() => {
            const glow = isHole && drama === 'glow'
            const revealBack = isHole && drama === 'reveal'
            const redFlash = isHole && drama === 'dealer-21'
            const greenFlash = isHole && drama === 'bust'
            let extraStyle: React.CSSProperties = {}
            if (glow) extraStyle = { animation: 'pulseGlow 0.5s ease-in-out infinite', borderRadius: 6 }
            if (redFlash) extraStyle = { animation: 'flashRed 0.6s ease-in-out', borderRadius: 6 }
            if (greenFlash) extraStyle = { animation: 'flashGreen 0.6s ease-in-out', borderRadius: 6 }
            if (revealBack) {
              return (
                <div style={{position:'relative',width:CW,height:CH,...extraStyle}}>
                  <div style={{position:'absolute',inset:0,animation:'flipBack 0.6s ease-in-out',borderRadius:6,background:BACK,border:'2px solid #475569',boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}/>
                  <div style={{position:'absolute',inset:0,animation:'flipFront 0.6s ease-in-out',borderRadius:6,background:'#f8fafc',border:'1px solid #94a3b8',boxShadow:'0 4px 12px rgba(0,0,0,0.3)'}}>
                    <CardContent card={c}/>
                  </div>
                </div>
              )
            }
            return (
              <div style={{animation:'cIn 0.3s ease-out'}}>
                <div style={extraStyle}>
                  {glow ? (
                    <div style={{width:CW,height:CH,borderRadius:6,background:BACK,border:'2px solid #475569',boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}/>
                  ) : (
                    <CardView card={c}/>
                  )}
                </div>
                {isDealer && i === 1 && !c.hidden && score ? (
                  <div className="text-center text-sm font-bold mt-1" style={{color:score>21?'#ef4444':'#f4a81d'}}>{score}</div>
                ) : null}
              </div>
            )
          })()}
        </div>
      )
    })
  }

  return (
    <div className="animate-fadeIn px-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4"><span className="text-3xl">🃏</span><h1 className="text-2xl font-bold text-white">ブラックジャック</h1></div>
        <div className="text-right"><div className="text-xl font-bold text-white">${bal.toLocaleString()}</div></div>
      </div>
      <PhaseBadge steps={S} current={si} />
      {ph === 'bet' && <><ChipTray balance={bal} bet={bet} onBet={(v) => { if (v <= bal) setBet(v) }} /><TipBox text={TIPS.bet} /></>}

      <div className="relative" style={{ background: 'radial-gradient(ellipse at 50% 20%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)', borderRadius: 20, padding: '24px 20px', border: '6px solid #3d2b1f', minHeight: 460 }}>
        <div style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 60, borderRadius: 4, background: 'repeating-linear-gradient(45deg, #5a3a20 0, #5a3a20 4px, #4a3020 4px, #4a3020 8px)', border: '2px solid #3d2b1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-[9px] text-[#c4a882] font-bold">SHOE</span></div>
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', width: 120, height: 85, borderRadius: '50%', border: '3px dashed rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {ph === 'bet' ? <span className="text-sm text-white/30 font-bold">BET</span> : null}
          {ph !== 'bet' && <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f8fafc', border: '3px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{bet >= 1000 ? (bet/1000).toFixed(0)+'K' : bet}</div>}
        </div>
        <div className="absolute top-2 left-4 text-sm font-bold text-white/30">DEALER</div>
        <div className="absolute" style={{ bottom: 128, left: 4 }}><span className="text-sm font-bold text-white/30">PLAYER</span></div>
        <div className="flex gap-2 justify-center" style={{ marginTop: 20, minHeight: 100 }}>{renderSlots(dc, true)}</div>
        <div className="flex gap-2 justify-center" style={{ marginTop: 80, minHeight: 100 }}>{renderSlots(pc, false)}</div>
        {pS > 0 && <div className="text-lg font-bold text-center mt-2" style={{color:pS>21?'#ef4444':'#f4a81d'}}>SCORE: {pS}</div>}
        {rs && <div className="absolute" style={{top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:50,minWidth:300}}><div className="bg-black/85 rounded-xl p-4"><PayoutBox label={rs.label} bet={bet} odds={rs.odds} payout={rs.payout} net={rs.net}/></div></div>}
        {fb && (
          <div className="absolute" style={{top: '40%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51, animation: 'fbPop 0.3s ease-out', pointerEvents: 'none', whiteSpace: 'nowrap'}}>
            <span style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 15, fontWeight: 700,
              background: fb.correct ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
              color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}>
              {fb.correct ? '✅ 正解!' : `❌ 間違い. 正解は ${fb.action === 'stand' ? 'Stand' : 'Hit'}`}
            </span>
          </div>
        )}
      </div>

      {ph === 'bet' && <div className="flex justify-center mt-4"><button onClick={deal} disabled={bet>bal} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">ディール</button></div>}
      {ph === 'play' && <div className="flex gap-4 justify-center mt-4"><button onClick={hit} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">👆 HIT</button><button onClick={stand} className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base">✋ STAND</button></div>}
      {ph === 'res' && <div className="flex justify-center mt-4"><button onClick={()=>{setPh('bet');setPc([]);setDc([]);setRs(null);setPS(0);setDS(0);setSi(0)}} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-base"><RotateCcw size={20}/> もう一度</button></div>}
      {ph === 'play' && <TipBox text={TIPS.play}/>}
      {ph === 'dealer' && <TipBox text={TIPS.dealer}/>}
      {st.total > 0 && (
        <div className="text-center mt-3 mb-2">
          <span className="text-sm font-bold text-white/60">
            正解率: {Math.round(st.correct / st.total * 100)}% ({st.correct}/{st.total})
          </span>
        </div>
      )}
    </div>
  )
}

function CardContent({card}:{card:Card}) {
  const c = card.suit === '♥' || card.suit === '♦' ? '#dc2626' : '#1e293b'
  return <>
    <span style={{position:'absolute',top:4,left:5,fontSize:16,fontWeight:700,lineHeight:1,color:c}}>{card.rank}</span>
    <span style={{position:'absolute',top:22,left:5,fontSize:10,lineHeight:1,color:c}}>{card.suit}</span>
    <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:34,lineHeight:1,color:c}}>{card.suit}</span>
    <span style={{position:'absolute',bottom:4,right:5,fontSize:16,fontWeight:700,lineHeight:1,color:c,transform:'rotate(180deg)'}}>{card.rank}</span>
  </>
}

function CardView({card}:{card:Card}) {
  if (card.hidden) return <div style={{width:CW,height:CH,borderRadius:6,background:BACK,border:'2px solid #475569',boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}/>
  return <div style={{width:CW,height:CH,borderRadius:6,background:'#f8fafc',border:'1px solid #94a3b8',position:'relative',animation:'cIn 0.25s ease-out',boxShadow:'0 4px 12px rgba(0,0,0,0.3)'}}>
    <CardContent card={card}/>
  </div>
}

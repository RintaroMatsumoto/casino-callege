import { useState, useEffect } from 'react'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

const DICE_SETS: Record<string, [number,number]> = {
  '3V': [3,3],
  '2V': [2,2],
  'Hardway': [4,4],
  'All7s': [1,6],
}

export default function CrapsGame() {
  useEffect(() => {
    if (!injected) {
      injected = true
      const s = document.createElement('style')
      s.textContent = `
@keyframes dShake{0%{transform:rotate(0deg)}25%{transform:rotate(12deg) scale(1.05)}75%{transform:rotate(-12deg) scale(1.05)}100%{transform:rotate(0deg)}}
@keyframes stickPush{0%{transform:translateX(-30px) rotate(-12deg);opacity:0}25%{opacity:1}60%{transform:translateX(5px) rotate(3deg);opacity:1}100%{transform:translateX(35px) rotate(8deg);opacity:0}}
@keyframes redFlash{0%{opacity:0}15%{opacity:0.35}80%{opacity:0.35}100%{opacity:0}}
@keyframes sevenOutText{0%{transform:scale(0.3) rotate(-4deg);opacity:0}25%{transform:scale(1.4) rotate(2deg);opacity:1}50%{transform:scale(1.1) rotate(0deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:0}}
@keyframes shooterChange{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
`
      document.head.appendChild(s)
    }
  }, [])

  const [bal, setBal] = useState(INIT_BALANCE)
  const [bet, setBet] = useState(10000)
  const [dice, setDice] = useState<[number,number]>([1,1])
  const [rolling, setRolling] = useState(false)
  const [phase, setPhase] = useState<'bet'|'comeout'|'point'|'res'>('bet')
  const [point, setPoint] = useState<number|null>(null)
  const [betType, setBetType] = useState<'pass'|'dontpass'>('pass')
  const [lastRoll, setLastRoll] = useState<number|null>(null)
  const [res, setRes] = useState<{sum:number;win:boolean;net:number;payout:number;label:string;odds:string}|null>(null)
  const [call, setCall] = useState<string|null>(null)
  const [puck, setPuck] = useState(false)
  const [si, setSi] = useState(0)
  const S = ['BET', 'COMEOUT', 'POINT', 'RESULT']

  const [stickPhase, setStickPhase] = useState<'idle'|'pushing'>('idle')
  const [diceSet, setDiceSet] = useState<string|null>(null)
  const [sevenOutState, setSevenOutState] = useState<'none'|'flash'|'text'|'change'>('none')

  const doRoll = () => {
    if (rolling || phase === 'bet' || phase === 'res') return
    setRolling(true)
    setStickPhase('pushing')
    setTimeout(() => {
      setStickPhase('idle')
      let c = 0; setSi(phase === 'comeout' ? 1 : 2)
      const iv = setInterval(() => { setDice([Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1]); c++; if (c >= 8) { clearInterval(iv); const d1 = Math.floor(Math.random()*6)+1, d2 = Math.floor(Math.random()*6)+1; setDice([d1,d2]); resolve(d1+d2); setRolling(false) } }, 70)
    }, 350)
  }

  const resolve = (sum: number) => {
    setLastRoll(sum); setCall({2:'Aces!',3:'Yo!',7:'Seven!',11:'Yo-leven!',12:'Boxcars!'}[sum] || sum + '!')

    const isSevenOut = (phase === 'point' && betType === 'pass' && sum === 7)
    if (isSevenOut) {
      setSevenOutState('flash')
      setTimeout(() => setSevenOutState('text'), 500)
      setTimeout(() => setSevenOutState('change'), 2000)
      setTimeout(() => setSevenOutState('none'), 3500)
    }

    if (phase === 'comeout') {
      if ((betType==='pass' && (sum===7||sum===11)) || (betType==='dontpass' && (sum===2||sum===3))) { setBal(b=>b+bet*2); setRes({sum,win:true,net:bet,payout:bet*2,label:(betType==='pass'?'ナチュラル':'ドントパス'),odds:'1:1'}); setSi(3); setPhase('res') }
      else if ((betType==='pass' && (sum===2||sum===3||sum===12)) || (betType==='dontpass' && (sum===7||sum===11))) { setRes({sum,win:false,net:-bet,payout:0,label:'負け',odds:'-'}); setSi(3); setPhase('res') }
      else if (betType==='dontpass' && sum===12) { setBal(b=>b+bet); setRes({sum,win:false,net:0,payout:bet,label:'12プッシュ',odds:'-'}); setSi(3); setPhase('res') }
      else { setPoint(sum); setPuck(true); setPhase('point'); setSi(2) }
    } else {
      if ((betType==='pass' && sum===point) || (betType==='dontpass' && sum===7)) { setBal(b=>b+bet*2); setRes({sum,win:true,net:bet,payout:bet*2,label:betType==='pass'?'ポイント勝ち!':'ドントパス7!',odds:'1:1'}); setSi(3); setPhase('res'); setPuck(false) }
      else if ((betType==='pass' && sum===7) || (betType==='dontpass' && sum===point)) { setRes({sum,win:false,net:-bet,payout:0,label:betType==='pass'?'セブンアウト':'ポイント負け',odds:'-'}); setSi(3); setPhase('res'); setPuck(false) }
    }
  }

  const start = (t:'pass'|'dontpass') => { setBetType(t); setPhase('comeout'); setBal(b=>b-bet); setRes(null); setSi(1); setDiceSet(null); setSevenOutState('none') }

  const selectSet = (name: string) => {
    const val = DICE_SETS[name]
    if (val) { setDiceSet(name); setDice(val) }
  }

  return (
    <div className="animate-fadeIn px-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4"><span className="text-3xl">🎲</span><h1 className="text-2xl font-bold text-white">クラップス</h1></div>
        <div className="text-xl font-bold text-white">${bal.toLocaleString()}</div>
      </div>
      <PhaseBadge steps={S} current={si} />
      {phase==='bet' && <><ChipTray balance={bal} bet={bet} onBet={(v)=>setBet(v)}/>
        <TipBox text="カムアウト:7か11で勝ち、2/3/12で負け。それ以外はポイント成立。7が出るとセブンアウトで負け。Don't Passは逆の賭け方。" />
        <div className="flex gap-3 mt-2"><button onClick={()=>start('pass')} className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">Pass Line ${bet.toLocaleString()}</button><button onClick={()=>start('dontpass')} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base">Don't Pass ${bet.toLocaleString()}</button></div>
      </>}

      <div style={{background:'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)',borderRadius:20,padding:24,border:'6px solid #3d2b1f',position:'relative',overflow:'hidden'}}>
        {/* Seven-out drama overlay */}
        {sevenOutState !== 'none' && (
          <>
            <div style={{position:'absolute',inset:0,background:'#dc2626',zIndex:30,animation:'redFlash 0.5s ease-out forwards',pointerEvents:'none',borderRadius:14}} />
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:31,textAlign:'center',whiteSpace:'nowrap',animation:'sevenOutText 1.5s ease-out forwards'}}>
              <div style={{fontSize:42,fontWeight:900,color:'#fff',textShadow:'0 0 20px rgba(220,38,38,0.8),0 4px 8px rgba(0,0,0,0.5)',lineHeight:1.2}}>SEVEN OUT!</div>
            </div>
            {sevenOutState === 'change' && (
              <div style={{position:'absolute',bottom:'28%',left:'50%',transform:'translateX(-50%)',zIndex:32,animation:'shooterChange 0.4s ease-out forwards',background:'rgba(0,0,0,0.65)',padding:'8px 20px',borderRadius:10,border:'1px solid #f4a81d',whiteSpace:'nowrap'}}>
                <span style={{fontSize:16,fontWeight:700,color:'#f4a81d'}}>🔄 SHOOTER CHANGE</span>
              </div>
            )}
          </>
        )}

        {/* Stickman pushing animation */}
        {stickPhase === 'pushing' && (
          <div style={{position:'absolute',left:'calc(50% - 30px)',top:'48%',zIndex:20,animation:'stickPush 0.35s ease-in-out forwards'}}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 14 Q18 2 32 12 Q44 20 56 14" stroke="#8B7355" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M50 10 L56 14 L52 17" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="6" cy="14" r="3.5" fill="#8B7355"/>
            </svg>
          </div>
        )}

        <div style={{position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',width:120,height:70,borderRadius:'50%',border:'3px dashed rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:2}}>
          <span className="text-sm text-white/20 font-bold">{betType==='pass'?'PASS LINE':"DON'T PASS"}</span>
          {phase!=='bet' && <div style={{width:34,height:34,borderRadius:'50%',background:'#f8fafc',border:'2px solid #475569',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#1e293b'}}>{bet>=1000?(bet/1000).toFixed(0)+'K':bet}</div>}
        </div>
        <div style={{position:'absolute',top:8,left:'50%',transform:'translateX(-50%)',width:80,height:26,borderRadius:6,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}><span className="text-xs text-white/40 font-bold">STICKMAN</span></div>

        {/* Puck 3D flip */}
        {(phase === 'comeout' || phase === 'point') && (
          <div style={{position:'absolute',top:38,left:'50%',transform:'translateX(-50%)',zIndex:5,perspective:600,width:70,height:30}}>
            <div style={{width:'100%',height:'100%',position:'relative',transformStyle:'preserve-3d',transition:'transform 0.6s ease',transform:puck?'rotateY(180deg)':'rotateY(0deg)'}}>
              <div style={{position:'absolute',inset:0,borderRadius:6,background:'#64748b',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',gap:4,fontSize:13,fontWeight:700,backfaceVisibility:'hidden'}}>
                <span>OFF</span>
              </div>
              <div style={{position:'absolute',inset:0,borderRadius:6,background:'#f4a81d',color:'#1e293b',display:'flex',alignItems:'center',justifyContent:'center',gap:4,fontSize:13,fontWeight:700,backfaceVisibility:'hidden',transform:'rotateY(180deg)'}}>
                <span>ON</span> {point}
              </div>
            </div>
          </div>
        )}

        {/* Dice Sets Selector */}
        {(phase === 'comeout' || phase === 'point') && !rolling && stickPhase !== 'pushing' && (
          <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:(phase==='comeout'||phase==='point')?62:28,marginBottom:4}}>
            {Object.entries(DICE_SETS).map(([name, vals]) => (
              <button key={name} onClick={() => selectSet(name)} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',borderRadius:8,fontSize:11,fontWeight:700,background:diceSet===name?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.25)',border:diceSet===name?'2px solid #f4a81d':'2px solid transparent',color:diceSet===name?'#f4a81d':'rgba(255,255,255,0.6)',cursor:'pointer',transition:'all 0.15s'}}>
                <span>{name}</span>
                <div style={{display:'flex',gap:2}}>
                  {vals.map((v,vi) => (
                    <div key={vi} style={{width:18,height:18,borderRadius:3,background:'#fff',border:'1px solid #94a3b8',display:'grid',gridTemplateColumns:'repeat(3,1fr)',padding:2}}>
                      {[1,2,3,4,5,6].map(p => <div key={p} style={{width:4,height:4,borderRadius:'50%',background:'#1e293b',alignSelf:'center',justifySelf:'center',visibility:dV(v,p)?'visible':'hidden'}}/>)}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-6" style={{marginTop:(phase==='comeout'||phase==='point')&&stickPhase==='idle'?68:(phase==='comeout'||phase==='point')?40:28}}>
          {dice.map((val,i) => <div key={i} style={{width:70,height:70,borderRadius:10,background:'#fff',border:'3px solid #94a3b8',display:'grid',gridTemplateColumns:'repeat(3,1fr)',padding:6,animation:rolling?'dShake 0.08s linear infinite':'none'}}>
            {[1,2,3,4,5,6].map(p => <div key={p} style={{width:12,height:12,borderRadius:'50%',background:'#1e293b',alignSelf:'center',justifySelf:'center',visibility:dV(val,p)?'visible':'hidden'}}/>)}
          </div>)}
        </div>

        {lastRoll!==null && <div className="text-center mt-2" style={{fontSize:32,fontWeight:700,color:dC(lastRoll)}}>{lastRoll}</div>}
        {call && <div className="text-center text-base font-bold text-casino-gold animate-pulse">{call}</div>}
        {res && <div className="mt-3 p-3 rounded-lg" style={{background:'rgba(0,0,0,0.4)'}}>
          {res.win ? <PayoutBox label={res.label} bet={bet} odds={res.odds} payout={res.payout} net={res.net} /> :
            <div className="text-center text-red-400"><div className="font-bold text-base">LOSE</div><div>{res.label}</div><div className="text-lg font-bold mt-1"> -${bet.toLocaleString()} </div></div>}
        </div>}
      </div>

      <div className="flex gap-3 mt-4 justify-center">
        {phase!=='bet' && phase!=='res' && <button onClick={doRoll} disabled={rolling} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base disabled:opacity-30">{rolling?'振っている...':'🎲 ロール！'}</button>}
        {phase==='res' && <button onClick={()=>{setPhase('bet');setPoint(null);setRes(null);setCall(null);setSi(0);setDiceSet(null);setDice([1,1]);setSevenOutState('none')}} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-base"><RotateCcw size={20}/> もう一度</button>}
      </div>
      {phase==='point' && <TipBox text={`ポイントは${point}。${point}が出れば勝ち、7が出ればセブンアウトで負け。7の確率は約16.7%。`} />}
    </div>
  )
}

function dV(v:number,p:number){return({1:[5],2:[3,7],3:[3,5,7],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]})[v]?.includes(p)??false}
function dC(s:number){return s===7||s===11?'#22c55e':s===2||s===3||s===12?'#ef4444':'#f4a81d'}

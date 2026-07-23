import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { ChipTray, PayoutBox, PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

let injected = false

function hT(c:CardType[]):number{let t=0;for(const x of c)t+=x.rank==='A'?1:['K','Q','J'].includes(x.rank)?10:parseInt(x.rank);return t%10}

function dG(){
  const d=shuffleDeck(createDeck());const p=[d[0],d[2]],b=[d[1],d[3]];let deck=d.slice(4)
  const pt=hT(p),bt=hT(b);let p3=false,b3=false,nat=pt>=8||bt>=8
  if(!nat){
    if(pt<=5){p.push(deck[0]);deck=deck.slice(1);p3=true}
    const pv=p3?(p[2].rank==='A'?1:['K','Q','J'].includes(p[2].rank)?10:parseInt(p[2].rank)):0
    if(bt<=2||(bt===3&&pv!==8)||(bt===4&&pv>=2&&pv<=7)||(bt===5&&pv>=4&&pv<=7)||(bt===6&&(pv===6||pv===7))){b.push(deck[0]);b3=true}
  }
  return{player:p,banker:b,pTotal:hT(p),bTotal:hT(b),nat,p3,b3,result:hT(p)>hT(b)?'player'as const:hT(b)>hT(p)?'banker'as const:'tie'as const}
}

export default function BaccaratGame(){
  useEffect(()=>{
    if(!injected){
      injected=true;const s=document.createElement('style');s.textContent=`
        @keyframes bSlide{0%{transform:translateX(50px) scale(0.8);opacity:0}100%{transform:translateX(0) scale(1);opacity:1}}
        @keyframes goldFlash{0%{opacity:0.4}100%{opacity:0}}
        @keyframes naturalPop{0%{transform:scale(0.3) rotate(-5deg);opacity:0}50%{transform:scale(1.2) rotate(2deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
        @keyframes goldenGlow{0%,100%{box-shadow:0 0 8px rgba(255,215,0,0.3),0 0 16px rgba(255,215,0,0.1)}50%{box-shadow:0 0 24px rgba(255,215,0,0.7),0 0 48px rgba(255,215,0,0.3)}}
        @keyframes guidePulse{0%,100%{opacity:0.1}50%{opacity:0.35}}
      `;document.head.appendChild(s)
    }
  },[])

  const[bal,setBal]=useState(INIT_BALANCE)
  const[bet,setBet]=useState(10000)
  const[ph,setPh]=useState<'bet'|'deal'|'res'>('bet')
  const[g,setG]=useState(dG)
  const[show,setShow]=useState(false)
  const[msg,setMsg]=useState('ベットしてください')
  const[mt,setMt]=useState('info')
  const[lr,setLr]=useState<{net:number;label:string;payout:number;odds:string}|null>(null)
  const[comm,setComm]=useState(0)
  const[hist,setHist]=useState<string[]>([])
  const[si,setSi]=useState(0)
  const[flipIdx,setFlipIdx]=useState(-1)
  const[natFlash,setNatFlash]=useState(false)
  const S=['BET','DEAL','RESULT']

  const place=(on:'player'|'banker'|'tie')=>{
    if(bet>bal)return;setSi(1);setBal(b=>b-bet);setPh('deal');setShow(false);setFlipIdx(-1);setNatFlash(false)
    const game=dG();setG(game)
    const totalCards=game.player.length+game.banker.length
    setTimeout(()=>{
      setShow(true)
      setTimeout(()=>{
        setFlipIdx(0)
        for(let i=1;i<totalCards;i++)setTimeout(()=>setFlipIdx(i),i*800)
        const lastFlipStart=(totalCards-1)*800
        setTimeout(()=>{
          if(game.result==='tie'){const pay=on==='tie'?bet*9:bet;const net=on==='tie'?bet*8:0;setBal(b=>b+pay);setLr({net,label:'タイ!',payout:pay,odds:on==='tie'?'8:1':'1:1'});setMsg(on==='tie'?'タイ!':'タイ 返却');setMt(on==='tie'?'win':'info')}
          else if(on===game.result){const bk=on==='banker';const pay=bk?Math.floor(bet*1.95):bet*2;const net=pay-bet;setBal(b=>b+pay);if(bk)setComm(c=>c+Math.ceil(bet*0.05));setLr({net,label:(on==='player'?'プレイヤー':'バンカー')+'の勝ち',payout:pay,odds:bk?'0.95:1':'1:1'});setMsg('+'+net.toLocaleString());setMt('win')}
          else{setLr({net:-bet,label:(game.result==='player'?'プレイヤー':'バンカー')+'の勝ち',payout:0,odds:'-'});setMsg('-'+bet.toLocaleString());setMt('lose')}
          setHist(h=>[...h.slice(-113),game.result]);setSi(2);setPh('res')
          if(game.nat){setNatFlash(true);setTimeout(()=>setNatFlash(false),1500)}
        },lastFlipStart+1100)
      },500)
    },600)
  }

  return(
    <div className="animate-fadeIn px-2" style={{position:'relative'}}>
      {natFlash&&<div style={{position:'fixed',inset:0,background:'rgba(255,215,0,0.3)',animation:'goldFlash 1.5s ease-out forwards',pointerEvents:'none',zIndex:50}}/>}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4"><span className="text-3xl">💎</span><h1 className="text-2xl font-bold text-white">バカラ</h1></div>
        <div className="text-xl font-bold text-white">${bal.toLocaleString()}</div>
      </div>
      <PhaseBadge steps={S} current={si} />
      {comm>0&&<div className="flex justify-end mb-1"><span className="text-sm text-casino-gold font-bold">COMMISSION: ${comm.toLocaleString()}</span></div>}
      {ph==='bet'&&<><ChipTray balance={bal} bet={bet} onBet={(v)=>setBet(v)}/>
        <TipBox text="Player/Banker/Tieの3択。9に近い方が勝ち。Bankerに勝つと5%コミッション。Tieは8:1の高配当だが確率約9.5%。タブロー(固定ルール)で3枚目が自動配布。" />
        <div className="flex gap-2 mt-2"><button onClick={()=>place('player')} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base">プレイヤー ${bet.toLocaleString()}</button><button onClick={()=>place('banker')} className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-base">バンカー ${bet.toLocaleString()}</button><button onClick={()=>place('tie')} className="flex-1 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-sm">タイ(8:1) ${bet.toLocaleString()}</button></div>
      </>}

      <div style={{background:'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)',borderRadius:20,padding:20,border:'6px solid #3d2b1f',position:'relative'}}>
        <div style={{position:'absolute',top:10,right:10,width:36,height:50,borderRadius:4,background:'repeating-linear-gradient(45deg,#5a3a20 0,#5a3a20 4px,#4a3020 4px,#4a3020 8px)',border:'1px solid #3d2b1f',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:8,color:'#c4a882',fontWeight:700}}>S</span></div>

        {/* Banker */}
        <div style={{position:'relative',marginBottom:16}}>
          <div className="flex items-center gap-3 mb-2"><span className="text-base font-bold text-cyan-400">BANKER</span>{ph==='res'&&<span className="text-2xl font-bold" style={{color:g.result==='banker'?'#22c55e':'#94a3b8'}}>{g.bTotal}</span>}{g.b3&&ph==='res'&&<span className="text-xs text-cyan-300">(3枚)</span>}</div>
          <div style={{position:'absolute',top:8,left:0,display:'flex',gap:8,pointerEvents:'none'}}>
            {[0,1,2].map(i=><div key={i} style={{width:52,height:72,borderRadius:5,border:'1px dashed rgba(255,255,255,0.15)',opacity:show?0:undefined,animation:show?'none':'guidePulse 2s ease-in-out infinite',animationDelay:i*0.3+'s'}}/>)}
          </div>
          <div className="flex gap-1.5 min-h-[72px]" style={{position:'relative',zIndex:1}}>{g.banker.map((c,i)=><div key={i} style={{animation:show?'bSlide 0.3s ease-out '+(i*0.15)+'s both':'none'}}><BCard card={c} faceDown={flipIdx<i} nat={g.nat&&ph==='res'}/></div>)}</div>
        </div>

        {g.nat&&ph==='res'&&<div style={{display:'flex',justifyContent:'center',margin:'8px 0',position:'relative',zIndex:2}}><span style={{fontSize:24,fontWeight:'bold',color:'#ffd700',textShadow:'0 0 20px rgba(255,215,0,0.8),0 0 40px rgba(255,215,0,0.4)',animation:'naturalPop 0.6s ease-out'}}>ナチュラル!</span></div>}

        {ph==='res'&&<div className="flex justify-center my-2"><div style={{background:g.result==='banker'?'#0d948822':g.result==='player'?'#dc262622':'#6b728022',border:'1px solid '+(g.result==='banker'?'#0d9488':g.result==='player'?'#dc2626':'#6b7280'),borderRadius:20,padding:'4px 20px'}}><span className={'text-sm font-bold '+(g.result==='banker'?'text-cyan-400':g.result==='player'?'text-red-400':'text-gray-400')}>{g.result==='player'?'プレイヤー':g.result==='banker'?'バンカー':'タイ'}の勝ち</span></div></div>}

        {/* Player */}
        <div style={{position:'relative'}}>
          <div className="flex items-center gap-3 mb-2"><span className="text-base font-bold text-red-400">PLAYER</span>{ph==='res'&&<span className="text-2xl font-bold" style={{color:g.result==='player'?'#22c55e':'#94a3b8'}}>{g.pTotal}</span>}{g.p3&&ph==='res'&&<span className="text-xs text-red-300">(3枚)</span>}</div>
          <div style={{position:'absolute',top:8,left:0,display:'flex',gap:8,pointerEvents:'none'}}>
            {[0,1,2].map(i=><div key={i} style={{width:52,height:72,borderRadius:5,border:'1px dashed rgba(255,255,255,0.15)',opacity:show?0:undefined,animation:show?'none':'guidePulse 2s ease-in-out infinite',animationDelay:i*0.3+'s'}}/>)}
          </div>
          <div className="flex gap-1.5 min-h-[72px]" style={{position:'relative',zIndex:1}}>{g.player.map((c,i)=><div key={i} style={{animation:show?'bSlide 0.3s ease-out '+((i+2)*0.15)+'s both':'none'}}><BCard card={c} faceDown={flipIdx<i+g.banker.length} nat={g.nat&&ph==='res'}/></div>)}</div>
        </div>

        {lr&&ph==='res'&&<div className="mt-3 p-3 rounded-lg" style={{background:'rgba(0,0,0,0.4)'}}>
          {lr.net>=0?<PayoutBox label={lr.label} bet={bet} odds={lr.odds} payout={lr.payout} net={lr.net}/>:
            <div className="text-center text-red-400"><div className="font-bold text-base">LOSE</div><div>{lr.label}</div><div className="text-lg font-bold mt-1"> -${bet.toLocaleString()} </div></div>}
        </div>}
      </div>

      <BigRoad history={hist} />

      {msg&&<div className={'mt-2 text-base font-bold text-center '+(mt==='win'?'text-emerald-400':mt==='lose'?'text-red-400':'text-casino-gold')}>{msg}</div>}
      {ph==='res'&&<div className="flex mt-3 justify-center"><button onClick={()=>{setPh('bet');setLr(null);setMsg('ベットしてください');setSi(0)}} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-base"><RotateCcw size={20}/> もう一度</button></div>}
    </div>
  )
}

function BCard({card,faceDown,nat}:{card:CardType;faceDown:boolean;nat:boolean}){
  const c=card.suit==='♥'||card.suit==='♦'?'#dc2626':'#1e293b'
  return(
    <div style={{
      width:52,height:72,borderRadius:5,position:'relative',
      transformStyle:'preserve-3d',perspective:800,
      transition:'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
      transform:faceDown?'rotateY(0deg)':'rotateY(180deg)',
      boxShadow:nat?'0 0 12px rgba(255,215,0,0.5)':'0 3px 8px rgba(0,0,0,0.25)',
      animation:nat?'goldenGlow 1s ease-in-out infinite':'none'
    }}>
      <div style={{
        position:'absolute',inset:0,borderRadius:5,
        backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',
        background:'linear-gradient(135deg,#1a3a5c 0%,#0d2137 50%,#1a3a5c 100%)',
        border:'1px solid #2a5a8c',
        display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'
      }}>
        <div style={{width:36,height:56,borderRadius:3,border:'2px solid rgba(255,215,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{fontSize:16,color:'rgba(255,215,0,0.4)'}}>✦</span>
        </div>
        <div style={{position:'absolute',inset:4,border:'1px solid rgba(255,215,0,0.1)',borderRadius:3}}/>
      </div>
      <div style={{
        position:'absolute',inset:0,borderRadius:5,
        backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',
        transform:'rotateY(180deg)',
        background:'#f8fafc',border:'1px solid #94a3b8'
      }}>
        <span style={{position:'absolute',top:3,left:4,fontSize:13,fontWeight:700,lineHeight:1,color:c}}>{card.rank}</span>
        <span style={{position:'absolute',top:17,left:4,fontSize:9,lineHeight:1,color:c}}>{card.suit}</span>
        <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:26,lineHeight:1,color:c}}>{card.suit}</span>
      </div>
    </div>
  )
}

function BigRoad({history}:{history:string[]}){
  const cols=6,rows=19
  const grid:(string|null)[][]=Array.from({length:cols},()=>Array(rows).fill(null))
  history.forEach((r,i)=>{
    if(i<cols*rows){const col=Math.floor(i/rows);const row=i%rows;grid[col][row]=r}
  })
  return(
    <div style={{marginTop:12,display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{fontSize:11,fontWeight:'bold',color:'#94a3b8',marginBottom:4,letterSpacing:1}}>BIG ROAD</div>
      <div style={{display:'flex',gap:1.5,background:'#1e293b',padding:6,borderRadius:6,border:'1px solid #334155'}}>
        {grid.map((col,ci)=>(
          <div key={ci} style={{display:'flex',flexDirection:'column',gap:1.5}}>
            {col.map((cell,ri)=>(
              <div key={ri} style={{
                width:14,height:14,borderRadius:2,
                background:!cell?'#0f172a':cell==='player'?'#dc2626':cell==='banker'?'#0d9488':'#334155',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:10,color:cell==='tie'?'#22c55e':'#fff',fontWeight:700
              }}>
                {cell==='player'&&'●'}
                {cell==='banker'&&'●'}
                {cell==='tie'&&'─'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

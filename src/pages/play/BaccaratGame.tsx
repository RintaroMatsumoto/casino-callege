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
  useEffect(()=>{if(!injected){injected=true;const s=document.createElement('style');s.textContent='@keyframes bSlide{0%{transform:translateX(50px) scale(0.8);opacity:0}100%{transform:translateX(0) scale(1);opacity:1}}';document.head.appendChild(s)}},[])

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
  const S=['BET','DEAL','RESULT']

  const place=(on:'player'|'banker'|'tie')=>{
    if(bet>bal)return;setSi(1);setBal(b=>b-bet);setPh('deal');setShow(false)
    const game=dG();setG(game)
    setTimeout(()=>{setShow(true)
      if(game.result==='tie'){const pay=on==='tie'?bet*9:bet;const net=on==='tie'?bet*8:0;setBal(b=>b+pay);setLr({net,label:'タイ!',payout:pay,odds:on==='tie'?'8:1':'1:1'});setMsg(on==='tie'?'タイ!':'タイ 返却');setMt(on==='tie'?'win':'info')}
      else if(on===game.result){const bk=on==='banker';const pay=bk?Math.floor(bet*1.95):bet*2;const net=pay-bet;setBal(b=>b+pay);if(bk)setComm(c=>c+Math.ceil(bet*0.05));setLr({net,label:(on==='player'?'プレイヤー':'バンカー')+'の勝ち',payout:pay,odds:bk?'0.95:1':'1:1'});setMsg('+'+net.toLocaleString());setMt('win')}
      else{setLr({net:-bet,label:(game.result==='player'?'プレイヤー':'バンカー')+'の勝ち',payout:0,odds:'-'});setMsg('-'+bet.toLocaleString());setMt('lose')}
      setHist(h=>[...h.slice(-19),game.result]);setSi(2);setPh('res')
    },600)
  }

  return(
    <div className="animate-fadeIn px-2">
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
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2"><span className="text-base font-bold text-cyan-400">BANKER</span>{ph==='res'&&<span className="text-2xl font-bold" style={{color:g.result==='banker'?'#22c55e':'#94a3b8'}}>{g.bTotal}</span>}{g.b3&&ph==='res'&&<span className="text-xs text-cyan-300">(3枚)</span>}</div>
          <div className="flex gap-1.5 min-h-[70px]">{g.banker.map((c,i)=><div key={i} style={{animation:show?'bSlide 0.3s ease-out '+(i*0.15)+'s both':'none'}}><BCard card={c}/></div>)}</div>
        </div>
        {g.nat&&ph==='res'&&<div className="flex justify-center my-2"><span className="text-sm font-bold text-casino-gold animate-pulse">ナチュラル! (8 or 9)</span></div>}
        {ph==='res'&&<div className="flex justify-center my-2"><div style={{background:g.result==='banker'?'#0d948822':g.result==='player'?'#dc262622':'#6b728022',border:'1px solid '+(g.result==='banker'?'#0d9488':g.result==='player'?'#dc2626':'#6b7280'),borderRadius:20,padding:'4px 20px'}}><span className={'text-sm font-bold '+(g.result==='banker'?'text-cyan-400':g.result==='player'?'text-red-400':'text-gray-400')}>{g.result==='player'?'プレイヤー':g.result==='banker'?'バンカー':'タイ'}の勝ち</span></div></div>}
        <div>
          <div className="flex items-center gap-3 mb-2"><span className="text-base font-bold text-red-400">PLAYER</span>{ph==='res'&&<span className="text-2xl font-bold" style={{color:g.result==='player'?'#22c55e':'#94a3b8'}}>{g.pTotal}</span>}{g.p3&&ph==='res'&&<span className="text-xs text-red-300">(3枚)</span>}</div>
          <div className="flex gap-1.5 min-h-[70px]">{g.player.map((c,i)=><div key={i} style={{animation:show?'bSlide 0.3s ease-out '+((i+2)*0.15)+'s both':'none'}}><BCard card={c}/></div>)}</div>
        </div>
        {lr&&ph==='res'&&<div className="mt-3 p-3 rounded-lg" style={{background:'rgba(0,0,0,0.4)'}}>
          {lr.net>=0?<PayoutBox label={lr.label} bet={bet} odds={lr.odds} payout={lr.payout} net={lr.net}/>:
            <div className="text-center text-red-400"><div className="font-bold text-base">LOSE</div><div>{lr.label}</div><div className="text-lg font-bold mt-1"> -${bet.toLocaleString()} </div></div>}
        </div>}
      </div>

      {hist.length>0&&<div className="flex gap-1 mt-2 justify-center flex-wrap">{hist.map((r,i)=><div key={i} style={{width:22,height:22,borderRadius:4,background:r==='player'?'#dc2626':r==='banker'?'#0d9488':'#6b7280',fontSize:10,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{r==='player'?'P':r==='banker'?'B':'T'}</div>)}</div>}
      {msg&&<div className={'mt-2 text-base font-bold text-center '+(mt==='win'?'text-emerald-400':mt==='lose'?'text-red-400':'text-casino-gold')}>{msg}</div>}
      {ph==='res'&&<div className="flex mt-3 justify-center"><button onClick={()=>{setPh('bet');setLr(null);setMsg('ベットしてください');setSi(0)}} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-base"><RotateCcw size={20}/> もう一度</button></div>}
    </div>
  )
}

function BCard({card}:{card:CardType}){
  const c=card.suit==='♥'||card.suit==='♦'?'#dc2626':'#1e293b'
  return <div style={{width:52,height:72,borderRadius:5,background:'#f8fafc',border:'1px solid #94a3b8',position:'relative',animation:'bSlide 0.3s ease-out',boxShadow:'0 3px 8px rgba(0,0,0,0.25)'}}>
    <span style={{position:'absolute',top:3,left:4,fontSize:13,fontWeight:700,lineHeight:1,color:c}}>{card.rank}</span>
    <span style={{position:'absolute',top:17,left:4,fontSize:9,lineHeight:1,color:c}}>{card.suit}</span>
    <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:26,lineHeight:1,color:c}}>{card.suit}</span>
  </div>
}

import { useState, useEffect } from 'react'
import type { Card as CardType } from '../../games/types'
import { createDeck, shuffleDeck } from '../../games/types'
import { PhaseBadge, TipBox, INIT_BALANCE } from '../../games/ChipTray'
import { RotateCcw } from 'lucide-react'

const HW: Record<string,string> = {
  '9':'ロイヤルフラッシュ','8':'ストレートフラッシュ','7':'フォーカード','6':'フルハウス','5':'フラッシュ',
  '4':'ストレート','3':'スリーカード','2':'ツーペア','1':'ワンペア','0':'ハイカード',
}
const HE: Record<string,string> = {
  '9':'同スートA-K-Q-J-10、最強！','8':'同スート5連続','7':'同じ数字4枚','6':'3枚+2枚','5':'同スート5枚',
  '4':'5連続数字','3':'同じ数字3枚','2':'ペア×2','1':'ペア×1','0':'一番高いカード勝負',
}

function rv(r:string){return r==='A'?14:r==='K'?13:r==='Q'?12:r==='J'?11:r==='10'?10:parseInt(r)}

function bestHand(cards:CardType[]){
  let b={rank:-1,name:''}
  for(let a=0;a<cards.length;a++) for(let b2=a+1;b2<cards.length;b2++) for(let c=b2+1;c<cards.length;c++) for(let d=c+1;d<cards.length;d++) for(let e=d+1;e<cards.length;e++){
    const h=[cards[a],cards[b2],cards[c],cards[d],cards[e]]
    const v=h.map(x=>rv(x.rank)).sort((x,y)=>y-x),su=h.map(x=>x.suit)
    const flush=su.every(x=>x===su[0])
    const straight=(()=>{if(v[0]===14&&v[1]===5&&v[2]===4&&v[3]===3&&v[4]===2)return 5;for(let i=0;i<4;i++)if(v[i]-v[i+1]!==1)return 0;return v[0]})()
    const m=new Map<number,number>();v.forEach(x=>m.set(x,(m.get(x)||0)+1))
    const g=[...m.entries()].sort((x,y)=>y[1]-x[1]||y[0]-x[0])
    let r=0
    if(straight===14&&flush)r=9;else if(flush&&straight)r=8;else if(g[0][1]===4)r=7;else if(g[0][1]===3&&g[1]?.[1]===2)r=6
    else if(flush)r=5;else if(straight)r=4;else if(g[0][1]===3)r=3;else if(g[0][1]===2&&g[1]?.[1]===2)r=2;else if(g[0][1]===2)r=1
    if(r>b.rank)b={rank:r,name:HW[String(r)]}
  }
  return b
}

const AI=['佐藤','鈴木','田中']
let injected=false

function ng(){const d=shuffleDeck(createDeck());return{deck:d,player:[d.pop()!,d.pop()!],ai:AI.map(()=>[d.pop()!,d.pop()!]),community:[]as CardType[],phase:'preflop'as 'preflop'|'flop'|'turn'|'river'|'showdown',pot:0}}

export default function PokerGame(){
  useEffect(()=>{if(!injected){injected=true;const s=document.createElement('style');s.textContent='@keyframes pCard{0%{transform:translateX(60px) scale(0.7);opacity:0}100%{transform:translateX(0) scale(1);opacity:1}}';document.head.appendChild(s)}},[])

  const[g,setG]=useState(ng)
  const[msg,setMsg]=useState('プリフロップ')
  const[res,setRes]=useState<{my:string;ai:string[];winner:string;wHand:string;wR:number}|null>(null)
  const[show,setShow]=useState(false)
  const[bal,setBal]=useState(INIT_BALANCE)
  const[si,setSi]=useState(0)
  const S=['P-FLOP','FLOP','TURN','RIVER','RESULT']

  const next=()=>{
    const d=[...g.deck],c=[...g.community]
    if(g.phase==='preflop'){d.pop();c.push(d.pop()!,d.pop()!,d.pop()!);setG({...g,deck:d,community:c,phase:'flop',pot:g.pot+20});setSi(1);setMsg('フロップ!');setShow(false);setTimeout(()=>setShow(true),50)}
    else if(g.phase==='flop'){d.pop();c.push(d.pop()!);setG({...g,deck:d,community:c,phase:'turn',pot:g.pot+20});setSi(2);setMsg('ターン!');setShow(false);setTimeout(()=>setShow(true),50)}
    else if(g.phase==='turn'){d.pop();c.push(d.pop()!);setG({...g,deck:d,community:c,phase:'river',pot:g.pot+20});setSi(3);setMsg('リバー!');setShow(false);setTimeout(()=>setShow(true),50)}
    else sd()
  }

  const fold=()=>{setRes({my:'',ai:[],winner:'あなた',wHand:'フォールド',wR:-1});setMsg('フォールド');setSi(4)}

  const sd=()=>{
    const my=bestHand([...g.player,...g.community]),aiE=g.ai.map(ai=>bestHand([...ai,...g.community]))
    let b=-1,idx=-1;[my,...aiE].forEach((h,i)=>{if(h.rank>b){b=h.rank;idx=i}})
    const w=idx===0?'あなた':AI[idx-1]
    setRes({my:my.name,ai:aiE.map(h=>h.name),winner:w,wHand:[my,...aiE][idx].name,wR:[my,...aiE][idx].rank})
    if(idx===0)setBal(b=>b+g.pot)
    setMsg(idx===0?'勝ち!'+my.name:AI[idx-1]+'の勝ち!');setG({...g,phase:'showdown'});setSi(4)
  }

  return(
    <div className="animate-fadeIn px-2">
      <div className="flex items-center gap-4 mb-2"><span className="text-3xl">♠️</span><h1 className="text-2xl font-bold text-white">テキサスホールデム</h1></div>
      <div className="flex items-center justify-between mb-1"><div className="text-xl font-bold text-white">${bal.toLocaleString()}</div><div className="text-base text-casino-gold font-bold">💰 POT: ${g.pot.toLocaleString()}</div></div>
      <PhaseBadge steps={S} current={si} />
      {g.phase==='preflop'&&!res&&<TipBox text="手持ち2枚+場の5枚から最強の役を作る。強さ順:ロイヤルフラッシュ>ストレートフラッシュ>フォーカード>フルハウス>フラッシュ>ストレート>スリーカード>ツーペア>ワンペア>ハイカード。" />}

      <div style={{background:'radial-gradient(ellipse at 50% 30%, #1a8a3a 0%, #0f6a28 60%, #0a4a1a 100%)',borderRadius:20,padding:16,border:'6px solid #3d2b1f',minHeight:380,position:'relative'}}>
        <div style={{position:'absolute',top:'45%',left:'50%',transform:'translate(-50%,-50%)',minWidth:70,height:46,borderRadius:23,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',padding:'0 14px'}}>
          <span className="text-sm font-bold text-casino-gold">$${g.pot}</span></div>
        <div className="flex justify-center gap-2" style={{marginTop:2}}>
          {g.ai.map((hand,i)=><div key={i} className="flex flex-col items-center gap-1">
            <div className="flex gap-1"><PCard card={hand[0]} hide={g.phase!=='showdown'} sz={40}/><PCard card={hand[1]} hide={g.phase!=='showdown'} sz={40}/></div>
            <span className="text-xs text-white/60">{AI[i]}</span>
            {g.phase==='showdown'&&res&&<span className="text-xs text-casino-muted">{res.ai[i]}</span>}
          </div>)}
        </div>
        <div className="flex justify-center items-center gap-1.5" style={{marginTop:20,minHeight:56}}>
          {g.phase!=='preflop'&&<div style={{width:28,height:38,borderRadius:3,background:'repeating-linear-gradient(45deg,#1e293b 0,#1e293b 3px,#334155 3px,#334155 6px)',border:'1px solid #475569',display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,color:'#64748b'}}>B</div>}
          {g.phase==='preflop'?<span className="text-base text-white/40">プリフロップ</span>:g.community.map((c,i)=><div key={i} style={{animation:show?'pCard 0.3s ease-out '+(i*0.1)+'s both':'none'}}><PCard card={c} hide={false} sz={44}/></div>)}
        </div>
        <div className="flex justify-center gap-1.5" style={{marginTop:20}}>{g.player.map((c,i)=><div key={i} style={{animation:'pCard 0.3s ease-out both'}}><PCard card={c} hide={false} sz={52}/></div>)}</div>
        {res&&<div className="mt-2 p-3 rounded-lg" style={{background:'rgba(0,0,0,0.4)'}}>
          <div className="text-sm text-casino-muted text-center"><span className={res.winner==='あなた'?'text-emerald-400 font-bold':'text-red-400 font-bold'}>{res.winner}</span>の勝ち<span>（{res.wHand}）</span>
            {res.wR>=0&&<div className="text-xs mt-1">{HE[String(res.wR)]}</div>}
            {res.winner==='あなた'&&<div className="text-emerald-400 font-bold text-sm mt-1">+${g.pot.toLocaleString()}</div>}
          </div>
        </div>}
      </div>
      <div className={'mt-2 text-base font-bold text-center '+(res?(res.winner==='あなた'?'text-emerald-400':'text-red-400'):'text-casino-gold')}>{msg}</div>
      <div className="flex gap-3 mt-3 justify-center">
        {!res?<><button onClick={next} className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">{g.phase==='river'?'ショーダウン!':'次へ'}</button><button onClick={fold} className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base">フォールド</button></>
          :<button onClick={()=>{setG(ng());setRes(null);setMsg('プリフロップ');setShow(false);setSi(0)}} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-casino-gold/10 border border-casino-gold/30 text-casino-gold font-bold text-base"><RotateCcw size={20}/> もう一度</button>}
      </div>
      {g.phase==='showdown'&&res&&res.wR>=0&&<TipBox text={HE[String(res.wR)]}/>}
    </div>
  )
}

function PCard({card,hide,sz=44}:{card:CardType;hide:boolean;sz?:number}){
  const c=card.suit==='♥'||card.suit==='♦'?'#dc2626':'#1e293b'
  if(hide)return <div style={{width:sz,height:sz*1.4,borderRadius:5,background:'repeating-linear-gradient(45deg,#1e293b 0,#1e293b 4px,#334155 4px,#334155 8px)',border:'1px solid #475569',boxShadow:'0 3px 8px rgba(0,0,0,0.3)'}}/>
  return <div style={{width:sz,height:sz*1.4,borderRadius:5,background:'#f8fafc',border:'1px solid #94a3b8',position:'relative',animation:'pCard 0.3s ease-out',boxShadow:'0 3px 8px rgba(0,0,0,0.25)'}}>
    <span style={{position:'absolute',top:3,left:4,fontSize:sz*0.28,fontWeight:700,lineHeight:1,color:c}}>{card.rank}</span>
    <span style={{position:'absolute',top:3+sz*0.28+2,left:4,fontSize:sz*0.2,lineHeight:1,color:c}}>{card.suit}</span>
    <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:sz*0.5,lineHeight:1,color:c}}>{card.suit}</span>
  </div>
}

const SYS='sangue-cimento';
const DICE_SYSTEM='sangue-cimento-ouro';
const BASE=`systems/${SYS}`;
let registered=false;

function extractResults(msg){
  const flagged=msg?.flags?.[SYS]?.results;
  if(flagged) return flagged;
  const rolls=msg?.rolls ?? (msg?.roll ? [msg.roll] : []);
  const values=[];
  for(const roll of rolls){
    for(const die of (roll?.dice||[])){
      for(const r of (die?.results||[])) if(r.active!==false) values.push(r.result);
    }
  }
  if(!values.length) return null;
  const hits=values.filter(v=>v>=5).length;
  const sixes=values.filter(v=>v===6).length;
  const ones=values.filter(v=>v===1).length;
  return {values,hits,sixes,ones,difficulty:2,success:hits>=2};
}

async function playOneSound(){
  if(!game.settings.get(SYS,'soundOnOne')) return;
  const src=`${BASE}/assets/audio/witch-on-one.mp3`;
  const volume=Number(game.settings.get(SYS,'soundVolume') ?? 0.42);
  try {
    await AudioHelper.play({src,volume,autoplay:true,loop:false,singleton:false});
  } catch(err){
    console.warn('S&C | Áudio principal falhou, tentando fallback',err);
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      await audio.play();
    } catch(err2){
      console.warn('S&C | Fallback do áudio também falhou',err2);
    }
  }
}

export function installDiceSoNice(){
 Hooks.once('diceSoNiceReady',async dice3d=>{
   try {
    const {DiceSystem}=await import('/modules/dice-so-nice/api.js');
    const theme = new DiceSystem(DICE_SYSTEM, 'Sangue & Cimento · Ouro Ancestral', 'default', 'Sangue & Cimento');
    theme.setRoleDefaults('basic');
    dice3d.addSystem(theme);
    dice3d.addDicePreset({type:'d6', system:DICE_SYSTEM,
      labels:[1,2,3,4,5,6].map(n=>`${BASE}/assets/dice/face-${n}.webp`),
      emissiveMaps:[,,,,,`${BASE}/assets/dice/face-6-emissive.webp`],
      emissive:0xffd476, emissiveIntensity:0.72,
      labelScale:1.0,scaleModifier:1.06
    });
    registered=true;
    await dice3d.preloadPresets(DICE_SYSTEM);
    console.info('Sangue & Cimento | Dados 3D registrados e pré-carregados no Dice So Nice.');
   }catch(err){console.error('Sangue & Cimento | Falha integração Dice So Nice',err);ui.notifications?.error('Sangue & Cimento: falha ao registrar dados no Dice So Nice. Consulte F12.');}
 });
 Hooks.on('diceSoNiceRollComplete', async (messageId)=>{
    if(!messageId) return;
    const msg=game.messages.get(messageId);
    const record=extractResults(msg);
    if(!record || game.system.id!==SYS) return;
    if(record.ones>0) await playOneSound();
    if(record.sixes>0 && game.settings.get(SYS,'glowOnSix')) glow(Math.min(3,record.sixes));
 });
 Hooks.on('createChatMessage', async (msg)=>{
    if(game.system.id!==SYS) return;
    const record=extractResults(msg);
    if(!record) return;
    if(record.ones>0) await playOneSound();
 });
}
export function glow(count=1){
  if(typeof document==='undefined')return;
  const el=document.createElement('div');el.className='sc-golden-glow';
  el.style.setProperty('--sc-glow-intensity',String(Math.min(1,count*.25+.5)));
  el.setAttribute('aria-hidden','true');document.body.append(el);
  el.addEventListener('animationend',()=>el.remove(),{once:true});
}
export async function rollD6(actor,{attribute='agi',skill=null,difficulty=2,bonus=0,resource=null,label=null,competencia=0,preparacao=0}={}){
 if(!game.modules.get('dice-so-nice')?.active || !game.dice3d || !registered){ui.notifications.error('Sangue & Cimento exige Dice So Nice ativo e pronto.');return null;}
 let base=0, title=label??'Teste';
 if(actor.type==='familia'){
   const recurso=resource??'influencia';
   base=Number(actor.system.recursos[recurso]??0)+Math.min(2,Math.max(0,Number(competencia||0)))+Math.min(1,Math.max(0,Number(preparacao||0)))+Number(bonus||0);
   base=Math.min(9,Math.max(0,base));
   title=label??`Ação de Família · ${recurso}`;
 }else if(actor.type==='antigo'){
   ui.notifications.warn('Os Antigos não possuem reserva ordinária de combate.');return null;
 }else{
   const a=Number(actor.system.attributes?.[attribute]?.value??0);
   const s=skill?Number(actor.system.skills?.[skill]?.value??0):0;
   base=Math.min(10,Math.max(0,a+s+Number(bonus||0)));
   title=label??`${attribute.toUpperCase()}${skill?' + '+skill:''}`;
 }
 if(base===0){ui.notifications.warn('Reserva de 0d6. Obtenha ajuda ou outra abordagem.');return null;}
 const roll=await (new Roll(`${base}d6`)).evaluate();
 for(const die of roll.dice){die.options.appearance={system:DICE_SYSTEM};}
 const values=roll.dice.flatMap(d=>d.results.filter(r=>r.active!==false).map(r=>r.result));
 const hits=values.filter(v=>v>=5).length;
 const sixes=values.filter(v=>v===6).length;
 const ones=values.filter(v=>v===1).length;
 const succeeded=hits>=Number(difficulty);
 const results={values,hits,sixes,ones,difficulty,success:succeeded,actorId:actor.id};
 const badge=succeeded?`ÊXITO (${hits} sucessos)`:`FALHA (${hits} sucessos)`;
 const flavor=`<div class="sc-roll-result"><strong>${foundry.utils.escapeHTML(actor.name)} · ${foundry.utils.escapeHTML(title)}</strong><span>${badge} / D${difficulty}</span><small>${succeeded?sixes:0} Ímpeto(s) utilizável(is) · ${ones} face(s) 1</small></div>`;
 await roll.toMessage({speaker:ChatMessage.getSpeaker({actor}),flavor,flags:{[SYS]:{results}}});
 return results;
}

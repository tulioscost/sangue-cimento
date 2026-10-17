import {ACTOR_MODELS,ITEM_MODELS,ATTRIBUTES,SKILLS} from './models.mjs';
import {CharacterSheet,FamilySheet,AncientSheet,SystemItemSheet} from './sheets.mjs';
import {installDiceSoNice,rollD6} from './dice.mjs';

Hooks.once('init',()=>{
  for(const [type,model] of Object.entries(ACTOR_MODELS))CONFIG.Actor.dataModels[type]=model;
  for(const [type,model] of Object.entries(ITEM_MODELS))CONFIG.Item.dataModels[type]=model;
  const sheets=foundry.applications.apps.DocumentSheetConfig;
  sheets.registerSheet(foundry.documents.Actor,'sangue-cimento',CharacterSheet,{types:['personagem','npc'],makeDefault:true,label:'Dossiê / Grimório'});
  sheets.registerSheet(foundry.documents.Actor,'sangue-cimento',FamilySheet,{types:['familia'],makeDefault:true,label:'Ficha da Família'});
  sheets.registerSheet(foundry.documents.Actor,'sangue-cimento',AncientSheet,{types:['antigo'],makeDefault:true,label:'Registro do Antigo'});
  sheets.registerSheet(foundry.documents.Item,'sangue-cimento',SystemItemSheet,{makeDefault:true,label:'Artefato / Dom / Ritual'});
  game.settings.register('sangue-cimento','glowOnSix',{name:'Brilho dourado em resultado 6',hint:'Mostra lampejo após a aterrissagem dos dados 3D.',scope:'client',config:true,type:Boolean,default:true});
  game.settings.register('sangue-cimento','soundOnOne',{name:'Áudio da bruxa em resultado 1',hint:'Toca o MP3 enviado quando uma rolagem do sistema exibir pelo menos um 1.',scope:'client',config:true,type:Boolean,default:true});
  game.settings.register('sangue-cimento','soundVolume',{name:'Volume do áudio da face 1',scope:'client',config:true,type:Number,default:0.42,range:{min:0,max:1,step:0.05}});
  game.sangueCimento={roll:rollD6,attributes:ATTRIBUTES,skills:SKILLS};
  installDiceSoNice();
});
Hooks.once('ready',()=>{
  const dep=game.modules.get('dice-so-nice');
  if(!dep?.active){ui.notifications.error('Sangue & Cimento: Dice So Nice é OBRIGATÓRIO. Instale/ative o módulo e recarregue.',{permanent:true});}
});

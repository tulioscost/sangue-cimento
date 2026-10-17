import {ATTRIBUTES,SKILLS,SKILL_GROUPS,RESOURCES} from './models.mjs';
import {rollD6} from './dice.mjs';
const H=foundry.applications.api.HandlebarsApplicationMixin;
const A=foundry.applications.sheets.ActorSheetV2;
const I=foundry.applications.sheets.ItemSheetV2;
const ROOT='systems/sangue-cimento';

function fieldsToEntries(source, names){return Object.entries(names).map(([key,label])=>({key,label,value:source?.[key]?.value??source?.[key]??0}));}
async function editPortrait(doc){
 const Picker=foundry.applications.apps.FilePicker;
 new Picker({type:'image',current:doc.img,callback:async path=>doc.update({img:path})}).render({force:true});
}
async function applyFields(doc,element){
 element.addEventListener('change', async ev=>{
   const t=ev.target;
   if(!(t instanceof HTMLElement))return;
   const name=t.getAttribute('name');
   if(!name || !name.startsWith('system.') && name!=='name')return;
   if(!doc.isOwner)return;
   let value=t.value;
   if(t instanceof HTMLInputElement && t.type==='number')value=Number(value||0);
   try{await doc.update({[name]:value});}catch(err){console.error(err);ui.notifications.error('Não foi possível salvar o campo.');}
 });
 element.querySelectorAll('[data-tab-target]').forEach(btn=>btn.addEventListener('click',ev=>{
   ev.preventDefault();
   const target=btn.dataset.tabTarget;
   element.querySelectorAll('[data-tab-target]').forEach(e=>e.classList.toggle('is-active',e.dataset.tabTarget===target));
   element.querySelectorAll('[data-sc-pane]').forEach(e=>e.classList.toggle('is-active',e.dataset.scPane===target));
 }));
}
function controls(app){const el=app.element;return {
 difficulty:Math.min(5,Math.max(1,Number(el.querySelector('[data-sc-difficulty]')?.value??2))),
 bonus:Math.min(10,Math.max(-10,Number(el.querySelector('[data-sc-bonus]')?.value??0))),
 competence:Math.max(0,Number(el.querySelector('[data-sc-competence]')?.value??0)),
 preparation:Math.max(0,Number(el.querySelector('[data-sc-preparation]')?.value??0))
};}

export class CharacterSheet extends H(A){
 static DEFAULT_OPTIONS={classes:['sangue-cimento','sc-character-sheet'],position:{width:940,height:790},window:{resizable:true},
   actions:{
    rollSkill:async function(_ev,target){const k=target.dataset.skill;const a=SKILLS[k]?.[1]||'per';return rollD6(this.actor,{attribute:a,skill:k,...controls(this),label:`${SKILLS[k]?.[0]||k}`});},
    rollAttribute:async function(_ev,target){return rollD6(this.actor,{attribute:target.dataset.attribute,...controls(this),label:ATTRIBUTES[target.dataset.attribute]});},
    addItem:async function(_ev,target){const type=target.dataset.itemType;const names={dom:'Novo Dom',ritual:'Projeto Ritual',arma:'Nova Arma',armadura:'Nova Armadura',equipamento:'Equipamento',favor:'Favor',contato:'Contato'};
      await this.actor.createEmbeddedDocuments('Item',[{name:names[type]||'Novo Item',type}]);},
    editItem:async function(_ev,target){this.actor.items.get(target.dataset.itemId)?.sheet.render({force:true});},
    deleteItem:async function(_ev,target){if(await foundry.applications.api.DialogV2.confirm({window:{title:'Excluir registro'},content:'Excluir este item?'}))await this.actor.deleteEmbeddedDocuments('Item',[target.dataset.itemId]);},
    editPortrait:async function(){await editPortrait(this.actor);},
    changeRitual:async function(_ev,target){const item=this.actor.items.get(target.dataset.itemId);if(item?.type!=='ritual')return;
      const pool=target.dataset.pool==='perigo'?'perigo':'progresso';const cur=item.system[pool];const value=Math.max(0,Math.min(cur.max,cur.value+Number(target.dataset.delta||1)));await item.update({[`system.${pool}.value`]:value});},
    adjustTrack:async function(_ev,target){const k=target.dataset.track;const obj=this.actor.system.resources[k];if(!obj)return;await this.actor.update({[`system.resources.${k}.value`]:Math.max(0,Math.min(obj.max,obj.value+Number(target.dataset.delta||1)))});}
   }};
 static PARTS={body:{template:`${ROOT}/templates/character.hbs`}};
 async _prepareContext(opts){const ctx=await super._prepareContext(opts);return {...ctx,actor:this.actor,system:this.actor.system,
   attributes:fieldsToEntries(this.actor.system.attributes,ATTRIBUTES),
   skills:Object.entries(SKILLS).map(([key,[label,attribute]])=>({key,label,attribute,value:this.actor.system.skills[key]?.value??0})),
   skillGroups:SKILL_GROUPS.map(group=>({key:group.key,label:group.label,skills:group.skills.map(key=>({key,label:SKILLS[key]?.[0]||key,attribute:SKILLS[key]?.[1]||'int',value:this.actor.system.skills[key]?.value??0}))})),
   items:this.actor.items.contents.map(it=>({id:it.id,name:it.name,type:it.type,img:it.img,system:it.system,ritual:it.type==='ritual'})),
   doms:this.actor.items.filter(x=>x.type==='dom'),rituais:this.actor.items.filter(x=>x.type==='ritual'),
   arsenal:this.actor.items.filter(x=>['arma','armadura','equipamento'].includes(x.type)),
   contatos:this.actor.items.filter(x=>['favor','contato'].includes(x.type)),editable:this.actor.isOwner};}
 async _onRender(context,opts){await super._onRender(context,opts);await applyFields(this.actor,this.element);}
}
export class FamilySheet extends H(A){
 static DEFAULT_OPTIONS={classes:['sangue-cimento','sc-family-sheet'],position:{width:820,height:770},window:{resizable:true},
 actions:{
 rollFamily:async function(_ev,target){const k=target.dataset.resource;return rollD6(this.actor,{resource:k,...controls(this),label:`Ação de Família · ${RESOURCES[k]}`});},
 editPortrait:async function(){await editPortrait(this.actor);},
 adjustTrack:async function(_ev,target){const k=target.dataset.track;const o=this.actor.system[k];if(!o)return;await this.actor.update({[`system.${k}.value`]:Math.max(0,Math.min(o.max,o.value+Number(target.dataset.delta||1)))});}
 }};
 static PARTS={body:{template:`${ROOT}/templates/family.hbs`}};
 async _prepareContext(o){const ctx=await super._prepareContext(o);return {...ctx,actor:this.actor,system:this.actor.system,resources:fieldsToEntries(this.actor.system.recursos,RESOURCES)};}
 async _onRender(c,o){await super._onRender(c,o);await applyFields(this.actor,this.element);}
}
export class AncientSheet extends H(A){
 static DEFAULT_OPTIONS={classes:['sangue-cimento','sc-ancient-sheet'],position:{width:800,height:730},window:{resizable:true},actions:{editPortrait:async function(){await editPortrait(this.actor);}}};
 static PARTS={body:{template:`${ROOT}/templates/ancient.hbs`}};
 async _prepareContext(o){const ctx=await super._prepareContext(o);return {...ctx,actor:this.actor,system:this.actor.system};}
 async _onRender(c,o){await super._onRender(c,o);await applyFields(this.actor,this.element);}
}
export class SystemItemSheet extends H(I){
 static DEFAULT_OPTIONS={classes:['sangue-cimento','sc-item-sheet'],position:{width:620,height:680},window:{resizable:true},actions:{editPortrait:async function(){await editPortrait(this.item);}}};
 static PARTS={body:{template:`${ROOT}/templates/item.hbs`}};
 async _prepareContext(o){const ctx=await super._prepareContext(o);return {...ctx,item:this.item,system:this.item.system,
 isDom:this.item.type==='dom',isRitual:this.item.type==='ritual',isGear:['arma','armadura','equipamento'].includes(this.item.type),isContact:['contato','favor'].includes(this.item.type)};}
 async _onRender(c,o){await super._onRender(c,o);await applyFields(this.item,this.element);}
}

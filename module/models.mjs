const F=foundry.data.fields;
const number=(initial=0,min=0,max=100)=>new F.NumberField({required:true,integer:true,initial,min,max});
const text=(initial='')=>new F.StringField({required:true,blank:true,initial});
const schema=(fields)=>new F.SchemaField(fields);
const track=(initial=0,max=10)=>schema({value:number(initial,0,max),max:number(max,0,200)});

export const ATTRIBUTES={for:'Força',agi:'Agilidade',res:'Resistência',car:'Carisma',inti:'Intimidação',aut:'Autoridade',int:'Inteligência',per:'Percepção',von:'Vontade'};
export const SKILLS={armasFogo:['Armas de Fogo','agi'],armasBrancas:['Armas Brancas','for'],atletismo:['Atletismo','agi'],briga:['Briga','for'],crime:['Crime','int'],conducao:['Condução','agi'],engenharia:['Engenharia','int'],furtividade:['Furtividade','agi'],informatica:['Informática / Técnica','int'],interrogatorio:['Interrogatório','inti'],investigacao:['Investigação','per'],lideranca:['Liderança','aut'],labia:['Lábia','car'],medicina:['Medicina','int'],negociacao:['Negociação','car'],ocultismo:['Ocultismo','von'],politica:['Política','int'],resistenciaMental:['Resistência Mental','von'],rua:['Rua','per'],sobrevivencia:['Sobrevivência','res']};
export const SKILL_GROUPS=[
  {key:'confronto',label:'Confronto e ação',skills:['armasFogo','armasBrancas','atletismo','briga','furtividade','conducao']},
  {key:'submundo',label:'Submundo e pressão',skills:['crime','interrogatorio','lideranca','labia','negociacao','rua']},
  {key:'investigacao',label:'Investigação e técnica',skills:['engenharia','informatica','investigacao','medicina','politica','sobrevivencia']},
  {key:'oculto',label:'Oculto e resistência',skills:['ocultismo','resistenciaMental']}
];
export const RESOURCES={dinheiro:'Dinheiro',territorio:'Território',influencia:'Influência',violencia:'Violência',segredo:'Segredo'};
const attrSchema=()=>schema(Object.fromEntries(Object.keys(ATTRIBUTES).map(k=>[k,schema({value:number(1,0,10)})])));
const skillSchema=()=>schema(Object.fromEntries(Object.keys(SKILLS).map(k=>[k,schema({value:number(0,0,10)})])));
class SharedPerson extends foundry.abstract.TypeDataModel {
 static defineSchema(){return {
   identidade:schema({apelido:text(),familia:text(),cargo:text(),arquetipo:text(),origem:text(),antigo:text(),vinculo:number(1,0,4)}),
   attributes:attrSchema(), skills:skillSchema(),
   resources:schema({vitalidade:track(9,9),estresse:track(0,6),corrupcao:track(0,10)}),
   ficha:schema({segredo:text(),divida:text(),ambicao:text(),laco:text(),pecado:text(),marcas:text(),notas:text(),investigacoes:text()}),
   defesa:number(0,0,20), experiencia:number(0,0,999), armadura:number(0,0,10)
 };}
}
export class CharacterData extends SharedPerson {}
export class NpcData extends SharedPerson {}
export class FamilyData extends foundry.abstract.TypeDataModel {
 static defineSchema(){return {
   identity:schema({origem:text('Sangue Antigo'),fachada:text(),negocio:text(),dominio:text(),regra:text(),segredoMaior:text(),divida:text(),inimigo:text(),antigo:text(),contrato:text(),domFamiliar:text(),tabu:text(),tributo:text(),marca:text(),clausulaOculta:text()}),
   recursos:schema(Object.fromEntries(Object.keys(RESOURCES).map(k=>[k,number(2,0,10)]))),
   coesao:track(5,10),fissura:track(0,10),exposicao:track(0,10),legado:number(1,0,10),
   pressao:track(0,6),anotacoes:text()
 };}
}
export class AncientData extends foundry.abstract.TypeDataModel {
 static defineSchema(){return {descricao:text(),dominioPrincipal:text(),dominioSecundario:text(),desejo:text(),restricao:text(),tributo:text(),tabu:text(),manifestacao:text(),cobranca:text(),grau:number(1,1,5),anotacoes:text()};}
}
class BaseItem extends foundry.abstract.TypeDataModel {
 static defineSchema(){return {descricao:text(),conceito:text(),preco:text(),tabu:text(),marca:text(),raridade:text(),notas:text()};}
}
export class DomData extends BaseItem {
 static defineSchema(){return {...super.defineSchema(),nivel:number(1,1,5),categoria:text('Percepção'),alcance:text('Toque'),duracao:text('Instantânea'),frequencia:text('1/cena'),resistencia:text('VON + Resistência Mental'),contramedida:text(),bonus:number(0,0,3),custoCorrupcao:number(0,0,5)};}
}
export class RitualData extends BaseItem {
 static defineSchema(){return {...super.defineSchema(),progresso:track(0,4),perigo:track(0,4),dificuldade:number(2,1,5),etapa:text('Investigação'),requisitos:text(),invocacao:text(),custoCorrupcao:number(1,0,5)};}
}
export class GearData extends BaseItem {
 static defineSchema(){return {...super.defineSchema(),dano:number(0,0,20),rd:number(0,0,10),carga:number(1,0,50),durabilidade:number(100,0,100),bonus:number(0,0,3)};}
}
export class ContactData extends BaseItem {
 static defineSchema(){return {...super.defineSchema(),lealdade:number(0,-2,2),favor:number(0,-5,5)};}
}
export const ACTOR_MODELS={personagem:CharacterData,npc:NpcData,familia:FamilyData,antigo:AncientData};
export const ITEM_MODELS={dom:DomData,ritual:RitualData,arma:GearData,armadura:GearData,equipamento:GearData,favor:ContactData,contato:ContactData};

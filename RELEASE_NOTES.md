# Sangue & Cimento — v0.3.1

Sistema de Túlio Costa — Foundry VTT 14.369

## Correções
- **Chat:** rolagens com contraste elevado, fontes maiores, quatro métricas em duas colunas e dados de 34 px. Estilo compatível com temas escuros e claros.
- **Perícias:** botão TESTAR renomeado para **ROLAR**.
- **Rolagens:** agora abrem janela solicitando dificuldade e modificadores temporários; cancelar não rola dados. Ações de Família também exibem competência e preparação.
- **Ficha:** responsividade por largura da própria janela (`@container`) e preservação da aba ativa ao editar campos.
- **Dependências:** `dice-calculator` (Dice Tray) somado ao `dice-so-nice`, ambos obrigatórios.
- **Famílias:** 40 nomes exclusivos e coerentes com o cenário. Sem numeração romana automática.
- **Macros:** dois geradores completos para NPC e Personagem, incluídos no Diretório de Macros do mundo. Uma terceira macro reinstala os catálogos.

## Migração dos compêndios — importante
Os antigos `.db` não são packs válidos no Foundry 14 (usa LevelDB). Os dados originais, agora JSON, são importados **pelo próprio Foundry** automaticamente na primeira abertura do mundo por um mestre, criando 11 compêndios locais `S&C · ...` (formato LevelDB do Foundry). A importação pode ser repetida pela macro **S&C · Instalar catálogos**. Catálogos já preenchidos não são sobrescritos. A partir desta versão, não é necessário converter manualmente arquivos `.db` nem usar aplicativos externos para isso.

## Limitação de testes
Scripts e conteúdo verificados fora do aplicativo. A inicialização gráfica depende de validação na instalação local do Foundry 14.369.

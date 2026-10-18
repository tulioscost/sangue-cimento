# Sangue & Cimento v0.3.1

**Autor: Túlio Costa.** Sistema de RPG mafioso e horror cósmico para **Foundry VTT 14.369**.

## Dependências obrigatórias
- Dice So Nice (`dice-so-nice`)
- Dice Tray / Dice Calculator (`dice-calculator`)

## Instalação GitHub
Crie uma Release `v0.3.1` com `system.json` e `sangue-cimento.zip` como arquivos de download.
O manifesto de instalação é:
`https://github.com/tulioscost/sangue-cimento/releases/latest/download/system.json`

## Esta versão
- Ficha adaptativa: abas fluidas, perícias com ROLAR, diálogo de dificuldade e bônus temporários.
- Chat com dados visíveis e resultados em alto contraste.
- 40 Famílias de nomes exclusivos; 40 Antigos; 50 Dons; 42 itens; 1 playlist.
- Três macros instaladas automaticamente no mundo do mestre: gerador de NPC, gerador de personagem e instalador de catálogos.

## Importante: compêndios no Foundry 14
Em vez dos arquivos `.db` legados, o sistema inclui dados JSON em `data/seeds`. A primeira abertura por um mestre cria e popula compêndios do **mundo** no formato LevelDB usado nativamente pelo Foundry 14. A importação preserva catálogos anteriormente preenchidos. Para repetir o procedimento use a macro **S&C · Instalar catálogos**.

## Teste sugerido
Após atualizar, reinicie o Foundry, ative os dois módulos, abra a ficha e redimensione a janela. ROLAR abre o diálogo; o chat deve exibir valores legíveis. Confira também as macros e os compêndios.

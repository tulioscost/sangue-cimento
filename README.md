# Sangue & Cimento — Sistema para Foundry VTT 14.369

**Autor:** Túlio Costa · **Versão:** 0.3.2 · **ID:** `sangue-cimento`

RPG de máfia, horror cósmico e Contratos Ancestrais. Sistema baseado na edição 2.1 do livro básico.

## Requisitos
- Foundry VTT **v14.369**.
- **Dice So Nice** — dependência obrigatória.
- **Dice Tray / Dice Calculator** (`dice-calculator`) — dependência obrigatória.

## Instalação por manifesto
Depois que a release do repositório `tulioscost/sangue-cimento` estiver publicada:

`https://github.com/tulioscost/sangue-cimento/releases/latest/download/system.json`

Abra **Game Systems → Install System**, cole o link em **Manifest URL** e instale. Crie um mundo com Sangue & Cimento e ative as dependências.

## Inventário v0.3.2
Na aba **Arsenal**, cada item exibe automaticamente ações aplicáveis conforme os campos de sua ficha:

- **ROLAR:** somente se `Exige teste` estiver marcado.
- **EQUIPAR / DESEQUIPAR:** somente se `Pode ser equipado` estiver marcado; requer quantidade maior que zero.
- **CONSUMIR:** somente se `Consumível` estiver marcado e houver estoque.

Na ficha de item, defina **Atributo vinculado**, **Perícia vinculada**, **Bônus do equipamento**, **Quantidade**, **Dano**, **RD**, **Carga**, **Durabilidade** e as opções de uso. Para rolar, o jogador poderá escolher outros vínculos e marcar **Salvar Atributo e Perícia**.

**Cálculo:** Atributo + Perícia + Bônus do item + Modificador temporário. O total respeita o teto geral de 10d6. Se o item é equipável, deve ser equipado antes do teste.

**RD:** é o maior valor entre **RD base** e a RD de um equipamento ativo; ela nunca é somada entre diversas armaduras. A antiga RD preenchida manualmente é preservada como RD base na primeira atualização.

**Consumo:** quantidade diminui em 1. O item permanece no inventário com quantidade zero, permitindo reabastecimento. Valores de cura ou redução de Estresse são opcionais e limitados aos respectivos máximos/mínimos.

## Atualização da versão anterior
Substitua a Release e atualize o sistema pelo Foundry. A versão 0.3.2 migra os registros antigos presentes em fichas e nos compêndios de itens criados por Sangue & Cimento, sem substituir valores como dano, RD, bônus ou descrições.

## Interface
A ficha possui barra de rolagem própria, colorida e sempre visível. A rolagem vertical continua até o rodapé mesmo em janelas pequenas. A posição de rolagem é preservada ao salvar campos; ao trocar de aba, começa no topo da nova seção.

## Macro e catálogos
As macros de NPC completo, Personagem completo e Instalação de Catálogos continuam disponíveis. O sistema mantém os conjuntos de Itens, Famílias, Antigos, Dons e a música tema.

## Estado de testes
A sintaxe, os manifestos e os cálculos puros foram testados. A prova final de funcionamento visual no Foundry 14.369 ainda deve ser feita em uma instalação real; veja `QA.md`.

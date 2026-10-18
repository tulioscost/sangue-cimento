# Sangue & Cimento — Foundry VTT v0.3.2

**Autor:** Túlio Costa · **Foundry:** v14.369 · **Dependências obrigatórias:** Dice So Nice e Dice Tray (`dice-calculator`).

## Inventário funcional
- Itens podem ter três funções independentes: **exigir teste**, **equipável** e **consumível**.
- Botão **ROLAR** em itens com teste; a janela permite selecionar Atributo, Perícia, Dificuldade e modificador temporário, além de salvar o vínculo de Atributo e Perícia para uso futuro.
- Fórmula: **Atributo + Perícia + Bônus do equipamento + modificador temporário**, limitada a **10d6**.
- Botão **EQUIPAR/DESEQUIPAR**; o sistema atualiza a **RD efetiva** automaticamente. A RD é o maior valor entre RD base e peças equipadas — armaduras não se acumulam.
- Botão **CONSUMIR**, decrementando a quantidade; itens esgotados ficam visíveis com quantidade zero. Itens configurados podem restaurar Vitalidade ou reduzir Estresse.
- Campos de configuração adicionados à ficha individual do item.

## Ficha e rolagem
- Barra de rolagem **interna, vertical e sempre visível** em fichas de personagem, NPC, Família, Antigo e Item, com suporte a janelas menores.
- Preservação da aba ativa e da posição do scroll entre atualizações.
- Layout do inventário com botões de ação e indicadores de quantidade/equipado.

## Compatibilidade
- Migração não destrutiva de itens da v0.3.1, preenchendo propriedades novas.
- Famílias, Antigos, Dons, playlist e macros já existentes são preservados.
- Geradores de personagem/NPC passam a criar inventário com vínculos de rolagem.

## Testes executados
- Checagem de sintaxe dos módulos JavaScript.
- Conferência dos JSONs e ZIPs, incluindo manifesto.
- Testes lógicos de equipar, desequipar, cálculo de RD, consumo, Vitalidade, Estresse e fórmula de rolagem.

**Atenção:** não foi possível executar o Foundry VTT 14.369 aqui. O comportamento visual da rolagem interna, os diálogos e a integração com a API do aplicativo exigem validação no mundo do usuário.

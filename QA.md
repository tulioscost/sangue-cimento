# Verificações técnicas — Sangue & Cimento v0.3.1

## Passou
- Todas as fontes JavaScript do sistema: `node --check`.
- `system.json` válido e com `dice-so-nice` e `dice-calculator` em `relationships.requires`.
- 40 Famílias com nomes únicos (nenhum sufixo romano).
- Dados de 11 catálogos preservados, totalizando 173 documentos.
- Simulação da instalação dos catálogos por mestre no mundo: 11 coleções e 173 documentos; segunda execução sem duplicação.
- Simulação de registro das macros: 3 macros, sem duplicação.
- Simulação de geração: 1 NPC e 1 personagem, ambos com 9 atributos, 20 perícias e 3 itens.
- Botão `ROLAR` na ficha, diálogo de dificuldade e bônus e CSS responsivo com consultas de contêiner.

## Ainda necessita validação no Foundry instalado
- Compatibilidade exata de animações Dice So Nice e reprodução audiovisual por cliente.
- Renderização visual em cada tema/zoom e janelas redimensionadas.
- A criação de compêndios do mundo em servidor real, incluindo permissões de leitura.
- Drag-and-drop e execução das macros no Diretório e na Barra de Macros.

## Aviso de migração
As coleções de sistema em formato `.db` foram substituídas por catálogos JSON de inicialização. O primeiro mestre a entrar no mundo gera compêndios locais LevelDB; o sistema não modifica aqueles que já contenham documentos.

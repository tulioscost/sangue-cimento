# Testes — Sangue & Cimento v0.3.3

## Verificações automatizadas concluídas
- `node --check` em todos os módulos JavaScript.
- `node tests/qa-world-setup.mjs`: verifica criação de cena, playlist, quatro pastas e pasta-mãe, rota de atores, não duplicação, preservação de uma cena ativa e permissão de GM.
- `node tests/qa-equipment.mjs`: mantém a regressão de equipamentos, RD, consumíveis e rolagens.
- Manifesto e integridade de ZIPs verificados após empacotamento.

## Testes manuais necessários no Foundry 14.369
1. Abra um mundo **novo**: o GM deve encontrar a cena `Bem-vindos a Véspera` na navegação, com arte completa.
2. Ative a cena. Confirme que a playlist `Sangue & Cimento · Tema de Véspera` toca `The Price of Blood`. Navegadores podem exigir clique/interação para liberar áudio.
3. Em um mundo **existente**, confira que nenhuma cena de campanha foi alterada/ativada.
4. Na barra lateral de Atores, confira `Sangue & Cimento` com quatro subpastas.
5. Crie cada tipo (Personagem, NPC, Família, Antigo). Confira a pasta automática.
6. Reinicie: sem duplicações.
7. Execute a macro `S&C · Preparar Véspera e Pastas` e confira que não duplica nada.
8. Confirme compêndios, áudio do dado 1, brilho do dado 6, ficha de equipamentos e rolagens.

**Atenção:** este pacote não foi executado em uma instância real do Foundry. Os itens acima continuam pendentes de validação operacional em V14.369.

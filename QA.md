# Roteiro de testes da v0.3.2 no Foundry

1. Crie ou abra um mundo v14.369 com Dice So Nice e Dice Tray ativos.
2. Abra um Personagem e redimensione a ficha para uma janela baixa; confirme barra vertical interna visível e acesso ao rodapé de todas as abas.
3. Vá em Arsenal. Abra uma arma, marque **Exige teste** e **Pode ser equipado**. Escolha Atributo `AGI` e Perícia `Armas de Fogo`, bônus +1, quantidade 1.
4. **EQUIPAR**, depois **ROLAR**. Selecione dificuldade 2 e modificador temporário +1. Verifique que a reserva é `AGI + Armas de Fogo +1 (item)+1 (temporário)`, limitada a 10d6.
5. Na janela, mude Atributo para Inteligência, Perícia para Crime, marque **Salvar vínculos** e role novamente. Reabra o item e confirme a vinculação.
6. Adicione duas armaduras com RD 2 e RD 3. Equipe ambas: a RD efetiva deve ser 3, nunca 5. Desequipe a de RD 3: a RD deve refletir o máximo entre RD base e a armadura de RD 2.
7. Crie um consumível com quantidade 2, Vitalidade +3 e redução de Estresse 1. Clique **CONSUMIR** duas vezes. O estoque termina em 0; terceira tentativa não consome nem concede efeito.
8. Teste a importação de um item do compêndio de versões anteriores. Confira as ações disponíveis após a migração da v0.3.2.
9. Confirme dados 3D personalizados, brilho ao sair 6 e áudio ao sair 1.
10. Teste as macros de Personagem e NPC: armas geradas devem ter ações de rolagem.

Se algo falhar, abra F12 → Console, copie o erro e informe a ação que o provocou.

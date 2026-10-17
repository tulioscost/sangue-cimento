# Sangue & Cimento v0.2.0

Sistema para Foundry VTT 14.369.

## Destaques
- Ficha redesenhada em estilo relatório policial + grimório, com sangue e projéteis decorativos.
- Integração obrigatória com Dice So Nice.
- Áudio disparado ao obter face 1 e brilho dourado ao obter face 6.
- Compêndios de itens, famílias prontas, antigos e dons agrupados por tipo.

# SANGUE & CIMENTO — Foundry VTT 14.369
**Versão do sistema:** `0.1.0` (primeira implementação técnica)  
**Regras de origem:** *Sangue & Cimento* — Livro Básico, edição 2.1 consolidada  
**Autor do RPG:** Túlio Costa  
**Dependência obrigatória:** [Dice So Nice!](https://foundryvtt.com/packages/dice-so-nice/)

## O que está implementado

- Tipos de atores: `personagem`, `npc`, `familia`, `antigo`.
- Tipos de itens: `dom`, `ritual`, `arma`, `armadura`, `equipamento`, `favor`, `contato`.
- Ficha visual estilo **relatório policial e grimório ritualístico**, com retrato alterável, abas Dossiê / Perícias / Grimório / Arsenal / Laços / Referência artística, campos persistentes e dados editáveis.
- Fichas próprias para Família e Antigo; recursos, história, pacto e tributo editáveis.
- 9 atributos e 20 perícias do livro, rolagens por atributo ou perícia, controle de dificuldade e modificador.
- d6: faces 5–6 = 1 sucesso; 6 = 1 Ímpeto quando houver sucesso; 1 não cancela sucesso; reserva padrão limitada a 10d6.
- Ações de Família: recurso + competência (0–2) + preparação (0–1) + bônus, limitada a 9d6.
- Projetos Rituais como item com relógios editáveis de Progresso e Perigo e D2 padrão.
- Dons com alcance, duração, frequência, resistência, custo e contramedida.
- Dice So Nice carregado como **dependência requerida** no manifest; registro de um conjunto visual de seis faces douradas para d6.
- Todas as rolagens lançadas pela ficha usam `appearance.system=sangue-cimento-ouro`, independentemente do tema pessoal previamente configurado.
- Resultado 6: realce emissivo na textura do 6 e lampejo dourado local ao concluir a animação.
- Resultado 1: reproduz o áudio `witch-on-one.mp3` fornecido pelo usuário, ao concluir a animação. Volume e ambos os efeitos são configuráveis por cada cliente.

## Instalação manual no Windows

1. Feche o Foundry VTT.
2. Abra o diretório de dados do Foundry. O local padrão é `%LOCALAPPDATA%/FoundryVTT/Data/` (caso tenha configurado outro, use-o).
3. Dentro de `systems/`, extraia o ZIP **de instalação manual**, de modo que exista:

```
Data/systems/sangue-cimento/system.json
Data/systems/sangue-cimento/module/main.mjs
Data/systems/sangue-cimento/assets/dice/face-1.webp
...
```

4. Instale **Dice So Nice** na seção de módulos e ative-o no mundo; o Foundry também deverá reconhecer a dependência requerida.
5. Reinicie o Foundry; crie um mundo selecionando **Sangue & Cimento — Máfia e Horror Cósmico**.
6. Dentro do mundo, verifique se o Dice So Nice está ativo. Em **Configurar configurações**, configure o volume do som da face 1 e o brilho da face 6.
7. Crie um ator `personagem`, abra sua ficha e clique em **TESTAR** em uma perícia. Você deverá ver dados 3D estilizados em ouro e o resumo de sucessos/Ímpetos no chat.

### Se o dado personalizado não aparecer

- Confira se o módulo **Dice So Nice** está instalado e **ativado no mundo**.
- Atualize para uma versão do Dice So Nice compatível com Foundry 14.
- Abra a configuração do Dice So Nice, procure por **Sangue & Cimento · Ouro Ancestral** e verifique o cadastro do conjunto; as rolagens feitas pela ficha já forçam esse conjunto.
- Recarregue a página (Ctrl+F5) e confira a aba Console (F12) por erros com o prefixo `Sangue & Cimento`.

## Publicação no GitHub (manifesto pronto para a Release)

Este pacote já foi configurado para o repositório `tulioscost/sangue-cimento` e a tag `v0.1.0`.

1. Crie um repositório **público** chamado `sangue-cimento` na conta `tulioscost`.
2. Extraia `Sangue_Cimento_Repositorio_v0.1.0.zip` e envie **seu conteúdo** para a raiz do repositório. O arquivo `system.json` precisa aparecer na raiz, no mesmo nível da pasta `module`.
3. Abra **Releases** → **Draft a new release**; crie a tag `v0.1.0` e título `Sangue & Cimento v0.1.0`.
4. Anexe SOMENTE os dois arquivos da pasta `Release_Assets`: `system.json` e `sangue-cimento.zip`.
5. Clique em **Publish release**. GitHub cria automaticamente `Source code (zip)` e `Source code (tar.gz)`.
6. Instale no Foundry pela URL estável:
   `https://github.com/tulioscost/sangue-cimento/releases/latest/download/system.json`.

Atenção: estes endereços ficam acessíveis somente após publicação efetiva no GitHub. Se usar outro nome de conta ou repositório, é necessário trocar `url`, `manifest` e `download` no arquivo `system.json` **e recriar o ZIP de release**.

## Testes sugeridos (no Foundry real)

1. Criar personagem e editar atributos, perícias, retrato e Laços; fechar/abrir ficha para confirmar persistência.
2. Rolar 4d6 repetidamente e conferir contagem 5–6, Ímpetos e mensagens do chat.
3. Obter 1 em qualquer dado lançado pela ficha e verificar o MP3 no cliente com o som habilitado.
4. Obter 6 e verificar realce e lampejo após rolagem 3D.
5. Criar Família e rolar Ação com recurso 6 + competência 2 + preparação 1; confirmar 9d6.
6. Criar Projeto Ritual, atualizar separadamente Progresso e Perigo, e conferir persistência.
7. Abrir fichas de Antigo e Dom, preenchendo todos os campos.

## Limites da primeira implementação

Este é um **sistema de início jogável**, não a tradução integral de todas as 70 páginas do livro para automações. Regras narrativas, criação avançada, sucessão e negociação de contratos são acompanhadas por campos na ficha e administração do Narrador, sem inteligência automática. Não acompanha todos os 30 Dons como compêndio programado. Não altera o formato físico do cubo, apenas suas texturas visíveis e o brilho/emissão da face 6. Não foi possível executar testes dentro de uma instância real do Foundry VTT neste ambiente. O manifesto foi estruturado conforme a documentação oficial v14; é recomendada validação funcional no aplicativo antes de divulgação pública.

## Direitos e créditos

- **Sangue & Cimento** e elementos de cenário: Túlio Costa.
- **Áudio:** arquivo entregue pelo usuário `freesound_community-witch-103635.mp3`; licenciamento e crédito de distribuição devem ser confirmados antes de divulgação pública.
- **Arte de capa/ficha e imagens dos d6:** derivados dos recursos fornecidos nesta conversa. Conferir permissões antes de redistribuição.
- **Dice So Nice!:** módulo independente, não incluído no ZIP, com seus próprios créditos e licença.
- **Gothica:** fonte não incorporada nem redistribuída ao pacote; o layout possui alternativas tipográficas CSS. Se a fonte estiver disponível no computador do jogador, pode ser utilizada localmente.

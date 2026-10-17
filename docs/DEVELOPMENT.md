# Observações de desenvolvimento

* `system.json`: tipo `system`, Foundry `minimum=14 verified=14 maximum=14` e dependência `relationships.requires` para `dice-so-nice`.
* `module/models.mjs`: TypeDataModel registrados em `CONFIG.Actor.dataModels` e `CONFIG.Item.dataModels` durante `init`.
* `module/sheets.mjs`: `HandlebarsApplicationMixin(ActorSheetV2 / ItemSheetV2)`, templates em `static PARTS`, ações com `data-action` e campos persistidos por `document.update`.
* `module/dice.mjs`: evento `diceSoNiceReady`, `DiceSystem` importado da API nativa do Dice So Nice, `addDicePreset` para d6, `appearance.system` aplicado por rolagem, `diceSoNiceRollComplete` para efeitos.
* O MP3 toca no cliente após a animação 3D de um lançamento feito pela ficha; em resultado múltiplo de 1 a trilha toca uma vez por rolagem.
* Segurança: campos textuais ficam escapados no Handlebars; nome em chat é escapado; a dependência é verificada antes de testes da ficha.

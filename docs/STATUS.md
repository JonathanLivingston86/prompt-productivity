# Stato — Prompt Productivity

Ultimo aggiornamento: 20 agosto 2026.

## Obiettivo corrente

Mantenere la risorsa web pubblicata e pronta per future modifiche dentro il progetto proprietario, senza alterare la vecchia copia cloud.

## Da fare

- [ ] Revisionare e, se approvata, unire la [Pull Request in bozza #1](https://github.com/JonathanLivingston86/prompt-productivity/pull/1) del ramo `agent/adotta-framework`; fino all'unione, il sito pubblico e il ramo `main` restano invariati.
- [ ] Confermare, quando tornerà utile, se il sito deve restare soltanto mantenuto oppure ricevere nuove funzioni e contenuti.

## In attesa

- [ ] Decidere la futura rimozione o ricollocazione della copia legacy OneDrive soltanto dopo il coordinamento con il riordino generale della memoria digitale.

## Completato e verificato

- [x] Verificato che la copia legacy fosse pulita e sincronizzata con `origin/main` al commit `dbbbfc5`; il ramo remoto GitHub indicava lo stesso commit.
- [x] Clonato il repository nella posizione canonica locale senza spostare o modificare la sorgente OneDrive.
- [x] Aggiunto l'involucro condiviso Codex/Claude: `README.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore` e questo stato.
- [x] Verificati la sintassi di `script.js`, tutti i file necessari e la risposta HTTP locale `200`; i cinque file del sito non sono stati modificati durante l'adozione del framework.
- [x] Riclassificato e ricollocato come risorsa di `workshop-ai-per-architette`, preservando commit `953fcde`, branch `agent/adotta-framework`, remote GitHub e sito pubblico; il server locale dal nuovo percorso ha risposto HTTP 200.

## Rischi e riferimenti

- Il repository e il sito sono pubblici: non inserire segreti o dati personali non destinati alla pubblicazione.
- Il ramo `main` alimenta GitHub Pages; ogni push deve essere preceduto da verifica proporzionata.
- Progetto coordinatore: `C:\AgenticWorkspace\PROGETTI\LAVORO\AI_PER_ARCHITETTI\workshop-ai-per-architette`.

# Prompt Productivity

Mini-sito pubblico con prompt pratici del workshop “Productivity”, parte del filone freelance **AI per architetti**.

## A cosa serve

Il sito permette di cercare, leggere e copiare rapidamente i prompt usati durante il workshop. È un componente autonomo del progetto coordinatore [`workshop-ai-per-architette`](https://github.com/JonathanLivingston86/workshop-ai-per-architette).

Sito pubblicato: <https://jonathanlivingston86.github.io/prompt-productivity/>

## Struttura essenziale

- `index.html`: contenuti e struttura della pagina;
- `style.css`: aspetto grafico e adattamento a telefono e desktop;
- `script.js`: ricerca, copia dei prompt e finestra del codice QR;
- `logo-al.svg` e `qrcode.png`: asset grafici usati dalla pagina;
- `docs/STATUS.md`: attività e stato verificabile del progetto.

Non usa dipendenze da installare, compilazione o servizi locali: è un sito statico, cioè composto da file che il browser può leggere direttamente.

## Controlli prima di pubblicare una modifica

1. Verificare la sintassi JavaScript con `node --check script.js`.
2. Avviare un piccolo server locale e controllare pagina, ricerca, copia e codice QR nel browser.
3. Ispezionare le modifiche Git prima del commit.

Git è la cronologia che permette di vedere e recuperare le versioni precedenti. GitHub Pages pubblica il contenuto del ramo `main`; per questo ogni modifica inviata a quel ramo può cambiare il sito pubblico.

## Classificazione

- Categoria: `LAVORO`.
- Contesto: freelance.
- Area: AI per architetti.
- Progetto coordinatore: `workshop-ai-per-architette`.
- Stato del ciclo di vita: sito pubblicato; futura evoluzione da confermare.

La precedente copia sincronizzata in OneDrive resta temporaneamente invariata come copia legacy. Non è più la radice consigliata per il lavoro con gli agenti.

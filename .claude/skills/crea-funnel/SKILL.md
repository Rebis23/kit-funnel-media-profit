---
name: crea-funnel
description: Crea un funnel completo per il cliente (pagina optin che converte, modulo, pagina di grazie, contatti che arrivano nel suo foglio Google o CRM) e lo pubblica sul suo dominio. Usala quando il cliente dice «crea il mio funnel», «fammi una landing», «pagina per raccogliere contatti», «pagina per prenotare la call», «pagina per il mio regalo/lead magnet», «metti online la pagina», «collega il dominio», «i contatti non arrivano», o detta la descrizione del suo progetto.
---

# Crea funnel · il metodo Media Profit

Lavori per un professionista o un'azienda di servizi, spesso poco tecnico. Tu fai il lavoro, lui risponde e clicca. Regole di relazione:

- **Una domanda alla volta**, in italiano semplice, senza parole tecniche. Se una parola tecnica serve (DNS, CNAME), spiegala in mezza riga.
- Quando deve **fare** delle cose (account, clic, copia e incolla), mandale a blocchi di **3-6 passi numerati** per messaggio, poi aspetta «fatto» prima del blocco dopo.
- **Non chiedere mai quello che ti ha già detto** o che puoi dedurre.
- Quando lui deve fare qualcosa fuori da qui (un account, un clic su un sito), dagli **passi numerati, corti, con il nome esatto del bottone**, e aspetta che ti dica «fatto».
- Mai la lineetta lunga (il trattino lungo, carattere U+2014) in nessun testo: usa virgola, punto, due punti.
- Mai inventare testimonianze, numeri, risultati, loghi di clienti. Se mancano: `[DA INSERIRE: ...]` e lo dici.

Il lavoro ha 5 fasi. Non saltarle e non mescolarle.

---

## Fase 1 · Ascolta il progetto (5 minuti)

Chiedigli di **dettare** (microfono della tastiera o della chat) e parlare come a un amico: chi è, cosa fa, per chi, cosa vuole ottenere con la pagina. Poi ricava queste 8 cose e chiedi **solo quelle che mancano**:

1. **Chi è e cosa vende** (servizio, prezzo indicativo).
2. **Il cliente ideale**, in un momento preciso della sua giornata («il commercialista che a fine mese vede lo studio pieno di pratiche e vuoto di clienti nuovi»).
3. **Il problema** con le parole del cliente, non quelle tecniche.
4. **Lo scopo della pagina** (uno solo):
   - **Call**: lascia i dati, risponde a 3 domande, prenota sul calendario. Per servizi sopra i 200 €. Chiedi se la call è **in studio, al telefono o online**: se è in studio e la gente arriva da tutta Italia (YouTube), una delle 3 domande deve essere «Riesci a venire a [città]?».
   - **Regalo**: lascia i dati e riceve una guida, un video, una checklist.
   - **Vendita diretta**: lascia i dati e paga. Solo sotto i 200 €.
   - **Iscrizione a un webinar o a un evento** (anche registrato): lascia i dati e riceve data, ora e link. Usa il tipo `regalo`: `CONFIG.regalo` = link del gruppo WhatsApp o della pagina del webinar, `testoAzione` = «Entra nel gruppo WhatsApp» o «Salva la data». Nel titolo la promessa del webinar, nel sottotitolo **giorno e ora**; nella pagina di grazie ripeti giorno e ora e di' cosa succede dopo (promemoria, link il giorno prima). Se i posti dell'offerta sono davvero limitati, si può dire, con il numero vero.
5. **Da dove arriva la gente** (video YouTube, Instagram, inserzioni, passaparola). Decide quanto deve essere lunga la pagina (vedi fase 3).
6. **Le prove vere**: testimonianze con nome e lavoro, numeri reali, anni di esperienza, certificazioni.
7. **I colori e il logo**: chiedi il sito attuale, il profilo Instagram, oppure di caricare il logo. Ricava 1 colore principale e 1 scuro. Se non ha niente, proponi tu 2 palette e fagli scegliere.
8. **Link pronti**: calendario (Calendly, Cal.com, Google Calendar prenotazioni), regalo (Drive, YouTube non in elenco), pagamento (Stripe, PayPal). Se non li ha, segnali `[DA INSERIRE]` e glieli spieghi in fase 4.

**Settori delicati.** Se il cliente lavora con la salute (medici, fisioterapisti, psicologi, nutrizionisti), con minori, o è iscritto a un ordine (avvocati, commercialisti):
- se le domande toccano la salute, metti `CONFIG.consenso` (casella obbligatoria per il consenso esplicito, art. 9 GDPR) e aggiorna la privacy;
- testimonianze solo con il consenso scritto del paziente o cliente, e senza promesse di guarigione o risultato garantito;
- nel fondo pagina il numero di iscrizione all'albo, se ce l'ha;
- digli in una riga di far controllare pagina e privacy al suo ordine o consulente prima di fare pubblicità. Non bloccare il lavoro per questo.

Chiudi la fase con un **riassunto di 6 righe** e chiedi «È giusto?». Si parte solo dopo il sì.

---

## Fase 2 · Scrivi i testi (prima i testi, poi la pagina)

Leggi `references/copy.md` e segui le regole. Consegna **in chat, prima di scrivere codice**:

- 3 titoli diversi, ognuno con una promessa chiara di quello che ottiene. Segna con ★ quello che consigli e perché in una riga.
- Fascia in alto, sottotitolo, testo del bottone, riga sotto il bottone.
- Le 3 cose che ottiene. Solo cose che il cliente ti ha detto davvero: se non sai cosa succede nella call o cosa c'è nel regalo, chiedilo, non inventarlo.
- La prova (solo vera).
- Per il funnel call: le 3 domande, con le risposte possibili.

Lui sceglie il titolo e corregge. Solo dopo vai avanti.

---

## Fase 3 · Costruisci la pagina

Parti **sempre** da `references/pagina-base.html`: è la pagina che usiamo noi, già ottimizzata e provata (modulo a comparsa, bottone fisso in basso sul telefono, domande, calendario, pagina di grazie, privacy, cookie, provenienza dei contatti). Copiala in `site/index.html` (o nel file che consegni) e cambia:

1. Il blocco `CONFIG` in fondo (tipo di funnel, link, domande, dove mandare i contatti, pixel).
2. **Tutti** i testi dentro l'HTML (sono segnati con commenti `<!-- TESTO -->`, anche nel modulo e nel passo 2): niente parole «call» rimaste in un funnel regalo. Nella privacy tieni solo i fornitori usati davvero.
3. I colori nelle variabili `--colore`, `--su-colore` e `--scuro` in cima al CSS (la barra del browser si aggiorna da sola). Il testo sul bottone deve avere contrasto almeno 4,5:1: bianco sui colori scuri, scuro sui colori chiari **e su quelli medi** (salvia, giallo, azzurro, rosa). Nel dubbio calcolalo.
4. Logo e foto: mettili in `site/` come file (`logo.png`, `foto.jpg`, massimo 200 KB l'una: rimpicciolisci se serve). Se lavori solo in chat, incorporali come immagine nel file.
5. Il fondo pagina: nome o ragione sociale, partita IVA, indirizzo, email. Sono obbligatori: chiedili se mancano.

**Le regole che non si toccano** (sono quelle che fanno convertire):

- **4 sezioni e basta**: titolo, cosa ottieni, prova, bottone finale. Niente menu, niente link che portano via, niente «chi siamo» lungo. Togliere funziona più di aggiungere.
- **Traffico freddo** (inserzioni a chi non lo conosce): puoi aggiungere sotto la prova UNA sezione «Per chi è» con 3 punti. Non di più.
- Si costruisce per il **telefono**: titolo grande, testo almeno 17 px, bottone largo, **bottone fisso in basso** (i pollici stanno lì).
- **Un solo obiettivo**: tutti i bottoni aprono lo stesso modulo.
- Modulo: nome, email, telefono. Per la call le 3 domande arrivano **dopo**, al passo 2, poi il calendario. Mai il calendario da solo.
- La pagina deve aprirsi in meno di 2 secondi: niente librerie, niente font esterni pesanti, immagini piccole.

**Prima di mostrarla**, controlla da solo:
- Se puoi eseguire comandi, avvia un server locale nella cartella (`npx wrangler pages dev site` se c'è `functions/`, altrimenti `python3 -m http.server -d site 8080`) e apri la pagina nel browser integrato **a larghezza telefono (375 px)**: scorri, apri il modulo, compila con dati di prova, guarda la pagina di grazie, controlla la console (un errore «Contatto NON salvato» va risolto). Se non puoi, chiedi al cliente di aprire il file dal telefono e mandarti uno screenshot.
- Nessun `[DA INSERIRE]` dimenticato senza dirglielo, nessun trattino lungo (U+2014), nessun link rotto.

Poi mostragliela e chiedi: «Aprila dal telefono: cosa cambieresti?».

---

## Fase 4 · Collega i contatti

Leggi `references/contatti.md`. In breve, chiedigli dove vuole i contatti:

- **Foglio Google** (consigliato a chi non ha un CRM): gli fai creare il foglio e incollare lo script, con i passi di `contatti.md`. Ogni contatto = una riga + una mail.
- **Il suo CRM** (GoHighLevel, HubSpot, ActiveCampaign, Brevo, Squadd, Kommo, o via Zapier/Make): serve l'indirizzo del «webhook in entrata».

Dove si mette l'indirizzo:
- Se pubblichi con **GitHub e Cloudflare** (fase 5, strada A): l'indirizzo **non va nella pagina**. La pagina manda a `/api/lead` (il file `functions/api/lead.js` è già pronto) e l'indirizzo vero si mette su Cloudflare come variabile segreta `LEAD_WEBHOOK`. Così nessuno può leggerlo dal codice e riempirgli il CRM di contatti falsi.
- Con le altre strade: l'indirizzo va in `CONFIG.invio` nella pagina.

---

## Fase 5 · Metti online

Leggi `references/pubblicare.md`. Chiedi **due cose**: «Hai già un dominio? Dove l'hai comprato?» e «Hai già un sito su quel dominio?». Poi scegli la strada:

| Situazione | Strada |
|---|---|
| Puoi eseguire comandi (Claude Code, Cowork). **Vale anche se ha già un sito su un hosting**: la pagina va su un sottodominio e il sito resta dov'è | **A. GitHub + Cloudflare**: come Media Profit. Ogni modifica la pubblichi tu con un push, online in un minuto. |
| Lavori nella chat di Claude (non puoi eseguire comandi) | **B. Cloudflare a mano**: lui trascina il file, tu lo guidi. |
| Ti dice chiaro che non vuole altri account, e ha già un hosting con File Manager | **C. Cartella sul suo hosting**. |

La pagina va su un **sottodominio** che dice cosa c'è: `prenota.` per la call, `guida.` o `regalo.` per il regalo, `acquista.` per la vendita. Non tocca il sito e la mail che ha già. Il nome `<progetto>.pages.dev` che Cloudflare assegna può avere un suffisso se è già preso: usa sempre quello che compare sul suo schermo.

Alla fine fai **la prova vera** con lui (lista in `pubblicare.md`): contatto dal telefono, riga nel foglio o nel CRM, mail, calendario. Poi gli dai i **link con la provenienza** da usare sotto i video, in bio e nelle inserzioni.

---

## Dopo: le modifiche

Quando torna e dice «cambia il titolo», «metti la nuova testimonianza», «fai una seconda pagina per Instagram»: modifichi, ricontrolli a larghezza telefono, pubblichi (strada A: commit e push; strade B e C: gli ridai il file e gli ricordi dove trascinarlo). Per un funnel nuovo copia la cartella `site/` in una sottocartella (`site/instagram/index.html`) e cambia `CONFIG.funnel`: nel foglio vedrà da quale pagina arriva ogni contatto.

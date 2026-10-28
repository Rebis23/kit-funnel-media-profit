# Dove arrivano i contatti

Due possibilità. Si possono usare insieme.

## 1. Foglio Google (consigliato a chi non ha un CRM)
Ogni contatto diventa una riga, con le colonne Data, Nome, Email, Telefono, le risposte alle domande, Funnel, Fonte, Mezzo, Campagna, Contenuto, Pagina. A ogni contatto arriva una mail all'account Google che crea lo script.

Passi da dare al cliente, uno alla volta:
1. Apri **sheets.new** nel browser: si crea un foglio nuovo. Chiamalo «Contatti funnel».
2. Nel menu in alto: **Estensioni › Apps Script**.
3. Cancella tutto quello che c'è e incolla il codice qui sotto (dagli il codice in un blocco da copiare). Premi l'icona del dischetto **Salva**.
4. In alto, accanto a **▶ Esegui**, scegli **prova** e premi **▶ Esegui**. Google chiede il permesso: **Rivedi autorizzazioni › il tuo account › Avanzate › Vai a... (non sicuro) › Consenti**. È normale: lo script è suo e lo usa solo lui. Controllo: nel foglio compare «Contatto di prova» e arriva una mail.
5. **Esegui il deployment › Nuovo deployment**. Clic sull'ingranaggio e scegli **App web**. Esegui come: **Me**. Chi può accedere: **Chiunque**. Premi **Esegui il deployment**.
6. Copia l'**URL dell'app web** (finisce con `/exec`) e incollalo in chat.

Se dopo cambia il codice dello script: **Esegui il deployment › Gestisci deployment › matita › Versione: Nuova versione**. Altrimenti l'indirizzo continua a usare il codice vecchio.

```javascript
// Kit Funnel Media Profit: scrive in questo foglio i contatti della pagina
// e manda una mail a ogni contatto nuovo. Non serve cambiare niente.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = (e && e.parameter) || {};
    if (p['_trappola']) return risposta();
    var file = SpreadsheetApp.getActiveSpreadsheet();
    var foglio = file.getSheets()[0];
    var colonne = foglio.getLastColumn();
    var intestazioni = colonne ? foglio.getRange(1, 1, 1, colonne).getValues()[0] : [];
    Object.keys(p).forEach(function (k) {
      if (k.charAt(0) !== '_' && intestazioni.indexOf(k) < 0) intestazioni.push(k);
    });
    foglio.getRange(1, 1, 1, intestazioni.length).setValues([intestazioni]).setFontWeight('bold');
    foglio.setFrozenRows(1);
    foglio.appendRow(intestazioni.map(function (k) {
      var v = p[k] || '';
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    }));
    var testo = intestazioni.filter(function (k) { return p[k]; })
      .map(function (k) { return k + ': ' + p[k]; }).join('\n');
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
      'Nuovo contatto: ' + (p['Nome'] || '') + (p['Funnel'] ? ' (' + p['Funnel'] + ')' : ''),
      testo + '\n\nTutti i contatti: ' + file.getUrl());
  } finally {
    lock.releaseLock();
  }
  return risposta();
}

function doGet() { return risposta(); }

function risposta() { return ContentService.createTextOutput('ok'); }

function prova() {
  doPost({ parameter: {
    'Data': new Date().toLocaleString('it-IT'),
    'Nome': 'Contatto di prova',
    'Email': 'prova@esempio.it',
    'Telefono': '+39 300 0000000',
    'Funnel': 'Prova'
  } });
}
```

## 2. Il CRM del cliente
Funziona con ogni CRM che riceve un **webhook in entrata**: GoHighLevel, Squadd, HubSpot, ActiveCampaign, Brevo, Kommo. Se il CRM non lo ha, si passa da **Zapier** (Catch Hook) o **Make** (Custom webhook).

Passi per il cliente:
1. Nel CRM crea un'automazione che parte da «Webhook in entrata» (in inglese «Inbound webhook»).
2. Copia l'indirizzo che ti dà e incollalo in chat.
3. Dopo la pubblicazione mandiamo un contatto di prova. Nel CRM collega i campi: `nome`, `email`, `phone`.

Cosa arriva al CRM (strada A, in JSON): `nome`, `full_name`, `email`, `phone`, `telefono`, `risposte` (elenco di domanda e risposta), `funnel`, `pagina`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, `gclid`, `data`.
Con le strade B e C la pagina manda direttamente i campi leggibili (`Nome`, `Email`, `Telefono`, le domande, `Fonte`...) più `_crm` con lo stesso JSON in testo.

## Dove si mette l'indirizzo
- **Strada A (GitHub + Cloudflare)**: in `CONFIG.invio` resta `['/api/lead']`. L'indirizzo vero va su Cloudflare: progetto Pages › **Impostazioni › Variabili e segreti › Aggiungi** › nome `LEAD_WEBHOOK`, tipo **Segreto**, valore l'indirizzo. Per mandare anche al CRM: `LEAD_WEBHOOK_2`. Poi serve una nuova pubblicazione (un push qualsiasi) perché la variabile venga letta.
  Se puoi eseguire comandi e lui ha fatto il login con wrangler: `npx wrangler pages secret put LEAD_WEBHOOK --project-name <progetto>`.
- **Strade B e C**: in `CONFIG.invio` metti l'indirizzo dello script o del webhook, es. `['https://script.google.com/macros/s/.../exec']`.

## Se i contatti non arrivano
| Sintomo | Causa e rimedio |
|---|---|
| Niente nel foglio | L'indirizzo deve finire con `/exec` e l'accesso deve essere «Chiunque». |
| Il foglio prende i contatti vecchi ma non le colonne nuove | Lo script è a una versione vecchia: Gestisci deployment › Nuova versione. |
| Strada A: niente da nessuna parte | Manca `LEAD_WEBHOOK` su Cloudflare, oppure non c'è stata una pubblicazione dopo averlo messo. Guarda i log: progetto Pages › Distribuzioni › l'ultima › Funzioni › Log in tempo reale. |
| Non arriva la mail | Spam. La mail parte dall'account Google che ha creato lo script. |

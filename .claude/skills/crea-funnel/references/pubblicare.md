# Mettere online la pagina

La pagina va sempre su un **sottodominio** del cliente (`inizia.suodominio.it`, `call.suodominio.it`): non tocca il sito e la mail che ha già, e funziona con il dominio comprato ovunque. Cloudflare Pages è gratis.

Se Cloudflare propone «Workers» invece di «Pages», resta su **Pages**: è l'unico che accetta un dominio rimasto da un altro provider.

---

## Strada A · GitHub + Cloudflare (come Media Profit)
Il codice sta su GitHub. Cloudflare lo legge e pubblica da solo a ogni modifica. Tu (Claude) scrivi, fai commit e push: online in un minuto, con lo storico di tutte le versioni.

### Una volta sola (15 minuti)
1. **Account GitHub.** Il cliente lo crea su github.com/signup (gratis) e conferma la mail.
2. **Strumenti sul computer.** Controlla tu: `git --version` e `gh --version`.
   - Manca git su Mac: lancia `xcode-select --install` e digli di premere **Installa** nella finestra che si apre.
   - Manca gh: Mac `brew install gh` (se non c'è brew: scarica da cli.github.com), Windows `winget install GitHub.cli`.
3. **Collega GitHub.** Lancia `gh auth login --hostname github.com --git-protocol https --web` e poi `gh auth setup-git`. Mostragli il codice di 8 caratteri che compare: lui apre github.com/login/device, lo incolla e preme **Authorize**.
4. **Crea il repository e carica.**
   - Se la cartella è già un repository (il cliente è partito da «Use this template» su github.com/Rebis23/kit-funnel-media-profit e l'ha scaricato): basta `git add -A && git commit -m "Prima versione del funnel" && git push`.
   - Se è partito dallo zip, nella cartella del progetto:
   ```
   git init -b main
   git add -A
   git commit -m "Prima versione del funnel"
   gh repo create <nome-funnel> --private --source . --push
   ```
   - Se non ha ancora niente sul computer: `gh repo create <nome-funnel> --template Rebis23/kit-funnel-media-profit --private --clone` e lavora nella cartella creata.
   Il repository del cliente è sempre **privato**.
   Controlla che `site/index.html` e `functions/api/lead.js` siano nel commit. Mai committare indirizzi di webhook, password o chiavi.
5. **Account Cloudflare.** Il cliente lo crea su dash.cloudflare.com/sign-up e conferma la mail.
6. **Collega GitHub a Cloudflare.** Passi per lui:
   - **Workers e Pages › Crea › Pages › Importa un repository esistente** (Connect to Git).
   - **Connetti GitHub**, autorizza, scegli il repository `<nome-funnel>`.
   - Impostazioni di build: Framework **Nessuno**, Comando di build **vuoto**, Directory di output **site**.
   - **Salva e distribuisci.** Dopo un minuto la pagina è su `<nome-funnel>.pages.dev`.
7. **I contatti.** Progetto › **Impostazioni › Variabili e segreti › Aggiungi**: nome `LEAD_WEBHOOK`, tipo **Segreto**, valore l'indirizzo dello script Google o del CRM (vedi `contatti.md`). Poi fai tu un push qualsiasi perché venga letto.
8. **Il dominio.** Vedi «Collegare il dominio» qui sotto.

### Ogni modifica, da qui in poi
Modifichi, controlli a larghezza telefono, poi:
```
git add -A && git commit -m "Cosa è cambiato, in italiano" && git push
```
Dopo un minuto apri l'indirizzo online e controlla che la modifica ci sia. Diglielo con il link.

---

## Strada B · Cloudflare a mano (chat di Claude, senza comandi)
1. Prepara la cartella `site` con `index.html` (più `logo.png` e `foto.jpg` se ci sono). Se lavori in chat, consegna un solo `index.html` con le immagini dentro.
2. In `CONFIG.invio` metti l'indirizzo dello script Google o del CRM: il caricamento a mano non supporta `/api/lead`.
3. Passi per lui:
   - Account su dash.cloudflare.com/sign-up.
   - **Workers e Pages › Crea › Pages › Carica i file** (Upload assets / Drag and drop).
   - Nome del progetto: `<nome-funnel>`. **Crea progetto**.
   - Trascina la cartella (o il file zip) e premi **Distribuisci**.
   - Online su `<nome-funnel>.pages.dev`.
4. Per ogni modifica: progetto › **Crea nuova distribuzione** › trascina di nuovo.

---

## Strada C · Una cartella sul suo hosting
Ha già un sito (anche WordPress) su Aruba, Hostinger, SiteGround, Register.it, Netsons, Serverplan o simili.
1. In `CONFIG.invio` l'indirizzo diretto, come nella strada B.
2. Passi per lui:
   - Pannello dell'hosting › **File Manager** (su Aruba: Pannello di controllo › Hosting › File Manager).
   - Apri la cartella del sito: `public_html`, `www` o `htdocs`.
   - Crea una cartella, ad esempio `inizia`. Non chiamarla come una pagina che esiste già.
   - Dentro, carica `index.html` (e le immagini).
   - Online su `suodominio.it/inizia`.

---

## Collegare il dominio (strade A e B)
1. Nel progetto Cloudflare: **Domini personalizzati › Configura un dominio**. Scrivi `inizia.suodominio.it` e vai avanti.
   - Se il dominio è già su Cloudflare, il record si crea da solo: fine.
   - Altrimenti Cloudflare mostra un record **CNAME**: aggiungilo dal provider del dominio.
2. Il record, da far copiare tale e quale:

   | Tipo | Nome / Host | Valore / Punta a | TTL |
   |---|---|---|---|
   | CNAME | `inizia` | `<nome-funnel>.pages.dev` | automatico |

   Se il pannello vuole il nome completo: `inizia.suodominio.it`. Se vuole un punto finale nel valore, aggiungilo.
3. Dove si trova la gestione DNS:

   | Provider | Dove cliccare |
   |---|---|
   | Aruba | Area clienti › Gestione domini › il dominio › Gestione DNS › Aggiungi record CNAME |
   | Register.it | Area clienti › il dominio › DNS e nameserver › Gestione record DNS |
   | GoDaddy | I miei prodotti › il dominio › DNS › Aggiungi nuovo record › CNAME |
   | Hostinger | hPanel › Domini › il dominio › DNS / Nameserver › Gestisci record DNS |
   | IONOS | Domini e SSL › ingranaggio accanto al dominio › DNS › Aggiungi record |
   | OVHcloud | Web Cloud › Nomi di dominio › il dominio › Zona DNS › Aggiungi un record |
   | SiteGround | Site Tools › Dominio › Zona DNS › scheda CNAME |
   | cPanel (Netsons, Serverplan, Keliweb) | cPanel › Zone Editor › + CNAME Record |
   | Namecheap | Domain List › Manage › Advanced DNS › Add New Record |
   | Squarespace (ex Google Domains) | Domini › il dominio › DNS › Record personalizzati |
   | Wix | Domini › tre puntini › Gestisci record DNS › CNAME |

   I nomi dei menu cambiano un po' nel tempo: se non trova la voce, chiedigli uno screenshot del pannello e guidalo da lì. Oppure preparagli questo messaggio per il supporto del provider:
   > Buongiorno, vorrei aggiungere un record DNS al dominio suodominio.it. Tipo: CNAME. Nome: inizia. Valore: <nome-funnel>.pages.dev. TTL: automatico. Potete farlo voi o dirmi dove trovo la voce? Grazie.
4. Torna su Cloudflare e premi **Verifica / Attiva dominio**. Di solito 5-30 minuti, a volte un'ora.
   Se hai i comandi, controlla tu: `dig +short inizia.suodominio.it CNAME` deve rispondere `<nome-funnel>.pages.dev.`

Vuole la pagina su `suodominio.it` senza parola davanti? Si può solo spostando i DNS del dominio su Cloudflare (cambio dei nameserver): se sul dominio ci sono sito e mail, prima va fatto l'inventario dei record. Sconsiglialo per un funnel.

Non ha un dominio? Va bene `<nome-funnel>.pages.dev` per partire. Il dominio si compra su Cloudflare (Registrazione dominio, circa 10 € l'anno) e si collega con un clic.

---

## La prova vera (sempre, con lui)
Fagliela fare dal **telefono**:
1. Apre la pagina: il titolo si legge, il bottone in basso compare scorrendo.
2. Si iscrive con i suoi dati veri.
3. Il contatto compare nel foglio o nel CRM, con la Fonte se ha aperto un link con gli utm.
4. Arriva la mail «Nuovo contatto».
5. Dopo l'iscrizione vede il calendario, il regalo o il pagamento.
6. Cancella la riga di prova.

## I link da usare
Dagli i link pronti, uno per posto, così nel foglio vede da dove arriva ogni contatto:
- Sotto un video YouTube: `https://inizia.suodominio.it/?utm_source=youtube&utm_medium=organico&utm_campaign=<funnel>&utm_content=<titolo-video>`
- Bio di Instagram: `?utm_source=instagram&utm_medium=bio&utm_campaign=<funnel>`
- WhatsApp: `?utm_source=whatsapp&utm_medium=messaggio&utm_campaign=<funnel>`
- Newsletter: `?utm_source=email&utm_medium=newsletter&utm_campaign=<funnel>`
- Inserzioni Meta, nel campo «Parametri URL»: `utm_source=meta&utm_medium=ads&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`

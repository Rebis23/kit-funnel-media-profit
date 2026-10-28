# Progetto funnel

Questa cartella è il funnel del cliente. Per creare, modificare, pubblicare o collegare il dominio usa la skill **crea-funnel** (`.claude/skills/crea-funnel/SKILL.md`), anche se il cliente non la nomina.

- `site/` la pagina che va online (`index.html`, immagini). Cloudflare pubblica questa cartella.
- `functions/api/lead.js` riceve i contatti e li manda al foglio Google o al CRM (indirizzo nella variabile segreta `LEAD_WEBHOOK` su Cloudflare, mai nel codice).

Regole:
- Il cliente non è tecnico: una domanda alla volta, passi numerati con il nome esatto dei bottoni.
- Mai la lineetta lunga (il trattino lungo, carattere U+2014) nei testi.
- Mai inventare testimonianze o numeri.
- Dopo ogni modifica: controlla la pagina a larghezza telefono, poi commit e push (se il progetto è su GitHub) e verifica online.

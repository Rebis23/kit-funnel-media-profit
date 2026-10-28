/* ═══════════════════════════════════════════════════════════════
   Ricezione dei contatti della pagina → foglio Google e/o CRM

   La pagina manda qui (/api/lead), non direttamente al CRM: così
   l'indirizzo vero del webhook non compare nel codice della pagina
   e nessuno può riempire il CRM di contatti falsi.

   Gli indirizzi si mettono su Cloudflare, non qui:
   progetto Pages › Impostazioni › Variabili e segreti
     LEAD_WEBHOOK    obbligatorio: script Google (…/exec) o webhook del CRM
     LEAD_WEBHOOK_2  facoltativo: un secondo indirizzo (es. foglio + CRM)
   ═══════════════════════════════════════════════════════════════ */

export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const lead = Object.fromEntries(form.entries());

  /* campo trappola compilato = bot: si risponde ok e non si manda niente */
  if (lead._trappola) return ok();
  if (!lead.Email || !lead.Nome) return new Response('dati mancanti', { status: 400 });

  const destinazioni = [env.LEAD_WEBHOOK, env.LEAD_WEBHOOK_2].filter(Boolean);
  if (!destinazioni.length) return new Response('manca LEAD_WEBHOOK', { status: 500 });

  await Promise.all(destinazioni.map(url => manda(url, lead)));
  return ok();
}

/* Il foglio Google vuole i nomi leggibili (diventano le colonne).
   Un CRM vuole i nomi standard (nome, email, phone…) in JSON. */
async function manda(url, lead) {
  try {
    if (/script\.google\.com/.test(url)) {
      const leggibili = new URLSearchParams();
      for (const [k, v] of Object.entries(lead)) if (k.charAt(0) !== '_') leggibili.set(k, v);
      await fetch(url, { method: 'POST', body: leggibili, redirect: 'follow' });
    } else {
      let crm = {};
      try { crm = JSON.parse(lead._crm || '{}'); } catch (e) {}
      crm.data = new Date().toISOString();
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(crm) });
    }
  } catch (e) {
    console.log('invio non riuscito a', url, e.message);
  }
}

function ok() {
  return new Response('ok', { headers: { 'Content-Type': 'text/plain' } });
}

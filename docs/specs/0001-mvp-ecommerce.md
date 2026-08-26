# 0001 — MVP E-commerce

## Obiettivo

Negozio online minimo funzionante: catalogo prodotti con varianti (taglia/colore), carrello persistente, checkout via Stripe, gestione ordini con decremento stock.

## Modello dati

`Product` → `Variant` (taglia/colore/SKU/prezzo/stock) → `Order` → `OrderItem`.

- Un prodotto ha più varianti (es. taglie/colori diversi), ciascuna con SKU, prezzo e stock propri.
- Un ordine registra le righe (`OrderItem`) con lo snapshot del prezzo al momento dell'acquisto (il prezzo può cambiare dopo).

Definizione completa: [`prisma/schema.prisma`](../../prisma/schema.prisma).

## Flusso di checkout

1. Il client invia al server la lista `{ variantId, quantity }` e l'email.
2. Il server recupera le varianti dal DB e **ricalcola i prezzi lato server** — il prezzo mandato dal client (se mai presente) non viene mai usato.
3. Il server verifica che lo stock sia sufficiente per ogni riga.
4. Viene creata una sessione Stripe Checkout con i `line_items` calcolati server-side.

Implementazione: [`src/app/api/checkout/route.ts`](../../src/app/api/checkout/route.ts).

## Flusso webhook (conferma pagamento)

1. Stripe invia `checkout.session.completed` con firma da verificare (`STRIPE_WEBHOOK_SECRET`).
2. **Idempotenza**: se esiste già un `Order` con quello `stripeSessionId`, l'evento viene ignorato (evita doppie elaborazioni se Stripe re-invia lo stesso evento).
3. In una transazione: viene creato l'`Order`, le relative `OrderItem`, e viene decrementato lo stock di ogni `Variant`.

Implementazione: [`src/app/api/webhook/route.ts`](../../src/app/api/webhook/route.ts).

## Decisioni tecniche

Non usiamo ADR separati per ora: le decisioni rilevanti sono raccolte qui.

| Decisione | Motivazione |
|---|---|
| Prezzi come `Int` in centesimi, mai `Float` | Evita errori di arrotondamento nei calcoli monetari |
| Immagini prodotto su storage esterno (Cloudinary/S3), non committate nel repo | Evita di gonfiare il repo con binari e semplifica il deploy |
| Deploy consigliato: Vercel + Supabase o Neon (Postgres) | Integrazione naturale con Next.js; hosting Postgres gestito senza infrastruttura propria |
| Admin protetto da password semplice (`ADMIN_PASSWORD`), non un sistema di auth completo | Sufficiente per l'MVP; un sistema di auth completo è rimandabile a dopo il lancio |
| Carrello persistito in `localStorage` via Zustand (non lato server) | Evita di dover gestire sessioni/utenti anonimi lato server solo per il carrello |

## Note aperte

Vedi [`docs/ideas/backlog.md`](../ideas/backlog.md) per questioni non ancora decise (es. IVA e fatturazione).

## Configurazione ancora mancante

Lo scaffold attuale non include ancora `tsconfig.json`, `next.config.js` né la configurazione Tailwind — vanno creati insieme al layout base (vedi step 1 in [`docs/status/STATUS.md`](../status/STATUS.md)).

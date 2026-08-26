# Stato del progetto

Ultimo aggiornamento: 2026-08-26

## Fatto

- Modello dati Prisma: `Product` → `Variant` → `Order` → `OrderItem` ([`prisma/schema.prisma`](../../prisma/schema.prisma))
- Client Stripe server-side ([`src/lib/stripe.ts`](../../src/lib/stripe.ts))
- Client Prisma singleton ([`src/lib/prisma.ts`](../../src/lib/prisma.ts))
- Carrello persistente in `localStorage` con Zustand ([`src/lib/cart-store.ts`](../../src/lib/cart-store.ts))
- API checkout: crea la sessione Stripe, ricalcola i prezzi lato server, controlla lo stock ([`src/app/api/checkout/route.ts`](../../src/app/api/checkout/route.ts))
- API webhook: riceve la conferma di pagamento, crea l'ordine, scala lo stock — transazionale e idempotente su `stripeSessionId` ([`src/app/api/webhook/route.ts`](../../src/app/api/webhook/route.ts))
- **Layout base + Tailwind**: `tsconfig.json`, `next.config.js`, config Tailwind/PostCSS, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Header.tsx` (logo, nav categorie, link carrello), `src/components/Footer.tsx`. Build e type-check puliti; verificato in dev che header/footer vengono renderizzati su tutte le route. Le categorie in nav sono **placeholder statici** — da collegare al catalogo reale allo step 2 (Pagina catalogo/categoria).
- **Homepage** (`src/app/page.tsx`): griglia prodotti in evidenza. Query Prisma: prodotti `active`, ordinati per data di creazione decrescente, limite 8, con prezzo minimo tra le varianti. Pagina marcata `dynamic = "force-dynamic"` (niente prerender statico, dato che stock/disponibilità cambiano spesso). Immagini con `<img>` semplice, non `next/image` (eviterebbe di dover configurare i domini remoti per ora). Stato vuoto gestito ("Nessun prodotto disponibile"). **Interpretazione di "in evidenza"**: non esiste un flag `featured` nello schema, quindi per ora vengono mostrati semplicemente i prodotti attivi più recenti — se serve una vera selezione curata andrà aggiunto un campo dedicato al modello dati (da discutere prima in spec). Build e type-check puliti; **non verificabile con dati reali in questo ambiente** — nessun Postgres disponibile (niente `.env`, niente Postgres/Docker installato), la pagina risponde correttamente 500 con errore Prisma `DATABASE_URL` non trovata, comportamento atteso e non un bug.

Dettagli funzionali e decisioni tecniche: [`docs/specs/0001-mvp-ecommerce.md`](../specs/0001-mvp-ecommerce.md).

## Prossimi passi (in ordine)

1. **Pagina catalogo/categoria** — lista prodotti filtrabile
2. **Pagina prodotto** (`src/app/prodotti/[slug]/page.tsx`) — galleria immagini, scelta taglia/colore, bottone "aggiungi al carrello" che usa `useCartStore`
3. **Pagina carrello** (`src/app/carrello/page.tsx`) — riepilogo, modifica quantità, bottone checkout che chiama `/api/checkout`
4. **Pagina conferma ordine** (`src/app/checkout/successo/page.tsx`)
5. **Pannello admin minimale** — form per aggiungere/modificare prodotti e varianti (protetto da `ADMIN_PASSWORD`, non serve auth completa per partire)
6. **Configurazione webhook Stripe in locale** — `stripe listen --forward-to localhost:3000/api/webhook` (Stripe CLI)

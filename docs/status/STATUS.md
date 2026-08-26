# Stato del progetto

Ultimo aggiornamento: 2026-08-26

## Fatto

- Modello dati Prisma: `Product` → `Variant` → `Order` → `OrderItem` ([`prisma/schema.prisma`](../../prisma/schema.prisma))
- Client Stripe server-side ([`src/lib/stripe.ts`](../../src/lib/stripe.ts))
- Client Prisma singleton ([`src/lib/prisma.ts`](../../src/lib/prisma.ts))
- Carrello persistente in `localStorage` con Zustand ([`src/lib/cart-store.ts`](../../src/lib/cart-store.ts))
- API checkout: crea la sessione Stripe, ricalcola i prezzi lato server, controlla lo stock ([`src/app/api/checkout/route.ts`](../../src/app/api/checkout/route.ts))
- API webhook: riceve la conferma di pagamento, crea l'ordine, scala lo stock — transazionale e idempotente su `stripeSessionId` ([`src/app/api/webhook/route.ts`](../../src/app/api/webhook/route.ts))

Dettagli funzionali e decisioni tecniche: [`docs/specs/0001-mvp-ecommerce.md`](../specs/0001-mvp-ecommerce.md).

## Prossimi passi (in ordine)

1. **Layout base + Tailwind** — `src/app/layout.tsx`, `src/app/globals.css`, header/footer, navigazione categorie (include creare `tsconfig.json`, `next.config.js` e la config Tailwind, ancora assenti)
2. **Homepage** (`src/app/page.tsx`) — griglia prodotti in evidenza
3. **Pagina catalogo/categoria** — lista prodotti filtrabile
4. **Pagina prodotto** (`src/app/prodotti/[slug]/page.tsx`) — galleria immagini, scelta taglia/colore, bottone "aggiungi al carrello" che usa `useCartStore`
5. **Pagina carrello** (`src/app/carrello/page.tsx`) — riepilogo, modifica quantità, bottone checkout che chiama `/api/checkout`
6. **Pagina conferma ordine** (`src/app/checkout/successo/page.tsx`)
7. **Pannello admin minimale** — form per aggiungere/modificare prodotti e varianti (protetto da `ADMIN_PASSWORD`, non serve auth completa per partire)
8. **Configurazione webhook Stripe in locale** — `stripe listen --forward-to localhost:3000/api/webhook` (Stripe CLI)

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

Dettagli funzionali e decisioni tecniche: [`docs/specs/0001-mvp-ecommerce.md`](../specs/0001-mvp-ecommerce.md).

## Prossimi passi (in ordine)

1. **Homepage** (`src/app/page.tsx`) — griglia prodotti in evidenza
2. **Pagina catalogo/categoria** — lista prodotti filtrabile
3. **Pagina prodotto** (`src/app/prodotti/[slug]/page.tsx`) — galleria immagini, scelta taglia/colore, bottone "aggiungi al carrello" che usa `useCartStore`
4. **Pagina carrello** (`src/app/carrello/page.tsx`) — riepilogo, modifica quantità, bottone checkout che chiama `/api/checkout`
5. **Pagina conferma ordine** (`src/app/checkout/successo/page.tsx`)
6. **Pannello admin minimale** — form per aggiungere/modificare prodotti e varianti (protetto da `ADMIN_PASSWORD`, non serve auth completa per partire)
7. **Configurazione webhook Stripe in locale** — `stripe listen --forward-to localhost:3000/api/webhook` (Stripe CLI)

# CLAUDE.md

Istruzioni di contesto per agenti AI che lavorano su questo repository.

## Progetto

MyShop — e-commerce. Stack: Next.js 14 (App Router, cartella `src/app`), Prisma + PostgreSQL, Stripe Checkout, Zustand (stato carrello), TypeScript, Tailwind CSS.

## Layout del repo

- `src/app/` — route Next.js (pagine + API route)
- `src/lib/` — client condivisi (Prisma, Stripe) e store (carrello)
- `prisma/schema.prisma` — modello dati
- `docs/specs/` — specifiche funzionali/tecniche delle feature
- `docs/status/STATUS.md` — stato corrente del progetto e prossimi passi (**parti sempre da qui** per capire cosa fare)
- `docs/ideas/` — idee e questioni aperte non ancora decise

## Setup

```bash
npm install
cp .env.example .env   # poi compilare le variabili vere
npx prisma db push
npm run dev
```

## Convenzioni vincolanti (non derogabili senza discuterne)

- **Prezzi sempre in centesimi, tipo `Int`** — mai `Float`, per evitare errori di arrotondamento.
- **Ricalcolare sempre i prezzi lato server** nel checkout — non fidarsi mai di un prezzo passato dal client.
- **Verificare lo stock** prima di confermare un ordine.
- **Webhook Stripe idempotente**: deduplicare sull'`id` della sessione Stripe (`stripeSessionId`) prima di creare un ordine.
- **Immagini prodotto** vanno su uno storage esterno (Cloudinary/S3): non committarle nel repo.

Dettagli e motivazioni in `docs/specs/0001-mvp-ecommerce.md`.

## Come procedere

Per capire cosa è già stato costruito e qual è il prossimo passo, leggi `docs/status/STATUS.md` e segui l'ordine indicato lì. Se un passo richiede scelte di design non banali, scrivi o aggiorna la spec corrispondente in `docs/specs/` prima di implementare.

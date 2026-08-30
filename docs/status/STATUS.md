# Stato del progetto

Ultimo aggiornamento: 2026-08-30

## Stato attuale

- **Sito pubblico completo e navigabile**: homepage, catalogo (con filtro categoria), schede prodotto, carrello, conferma ordine, pagine di assistenza (Spedizioni, Resi e cambi, Contatti), 404 dedicata. Identità visiva coerente (palette rosa/avorio/antracite, tipografia Bodoni Moda/Work Sans), responsive, animazioni di ingresso via Framer Motion.
- **Database Postgres (Neon) collegato e popolato**: schema `Product → Variant → Order → OrderItem` applicato via `prisma db push` (nessuna migration versionata: lo schema non ha mai avuto una modifica dopo la creazione iniziale). Catalogo reale con 8 prodotti e 18 varianti; il fallback a dati demo (`src/lib/demo-catalog.ts`) resta nel codice ma non è più attivo, dato che il catalogo reale non è vuoto.
- **Deploy automatico su Vercel**: push su `main` → build → produzione, verificato ripetutamente via GitHub Deployments API. URL stabile: `https://myshop-jet-three.vercel.app`.
- **Catalogo immagini ripulito**: più round di audit commerciale (dal punto di vista di un cliente reale) hanno portato alla sostituzione di foto deboli o incoerenti (pantalone chino, sneaker) e alla rimozione di due occorrenze di un logo di brand reale (Salvatore Ferragamo) individuate su una foto prodotto e, separatamente, su un'immagine editoriale in homepage — entrambe sostituite e verificate in produzione. Nessun logo di brand noto risulta oggi presente nel catalogo, per quanto verificato.
- **Pannello admin** (`/admin/**`): CRUD prodotti/varianti funzionante, protetto da password singola (`ADMIN_PASSWORD`) via cookie httpOnly verificato da `src/middleware.ts` (Edge runtime). **Non gestisce gli ordini**: non c'è nessuna schermata per vedere gli `Order`/`OrderItem` creati dal webhook — oggi visibili solo con `npx prisma studio` o dalla Dashboard Stripe.
- **Carrello**: persistito in `localStorage` via Zustand. Dopo un pagamento Stripe confermato, viene svuotato correttamente solo degli articoli effettivamente acquistati (bug corretto: prima il carrello non veniva mai svuotato dopo un acquisto riuscito).
- **Stripe presente nel codice ma non configurato con chiavi reali**: `/api/checkout` (crea la sessione, ricalcola i prezzi lato server, verifica lo stock) e `/api/webhook` (idempotente su `stripeSessionId`, transazionale, decrementa lo stock in modo sicuro) sono stati controllati in un audit dedicato e risultano corretti. `STRIPE_SECRET_KEY`/`STRIPE_PUBLISHABLE_KEY`/`STRIPE_WEBHOOK_SECRET` in `.env` sono ancora i placeholder di `.env.example` — nessun ordine reale è mai stato creato (0 righe in `Order` all'ultima verifica). Un test end-to-end in Stripe Test Mode è stato pianificato ma non ancora eseguito: richiede l'inserimento manuale delle chiavi Test da parte di chi gestisce il progetto (passo non automatizzabile, richiede le credenziali Stripe reali).
- **Header di sicurezza HTTP di base** configurati in `next.config.js` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`). Nessuna Content-Security-Policy: richiede un audit dedicato (script/stili/font/redirect Stripe) prima di poter essere introdotta senza rischio.
- **Dipendenze**: nessuna vulnerabilità nota (`npm audit` pulito — una vulnerabilità alta in una copia di `postcss` usata internamente da Next.js è stata risolta forzandone l'allineamento alla versione già usata dal resto del progetto, senza aggiornare Next.js). Le major version principali (Next 15 vs 16, Tailwind 3 vs 4, Prisma 5 vs 7, Stripe SDK 16 vs 22) non sono aggiornate: nessun rischio di sicurezza noto, solo manutenzione futura da pianificare separatamente (sono aggiornamenti breaking).
- **Nome del negozio centralizzato**: `src/lib/site-config.ts` (`SITE_NAME`) è l'unico punto da cambiare per rinominare il brand in header, footer, meta tag e titoli di pagina.

## Problemi noti (non risolti)

- Nessuna pagina legale (Privacy, Termini, Cookie policy) — necessaria prima di operare con clienti reali (il sito raccoglie email e indirizzo di spedizione via Stripe Checkout).
- IVA e fatturazione da verificare con un commercialista prima di andare live — non è una questione di codice (vedi `docs/ideas/backlog.md`).
- Nessun test automatico (`tests/` esiste ma è vuota, framework non ancora scelto).
- Login admin senza rate-limiting: password singola, nessuna protezione da tentativi ripetuti.
- Upload immagini prodotto: l'admin richiede di incollare un URL già ospitato altrove, nessun upload diretto (Cloudinary non configurato, `CLOUDINARY_URL` ancora placeholder). Le immagini del catalogo attuale sono file locali in `public/catalogo/`, non su storage esterno come da convenzione in `CLAUDE.md`.
- Licenza delle immagini stock del catalogo (Pexels/Unsplash) da verificare esplicitamente se il progetto viene ceduto come template riutilizzabile per più clienti, non solo come sito live per un singolo cliente.
- Nessun file `LICENSE` né campo `license` in `package.json`: da chiarire sotto quali termini il progetto viene ceduto in caso di vendita.

## Prossimi passi possibili (da concordare, non pianificati automaticamente)

- Configurare le chiavi Stripe Test ed eseguire il test di pagamento end-to-end (procedura già documentata in `CLAUDE.md`).
- Aggiungere una sezione ordini al pannello admin.
- Scrivere le pagine legali minime.
- Valutare l'aggiornamento delle dipendenze principali a major più recenti (separatamente, sono breaking change).
- Valutare l'introduzione di una Content-Security-Policy dedicata.

Dettagli funzionali e decisioni tecniche: [`docs/specs/0001-mvp-ecommerce.md`](../specs/0001-mvp-ecommerce.md).

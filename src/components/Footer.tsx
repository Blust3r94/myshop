import Link from "next/link";

const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <div className="font-serif text-lg text-ink">MyShop</div>
            <p className="max-w-[26ch] text-sm leading-relaxed text-ink-muted">
              Capi e accessori essenziali, pensati per durare.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted">Negozio</div>
            <Link href="/prodotti" className="text-sm text-ink transition hover:text-accent">
              Catalogo
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/prodotti?categoria=${encodeURIComponent(category)}`}
                className="text-sm text-ink transition hover:text-accent"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted">Assistenza</div>
            <a href="#" className="text-sm text-ink transition hover:text-accent">
              Spedizioni
            </a>
            <a href="#" className="text-sm text-ink transition hover:text-accent">
              Resi e cambi
            </a>
            <a href="#" className="text-sm text-ink transition hover:text-accent">
              Contatti
            </a>
          </div>

          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted">Novità</div>
            <p className="text-sm text-ink-muted">Iscriviti per ricevere aggiornamenti sulle nuove collezioni.</p>
            <div className="flex border border-line">
              <input
                type="email"
                placeholder="La tua email"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="button"
                className="flex-shrink-0 border-l border-line px-4 text-[13px] uppercase tracking-wide text-ink transition hover:bg-paper-alt"
              >
                Invia
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-muted md:flex-row md:items-center md:justify-between">
          <div>&copy; {new Date().getFullYear()} MyShop</div>
          <div>Pagamenti sicuri con Stripe</div>
        </div>
      </div>
    </footer>
  );
}

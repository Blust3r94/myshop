import Link from "next/link";
import { SITE_NAME, PAYMENT_PROVIDER_LABEL } from "@/lib/site-config";

const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      {/* pb-28 su mobile: lascia spazio alla barra CTA fissa della pagina prodotto
          (md:hidden), che altrimenti coprirebbe l'ultima riga del footer a fine scroll */}
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-16 md:px-10 md:pb-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <div className="font-serif text-xl italic">{SITE_NAME}</div>
            <p className="max-w-[26ch] text-sm leading-relaxed text-paper/60">
              Capi e accessori essenziali, pensati per durare.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-widest text-paper/40">Negozio</div>
            <Link href="/prodotti" className="text-sm text-paper/80 transition hover:text-accent">
              Catalogo
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/prodotti?categoria=${encodeURIComponent(category)}`}
                className="text-sm text-paper/80 transition hover:text-accent"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-widest text-paper/40">Assistenza</div>
            <Link href="/spedizioni" className="text-sm text-paper/80 transition hover:text-accent">
              Spedizioni
            </Link>
            <Link href="/resi-e-cambi" className="text-sm text-paper/80 transition hover:text-accent">
              Resi e cambi
            </Link>
            <Link href="/contatti" className="text-sm text-paper/80 transition hover:text-accent">
              Contatti
            </Link>
          </div>

          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <div className="text-[11px] uppercase tracking-widest text-paper/40">Novità</div>
            <p className="text-sm text-paper/60">
              Le nuove collezioni arrivano prima nel catalogo: dagli un&apos;occhiata.
            </p>
            <Link
              href="/prodotti"
              className="inline-flex w-fit items-center gap-2 border border-paper/20 px-4 py-2.5 text-[13px] uppercase tracking-wide text-paper transition hover:bg-paper/10"
            >
              Vai al catalogo
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-paper/40 md:flex-row md:items-center md:justify-between">
          <div>&copy; {new Date().getFullYear()} {SITE_NAME}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition hover:text-paper/70">
              Privacy
            </Link>
            <Link href="/termini-e-condizioni" className="transition hover:text-paper/70">
              Termini e condizioni
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-paper/70">
              Cookie Policy
            </Link>
          </div>
          <div>Pagamenti sicuri con {PAYMENT_PROVIDER_LABEL}</div>
        </div>
      </div>
    </footer>
  );
}

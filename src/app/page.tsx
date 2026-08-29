import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

const CATEGORIES = [
  { name: "Abbigliamento", image: "/catalogo/category-abbigliamento.jpg" },
  { name: "Scarpe", image: "/catalogo/category-scarpe.jpg" },
  { name: "Accessori", image: "/catalogo/category-accessori.jpg" },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function HomePage() {
  const realProducts = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { variants: true },
  });

  // Finché il catalogo reale è vuoto, la homepage mostra prodotti dimostrativi
  // (nessuna scrittura sul DB) così la demo non appare vuota.
  const featured = realProducts.length > 0 ? realProducts.slice(0, 4) : DEMO_PRODUCTS.slice(0, 4);

  return (
    <div>
      <Hero />

      {/* 2. Categorie — sezioni editoriali, non semplici card */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-serif text-2xl text-ink md:text-3xl">Fai la tua scelta</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {CATEGORIES.map((category, index) => (
              <RevealItem key={category.name} delay={index * 0.08}>
                <Link
                  href={`/prodotti?categoria=${encodeURIComponent(category.name)}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-paper-alt"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-300 group-hover:from-ink/85" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <span className="font-serif text-2xl italic text-paper">{category.name}</span>
                    <span className="flex translate-y-2 items-center gap-2 text-[11px] uppercase tracking-widest text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Scopri
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 3. Sezione editoriale — asimmetrica, chiara */}
      <section className="border-y border-line bg-paper-alt">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <Reveal className="order-1 aspect-[4/5] overflow-hidden md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale */}
            <img src="/catalogo/editorial-1.jpg" alt="" className="h-full w-full object-cover" />
          </Reveal>
          <div className="order-2 flex flex-col justify-center gap-6 px-6 py-16 md:px-16 md:py-0">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">La bottega</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md font-serif text-3xl italic leading-snug text-ink md:text-4xl">
                Ogni pezzo scelto a mano, per chi non insegue le stagioni.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                Selezioniamo tessuti naturali e lavorazioni sartoriali, insieme a fornitori che
                condividono la stessa attenzione alla qualità e alla durata nel tempo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Prodotti in evidenza */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">In evidenza</h2>
            <Link
              href="/prodotti"
              className="text-[13px] uppercase tracking-wide text-ink-muted transition hover:text-accent"
            >
              Vedi tutti i prodotti
            </Link>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8">
            {featured.map((product, index) => (
              <RevealItem key={product.id} delay={index * 0.06}>
                <ProductCard product={product} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5. Sezione brand / filosofia — scura, forte contrasto, asimmetrica */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl md:grid-cols-[1fr_1.2fr]">
          <div className="order-2 flex flex-col justify-center gap-6 px-6 py-20 md:order-1 md:px-16 md:py-28">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">La nostra filosofia</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md font-serif text-3xl italic leading-snug md:text-4xl">
                Non vendiamo capi. Vestiamo identità.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-paper/60">
                Crediamo in un guardaroba essenziale: pochi capi, scelti bene, che raccontano chi li
                indossa — non nella quantità, ma nell&apos;intenzione.
              </p>
            </Reveal>
          </div>
          <Reveal className="order-1 aspect-[4/5] overflow-hidden border-paper/10 md:order-2 md:aspect-auto md:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale */}
            <img src="/catalogo/editorial-2.jpg" alt="" className="h-full w-full object-cover opacity-90" />
          </Reveal>
        </div>
      </section>

      {/* 6. CTA finale — scenografica, rosa */}
      <section className="relative overflow-hidden bg-accent px-6 py-28 text-center text-paper md:px-10 md:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/10 blur-[120px]" />
        <Reveal className="relative">
          <p className="text-[11px] uppercase tracking-[0.2em] text-paper/70">Prossima uscita</p>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto mt-4 max-w-2xl">
          <p className="font-serif text-4xl italic leading-tight md:text-5xl">
            Pronta per la tua prossima stagione?
          </p>
        </Reveal>
        <Reveal delay={0.2} className="relative mt-10 inline-block">
          <Link
            href="/prodotti"
            className="group inline-flex items-center gap-3 border border-paper px-8 py-3.5 text-[13px] uppercase tracking-wide transition-colors hover:bg-paper hover:text-accent"
          >
            Esplora il catalogo
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

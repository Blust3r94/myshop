import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import { ProductCard } from "@/components/ProductCard";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

const VALUES = [
  { title: "Spedizione in 48h", text: "Su tutti gli ordini in Italia" },
  { title: "Resi gratuiti", text: "Entro 30 giorni dall'acquisto" },
  { title: "Pagamento sicuro", text: "Checkout protetto con Stripe" },
];

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
      {/* Hero */}
      <div className="grid border-b border-line md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Collezione Autunno</div>
          <h1 className="max-w-md font-serif text-4xl leading-tight text-ink md:text-5xl">
            Vestire con intenzione, ogni giorno.
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-ink-muted">
            Capi e accessori essenziali, pensati per durare. Materiali scelti con cura, forme senza
            tempo.
          </p>
          <Link
            href="/prodotti"
            className="mt-2 inline-block w-fit bg-ink px-8 py-3.5 text-[13px] uppercase tracking-wide text-paper transition hover:bg-ink/90"
          >
            Scopri la collezione
          </Link>
        </div>
        <div className="flex min-h-[280px] items-center justify-center border-t border-line bg-paper-alt md:min-h-0 md:border-l md:border-t-0">
          <span className="text-[11px] uppercase tracking-widest text-ink-muted">Immagine editoriale</span>
        </div>
      </div>

      {/* Categorie */}
      <div className="border-b border-line px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-2xl text-ink md:text-3xl">Fai la tua scelta</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/prodotti?categoria=${encodeURIComponent(category)}`}
                className="group flex flex-col gap-4"
              >
                <div className="flex aspect-[4/5] items-center justify-center border border-line bg-paper-alt">
                  <span className="text-[11px] uppercase tracking-widest text-ink-muted">
                    Immagine categoria
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-ink">{category}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink transition group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* In evidenza */}
      <div className="border-b border-line px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">In evidenza</h2>
            <Link
              href="/prodotti"
              className="text-[13px] uppercase tracking-wide text-ink-muted transition hover:text-accent"
            >
              Vedi tutti i prodotti
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Value props */}
      <div className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="flex items-start gap-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="mt-0.5 flex-shrink-0 text-accent"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
              <div className="flex flex-col gap-1">
                <div className="text-[15px] text-ink">{value.title}</div>
                <div className="text-[13px] text-ink-muted">{value.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

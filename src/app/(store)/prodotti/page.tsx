import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import { ProductCard } from "@/components/ProductCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {
    searchParams: Promise<{ categoria?: string }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const categoria = searchParams.categoria;
  return {
    title: categoria ?? "Catalogo",
    description: categoria
      ? `Scopri i prodotti della categoria ${categoria} su MyShop.`
      : "Scopri tutta la collezione MyShop: capi e accessori essenziali, pensati per durare.",
  };
}

function pillClass(active: boolean) {
  return active
    ? "border border-accent bg-accent px-5 py-2 text-[13px] uppercase tracking-wide text-paper"
    : "border border-line px-5 py-2 text-[13px] uppercase tracking-wide text-ink-muted transition hover:border-ink hover:text-ink";
}

export default async function CatalogoPage(
  props: {
    searchParams: Promise<{ categoria?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const categoria = searchParams.categoria;

  const categoryRows = await prisma.product.findMany({
    where: { active: true },
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  // Finché il catalogo reale è vuoto, il catalogo mostra prodotti dimostrativi
  // (nessuna scrittura sul DB) così la demo non appare vuota.
  const useDemo = categoryRows.length === 0;

  const categories = useDemo
    ? Array.from(new Set(DEMO_PRODUCTS.map((p) => p.category))).sort()
    : categoryRows.map((row) => row.category);

  const products = useDemo
    ? DEMO_PRODUCTS.filter((p) => !categoria || p.category === categoria)
    : await prisma.product.findMany({
        where: {
          active: true,
          ...(categoria ? { category: categoria } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: { variants: true },
      });

  return (
    <div>
      <div className="relative overflow-hidden bg-ink px-6 py-20 text-paper md:px-10 md:py-28 lg:px-16">
        {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale, sfondo attenuato */}
        <img
          src="/catalogo/editorial-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Catalogo</p>
          <h1 className="mt-3 font-serif text-4xl italic md:text-5xl">
            {categoria ?? "Tutta la collezione"}
          </h1>
        </div>
      </div>

      <div className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href="/prodotti" className={pillClass(!categoria)}>
                Tutti
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/prodotti?categoria=${encodeURIComponent(category)}`}
                  className={pillClass(category === categoria)}
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="text-[13px] text-ink-muted">{products.length} prodotti</div>
          </div>

          {products.length === 0 ? (
            <p className="mt-16 text-ink-muted">
              {categoria
                ? `Nessun prodotto trovato nella categoria "${categoria}".`
                : "Nessun prodotto disponibile al momento."}
            </p>
          ) : (
            <RevealGroup className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8">
              {products.map((product, index) => (
                <RevealItem key={product.id} delay={Math.min(index, 7) * 0.06}>
                  <ProductCard product={product} size="tall" />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </div>
    </div>
  );
}

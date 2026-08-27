import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import { ProductCard } from "@/components/ProductCard";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

function pillClass(active: boolean) {
  return active
    ? "border border-ink bg-ink px-5 py-2 text-[13px] uppercase tracking-wide text-paper"
    : "border border-line px-5 py-2 text-[13px] uppercase tracking-wide text-ink-muted transition hover:border-ink hover:text-ink";
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
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
    <div className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl text-ink md:text-4xl">{categoria ?? "Catalogo"}</h1>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
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
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

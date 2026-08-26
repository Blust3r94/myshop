import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { variants: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">In evidenza</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Nessun prodotto disponibile al momento.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const prices = product.variants.map((v) => v.priceCents);
            const minPrice = prices.length > 0 ? Math.min(...prices) : null;
            return (
              <Link key={product.id} href={`/prodotti/${product.slug}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">{product.name}</p>
                {minPrice !== null && (
                  <p className="text-sm text-gray-500">a partire da {formatPrice(minPrice)}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

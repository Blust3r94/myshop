import Link from "next/link";
import { minPriceCents } from "@/lib/demo-catalog";

export function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

type CardProduct = {
  slug: string;
  name: string;
  category: string;
  images: string[];
  variants: { priceCents: number }[];
};

export function ProductCard({ product }: { product: CardProduct }) {
  const price = minPriceCents(product.variants);

  return (
    <Link href={`/prodotti/${product.slug}`} className="group block">
      <div className="flex aspect-square items-center justify-center overflow-hidden border border-line bg-paper-alt">
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="px-4 text-center text-[11px] uppercase tracking-widest text-ink-muted">
            Immagine prodotto
          </span>
        )}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-widest text-ink-muted">{product.category}</div>
      <div className="mt-1 text-[15px] text-ink">{product.name}</div>
      {price !== null && (
        <div className="mt-1 text-sm text-ink">a partire da {formatPrice(price)}</div>
      )}
    </Link>
  );
}

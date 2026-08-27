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
  badge?: string;
};

export function ProductCard({
  product,
  size = "normal",
}: {
  product: CardProduct;
  size?: "normal" | "tall";
}) {
  const price = minPriceCents(product.variants);

  return (
    <Link href={`/prodotti/${product.slug}`} className="group block">
      <div
        className={`relative flex items-center justify-center overflow-hidden border border-line bg-paper-alt ${
          size === "tall" ? "aspect-[3/4.4]" : "aspect-[4/5]"
        }`}
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest text-paper">
            {product.badge}
          </span>
        )}

        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="px-4 text-center text-[11px] uppercase tracking-widest text-ink-muted">
            Immagine prodotto
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-ink py-3 text-[11px] uppercase tracking-widest text-paper transition-transform duration-300 ease-out group-hover:translate-y-0">
          Scopri il prodotto
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">{product.category}</div>
          <div className="mt-1 font-serif text-lg text-ink">{product.name}</div>
        </div>
        {price !== null && (
          <div className="whitespace-nowrap pt-0.5 text-sm text-ink">{formatPrice(price)}</div>
        )}
      </div>
    </Link>
  );
}

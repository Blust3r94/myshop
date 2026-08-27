import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { findDemoProduct } from "@/lib/demo-catalog";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductVariantSelector } from "@/components/ProductVariantSelector";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const realProduct = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { variants: true },
  });

  if (realProduct && !realProduct.active) {
    notFound();
  }

  // Finché il catalogo reale è vuoto, uno slug dimostrativo mostra un prodotto
  // di esempio (nessuna scrittura sul DB) così le pagine prodotto sono
  // navigabili in una demo dal vivo.
  const product = realProduct ?? findDemoProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:px-10 md:py-16 lg:px-16">
      <ProductGallery images={product.images} alt={product.name} />
      <div>
        <p className="text-[11px] uppercase tracking-widest text-ink-muted">{product.category}</p>
        <h1 className="mt-2 font-serif text-3xl text-ink md:text-4xl">{product.name}</h1>
        <ProductVariantSelector
          productId={product.id}
          productName={product.name}
          image={product.images[0] ?? ""}
          variants={product.variants}
        />
        <p className="mt-10 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
          {product.description}
        </p>
      </div>
    </div>
  );
}

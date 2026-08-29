import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS, findDemoProduct } from "@/lib/demo-catalog";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductVariantSelector } from "@/components/ProductVariantSelector";
import { ProductCard } from "@/components/ProductCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

// cache() deduplica la query tra generateMetadata e il componente pagina
// (entrambi girano per la stessa request, altrimenti interrogherebbero il DB due volte).
const getProduct = cache(async (slug: string) => {
  const realProduct = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (realProduct && !realProduct.active) {
    return null;
  }

  // Finché il catalogo reale è vuoto, uno slug dimostrativo mostra un prodotto
  // di esempio (nessuna scrittura sul DB) così le pagine prodotto sono
  // navigabili in una demo dal vivo.
  return { realProduct, product: realProduct ?? findDemoProduct(slug) };
});

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const data = await getProduct(params.slug);
  const product = data?.product;
  if (!product) return {};

  const description = product.description.slice(0, 155);
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = await getProduct(params.slug);
  const realProduct = data?.realProduct ?? null;
  const product = data?.product;

  if (!product) {
    notFound();
  }

  const related = realProduct
    ? await prisma.product.findMany({
        where: { active: true, slug: { not: params.slug } },
        orderBy: { createdAt: "desc" },
        take: 4,
        include: { variants: true },
      })
    : DEMO_PRODUCTS.filter((p) => p.slug !== params.slug).slice(0, 4);

  return (
    <>
      <div className={`pt-10 md:pt-14 ${related.length === 0 ? "pb-24 md:pb-0" : ""}`}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:px-16">
          <ProductGallery images={product.images} alt={product.name} />
          <div>
            <p className="text-[11px] uppercase tracking-widest text-ink-muted">{product.category}</p>
            <h1 className="mt-2 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {product.name}
            </h1>
            <ProductVariantSelector
              productId={product.id}
              productName={product.name}
              image={product.images[0] ?? ""}
              variants={product.variants}
            />
            <p className="mt-10 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
              {product.description}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-accent">
                  <rect x="1" y="7" width="15" height="10" rx="1" />
                  <path d="M16 10h3l3 3v4h-6z" />
                  <circle cx="6" cy="19" r="1.5" />
                  <circle cx="17.5" cy="19" r="1.5" />
                </svg>
                <div>
                  <p className="text-[13px] text-ink">Spedizione in 48h</p>
                  <p className="text-[12px] text-ink-muted">Su tutti gli ordini in Italia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-accent">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <polyline points="3 4 3 9 8 9" />
                </svg>
                <div>
                  <p className="text-[13px] text-ink">Resi gratuiti</p>
                  <p className="text-[12px] text-ink-muted">Entro 30 giorni dall&apos;acquisto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-alt px-6 pb-24 pt-20 md:px-10 md:pb-20 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">Potrebbe piacerti anche</h2>
            <RevealGroup className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {related.map((item, index) => (
                <RevealItem key={item.id} delay={index * 0.06}>
                  <ProductCard product={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}

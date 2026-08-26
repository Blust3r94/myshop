import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductVariantSelector } from "@/components/ProductVariantSelector";

// Dati sempre freschi (stock/disponibilità cambiano di continuo): niente prerender statico.
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { variants: true },
  });

  if (!product || !product.active) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-2">
      <ProductGallery images={product.images} alt={product.name} />
      <div>
        <p className="text-sm text-gray-500">{product.category}</p>
        <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
        <ProductVariantSelector
          productId={product.id}
          productName={product.name}
          image={product.images[0] ?? ""}
          variants={product.variants}
        />
        <p className="mt-8 whitespace-pre-line text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}

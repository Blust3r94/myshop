import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";
import { updateProduct, upsertVariant, deleteVariant } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function ModificaProdottoPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { variants: { orderBy: { size: "asc" } } },
  });

  if (!product) {
    notFound();
  }

  const error = searchParams.error;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <AdminNav />

      <h1 className="mt-6 text-2xl font-bold">Modifica prodotto</h1>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <form action={updateProduct.bind(null, product.id)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={product.name}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={product.slug}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoria</label>
          <input
            type="text"
            name="category"
            required
            defaultValue={product.category}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descrizione</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={product.description}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Immagini (una URL per riga)</label>
          <textarea
            name="images"
            rows={3}
            defaultValue={product.images.join("\n")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={product.active}
            className="h-4 w-4"
          />
          <label htmlFor="active" className="text-sm">
            Attivo (visibile sul sito)
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
        >
          Salva prodotto
        </button>
      </form>

      <h2 className="mt-10 text-xl font-bold">Varianti</h2>

      <div className="mt-4 space-y-4">
        {product.variants.map((variant) => (
          <form
            key={variant.id}
            action={upsertVariant.bind(null, product.id, variant.id)}
            className="grid grid-cols-2 gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-5"
          >
            <div>
              <label className="block text-xs text-gray-500">Taglia</label>
              <input
                type="text"
                name="size"
                required
                defaultValue={variant.size}
                className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Colore</label>
              <input
                type="text"
                name="color"
                defaultValue={variant.color ?? ""}
                className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">SKU</label>
              <input
                type="text"
                name="sku"
                required
                defaultValue={variant.sku}
                className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Prezzo (€)</label>
              <input
                type="text"
                name="priceEuro"
                required
                defaultValue={(variant.priceCents / 100).toFixed(2)}
                className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Stock</label>
              <input
                type="text"
                name="stock"
                required
                defaultValue={variant.stock}
                className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div className="col-span-2 flex gap-2 sm:col-span-5">
              <button
                type="submit"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              >
                Salva variante
              </button>
              <button
                type="submit"
                formAction={deleteVariant.bind(null, product.id, variant.id)}
                className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600"
              >
                Elimina
              </button>
            </div>
          </form>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold">Aggiungi variante</h3>
      <form
        action={upsertVariant.bind(null, product.id, null)}
        className="mt-3 grid grid-cols-2 gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-5"
      >
        <div>
          <label className="block text-xs text-gray-500">Taglia</label>
          <input
            type="text"
            name="size"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Colore</label>
          <input
            type="text"
            name="color"
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">SKU</label>
          <input
            type="text"
            name="sku"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Prezzo (€)</label>
          <input
            type="text"
            name="priceEuro"
            required
            placeholder="19.99"
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Stock</label>
          <input
            type="text"
            name="stock"
            required
            placeholder="0"
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div className="col-span-2 sm:col-span-5">
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Aggiungi variante
          </button>
        </div>
      </form>
    </div>
  );
}

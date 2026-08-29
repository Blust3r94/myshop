import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";
import { updateProduct, upsertVariant, deleteVariant } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function ModificaProdottoPage(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ error?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { variants: { orderBy: { size: "asc" } } },
  });

  if (!product) {
    notFound();
  }

  const error = searchParams.error;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <AdminNav />

      <h1 className="mt-8 font-serif text-2xl text-ink">Modifica prodotto</h1>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <form action={updateProduct.bind(null, product.id)} className="mt-8 space-y-5">
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Nome</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={product.name}
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Slug</label>
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={product.slug}
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Categoria</label>
          <input
            type="text"
            name="category"
            required
            defaultValue={product.category}
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Descrizione</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={product.description}
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">
            Immagini (una URL per riga)
          </label>
          <textarea
            name="images"
            rows={3}
            defaultValue={product.images.join("\n")}
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={product.active}
            className="h-4 w-4 accent-accent"
          />
          <label htmlFor="active" className="text-sm text-ink">
            Attivo (visibile sul sito)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-accent px-4 py-3 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep"
        >
          Salva prodotto
        </button>
      </form>

      <h2 className="mt-12 font-serif text-xl text-ink">Varianti</h2>

      <div className="mt-4 space-y-4">
        {product.variants.map((variant) => (
          <form
            key={variant.id}
            action={upsertVariant.bind(null, product.id, variant.id)}
            className="grid grid-cols-2 gap-3 border border-line p-4 sm:grid-cols-5"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Taglia</label>
              <input
                type="text"
                name="size"
                required
                defaultValue={variant.size}
                className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Colore</label>
              <input
                type="text"
                name="color"
                defaultValue={variant.color ?? ""}
                className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wide text-ink-muted">SKU</label>
              <input
                type="text"
                name="sku"
                required
                defaultValue={variant.sku}
                className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Prezzo (€)</label>
              <input
                type="text"
                name="priceEuro"
                required
                defaultValue={(variant.priceCents / 100).toFixed(2)}
                className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Stock</label>
              <input
                type="text"
                name="stock"
                required
                defaultValue={variant.stock}
                className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div className="col-span-2 flex gap-2 sm:col-span-5">
              <button
                type="submit"
                className="border border-line px-3 py-1.5 text-[13px] uppercase tracking-wide text-ink transition hover:border-ink"
              >
                Salva variante
              </button>
              <button
                type="submit"
                formAction={deleteVariant.bind(null, product.id, variant.id)}
                className="border border-accent/40 px-3 py-1.5 text-[13px] uppercase tracking-wide text-accent transition hover:border-accent"
              >
                Elimina
              </button>
            </div>
          </form>
        ))}
      </div>

      <h3 className="mt-8 text-[13px] uppercase tracking-wide text-ink-muted">Aggiungi variante</h3>
      <form
        action={upsertVariant.bind(null, product.id, null)}
        className="mt-3 grid grid-cols-2 gap-3 border border-line p-4 sm:grid-cols-5"
      >
        <div>
          <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Taglia</label>
          <input
            type="text"
            name="size"
            required
            className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Colore</label>
          <input
            type="text"
            name="color"
            className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wide text-ink-muted">SKU</label>
          <input
            type="text"
            name="sku"
            required
            className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Prezzo (€)</label>
          <input
            type="text"
            name="priceEuro"
            required
            placeholder="19.99"
            className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wide text-ink-muted">Stock</label>
          <input
            type="text"
            name="stock"
            required
            placeholder="0"
            className="mt-1 w-full border border-line bg-transparent px-2 py-1.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div className="col-span-2 sm:col-span-5">
          <button
            type="submit"
            className="bg-accent px-4 py-2 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep"
          >
            Aggiungi variante
          </button>
        </div>
      </form>
    </div>
  );
}

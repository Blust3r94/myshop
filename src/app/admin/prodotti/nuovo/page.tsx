import { AdminNav } from "@/components/AdminNav";
import { createProduct } from "@/lib/admin-actions";

export default async function NuovoProdottoPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <AdminNav />

      <h1 className="mt-8 font-serif text-2xl text-ink">Nuovo prodotto</h1>

      <form action={createProduct} className="mt-8 space-y-5">
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Nome</label>
          <input
            type="text"
            name="name"
            required
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
            placeholder="es. maglietta-blu"
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Categoria</label>
          <input
            type="text"
            name="category"
            required
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] uppercase tracking-wide text-ink-muted">Descrizione</label>
          <textarea
            name="description"
            required
            rows={4}
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
            placeholder="https://..."
            className="mt-1.5 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="active" id="active" defaultChecked className="h-4 w-4 accent-accent" />
          <label htmlFor="active" className="text-sm text-ink">
            Attivo (visibile sul sito)
          </label>
        </div>

        {searchParams.error && <p className="text-sm text-accent">{searchParams.error}</p>}

        <button
          type="submit"
          className="w-full bg-accent px-4 py-3 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep"
        >
          Crea prodotto
        </button>
      </form>
    </div>
  );
}

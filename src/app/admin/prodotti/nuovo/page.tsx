import { AdminNav } from "@/components/AdminNav";
import { createProduct } from "@/lib/admin-actions";

export default function NuovoProdottoPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <AdminNav />

      <h1 className="mt-6 text-2xl font-bold">Nuovo prodotto</h1>

      <form action={createProduct} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            required
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
            placeholder="es. maglietta-blu"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoria</label>
          <input
            type="text"
            name="category"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descrizione</label>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Immagini (una URL per riga)</label>
          <textarea
            name="images"
            rows={3}
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="active" id="active" defaultChecked className="h-4 w-4" />
          <label htmlFor="active" className="text-sm">
            Attivo (visibile sul sito)
          </label>
        </div>

        {searchParams.error && <p className="text-sm text-red-600">{searchParams.error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
        >
          Crea prodotto
        </button>
      </form>
    </div>
  );
}

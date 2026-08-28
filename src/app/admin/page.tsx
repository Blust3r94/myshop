import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { variants: true },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <AdminNav />

      <div className="mt-8 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Prodotti</h1>
        <Link
          href="/admin/prodotti/nuovo"
          className="bg-accent px-4 py-2.5 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep"
        >
          + Nuovo prodotto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-6 text-ink-muted">Nessun prodotto ancora.</p>
      ) : (
        <table className="mt-8 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-widest text-ink-muted">
              <th className="py-2 font-medium">Nome</th>
              <th className="py-2 font-medium">Categoria</th>
              <th className="py-2 font-medium">Varianti</th>
              <th className="py-2 font-medium">Stato</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line text-ink">
                <td className="py-3">{product.name}</td>
                <td className="py-3 text-ink-muted">{product.category}</td>
                <td className="py-3 text-ink-muted">{product.variants.length}</td>
                <td className="py-3 text-ink-muted">{product.active ? "Attivo" : "Non attivo"}</td>
                <td className="py-3 text-right">
                  <Link
                    href={`/admin/prodotti/${product.id}`}
                    className="text-[13px] uppercase tracking-wide text-ink underline underline-offset-4 transition hover:text-accent"
                  >
                    Modifica
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

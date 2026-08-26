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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <AdminNav />

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Prodotti</h1>
        <Link
          href="/admin/prodotti/nuovo"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuovo prodotto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-6 text-gray-500">Nessun prodotto ancora.</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2 font-medium">Nome</th>
              <th className="py-2 font-medium">Categoria</th>
              <th className="py-2 font-medium">Varianti</th>
              <th className="py-2 font-medium">Stato</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100">
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.category}</td>
                <td className="py-2">{product.variants.length}</td>
                <td className="py-2">{product.active ? "Attivo" : "Non attivo"}</td>
                <td className="py-2 text-right">
                  <Link href={`/admin/prodotti/${product.id}`} className="underline">
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

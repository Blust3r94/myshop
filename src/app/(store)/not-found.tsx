import Link from "next/link";

// Necessario perché notFound() (usato da /prodotti/[slug]) risolva qui invece
// che al not-found di default a livello di root layout, restando così
// avvolto da Header/Footer del negozio come prima della separazione da /admin.
export default function StoreNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-10">
      <h1 className="font-serif text-2xl text-ink md:text-3xl">Pagina non trovata</h1>
      <p className="mt-4 text-ink-muted">
        <Link href="/prodotti" className="text-ink underline underline-offset-4">
          Torna al catalogo
        </Link>
        .
      </p>
    </div>
  );
}

import Link from "next/link";

// Placeholder finché il catalogo (step 3) non fornisce le categorie reali dal DB.
const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          MyShop
        </Link>
        <nav className="flex gap-6 text-sm">
          {CATEGORIES.map((category) => (
            <Link key={category} href={`/prodotti?categoria=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </nav>
        <Link href="/carrello" className="text-sm font-medium">
          Carrello
        </Link>
      </div>
    </header>
  );
}

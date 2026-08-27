"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

// Placeholder finché il catalogo non fornisce le categorie reali dal DB
// (collegarlo qui accoppierebbe ogni pagina del sito a una query DB nel layout globale).
const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Il conteggio del carrello vive solo in localStorage (Zustand persist):
  // mostrato solo dopo il mount per evitare mismatch di idratazione SSR/client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-serif text-xl text-ink">
          MyShop
        </Link>

        <nav className="hidden gap-10 text-[13px] uppercase tracking-wide text-ink md:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/prodotti?categoria=${encodeURIComponent(category)}`}
              className="transition hover:text-accent"
            >
              {category}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button type="button" aria-label="Cerca" className="hidden text-ink md:inline-flex">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link href="/carrello" aria-label="Carrello" className="relative inline-flex text-ink">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {mounted && itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-paper">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
            className="inline-flex text-ink md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col border-t border-line px-6 py-2 md:hidden">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/prodotti?categoria=${encodeURIComponent(category)}`}
              className="border-b border-line py-4 text-sm uppercase tracking-wide text-ink last:border-b-0"
              onClick={() => setMobileOpen(false)}
            >
              {category}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

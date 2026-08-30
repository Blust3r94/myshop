"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { SITE_NAME } from "@/lib/site-config";

// Placeholder finché il catalogo non fornisce le categorie reali dal DB
// (collegarlo qui accoppierebbe ogni pagina del sito a una query DB nel layout globale).
const CATEGORIES = ["Abbigliamento", "Scarpe", "Accessori"];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Solo in homepage l'header galleggia trasparente sull'hero scura e
  // diventa solido allo scroll; sulle altre pagine è sempre solido.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overlay = isHome && !scrolled;

  const [mobileOpen, setMobileOpen] = useState(false);

  // Il conteggio del carrello vive solo in localStorage (Zustand persist):
  // mostrato solo dopo il mount per evitare mismatch di idratazione SSR/client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full border-b transition-colors duration-500 ${
        overlay
          ? "border-transparent bg-transparent text-paper"
          : "border-line bg-paper/95 text-ink shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-serif text-2xl italic">
          {SITE_NAME}
        </Link>

        <nav className="hidden gap-10 text-[13px] uppercase tracking-wide md:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/prodotti?categoria=${encodeURIComponent(category)}`}
              className="group relative pb-1"
            >
              {category}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  overlay ? "bg-paper" : "bg-accent"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/carrello" aria-label="Carrello" className="relative inline-flex transition-opacity hover:opacity-70">
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
            className="inline-flex md:hidden"
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t md:hidden ${
              overlay ? "border-paper/15 bg-ink" : "border-line bg-paper"
            }`}
          >
            <div className="flex flex-col px-6 py-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/prodotti?categoria=${encodeURIComponent(category)}`}
                  className={`border-b py-4 text-sm uppercase tracking-wide last:border-b-0 ${
                    overlay ? "border-paper/10" : "border-line"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

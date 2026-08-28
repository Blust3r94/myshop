"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/components/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

export default function CarrelloPage() {
  // Il carrello vive solo in localStorage (Zustand persist): evita il mismatch
  // di idratazione SSR/client renderizzando il contenuto solo dopo il mount.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalCents = useCartStore((state) => state.totalCents());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Impossibile completare il checkout. Riprova.");
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError("Impossibile completare il checkout. Riprova.");
      }
    } catch {
      setError("Impossibile completare il checkout. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  if (!hasMounted) {
    return <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16" />;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
      <Reveal>
        <h1 className="font-serif text-3xl text-ink md:text-4xl">Carrello</h1>
      </Reveal>

      {items.length === 0 ? (
        <p className="mt-8 text-ink-muted">
          Il carrello è vuoto.{" "}
          <Link href="/prodotti" className="text-ink underline underline-offset-4">
            Vai al catalogo
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <ul>
            {items.map((item) => (
              <li
                key={item.variantId}
                className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center"
              >
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden border border-line bg-paper-alt">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-2 text-center text-[9px] uppercase tracking-widest text-ink-muted">
                      Immagine
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] text-ink">{item.name}</p>
                  <p className="text-[13px] text-ink-muted">
                    {item.size}
                    {item.color ? ` · ${item.color}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-ink">{formatPrice(item.priceCents)}</p>
                </div>
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="flex items-center gap-3 border border-line px-3 py-2 transition-colors hover:border-ink">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                      aria-label="Diminuisci quantità"
                      className="text-ink transition-colors hover:text-accent"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <span className="w-4 text-center text-sm text-ink">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      aria-label="Aumenta quantità"
                      className="text-ink transition-colors hover:text-accent"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <p className="w-20 text-right text-[15px] text-ink">
                    {formatPrice(item.priceCents * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    aria-label="Rimuovi dal carrello"
                    className="text-ink-muted transition hover:text-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex h-fit flex-col gap-5 border border-line p-6">
            <p className="text-[15px] text-ink">Riepilogo ordine</p>
            <div className="flex items-center justify-between text-sm text-ink-muted">
              <span>Subtotale</span>
              <span>{formatPrice(totalCents)}</span>
            </div>
            <p className="text-[13px] text-ink-muted">Spedizione calcolata al pagamento.</p>
            <div className="h-px bg-line" />
            <div className="flex items-center justify-between text-lg text-ink">
              <span>Totale</span>
              <span>{formatPrice(totalCents)}</span>
            </div>

            {error && <p className="text-sm text-accent">{error}</p>}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="mt-1 w-full bg-accent px-4 py-3.5 text-[13px] uppercase tracking-wide text-paper transition hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Reindirizzamento a Stripe..." : "Vai al pagamento"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

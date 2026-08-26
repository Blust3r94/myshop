"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

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
      if (!res.ok) {
        setError("Impossibile completare il checkout. Riprova.");
        return;
      }
      const data = await res.json();
      if (data.url) {
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
    return <div className="mx-auto max-w-3xl px-4 py-8" />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Carrello</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Il carrello è vuoto.{" "}
          <Link href="/prodotti" className="underline">
            Vai al catalogo
          </Link>
          .
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.variantId} className="flex items-center gap-4 py-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.size}
                    {item.color ? ` · ${item.color}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">{formatPrice(item.priceCents)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                    className="h-7 w-7 rounded border border-gray-300 text-sm"
                    aria-label="Diminuisci quantità"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="h-7 w-7 rounded border border-gray-300 text-sm"
                    aria-label="Aumenta quantità"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right text-sm font-medium">
                  {formatPrice(item.priceCents * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="text-sm text-gray-400 hover:text-red-600"
                  aria-label="Rimuovi dal carrello"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
            <p className="text-base font-semibold">Totale</p>
            <p className="text-base font-semibold">{formatPrice(totalCents)}</p>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Reindirizzamento a Stripe..." : "Vai al pagamento"}
          </button>
        </>
      )}
    </div>
  );
}

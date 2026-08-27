"use client";

import { useMemo, useState } from "react";
import type { DemoVariant } from "@/lib/demo-catalog";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/components/ProductCard";

export function ProductVariantSelector({
  productId,
  productName,
  image,
  variants,
}: {
  productId: string;
  productName: string;
  image: string;
  variants: DemoVariant[];
}) {
  const addItem = useCartStore((state) => state.addItem);

  const sizes = useMemo(() => Array.from(new Set(variants.map((v) => v.size))), [variants]);
  const hasColors = variants.some((v) => v.color);

  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const colorsForSize = useMemo(
    () =>
      hasColors
        ? Array.from(
            new Set(
              variants
                .filter((v) => v.size === selectedSize)
                .map((v) => v.color)
                .filter((c): c is string => Boolean(c))
            )
          )
        : [],
    [variants, selectedSize, hasColors]
  );

  const selectedVariant = variants.find(
    (v) => v.size === selectedSize && (hasColors ? v.color === selectedColor : true)
  );

  function handleSizeChange(size: string) {
    setSelectedSize(size);
    setSelectedColor(null);
    setJustAdded(false);
  }

  function handleColorChange(color: string) {
    setSelectedColor(color);
    setJustAdded(false);
  }

  function handleAddToCart() {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem({
      variantId: selectedVariant.id,
      productId,
      name: productName,
      size: selectedVariant.size,
      color: selectedVariant.color ?? undefined,
      priceCents: selectedVariant.priceCents,
      quantity: 1,
      image,
    });
    setJustAdded(true);
  }

  if (variants.length === 0) {
    return <p className="mt-6 text-sm text-ink-muted">Prodotto momentaneamente non disponibile.</p>;
  }

  const priceCents = selectedVariant?.priceCents ?? Math.min(...variants.map((v) => v.priceCents));
  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : false;
  const needsColor = hasColors && !selectedColor;
  const disabled = !selectedVariant || outOfStock || needsColor;

  return (
    <div className="mt-6">
      <p className="font-serif text-2xl text-ink">{formatPrice(priceCents)}</p>

      <div className="mt-7">
        <p className="text-[13px] uppercase tracking-wide text-ink-muted">Taglia</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeChange(size)}
              className={`h-11 min-w-11 border px-3 text-sm transition-colors ${
                size === selectedSize
                  ? "border-accent bg-accent text-paper"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {hasColors && (
        <div className="mt-5">
          <p className="text-[13px] uppercase tracking-wide text-ink-muted">Colore</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {colorsForSize.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`h-11 border px-4 text-sm transition-colors ${
                  color === selectedColor
                    ? "border-accent bg-accent text-paper"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedVariant && outOfStock && (
        <p className="mt-4 text-sm text-accent">Esaurito in questa combinazione.</p>
      )}
      {selectedVariant && !outOfStock && (
        <p className="mt-4 flex items-center gap-2 text-[13px] text-success">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
          Disponibile — spedizione in 48h
        </p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
        className="mt-6 hidden w-full bg-accent px-4 py-3.5 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:bg-paper-alt disabled:text-ink-muted md:block"
      >
        Aggiungi al carrello
      </button>

      {justAdded && <p className="mt-3 hidden text-sm text-success md:block">Aggiunto al carrello.</p>}

      {/* Barra fissa mobile: la CTA resta sempre raggiungibile durante lo scroll della pagina prodotto */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-paper/95 px-6 py-3 backdrop-blur md:hidden">
        <div>
          <p className="text-sm text-ink">{formatPrice(priceCents)}</p>
          {justAdded && <p className="text-[11px] text-success">Aggiunto al carrello</p>}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={disabled}
          className="bg-accent px-6 py-3 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:bg-paper-alt disabled:text-ink-muted"
        >
          Aggiungi
        </button>
      </div>
    </div>
  );
}

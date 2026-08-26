"use client";

import { useMemo, useState } from "react";
import type { Variant } from "@prisma/client";
import { useCartStore } from "@/lib/cart-store";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

export function ProductVariantSelector({
  productId,
  productName,
  image,
  variants,
}: {
  productId: string;
  productName: string;
  image: string;
  variants: Variant[];
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
    return <p className="mt-4 text-sm text-gray-500">Prodotto momentaneamente non disponibile.</p>;
  }

  const priceCents = selectedVariant?.priceCents ?? Math.min(...variants.map((v) => v.priceCents));
  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : false;
  const needsColor = hasColors && !selectedColor;

  return (
    <div className="mt-4">
      <p className="text-xl font-semibold">{formatPrice(priceCents)}</p>

      <div className="mt-4">
        <p className="text-sm font-medium">Taglia</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeChange(size)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                size === selectedSize ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {hasColors && (
        <div className="mt-4">
          <p className="text-sm font-medium">Colore</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {colorsForSize.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  color === selectedColor ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedVariant && outOfStock && (
        <p className="mt-4 text-sm text-red-600">Esaurito in questa combinazione.</p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!selectedVariant || outOfStock || needsColor}
        className="mt-6 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Aggiungi al carrello
      </button>

      {justAdded && <p className="mt-2 text-sm text-green-600">Aggiunto al carrello.</p>}
    </div>
  );
}

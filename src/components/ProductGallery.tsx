"use client";

import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5]">
        <div className="absolute -right-3 -top-3 hidden h-full w-full border border-accent/40 md:block" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-line bg-paper-alt">
          {images[selected] ? (
            // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
            <img src={images[selected]} alt={alt} className="h-full w-full object-cover" />
          ) : (
            <span className="text-[11px] uppercase tracking-widest text-ink-muted">Immagine prodotto</span>
          )}
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              className={`h-16 w-16 overflow-hidden border transition-colors ${
                index === selected ? "border-accent" : "border-line hover:border-ink-muted"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini */}
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

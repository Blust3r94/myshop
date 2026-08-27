"use client";

import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex aspect-square items-center justify-center overflow-hidden border border-line bg-paper-alt">
        {images[selected] ? (
          // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
          <img src={images[selected]} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[11px] uppercase tracking-widest text-ink-muted">Immagine prodotto</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              className={`h-16 w-16 overflow-hidden border ${
                index === selected ? "border-ink" : "border-line"
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

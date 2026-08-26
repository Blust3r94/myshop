"use client";

import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        {images[selected] && (
          // eslint-disable-next-line @next/next/no-img-element -- immagini su storage esterno, no next/image senza configurare i domini
          <img src={images[selected]} alt={alt} className="h-full w-full object-cover" />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              className={`h-16 w-16 overflow-hidden rounded-md border ${
                index === selected ? "border-gray-900" : "border-gray-200"
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

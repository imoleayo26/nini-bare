"use client";

import { useState } from "react";
import type { CatalogImage } from "@/lib/catalog";

interface ProductGalleryProps {
  images: CatalogImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const sortedImages = [...images].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = sortedImages[selectedIndex];

  if (!selectedImage) {
    return (
      <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-nb-border bg-nb-blush">
        <div className="flex h-full items-center justify-center px-8 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nb-rose">
              Nini Bare
            </p>

            <p className="mt-3 text-sm text-nb-ink/50">
              Product image
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-nb-border bg-nb-blush">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          width={selectedImage.width}
          height={selectedImage.height}
          className="h-full w-full object-cover"
        />
      </div>

      {sortedImages.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {sortedImages.map((image, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${productName} image ${index + 1}`}
                aria-pressed={isSelected}
                className={`aspect-square overflow-hidden rounded-xl border bg-nb-blush transition ${
                  isSelected
                    ? "border-nb-berry ring-2 ring-nb-berry/20"
                    : "border-nb-border hover:border-nb-rose"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt || `${productName} thumbnail ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

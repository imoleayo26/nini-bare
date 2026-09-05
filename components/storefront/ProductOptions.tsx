"use client";

import { useState } from "react";
import type { ProductVariant } from "@/lib/catalog";

interface ProductOptionsProps {
  variants: ProductVariant[];
}

export default function ProductOptions({
  variants,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = variants.filter((variant) => variant.size);

  return (
    <>
      <div className="mt-8 border-t border-nb-border pt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-nb-berry">
            Size
          </p>

          {selectedSize && (
            <p className="text-xs font-medium text-nb-rose">
              Selected: {selectedSize}
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((variant) => {
            const size = variant.size!.value;
            const isSelected = selectedSize === size;
            const isAvailable = variant.availability === "in_stock";

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => {
                  if (isAvailable) {
                    setSelectedSize(size);
                  }
                }}
                disabled={!isAvailable}
                aria-pressed={isSelected}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  isSelected
                    ? "border-nb-berry bg-nb-berry text-white"
                    : isAvailable
                      ? "border-nb-border bg-white text-nb-ink hover:border-nb-rose hover:bg-nb-blush"
                      : "cursor-not-allowed border-nb-border bg-nb-blush text-nb-ink/30 line-through"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!selectedSize}
        className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-semibold transition sm:w-auto ${
          selectedSize
            ? "bg-nb-berry text-white hover:bg-nb-rose"
            : "cursor-not-allowed bg-nb-blush text-nb-ink/40"
        }`}
      >
        Add to cart
      </button>
    </>
  );
}

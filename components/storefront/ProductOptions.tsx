"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { createCartItemId } from "@/lib/cart";
import { useCart } from "@/components/cart/CartProvider";

interface ProductOptionsProps {
  product: Product;
}

export default function ProductOptions({
  product,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  const sizes = product.variants.filter(
    (variant) => variant.size,
  );

  const selectedVariant = product.variants.find(
    (variant) => variant.size?.value === selectedSize,
  );

  function handleAddToCart() {
    if (!selectedVariant || !selectedSize) {
      return;
    }

    const primaryImage = product.images
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)[0];

    addItem({
      id: createCartItemId(
        product.id,
        selectedVariant.id,
      ),
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: selectedVariant.id,
      sku: selectedVariant.sku,
      size: selectedVariant.size?.label,
      color: selectedVariant.color?.label,
      unitPrice:
        selectedVariant.price?.amount ?? product.price.amount,
      currency: "NGN",
      imageUrl: primaryImage?.url,
      imageAlt: primaryImage?.alt,
      quantity: 1,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

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
            const isAvailable =
              variant.availability === "in_stock";

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => {
                  if (isAvailable) {
                    setSelectedSize(size);
                    setAdded(false);
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
        disabled={!selectedVariant}
        onClick={handleAddToCart}
        className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-semibold transition sm:w-auto ${
          selectedVariant
            ? "bg-nb-berry text-white hover:bg-nb-rose"
            : "cursor-not-allowed bg-nb-blush text-nb-ink/40"
        }`}
      >
        {added ? "Added to bag ✓" : "Add to cart"}
      </button>
    </>
  );
}

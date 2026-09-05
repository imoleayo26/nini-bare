"use client";

import { use, useState } from "react";
import Header from "@/components/storefront/Header";

const products = {
  "essential-set": {
    name: "Essential Set",
    category: "Women",
    price: "₦18,000",
    description:
      "A simple everyday piece made for comfort, confidence, and effortless style.",
  },
  "everyday-essential": {
    name: "Everyday Essential",
    category: "Men",
    price: "₦22,000",
    description:
      "Clean, comfortable style designed for everyday living.",
  },
  "soft-lace-set": {
    name: "Soft Lace Set",
    category: "Lingerie",
    price: "₦16,000",
    description:
      "Elegant intimates with a soft, effortless feel.",
  },
  "classic-lounge-set": {
    name: "Classic Lounge Set",
    category: "Unisex",
    price: "₦25,000",
    description:
      "Relaxed everyday comfort with a polished finish.",
  },
};

type ProductSlug = keyof typeof products;

const sizes = ["S", "M", "L", "XL"] as const;
type Size = (typeof sizes)[number];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products[slug as ProductSlug];

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  if (!product) {
    return (
      <main className="min-h-screen bg-nb-white text-nb-ink">
        <Header />

        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
              Nini Bare
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-nb-berry">
              Piece not found.
            </h1>

            <a
              href="/shop"
              className="mt-6 inline-block rounded-full bg-nb-berry px-6 py-3 text-sm font-medium text-white transition hover:bg-nb-rose"
            >
              Back to shop
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <Header />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-16">
        <div>
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

          <div className="mt-4 grid grid-cols-4 gap-3">
            {sizes.map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl border border-nb-border bg-nb-blush"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-nb-berry sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-semibold text-nb-ink">
            {product.price}
          </p>

          <p className="mt-6 max-w-xl text-base leading-7 text-nb-ink/70">
            {product.description}
          </p>

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
              {sizes.map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-5 py-2.5 text-sm transition ${
                      isSelected
                        ? "border-nb-berry bg-nb-berry text-white"
                        : "border-nb-border bg-white text-nb-ink hover:border-nb-rose hover:bg-nb-blush"
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
            className="mt-8 w-full rounded-full bg-nb-berry px-6 py-4 text-sm font-semibold text-white transition hover:bg-nb-rose sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      </section>
    </main>
  );
}

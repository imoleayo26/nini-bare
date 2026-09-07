"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-nb-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-[0.12em] text-nb-berry"
        >
          NINI BARE
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="/shop"
            className="transition hover:text-nb-rose"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="transition hover:text-nb-rose"
          >
            Categories
          </Link>

          <Link
            href="/our-story"
            className="transition hover:text-nb-rose"
          >
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-sm transition hover:bg-nb-blush"
          >
            ⌕
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="rounded-full p-2 text-sm transition hover:bg-nb-blush"
          >
            ♡
          </button>

          <Link
            href="/cart"
            aria-label={`Shopping bag with ${itemCount} ${
              itemCount === 1 ? "item" : "items"
            }`}
            className="rounded-full bg-nb-berry px-4 py-2 text-xs font-semibold text-white transition hover:bg-nb-rose"
          >
            Bag{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
        </div>
      </div>
    </header>
  );
}

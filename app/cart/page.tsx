"use client";

import Link from "next/link";
import Header from "@/components/storefront/Header";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/catalog";

export default function CartPage() {
  const {
    cart,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
    hydrated,
  } = useCart();

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-nb-white text-nb-ink">
        <Header />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-center text-sm text-nb-ink/50">
            Loading your bag...
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        <div className="flex items-end justify-between gap-4 border-b border-nb-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
              Your selection
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Shopping Bag
            </h1>
          </div>

          {cart.items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-nb-rose transition hover:text-nb-berry"
            >
              Clear bag
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl">♡</p>

            <h2 className="mt-5 text-2xl font-semibold text-nb-berry">
              Your bag is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-nb-ink/60">
              Discover something you love and add it to your bag.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-full bg-nb-berry px-7 py-3 text-sm font-semibold text-white transition hover:bg-nb-rose"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-nb-border bg-white p-4 sm:gap-6"
                >
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-nb-blush sm:h-36 sm:w-28">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-nb-ink/40">
                        Nini Bare
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/shop/${item.productSlug}`}
                          className="font-semibold text-nb-berry transition hover:text-nb-rose"
                        >
                          {item.productName}
                        </Link>

                        <p className="mt-1 text-xs text-nb-ink/50">
                          {item.size
                            ? `Size: ${item.size}`
                            : "Standard size"}
                          {item.color
                            ? ` · ${item.color}`
                            : ""}
                        </p>

                        <p className="mt-2 text-sm font-medium text-nb-ink">
                          {formatMoney({
                            amount: item.unitPrice,
                            currency: item.currency,
                          })}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.productName} from bag`}
                        className="text-xs font-semibold text-nb-ink/40 transition hover:text-nb-rose"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="flex items-center rounded-full border border-nb-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                            )
                          }
                          aria-label={`Decrease quantity of ${item.productName}`}
                          className="px-3 py-2 text-sm transition hover:bg-nb-blush"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                            )
                          }
                          aria-label={`Increase quantity of ${item.productName}`}
                          className="px-3 py-2 text-sm transition hover:bg-nb-blush"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-nb-berry">
                        {formatMoney({
                          amount:
                            item.unitPrice * item.quantity,
                          currency: item.currency,
                        })}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-nb-border bg-nb-blush p-6">
              <h2 className="text-lg font-semibold text-nb-berry">
                Order summary
              </h2>

              <div className="mt-6 flex items-center justify-between border-b border-nb-border pb-4 text-sm">
                <span className="text-nb-ink/60">
                  Subtotal
                </span>

                <span className="font-semibold text-nb-ink">
                  {formatMoney({
                    amount: subtotal,
                    currency: "NGN",
                  })}
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-nb-ink/50">
                Delivery and payment details will be calculated
                during checkout.
              </p>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-nb-berry px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-nb-rose"
              >
                Continue to checkout
              </Link>

              <Link
                href="/shop"
                className="mt-4 block text-center text-xs font-semibold text-nb-rose transition hover:text-nb-berry"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

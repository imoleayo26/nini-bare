const products = [
  {
    name: "Essential Set",
    category: "Women",
    price: "₦18,000",
    description: "A simple everyday piece made for comfort.",
  },
  {
    name: "Everyday Essential",
    category: "Men",
    price: "₦22,000",
    description: "Clean, comfortable style for everyday living.",
  },
  {
    name: "Soft Lace Set",
    category: "Lingerie",
    price: "₦16,000",
    description: "Elegant intimates with a soft, effortless feel.",
  },
  {
    name: "Classic Lounge Set",
    category: "Unisex",
    price: "₦25,000",
    description: "Relaxed everyday comfort with a polished finish.",
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <header className="border-b border-nb-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-lg font-semibold tracking-[0.18em] text-nb-berry"
          >
            NINI BARE
          </a>

          <nav className="hidden gap-6 text-sm text-nb-ink sm:flex">
            <a href="/shop" className="font-medium text-nb-rose">
              Shop
            </a>
            <a href="/categories" className="hover:text-nb-rose">
              Categories
            </a>
            <a href="/our-story" className="hover:text-nb-rose">
              Our Story
            </a>
          </nav>

          <a
            href="/"
            className="rounded-full border border-nb-border px-4 py-2 text-sm hover:bg-nb-blush"
          >
            Home
          </a>
        </div>
      </header>

      <section className="bg-nb-blush px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            Nini Bare
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-nb-berry sm:text-5xl">
            Shop the collection.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-nb-ink/70">
            Discover modern fashion and lifestyle essentials selected for
            comfort, confidence, and everyday expression.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nb-gold">
              Collection
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-nb-berry">
              All pieces
            </h2>
          </div>

          <p className="text-sm text-nb-ink/60">
            {products.length} pieces
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-2xl border border-nb-border bg-white"
            >
              <div className="aspect-[4/5] bg-nb-blush" />

              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nb-rose">
                  {product.category}
                </p>

                <h3 className="mt-2 text-sm font-semibold text-nb-berry">
                  {product.name}
                </h3>

                <p className="mt-2 text-xs leading-5 text-nb-ink/60">
                  {product.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-nb-ink">
                  {product.price}
                </p>

                <button className="mt-4 w-full rounded-full bg-nb-berry px-4 py-2.5 text-xs font-medium text-white transition hover:bg-nb-rose">
                  View piece
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const categories = [
  {
    slug: "women",
    name: "Women",
    description:
      "Modern pieces designed for comfort, confidence, and everyday expression.",
  },
  {
    slug: "men",
    name: "Men",
    description:
      "Clean everyday essentials with an effortless, comfortable feel.",
  },
  {
    slug: "lingerie",
    name: "Lingerie",
    description:
      "Elegant intimates designed to feel soft, personal, and beautiful.",
  },
  {
    slug: "unisex",
    name: "Unisex",
    description:
      "Relaxed styles made to move naturally across wardrobes and personal style.",
  },
];

export default function CategoriesPage() {
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

          <a
            href="/shop"
            className="rounded-full border border-nb-border px-4 py-2 text-sm transition hover:bg-nb-blush"
          >
            Shop
          </a>
        </div>
      </header>

      <section className="bg-nb-blush px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            Nini Bare
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-nb-berry sm:text-5xl">
            Find your style.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-nb-ink/70">
            Explore our collections and discover pieces made for everyday
            confidence, comfort, and personal expression.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nb-gold">
            Collections
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-nb-berry">
            Shop by category
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group overflow-hidden rounded-3xl border border-nb-border bg-white transition hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="aspect-[4/5] bg-nb-blush">
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-nb-rose">
                    {category.name}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-nb-berry">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-nb-ink/60">
                  {category.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-nb-rose transition group-hover:text-nb-berry">
                  Explore collection →
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-nb-border bg-nb-berry px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold tracking-[0.2em]">
            NINI BARE
          </p>

          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            Modern fashion and lifestyle essentials designed for everyday
            confidence.
          </p>
        </div>
      </footer>
    </main>
  );
}

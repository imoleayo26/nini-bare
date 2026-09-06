import Header from "@/components/storefront/Header";
import { catalogRepository, formatMoney } from "@/lib/catalog";

export default async function Home() {
  const [categories, featuredProducts] = await Promise.all([
    catalogRepository.listCategories(),
    catalogRepository.listProducts({
      featured: true,
      publishedOnly: true,
    }),
  ]);

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      {/* Announcement */}
      <div className="bg-nb-berry px-4 py-2 text-center text-xs font-medium tracking-wide text-nb-blush">
        Welcome to Nini Bare — style made for everyday confidence.
      </div>

      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="bg-nb-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-nb-rose">
              Nini Bare
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-nb-berry sm:text-6xl lg:text-7xl">
              Everyday style,
              <br />
              beautifully made.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-nb-ink/70 sm:text-lg">
              Discover modern fashion and lifestyle essentials designed around
              comfort, confidence, and the way you live every day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/shop"
                className="rounded-full bg-nb-berry px-6 py-3 text-sm font-semibold text-white transition hover:bg-nb-rose"
              >
                Shop collection
              </a>

              <a
                href="/categories"
                className="rounded-full border border-nb-berry/20 bg-white px-6 py-3 text-sm font-semibold text-nb-berry transition hover:bg-nb-blush"
              >
                Explore categories
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-nb-berry p-8 shadow-sm sm:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-nb-gold/20 blur-3xl" />

            <div className="relative flex min-h-[360px] flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-nb-gold/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-nb-gold">
                  New collection
                </span>

                <h2 className="mt-8 max-w-sm text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Feel good.
                  <br />
                  Look good.
                  <br />
                  Be you.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-nb-blush/80">
                A growing collection of pieces selected for modern everyday
                living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Shop your way
            </h2>
          </div>

          <a
            href="/shop"
            className="text-sm font-semibold text-nb-rose hover:text-nb-berry"
          >
            View all products →
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`group min-h-64 rounded-3xl p-7 transition hover:-translate-y-1 ${
                index === 0
                  ? "bg-nb-blush"
                  : index === 1
                    ? "bg-nb-rose text-white"
                    : index === 2
                      ? "bg-nb-berry text-white"
                      : "bg-nb-gold text-nb-berry"
              }`}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">
                    {category.name}
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 opacity-75">
                    {category.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-nb-blush px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            Featured
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Your next favourite piece
            </h2>

            <p className="max-w-md text-sm leading-6 text-nb-ink/60">
              Discover selected pieces from the Nini Bare collection.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => {
              const primaryImage = [...product.images].sort(
                (a, b) => a.sortOrder - b.sortOrder,
              )[0];

              return (
                <a
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group overflow-hidden rounded-3xl border border-nb-border bg-white transition hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-nb-blush">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        width={primaryImage.width}
                        height={primaryImage.height}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nb-rose">
                            Nini Bare
                          </p>

                          <p className="mt-3 text-sm text-nb-ink/50">
                            Product image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nb-rose">
                      {product.categorySlugs[0]}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-nb-berry">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-base font-semibold text-nb-ink">
                      {formatMoney(product.price)}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-nb-rose transition group-hover:text-nb-berry">
                      View product →
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-gold">
          The Nini Bare feeling
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-nb-berry sm:text-5xl">
          Simple pieces. Personal style. Everyday confidence.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-nb-ink/65">
          Nini Bare is growing into a fashion and lifestyle destination where
          comfort meets expression — from everyday essentials to pieces that
          make you feel a little more like yourself.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-nb-berry px-5 py-10 text-nb-blush sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[0.12em] text-white">
              NINI BARE
            </p>

            <p className="mt-2 text-xs text-nb-blush/60">
              Modern fashion & lifestyle essentials.
            </p>
          </div>

          <p className="text-xs text-nb-blush/50">
            © {new Date().getFullYear()} Nini Bare. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

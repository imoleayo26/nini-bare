import Header from "@/components/storefront/Header";
import { catalogRepository, formatMoney } from "@/lib/catalog";

const categoryNames: Record<string, string> = {
  women: "Women",
  men: "Men",
  lingerie: "Lingerie",
  unisex: "Unisex",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const selectedCategory = category
    ? categoryNames[category.toLowerCase()]
    : undefined;

  const visibleProducts = await catalogRepository.listProducts({
    categorySlug: category?.toLowerCase(),
    publishedOnly: true,
  });

  const heading = selectedCategory
    ? `${selectedCategory} collection.`
    : "Shop the collection.";

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <Header />

      <section className="bg-nb-blush px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            Nini Bare
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-nb-berry sm:text-5xl">
            {heading}
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
              {selectedCategory ?? "All pieces"}
            </h2>
          </div>

          <p className="text-sm text-nb-ink/60">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-nb-border bg-white"
              >
                <div className="aspect-[4/5] bg-nb-blush" />

                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nb-rose">
                    {product.categorySlugs.join(" / ")}
                  </p>

                  <h3 className="mt-2 text-sm font-semibold text-nb-berry">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-nb-ink/60">
                    {product.shortDescription}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-nb-ink">
                    {formatMoney(product.price)}
                  </p>

                  <a
                    href={`/shop/${product.slug}`}
                    className="mt-4 block w-full rounded-full bg-nb-berry px-4 py-2.5 text-center text-xs font-medium text-white transition hover:bg-nb-rose"
                  >
                    View piece
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-nb-border bg-nb-blush px-6 py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nb-rose">
              Nini Bare
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-nb-berry">
              Collection coming soon.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-nb-ink/60">
              We are preparing pieces for this collection.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-block rounded-full bg-nb-berry px-6 py-3 text-sm font-medium text-white transition hover:bg-nb-rose"
            >
              View all pieces
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

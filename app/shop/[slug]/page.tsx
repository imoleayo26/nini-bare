import { notFound } from "next/navigation";
import Header from "@/components/storefront/Header";
import { catalogRepository, formatMoney } from "@/lib/catalog";
import ProductOptions from "@/components/storefront/ProductOptions";

const categoryNames: Record<string, string> = {
  women: "Women",
  men: "Men",
  lingerie: "Lingerie",
  unisex: "Unisex",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await catalogRepository.getProductBySlug(slug);

  if (!product || product.status !== "active") {
    notFound();
  }

  const category =
    product.categorySlugs
      .map((categorySlug) => categoryNames[categorySlug] ?? categorySlug)
      .join(" / ");

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
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl border border-nb-border bg-nb-blush"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            {category}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-nb-berry sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-semibold text-nb-ink">
            {formatMoney(product.price)}
          </p>

          <p className="mt-6 max-w-xl text-base leading-7 text-nb-ink/70">
            {product.description}
          </p>

          <ProductOptions variants={product.variants} />
        </div>
      </section>
    </main>
  );
}

import { notFound } from "next/navigation";
import Header from "@/components/storefront/Header";
import ProductGallery from "@/components/storefront/ProductGallery";
import ProductOptions from "@/components/storefront/ProductOptions";
import { catalogRepository, formatMoney } from "@/lib/catalog";

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

  const category = product.categorySlugs
    .map((categorySlug) => categoryNames[categorySlug] ?? categorySlug)
    .join(" / ");

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <Header />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-16">
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

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

          <ProductOptions product={product} />
        </div>
      </section>
    </main>
  );
}

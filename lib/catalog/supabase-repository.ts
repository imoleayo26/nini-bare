import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CatalogImage,
  Category,
  Product,
  ProductOptionValue,
  ProductStatus,
  ProductVariant,
} from "./types";
import type {
  CatalogRepository,
  ProductListQuery,
} from "./repository";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  status: ProductStatus;
  featured: boolean;
  price_minor: number;
  compare_at_price_minor: number | null;
  currency: "NGN";
  published_at: string | null;
};

type VariantRow = {
  id: string;
  product_id: string;
  sku: string;
  size: string | null;
  color: string | null;
  price_minor: number | null;
  compare_at_price_minor: number | null;
  active: boolean;
};

type ImageRow = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string;
  sort_order: number;
  image_role: string;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  sort_order: number;
};

type ProductCategoryRow = {
  product_id: string;
  category_id: string;
};

type VariantAvailabilityRow = {
  variant_id: string;
  availability: "in_stock" | "out_of_stock";
};

export class SupabaseCatalogRepository
  implements CatalogRepository
{
  constructor(private readonly supabase: SupabaseClient) {}

  async listCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select(
        "id, slug, name, description, image_url, image_alt, sort_order",
      )
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(
        `Unable to load categories: ${error.message}`,
      );
    }

    return (data as CategoryRow[]).map(mapCategory);
  }

  async getCategoryBySlug(
    slug: string,
  ): Promise<Category | null> {
    const { data, error } = await this.supabase
      .from("categories")
      .select(
        "id, slug, name, description, image_url, image_alt, sort_order",
      )
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      throw new Error(
        `Unable to load category: ${error.message}`,
      );
    }

    return data
      ? mapCategory(data as CategoryRow)
      : null;
  }

  async listProducts(
    query: ProductListQuery = {},
  ): Promise<Product[]> {
    let productQuery = this.supabase
      .from("products")
      .select(
        "id, slug, name, short_description, description, status, featured, price_minor, compare_at_price_minor, currency, published_at",
      )
      .order("created_at", { ascending: false });

    if (query.publishedOnly) {
      productQuery = productQuery.eq("status", "active");
    }

    if (query.featured !== undefined) {
      productQuery = productQuery.eq(
        "featured",
        query.featured,
      );
    }

    const { data, error } = await productQuery;

    if (error) {
      throw new Error(
        `Unable to load products: ${error.message}`,
      );
    }

    let products = await this.loadProductRelations(
      data as ProductRow[],
    );

    if (query.categorySlug) {
      products = products.filter((product) =>
        product.categorySlugs.includes(query.categorySlug!),
      );
    }

    return products;
  }

  async getProductBySlug(
    slug: string,
  ): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from("products")
      .select(
        "id, slug, name, short_description, description, status, featured, price_minor, compare_at_price_minor, currency, published_at",
      )
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      throw new Error(
        `Unable to load product: ${error.message}`,
      );
    }

    if (!data) {
      return null;
    }

    const products = await this.loadProductRelations([
      data as ProductRow,
    ]);

    return products[0] ?? null;
  }

  async getProductById(
    productId: string,
  ): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from("products")
      .select(
        "id, slug, name, short_description, description, status, featured, price_minor, compare_at_price_minor, currency, published_at",
      )
      .eq("id", productId)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      throw new Error(
        `Unable to load product: ${error.message}`,
      );
    }

    if (!data) {
      return null;
    }

    const products = await this.loadProductRelations([
      data as ProductRow,
    ]);

    return products[0] ?? null;
  }

  private async loadProductRelations(
    productRows: ProductRow[],
  ): Promise<Product[]> {
    if (!productRows.length) {
      return [];
    }

    const productIds = productRows.map(
      (product) => product.id,
    );

    const [
      { data: variants, error: variantsError },
      { data: images, error: imagesError },
      { data: productCategories, error: categoriesError },
    ] = await Promise.all([
      this.supabase
        .from("product_variants")
        .select(
          "id, product_id, sku, size, color, price_minor, compare_at_price_minor, active",
        )
        .in("product_id", productIds)
        .eq("active", true)
        .order("created_at", { ascending: true }),

      this.supabase
        .from("product_images")
        .select(
          "id, product_id, storage_path, alt_text, sort_order, image_role",
        )
        .in("product_id", productIds)
        .order("sort_order", { ascending: true }),

      this.supabase
        .from("product_categories")
        .select("product_id, category_id")
        .in("product_id", productIds),
    ]);

    if (variantsError) {
      throw new Error(
        `Unable to load product variants: ${variantsError.message}`,
      );
    }

    if (imagesError) {
      throw new Error(
        `Unable to load product images: ${imagesError.message}`,
      );
    }

    if (categoriesError) {
      throw new Error(
        `Unable to load product categories: ${categoriesError.message}`,
      );
    }

    const variantRows = variants as VariantRow[];

    const availabilityByVariantId =
      await this.loadVariantAvailability(variantRows);

    const categoryIds = [
      ...new Set(
        (productCategories as ProductCategoryRow[]).map(
          (item) => item.category_id,
        ),
      ),
    ];

    let categories: CategoryRow[] = [];

    if (categoryIds.length) {
      const { data, error } = await this.supabase
        .from("categories")
        .select(
          "id, slug, name, description, image_url, image_alt, sort_order",
        )
        .in("id", categoryIds)
        .eq("status", "active");

      if (error) {
        throw new Error(
          `Unable to load product categories: ${error.message}`,
        );
      }

      categories = data as CategoryRow[];
    }

    return productRows.map((product) =>
      mapProduct(
        product,
        variantRows,
        images as ImageRow[],
        productCategories as ProductCategoryRow[],
        categories,
        availabilityByVariantId,
        this.supabase,
      ),
    );
  }

  private async loadVariantAvailability(
    variants: VariantRow[],
  ): Promise<
    Map<string, VariantAvailabilityRow["availability"]>
  > {
    const availabilityByVariantId = new Map<
      string,
      VariantAvailabilityRow["availability"]
    >();

    if (!variants.length) {
      return availabilityByVariantId;
    }

    const variantIds = variants.map(
      (variant) => variant.id,
    );

    const { data, error } = await this.supabase.rpc(
      "get_public_variant_availability",
      {
        p_variant_ids: variantIds,
      },
    );

    if (error) {
      throw new Error(
        `Unable to load variant availability: ${error.message}`,
      );
    }

    for (const row of (data as VariantAvailabilityRow[]) ?? []) {
      availabilityByVariantId.set(
        row.variant_id,
        row.availability,
      );
    }

    return availabilityByVariantId;
  }
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    image: row.image_url
      ? {
          id: `category-image-${row.id}`,
          url: row.image_url,
          alt: row.image_alt ?? row.name,
          sortOrder: row.sort_order,
        }
      : undefined,
    sortOrder: row.sort_order,
  };
}

function mapProduct(
  row: ProductRow,
  variants: VariantRow[],
  images: ImageRow[],
  productCategories: ProductCategoryRow[],
  categories: CategoryRow[],
  availabilityByVariantId: Map<
    string,
    VariantAvailabilityRow["availability"]
  >,
  supabase: SupabaseClient,
): Product {
  const productVariants = variants
    .filter((variant) => variant.product_id === row.id)
    .map((variant) =>
      mapVariant(
        variant,
        availabilityByVariantId.get(variant.id) ??
          "out_of_stock",
      ),
    );

  const productImages = images
    .filter((image) => image.product_id === row.id)
    .map((image) => mapImage(image, supabase));

  const categoryIdSet = new Set(
    productCategories
      .filter((item) => item.product_id === row.id)
      .map((item) => item.category_id),
  );

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    categorySlugs: categories
      .filter((category) => categoryIdSet.has(category.id))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((category) => category.slug),
    status: row.status,
    publishedAt: row.published_at,
    featured: row.featured,
    price: {
      amount: row.price_minor,
      currency: "NGN",
    },
    compareAtPrice:
      row.compare_at_price_minor === null
        ? undefined
        : {
            amount: row.compare_at_price_minor,
            currency: "NGN",
          },
    images: productImages,
    variants: productVariants,
  };
}

function mapVariant(
  row: VariantRow,
  availability: VariantAvailabilityRow["availability"],
): ProductVariant {
  return {
    id: row.id,
    sku: row.sku,
    size: toOptionValue(row.size),
    color: toOptionValue(row.color),
    price:
      row.price_minor === null
        ? undefined
        : {
            amount: row.price_minor,
            currency: "NGN",
          },
    compareAtPrice:
      row.compare_at_price_minor === null
        ? undefined
        : {
            amount: row.compare_at_price_minor,
            currency: "NGN",
          },
    availability,
  };
}

function mapImage(
  row: ImageRow,
  supabase: SupabaseClient,
): CatalogImage {
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(row.storage_path);

  return {
    id: row.id,
    url: data.publicUrl,
    alt: row.alt_text,
    sortOrder: row.sort_order,
  };
}

function toOptionValue(
  value: string | null,
): ProductOptionValue | undefined {
  return value
    ? {
        value,
        label: value,
      }
    : undefined;
}

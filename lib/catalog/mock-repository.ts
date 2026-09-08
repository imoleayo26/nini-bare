import { categories, products } from "./mock-data";
import type { Category, Product } from "./types";
import type { CatalogRepository, ProductListQuery } from "./repository";

export class MockCatalogRepository implements CatalogRepository {
  async listCategories(): Promise<Category[]> {
    return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = categories.find((item) => item.slug === slug);

    return category ?? null;
  }

  async listProducts(query: ProductListQuery = {}): Promise<Product[]> {
    let result = [...products];

    if (query.categorySlug) {
      result = result.filter((product) =>
        product.categorySlugs.includes(query.categorySlug!),
      );
    }

    if (query.featured !== undefined) {
      result = result.filter(
        (product) => product.featured === query.featured,
      );
    }

    if (query.publishedOnly) {
      result = result.filter((product) => product.status === "active");
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = products.find((item) => item.slug === slug);

    return product ?? null;
  }

  async getProductById(productId: string): Promise<Product | null> {
    const product = products.find((item) => item.id === productId);

    return product ?? null;
  }
}

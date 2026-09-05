import type { Category, Product } from "./types";

export interface ProductListQuery {
  categorySlug?: string;
  featured?: boolean;
  publishedOnly?: boolean;
}

export interface CatalogRepository {
  listCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  listProducts(query?: ProductListQuery): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
}

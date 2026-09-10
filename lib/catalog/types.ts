export type ProductStatus = "draft" | "active" | "archived";

export type Availability =
  | "in_stock"
  | "out_of_stock"
  | "backorder";

export interface Money {
  amount: number;
  currency: "NGN";
}

export interface CatalogImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  sortOrder: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: CatalogImage;
  sortOrder: number;
}

export interface ProductOptionValue {
  value: string;
  label: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: ProductOptionValue;
  color?: ProductOptionValue;
  price?: Money;
  compareAtPrice?: Money;
  availability: Availability;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlugs: string[];
  status: ProductStatus;
  publishedAt: string | null;
  featured: boolean;
  price: Money;
  compareAtPrice?: Money;
  images: CatalogImage[];
  variants: ProductVariant[];
}

import { MockCatalogRepository } from "./mock-repository";
import type { CatalogRepository } from "./repository";

export type {
  Availability,
  CatalogImage,
  Category,
  Money,
  Product,
  ProductOptionValue,
  ProductStatus,
  ProductVariant,
} from "./types";

export type {
  CatalogRepository,
  ProductListQuery,
} from "./repository";

export { formatMoney } from "./format";

export const catalogRepository: CatalogRepository =
  new MockCatalogRepository();

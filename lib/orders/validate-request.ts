import type { CatalogRepository, Product } from "@/lib/catalog";
import type { InventoryRepository } from "@/lib/inventory/repository";
import type { OrderItem } from "./types";
import type { OrderRequest } from "./request";

export interface ValidatedOrderRequest {
  customer: OrderRequest["customer"];
  delivery: OrderRequest["delivery"];
  items: OrderItem[];
  subtotal: number;
  currency: "NGN";
}

export async function validateOrderRequest(
  request: OrderRequest,
  catalog: CatalogRepository,
  inventory: InventoryRepository,
): Promise<ValidatedOrderRequest> {
  if (!request.items.length) {
    throw new Error("Your cart is empty.");
  }

  const items: OrderItem[] = [];

  for (const requestedItem of request.items) {
    if (
      !Number.isInteger(requestedItem.quantity) ||
      requestedItem.quantity <= 0
    ) {
      throw new Error("Each item must have a valid quantity.");
    }

    const product = await catalog.getProductById(
      requestedItem.productId,
    );

    if (!product || product.status !== "active") {
      throw new Error("One or more products are no longer available.");
    }

    const variant = product.variants.find(
      (item) => item.id === requestedItem.variantId,
    );

    if (!variant) {
      throw new Error("One or more selected variants are invalid.");
    }

    const availableQuantity =
      await inventory.getAvailableQuantity(variant.id);

    if (
      variant.availability !== "in_stock" ||
      availableQuantity <= 0
    ) {
      throw new Error(
        `${product.name} is currently out of stock.`,
      );
    }

    if (requestedItem.quantity > availableQuantity) {
      throw new Error(
        `${product.name} does not have enough stock available.`,
      );
    }

    const unitPrice =
      variant.price?.amount ?? product.price.amount;

    const primaryImage = getPrimaryImage(product);

    items.push({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: variant.id,
      sku: variant.sku,
      size: variant.size?.label,
      color: variant.color?.label,
      unitPrice,
      quantity: requestedItem.quantity,
      imageUrl: primaryImage?.url,
      imageAlt: primaryImage?.alt,
    });
  }

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  return {
    customer: request.customer,
    delivery: request.delivery,
    items,
    subtotal,
    currency: "NGN",
  };
}

function getPrimaryImage(product: Product) {
  return [...product.images].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )[0];
}

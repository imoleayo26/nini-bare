import type { CheckoutDetails } from "@/lib/checkout";

export interface OrderRequestItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface OrderRequest {
  customer: CheckoutDetails["customer"];
  delivery: CheckoutDetails["delivery"];
  items: OrderRequestItem[];
}

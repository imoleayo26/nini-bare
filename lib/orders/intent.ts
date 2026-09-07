import type { CheckoutDetails } from "@/lib/checkout";
import type { CartItem } from "@/lib/cart";

export interface OrderIntent {
  customer: CheckoutDetails["customer"];
  delivery: CheckoutDetails["delivery"];
  items: CartItem[];
  subtotal: number;
  currency: "NGN";
}

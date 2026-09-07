import type { Cart } from "@/lib/cart";
import { getSubtotal } from "@/lib/cart";
import type { CheckoutDetails } from "@/lib/checkout";
import type { OrderIntent } from "./intent";

export function createOrderIntent(
  details: CheckoutDetails,
  cart: Cart,
): OrderIntent {
  return {
    customer: details.customer,
    delivery: details.delivery,
    items: cart.items,
    subtotal: getSubtotal(cart),
    currency: "NGN",
  };
}

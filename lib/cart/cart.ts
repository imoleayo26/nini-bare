import type { Cart, CartItem } from "./types";

export function createCartItemId(
  productId: string,
  variantId: string,
): string {
  return `${productId}:${variantId}`;
}

export function createEmptyCart(): Cart {
  return {
    items: [],
  };
}

export function addItem(
  cart: Cart,
  item: CartItem,
): Cart {
  const existingItem = cart.items.find(
    (cartItem) => cartItem.id === item.id,
  );

  if (existingItem) {
    return {
      items: cart.items.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          : cartItem,
      ),
    };
  }

  return {
    items: [...cart.items, item],
  };
}

export function removeItem(
  cart: Cart,
  itemId: string,
): Cart {
  return {
    items: cart.items.filter((item) => item.id !== itemId),
  };
}

export function updateQuantity(
  cart: Cart,
  itemId: string,
  quantity: number,
): Cart {
  if (quantity <= 0) {
    return removeItem(cart, itemId);
  }

  return {
    items: cart.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity,
          }
        : item,
    ),
  };
}

export function clearCart(): Cart {
  return createEmptyCart();
}

export function getItemCount(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

export function getSubtotal(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addItem,
  clearCart,
  getItemCount,
  getSubtotal,
  removeItem,
  updateQuantity,
} from "@/lib/cart";
import type { Cart, CartItem } from "@/lib/cart";

const CART_STORAGE_KEY = "nini-bare-cart-v1";

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>(() => ({
    items: [],
  }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(
        CART_STORAGE_KEY,
      );

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as Cart;

        if (
          parsedCart &&
          Array.isArray(parsedCart.items)
        ) {
          setCart(parsedCart);
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart),
    );
  }, [cart, hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: getItemCount(cart),
      subtotal: getSubtotal(cart),
      hydrated,
      addItem: (item) => {
        setCart((currentCart) =>
          addItem(currentCart, item),
        );
      },
      removeItem: (itemId) => {
        setCart((currentCart) =>
          removeItem(currentCart, itemId),
        );
      },
      updateQuantity: (itemId, quantity) => {
        setCart((currentCart) =>
          updateQuantity(currentCart, itemId, quantity),
        );
      },
      clearCart: () => {
        setCart(clearCart());
      },
    }),
    [cart, hydrated],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider",
    );
  }

  return context;
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  sku: string;
  size?: string;
  color?: string;
  unitPrice: number;
  currency: "NGN";
  imageUrl?: string;
  imageAlt?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

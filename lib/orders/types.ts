export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "initialized"
  | "paid"
  | "failed"
  | "refunded";

export interface OrderItem {
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  sku: string;
  size?: string;
  color?: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: "NGN";
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

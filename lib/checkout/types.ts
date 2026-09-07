export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
}

export interface CheckoutDetails {
  customer: CustomerDetails;
  delivery: DeliveryAddress;
}

export type CheckoutStep =
  | "details"
  | "payment"
  | "confirmation";

import type { InventoryRepository } from "./repository";

const availableQuantities: Record<string, number> = {
  "var-essential-s": 10,
  "var-essential-m": 10,
  "var-essential-l": 8,
  "var-essential-xl": 5,

  "var-everyday-s": 8,
  "var-everyday-m": 10,
  "var-everyday-l": 8,
  "var-everyday-xl": 5,

  "var-lace-s": 6,
  "var-lace-m": 8,
  "var-lace-l": 6,
  "var-lace-xl": 0,

  "var-lounge-s": 5,
  "var-lounge-m": 7,
  "var-lounge-l": 5,
  "var-lounge-xl": 3,
};

export class MockInventoryRepository
  implements InventoryRepository
{
  async getAvailableQuantity(
    variantId: string,
  ): Promise<number> {
    return availableQuantities[variantId] ?? 0;
  }
}

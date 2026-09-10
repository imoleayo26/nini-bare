export interface InventoryRepository {
  getAvailableQuantity(variantId: string): Promise<number>;
}

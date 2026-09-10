import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { InventoryRepository } from "./repository";

interface InventoryLevelRow {
  quantity_on_hand: number;
  quantity_reserved: number;
}

export class SupabaseInventoryRepository
  implements InventoryRepository
{
  private readonly supabase;

  constructor() {
    this.supabase = createAdminClient();
  }

  async getAvailableQuantity(
    variantId: string,
  ): Promise<number> {
    const { data, error } = await this.supabase
      .from("inventory_levels")
      .select("quantity_on_hand, quantity_reserved")
      .eq("variant_id", variantId)
      .maybeSingle<InventoryLevelRow>();

    if (error) {
      throw new Error(
        `Unable to load inventory for variant ${variantId}: ${error.message}`,
      );
    }

    if (!data) {
      return 0;
    }

    return Math.max(
      data.quantity_on_hand - data.quantity_reserved,
      0,
    );
  }
}

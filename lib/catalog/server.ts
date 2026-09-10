import "server-only";

import { createClient } from "@/lib/supabase/server";
import { SupabaseCatalogRepository } from "./supabase-repository";

export async function getCatalogRepository() {
  const supabase = await createClient();

  return new SupabaseCatalogRepository(supabase);
}

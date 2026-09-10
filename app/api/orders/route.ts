import { NextResponse } from "next/server";
import { catalogRepository } from "@/lib/catalog";
import { MockInventoryRepository } from "@/lib/inventory/mock-repository";
import type { OrderRequest } from "@/lib/orders/request";
import { validateOrderRequest } from "@/lib/orders/validate-request";

const inventoryRepository = new MockInventoryRepository();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;

    const validatedOrder = await validateOrderRequest(
      body,
      catalogRepository,
      inventoryRepository,
    );

    return NextResponse.json({
      success: true,
      order: validatedOrder,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to validate your order.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 },
    );
  }
}

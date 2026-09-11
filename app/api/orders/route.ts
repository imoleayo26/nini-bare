import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { OrderRequest } from "@/lib/orders/request";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order request.",
        },
        { status: 400 },
      );
    }

    if (
      !body.customer ||
      !body.delivery ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer, delivery details, and at least one item are required.",
        },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("create_order", {
      p_first_name: body.customer.firstName,
      p_last_name: body.customer.lastName,
      p_email: body.customer.email,
      p_phone: body.customer.phone,
      p_address_line1: body.delivery.addressLine1,
      p_address_line2: body.delivery.addressLine2 ?? null,
      p_city: body.delivery.city,
      p_state: body.delivery.state,
      p_country: body.delivery.country ?? "Nigeria",
      p_subtotal_minor: 0,
      p_delivery_fee_minor: 0,
      p_total_minor: 0,
      p_items: body.items.map((item) => ({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
    });

    if (error) {
      throw new Error(error.message);
    }

    const order = data?.[0];

    if (!order) {
      throw new Error("Order creation did not return an order.");
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create your order.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 },
    );
  }
}

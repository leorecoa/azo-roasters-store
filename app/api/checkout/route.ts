import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const Body = z.object({
  user_id: z.string().uuid(),
  items: z.array(
    z.object({
      product_id: z.string().uuid(),
      variant_id: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });

  const { user_id, items } = parsed.data;
  const sb = supabaseServer();

  // Carrega preços das variantes (fonte de verdade = DB)
  const variantIds = items.map(i => i.variant_id);
  const { data: variants, error: vErr } = await sb
    .from("product_variants")
    .select("id, product_id, price_cents, active")
    .in("id", variantIds);

  if (vErr || !variants) return NextResponse.json({ error: "variants_fetch_failed" }, { status: 500 });

  const map = new Map(variants.map(v => [v.id, v]));
  let subtotal = 0;

  for (const it of items) {
    const v = map.get(it.variant_id);
    if (!v || !v.active) return NextResponse.json({ error: "variant_unavailable" }, { status: 409 });
    subtotal += v.price_cents * it.quantity;
  }

  const shipping = 0; // conceitual; depois você pluga cálculo
  const total = subtotal + shipping;

  const { data: order, error: oErr } = await sb
    .from("orders")
    .insert({
      user_id,
      status: "created",
      subtotal_cents: subtotal,
      shipping_cents: shipping,
      total_cents: total,
      payment_provider: null,
      payment_ref: null,
    })
    .select("id")
    .single();

  if (oErr || !order) return NextResponse.json({ error: "order_create_failed" }, { status: 500 });

  const orderItems = items.map(it => {
    const v = map.get(it.variant_id)!;
    return {
      order_id: order.id,
      product_id: it.product_id,
      variant_id: it.variant_id,
      quantity: it.quantity,
      unit_price_cents: v.price_cents,
    };
  });

  const { error: iErr } = await sb.from("order_items").insert(orderItems);
  if (iErr) return NextResponse.json({ error: "order_items_failed" }, { status: 500 });

  return NextResponse.json({ order_id: order.id });
}

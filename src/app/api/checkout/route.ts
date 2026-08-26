import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { items, email } = await req.json();
  // items: [{ variantId, quantity }]

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Carrello vuoto" }, { status: 400 });
  }

  // Ricalcola i prezzi lato server: MAI fidarsi del prezzo mandato dal client
  const variantIds = items.map((i: { variantId: string }) => i.variantId);
  const variants = await prisma.variant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true },
  });

  const lineItems = items.map((item: { variantId: string; quantity: number }) => {
    const variant = variants.find((v) => v.id === item.variantId);
    if (!variant) throw new Error(`Variante non trovata: ${item.variantId}`);
    if (variant.stock < item.quantity) {
      throw new Error(`Stock insufficiente per ${variant.product.name} (${variant.size})`);
    }
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: `${variant.product.name} - ${variant.size}${variant.color ? " " + variant.color : ""}`,
          images: variant.product.images.slice(0, 1),
        },
        unit_amount: variant.priceCents,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/successo?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/carrello`,
    shipping_address_collection: { allowed_countries: ["IT"] },
    metadata: {
      items: JSON.stringify(items),
    },
  });

  return NextResponse.json({ url: session.url });
}

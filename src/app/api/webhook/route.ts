import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// IMPORTANTE: questo endpoint deve ricevere il body raw, non JSON parsato.
// In Next.js App Router funziona di default perché non usiamo bodyParser.

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Firma webhook non valida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const items = JSON.parse(session.metadata?.items || "[]") as {
      variantId: string;
      quantity: number;
    }[];

    // Evita doppie elaborazioni se Stripe rimanda lo stesso evento
    const existing = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
    });
    if (existing) return NextResponse.json({ received: true });

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          email: session.customer_details?.email || session.customer_email || "",
          status: "paid",
          stripeSessionId: session.id,
          totalCents: session.amount_total || 0,
          shippingAddress: (session.shipping_details?.address as object) || {},
        },
      });

      for (const item of items) {
        const variant = await tx.variant.findUnique({ where: { id: item.variantId } });
        if (!variant) continue;

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: variant.productId,
            variantId: variant.id,
            quantity: item.quantity,
            priceCents: variant.priceCents,
          },
        });

        await tx.variant.update({
          where: { id: variant.id },
          data: { stock: { decrement: item.quantity } },
        });
      }
    });
  }

  return NextResponse.json({ received: true });
}

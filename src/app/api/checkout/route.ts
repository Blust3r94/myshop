import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Errori "attesi" del carrello (prodotto non trovato, stock insufficiente):
// messaggio già pensato per l'utente, va mostrato così com'è. Qualsiasi altro
// errore (es. Stripe non configurato/non raggiungibile) non deve mai arrivare
// al client nella sua forma originale.
class CheckoutValidationError extends Error {}

export async function POST(req: NextRequest) {
  const { items, email } = await req.json();
  // items: [{ variantId, quantity }]

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Carrello vuoto" }, { status: 400 });
  }

  try {
    // Ricalcola i prezzi lato server: MAI fidarsi del prezzo mandato dal client
    const variantIds = items.map((i: { variantId: string }) => i.variantId);
    const variants = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    });

    const lineItems = items.map((item: { variantId: string; quantity: number }) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) {
        // Un variantId inesistente nel DB è tipicamente un prodotto dimostrativo
        // (catalogo demo, vedi src/lib/demo-catalog.ts): non è un vero errore server,
        // va segnalato all'utente in modo chiaro invece di far esplodere la route.
        const isDemo = item.variantId.startsWith("demo-");
        throw new CheckoutValidationError(
          isDemo
            ? "Questo è un prodotto dimostrativo e non può essere acquistato. Scegli un prodotto del catalogo reale."
            : "Uno dei prodotti nel carrello non è più disponibile."
        );
      }
      if (variant.stock < item.quantity) {
        throw new CheckoutValidationError(`Stock insufficiente per ${variant.product.name} (${variant.size})`);
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
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // Errore non previsto (es. Stripe non configurato/non raggiungibile): non
    // esporre mai il messaggio originale al client, solo un messaggio generico.
    console.error("Errore checkout:", error);
    return NextResponse.json(
      { error: "Il pagamento non è al momento disponibile. Riprova più tardi." },
      { status: 503 }
    );
  }
}

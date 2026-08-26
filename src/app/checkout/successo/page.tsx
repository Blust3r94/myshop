import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessoPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Nessun ordine da confermare</h1>
        <p className="mt-4 text-gray-500">
          <Link href="/prodotti" className="underline">
            Torna al catalogo
          </Link>
          .
        </p>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);

  if (!session) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Non siamo riusciti a verificare il pagamento</h1>
        <p className="mt-4 text-gray-500">
          Se hai completato il pagamento e il problema persiste, contattaci indicando questo
          riferimento: <span className="font-mono">{sessionId}</span>.
        </p>
      </div>
    );
  }

  const paid = session.payment_status === "paid";
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  const totalCents = session.amount_total ?? 0;

  // L'Order viene creato in modo asincrono dal webhook Stripe: potrebbe non
  // esistere ancora nel DB nel momento in cui l'utente atterra su questa pagina.
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: sessionId },
    include: { items: { include: { product: true, variant: true } } },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">{paid ? "Grazie per il tuo ordine!" : "Ordine ricevuto"}</h1>
      <p className="mt-2 text-gray-500">
        {paid
          ? email
            ? `Una conferma è stata inviata a ${email}.`
            : "Il pagamento è andato a buon fine."
          : "Stiamo confermando il pagamento: riceverai un'email non appena sarà completato."}
      </p>

      <div className="mt-8 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Riferimento ordine</span>
          <span className="font-mono">{sessionId}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold">
          <span>Totale</span>
          <span>{formatPrice(totalCents)}</span>
        </div>

        {order ? (
          <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                <span>
                  {item.product.name} — {item.variant.size}
                  {item.variant.color ? ` · ${item.variant.color}` : ""} × {item.quantity}
                </span>
                <span>{formatPrice(item.priceCents * item.quantity)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-gray-500">
            Stiamo ancora elaborando il dettaglio del tuo ordine: il riepilogo completo arriverà a
            breve via email.
          </p>
        )}
      </div>

      <Link href="/prodotti" className="mt-8 inline-block text-sm underline">
        Continua lo shopping
      </Link>
    </div>
  );
}

import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessoPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-10">
        <h1 className="font-serif text-2xl text-ink md:text-3xl">Nessun ordine da confermare</h1>
        <p className="mt-4 text-ink-muted">
          <Link href="/prodotti" className="text-ink underline underline-offset-4">
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
      <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-10">
        <h1 className="font-serif text-2xl text-ink md:text-3xl">Non siamo riusciti a verificare il pagamento</h1>
        <p className="mt-4 text-ink-muted">
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
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <div className="flex items-center gap-2 text-success">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5L20 7" />
        </svg>
        <span className="text-[13px] uppercase tracking-widest">
          {paid ? "Pagamento confermato" : "Ordine ricevuto"}
        </span>
      </div>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
        {paid ? "Grazie per il tuo ordine!" : "Ordine ricevuto"}
      </h1>
      <p className="mt-3 text-ink-muted">
        {paid
          ? email
            ? `Una conferma è stata inviata a ${email}.`
            : "Il pagamento è andato a buon fine."
          : "Stiamo confermando il pagamento: riceverai un'email non appena sarà completato."}
      </p>

      <div className="mt-10 border border-line p-6">
        <div className="flex items-center justify-between text-sm text-ink-muted">
          <span>Riferimento ordine</span>
          <span className="font-mono text-ink">{sessionId}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-lg text-ink">
          <span>Totale</span>
          <span>{formatPrice(totalCents)}</span>
        </div>

        {order ? (
          <ul className="mt-6 border-t border-line">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b border-line py-3 text-sm text-ink">
                <span>
                  {item.product.name} — {item.variant.size}
                  {item.variant.color ? ` · ${item.variant.color}` : ""} × {item.quantity}
                </span>
                <span>{formatPrice(item.priceCents * item.quantity)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-ink-muted">
            Stiamo ancora elaborando il dettaglio del tuo ordine: il riepilogo completo arriverà a
            breve via email.
          </p>
        )}
      </div>

      <Link href="/prodotti" className="mt-10 inline-block text-[13px] uppercase tracking-wide text-ink underline underline-offset-4">
        Continua lo shopping
      </Link>
    </div>
  );
}

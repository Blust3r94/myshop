import Link from "next/link";
import { SITE_NAME, SHIPPING_TIME_LABEL } from "@/lib/site-config";

export const metadata = {
  title: "Spedizioni",
  description: `Tempi e condizioni di spedizione degli ordini ${SITE_NAME}.`,
};

export default function SpedizioniPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Assistenza</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Spedizioni</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-muted">
        <p>
          Tutti gli ordini vengono spediti in <strong className="text-ink">{SHIPPING_TIME_LABEL}</strong>{" "}
          dalla conferma del pagamento, su tutto il territorio italiano.
        </p>
        <p>
          Riceverai un&apos;email di conferma non appena il pacco viene affidato al corriere, con il
          riferimento del tuo ordine.
        </p>
        <p>
          Per qualsiasi domanda sulla spedizione di un ordine già effettuato,{" "}
          <Link href="/contatti" className="text-ink underline underline-offset-4">
            contattaci
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { SITE_NAME, SITE_CONTACT_EMAIL } from "@/lib/site-config";

export const metadata = {
  title: "Cookie Policy",
  description: `Quali cookie e tecnologie simili utilizza ${SITE_NAME}.`,
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Legale</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Cookie Policy</h1>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-serif text-xl text-ink">Cosa sono i cookie</h2>
          <p className="mt-3">
            I cookie sono piccoli file di testo che un sito salva sul tuo dispositivo. Alcuni servono
            a far funzionare correttamente il sito (cookie tecnici), altri a riconoscerti nel tempo
            per finalità statistiche o pubblicitarie (cookie di profilazione).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">
            Cosa usiamo su {SITE_NAME}
          </h2>
          <p className="mt-3">
            Questo sito utilizza esclusivamente tecnologie <strong className="text-ink">
            tecniche e strettamente necessarie</strong> al funzionamento del negozio. Non utilizziamo
            cookie di profilazione, pubblicitari o di analisi statistica di terze parti.
          </p>

          <div className="mt-6 overflow-hidden border border-line">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-line bg-paper-alt text-ink">
                  <th className="px-4 py-3 font-normal">Nome</th>
                  <th className="px-4 py-3 font-normal">Tipo</th>
                  <th className="px-4 py-3 font-normal">A cosa serve</th>
                  <th className="px-4 py-3 font-normal">Durata</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-mono text-[12px]">myshop-cart</td>
                  <td className="px-4 py-3">Memoria locale del browser (non un cookie HTTP)</td>
                  <td className="px-4 py-3">Ricorda il contenuto del tuo carrello tra una visita e l&apos;altra</td>
                  <td className="px-4 py-3">Fino a rimozione manuale</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-[12px]">admin_session</td>
                  <td className="px-4 py-3">Cookie tecnico, httpOnly</td>
                  <td className="px-4 py-3">
                    Mantiene la sessione di accesso al pannello di amministrazione. Riguarda solo lo
                    staff che gestisce il negozio, non i visitatori del sito.
                  </td>
                  <td className="px-4 py-3">8 ore</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Trattandosi esclusivamente di elementi tecnici indispensabili al funzionamento del
            servizio richiesto, per il loro utilizzo non è necessario il tuo consenso preventivo, ai
            sensi della normativa vigente in materia di cookie.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Pagamento tramite Stripe</h2>
          <p className="mt-3">
            Al momento del pagamento vieni reindirizzato alla pagina di Checkout ospitata da Stripe,
            il nostro gestore di pagamenti, su un dominio diverso dal nostro. In quella fase, i cookie
            eventualmente impostati sono di competenza di Stripe e regolati dalla sua informativa: {" "}
            <a
              href="https://stripe.com/it/cookies-policy/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4"
            >
              stripe.com/it/cookies-policy/legal
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Come gestire i cookie dal browser</h2>
          <p className="mt-3">
            Puoi in ogni momento eliminare i cookie salvati e i dati di memoria locale dalle
            impostazioni del tuo browser. Tieni presente che eliminando il valore relativo al
            carrello, il suo contenuto andrà perso.
          </p>
        </section>

        <p>
          Per maggiori informazioni sul trattamento dei tuoi dati, consulta la nostra{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-4">
            Privacy Policy
          </Link>
          , oppure scrivici a{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
            {SITE_CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

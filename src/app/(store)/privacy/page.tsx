import Link from "next/link";
import {
  SITE_NAME,
  SITE_CONTACT_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_VAT_NUMBER,
  LEGAL_ADDRESS,
} from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy",
  description: `Informativa sul trattamento dei dati personali su ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Legale</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink-muted">
        Informativa ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (&quot;GDPR&quot;).
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-serif text-xl text-ink">Titolare del trattamento</h2>
          <p className="mt-3">
            {LEGAL_ENTITY_NAME}, con sede in {LEGAL_ADDRESS}, P.IVA {LEGAL_VAT_NUMBER}
            {" "}(&quot;{SITE_NAME}&quot;, &quot;noi&quot;). Per qualsiasi richiesta relativa ai tuoi
            dati personali puoi scriverci a{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
              {SITE_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Quali dati raccogliamo</h2>
          <p className="mt-3">
            Non richiediamo la creazione di un account: puoi navigare e acquistare come ospite. I
            dati che trattiamo dipendono da come usi il sito:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Carrello</strong>: gli articoli che aggiungi al carrello
              vengono salvati solo sul tuo dispositivo (memoria locale del browser), non sui nostri
              server, finché non procedi al pagamento.
            </li>
            <li>
              <strong className="text-ink">Acquisto</strong>: al momento del pagamento raccogliamo,
              tramite {" "}
              <a
                href="https://stripe.com/it/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4"
              >
                Stripe
              </a>
              , il nostro gestore di pagamenti, la tua email, l&apos;indirizzo di spedizione e il
              riepilogo dell&apos;ordine (prodotti, quantità, importo). <strong className="text-ink">
              I dati della tua carta di pagamento non vengono mai ricevuti né conservati dai nostri
              server</strong>: sono trattati esclusivamente da Stripe, secondo i più elevati standard
              di sicurezza del settore (PCI-DSS).
            </li>
            <li>
              <strong className="text-ink">Assistenza</strong>: se ci scrivi via email, trattiamo i
              dati che ci fornisci (es. indirizzo email, contenuto del messaggio) solo per risponderti.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Perché trattiamo questi dati</h2>
          <p className="mt-3">
            Trattiamo i tuoi dati per: dare esecuzione al contratto di vendita (evadere il tuo ordine,
            gestire spedizione, resi e assistenza); adempiere a obblighi di legge (es. fiscali e
            contabili); rispondere alle tue richieste. Non utilizziamo i tuoi dati per finalità di
            marketing automatizzato o profilazione, e non li vendiamo a terzi.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Con chi condividiamo i dati</h2>
          <p className="mt-3">I tuoi dati possono essere trattati, per nostro conto, da fornitori che ci forniscono i servizi necessari a far funzionare il sito:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Stripe</strong> (pagamenti) — riceve i dati necessari a
              elaborare il pagamento e, in caso di acquisto, email e indirizzo di spedizione.
            </li>
            <li>
              <strong className="text-ink">Fornitore del database</strong> — ospita in modo sicuro i
              dati dei tuoi ordini (email, indirizzo, riepilogo acquisto), su server nell&apos;Unione
              Europea.
            </li>
            <li>
              <strong className="text-ink">Fornitore di hosting</strong> — ospita il sito ed elabora,
              per finalità tecniche e di sicurezza, i normali log di navigazione (es. indirizzo IP)
              generati da qualsiasi visita a un sito web.
            </li>
          </ul>
          <p className="mt-3">
            Alcuni di questi fornitori hanno sede al di fuori dello Spazio Economico Europeo:
            in questi casi il trasferimento avviene solo in presenza delle garanzie previste dal GDPR
            (es. clausole contrattuali standard della Commissione Europea).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Per quanto tempo conserviamo i dati</h2>
          <p className="mt-3">
            I dati relativi agli ordini vengono conservati per il tempo necessario agli adempimenti
            contabili e fiscali previsti dalla legge. I dati del carrello restano sul tuo dispositivo
            fino a quando non li elimini tu stesso (es. svuotando il carrello o i dati del browser).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">I tuoi diritti</h2>
          <p className="mt-3">
            In qualità di interessato puoi in ogni momento richiedere: accesso ai tuoi dati,
            rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione
            al trattamento, scrivendo a{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
              {SITE_CONTACT_EMAIL}
            </a>
            . Hai inoltre il diritto di proporre reclamo all&apos;Autorità Garante per la protezione
            dei dati personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4"
            >
              garanteprivacy.it
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Modifiche a questa informativa</h2>
          <p className="mt-3">
            Potremmo aggiornare periodicamente questa informativa. Ti invitiamo a consultarla di
            tanto in tanto: la versione pubblicata su questa pagina è sempre quella attualmente in
            vigore.
          </p>
        </section>

        <p>
          Per informazioni sui cookie utilizzati dal sito, consulta la nostra{" "}
          <Link href="/cookie-policy" className="text-ink underline underline-offset-4">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

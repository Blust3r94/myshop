import Link from "next/link";
import {
  SITE_NAME,
  SITE_CONTACT_EMAIL,
  SHIPPING_TIME_LABEL,
  RETURN_WINDOW_DAYS,
  PAYMENT_PROVIDER_LABEL,
  LEGAL_ENTITY_NAME,
  LEGAL_VAT_NUMBER,
  LEGAL_ADDRESS,
} from "@/lib/site-config";

export const metadata = {
  title: "Termini e condizioni",
  description: `Condizioni generali di vendita di ${SITE_NAME}.`,
};

export default function TerminiECondizioniPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Legale</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Termini e condizioni</h1>
      <p className="mt-4 text-sm text-ink-muted">Condizioni generali di vendita.</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-serif text-xl text-ink">Chi vende</h2>
          <p className="mt-3">
            Le vendite effettuate su {SITE_NAME} sono a cura di {LEGAL_ENTITY_NAME}, con sede in{" "}
            {LEGAL_ADDRESS}, P.IVA {LEGAL_VAT_NUMBER}. Per qualsiasi domanda puoi scrivere a{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
              {SITE_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Oggetto</h2>
          <p className="mt-3">
            Le presenti condizioni generali disciplinano la vendita a distanza, tramite il sito{" "}
            {SITE_NAME}, di capi di abbigliamento e accessori ai consumatori. L&apos;acquisto non
            richiede la creazione di un account: puoi ordinare come ospite.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Prezzi e pagamento</h2>
          <p className="mt-3">
            Tutti i prezzi indicati sul sito sono espressi in euro e si intendono comprensivi di IVA.
            Il pagamento avviene tramite {PAYMENT_PROVIDER_LABEL}, che elabora la transazione in modo
            sicuro: i dati della tua carta non vengono mai trasmessi né conservati sui nostri server.
            L&apos;ordine si considera confermato solo al ricevimento della conferma di pagamento.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Conclusione del contratto</h2>
          <p className="mt-3">
            L&apos;invio dell&apos;ordine tramite il sito costituisce una proposta di acquisto. Il
            contratto si intende concluso nel momento in cui riceviamo conferma dell&apos;avvenuto
            pagamento. Verifichiamo la disponibilità del prodotto ordinato prima di confermare la
            spedizione; in caso di indisponibilità sopravvenuta ti contatteremo per un rimborso o un
            prodotto alternativo.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Spedizione</h2>
          <p className="mt-3">
            I tempi e le condizioni di spedizione sono indicati nella pagina{" "}
            <Link href="/spedizioni" className="text-ink underline underline-offset-4">
              Spedizioni
            </Link>{" "}
            (attualmente: {SHIPPING_TIME_LABEL} dalla conferma del pagamento).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Diritto di recesso</h2>
          <p className="mt-3">
            Se sei un consumatore, hai diritto di recedere dal contratto senza dover fornire
            alcuna motivazione entro <strong className="text-ink">14 giorni</strong> dal ricevimento
            del prodotto, come previsto dal Codice del Consumo (D.Lgs. 206/2005) in attuazione della
            normativa UE sui diritti dei consumatori. {SITE_NAME} offre comunque, come politica
            commerciale, un termine più ampio di <strong className="text-ink">{RETURN_WINDOW_DAYS}{" "}
            giorni</strong> per il reso gratuito: le condizioni sono descritte nella pagina{" "}
            <Link href="/resi-e-cambi" className="text-ink underline underline-offset-4">
              Resi e cambi
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Garanzia legale di conformità</h2>
          <p className="mt-3">
            I prodotti acquistati sono coperti dalla garanzia legale di conformità di 2 anni prevista
            dal Codice del Consumo per i beni destinati ai consumatori. In caso di difetto di
            conformità, contattaci per concordare riparazione, sostituzione, riduzione del prezzo o
            risoluzione del contratto, secondo quanto previsto dalla legge.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Legge applicabile e foro competente</h2>
          <p className="mt-3">
            Le presenti condizioni sono regolate dalla legge italiana. Per qualunque controversia è
            competente il foro del luogo di residenza o domicilio del consumatore, se ubicato in
            Italia, salvo diverso accordo. Foro competente in via generale: {LEGAL_ADDRESS}.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Risoluzione delle controversie online</h2>
          <p className="mt-3">
            Se sei un consumatore residente nell&apos;Unione Europea, puoi anche accedere alla
            piattaforma europea di risoluzione delle controversie online (ODR) all&apos;indirizzo{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Modifiche</h2>
          <p className="mt-3">
            Potremmo aggiornare periodicamente queste condizioni. Fa fede la versione pubblicata su
            questa pagina al momento dell&apos;ordine.
          </p>
        </section>
      </div>
    </div>
  );
}

import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: "Contatti",
  description: `Come contattare l'assistenza ${SITE_NAME}.`,
};

export default function ContattiPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Assistenza</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Contatti</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-muted">
        <p>
          Il nostro team di assistenza è a disposizione per qualsiasi domanda su ordini, spedizioni,
          resi e cambi.
        </p>
        <p>
          Scrivici a{" "}
          <a href="mailto:assistenza@myshop.it" className="text-ink underline underline-offset-4">
            assistenza@myshop.it
          </a>
          : rispondiamo entro 24 ore lavorative.
        </p>
      </div>
    </div>
  );
}

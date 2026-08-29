import Link from "next/link";

export const metadata = {
  title: "Resi e cambi — MyShop",
  description: "Come funzionano resi e cambi su MyShop.",
};

export default function ResiECambiPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Assistenza</p>
      <h1 className="mt-3 font-serif text-3xl text-ink md:text-4xl">Resi e cambi</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-muted">
        <p>
          Hai <strong className="text-ink">30 giorni</strong> di tempo dalla consegna per restituire un
          articolo che non ti convince: il reso è gratuito su tutti gli ordini.
        </p>
        <p>
          Il capo deve essere restituito integro, non indossato e con le etichette originali ancora
          applicate.
        </p>
        <p>
          Per avviare un reso o un cambio,{" "}
          <Link href="/contatti" className="text-ink underline underline-offset-4">
            contattaci
          </Link>{" "}
          indicando il riferimento del tuo ordine.
        </p>
      </div>
    </div>
  );
}

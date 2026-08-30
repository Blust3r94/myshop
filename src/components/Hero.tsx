"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_NAME, SHIPPING_TIME_SHORT, RETURN_WINDOW_DAYS } from "@/lib/site-config";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-paper md:block md:min-h-0">
      {/* Mobile: immagine piena a schermo con overlay scuro, testo ancorato in basso — non è il desktop compresso */}
      <div className="absolute inset-0 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale, no next/image senza configurare i domini */}
        <img src="/catalogo/hero.jpg" alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      </div>

      {/* Bagliori decorativi: profondità senza gradienti aggressivi (solo desktop, dove c'è spazio) */}
      <div className="pointer-events-none absolute -right-40 -top-40 hidden h-[560px] w-[560px] rounded-full bg-accent/30 blur-[140px] md:block" />
      <div className="pointer-events-none absolute -bottom-52 left-[-10%] hidden h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px] md:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-14 pt-24 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:pb-28 md:pt-44 lg:px-16">
        <div className="relative z-10 flex flex-col gap-5 md:gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.2em] text-accent"
          >
            Collezione Autunno — Inverno
          </motion.span>

          <h1 className="max-w-lg font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="block"
            >
              Vestire con
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              className="block italic text-accent"
            >
              intenzione.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
            className="max-w-sm text-base leading-relaxed text-paper/75 md:text-paper/70"
          >
            Capi e accessori essenziali, pensati per durare. Materiali scelti con cura, forme senza
            tempo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
          >
            <Link
              href="/prodotti"
              className="group inline-flex items-center gap-3 bg-accent px-8 py-3.5 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Scopri la collezione
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Desktop: composizione a strati con la foto editoriale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative hidden aspect-[3/4] md:block"
        >
          <div className="absolute -right-4 -top-4 h-full w-full border border-accent/50 md:-right-6 md:-top-6" />
          <div className="relative h-full w-full overflow-hidden border border-paper/15">
            {/* eslint-disable-next-line @next/next/no-img-element -- immagine demo locale */}
            <img src="/catalogo/hero.jpg" alt={`Composizione editoriale ${SITE_NAME}`} className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10 lg:px-16">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-paper/50 md:text-left">
            Spedizione in {SHIPPING_TIME_SHORT} — Resi gratuiti entro {RETURN_WINDOW_DAYS} giorni
          </p>
        </div>
      </div>
    </section>
  );
}

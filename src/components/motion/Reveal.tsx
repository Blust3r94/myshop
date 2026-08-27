"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Component>
  );
}

// Puro contenitore di layout: NON orchestra più l'animazione dei figli (vedi RevealItem).
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

// Ogni RevealItem osserva la propria visibilità in modo indipendente, invece di ereditare lo
// stato "già mostrato" di un genitore condiviso via variant propagation. Con l'orchestrazione
// a genitore condiviso, un genitore persistente attraverso una navigazione client-side (es.
// cambio filtro categoria in /prodotti) che aveva già soddisfatto il proprio `viewport once:
// true` non ritrasmetteva correttamente lo stato ai nuovi figli montati in seguito con chiavi
// diverse, lasciandoli bloccati permanentemente a opacity:0 — causa della griglia "vuota" su
// filtri con pochi prodotti (Scarpe/Accessori). Con ogni item indipendente il bug è
// strutturalmente impossibile: ognuno controlla la propria intersezione col viewport al mount.
export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

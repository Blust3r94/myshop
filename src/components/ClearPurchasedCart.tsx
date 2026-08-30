"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/cart-store";

// Rimuove solo gli articoli effettivamente acquistati (non l'intero carrello):
// tra il redirect a Stripe e l'arrivo su questa pagina l'utente potrebbe aver
// aggiunto altri articoli al carrello da un'altra scheda.
//
// L'effetto va eseguito una sola volta al mount, non ad ogni cambio di
// `variantIds`: se un genitore si ri-renderizzasse leggendo lo stato del
// carrello (che questa stessa rimozione modifica) e passasse un nuovo array
// letterale ad ogni render, dipendere da `variantIds` in reference causerebbe
// un loop infinito di aggiornamenti.
export function ClearPurchasedCart({ variantIds }: { variantIds: string[] }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    variantIds.forEach((variantId) => removeItem(variantId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

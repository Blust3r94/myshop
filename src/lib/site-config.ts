// Nome del negozio: unico punto da cambiare per rinominare il brand
// (header, footer, metadata, titoli di pagina) senza toccare grafica o comportamento.
export const SITE_NAME = "MyShop";

// Email di contatto/assistenza, riusata nella pagina Contatti e nelle pagine legali.
export const SITE_CONTACT_EMAIL = "assistenza@myshop.it";

// Condizioni commerciali: cambiano da cliente a cliente. Centralizzate qui così
// homepage, scheda prodotto, Spedizioni, Resi e Termini restano coerenti tra
// loro con un solo punto da aggiornare, invece di più testi hardcoded separati
// che rischiano di andare fuori sincrono.
export const SHIPPING_TIME_SHORT = "48h"; // forma breve, per badge/homepage
export const SHIPPING_TIME_LABEL = "48 ore lavorative"; // forma estesa, per prosa
export const RETURN_WINDOW_DAYS = 30; // giorni per reso/recesso offerti
export const PAYMENT_PROVIDER_LABEL = "Stripe"; // gestore di pagamento mostrato al cliente

// Dati legali dell'azienda: non esistono nel codice, servono alle pagine
// Privacy / Termini e condizioni / Cookie Policy. Placeholder espliciti — vanno
// sostituiti con i dati reali del cliente prima di andare live, non sono valori
// di default utilizzabili così come sono.
export const LEGAL_ENTITY_NAME = "[Ragione sociale da inserire]";
export const LEGAL_VAT_NUMBER = "[Partita IVA da inserire]";
export const LEGAL_ADDRESS = "[Indirizzo sede legale da inserire]";

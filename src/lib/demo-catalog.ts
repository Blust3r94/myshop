// Catalogo dimostrativo, usato SOLO come fallback visivo quando il catalogo
// reale (Prisma/Neon) è vuoto — nessuna scrittura sul database. Permette di
// presentare homepage, catalogo e pagina prodotto già "popolati" prima che
// vengano inseriti i prodotti veri dal pannello admin.

export type DemoVariant = {
  id: string;
  size: string;
  color: string | null;
  sku: string;
  priceCents: number;
  stock: number;
};

export type DemoProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  variants: DemoVariant[];
  badge?: string;
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "demo-camicia-lino",
    slug: "camicia-in-lino",
    name: "Camicia in lino",
    category: "Abbigliamento",
    badge: "Novità",
    description:
      "Camicia in puro lino lavato, dalla vestibilità morbida e rilassata. Colletto classico, chiusura a bottoni in madreperla. Un capo essenziale che accompagna ogni stagione.",
    images: ["/demo/product-camicia-lino.jpg"],
    variants: [
      { id: "demo-camicia-lino-s-ecru", size: "S", color: "Ecru", sku: "DEMO-CL-S-ECR", priceCents: 6800, stock: 8 },
      { id: "demo-camicia-lino-m-ecru", size: "M", color: "Ecru", sku: "DEMO-CL-M-ECR", priceCents: 6800, stock: 5 },
      { id: "demo-camicia-lino-l-blu", size: "L", color: "Blu notte", sku: "DEMO-CL-L-BLU", priceCents: 6800, stock: 0 },
    ],
  },
  {
    id: "demo-pantalone-chino",
    slug: "pantalone-chino",
    name: "Pantalone chino",
    category: "Abbigliamento",
    description:
      "Pantalone chino in cotone elasticizzato, taglio dritto affusolato. Comodo per tutto il giorno, abbastanza versatile per l'ufficio e il tempo libero.",
    images: ["/demo/product-pantalone-chino.jpg"],
    variants: [
      { id: "demo-pantalone-chino-46", size: "46", color: "Beige", sku: "DEMO-PC-46-BEI", priceCents: 8900, stock: 6 },
      { id: "demo-pantalone-chino-48", size: "48", color: "Beige", sku: "DEMO-PC-48-BEI", priceCents: 8900, stock: 4 },
      { id: "demo-pantalone-chino-50", size: "50", color: "Verde oliva", sku: "DEMO-PC-50-VER", priceCents: 8900, stock: 3 },
    ],
  },
  {
    id: "demo-maglione-cotone",
    slug: "maglione-in-cotone",
    name: "Maglione in cotone",
    category: "Abbigliamento",
    description:
      "Maglione girocollo in cotone pettinato, maglia leggera. Una base pulita da abbinare a tutto, in tinta unita.",
    images: ["/demo/product-maglione-cotone.jpg"],
    variants: [
      { id: "demo-maglione-s", size: "S", color: "Grigio", sku: "DEMO-MC-S-GRI", priceCents: 7500, stock: 7 },
      { id: "demo-maglione-m", size: "M", color: "Grigio", sku: "DEMO-MC-M-GRI", priceCents: 7500, stock: 9 },
    ],
  },
  {
    id: "demo-giacca-leggera",
    slug: "giacca-leggera",
    name: "Giacca leggera",
    category: "Abbigliamento",
    badge: "Ultimi pezzi",
    description:
      "Giacca leggera imbottita, ideale per le mezze stagioni. Chiusura con zip, tasche a filo, fodera interna in rete.",
    images: ["/demo/product-giacca-leggera.jpg"],
    variants: [
      { id: "demo-giacca-m", size: "M", color: "Nero", sku: "DEMO-GL-M-NER", priceCents: 16500, stock: 4 },
      { id: "demo-giacca-l", size: "L", color: "Nero", sku: "DEMO-GL-L-NER", priceCents: 16500, stock: 2 },
    ],
  },
  {
    id: "demo-sneaker-pelle",
    slug: "sneaker-in-pelle",
    name: "Sneaker in pelle",
    category: "Scarpe",
    badge: "Best seller",
    description:
      "Sneaker in pelle pieno fiore, suola in gomma leggera. Un modello essenziale che si abbina a ogni look, dal casual al più curato.",
    images: ["/demo/product-sneaker-pelle.jpg"],
    variants: [
      { id: "demo-sneaker-40", size: "40", color: "Bianco", sku: "DEMO-SP-40-BIA", priceCents: 14500, stock: 5 },
      { id: "demo-sneaker-42", size: "42", color: "Bianco", sku: "DEMO-SP-42-BIA", priceCents: 14500, stock: 6 },
      { id: "demo-sneaker-44", size: "44", color: "Testa di moro", sku: "DEMO-SP-44-TDM", priceCents: 14500, stock: 0 },
    ],
  },
  {
    id: "demo-stivaletto-camoscio",
    slug: "stivaletto-in-camoscio",
    name: "Stivaletto in camoscio",
    category: "Scarpe",
    description:
      "Stivaletto in camoscio con fondo in cuoio, tacco basso. Lavorazione artigianale, forma slanciata.",
    images: ["/demo/product-stivaletto-camoscio.jpg"],
    variants: [
      { id: "demo-stivaletto-38", size: "38", color: "Cognac", sku: "DEMO-SC-38-COG", priceCents: 18900, stock: 3 },
      { id: "demo-stivaletto-40", size: "40", color: "Cognac", sku: "DEMO-SC-40-COG", priceCents: 18900, stock: 2 },
    ],
  },
  {
    id: "demo-borsa-tracolla",
    slug: "borsa-a-tracolla",
    name: "Borsa a tracolla",
    category: "Accessori",
    description:
      "Borsa a tracolla in pelle a grana pieno, chiusura con fibbia. Compartimento interno con tasca porta telefono.",
    images: ["/demo/product-borsa-tracolla.jpg"],
    variants: [
      { id: "demo-borsa-unica", size: "Unica", color: "Cognac", sku: "DEMO-BT-U-COG", priceCents: 12000, stock: 6 },
    ],
  },
  {
    id: "demo-cintura-cuoio",
    slug: "cintura-in-cuoio",
    name: "Cintura in cuoio",
    category: "Accessori",
    description:
      "Cintura in cuoio pieno fiore, fibbia in metallo brunito. Larghezza 3,5 cm, adatta sia al casual che all'elegante.",
    images: ["/demo/product-cintura-cuoio.jpg"],
    variants: [
      { id: "demo-cintura-90", size: "90", color: "Testa di moro", sku: "DEMO-CC-90-TDM", priceCents: 4500, stock: 10 },
      { id: "demo-cintura-100", size: "100", color: "Testa di moro", sku: "DEMO-CC-100-TDM", priceCents: 4500, stock: 8 },
    ],
  },
];

export function findDemoProduct(slug: string): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((p) => p.slug === slug);
}

export function minPriceCents(variants: { priceCents: number }[]): number | null {
  if (variants.length === 0) return null;
  return Math.min(...variants.map((v) => v.priceCents));
}

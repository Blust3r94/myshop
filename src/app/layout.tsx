import type { Metadata } from "next";
import { Bodoni_Moda, Work_Sans } from "next/font/google";
import { SITE_NAME } from "@/lib/site-config";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteDescription = `${SITE_NAME} — capi e accessori essenziali, pensati per durare. Materiali scelti con cura, forme senza tempo.`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: siteDescription,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: siteDescription,
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

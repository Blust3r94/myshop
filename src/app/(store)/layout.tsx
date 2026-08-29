import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Header/Footer del negozio pubblico: isolati in questo route group così
// l'area /admin (fuori da (store)) resta visivamente separata dal sito cliente.
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

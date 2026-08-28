import Link from "next/link";
import { logout } from "@/lib/admin-actions";

export function AdminNav() {
  return (
    <div className="flex items-center justify-between border-b border-line pb-4">
      <Link href="/admin" className="font-serif text-lg italic text-ink">
        Pannello admin
      </Link>
      <form action={logout}>
        <button
          type="submit"
          className="text-[13px] uppercase tracking-wide text-ink-muted transition hover:text-accent"
        >
          Esci
        </button>
      </form>
    </div>
  );
}

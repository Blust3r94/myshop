import Link from "next/link";
import { logout } from "@/lib/admin-actions";

export function AdminNav() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <Link href="/admin" className="text-sm font-semibold">
        Pannello admin
      </Link>
      <form action={logout}>
        <button type="submit" className="text-sm text-gray-500 underline">
          Esci
        </button>
      </form>
    </div>
  );
}

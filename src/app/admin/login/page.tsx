import { login } from "@/lib/admin-actions";

export default async function AdminLoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="mx-auto max-w-sm px-6 py-20">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Area riservata</p>
      <h1 className="mt-3 font-serif text-2xl text-ink">Accesso admin</h1>
      <form action={login} className="mt-8 space-y-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border border-line bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-accent px-4 py-3 text-[13px] uppercase tracking-wide text-paper transition-colors hover:bg-accent-deep"
        >
          Accedi
        </button>
      </form>
      {searchParams.error && <p className="mt-4 text-sm text-accent">{searchParams.error}</p>}
    </div>
  );
}

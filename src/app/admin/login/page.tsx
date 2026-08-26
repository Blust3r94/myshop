import { login } from "@/lib/admin-actions";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-xl font-bold">Accesso admin</h1>
      <form action={login} className="mt-6 space-y-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
        >
          Accedi
        </button>
      </form>
      {searchParams.error && <p className="mt-4 text-sm text-red-600">{searchParams.error}</p>}
    </div>
  );
}

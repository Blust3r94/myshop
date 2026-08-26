// Helper condiviso tra il middleware (Edge runtime, no modulo "crypto" di Node)
// e le server action di login/logout: Web Crypto API, disponibile in entrambi.

export const ADMIN_SESSION_COOKIE = "admin_session";

export async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

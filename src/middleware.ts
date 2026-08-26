import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, sha256Hex } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const expected = await sha256Hex(process.env.ADMIN_PASSWORD ?? "");

  if (cookie && cookie === expected) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

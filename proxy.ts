import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isProtected(pathname: string, method: string): boolean {
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/api/bookings" && method === "GET") return true;
  return false;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtected(pathname, request.method)) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_TOKEN;
  const auth = request.headers.get("authorization");

  if (expected && auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const separatorIndex = decoded.indexOf(":");
      const password = decoded.slice(separatorIndex + 1);
      if (password === expected) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentification requise.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Black Pixel Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/bookings"],
};

import { NextResponse, type NextRequest } from "next/server";

/**
 * Nonce-based Content Security Policy.
 *
 * A per-request nonce is the only way to run a CSP without `unsafe-inline` on
 * script-src, and unsafe-inline is what makes a CSP mostly decorative. The
 * cost is that pages render per request rather than being served as static
 * HTML; for a site of this size that trade is worth it, and the pages carry
 * no database work, so time-to-first-byte stays low.
 *
 * Fonts are self-hosted by next/font at build time, so no external font or
 * style origin needs to be allowed.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    // everything except static assets and the favicon
    {
      source: "/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

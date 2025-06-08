// middleware.ts - Enhanced Next.js middleware for cross-domain cookies
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define routes
  const protectedRoutes = [
    "/",
    "/home",
    "/frameworks",
    "/controls",
    "/technologies",
  ];
  const publicRoutes = ["/login", "/register", "/forget-password"];

  // Check route types
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Enhanced cookie reading - try multiple methods
  const accessToken = req.cookies.get("accessToken")?.value;

  // Also check the raw Cookie header for debugging
  const cookieHeader = req.headers.get("cookie");
  const allCookies = req.cookies.getAll();

  // Parse cookies manually as backup
  let manualAccessToken = null;
  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(/accessToken=([^;]+)/);
    manualAccessToken = tokenMatch ? tokenMatch[1] : null;
  }

  const finalToken = accessToken || manualAccessToken;

  // Comprehensive debug logging
  console.log("🔍 Middleware Debug:", {
    path,
    cookieHeader: cookieHeader
      ? `${cookieHeader.substring(0, 100)}...`
      : "none",
    allCookiesCount: allCookies.length,
    cookieNames: allCookies.map((c) => c.name),
    accessTokenFromCookies: !!accessToken,
    accessTokenFromHeader: !!manualAccessToken,
    finalTokenExists: !!finalToken,
    tokenPreview: finalToken ? `${finalToken.substring(0, 10)}...` : "none",
    isProtected: isProtectedRoute,
    isPublic: isPublicRoute,
    origin: req.headers.get("origin"),
    referer: req.headers.get("referer"),
  });

  // Protected route without token - redirect to login
  if (isProtectedRoute && !finalToken) {
    console.log("🔒 Redirecting to login - no access token found");
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("returnTo", path);
    return NextResponse.redirect(loginUrl);
  }

  // Public route with token - redirect to home
  if (isPublicRoute && finalToken) {
    console.log("🏠 Redirecting to home - user already authenticated");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // For all other cases, continue normally
  const response = NextResponse.next();

  // Add debug headers (remove in production)
  // if (process.env.NODE_ENV !== 'production') {
  //   response.headers.set('X-Debug-Path', path);
  //   response.headers.set('X-Debug-Token', finalToken ? 'present' : 'missing');
  //   response.headers.set('X-Debug-Cookies', allCookies.length.toString());
  // }

  return response;
}

export const config = {
  matcher: [
    // Be more specific about what to match
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};

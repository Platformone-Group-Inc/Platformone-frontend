import { NextRequest, NextResponse } from "next/server";

// Define the protected and public routes
const protectedRoutes = ["/", "/home", "/frameworks", "/controls", "/technologies"];
const publicRoutes = [
  "/login",
  "/register",
  "/forget-password",
  // Uncomment these as needed
  // "/confirm-account",
  // "/reset-password",
  // "/verify-mfa",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    route => path === route || path.startsWith(`${route}/`)
  );
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    route => path === route || path.startsWith(`${route}/`)
  );
  
  // Get the access token from cookies
  const accessToken = req.cookies.get("accessToken")?.value;

  // If it's a protected route and there's no access token, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If it's a public route and there is an access token, redirect to home
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // For all other routes, proceed normally
  return NextResponse.next();
}

// Define config to match paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|public).*)",
  ],
};
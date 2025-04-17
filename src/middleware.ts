import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes that don't need auth
  const isPublicPath = ["/", "/login", "/signup", "/verifyemail", "/forgotpassword", "/resetpassword"].includes(path);

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // Logged in users shouldn't go back to login/signup
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // Unauthenticated access to protected pages
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail",
    "/forgotpassword",
    "/resetpassword",
  ],
};

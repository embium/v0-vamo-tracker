import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for auth API routes (important for OAuth callbacks)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Check if user has a session by looking for session token cookie
  const sessionToken = 
    request.cookies.get("authjs.session-token")?.value || 
    request.cookies.get("__Secure-authjs.session-token")?.value

  // Protect dashboard routes - redirect to login if no session
  if (!sessionToken && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user has session and is on login/signup page, redirect to dashboard
  if (sessionToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

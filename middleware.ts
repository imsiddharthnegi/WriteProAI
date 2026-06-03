import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/features',
  '/pricing',
  '/api/suggestions(.*)',
  '/_next(.*)',
  '/favicon.ico',
])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  const { pathname } = request.nextUrl

  // Logged in user visiting login or signup
  // send them to dashboard
  if (userId && 
    (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    )
  }

  // Not logged in visiting protected route
  // send them to login
  if (!userId && !isPublicRoute(request)) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
}

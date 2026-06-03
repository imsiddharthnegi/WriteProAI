import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/pricing',
  '/features',
  '/favicon.ico',
  '/_next(.*)',
  '/api/suggestions',
])

export default clerkMiddleware((auth, request) => {
  const { userId } = auth()
  const { pathname } = request.nextUrl

  // If logged in and trying to access signup or login
  // redirect to dashboard
  if (userId && (pathname === '/signup' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If not logged in and trying to access protected route
  // redirect to login
  if (!isPublicRoute(request) && !userId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

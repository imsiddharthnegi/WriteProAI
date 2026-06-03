'use client'

import { ClerkProvider } from '@clerk/nextjs'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // If Clerk key is not set, skip ClerkProvider to prevent white screen
  if (!publishableKey || publishableKey === 'your_publishable_key_here') {
    console.warn('[WritePro] Clerk not configured - auth features disabled. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to .env.local')
    return <>{children}</>
  }

  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
}

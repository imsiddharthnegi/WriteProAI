'use client'

import { useEffect, Suspense } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

// Disable static generation for this page (requires auth)
export const dynamic = 'force-dynamic'

export default function OnboardingPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!userId) {
      router.push('/login')
      return
    }

    // Call user sync endpoint
    const syncUser = async () => {
      try {
        await fetch('/api/user/sync', { method: 'POST' })
      } catch (error) {
        console.error('Error syncing user:', error)
      } finally {
        // Redirect to dashboard after sync
        router.push('/dashboard')
      }
    }

    syncUser()
  }, [userId, isLoaded, router])

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-950 mb-4">Setting up your account...</h1>
        <p className="text-slate-600">You&apos;ll be redirected to your dashboard shortly.</p>
      </div>
    </div>
  )
}

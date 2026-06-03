'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function OnboardingContent() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!userId) {
      router.push('/login')
      return
    }

    // Call sync endpoint then redirect to dashboard
    async function syncUserAndRedirect() {
      try {
        await fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })
      } catch (error) {
        console.error('Error syncing user:', error)
      } finally {
        router.push('/dashboard')
      }
    }

    syncUserAndRedirect()
  }, [userId, isLoaded, router])

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <p>Setting up your account...</p>
    </div>
  )
}

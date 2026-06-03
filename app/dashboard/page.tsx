'use client'
export const dynamic = 'force-dynamic'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>
  if (!user) return null

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome, {user.firstName}!</h1>
      <p>You are logged in as {user.emailAddresses[0].emailAddress}</p>
      <p>Dashboard is working correctly.</p>
    </div>
  )
}

'use client'

import { useAuth } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function NavbarAuthSection() {
  const { isSignedIn } = useAuth()

  return isSignedIn ? (
    <UserButton />
  ) : (
    <>
      <Link
        href="/login"
        className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="text-sm font-medium text-white bg-teal-400 hover:brightness-110 px-4 py-2 transition-all duration-150 cursor-pointer"
        style={{ borderRadius: '6px' }}
      >
        Get Started
      </Link>
    </>
  )
}



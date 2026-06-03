'use client'

import dynamic from 'next/dynamic'

const SignupContent = dynamic(() => import('./signup-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Loading...</div>
})

export default function SignupPage() {
  return <SignupContent />
}


'use client'

import dynamic from 'next/dynamic'

const LoginContent = dynamic(() => import('./login-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Loading...</div>
})

export default function LoginPage() {
  return <LoginContent />
}

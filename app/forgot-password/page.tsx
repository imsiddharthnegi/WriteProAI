'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later with NextAuth
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background noise texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/%3E%3C/filter%3E%3Crect width="100" height="100" fill="white" filter="url(%23noise)"/%3E%3C/svg%3E")',
          backgroundSize: '100px 100px',
        }}
      />

      <div
        className="relative w-full max-w-sm p-10 border rounded"
        style={{
          backgroundColor: '#0f0f17',
          borderColor: '#1e1e2e',
          borderWidth: '1px',
        }}
      >
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <p className="text-xl font-bold text-white">WritePro</p>
        </Link>

        {/* Content based on state */}
        {!isSubmitted ? (
          <>
            {/* Input State */}
            <h1 className="text-white text-2xl font-bold text-center mb-2">Reset your password</h1>
            <p className="text-center text-gray-400 text-sm mb-8">
              Enter your email and we&apos;ll send you a reset link
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 rounded text-white placeholder-gray-500 transition-colors"
                  style={{
                    backgroundColor: '#0a0a0f',
                    borderColor: '#1e1e2e',
                    borderWidth: '1px',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
                />
              </div>

              {/* Send Reset Link Button */}
              <button
                type="submit"
                className="w-full py-3 rounded font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#6366f1' }}
              >
                Send Reset Link
              </button>
            </form>

            {/* Back to Login Link */}
            <p className="text-center mt-6">
              <Link href="/login" className="text-sm text-gray-400 transition-colors hover:opacity-80">
                ← Back to login
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="flex flex-col items-center">
              <CheckCircle size={48} className="mb-6" style={{ color: '#6366f1' }} />

              <h1 className="text-white text-2xl font-bold text-center mb-2">Check your inbox</h1>
              <p className="text-center text-gray-400 text-sm mb-8">
                We&apos;ve sent a password reset link to your email address. Check your spam folder if you don&apos;t see it.
              </p>

              {/* Back to Login Link */}
              <p className="text-center">
                <Link href="/login" className="text-sm transition-colors hover:opacity-80" style={{ color: '#6366f1' }}>
                  ← Back to login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

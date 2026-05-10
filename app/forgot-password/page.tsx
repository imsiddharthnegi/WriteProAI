'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later with NextAuth
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0f]">
      <div
        className="w-full max-w-sm p-12 border rounded-sm"
        style={{
          backgroundColor: '#0f0f17',
          borderColor: '#1e1e2e',
        }}
      >
        {!isSubmitted ? (
          <>
            {/* Back to Login Link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs text-[#71717a] hover:text-[#6366f1] transition-colors mb-8"
            >
              ← Back to login
            </Link>

            {/* Heading */}
            <h1 className="font-serif text-white text-2xl font-bold mb-3">Reset your password</h1>

            {/* Subtext */}
            <p className="text-[#71717a] text-sm mb-8">
              Enter your email and we&apos;ll send you a reset link
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[#71717a] text-xs uppercase mb-3 tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-white placeholder-[#5a5a66] transition-colors bg-[#0a0a0f] border border-[#1e1e2e] rounded-sm"
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
                />
              </div>

              {/* Send Reset Link Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#6366f1] text-white font-medium text-sm rounded-sm hover:opacity-90 transition-opacity"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0f] border border-[#6366f1] flex items-center justify-center mb-6">
                <Check size={24} style={{ color: '#6366f1' }} />
              </div>

              <h1 className="font-serif text-white text-2xl font-bold mb-3">Check your email</h1>

              <p className="text-[#71717a] text-sm mb-8">
                We sent a password reset link to your email address
              </p>

              {/* Resend Link */}
              <Link
                href="/login"
                className="text-xs text-[#6366f1] hover:text-white transition-colors"
              >
                ← Back to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

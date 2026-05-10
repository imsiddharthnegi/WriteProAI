'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later with NextAuth
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* Left Panel - Branding */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 border-r p-12"
        style={{
          backgroundColor: '#0f0f17',
          borderColor: '#1e1e2e',
        }}
      >
        <Link href="/" className="mb-8">
          <p className="text-4xl font-serif font-bold text-white">WritePro</p>
        </Link>
        <p className="text-[#71717a] text-sm text-center">
          AI writing for the modern professional
        </p>
        <div className="mt-12 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#6366f1' }} />
      </div>

      {/* Right Panel - Form */}
      <div
        className="flex flex-col items-center justify-center flex-1 px-6 py-12"
        style={{ backgroundColor: '#0a0a0f' }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block text-center mb-8">
            <p className="text-2xl font-serif font-bold text-white">WritePro</p>
          </Link>

          {/* Headline */}
          <h1 className="font-serif text-white text-3xl font-bold mb-2">Welcome back</h1>

          {/* Subtext */}
          <p className="text-[#71717a] text-sm mb-8">Sign in to your account</p>

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
                className="w-full px-4 py-3 text-white placeholder-[#5a5a66] transition-colors bg-[#0f0f17] border border-[#1e1e2e] rounded-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#71717a] text-xs uppercase mb-3 tracking-wide">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-white placeholder-[#5a5a66] transition-colors bg-[#0f0f17] border border-[#1e1e2e] rounded-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-[#71717a] hover:text-[#6366f1] transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#6366f1] text-white font-medium text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px" style={{ backgroundColor: '#1e1e2e' }} />
            <span className="text-[#71717a] text-xs">or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#1e1e2e' }} />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[#71717a] text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#6366f1] hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

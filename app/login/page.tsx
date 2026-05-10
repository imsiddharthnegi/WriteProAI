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

        {/* Headline */}
        <h1 className="text-white text-2xl font-bold text-center mb-2">Welcome back</h1>

        {/* Subtext */}
        <p className="text-center text-gray-400 text-sm mb-8">Sign in to your account</p>

        {/* Form */}
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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm" style={{ color: '#6366f1' }}>
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 rounded font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#6366f1' }}
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: '#1e1e2e' }} />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#1e1e2e' }} />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="transition-colors hover:opacity-80" style={{ color: '#6366f1' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

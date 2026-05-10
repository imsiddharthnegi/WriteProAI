'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const QUOTES = [
  { text: 'Writing is thinking on paper.', author: 'William Zinsser' },
  { text: 'The first draft is just you telling yourself the story.', author: 'Terry Pratchett' },
  { text: 'Rewrite. Rewrite. Rewrite.', author: 'Harold Evans' },
]

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later with NextAuth
  }

  const currentQuote = QUOTES[currentQuoteIndex]

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

      <div className="flex w-full max-w-2xl gap-0 relative">
        {/* Main Card */}
        <div
          className="flex-1 p-10 border rounded-l"
          style={{
            backgroundColor: '#0f0f17',
            borderColor: '#1e1e2e',
            borderWidth: '1px',
            borderRight: 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" className="block text-center mb-8">
            <p className="text-xl font-bold text-white">WritePro</p>
          </Link>

          {/* Headline */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">Create your account</h1>

          {/* Subtext */}
          <p className="text-center text-gray-400 text-sm mb-8">Start writing for free today</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-3 rounded font-bold text-white text-sm transition-opacity hover:opacity-90 mt-6"
              style={{ backgroundColor: '#6366f1' }}
            >
              Create Account
            </button>
          </form>

          {/* Terms Text */}
          <p className="text-center text-gray-500 text-xs mt-4">
            By signing up you agree to our{' '}
            <Link href="#" className="transition-colors hover:opacity-80" style={{ color: '#6366f1' }}>
              Terms
            </Link>
            {' '}and{' '}
            <Link href="#" className="transition-colors hover:opacity-80" style={{ color: '#6366f1' }}>
              Privacy Policy
            </Link>
          </p>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="transition-colors hover:opacity-80" style={{ color: '#6366f1' }}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Panel - Desktop Only */}
        <div
          className="hidden md:flex flex-1 p-10 border rounded-r flex-col items-center justify-center"
          style={{
            backgroundColor: '#0f0f17',
            borderColor: '#1e1e2e',
            borderWidth: '1px',
            borderLeft: 'none',
          }}
        >
          {/* Decorative Quote Mark */}
          <div
            className="text-6xl font-bold mb-6 opacity-40"
            style={{ color: '#6366f1' }}
          >
            "
          </div>

          {/* Quote Text */}
          <p className="text-white italic text-xl text-center mb-4 leading-relaxed">
            {currentQuote.text}
          </p>

          {/* Author */}
          <p className="text-gray-400 text-sm text-center">— {currentQuote.author}</p>
        </div>
      </div>
    </div>
  )
}

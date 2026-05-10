'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const QUOTES = [
  { text: 'Writing is thinking on paper.', author: 'William Zinsser' },
  { text: 'The first draft is just you telling yourself the story.', author: 'Terry Pratchett' },
  { text: 'Rewrite. Rewrite. Rewrite.', author: 'Harold Evans' },
]

function getPasswordStrength(password: string) {
  if (!password) return 'weak'
  if (password.length < 8) return 'weak'
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)

  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length
  if (strength < 2) return 'weak'
  if (strength < 3) return 'fair'
  return 'strong'
}

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later with NextAuth
  }

  const currentQuote = QUOTES[currentQuoteIndex]
  const passwordStrength = getPasswordStrength(password)

  const strengthColor = {
    weak: '#ef4444',
    fair: '#eab308',
    strong: '#22c55e',
  }[passwordStrength]

  const strengthLabel = {
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong',
  }[passwordStrength]

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* Left Panel - Form */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundColor: '#0a0a0f' }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block text-center mb-8">
            <p className="text-2xl font-serif font-bold text-white">WritePro</p>
          </Link>

          {/* Headline */}
          <h1 className="font-serif text-white text-3xl font-bold mb-2">Create your account</h1>

          {/* Subtext */}
          <p className="text-[#71717a] text-sm mb-8">Start writing for free today</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-[#71717a] text-xs uppercase mb-3 tracking-wide">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 text-white placeholder-[#5a5a66] transition-colors bg-[#0f0f17] border border-[#1e1e2e] rounded-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
              />
            </div>

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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="w-full h-1 bg-[#1e1e2e] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'fair' ? '66%' : '100%',
                        backgroundColor: strengthColor,
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[#71717a] text-xs uppercase mb-3 tracking-wide">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 text-white placeholder-[#5a5a66] transition-colors bg-[#0f0f17] border border-[#1e1e2e] rounded-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e2e')}
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#6366f1] text-white font-medium text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              Create Account
            </button>
          </form>

          {/* Terms Text */}
          <p className="text-center text-[#5a5a66] text-xs mt-6">
            By signing up you agree to our{' '}
            <Link href="#" className="text-[#6366f1] hover:text-white transition-colors">
              Terms
            </Link>
            {' '}and{' '}
            <Link href="#" className="text-[#6366f1] hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>

          {/* Sign In Link */}
          <p className="text-center text-[#71717a] text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#6366f1] hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Rotating Quotes */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 border-l p-12"
        style={{
          backgroundColor: '#0f0f17',
          borderColor: '#1e1e2e',
        }}
      >
        {/* Decorative Quote Mark */}
        <div className="text-6xl font-serif font-bold mb-8 opacity-30" style={{ color: '#6366f1' }}>
          "
        </div>

        {/* Quote Text */}
        <p className="text-white font-serif italic text-xl text-center mb-6 leading-relaxed">
          {currentQuote.text}
        </p>

        {/* Author */}
        <p className="text-[#71717a] text-sm text-center mb-8">— {currentQuote.author}</p>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {QUOTES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuoteIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuoteIndex ? 'bg-[#6366f1] w-6' : 'bg-[#1e1e2e]'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

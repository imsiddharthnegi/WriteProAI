'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const VALUE_PROPS = [
  'Write without second-guessing yourself.',
  'Your voice. Sharper.',
  'From draft to done. Faster.',
]

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [currentPropIndex, setCurrentPropIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [step, setStep] = useState<'signup' | 'onboarding'>('signup')
  const [selectedWritingType, setSelectedWritingType] = useState<string | null>(null)
  const [onboardingStep, setOnboardingStep] = useState(1)

  // Rotate value props every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPropIndex((prev) => (prev + 1) % VALUE_PROPS.length)
        setIsTransitioning(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to onboarding after signup
    setStep('onboarding')
  }

  const handleOnboardingContinue = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1)
      setSelectedWritingType(null)
    } else {
      // Complete onboarding - navigate to dashboard
      window.location.href = '/dashboard'
    }
  }

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-16">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                dot === onboardingStep
                  ? 'bg-teal-400'
                  : dot < onboardingStep
                    ? 'bg-teal-400'
                    : 'border border-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Onboarding Content */}
        <div className="max-w-2xl w-full">
          {onboardingStep === 1 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-semibold text-slate-950 mb-2">What do you write most?</h1>
                <p className="text-slate-600 text-sm">We&apos;ll tailor your experience.</p>
              </div>

              {/* Option Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '✉️', label: 'Emails & Comms' },
                  { emoji: '✍️', label: 'Blog & Content' },
                  { emoji: '📋', label: 'Technical Docs' },
                  { emoji: '💼', label: 'Business Writing' },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setSelectedWritingType(option.label)}
                    className={`h-14 border rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
                      selectedWritingType === option.label
                        ? 'border-teal-400 bg-teal-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl">{option.emoji}</span>
                    <span
                      className={`text-sm font-medium ${
                        selectedWritingType === option.label
                          ? 'text-slate-950'
                          : 'text-slate-600'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Continue Button */}
              <button
                onClick={handleOnboardingContinue}
                disabled={!selectedWritingType}
                className="w-full h-11 bg-teal-400 text-slate-950 font-semibold rounded-md hover:brightness-110 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>

              {/* Skip Link */}
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full text-center text-slate-500 text-sm hover:text-slate-600 transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-semibold text-slate-950 mb-2">Set your tone preferences</h1>
                <p className="text-slate-600 text-sm">Customize how WritePro suggests changes.</p>
              </div>

              <div className="space-y-3">
                {['Professional', 'Conversational', 'Creative', 'Technical'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedWritingType(tone)}
                    className={`w-full h-12 border rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedWritingType === tone
                        ? 'border-teal-400 bg-teal-50 text-slate-950'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              <button
                onClick={handleOnboardingContinue}
                className="w-full h-11 bg-teal-400 text-slate-950 font-semibold rounded-md hover:brightness-110 transition-all duration-150"
              >
                Continue →
              </button>

              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full text-center text-slate-500 text-sm hover:text-slate-600 transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-semibold text-slate-950 mb-2">You&apos;re all set!</h1>
                <p className="text-slate-600 text-sm">Start writing smarter with WritePro.</p>
              </div>

              <button
                onClick={handleOnboardingContinue}
                className="w-full h-11 bg-teal-400 text-slate-950 font-semibold rounded-md hover:brightness-110 transition-all duration-150"
              >
                Go to dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main Signup Page
  return (
    <div className="min-h-screen flex">
      {/* LEFT COLUMN - Dark */}
      <div
        className="hidden md:flex flex-1 flex-col items-start justify-between p-12"
        style={{ backgroundColor: '#0c0c0e' }}
      >
        {/* Logo */}
        <Link href="/" className="text-white text-lg font-semibold">
          Write<span className="text-teal-400">Pro</span>
        </Link>

        {/* Center - Rotating Value Props */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-sm space-y-6">
            <h2
              className="text-3xl font-light leading-tight text-white transition-opacity duration-300"
              style={{ opacity: isTransitioning ? 0.3 : 1 }}
            >
              {VALUE_PROPS[currentPropIndex]}
            </h2>

            {/* Social Proof */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>12,400+ writers signed up</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Login Link */}
        <div className="text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-400 hover:text-teal-300 transition-colors">
            Log in →
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN - White */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-slate-950 mb-8">Create your account</h1>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google Button */}
            <button className="w-full h-11 border border-slate-200 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors duration-150">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="5" y="18" fontSize="16" fill="#0c0c0e" fontWeight="bold">
                  G
                </text>
              </svg>
              <span className="text-sm font-medium text-slate-950">Continue with Google</span>
            </button>

            {/* GitHub Button */}
            <a
              href="https://github.com/imsiddharthnegi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 border border-slate-200 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors duration-150"
            >
              <svg className="w-5 h-5 fill-slate-950" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium text-slate-950">Continue with GitHub</span>
            </a>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full h-11 px-3 border border-slate-200 rounded-md text-sm placeholder-slate-500 text-slate-950 focus:outline-none focus:border-teal-400 transition-colors"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 border border-slate-200 rounded-md text-sm placeholder-slate-500 text-slate-950 focus:outline-none focus:border-teal-400 transition-colors"
            />

            {/* Password with Show/Hide */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-3 pr-10 border border-slate-200 rounded-md text-sm placeholder-slate-500 text-slate-950 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full h-11 bg-teal-400 text-slate-950 font-semibold rounded-md hover:brightness-110 transition-all duration-150 mt-6"
            >
              Start writing free →
            </button>
          </form>

          {/* Legal Text */}
          <p className="text-xs text-slate-500 text-center mt-6">
            By signing up you agree to our{' '}
            <a href="#" className="text-teal-400 hover:underline transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-teal-400 hover:underline transition-colors">
              Privacy Policy
            </a>
          </p>

          {/* Mobile Login Link */}
          <div className="md:hidden text-center mt-8 text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

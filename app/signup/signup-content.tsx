'use client'

import { SignUp } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

const VALUE_PROPS = [
  'Write without second-guessing yourself.',
  'Your voice. Sharper.',
  'From draft to done. Faster.',
]

const SOCIAL_PROOF = [
  '12,400+ Writers',
  'No credit card required',
  'Cancel anytime',
]

export default function SignupContent() {
  const [currentPropIndex, setCurrentPropIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Dark */}
      <div className="hidden lg:flex w-1/2 bg-[#0c0c0e] flex-col justify-between p-12">
        {/* Logo and Value Prop */}
        <div>
          <h1 className="text-lg font-semibold text-white mb-16">
            Write<span className="text-teal-400">Pro</span>
          </h1>

          {/* Rotating Value Prop */}
          <div className="min-h-24">
            <h2
              className={`text-3xl font-light leading-tight text-white transition-all duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {VALUE_PROPS[currentPropIndex]}
            </h2>
          </div>
        </div>

        {/* Social Proof */}
        <div className="space-y-4">
          {SOCIAL_PROOF.map((proof, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <p className="text-slate-400 text-sm">{proof}</p>
            </div>
          ))}
        </div>

        {/* Login Link */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span>Already have an account?</span>
          <a href="/login" className="text-teal-400 hover:text-teal-300 transition-colors">
            Log in
          </a>
        </div>
      </div>

      {/* Right Column - White with Clerk Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SignUp
            afterSignUpUrl="/onboarding"
            afterSignInUrl="/dashboard"
            redirectUrl="/onboarding"
            appearance={{
              variables: {
                colorPrimary: '#2dd4bf',
                colorBackground: '#ffffff',
                colorText: '#0c0c0e',
                colorInputBackground: '#ffffff',
                colorInputText: '#0c0c0e',
                borderRadius: '6px',
                fontFamily: 'inherit',
              },
              elements: {
                formButtonPrimary:
                  'bg-teal-400 text-slate-950 font-medium hover:brightness-110 transition-all duration-150 cursor-pointer',
                card: 'shadow-none border border-slate-200 bg-white',
                formFieldInput:
                  'border border-slate-200 rounded-md focus:border-teal-400 focus:outline-none transition-colors',
                formFieldLabel: 'text-slate-950 text-sm font-medium',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-400',
                socialButtonsBlockButton:
                  'border border-slate-200 rounded-md text-slate-950 hover:bg-slate-50 transition-colors',
                headerTitle: 'text-2xl font-semibold text-slate-950',
                headerSubtitle: 'text-slate-600 text-sm',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

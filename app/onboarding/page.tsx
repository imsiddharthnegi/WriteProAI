'use client'

import dynamic from 'next/dynamic'

const OnboardingContent = dynamic(() => import('./onboarding-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Setting up account...</div>
})

export default function OnboardingPage() {
  return <OnboardingContent />
}

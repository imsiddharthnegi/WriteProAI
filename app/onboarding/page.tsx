'use client'
export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const OnboardingContent = dynamicImport(() => import('./onboarding-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Setting up account...</div>
})

export default function OnboardingPage() {
  return <OnboardingContent />
}

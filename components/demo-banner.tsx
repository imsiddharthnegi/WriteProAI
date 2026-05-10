'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return null
  }

  return (
    <div className="w-full bg-[#1e1a4e] border-b border-[#3730a3] px-4 py-2.5 flex items-center justify-center gap-2 relative">
      <span className="text-white text-[13px]">👀 You&apos;re viewing a demo.</span>
      <Link href="/signup" className="text-[#a5b4fc] text-[13px] hover:underline">
        Sign up free to save your work →
      </Link>
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-4 text-[#a5b4fc] hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  )
}

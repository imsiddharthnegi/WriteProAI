'use client'

import { Progress } from '@/components/ui/progress'

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
      {/* Words Used Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-6">
        <p className="text-[#71717a] text-xs uppercase font-medium mb-4">Words Used</p>
        <p className="text-white text-2xl font-bold mb-4">5,000 / 10,000</p>
        <Progress value={50} className="h-1 bg-[#1e1e2e]" />
      </div>

      {/* Current Plan Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-6">
        <p className="text-[#71717a] text-xs uppercase font-medium mb-4">Current Plan</p>
        <p className="text-white text-2xl font-bold mb-4">Free</p>
        <a
          href="/dashboard/settings"
          className="inline-block bg-[#6366f1] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#4f46e5] transition-colors"
        >
          Upgrade
        </a>
      </div>

      {/* Projects Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-6">
        <p className="text-[#71717a] text-xs uppercase font-medium mb-4">Projects</p>
        <p className="text-white text-2xl font-bold mb-4">3</p>
        <p className="text-[#71717a] text-xs">this month</p>
      </div>
    </div>
  )
}

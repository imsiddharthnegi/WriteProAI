'use client'

import { Progress } from '@/components/ui/progress'

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
      {/* Words Used Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] border-l-2 border-l-[#6366f1] rounded-[4px] p-6">
        <p className="text-[#71717a] text-[11px] uppercase font-medium mb-4 tracking-wider">Words Used</p>
        <p className="text-white text-[28px] font-serif font-bold mb-4">5,000 / 10,000</p>
        <Progress value={50} className="h-[3px] bg-[#1e1e2e]" />
      </div>

      {/* Current Plan Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] border-l-2 border-l-[#6366f1] rounded-[4px] p-6">
        <p className="text-[#71717a] text-[11px] uppercase font-medium mb-4 tracking-wider">Current Plan</p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-white text-[28px] font-serif font-bold">Free</p>
          <a
            href="/dashboard/settings"
            className="text-[#6366f1] text-[12px] font-medium hover:text-[#4f46e5] transition-colors"
          >
            Upgrade
          </a>
        </div>
      </div>

      {/* Projects Card */}
      <div className="bg-[#0f0f17] border border-[#1e1e2e] border-l-2 border-l-[#6366f1] rounded-[4px] p-6">
        <p className="text-[#71717a] text-[11px] uppercase font-medium mb-4 tracking-wider">Projects This Month</p>
        <p className="text-white text-[28px] font-serif font-bold mb-4">3</p>
      </div>
    </div>
  )
}

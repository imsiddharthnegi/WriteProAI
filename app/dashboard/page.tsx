'use client'

import DashboardSidebar from '@/components/dashboard-sidebar'
import DemoBanner from '@/components/demo-banner'
import StatCards from '@/components/stat-cards'
import RecentProjects from '@/components/recent-projects'

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <DemoBanner />
      <div className="flex flex-1 md:pl-[220px]">
        <DashboardSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-5 md:p-10 md:pb-20 pb-28">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-white text-[22px] font-serif">Good morning, John</h1>
            <p className="text-[#71717a] text-[13px] mt-2">{currentDate}</p>
          </div>
          <a
            href="/dashboard/write"
            className="bg-[#6366f1] text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#4f46e5] transition-colors"
          >
            New Project
          </a>
        </div>

        {/* Stat Cards */}
        <StatCards />

        {/* Recent Projects */}
        <RecentProjects />
      </main>
      </div>
    </div>
  )
}

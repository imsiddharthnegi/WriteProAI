'use client'

import DashboardSidebar from '@/components/dashboard-sidebar'
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
    <div className="flex min-h-screen bg-[#0a0a0f] md:pl-60">
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-10 md:pb-20 pb-28">
        <div>
          <h1 className="text-white text-4xl font-bold">Good morning, John</h1>
          <p className="text-[#71717a] text-sm mt-2">{currentDate}</p>
        </div>

        {/* Stat Cards */}
        <StatCards />

        {/* Recent Projects */}
        <RecentProjects />
      </main>
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'

// Dynamically import the dashboard with no SSR to prevent useAuth errors during build
const DashboardContent = dynamic(() => import('./dashboard-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Loading dashboard...</div>
})

export default function DashboardPage() {
  return <DashboardContent />
}

'use client'

import DashboardSidebar from '@/components/dashboard-sidebar'
import WriterEditor from '@/components/writer-editor'

export default function WritePage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] md:pl-60">
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1">
        <WriterEditor />
      </main>
    </div>
  )
}

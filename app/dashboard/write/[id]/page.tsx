'use client'

import { useParams } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard-sidebar'
import DemoBanner from '@/components/demo-banner'
import WriterEditor from '@/components/writer-editor'

export default function WriteIdPage() {
  const params = useParams()
  const projectId = params.id as string

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <DemoBanner />
      <div className="flex flex-1 md:pl-60">
        <DashboardSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1">
          <WriterEditor projectId={projectId} />
        </main>
      </div>
    </div>
  )
}

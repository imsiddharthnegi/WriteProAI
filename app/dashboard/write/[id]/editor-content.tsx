'use client'

import { useParams, Suspense } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard-sidebar'
import DemoBanner from '@/components/demo-banner'
import WriterEditor from '@/components/writer-editor'

export default function EditorContent() {
  // Guard: Show unavailable message if Clerk isn't configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'your_publishable_key_here') {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0f] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Editor Unavailable</h2>
          <p className="text-slate-400">Please configure Clerk authentication to use the editor.</p>
        </div>
      </div>
    )
  }

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

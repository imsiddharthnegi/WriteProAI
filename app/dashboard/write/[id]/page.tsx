'use client'

import dynamic from 'next/dynamic'

// Dynamically import the editor with no SSR to prevent useAuth errors during build
const EditorContent = dynamic(() => import('./editor-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen text-white">Loading editor...</div>
})

export default function WriteIdPage() {
  return <EditorContent />
}

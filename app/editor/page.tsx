'use client'

import React from 'react'
import { Bold, Italic, Heading2, List, ChevronDown } from 'lucide-react'

const writingModes = ['Blog', 'Email', 'Technical', 'Creative', 'Social']

const SkeletonLoader = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-full bg-slate-100 rounded animate-pulse" />
      </div>
    ))}
  </div>
)

export default function EditorPage() {
  const [activeMode, setActiveMode] = React.useState('Blog')
  const [content, setContent] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<Array<{ type: string; text: string }> | null>(null)
  const [wordCount, setWordCount] = React.useState(0)
  const [isSaved, setIsSaved] = React.useState(true)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setWordCount(e.target.value.trim().split(/\s+/).filter(w => w).length)
    setIsSaved(false)
    
    // Simulate AI suggestions after 500ms of typing
    if (e.target.value.length > 10) {
      setTimeout(() => {
        setSuggestions([
          { type: 'Clarity', text: 'Replace "very important" with "critical"' },
          { type: 'Tone', text: 'Make the sentence more conversational' },
          { type: 'Concision', text: 'Reduce word count by 15%' },
        ])
        setIsSaved(true)
      }, 500)
    }
  }

  return (
    <div className="flex h-screen bg-[#fafaf9]">
      {/* Left Sidebar - Mode Selector */}
      <aside className="w-[180px] bg-white border-r border-slate-200 p-6 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          Writing Mode
        </div>
        <nav className="space-y-1">
          {writingModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors relative border-l-2 ${
                activeMode === mode
                  ? 'border-l-teal-400 text-slate-950 font-semibold'
                  : 'border-l-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </nav>
      </aside>

      {/* Center - Editor */}
      <main className="flex-1 flex flex-col bg-white border-r border-slate-200 max-w-[680px]">
        {/* Toolbar */}
        <div className="border-b border-slate-200 p-4 flex items-center gap-2 bg-white">
          <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Bold">
            <Bold size={18} className="text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Italic">
            <Italic size={18} className="text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Heading 2">
            <Heading2 size={18} className="text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Bullet List">
            <List size={18} className="text-slate-600" />
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing, or paste your content here..."
            className="flex-1 w-full bg-white text-slate-950 placeholder-slate-400 focus:outline-none resize-none text-base leading-relaxed"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 flex items-center justify-between text-sm bg-white">
          <div className="text-slate-500">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </div>
          <div className={`flex items-center gap-1 ${isSaved ? 'text-green-600' : 'text-slate-500'}`}>
            {isSaved ? '✓ All changes saved' : 'Saving...'}
          </div>
        </div>
      </main>

      {/* Right Sidebar - AI Suggestions */}
      <aside className="w-[280px] bg-white border-l border-slate-200 p-6 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          Suggestions
        </div>

        {suggestions === null ? (
          <SkeletonLoader />
        ) : suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white bg-teal-500 px-2 py-1 rounded">
                    {suggestion.type}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {suggestion.text}
                </p>
                <button className="text-xs font-medium text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50 transition-colors">
                  Apply
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Start writing to get suggestions.
          </div>
        )}
      </aside>
    </div>
  )
}

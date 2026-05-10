'use client'

import { useState, useCallback, useEffect } from 'react'
import { Zap } from 'lucide-react'

const WRITING_MODES = ['Blog', 'Email', 'Technical', 'Creative']

const MOCK_SUGGESTIONS = [
  {
    id: 1,
    category: 'CLARITY',
    suggestion: 'Replace passive voice with active constructions to improve impact.'
  },
  {
    id: 2,
    category: 'TONE',
    suggestion: 'The opening paragraph could be more engaging. Try leading with a question.'
  },
  {
    id: 3,
    category: 'CONCISENESS',
    suggestion: 'Consider breaking this into shorter sentences for better readability.'
  }
]

export default function WriterEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [writingMode, setWritingMode] = useState('Blog')
  const [wordCount, setWordCount] = useState(0)
  const [saveStatus, setSaveStatus] = useState('saved')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)

  // Calculate word count
  const calculateWordCount = useCallback((text: string) => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    return words.length
  }, [])

  // Update word count when content changes
  useEffect(() => {
    const count = calculateWordCount(content)
    setWordCount(count)
  }, [content, calculateWordCount])

  // Handle content change with save status
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setSaveStatus('saving')

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Set new timeout for save status
    const newTimeout = setTimeout(() => {
      setSaveStatus('saved')
    }, 1500)

    setSaveTimeout(newTimeout)
  }

  // Handle title change with save status
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setSaveStatus('saving')

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Set new timeout for save status
    const newTimeout = setTimeout(() => {
      setSaveStatus('saved')
    }, 1500)

    setSaveTimeout(newTimeout)
  }

  // Handle get suggestions button click
  const handleGetSuggestions = () => {
    setLoadingSuggestions(true)
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setLoadingSuggestions(false)
      setShowSuggestions(true)
    }, 1500)
  }

  // Handle dismiss suggestion
  const handleDismissSuggestion = () => {
    setShowSuggestions(false)
  }

  // Show get suggestions button when word count exceeds 50
  const showGetSuggestionsButton = wordCount > 50

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      {/* Left Column - Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Toolbar */}
        <div className="sticky top-0 border-b border-[#1e1e2e] bg-[#0a0a0f] px-12 py-4 flex items-center justify-between z-10">
          {/* Left: Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled Document"
            className="flex-1 bg-transparent text-white text-lg font-serif placeholder-[#5a5a66] border-0 outline-none"
          />

          {/* Right: Writing Mode Selector & Save Button */}
          <div className="flex items-center gap-6">
            {/* Writing Mode Pills */}
            <div className="flex gap-1 bg-transparent">
              {WRITING_MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setWritingMode(mode)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    writingMode === mode
                      ? 'bg-[#6366f1] text-white rounded'
                      : 'text-[#71717a] hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Save Button */}
            <button
              className="px-3 py-1 text-xs border border-[#1e1e2e] text-[#71717a] hover:border-[#6366f1] hover:text-white transition-colors rounded"
            >
              Save
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-auto px-12 py-8">
          {/* Textarea */}
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing here..."
            className="w-full text-[#e4e4f0] text-base leading-relaxed font-serif bg-transparent border-0 outline-none resize-none placeholder-[#5a5a66] focus:outline-none"
            style={{ minHeight: '600px' }}
          />
        </div>

        {/* Bottom Word Count */}
        <div className="px-12 py-4 text-xs text-[#71717a]">
          {wordCount} words
        </div>
      </div>

      {/* Right Column - AI Suggestions Panel */}
      <div className="hidden lg:flex flex-col w-72 bg-[#0f0f17] border-l border-[#1e1e2e] p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Zap size={14} className="text-[#6366f1]" />
          <h2 className="text-xs uppercase text-[#71717a] font-medium tracking-wide">
            AI Suggestions
          </h2>
        </div>

        {/* Get Suggestions Button */}
        {showGetSuggestionsButton && !showSuggestions && !loadingSuggestions && (
          <button
            onClick={handleGetSuggestions}
            className="w-full px-4 py-2 border border-[#6366f1] text-[#6366f1] text-xs rounded mb-6 hover:bg-[#6366f1]/10 transition-colors"
          >
            Get Suggestions
          </button>
        )}

        {/* Skeleton Loading State */}
        {loadingSuggestions && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-sm p-3 animate-pulse">
                <div className="h-2 bg-[#1e1e2e] rounded mb-2 w-16"></div>
                <div className="h-2 bg-[#1e1e2e] rounded mb-1 w-full"></div>
                <div className="h-2 bg-[#1e1e2e] rounded w-4/5"></div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion Cards */}
        {showSuggestions && !loadingSuggestions && (
          <div className="space-y-3">
            {MOCK_SUGGESTIONS.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-sm p-4 hover:border-[#6366f1] transition-colors"
              >
                <h3 className="text-[#6366f1] text-xs uppercase font-medium mb-2 tracking-wide">
                  {suggestion.category}
                </h3>
                <p className="text-[#a1a1b5] text-xs leading-relaxed mb-3">
                  {suggestion.suggestion}
                </p>
                <button className="w-full px-3 py-1 text-xs bg-[#6366f1] text-white rounded hover:opacity-90 transition-opacity">
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!showSuggestions && !loadingSuggestions && !showGetSuggestionsButton && (
          <div className="text-center py-8">
            <Zap size={20} className="text-[#6366f1] mx-auto mb-3 opacity-50" />
            <p className="text-xs text-[#71717a]">Select text to get AI suggestions</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Download } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const WRITING_MODES = ['blog', 'email', 'technical', 'creative', 'social']

const MOCK_SUGGESTIONS = [
  {
    id: 1,
    category: 'Grammar',
    suggestion: 'Consider breaking this into shorter sentences for better readability.'
  },
  {
    id: 2,
    category: 'Clarity',
    suggestion: 'Replace passive voice with active constructions to improve impact.'
  },
  {
    id: 3,
    category: 'Tone',
    suggestion: 'The opening paragraph could be more engaging. Try leading with a question.'
  }
]

interface WriterEditorProps {
  projectId: string
}

export default function WriterEditor({ projectId }: WriterEditorProps) {
  const { userId } = useAuth()
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [writingMode, setWritingMode] = useState('blog')
  const [wordCount, setWordCount] = useState(0)
  const [saveStatus, setSaveStatus] = useState('All changes saved ✓')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [loading, setLoading] = useState(true)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Calculate word count
  const calculateWordCount = useCallback((text: string) => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    return words.length
  }, [])

  // Load project data on mount
  useEffect(() => {
    if (!userId || !projectId) return

    async function loadProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('user_id', userId)
          .single()

        if (!error && data) {
          setTitle(data.name)
          setContent(data.content || '')
          setWritingMode(data.mode || 'blog')
          setWordCount(calculateWordCount(data.content || ''))
        }
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [userId, projectId])

  // Update word count when content changes
  useEffect(() => {
    const count = calculateWordCount(content)
    setWordCount(count)
  }, [content, calculateWordCount])

  // Debounced save to Supabase
  const saveToSupabase = useCallback(
    async (newTitle: string, newContent: string, newMode: string) => {
      if (!userId || !projectId) return

      try {
        const newWordCount = calculateWordCount(newContent)
        await supabase
          .from('projects')
          .update({
            name: newTitle,
            content: newContent,
            word_count: newWordCount,
            mode: newMode,
            last_edited: new Date().toISOString(),
          })
          .eq('id', projectId)
          .eq('user_id', userId)

        setSaveStatus('All changes saved ✓')
      } catch (error) {
        console.error('Error saving project:', error)
        setSaveStatus('Save failed — retrying')
      }
    },
    [userId, projectId, calculateWordCount]
  )

  // Handle content change with debounced save
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setSaveStatus('Saving...')

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      saveToSupabase(title, e.target.value, writingMode)
    }, 1000)
  }

  // Handle title change with save
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setSaveStatus('Saving...')

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      saveToSupabase(e.target.value, content, writingMode)
    }, 1000)
  }

  // Handle mode change with immediate save
  const handleModeChange = (newMode: string) => {
    setWritingMode(newMode)
    setSaveStatus('Saving...')
    saveToSupabase(title, content, newMode)
  }

  // Handle get suggestions button click
  const handleGetSuggestions = () => {
    setLoadingSuggestions(true)
    setTimeout(() => {
      setLoadingSuggestions(false)
      setShowSuggestions(true)
    }, 1500)
  }

  // Handle dismiss suggestion
  const handleDismissSuggestion = () => {
    setShowSuggestions(false)
  }

  // Show warning banner when word count exceeds 80
  const showWarningBanner = wordCount > 80

  // Show get suggestions button when word count exceeds 50
  const showGetSuggestionsButton = wordCount > 50

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      {/* Left Column - Editor (65%) */}
      <div className="flex-1 flex flex-col overflow-hidden md:w-2/3 w-full">
        <div className="flex-1 overflow-auto p-5 md:p-10">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled"
            className="w-full text-white text-3xl font-bold bg-transparent border-0 outline-none border-b border-[#1e1e2e] pb-2 mb-6 placeholder-[#5a5a66] focus:outline-none focus:border-[#1e1e2e]"
          />

          {/* Writing Mode Dropdown */}
          <div className="mb-6">
            <select
              value={writingMode}
              onChange={(e) => handleModeChange(e.target.value)}
              className="w-full md:w-48 bg-[#0f0f17] border border-[#1e1e2e] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1e1e2e]"
            >
              {WRITING_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing here..."
            className="w-full text-white text-base leading-[1.8] bg-transparent border-0 outline-none resize-none placeholder-[#5a5a66] focus:outline-none"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1e1e2e] px-5 md:px-10 py-3 flex items-center justify-between bg-[#0a0a0f]">
          <div className="text-[#71717a] text-sm">
            {wordCount} words
          </div>
          <div className="text-[#71717a] text-sm">
            {saveStatus}
          </div>
          <button className="px-4 py-2 border border-[#6366f1] text-[#6366f1] text-sm rounded hover:bg-[#6366f1]/10 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Right Column - AI Suggestions Panel (35%) */}
      <div className="hidden md:flex flex-col w-1/3 bg-[#0f0f17] border-l border-[#1e1e2e] p-6 overflow-auto">
        {/* Warning Banner */}
        {showWarningBanner && (
          <div className="mb-6 p-3 bg-[#451a03] border border-[#92400e] rounded text-[#f59e0b] text-sm">
            Approaching your monthly limit. Upgrade for more.
          </div>
        )}

        {/* Header */}
        <h2 className="text-white text-base font-bold mb-2">AI Suggestions</h2>
        <p className="text-[#71717a] text-sm mb-6">
          {wordCount === 0 ? 'Start writing to get suggestions' : 'Get AI-powered writing suggestions'}
        </p>

        {/* Get Suggestions Button */}
        {showGetSuggestionsButton && !showSuggestions && (
          <button
            onClick={handleGetSuggestions}
            disabled={loadingSuggestions}
            className="w-full px-4 py-2 border border-[#6366f1] text-[#6366f1] text-sm rounded hover:bg-[#6366f1]/10 transition-colors disabled:opacity-50 mb-6"
          >
            {loadingSuggestions ? 'Loading...' : 'Get Suggestions'}
          </button>
        )}

        {/* Skeleton Loading State */}
        {loadingSuggestions && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded p-4 animate-pulse">
                <div className="h-4 bg-[#1e1e2e] rounded mb-2 w-20"></div>
                <div className="h-3 bg-[#1e1e2e] rounded mb-2 w-full"></div>
                <div className="h-3 bg-[#1e1e2e] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion Cards */}
        {showSuggestions && !loadingSuggestions && (
          <div className="space-y-4">
            {MOCK_SUGGESTIONS.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-[#0a0a0f] border border-[#1e1e2e] rounded p-4"
              >
                <h3 className="text-white text-sm font-bold mb-2">{suggestion.category}</h3>
                <p className="text-[#71717a] text-sm mb-4">{suggestion.suggestion}</p>
                <div className="flex gap-2">
                  <button className="text-[#6366f1] text-sm hover:underline transition-colors">
                    Apply
                  </button>
                  <button
                    onClick={handleDismissSuggestion}
                    className="text-[#71717a] text-sm hover:underline transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Suggestions Below Editor */}
      <div className="md:hidden w-full md:w-1/3 bg-[#0f0f17] border-t border-[#1e1e2e] p-5">
        {/* Warning Banner */}
        {showWarningBanner && (
          <div className="mb-4 p-3 bg-[#451a03] border border-[#92400e] rounded text-[#f59e0b] text-sm">
            Approaching your monthly limit. Upgrade for more.
          </div>
        )}

        {/* Header */}
        <h2 className="text-white text-base font-bold mb-2">AI Suggestions</h2>
        <p className="text-[#71717a] text-sm mb-4">
          {wordCount === 0 ? 'Start writing to get suggestions' : 'Get AI-powered writing suggestions'}
        </p>

        {/* Get Suggestions Button */}
        {showGetSuggestionsButton && !showSuggestions && (
          <button
            onClick={handleGetSuggestions}
            disabled={loadingSuggestions}
            className="w-full px-4 py-2 border border-[#6366f1] text-[#6366f1] text-sm rounded hover:bg-[#6366f1]/10 transition-colors disabled:opacity-50 mb-4"
          >
            {loadingSuggestions ? 'Loading...' : 'Get Suggestions'}
          </button>
        )}

        {/* Skeleton Loading State */}
        {loadingSuggestions && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0a0a0f] border border-[#1e1e2e] rounded p-4 animate-pulse">
                <div className="h-4 bg-[#1e1e2e] rounded mb-2 w-20"></div>
                <div className="h-3 bg-[#1e1e2e] rounded mb-2 w-full"></div>
                <div className="h-3 bg-[#1e1e2e] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion Cards */}
        {showSuggestions && !loadingSuggestions && (
          <div className="space-y-4">
            {MOCK_SUGGESTIONS.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-[#0a0a0f] border border-[#1e1e2e] rounded p-4"
              >
                <h3 className="text-white text-sm font-bold mb-2">{suggestion.category}</h3>
                <p className="text-[#71717a] text-sm mb-4">{suggestion.suggestion}</p>
                <div className="flex gap-2">
                  <button className="text-[#6366f1] text-sm hover:underline transition-colors">
                    Apply
                  </button>
                  <button
                    onClick={handleDismissSuggestion}
                    className="text-[#71717a] text-sm hover:underline transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

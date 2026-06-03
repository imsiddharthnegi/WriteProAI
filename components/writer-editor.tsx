'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Download, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const WRITING_MODES = ['blog', 'email', 'technical', 'creative', 'social']

interface WriterEditorProps {
  projectId: string
}

interface Suggestion {
  type: string
  issue: string
  original: string
  improved: string
  reason: string
}

const typeColors: Record<string, { bg: string; text: string }> = {
  Clarity: { bg: '#f0fdfa', text: '#0d9488' },
  Tone: { bg: '#eff6ff', text: '#0284c7' },
  Conciseness: { bg: '#fff7ed', text: '#ea580c' },
  'Word Choice': { bg: '#faf5ff', text: '#a855f7' },
  Structure: { bg: '#f0fdf4', text: '#16a34a' },
  Grammar: { bg: '#fef2f2', text: '#dc2626' }
}

export default function WriterEditor({ projectId }: WriterEditorProps) {
  const { userId } = useAuth()
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [writingMode, setWritingMode] = useState('blog')
  const [wordCount, setWordCount] = useState(0)
  const [saveStatus, setSaveStatus] = useState('All changes saved ✓')
  const [loading, setLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null)
  const [lastAnalyzedText, setLastAnalyzedText] = useState('')
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const lastFetchTime = useRef(0)

  // Calculate word count
  const calculateWordCount = useCallback((text: string) => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    return words.length
  }, [])

  // Fetch suggestions from Gemini API
  const fetchSuggestions = useCallback(async (text: string, mode: string) => {
    // Rate limit — max once every 10 seconds
    const now = Date.now()
    if (now - lastFetchTime.current < 10000) return
    lastFetchTime.current = now

    // Don't re-fetch if text hasn't changed
    if (text === lastAnalyzedText) return

    // Minimum 30 words before fetching
    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 30) {
      setSuggestions([])
      return
    }

    setSuggestionsLoading(true)
    setSuggestionsError(null)

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode })
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      setSuggestions(data.suggestions || [])
      setLastAnalyzedText(text)
    } catch (err) {
      setSuggestionsError('Couldn\'t load suggestions.')
    } finally {
      setSuggestionsLoading(false)
    }
  }, [lastAnalyzedText])

  // Load project data on mount
  useEffect(() => {
    if (!userId || !projectId || !supabase) return

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
        console.error('[WritePro] Error loading project:', error)
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

  // Fetch suggestions after 3 seconds of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim()) {
        fetchSuggestions(content, writingMode)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [content, writingMode, fetchSuggestions])

  // Fetch suggestions when writing mode changes
  useEffect(() => {
    if (content.trim() && content.trim().split(/\s+/).length >= 30) {
      fetchSuggestions(content, writingMode)
    }
  }, [writingMode])

  // Debounced save to Supabase
  const saveToSupabase = useCallback(
    async (newTitle: string, newContent: string, newMode: string) => {
      if (!userId || !projectId || !supabase) return

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
        console.error('[WritePro] Error saving project:', error)
        setSaveStatus('Save failed — retrying')
      }
    },
    [userId, projectId, calculateWordCount, supabase]
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

  // Apply suggestion and remove it from list
  const applySuggestion = (original: string, improved: string, index: number) => {
    const newContent = content.replace(original, improved)
    setContent(newContent)
    setSuggestions(prev => prev.filter((_, i) => i !== index))
    setSaveStatus('Saving...')
    saveToSupabase(title, newContent, writingMode)
  }

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
          <div className="flex items-center gap-4">
            <div className="text-[#71717a] text-[11px]">
              ⌘K for suggestions · ⌘S to save · ⌘E to export
            </div>
            <button className="px-4 py-2 border border-[#6366f1] text-[#6366f1] text-sm rounded hover:bg-[#6366f1]/10 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - AI Suggestions Panel (35%) */}
      <div className="hidden md:flex flex-col w-1/3 bg-[#0f0f17] border-l border-[#1e1e2e] p-6 overflow-auto">
        <h2 className="text-white text-base font-bold mb-2">AI Suggestions</h2>

        {/* Empty State */}
        {wordCount < 30 && suggestions.length === 0 && !suggestionsLoading && (
          <div className="flex items-center justify-center flex-1">
            <p className="text-[#a1a1aa] text-sm text-center">Write at least 30 words to get suggestions.</p>
          </div>
        )}

        {/* Loading State with Skeleton */}
        {suggestionsLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="h-2 bg-[#e5e7eb] rounded-full w-15" style={{ width: '60px' }}></div>
                <div className="h-3 bg-[#f4f4f4] rounded w-full"></div>
                <div className="h-3 bg-[#f4f4f4] rounded" style={{ width: '70%' }}></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {suggestionsError && (
          <div className="space-y-3">
            <p className="text-[#52525b] text-sm">{suggestionsError}</p>
            <button
              onClick={() => fetchSuggestions(content, writingMode)}
              className="text-[#06b6d4] text-sm hover:underline"
            >
              Try again →
            </button>
          </div>
        )}

        {/* Suggestions List */}
        {suggestions.length > 0 && !suggestionsLoading && (
          <div className="space-y-0">
            {suggestions.map((suggestion, index) => {
              const colors = typeColors[suggestion.type] || typeColors.Clarity
              return (
                <div key={index}>
                  {/* Type Badge */}
                  <div
                    className="inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 mt-4"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {suggestion.type.toUpperCase()}
                  </div>

                  {/* Issue Text */}
                  <p className="text-[#52525b] text-sm italic mb-3">{suggestion.issue}</p>

                  {/* Before/After Comparison */}
                  <div className="space-y-2 mb-3">
                    <div className="text-[#71717a] text-xs">Before:</div>
                    <div className="text-sm text-[#18181b] line-through">{suggestion.original}</div>

                    <div className="text-[#71717a] text-xs mt-2">After:</div>
                    <div className="text-sm text-[#18181b] border-l-2 border-[#06b6d4] pl-3">{suggestion.improved}</div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-end mb-3">
                    <button
                      onClick={() => applySuggestion(suggestion.original, suggestion.improved, index)}
                      className="text-[#06b6d4] text-sm hover:underline"
                    >
                      Apply →
                    </button>
                  </div>

                  {/* Divider */}
                  {index < suggestions.length - 1 && (
                    <div className="border-t border-[#f4f4f4] mt-4"></div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Mobile Suggestions Below Editor */}
      <div className="md:hidden w-full md:w-1/3 bg-[#0f0f17] border-t border-[#1e1e2e] p-5">
        <h2 className="text-white text-base font-bold mb-2">AI Suggestions</h2>

        {/* Empty State */}
        {wordCount < 30 && suggestions.length === 0 && !suggestionsLoading && (
          <p className="text-[#a1a1aa] text-sm">Write at least 30 words to get suggestions.</p>
        )}

        {/* Loading State with Skeleton */}
        {suggestionsLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="h-2 bg-[#e5e7eb] rounded-full w-15" style={{ width: '60px' }}></div>
                <div className="h-3 bg-[#f4f4f4] rounded w-full"></div>
                <div className="h-3 bg-[#f4f4f4] rounded" style={{ width: '70%' }}></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {suggestionsError && (
          <div className="space-y-3">
            <p className="text-[#52525b] text-sm">{suggestionsError}</p>
            <button
              onClick={() => fetchSuggestions(content, writingMode)}
              className="text-[#06b6d4] text-sm hover:underline"
            >
              Try again →
            </button>
          </div>
        )}

        {/* Suggestions List */}
        {suggestions.length > 0 && !suggestionsLoading && (
          <div className="space-y-0">
            {suggestions.map((suggestion, index) => {
              const colors = typeColors[suggestion.type] || typeColors.Clarity
              return (
                <div key={index}>
                  {/* Type Badge */}
                  <div
                    className="inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 mt-4"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {suggestion.type.toUpperCase()}
                  </div>

                  {/* Issue Text */}
                  <p className="text-[#52525b] text-sm italic mb-3">{suggestion.issue}</p>

                  {/* Before/After Comparison */}
                  <div className="space-y-2 mb-3">
                    <div className="text-[#71717a] text-xs">Before:</div>
                    <div className="text-sm text-[#18181b] line-through">{suggestion.original}</div>

                    <div className="text-[#71717a] text-xs mt-2">After:</div>
                    <div className="text-sm text-[#18181b] border-l-2 border-[#06b6d4] pl-3">{suggestion.improved}</div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex justify-end mb-3">
                    <button
                      onClick={() => applySuggestion(suggestion.original, suggestion.improved, index)}
                      className="text-[#06b6d4] text-sm hover:underline"
                    >
                      Apply →
                    </button>
                  </div>

                  {/* Divider */}
                  {index < suggestions.length - 1 && (
                    <div className="border-t border-[#f4f4f4] mt-4"></div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

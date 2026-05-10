'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Trash2, Edit2, FolderOpen } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard-sidebar'
import DemoBanner from '@/components/demo-banner'

interface Project {
  id: string
  title: string
  mode: string
  words: number
  lastEdited: string
}

const allProjects: Project[] = [
  { id: '1', title: 'Q4 Campaign Brief', mode: 'Blog Post', words: 1240, lastEdited: '2 hours ago' },
  { id: '2', title: 'Product Launch Email', mode: 'Email', words: 380, lastEdited: 'Yesterday' },
  { id: '3', title: 'Technical Docs Draft', mode: 'Technical Article', words: 2100, lastEdited: '3 days ago' },
  { id: '4', title: 'Social Campaign Copy', mode: 'Social Media', words: 620, lastEdited: '1 week ago' },
  { id: '5', title: 'Brand Voice Guide', mode: 'Creative Writing', words: 480, lastEdited: '2 weeks ago' },
]

const modeColors: Record<string, string> = {
  'Blog Post': '#6366f1',
  'Email': '#6366f1',
  'Technical Article': '#6366f1',
  'Social Media': '#6366f1',
  'Creative Writing': '#6366f1',
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Latest')
  const [showSortMenu, setShowSortMenu] = useState(false)

  const sortOptions = ['Latest', 'Oldest', 'Most Words', 'Least Words']

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = allProjects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      if (sortBy === 'Latest') {
        return 0
      } else if (sortBy === 'Oldest') {
        return 0
      } else if (sortBy === 'Most Words') {
        return b.words - a.words
      } else if (sortBy === 'Least Words') {
        return a.words - b.words
      }
      return 0
    })

    return filtered
  }, [searchTerm, sortBy])

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <DemoBanner />
      <div className="flex flex-1 md:pl-60">
        <DashboardSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-5 md:p-10 md:pb-20 pb-28">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-white text-[28px] font-bold">Projects</h1>
            <p className="text-[#71717a] text-sm mt-2">All your writing projects in one place</p>
          </div>
          <Link
            href="/dashboard/write"
            className="bg-[#6366f1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#4f46e5] transition-colors"
          >
            New Project
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 mb-6">
          <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded-full px-3.5 py-1.5 inline-flex">
            <p className="text-[#71717a] text-[13px]">5 Total Projects</p>
          </div>
          <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded-full px-3.5 py-1.5 inline-flex">
            <p className="text-[#71717a] text-[13px]">3 This Month</p>
          </div>
          <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded-full px-3.5 py-1.5 inline-flex">
            <p className="text-[#71717a] text-[13px]">4,820 Total Words</p>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#71717a]" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f0f17] border border-[#1e1e2e] text-white placeholder-[#71717a] rounded px-4 py-2.5 pl-10 w-72 focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="bg-[#0f0f17] border border-[#1e1e2e] text-white rounded px-4 py-2.5 flex items-center gap-2 hover:border-[#6366f1] transition-colors text-sm"
            >
              Sort by: {sortBy}
              <ChevronDown size={16} />
            </button>

            {showSortMenu && (
              <div className="absolute top-full mt-2 left-0 bg-[#0f0f17] border border-[#1e1e2e] rounded shadow-lg z-10 min-w-48">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option)
                      setShowSortMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === option ? 'text-[#6366f1] bg-[#1e1e2e]' : 'text-white hover:bg-[#1e1e2e]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Free Plan Banner */}
        <div className="bg-[#1e1a4e] border border-[#3730a3] rounded px-4 py-3 mb-6 flex items-center justify-between">
          <p className="text-white text-sm">Free plan: 5 project limit reached.</p>
          <Link
            href="/pricing"
            className="text-[#6366f1] text-sm font-medium hover:text-[#818cf8] transition-colors"
          >
            Upgrade to Pro for unlimited projects →
          </Link>
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-5 hover:border-[#6366f1] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-medium text-base">{project.title}</h3>
                </div>

                <div className="mb-4">
                  <div className="inline-flex bg-[#6366f1] text-white px-2.5 py-1 rounded-full text-xs font-medium mb-3">
                    {project.mode}
                  </div>
                </div>

                <p className="text-[#71717a] text-sm mb-1">{project.words.toLocaleString()} words</p>
                <p className="text-[#71717a] text-xs mb-4">Edited {project.lastEdited}</p>

                <div className="flex items-center gap-3 pt-3 border-t border-[#1e1e2e]">
                  <button className="text-[#71717a] hover:text-[#6366f1] transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-[#71717a] hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <FolderOpen size={48} className="text-[#71717a] mb-4" />
            <h3 className="text-white text-lg font-medium mb-1">No projects found</h3>
            <p className="text-[#71717a] text-sm">Try a different search term</p>
          </div>
        )}
      </main>
      </div>
    </div>
  )
}

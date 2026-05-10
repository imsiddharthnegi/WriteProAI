'use client'

import { Pencil, Trash2 } from 'lucide-react'

interface Project {
  id: string
  name: string
  words: number
  lastEdited: string
}

const projects: Project[] = [
  { id: '1', name: 'Q4 Campaign Brief', words: 1240, lastEdited: '2 hours ago' },
  { id: '2', name: 'Product Launch Email', words: 380, lastEdited: 'Yesterday' },
  { id: '3', name: 'Technical Docs Draft', words: 2100, lastEdited: '3 days ago' },
]

export default function RecentProjects() {
  const hasProjects = projects.length > 0

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-[16px] font-medium">Recent Projects</h2>
        <a
          href="/dashboard/write"
          className="bg-[#6366f1] text-white px-4 py-2 rounded-[4px] text-[13px] font-medium hover:bg-[#4f46e5] transition-colors"
        >
          New Project
        </a>
      </div>

      {!hasProjects ? (
        <div className="flex flex-col items-center justify-center py-12 border border-[#1e1e2e] rounded-[4px]">
          <p className="text-[#71717a] text-[14px] mb-4">No projects yet — create your first one</p>
          <a
            href="/dashboard/write"
            className="text-[#6366f1] text-[13px] font-medium hover:text-[#4f46e5] transition-colors"
          >
            New Project
          </a>
        </div>
      ) : (
        <div className="border border-[#1e1e2e] rounded-[4px] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 bg-transparent px-6 py-4 border-b border-[#1e1e2e]">
            <div className="text-[#71717a] text-[11px] uppercase font-medium tracking-wider">Name</div>
            <div className="text-[#71717a] text-[11px] uppercase font-medium tracking-wider">Words</div>
            <div className="text-[#71717a] text-[11px] uppercase font-medium tracking-wider">Last Edited</div>
            <div className="text-[#71717a] text-[11px] uppercase font-medium tracking-wider">Actions</div>
          </div>

          {/* Table Rows */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#1e1e2e] text-white hover:bg-[#1e1e2e] transition-colors ${
                index % 2 === 1 ? 'bg-[#0f0f17]' : ''
              }`}
            >
              <div className="text-[14px] font-medium">{project.name}</div>
              <div className="text-[14px] text-[#71717a]">{project.words.toLocaleString()} words</div>
              <div className="text-[14px] text-[#71717a]">{project.lastEdited}</div>
              <div className="flex items-center gap-3">
                <button className="text-[#71717a] hover:text-[#6366f1] transition-colors">
                  <Pencil size={16} />
                </button>
                <button className="text-[#71717a] hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

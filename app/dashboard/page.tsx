'use client'

import React from 'react'
import { Plus, MoreHorizontal, Home, FileText, BarChart3, Users, Settings } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Q4 Marketing Campaign',
    words: '12,450',
    lastEdited: '2 hours ago',
    mode: 'Blog',
  },
  {
    id: 2,
    name: 'Product Launch Email',
    words: '3,200',
    lastEdited: '1 day ago',
    mode: 'Email',
  },
  {
    id: 3,
    name: 'Technical Documentation',
    words: '28,900',
    lastEdited: '3 days ago',
    mode: 'Technical',
  },
  {
    id: 4,
    name: 'Social Media Copy',
    words: '1,850',
    lastEdited: '5 days ago',
    mode: 'Blog',
  },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = React.useState('dashboard')
  const usedWords = 45400
  const totalWords = 100000

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#111113] border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="text-sm font-semibold text-white">WritePro</div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-white bg-slate-900'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900/50'
                }`}
              >
                {isActive && <div className="absolute left-0 w-0.5 h-6 bg-teal-400 rounded-r" />}
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="border-t border-slate-800 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">John Doe</div>
              <div className="text-xs text-slate-500">john@example.com</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded text-xs font-medium text-teal-400">
            Pro Plan
          </div>
          <button className="w-full text-xs font-medium text-teal-400 hover:text-teal-300 py-2 border border-teal-400/20 rounded hover:border-teal-400/40 transition-colors">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8">
          {/* Greeting */}
          <div className="mb-12">
            <h1 className="font-serif text-5xl font-light text-slate-950 mb-2">
              Good morning, John
            </h1>
            <p className="text-sm text-slate-500">Tuesday, November 21, 2024</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {/* Suggestions Used */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="text-3xl font-light text-slate-950 mb-1">1,247</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Suggestions Used</div>
            </div>

            {/* Words Improved */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="text-3xl font-light text-slate-950 mb-1">45,892</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Words Improved</div>
            </div>

            {/* Words Used (with inline progress bar) */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-light text-slate-950">45.4K</span>
                <span className="text-xs text-slate-500">/100K</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400"
                    style={{ width: `${(usedWords / totalWords) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-slate-950">Projects</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer duration-150">
              <Plus size={16} />
              New Project
            </button>
          </div>

          {/* Projects Table */}
          <div className="border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-950 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-950 uppercase tracking-widest">Words</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-950 uppercase tracking-widest">Last Edited</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-950 uppercase tracking-widest">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-950 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, idx) => (
                  <tr
                    key={project.id}
                    className={`border-b border-slate-200 hover:bg-[#f4f4f5] transition-colors cursor-pointer ${
                      idx === projects.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-slate-950 font-medium">{project.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{project.words}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{project.lastEdited}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1">
                        {project.mode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer duration-150">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

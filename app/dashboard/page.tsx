'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Plus, MoreHorizontal, Home, FileText, BarChart3, Users, Settings, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

// Disable static generation for this page (requires auth)
export const dynamic = 'force-dynamic'

interface User {
  id: string
  email: string
  full_name: string
  plan: string
  words_used: number
  words_limit: number
}

interface Project {
  id: string
  name: string
  word_count: number
  last_edited: string
  mode: string
  user_id: string
}

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [userData, setUserData] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Guard: Show loading screen if Clerk isn't configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'your_publishable_key_here') {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0c0c0e] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Dashboard Unavailable</h2>
          <p className="text-slate-400">Please configure Clerk authentication to access the dashboard.</p>
        </div>
      </div>
    )
  }

  // Guard: Redirect to login if not authenticated
  if (isLoaded && !userId) {
    router.push('/login')
    return null
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    if (!isLoaded || !userId) return
    if (!supabase) {
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        const [{ data: user }, { data: projectList }] = await Promise.all([
          supabase.from('users').select('*').eq('id', userId).single(),
          supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('last_edited', { ascending: false })
            .limit(10),
        ])

        setUserData(user)
        setProjects(projectList || [])
      } catch (error) {
        console.error('[WritePro] Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, isLoaded, supabase])

  const handleNewProject = async () => {
    if (!userId || !supabase) return

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          name: 'Untitled',
          content: '',
          word_count: 0,
          mode: 'blog',
        })
        .select()
        .single()

      if (!error && data) {
        router.push(`/dashboard/write/${data.id}`)
      }
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    if (!supabase) return

    try {
      await supabase.from('projects').delete().eq('id', projectId).eq('user_id', userId)
      setProjects(projects.filter(p => p.id !== projectId))
    } catch (error) {
      console.error('[WritePro] Error deleting project:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const firstName = userData?.full_name?.split(' ')[0] || 'User'
  const usedWords = userData?.words_used || 0
  const totalWords = userData?.words_limit || 10000

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
              <div className="text-xs font-semibold text-white truncate">{userData?.full_name || 'User'}</div>
              <div className="text-xs text-slate-500">{userData?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded text-xs font-medium text-teal-400 capitalize">
            {userData?.plan || 'free'} Plan
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
              Good morning, {firstName}
            </h1>
            <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {/* Suggestions Used */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="text-3xl font-light text-slate-950 mb-1">—</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Suggestions Used</div>
            </div>

            {/* Words Improved */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="text-3xl font-light text-slate-950 mb-1">—</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Words Improved</div>
            </div>

            {/* Words Used (with inline progress bar) */}
            <div className="border-b-2 border-b-teal-400 pb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-light text-slate-950">{(usedWords / 1000).toFixed(1)}K</span>
                <span className="text-xs text-slate-500">/{(totalWords / 1000).toFixed(0)}K</span>
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
            <button
              onClick={handleNewProject}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer duration-150"
            >
              <Plus size={16} />
              New Project
            </button>
          </div>

          {/* Projects Table */}
          {projects.length > 0 ? (
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
                      onClick={() => router.push(`/dashboard/write/${project.id}`)}
                    >
                      <td className="px-6 py-4 text-sm text-slate-950 font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{project.word_count.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDistanceToNow(new Date(project.last_edited), { addSuffix: true })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 capitalize">
                          {project.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProject(project.id)
                          }}
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer duration-150"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-slate-200 p-12 text-center">
              <p className="text-slate-500 text-sm">No projects yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

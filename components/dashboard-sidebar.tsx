'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, PenLine, Settings, LogOut } from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'

export default function DashboardSidebar() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const isMobile = useMobile()

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/dashboard/projects' },
    { id: 'write', label: 'Write', icon: PenLine, href: '/dashboard/write' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ]

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f17] border-t border-[#1e1e2e] flex justify-around h-20 md:hidden z-50">
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-colors ${
                activeTab === link.id ? 'text-white' : 'text-[#71717a]'
              } hover:text-white`}
            >
              <Icon size={24} />
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <aside className="fixed left-0 top-0 w-60 bg-[#0f0f17] border-r border-[#1e1e2e] h-screen flex flex-col hidden md:flex">
      {/* Top Section */}
      <div className="p-6">
        <h1 className="text-white text-lg font-bold">WritePro</h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-6 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeTab === link.id
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all ${
                isActive
                  ? 'bg-[#1e1e2e] text-white'
                  : 'text-[#71717a] hover:bg-[#1e1e2e]'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="p-6 border-t border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">John Doe</p>
            <p className="text-[#71717a] text-xs truncate">Free Plan</p>
          </div>
          <button className="text-[#71717a] hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}

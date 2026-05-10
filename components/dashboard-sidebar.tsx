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
    <aside className="fixed left-0 top-0 w-[220px] bg-[#0a0a0f] border-r border-[#1e1e2e] h-screen flex flex-col hidden md:flex">
      {/* Top Section - Logo */}
      <div className="p-4">
        <h1 className="text-white text-lg font-serif">
          WritePro<span className="italic text-[#6366f1]">AI</span>
        </h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeTab === link.id
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[4px] transition-all text-[14px] relative ${
                isActive
                  ? 'bg-[#1e1e2e] text-white border-l-2 border-l-[#6366f1]'
                  : 'text-[#71717a] hover:bg-rgba(99,102,241,0.06) hover:text-white'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#6366f1]' : ''} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="p-4 border-t border-[#1e1e2e]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-medium truncate">John Doe</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="bg-[#6366f1] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

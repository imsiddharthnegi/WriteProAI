'use client'

import { useState } from 'react'
import DashboardSidebar from '@/components/dashboard-sidebar'

export default function SettingsPage() {
  const [autoSave, setAutoSave] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [defaultMode, setDefaultMode] = useState('Blog Post')

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account and all data? This cannot be undone.')) {
      // Handle account deletion
      alert('Account deleted')
    }
  }

  const writingModes = ['Blog Post', 'Email', 'Social Media', 'Product Description', 'Ad Copy']

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] md:pl-60">
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-10 md:pb-20 pb-28">
        <div className="mb-8">
          <h1 className="text-white text-2xl md:text-[28px] font-bold">Settings</h1>
        </div>

        {/* Profile Section */}
        <div>
          <h2 className="text-white text-lg font-bold pb-3 border-b border-[#1e1e2e] mb-6">Profile</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[#71717a] text-sm mb-2 block">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="text-[#71717a] text-sm mb-2 block">Email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  defaultValue="john@example.com"
                  disabled
                  className="flex-1 bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-[#6366f1]"
                />
                <span className="bg-[#052e16] text-[#4ade80] text-xs px-2 py-1 rounded whitespace-nowrap">Verified</span>
              </div>
            </div>
          </div>

          <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded font-medium transition-colors ml-auto block">
            Save Changes
          </button>
        </div>

        {/* Password Section */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold pb-3 border-b border-[#1e1e2e] mb-6">Password</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[#71717a] text-sm mb-2 block">Current Password</label>
              <input
                type="password"
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="text-[#71717a] text-sm mb-2 block">New Password</label>
              <input
                type="password"
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="text-[#71717a] text-sm mb-2 block">Confirm New Password</label>
              <input
                type="password"
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-3 text-white text-sm focus:outline-none focus:border-[#6366f1]"
              />
            </div>
          </div>

          <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded font-medium transition-colors ml-auto block">
            Update Password
          </button>
        </div>

        {/* Writing Preferences Section */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold pb-3 border-b border-[#1e1e2e] mb-6">Writing Preferences</h2>
          
          <div className="space-y-4">
            {/* Default Writing Mode */}
            <div className="flex items-center justify-between py-3 border-b border-[#1e1e2e]">
              <label className="text-white text-sm">Default Writing Mode</label>
              <select
                value={defaultMode}
                onChange={(e) => setDefaultMode(e.target.value)}
                className="bg-[#0f0f17] border border-[#1e1e2e] text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-[#6366f1]"
              >
                {writingModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-save Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-[#1e1e2e]">
              <label className="text-white text-sm">Auto-save</label>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoSave ? 'bg-[#6366f1]' : 'bg-[#1e1e2e]'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            {/* AI Suggestions Toggle */}
            <div className="flex items-center justify-between py-3">
              <label className="text-white text-sm">AI Suggestions</label>
              <button
                onClick={() => setAiSuggestions(!aiSuggestions)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  aiSuggestions ? 'bg-[#6366f1]' : 'bg-[#1e1e2e]'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    aiSuggestions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold pb-3 border-b border-[#ef4444] mb-4">Danger Zone</h2>
          <p className="text-[#71717a] text-sm mb-4">Permanently delete your account and all data</p>
          
          <button
            onClick={handleDeleteAccount}
            className="border border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white px-6 py-2.5 rounded font-medium transition-colors"
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  )
}

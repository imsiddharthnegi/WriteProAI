'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import DashboardSidebar from '@/components/dashboard-sidebar'

export default function SettingsPage() {
  const { user } = useUser()
  const [autoSave, setAutoSave] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [defaultMode, setDefaultMode] = useState('Blog Post')
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [saving, setSaving] = useState(false)

  const writingModes = ['Blog Post', 'Email', 'Social Media', 'Product Description', 'Ad Copy']
  const email = user?.emailAddresses?.[0]?.emailAddress || ''

  const handleSaveChanges = async () => {
    setSaving(true)
    // TODO: Implement actual save logic
    setTimeout(() => setSaving(false), 1000)
  }

  const handleUpdatePassword = async () => {
    // TODO: Implement password update logic
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account and all data? This cannot be undone.')) {
      // TODO: Implement account deletion logic
    }
  }

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    background: '#fafaf9'
  }

  const mainStyle = {
    flex: 1,
    padding: '48px',
    paddingLeft: '280px'
  }

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 300,
    letterSpacing: '-0.02em',
    color: '#0c0c0e',
    marginBottom: '32px'
  }

  const sectionHeadingStyle = {
    fontSize: '16px',
    fontWeight: 600,
    color: '#0c0c0e',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
    marginBottom: '24px'
  }

  const labelStyle = {
    fontSize: '13px',
    color: '#52525b',
    fontWeight: 500,
    marginBottom: '6px',
    display: 'block'
  }

  const inputStyle = {
    width: '100%',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    height: '44px',
    fontSize: '14px',
    padding: '0 12px',
    color: '#0c0c0e',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
  }

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    paddingRight: '32px',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%220c0c0e%22 stroke-width=%222%22%3e%3cpolyline points=%226 9 12 15 18 9%22%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px',
  }

  const primaryButtonStyle = {
    background: '#2dd4bf',
    color: '#0c0c0e',
    fontWeight: 600,
    padding: '0 16px',
    height: '44px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    opacity: saving ? 0.7 : 1,
    pointerEvents: saving ? 'none' : 'auto'
  }

  const dangerButtonStyle = {
    background: 'white',
    color: '#ef4444',
    border: '1px solid #ef4444',
    fontWeight: 600,
    padding: '0 16px',
    height: '44px',
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }

  const verifiedBadgeStyle = {
    background: '#ccfbf1',
    color: '#0d9488',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    fontWeight: 500
  }

  const toggleStyle = (isActive) => ({
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    background: isActive ? '#2dd4bf' : '#e5e7eb',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s'
  })

  const toggleDotStyle = (isActive) => ({
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    top: '2px',
    left: isActive ? '22px' : '2px',
    transition: 'left 0.2s'
  })

  return (
    <div style={containerStyle}>
      <DashboardSidebar />
      <main style={mainStyle}>
        <h1 style={titleStyle}>Settings</h1>

        {/* Profile Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={sectionHeadingStyle}>Profile</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Email</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="email"
                value={email}
                disabled
                style={{ ...inputStyle, flex: 1, background: '#f5f5f4', cursor: 'not-allowed' }}
              />
              <span style={verifiedBadgeStyle}>Verified</span>
            </div>
          </div>

          <button
            onClick={handleSaveChanges}
            style={primaryButtonStyle}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Password Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={sectionHeadingStyle}>Password</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Confirm New Password</label>
            <input
              type="password"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            onClick={handleUpdatePassword}
            style={primaryButtonStyle}
          >
            Update Password
          </button>
        </div>

        {/* Writing Preferences Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={sectionHeadingStyle}>Writing Preferences</h2>
          
          {/* Default Writing Mode */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Default Writing Mode</label>
            <select
              value={defaultMode}
              onChange={(e) => setDefaultMode(e.target.value)}
              style={selectStyle}
              onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              {writingModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-save Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Auto-save</label>
            <button
              onClick={() => setAutoSave(!autoSave)}
              style={toggleStyle(autoSave)}
            >
              <div style={toggleDotStyle(autoSave)} />
            </button>
          </div>

          {/* AI Suggestions Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>AI Suggestions</label>
            <button
              onClick={() => setAiSuggestions(!aiSuggestions)}
              style={toggleStyle(aiSuggestions)}
            >
              <div style={toggleDotStyle(aiSuggestions)} />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 style={{ ...sectionHeadingStyle, borderBottomColor: '#ef4444' }}>Danger Zone</h2>
          <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '16px' }}>
            Permanently delete your account and all data
          </p>
          <button
            onClick={handleDeleteAccount}
            style={dangerButtonStyle}
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  )
}

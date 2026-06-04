'use client'

import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardContent() {
  const { userId, isLoaded: authLoaded } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoaded && !userId) {
      router.push('/login')
    }
  }, [authLoaded, userId, router])

  useEffect(() => {
    if (!userId) return
    const supabase = createClient()
    if (!supabase) {
      setLoading(false)
      return
    }

    async function fetchData() {
      const [{ data: userData }, { data: projects }] = 
        await Promise.all([
          supabase.from('users')
            .select('*')
            .eq('id', userId)
            .single(),
          supabase.from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('last_edited', { ascending: false })
            .limit(10)
        ])
      setUserData(userData)
      setProjects(projects || [])
      setLoading(false)
    }

    fetchData()
  }, [userId])

  const handleNewProject = async () => {
    const supabase = createClient()
    if (!supabase || !userId) return
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        name: 'Untitled',
        content: '',
        word_count: 0,
        mode: 'blog'
      })
      .select()
      .single()
    if (!error && data) {
      router.push(`/dashboard/write/${data.id}`)
    }
  }

  const handleDelete = async (projectId) => {
    if (!confirm('Delete this project?')) return
    const supabase = createClient()
    if (!supabase) return
    setProjects(prev => 
      prev.filter(p => p.id !== projectId)
    )
    await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', userId)
  }

  const getRelativeTime = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const firstName = user?.firstName || 
    user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 
    'there'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const wordsUsed = userData?.words_used ?? 0
  const wordsLimit = userData?.words_limit ?? 10000
  const progressPercent = Math.min(
    (wordsUsed / wordsLimit) * 100, 100
  )

  if (!authLoaded || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0c0c0e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#a1a1aa',
        fontFamily: 'inherit'
      }}>
        Loading...
      </div>
    )
  }

  if (!userId) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafaf9',
      fontFamily: 'inherit'
    }}>
      
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '220px',
        height: '100vh',
        background: '#111113',
        borderRight: '1px solid #1f1f23',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 20px 32px',
          borderBottom: '1px solid #1f1f23'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'white'
          }}>
            Write<span style={{ color: '#2dd4bf' }}>Pro</span>
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {[
            { label: 'Dashboard', href: '/dashboard', active: true },
            { label: 'New Project', href: '#', onClick: handleNewProject },
            { label: 'Settings', href: '/dashboard/settings' },
          ].map((item) => (
            <div
              key={item.label}
              onClick={item.onClick || 
                (() => router.push(item.href))}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '14px',
                color: item.active ? 'white' : '#71717a',
                borderLeft: item.active ? 
                  '2px solid #2dd4bf' : '2px solid transparent',
                background: item.active ? 
                  'rgba(45,212,191,0.04)' : 'transparent',
                transition: 'all 150ms ease'
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* User + plan */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #1f1f23'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'white',
            marginBottom: '4px'
          }}>
            {firstName}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#71717a',
            textTransform: 'capitalize'
          }}>
            {userData?.plan ?? 'free'} plan
          </div>
          <div
            onClick={() => router.push('/pricing')}
            style={{
              fontSize: '12px',
              color: '#2dd4bf',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Upgrade →
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        marginLeft: '220px',
        padding: '48px 56px'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 300,
            color: '#0c0c0e',
            margin: '0 0 4px',
            letterSpacing: '-0.02em'
          }}>
            {getGreeting()}, {firstName}.
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#a1a1aa',
            margin: 0
          }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#e5e7eb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '48px'
        }}>
          {/* Words used */}
          <div style={{
            background: 'white',
            padding: '24px 28px'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              Words Used
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#0c0c0e',
              marginBottom: '12px'
            }}>
              {wordsUsed.toLocaleString()}
              <span style={{
                fontSize: '14px',
                color: '#a1a1aa',
                fontWeight: 400
              }}>
                {' '}/ {wordsLimit.toLocaleString()}
              </span>
            </div>
            <div style={{
              height: '4px',
              background: '#f4f4f5',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: '#2dd4bf',
                borderRadius: '2px',
                transition: 'width 600ms ease'
              }} />
            </div>
          </div>

          {/* Current plan */}
          <div style={{
            background: 'white',
            padding: '24px 28px'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              Current Plan
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#0c0c0e',
              textTransform: 'capitalize',
              marginBottom: '8px'
            }}>
              {userData?.plan ?? 'Free'}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#2dd4bf',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/pricing')}
            >
              Upgrade →
            </div>
          </div>

          {/* Projects */}
          <div style={{
            background: 'white',
            padding: '24px 28px'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              Projects
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#0c0c0e',
              marginBottom: '8px'
            }}>
              {projects.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#a1a1aa'
            }}>
              this month
            </div>
          </div>
        </div>

        {/* Projects table */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Table header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #f4f4f5'
          }}>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#0c0c0e',
              margin: 0
            }}>
              Recent Projects
            </h2>
            <button
              onClick={handleNewProject}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#0c0c0e',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              + New Project
            </button>
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 140px 80px',
            padding: '10px 24px',
            borderBottom: '1px solid #f4f4f5',
            background: '#fafaf9'
          }}>
            {['Name', 'Words', 'Last Edited', 'Actions']
              .map(col => (
              <div key={col} style={{
                fontSize: '11px',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 500
              }}>
                {col}
              </div>
            ))}
          </div>

          {/* Project rows */}
          {projects.length === 0 ? (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center',
              color: '#a1a1aa',
              fontSize: '14px'
            }}>
              No projects yet.{' '}
              <span
                onClick={handleNewProject}
                style={{
                  color: '#2dd4bf',
                  cursor: 'pointer'
                }}
              >
                Create your first project →
              </span>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 140px 80px',
                  padding: '14px 24px',
                  borderBottom: '1px solid #f4f4f5',
                  cursor: 'pointer',
                  transition: 'background 150ms ease'
                }}
                onMouseEnter={e => 
                  e.currentTarget.style.background = '#f4f4f5'
                }
                onMouseLeave={e => 
                  e.currentTarget.style.background = 'transparent'
                }
                onClick={() => 
                  router.push(`/dashboard/write/${project.id}`)
                }
              >
                <div style={{
                  fontSize: '14px',
                  color: '#0c0c0e',
                  fontWeight: 500
                }}>
                  {project.name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#71717a'
                }}>
                  {project.word_count} words
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#71717a'
                }}>
                  {getRelativeTime(project.last_edited)}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(project.id)
                  }}
                  style={{
                    fontSize: '12px',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

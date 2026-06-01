'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Dot, Menu, X, ArrowUpRight, Check } from 'lucide-react'

export default function Page() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const revealRefs = useRef<(HTMLElement | null)[]>([])
  const [typewriterWord, setTypewriterWord] = useState('precision')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [editorText, setEditorText] = useState('')
  const [navIndicatorPos, setNavIndicatorPos] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const featureCardsRef = useRef<HTMLDivElement>(null)
  const clearingScoreRef = useRef<SVGCircleElement>(null)
  const editorTextRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const navIndicatorRef = useRef<HTMLDivElement>(null)
  const footerLogoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice(() => {
      return (
        typeof window !== 'undefined' &&
        (navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0)
      )
    })

    // Custom cursor effect
    if (!isTouchDevice && cursorRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX
        const y = e.clientY
        setCursorPos({ x, y })

        if (cursorRef.current) {
          const dx = x - cursorRef.current.offsetWidth / 2
          const dy = y - cursorRef.current.offsetHeight / 2

          requestAnimationFrame(() => {
            if (cursorRef.current) {
              cursorRef.current.style.transform = `translate(${dx}px, ${dy}px)`
            }
          })
        }
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isTouchDevice])

  // Typewriter effect for hero word
  useEffect(() => {
    const words = ['precision', 'confidence', 'clarity', 'speed']
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typewriterInterval = setInterval(() => {
      const currentWord = words[wordIndex]

      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypewriterWord(currentWord.substring(0, charIndex + 1))
          charIndex++
        } else {
          isDeleting = true
          setTimeout(() => {}, 1000)
        }
      } else {
        if (charIndex > 0) {
          setTypewriterWord(currentWord.substring(0, charIndex - 1))
          charIndex--
        } else {
          isDeleting = false
          wordIndex = (wordIndex + 1) % words.length
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearInterval(typewriterInterval)
  }, [])

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPrefersReducedMotion(prefersReduced)
  }, [])

  // Editor typing simulation
  useEffect(() => {
    const fullText = 'The project is moving forward with tremendous momentum and excellent execution.'
    
    if (!editorRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let charIndex = 0
          const typeInterval = setInterval(() => {
            if (charIndex <= fullText.length) {
              setEditorText(fullText.substring(0, charIndex))
              charIndex++
            } else {
              clearInterval(typeInterval)
            }
          }, 30)

          observer.unobserve(entry.target)
          return () => clearInterval(typeInterval)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(editorRef.current)
    return () => observer.disconnect()
  }, [])

  // Magnetic button effect
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return

    const buttons = document.querySelectorAll('[data-magnetic-button]')
    const handlers: Array<{ button: Element; handleMouseMove: (e: Event) => void; handleMouseLeave: () => void }> = []
    
    buttons.forEach((button) => {
      const handleMouseMove = (e: Event) => {
        try {
          const mouseEvent = e as MouseEvent
          const rect = (button as HTMLElement).getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const distance = Math.hypot(mouseEvent.clientX - centerX, mouseEvent.clientY - centerY)

          if (distance < 60) {
            const angle = Math.atan2(mouseEvent.clientY - centerY, mouseEvent.clientX - centerX)
            const moveX = Math.cos(angle) * (60 - distance) * 0.3
            const moveY = Math.sin(angle) * (60 - distance) * 0.3
            ;(button as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
          }
        } catch (err) {
          console.error('[v0] Magnetic button error:', err)
        }
      }

      const handleMouseLeave = () => {
        try {
          ;(button as HTMLElement).style.transform = 'translate(0, 0)'
        } catch (err) {
          console.error('[v0] Magnetic button leave error:', err)
        }
      }

      document.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)
      
      handlers.push({ button, handleMouseMove, handleMouseLeave })
    })

    return () => {
      handlers.forEach(({ button, handleMouseMove, handleMouseLeave }) => {
        document.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [prefersReducedMotion, isTouchDevice])

  // Section divider animation
  useEffect(() => {
    if (prefersReducedMotion) return

    const dividers = document.querySelectorAll('[data-section-divider]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-divider-draw')
          }
        })
      },
      { threshold: 0.5 }
    )

    dividers.forEach((divider) => observer.observe(divider))
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Active nav indicator
  useEffect(() => {
    if (prefersReducedMotion || !navRef.current || !navIndicatorRef.current) return

    const sections = document.querySelectorAll('[data-nav-section]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              const sectionId = entry.target.getAttribute('data-nav-section')
              const navLink = document.querySelector(`[data-nav-link="${sectionId}"]`)
              
              if (navLink && navIndicatorRef.current && navRef.current) {
                const rect = navLink.getBoundingClientRect()
                const parentRect = navRef.current.getBoundingClientRect()
                
                if (parentRect) {
                  navIndicatorRef.current.style.left = `${rect.left - parentRect.left}px`
                  navIndicatorRef.current.style.width = `${rect.width}px`
                }
              }
            } catch (err) {
              console.error('[v0] Nav indicator error:', err)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Footer logo scatter animation
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice || !footerLogoRef.current) return

    const handleMouseEnter = () => {
      try {
        const letters = footerLogoRef.current?.querySelectorAll('[data-letter]')
        letters?.forEach((letter, i) => {
          ;(letter as HTMLElement).style.animation = `scatter 0.6s ease-out forwards`
          ;(letter as HTMLElement).style.animationDelay = `${i * 0.05}s`
        })
      } catch (err) {
        console.error('[v0] Footer scatter enter error:', err)
      }
    }

    const handleMouseLeave = () => {
      try {
        const letters = footerLogoRef.current?.querySelectorAll('[data-letter]')
        letters?.forEach((letter) => {
          ;(letter as HTMLElement).style.animation = 'none'
        })
      } catch (err) {
        console.error('[v0] Footer scatter leave error:', err)
      }
    }

    if (footerLogoRef.current) {
      footerLogoRef.current.addEventListener('mouseenter', handleMouseEnter)
      footerLogoRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        footerLogoRef.current?.removeEventListener('mouseenter', handleMouseEnter)
        footerLogoRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [prefersReducedMotion, isTouchDevice])
  useEffect(() => {
    if (!editorRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animations
          const suggestionChip = editorRef.current?.querySelector('[data-suggestion-chip]')
          const clarityRing = editorRef.current?.querySelector('[data-clarity-ring]')
          const highlightedWord = editorRef.current?.querySelector('[data-highlighted-word]')

          if (suggestionChip) {
            setTimeout(() => {
              suggestionChip.classList.add('animate-fade-in')
            }, 800)
          }

          if (clarityRing) {
            setTimeout(() => {
              clarityRing.classList.add('animate-clarity-score')
            }, 1200)
          }

          if (highlightedWord) {
            setTimeout(() => {
              highlightedWord.classList.add('animate-pulse')
            }, 1400)
          }

          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(editorRef.current)
    return () => observer.disconnect()
  }, [])

  // Feature cards spotlight effect
  useEffect(() => {
    if (!featureCardsRef.current) return

    const cards = featureCardsRef.current.querySelectorAll('[data-spotlight-card]')
    const handlers: Array<{ card: Element; handleMouseMove: (e: Event) => void; handleMouseLeave: () => void }> = []

    cards.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        try {
          const mouseEvent = e as MouseEvent
          const rect = (card as HTMLElement).getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left
          const y = mouseEvent.clientY - rect.top

          const spotlight = (card as HTMLElement).querySelector('[data-spotlight]') as HTMLElement
          if (spotlight) {
            spotlight.style.setProperty('--spotlight-x', `${x}px`)
            spotlight.style.setProperty('--spotlight-y', `${y}px`)
            spotlight.style.opacity = '1'
          }
        } catch (err) {
          console.error('[v0] Spotlight move error:', err)
        }
      }

      const handleMouseLeave = () => {
        try {
          const spotlight = (card as HTMLElement).querySelector('[data-spotlight]') as HTMLElement
          if (spotlight) {
            spotlight.style.opacity = '0'
          }
        } catch (err) {
          console.error('[v0] Spotlight leave error:', err)
        }
      }

      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
      handlers.push({ card, handleMouseMove, handleMouseLeave })
    })

    return () => {
      handlers.forEach(({ card, handleMouseMove, handleMouseLeave }) => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Stat counter animation
  useEffect(() => {
    try {
      const statElements = document.querySelectorAll('[data-stat-value]')
      if (statElements.length === 0) return

      let hasAnimated = false
      let animationFrame: number

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              try {
                hasAnimated = true
                const startTime = Date.now()
                const duration = 2000
                const targetValues = [50, 4.9, 100, 99.9]
                const currentValue = [0, 0, 0, 0]

                const updateStats = () => {
                  try {
                    const elapsed = Date.now() - startTime
                    const progress = Math.min(elapsed / duration, 1)

                    const newValues = targetValues.map((target, i) => {
                      return currentValue[i] + (target - currentValue[i]) * progress
                    })

                    statElements.forEach((stat, i) => {
                      const element = stat as HTMLElement
                      if (element) {
                        const value = newValues[i]
                        const formatted = i === 0 ? `${Math.round(value).toLocaleString()}` : value.toFixed(1)
                        element.textContent = formatted
                      }
                    })

                    if (progress < 1) {
                      animationFrame = requestAnimationFrame(updateStats)
                    }
                  } catch (err) {
                    console.error('[v0] Stat update error:', err)
                  }
                }

                animationFrame = requestAnimationFrame(updateStats)
                observer.unobserve(entry.target)
              } catch (err) {
                console.error('[v0] Stat animation error:', err)
              }
            }
          })
        },
        { threshold: 0.1 }
      )

      const trustRow = document.querySelector('[data-trust-row]')
      if (trustRow) {
        observer.observe(trustRow)
      }

      return () => {
        observer.disconnect()
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    } catch (err) {
      console.error('[v0] Stat counter setup error:', err)
    }
  }, [])

  // Scroll progress bar
  useEffect(() => {
    try {
      const progressBar = document.querySelector('[data-scroll-progress]') as HTMLElement

      const handleScroll = () => {
        try {
          if (!progressBar) return

          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollTop = window.scrollY
          const scrollPercent = (scrollTop / scrollHeight) * 100

          progressBar.style.width = `${scrollPercent}%`
        } catch (err) {
          console.error('[v0] Scroll progress error:', err)
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } catch (err) {
      console.error('[v0] Scroll progress setup error:', err)
    }
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove('opacity-0')
              entry.target.classList.add('!opacity-100')
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    revealRefs.current.forEach((el) => {
      if (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handlePricingToggle = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period)
  }

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Custom Cursor */}
      {!isTouchDevice && (
        <div
          ref={cursorRef}
          className="fixed w-6 h-6 border-2 border-accent rounded-full pointer-events-none z-[9999] transition-transform duration-100"
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* Scroll Progress Bar */}
      <div
        data-scroll-progress
        className="fixed top-0 left-0 h-[2px] bg-accent z-[9998] transition-all"
        style={{ width: '0%' }}
      />

      {/* Sticky Nav */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md relative">
        {/* Nav Indicator */}
        <div
          ref={navIndicatorRef}
          className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300"
          style={{ left: '0px', width: '0px' }}
        ></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif text-xl font-normal tracking-tight">
              <span className="text-foreground">WritePro</span>
              <span className="italic text-accent ml-1 font-light">AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              <a href="/" data-nav-link="features" className="text-sm text-muted-foreground hover:text-accent transition-colors">Features</a>
              <a href="#pricing" data-nav-link="pricing" className="text-sm text-muted-foreground hover:text-accent transition-colors">Pricing</a>
              <a href="#faq" data-nav-link="faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ</a>
              <a href="/signup" data-magnetic-button className="px-5 py-2 bg-accent text-accent-foreground text-sm font-medium hover:opacity-80 transition-opacity">
                Start Free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-4 border-t border-border pt-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-accent">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-accent">Pricing</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-accent">FAQ</a>
              <a href="/signup" className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium inline-block w-fit">
                Start Free
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section data-nav-section="features" className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden radial-glow">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center relative z-10">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/5 rounded-full">
            <Dot className="w-2 h-2 fill-accent text-accent pulse-dot" />
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">AI-Powered Writing</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
            Write without<br />
            <span className="italic text-accent font-light">
              {typewriterWord}
              <span className="inline-block w-0.5 h-[1.2em] bg-accent ml-1 animate-pulse"></span>
            </span>
            <br />
            yourself.
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-accent/30 my-8"></div>

          {/* Trust Row - 4 Stats */}
          <div data-trust-row className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-2xl my-12">
            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-semibold text-accent mb-1"><span data-stat-value>0</span>K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-semibold text-accent mb-1"><span data-stat-value>0</span>★</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-semibold text-accent mb-1">{`<`}<span data-stat-value>0</span>ms</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Speed</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-semibold text-accent mb-1"><span data-stat-value>0</span>%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-[600px] leading-relaxed">
            WritePro empowers professionals and content creators to write better, faster. Enhance clarity, tone, and impact with intelligent AI suggestions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="px-8 py-3 bg-accent text-accent-foreground font-medium hover:opacity-80 transition-opacity text-center">
              Start Free Trial
            </a>
            <a href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-accent/20 bg-transparent text-foreground font-medium hover:bg-accent/5 transition-colors">
              Watch Demo
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <section className="border-t border-b border-border py-6 overflow-hidden bg-background/50">
        <div className="flex whitespace-nowrap marquee">
          {['AI Suggestions', 'Tone Adjustments', 'Clarity Analysis', 'Style Templates', 'Real-time Feedback', 'Smart Revisions', 'AI Suggestions', 'Tone Adjustments', 'Clarity Analysis', 'Style Templates'].map((keyword, idx) => (
            <div key={idx} className="mx-8 text-sm text-accent font-semibold flex-shrink-0">
              {keyword}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={addRef} className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">WHAT YOU GET</div>
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">Everything you need to write better</h2>
            <p className="text-muted-foreground text-base max-w-[500px] mx-auto">Powerful tools built for serious writers</p>
          </div>

          {/* Grid with gap border trick */}
          <div ref={featureCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border p-[2px]">
            {[
              {
                title: 'AI Suggestions',
                description: 'Context-aware recommendations that improve clarity and tone as you write.'
              },
              {
                title: 'Writing Modes',
                description: 'Switch between Blog, Email, Technical, and Creative modes instantly.'
              },
              {
                title: 'Usage Tracking',
                description: 'Monitor word count, project activity, and monthly limits in real time.'
              }
            ].map((feature, idx) => (
              <div key={idx} data-spotlight-card className="relative p-8 bg-card hover:bg-card/80 transition-colors overflow-hidden">
                <div
                  data-spotlight
                  className="absolute w-40 h-40 pointer-events-none opacity-0 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(200, 240, 61, 0.15) 0%, transparent 70%)',
                    left: 'var(--spotlight-x, -100px)',
                    top: 'var(--spotlight-y, -100px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Demo Section */}
      <section ref={addRef} className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">See it in action</h2>
            <p className="text-muted-foreground text-base">The WritePro editor with real-time AI enhancements</p>
          </div>

          {/* Mock Editor UI */}
          <div ref={editorRef} className="bg-card border border-border rounded overflow-hidden shadow-2xl">
            {/* Mac Window Header */}
            <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground ml-auto">WritePro Editor</span>
            </div>

            {/* Editor Content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-48 border-r border-border bg-muted/30 p-4 hidden sm:block">
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Tone</div>
                <div className="space-y-2">
                  {['Professional', 'Casual', 'Academic', 'Friendly'].map((tone) => (
                    <div key={tone} className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-accent/10 transition-colors" style={{ backgroundColor: tone === 'Professional' ? 'rgba(200, 240, 61, 0.1)' : 'transparent' }}>
                      {tone}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Editor Area */}
              <div className="flex-1 p-8">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Your document</div>
                  <div ref={editorTextRef} className="text-lg leading-relaxed min-h-[3rem]">
                    <span className="text-foreground">{editorText}</span>
                    {editorText.length > 0 && editorText.length < 77 && (
                      <span className="inline-block w-0.5 h-[1.2em] bg-accent ml-1 animate-pulse"></span>
                    )}
                  </div>

                  {/* AI Suggestion Chip */}
                  <div data-suggestion-chip className="mt-6 p-3 bg-accent/10 border border-accent/30 rounded inline-block opacity-0">
                    <div className="text-xs text-accent font-semibold mb-1">AI Suggestion</div>
                    <div className="text-sm text-foreground">Consider: {`"tremendous momentum"`}</div>
                  </div>

                  {/* Clarity Score */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#252525" strokeWidth="2" />
                        <circle
                          ref={clearingScoreRef}
                          data-clarity-ring
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#c8f03d"
                          strokeWidth="2"
                          strokeDasharray="282 282"
                          strokeLinecap="round"
                          style={{ strokeDashoffset: 282 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-accent">85%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-accent">Clarity Score</div>
                      <div className="text-sm text-muted-foreground">Very Good</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" data-nav-section="pricing" ref={addRef} className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">Simple pricing</h2>
            <p className="text-muted-foreground text-base">Choose the plan that works for you</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => handlePricingToggle('monthly')}
              className={`px-6 py-2 font-medium transition-colors text-sm ${
                billingPeriod === 'monthly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground hover:border-accent/30'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handlePricingToggle('yearly')}
              className={`px-6 py-2 font-medium transition-colors text-sm ${
                billingPeriod === 'yearly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground hover:border-accent/30'
              }`}
            >
              Yearly <span className="ml-2 text-xs">(-20%)</span>
            </button>
          </div>

          {/* Pricing Cards - Grid with gap border */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border p-[2px]">
            {[
              {
                name: 'Free',
                price: 0,
                monthlyEquivalent: 0,
                features: ['Basic AI suggestions', '5 documents/month', 'Email support'],
                highlighted: false
              },
              {
                name: 'Pro',
                price: billingPeriod === 'monthly' ? 9 : 86.40,
                monthlyEquivalent: billingPeriod === 'monthly' ? 9 : 7.20,
                features: ['Advanced AI features', 'Unlimited documents', 'Priority support', 'Style templates'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: billingPeriod === 'monthly' ? 49 : 588,
                monthlyEquivalent: billingPeriod === 'monthly' ? 49 : 49,
                features: ['Custom AI models', 'Team collaboration', '24/7 support', 'API access'],
                highlighted: false
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-8 bg-card transition-all ${
                  plan.highlighted ? 'md:scale-105 ring-2 ring-accent/30' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="mb-6 overflow-hidden h-16 flex items-center">
                  <div
                    key={`${billingPeriod}-${idx}`}
                    className="animate-price-flip"
                  >
                    <span className="text-4xl font-bold text-foreground">${plan.monthlyEquivalent}</span>
                    <span className="text-muted-foreground text-sm ml-2">/mo</span>
                    {billingPeriod === 'yearly' && plan.monthlyEquivalent > 0 && (
                      <div className="text-xs text-muted-foreground mt-2">billed ${plan.price}/year</div>
                    )}
                  </div>
                </div>
                <a
                  href="/signup"
                  className={`w-full py-2 font-medium mb-8 transition-colors inline-block text-center text-sm ${
                    plan.highlighted
                      ? 'bg-accent text-accent-foreground hover:opacity-80'
                      : 'bg-card border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </a>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div data-section-divider className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      <section data-nav-section="testimonials" ref={addRef} className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-center mb-16">Loved by creators</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border p-[2px]">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Content Creator',
                text: 'WritePro transformed my writing process. I&apos;ve cut editing time in half.',
                rating: 5
              },
              {
                name: 'Mark Chen',
                role: 'Business Consultant',
                text: 'The tone adjustment feature is incredible. My client emails are now more professional.',
                rating: 5
              },
              {
                name: 'Emma Wilson',
                role: 'Technical Writer',
                text: 'Finally, an AI that understands technical documentation. Highly recommend!',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                data-testimonial-card
                className="p-8 relative overflow-hidden group transition-all duration-300"
                style={{
                  background: 'rgba(26, 26, 26, 0.45)',
                  backdropFilter: prefersReducedMotion ? 'none' : 'blur(12px)',
                  WebkitBackdropFilter: prefersReducedMotion ? 'none' : 'blur(12px)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  borderWidth: '1px'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200, 240, 61, 0.5)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.15)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-accent rounded-full"></div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{testimonial.text}</p>
                  <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div data-section-divider className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      <section id="faq" data-nav-section="faq" ref={addRef} className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-center mb-16">Frequently asked questions</h2>

          <div className="space-y-3">
            {[
              {
                q: 'What happens if I hit my word limit?',
                a: 'You can upgrade to a higher tier at any time to get more words per month. There are no penalties for hitting your limit.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time with no questions asked. Your access continues until the end of your billing period.'
              },
              {
                q: 'Is my data safe?',
                a: 'Yes, we use enterprise-grade encryption and never share your data with third parties. Your writing remains completely private.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee on all plans. If you&apos;re not satisfied, we&apos;ll refund your payment.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-border">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
                >
                  <span className="font-medium text-sm">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                      expandedFAQ === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === idx && (
                  <div className="p-4 border-t border-border bg-background/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div data-section-divider className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      <section data-nav-section="cta" className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border radial-glow">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">Ready to write better?</h2>
          <p className="text-muted-foreground text-base mb-8 max-w-[500px] mx-auto">Join thousands of professionals who are already improving their writing with WritePro.</p>
          <a href="/signup" data-magnetic-button className="inline-block px-8 py-3 bg-accent text-accent-foreground font-medium hover:opacity-80 transition-opacity" style={{ transitionDuration: '300ms' }}>
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div ref={footerLogoRef} className="font-serif text-lg font-normal cursor-pointer">
              {['W', 'r', 'i', 't', 'e', 'P', 'r', 'o'].map((letter, i) => (
                <span
                  key={i}
                  data-letter
                  className="inline-block transition-transform duration-300"
                  style={{ '--scatter-x': `${(Math.random() - 0.5) * 80}px`, '--scatter-y': `${(Math.random() - 0.5) * 80}px` } as React.CSSProperties}
                >
                  {letter}
                </span>
              ))}
              <span className="italic text-accent ml-1 font-light">AI</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">© 2025 WritePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

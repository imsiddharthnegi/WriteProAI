'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-200 ease-in-out ${
          isScrolled
            ? 'bg-[#0c0c0e] backdrop-blur-md border-b border-[#1f1f23]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-sm font-semibold text-white">
              Write<span className="text-teal-400">Pro</span>
            </div>
          </div>

          {/* Center Nav Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 font-normal tracking-wide hover:text-white transition-colors relative group"
                style={{ letterSpacing: '0.02em' }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Log in
            </a>
            <button className="text-sm font-medium text-white bg-teal-400 hover:bg-teal-500 px-4 py-2 transition-colors" style={{ borderRadius: '6px' }}>
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-slate-900 rounded transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-[#0c0c0e] border-b border-[#1f1f23] z-40 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-6 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-900 transition-colors min-h-[48px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[#1f1f23] px-6 py-3 space-y-3">
              <a
                href="#"
                className="block text-sm text-slate-400 hover:text-white transition-colors min-h-[48px] flex items-center"
              >
                Log in
              </a>
              <button className="w-full text-sm font-medium text-white bg-teal-400 hover:bg-teal-500 px-4 py-2 min-h-[48px] transition-colors" style={{ borderRadius: '6px' }}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import React from 'react'

export default function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-slate-950 border-t border-[#1f1f23]">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-0 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">
                Write<span className="text-teal-400">Pro</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Write better. Think clearer.
                <br />
                Ship faster.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Twitter/X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.67-5.829 6.67h-3.328l7.709-8.81-8.175-10.72h6.696l4.72 6.23 5.28-6.23zm-1.161 17.52h1.833l-11.768-15.5h-1.968l11.903 15.5z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/imsiddharthnegi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-400 transition-colors"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.833 0-9.749h3.554v1.381c.43-.664 1.199-1.608 2.948-1.608 2.153 0 3.767 1.408 3.767 4.440v5.536zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.709 0-.955.77-1.708 1.963-1.708 1.192 0 1.915.753 1.938 1.709 0 .95-.746 1.708-1.986 1.708zm-1.6 11.019h3.204V9.703H3.737v10.749zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Press Kit'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal + Newsletter */}
          <div className="space-y-8">
            {/* Legal Links */}
            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-6">
                Legal
              </h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <label className="text-xs font-medium text-slate-500 mb-3 block">
                Stay in the loop
              </label>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-400 text-slate-950 text-sm font-medium rounded-md hover:bg-teal-500 transition-colors whitespace-nowrap"
                >
                  {subscribed ? '✓' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-[#1f1f23] px-6 md:px-0 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>© 2025 WritePro. All rights reserved.</div>
          <div>
            Built by{' '}
            <a
              href="https://siddharthnegi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 hover:underline transition-colors"
            >
              Siddharth Negi
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

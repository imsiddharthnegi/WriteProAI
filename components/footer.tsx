'use client'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-[#1f1f23]">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-0 py-10">
        {/* Desktop: Single row layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Brand + Tagline + GitHub */}
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-white">
                Write<span className="text-teal-400">Pro</span>
              </h3>
              <p className="text-sm text-slate-400">Write better. Think clearer. Ship faster.</p>
            </div>

            {/* GitHub Icon */}
            <a
              href="https://github.com/imsiddharthnegi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 hover:scale-110 transition-all duration-150 inline-block cursor-pointer"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Right: Copyright + Built by */}
          <div className="flex items-center gap-8 text-xs text-slate-500">
            <div>© 2025 WritePro. All rights reserved.</div>
            <div>
              Built by{' '}
              <a
                href="https://siddharthnegi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 hover:underline transition-all duration-150 cursor-pointer"
              >
                Siddharth Negi
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="md:hidden space-y-6">
          {/* Brand + GitHub */}
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-white">
                Write<span className="text-teal-400">Pro</span>
              </h3>
              <p className="text-sm text-slate-400">Write better. Think clearer. Ship faster.</p>
            </div>

            {/* GitHub Icon */}
            <a
              href="https://github.com/imsiddharthnegi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 hover:scale-110 transition-all duration-150 inline-block cursor-pointer"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Copyright + Built by */}
          <div className="space-y-3 text-xs text-slate-500">
            <div>© 2025 WritePro. All rights reserved.</div>
            <div>
              Built by{' '}
              <a
                href="https://siddharthnegi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 hover:underline transition-all duration-150 cursor-pointer"
              >
                Siddharth Negi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

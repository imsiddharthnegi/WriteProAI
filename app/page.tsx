'use client'

import { ArrowUpRight } from 'lucide-react'

export default function Page() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-lg font-medium tracking-tight">WritePro</div>
          <button className="px-4 py-2 text-sm font-medium bg-white text-slate-950 hover:bg-slate-100 transition-colors">
            Get started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 md:px-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Column: Copy */}
          <div className="flex flex-col justify-start space-y-8">
            {/* Headline */}
            <h1 className="text-7xl md:text-8xl font-light leading-none tracking-tight">
              Write with<br />
              <span className="text-teal-400">intention.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-400 max-w-sm leading-relaxed">
              AI-powered writing that adapts to your voice. Get real-time suggestions, tone adjustments, and clarity improvements as you write.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="group px-6 py-3 bg-white text-slate-950 font-medium inline-flex items-center gap-2 border-l-2 border-l-teal-400 hover:bg-slate-100 transition-colors">
                <span>Start writing free</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="px-6 py-3 font-medium text-slate-300 hover:text-white transition-colors">
                See how it works →
              </button>
            </div>
          </div>

          {/* Right Column: Diff View */}
          <div className="hidden md:flex flex-col justify-start pt-12 space-y-6">
            {/* Before/After Labels */}
            <div className="flex gap-32">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Original</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Enhanced</div>
            </div>

            {/* Diff Container */}
            <div className="grid grid-cols-2 gap-12 font-mono text-sm leading-relaxed">
              {/* Before Column */}
              <div className="text-slate-400 space-y-4">
                <p>We&apos;re really excited about</p>
                <p>the new product launch</p>
                <p>and think it&apos;s gonna be</p>
                <p>pretty good.</p>
              </div>

              {/* After Column */}
              <div className="text-slate-300 space-y-4">
                <p>We&apos;re <span className="bg-green-500/20 text-green-300 px-1">thrilled</span> about</p>
                <p>the <span className="bg-green-500/20 text-green-300 px-1">upcoming</span> product launch</p>
                <p>and <span className="bg-green-500/20 text-green-300 px-1">confident</span> it will drive</p>
                <p><span className="bg-green-500/20 text-green-300 px-1">meaningful results.</span></p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800 my-8" />

            {/* Example Features */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-teal-400" />
                <span>Real-time tone adjustments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-teal-400" />
                <span>Grammar & clarity checking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-teal-400" />
                <span>Contextual word suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="border-t border-slate-800 py-12 px-6 md:px-0">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-8">Trusted by professionals at</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-slate-400">
            <div className="text-sm font-medium">Stripe</div>
            <div className="text-sm font-medium">Vercel</div>
            <div className="text-sm font-medium">Linear</div>
            <div className="text-sm font-medium">Figma</div>
            <div className="text-sm font-medium">Notion</div>
          </div>
        </div>
      </section>
    </div>
  )
}

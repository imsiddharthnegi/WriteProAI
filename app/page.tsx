'use client'

import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Page() {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly')
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-0">
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

      {/* Features Section */}
      <section className="bg-white text-slate-950 py-24 px-6 md:px-0">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <div className="text-xs font-medium text-teal-600 uppercase tracking-widest mb-4">How it works</div>
            <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-tight max-w-2xl">
              Powerful writing tools built for professionals.
            </h2>
          </div>

          {/* Features Grid */}
          <div className="space-y-0">
            {/* Feature 1: AI Suggestions - Text on Left, UI on Right */}
            <div className="border-b border-slate-200 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4">
                  <h3 className="text-2xl font-medium">AI Suggestions</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                    Real-time suggestions as you write. Get instant recommendations for better word choice, grammar, and clarity without breaking your flow.
                  </p>
                </div>
                <div className="hidden md:flex flex-col justify-start pt-4">
                  <div className="space-y-3 font-mono text-sm leading-relaxed">
                    <p className="text-slate-700">The results were <span className="inline-block px-2 py-1 bg-slate-100 text-slate-900 rounded text-xs font-medium border border-slate-300">amazing</span></p>
                    <div className="space-y-2 pl-4 border-l-2 border-slate-300">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-600">✓</span>
                        <span>impressive · groundbreaking · remarkable</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-600">✓</span>
                        <span>transformative · exceptional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Writing Modes - UI on Left, Text on Right */}
            <div className="border-b border-slate-200 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:flex flex-col justify-start pt-4 order-last">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-2 text-sm font-medium border-b-2 border-teal-600 text-teal-600">Blog</button>
                      <button className="px-3 py-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-slate-600">Email</button>
                      <button className="px-3 py-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-slate-600">Technical</button>
                    </div>
                    <div className="pt-2 text-slate-700 font-mono text-sm">
                      <p>Automatically adapt your tone</p>
                      <p>and style to match the format.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start space-y-4 order-first md:order-none">
                  <h3 className="text-2xl font-medium">Writing Modes</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                    Switch between modes optimized for different writing styles. Blog posts, emails, technical docs — each with its own tailored suggestions.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Tone Adjustment - Text on Left, UI on Right */}
            <div className="border-b border-slate-200 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4">
                  <h3 className="text-2xl font-medium">Tone Adjustment</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                    Fine-tune your writing tone. Adjust formality, confidence, and empathy levels with a single click to match your audience and context.
                  </p>
                </div>
                <div className="hidden md:flex flex-col justify-start pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Formal</div>
                    <p className="text-slate-700 font-mono text-sm">We look forward to collaborating on this initiative.</p>
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Casual</div>
                    <p className="text-slate-700 font-mono text-sm"><span className="bg-teal-100 text-teal-900 px-1">Let&apos;s team up</span> on this project!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Usage Dashboard - UI on Left, Text on Right */}
            <div className="py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:flex flex-col justify-start pt-4 order-last">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Monthly usage</span>
                        <span className="font-mono text-slate-900">47 / 100</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-[47%] h-full bg-teal-600"></div>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1 text-xs text-slate-500">
                      <p>Resets in 18 days</p>
                      <p className="text-teal-600 font-medium">Upgrade for unlimited</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start space-y-4 order-first md:order-none">
                  <h3 className="text-2xl font-medium">Usage Dashboard</h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                    Track your writing activity and usage in real-time. See insights on suggestions applied, tone shifts, and improvements made.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-950 py-24 px-6 md:px-0">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 max-w-3xl">
            <div className="text-xs font-medium text-teal-400 uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-tight">
              Simple, transparent pricing.
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-4 mb-16">
            <div className="flex gap-1 p-1 bg-slate-900 rounded-full">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Yearly
              </button>
            </div>
            {billingPeriod === 'yearly' && (
              <span className="text-xs font-medium text-teal-400 bg-teal-950 px-3 py-1.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="flex flex-col bg-slate-900/50 border border-slate-800 p-8 min-h-[520px]">
              <div className="mb-8">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Plan name</div>
                <h3 className="text-3xl font-light tracking-tight mb-4">Free</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">$0</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-8 flex-grow">
                Get started with the essentials. Perfect for individual writers exploring WritePro.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>500 AI suggestions/month</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>3 writing modes</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Basic tone adjustment</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Web editor only</span>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 text-sm font-medium border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors">
                Get started
              </button>
            </div>

            {/* Pro Tier - Highlighted */}
            <div className="flex flex-col bg-slate-900/50 border-l-4 border-l-teal-400 border border-l-4 border-slate-800 p-8 min-h-[520px] relative">
              <div className="mb-8">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Plan name</div>
                <h3 className="text-3xl font-light tracking-tight mb-4">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">
                    ${billingPeriod === 'yearly' ? '86.40' : '9'}
                  </span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-8 flex-grow">
                Everything in Free, plus advanced AI features and priority support.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Unlimited AI suggestions</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>All writing modes</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Advanced tone adjustment</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Desktop & mobile apps</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Priority email support</span>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 text-sm font-medium bg-white text-slate-950 hover:bg-slate-100 transition-colors font-medium">
                Start free trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="flex flex-col bg-slate-900/50 border border-slate-800 p-8 min-h-[520px]">
              <div className="mb-8">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Plan name</div>
                <h3 className="text-3xl font-light tracking-tight mb-4">Enterprise</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">
                    ${billingPeriod === 'yearly' ? '470' : '49'}
                  </span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-8 flex-grow">
                For teams that need advanced security, analytics, and dedicated support.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Everything in Pro</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Team collaboration</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Advanced analytics</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Custom integrations</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Dedicated account manager</span>
                </div>
              </div>

              <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium inline-flex items-center gap-1">
                Talk to us <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Part 1: Stats */}
      <section className="bg-slate-950 py-20 px-6 md:px-0 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {/* Stat 1 */}
            <div className="flex flex-col items-center md:items-start md:border-r md:border-slate-800 md:pr-12">
              <div className="font-serif text-6xl md:text-7xl font-light text-white mb-2">
                12,400
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Writers
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center md:border-r md:border-slate-800 md:px-12">
              <div className="font-serif text-6xl md:text-7xl font-light text-white mb-2">
                2.1M
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Words Improved
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center md:items-end md:pl-12">
              <div className="font-serif text-6xl md:text-7xl font-light text-white mb-2">
                4.9
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Rating / 5
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Part 2: Testimonials Ticker */}
      <section className="bg-slate-100 py-16 px-6 md:px-0 overflow-hidden">
        <div className="relative w-full">
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .testimonial-ticker {
              display: flex;
              animation: scroll 40s linear infinite;
              will-change: transform;
            }
            .testimonial-ticker:hover {
              animation-play-state: paused;
            }
            .testimonial-item {
              min-width: max-content;
              padding: 0 2rem;
              display: flex;
              align-items: center;
            }
          `}</style>
          <div className="testimonial-ticker">
            {[
              '"Finally an AI that doesn\'t rewrite my voice." — Alex Chen, Technical Writer',
              '"Saves me hours on editing every week." — Maya Rodriguez, Content Manager',
              '"The tone adjustment actually gets what I\'m trying to say." — James Park, Copywriter',
              '"Best writing tool I\'ve used in years." — Sarah Williams, Journalist',
              '"Helps me write more confidently in my second language." — Maria Kowalski, Marketer',
              '"Game changer for our team\'s communication." — David Thompson, Product Manager',
              '"Finally an AI that doesn\'t rewrite my voice." — Alex Chen, Technical Writer',
              '"Saves me hours on editing every week." — Maya Rodriguez, Content Manager',
              '"The tone adjustment actually gets what I\'m trying to say." — James Park, Copywriter',
              '"Best writing tool I\'ve used in years." — Sarah Williams, Journalist',
            ].map((quote, idx) => (
              <div key={idx} className="testimonial-item">
                <p className="text-slate-700 italic text-lg whitespace-nowrap">
                  {quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

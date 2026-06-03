'use client'

import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FAQ from '@/components/faq'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { variants, containerVariants, containerVariantsSmall, easing } from '@/lib/animation-variants'

export default function Page() {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Scroll animation refs
  const { ref: featureRef, isInView: featureInView } = useScrollAnimation()
  const { ref: pricingRef, isInView: pricingInView } = useScrollAnimation()
  const { ref: socialProofRef, isInView: socialProofInView } = useScrollAnimation()
  const { ref: faqRef, isInView: faqInView } = useScrollAnimation()

  // Headline words for staggered animation
  const headlineWords = ['Write with', 'intention.']

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Column: Copy */}
          <div className="flex flex-col justify-start space-y-8">
            {/* Headline - Staggered word animation */}
            <motion.h1 
              className="text-7xl md:text-8xl font-light leading-none tracking-tight"
              initial="hidden"
              animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0,
                  },
                },
              }}
            >
              {['Write with', 'intention.'].map((word, i) => (
                <motion.span
                  key={i}
                  className={i === 1 ? 'text-white relative inline-block' : undefined}
                  variants={prefersReducedMotion ? { hidden: {}, animate: {} } : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: easing }}
                >
                  {word}
                  {i === 1 && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400"></span>
                  )}
                  {i === 0 && <br />}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext - Fades in after headline */}
            <motion.p 
              className="text-lg text-slate-400 max-w-sm leading-relaxed"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.2 }}
            >
              AI-powered writing that adapts to your voice. Get real-time suggestions, tone adjustments, and clarity improvements as you write.
            </motion.p>

            {/* Buttons - Fade in together */}
            <motion.div 
              className="flex gap-4 pt-4"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.35 }}
            >
              <Link
                href="/signup"
                className="group px-6 py-3 bg-white text-slate-950 font-medium inline-flex items-center gap-2 border-l-2 border-l-teal-400 hover:brightness-110 transition-all duration-150 cursor-pointer"
              >
                <span>Start writing free</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </Link>
              <button className="px-6 py-3 font-medium text-slate-300 hover:text-white transition-colors cursor-pointer duration-150">
                See how it works →
              </button>
            </motion.div>
          </div>

          {/* Right Column: Diff View - Slides in from right */}
          <motion.div 
            className="hidden md:flex flex-col justify-start pt-12 space-y-6"
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            animate={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.3 }}
          >
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
                <span>Real-time AI suggestions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-teal-400" />
                <span>Tone and style matching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-teal-400" />
                <span>Clarity scoring & insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section 
        className="border-t border-slate-800 py-8 px-6 md:px-0"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.5, ease: easing, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-3 gap-8 text-center"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={prefersReducedMotion ? {} : variants.fadeIn}>
              <div className="text-3xl font-light">12,400+</div>
              <div className="text-sm text-slate-500 mt-1">writers</div>
            </motion.div>
            <motion.div variants={prefersReducedMotion ? {} : variants.fadeIn}>
              <div className="text-3xl font-light">2.1M</div>
              <div className="text-sm text-slate-500 mt-1">words improved</div>
            </motion.div>
            <motion.div variants={prefersReducedMotion ? {} : variants.fadeIn}>
              <div className="text-3xl font-light">4.9★</div>
              <div className="text-sm text-slate-500 mt-1">rating</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featureRef}
        className="border-t border-slate-800 bg-white text-slate-950 py-24 px-6 md:px-0"
        initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
        animate={featureInView || prefersReducedMotion ? { opacity: 1 } : "hidden"}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div 
            className="mb-20"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={featureInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <p className="text-sm font-medium text-teal-600 uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-5xl font-light">Your words, elevated</h2>
          </motion.div>

          {/* Features Grid */}
          <div className="space-y-12">
            {/* Feature 1: Text Left, UI Right */}
            <motion.div 
              className="border-b border-slate-200 py-12"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4">
                  <h3 className="text-[22px] font-semibold">AI Suggestions</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
                    Real-time suggestions as you write. Get instant recommendations for better word choice, grammar, and clarity without breaking your flow.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Text Right, UI Left */}
            <motion.div 
              className="border-b border-slate-200 py-12"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.08 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4 md:order-2">
                  <h3 className="text-[22px] font-semibold">Writing Modes</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
                    Switch between modes optimized for different writing styles. Blog posts, emails, technical docs — each with its own tailored suggestions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Text Left */}
            <motion.div 
              className="border-b border-slate-200 py-12"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.16 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4">
                  <h3 className="text-[22px] font-semibold">Tone Adjustment</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
                    Fine-tune your writing tone. Adjust formality, confidence, and empathy levels with a single click to match your audience and context.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Text Right */}
            <motion.div 
              className="py-12"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.24 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-start space-y-4 md:order-2">
                  <h3 className="text-[22px] font-semibold">Usage Dashboard</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
                    Track your writing activity and usage in real-time. See insights on suggestions applied, tone shifts, and improvements made.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        ref={pricingRef}
        className="bg-slate-950 pt-32 pb-24 px-6 md:px-0"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div 
            className="mb-16 text-center"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={pricingInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <h2 className="text-5xl font-light">Simple, transparent pricing</h2>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={pricingInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, ease: easing, delay: 0.1 }}
          >
            <div className="flex gap-1 p-1 bg-slate-900 rounded-full">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer duration-150 ${
                  billingPeriod === 'monthly'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer duration-150 ${
                  billingPeriod === 'yearly'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Yearly
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards Container */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={prefersReducedMotion ? {} : {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate={pricingInView || prefersReducedMotion ? "visible" : "hidden"}
          >
            {/* Free Tier */}
            <motion.div 
              className="flex flex-col bg-[#13131a] border border-slate-800 border-l-transparent p-8 min-h-[520px] hover:border-l-4 hover:border-l-teal-400 hover:-translate-y-0.5 transition-all duration-200"
              variants={prefersReducedMotion ? {} : {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: easing }}
            >
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
              <Link
                href="/signup"
                className="w-full px-4 py-2.5 text-sm font-medium border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800/50 transition-all cursor-pointer duration-150 block text-center"
              >
                Get started
              </Link>
            </motion.div>

            {/* Pro Tier - Highlighted */}
            <motion.div 
              className="flex flex-col bg-[#0f0f1a] border border-slate-800 border-l-4 border-l-teal-400 p-8 min-h-[520px] relative hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-200"
              style={{ boxShadow: '0 0 40px rgba(45, 212, 191, 0.06)' }}
              variants={prefersReducedMotion ? {} : {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: easing }}
            >
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
              <Link
                href="/signup"
                className="w-full px-4 py-2.5 text-sm font-medium bg-white text-slate-950 hover:brightness-110 transition-all cursor-pointer duration-150 font-medium block text-center"
              >
                Start free trial
              </Link>
            </motion.div>

            {/* Enterprise Tier */}
            <motion.div 
              className="flex flex-col bg-[#13131a] border border-slate-800 border-l-transparent p-8 min-h-[520px] hover:border-l-4 hover:border-l-teal-400 hover:-translate-y-0.5 transition-all duration-200"
              variants={prefersReducedMotion ? {} : {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: easing }}
            >
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
                  <span>Advanced analytics & reporting</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>SAML/SSO for teams</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Dedicated account manager</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span className="text-slate-500">–</span>
                  <span>Custom integrations</span>
                </div>
              </div>
              <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium inline-flex items-center gap-1 cursor-pointer group">
                Talk to us <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section 
        ref={socialProofRef}
        className="border-t border-slate-800 py-16 px-6 md:px-0"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="grid grid-cols-3 gap-8"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={socialProofInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <div className="text-4xl font-light text-white">12,400+</div>
              <div className="text-sm text-slate-500 mt-2">writers</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white">2.1M</div>
              <div className="text-sm text-slate-500 mt-2">words improved</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white">4.9★</div>
              <div className="text-sm text-slate-500 mt-2">rating</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="border-t border-slate-800 py-24 px-6 md:px-0"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={faqInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={faqInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <h2 className="text-4xl font-light">Frequently asked questions</h2>
          </motion.div>
          
          <FAQ />
        </div>
      </motion.section>

      {/* Footer */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: easing }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}

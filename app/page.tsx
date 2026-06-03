import { AnimatedDiff } from '@/components/animated-diff'
import { NotificationStrip } from '@/components/notification-strip'

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
              Real-time AI suggestions that adapt to your voice, tone, and writing style.
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
              <Link href="#features" className="px-6 py-3 font-medium text-slate-300 hover:text-white transition-colors cursor-pointer duration-150">
                See how it works →
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Diff View - Slides in from right */}
          <motion.div 
            className="hidden md:flex flex-col justify-start pt-12 space-y-6"
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            animate={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.3 }}
          >
            {/* Animated Diff Component */}
            <AnimatedDiff />

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

      {/* Notification Strip */}
      <NotificationStrip />

      {/* Features Section */}
      <motion.section 
        id="features"
        ref={featureRef}
        className="bg-white text-slate-950 px-6 md:px-0"
        initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
        animate={featureInView || prefersReducedMotion ? { opacity: 1 } : "hidden"}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[1200px] mx-auto py-24">
          {/* Section Heading */}
          <motion.div 
            className="mb-10"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={featureInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <h2 className="text-[48px] font-semibold text-slate-950">Your words, elevated</h2>
          </motion.div>

          {/* Features Grid */}
          <div className="space-y-0">
            {/* Feature 1: Text Left, UI Right - AI Suggestions */}
            <motion.div 
              className="border-b border-[#f0f0f0] py-20 min-h-[200px] flex items-center"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                {/* Text */}
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-[24px] font-bold text-slate-950">AI Suggestions</h3>
                  <p className="text-[#52525b] text-[16px] leading-[1.7] max-w-[380px]">
                    Real-time suggestions as you write. Get instant recommendations for better word choice, grammar, and clarity without breaking your flow.
                  </p>
                </div>
                {/* UI Snippet - Editor Mockup */}
                <div className="space-y-6">
                  {/* Original */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#52525b] uppercase tracking-widest mb-2">Original</p>
                    <p className="text-[15px] text-slate-900">The results were amazing</p>
                  </div>
                  {/* Divider */}
                  <div className="h-px bg-teal-400"></div>
                  {/* Improved */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#52525b] uppercase tracking-widest mb-2">Improved</p>
                    <p className="text-[15px] text-slate-900">
                      The results were{' '}
                      <span className="bg-teal-100 text-teal-700 rounded px-1.5 py-0.5 font-semibold">truly impressive</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: UI Left, Text Right - Writing Modes */}
            <motion.div 
              className="border-b border-[#f0f0f0] py-20 min-h-[200px] flex items-center"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.08 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                {/* UI Snippet - Tab Switcher */}
                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-[#e5e7eb] pb-4">
                    <button className="text-[16px] font-semibold text-teal-600 pb-2 border-b-2 border-teal-400">Blog</button>
                    <button className="text-[16px] font-semibold text-[#52525b] hover:text-slate-900 transition-colors">Email</button>
                    <button className="text-[16px] font-semibold text-[#52525b] hover:text-slate-900 transition-colors">Technical</button>
                  </div>
                  {/* Content Preview */}
                  <div className="space-y-3">
                    <p className="text-[15px] text-[#52525b] leading-[1.6]">
                      The key to effective communication is understanding your audience and tailoring...
                    </p>
                    <p className="text-[15px] text-[#52525b] leading-[1.6]">
                      Whether you&apos;re writing for experts or beginners, the tone should reflect...
                    </p>
                    <p className="text-[15px] text-[#52525b] leading-[1.6]">
                      By adapting your writing style, you ensure maximum impact and engagement...
                    </p>
                  </div>
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-[24px] font-bold text-slate-950">Writing Modes</h3>
                  <p className="text-[#52525b] text-[16px] leading-[1.7]">
                    Switch between modes optimized for different writing styles. Blog posts, emails, technical docs — each with its own tailored suggestions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Text Left, UI Right - Tone Adjustment */}
            <motion.div 
              className="border-b border-[#f0f0f0] py-20 min-h-[200px] flex items-center"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.16 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                {/* Text */}
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-[24px] font-bold text-slate-950">Tone Adjustment</h3>
                  <p className="text-[#52525b] text-[16px] leading-[1.7]">
                    Fine-tune your writing tone. Adjust formality, confidence, and empathy levels with a single click to match your audience and context.
                  </p>
                </div>
                {/* UI Snippet - Formal/Casual */}
                <div className="space-y-8">
                  {/* Formal */}
                  <div>
                    <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-[0.15em] mb-3">Formal</p>
                    <p className="text-[16px] text-slate-900">We look forward to collaborating on this initiative.</p>
                  </div>
                  {/* Casual */}
                  <div>
                    <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-[0.15em] mb-3">Casual</p>
                    <p className="text-[16px] text-slate-900">
                      <span className="bg-[#ccfbf1] text-teal-700 rounded px-1.5 py-0.5 font-semibold">Let&apos;s team up</span> on this project!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: UI Left, Text Right - Usage Dashboard */}
            <motion.div 
              className="py-20 min-h-[200px] flex items-center"
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              animate={featureInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.4, ease: easing, delay: 0.24 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                {/* UI Snippet - Usage Stats */}
                <div className="space-y-8">
                  {/* Heading */}
                  <div>
                    <p className="text-[14px] font-bold text-slate-950 mb-3">Words Used This Month</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[32px] font-bold text-slate-950">4,700</span>
                      <span className="text-[16px] text-[#52525b]">/ 10,000 words</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full">
                    <div className="bg-[#f4f4f4] rounded-full h-2 overflow-hidden">
                      <div className="bg-teal-400 h-full rounded-full" style={{ width: '47%' }}></div>
                    </div>
                  </div>
                  {/* Reset Info */}
                  <p className="text-[13px] text-[#52525b]">📅 Resets in 18 days</p>
                  {/* Upgrade Link */}
                  <button className="text-[14px] font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                    Upgrade for unlimited →
                  </button>
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-[24px] font-bold text-slate-950">Usage Dashboard</h3>
                  <p className="text-[#52525b] text-[16px] leading-[1.7]">
                    Track your writing activity and usage in real-time. See insights on suggestions applied, tone shifts, and improvements made.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="bg-[#0c0c0e] px-6 md:px-0 py-[120px]"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: easing }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Section Heading */}
          <motion.div 
            className="mb-20 text-center"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-[48px] font-semibold text-white leading-tight">
              Up and running in 3 steps.
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <motion.div 
              className="relative text-center"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing, delay: 0.05 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Large number background */}
              <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                <span className="text-[80px] font-bold text-teal-400 opacity-20">01</span>
              </div>
              {/* Content */}
              <div className="relative pt-8 space-y-4">
                <h3 className="text-[20px] font-semibold text-white">Sign up</h3>
                <p className="text-[15px] text-slate-400 leading-[1.6]">
                  Create your free account in under 60 seconds. No credit card needed.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative text-center"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Large number background */}
              <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                <span className="text-[80px] font-bold text-teal-400 opacity-20">02</span>
              </div>
              {/* Content */}
              <div className="relative pt-8 space-y-4">
                <h3 className="text-[20px] font-semibold text-white">Paste your writing</h3>
                <p className="text-[15px] text-slate-400 leading-[1.6]">
                  Drop in any text — emails, blogs, docs. WritePro works with anything.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative text-center"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing, delay: 0.15 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Large number background */}
              <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                <span className="text-[80px] font-bold text-teal-400 opacity-20">03</span>
              </div>
              {/* Content */}
              <div className="relative pt-8 space-y-4">
                <h3 className="text-[20px] font-semibold text-white">Get suggestions</h3>
                <p className="text-[15px] text-slate-400 leading-[1.6]">
                  Receive real-time AI-powered improvements tailored to your writing mode.
                </p>
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
            <div className="flex gap-1 p-1 bg-slate-900 rounded-full relative">
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
              <div className="relative">
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
                {/* Save 20% Badge */}
                <span className="absolute -top-2 -right-3 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Save 20%
                </span>
              </div>
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
              {/* Save Badge */}
              {billingPeriod === 'yearly' && (
                <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  Save 20%
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-3xl font-light tracking-tight mb-4">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">
                    ${billingPeriod === 'yearly' ? '7' : '12'}
                  </span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-xs text-slate-500 mt-2">Billed $84/year</p>
                )}
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
                <h3 className="text-3xl font-light tracking-tight mb-4">Enterprise</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">
                    ${billingPeriod === 'yearly' ? '39' : '49'}
                  </span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-xs text-slate-500 mt-2">Billed $468/year</p>
                )}
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

      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="px-6 md:px-0"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={faqInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FAQ />
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-[#0c0c0e] px-6 md:px-0 py-[120px]"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: easing }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-[800px] mx-auto text-center space-y-8 flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-[56px] font-semibold text-white leading-tight">
            Start writing better today.
          </h2>
          
          {/* Subtext */}
          <p className="text-[18px] text-slate-400">
            Join 12,400+ writers who&apos;ve already made the switch.
          </p>
          
          {/* CTA Button */}
          <Link 
            href="/signup"
            className="mt-4 px-8 py-4 bg-teal-400 text-slate-950 font-semibold rounded-lg text-[18px] hover:bg-teal-300 transition-colors duration-150 inline-flex items-center gap-2"
          >
            Get started free <span>→</span>
          </Link>
          
          {/* Disclaimer Text */}
          <p className="text-[12px] text-slate-500 mt-4">
            No credit card required · Cancel anytime
          </p>
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

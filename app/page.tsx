'use client'

import { useState } from 'react'
import { Plus, Minus, Lightbulb, LayoutList, BarChart2, Check, Menu, X, ArrowUpRight, Dot } from 'lucide-react'

export default function Page() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif text-lg font-normal">
              <span className="text-foreground">WritePro</span>
              <span className="italic text-accent ml-1">AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <a href="/signup" className="px-4 py-2 bg-accent text-accent-foreground rounded-sm font-medium hover:opacity-90 transition-opacity">
                Get Started
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
            <div className="md:hidden pb-4 flex flex-col gap-4">
              <a href="/" className="text-sm hover:text-accent">Home</a>
              <a href="#features" className="text-sm hover:text-accent">Features</a>
              <a href="#pricing" className="text-sm hover:text-accent">Pricing</a>
              <a href="#faq" className="text-sm hover:text-accent">FAQ</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-20 overflow-hidden">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-accent/30 rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-background/50">
              <Dot className="w-1.5 h-1.5 fill-accent text-accent" />
              AI-Powered Writing
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-white mb-4 leading-tight" style={{ fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "-1.5px" }}>
            Write without<br />
            <span className="italic text-accent">second-guessing</span><br />
            yourself.
          </h1>

          {/* Subheadline */}
          <p className="text-[17px] text-[#a1a1b5] font-light mb-6 max-w-[600px] leading-relaxed">
            WritePro empowers professionals and content creators to write better, faster. Enhance clarity, tone, and impact with intelligent AI suggestions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <a href="/signup" className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-sm font-medium hover:opacity-90 transition-opacity text-center">
              Start Free Trial
            </a>
            <a href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-transparent text-foreground rounded-sm font-medium hover:bg-background/50 transition-colors">
              Watch Demo
              <ArrowUpRight size={18} />
            </a>
          </div>


        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">WHAT YOU GET</div>

          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 leading-tight">Everything you need to write better</h2>
          
          <p className="text-muted-foreground text-lg mb-12 max-w-[600px]">Powerful tools built for serious writers</p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'AI Suggestions',
                description: 'Context-aware recommendations that improve clarity and tone as you write.'
              },
              {
                icon: LayoutList,
                title: 'Writing Modes',
                description: 'Switch between Blog, Email, Technical, and Creative modes instantly.'
              },
              {
                icon: BarChart2,
                title: 'Usage Tracking',
                description: 'Monitor word count, project activity, and monthly limits in real time.'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-8 bg-card border border-accent/30 border-l-4 border-l-accent rounded hover:border-accent hover:border-l-accent transition-colors">
                  <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#a1a1b5] text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Honest Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">No hidden fees. Cancel anytime.</p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12 border border-border w-fit mx-auto">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-transparent text-foreground hover:border-accent'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 font-medium transition-colors border-l border-border ${
                billingPeriod === 'yearly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-transparent text-foreground hover:border-accent'
              }`}
            >
              Yearly
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Free',
                price: billingPeriod === 'monthly' ? 0 : 0,
                monthlyEquivalent: 0,
                description: 'Perfect for getting started',
                features: ['Basic AI suggestions', '5 documents/month', 'Email support']
              },
              {
                name: 'Pro',
                price: billingPeriod === 'monthly' ? 9 : 86.40,
                monthlyEquivalent: 7.20,
                description: 'For serious writers and creators',
                features: ['Advanced AI features', 'Unlimited documents', 'Priority support', 'Style templates'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: billingPeriod === 'monthly' ? 49 : 588,
                monthlyEquivalent: 49,
                description: 'For teams and organizations',
                features: ['Custom AI models', 'Team collaboration', '24/7 support', 'API access']
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative pt-0 overflow-hidden rounded border transition-all ${
                  plan.highlighted
                    ? 'bg-card border-accent border-2 transform md:scale-105'
                    : 'bg-card border-accent/30'
                }`}
              >
                {/* Top accent bar for Pro only */}
                {plan.highlighted && (
                  <div className="h-1 bg-accent w-full" />
                )}
                
                <div className="p-8">
                  {/* Plan name - uppercase, 11px, letter-spacing */}
                  <h3 className="text-[11px] font-normal text-muted-foreground tracking-widest uppercase mb-4">
                    {plan.name}
                  </h3>

                  {/* Price - large serif */}
                  <div className="mb-2">
                    <span 
                      className="font-serif text-white" 
                      style={{ fontSize: '48px', letterSpacing: '-0.5px' }}
                    >
                      ${billingPeriod === 'monthly' ? plan.price : plan.monthlyEquivalent}
                    </span>
                    <span className="text-[14px] text-muted-foreground ml-2">/mo</span>
                  </div>

                  {/* Billed annually note */}
                  {billingPeriod === 'yearly' && plan.monthlyEquivalent > 0 && (
                    <p className="text-xs text-muted-foreground mb-4">billed annually</p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Separator */}
                  <div className="border-b border-border mb-6" />

                  {/* CTA Button */}
                  <a
                    href="/signup"
                    className={`w-full py-2 font-medium mb-6 transition-colors inline-block text-center ${
                      plan.highlighted
                        ? 'bg-accent text-accent-foreground hover:opacity-90'
                        : 'bg-transparent border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </a>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-[13px] text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4 text-center">WHAT PEOPLE SAY</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Loved by Creators</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Content Creator',
                text: 'WritePro transformed my writing process. I\'ve cut editing time in half.',
                initials: 'SJ'
              },
              {
                name: 'Mark Chen',
                role: 'Business Consultant',
                text: 'The tone adjustment feature is incredible. My client emails are now more professional.',
                initials: 'MC'
              },
              {
                name: 'Emma Wilson',
                role: 'Technical Writer',
                text: 'Finally, an AI that understands technical documentation. Highly recommend!',
                initials: 'EW'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-7 bg-card border-l-2 border-l-accent border border-accent/20 rounded">
                {/* Quote text - italic, serif */}
                <p className="font-serif italic text-[15px] text-[#e4e4f0] mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Horizontal divider */}
                <div className="border-b border-border mb-6" />

                {/* Author section */}
                <div className="flex items-center gap-3">
                  {/* Initials avatar */}
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[13px] font-semibold text-accent">
                      {testimonial.initials}
                    </span>
                  </div>
                  
                  {/* Name and role */}
                  <div>
                    <p className="font-medium text-[13px] text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-[720px]">
          {/* Label */}
          <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4 text-center">
            GOT QUESTIONS
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl text-white text-center mb-3 leading-tight">
            Everything you need to know
          </h2>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground mb-12 text-sm" style={{ fontSize: '14px' }}>
            Can&apos;t find an answer? Email us at hello@writepro.ai
          </p>

          {/* FAQ Items */}
          <div className="space-y-0">
            {[
              {
                q: 'What happens if I hit my word limit?',
                a: 'You can upgrade to a higher tier at any time to get more words per month. There are no penalties for hitting your limit.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel with one click from your account settings. No questions asked.'
              },
              {
                q: 'Is my data safe?',
                a: 'Absolutely. Your writing is private and encrypted. We never train on your data.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a full refund within 7 days of purchase. No conditions.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[#1e1e2e] py-0"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full py-4 text-left flex items-center justify-between bg-transparent hover:bg-transparent transition-colors"
                >
                  <span 
                    className="text-white font-normal"
                    style={{ fontSize: '15px' }}
                  >
                    {item.q}
                  </span>
                  {expandedFAQ === idx ? (
                    <Minus size={20} className="text-accent flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-accent flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === idx && (
                  <div className="pb-4 pt-0">
                    <p 
                      className="text-[#a1a1b5]"
                      style={{ fontSize: '14px', lineHeight: '1.7' }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section 
        className="px-4 sm:px-6 lg:px-8 border-t border-b border-[#1e1e2e]"
        style={{ backgroundColor: '#0f0f17', paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Start writing better today
          </h2>
          <p 
            className="text-muted-foreground mb-8 max-w-[600px]"
            style={{ fontSize: '16px' }}
          >
            Join 10,000+ writers already using WritePro. Free to start, no credit card required.
          </p>
          <a 
            href="/signup" 
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity"
            style={{ fontSize: '14px', borderRadius: '4px' }}
          >
            Get Started Free
          </a>
          <p 
            className="text-muted-foreground mt-4"
            style={{ fontSize: '12px' }}
          >
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-[#1e1e2e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Left side: Logo and tagline */}
            <div>
              <div className="font-serif text-lg font-normal mb-3">
                <span className="text-foreground">WritePro</span>
                <span className="italic text-accent ml-1">AI</span>
              </div>
              <p 
                className="text-muted-foreground"
                style={{ fontSize: '12px' }}
              >
                AI writing for the modern professional
              </p>
            </div>

            {/* Right side: Links */}
            <div>
              <div 
                className="font-medium text-foreground mb-4"
                style={{ fontSize: '13px' }}
              >
                Product
              </div>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Dashboard'].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      style={{ fontSize: '13px' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div 
                className="font-medium text-foreground mb-4"
                style={{ fontSize: '13px' }}
              >
                Company
              </div>
              <ul className="space-y-3">
                {['FAQ', 'Contact', 'Privacy'].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      style={{ fontSize: '13px' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#1e1e2e] pt-8">
            <p 
              className="text-center text-muted-foreground"
              style={{ fontSize: '12px' }}
            >
              © 2025 WritePro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

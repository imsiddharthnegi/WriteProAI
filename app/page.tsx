'use client'

import { useState } from 'react'
import { ChevronDown, Lightbulb, LayoutList, BarChart2, Check, Star, Menu, X, ArrowUpRight, Dot } from 'lucide-react'

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
      <section className="relative px-4 sm:px-6 lg:px-8 pt-[60px] pb-20 overflow-hidden">
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

          {/* Stats */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-12 pt-8 pb-8 border-t border-accent/30">
            <div className="text-center">
              <div className="font-serif text-4xl font-normal text-white mb-2">10,000+</div>
              <p className="text-sm text-muted-foreground">Writers</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-normal text-white mb-2">4.9</div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-normal text-white mb-2">2x</div>
              <p className="text-sm text-muted-foreground">Faster</p>
            </div>
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
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Choose the plan that works for you</p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded font-medium transition-colors relative ${
                billingPeriod === 'yearly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground'
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
                features: ['Basic AI suggestions', '5 documents/month', 'Email support']
              },
              {
                name: 'Pro',
                price: billingPeriod === 'monthly' ? 9 : 86.40,
                monthlyEquivalent: 7.20,
                features: ['Advanced AI features', 'Unlimited documents', 'Priority support', 'Style templates'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: billingPeriod === 'monthly' ? 49 : 588,
                monthlyEquivalent: 49,
                features: ['Custom AI models', 'Team collaboration', '24/7 support', 'API access']
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded border transition-all ${
                  plan.highlighted
                    ? 'bg-card border-accent border-2 transform md:scale-105'
                    : 'bg-card border-accent/30'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  {billingPeriod === 'monthly' ? (
                    <>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${plan.monthlyEquivalent}</span>
                      <span className="text-muted-foreground ml-2">/mo</span>
                      {plan.monthlyEquivalent > 0 && (
                        <div className="text-sm text-muted-foreground mt-2">
                          billed annually
                        </div>
                      )}
                    </>
                  )}
                </div>
                <a
                  href="/signup"
                  className={`w-full py-2 rounded font-medium mb-8 transition-colors inline-block text-center ${
                    plan.highlighted
                      ? 'bg-accent text-accent-foreground hover:opacity-90'
                      : 'bg-card border border-border text-foreground hover:bg-background'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </a>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Loved by Creators</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Content Creator',
                text: 'WritePro transformed my writing process. I\'ve cut editing time in half.',
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
              <div key={idx} className="p-6 bg-card border border-accent/20 rounded">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm">{testimonial.text}</p>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-muted-foreground text-xs">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>

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
              <div key={idx} className="border border-border rounded overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between bg-card hover:bg-card/50 transition-colors"
                >
                  <span className="font-semibold text-sm">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform ${
                      expandedFAQ === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === idx && (
                  <div className="p-4 border-t border-border bg-background/50">
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="font-serif text-lg font-normal mb-4 sm:mb-0">
              <span className="text-foreground">WritePro</span>
            </div>
            <p>© 2025 WritePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

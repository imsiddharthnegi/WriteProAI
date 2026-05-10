'use client'

import { useState } from 'react'
import { ChevronDown, Lightbulb, LayoutList, BarChart2, Check, Star, Menu, X } from 'lucide-react'

export default function Page() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded" />
              <span className="font-bold text-lg">WritePro</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm hover:text-accent transition-colors">Features</a>
              <a href="#" className="text-sm hover:text-accent transition-colors">Pricing</a>
              <a href="#" className="text-sm hover:text-accent transition-colors">FAQ</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop CTA */}
            <button className="hidden md:flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-4">
              <a href="#" className="text-sm hover:text-accent">Features</a>
              <a href="#" className="text-sm hover:text-accent">Pricing</a>
              <a href="#" className="text-sm hover:text-accent">FAQ</a>
              <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-5xl text-center">
          {/* Accent line */}
          <div className="h-0.5 w-12 bg-accent mx-auto mb-6" />

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            Transform Your Writing with AI
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            WritePro empowers professionals and content creators to write better, faster. Enhance clarity, tone, and impact with intelligent AI suggestions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-border bg-card text-foreground rounded font-medium hover:bg-card/50 transition-colors">
              Watch Demo
            </button>
          </div>

          {/* Floating Cards - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-card border border-accent/20 rounded text-left">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm text-muted-foreground">Real-time enhancement</p>
            </div>
            <div className="p-4 bg-card border border-accent/20 rounded text-left">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-muted-foreground">Tone & style control</p>
            </div>
            <div className="p-4 bg-card border border-accent/20 rounded text-left">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm text-muted-foreground">Professional polish</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Powerful Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'Smart Suggestions',
                description: 'AI-powered recommendations to improve clarity and engagement'
              },
              {
                icon: LayoutList,
                title: 'Style Control',
                description: 'Adjust tone from casual to professional with one click'
              },
              {
                icon: BarChart2,
                title: 'Analytics',
                description: 'Track readability score and writing improvements over time'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-6 bg-card border border-accent/30 rounded">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
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
              {billingPeriod === 'yearly' && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap">
                  Save 20%
                </span>
              )}
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: billingPeriod === 'monthly' ? 19 : 152,
                features: ['Basic AI suggestions', '5 documents/month', 'Email support']
              },
              {
                name: 'Professional',
                price: billingPeriod === 'monthly' ? 49 : 392,
                features: ['Advanced AI features', 'Unlimited documents', 'Priority support', 'Style templates'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: billingPeriod === 'monthly' ? 99 : 792,
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
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <button
                  className={`w-full py-2 rounded font-medium mb-8 transition-colors ${
                    plan.highlighted
                      ? 'bg-accent text-accent-foreground hover:opacity-90'
                      : 'bg-card border border-border text-foreground hover:bg-background'
                  }`}
                >
                  Get Started
                </button>
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
                <p className="text-accent text-xs">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {[
              {
                q: 'How does WritePro improve my writing?',
                a: 'WritePro uses advanced AI to analyze your text and provide real-time suggestions for clarity, tone, and engagement. Our algorithms learn from millions of well-written documents.'
              },
              {
                q: 'Can I use WritePro offline?',
                a: 'WritePro works best with an internet connection, but we offer a limited offline mode for Pro and Enterprise users.'
              },
              {
                q: 'Is my data secure?',
                a: 'Yes, we use enterprise-grade encryption and never share your data with third parties. Your writing remains completely private.'
              },
              {
                q: 'What formats does WritePro support?',
                a: 'We support Word, Google Docs, PDF, and plain text. Integration with other tools is coming soon.'
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

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to write better?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of writers already using WritePro</p>
          <button className="px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition-opacity">
            Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-accent rounded" />
                <span className="font-bold">WritePro</span>
              </div>
              <p className="text-sm text-muted-foreground">Enhance your writing with AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 WritePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

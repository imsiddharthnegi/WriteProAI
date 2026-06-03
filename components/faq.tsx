'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What happens if I hit my word limit?',
    answer:
      'You can upgrade to a higher tier at any time. Your existing work is never deleted — you just won\'t be able to create new content until you upgrade or your monthly limit resets.',
  },
  {
    id: 2,
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, no lock-ins. Cancel from your dashboard settings in under 30 seconds. You keep access until the end of your current billing period.',
  },
  {
    id: 3,
    question: 'Is my writing data private?',
    answer:
      'Your documents are encrypted at rest and never used to train AI models. We don\'t read your content. Ever.',
  },
  {
    id: 4,
    question: 'Do you offer refunds?',
    answer:
      'We offer a full refund within 7 days of any paid subscription, no questions asked.',
  },
  {
    id: 5,
    question: 'Is there a free trial for the Pro plan?',
    answer:
      'Yes — the Free plan lets you experience core features before committing. No credit card required to start.',
  },
  {
    id: 6,
    question: 'Can I use WritePro for team collaboration?',
    answer:
      'Team features are available on the Enterprise plan. Shared workspaces, role-based access, and collaborative editing are all included.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = React.useState(1)

  return (
    <div className="bg-[#fafaf9] py-[120px] px-6 md:px-0">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-16">
          {/* Left Column - Header (sticky) */}
          <div className="md:sticky md:top-[120px] md:h-fit flex flex-col justify-start">
            <div className="text-[11px] font-medium text-[#2dd4bf] uppercase tracking-[0.15em] mb-6">
              FAQ
            </div>
            <h2 className="text-[48px] font-semibold text-[#0c0c0e] leading-tight">
              Questions we get<br />a lot.
            </h2>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-0">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-[#e5e7eb]"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full py-6 flex items-center justify-between cursor-pointer"
                >
                  <h3 className={`text-left text-[17px] font-medium transition-colors duration-150 ${
                    openId === faq.id ? 'text-[#2dd4bf]' : 'text-[#0c0c0e]'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div
                      className={`text-[#2dd4bf] transition-transform duration-200`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '18px',
                        height: '18px',
                        transform: openId === faq.id ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <line
                          x1="9"
                          y1="2"
                          x2="9"
                          y2="16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="2"
                          y1="9"
                          x2="16"
                          y2="9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Answer - Expandable */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openId === faq.id ? 'border-l-2 border-[#2dd4bf] pl-4' : ''
                  }`}
                  style={{
                    maxHeight: openId === faq.id ? '500px' : '0px',
                    opacity: openId === faq.id ? 1 : 0,
                  }}
                >
                  <p className="text-[15px] text-[#52525b] leading-[1.8] pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

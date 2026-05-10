'use client'

import { Download } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard-sidebar'
import DemoBanner from '@/components/demo-banner'

export default function BillingPage() {
  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      // Handle cancellation
      alert('Subscription cancelled')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle deletion
      alert('Account deleted')
    }
  }

  const invoices = [
    { date: 'Apr 1, 2026', amount: '$0.00', status: 'Paid' },
    { date: 'Mar 1, 2026', amount: '$0.00', status: 'Paid' },
    { date: 'Feb 1, 2026', amount: '$0.00', status: 'Paid' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <DemoBanner />
      <div className="flex flex-1 md:pl-60">
        <DashboardSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-5 md:p-10 md:pb-20 pb-28">
        <div className="mb-8">
          <h1 className="text-white text-2xl md:text-[28px] font-bold">Billing & Subscription</h1>
          <p className="text-[#71717a] text-sm mt-2">Manage your plan and payment details</p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-white text-xl font-bold">Free Plan</h2>
                <span className="bg-[#052e16] text-[#4ade80] text-xs px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-[#71717a] text-sm mb-1">Next billing date: —</p>
              <p className="text-[#71717a] text-sm">0 / 100 words used this month</p>
            </div>
            <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded font-medium transition-colors whitespace-nowrap">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Usage Card */}
        <div className="bg-[#0f0f17] border border-[#1e1e2e] rounded p-6 mb-8">
          <p className="text-[#71717a] text-xs uppercase font-semibold mb-4">Monthly Usage</p>
          <p className="text-white text-xl font-bold mb-4">0 / 100 words</p>
          <div className="w-full bg-[#1e1e2e] rounded h-2 mb-2 overflow-hidden">
            <div className="h-full bg-[#6366f1] rounded" style={{ width: '0%' }}></div>
          </div>
          <p className="text-[#71717a] text-xs">Resets on June 1, 2026</p>
        </div>

        {/* Invoice History */}
        <div>
          <h2 className="text-white text-xl font-bold mb-6 mt-8">Invoice History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="text-[#71717a] text-xs uppercase font-semibold py-3 text-left">Date</th>
                  <th className="text-[#71717a] text-xs uppercase font-semibold py-3 text-left">Amount</th>
                  <th className="text-[#71717a] text-xs uppercase font-semibold py-3 text-left">Status</th>
                  <th className="text-[#71717a] text-xs uppercase font-semibold py-3 text-left">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, idx) => (
                  <tr key={idx} className="border-b border-[#1e1e2e]">
                    <td className="text-white text-sm py-3.5">{invoice.date}</td>
                    <td className="text-white text-sm py-3.5">{invoice.amount}</td>
                    <td className="text-[#4ade80] text-sm py-3.5">{invoice.status}</td>
                    <td className="text-[#71717a] hover:text-[#6366f1] transition-colors py-3.5">
                      <button className="flex items-center gap-2">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancel Subscription */}
        <div className="mt-8 text-center">
          <button
            onClick={handleCancelSubscription}
            className="text-[#71717a] hover:text-white text-sm transition-colors"
          >
            Cancel subscription
          </button>
        </div>
      </main>
      </div>
    </div>
  )
}

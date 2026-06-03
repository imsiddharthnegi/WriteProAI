'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const notifications = [
  { id: 1, text: '✍️ Sarah just improved a product email', time: '2s ago' },
  { id: 2, text: '✍️ Marcus enhanced a blog post', time: '5s ago' },
  { id: 3, text: '✍️ Priya refined a technical doc', time: '8s ago' },
]

export const NotificationStrip = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-900/50 border-t border-slate-800 py-3 px-6 md:px-0">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={notifications[currentIndex].id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-[12px] text-slate-500 text-center"
          >
            <span>{notifications[currentIndex].text}</span>
            <span className="text-slate-600 ml-1">· {notifications[currentIndex].time}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

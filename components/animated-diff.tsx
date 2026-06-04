'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface WordReplacement {
  original: string
  enhanced: string
  lineIndex: number
}

export const AnimatedDiff = () => {
  const originalLines = [
    "We're really excited about",
    'the new product launch',
    "and think it's gonna be",
    'pretty good.',
  ]

  const enhancedLines = [
    "We're thrilled about",
    'the upcoming product launch',
    'and confident it will drive',
    'meaningful results.',
  ]

  // Define word replacements with timing
  const replacements: WordReplacement[] = [
    { original: 'really excited', enhanced: 'thrilled', lineIndex: 0 },
    { original: 'new', enhanced: 'upcoming', lineIndex: 1 },
    { original: "think it's gonna be", enhanced: 'confident it will drive', lineIndex: 2 },
    { original: 'pretty good.', enhanced: 'meaningful results.', lineIndex: 3 },
  ]

  return (
    <div className="bg-[#0f0f14] border border-[#1f1f23] rounded-lg p-6">
      {/* Before/After Labels */}
      <div className="flex gap-32 mb-6">
        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
          Original
        </div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
          Enhanced
        </div>
      </div>

      {/* Diff Container */}
      <div className="grid grid-cols-2 gap-12 text-sm leading-relaxed">
        {/* Before Column */}
        <div className="text-slate-400 space-y-4 text-left">
          {originalLines.map((line, i) => (
            <p key={i} className="text-[14px]">{line}</p>
          ))}
        </div>

        {/* After Column - Animated */}
        <div className="text-slate-300 space-y-4 text-left">
          {enhancedLines.map((line, lineIndex) => (
            <AnimatedLine
              key={lineIndex}
              line={line}
              lineIndex={lineIndex}
              replacements={replacements}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface AnimatedLineProps {
  line: string
  lineIndex: number
  replacements: WordReplacement[]
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  line,
  lineIndex,
  replacements,
}) => {
  const replacement = replacements.find((r) => r.lineIndex === lineIndex)
  const highlightWord = replacement?.enhanced

  // Calculate the delay: 1.5s initial delay + (lineIndex * 800ms for word-by-word)
  const startDelay = 1.5 + lineIndex * 0.8

  return (
    <p className="text-[14px]">
      {line.split(' ').map((word, wordIndex) => {
        const isHighlighted = highlightWord?.includes(word)

        return (
          <span key={wordIndex} className="inline">
            {isHighlighted ? (
              <motion.span
                className="bg-teal-400/20 text-teal-300 px-1"
                initial={{ backgroundColor: 'transparent', color: '#cbd5e1' }}
                animate={{
                  backgroundColor: [
                    'transparent',
                    'rgba(45, 212, 191, 0.2)',
                    'transparent',
                  ],
                  color: ['#cbd5e1', '#5eead4', '#cbd5e1'],
                }}
                transition={{
                  delay: startDelay,
                  duration: 0.2,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                }}
              >
                {word}
              </motion.span>
            ) : (
              <span>{word}</span>
            )}
            {wordIndex < line.split(' ').length - 1 && ' '}
          </span>
        )
      })}
    </p>
  )
}

export default AnimatedDiff

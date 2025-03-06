"use client"

import { motion } from "framer-motion"

interface CardProps {
  emoji: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div className="relative aspect-square cursor-pointer perspective-500" onClick={onClick}>
      <motion.div
        className={`w-full h-full relative preserve-3d transition-all duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center 
            ${isMatched ? "bg-blue-900/20 border-blue-400/30" : "bg-gray-900 border-blue-500"} 
            border-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
        >
          <div className="text-blue-400 text-4xl font-bold">?</div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl flex items-center justify-center 
            ${
              isMatched
                ? "bg-blue-900/30 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                : "bg-blue-800/30 border-blue-400"
            } 
            border-2`}
        >
          <div className="text-4xl sm:text-5xl">{emoji}</div>
        </div>
      </motion.div>
    </div>
  )
}


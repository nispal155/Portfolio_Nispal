"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

export function BootSequence() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lines, setLines] = React.useState<string[]>([])
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    const hasBooted = sessionStorage.getItem("booted")
    if (hasBooted) {
      setIsVisible(false)
      setShouldRender(true)
      return
    }

    setShouldRender(true)

    const sequence = [
      "NEXUS//OS v2.0.4",
      "Initializing core modules...",
      "[OK] Neural interface loaded",
      "[OK] 3D rendering engine active",
      "[OK] Vercel AI SDK connected",
      "Establishing secure connection to mainframe...",
      "Access granted. Welcome, user."
    ]

    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsVisible(false)
          sessionStorage.setItem("booted", "true")
        }, 1000)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col justify-end p-8 md:p-24 bg-black text-[#00ff41] font-mono text-sm md:text-base pointer-events-none"
        >
          <div className="flex flex-col gap-2 max-w-3xl">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <span className="opacity-50">{`> `}</span>
                <span>{line}</span>
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
              className="w-3 h-5 bg-[#00ff41] mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

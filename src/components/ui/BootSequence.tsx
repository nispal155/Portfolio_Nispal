"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

export function BootSequence() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    const hasBooted = sessionStorage.getItem("booted")
    if (hasBooted) {
      setIsVisible(false)
      setShouldRender(true)
      return
    }

    setShouldRender(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("booted", "true")
    }, 2500) // Show for 2.5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient"
          >
            Welcome to my Portfolio
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

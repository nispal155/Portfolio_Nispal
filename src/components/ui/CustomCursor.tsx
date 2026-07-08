"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorScale = useSpring(1, { damping: 20, stiffness: 300 })
  const [cursorType, setCursorType] = React.useState<"default" | "hover" | "magnetic">("default")
  const [targetPos, setTargetPos] = React.useState<{ x: number; y: number; w: number; h: number } | null>(null)

  const springConfig = { damping: 30, stiffness: 250 }
  const xSpring = useSpring(cursorX, springConfig)
  const ySpring = useSpring(cursorY, springConfig)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (targetPos) {
        // Pull toward center of target
        const center = {
          x: targetPos.x + targetPos.w / 2,
          y: targetPos.y + targetPos.h / 2
        }
        const dx = e.clientX - center.x
        const dy = e.clientY - center.y
        
        cursorX.set(center.x + dx * 0.25 - 16)
        cursorY.set(center.y + dy * 0.25 - 16)
      } else {
        cursorX.set(e.clientX - 16)
        cursorY.set(e.clientY - 16)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role='button'], .magnetic-hover")
      
      if (interactive) {
        if (interactive.classList.contains("magnetic-hover") || interactive.tagName === "BUTTON") {
          const rect = interactive.getBoundingClientRect()
          setTargetPos({ x: rect.left, y: rect.top, w: rect.width, h: rect.height })
          setCursorType("magnetic")
          cursorScale.set(1.5)
        } else {
          setCursorType("hover")
          cursorScale.set(1.2)
        }
      } else {
        setTargetPos(null)
        setCursorType("default")
        cursorScale.set(1)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, targetPos, cursorScale])

  // Hide on touch devices
  const [isMobile, setIsMobile] = React.useState(true)
  React.useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches)
  }, [])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-difference hidden md:block ${
          cursorType === "magnetic" 
            ? "border-purple-500 bg-purple-500/20" 
            : cursorType === "hover" 
            ? "border-primary bg-primary/10" 
            : "border-primary"
        }`}
        style={{
          x: xSpring,
          y: ySpring,
          scale: cursorScale,
        }}
      />
      <motion.div
        className="fixed top-[14px] left-[14px] w-1 h-1 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: xSpring,
          y: ySpring,
        }}
      />
    </>
  )
}

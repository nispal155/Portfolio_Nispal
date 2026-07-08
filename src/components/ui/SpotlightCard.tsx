"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export function SpotlightCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isHovered = React.useRef(false)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)
  
  // 3D Tilt transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7.5, -7.5])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7.5, 7.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // Normalized position from -0.5 to 0.5 for tilt
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(nx)
    mouseY.set(ny)
  }

  const handleMouseEnter = () => {
    isHovered.current = true
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className={cn("relative group", className)} style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative rounded-xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]) => `radial-gradient(600px circle at ${(x as number + 0.5) * 100}% ${(y as number + 0.5) * 100}%, rgba(139,92,246,0.15), transparent 40%)`
            )
          }}
        />
        {/* Glare border effect */}
        <motion.div
          className="pointer-events-none absolute -inset-[2px] rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-[-1]"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]) => `radial-gradient(300px circle at ${(x as number + 0.5) * 100}% ${(y as number + 0.5) * 100}%, rgba(139,92,246,0.5), transparent 40%)`
            )
          }}
        />
        <div className="relative h-full w-full z-0 overflow-hidden">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

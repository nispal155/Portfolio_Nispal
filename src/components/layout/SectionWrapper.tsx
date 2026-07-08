"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export function SectionWrapper({
  id,
  children,
  className,
  innerClassName,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 overflow-hidden", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("container mx-auto px-4 md:px-6", innerClassName)}
      >
        {children}
      </motion.div>
    </section>
  )
}

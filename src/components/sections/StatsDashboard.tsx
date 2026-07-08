"use client"

import * as React from "react"
import { motion, useInView, animate } from "motion/react"
import { Code, Coffee, GitPullRequest, Laptop } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent } from "@/components/ui/card"

function AnimatedNumber({ value, label, icon }: { value: number, label: string, icon: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.floor(value))
        }
      })
      return () => controls.stop()
    }
  }, [value, isInView])

  return (
    <Card ref={ref} className="border-border bg-card/50 backdrop-blur-sm overflow-hidden group">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 relative">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="p-3 rounded-full bg-primary/10 text-primary relative z-10">
          {icon}
        </div>
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-2">
            {displayValue.toLocaleString()}{value > 100 ? "+" : ""}
          </h3>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsDashboard() {
  const stats = [
    { value: 15, label: "Projects Completed", icon: <Laptop className="w-6 h-6" /> },
    { value: 500, label: "Git Commits", icon: <GitPullRequest className="w-6 h-6" /> },
    { value: 120, label: "Cups of Coffee", icon: <Coffee className="w-6 h-6" /> },
    { value: 10, label: "Technologies Mastered", icon: <Code className="w-6 h-6" /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 100 } }
  }

  return (
    <SectionWrapper id="stats" className="bg-muted/10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">By The Numbers</h2>
          <p className="text-muted-foreground max-w-2xl">
            A quick glance at my development journey and productivity metrics.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <AnimatedNumber value={stat.value} label={stat.label} icon={stat.icon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

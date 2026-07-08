"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Code2, Server, Database, Wrench } from "lucide-react"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent } from "@/components/ui/card"

export function TechMatrix() {
  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-5 h-5" />,
      skills: PORTFOLIO_DATA.skills.frontend,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Backend",
      icon: <Server className="w-5 h-5" />,
      skills: PORTFOLIO_DATA.skills.backend,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5" />,
      skills: PORTFOLIO_DATA.skills.database,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench className="w-5 h-5" />,
      skills: PORTFOLIO_DATA.skills.tools,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <SectionWrapper id="skills" className="bg-muted/30">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Tech Matrix</h2>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical arsenal, from frontend architectures to robust backend systems.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${category.bg} ${category.color}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center group">
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

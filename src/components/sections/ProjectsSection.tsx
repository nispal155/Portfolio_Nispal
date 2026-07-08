"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ExternalLink, Folder } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <SectionWrapper id="projects" className="bg-background">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of my recent work showcasing full-stack capabilities, problem-solving, and attention to detail.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col border-border bg-card/50 hover:bg-card/80 transition-colors group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <FaGithub className="w-5 h-5" />
                        <span className="sr-only">GitHub Repo</span>
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>
                  {project.challenge && (
                    <div className="mt-2 text-sm border-l-2 border-primary/50 pl-3 italic text-muted-foreground/80">
                      Challenge: {project.challenge}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

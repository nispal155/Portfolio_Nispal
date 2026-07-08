"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent } from "@/components/ui/card"

export function ExperienceTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <SectionWrapper id="experience" className="bg-muted/10 relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[2.5rem] md:left-1/2 top-32 bottom-32 w-px bg-border/50 transform md:-translate-x-1/2 hidden sm:block z-0" />

      <div className="flex flex-col gap-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl">
            My professional journey and academic background.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8 max-w-4xl mx-auto w-full"
        >
          {/* Work Experience */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary z-10">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </div>

          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`flex flex-col md:flex-row gap-6 w-full ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
              
              {/* Node indicator */}
              <div className="hidden md:flex flex-col items-center justify-start mt-6 z-10">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
              </div>

              {/* Content Card */}
              <Card className="flex-1 border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <div className="text-lg text-primary font-medium">{exp.company}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground text-sm leading-relaxed">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Education */}
          <div className="flex items-center gap-4 mt-8 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary z-10">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col md:flex-row gap-6 w-full">
              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
              
              {/* Node indicator */}
              <div className="hidden md:flex flex-col items-center justify-start mt-6 z-10">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
              </div>

              <Card className="flex-1 border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold">{edu.degree}</h4>
                    <div className="text-lg text-primary font-medium">{edu.institution}</div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {edu.year}
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

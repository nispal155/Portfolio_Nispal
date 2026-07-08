"use client"

import * as React from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { User, MapPin, Mail, Phone } from "lucide-react"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-muted/30">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">About Me</h2>
        <div className="h-1 w-20 bg-primary mt-4 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Photo Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-background shadow-2xl ring-2 ring-primary/20 bg-muted flex items-center justify-center group">
            <Image
              src="/nispal.jpg"
              alt="Nispal Bhattarai"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </motion.div>
        
        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-2xl md:text-3xl font-semibold">
            {PORTFOLIO_DATA.personal.title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {PORTFOLIO_DATA.personal.summary}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-primary transition-colors">
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="hover:text-primary transition-colors">
                {PORTFOLIO_DATA.personal.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

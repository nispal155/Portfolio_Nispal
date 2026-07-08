"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Mail, Phone, Send, MapPin, CheckCircle2 } from "lucide-react"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent } from "@/components/ui/card"

export function ContactSection() {
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
    <SectionWrapper id="contact" className="bg-background">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Let's Connect</h2>
          <p className="text-muted-foreground max-w-2xl">
            Have a project in mind or want to explore potential opportunities? Drop a message below and let's create something extraordinary together.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto w-full"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            <Card className="border-border bg-card/50 backdrop-blur-sm h-full flex flex-col justify-center">
              <CardContent className="p-6 sm:p-8 flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
                  <p className="text-muted-foreground">
                    Whether it's a full-stack application, an intuitive frontend design, or a complex backend architecture—I'm ready for the challenge.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Email</div>
                      <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-lg font-semibold hover:text-primary transition-colors">
                        {PORTFOLIO_DATA.personal.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Phone</div>
                      <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="text-lg font-semibold hover:text-primary transition-colors">
                        {PORTFOLIO_DATA.personal.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Location</div>
                      <div className="text-lg font-semibold">
                        {PORTFOLIO_DATA.personal.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form - Visme Embed */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            <Card className="border-border bg-card/50 backdrop-blur-sm min-h-[500px] lg:min-h-[600px] w-full overflow-hidden h-full">
              <CardContent className="p-0 h-full w-full relative">
                <iframe 
                  src="https://forms.visme.co/formsPlayer/7vgj6dky-open-house-feedback-form" 
                  width="100%" 
                  height="100%" 
                  style={{ border: "none", minHeight: "100%", height: "100%", position: "absolute", inset: 0 }} 
                  title="Contact Form"
                  allow="microphone; camera;"
                />
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </SectionWrapper>
  )
}

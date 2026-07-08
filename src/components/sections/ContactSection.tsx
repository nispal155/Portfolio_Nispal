"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

import { PORTFOLIO_DATA } from "@/lib/data"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactSection() {
  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  })
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.firstName || !formState.email || !formState.message) {
      setStatus("error")
      setErrorMsg("Please fill out all required fields.")
      return
    }

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        })
      } else {
        setStatus("error")
        setErrorMsg(data.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Submission error:", err)
      setStatus("error")
      setErrorMsg("Unable to send message. Please check your connection and try again.")
    }
  }

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

          {/* Coded Contact Form */}
          <motion.div variants={itemVariants} className="flex flex-col h-full w-full">
            <Card className="border-border bg-card/50 backdrop-blur-sm w-full h-full flex flex-col justify-between p-6 sm:p-8">
              <CardContent className="p-0 h-full w-full">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center gap-4 py-12 h-full"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground max-w-sm">
                        Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                      </p>
                      <Button 
                        onClick={() => setStatus("idle")} 
                        className="mt-6 bg-primary/20 hover:bg-primary/30 text-foreground border border-border"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">
                            First Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formState.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john.doe@example.com"
                          className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+977 9852048719"
                          className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y"
                        />
                      </div>

                      {status === "error" && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer transition-all duration-300"
                      >
                        {status === "loading" ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </SectionWrapper>
  )
}

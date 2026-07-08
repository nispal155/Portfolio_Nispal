"use client"

import * as React from "react"
import { motion } from "motion/react"
import { FileText, ArrowRight, Terminal as TerminalIcon, Copy, Check, Volume2, VolumeX, RotateCcw } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { PORTFOLIO_DATA } from "@/lib/data"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [copied, setCopied] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isHovered, setIsHovered] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("curl nispalbhattarai.com.np/api/resume")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector("#projects")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Full-Screen Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
        <video 
          ref={videoRef}
          src="/Developer_speaking_to_camera_202607082233.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-45 dark:opacity-30 matrix:opacity-20"
        />
        {/* Vignette Overlay & Grid Mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-10 opacity-[0.03] dark:opacity-[0.05] matrix:opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8">
        
        {/* Profile Image with subtle pulse */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80" 
              alt="Nispal Bhattarai" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border border-border z-20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{PORTFOLIO_DATA.personal.name}</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-medium text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <TerminalIcon className="w-6 h-6 text-primary" />
            <span className="inline-block overflow-hidden border-r-2 border-primary animate-[typing_3s_steps(40,end),blink_.75s_step-end_infinite] whitespace-nowrap">
              {PORTFOLIO_DATA.personal.title}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {PORTFOLIO_DATA.personal.summary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <a href="/NISPAL_BHATTARAI_CV.pdf" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300")}>
            <FileText className="mr-2 h-4 w-4" /> Download CV
          </a>
          <a href="#projects" onClick={handleScrollToProjects} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 h-12")}>
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

        {/* Easter Egg Terminal Snippet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center gap-4 shadow-2xl w-full max-w-md group"
        >
          <div className="text-emerald-400 font-mono text-sm overflow-x-auto whitespace-nowrap hide-scrollbar flex-1 text-left">
            <span className="text-zinc-500 mr-2">$</span>
            curl nispalbhattarai.com.np/api/resume
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-white shrink-0"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </Button>
        </motion.div>

      </div>

      {/* Floating Ambient Background Video Controls */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2 bg-background/60 border border-border/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReplay}
          className="h-7 w-7 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors"
          title="Replay video"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="w-[1px] h-3.5 bg-border/80" />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="h-7 w-7 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors"
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  )
}

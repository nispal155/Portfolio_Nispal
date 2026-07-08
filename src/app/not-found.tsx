"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] matrix:opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center text-center max-w-md gap-6"
      >
        <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
          <Terminal className="w-12 h-12" />
        </div>
        <h1 className="text-7xl font-bold tracking-tighter">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Endpoint Not Found</h2>
          <p className="text-muted-foreground">
            The route you are looking for has been moved or doesn't exist in this architecture.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Root Directory
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { Mail, Phone } from "lucide-react"
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/40 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold tracking-tight">
              Nispal<span className="text-primary">.</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              A passionate Full-Stack Web Developer building scalable, user-centric digital solutions with emerging technologies.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:contact@nispalbhattarai.com.np">contact@nispalbhattarai.com.np</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" />
              <a href="tel:+9779852048719">+977 9852048719</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Socials</h4>
            <div className="flex gap-4">
              <a href="https://github.com/nispal155" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/nispal-bhattarai-2661b430a" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.facebook.com/nispal15" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/nispalbhattaraiofficial/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Nispal Bhattarai. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS & Motion
          </p>
        </div>
      </div>
    </footer>
  )
}

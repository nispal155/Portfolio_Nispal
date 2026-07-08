"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Code,
  FileText,
  Laptop,
  Mail,
  Moon,
  Sun,
  Monitor,
  Terminal
} from "lucide-react"
import { FaGithub } from "react-icons/fa"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <div className="fixed top-20 right-6 z-40 hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-sm">
        <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs border">⌘</span>
        <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs border">K</span>
        <span>to command</span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => {
              if (window.location.pathname !== '/') router.push('/#about')
              else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            })}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              if (window.location.pathname !== '/') router.push('/#skills')
              else document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
            })}>
              <Code className="mr-2 h-4 w-4" />
              <span>Tech Matrix</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              if (window.location.pathname !== '/') router.push('/#projects')
              else document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            })}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              if (window.location.pathname !== '/') router.push('/#contact')
              else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            })}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => window.open("/NISPAL_BHATTARAI_CV.pdf", "_blank"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Download CV</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/nispal155", "_blank"))}>
              <FaGithub className="mr-2 h-4 w-4" />
              <span>GitHub Profile</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("matrix"))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Matrix Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

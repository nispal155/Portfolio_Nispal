"use client"

import * as React from "react"
import { Moon, Sun, Terminal } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("matrix")
    else setTheme("light")
  }

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} className="w-9 h-9 relative">
      <Sun className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
      <Terminal className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'matrix' ? 'scale-100 rotate-0 text-[#00ff41]' : 'scale-0 rotate-90'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

"use client"

import * as React from "react"

interface TerminalContextType {
  isOpen: boolean
  toggleTerminal: () => void
  openTerminal: () => void
  closeTerminal: () => void
}

const TerminalContext = React.createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleTerminal = () => setIsOpen(prev => !prev)
  const openTerminal = () => setIsOpen(true)
  const closeTerminal = () => setIsOpen(false)

  // Keyboard shortcut to open terminal (Ctrl+` or Cmd+`)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        toggleTerminal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <TerminalContext.Provider value={{ isOpen, toggleTerminal, openTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = React.useContext(TerminalContext)
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}

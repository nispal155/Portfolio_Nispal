"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import Draggable from "react-draggable"
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react"

import { useTerminal } from "@/hooks/useTerminal"
import { PORTFOLIO_DATA } from "@/lib/data"

type Command = {
  cmd: string
  output: React.ReactNode
}

export function CLITerminal() {
  const { isOpen, closeTerminal } = useTerminal()
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [history, setHistory] = React.useState<Command[]>([
    {
      cmd: "nexus --version",
      output: (
        <div className="text-muted-foreground">
          Nexus OS v1.0.0 (x86_64-apple-darwin20)<br />
          Type <span className="text-emerald-400">help</span> to see available commands.
        </div>
      )
    }
  ])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const terminalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: React.ReactNode = ""

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="grid grid-cols-1 gap-1">
            <div className="text-muted-foreground mb-2">Available commands:</div>
            <div><span className="text-emerald-400 w-24 inline-block">whoami</span> - Display personal info</div>
            <div><span className="text-emerald-400 w-24 inline-block">skills</span> - List technical skills</div>
            <div><span className="text-emerald-400 w-24 inline-block">projects</span> - View featured projects</div>
            <div><span className="text-emerald-400 w-24 inline-block">contact</span> - Show contact details</div>
            <div><span className="text-emerald-400 w-24 inline-block">clear</span> - Clear terminal output</div>
            <div><span className="text-emerald-400 w-24 inline-block">exit</span> - Close the terminal window</div>
          </div>
        )
        break
      case "whoami":
        output = (
          <div>
            <span className="text-primary font-bold">{PORTFOLIO_DATA.personal.name}</span><br />
            {PORTFOLIO_DATA.personal.title}<br />
            {PORTFOLIO_DATA.personal.location}
          </div>
        )
        break
      case "skills":
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-primary font-bold underline mb-1">Frontend</div>
              {PORTFOLIO_DATA.skills.frontend.map(s => <div key={s.name}>- {s.name}</div>)}
            </div>
            <div>
              <div className="text-emerald-400 font-bold underline mb-1">Backend</div>
              {PORTFOLIO_DATA.skills.backend.map(s => <div key={s.name}>- {s.name}</div>)}
            </div>
            <div>
              <div className="text-orange-400 font-bold underline mb-1">Database</div>
              {PORTFOLIO_DATA.skills.database.map(s => <div key={s.name}>- {s.name}</div>)}
            </div>
          </div>
        )
        break
      case "projects":
        output = (
          <div className="space-y-4">
            {PORTFOLIO_DATA.projects.map(p => (
              <div key={p.title}>
                <span className="text-primary font-bold">{p.title}</span> - {p.techStack.join(", ")}
              </div>
            ))}
          </div>
        )
        break
      case "contact":
        output = (
          <div>
            Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-blue-400 underline">{PORTFOLIO_DATA.personal.email}</a><br />
            Phone: {PORTFOLIO_DATA.personal.phone}<br />
            LinkedIn: <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">Profile</a><br />
            GitHub: <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">Profile</a>
          </div>
        )
        break
      case "clear":
        setHistory([])
        return
      case "exit":
        closeTerminal()
        return
      case "":
        break
      default:
        output = <div className="text-red-400">Command not found: {trimmedCmd}. Type 'help' for available commands.</div>
    }

    if (trimmedCmd) {
      setHistory(prev => [...prev, { cmd, output }])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Draggable handle=".terminal-header" disabled={isMaximized}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed z-50 overflow-hidden rounded-xl border border-border shadow-2xl bg-zinc-950/95 dark:bg-zinc-900/95 backdrop-blur-xl flex flex-col font-mono text-sm ${
              isMaximized 
                ? "inset-4 md:inset-10" 
                : "bottom-4 right-4 md:bottom-10 md:right-10 w-[90vw] md:w-[600px] h-[500px]"
            }`}
          >
            {/* Header / Titlebar */}
            <div className="terminal-header flex items-center justify-between px-4 py-3 bg-zinc-900 dark:bg-zinc-950 border-b border-border/50 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="font-semibold text-zinc-300 tracking-tight">nexus-shell ~ zsh</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)} 
                  className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-zinc-200"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={closeTerminal} 
                  className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors text-zinc-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-4 text-zinc-300"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="space-y-4">
                {history.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">➜</span>
                      <span className="text-cyan-400">~</span>
                      <span className="text-zinc-100">{item.cmd}</span>
                    </div>
                    <div className="ml-5">
                      {item.output}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-cyan-400">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-zinc-100 focus:ring-0 p-0 m-0"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  )
}

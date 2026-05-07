import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { Search, FilePlus, Brain, CheckCircle, Code, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-[600px] overflow-hidden"
          >
            <Command className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <Command.Input
                  placeholder="Search everything or type a command..."
                  className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-slate-500 text-sm">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Actions" className="px-2 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <Item icon={FilePlus} label="Create New Note" shortcut="N" />
                  <Item icon={Brain} label="Ask Assistant" shortcut="A" />
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Item({ icon: Icon, label, shortcut }: { icon: any, label: string, shortcut?: string }) {
  return (
    <Command.Item className="flex items-center justify-between px-3 py-2 rounded-lg cursor-default select-none text-slate-700 dark:text-slate-300 aria-selected:bg-nexus-50 dark:aria-selected:bg-nexus-900/30 aria-selected:text-nexus-600 dark:aria-selected:text-nexus-400 transition-colors">
      <div className="flex items-center">
        <Icon className="w-4 h-4 mr-3" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {shortcut && <kbd className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">{shortcut}</kbd>}
    </Command.Item>
  )
}

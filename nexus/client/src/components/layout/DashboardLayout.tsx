import React, { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  BrainCircuit,
  CheckSquare,
  BookOpen,
  Code2,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Plus
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) => (
  <motion.div
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={cn(
    "flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 mb-1 group",
    active ? "bg-[#F4F4F5] dark:bg-white/10 text-black dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5",
    collapsed && "justify-center"
  )}>
    <Icon className={cn("w-[18px] h-[18px] transition-transform group-hover:scale-110", !collapsed && "mr-3")} />
    {!collapsed && <span className="text-[13px] font-semibold tracking-tight">{label}</span>}
  </motion.div>
)

export default function DashboardLayout({ children, setView, currentView }: { children: React.ReactNode, setView: (v: string) => void, currentView: string }) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'notes', icon: FileText, label: 'Notes' },
    { id: 'graph', icon: BrainCircuit, label: 'Knowledge' },
    { id: 'productivity', icon: CheckSquare, label: 'Tasks' },
    { id: 'study', icon: BookOpen, label: 'Study Hub' },
    { id: 'coding', icon: Code2, label: 'Coding' },
  ]

  return (
    <div className="flex h-screen bg-[#FBFBFD] dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-nexus-100">
      {/* Sidebar */}
      <aside className={cn(
        "relative flex flex-col border-r border-slate-200/60 dark:border-white/5 transition-all duration-500 ease-[0.16, 1, 0.3, 1] bg-white dark:bg-black",
        collapsed ? "w-20" : "w-72"
      )}>
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-nexus-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-nexus-500/20">N</div>
              <span className="text-[17px] font-bold tracking-tight">NEXUS</span>
            </div>
          )}
          {collapsed && <div className="w-9 h-9 bg-nexus-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold shadow-lg shadow-nexus-500/20">N</div>}
        </div>

        <div className="flex-1 px-4 mt-2">
          <div className="mb-6">
             <div className={cn(
                "flex items-center px-3 py-2 rounded-xl cursor-pointer bg-slate-50 dark:bg-white/5 text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all",
                collapsed && "justify-center"
             )}>
                <Search className={cn("w-4 h-4", !collapsed && "mr-2")} />
                {!collapsed && <span className="text-[12px] font-medium uppercase tracking-wider">Search (⌘K)</span>}
             </div>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                  key={item.id}
                  {...item}
                  collapsed={collapsed}
                  active={currentView === item.id}
                  onClick={() => setView(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/5">
          <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
          <div className={cn(
            "mt-4 flex items-center p-2 rounded-2xl bg-[#FBFBFD] dark:bg-white/5 border border-slate-100 dark:border-white/5",
            collapsed && "justify-center"
          )}>
            <div className="w-9 h-9 rounded-xl bg-nexus-100 dark:bg-nexus-900/50 flex items-center justify-center text-nexus-600 overflow-hidden">
              <User className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden text-ellipsis">
                <p className="text-[13px] font-bold truncate">Alex Newman</p>
                <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Pro Plan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full border border-slate-200/60 dark:border-white/10 bg-white dark:bg-black flex items-center justify-center shadow-md z-50 hover:scale-110 transition-transform"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between px-10 bg-white/50 dark:bg-black/50 backdrop-blur-xl z-10">
            <h1 className="text-[15px] font-bold tracking-tight uppercase text-slate-500 dark:text-slate-400">
                {currentView}
            </h1>
            <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-slate-500 font-semibold text-[13px]">Support</Button>
                <Button size="sm" onClick={() => setView('notes')} className="rounded-full px-4 h-9 shadow-sm">
                    <Plus className="w-4 h-4 mr-1" />
                    New Note
                </Button>
            </div>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
        </div>
      </main>
    </div>
  )
}

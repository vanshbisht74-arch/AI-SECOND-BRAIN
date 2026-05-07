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
  User
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) => (
  <div
    onClick={onClick}
    className={cn(
    "flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1",
    active ? "bg-nexus-50 dark:bg-nexus-900/30 text-nexus-600 dark:text-nexus-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
    collapsed && "justify-center"
  )}>
    <Icon className={cn("w-5 h-5", !collapsed && "mr-3")} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </div>
)

export default function DashboardLayout({ children, setView, currentView }: { children: React.ReactNode, setView: (v: string) => void, currentView: string }) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'notes', icon: FileText, label: 'Notes' },
    { id: 'graph', icon: BrainCircuit, label: 'Knowledge Graph' },
    { id: 'productivity', icon: CheckSquare, label: 'Tasks' },
    { id: 'study', icon: BookOpen, label: 'Study Hub' },
    { id: 'coding', icon: Code2, label: 'Coding Hub' },
  ]

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className={cn(
        "relative flex flex-col border-r border-slate-200 dark:border-slate-800 transition-all duration-300 bg-surface-light dark:bg-surface-dark",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-nexus-600 rounded flex items-center justify-center text-white font-bold">N</div>
              <span className="font-semibold tracking-tight">NEXUS</span>
            </div>
          )}
          {collapsed && <div className="w-8 h-8 bg-nexus-600 rounded mx-auto flex items-center justify-center text-white font-bold">N</div>}
        </div>

        <div className="flex-1 px-3 mt-4">
          <div className="mb-4">
             <div className={cn(
                "flex items-center px-3 py-2 rounded-lg cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-500 mb-6",
                collapsed && "justify-center"
             )}>
                <Search className={cn("w-4 h-4", !collapsed && "mr-2")} />
                {!collapsed && <span className="text-xs">Search (⌘K)</span>}
             </div>
          </div>
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

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
          <div className={cn(
            "mt-4 flex items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50",
            collapsed && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-nexus-100 dark:bg-nexus-900 flex items-center justify-center text-nexus-600">
              <User className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden text-ellipsis">
                <p className="text-sm font-medium truncate">Alex Newman</p>
                <p className="text-xs text-slate-500 truncate">Pro Account</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm z-50 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm">
            <h1 className="text-lg font-semibold capitalize">{currentView === 'dashboard' ? 'Overview' : currentView}</h1>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">Help</Button>
                <Button size="sm" onClick={() => setView('notes')}>New Note</Button>
            </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
            {children}
        </div>
      </main>
    </div>
  )
}

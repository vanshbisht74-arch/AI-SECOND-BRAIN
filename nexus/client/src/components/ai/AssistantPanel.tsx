import React, { useState, useEffect } from 'react'
import { Send, Sparkles, Bot, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export default function AssistantPanel() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! I am NEXUS Intelligence.' }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, userId: 'demo-user' })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please ensure the NEXUS server is running." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-nexus-600" />
        <h3 className="text-sm font-semibold">NEXUS Intelligence</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] p-3 rounded-2xl text-sm", msg.role === 'user' ? "bg-nexus-600 text-white" : "bg-slate-100 text-slate-800")}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-nexus-600 mx-auto" />}
      </div>
      <div className="p-4 border-t border-slate-200">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." className="w-full bg-slate-50 border rounded-xl px-4 py-2 text-sm outline-none" />
      </div>
    </div>
  )
}

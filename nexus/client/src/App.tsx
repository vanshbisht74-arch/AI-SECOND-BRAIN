import React from 'react'
import Landing from './pages/Landing'
import DashboardLayout from './components/layout/DashboardLayout'
import { CommandPalette } from './components/CommandPalette'
import StudyHub from './pages/StudyHub'
import CodingHub from './pages/CodingHub'
import Productivity from './pages/Productivity'
import KnowledgeGraph from './components/KnowledgeGraph'
import NoteEditor from './components/editor/NoteEditor'
import AssistantPanel from './components/ai/AssistantPanel'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [view, setView] = React.useState('dashboard')

  if (!isLoggedIn) {
    return (
      <div onClick={() => setIsLoggedIn(true)}>
        <Landing />
      </div>
    )
  }

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-nexus-600 to-indigo-700 text-white shadow-xl">
                <h2 className="text-3xl font-bold mb-2">Good morning, Alex.</h2>
                <p className="text-nexus-100 opacity-90">You have 4 tasks to complete today and a study session at 2 PM.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div onClick={() => setView('notes')} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:border-nexus-300 transition-colors">
                  <h3 className="font-semibold mb-4">Recent Notes</h3>
                  <div className="space-y-3">
                    {['Quantum Computing', 'React Hooks', 'Deep Learning'].map((title, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors">
                        <span className="text-sm font-medium">{title}</span>
                        <span className="text-xs text-slate-400">{i + 1}h ago</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div onClick={() => setView('productivity')} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:border-nexus-300 transition-colors">
                  <h3 className="font-semibold mb-4">Upcoming Tasks</h3>
                   <div className="space-y-3">
                    {['Nexus Docs', 'Prisma Schema', 'AI Testing'].map((task, i) => (
                      <div key={i} className="flex items-center space-x-3 p-2">
                        <div className="w-4 h-4 rounded border border-slate-300 dark:border-slate-700" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-6 h-full">
               <AssistantPanel />
            </div>
          </div>
        )
      case 'notes':
        return (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Research on Quantum Computing</h2>
                <div className="flex space-x-2">
                   <button onClick={() => setView('dashboard')} className="text-sm text-slate-500 hover:text-nexus-600">Back to Dashboard</button>
                </div>
             </div>
             <NoteEditor />
          </div>
        )
      case 'graph':
        return <KnowledgeGraph />
      case 'study':
        return <StudyHub />
      case 'coding':
        return <CodingHub />
      case 'productivity':
        return <Productivity />
      default:
        return <div>View not found</div>
    }
  }

  return (
    <>
      <CommandPalette />
      <DashboardLayout setView={setView} currentView={view}>
        {renderView()}
      </DashboardLayout>
    </>
  )
}

export default App

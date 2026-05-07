import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Code2, Play, Save } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function CodingHub() {
  const [code, setCode] = useState('console.log("Nexus Coding Hub");')
  return (
    <div className="h-full flex flex-col space-y-6">
      <h2 className="text-3xl font-bold">Coding Workspace</h2>
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-[500px]">
        <div className="col-span-8 flex flex-col space-y-4">
          <Card className="flex-1 overflow-hidden">
            <Editor height="100%" language="javascript" theme="vs-dark" value={code} onChange={(val) => setCode(val || '')} />
          </Card>
        </div>
        <div className="col-span-4"><Card className="p-6"><h3 className="font-semibold">Snippet Library</h3></Card></div>
      </div>
    </div>
  )
}

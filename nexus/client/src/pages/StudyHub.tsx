import React, { useState } from 'react'
import { BookOpen, Brain, Clock, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { motion } from 'framer-motion'

export default function StudyHub() {
  const [isFlipped, setIsFlipped] = useState(false)
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Study Operating System</h2>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <Card className="h-64 flex items-center justify-center p-12 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <h3 className="text-2xl font-semibold">{isFlipped ? "A JavaScript library for building user interfaces." : "What is React?"}</h3>
          </Card>
        </div>
        <div className="col-span-4">
          <Card className="p-6"><h4 className="font-semibold">Recent Sessions</h4></Card>
        </div>
      </div>
    </div>
  )
}

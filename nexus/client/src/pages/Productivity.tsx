import React, { useState } from 'react'
import { CheckCircle2, Circle, Plus, Flame } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function Productivity() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Productivity Engine</h2>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <Card className="p-4"><h3 className="font-bold">Active Tasks</h3></Card>
        </div>
        <div className="col-span-4">
          <Card className="p-6"><h3 className="font-semibold">Habit Tracking</h3></Card>
        </div>
      </div>
    </div>
  )
}

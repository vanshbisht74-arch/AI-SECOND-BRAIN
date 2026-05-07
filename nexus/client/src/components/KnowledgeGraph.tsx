import React, { useMemo } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { Card } from './ui/Card'
import { Brain, Maximize2, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from './ui/Button'

export default function KnowledgeGraph() {
  // Mock data for the graph
  const data = useMemo(() => {
    const nodes = [
      { id: 'nexus', name: 'Nexus Core', group: 1, val: 20 },
      { id: 'react', name: 'React', group: 2, val: 12 },
      { id: 'ts', name: 'TypeScript', group: 2, val: 10 },
      { id: 'ai', name: 'AI Engineering', group: 3, val: 15 },
      { id: 'prisma', name: 'Prisma ORM', group: 4, val: 8 },
      { id: 'ux', name: 'Product Design', group: 5, val: 10 },
      { id: 'memory', name: 'Memory Systems', group: 3, val: 12 },
    ]

    const links = [
      { source: 'nexus', target: 'react' },
      { source: 'nexus', target: 'ts' },
      { source: 'nexus', target: 'ai' },
      { source: 'nexus', target: 'ux' },
      { source: 'react', target: 'ts' },
      { source: 'ai', target: 'memory' },
      { source: 'nexus', target: 'prisma' },
      { source: 'ts', target: 'prisma' },
    ]

    return { nodes, links }
  }, [])

  return (
    <Card className="w-full h-[600px] relative overflow-hidden bg-slate-950 border-slate-800">
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center space-x-2 text-white mb-2">
            <Brain className="w-5 h-5 text-nexus-500" />
            <h3 className="font-bold text-lg">Neural Knowledge Graph</h3>
        </div>
        <p className="text-slate-500 text-xs">Visualizing connections between 247 notes & memories</p>
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col space-y-2">
        <Button variant="secondary" size="sm" className="bg-slate-900/50 border-slate-700 text-white p-2">
            <Maximize2 className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" className="bg-slate-900/50 border-slate-700 text-white p-2">
            <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" className="bg-slate-900/50 border-slate-700 text-white p-2">
            <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-6 left-6 z-10">
        <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-nexus-500" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Core Concept</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Note</span>
            </div>
             <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Memory</span>
            </div>
        </div>
      </div>

      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        backgroundColor="#0A0A0B"
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions as [number, number]);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions as [number, number]);
        }}
      />
    </Card>
  )
}

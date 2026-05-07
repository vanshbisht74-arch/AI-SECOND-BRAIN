import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { ArrowRight, Brain, Zap, Shield, Sparkles } from 'lucide-react'

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-nexus-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-nexus-600 transition-colors">Features</a>
            <a href="#vision" className="hover:text-nexus-600 transition-colors">Vision</a>
            <Button variant="secondary" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nexus-50 dark:bg-nexus-900/30 border border-nexus-100 dark:border-nexus-800 text-nexus-700 dark:text-nexus-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>The next generation of personal intelligence</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Your mind, <br /> augmented.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            NEXUS is the ultimate digital second brain. Organize your knowledge, remember everything, and think faster with a personal operating system designed for the human mind.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full group">
              Start Building Your Brain
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full">
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

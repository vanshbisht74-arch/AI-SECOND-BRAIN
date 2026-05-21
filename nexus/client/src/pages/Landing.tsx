import { motion, Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { ArrowRight, Brain, Zap, Shield, Sparkles, Command, MousePointer2, Layers } from 'lucide-react'

export default function Landing() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-hidden selection:bg-nexus-200 dark:selection:bg-nexus-800">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-nexus-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200/40 dark:border-white/5 bg-white/70 dark:bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-nexus-600 rounded-xl flex items-center justify-center shadow-lg shadow-nexus-500/20">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-wide">
            <a href="#features" className="text-slate-500 hover:text-nexus-600 transition-colors">Features</a>
            <a href="#vision" className="text-slate-500 hover:text-nexus-600 transition-colors">Vision</a>
            <a href="#pricing" className="text-slate-500 hover:text-nexus-600 transition-colors">Pricing</a>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
            <Button variant="ghost" size="sm" className="text-slate-500">Sign In</Button>
            <Button size="sm" className="rounded-full px-5 shadow-sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-nexus-700 dark:text-nexus-300 text-[13px] font-semibold mb-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The next generation of personal intelligence</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[56px] md:text-[94px] leading-[1.05] font-bold tracking-[-0.03em] mb-8 text-slate-900 dark:text-white">
            Your mind, <br className="hidden md:block" /> <span className="text-slate-400 dark:text-slate-500">augmented.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[19px] md:text-[22px] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
            NEXUS is the ultimate digital second brain. Organize knowledge, remember everything, and think faster with a personal operating system built for you.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full group bg-slate-900 dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Start Building Your Brain
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
              Watch the Film
            </Button>
          </motion.div>

          {/* Floating UI Preview */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_100px_-20px_rgba(255,255,255,0.05)] border border-slate-200 dark:border-white/10 aspect-[16/9] bg-white dark:bg-slate-900"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-nexus-50/50 to-indigo-50/50 dark:from-nexus-900/10 dark:to-indigo-900/10 flex items-center justify-center">
                <div className="grid grid-cols-12 gap-4 w-full h-full p-6">
                   <div className="col-span-3 space-y-3">
                      {[1,2,3,4].map(i => <div key={i} className="h-10 rounded-lg bg-slate-100 dark:bg-white/5 animate-pulse" />)}
                   </div>
                   <div className="col-span-6 space-y-4">
                      <div className="h-64 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm p-6 text-left">
                         <div className="w-2/3 h-6 bg-slate-100 dark:bg-white/10 rounded mb-4" />
                         <div className="w-full h-4 bg-slate-50 dark:bg-white/5 rounded mb-2" />
                         <div className="w-full h-4 bg-slate-50 dark:bg-white/5 rounded mb-2" />
                         <div className="w-4/5 h-4 bg-slate-50 dark:bg-white/5 rounded" />
                      </div>
                   </div>
                   <div className="col-span-3 space-y-3">
                      <div className="h-40 rounded-2xl bg-nexus-600/5 border border-nexus-100 dark:border-nexus-900/50" />
                      <div className="h-20 rounded-2xl bg-slate-100 dark:bg-white/5" />
                   </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-200 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Command className="w-6 h-6" />, title: "Instant Access", desc: "Global command palette to find anything in milliseconds. Built for speed." },
            { icon: <Brain className="w-6 h-6" />, title: "Deep Context", desc: "An AI that actually knows you. Your notes, your files, your thoughts." },
            { icon: <MousePointer2 className="w-6 h-6" />, title: "Fluid Interface", desc: "Designed for focus. No clutter, just the features you need when you need them." }
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 hover:border-nexus-300 dark:hover:border-nexus-800 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-nexus-50 dark:bg-nexus-900/30 flex items-center justify-center text-nexus-600 dark:text-nexus-400 mb-6">
                {f.icon}
              </div>
              <h3 className="text-[19px] font-bold mb-3">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

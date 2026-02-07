"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/unimatch/Quiz";
import { SwipeDeck } from "@/components/unimatch/SwipeDeck";
import { HowItWorksModal } from "@/components/unimatch/HowItWorksModal";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Plane, RotateCcw, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UniMatchPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'deck'>('intro');
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Instant scroll reset when entering the deck view
  useEffect(() => {
    if (step === 'deck') {
      window.scrollTo(0, 0);
    }
  }, [step]);

  const handleQuizComplete = (answers: Record<string, string | string[]>) => {
    setFilters(answers);
    setStep('deck');
  };

  return (
    <div className="min-h-[100dvh] bg-[#182335] flex flex-col items-center p-3 md:p-4 pb-8 md:pb-24 relative overflow-hidden font-sans selection:bg-[#BF402A]/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#56719012_1px,transparent_1px),linear-gradient(to_bottom,#56719012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182335]/95 via-[#182335]/90 to-[#182335]"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2C5C44]/20 rounded-full blur-[100px] animate-blob will-change-transform transform-gpu"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BF402A]/20 rounded-full blur-[100px] animate-blob animation-delay-2000 will-change-transform transform-gpu"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-[#567190]/10 rounded-full blur-[80px] animate-blob animation-delay-4000 will-change-transform transform-gpu"></div>
      </div>

      <div className="w-full max-w-5xl z-10 relative flex flex-col min-h-full justify-center py-4 md:py-6">
        
        {/* --- Header Section (Adaptive Single Component) --- */}
        <motion.header 
          layout
          initial={false}
          className={cn(
            "relative z-50 shrink-0 transition-all duration-500 ease-in-out",
            step !== 'intro' 
              ? "w-full max-w-[98%] md:max-w-[95%] mx-auto px-5 md:px-6 lg:px-8 py-2 md:py-3 mb-4 md:mb-6 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" 
              : "w-full text-center mb-6 md:mb-8 flex flex-col items-center pt-4 md:pt-6"
          )}
        >
            {/* Content Wrapper - Adapts Layout */}
            <motion.div 
              layout
              className={cn(
                "relative z-10 flex items-center transition-all duration-500", 
                step !== 'intro' ? "w-full justify-between gap-3 md:gap-6" : "flex-col gap-2"
              )}
            >
              {/* Title */}
              <motion.h1 
                layout
                whileHover={{ scale: step === 'intro' ? 1.02 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('intro')}
                className={cn(
                  "font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-white/20 drop-shadow-2xl cursor-pointer flex-shrink min-w-0 transition-all duration-500 py-3 md:py-4 px-1",
                  step === 'intro' 
                    ? "text-5xl md:text-8xl text-center hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" 
                    : "text-lg xs:text-xl md:text-3xl lg:text-5xl leading-[1.1] max-w-[180px] xs:max-w-[240px] md:max-w-none break-words"
                )}
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}
              >
                Match Universitário
              </motion.h1>
              
              {/* Logo Group */}
              <motion.div 
                layout
                className={cn(
                  "flex transition-all duration-500 flex-shrink-0", 
                  step !== 'intro' 
                    ? "flex-col items-center xs:flex-row xs:items-center gap-1 xs:gap-2.5 md:gap-4" 
                    : "flex-col items-center mt-4 gap-2 md:gap-3"
                )}
              >
                <motion.span 
                  layout
                  className={cn(
                    "font-medium text-white tracking-[0.1em] md:tracking-[0.2em] uppercase select-none whitespace-nowrap opacity-40 transition-all duration-500",
                    step !== 'intro' ? "text-[8px] md:text-[10px]" : "text-[10px] md:text-xs"
                  )}
                >
                  Um projeto de
                </motion.span>
                
                <Link href="/">
                  <motion.div
                    layout
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl shadow-2xl transition-all cursor-pointer group",
                      step !== 'intro' ? "px-1.5 py-1 md:px-3 md:py-1.5" : "px-2 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3"
                    )}
                  >
                    <div className={cn("relative transition-all duration-500", step !== 'intro' ? "w-20 h-4 xs:w-24 xs:h-5 md:w-28 md:h-5 lg:w-32 lg:h-6" : "w-40 h-8 md:w-48 md:h-10")}>
                      <Image 
                        src="/LOGO HORIZONTAL BRANCO - ACDY.svg" 
                        alt="AcademItaly Logo" 
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

           {/* Intro Extra Content (Description) */}
           <AnimatePresence>
             {step === 'intro' && (
               <motion.div
                 initial={{ opacity: 0, y: -20, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: "auto" }}
                 exit={{ opacity: 0, y: -20, height: 0 }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 className="mt-6 md:mt-8 px-4 relative z-10 overflow-visible"
               >
                 <div className="relative group">
                    <div className="absolute inset-0 bg-[#2C5C44]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <p className="relative text-[#567190] font-sans text-[10px] md:text-base tracking-[0.2em] md:tracking-[0.4em] uppercase font-light bg-gradient-to-r from-transparent via-white/5 to-transparent px-4 md:px-12 py-2 md:py-3 border-y border-white/10 backdrop-blur-sm">
                      As Universidades Estatais Italianas
                    </p>
                    
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-[#2C5C44] rounded-full shadow-[0_0_10px_#2C5C44] animate-pulse" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 bg-[#2C5C44] rounded-full shadow-[0_0_10px_#2C5C44] animate-pulse" />
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.header>

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col justify-center px-2 md:px-0">
          <AnimatePresence mode="wait">
            
            {/* === STEP 1: INTRO === */}
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-4xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  
                  {/* Left: Text & CTA */}
                  <div className="space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1 px-4 md:px-0">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C5C44]/20 border border-[#2C5C44]/40 text-[#2C5C44] text-xs md:text-sm font-medium">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#2C5C44]" />
                        <span className="text-white/90">Nova Versão 2026</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Encontre o seu <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF402A] to-[#F4A261]">Match Acadêmico</span>
                      </h2>
                      <p className="text-base md:text-lg text-[#567190] leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                        São apenas <strong>3 perguntas</strong>! Descubra e escolha as suas universidades estatais favoritas.
                      </p>
                    </div>

                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-start items-center">
                        <Button 
                          size="lg" 
                          onClick={() => setStep('quiz')}
                          className="group relative overflow-hidden bg-white text-[#182335] hover:text-white font-black rounded-2xl text-xl md:text-3xl h-20 md:h-32 px-10 md:px-24 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(191,64,42,0.5)] transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95 w-full sm:w-auto border-none animate-pulse-subtle"
                        >
                          {/* Hover Gradient Layer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#BF402A] via-[#A63725] to-[#8C2E1F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <span className="relative z-10 flex flex-row md:flex-col items-center justify-center gap-2 leading-none">
                            <span className="tracking-tight">Começar</span>
                            <span className="flex items-center gap-2 md:gap-3">
                              Agora <Plane className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500" />
                            </span>
                          </span>
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer z-20" />
                        </Button>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="ghost" 
                            onClick={() => setShowHowItWorks(true)}
                            className="text-[#567190] hover:text-white hover:bg-white/5 h-12 md:h-16 px-6 rounded-2xl text-base md:text-lg font-medium transition-colors"
                          >
                            Como funciona?
                          </Button>
                        </motion.div>
                      </div>
                    
                    {/* Trust Indicators */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-center md:justify-start gap-4 md:gap-6 text-xs md:text-sm text-[#567190]">
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2C5C44] animate-pulse"/> 100% Gratuito</span>
                      <span className="opacity-30">•</span>
                      <span>60+ Universidades Estatais</span>
                    </div>
                  </div>

                  {/* Right: Visual Card - iPhone Mockup */}
                  <div className="order-1 md:order-2 perspective-1000 flex justify-center md:justify-end pr-4">
                    <motion.div 
                      animate={{ 
                        y: [0, -10, 2, -5, 0],
                        rotateY: [-5, 5, -2, 8, -5],
                        rotateX: [4, -4, 2, -1, 4]
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative group"
                    >
                      {/* iPhone Chassis - Realistic Metallic Frame */}
                      <div className="relative w-[200px] md:w-[240px] aspect-[9/19.5] bg-black rounded-[3rem] border-[6px] md:border-[7px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/20 ring-inset">
                        
                        {/* Side Buttons - Physical Protrusions */}
                        <div className="absolute -left-[8.5px] top-24 w-[3px] h-10 bg-slate-800 rounded-l-md border-r border-white/10" />
                        <div className="absolute -left-[8.5px] top-40 w-[3px] h-14 bg-slate-800 rounded-l-md border-r border-white/10" />
                        <div className="absolute -left-[8.5px] top-58 w-[3px] h-14 bg-slate-800 rounded-l-md border-r border-white/10" />
                        <div className="absolute -right-[8.5px] top-44 w-[3px] h-20 bg-slate-800 rounded-r-md border-l border-white/10" />

                        {/* Internal Screen Area - Realistic Glass Bezel */}
                        <div className="relative w-full h-full p-[3px] bg-black rounded-[2.6rem] overflow-hidden">
                          <div className="relative w-full h-full bg-[#182335] rounded-[2.2rem] overflow-hidden flex flex-col p-2.5">
                          
                          {/* Dynamic Island - Scaled */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 md:w-20 h-5 md:h-6 bg-black rounded-full z-50 flex items-center justify-center border border-white/5 shadow-inner">
                            <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-500/10" />
                          </div>

                          {/* App Header Sketch - Floating Pill Style */}
                          <div className="mt-8 mb-4 px-2">
                            <div className="w-full h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-between px-3 opacity-60">
                              <div className="h-1.5 w-16 bg-white/40 rounded-full" /> {/* Title placeholder */}
                              <div className="flex flex-col items-center gap-0.5">
                                <div className="h-[3px] w-6 bg-white/20 rounded-full" /> {/* "Um projeto de" */}
                                <div className="h-2 w-8 bg-white/10 rounded-sm" /> {/* Logo placeholder */}
                              </div>
                            </div>
                          </div>

                          {/* Simplified Card Stack Sketch */}
                          <div className="flex-1 relative mb-3 mx-1.5">
                            {/* Background Card 2 */}
                            <div className="absolute inset-x-2 top-4 bottom-0 bg-white/5 rounded-[1.8rem] border border-white/5 scale-[0.9] opacity-20" />
                            {/* Background Card 1 */}
                            <div className="absolute inset-x-1 top-2 bottom-0 bg-white/5 rounded-[1.8rem] border border-white/10 scale-[0.95] opacity-40" />
                            
                            {/* Active Card Sketch */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#BF402A]/40 via-[#182335] to-[#182335] rounded-[1.8rem] border border-white/20 p-4 flex flex-col shadow-2xl overflow-hidden">
                              {/* Card Header */}
                              <div className="flex justify-between items-start gap-2 mb-4">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-2.5 h-2.5 text-[#F4A261]" />
                                    <div className="h-1 w-10 bg-white/40 rounded-full" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="h-2.5 w-full bg-white rounded-full opacity-90" />
                                    <div className="h-2.5 w-[60%] bg-white rounded-full opacity-90" />
                                  </div>
                                </div>
                                
                                {/* Disciplines Grid Sketch - Tinted Categories */}
                                <div className="w-9 h-9 rounded-xl bg-white/10 grid grid-cols-2 gap-1 p-1 flex-shrink-0">
                                  <div className="bg-pink-500/30 rounded-sm" />
                                  <div className="bg-orange-500/30 rounded-sm" />
                                  <div className="bg-emerald-500/30 rounded-sm" />
                                  <div className="bg-cyan-500/30 rounded-sm" />
                                </div>
                              </div>

                              {/* Card Body (Description Lines) */}
                              <div className="flex-1 flex gap-2 pt-2">
                                <div className="w-[2px] h-full bg-white/20 rounded-full" />
                                <div className="flex-1 space-y-2">
                                  {[1,2,3,4,5,6,7].map(i => (
                                    <div key={i} style={{ width: `${Math.max(30, 100 - i * 10 + (i % 2 * 15))}%` }} className="h-1 bg-white/15 rounded-full" />
                                  ))}
                                </div>
                              </div>
                              
                              {/* Bottom Gradient Fade */}
                              <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#182335] to-transparent" />
                            </div>
                          </div>

                          {/* Control Buttons Row Sketch */}
                          <div className="pb-4 flex items-center justify-center gap-4">
                            {/* Undo */}
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 hover:bg-white/10 transition-colors">
                              <RotateCcw className="w-3.5 h-3.5 text-white" />
                            </div>
                            {/* Nope */}
                            <div className="w-12 h-12 rounded-full bg-red-500/5 border-2 border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/5">
                              <X className="w-6 h-6 text-red-500/50 stroke-[2.5]" />
                            </div>
                            {/* Like */}
                            <div className="w-12 h-12 rounded-full bg-green-500/5 border-2 border-green-500/20 flex items-center justify-center shadow-lg shadow-green-500/5">
                              <GraduationCap className="w-6 h-6 text-green-500/50" />
                            </div>
                          </div>

                          {/* Shimmer / Glass Reflection */}
                          <motion.div 
                            animate={{ 
                              x: ["-100%", "200%"],
                              opacity: [0, 0.1, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none z-40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating Parallax Icons - Smaller & Closer */}
                    <motion.div 
                      animate={{ 
                        y: [0, -8, 2, -4, 0],
                        rotate: [12, 18, 10, 15, 12]
                      }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transform: "translateZ(60px)" }}
                      className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-[#2C5C44] to-[#1E3E2F] rounded-2xl flex items-center justify-center shadow-2xl z-50 border border-white/20"
                    >
                      <GraduationCap className="text-white w-7 h-7 stroke-[2.5]" />
                    </motion.div>
                    
                    <motion.div 
                      animate={{ 
                        y: [0, 8, -2, 4, 0],
                        rotate: [-6, -12, -4, -10, -6]
                      }}
                      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transform: "translateZ(80px)" }}
                      className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#BF402A] to-[#8C2E1F] rounded-xl flex items-center justify-center shadow-2xl z-50 border border-white/20"
                    >
                      <X className="text-white w-6 h-6 stroke-[3]" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

            {/* === STEP 2: QUIZ === */}
            {step === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
              >
                <Quiz 
                  onComplete={handleQuizComplete} 
                  onBack={() => setStep('intro')} 
                  initialData={filters.userName ? {
                    name: filters.userName as string,
                    surname: filters.userSurname as string,
                    privacy: true
                  } : undefined}
                />
              </motion.div>
            )}

            {/* === STEP 3: DECK === */}
            {step === 'deck' && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <SwipeDeck filters={filters} onRestart={() => setStep('quiz')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <HowItWorksModal 
        isOpen={showHowItWorks} 
        onClose={() => setShowHowItWorks(false)} 
        onStartQuiz={() => {
          setShowHowItWorks(false);
          setStep('quiz');
        }}
      />
    </div>
  );
}
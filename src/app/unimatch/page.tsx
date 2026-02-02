"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/unimatch/Quiz";
import { SwipeDeck } from "@/components/unimatch/SwipeDeck";
import { HowItWorksModal } from "@/components/unimatch/HowItWorksModal";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Plane, Sparkles, X } from "lucide-react";
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
    <div className="min-h-[100dvh] bg-[#182335] flex flex-col items-center p-3 md:p-4 relative overflow-hidden font-sans selection:bg-[#BF402A]/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#56719012_1px,transparent_1px),linear-gradient(to_bottom,#56719012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182335]/95 via-[#182335]/90 to-[#182335]"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2C5C44]/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BF402A]/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-[#567190]/10 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl z-10 relative flex flex-col min-h-full justify-center py-4 md:py-6">
        
        {/* --- Header Section (Adaptive Single Component) --- */}
        <motion.header 
          layout
          initial={false}
          className={cn(
            "relative z-50 shrink-0 transition-all duration-500 ease-in-out",
            step !== 'intro' 
              ? "w-full max-w-[98%] md:max-w-[95%] mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 mb-6 md:mb-12 rounded-[2rem] md:rounded-full overflow-hidden" 
              : "w-full text-center mb-8 md:mb-12 flex flex-col items-center pt-8 md:pt-12"
          )}
        >
            {/* Glass Background - Fades in ONLY for compact mode */}
            <motion.div 
              className="absolute inset-0 z-0 bg-[#182335]/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: step !== 'intro' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: step !== 'intro' ? 0.3 : 0 }}
            />

            {/* Content Wrapper - Adapts Layout */}
            <motion.div 
              layout
              className={cn(
                "relative z-10 flex items-center transition-all duration-500", 
                step !== 'intro' ? "w-full justify-between gap-2 md:gap-3 lg:gap-4" : "flex-col gap-2"
              )}
            >
              {/* Title */}
              <motion.h1 
                layout
                whileHover={{ scale: step === 'intro' ? 1.02 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('intro')}
                className={cn(
                  "font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-white/20 drop-shadow-2xl cursor-pointer flex-shrink min-w-0 transition-all duration-500",
                  step === 'intro' 
                    ? "text-5xl md:text-8xl p-2 text-center hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" 
                    : "text-base md:text-3xl lg:text-5xl leading-[1.1] max-w-[140px] md:max-w-none break-words"
                )}
                style={{ WebkitTextStroke: step !== 'intro' ? '1px rgba(255,255,255,0.7)' : '1.5px rgba(255,255,255,0.7)' }}
              >
                Match Universitário
              </motion.h1>
              
              {/* Logo Group */}
              <motion.div 
                layout
                className={cn(
                  "flex items-center transition-all duration-500 flex-shrink-0", 
                  step !== 'intro' ? "flex-row gap-2 md:gap-3 lg:gap-4" : "flex-col mt-4 gap-2 md:gap-3"
                )}
              >
                <motion.span 
                  layout
                  className={cn(
                    "font-medium text-white tracking-[0.2em] md:tracking-[0.3em] uppercase select-none whitespace-nowrap opacity-40 transition-all duration-500",
                    step !== 'intro' ? "text-[7px] md:text-[9px] lg:text-[10px]" : "text-[10px] md:text-xs"
                  )}
                >
                  Um projeto de
                </motion.span>
                
                <Link href="/">
                  <motion.div
                    layout
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 shadow-2xl transition-all cursor-pointer group"
                  >
                    <div className={cn("relative transition-all duration-500", step !== 'intro' ? "w-16 h-3.5 md:w-32 md:h-6 lg:w-40 lg:h-8" : "w-40 h-8 md:w-48 md:h-10")}>
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

                  {/* Right: Visual Card */}
                  <div className="order-1 md:order-2 perspective-1000 flex justify-center md:justify-end pr-4">
                    <motion.div 
                      animate={{ 
                        y: [0, -25, 5, -15, 0],
                        rotateY: [-10, 8, -5, 12, -10],
                        rotateX: [8, -10, 6, -4, 8]
                      }}
                      transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative w-full max-w-[280px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]"
                    >
                      {/* Floating Icons - Deconstructed with Parallax */}
                      <motion.div 
                        animate={{ 
                          y: [0, -15, 5, -10, 0],
                          rotate: [12, 25, 10, 20, 12]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: "translateZ(60px)" }}
                        className="absolute -top-6 -right-6 w-18 h-18 bg-gradient-to-br from-[#2C5C44] to-[#1E3E2F] rounded-2xl flex items-center justify-center shadow-2xl z-20 border border-white/20"
                      >
                        <GraduationCap className="text-white w-9 h-9 stroke-[3]" />
                      </motion.div>
                      
                      <motion.div 
                        animate={{ 
                          y: [0, 15, -5, 10, 0],
                          rotate: [-6, -18, -4, -12, -6]
                        }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: "translateZ(100px)" }}
                        className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#BF402A] to-[#8C2E1F] rounded-xl flex items-center justify-center shadow-2xl z-30 border border-white/20"
                      >
                        <X className="text-white w-8 h-8 stroke-[3]" />
                      </motion.div>

                      {/* Content Preview */}
                      <div className="space-y-3" style={{ transform: "translateZ(25px)" }}>
                        <div className="h-32 rounded-xl bg-gradient-to-br from-[#182335]/50 to-[#567190]/50 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529260830199-42c42dda5f2d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:scale-110 transition-transform duration-1000"></div>
                           <div className="absolute inset-0 bg-[#182335]/30"></div>
                           <span className="relative z-10 font-black text-2xl text-white tracking-widest drop-shadow-lg">ITALIA</span>
                        </div>
                        
                        {/* Updated Info Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square rounded-xl bg-white/5 border border-white/10 p-2 flex flex-col justify-between hover:bg-white/10 transition-colors">
                            <MapPin className="text-[#567190] w-4 h-4" />
                            <div className="space-y-1">
                              <div className="h-1 w-8 bg-white/40 rounded-full"></div>
                              <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                          <div className="aspect-square rounded-xl bg-white/5 border border-white/10 p-2 flex flex-col justify-between hover:bg-white/10 transition-colors">
                            <div className="flex -space-x-1">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-4 h-4 rounded-full bg-white/20 border border-white/20" />
                              ))}
                            </div>
                            <div className="h-1 w-8 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Shiny MATCH! Button - Independent Layer */}
                      <div className="h-10 mt-3 rounded-xl bg-gradient-to-r from-[#2C5C44] to-[#3D7A5C] flex items-center justify-center relative overflow-hidden group/btn cursor-pointer shadow-lg shadow-[#2C5C44]/20 z-20 hover:scale-[1.02] transition-transform" style={{ transform: "translateZ(35px)" }}>
                          <span className="text-[10px] font-black text-white tracking-[0.3em] z-10">MATCH!</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                      </div>
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

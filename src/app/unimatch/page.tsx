"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/unimatch/Quiz";
import { SwipeDeck } from "@/components/unimatch/SwipeDeck";
import { HowItWorksModal } from "@/components/unimatch/HowItWorksModal";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Heart, Plane, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UniMatchPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'deck'>('intro');
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleQuizComplete = (answers: Record<string, string | string[]>) => {
    setFilters(answers);
    setStep('deck');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center p-4 relative overflow-hidden font-sans selection:bg-green-500/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-[#0F172A]/90 to-[#0F172A]"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl z-10 relative flex flex-col min-h-screen pt-12 pb-20">
        
        {/* --- Header Section --- */}
        <header className={cn(
          "transition-all duration-500 ease-in-out relative z-50",
          step !== 'intro' 
            ? "w-full max-w-[95%] mx-auto px-8 py-4 mb-10 rounded-full border border-white/10 bg-[#0F172A]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]" 
            : "text-center mb-12 flex flex-col items-center gap-2"
        )}>
            {/* Title & Logo Wrapper */}
            <div className={cn(
                "flex items-center transition-all duration-500", 
                step !== 'intro' ? "w-full justify-start gap-8" : "flex-col"
            )}>
              {/* Main Glass Title */}
              <motion.h1 
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  "font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-white/20 drop-shadow-2xl transition-all duration-500 relative z-10 cursor-default",
                  step !== 'intro' ? "text-3xl md:text-5xl pr-2 pb-1" : "text-6xl md:text-8xl p-2 text-center"
                )}
                style={{ WebkitTextStroke: step !== 'intro' ? '1px rgba(255,255,255,0.7)' : '1.5px rgba(255,255,255,0.7)' }}
              >
                Match Universitário
              </motion.h1>
              
              {/* Logo Attribution */}
              <div className={cn("flex items-center gap-3 transition-all duration-500", step !== 'intro' ? "flex-row mt-1" : "flex-col mt-2")}>
                <motion.span 
                  initial={false}
                  animate={{ opacity: 0.4 }}
                  className="text-[10px] md:text-xs font-medium text-white tracking-[0.3em] uppercase select-none whitespace-nowrap"
                >
                  Um projeto de
                </motion.span>
                <Link href="/">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 md:px-6 md:py-3 shadow-2xl transition-all cursor-pointer group"
                  >
                    <div className={cn("relative transition-all duration-500", step !== 'intro' ? "w-32 h-6 md:w-40 md:h-8" : "w-40 h-8 md:w-48 md:h-10")}>
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
              </div>
            </div>
           
           <AnimatePresence>
             {step === 'intro' && (
               <motion.div
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="mt-8"
               >
                 <div className="relative group">
                    {/* Decorative Blur Background */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <p className="relative text-blue-100/90 font-sans text-sm md:text-base tracking-[0.4em] uppercase font-light bg-gradient-to-r from-transparent via-white/5 to-transparent px-12 py-3 border-y border-white/10 backdrop-blur-sm">
                      As Universidades Estatais Italianas
                    </p>
                    
                    {/* Glow Points */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-pulse" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-pulse" />
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </header>

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* === STEP 1: INTRO === */}
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  
                  {/* Left: Text & CTA */}
                  <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Nova Versão 2026</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Encontre o seu <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Match Acadêmico</span>
                      </h2>
                      <p className="text-lg text-blue-100/70 leading-relaxed max-w-md mx-auto md:mx-0">
                        São apenas <strong>3 perguntas</strong>! Descubra e escolha as suas universidades estatais favoritas. O UniMatch analisa todas as opções para você encontrar o seu lugar perfeito.
                      </p>
                    </div>

                      <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                        <Button 
                          size="lg" 
                          onClick={() => setStep('quiz')}
                          className="group relative overflow-hidden bg-white text-blue-950 hover:text-white font-black rounded-2xl text-2xl md:text-3xl h-28 md:h-32 px-16 md:px-24 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)] transition-all duration-500 hover:-translate-y-2 active:scale-95 w-full sm:w-auto border-none animate-pulse-subtle"
                        >
                          {/* Hover Gradient Layer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <span className="relative z-10 flex flex-col items-center justify-center gap-1 md:gap-2 leading-none">
                            <span className="tracking-tight">Começar</span>
                            <span className="flex items-center gap-3">
                              Agora <Plane className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500" />
                            </span>
                          </span>
                          
                          {/* Shimmer Effect - More intense and persistent */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer z-20" />
                          
                          {/* Permanent Glow Background */}
                          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/0 transition-colors duration-500" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowHowItWorks(true)}
                          className="text-blue-300 hover:text-white hover:bg-white/5 h-16 px-6 rounded-2xl text-lg font-medium transition-colors"
                        >
                          Como funciona?
                        </Button>
                      </div>
                    
                    {/* Trust Indicators */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-center md:justify-start gap-6 text-sm text-blue-200/50">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/> 100% Gratuito</span>
                      <span>•</span>
                      <span>Todas as 69 universidades estatais</span>
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
                      className="relative w-full max-w-[280px] bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]"
                    >
                      {/* Floating Icons - Deconstructed with Parallax */}
                      <motion.div 
                        animate={{ 
                          y: [0, -15, 5, -10, 0],
                          rotate: [12, 25, 10, 20, 12]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: "translateZ(60px)" }}
                        className="absolute -top-6 -right-6 w-18 h-18 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl z-20 border border-white/20"
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
                        className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-rose-400 to-red-600 rounded-xl flex items-center justify-center shadow-2xl z-30 border border-white/20"
                      >
                        <X className="text-white w-8 h-8 stroke-[3]" />
                      </motion.div>

                      {/* Content Preview */}
                      <div className="space-y-3" style={{ transform: "translateZ(25px)" }}>
                        <div className="h-32 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529260830199-42c42dda5f2d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:scale-110 transition-transform duration-1000"></div>
                           <div className="absolute inset-0 bg-black/20"></div>
                           <span className="relative z-10 font-black text-2xl text-white tracking-widest drop-shadow-lg">ITALIA</span>
                        </div>
                        
                        {/* Updated Info Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square rounded-xl bg-white/5 border border-white/10 p-2 flex flex-col justify-between hover:bg-white/10 transition-colors">
                            <MapPin className="text-blue-300 w-4 h-4" />
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
                      <div className="h-10 mt-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden group/btn cursor-pointer shadow-lg shadow-blue-500/20 z-20 hover:scale-[1.02] transition-transform" style={{ transform: "translateZ(35px)" }}>
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
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
              >
                <Quiz onComplete={handleQuizComplete} />
              </motion.div>
            )}

            {/* === STEP 3: DECK === */}
            {step === 'deck' && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="h-[600px] w-full"
              >
                <SwipeDeck filters={filters} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Link */}
        <AnimatePresence>
          {step !== 'intro' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <button 
                onClick={() => setStep('intro')}
                className="text-sm text-blue-300 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                ← Voltar para o início
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/unimatch/Quiz";
import { SwipeDeck } from "@/components/unimatch/SwipeDeck";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Heart, Plane, Sparkles } from "lucide-react";

export default function UniMatchPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'deck'>('intro');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleQuizComplete = (answers: Record<string, string>) => {
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
        <header className="text-center mb-12 relative">
           <Link href="/" className="inline-block group">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-black drop-shadow-2xl cursor-pointer inline-flex items-center gap-3 text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-400 group-hover:bg-gradient-to-l transition-all duration-500">
                  UniMatch Italia
                </span>
                <span className="filter drop-shadow-lg transform group-hover:rotate-12 transition-transform duration-300">🇮🇹</span>
              </h1>
            </motion.div>
           </Link>
           
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
           >
             <p className="text-blue-200/80 mt-3 font-hand text-2xl md:text-3xl rotate-[-2deg] origin-center inline-block bg-white/5 px-4 py-1 rounded-lg backdrop-blur-sm border border-white/5">
               ✨ O &quot;Tinder&quot; das Universidades Italianas ✨
             </p>
           </motion.div>
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
                        Não sabe qual cidade ou universidade escolher? Responda 3 perguntas rápidas e descubra o destino ideal para o seu intercâmbio.
                      </p>
                    </div>

                      <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                        <Button 
                          size="lg" 
                          onClick={() => setStep('quiz')}
                          className="group relative overflow-hidden bg-white text-blue-900 hover:text-white font-black rounded-2xl text-2xl md:text-3xl h-28 md:h-32 px-16 md:px-24 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-500 hover:-translate-y-2 active:scale-95 w-full sm:w-auto border-none"
                        >
                          {/* Hover Gradient Layer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <span className="relative z-10 flex flex-col items-center justify-center gap-1 md:gap-2 leading-none">
                            <span className="tracking-tight">Começar</span>
                            <span className="flex items-center gap-3">
                              Agora <Plane className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                            </span>
                          </span>
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer z-20" />
                        </Button>
                        
                        <Button variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/5 h-16 px-6 rounded-2xl text-lg font-medium transition-colors">
                          Como funciona?
                        </Button>
                      </div>
                    
                    {/* Trust Indicators */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-center md:justify-start gap-6 text-sm text-blue-200/50">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/> 100% Gratuito</span>
                      <span>•</span>
                      <span>+50 Universidades</span>
                    </div>
                  </div>

                  {/* Right: Visual Card */}
                  <div className="order-1 md:order-2 perspective-1000">
                    <motion.div 
                      animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                    >
                      {/* Floating Icons */}
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                        <GraduationCap className="text-white w-8 h-8" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <Heart className="text-white w-6 h-6" />
                      </div>

                      {/* Content Preview */}
                      <div className="space-y-4">
                        <div className="h-40 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529260830199-42c42dda5f2d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
                           <div className="absolute inset-0 bg-black/20"></div>
                           <span className="relative z-10 font-black text-3xl text-white tracking-widest drop-shadow-lg">ITALIA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-24 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col justify-between">
                            <MapPin className="text-blue-400 w-5 h-5" />
                            <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                          </div>
                          <div className="h-24 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col justify-between">
                            <div className="flex -space-x-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/10" />
                              ))}
                            </div>
                            <div className="h-2 w-10 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
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
    </div>
  );
}

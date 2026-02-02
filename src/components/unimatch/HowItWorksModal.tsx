"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Sparkles, Send, Plane, Lightbulb, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

export function HowItWorksModal({ isOpen, onClose, onStartQuiz }: HowItWorksModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      icon: <ClipboardList className="w-5 h-5 text-white" />,
      title: "Responda ao Quiz",
      description: "3 perguntas rápidas para definirmos seu perfil.",
      gradient: "from-[#FFD054] to-[#E59936]", // Gold/Orange
      shadow: "shadow-[#FFD054]/20"
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      title: "Dê seus Matches",
      description: "Deslize para a direita nas universidades que curtir.",
      gradient: "from-[#2C5C44] to-[#1E3E2F]", // Green
      shadow: "shadow-[#2C5C44]/20"
    },
    {
      icon: <Send className="w-5 h-5 text-white" />,
      title: "Receba sua Lista",
      description: "Compartilhe seus matches e inicie sua jornada!",
      gradient: "from-[#182335] to-[#0F1621]", // Navy
      shadow: "shadow-[#182335]/20"
    }
  ];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-xl transition-all"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative pt-6 pb-2 px-6 text-center shrink-0">
               <div className="absolute top-4 right-4">
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>
               </div>
               
               <motion.div 
                 initial={{ y: -10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3"
               >
                 <Sparkles className="w-3 h-3 text-[#FFD054]" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Match Universitário</span>
               </motion.div>

               <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-none tracking-tight mb-1.5">
                 Como funciona?
               </h2>
               <p className="text-[#94A3B8] font-medium text-xs md:text-sm max-w-[260px] mx-auto leading-relaxed">
                 Encontrar sua universidade ideal na Itália nunca foi tão divertido.
               </p>
            </div>

            {/* Content - Steps */}
            <div className="flex-1 overflow-y-auto px-5 py-2 space-y-2.5 custom-scrollbar">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br shrink-0 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                    step.gradient, step.shadow
                  )}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white leading-none mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-medium leading-snug">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Tip Box */}
               <motion.div 
                 className="mt-2 bg-gradient-to-r from-[#FFD054]/10 to-[#FFD054]/5 border border-[#FFD054]/20 rounded-xl p-3 flex gap-3 items-start"
               >
                 <Lightbulb className="w-4 h-4 text-[#FFD054] shrink-0 mt-0.5" />
                 <p className="text-[11px] text-[#FFD054]/90 font-medium leading-relaxed">
                   <strong className="text-[#FFD054]">Dica de Ouro:</strong> Mente aberta! O match perfeito pode estar numa cidade que você ainda não conhece.
                 </p>
               </motion.div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-3 bg-transparent shrink-0 z-10">
                <Button 
                  onClick={onStartQuiz}
                  className="group relative overflow-hidden w-full h-16 rounded-2xl bg-white text-[#182335] hover:text-white font-black text-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(191,64,42,0.5)] transition-all duration-500 hover:-translate-y-1 active:scale-95 border-none"
                >
                  {/* Hover Gradient Layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BF402A] via-[#A63725] to-[#8C2E1F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2 leading-none">
                    PARTIU, ITÁLIA! 
                    <Plane className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </span>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer z-20" />
                </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

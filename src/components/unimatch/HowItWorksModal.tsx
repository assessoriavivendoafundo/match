"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Heart, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

export function HowItWorksModal({ isOpen, onClose, onStartQuiz }: HowItWorksModalProps) {
  const steps = [
    {
      icon: <GraduationCap className="w-6 h-6 text-yellow-400" />,
      title: "Responda ao Quiz",
      description: "Responda a 3 perguntas rápidas sobre seu estilo, orçamento e preferências. É o nosso jeito de te conhecer melhor!",
      color: "bg-yellow-500/20 border-yellow-500/30"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: "Descubra seus Matches",
      description: "Nossa tecnologia analisa seu perfil e apresenta as universidades italianas que mais combinam com você. Deslize para a direita se curtir!",
      color: "bg-red-500/20 border-red-500/30"
    },
    {
      icon: <Send className="w-6 h-6 text-blue-400" />,
      title: "Exporte e Envie",
      description: "Ao final, você pode salvar sua lista de desejos e enviá-la diretamente para a equipe da Vivendo a Fundo iniciar seu planejamento.",
      color: "bg-blue-500/20 border-blue-500/30"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: "-45%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-45%", x: "-50%" }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed z-[70] w-full max-w-lg bg-[#0F172A]/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            style={{ 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)"
            }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10 bg-white/5">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Como funciona
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">Simples & Rápido</span>
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-4 p-4 rounded-xl border ${step.color} backdrop-blur-md`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center shadow-inner">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-blue-100/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <Button 
                  onClick={onStartQuiz}
                  className="group relative overflow-hidden w-full h-14 rounded-2xl bg-white text-blue-900 hover:text-white font-black text-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-500 hover:-translate-y-1 active:scale-95 border-none"
                >
                  {/* Hover Gradient Layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10">
                    Entendi, vamos lá!
                  </span>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer z-20" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

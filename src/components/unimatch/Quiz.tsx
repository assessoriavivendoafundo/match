"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

type Question = {
  id: string;
  question: string;
  description?: string;
  options: {
    id: string;
    label: string;
    subLabel?: string;
    icon?: string;
  }[];
};

const questions: Question[] = [
  {
    id: "area",
    question: "Qual é a sua vibe?",
    description: "Para te mostrarmos as universidades que brilham na sua área.",
    options: [
      { id: "creative", label: "Criatividade & Design", subLabel: "Moda, Artes, Arquitetura", icon: "🎨" },
      { id: "tech", label: "Tech & Exatas", subLabel: "Engenharia, TI, Economia", icon: "💻" },
      { id: "health", label: "Saúde & Biológicas", subLabel: "Medicina, Psicologia, Biologia", icon: "🧬" },
    ],
  },
  {
    id: "budget",
    question: "Como estamos de Grana?",
    description: "Custo de vida mensal estimado (Aluguel + Mercado + Lazer).",
    options: [
      { id: "low", label: "Econômico", subLabel: "Até €800/mês (Vida de estudante raiz)", icon: "🎒" },
      { id: "medium", label: "Confortável", subLabel: "€800 - €1200/mês (Equilíbrio perfeito)", icon: "⚖️" },
      { id: "high", label: "Sem Limites", subLabel: "Acima de €1200/mês (Dolce Vita)", icon: "🥂" },
    ],
  },
  {
    id: "region",
    question: "Onde você se imagina?",
    description: "Cada região tem um estilo de vida único!",
    options: [
      { id: "north", label: "Norte", subLabel: "Milão, Turim • Business, Frio & Agito", icon: "🏔️" },
      { id: "center", label: "Centro", subLabel: "Roma, Florença • História, Arte & Clássicos", icon: "🏛️" },
      { id: "south", label: "Sul", subLabel: "Nápoles, Bari • Praias, Calor & Gastronomia", icon: "🍋" },
    ],
  },
];

export function Quiz({ onComplete }: { onComplete: (answers: Record<string, string>) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (optionId: string) => {
    const currentQuestion = questions[currentStep];
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);
    
    // Small delay to show selection before moving next
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 400);
  };

  const currentQ = questions[currentStep];

  return (
    <div className="w-full relative">
        <div className="mb-8">
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6 text-blue-200/60 text-sm font-medium tracking-wide uppercase">
                <span>Passo {currentStep + 1} de {questions.length}</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-yellow-400" /> Personalizando</span>
            </div>
            
            {/* Neon Progress Bar */}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
            >
                {/* Question Text */}
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                        {currentQ.question}
                    </h2>
                    {currentQ.description && (
                        <p className="text-lg text-blue-100/70 leading-relaxed border-l-2 border-purple-500/50 pl-4">
                            {currentQ.description}
                        </p>
                    )}
                </div>

                {/* Options Grid */}
                <div className="grid gap-4">
                    {currentQ.options.map((option) => (
                        <motion.button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "relative w-full text-left p-5 rounded-xl border transition-all duration-300 group overflow-hidden",
                                answers[currentQ.id] === option.id 
                                    ? "bg-white/10 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]" 
                                    : "bg-white/5 border-white/10 hover:border-white/20"
                            )}
                        >
                             {/* Selection Glow Background */}
                             {answers[currentQ.id] === option.id && (
                                <motion.div 
                                    layoutId="glow"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 z-0" 
                                />
                             )}

                            <div className="relative z-10 flex items-center gap-5">
                                {/* Icon Container */}
                                <div className={cn(
                                    "w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 shadow-inner",
                                    answers[currentQ.id] === option.id 
                                        ? "bg-gradient-to-br from-purple-500 to-blue-500 scale-110" 
                                        : "bg-white/5 border border-white/5 group-hover:scale-105"
                                )}>
                                    {option.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className={cn(
                                            "font-bold text-lg transition-colors",
                                            answers[currentQ.id] === option.id ? "text-white" : "text-white/90"
                                        )}>
                                            {option.label}
                                        </span>
                                        {answers[currentQ.id] === option.id && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <Check className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </div>
                                    {option.subLabel && (
                                        <p className="text-sm text-blue-200/50 mt-1 font-medium tracking-wide">
                                            {option.subLabel}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Sparkles, User, ArrowRight, ShieldCheck } from "lucide-react";

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
    id: "region",
    question: "Onde começa a sua aventura? 🇮🇹",
    description: "Escolha o cenário do seu próximo capítulo. Não tem escolha errada, a Itália toda é um sonho!",
    options: [
      { id: "north", label: "Norte", subLabel: "Grandes centros, montanhas e qualidade de vida", icon: "🏔️" },
      { id: "center", label: "Centro", subLabel: "O coração da arte, história e tradição", icon: "🏛️" },
      { id: "south", label: "Sul e Ilhas", subLabel: "Clima acolhedor, mar e cultura vibrante", icon: "🍋" },
      { id: "any", label: "Todas as regiões", subLabel: "Cada canto da Itália tem seu encanto especial", icon: "🇮🇹" },
    ],
  },
  {
    id: "citySize",
    question: "Metrópole ou cidade pequena? 🌆",
    description: "Do agito das metrópoles à paz dos burgos, onde você se vê morando?",
    options: [
      { id: "big", label: "Cidade Grande", subLabel: "Vida noturna, eventos e muita gente", icon: "🏙️" },
      { id: "small", label: "Média ou Pequena", subLabel: "Vida local, imersão cultural e tranquilidade", icon: "🏡" },
      { id: "any", label: "Tanto faz", subLabel: "O importante é viver a experiência", icon: "🌍" },
    ],
  },
  {
    id: "area",
    question: "Qual é a sua vocação? ✨",
    description: "Para te mostrarmos as universidades que brilham na sua área.",
    options: [
      { id: "humanities", label: "Artística, Literária e Educação", subLabel: "Design, História, Letras, Pedagogia...", icon: "🎨" },
      { id: "social", label: "Econômica, Jurídica e Social", subLabel: "Direito, Economia, Relações Internacionais...", icon: "📈" },
      { id: "health", label: "Saúde e Agro-Veterinária", subLabel: "Medicina, Psicologia, Veterinária...", icon: "🧬" },
      { id: "stem", label: "STEM", subLabel: "Ciência, Tecnologia, Engenharia e Matemática", icon: "🚀" },
      { id: "any", label: "Ainda não sei", subLabel: "Estou aberto a todas as possibilidades", icon: "💡" },
    ],
  },
];

export function Quiz({ onComplete }: { onComplete: (answers: Record<string, string | string[]>) => void }) {
  const [phase, setPhase] = useState<'details' | 'questions'>('details');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [userData, setUserData] = useState({ name: '', surname: '', privacy: false });

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.surname && userData.privacy) {
      setPhase('questions');
    }
  };

  const handleSelect = (optionId: string) => {
    const currentQuestion = questions[currentStep];
    const currentSelection = answers[currentQuestion.id] || [];
    const specificOptions = currentQuestion.options
        .filter(opt => opt.id !== "any")
        .map(opt => opt.id);

    let newSelection: string[];

    if (optionId === "any") {
      // Toggle "Any": If already selected (or partially selected), deselect all. 
      // If not selected, select ALL specific options + "any".
      // Wait, standard behavior for "Select All" button:
      // If "Any" is strictly in the list, clicking it removes everything.
      // If "Any" is NOT in the list, clicking it adds everything + "Any".
      
      const isAnySelected = currentSelection.includes("any");
      
      if (isAnySelected) {
          newSelection = [];
      } else {
          newSelection = [...specificOptions, "any"];
      }
    } else {
      // Specific Option Logic
      const isSelected = currentSelection.includes(optionId);
      let nextSpecifics: string[];

      if (isSelected) {
         // Remove option
         nextSpecifics = currentSelection.filter(id => id !== optionId && id !== "any");
      } else {
         // Add option
         // Filter out "any" first to be safe, then add new ID
         nextSpecifics = [...currentSelection.filter(id => id !== "any"), optionId];
      }

      // Check if ALL specific options are now selected
      const allSelected = specificOptions.every(id => nextSpecifics.includes(id));
      
      if (allSelected) {
          newSelection = [...nextSpecifics, "any"];
      } else {
          newSelection = nextSpecifics;
      }
    }

    setAnswers({ ...answers, [currentQuestion.id]: newSelection });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete({
        ...answers,
        userName: userData.name,
        userSurname: userData.surname
      });
    }
  };

  const currentQ = questions[currentStep];
  const currentSelection = answers[currentQ?.id] || [];
  const hasSelection = currentSelection.length > 0;

  return (
    <div className="w-full relative px-2">
        {phase === 'questions' && (
          <div className="mb-8">
              {/* Header / Progress */}
              <div className="flex items-center justify-between mb-6 text-blue-200/80 text-sm font-bold tracking-wide uppercase">
                  <span>Passo {currentStep + 1} de {questions.length}</span>
                  <span className="flex items-center gap-1 text-yellow-400 drop-shadow-sm"><Sparkles className="w-3 h-3" /> Personalizando...</span>
              </div>
              
              {/* Neon Progress Bar - Thicker and Glowier */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 shadow-inner">
                  <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
              </div>
          </div>
        )}

        <AnimatePresence mode="wait">
            {phase === 'details' ? (
              <motion.div
                key="details"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] drop-shadow-lg tracking-tight">
                        Quase lá! <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Como podemos te chamar?</span>
                    </h2>
                    <p className="text-lg text-blue-100/60 leading-relaxed font-medium">
                        Queremos tornar sua experiência personalizada e segura.
                    </p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-200/60 uppercase tracking-widest ml-1">Nome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40" />
                        <input 
                          type="text"
                          required
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-md"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-200/60 uppercase tracking-widest ml-1">Sobrenome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40" />
                        <input 
                          type="text"
                          required
                          value={userData.surname}
                          onChange={(e) => setUserData({...userData, surname: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-md"
                          placeholder="Seu sobrenome"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="relative flex items-center h-6">
                        <input
                          id="privacy"
                          name="privacy"
                          type="checkbox"
                          required
                          checked={userData.privacy}
                          onChange={(e) => setUserData({...userData, privacy: e.target.checked})}
                          className="h-5 w-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 cursor-pointer"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="privacy" className="font-medium text-blue-100/80 cursor-pointer">
                          Aceito o tratamento dos meus dados
                        </label>
                        <p className="text-blue-100/40">
                          Seus dados serão utilizados apenas para personalizar sua experiência de acordo com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong> brasileira. Não compartilhamos suas informações com terceiros.
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!userData.name || !userData.surname || !userData.privacy}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl",
                      userData.name && userData.surname && userData.privacy
                        ? "bg-white text-blue-950 shadow-white/10"
                        : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                    )}
                  >
                    <span>Continuar para o Quiz</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-xs text-blue-200/30 uppercase tracking-[0.2em] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    Ambiente Seguro & Privado
                  </div>
                </form>
              </motion.div>
            ) : (
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
                      <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] drop-shadow-lg tracking-tight">
                          {currentQ.question}
                      </h2>
                      {currentQ.description && (
                          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-medium">
                              {currentQ.description}
                          </p>
                      )}
                  </div>

                  {/* Options Grid */}
                  <div className="grid gap-3">
                      {currentQ.options.map((option) => {
                          const isSelected = currentSelection.includes(option.id);
                          const isAnyOption = option.id === "any";
                          const isAllSelected = currentSelection.includes("any");
                          
                          // Focus logic: 
                          // If all are selected, the "any" button is the main focus.
                          // Otherwise, specific buttons are the main focus.
                          const isFocused = isAnyOption ? isAllSelected : (isSelected && !isAllSelected);
                          const shouldShrink = isAllSelected && !isAnyOption;

                          return (
                            <motion.button
                                key={option.id}
                                layout
                                onClick={() => handleSelect(option.id)}
                                whileHover={{ scale: isFocused ? 1.02 : 1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={cn(
                                    "relative w-full text-left rounded-2xl border transition-all duration-500 group overflow-hidden backdrop-blur-md",
                                    // Sizing & Padding
                                    (isAnyOption && !isAllSelected) || shouldShrink ? "p-3 px-5" : "p-6",
                                    // Spacing
                                    isAnyOption && "mt-2",
                                    // Borders & Backgrounds
                                    isSelected
                                        ? "bg-white/15 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]" 
                                        : isAnyOption
                                            ? "border-dashed border-white/20 bg-white/5 hover:bg-white/10"
                                            : "bg-gradient-to-r from-white/10 to-transparent border-white/10 hover:border-white/30 hover:bg-white/10",
                                    // Evidence Logic
                                    !isFocused && isSelected && "opacity-60 scale-[0.98] grayscale-[0.3]"
                                )}
                            >
                                {/* Selection Glow Background */}
                                {isSelected && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={cn(
                                            "absolute inset-0 z-0 transition-opacity duration-500",
                                            isFocused ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 opacity-100" : "bg-white/5 opacity-50"
                                        )}
                                    />
                                )}

                                <div className="relative z-10 flex items-center gap-5">
                                    {/* Icon Container */}
                                    <motion.div 
                                        layout
                                        className={cn(
                                        "flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ring-1 ring-white/10",
                                        (isAnyOption && !isAllSelected) || shouldShrink ? "w-10 h-10 text-xl" : "w-14 h-14 text-3xl",
                                        isSelected
                                            ? "bg-gradient-to-br from-purple-500 to-blue-600 ring-offset-2 ring-offset-purple-500/30" 
                                            : "bg-white/10 group-hover:bg-white/20"
                                    )}>
                                        {option.icon}
                                    </motion.div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <motion.span 
                                                layout
                                                className={cn(
                                                "font-bold transition-all duration-500",
                                                (isAnyOption && !isAllSelected) || shouldShrink ? "text-base text-white/70" : "text-xl text-white/95",
                                                isSelected && "text-white"
                                            )}>
                                                {option.label}
                                            </motion.span>
                                            {isSelected && (
                                                <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}>
                                                    <div className={cn(
                                                        "rounded-full p-1 shadow-lg transition-all duration-500",
                                                        isFocused ? "bg-green-500 shadow-green-500/20" : "bg-white/20 shadow-none"
                                                    )}>
                                                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                        {option.subLabel && !shouldShrink && (
                                            <motion.p 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className={cn(
                                                "font-medium tracking-wide transition-all duration-500",
                                                isAnyOption ? "text-xs text-blue-200/40 mt-0.5" : "text-sm mt-1 text-blue-200/60",
                                                isSelected && "text-blue-100/80"
                                            )}>
                                                {option.subLabel}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            </motion.button>
                        );
                      })}
                  </div>

                  {/* Navigation Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                  >
                    <button
                        onClick={handleNext}
                        disabled={!hasSelection}
                        className={cn(
                            "w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl",
                            hasSelection
                                ? "bg-white text-blue-950 hover:scale-[1.02] shadow-white/20"
                                : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                        )}
                    >
                        <span>{currentStep < questions.length - 1 ? "Próximo Passo" : "Ver meus Matches!"}</span>
                        <ArrowRight className={cn("w-6 h-6", hasSelection && "animate-pulse")} />
                    </button>
                  </motion.div>
              </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}

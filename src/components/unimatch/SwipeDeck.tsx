"use client";

import { useState, useEffect, useRef, useMemo, MutableRefObject, memo } from "react";
import { motion, useMotionValue, useTransform, PanInfo, MotionValue, animate, AnimatePresence, motionValue, Variants, useMotionValueEvent, useIsPresent } from "framer-motion";
import { University, getUniversities } from "@/lib/data";
import { X, GraduationCap, RotateCcw, MapPin, Loader2, Share2, Mail, Palette, TrendingUp, Stethoscope, Atom } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NOPE_LABELS = ["nope"];
const LIKE_LABELS = ["match"];

const THEMES = [
    { gradient: "from-[#8C2E1F] to-[#E76F51]", highlight: "text-[#FDE68A]" }, // Warm Red -> Cream
    { gradient: "from-[#182335] to-[#567190]", highlight: "text-[#7DD3FC]" }, // Navy -> Sky Blue
    { gradient: "from-[#1E3E2F] to-[#52B788]", highlight: "text-[#A7F3D0]" }, // Forest -> Emerald
    { gradient: "from-[#182335] to-[#8C4A4A]", highlight: "text-[#FECACA]" }, // Navy -> Rose
    { gradient: "from-[#3E5C76] to-[#182335]", highlight: "text-[#BAE6FD]" }, // Steel -> Sky Blue
    { gradient: "from-[#BF402A] to-[#182335]", highlight: "text-[#FFEDD5]" }, // Red -> Light Orange
    { gradient: "from-[#182335] to-[#2A7F62]", highlight: "text-[#99F6E4]" }, // Navy -> Teal
];

const DIRECTIONS = [
    "bg-gradient-to-br", // Bottom Right
    "bg-gradient-to-bl", // Bottom Left
    "bg-gradient-to-tr", // Top Right
    "bg-gradient-to-tl", // Top Left
];

const NOPE_HOVER_STATE = {
    scale: 1.05,
    background: "linear-gradient(135deg, rgba(220, 38, 38, 0.4) 0%, rgba(185, 28, 28, 0.6) 100%)",
    color: "#ffffff",
    borderColor: "rgba(220, 38, 38, 0.8)"
};

const LIKE_HOVER_STATE = {
    scale: 1.05,
    background: "linear-gradient(135deg, rgba(22, 163, 74, 0.4) 0%, rgba(21, 128, 61, 0.6) 100%)",
    color: "#ffffff",
    borderColor: "rgba(22, 163, 74, 0.8)"
};

interface UniversityWithGradient extends University {
    gradient: string;
    highlight: string;
    isRestored?: boolean;
    exitDirection?: 'like' | 'nope';
}

export function SwipeDeck({ filters, onRestart }: { filters: Record<string, string | string[]>; onRestart: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [universities, setUniversities] = useState<UniversityWithGradient[]>([]);
  const [deck, setDeck] = useState<UniversityWithGradient[]>([]);
  const [history, setHistory] = useState<UniversityWithGradient[]>([]); // For Undo
  const [liked, setLiked] = useState<UniversityWithGradient[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSwipe, setLastSwipe] = useState<'like' | 'nope' | null>(null);
  
  // Ref to track exit directions reliably for animation variants
  const exitDirectionsRef = useRef<Record<string, 'like' | 'nope'>>({});
  const isUndoingRef = useRef(false);
  
  // Track each card's individual motion value to avoid sharing/snapping issues
  const cardMotionValues = useRef<Map<string, MotionValue<number>>>(new Map());

  const swipeRef = useRef<string | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const topCardIdRef = useRef<string | null>(null);
  
  // Keep ref in sync with state for use in callbacks
  useEffect(() => {
    topCardIdRef.current = deck[deck.length - 1]?.id || null;
  }, [deck]);

  const activeX = useMemo(() => motionValue(0), []);

  const updateGlobalX = (val: number, id: string) => {
    // Only update global UI feedback (backgrounds/buttons) if it's the current top card
    // Using a ref here is CRITICAL because exiting cards in AnimatePresence 
    // hold onto old closures of this function where they WERE the top card.
    if (id === topCardIdRef.current) {
        activeX.set(val);
    }
  };

  const registerCard = (id: string, mv: MotionValue<number>) => {
    cardMotionValues.current.set(id, mv);
  };

  const unregisterCard = (id: string) => {
    cardMotionValues.current.delete(id);
  };

  useEffect(() => {
      if (lastSwipe) {
          const timer = setTimeout(() => setLastSwipe(null), 700);
          return () => clearTimeout(timer);
      }
  }, [lastSwipe]);

  const nopeScale = useTransform(activeX, [-150, -70, 0], [1.2, 1.2, 1]);
  const likeScale = useTransform(activeX, [0, 70, 150], [1, 1.2, 1.2]);
  const nopeOpacity = useTransform(activeX, [0, 100], [1, 0.5]);
  const likeOpacity = useTransform(activeX, [-100, 0], [0.5, 1]);

  const nopeBg = useTransform(activeX, [-150, -70, 0], 
    ["linear-gradient(135deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%)",
     "linear-gradient(135deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%)", 
     "linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(153, 27, 27, 0.4) 100%)"]
  );

  const nopeColor = useTransform(activeX, [-150, -70, 0], ["#ffffff", "#ffffff", "#dc2626"]);
  const nopeBorder = useTransform(activeX, [-150, -70, 0], ["rgba(220, 38, 38, 1)", "rgba(220, 38, 38, 1)", "rgba(220, 38, 38, 0.6)"]);
  const nopeShadow = useTransform(activeX, [-150, -70, 0], ["0 0 30px rgba(220, 38, 38, 0.4)", "0 0 30px rgba(220, 38, 38, 0.4)", "0 0 0px rgba(220, 38, 38, 0)"]);
  const nopeIconRotate = useTransform(activeX, [-150, -70, 0], [-90, 0, 0]);

  const likeBg = useTransform(activeX, [0, 70, 150], 
    ["linear-gradient(135deg, rgba(22, 163, 74, 0.2) 0%, rgba(22, 101, 52, 0.4) 100%)", 
     "linear-gradient(135deg, rgba(22, 163, 74, 1) 0%, rgba(21, 128, 61, 1) 100%)",
     "linear-gradient(135deg, rgba(22, 163, 74, 1) 0%, rgba(21, 128, 61, 1) 100%)"]
  );

  const likeColor = useTransform(activeX, [0, 70, 150], ["#16a34a", "#ffffff", "#ffffff"]);
  const likeBorder = useTransform(activeX, [0, 70, 150], ["rgba(22, 163, 74, 0.6)", "rgba(22, 163, 74, 1)", "rgba(22, 163, 74, 1)"]);
  const likeShadow = useTransform(activeX, [0, 70, 150], ["0 0 0px rgba(34, 197, 94, 0)", "0 0 30px rgba(34, 197, 94, 0.4)", "0 0 30px rgba(34, 197, 94, 0.4)"]);
  const likeIconRotate = useTransform(activeX, [0, 70, 150], [0, 0, -12]);

  // Load and Filter Data
  useEffect(() => {
    async function loadData() {
      const data = await getUniversities();
      
      const filtered = data.filter(uni => {
        if (!uni.id) return false;
        const regionFilter = Array.isArray(filters.region) ? filters.region : (filters.region ? [filters.region] : []);
        if (regionFilter.length > 0 && !regionFilter.includes('any')) {
            if (!regionFilter.includes(uni.region)) return false;
        }
        const areaFilter = Array.isArray(filters.area) ? filters.area : (filters.area ? [filters.area] : []);
        if (areaFilter.length > 0 && !areaFilter.includes('any')) {
           const matchesArea = areaFilter.some(area => {
               if (area === 'humanities') return uni.humanities;
               if (area === 'social') return uni.social;
               if (area === 'health') return uni.health;
               if (area === 'stem') return uni.stem;
               return false;
           });
           if (!matchesArea) return false;
        }
        const citySizeFilter = Array.isArray(filters.citySize) ? filters.citySize : (filters.citySize ? [filters.citySize] : []);
        if (citySizeFilter.length > 0 && !citySizeFilter.includes('any')) {
            const matchesSize = citySizeFilter.some(size => {
                if (size === 'big') return uni.is_big_city;
                if (size === 'small') return !uni.is_big_city;
                return false;
            });
            if (!matchesSize) return false;
        }
        return true;
      })
      .sort(() => Math.random() - 0.5)
      .map((uni, index) => {
          const theme = THEMES[index % THEMES.length];
          return {
            ...uni,
            gradient: `${DIRECTIONS[index % DIRECTIONS.length]} ${theme.gradient}`,
            highlight: theme.highlight
          };
      });

      setUniversities(filtered);
      setDeck(filtered);
      exitDirectionsRef.current = {};
      activeX.set(0); // Reset UI
      setLoading(false);
    }
    loadData();
  }, [filters, activeX]);

  const removeCard = (id: string, action: 'like' | 'nope') => {
    if (swipeRef.current === id) return;
    const currentCard = deck[deck.length - 1];
    if (!currentCard || currentCard.id !== id) return;
    swipeRef.current = id;
    setLastSwipe(action);
    
    // Update ref immediately for reliable exit animation
    exitDirectionsRef.current[id] = action;
    
    setDeck((current) => current.slice(0, -1));
    activeX.set(0); // Reset UI for the next card immediately

    if (action === 'like') {
      setLiked(prev => {
        if (prev.some(u => u.id === id)) return prev;
        return [...prev, currentCard];
      });
    }
    // Store direction in history for robust undo
    setHistory(prev => [...prev, { ...currentCard, exitDirection: action }]);
  };

  const handleChoice = (action: 'like' | 'nope') => {
    if (loading || deck.length === 0) return;
    const topCard = deck[deck.length - 1];
    const mv = cardMotionValues.current.get(topCard.id);
    
    if (mv) {
        // Animate the SPECIFIC card's motion value
        animate(mv, action === 'like' ? 160 : -160, {
          type: "spring",
          stiffness: 200,
          damping: 25,
          onComplete: () => {
            activeX.set(0); 
            removeCard(topCard.id, action);
          }
        });
    } else {
        // Fallback if MV not registered
        removeCard(topCard.id, action);
    }
  };

  const undoSwipe = () => {
    if (history.length === 0 || isUndoingRef.current) return;
    
    isUndoingRef.current = true;
    // Lock for slightly less than animation duration to allow fluid but safe rapid clicks
    setTimeout(() => { isUndoingRef.current = false; }, 350);

    const lastCard = history[history.length - 1];
    if (swipeRef.current === lastCard.id) {
        swipeRef.current = null;
    }
    setHistory(prev => prev.slice(0, -1));
    if (liked.find(u => u.id === lastCard.id)) {
        setLiked(prev => prev.filter(u => u.id !== lastCard.id));
    }
    
    // Restore exit direction to ref in case it was lost (e.g. filter change)
    if (lastCard.exitDirection) {
        exitDirectionsRef.current[lastCard.id] = lastCard.exitDirection;
    }

    setDeck(prev => [...prev, { ...lastCard, isRestored: true }]);
    activeX.set(0);
  };

  const shareOnWhatsApp = () => {
    if (liked.length === 0) return;
    const uName = filters.userName as string;
    const uSurname = filters.userSurname as string;
    const fullName = uName && uSurname ? `${uName} ${uSurname}` : uName || "Estudante";
    const firstName = uName || "Estudante";
    const header = `🇮🇹 *Match Universitário - ${fullName}* 🇮🇹\n\nCiao! Me chamo ${firstName}, explorei as opções e estas são as universidades que deram match comigo. *Gostaria de receber more informações sobre elas e como começar meu processo:*\n\n`;
    const list = liked.map(u => `🏛️ *${u.name}*\n   📍 ${u.city}\n`).join("\n");
    const footer = "\n💬 *Você pode me ajudar com mais detalhes sobre essas opções?*\n🔗 Descubra seu match em: https://vivendoafundo.com.br";
    const text = encodeURIComponent(header + list + footer);
    window.open(`https://api.whatsapp.com/send?phone=393516274752&text=${text}`, '_blank');
  };

  const shareOnEmail = () => {
    if (liked.length === 0) return;
    const uName = filters.userName as string;
    const uSurname = filters.userSurname as string;
    const fullName = uName && uSurname ? `${uName} ${uSurname}` : uName || "Estudante";
    const firstName = uName || "Estudante";
    const subject = `Meu Match Universitário - ${fullName}`;
    const header = `Ciao! Me chamo ${firstName}, explorei as opções e estas são as universidades que deram match comigo.\n\nGostaria de receber more informações sobre elas e como começar meu processo:\n\n`;
    const list = liked.map(u => `🏛️ ${u.name}\n   📍 ${u.city}\n`).join("\n");
    const footer = "\n\nVocê pode me ajudar com mais detalhes sobre essas opções?\n\n🔗 Descubra seu match em: https://vivendoafundo.com.br";
    const body = encodeURIComponent(header + list + footer);
    window.open(`mailto:assessoria@vivendoafundo.com.br?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
  };

  if (loading) {
     return (
        <div ref={deckRef} className="flex flex-col items-center justify-center h-[50dvh] text-white">
           <div className="relative">
             <div className="absolute inset-0 bg-[#BF402A] blur-xl opacity-20 animate-pulse"></div>
             <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin mb-4 relative z-10 text-[#BF402A]" />
           </div>
           <p className="font-medium text-lg md:text-xl text-[#567190] animate-pulse">Preparando as malas...</p>
        </div>
     )
  }

  if (deck.length === 0) {
      return (
          <div ref={deckRef} className="flex flex-col h-auto max-h-[85dvh] w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative mb-8 md:mb-12">
              
              {liked.length > 0 ? (
                <>
                    {/* Header */}
                    <div className="p-4 md:p-6 pb-4 text-center border-b border-white/10 bg-white/5">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#2C5C44] to-[#1E3E2F] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg shadow-[#2C5C44]/20 ring-2 md:ring-4 ring-white/10">
                            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                        </div>
                        <h2 className="text-xl md:text-4xl font-black text-white mb-0.5">
                          Lista dos Sonhos {filters.userName ? `de ${filters.userName}` : ''}
                        </h2>
                        <p className="text-white/40 text-xs md:text-base">Você deu match com {liked.length} universidade{liked.length !== 1 && 's'}!</p>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 custom-scrollbar">
                        {liked.map(uni => (
                            <motion.div 
                                key={uni.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-2xl overflow-hidden group border border-white/10"
                            >
                                <div className={cn("absolute inset-0 opacity-15 transition-opacity group-hover:opacity-25", uni.gradient)} />
                                <div className={cn("relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl shadow-lg flex items-center justify-center text-xl md:text-2xl flex-shrink-0", uni.gradient)}>
                                    🏛️
                                </div>
                                <div className="relative z-10 flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-sm md:text-lg mb-0.5 truncate">{uni.name}</h4>
                                    <p className="text-white/40 flex items-center gap-1 text-[10px] md:text-sm"><MapPin className="w-3 h-3 md:w-3.5 md:h-3.5"/> {uni.city}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 space-y-2 md:space-y-3">
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={shareOnWhatsApp}
                                className="w-full h-12 md:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl text-sm md:text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 border border-transparent transition-all uppercase tracking-wider"
                            >
                                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                                WhatsApp
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={shareOnEmail}
                                className="w-full h-12 md:h-14 bg-[#182335] hover:bg-[#1d2b41] border border-white/10 text-white font-black rounded-xl text-sm md:text-lg flex items-center justify-center gap-2 shadow-lg transition-all uppercase tracking-wider"
                            >
                                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                E-mail
                            </motion.button>
                        </div>
                        <Button 
                            variant="ghost" 
                            onClick={onRestart} 
                            className="w-full text-white/60 hover:text-white hover:bg-white/10 h-12 md:h-14 rounded-xl text-sm md:text-lg font-semibold border border-white/5 transition-all group"
                        >
                            <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-[-120deg] transition-transform duration-500" /> Recomeçar
                        </Button>
                    </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 md:p-12 text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 md:mb-8 ring-1 ring-white/10">
                        <RotateCcw className="w-8 h-8 md:w-10 md:h-10 text-white/50" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Nenhum Match? 😢</h2>
                    <p className="text-white/40 mb-6 md:mb-8 text-sm md:text-lg leading-relaxed max-w-md">
                        Você passou por todas as opções e não curtiu nenhuma. Tente filtros diferentes!
                    </p>
                    <Button 
                        onClick={onRestart} 
                        className="group relative bg-white text-[#182335] hover:scale-105 font-bold px-8 md:px-10 py-5 md:py-7 rounded-xl md:rounded-2xl text-lg md:text-xl shadow-xl transition-all overflow-hidden"
                    >
                        Tentar Novamente
                    </Button>
                </div>
              )}
          </div>
      )
  }

  return (
    <div ref={deckRef} className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto h-[75dvh] md:h-[78vh] flex flex-col items-center justify-center px-1 md:px-0">
      
      {/* Card Stack */}
      <div className="relative w-full h-[62dvh] md:h-[68vh] perspective-1000 mb-10 md:mb-14">
        <AnimatePresence initial={false}>
          {deck.slice(-3).map((uni, index, arr) => (
            <Card 
              key={uni.id} 
              data={uni} 
              active={index === arr.length - 1}
              removeCard={removeCard}
              index={index}
              exitDirectionsRef={exitDirectionsRef}
              registerCard={registerCard}
              unregisterCard={unregisterCard}
              onSwipeUpdate={updateGlobalX}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 md:gap-8 z-20 mb-4 md:mb-12">
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#567190] hover:bg-white hover:text-[#182335] transition-all shadow-xl disabled:opacity-20 relative overflow-hidden group")}
            onClick={undoSwipe}
            disabled={history.length === 0}
        >
            <RotateCcw className="w-5 h-5 md:w-7 md:h-7 relative z-10 group-hover:rotate-[-120deg] transition-transform duration-500" />
        </motion.button>
        
        <motion.button 
            style={{ scale: nopeScale, opacity: nopeOpacity, background: nopeBg, color: nopeColor, borderColor: nopeBorder, boxShadow: nopeShadow }}
            whileHover={NOPE_HOVER_STATE}
            whileTap={{ scale: 0.95 }}
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-2xl border-2 shadow-xl relative overflow-hidden group")}
            onClick={() => handleChoice('nope')}
        >
            <motion.div style={{ rotate: nopeIconRotate }} className="relative z-10">
                <X className="w-8 h-8 md:w-10 md:h-10 stroke-[3]" />
            </motion.div>
        </motion.button>

        <motion.button 
            style={{ scale: likeScale, opacity: likeOpacity, background: likeBg, color: likeColor, borderColor: likeBorder, boxShadow: likeShadow }}
            whileHover={LIKE_HOVER_STATE}
            whileTap={{ scale: 0.95 }}
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-2xl border-2 shadow-xl relative overflow-hidden group")}
            onClick={() => handleChoice('like')}
        >
            <motion.div style={{ rotate: likeIconRotate }} className="relative z-10">
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10 stroke-[3]" />
            </motion.div>
        </motion.button>
      </div>
    </div>
  );
}



// Pseudo-random number generator based on string seed
function pseudoRandom(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return (Math.abs(hash) % 1000) / 1000;
}

// Disciplines Grid Component
const DisciplinesGrid = memo(function DisciplinesGrid({ data }: { data: University }) {
    return (
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2.5 grid grid-cols-2 gap-2.5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] ring-1 ring-white/20">
            {/* Top Left: Humanities */}
            <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500", 
                data.humanities 
                    ? "bg-pink-500/40 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-400/30" 
                    : "bg-black/20 text-white/10"
            )}>
                <Palette className={cn("w-5 h-5", data.humanities && "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
            </div>
            
            {/* Top Right: Social */}
            <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500", 
                data.social 
                    ? "bg-orange-500/40 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-orange-400/30" 
                    : "bg-black/20 text-white/10"
            )}>
                <TrendingUp className={cn("w-5 h-5", data.social && "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
            </div>

            {/* Bottom Left: Health */}
            <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500", 
                data.health 
                    ? "bg-emerald-500/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400/30" 
                    : "bg-black/20 text-white/10"
            )}>
                <Stethoscope className={cn("w-5 h-5", data.health && "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
            </div>

            {/* Bottom Right: STEM */}
            <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500", 
                data.stem 
                    ? "bg-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/30" 
                    : "bg-black/20 text-white/10"
            )}>
                <Atom className={cn("w-5 h-5", data.stem && "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
            </div>
        </div>
    );
});

// Single Card Component - FULL SIZE
function Card({ data, active, removeCard, index, exitDirectionsRef, registerCard, unregisterCard, onSwipeUpdate }: { 
    data: UniversityWithGradient; 
    active: boolean; 
    removeCard: (id: string, action: 'like' | 'nope') => void;
    index: number;
    exitDirectionsRef: MutableRefObject<Record<string, 'like' | 'nope'>>;
    registerCard: (id: string, mv: MotionValue<number>) => void;
    unregisterCard: (id: string) => void;
    onSwipeUpdate: (val: number, id: string) => void;
}) {
    const x = useMotionValue(0);
    const isPresent = useIsPresent();
    const [labelsVisible, setLabelsVisible] = useState(!data.isRestored);
    // Ref to block global x updates during the initial enter animation
    const isEnteringRef = useRef(data.isRestored);

    useEffect(() => {
        registerCard(data.id, x);
        return () => unregisterCard(data.id);
    }, [data.id, registerCard, unregisterCard, x]);

    useMotionValueEvent(x, "change", (latest) => {
        // Only update global UI if active AND not currently flying in from Undo
        if (active && !isEnteringRef.current) {
            onSwipeUpdate(latest, data.id);
        }
    });
    
    const rotate = useTransform(x, [-200, 200], [-18, 18]); 
    const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0, 1, 1, 1, 0]); 
    const likeOpacity = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

    const randomVal = useMemo(() => pseudoRandom(data.id), [data.id]);
    const randomRotate = (randomVal * 6) - 3; 
    const randomExitX = randomVal > 0.5 ? 1000 : -1000; 
    const randomExitRotate = randomVal > 0.5 ? 45 : -45; 

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (!active) return;
        if (info.offset.x > 100) removeCard(data.id, 'like');
        else if (info.offset.x < -100) removeCard(data.id, 'nope');
    };

    const variants: Variants = {
        active: {
            x: 0, y: 0, rotate: 0, scale: 1, opacity: 1,
            transition: { type: "spring", stiffness: 200, damping: 25 } 
        },
        inactive: {
            scale: 0.95, y: 30, opacity: 1, x: 0, rotate: randomRotate,
            transition: { duration: 0.3, ease: "easeOut" } // Added transition for inactive state
        },
        enter: (customRef: MutableRefObject<Record<string, 'like' | 'nope'>>) => {
            const dir = customRef.current[data.id] || 'nope';
            return {
                x: dir === 'like' ? 1000 : -1000,
                rotate: dir === 'like' ? 45 : -45,
                opacity: 1
            };
        },
        exit: (customRef: MutableRefObject<Record<string, 'like' | 'nope'>>) => {
            // If the card is NOT active (i.e. it's at the bottom of the stack and falling out of the slice window),
            // it should just fade out instantly in place.
            if (!active) return { x: 0, y: 0, opacity: 0, transition: { duration: 0 } };

            const dir = customRef.current[data.id];
            const xVal = x.get();
            let tx = randomExitX, tr = randomExitRotate;
            
            if (xVal > 50 || dir === 'like') { tx = 1000; tr = 45; }
            else if (xVal < -50 || dir === 'nope') { tx = -1000; tr = -45; }
            
            return {
                x: tx, rotate: tr, opacity: 0,
                transition: { duration: 0.4, ease: "easeIn" }
            };
        }
    };

    // Fix: Only exiting ACTIVE cards should be on top. 
    // Exiting background cards (slice shift) should stay behind.
    // We boost the exiting active card to 200 to ensure it stays strictly above the new active card (which will be 100).
    const finalZIndex = (!isPresent && active) ? 200 : (active ? 100 : index);

    return (
        <motion.div
            style={{ 
                x, 
                rotate: active ? rotate : undefined,
                zIndex: finalZIndex,
                opacity,
            }}
            initial={data.isRestored ? "enter" : false}
            custom={exitDirectionsRef}
            variants={variants}
            animate={active ? "active" : "inactive"}
            exit="exit"
            drag={active ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onAnimationComplete={(definition) => {
                if (definition === "active") {
                    isEnteringRef.current = false;
                    if (!labelsVisible) setLabelsVisible(true);
                }
            }}
            className={cn(
                "absolute top-0 left-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/20 select-none will-change-transform",
                !active && "pointer-events-none"
            )}
        >
            {active && labelsVisible && (
                <>
                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-12 left-8 z-30 pointer-events-none origin-center">
                         <div className="border-[6px] border-green-500/50 text-green-600 rounded-3xl px-8 py-4 -rotate-12 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition-transform">
                             <span className="font-black text-6xl md:text-7xl tracking-tighter uppercase drop-shadow-sm">{LIKE_LABELS[0]}</span>
                         </div>
                    </motion.div>
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-12 right-8 z-30 pointer-events-none origin-center">
                         <div className="border-[6px] border-red-500/50 text-red-600 rounded-3xl px-8 py-4 rotate-12 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition-transform">
                             <span className="font-black text-6xl md:text-7xl tracking-tighter uppercase drop-shadow-sm">{NOPE_LABELS[0]}</span>
                         </div>
                    </motion.div>
                </>
            )}

            <div className={cn("h-full w-full relative flex flex-col p-8", data.gradient)}>
                <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-black/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-between items-start z-20 mb-6 flex-shrink-0">
                    <div className="flex-1 pr-6">
                        <div className="flex items-center gap-2 text-white/90 mb-3 uppercase tracking-wider font-semibold text-xs drop-shadow-sm">
                            <MapPin className={cn("w-3 h-3", data.highlight)} />
                            <span>{data.city} • {data.region === 'north' ? 'Norte' : data.region === 'center' ? 'Centro' : 'Sul'}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.05] drop-shadow-md">{data.name}</h2>
                    </div>
                    <div className="flex-shrink-0 pt-1"><DisciplinesGrid data={data} /></div>
                </div>

                <div className="flex-1 min-h-0 z-10 relative">
                    <div className="h-full pl-4 border-l-2 border-white/20 overflow-y-auto custom-scrollbar pr-2" onPointerDown={(e) => e.stopPropagation()}>
                         <p className="text-white text-lg md:text-xl leading-relaxed font-medium pb-4 drop-shadow-sm">
                            {data.description.split(/(Curiosidade:?)/g).map((part, i) => {
                                if (part.match(/Curiosidade:?/)) {
                                    return <span key={i}><br/><br/><strong className={cn("font-black tracking-wide", data.highlight)}>{part}</strong></span>;
                                }
                                return part.split(/(\*\*[\s\S]*?\*\*)/g).map((subPart, j) => {
                                    if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                        return <strong key={`${i}-${j}`} className={cn("font-bold", data.highlight)}>{subPart.slice(2, -2)}</strong>;
                                    }
                                    return subPart;
                                });
                            })}
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4 flex-shrink-0" />
            </div>
        </motion.div>
    );
}

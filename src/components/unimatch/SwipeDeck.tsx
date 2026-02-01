"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { University, getUniversities } from "@/lib/data";
import { X, GraduationCap, RotateCcw, MapPin, Loader2, Share2, Mail, Palette, TrendingUp, Stethoscope, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Using 4 diagonal directions (coprime to 7 colors) ensures 28 unique combinations
const DIRECTIONS = [
    "bg-gradient-to-br", // Bottom Right
    "bg-gradient-to-bl", // Bottom Left
    "bg-gradient-to-tr", // Top Right
    "bg-gradient-to-tl", // Top Left
];

interface UniversityWithGradient extends University {
    gradient: string;
    highlight: string;
}

export function SwipeDeck({ filters, onRestart }: { filters: Record<string, string | string[]>; onRestart: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [universities, setUniversities] = useState<UniversityWithGradient[]>([]);
  const [deck, setDeck] = useState<UniversityWithGradient[]>([]);
  const [history, setHistory] = useState<UniversityWithGradient[]>([]); // For Undo
  const [liked, setLiked] = useState<UniversityWithGradient[]>([]);
  const [loading, setLoading] = useState(true);
  const swipeRef = useRef<string | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

      // Scroll ONLY when loading finishes (initial entry), not after every swipe

      /* 

         Auto-scroll removed per user request. 

         The page will be generated directly in the correct position via parent control.

      */

    }, [loading]);

  // Load and Filter Data
  useEffect(() => {
    async function loadData() {
      const data = await getUniversities();
      
      const filtered = data.filter(uni => {
        // Basic validity check
        if (!uni.id) return false;

        // --- Region Filtering ---
        const regionFilter = Array.isArray(filters.region) ? filters.region : (filters.region ? [filters.region] : []);
        if (regionFilter.length > 0 && !regionFilter.includes('any')) {
            if (!regionFilter.includes(uni.region)) return false;
        }
        
        // --- Disciplinary Area Filtering ---
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

        // --- City Size Filtering ---
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
            // Cycle through directions and colors with different periods to maximize variety
            gradient: `${DIRECTIONS[index % DIRECTIONS.length]} ${theme.gradient}`,
            highlight: theme.highlight
          };
      });

      setUniversities(filtered);
      setDeck(filtered);
      setLoading(false);
    }
    loadData();
  }, [filters]);

  const removeCard = (id: string, action: 'like' | 'nope') => {
    if (swipeRef.current === id) return;

    const currentCard = deck[deck.length - 1];
    if (!currentCard || currentCard.id !== id) return;

    swipeRef.current = id;

    setDeck((current) => current.slice(0, -1));

    if (action === 'like') {
      setLiked(prev => {
        if (prev.some(u => u.id === id)) return prev;
        return [...prev, currentCard];
      });
    }
    setHistory(prev => [...prev, currentCard]);
  };

  const undoSwipe = () => {
    if (history.length === 0) return;
    const lastCard = history[history.length - 1];
    
    // Reset the swipe lock for this card so it can be swiped again
    if (swipeRef.current === lastCard.id) {
        swipeRef.current = null;
    }

    setHistory(prev => prev.slice(0, -1));
    if (liked.find(u => u.id === lastCard.id)) {
        setLiked(prev => prev.filter(u => u.id !== lastCard.id));
    }
    setDeck(prev => [...prev, lastCard]);
  };

  const shareOnWhatsApp = () => {
    if (liked.length === 0) return;

    const uName = filters.userName as string;
    const uSurname = filters.userSurname as string;
    const fullName = uName && uSurname ? `${uName} ${uSurname}` : uName || "Estudante";
    const firstName = uName || "Estudante";
    const header = `🇮🇹 *Match Universitário - ${fullName}* 🇮🇹\n\nCiao! Me chamo ${firstName}, explorei as opções e estas são as universidades que deram match comigo. *Gostaria de receber mais informações sobre elas e como começar meu processo:*\n\n`;
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
    const header = `Ciao! Me chamo ${firstName}, explorei as opções e estas são as universidades que deram match comigo.\n\nGostaria de receber mais informações sobre elas e como começar meu processo:\n\n`;
    const list = liked.map(u => `🏛️ ${u.name}\n   📍 ${u.city}\n`).join("\n");
    const footer = "\n\nVocê pode me ajudar com mais detalhes sobre essas opções?\n\n🔗 Descubra seu match em: https://vivendoafundo.com.br";

    const body = encodeURIComponent(header + list + footer);
    window.open(`mailto:assessoria@vivendoafundo.com.br?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
  };

  if (loading) {
     return (
        <div ref={deckRef} className="flex flex-col items-center justify-center h-[60vh] text-white">
           <div className="relative">
             <div className="absolute inset-0 bg-[#BF402A] blur-xl opacity-20 animate-pulse"></div>
             <Loader2 className="w-16 h-16 animate-spin mb-4 relative z-10 text-[#BF402A]" />
           </div>
           <p className="font-medium text-xl text-[#567190] animate-pulse">Preparando as malas...</p>
        </div>
     )
  }

  if (deck.length === 0) {
      return (
          <div ref={deckRef} className="flex flex-col h-auto max-h-[85vh] w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative mb-12">
              
              {liked.length > 0 ? (
                <>
                    {/* Header */}
                    <div className="p-6 pb-4 text-center border-b border-white/10 bg-white/5">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#2C5C44] to-[#1E3E2F] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#2C5C44]/20 ring-4 ring-white/10">
                            <GraduationCap className="w-8 h-8 text-white fill-white" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-1">
                          Lista dos Sonhos {filters.userName ? `de ${filters.userName}` : ''} 🇮🇹
                        </h2>
                        <p className="text-white/60 text-base">Você deu match com {liked.length} universidade{liked.length !== 1 && 's'}!</p>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {liked.map(uni => (
                            <motion.div 
                                key={uni.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative flex items-center gap-4 p-3 rounded-2xl overflow-hidden group border border-white/10"
                            >
                                {/* Subtle Gradient Background */}
                                <div className={cn("absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30", uni.gradient)} />
                                
                                <div className={cn("relative z-10 w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-2xl flex-shrink-0", uni.gradient)}>
                                    🏛️
                                </div>
                                <div className="relative z-10 flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-lg mb-0.5 truncate">{uni.name}</h4>
                                    <p className="text-white/60 flex items-center gap-1.5 text-sm"><MapPin className="w-3.5 h-3.5"/> {uni.city}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-white/5 border-t border-white/10 space-y-3">
                        <Button 
                            onClick={shareOnWhatsApp}
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-14 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
                        >
                            <Share2 className="w-5 h-5" />
                            Compartilhar Lista no WhatsApp
                        </Button>
                        <Button 
                            onClick={shareOnEmail}
                            className="w-full bg-[#182335] hover:bg-[#182335]/80 text-white font-bold h-14 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#182335]/20 transition-all hover:scale-[1.02]"
                        >
                            <Mail className="w-5 h-5" />
                            Enviar por E-mail
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={onRestart} 
                            className="w-full text-white/60 hover:text-white hover:bg-white/10 h-14 rounded-xl text-lg font-semibold border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-[-120deg] transition-transform duration-500" /> Recomeçar Exploração
                        </Button>
                    </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 ring-1 ring-white/10">
                        <RotateCcw className="w-10 h-10 text-white/50" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Nenhum Match? 😢</h2>
                    <p className="text-white/60 mb-8 text-lg leading-relaxed max-w-md">
                        Você passou por todas as opções e não curtiu nenhuma. Que tal tentar filtros diferentes ou dar uma segunda chance?
                    </p>
                    <Button 
                        onClick={onRestart} 
                        className="group relative bg-white text-[#182335] hover:bg-white hover:scale-105 font-bold px-10 py-7 rounded-2xl text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#BF402A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />
                        Tentar Novamente
                    </Button>
                </div>
              )}
          </div>
      )
  }

  return (
    <div ref={deckRef} className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto h-[78vh] flex flex-col items-center justify-center">
      
      {/* Card Stack - LARGER CONTAINER */}
      <div className="relative w-full h-[68vh] perspective-1000 mb-8">
        {deck.map((uni, index) => (
          <Card 
            key={uni.id} 
            data={uni} 
            active={index === deck.length - 1}
            removeCard={removeCard}
            index={index}
          />
        ))}
      </div>

      {/* Controls - LARGER & SPACED */}
      <div className="flex items-center gap-8 z-20 mb-12">
        <Button 
            size="icon" 
            variant="ghost" 
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#567190] hover:bg-white hover:text-[#182335] hover:scale-110 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:hover:scale-100 relative overflow-hidden group"
            onClick={undoSwipe}
            disabled={history.length === 0}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <RotateCcw className="w-7 h-7 relative z-10" />
        </Button>
        
        <Button 
            size="icon" 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600/20 to-red-800/40 backdrop-blur-2xl border-2 border-red-600/60 text-red-600 hover:from-red-600 hover:to-red-700 hover:text-white hover:scale-110 hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all shadow-[0_10px_40px_rgba(220,38,38,0.25)] relative overflow-hidden group active:scale-95"
            onClick={() => removeCard(deck[deck.length - 1].id, 'nope')}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-40" />
            <div className="absolute inset-0 bg-red-600 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <X className="w-10 h-10 stroke-[3] group-hover:rotate-90 transition-transform duration-300 relative z-10 drop-shadow-md" />
        </Button>

        <Button 
            size="icon" 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600/20 to-green-800/40 backdrop-blur-2xl border-2 border-green-600/60 text-green-600 hover:from-green-600 hover:to-green-700 hover:text-white hover:scale-110 hover:shadow-[0_0_50px_rgba(22,163,74,0.6)] transition-all shadow-[0_10px_40px_rgba(22,163,74,0.25)] relative overflow-hidden group active:scale-95"
            onClick={() => removeCard(deck[deck.length - 1].id, 'like')}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-40" />
            <div className="absolute inset-0 bg-green-600 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            <GraduationCap className="w-10 h-10 stroke-[3] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-md" />
        </Button>
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
function DisciplinesGrid({ data }: { data: University }) {
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
}

// Single Card Component - FULL SIZE
function Card({ data, active, removeCard, index }: { 
    data: UniversityWithGradient; 
    active: boolean; 
    removeCard: (id: string, action: 'like' | 'nope') => void;
    index: number;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

    // Use deterministic random values based on ID
    const randomVal = useMemo(() => pseudoRandom(data.id), [data.id]);
    const randomRotate = (randomVal * 4) - 2; 
    const randomExitX = randomVal > 0.5 ? 800 : -800;
    
    const likeLabel = LIKE_LABELS[0];
    const nopeLabel = NOPE_LABELS[0];

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (!active) return;
        if (info.offset.x > 100) removeCard(data.id, 'like');
        else if (info.offset.x < -100) removeCard(data.id, 'nope');
    };

    return (
        <motion.div
            style={{ 
                x: active ? x : 0, 
                rotate: active ? rotate : 0,
                zIndex: index
            }}
            initial={{ scale: 0.95, y: 30, opacity: 0, filter: "blur(10px)" }}
            animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                filter: "blur(0px)",
                rotate: active ? 0 : randomRotate
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            exit={{ x: randomExitX, opacity: 0, transition: { duration: 0.4 } }}
            drag={active ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className={cn(
                "absolute top-0 left-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/20 select-none",
                !active && "pointer-events-none brightness-[0.85]"
            )}
        >
            {/* Feedback Overlays */}
            {active && (
                <>
                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-12 left-8 z-30 pointer-events-none">
                         <div 
                            className="border-[6px] border-green-500/50 text-green-600 rounded-3xl px-8 py-4 -rotate-12 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
                         >
                             <span className="font-black text-6xl md:text-7xl tracking-tighter uppercase drop-shadow-sm">
                                {likeLabel}
                             </span>
                         </div>
                    </motion.div>
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-12 right-8 z-30 pointer-events-none">
                         <div className="border-[6px] border-red-500/50 text-red-600 rounded-3xl px-8 py-4 rotate-12 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
                             <span className="font-black text-6xl md:text-7xl tracking-tighter uppercase drop-shadow-sm">
                                {nopeLabel}
                             </span>
                         </div>
                    </motion.div>
                </>
            )}

            {/* Content Container with Dynamic Gradient */}
            <div className={cn("h-full w-full relative flex flex-col p-8", data.gradient)}>
                
                {/* Abstract Decorative Circles */}
                <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-black/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header Row: Title/Location (Left) & Radar (Right) */}
                <div className="flex justify-between items-start z-20 mb-6 flex-shrink-0">
                    <div className="flex-1 pr-6">
                        {/* Location Label - moved above title for hierarchy or keep below? User liked title legible. */}
                        <div className="flex items-center gap-2 text-white/90 mb-3 uppercase tracking-wider font-semibold text-xs drop-shadow-sm">
                            <MapPin className={cn("w-3 h-3", data.highlight)} />
                            <span>{data.city} • {data.region === 'north' ? 'Norte' : data.region === 'center' ? 'Centro' : 'Sul'}</span>
                        </div>
                        
                        {/* BIG TITLE */}
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.05] drop-shadow-md">
                            {data.name}
                        </h2>
                    </div>

                    {/* Radar - Top Right */}
                    <div className="flex-shrink-0 pt-1">
                        <DisciplinesGrid data={data} />
                    </div>
                </div>

                {/* Main Content Area - Scrollable Description */}
                <div className="flex-1 min-h-0 z-10 relative">
                     {/* Scrollable Description */}
                    <div 
                        className="h-full pl-4 border-l-2 border-white/20 overflow-y-auto custom-scrollbar pr-2"
                        onPointerDown={(e) => e.stopPropagation()}
                    >
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

                {/* Bottom - Empty or Decorative Footer Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4 flex-shrink-0" />
            </div>
        </motion.div>
    );
}

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "framer-motion";
import { University, getUniversities } from "@/lib/data";
import { X, Heart, GraduationCap, RotateCcw, MapPin, Wallet, Loader2, ChevronUp, Sparkles, Share2, Mail, Palette, TrendingUp, Stethoscope, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Random Brazilian exclamations
const EXCLAMATIONS = [
  "Partiu Itália! 🇮🇹", 
  "Que sonho!", 
  "Imagina eu lá!", 
  "Gostei!", 
  "Top!", 
  "Mamma Mia!", 
  "Show de bola!", 
  "Belíssimo!",
  "Andiamo!"
];

export function SwipeDeck({ filters }: { filters: Record<string, string> }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [universities, setUniversities] = useState<University[]>([]);
  const [deck, setDeck] = useState<University[]>([]);
  const [history, setHistory] = useState<University[]>([]); // For Undo
  const [liked, setLiked] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [exclamation, setExclamation] = useState<{ text: string; id: number; rotation: number } | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const swipeRef = useRef<string | null>(null);

  // Load and Filter Data
  useEffect(() => {
    async function loadData() {
      const data = await getUniversities();
      
      const filtered = data.filter(uni => {
        // Basic validity check
        if (!uni.id) return false;

        // Strict Filtering for Region and Area
        if (filters.region && filters.region !== 'any' && uni.region !== filters.region) return false;
        
        // Disciplinary Area Filtering
        if (filters.area && filters.area !== 'any') {
           if (filters.area === 'humanities' && !uni.humanities) return false;
           if (filters.area === 'social' && !uni.social) return false;
           if (filters.area === 'health' && !uni.health) return false;
           if (filters.area === 'stem' && !uni.stem) return false;
        }

        // City Size Filtering
        if (filters.citySize && filters.citySize !== 'any') {
            if (filters.citySize === 'big' && !uni.is_big_city) return false;
            if (filters.citySize === 'small' && uni.is_big_city) return false;
        }

        return true;
      }).sort(() => Math.random() - 0.5);

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
      showExclamation();
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

  const showExclamation = () => {
    const text = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)];
    setExclamation({ text, id: Date.now(), rotation: Math.random() * 20 - 10 });
    setTimeout(() => setExclamation(null), 1500);
  };

  const shareOnWhatsApp = () => {
    if (liked.length === 0) return;

    const header = "🇮🇹 *Meu Match Universitário* 🇮🇹\n\nCiao! Explorei as opções e estas são as universidades que deram match comigo. *Gostaria de receber mais informações sobre elas e como começar meu processo:*\n\n";
    const list = liked.map(u => `🏛️ *${u.name}*\n   📍 ${u.city}\n`).join("\n");
    const footer = "\n💬 *Você pode me ajudar com mais detalhes sobre essas opções?*\n🔗 Descubra seu match em: https://vivendoafundo.com.br";

    const text = encodeURIComponent(header + list + footer);
    window.open(`https://api.whatsapp.com/send?phone=393516274752&text=${text}`, '_blank');
  };

  const shareOnEmail = () => {
    if (liked.length === 0) return;

    const subject = "Meu Match Universitário";
    const header = "Ciao! Explorei as opções e estas são as universidades que deram match comigo.\n\nGostaria de receber mais informações sobre elas e como começar meu processo:\n\n";
    const list = liked.map(u => `🏛️ ${u.name}\n   📍 ${u.city}\n`).join("\n");
    const footer = "\n\nVocê pode me ajudar com mais detalhes sobre essas opções?\n\n🔗 Descubra seu match em: https://vivendoafundo.com.br";

    const body = encodeURIComponent(header + list + footer);
    window.open(`mailto:assessoria@vivendoafundo.com.br?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
  };

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-white">
           <div className="relative">
             <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
             <Loader2 className="w-16 h-16 animate-spin mb-4 relative z-10 text-blue-400" />
           </div>
           <p className="font-medium text-xl text-blue-200/80 animate-pulse">Preparando as malas...</p>
        </div>
     )
  }

  if (deck.length === 0) {
      return (
          <div className="flex flex-col h-[75vh] w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
              
              {liked.length > 0 ? (
                <>
                    {/* Header */}
                    <div className="p-8 pb-4 text-center border-b border-white/10 bg-white/5">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20 ring-4 ring-white/10">
                            <GraduationCap className="w-10 h-10 text-white fill-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Sua Lista dos Sonhos 🇮🇹</h2>
                        <p className="text-blue-200/70 text-lg">Você deu match com {liked.length} universidade{liked.length !== 1 && 's'}!</p>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                        {liked.map(uni => (
                            <motion.div 
                                key={uni.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
                            >
                                <div className={cn("w-full sm:w-24 h-32 sm:h-24 rounded-xl shadow-lg flex items-center justify-center bg-gradient-to-br text-3xl", getGradient(uni.id))}>
                                    🏛️
                                </div>
                                <div className="flex-1 text-center sm:text-left w-full">
                                    <h4 className="font-bold text-white text-xl mb-1">{uni.name}</h4>
                                    <p className="text-blue-300/80 flex items-center justify-center sm:justify-start gap-2 mb-2"><MapPin className="w-4 h-4"/> {uni.city}</p>
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
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                        >
                            <Mail className="w-5 h-5" />
                            Enviar por E-mail
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => window.location.reload()} 
                            className="w-full text-blue-300 hover:text-white hover:bg-white/10 h-12 rounded-xl text-base"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Recomeçar Exploração
                        </Button>
                    </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 ring-1 ring-white/10">
                        <RotateCcw className="w-10 h-10 text-white/50" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Nenhum Match? 😢</h2>
                    <p className="text-blue-200/70 mb-8 text-lg leading-relaxed max-w-md">
                        Você passou por todas as opções e não curtiu nenhuma. Que tal tentar filtros diferentes ou dar uma segunda chance?
                    </p>
                    <Button onClick={() => window.location.reload()} className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-6 rounded-xl text-lg shadow-lg hover:scale-105 transition-all">
                        Tentar Novamente
                    </Button>
                </div>
              )}
          </div>
      )
  }

  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto h-[80vh] flex flex-col items-center justify-center">
      
      {/* Exclamation Popups - Morphing from Card Overlay */}
      <AnimatePresence mode="popLayout">
        {exclamation && (
            <motion.div
                layoutId="match-feedback-morph"
                key="exclamation-box"
                initial={{ opacity: 0, scale: 0.8, y: -250 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: -320, 
                    transition: { type: "spring", stiffness: 200, damping: 20 }
                }}
                exit={{ opacity: 0, scale: 0.8, y: -350, transition: { duration: 0.2 } }}
                className="absolute bottom-20 z-[60] flex items-center justify-center pointer-events-none"
            >
                <div className="bg-white/20 backdrop-blur-3xl border border-white/20 px-12 py-6 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex items-center justify-center text-center border-t-white/30">
                    <span className="text-4xl md:text-6xl font-black text-yellow-400 drop-shadow-[0_2px_10px_rgba(250,204,21,0.4)] tracking-tight">
                        {exclamation.text}
                    </span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Card Stack - LARGER CONTAINER */}
      <div className="relative w-full h-[65vh] md:h-[70vh] perspective-1000 mb-8">
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
      <div className="flex items-center gap-8 z-20">
        <Button 
            size="icon" 
            variant="ghost" 
            className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-yellow-400 hover:bg-yellow-400/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(250,204,21,0.1)]"
            onClick={undoSwipe}
            disabled={history.length === 0}
        >
            <RotateCcw className="w-7 h-7" />
        </Button>
        
        <Button 
            size="icon" 
            className="w-20 h-20 rounded-full bg-black/20 backdrop-blur-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 transition-all shadow-[0_0_20px_rgba(239,68,68,0.15)] group"
            onClick={() => removeCard(deck[deck.length - 1].id, 'nope')}
        >
            <X className="w-10 h-10 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
        </Button>

        <Button 
            size="icon" 
            className="w-20 h-20 rounded-full bg-black/20 backdrop-blur-xl border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)] group"
            onClick={() => removeCard(deck[deck.length - 1].id, 'like')}
        >
            <GraduationCap className="w-10 h-10 stroke-[3] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>

      {/* Wishlist Drawer */}
      <div className={cn(
          "fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur-2xl rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-40 border-t border-white/10",
          wishlistOpen ? "h-[85vh]" : "h-20 hover:h-24"
      )}>
          <div 
            className="w-full h-full flex flex-col pt-2 cursor-pointer"
            onClick={() => setWishlistOpen(!wishlistOpen)}
          >
              <div className="w-16 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between px-8 pb-4">
                  <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-xl shadow-lg shadow-pink-500/20">
                          <GraduationCap className="w-5 h-5 text-white fill-white" />
                      </div>
                      <p className="font-bold text-white text-lg">Lista de Sonhos <span className="text-white/50 text-sm ml-2">({liked.length})</span></p>
                  </div>
                  <ChevronUp className={cn("text-white/50 transition-transform duration-500", wishlistOpen && "rotate-180")} />
              </div>
              
              {wishlistOpen && (
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex-1 overflow-y-auto px-6 pb-8 space-y-3"
                 >
                    {liked.length === 0 ? (
                        <div className="text-center py-20">
                           <p className="text-blue-300/50 text-xl">Nenhum match ainda... continue deslizando! 🤞</p>
                        </div>
                    ) : (
                        <>
                            {liked.map(uni => (
                                <div key={uni.id} className="flex items-center gap-5 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className={cn("w-20 h-20 rounded-xl shadow-lg flex items-center justify-center bg-gradient-to-br text-2xl flex-shrink-0", getGradient(uni.id))}>
                                        🏛️
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors line-clamp-2">{uni.name}</h4>
                                        <p className="text-blue-300/60 flex items-center gap-1"><MapPin className="w-3 h-3"/> {uni.city}</p>
                                    </div>
                                    <Button className="bg-white/10 hover:bg-white text-white hover:text-blue-900 rounded-xl h-10 px-4">Ver</Button>
                                </div>
                            ))}
                            
                            <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-[#0F172A] to-transparent">
                                <Button 
                                    onClick={shareOnWhatsApp}
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-14 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Compartilhar no WhatsApp
                                </Button>
                            </div>
                        </>
                    )}
                 </motion.div>
              )}
          </div>
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

// Helper to get a consistent gradient based on ID
function getGradient(id: string) {
    const gradients = [
        "from-[#1D3557] to-[#112240]", // Navy Brand
        "from-[#0F172A] to-[#334155]", // Slate
        "from-[#312E81] to-[#4338CA]", // Indigo
        "from-[#BE123C] to-[#881337]", // Rose
        "from-[#047857] to-[#065F46]", // Emerald
        "from-[#7C3AED] to-[#5B21B6]", // Violet
        "from-[#C2410C] to-[#9A3412]", // Orange
    ];
    // Simple hash of the numeric ID or string
    const index = Math.abs(id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % gradients.length;
    return gradients[index];
}

// Disciplines Grid Component
function DisciplinesGrid({ data }: { data: University }) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 grid grid-cols-2 gap-2 border border-white/10 shadow-lg">
            {/* Top Left: Humanities */}
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-opacity duration-300", data.humanities ? "bg-pink-500/20 text-pink-200" : "bg-white/5 text-white/10")}>
                <Palette className="w-4 h-4" />
            </div>
            
            {/* Top Right: Social */}
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-opacity duration-300", data.social ? "bg-orange-500/20 text-orange-200" : "bg-white/5 text-white/10")}>
                <TrendingUp className="w-4 h-4" />
            </div>

            {/* Bottom Left: Health */}
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-opacity duration-300", data.health ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-white/10")}>
                <Stethoscope className="w-4 h-4" />
            </div>

            {/* Bottom Right: STEM */}
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-opacity duration-300", data.stem ? "bg-cyan-500/20 text-cyan-200" : "bg-white/5 text-white/10")}>
                <Atom className="w-4 h-4" />
            </div>
        </div>
    );
}

// Single Card Component - FULL SIZE
function Card({ data, active, removeCard, index }: { 
    data: University; 
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
    
    const bgGradient = useMemo(() => getGradient(data.id), [data.id]);

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
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                rotate: active ? 0 : randomRotate
            }}
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
                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 z-30 pointer-events-none">
                         <div 
                            className="bg-white/20 backdrop-blur-3xl border border-white/20 text-green-400 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-full px-10 py-4 -rotate-12 border-t-white/30"
                         >
                             <motion.span layoutId="match-feedback-morph" className="font-black text-5xl tracking-widest uppercase">MATCH</motion.span>
                         </div>
                    </motion.div>
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 z-30 pointer-events-none">
                         <div className="bg-white/20 backdrop-blur-3xl border border-white/20 text-red-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-full px-10 py-4 rotate-12 border-t-white/30">
                             <span className="font-black text-5xl tracking-widest uppercase">NOPE</span>
                         </div>
                    </motion.div>
                </>
            )}

            {/* Content Container with Dynamic Gradient */}
            <div className={cn("h-full w-full relative flex flex-col p-8 bg-gradient-to-br", bgGradient)}>
                
                {/* Abstract Decorative Circles */}
                <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-black/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header Row: Title/Location (Left) & Radar (Right) */}
                <div className="flex justify-between items-start z-20 mb-6 flex-shrink-0">
                    <div className="flex-1 pr-6">
                        {/* Location Label - moved above title for hierarchy or keep below? User liked title legible. */}
                        <div className="flex items-center gap-2 text-blue-200/80 mb-3 uppercase tracking-wider font-semibold text-xs">
                            <MapPin className="w-3 h-3" />
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
                         <p className="text-blue-50/90 text-lg md:text-xl leading-relaxed font-normal pb-4">
                            {data.description.split(/(Curiosidade:?)/g).map((part, i) => 
                                part.match(/Curiosidade:?/)? <><br/><br/><strong key={i} className="text-white font-bold">{part}</strong></> : part
                            )}
                        </p>
                    </div>
                </div>

                {/* Bottom - Empty or Decorative Footer Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4 flex-shrink-0" />
            </div>
        </motion.div>
    );
}

function Badge({ text, icon, color }: { text: string; icon: React.ReactNode; color: string }) {
    const styles = {
        blue: "bg-blue-500/20 text-blue-100 border-blue-400/20",
        green: "bg-emerald-500/20 text-emerald-100 border-emerald-400/20",
        purple: "bg-purple-500/20 text-purple-100 border-purple-400/20",
        pink: "bg-pink-500/20 text-pink-100 border-pink-400/20",
        orange: "bg-orange-500/20 text-orange-100 border-orange-400/20",
        cyan: "bg-cyan-500/20 text-cyan-100 border-cyan-400/20",
    };
    // @ts-expect-error - color is a string
    const activeStyle = styles[color] || styles.blue;

    return (
        <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border backdrop-blur-md", activeStyle)}>
            {icon} {text}
        </span>
    );
}
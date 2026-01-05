"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "framer-motion";
import { University, getUniversities } from "@/lib/data";
import { X, Heart, RotateCcw, MapPin, GraduationCap, Wallet, Loader2, ChevronUp, Sparkles, Share2 } from "lucide-react";
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
        if (filters.region && uni.region !== filters.region) return false;
        if (filters.area && uni.area_tag !== filters.area) return false;

        // Cumulative Filtering for Budget
        if (filters.budget) {
          if (filters.budget === 'low' && uni.budget_tag !== 'low') return false;
          if (filters.budget === 'medium' && (uni.budget_tag === 'high')) return false;
          // if filters.budget === 'high', all options ('low', 'medium', 'high') are valid
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

    const header = "🇮🇹 *Meu Match Acadêmico - UniMatch Italia* 🇮🇹\n\nCiao! Dá uma olhada nas universidades que eu mais gostei:\n\n";
    const list = liked.map(u => `🏛️ *${u.name}*\n   📍 ${u.city} • 🎓 ${u.area_tag}\n`).join("\n");
    const footer = "\n🔗 Encontre o seu match também em: https://vivendoafundo.com.br";

    const text = encodeURIComponent(header + list + footer);
    window.open(`https://wa.me/393516274752?text=${text}`, '_blank');
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
                            <Heart className="w-10 h-10 text-white fill-white" />
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
                                <img src={uni.image} alt={uni.name} className="w-full sm:w-24 h-32 sm:h-24 rounded-xl object-cover ring-1 ring-white/10 shadow-lg" />
                                <div className="flex-1 text-center sm:text-left w-full">
                                    <h4 className="font-bold text-white text-xl mb-1">{uni.name}</h4>
                                    <p className="text-blue-300/80 flex items-center justify-center sm:justify-start gap-2 mb-2"><MapPin className="w-4 h-4"/> {uni.city}</p>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-500/20 text-blue-200 border border-blue-500/30">{uni.area_tag}</span>
                                        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-green-500/20 text-green-200 border border-green-500/30">{uni.budget_tag === 'low' ? 'Low Cost' : uni.budget_tag === 'medium' ? 'Médio Custo' : 'Alto Custo'}</span>
                                    </div>
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
      
      {/* Exclamation Popups */}
      <AnimatePresence>
        {exclamation && (
            <motion.div
                key={exclamation.id}
                initial={{ opacity: 0, scale: 0.5, y: 0, x: "-50%" }}
                animate={{ opacity: 1, scale: 1.2, y: -50, x: "-50%", rotate: exclamation.rotation }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                className="absolute top-[15%] left-1/2 z-[60] pointer-events-none whitespace-nowrap"
            >
                <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 drop-shadow-[0_4px_20px_rgba(251,191,36,0.5)] stroke-black bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-yellow-500/30">
                    {exclamation.text}
                </span>
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
            className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all shadow-[0_0_30px_rgba(239,68,68,0.2)] group"
            onClick={() => removeCard(deck[deck.length - 1].id, 'nope')}
        >
            <X className="w-10 h-10 stroke-[3] group-hover:rotate-90 transition-transform" />
        </Button>

        <Button 
            size="icon" 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:scale-110 transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)] border border-green-400/50"
            onClick={() => removeCard(deck[deck.length - 1].id, 'like')}
        >
            <Heart className="w-10 h-10 fill-current animate-pulse" />
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
                          <Heart className="w-5 h-5 text-white fill-white" />
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
                                    <img src={uni.image} alt={uni.name} className="w-20 h-20 rounded-xl object-cover ring-1 ring-white/10" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">{uni.name}</h4>
                                        <p className="text-blue-300/60 flex items-center gap-1"><MapPin className="w-3 h-3"/> {uni.city}</p>
                                    </div>
                                    <Button className="bg-white/10 hover:bg-white text-white hover:text-blue-900 rounded-xl">Ver Detalhes</Button>
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

    // Use deterministic random values based on ID to avoid hydration mismatches
    const randomVal = useMemo(() => pseudoRandom(data.id), [data.id]);
    const randomRotate = (randomVal * 4) - 2; 
    const randomExitX = randomVal > 0.5 ? 800 : -800;

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
                         <div className="border-[6px] border-green-500 text-green-500 font-black text-6xl px-6 py-2 rounded-2xl -rotate-12 uppercase tracking-widest bg-white/80 backdrop-blur-md shadow-2xl transform -translate-x-4 -translate-y-4">
                             LIKE
                         </div>
                    </motion.div>
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 z-30 pointer-events-none">
                         <div className="border-[6px] border-red-500 text-red-500 font-black text-6xl px-6 py-2 rounded-2xl rotate-12 uppercase tracking-widest bg-white/80 backdrop-blur-md shadow-2xl transform translate-x-4 -translate-y-4">
                             NOPE
                         </div>
                    </motion.div>
                </>
            )}

            {/* FULL HEIGHT IMAGE with Gradient Overlay */}
            <div className="h-full w-full relative group">
                <img 
                    src={data.image} 
                    alt={data.name} 
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-1000 group-hover:scale-105" 
                    draggable="false"
                />
                
                {/* Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-10">
                    <div className="bg-white/10 backdrop-blur-md text-white font-bold px-4 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{data.match_score}% Match</span>
                    </div>
                </div>

                {/* Bottom Content Area - Overlay style */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 pb-24"> {/* Added padding bottom for visual balance */}
                    
                    <div className="flex items-end justify-between mb-3">
                        <div>
                             <h2 className="text-4xl md:text-5xl font-black drop-shadow-lg leading-tight mb-2">{data.name}</h2>
                             <div className="flex items-center gap-3 text-white/90">
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-xl md:text-2xl font-medium tracking-wide">{data.city}</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/20 my-5" />

                    <div className="flex gap-3 flex-wrap mb-5">
                        <Badge icon={<GraduationCap className="w-4 h-4"/>} text={data.area_tag} color="blue" />
                        <Badge icon={<Wallet className="w-4 h-4"/>} text={data.budget_tag} color="green" />
                        <Badge icon={<MapPin className="w-4 h-4"/>} text={data.region} color="purple" />
                    </div>

                    <p className="text-gray-200 line-clamp-3 text-lg leading-relaxed font-normal opacity-90 max-w-xl">
                        {data.description}
                    </p>
                    
                     {/* Floating Tuition Tag */}
                    <div className="absolute bottom-8 right-8 bg-white text-blue-900 font-bold px-5 py-3 rounded-xl shadow-xl flex flex-col items-center leading-none">
                         <span className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">Tuition</span>
                         <span className="text-xl">{data.tuition}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function Badge({ text, icon, color }: { text: string; icon: React.ReactNode; color: string }) {
    // Glassmorphic badges
    const styles = {
        blue: "bg-blue-500/30 text-blue-100 border-blue-400/30",
        green: "bg-green-500/30 text-green-100 border-green-400/30",
        purple: "bg-purple-500/30 text-purple-100 border-purple-400/30",
    };
    // @ts-expect-error - color is a string but might not match keys exactly, though it should.
    const activeStyle = styles[color] || styles.blue;

    return (
        <span className={cn("px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center gap-2 border backdrop-blur-md shadow-sm", activeStyle)}>
            {icon} {text}
        </span>
    );
}
"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Gift, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data
const CARD_TYPES = {
  express: {
    title: "Consultoria Express",
    price: 50,
    color: "blue",
    gradient: "from-blue-600 to-cyan-500",
    description: "Um empurrãozinho de 1 hora para clarear as ideias.",
  },
  mentoria: {
    title: "Mentoria Completa",
    price: 200,
    color: "yellow",
    gradient: "from-slate-900 to-slate-800",
    description: "Acompanhamento total para realizar o sonho italiano.",
  },
};

export default function GiftCardPurchasePage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as keyof typeof CARD_TYPES;
  const card = CARD_TYPES[type] || CARD_TYPES.express;
  const isDark = type === "mentoria";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to Payment/Success
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link 
            href="/gift-card" 
            className={cn(
                "inline-flex items-center gap-2 mb-8 font-medium hover:underline",
                isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            )}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Opções
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left: Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-12"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Personalize seu <br />
              <span className={cn(
                  "text-transparent bg-clip-text bg-gradient-to-r",
                  isDark ? "from-yellow-300 to-amber-500" : "from-blue-600 to-purple-600"
              )}>
                Presente
              </span>
            </h1>
            <p className={cn("text-lg mb-12", isDark ? "text-slate-400" : "text-slate-600")}>
              Você está comprando uma <strong>{card.title}</strong>. Preencha os dados abaixo para enviar este presente especial.
            </p>

            {/* Live Card Preview */}
            <div className={cn(
                "relative aspect-[1.6] rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col justify-between transition-all",
                isDark ? "bg-slate-900 text-white shadow-yellow-500/10" : "bg-white text-slate-900 shadow-blue-500/10"
            )}>
                {/* Background Decoration */}
                <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -mr-16 -mt-16", isDark ? "bg-yellow-500" : "bg-blue-500")} />
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <Gift className={cn("w-10 h-10", isDark ? "text-yellow-400" : "text-blue-600")} />
                        <span className={cn("text-2xl font-bold", isDark ? "text-yellow-400" : "text-blue-600")}>€{card.price}</span>
                    </div>
                    <div className="mt-4">
                        <p className={cn("text-sm uppercase tracking-wider font-semibold opacity-70", isDark ? "text-slate-400" : "text-slate-400")}>De</p>
                        <p className="text-xl font-medium truncate">{formData.senderName || "Seu Nome"}</p>
                    </div>
                     <div className="mt-2">
                        <p className={cn("text-sm uppercase tracking-wider font-semibold opacity-70", isDark ? "text-slate-400" : "text-slate-400")}>Para</p>
                        <p className="text-xl font-medium truncate">{formData.recipientName || "Nome do Sortudo"}</p>
                    </div>
                </div>

                <div className="relative z-10">
                     <p className={cn("text-2xl font-bold mb-1", isDark ? "text-white" : "text-slate-900")}>{card.title}</p>
                     <p className={cn("text-sm opacity-80 line-clamp-2", isDark ? "text-slate-300" : "text-slate-500")}>
                         {formData.message || "Escreva uma mensagem especial..."}
                     </p>
                </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "rounded-3xl p-8 border",
                isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-xl"
            )}
          >
             <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.form 
                        key="step1"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Send className={cn("w-5 h-5", isDark ? "text-yellow-400" : "text-blue-600")} />
                                Detalhes do Envio
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium opacity-80">Seu Nome</label>
                                    <input 
                                        required 
                                        name="senderName"
                                        value={formData.senderName}
                                        onChange={handleInputChange}
                                        className={cn("w-full px-4 py-3 rounded-xl outline-none focus:ring-2 transition-all", isDark ? "bg-white/10 border-white/10 focus:ring-yellow-400/50" : "bg-slate-50 border-slate-200 focus:ring-blue-500/50")} 
                                        placeholder="Ex: Maria Silva"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium opacity-80">Nome do Destinatário</label>
                                    <input 
                                        required 
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                        className={cn("w-full px-4 py-3 rounded-xl outline-none focus:ring-2 transition-all", isDark ? "bg-white/10 border-white/10 focus:ring-yellow-400/50" : "bg-slate-50 border-slate-200 focus:ring-blue-500/50")} 
                                        placeholder="Ex: João Souza"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Email do Destinatário</label>
                                <input 
                                    required 
                                    type="email"
                                    name="recipientEmail"
                                    value={formData.recipientEmail}
                                    onChange={handleInputChange}
                                    className={cn("w-full px-4 py-3 rounded-xl outline-none focus:ring-2 transition-all", isDark ? "bg-white/10 border-white/10 focus:ring-yellow-400/50" : "bg-slate-50 border-slate-200 focus:ring-blue-500/50")} 
                                    placeholder="joao@exemplo.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Mensagem Especial</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={cn("w-full px-4 py-3 rounded-xl outline-none focus:ring-2 transition-all resize-none", isDark ? "bg-white/10 border-white/10 focus:ring-yellow-400/50" : "bg-slate-50 border-slate-200 focus:ring-blue-500/50")} 
                                    placeholder="Escreva algo inspirador..."
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className={cn(
                                "w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all",
                                isDark ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300" : "bg-blue-600 text-white hover:bg-blue-700"
                            )}
                        >
                            Ir para Pagamento <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="text-center py-12"
                    >
                        <div className={cn(
                            "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6",
                            isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
                        )}>
                            <Check className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Pedido Confirmado!</h2>
                        <p className="opacity-70 mb-8 max-w-md mx-auto">
                            O Gift Card foi enviado para <strong>{formData.recipientEmail}</strong>. Uma cópia do recibo foi enviada para você.
                        </p>
                        <Link href="/">
                            <Button variant="outline" className={cn("h-12 px-8 rounded-xl", isDark ? "border-white/20 hover:bg-white/10 text-white" : "")}>
                                Voltar para Home
                            </Button>
                        </Link>
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

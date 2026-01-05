"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gift, GraduationCap, Plane, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GiftCardPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm uppercase tracking-wide mb-6">
            <Gift className="w-4 h-4" />
            Presenteie o Futuro
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Dê o Primeiro Passo para o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Sonho Italiano
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Conhece alguém que sonha em estudar na Itália? Nossos Gift Cards são a maneira perfeita de apoiar essa jornada, oferecendo consultoria especializada e planejamento de carreira.
          </p>
        </motion.div>
      </section>

      {/* Cards Selection */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Consultoria Express */}
          <Link href="/gift-card/express" className="group">
            <motion.div
              whileHover={{ y: -10 }}
              className="relative h-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Plane className="w-40 h-40 text-blue-600" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <Plane className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Consultoria Express</h3>
                <p className="text-slate-500 mb-6 flex-grow">
                  Ideal para tirar dúvidas pontuais e traçar um plano inicial. Um empurrãozinho para quem já sabe o que quer mas precisa de direção.
                </p>
                
                <div className="space-y-3 mb-8">
                  <Feature text="1 Hora de Videoconferência" />
                  <Feature text="Análise de Perfil" />
                  <Feature text="Guia de Universidades" />
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-slate-400 font-medium">A partir de</span>
                    <p className="text-3xl font-bold text-blue-600">€50</p>
                  </div>
                  <Button className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Mentoria Completa */}
          <Link href="/gift-card/mentoria" className="group">
            <motion.div
              whileHover={{ y: -10 }}
              className="relative h-full bg-slate-900 rounded-3xl p-8 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-40 h-40 text-yellow-400" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mb-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 fill-yellow-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Mentoria Completa</h3>
                <p className="text-slate-300 mb-6 flex-grow">
                  Acompanhamento total do início ao fim. Análise de documentos, busca de moradia e suporte burocrático completo.
                </p>
                
                <div className="space-y-3 mb-8">
                  <Feature text="3 Encontros Online" dark />
                  <Feature text="Suporte via WhatsApp" dark />
                  <Feature text="Revisão de Documentos" dark />
                  <Feature text="Auxílio Visto & Moradia" dark />
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-slate-400 font-medium">A partir de</span>
                    <p className="text-3xl font-bold text-yellow-400">€200</p>
                  </div>
                  <Button className="rounded-full w-12 h-12 p-0 bg-yellow-400 text-slate-900 hover:bg-yellow-500">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Footer / Trust */}
      <section className="container mx-auto px-4 mt-20 text-center">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-8">
          Presenteie com Confiança
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos if needed, using text for now */}
             <span className="text-xl font-bold text-slate-300">Google Pay</span>
             <span className="text-xl font-bold text-slate-300">Apple Pay</span>
             <span className="text-xl font-bold text-slate-300">Visa</span>
             <span className="text-xl font-bold text-slate-300">Mastercard</span>
        </div>
      </section>
    </div>
  );
}

function Feature({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${dark ? "bg-yellow-400/20 text-yellow-400" : "bg-blue-100 text-blue-600"}`}>
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className={`font-medium ${dark ? "text-slate-200" : "text-slate-600"}`}>
        {text}
      </span>
    </div>
  );
}

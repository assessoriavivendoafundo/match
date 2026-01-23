"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function EbookCTA() {
  return (
    <section className="py-12 md:py-20 bg-[#F0F4F8] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-primary rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative overflow-visible shadow-2xl max-w-5xl mx-auto"
        >
          {/* Background decorative circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <motion.div 
            className="w-full md:w-1/3 max-w-[280px] relative aspect-[3/4] z-10"
            whileHover={{ rotate: 0, scale: 1.05 }}
            initial={{ rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-black/20 blur-xl rounded-full transform translate-y-4" />
            <Image 
              src="https://static.wixstatic.com/media/633a67_cc0c51e69de1406ea65a371bd7ed4e22~mv2.png" 
              alt="E-book Guide" 
              fill 
              className="object-contain drop-shadow-2xl relative z-10"
            />
          </motion.div>

          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10 text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Descubra nosso E-book: O Guia Definitivo para Estudar na Itália
            </h2>
            <p className="text-sm md:text-base font-light opacity-90 leading-relaxed">
              Não sabe por onde começar? Juntamos tudo o que você precisa saber tudo num só lugar! 
              São mais de 40 páginas para te preparar e te aproximar do seu sonho!
            </p>
            <div className="pt-4">
              <Button 
                className="bg-[#FFD054] text-primary hover:bg-[#ffc633] font-bold px-10 py-6 rounded-full text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
              >
                Comprar
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

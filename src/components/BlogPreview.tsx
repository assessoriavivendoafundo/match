"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const placeholders = [1, 2, 3];

export function BlogPreview() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-10 md:mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-bold uppercase tracking-widest mb-3"
          >
            BLOG MORAR NA ITÁLIA - POR VIVENDO A FUNDO
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-display font-bold text-[#457B9D] mb-10 max-w-3xl mx-auto"
          >
            Descubra nossos insights valiosos, guias práticos e experiências reais para tornar sua vida na Itália mais fácil e incrível.
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {placeholders.map((i, index) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left group cursor-pointer"
              >
                <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                   {/* Placeholder shimmer effect could go here */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-100 opacity-50" />
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-100 w-3/4 rounded-full" />
                    <div className="h-3 bg-gray-50 w-full rounded-full" />
                    <div className="h-3 bg-gray-50 w-2/3 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" className="border-[#457B9D] text-[#457B9D] hover:bg-[#457B9D] hover:text-white rounded-full px-8 text-xs font-bold uppercase tracking-wider">
              Ver todos os posts
            </Button>
          </motion.div>
        </div>

        <div className="relative mt-32 h-[300px] md:h-[400px] w-full max-w-6xl mx-auto flex items-end justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute top-0 right-[10%] md:right-[25%] z-10 hidden md:block"
          >
            <div className="flex flex-col items-center">
              <p className="font-display text-2xl md:text-3xl text-primary text-center leading-none">
                Siga a gente e acompanhe <br/> 
                <span className="text-accent font-display font-bold">NOSSAS NOVIDADES</span>
              </p>
              <Image src="https://static.wixstatic.com/media/0b51a1_057bed1232be48caabccfd16f5c94629~mv2.png" alt="Arrow" width={80} height={50} className="mt-2 ml-12 rotate-12" />
            </div>
          </motion.div>
          
          <motion.div
             initial={{ y: 100, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="w-full h-full relative"
          >
              <Image 
                src="https://static.wixstatic.com/media/0b51a1_99d10fc538774751ba1debeaf1971b80~mv2.png" 
                alt="Italy Car Illustration" 
                fill
                className="object-contain object-bottom"
              />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Consultoria",
    description: "Um bate papo personalizado de acordo com as suas dúvidas e objetivos. Ideal para aqueles que precisam de uma mãozinha para alcançar o sonho de estudar na Itália.",
    features: [
        "Tire todas as dúvidas sobre cursos, universidades e processos seletivos.",
        "Duração e formato: Uma sessão online de 1h30 personalizada via Google Meet.",
        "Plano prático: Recebe um documento com um passo a passo detalhado, links e guias de documentos.",
        "Suporte pós-consultoria: Auxílio via WhatsApp para dúvidas posteriores."
    ],
    highlight: false,
    tag: null
  },
  {
    title: "Projeto completo Estudar na Itália",
    description: "Onde tudo começa! Você terá acesso a 10 módulos com mais de 40 aulas gravadas para aprender todo o processo de estudar na Itália e fazer as melhores escolhas.",
    features: [
        "Duração e formato: 40+ aulas gravadas para acompanhar no seu ritmo.",
        "Base de dados completa com informações de universidades e guias detalhados.",
        "Apoio em todas as etapas: desde a escolha do curso até sua chegada.",
        "Grupo de suporte no WhatsApp.",
        "Aulas ao vivo sobre trabalho na Itália.",
        "No plano premium: Biblioteca de conteúdo + Laboratório de correção."
    ],
    highlight: true,
    tag: "Mais escolhido"
  },
  {
    title: "Mentoria Individual",
    description: "Estude na Itália em 2025 com o nosso acompanhamento lado a lado durante todo o processo, desde a escolha do curso, até a sua chegada na Itália.",
    features: [
        "Duração e formato: Apoio durante todo o processo.",
        "Encontros personalizados.",
        "Materiais de apoio: Livros, simulados e apostilas.",
        "Correção especializada.",
        "Aulas de italiano: 1 mês com professora nativa.",
        "Suporte contínuo via WhatsApp.",
        "Planejamento completo.",
        "Ajuda prática com acomodação."
    ],
    highlight: false,
    tag: null
  },
  {
    title: "Projeto DSU: Bolsas regionais italianas",
    description: "Já foi aprovado e quer conquistar a sua bolsa de estudo por condição financeira? Então o Projeto DSU é o ideal para você!",
    features: [
        "Aplicação passo a passo com explicações práticas.",
        "Modelos prontos e materiais exclusivos.",
        "Templates, exemplos de documentos.",
        "Atualizações dos editais.",
        "Criado por quem vive isso de verdade."
    ],
    highlight: false,
    tag: "Já foi aprovado!"
  }
];

export function Services() {
  return (
    <section className="py-12 md:py-20 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest mb-3"
          >
            NOSSOS SERVIÇOS
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-display font-bold text-primary max-w-2xl mx-auto leading-tight"
          >
            Nós te ajudamos em cada etapa do processo, da forma que você preferir
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 pb-8 rounded-xl shadow-sm hover:shadow-xl transition-all flex flex-col relative h-full"
            >
              {service.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {service.tag}
                </div>
              )}
              
              <h3 className="text-xl font-display font-bold mb-4 text-center text-[#457B9D] mt-2">
                {service.title}
              </h3>
              
              <p className="text-[13px] text-gray-500 mb-6 text-center leading-relaxed font-light">
                {service.description}
              </p>

              <div className="flex justify-center mb-8">
                <Button className="bg-[#FFD054] text-primary hover:bg-[#ffc633] rounded-full font-bold text-xs px-8 shadow-sm">
                  Saber mais
                </Button>
              </div>

              <div className="mt-auto space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0 mt-1" />
                    <span className="text-[11px] text-gray-500 font-light leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { HallOfFame } from "@/components/HallOfFame";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <Benefits />
      
      <Services />

      <HallOfFame />

      <About />

      {/* E-book CTA - Rounded Container */}
      <section className="py-20 bg-[#F0F4F8]"> {/* Light blueish background for contrast */}
        <div className="container mx-auto px-4">
            <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
                <div className="w-full md:w-1/3 max-w-[280px] relative aspect-[3/4] rotate-[-5deg] hover:rotate-0 transition-transform duration-500 z-10">
                    <Image 
                    src="https://static.wixstatic.com/media/633a67_cc0c51e69de1406ea65a371bd7ed4e22~mv2.png" 
                    alt="E-book Guide" 
                    fill 
                    className="object-contain drop-shadow-2xl"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10 text-white">
                    <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                    Descubra nosso E-book: O Guia Definitivo para Estudar na Itália
                    </h2>
                    <p className="text-sm md:text-base font-light opacity-90 leading-relaxed">
                    Não sabe por onde começar? Juntamos tudo o que você precisa saber tudo num só lugar! 
                    São mais de 40 páginas para te preparar e te aproximar do seu sonho!
                    </p>
                    <div className="pt-4">
                        <Button className="bg-[#FFD054] text-primary hover:bg-[#ffc633] font-bold px-10 py-6 rounded-full text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all">
                        Comprar
                        </Button>
                    </div>
                </div>
                {/* Background decorative circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            </div>
        </div>
      </section>

      {/* Blog & Footer Illustration */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
           <div className="mb-16">
             <h3 className="text-accent text-xs font-bold uppercase tracking-widest mb-3">BLOG MORAR NA ITÁLIA - POR VIVENDO A FUNDO</h3>
             <h2 className="text-2xl md:text-3xl font-display font-bold text-[#457B9D] mb-10 max-w-3xl mx-auto">
               Descubra nossos insights valiosos, guias práticos e experiências reais para tornar sua vida na Itália mais fácil e incrível.
             </h2>
             
             {/* Blog Placeholders - Optional or simplified */}
             <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm text-left">
                        <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                        <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"></div>
                        <div className="h-3 bg-gray-100 w-full rounded"></div>
                    </div>
                ))}
             </div>

             <div className="flex justify-center">
                <Button variant="outline" className="border-[#457B9D] text-[#457B9D] hover:bg-[#457B9D] hover:text-white rounded-full px-8 text-xs font-bold uppercase tracking-wider">
                  Ver todos os posts
                </Button>
             </div>
           </div>

           <div className="relative mt-32 h-[400px] w-full max-w-6xl mx-auto flex items-end justify-center">
              <div className="absolute top-10 right-[20%] md:right-[30%] transform translate-x-12 -translate-y-12 z-10">
                 <div className="flex flex-col items-center">
                    <p className="font-display text-2xl md:text-3xl text-primary transform -rotate-6">Siga a gente e acompanhe <br/> <span className="text-accent font-display font-bold">NOSSAS NOVIDADES</span></p>
                    <Image src="https://static.wixstatic.com/media/0b51a1_057bed1232be48caabccfd16f5c94629~mv2.png" alt="Arrow" width={80} height={50} className="mt-2 ml-12 rotate-12" />
                 </div>
              </div>
              
              <Image 
                src="https://static.wixstatic.com/media/0b51a1_99d10fc538774751ba1debeaf1971b80~mv2.png" 
                alt="Italy Car Illustration" 
                width={980} 
                height={868}
                className="object-contain object-bottom w-full h-full"
              />
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

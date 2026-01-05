import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-[650px] lg:h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/633a67_c480bd0e060a4eab8128f773e9517f76~mv2.jpg/v1/fit/w_2500,h_1330,al_c/633a67_c480bd0e060a4eab8128f773e9517f76~mv2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" /> {/* Stronger Dark Blue overlay */}
      </div>

      {/* Wave Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[100px] fill-white">
            <path d="M985.66,92.83C906.67,72,823.78,31,432.84,92.83c-291.52,46.2-125.75,5.79-432.84,92.83v-185.66h1200v92.83Z" className="opacity-0"></path> {/* Placeholder for structure if needed */}
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19.08,82.68-38.64,125.5-46.7,60.6-11.37,122.28-4.73,181.75,17.13,54.74,20.12,107.72,46.24,163.73,63.26,76.93,23.17,160.73,18.23,234.77-17.13V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.86,117.94-8.67,176.73,1,70.21,11.59,137.72,36.65,209.23,46.7,69.84,9.81,141.67,6.23,210.6-12.71V0Z"></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-5xl pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight drop-shadow-xl">
          Chegou a hora de viver o <br />
          sonho de estudar na ITÁLIA
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl font-sans font-light mb-10 max-w-3xl mx-auto drop-shadow-md">
          <span className="font-bold">Com mais de 5 anos de experiência</span>, nós conhecemos cada passo para sua aprovação. 
          De forma personalizada, simplificamos o processo e garantimos que você esteja 
          preparado para estudar e viver na Itália, <span className="font-bold">transformando seu sonho em realidade!</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary font-bold text-sm uppercase tracking-widest px-8 py-6 rounded-full w-full sm:w-auto transition-all"
          >
            CONHECER OS SERVIÇOS
          </Button>
          
          <Button 
            variant="default" 
            size="lg" 
            className="bg-[#91C4E8] text-primary hover:bg-[#7AB0D8] font-bold text-sm uppercase tracking-widest px-8 py-6 rounded-full w-full sm:w-auto transition-all shadow-lg"
          >
            ENTRAR EM CONTATO
          </Button>
        </div>
      </div>
    </section>
  );
}
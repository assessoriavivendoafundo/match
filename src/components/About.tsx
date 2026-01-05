import Image from "next/image";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section className="py-12 md:py-24 bg-notebook relative overflow-hidden vertical-line-container">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">QUEM SOMOS</h3>
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-primary">
            Jacque e Gil, fundadores do Vivendo a Fundo e Academitaly
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Photo Polaroid */}
          <div className="w-full md:w-5/12 relative group px-4 md:px-0">
            <div className="relative transform -rotate-2 transition-transform duration-500 group-hover:rotate-0 bg-white p-3 shadow-xl">
               <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image 
                    src="https://static.wixstatic.com/media/633a67_72326898190e43e48acae68b9474d211~mv2.jpg" 
                    alt="Jacque e Gil" 
                    fill 
                    className="object-cover sepia-[.15]"
                />
               </div>
               {/* Tape effect placeholder if needed, but polaroid style is clean */}
            </div>
            
            {/* Post-it Note */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 w-32 h-32 bg-[#FFD054] shadow-md transform rotate-6 flex items-center justify-center p-4 text-center">
                <p className="font-hand text-primary text-xl leading-tight font-bold">
                    + 4 anos de experiência na Itália
                </p>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-6 text-primary text-sm md:text-base leading-relaxed pl-0 md:pl-8">
            <p className="font-light">
              Nossa jornada começou quando nos mudamos para a Itália em 2020 para fazer uma graduação. 
              Desde então, descobrimos o mundo através das viagens e percebemos que estudar fora é possível, 
              <span className="font-bold"> mas pode parecer um desafio enorme sem a orientação certa.</span>
            </p>
            <p className="font-light">
              Vimos muitas pessoas com o mesmo sonho, mas sem saber por onde começar. 
              Foi aí que decidimos usar nossa experiência para criar algo que realmente fizesse a diferença. 
              Assim nasceu o <span className="font-bold">AcademItaly – um projeto feito de histórias reais, desafios superados e, acima de tudo, muita paixão por ajudar.</span>
            </p>
            <p className="italic text-gray-500 font-light border-l-2 border-accent pl-4">
              Se você quer transformar esse sonho em realidade, estamos aqui para te guiar nessa jornada!
            </p>
            
            <div className="pt-6 flex flex-col items-center md:items-start gap-4">
               <p className="text-primary font-bold text-lg italic font-display">Ficou com alguma dúvida? Converse com a gente</p>
               <Button className="bg-[#FFD054] text-primary hover:bg-[#ffc633] rounded-full font-bold px-8 shadow-sm text-xs uppercase tracking-wider">
                 Entrar em Contato
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

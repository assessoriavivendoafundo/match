import Image from "next/image";
import { cn } from "@/lib/utils";

const benefitsGlobal = [
  {
    icon: "https://static.wixstatic.com/media/0b51a1_2932a412122345a5858d8e1116a141c6~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/school-outline.png",
    title: "Diplomas com reconhecimento global:",
    description: "obtenha uma formação válida em toda a Europa e nos Estados Unidos."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_30aa2ce1b16a4ce49e1a61c5414125cd~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/checkmark-circle-outline.png",
    title: "Custo acessível de educação:",
    description: "aproveite mensalidades mais baixas em comparação a outros países."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_297d144b580c401ba2760dc6f085aee8~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/briefcase-outline.png",
    title: "Oportunidades de trabalho:",
    description: "estude e trabalhe legalmente, ganhando experiência internacional."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_ba78e6d8d1b048a6ab60523bb626315d~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/color-palette-outline.png",
    title: "Cultura e história inspiradoras:",
    description: "viva no coração da arte, arquitetura e inovação."
  }
];

const benefitsBrazil = [
  {
    icon: "https://static.wixstatic.com/media/0b51a1_69abef97df0449f2bb77ed4768199e9d~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/library-outline.png",
    title: "Estude com mensalidades reduzidas ou até gratuitamente:",
    description: "brasileiros têm acesso a condições diferenciadas de pagamento nas universidades italianas."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_083b9d789dae4ffa965b7b83b8fdf7a6~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/clipboard-outline.png",
    title: "Processo seletivo simplificado:",
    description: "sem a complexidade de vestibulares tradicionais no Brasil."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_42b0ce6dabe0444a8552d927e3ebbddd~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/golf-outline.png",
    title: "Possibilidade de bolsas baseadas na sua realidade econômica:",
    description: "acesso a benefícios exclusivos para quem deseja realizar o sonho de estudar fora."
  },
  {
    icon: "https://static.wixstatic.com/media/0b51a1_021b639e91d042159415b53353cb2513~mv2.png/v1/fill/w_45,h_45,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chatbubbles-outline.png",
    title: "Comunidade acolhedora:",
    description: "viva em um país que valoriza a diversidade cultural e acolhe estudantes estrangeiros."
  }
];

export function Benefits() {
  return (
    <section className="py-16 container mx-auto px-4 relative">
      {/* Logos Section */}
      <div className="mb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-12">
          +500 alunos e mentorados aprovados!
        </h2>
        {/* Logos Strip - Styled to mimic reference */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale mix-blend-multiply">
           <div className="flex flex-col items-center">
             <span className="text-sm font-serif uppercase tracking-widest text-primary font-bold">Politecnico</span>
             <span className="text-xs font-serif uppercase tracking-widest text-primary">Di Milano</span>
           </div>
           <div className="flex flex-col items-center border-l-2 border-gray-300 pl-8">
             <span className="text-sm font-serif uppercase tracking-widest text-primary font-bold">Alma Mater Studiorum</span>
             <span className="text-xs font-serif uppercase tracking-widest text-primary">Università di Bologna</span>
           </div>
           <div className="flex flex-col items-center border-l-2 border-gray-300 pl-8">
             <span className="text-sm font-serif uppercase tracking-widest text-primary font-bold">Sapienza</span>
             <span className="text-xs font-serif uppercase tracking-widest text-primary">Università di Roma</span>
           </div>
           <div className="flex flex-col items-center border-l-2 border-gray-300 pl-8">
             <span className="text-sm font-serif uppercase tracking-widest text-primary font-bold">Università</span>
             <span className="text-xs font-serif uppercase tracking-widest text-primary">Di Firenze</span>
           </div>
        </div>
      </div>

      {/* Vertical Line Container */}
      <div className="relative vertical-line-container">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Column - Illustration (Swapped to Right in content flow, but Visual Left in Ref) */}
          {/* Wait, Ref shows Illustration on Left for "Por que estudar..."?
              Ref: Top block: Italy Illustration (Left) + Text (Right).
              Bottom block: Text (Left) + Food Illustration (Right).
          */}
          
          <div className="flex justify-center md:justify-end order-2 md:order-1 relative">
             {/* The red line is actually on the left of the page content? 
                 In the ref, there is a red line running down the LEFT side of the entire content block.
                 My `vertical-line-container` handles this.
             */}
            <Image 
              src="https://static.wixstatic.com/media/0b51a1_985532c0da614c5e8cf8bb72a639c3b0~mv2.png/v1/fill/w_455,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/italy-watercolor-composition-1.png" 
              alt="Italy Illustration" 
              width={455} 
              height={338} 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* Right Column - Text */}
          <div className="space-y-10 order-1 md:order-2 pl-4 md:pl-0">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary"> {/* Blue title in ref */}
              Por que estudar na Itália e na Europa é uma oportunidade única?
            </h3>
            <div className="space-y-8">
              {benefitsGlobal.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <Image src={item.icon} alt="" width={40} height={40} className="flex-shrink-0 opacity-80" />
                  <p className="text-primary text-sm leading-relaxed">
                    <span className="font-bold block mb-1">{item.title}</span> {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-10 pl-4 md:pl-0">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary">
              Quais são as vantagens para brasileiros?
            </h3>
            <div className="space-y-8">
              {benefitsBrazil.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <Image src={item.icon} alt="" width={40} height={40} className="flex-shrink-0 opacity-80" />
                  <p className="text-primary text-sm leading-relaxed">
                    <span className="font-bold block mb-1">{item.title}</span> {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex justify-center md:justify-start">
            <Image 
              src="https://static.wixstatic.com/media/0b51a1_1ab3b90c6e5247b7b3f43f9cd1585587~mv2.png/v1/fill/w_437,h_345,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/italy-watercolor-composition-2.png" 
              alt="Italy Food Illustration" 
              width={437} 
              height={345} 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
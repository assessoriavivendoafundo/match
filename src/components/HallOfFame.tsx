import Image from "next/image";

export function HallOfFame() {
  const students = [
    // ... same students ...
    {
      name: "Vanessa M.",
      course: "Master Marketing and...",
      uni: "Rome Business School",
      img: "https://static.wixstatic.com/media/0b51a1_147d7c9a4e844264bafe653a67f8c529~mv2.png/v1/fit/w_251,h_250,q_75,enc_avif,quality_auto/0b51a1_147d7c9a4e844264bafe653a67f8c529~mv2.png"
    },
    {
      name: "Marcelo S.",
      course: "Italian Medieval and...",
      uni: "Università degli Studi...",
      img: "https://static.wixstatic.com/media/0b51a1_763d00b2df2849c4b99fafea05ed1c68~mv2.png/v1/fit/w_251,h_250,q_75,enc_avif,quality_auto/0b51a1_763d00b2df2849c4b99fafea05ed1c68~mv2.png"
    },
    {
      name: "Iaraí V.",
      course: "Global politics and society",
      uni: "Università degli Studi...",
      img: "https://static.wixstatic.com/media/0b51a1_3b994cb903ea4d33a1f1035d4d911321~mv2.png/v1/fit/w_251,h_250,q_75,enc_avif,quality_auto/0b51a1_3b994cb903ea4d33a1f1035d4d911321~mv2.png"
    },
    {
      name: "Gabrielle F.",
      course: "Master in International...",
      uni: "Università degli Studi...",
      img: "https://static.wixstatic.com/media/0b51a1_268da03d029b467783f51dab4ba2f48d~mv2.png/v1/fit/w_251,h_250,q_75,enc_avif,quality_auto/0b51a1_268da03d029b467783f51dab4ba2f48d~mv2.png"
    },
    {
        name: "Valéria M.",
        course: "Psicologia",
        uni: "Università degli Studi...",
        img: "https://static.wixstatic.com/media/0b51a1_dda76b36882a4ae3b8c0eddaac9541c7~mv2.png/v1/fit/w_251,h_250,q_75,enc_avif,quality_auto/0b51a1_dda76b36882a4ae3b8c0eddaac9541c7~mv2.png"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">HALL DOS APROVADOS</h3>
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-8 md:mb-12">
          Conheça quem já conquistou sua vaga em <br className="hidden md:block"/>
          universidades italianas com a nossa ajuda
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {students.map((student, i) => (
            <div key={i} className="flex flex-col items-center w-40 md:w-48 group cursor-default">
              <div className="w-full aspect-square relative mb-4 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 bg-white/10">
                <Image src={student.img} alt={student.name} fill className="object-cover" />
              </div>
              <h4 className="font-bold text-xs text-accent mb-1">{student.name}</h4>
              <p className="text-[10px] text-gray-300 font-light leading-tight">{student.course}</p>
            </div>
          ))}
        </div>
        
        <p className="mt-16 text-accent italic font-display text-xl opacity-90">
          Você pode ser o próximo a fazer parte dessa história!
        </p>
      </div>
    </section>
  );
}

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { HallOfFame } from "@/components/HallOfFame";
import { Footer } from "@/components/Footer";
import { EbookCTA } from "@/components/EbookCTA";
import { BlogPreview } from "@/components/BlogPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <Benefits />
      
      <Services />

      <HallOfFame />

      <About />

      <EbookCTA />

      <BlogPreview />

      <Footer />
    </main>
  );
}
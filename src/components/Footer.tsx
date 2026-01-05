import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           {/* Simple Logo Placeholder */}
           <span className="font-display font-bold text-lg">ACADEMITALY</span>
        </div>
        
        <p className="text-xs text-gray-300 text-center">
          Copyright © 2026 Vivendo a Fundo - Todos os direitos reservados
        </p>

        <div className="flex gap-4">
          <Link href="#" className="hover:text-accent transition-colors">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-accent transition-colors">
            <Youtube className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Instagram, Youtube, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Estudar na Itália", href: "#" },
  { name: "Gift Card", href: "/gift-card" },
  { name: "Blog", href: "#" },
  { name: "Nossa História", href: "#" },
  { name: "Contato", href: "#" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-48 h-16">
            <Image
              src="https://static.wixstatic.com/media/633a67_be4f04e97582467cbc66dc96e46e658a~mv2.png/v1/crop/x_319,y_234,w_613,h_597/fill/w_46,h_42,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Blue%20and%20White%20Simple%20Education%20Logo.png"
              alt="Vivendo a Fundo Logo"
              width={60}
              height={60}
              className="object-contain"
            />
             <span className="absolute left-14 top-1/2 -translate-y-1/2 text-lg md:text-xl font-bold text-primary whitespace-nowrap">
               ACADEMITALY
             </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-primary hover:text-secondary text-sm font-light uppercase tracking-wide transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/unimatch">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 text-blue-900 hover:scale-105 font-black text-xs uppercase tracking-widest px-4 py-1 rounded-full shadow-md border border-white/20 hover:shadow-lg transition-transform ml-2"
            >
              🇮🇹 UniMatch 🇧🇷
            </Button>
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary">
            <Search className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
             <Link href="#" className="text-primary hover:text-secondary">
               <Instagram className="w-5 h-5" />
             </Link>
             <Link href="#" className="text-primary hover:text-secondary">
               <Youtube className="w-5 h-5" />
             </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-6 absolute top-24 left-0 w-full shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary hover:text-secondary text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <Link href="/unimatch" onClick={() => setIsOpen(false)}>
              <Button 
                className="w-full bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 text-blue-900 hover:scale-[1.02] font-black text-sm uppercase tracking-widest py-6 rounded-full shadow-md border border-white/20 transition-all"
              >
                🇮🇹 UniMatch 🇧🇷
              </Button>
            </Link>

             <div className="flex items-center gap-6 mt-4 pt-6 border-t border-gray-100">
               <Link href="#" className="text-primary hover:text-secondary p-2 border rounded-full">
                 <Instagram className="w-6 h-6" />
               </Link>
               <Link href="#" className="text-primary hover:text-secondary p-2 border rounded-full">
                 <Youtube className="w-6 h-6" />
               </Link>
             </div>
          </nav>
        </div>
      )}
    </header>
  );
}

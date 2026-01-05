import type { Metadata } from "next";
import { Montserrat, Sansita, Caveat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const sansita = Sansita({
  weight: ["400", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sansita",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivendo a Fundo LTDA | Estudar na Itália",
  description: "Quer estudar na Itália? Oferecemos consultoria especializada, suporte completo para bolsas de estudo, documentação, visto e acomodação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${sansita.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

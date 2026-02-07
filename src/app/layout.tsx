import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#182335",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://academitaly.com.br"),
  title: "Match Universitário | Encontre sua Universidade na Itália",
  description: "Descubra a universidade ideal para você na Itália com o Match Universitário. Quiz rápido de 3 perguntas para encontrar as melhores instituições estatais italianas.",
  keywords: ["estudar na itália", "match universitário", "universidades italianas", "intercâmbio itália", "bolsa de estudo itália", "viver na itália", "academitaly"],
  authors: [{ name: "AcademItaly" }],
  openGraph: {
    title: "Match Universitário | Encontre sua Universidade na Itália",
    description: "Encontre sua universidade italiana ideal em minutos. Quiz interativo e gratuito para brasileiros.",
    url: "https://academitaly.com.br",
    siteName: "AcademItaly",
    images: [
      {
        url: "/VISUALIZAR PALETA ACADEMITALY.png", // Using an existing image as placeholder for OG
        width: 1200,
        height: 630,
        alt: "Match Universitário - AcademItaly",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Match Universitário | Encontre sua Universidade na Itália",
    description: "Descubra a universidade ideal para você na Itália com o Match Universitário.",
    images: ["/VISUALIZAR PALETA ACADEMITALY.png"],
  },
  alternates: {
    canonical: "https://academitaly.com.br",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Match Universitário",
  "url": "https://academitaly.com.br",
  "description": "Descubra a universidade ideal para você na Itália com o Match Universitário. Quiz rápido de 3 perguntas para encontrar as melhores instituições estatais italianas.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "author": {
    "@type": "Organization",
    "name": "AcademItaly"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

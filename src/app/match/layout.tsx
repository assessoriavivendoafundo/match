import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Universitário | Encontre sua Universidade na Itália",
  description: "Descubra a universidade ideal para você na Itália com o Match Universitário. Quiz rápido de 3 perguntas para encontrar as melhores instituições estatais italianas.",
  keywords: ["estudar na itália", "match universitário", "universidades italianas", "intercâmbio itália", "bolsa de estudo itália", "viver na itália", "academitaly"],
  authors: [{ name: "AcademItaly" }],
  openGraph: {
    title: "Match Universitário | Encontre sua Universidade na Itália",
    description: "Encontre sua universidade italiana ideal em minutos. Quiz interativo e gratuito para brasileiros.",
    url: "https://academitaly.com.br/match",
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
    canonical: "https://academitaly.com.br/match",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Match Universitário",
  "url": "https://academitaly.com.br/match",
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

export default function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

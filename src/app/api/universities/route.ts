import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export type University = {
  id: string;
  name: string;
  city: string;
  region: 'north' | 'center' | 'south';
  is_big_city: boolean;
  humanities: boolean;
  social: boolean;
  health: boolean;
  stem: boolean;
  description: string;
  image: string;
  match_score: string;
};

const mapRegion = (csvArea: string): 'north' | 'center' | 'south' => {
  const normalized = csvArea?.toLowerCase().trim();
  if (normalized === 'norte') return 'north';
  if (normalized === 'centro') return 'center';
  if (normalized === 'sul e ilhas' || normalized === 'sul') return 'south';
  return 'center';
};

const parseBool = (val: string): boolean => val?.toUpperCase() === 'TRUE';

const enhanceDescription = (text: string): string => {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const keywords = [
    "história", "tradição", "fundada", "prestígio", "excelência", "pesquisa", 
    "inovação", "internacional", "campus", "cursos", "reconhecimento", 
    "qualidade", "alunos", "cidade", "cultura", "arte", "ciência", 
    "tecnologia", "laboratórios", "biblioteca", "multidisciplinar", 
    "estatal", "pública", "renomada", "antiga", "moderna", "sustentabilidade",
    "oportunidades", "intercâmbio", "vivência", "Europa", "Itália", "Mundo"
  ];

  return sentences.map(sentence => {
    if (sentence.includes('**')) return sentence;
    let processed = sentence;
    let found = false;

    for (const keyword of keywords) {
      const regex = new RegExp(`\b(${keyword})\b`, 'i');
      if (regex.test(processed)) {
        processed = processed.replace(regex, '**$1**');
        found = true;
        break;
      }
    }

    if (!found) {
        const properNounMatch = processed.match(/(?<=[\s])([A-ZÀ-Ú][a-zà-ú]{3,})(?=\b)/);
        if (properNounMatch) {
            processed = processed.replace(properNounMatch[0], `**${properNounMatch[0]}**`);
            found = true;
        }
    }

    if (!found) {
        const words = processed.split(/\s+/).map(w => w.replace(/[^a-zA-Zà-úÀ-Ú]/g, ""));
        const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
        if (longest.length > 5) {
            const regex = new RegExp(`\b${longest}\b`);
            processed = processed.replace(regex, `**${longest}**`);
        }
    }

    return processed;
  }).join("");
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      region: searchParams.getAll('region'),
      area: searchParams.getAll('area'),
      citySize: searchParams.getAll('citySize'),
    };

    const filePath = path.join(process.cwd(), 'src/data/DatabaseUniMatch.csv');
    const csvText = fs.readFileSync(filePath, 'utf8');

    const results = Papa.parse(csvText, { header: true });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let universities = results.data.map((row: any, index: number) => ({
      id: String(index),
      name: row['NomeEsteso'] || row['NomeOperativo'] || 'Universidade',
      city: row['Cidade'] || 'Itália',
      region: mapRegion(row['Área']),
      is_big_city: parseBool(row['Grandes Centros (150k)']),
      humanities: parseBool(row['Artística, Literária e Educação']),
      social: parseBool(row['Econômica, Jurídica e Social']),
      health: parseBool(row['iências da Saúde, Agrárias e Veterinária']),
      stem: parseBool(row['STEM']),
      description: enhanceDescription(row['Descrizione'] || "Uma excelente universidade italiana."),
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
      match_score: String(Math.floor(Math.random() * 15) + 85),
    })) as University[];

    // Server-side filtering
    if (filters.region.length > 0 && !filters.region.includes('any')) {
       universities = universities.filter(u => filters.region.includes(u.region));
    }
    
    if (filters.citySize.length > 0 && !filters.citySize.includes('any')) {
        universities = universities.filter(u => {
           const isBig = filters.citySize.includes('big');
           const isSmall = filters.citySize.includes('small');
           if (isBig && isSmall) return true;
           if (isBig) return u.is_big_city;
           if (isSmall) return !u.is_big_city;
           return true;
        });
    }

    if (filters.area.length > 0 && !filters.area.includes('any')) {
        universities = universities.filter(u => {
            if (filters.area.includes('humanities') && u.humanities) return true;
            if (filters.area.includes('social') && u.social) return true;
            if (filters.area.includes('health') && u.health) return true;
            if (filters.area.includes('stem') && u.stem) return true;
            return false;
        });
    }

    return NextResponse.json(universities);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}

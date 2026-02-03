import Papa from 'papaparse';

export type University = {
  id: string;
  name: string;
  city: string;
  region: 'north' | 'center' | 'south'; // Mapped from "Área" column in CSV (Centro, Norte, Sul e Ilhas)
  is_big_city: boolean; // Mapped from "Grandes Centros (150k)"
  
  // Disciplinary Areas (Booleans)
  humanities: boolean;
  social: boolean;
  health: boolean;
  stem: boolean;

  description: string;
  image: string; // Missing in CSV, need default
  match_score: string; // Generated
};

// Helper to map CSV "Área" (Macro-region) to our IDs
const mapRegion = (csvArea: string): 'north' | 'center' | 'south' => {
  const normalized = csvArea?.toLowerCase().trim();
  if (normalized === 'norte') return 'north';
  if (normalized === 'centro') return 'center';
  if (normalized === 'sul e ilhas' || normalized === 'sul') return 'south';
  return 'center'; // Fallback
};

// Helper to parse boolean strings "TRUE"/"FALSE"
const parseBool = (val: string): boolean => val?.toUpperCase() === 'TRUE';

// Helper to enhance description with bold text
const enhanceDescription = (text: string): string => {
  if (!text) return "";
  
  // Split into sentences (preserving delimiters)
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
    // If already has bold, return as is
    if (sentence.includes('**')) return sentence;

    let processed = sentence;
    let found = false;

    // 1. Try to find a high-value keyword
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
      if (regex.test(processed)) {
        processed = processed.replace(regex, '**$1**');
        found = true;
        break; // Stop after first highlight to avoid clutter
      }
    }

    // 2. If no keyword, try finding a significant Proper Noun (not at start)
    if (!found) {
        // Regex looks for Capitalized word not at the very start of the sentence string
        const properNounMatch = processed.match(/(?<=[\s])([A-ZÀ-Ú][a-zà-ú]{3,})(?=\b)/);
        if (properNounMatch) {
            processed = processed.replace(properNounMatch[0], `**${properNounMatch[0]}**`);
            found = true;
        }
    }

    // 3. Fallback: Highlight the longest meaningful word
    if (!found) {
        const words = processed.split(/\s+/).map(w => w.replace(/[^a-zA-Zà-úÀ-Ú]/g, ""));
        const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
        if (longest.length > 5) {
            const regex = new RegExp(`\\b${longest}\\b`);
            processed = processed.replace(regex, `**${longest}**`);
        }
    }

    return processed;
  }).join("");
};

let cachedDataPromise: Promise<University[]> | null = null;

export async function getUniversities(): Promise<University[]> {
  if (cachedDataPromise) {
    return cachedDataPromise;
  }

  cachedDataPromise = (async () => {
    try {
      const csvText = await (await fetch('/DatabaseUniMatch.csv')).text(); 
      
      return new Promise<University[]>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parsedData = results.data.map((row: any, index: number) => ({
              id: String(index),
              name: row['NomeEsteso'] || row['NomeOperativo'] || 'Universidade',
              city: row['Cidade'] || 'Itália',
              region: mapRegion(row['Área']), // Mapping the "Área" column which contains 'Centro', 'Norte', etc.
              is_big_city: parseBool(row['Grandes Centros (150k)']),
              
              humanities: parseBool(row['Artística, Literária e Educação']),
              social: parseBool(row['Econômica, Jurídica e Social']),
              health: parseBool(row['iências da Saúde, Agrárias e Veterinária']), // Handling typo
              stem: parseBool(row['STEM']),

              description: enhanceDescription(row['Descrizione'] || "Uma excelente universidade italiana."),
              image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000", // Placeholder
              match_score: String(Math.floor(Math.random() * 15) + 85), // Random 85-99%
            })) as University[];
            
            resolve(parsedData);
          },
          error: (error: Error) => {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error("Error loading universities:", error);
      return [];
    }
  })();

  return cachedDataPromise;
}
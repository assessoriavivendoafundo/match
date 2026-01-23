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

export async function getUniversities(): Promise<University[]> {
  try {
    const csvText = await (await fetch('/DatabaseUniMatch.csv')).text(); 
    
    return new Promise((resolve, reject) => {
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

            description: row['Descrizione'] || "Uma excelente universidade italiana.",
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
}
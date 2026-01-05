import Papa from 'papaparse';

export type University = {
  id: string;
  name: string;
  city: string;
  region: 'north' | 'center' | 'south';
  budget_tag: 'low' | 'medium' | 'high';
  area_tag: 'tech' | 'health' | 'creative';
  tuition: string;
  description: string;
  image: string;
  match_score: string;
};

export async function getUniversities(): Promise<University[]> {
  try {
    const response = await fetch('/universities.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data as University[]);
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
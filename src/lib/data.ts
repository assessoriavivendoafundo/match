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

export async function getUniversities(filters?: Record<string, string | string[]>): Promise<University[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else if (value) {
          params.append(key, value);
        }
      });
    }

    const res = await fetch(`/api/universities?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
}

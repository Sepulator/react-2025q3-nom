import type { EmissionsByCountry } from '@/types/emissions';

export const getEmissionsByCountry = async () => {
  const response = await fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch emissions data');
  }
  return response.json() as Promise<EmissionsByCountry>;
};

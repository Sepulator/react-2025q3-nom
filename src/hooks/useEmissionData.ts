import type { EmissionsByCountry } from '@/types/emissions';

import emissions from '@/assets/owid-co2-data.json' with { type: 'json' };

const emissionsData = emissions as EmissionsByCountry;

export const useEmissionsData = () => {
  const emissions = Object.entries(emissionsData);

  const countries = emissions.reduce<string[]>((acc, [country, data]) => {
    if (data.iso_code) {
      acc.push(country);
    }
    return acc;
  }, []);

  const years = emissions[0][1].data.map((entry) => entry.year.toString());

  return {
    countries,
    emissions,
    years,
  };
};

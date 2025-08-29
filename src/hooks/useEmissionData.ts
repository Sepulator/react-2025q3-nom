import { useEffect, useState } from 'react';

import type { EmissionsByCountry } from '@/types/emissions';

import { countriesByRegion } from '@/assets/countriesByRegion';
import emissionsJson from '@/assets/owid-co2-data.json' with { type: 'json' };

const emissionsData = emissionsJson as unknown as EmissionsByCountry;
const emissions = Object.entries(emissionsData);

export const useEmissionsData = () => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [filteredEmissions, setFilteredEmissions] = useState(emissions);

  const countries = emissions.reduce<string[]>((acc, [country, data]) => {
    if (data.iso_code) {
      acc.push(country);
    }
    return acc;
  }, []);

  const years = emissions[0][1].data.map((entry) => entry.year.toString());

  useEffect(() => {
    let result = Object.entries(emissionsData);

    if (selectedCountry) {
      result = result.filter(([country]) => country === selectedCountry);
    }

    if (selectedRegion && selectedRegion !== 'All') {
      const filteredCountries = countriesByRegion.filter((country) => country.region === selectedRegion);
      result = result.filter(([, emission]) =>
        filteredCountries.some((country) => country.iso_code === emission.iso_code)
      );
    }

    if (selectedYear) {
      result = result.map(([country, data]) => [
        country,
        {
          ...data,
          data: data.data.filter((item) => item.year.toString() === selectedYear),
        },
      ]);
    }

    setFilteredEmissions(result);
  }, [selectedCountry, selectedYear, selectedRegion]);

  return {
    countries,
    emissions: filteredEmissions,
    selectedCountry,
    selectedRegion,
    selectedYear,
    setSelectedCountry,
    setSelectedRegion,
    setSelectedYear,
    years,
  };
};

import { use, useEffect, useMemo, useRef, useState } from 'react';

import type { Emission, EmissionsData } from '@/types/emissions';
import type { SortConfig } from '@/types/sort-config';

import { countriesByRegion } from '@/assets/countriesByRegion';
import { getEmissionsByCountry } from '@/services/api';
import { filterByYear, sortEmissions } from '@/utils/emissions';

export const useEmissionsData = () => {
  const emissionsData = use(getEmissionsByCountry());
  const emissions = useMemo(() => Object.entries(emissionsData) as [string, EmissionsData][], [emissionsData]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ direction: 'asc', key: 'name' });

  const [selectedColumns, setSelectedColumns] = useState<(keyof Emission)[]>(['co2', 'co2_per_capita']);
  const [yearChanged, setYearChanged] = useState(false);
  const prevYearRef = useRef<string>('');

  const countries = useMemo(
    () =>
      emissions.reduce<string[]>((acc, [country, data]) => {
        if (data.iso_code) {
          acc.push(country);
        }
        return acc;
      }, []),
    [emissions]
  );

  const years = useMemo(
    () => emissions[0]?.[1]?.data.map((entry) => entry.year.toString()).reverse() || [],
    [emissions]
  );

  const filteredAndSortedEmissions = useMemo(() => {
    let result = emissions;

    if (selectedCountry) {
      result = result.filter(([country]) => country === selectedCountry);
    }

    if (selectedRegion && selectedRegion !== 'All') {
      const filteredCountries = countriesByRegion.filter((country) => country.region === selectedRegion);
      result = result.filter(([, emission]) =>
        filteredCountries.some((country) => country.iso_code === emission.iso_code)
      );
    }

    result = filterByYear(result, selectedYear);
    result = sortEmissions(result, sortConfig);

    return result;
  }, [emissions, selectedCountry, selectedRegion, selectedYear, sortConfig]);

  useEffect(() => {
    if (prevYearRef.current && prevYearRef.current !== selectedYear) {
      setYearChanged(true);
      const timer = setTimeout(() => setYearChanged(false), 1000);
      return () => clearTimeout(timer);
    }
    prevYearRef.current = selectedYear;
  }, [selectedYear]);

  return {
    countries,
    emissions: filteredAndSortedEmissions,
    selectedColumns,
    selectedCountry,
    selectedRegion,
    selectedYear,
    setSelectedColumns,
    setSelectedCountry,
    setSelectedRegion,
    setSelectedYear,
    setSortConfig,
    sortConfig,
    yearChanged,
    years,
  };
};

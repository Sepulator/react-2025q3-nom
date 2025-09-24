import type { EmissionsData } from '@/types/emissions';
import type { SortConfig } from '@/types/sort-config';

export const filterByYear = (emissions: [string, EmissionsData][], selectedYear: string): [string, EmissionsData][] => {
  if (!selectedYear) return emissions;

  return emissions.map(([country, data]) => [
    country,
    {
      ...data,
      data: data.data.filter((item) => item.year.toString() === selectedYear),
    },
  ]);
};

export const sortEmissions = (
  emissions: [string, EmissionsData][],
  sortConfig: SortConfig
): [string, EmissionsData][] => {
  return [...emissions].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
    }

    if (sortConfig.key === 'population') {
      const popA = a[1].data.at(-1)?.population || 0;
      const popB = b[1].data.at(-1)?.population || 0;
      return sortConfig.direction === 'asc' ? popA - popB : popB - popA;
    }

    return 0;
  });
};

export const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'] as const;

export interface CountriesByRegion {
  [key: string]: Country[];
}

export interface Country {
  iso_code: string;
  name: string;
  region: Region;
}

export type Region = (typeof regions)[number];

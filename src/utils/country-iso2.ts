import { countryISOMapping } from '@/consts/country-iso';

export function getCountryISO2(iso3Code: string) {
  return countryISOMapping[iso3Code as keyof typeof countryISOMapping].toLowerCase() || undefined;
}

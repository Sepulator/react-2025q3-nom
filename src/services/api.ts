import type { EmissionsByCountry } from '@/types/emissions';

let promise: null | Promise<EmissionsByCountry> = null;

export const getEmissionsByCountry = (): Promise<EmissionsByCountry> => {
  if (!promise) {
    promise = fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json').then((response) =>
      response.json()
    );
  }
  return promise;
};

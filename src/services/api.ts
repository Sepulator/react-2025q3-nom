import type { EmissionsByCountry } from '@/types/emissions';

let cache: EmissionsByCountry | null = null;
let promise: null | Promise<EmissionsByCountry> = null;

export const getEmissionsByCountry = () => {
  if (!promise) {
    promise = fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json')
      .then((response) => response.json())
      .then((json) => {
        cache = json;
        return json;
      });
  }

  return {
    read() {
      if (!cache) {
        throw promise;
      }
      return cache;
    },
  };
};

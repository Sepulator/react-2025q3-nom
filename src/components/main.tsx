import type { EmissionsByCountry } from '@/types/emissions';

import emissions from '@/assets/owid-co2-data.json' with { type: 'json' };
import { TableRow } from '@/components/table-row';

const emissionsData = emissions as EmissionsByCountry;

export function Main() {
  return (
    <main className="container">
      <table>
        <thead>
          <tr>
            <th scope="col">Flag</th>
            <th scope="col">Country</th>
            <th scope="col">Population</th>
            <th scope="col">Year</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(emissionsData).map(([key, value]) => {
            const data = value.data.at(-1);
            if (!data) {
              return null;
            }
            const { population, year } = data;
            return <TableRow country={key} data={{ population, year }} iso_code={value.iso_code} key={key} />;
          })}
        </tbody>
      </table>
    </main>
  );
}

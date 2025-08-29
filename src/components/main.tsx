import { SelectList } from '@/components/select-list';
import { TableRow } from '@/components/table-row';
import { useEmissionsData } from '@/hooks/useEmissionData';

import s from './main.module.css';

export function Main() {
  const { countries, emissions, years } = useEmissionsData();

  return (
    <main className="container">
      <table>
        <thead>
          <tr>
            <th scope="col">Flag</th>
            <th className={s.country} scope="col">
              <SelectList label="country" lists={countries} placeholder="Select country" />
            </th>
            <th scope="col">Population</th>
            <th className={s.year} scope="col">
              <SelectList label="year" lists={years} placeholder="Year" />
            </th>
          </tr>
        </thead>
        <tbody>
          {emissions.map(([key, value]) => {
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

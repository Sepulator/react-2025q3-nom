import { SelectList } from '@/components/select-list';
import { TableRow } from '@/components/table-row';
import { useEmissionsData } from '@/hooks/useEmissionData';

import s from './main.module.css';

export function Main() {
  const { countries, emissions, selectedCountry, selectedYear, setSelectedCountry, setSelectedYear, years } =
    useEmissionsData();

  return (
    <main className="container">
      <table>
        <thead>
          <tr>
            <th scope="col">Flag</th>
            <th className={s.country} scope="col">
              <SelectList
                label="country"
                list={countries}
                onChange={(value) => setSelectedCountry(value)}
                placeholder="Select country"
                value={selectedCountry}
              />
            </th>
            <th scope="col">Population</th>
            <th className={s.year} scope="col">
              <SelectList
                label="year"
                list={years}
                onChange={(value) => setSelectedYear(value)}
                placeholder="Year"
                value={selectedYear}
              />
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

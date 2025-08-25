import type { Emission } from '@/types/emissions';

import { getCountryISO2 } from '@/utils/country-iso2';

import s from './table-row.module.css';

interface Props {
  country: string;
  data: Emission;
  iso_code?: string;
}

export function TableRow({ country, data, iso_code }: Props) {
  if (!iso_code) {
    return null;
  }

  const formattedPopulation = new Intl.NumberFormat(undefined, {
    compactDisplay: 'short',
    notation: 'compact',
  }).format(data.population);

  return (
    <tr className={s.tableRow}>
      <th scope="row">
        <span className={`fi fi-${getCountryISO2(iso_code)}`}></span>
      </th>
      <td>{country}</td>
      {Object.entries(data).map(([key, value]) => {
        if (key === 'population') {
          return <td key={key}>{formattedPopulation}</td>;
        }
        return <td key={key}>{value ?? 'N/A'}</td>;
      })}
    </tr>
  );
}

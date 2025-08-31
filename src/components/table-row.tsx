import { memo } from 'react';

import type { Emission } from '@/types/emissions';

import { getCountryISO2 } from '@/utils/country-iso2';

import s from './table-row.module.css';

interface Props {
  country: string;
  data: Emission;
  iso_code?: string;
  region: string;
  selectedColumns: (keyof Emission)[];
}

const options: Intl.NumberFormatOptions = {
  compactDisplay: 'short',
  notation: 'compact',
};

export const TableRow = memo(function TableRow({ country, data, iso_code, region, selectedColumns }: Props) {
  if (!iso_code) {
    return null;
  }

  const formattedPopulation =
    data.population !== undefined ? new Intl.NumberFormat(undefined, options).format(data.population) : 'N/A';

  return (
    <tr className={s.tableRow}>
      <th scope="row">
        <span className={`fi fi-${getCountryISO2(iso_code)}`}></span>
      </th>
      <td>{country}</td>
      <td>{region}</td>
      <td>{formattedPopulation}</td>
      <td>{data.year}</td>
      {selectedColumns.map((column) => {
        const value = data[column];
        const formattedValue =
          typeof value === 'number' ? new Intl.NumberFormat(undefined, options).format(value) : value;
        return <td key={column}>{formattedValue ?? 'N/A'}</td>;
      })}
    </tr>
  );
});

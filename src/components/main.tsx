import { useCallback, useState } from 'react';

import { countriesByRegion } from '@/assets/countriesByRegion';
import { ColumnSelector } from '@/components/column-selector';
import { Dialog } from '@/components/dialog';
import { DropDown } from '@/components/drop-down';
import { SelectList } from '@/components/select-list';
import { TableRow } from '@/components/table-row';
import { useEmissionsData } from '@/hooks/useEmissionData';
import { regions } from '@/types/region';

import s from './main.module.css';

export function Main() {
  const {
    countries,
    emissions,
    selectedColumns,
    selectedCountry,
    selectedRegion,
    selectedYear,
    setSelectedColumns,
    setSelectedCountry,
    setSelectedRegion,
    setSelectedYear,
    setSortConfig,
    sortConfig,
    years,
  } = useEmissionsData();

  const [isOpen, setIsOpen] = useState(false);

  const handleSort = useCallback(
    (key: 'name' | 'population') => {
      setSortConfig((currentSort) => {
        return currentSort.direction === 'asc' ? { direction: 'desc', key } : { direction: 'asc', key };
      });
    },
    [setSortConfig]
  );

  const getSortIcon = useCallback(
    (key: 'name' | 'population') => {
      if (sortConfig?.key !== key) {
        return '↕';
      }
      return sortConfig?.direction === 'desc' ? '↑' : '↓';
    },
    [sortConfig]
  );

  return (
    <main className="container">
      <button className="outline" onClick={() => setIsOpen(true)}>
        Select columns
      </button>
      {isOpen && (
        <Dialog handleClose={() => setIsOpen(false)} isOpen={isOpen} title="Select table columns">
          <ColumnSelector onColumnsChange={setSelectedColumns} selectedColumns={selectedColumns} />
        </Dialog>
      )}
      <table>
        <thead>
          <tr>
            <th scope="col">Flag</th>
            <th className={s.country} scope="col">
              <div className={s.row}>
                <SelectList
                  label="country"
                  list={countries}
                  onChange={(value) => setSelectedCountry(value)}
                  placeholder="Select country"
                  value={selectedCountry}
                />
                <span onClick={() => handleSort('name')}>{getSortIcon('name')}</span>
              </div>
            </th>
            <th className={s.region} scope="col">
              <DropDown
                defaultValue="All"
                label="region"
                list={Array.from(regions)}
                onChange={(value) => setSelectedRegion(value)}
                placeholder="Select region"
                value={selectedRegion}
              />
            </th>
            <th className={s.population} onClick={() => handleSort('population')} scope="col">
              Population {getSortIcon('population')}
            </th>
            <th className={s.year} scope="col">
              <DropDown
                defaultValue={years.at(0) ?? ''}
                label="year"
                list={years}
                onChange={(value) => setSelectedYear(value)}
                placeholder="Year"
                value={selectedYear}
              />
            </th>
            {selectedColumns.map((column) => (
              <th key={column} scope="col">
                {column.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emissions.map(([key, value]) => {
            const data = value.data.at(-1);
            if (!data) {
              return null;
            }
            const region = countriesByRegion.find((country) => country.iso_code === value.iso_code)?.region || 'N/A';
            return (
              <TableRow
                country={key}
                data={data}
                iso_code={value.iso_code}
                key={key}
                region={region}
                selectedColumns={selectedColumns}
              />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

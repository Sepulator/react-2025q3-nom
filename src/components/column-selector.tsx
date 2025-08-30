import type { Emission } from '@/types/emissions';

import { availableColumns } from '@/consts/columns';

interface Props {
  onColumnsChange: (columns: (keyof Emission)[]) => void;
  selectedColumns: (keyof Emission)[];
}

export function ColumnSelector({ onColumnsChange, selectedColumns }: Props) {
  const handleColumnToggle = (column: keyof Emission) => {
    const newColumns = selectedColumns.includes(column)
      ? selectedColumns.filter((col) => col !== column)
      : [...selectedColumns, column];
    onColumnsChange(newColumns);
  };

  return (
    <details className="dropdown">
      <summary>Selected Columns ({selectedColumns.length})</summary>
      <ul>
        {availableColumns.map((column) => (
          <li key={column}>
            <label>
              <input
                checked={selectedColumns.includes(column)}
                name={column}
                onChange={() => handleColumnToggle(column)}
                type="checkbox"
              />
              {column.replace(/_/g, ' ')}
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
}

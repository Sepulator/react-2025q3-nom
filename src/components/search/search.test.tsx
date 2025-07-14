import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, fireEvent, screen } from '@/__tests__/test-utils';
import { Search } from './search';
import { queryStorage } from '@/services/localstorage';

vi.mock('@/services/localstorage', () => ({
  queryStorage: {
    get: vi.fn(),
    save: vi.fn(),
  },
}));

describe('Search Component', () => {
  const handleQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and search button', () => {
    render(<Search handleQuery={handleQuery} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search handleQuery={handleQuery} />);
    const form = screen.getByRole('group');

    fireEvent.submit(form);

    expect(handleQuery).toHaveBeenCalledWith('');
    expect(queryStorage.save).toHaveBeenCalledWith('');
  });

  it('displays search term from localStorage on mount', () => {
    vi.mocked(queryStorage.get).mockReturnValue('batman');
    render(<Search handleQuery={handleQuery} />);

    expect(screen.getByRole('textbox')).toHaveValue('batman');
  });
});

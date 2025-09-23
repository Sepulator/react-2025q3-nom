import { describe, it, expect, vi } from 'vitest';
import { getDownloadMovieURL } from './utils';
import { mockBatmanMovie } from '@/__tests__/handlers';

describe('CSV utils', () => {
  it('should generate url link to download csv', () => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/blob');
    const url = getDownloadMovieURL(mockBatmanMovie.Search);
    expect(url).toMatch(/^blob:/);
  });
});

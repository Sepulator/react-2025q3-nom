import { describe, it, expect, vi } from 'vitest';
import { getDownloadMovieURL, getKey } from './utils';
import { mockBatmanMovie } from '@/__tests__/handlers';

describe('getKey', () => {
  it('return empty string for empty input', () => {
    expect(getKey('')).toBe('');
  });

  it('return same character for single character input', () => {
    expect(getKey('a')).toBe('a');
  });

  it('reverse string with multiple characters', () => {
    expect(getKey('helloabc123test!@#')).toBe('#@!tset321cbaolleh');
  });
});

describe('CSV utils', () => {
  it('should generate url link to download csv', () => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/blob');
    const url = getDownloadMovieURL(mockBatmanMovie.Search);
    expect(url).toMatch(/^blob:/);
  });
});

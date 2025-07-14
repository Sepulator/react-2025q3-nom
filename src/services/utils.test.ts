import { describe, it, expect } from 'vitest';
import { formatDate, getKey } from './utils';

describe('formatDate', () => {
  it('format ISO date string correctly', () => {
    const date = '2023-11-15T10:30:00Z';
    const result = formatDate(date);
    expect(result).toBe('Nov 15, 2023');
  });

  it('format regular date string correctly', () => {
    const date = 'December 25, 2023';
    const result = formatDate(date);
    expect(result).toBe('Dec 25, 2023');
  });
});
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

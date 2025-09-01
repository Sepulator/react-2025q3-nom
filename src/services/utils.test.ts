import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

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

  it('return "Invalid Date" for empty string', () => {
    const result = formatDate('');
    expect(result).toBe('Invalid Date');
  });

  it('return "Invalid Date" for malformed date', () => {
    const result = formatDate('2023-13-45');
    expect(result).toBe('Invalid Date');
  });

  it('return "Invalid Date" for invalid date string', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('Invalid Date');
  });
});

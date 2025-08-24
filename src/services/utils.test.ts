import { describe, it, expect } from 'vitest';
import { getKey } from './utils';

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

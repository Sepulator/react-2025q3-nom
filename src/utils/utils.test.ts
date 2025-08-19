import { getPasswordStrength } from '@/utils';
import { describe, expect, it } from 'vitest';

describe('Utils tests', () => {
  it('calculates password strength correctly', () => {
    expect(getPasswordStrength('')).toBe(0);
    expect(getPasswordStrength('weak')).toBe(1);
    expect(getPasswordStrength('Password')).toBe(3);
    expect(getPasswordStrength('Password123')).toBe(4);
    expect(getPasswordStrength('Password123!')).toBe(5);
  });
});

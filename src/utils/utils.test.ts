import { convertImageToBase64, getPasswordStrength } from '@/utils';
import { describe, expect, it, vi } from 'vitest';

describe('Utils tests', () => {
  it('calculates password strength correctly', () => {
    expect(getPasswordStrength('')).toBe(0);
    expect(getPasswordStrength('weak')).toBe(1);
    expect(getPasswordStrength('Password')).toBe(3);
    expect(getPasswordStrength('Password123')).toBe(4);
    expect(getPasswordStrength('Password123!')).toBe(5);
  });

  it('convert image file to base64 string', async () => {
    const mockFile = new File(['mock'], 'test.png', { type: 'image/png' });

    const mockResult = 'data:image/png;base64,mock-base64-content';
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null as (() => void) | null,
      result: mockResult,
    };

    global.FileReader = vi.fn(() => mockFileReader) as unknown as typeof FileReader;

    const promise = convertImageToBase64(mockFile);
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);

    mockFileReader.onload?.();
    const result = await promise;
    expect(result).toBe(mockResult);
  });
});

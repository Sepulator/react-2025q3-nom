import { renderHook, act } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const TEST_KEY = 'test-key';
  const TEST_VALUE = 'test-value';
  const INITIAL_VALUE = 'initial-value';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [value] = result.current;

    expect(value).toBe(INITIAL_VALUE);
  });

  it('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [value] = result.current;

    expect(value).toBe(TEST_VALUE);
  });

  it('should update localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [, setValue] = result.current;

    act(() => {
      setValue(TEST_VALUE);
    });

    const [value] = result.current;
    expect(value).toBe(TEST_VALUE);
    expect(JSON.parse(localStorage.getItem(TEST_KEY) || '')).toBe(TEST_VALUE);
  });

  it('should handle clearing the value', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [, setValue, clearValue] = result.current;

    act(() => {
      setValue(TEST_VALUE);
    });

    act(() => {
      clearValue();
    });

    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorage.setItem(TEST_KEY, 'invalid-json');

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [value] = result.current;

    expect(value).toBe(INITIAL_VALUE);
  });
});

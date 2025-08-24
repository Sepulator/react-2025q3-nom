import { LocalStorage } from './localstorage';
import { describe, beforeEach, it, expect } from 'vitest';

describe('LocalStorage', () => {
  const TEST_KEY = 'test-key';
  const TEST_DATA = 'test-data';
  const storage = new LocalStorage(TEST_KEY);

  beforeEach(() => {
    localStorage.clear();
  });

  it('save data to localStorage', () => {
    storage.save(TEST_DATA);
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(TEST_DATA));
  });

  it('retrieve saved data', () => {
    storage.save(TEST_DATA);
    expect(storage.get()).toBe(TEST_DATA);
  });

  it('return null for non-existent key', () => {
    expect(storage.get()).toBeNull();
  });

  it('handle invalid JSON', () => {
    localStorage.setItem(TEST_KEY, 'invalid-json');
    expect(storage.get()).toBeNull();
  });

  it('remove data for specific key', () => {
    storage.save(TEST_DATA);
    storage.clear();
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });
});

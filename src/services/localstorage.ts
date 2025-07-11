const QUERY = 'query-nom';

export class LocalStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

export const queryStorage = new LocalStorage<string>(QUERY);

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './node.js';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

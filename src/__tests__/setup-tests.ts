import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';
import { beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

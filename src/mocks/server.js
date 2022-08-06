import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configure request mocking server the given request handlers
export const server = setupServer(...handlers);
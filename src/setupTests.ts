// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toBeInTheDocument();
import '@testing-library/jest-dom';

// Mock for import.meta.env used in Vite
Object.defineProperty(global, 'import', {
  value: { meta: {
    env: {
      VITE_API_URL: 'http://localhost:3000',
      // Add any other environment variables used in tests here
    }
  }}
});
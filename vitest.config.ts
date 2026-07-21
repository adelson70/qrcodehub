import { defineConfig } from 'vitest/config';

/**
 * Vitest owns unit tests only.
 *
 * Without this, it discovers the Playwright specs under tests/e2e and fails on
 * `test.describe()` from a different runner. The two suites answer different
 * questions -- unit tests prove the encoding logic, Playwright proves the page
 * built from it actually works -- and they need different runtimes.
 */
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
  resolve: {
    alias: {
      '@': new URL('./src/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'),
    },
  },
});

import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the PRODUCTION build, not the dev server.
 *
 * The dev server serves unminified modules with HMR attached, so anything it
 * tells us about bundle behaviour, hydration timing or layout stability is
 * fiction. Port 4322 keeps it clear of a dev server on 4321.
 */
const PORT = 4322;

/**
 * Point the suite at an already-running server, for debugging only.
 *
 * `PW_BASE_URL=http://localhost:4321 pnpm test:e2e` runs everything against the
 * dev server instead of a fresh production build. Useful for answering "is this
 * a real bug or a stale dev server?" without guessing — which is exactly the
 * question that motivated adding it.
 */
const EXTERNAL = process.env.PW_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',

  use: {
    baseURL: EXTERNAL ?? `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },

  // Skipped when targeting an external server, so the debug run does not
  // silently rebuild and mask the very state being investigated.
  webServer: EXTERNAL
    ? undefined
    : {
        command: `pnpm build && pnpm preview --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Mobile is not a nice-to-have here: it is the majority of traffic for this
    // kind of tool, and several rules (no autofocus, single-column layout,
    // 44px touch targets) only manifest on a touch device.
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});

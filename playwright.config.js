// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,

  /* Reporter to use */
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    baseURL:
      process.env.BASE_URL ||
      'https://practicesoftwaretesting.com/',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
  },

  /* Configure projects */
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.js/,
    },
{
  name: 'chromium',
  dependencies: ['setup'],
  testIgnore: /.*\/api\/.*\.spec\.js/,
  use: {
    ...devices['Desktop Chrome'],
    storageState: 'playwright/.auth/user.json',
  },
},

    {
      name: 'firefox',
      testIgnore: /.*\/api\/.*\.spec\.js/,
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      testIgnore: /.*\/api\/.*\.spec\.js/,
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'api',
      testMatch: /.*\/api\/.*\.spec\.js/,
      use: {
        baseURL:
          process.env.API_BASE_URL ||
          'https://api.practicesoftwaretesting.com',
      },
    },
  ],
});



import { defineConfig, devices } from '@playwright/test';
import { env, authFile } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
  projects: [
    // 1) Logs in once per role and saves cookies + localStorage to playwright/.auth/*.json
    { name: 'setup', testMatch: /setup\/.*\.setup\.ts/ },

    // 2) Tests that start already logged in as the standard user
    {
      name: 'standard-user',
      testMatch: /authenticated\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: authFile.standard },
    },

    // 3) Tests that must NOT be logged in (login page, redirects)
    {
      name: 'anonymous',
      testMatch: /anonymous\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

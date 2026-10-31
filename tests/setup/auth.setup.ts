import { test as setup, expect } from '@playwright/test';
import { env, authFile } from '../../config/env';

const roles = [
  { name: 'standard', user: env.users.standard, file: authFile.standard },
  { name: 'visual', user: env.users.visual, file: authFile.visual },
] as const;

for (const role of roles) {
  setup(`authenticate as ${role.name} user`, async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill(role.user.username);
    await page.getByTestId('password').fill(role.user.password);
    await page.getByTestId('login-button').click();

    // Wait until the app has really logged us in before saving state.
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');

    await page.context().storageState({ path: role.file });
  });
}

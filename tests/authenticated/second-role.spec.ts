import { test, expect } from '@playwright/test';
import { authFile } from '../../config/env';

// Switch role for one file (or one describe block) by overriding storageState.
test.describe('as the visual user', () => {
  test.use({ storageState: authFile.visual });

  test('inventory loads for a different saved role', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
  });
});

test('two roles in one test using separate contexts', async ({ browser }) => {
  const standard = await browser.newContext({ storageState: authFile.standard });
  const visual = await browser.newContext({ storageState: authFile.visual });

  const a = await standard.newPage();
  const b = await visual.newPage();
  await a.goto('/inventory.html');
  await b.goto('/inventory.html');

  const cookieA = (await standard.cookies()).find((c) => c.name === 'session-username');
  const cookieB = (await visual.cookies()).find((c) => c.name === 'session-username');
  expect(cookieA?.value).toBe('standard_user');
  expect(cookieB?.value).toBe('visual_user');

  await standard.close();
  await visual.close();
});

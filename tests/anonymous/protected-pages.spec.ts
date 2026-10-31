import { test, expect } from '@playwright/test';

test('without saved state, the inventory page is blocked', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.getByTestId('error')).toContainText("You can only access '/inventory.html' when you are logged in.");
});

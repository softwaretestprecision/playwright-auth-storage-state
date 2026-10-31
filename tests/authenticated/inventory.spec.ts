import { test, expect } from '@playwright/test';

// No login steps here: the 'standard-user' project loads playwright/.auth/standard.json first.

test('opens the inventory directly, already logged in', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.getByTestId('title')).toHaveText('Products');
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

test('can go straight to the cart page', async ({ page }) => {
  await page.goto('/cart.html');
  await expect(page.getByTestId('title')).toHaveText('Your Cart');
});

test('each test still gets its own fresh copy of the state', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  // Other tests start with an empty cart, because storageState is copied, not shared.
});

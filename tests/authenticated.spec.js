import { test, expect } from '@playwright/test';

test('authenticated user can access My Account', async ({ page }) => {
    await page.goto('/account');

    await expect(page).toHaveURL(/\/account/);
    await expect(
        page.getByRole('heading', { name: 'My account' })
    ).toBeVisible();
});
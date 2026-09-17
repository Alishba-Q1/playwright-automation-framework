import { test as setup, expect } from '@playwright/test';

import { createTestUser } from '../data/users';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const user = createTestUser();

    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    // 1. Register a fresh user
    await page.goto('/auth/register');
    await registerPage.register(user);

    // 2. Login with the newly created user
    await loginPage.login(user.email, user.password);

    // 3. Verify authentication succeeded
    await expect(page).toHaveURL(/\/account/);

    // 4. Save authenticated browser state
    await page.context().storageState({ path: authFile });
});

import { test as base, expect } from '@playwright/test';
import { createTestUser } from '../data/users';

import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const test = base.extend({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    registeredUser: async ({
        page,
        registerPage
    }, use) => {

        const user = createTestUser();
                                                         //test.step() usage
await test.step('Open registration page', async () => {
        await page.goto('/auth/register');
 });

 await test.step('Register test user', async () => {
        await registerPage.register(user);
 });

 await test.step('Navigate to login page', async () => {
        await page.goto('/auth/login');

         await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 15000 });
 });

   

        await use(user);
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },


});

export { expect };
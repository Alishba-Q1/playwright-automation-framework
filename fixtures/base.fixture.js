import { test as base, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

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

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

});

export { expect };
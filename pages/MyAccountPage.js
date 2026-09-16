import { expect } from '@playwright/test';

export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.accountHeading = page.locator('[data-test="page-title"]');
        this.accountMenu = page.locator('[data-test="nav-menu"]');
        this.myFavoritesLink = page.locator('[data-test="nav-my-favorites"]');
    }

    async verifyPageLoaded() {
        await expect(this.accountHeading).toHaveText('My account');
    }

    async navigateToFavorites() {
        await this.accountMenu.click();
        await this.myFavoritesLink.click();
    }
}
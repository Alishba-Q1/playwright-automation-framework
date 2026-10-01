import { expect } from '@playwright/test';

export class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="page-title"]');
        this.productNames = page.locator('[data-test="product-name"]');
    }

    async verifyPageLoaded() {
        await expect(this.pageTitle).toHaveText('Favorites');
    }

    async verifyProductVisible(productName) {
        await expect(
            this.productNames.filter({ hasText: productName })
        ).toBeVisible();
    }

}
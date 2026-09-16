//  Home page ...> loadded , has login > redirects to login > loin has heading > login has email and password fields > login has submit button > login has forgot password link > login has create account link > login has social login buttons

import { expect } from '@playwright/test';

 export class  HomePage {
    constructor(page){
        this .page = page;
        this.signInButton = page.locator( '[data-test = "nav-sign-in"]');
        this.productCards = page.locator('a[data-test ^= "product-"]');

        this.searchInput = page.locator('#search-query');
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.searchResultsHeading = page.getByRole('heading', {
            name: /Searched for:/
        });

        this.productNames = page.locator('[data-test ="product-name"] ');  //collection

        this.ecoFriendlyCheckbox = page.locator('[data-test="eco-friendly-filter"]');

        this.ecoBadges = page.locator('[data-test="eco-badge"]');
    }

    async open(){
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                await this.page.goto('/', { waitUntil: 'domcontentloaded' });
                return;
            } catch (error) {
                if (attempt === 1) {
                    throw error;
                }
            }
        }

    }
    async navigateToLogin(){
    await this.signInButton.click();
    
    }

    async verifyLandingPageLoaded()
    {
    await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/');

    }

    async verifyProductsDisplayed()
    {
        await expect(this.productCards.first()).toBeVisible();

        const productCount = await this.productCards.count();
        expect(productCount).toBeGreaterThan(0);
    }

    async searchProduct(productName)
    {
    await this.searchInput.fill(productName);
    await this.clickSearchButton();

    await expect(this.searchResultsHeading).toBeVisible();
    await expect.poll(
        async () => await this.productCards.count(),
        { timeout: 10000 }
    ).toBeGreaterThan(0);
    }

    async clickSearchButton()
    {
    await this.searchButton.click();
    }

async verifySearchResults(searchTerm) {
    const count = await this.productNames.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const product = this.productNames.nth(i);
        const productName = await product.textContent();

        expect(productName).not.toBeNull();
        expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
}

    async filterEcoFriendlyProducts()
    {
       await this.ecoFriendlyCheckbox.check();
        await expect.poll(async () => {
            const productCount = await this.productCards.count();
            const ecoBadgeCount = await this.ecoBadges.count();
            return productCount > 0 && ecoBadgeCount === productCount;
        }, { timeout: 10000 }).toBe(true);
    }

    async verifyOnlyEcoFriendlyProductsDisplayed() {

    const productCount = await this.productCards.count();
    const ecoBadgeCount = await this.ecoBadges.count();

    console.log("Product Count:", productCount);
    console.log("Eco Badge Count:", ecoBadgeCount);

    expect(productCount).toBeGreaterThan(0);
    expect(ecoBadgeCount).toEqual(productCount);
}

async filterByCategory(categoryName) {
     const firstProductBeforeFilter =
        await this.productNames.first().textContent();

    await this.page.getByLabel(categoryName).check();

    await expect.poll(async () => {
        return await this.productNames.first().textContent();
    }).not.toBe(firstProductBeforeFilter);
}

async openFirstDisplayedProduct(){
    await this.productCards.first().click();
}

async openProduct(productName) {

    const product = this.page.locator('a.card').filter({
        has: this.page.locator('[data-test="product-name"]', {
            hasText: productName
        })
    });

    await product.click();
}
 };
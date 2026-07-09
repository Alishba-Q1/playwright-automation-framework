//  Home page ...> loadded , has login > redirects to login > loin has heading > login has email and password fields > login has submit button > login has forgot password link > login has create account link > login has social login buttons

import { expect } from '@playwright/test';

 export class  HomePage {
    constructor(page){
        this .page = page;
        this.signInButton = page.locator( '[data-test = "nav-sign-in"]');
        this.productCards = page.locator('a[data-test ^= "product-"]');

        this.searchInput = page.locator('#search-query');
        this.searchButton = page.locator('[data-test="search-submit"]');

        this.productNames = page.locator('[data-test ="product-name"] ');  //collection

        this.ecoFriendlyCheckbox = page.locator('[data-test="eco-friendly-filter"]');

        this.ecoBadges = page.locator('[data-test="eco-badge"]');
    }

    async open(){
        await this.page.goto('/');

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
    }

    async clickSearchButton()
    {
    await this.searchButton.click();
    }

async verifySearchResults(searchTerm)
{
    const count = await this.productNames.count();

    for(let i=0 ; i<count; i++){

        const product = this.productNames.nth(i);   //returns a locator #product 1

        const productName = await product.textContent();

        expect(productName).not.toBeNull();

        expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());

    }
}

    async filterEcoFriendlyProducts()
    {
       await this.ecoFriendlyCheckbox.check();
    }

    async verifyOnlyEcoFriendlyProductsDisplayed() {

    const productCount = await this.productCards.count();
    const ecoBadgeCount = await this.ecoBadges.count();

    console.log("Product Count:", productCount);
    console.log("Eco Badge Count:", ecoBadgeCount);

    expect(productCount).toBeGreaterThan(0);
    expect(ecoBadgeCount).toEqual(productCount);
}


 };
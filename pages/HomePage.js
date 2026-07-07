//  Home page ...> loadded , has login > redirects to login > loin has heading > login has email and password fields > login has submit button > login has forgot password link > login has create account link > login has social login buttons

import { expect } from '@playwright/test';

 export class  HomePage {
    constructor(page){
        this .page = page;
        this.signInButton = page.locator( '[data-test = "nav-sign-in"]');
        this.productCards = page.locator('[data-test ^= "product-"]');
    }

    async open(){
        await this.page.goto('/');

    }
    async navigateToLogin(){
    await this.signInButton.click();
    
}

async verifyLandingPageLoaded(){
    await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/');

}

async verifyProductsDisplayed(){
        await expect(this.productCards.first()).toBeVisible();

        const productCount = await this.productCards.count();
        expect(productCount).toBeGreaterThan(0);
    }
































































 }
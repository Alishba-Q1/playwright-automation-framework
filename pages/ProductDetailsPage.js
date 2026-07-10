
import { expect } from '@playwright/test';
export class  ProductDetailsPage {
    constructor(page){

        this.page = page;
    this.productCategory = page.locator('[aria-label="category"]');

        
    }

    async verifyProductCategory(expectedCategory){

   await expect(this.productCategory)
    .toHaveText(expectedCategory);
}

 };

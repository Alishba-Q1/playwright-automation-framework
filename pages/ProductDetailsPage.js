
import { expect } from '@playwright/test';
export class  ProductDetailsPage {
    constructor(page){

        this.page = page;
    this.productCategory = page.locator('[aria-label="category"]');

    this.productName = page.locator('[data-test="product-name"]');
    this.productBrand = page.locator('[aria-label="brand"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.productDescription = page.locator('[data-test="product-description"]');
    
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="cart-quantity"]');

    this.cartIcon = page.locator('[data-test="nav-cart"]');
    }

    async verifyProductCategory(expectedCategory){

   await expect(this.productCategory)
    .toHaveText(expectedCategory);
}

async verifyProductDetailsDisplayed(){
    
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productBrand).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productDescription).toBeVisible(); 
}

async setQuantity(quantity){

    await this.quantityInput.fill(quantity.toString());
}

async addToCart(){
     await this.addToCartButton.click();
}

async verifyCartBadge(expectedQuantity) {
    await expect(this.cartBadge)
        .toHaveText(expectedQuantity.toString());
}

async openCart() {
    await this.cartIcon.click();
}

 };

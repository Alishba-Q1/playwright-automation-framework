import { expect } from '@playwright/test';

 export class  CartPage {
    constructor(page){
        this.page = page;
    this.productTitle = page.locator('[data-test="product-title"]');

    this.productQuantity = page.locator('[data-test="product-quantity"]');

    this.productPrice = page.locator('[data-test="product-price"]');

    this.linePrice = page.locator('[data-test="line-price"]');

    this.cartTotal = page.locator('[data-test="cart-total"]');

    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');

    this.proceedToCheckoutButton = page.locator('[data-test="proceed-1"]');

    this.removeProductButton = page.locator('a.btn.btn-danger');

    this.emptyCartMessage = page.getByText(
    'The cart is empty. Nothing to display.');



    }

    async verifyProductDisplayed(productName) {
    await expect(this.productTitle)
        .toHaveText(productName);
}

async updateQuantity(quantity) {
    await this.productQuantity.fill(quantity.toString());
}

async getUnitPrice() {

    const price = await this.productPrice.textContent();

    return parseFloat(price.replace('$', ''));

}

async verifyLinePrice(expectedPrice) {
    await expect(this.linePrice)
        .toHaveText(`$${expectedPrice}`);
}

async removeProduct() {
    await this.removeProductButton.click();
}

async verifyCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
}

}
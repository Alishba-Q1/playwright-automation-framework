import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Sign in
        this.signInTab = page.locator('[href="#signin-tab"]');
        this.loginEmail = page.locator('[data-test="email"]');
        this.loginPassword = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');

        // Guest checkout
        // Guest checkout
        this.guestTab = page.locator('[href="#guest-tab"]');
        this.guestEmail = page.locator('[data-test="guest-email"]');
        this.guestFirstName = page.locator('[data-test="guest-first-name"]');
        this.guestLastName = page.locator('[data-test="guest-last-name"]');
        this.guestSubmitButton = page.locator('[data-test="guest-submit"]');

        this.guestConfirmation = page.getByText(/Continuing as guest:/);
        this.guestProceedButton = page.locator('[data-test="proceed-2-guest"]');

// Billing
        this.country = page.locator('[data-test="country"]');
        this.postalCode = page.locator('[data-test="postal_code"]');
        this.houseNumber = page.locator('[data-test="house_number"]');
        this.street = page.locator('[data-test="street"]');
        this.city = page.locator('[data-test="city"]');
        this.state = page.locator('[data-test="state"]');
        this.billingProceedButton = page.locator('[data-test="proceed-3"]');

        // Payment
       this.paymentMethod = page.locator('[data-test="payment-method"]');
      this.confirmButton = page.locator('[data-test="finish"]');

      this.paymentSuccessMessage = page.locator('[data-test="payment-success-message"]');
    }

    async verifySignInStepDisplayed() {
        await expect(this.loginEmail).toBeVisible();
        await expect(this.loginPassword).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async continueAsGuest(email, firstName, lastName) {
    await this.guestTab.click();

    await this.guestEmail.fill(email);
    await this.guestFirstName.fill(firstName);
    await this.guestLastName.fill(lastName);

    await this.guestSubmitButton.click();
}

async verifyGuestConfirmation() {
    await expect(this.guestConfirmation).toBeVisible();
}

async proceedFromGuest() {
    await this.guestProceedButton.click();
}

async fillBillingAddress(country, postalCode, houseNumber) {
    await this.country.selectOption(country);
    await this.postalCode.fill(postalCode);
    await this.houseNumber.fill(houseNumber);
}

async verifyBillingAddressAutoFilled() {
    await expect(this.street).not.toHaveValue('');
    await expect(this.city).not.toHaveValue('');
    await expect(this.state).not.toHaveValue('');
}

async proceedFromBilling() {
    await this.billingProceedButton.click();
}

async selectPaymentMethod(paymentMethod){
    await this.paymentMethod.selectOption(paymentMethod);
}

async confirmationOrder(){
    await this.confirmButton.click();
}

async verifyPaymentSuccessful() {
    await expect(this.paymentSuccessMessage).toBeVisible();

}

}
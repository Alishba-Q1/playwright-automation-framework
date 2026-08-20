import { expect } from '@playwright/test';

export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.firstNameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.dobInput = page.locator('[data-test="dob"]');
        this.countrySelect = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.getByRole('button' , { 'name': 'Register'})
    }

    async register(user) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.dobInput.fill(user.dob);
        await this.countrySelect.selectOption(user.country);
        await this.postalCodeInput.fill(user.postalCode);
        await this.houseNumberInput.fill(user.houseNumber);
        await this.cityInput.fill(user.city);
        await this.stateInput.fill(user.state);
        await this.phoneInput.fill(user.phone);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);

        // await expect(this.registerButton).toBeVisible();
        // await this.registerButton.click();
 await this.registerButton.click();

await expect(
    this.page.getByRole('heading', { name: 'Login' })
).toBeVisible();

await expect(this.page).toHaveURL(/\/auth\/login/);
}
}


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
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.getByRole('button' , { 'name': 'Register'})
    }

    async register(user) {
        let formReady = false;
        for (let attempt = 0; attempt < 2 && !formReady; attempt++) {
            try {
                await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
                formReady = true;
            } catch (error) {
                if (attempt === 1) {
                    throw error;
                }
                await this.page.reload({ waitUntil: 'domcontentloaded' });
            }
        }

        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.dobInput.fill(user.dob);
        await this.countrySelect.selectOption(user.country);
        await this.postalCodeInput.fill(user.postalCode);
        await this.houseNumberInput.fill(user.houseNumber);
        await expect(this.streetInput).toHaveValue(/\S+/);
        await expect(this.cityInput).toHaveValue(/\S+/);
        await expect(this.stateInput).toHaveValue(/\S+/);
        await this.phoneInput.fill(user.phone);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);

        const registrationResponse = this.page.waitForResponse(response =>
            response.url().endsWith('/users/register') &&
            response.request().method() === 'POST'
        );
        await this.registerButton.click();
        expect((await registrationResponse).ok()).toBeTruthy();
        await expect(this.page).toHaveURL(/\/auth\/login/);
        await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 15000 });
}
}


// As a customer, I want to log in with valid credentials.

import { expect } from '@playwright/test';

export class LoginPage {
constructor(page){
    this.page = page;
    this.emailField = page.getByRole('textbox' , { 'name': 'Email address *'});
    this.passwordField = page.getByRole('textbox' , { 'name': 'Password *'});
    this.loginButton = page.getByRole('button' , { 'name': 'Login'});
    this.registerLink = page.getByRole('link', {name: 'Register your account' });

}

async enterEmail(email){
    await this.emailField.fill(email);
}

async enterPassword(password){
    await this.passwordField.fill(password);
}

async clickLoginButton(){
    await this.loginButton.click();

}
async login(email, password){
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();

}

async verifyPageHeading(headingText){
    const heading = this.page.locator('[data-test="page-title"]');
    await expect(heading).toHaveText(headingText);
}

async verifyLoginError(expectMessage){
    const errorMessage = this.page.locator('.help-block');
    await expect(errorMessage).toHaveText(expectMessage);
}


async navigateToRegister() {
    await this.registerLink.click();
    
}












}
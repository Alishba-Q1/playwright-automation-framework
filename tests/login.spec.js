

import {test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

import { USERS } from '../data/users';
//contains only the setup common to every test
test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.navigateToLogin();
});


 test('User should be able to login with valid credentials' , async ({page})=> {
    //Arrange
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    //Act
    await loginPage.login(
        USERS.VALID_USER.email,
        USERS.VALID_USER.password
    );
    //Assert
    await myAccountPage.verifyPageLoaded();

});

test('User should not be able to login with invalid credentials' , async ({page})=> {
    //Arrange
    const loginPage = new LoginPage(page);
    //Act
    await loginPage.login(
        USERS.INVALID_USER.email,
        USERS.INVALID_USER.password
    );  
    //Assert
    await loginPage.verifyLoginError('Invalid email or password');

});
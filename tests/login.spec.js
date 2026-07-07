

import {test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

import { USERS } from '../data/users';


 test('Valid Login' , async ({page})=> {
    //Arrange
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    //Act
    await homePage.open();
    await homePage.navigateToLogin();

 
    await loginPage.login(
        USERS.VALID_USER.email,
        USERS.VALID_USER.password
    );

    await myAccountPage.verifyPageLoaded();

});
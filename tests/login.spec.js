

import { test } from '../fixtures/base.fixture';

import { USERS } from '../data/users';
//contains only the setup common to every test
test.beforeEach(async ({homePage}) => {

    await homePage.open();
    await homePage.navigateToLogin();
});

 test('User should be able to login with valid credentials' , async ({loginPage, myAccountPage})=> {
    //Act
    await loginPage.login(
        USERS.VALID_USER.email,
        USERS.VALID_USER.password
    );
    //Assert
    await myAccountPage.verifyPageLoaded();

});

test('User should not be able to login with invalid credentials' , async ({loginPage})=> {

    //Act
    await loginPage.login(
        USERS.INVALID_USER.email,
        USERS.INVALID_USER.password
    );  
    //Assert
    await loginPage.verifyLoginError('Invalid email or password');

});
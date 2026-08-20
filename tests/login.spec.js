

import { test } from '../fixtures/base.fixture';

import { USERS } from '../data/users';
//contains only the setup common to every test
test.beforeEach(async ({homePage}) => {

    await homePage.open();
    await homePage.navigateToLogin();
});
// test.step() usage 
 test('User should be able to login with valid credentials' , 
    async ({loginPage, registeredUser, myAccountPage})=> {
    await test.step('Login with registered user', async() =>{
            //Act
        await loginPage.login(
        registeredUser.email,
        registeredUser.password
        );
    });
     await test.step('Verify My Account page', async () => {
    //Assert
    await myAccountPage.verifyPageLoaded();
     });
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
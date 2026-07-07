
import {test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('User should see products on the home page', async ({page})=> {
    const homePage = new HomePage(page);
     await homePage.open();
    await homePage.verifyLandingPageLoaded();
    await homePage.verifyProductsDisplayed();
});
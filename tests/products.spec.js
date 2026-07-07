
import {test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
});

test('User should see products on the home page', async ({page})=> {

    const homePage = new HomePage(page);

    await homePage.verifyLandingPageLoaded();
    await homePage.verifyProductsDisplayed();
});


test ('User should be able to search products', async ({page}) => {

    const homePage = new HomePage(page);

    await homePage.searchProduct('Pliers');
    await homePage.verifySearchResults('Pliers');

});

import {test} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

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

test('User should be able to filter eco-friendly products', async ({ page }) => {

    // Arrange
    const homePage = new HomePage(page);

    // Act
    await homePage.filterEcoFriendlyProducts();

    // Assert
    await homePage.verifyOnlyEcoFriendlyProductsDisplayed();

});


test('Filter products by category', async ({ page }) => {
     
    const homePage = new HomePage(page);

     await homePage.filterByCategory('Hammer');

});

test('User should be able to filter products by category', async ({ page }) => {

    // Arrange
    const homePage = new HomePage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Act
    await homePage.filterByCategory('Hammer');
    await homePage.openFirstDisplayedProduct();

    // Assert
    await productDetailsPage.verifyProductCategory('Hammer');

});



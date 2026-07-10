
import { test } from '../fixtures/base.fixture';

test.beforeEach(async ({ homePage }) => {
    await homePage.open();
});

test('User should see products on the home page', async ({homePage})=> {

    await homePage.verifyLandingPageLoaded();
    await homePage.verifyProductsDisplayed();
});

test ('User should be able to search products', async ({homePage}) => {

    await homePage.searchProduct('Pliers');
    await homePage.verifySearchResults('Pliers');

});

test('User should be able to filter eco-friendly products', async ({ homePage }) => {

    // Act
    await homePage.filterEcoFriendlyProducts();

    // Assert
    await homePage.verifyOnlyEcoFriendlyProductsDisplayed();

});

test('User should be able to filter products by category', async ({ homePage, productDetailsPage }) => {

    // Act
    await homePage.filterByCategory('Hammer');
    await homePage.openFirstDisplayedProduct();

    // Assert
    await productDetailsPage.verifyProductCategory('Hammer');

});



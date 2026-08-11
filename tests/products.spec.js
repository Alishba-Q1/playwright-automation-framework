
import { test } from '../fixtures/base.fixture';
import { expect } from '@playwright/test';
import { GUEST_CHECKOUT,
    BILLING_ADDRESS
 } from '../data/checkoutData';

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

test('User should be able to view product details', async ({
    homePage,
    productDetailsPage
}) => {

    // Act
    await homePage.openFirstDisplayedProduct();

    // Assert
    await productDetailsPage.verifyProductDetailsDisplayed();

});

test('User should be able to add a product to cart', async ({
    homePage,
    productDetailsPage
}) => {

    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.setQuantity(3);
    await productDetailsPage.addToCart();

    await productDetailsPage.verifyCartBadge(3);

});


test('User should be able to view products in shopping cart', async ({
    homePage,
    productDetailsPage,
    cartPage
}) => {
    // Arrange
    await homePage.openProduct('Slip Joint Pliers');

    // Act
    await productDetailsPage.setQuantity(3);
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();

    // Assert
    await cartPage.verifyProductDisplayed('Slip Joint Pliers');

});

test('User should be able to update product quantity in shopping cart', async ({
    homePage,
    productDetailsPage,
    cartPage
}) => {

    // Arrange
    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.setQuantity(1);
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();

    // Act
    const quantity = 3;

    await cartPage.updateQuantity(quantity);

    const unitPrice = await cartPage.getUnitPrice();

    const expectedTotal = (unitPrice * quantity).toFixed(2);

    // Assert
    await cartPage.verifyLinePrice(expectedTotal);

});

test('User should be able to remove product from shopping cart', async ({
    homePage,
    productDetailsPage,
    cartPage
}) => {

    // Arrange
    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();

    // Act
    await cartPage.removeProduct();

    // Assert
    await cartPage.verifyCartIsEmpty();

});

test('User should be able to proceed to checkout', async ({
    homePage,
    productDetailsPage,
    cartPage,
    checkoutPage
}) => {
    // Arrange
    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    // Act
    await cartPage.proceedToCheckout();

    // Assert
    await checkoutPage.verifySignInStepDisplayed();

});

test('User should be able to continue checkout as guest', async ({
    homePage,
    productDetailsPage,
    cartPage,
    checkoutPage
}) => {

    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueAsGuest(
        GUEST_CHECKOUT.email,
        GUEST_CHECKOUT.firstName,
        GUEST_CHECKOUT.lastName
    );

    await checkoutPage.verifyGuestConfirmation();
});

test('User should be able to complete billing address', async ({
    homePage,
    productDetailsPage,
    cartPage,
    checkoutPage
}) => {

    // Arrange
    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await cartPage.proceedToCheckout();

    // Continue as guest
    await checkoutPage.continueAsGuest(
        GUEST_CHECKOUT.email,
        GUEST_CHECKOUT.firstName,
        GUEST_CHECKOUT.lastName
    );

    // Act
    await checkoutPage.proceedFromGuest();

    await checkoutPage.fillBillingAddress(
        BILLING_ADDRESS.country,
        BILLING_ADDRESS.postalCode,
        BILLING_ADDRESS.houseNumber
    );

    // Assert
    await checkoutPage.verifyBillingAddressAutoFilled();
});

test('User should be able to select payment method and confirm order', async ({
    homePage, 
    productDetailsPage,
    cartPage,
    checkoutPage
}) =>{
    //Arrange 
    await homePage.openProduct('Slip Joint Pliers');

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueAsGuest(
        GUEST_CHECKOUT.email,
        GUEST_CHECKOUT.firstName,
        GUEST_CHECKOUT.lastName
    );

    await checkoutPage.proceedFromGuest();

    await checkoutPage.fillBillingAddress(
        BILLING_ADDRESS.country,
        BILLING_ADDRESS.postalCode,
        BILLING_ADDRESS.houseNumber
    );

    //Act 
    await checkoutPage.proceedFromBilling();

    await checkoutPage.selectPaymentMethod('Cash on Delivery');

    //Assert
    await expect(checkoutPage.confirmButton).toBeEnabled();

    await checkoutPage.confirmationOrder();

    await checkoutPage.verifyPaymentSuccessful();
});


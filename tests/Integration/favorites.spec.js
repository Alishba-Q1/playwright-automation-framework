import { test, expect, request as playwrightRequest } from '@playwright/test';

import { FavoritesPage } from '../../pages/FavoritesPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyAccountPage } from '../../pages/MyAccountPage.js';

test('API creates favorite and UI verifies it', async ({ page }) => {
    const apiContext = await playwrightRequest.newContext({
        baseURL:
            process.env.API_BASE_URL ||
            'https://api.practicesoftwaretesting.com'
    });

    try {
        const email = `pw-integration-${Date.now()}@example.com`;
        const password = 'Playwright@9876Xy!';

        // 1. Register fresh user through API
        const registerResponse = await apiContext.post('/users/register', {
            data: {
                first_name: 'Playwright',
                last_name: 'Integration',
                address: {
                    street: 'Street 1',
                    house_number: '12',
                    city: 'Lahore',
                    state: 'Punjab',
                    country: 'Pakistan',
                    postal_code: '54000'
                },
                phone: '03001234567',
                dob: '1995-01-01',
                password,
                email
            }
        });

        expect(registerResponse.status()).toBe(201);

        // 2. Login through API
        const loginResponse = await apiContext.post('/users/login', {
            data: { email, password }
        });

        expect(loginResponse.status()).toBe(200);

        const { access_token: accessToken } = await loginResponse.json();

        expect(accessToken).toBeTruthy();

        const authHeaders = {
            Authorization: `Bearer ${accessToken}`
        };

        // 3. Get a product
        const productsResponse = await apiContext.get('/products');

        expect(productsResponse.status()).toBe(200);

        const productsBody = await productsResponse.json();
        const product = productsBody.data[0];

        expect(product).toBeTruthy();

        const productId = product.id;
        const productName = product.name;

        // 4. Create favorite through API
        const favoriteResponse = await apiContext.post('/favorites', {
            headers: authHeaders,
            data: {
                product_id: productId
            }
        });

        expect(favoriteResponse.status()).toBe(201);

        // 5. Login through UI
        const loginPage = new LoginPage(page);

        await page.goto('/auth/login', {
            waitUntil: 'domcontentloaded'
        });

        await loginPage.login(email, password);

        await expect(page).toHaveURL(/\/account/, {
            timeout: 10000
        });

        // 6. Navigate to Favorites
        const myAccountPage = new MyAccountPage(page);

        await myAccountPage.navigateToFavorites();

        // 7. Verify API-created favorite in UI
        const favoritesPage = new FavoritesPage(page);

        await favoritesPage.verifyPageLoaded();
        await favoritesPage.verifyProductVisible(productName);

        // 8. Verify favorite through API
        const favoritesResponse = await apiContext.get('/favorites', {
            headers: authHeaders
        });

        expect(favoritesResponse.status()).toBe(200);

        const favoritesBody = await favoritesResponse.json();

        expect(
            favoritesBody.some(
                favorite => favorite.product_id === productId
            )
        ).toBeTruthy();
        // 9. Cleanup: remove the test favorite through API
const deleteFavoriteResponse = await apiContext.delete(
    `/favorites/${productId}`,
    {
        headers: authHeaders
    }
);

expect(deleteFavoriteResponse.status()).toBe(204);

    } finally {
        await apiContext.dispose();
    }
});
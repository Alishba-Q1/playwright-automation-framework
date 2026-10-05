import { test, expect } from '@playwright/test';
import { getFirstProduct } from '../../helpers/apiHelpers.js';

test('GET favorites - authenticated user', async ({ request }) => {
    const email = `pw-favorites-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    const registerResponse = await request.post('/users/register', {
        data: {
            first_name: 'Playwright',
            last_name: 'API',
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

    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    expect(loginResponse.status()).toBe(200);

    const { access_token: accessToken } = await loginResponse.json();
    expect(accessToken).toBeTruthy();

    const favoritesResponse = await request.get('/favorites', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(favoritesResponse.status()).toBe(200);
    expect(favoritesResponse.headers()['content-type']).toContain(
        'application/json'
    );

    const favorites = await favoritesResponse.json();

    expect(Array.isArray(favorites)).toBeTruthy();
});

test('GET favorites - unauthenticated user is forbidden', async ({ request }) => {
    const response = await request.get('/favorites');

    console.log('GET /favorites status:', response.status());

    expect(response.status()).toBe(401);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(responseBody.message).toBe('Unauthorized');
});

test('POST favorite - authenticated user', async ({ request }) => {
    const email = `pw-favorites-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    const registerResponse = await request.post('/users/register', {
        data: {
            first_name: 'Playwright',
            last_name: 'API',
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

    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    expect(loginResponse.status()).toBe(200);

    const { access_token: accessToken } = await loginResponse.json();
    expect(accessToken).toBeTruthy();

    const favoriteResponse = await request.post('/favorites', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        data: {
            product_id: ''
        }
    });

    expect(favoriteResponse.status()).toBe(422);
    expect(favoriteResponse.headers()['content-type']).toContain(
        'application/json'
    );
});

test('POST favorite - invalid product ID returns 422', async ({ request }) => {
    const email = `pw-invalid-favorite-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    // Register fresh user
    const registerResponse = await request.post('/users/register', {
        data: {
            first_name: 'Playwright',
            last_name: 'API',
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

    // Login fresh user
    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    expect(loginResponse.status()).toBe(200);

    const { access_token: accessToken } = await loginResponse.json();

    expect(accessToken).toBeTruthy();

    // Send invalid product_id
    const favoriteResponse = await request.post('/favorites', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        data: {
            product_id: ''
        }
    });

    expect(favoriteResponse.status()).toBe(422);
    expect(favoriteResponse.headers()['content-type']).toContain(
        'application/json'
    );
});
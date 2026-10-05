import { test, expect } from '@playwright/test';

test('POST user - register', async ({ request }) => {
    const email = `pw-api-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    const response = await request.post('/users/register', {
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

    console.log('Register status:', response.status());
    console.log('Register response:', await response.text());

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.email).toBe(email);
    expect(responseBody.first_name).toBe('Playwright');
    expect(responseBody.last_name).toBe('API');
});

test('POST user - login', async ({ request }) => {
    const email = `pw-api-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    // Register user
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

    // Login
    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    console.log('Login status:', loginResponse.status());
    console.log('Login response:', await loginResponse.text());

    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.headers()['content-type']).toContain('application/json');

    const loginBody = await loginResponse.json();

    expect(loginBody).toHaveProperty('access_token');
    expect(loginBody.token_type.toLowerCase()).toBe('bearer');
    expect(loginBody.expires_in).toBeGreaterThan(0);
});

test('API chaining - login and get current user', async ({ request }) => {
    const email = `pw-chaining-${Date.now()}@example.com`;
    const password = 'Playwright@9876Xy!';

    // 1. Register a fresh user
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

    // 2. Login using the newly created user
    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const accessToken = loginBody.access_token;

    expect(accessToken).toBeTruthy();

    // 3. Use the token from the login response
    //    in the next API request
    const userResponse = await request.get('/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(userResponse.status()).toBe(200);
    expect(userResponse.headers()['content-type']).toContain(
        'application/json'
    );

    const userBody = await userResponse.json();

    expect(userBody).toHaveProperty('id');
    expect(userBody.email).toBe(email);
});
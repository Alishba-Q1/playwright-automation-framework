import { test, expect } from '@playwright/test';
import { getFirstProduct } from '../../helpers/apiHelpers.js';

test('GET products', async ({ request }) => {
	const response = await request.get('/products', {
    params:{
    sort:'price,asc'
    }
  });

    console.log('Status:', response.status());
    console.log('Content-Type:', response.headers()['content-type']);
    console.log('Response:', await response.text());

	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('application/json');
  
	const responseBody = await response.json();

	expect(Array.isArray(responseBody.data)).toBeTruthy();
	expect(responseBody.data.length).toBeGreaterThan(0);

  const firstProduct = responseBody.data[0];

expect(firstProduct).toHaveProperty('id');
expect(firstProduct).toHaveProperty('name');
expect(firstProduct).toHaveProperty('price');

expect(typeof firstProduct.id).toBe('string');
expect(typeof firstProduct.name).toBe('string');
expect(typeof firstProduct.price).toBe('number');

});

test('GET products - page 2', async ({ request }) => {
    const response = await request.get('/products', {
        params: {
            page: 2
        }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.current_page).toBe(2);
    expect(responseBody.data.length).toBeGreaterThan(0);
});

test('GET products - filter by category', async ({ request }) => {
    const product = await getFirstProduct(request);
    const categoryId = product.category.id;

    const response = await request.get('/products', {
        params: {
            by_category: categoryId
        }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    for (const product of responseBody.data) {
    expect(product.category.id).toBe(categoryId);
}
});

test('GET products - filter by brand', async ({ request }) => {
    const sourceProduct = await getFirstProduct(request);

    const response = await request.get('/products', {
        params: {
            by_brand: sourceProduct.brand.id
        }
    });

    expect([200, 201]).toContain(response.status());
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    console.log('Response:', responseBody);

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);

    for (const product of responseBody.data) {
    expect(product.brand.id).toBe(sourceProduct.brand.id);
    }
});

test('GET products - filter by rental', async ({ request }) => {
    const response = await request.get('/products', {
        params: {
            is_rental: '1'
        }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);

    for (const product of responseBody.data) {
        expect(product.is_rental).toBe(true);
    }
});

test('GET products - filter by price range', async ({ request }) => {
    const response = await request.get('/products', {
        params: {
            between: 'price,10,30'
        }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);

    for (const product of responseBody.data) {
        expect(product.price).toBeGreaterThanOrEqual(10);
        expect(product.price).toBeLessThanOrEqual(30);
    }
});

test('GET products - invalid category', async ({ request }) => {
    const response = await request.get('/products', {
        params: {
            by_category: '45G78e5V7R5YEFQM7WER345345'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBe(0);
});

test('GET product by ID', async ({ request }) => {
    const sourceProduct = await getFirstProduct(request);
    const productId = sourceProduct.id;

    const response = await request.get(`/products/${productId}`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const product = await response.json();

    expect(product.id).toBe(productId);
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
});

test('GET product by invalid ID', async ({ request }) => {
    const productId = '01M24JASKHKDAJS45739jsdhfkjsd65YFK';

    const response = await request.get(`/products/${productId}`);

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(responseBody.message).toBe('Requested item not found');
});

test('POST product', async ({ request }) => {
    const sourceProduct = await getFirstProduct(request);
    const productName = `Playwright API Test Product ${Date.now()}`;

    const response = await request.post('/products', {
        data: {
            name: productName,
            description: 'Product created for API automation testing',
            price: 19.99,
            category_id: sourceProduct.category.id,
            brand_id: sourceProduct.brand.id,
            product_image_id: sourceProduct.product_image.id,
            is_location_offer: false,
            is_rental: false,
            co2_rating: 'A'
        }
    });

    console.log('Status:', response.status());
    console.log('Response:', await response.text());

    expect([200, 201]).toContain(response.status());
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    console.log('Response:', responseBody);

    const productId = responseBody.id;
    console.log('Created Product ID:', productId);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toBe(productName);
    expect(responseBody.price).toBe(19.99);

    const getResponse = await request.get(`/products/${productId}`);
    expect(getResponse.status()).toBe(200);

    const product = await getResponse.json();

    expect(product.id).toBe(productId);
    expect(product.name).toBe(productName);
});

test('PUT product', async ({ request }) => {
    const sourceProduct = await getFirstProduct(request);
    const productId = sourceProduct.id;

    const updateResponse = await request.put(`/products/${productId}`, {
        data: {
            name: `Updated Playwright Product ${Date.now()}`,
            description: 'Updated through API automation',
            price: 29.99,
            category_id: sourceProduct.category.id,
            brand_id: sourceProduct.brand.id,
            product_image_id: sourceProduct.product_image.id,
            is_location_offer: false,
            is_rental: false,
            co2_rating: 'A'
        }
    });

    console.log('Update status:', updateResponse.status());
    console.log('Update response:', await updateResponse.text());

    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.headers()['content-type']).toContain('application/json');

    const updateBody = await updateResponse.json();
    expect(updateBody.success).toBe(true);
});

test('DELETE product - non-admin user is forbidden', async ({ request }) => {
    const email = `pw-delete-${Date.now()}@example.com`;
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

    // 2. Login as the fresh non-admin user
    const loginResponse = await request.post('/users/login', {
        data: {
            email,
            password
        }
    });

    expect(loginResponse.status()).toBe(200);

    const { access_token: accessToken } = await loginResponse.json();

    expect(accessToken).toBeTruthy();

    // 3. Get an existing product
    const product = await getFirstProduct(request);
    const productId = product.id;

    // 4. Attempt to delete the product
    const deleteResponse = await request.delete(`/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    // 5. Normal user must not be allowed to delete products
    expect(deleteResponse.status()).toBe(403);

    // 6. Verify the product still exists
    const getResponse = await request.get(`/products/${productId}`);

    expect(getResponse.status()).toBe(200);
});
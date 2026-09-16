import { expect } from '@playwright/test';

export async function getFirstProduct(request) {
    const response = await request.get('/products');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);

    return responseBody.data[0];
}
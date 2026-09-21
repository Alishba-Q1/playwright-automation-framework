import { test, expect } from '@playwright/test';

test('retry practice', async ({}, testInfo) => {
    console.log(`Attempt: ${testInfo.retry}`);

    if (testInfo.retry === 0) {
        expect(true).toBe(false);
    }

    expect(true).toBe(true);
});
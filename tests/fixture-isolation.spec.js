import { test } from '../fixtures/base.fixture';

test('fixture isolation - user A', async ({ registeredUser }) => {
    console.log('User A:', registeredUser.email);
});

test('fixture isolation - user B', async ({ registeredUser }) => {
    console.log('User B:', registeredUser.email);
});

test('fixture isolation - user C', async ({ registeredUser }) => {
    console.log('User C:', registeredUser.email);
});

test('fixture isolation - user D', async ({ registeredUser }) => {
    console.log('User D:', registeredUser.email);
});
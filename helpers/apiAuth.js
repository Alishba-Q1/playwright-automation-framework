export async function loginAsCustomer(request) {
    const response = await request.post('/users/login', {
        data: {
            email: 'customer@practicesoftwaretesting.com',
            password: 'welcome01'
        }
    });

    const body = await response.json();

    return {
        response,
        accessToken: body.access_token
    };
}
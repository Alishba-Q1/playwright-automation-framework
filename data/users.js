
export const USERS = {

// VALID_USER:{
//     email: 'xavenenepa@yopmail.com',
//     password: '12345678#ASdf'
// }, 

INVALID_USER:{
     email: 'customer1@yopmail.com',
    password: '12345678#ASdf'

},
};

export function createTestUser() {

    const uniqueId = Date.now();

    return {
        firstName: 'Test',
        lastName: 'Automation',
        dob: '1998-01-03',
        country: 'PK',
        postalCode: '54000',
        houseNumber: '42',
        city: 'Lahore',
        state: 'Punjab',
        phone: `0300${uniqueId.toString().slice(-7)}`,
        email: `qa_${uniqueId}@yopmail.com`,
        password: 'PAserty12AS#weRR'
    };
}

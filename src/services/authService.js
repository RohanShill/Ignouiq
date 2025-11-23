// Mock Auth Service (temporary - until backend is deployed)

export const loginUser = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock success response
    return {
        success: true,
        token: 'mock_token_' + Date.now(),
        user: {
            id: '1',
            name: 'Test User',
            email: email,
            phone: '1234567890',
            purchasedItems: [
                {
                    productId: '7',
                    title: 'Political Science Test 1',
                    purchaseDate: new Date().toISOString(),
                    orderId: 'mock_order_123',
                    amount: 99
                }
            ]
        }
    };
};

export const signupUser = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock success response
    return {
        success: true,
        token: 'mock_token_' + Date.now(),
        user: {
            id: '2',
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            purchasedItems: []
        }
    };
};

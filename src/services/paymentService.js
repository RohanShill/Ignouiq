// Mock Payment Service (temporary - until backend is deployed)

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        // Mock: Razorpay already loaded
        resolve(true);
    });
};

export const initiatePayment = async ({ amount, productId }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock success response
    return {
        success: true,
        key: 'rzp_test_mock',
        amount: amount * 100,
        currency: 'INR',
        orderId: 'order_mock_' + Date.now(),
        productId: productId
    };
};

export const verifyPayment = async (response) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock success - payment verified
    return {
        verified: true,
        message: 'Payment successful (Mock Mode)'
    };
};

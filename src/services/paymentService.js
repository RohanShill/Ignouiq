// Payment Service - Real Razorpay Integration

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const initiatePayment = async ({ amount, productId }) => {
    const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, productId }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error initiating payment');
    }
    return data;
};

export const verifyPayment = async (paymentData) => {
    const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
    }
    return data;
};

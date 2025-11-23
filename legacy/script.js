// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-overlay');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Razorpay Integration for Buy Now buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent === 'Buy Now') {
        button.addEventListener('click', function() {
            // Razorpay integration will go here
            alert('Razorpay payment integration will be added here with your API keys');
            
            // Example Razorpay code (uncomment and add your key):
            // Make sure to include Razorpay script in HTML:
            // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            
            /*
            var options = {
                key: "YOUR_RAZORPAY_KEY", // Enter your Razorpay Key
                amount: 29900, // Amount in paise (299 rupees)
                currency: "INR",
                name: "IGNOU IQ Hindi",
                description: "Study Notes Purchase",
                image: "your-logo-url.png", // Optional
                handler: function (response) {
                    alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                    // Send payment details to your server for verification
                    console.log(response);
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#0EA5E9"
                }
            };
            var rzp = new Razorpay(options);
            rzp.open();
            */
        });
    }
});

// Add to your existing script.js

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : '/api';

// Login Function
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Error logging in. Please try again.');
  }
}

// Signup Function
async function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await response.json();

    if (data.success) {
      alert('Account created successfully!');
      switchTab('login');
    } else {
      alert(data.error || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Error creating account. Please try again.');
  }
}

// Razorpay Payment Function
async function initiatePayment(productName, amount, productId) {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first to purchase');
    window.location.href = 'login.html';
    return;
  }

  try {
    // Step 1: Create order
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        productId,
        productName
      })
    });

    const orderData = await response.json();

    if (!orderData.success) {
      alert('Error creating order');
      return;
    }

    // Step 2: Open Razorpay checkout
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "IGNOU IQ Hindi",
      description: productName,
      order_id: orderData.orderId,
      handler: async function (response) {
        // Step 3: Verify payment
        await verifyPayment(response, productId);
      },
      prefill: {
        name: JSON.parse(localStorage.getItem('user')).name,
        email: JSON.parse(localStorage.getItem('user')).email,
        contact: JSON.parse(localStorage.getItem('user')).phone
      },
      theme: {
        color: "#0EA5E9"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error('Payment error:', error);
    alert('Error initiating payment. Please try again.');
  }
}

// Verify Payment
async function verifyPayment(paymentResponse, productId) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        productId
      })
    });

    const data = await response.json();

    if (data.verified) {
      alert('Payment successful! You can now download your notes.');
      window.location.href = data.downloadUrl;
    } else {
      alert('Payment verification failed. Please contact support.');
    }
  } catch (error) {
    console.error('Verification error:', error);
    alert('Error verifying payment. Please contact support.');
  }
}

// Check if user is logged in on page load
function checkAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    // User is logged in - update UI
    const userData = JSON.parse(user);
    // Show user name in header or add logout button
    console.log('Logged in as:', userData.name);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', checkAuth);

// Active navigation highlight based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ============================================
// AUTHENTICATION & PAYMENT FUNCTIONS
// ============================================

const API_URL = '/api';

// Check auth on page load
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (token && user) {
        const userData = JSON.parse(user);
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) userMenu.style.display = 'flex';
        if (userName) userName.textContent = userData.name;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    window.location.reload();
}

// Razorpay Payment
async function initiatePayment(productName, amount, productId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login first to purchase notes');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, productId, productName })
        });

        const orderData = await response.json();

        if (!orderData.success) {
            alert('Error creating order');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "IGNOU IQ Hindi",
            description: productName,
            order_id: orderData.orderId,
            handler: function (response) {
                verifyPayment(response, productId);
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            theme: {
                color: "#0EA5E9"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        alert('Error initiating payment');
    }
}

// Verify Payment
async function verifyPayment(paymentResponse, productId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                productId
            })
        });

        const data = await response.json();

        if (data.verified) {
            alert('🎉 Payment Successful! Download link sent to your email.');
            window.location.reload();
        } else {
            alert('Payment verification failed. Contact support.');
        }
    } catch (error) {
        alert('Error verifying payment');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Add payment to Buy Now buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Buy Now') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.notes-item');
                if (card) {
                    const productName = card.querySelector('h4').textContent;
                    const priceText = card.querySelector('.price').textContent;
                    const amount = parseInt(priceText.replace('₹', '').replace(',', ''));
                    const productId = 'PRODUCT_' + Date.now();
                    
                    initiatePayment(productName, amount, productId);
                }
            });
        }
    });
});
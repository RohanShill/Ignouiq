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
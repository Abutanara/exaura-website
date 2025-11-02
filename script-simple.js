// Simple script for language-specific pages (no translation needed)
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚭 My Quitly website loaded successfully!');
    
    // Smooth scrolling for navigation links
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

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // App Store Links
    const appStoreLinks = {
        ios: 'https://apps.apple.com/app/myquitly/id123456789', // Replace with your actual iOS App Store URL
        android: 'https://play.google.com/store/apps/details?id=com.myquitly.quitsmokingapp' // Replace with your actual Google Play URL
    };
    
    // Add click handlers for app store buttons
    document.querySelectorAll('.app-store-btn, .app-store-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the store type from data-store attribute
            const store = btn.getAttribute('data-store');
            console.log('App store button clicked, store:', store);
            
            if (store && appStoreLinks[store]) {
                console.log(`Opening ${store} app store:`, appStoreLinks[store]);
                window.open(appStoreLinks[store], '_blank');
            } else {
                console.log('No valid store found, showing notification');
                showNotification('App store links will be available soon!', 'info');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // GDPR Cookie Banner Functionality
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieModal = document.getElementById('cookie-modal');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    const cookieDetails = document.getElementById('cookie-details');
    const cookieModalClose = document.getElementById('cookie-modal-close');
    const cookieSavePreferences = document.getElementById('cookie-save-preferences');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        if (cookieBanner) {
            cookieBanner.style.display = 'block';
        }
    }

    // Cookie banner event listeners
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            if (cookieBanner) cookieBanner.style.display = 'none';
            // Initialize analytics here
            console.log('Cookies accepted - analytics initialized');
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            if (cookieBanner) cookieBanner.style.display = 'none';
            console.log('Cookies rejected');
        });
    }

    if (cookieDetails) {
        cookieDetails.addEventListener('click', () => {
            if (cookieModal) {
                cookieModal.style.display = 'block';
            }
        });
    }

    if (cookieModalClose) {
        cookieModalClose.addEventListener('click', () => {
            if (cookieModal) {
                cookieModal.style.display = 'none';
            }
        });
    }

    if (cookieSavePreferences) {
        cookieSavePreferences.addEventListener('click', () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            
            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('analyticsCookies', analytics);
            localStorage.setItem('marketingCookies', marketing);
            
            if (cookieBanner) cookieBanner.style.display = 'none';
            if (cookieModal) cookieModal.style.display = 'none';
            
            console.log('Cookie preferences saved:', { analytics, marketing });
        });
    }

    // Close modal when clicking outside
    if (cookieModal) {
        cookieModal.addEventListener('click', (e) => {
            if (e.target === cookieModal) {
                cookieModal.style.display = 'none';
            }
        });
    }

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

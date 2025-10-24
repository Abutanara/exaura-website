// Translation system for language-specific pages
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚭 Exaura website loaded successfully!');
    
    // Load translations from JSON file
    try {
        const response = await fetch('./translations.json');
        if (response.ok) {
            const translations = await response.json();
            console.log('Translations loaded:', translations);
            
            // Apply translations to all elements with data-translate attribute
            const elements = document.querySelectorAll('[data-translate]');
            console.log(`Found ${elements.length} elements to translate`);
            
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                const translation = getTranslationByKey(translations, key);
                
                if (translation) {
                    if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                        element.placeholder = translation;
                    } else if (element.tagName === 'TEXTAREA') {
                        element.placeholder = translation;
                    } else {
                        element.textContent = translation;
                    }
                    console.log(`Translated ${key}: ${translation}`);
                } else {
                    console.warn(`Translation missing for key: ${key}`);
                }
            });
        } else {
            console.error('Failed to load translations.json');
        }
    } catch (error) {
        console.error('Error loading translations:', error);
    }
    
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
        ios: 'https://apps.apple.com/app/exaura/id123456789', // Replace with your actual iOS App Store URL
        android: 'https://play.google.com/store/apps/details?id=com.exaura.quitsmokingapp' // Replace with your actual Google Play URL
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

// Helper function to get translation by key path (e.g., 'hero.title' -> translations.hero.title)
function getTranslationByKey(translations, key) {
    const keys = key.split('.');
    let translation = translations;
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return null;
        }
    }
    
    return translation;
}

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

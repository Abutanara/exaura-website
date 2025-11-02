// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-animate class to elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .about-text, .visual-card, .contact-item, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.transform = `scaleX(1)`;
                        entry.target.style.width = width;
                    }, 200);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        progressObserver.observe(bar);
    });
});

// App Store Links
document.addEventListener('DOMContentLoaded', () => {
    // App Store Links - Update these with your actual app store URLs
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
    
    // Add analytics tracking for app store clicks
    document.querySelectorAll('.app-store-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const store = btn.getAttribute('data-store');
            console.log(`App store click tracked: ${store}`);
            // Add your analytics tracking here
        });
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
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        const rate = scrolled * -0.5;
        phoneMockup.style.transform = `translateY(${rate}px)`;
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number) {
                    animateCounter(stat, number);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe hero stats for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }
});

// Add hover effects to feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'My Quitly';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 3rem;
            font-weight: 700;
            z-index: 10000;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(section);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Enter key activates focused buttons
    if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
        document.activeElement.click();
    }
});

// Add focus styles for better accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .nav-link:focus,
    .btn:focus,
    input:focus,
    textarea:focus {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
    }
    
    .nav-link:focus {
        outline-color: #6366f1;
    }
`;
document.head.appendChild(focusStyle);

// Language Detection and Switching
let currentLanguage = 'en';
let translations = {};

// Embedded translations (fallback when JSON files can't be loaded)
const embeddedTranslations = {
    en: {
        "nav": {
            "logo": "🚭 My Quitly",
            "home": "Home",
            "features": "Features",
            "about": "About",
            "contact": "Contact",
            "getStarted": "Get Started",
            "forceGerman": "Force DE"
        },
        "hero": {
            "badge": "Your Journey to Freedom",
            "title": "Quit Smoking with",
            "titleHighlight": "Smart Support",
            "description": "My Quitly is a quit smoking companion app that adapts to your pace. Track your progress, earn rewards, and work towards your goals with personalized support.",
            "downloadAppStore": "Download on the",
            "downloadGooglePlay": "GET IT ON",
            "appStore": "App Store",
            "googlePlay": "Google Play",
            "freeToDownload": "Free to Download",
            "iosAndroid": "iOS & Android",
            "languages": "EN & DE Languages"
        },
        "features": {
            "title": "Your Quit Smoking Companion",
            "subtitle": "Tools and features designed to support your journey towards your goals",
            "adaptiveIntelligence": {
                "title": "Adaptive Intelligence",
                "description": "Smart features that adapt to your progress and patterns, providing personalized support for your journey."
            },
            "progressiveReduction": {
                "title": "Progressive Reduction",
                "description": "Gradual reduction approach that lets you set your own pace. Track daily targets and work towards your goals step by step."
            },
            "gamification": {
                "title": "Gamification",
                "description": "Earn XP, unlock badges, complete missions, and level up as you progress on your quit journey."
            },
            "cravingResistance": {
                "title": "Craving Resistance",
                "description": "Track and resist cravings with our built-in timer. Log trigger intensity and learn your patterns."
            },
            "triggerAnalysis": {
                "title": "Trigger Analysis",
                "description": "Identify patterns in your behavior - emotions, locations, and situations - to help you understand your habits better."
            },
            "milestoneCelebrations": {
                "title": "Milestone Celebrations",
                "description": "Celebrate your achievements with milestone rewards and progress tracking as you reach your goals."
            }
        },
        "about": {
            "title": "About My Quitly",
            "description1": "My Quitly is your personal companion on the journey to your goals. Built with user-focused design and powered by adaptive intelligence, we help you work towards your objectives at your own pace.",
            "description2": "Our approach combines progressive techniques with gamification elements to make your journey engaging and sustainable. Every feature is designed to support your progress and celebrate your achievements.",
            "feature1": "Progressive approach to your goals",
            "feature2": "Personalized journey planning",
            "feature3": "Support and motivation features",
            "goalAchievement": "Goal Achievement",
            "userEngagement": "User Engagement",
            "featureUsage": "Feature Usage"
        },
        "contact": {
            "title": "Start Your Journey Today",
            "subtitle": "Ready to work towards your goals? Download My Quitly and take the first step on your journey.",
            "support": "Support",
            "supportEmail": "info@stargate-innovationhub.com",
            "availableOn": "Available On",
            "platforms": "iOS & Android",
            "languages": "Languages",
            "supportedLanguages": "English & German",
            "yourName": "Your Name",
            "yourEmail": "Your Email",
            "yourMessage": "Tell us about your journey or ask a question...",
            "sendMessage": "Send Message"
        },
        "footer": {
            "logo": "🚭 My Quitly",
            "description": "Your trusted companion on your journey. Personalized, supportive, and designed to help you reach your goals.",
            "appFeatures": "App Features",
            "progressTracking": "Progress Tracking",
            "gamification": "Gamification",
            "analytics": "Analytics",
            "supportTools": "Support Tools",
            "support": "Support",
            "aboutMy Quitly": "About My Quitly",
            "contactSupport": "Contact Support",
            "privacyPolicy": "Privacy Policy",
            "termsOfService": "Terms of Service",
            "download": "Download",
            "iosAppStore": "iOS App Store",
            "googlePlayStore": "Google Play Store",
            "webVersion": "Web Version",
            "systemRequirements": "System Requirements",
            "allRightsReserved": "All rights reserved."
        },
        "phone": {
            "trackProgress": "Track Progress",
            "earnRewards": "Earn Rewards",
            "stayMotivated": "Stay Motivated"
        },
        "cookie": {
            "title": "🍪 Cookie Notice",
            "description": "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Allow\", you consent to our use of cookies.",
            "reject": "Reject",
            "moreDetails": "More Details",
            "allow": "Allow",
            "preferences": "Cookie Preferences",
            "essential": "Essential Cookies",
            "essentialDesc": "These cookies are necessary for the website to function and cannot be switched off.",
            "alwaysActive": "Always Active",
            "analytics": "Analytics Cookies",
            "analyticsDesc": "These cookies help us understand how visitors interact with our website.",
            "marketing": "Marketing Cookies",
            "marketingDesc": "These cookies are used to track visitors across websites for marketing purposes.",
            "savePreferences": "Save Preferences"
        },
        "language": {
            "current": "EN",
            "switchTo": "DE"
        }
    },
    de: {
        "nav": {
            "logo": "🚭 My Quitly",
            "home": "Startseite",
            "features": "Funktionen",
            "about": "Über uns",
            "contact": "Kontakt",
            "getStarted": "Loslegen",
            "forceGerman": "Force DE"
        },
        "hero": {
            "badge": "Deine Reise zur Freiheit",
            "title": "Mit dem Rauchen aufhören mit",
            "titleHighlight": "Intelligenter Unterstützung",
            "description": "My Quitly ist eine Begleit-App zum Rauchstopp, die sich an dein Tempo anpasst. Verfolge deinen Fortschritt, verdiene Belohnungen und arbeite mit personalisierter Unterstützung an deinen Zielen.",
            "downloadAppStore": "Im App Store laden",
            "downloadGooglePlay": "JETZT HERUNTERLADEN",
            "appStore": "App Store",
            "googlePlay": "Google Play",
            "freeToDownload": "Kostenlos herunterladen",
            "iosAndroid": "iOS & Android",
            "languages": "DE & EN Sprachen"
        },
        "features": {
            "title": "Dein Begleiter beim Rauchstopp",
            "subtitle": "Tools und Funktionen, die darauf ausgelegt sind, dich auf deinem Weg zu deinen Zielen zu unterstützen",
            "adaptiveIntelligence": {
                "title": "Adaptive Intelligenz",
                "description": "Intelligente Funktionen, die sich an deinen Fortschritt und deine Muster anpassen und personalisierte Unterstützung für deine Reise bieten."
            },
            "progressiveReduction": {
                "title": "Schrittweise Reduzierung",
                "description": "Ein schrittweiser Ansatz, der es dir ermöglicht, dein eigenes Tempo zu bestimmen. Verfolge tägliche Ziele und arbeite Schritt für Schritt an deinen Zielen."
            },
            "gamification": {
                "title": "Gamification",
                "description": "Verdiene XP, schalte Abzeichen frei, absolviere Missionen und steige auf, während du auf deinem Weg zum Rauchstopp vorankommst."
            },
            "cravingResistance": {
                "title": "Craving-Widerstand",
                "description": "Verfolge und widerstehe Cravings mit unserem eingebauten Timer. Protokolliere Trigger-Intensität und lerne deine Muster kennen."
            },
            "triggerAnalysis": {
                "title": "Trigger-Analyse",
                "description": "Identifiziere Muster in deinem Verhalten - Emotionen, Orte und Situationen - um deine Gewohnheiten besser zu verstehen."
            },
            "milestoneCelebrations": {
                "title": "Meilenstein-Feiern",
                "description": "Feiere deine Erfolge mit Meilenstein-Belohnungen und Fortschrittsverfolgung, während du deine Ziele erreichst."
            }
        },
        "about": {
            "title": "Über My Quitly",
            "description1": "My Quitly ist dein persönlicher Begleiter auf dem Weg zu deinen Zielen. Mit benutzerorientiertem Design und adaptiver Intelligenz helfen wir dir, in deinem eigenen Tempo an deinen Zielen zu arbeiten.",
            "description2": "Unser Ansatz kombiniert progressive Techniken mit Gamification-Elementen, um deine Reise ansprechend und nachhaltig zu gestalten. Jede Funktion ist darauf ausgelegt, deinen Fortschritt zu unterstützen und deine Erfolge zu feiern.",
            "feature1": "Progressive Herangehensweise an deine Ziele",
            "feature2": "Personalisiertes Reiseplanung",
            "feature3": "Unterstützungs- und Motivationsfunktionen",
            "goalAchievement": "Zielerreichung",
            "userEngagement": "Nutzerengagement",
            "featureUsage": "Funktionsnutzung"
        },
        "contact": {
            "title": "Starte heute deine Reise",
            "subtitle": "Bereit, an deinen Zielen zu arbeiten? Lade My Quitly herunter und mache den ersten Schritt auf deiner Reise.",
            "support": "Support",
            "supportEmail": "info@stargate-innovationhub.com",
            "availableOn": "Verfügbar für",
            "platforms": "iOS & Android",
            "languages": "Sprachen",
            "supportedLanguages": "Deutsch & Englisch",
            "yourName": "Dein Name",
            "yourEmail": "Deine E-Mail",
            "yourMessage": "Erzähle uns von deiner Reise oder stelle eine Frage...",
            "sendMessage": "Nachricht senden"
        },
        "footer": {
            "logo": "🚭 My Quitly",
            "description": "Dein vertrauensvoller Begleiter auf deiner Reise. Personalisiert, unterstützend und darauf ausgelegt, dir zu helfen, deine Ziele zu erreichen.",
            "appFeatures": "App-Funktionen",
            "progressTracking": "Fortschrittsverfolgung",
            "gamification": "Gamification",
            "analytics": "Analytik",
            "supportTools": "Support-Tools",
            "support": "Support",
            "aboutMy Quitly": "Über My Quitly",
            "contactSupport": "Support kontaktieren",
            "privacyPolicy": "Datenschutzrichtlinie",
            "termsOfService": "Nutzungsbedingungen",
            "download": "Herunterladen",
            "iosAppStore": "iOS App Store",
            "googlePlayStore": "Google Play Store",
            "webVersion": "Web-Version",
            "systemRequirements": "Systemanforderungen",
            "allRightsReserved": "Alle Rechte vorbehalten."
        },
        "phone": {
            "trackProgress": "Fortschritt verfolgen",
            "earnRewards": "Belohnungen verdienen",
            "stayMotivated": "Motiviert bleiben"
        },
        "cookie": {
            "title": "🍪 Cookie-Hinweis",
            "description": "Wir verwenden Cookies, um dein Browsing-Erlebnis zu verbessern, personalisierte Inhalte bereitzustellen und unseren Traffic zu analysieren. Durch Klicken auf \"Erlauben\" stimmst du der Verwendung unserer Cookies zu.",
            "reject": "Ablehnen",
            "moreDetails": "Weitere Details",
            "allow": "Erlauben",
            "preferences": "Cookie-Einstellungen",
            "essential": "Notwendige Cookies",
            "essentialDesc": "Diese Cookies sind für die Funktionalität der Website erforderlich und können nicht deaktiviert werden.",
            "alwaysActive": "Immer aktiv",
            "analytics": "Analyse-Cookies",
            "analyticsDesc": "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.",
            "marketing": "Marketing-Cookies",
            "marketingDesc": "Diese Cookies werden verwendet, um Besucher über Websites hinweg für Marketingzwecke zu verfolgen.",
            "savePreferences": "Einstellungen speichern"
        },
        "language": {
            "current": "DE",
            "switchTo": "EN"
        }
    }
};

// Load translation file for specific language (with embedded fallback)
async function loadTranslations(language) {
    try {
        console.log(`Attempting to load translations for: ${language}`);
        const response = await fetch(`locales/${language}.json`);
        console.log(`Response status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`Successfully loaded ${language} translations from JSON file`);
            return data;
        } else {
            throw new Error(`Failed to load ${language}.json`);
        }
    } catch (error) {
        console.warn(`Failed to load JSON translations for ${language}, using embedded translations:`, error.message);
        console.log(`Using embedded translations for: ${language}`);
        return embeddedTranslations[language] || embeddedTranslations.en;
    }
}

// Detect user's language preference
function detectUserLanguage() {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('myquitly-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
        console.log('Using saved language from localStorage:', savedLanguage);
        return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    console.log('Browser language:', browserLang);
    if (browserLang.startsWith('de')) {
        console.log('Detected German from browser language');
        return 'de';
    }
    
    // Check for German-speaking countries based on timezone
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('User timezone:', timezone);
        const germanTimezones = ['Europe/Berlin', 'Europe/Vienna', 'Europe/Zurich', 'Europe/Luxembourg', 'Europe/Vaduz'];
        if (germanTimezones.includes(timezone)) {
            console.log('Detected German from timezone');
            return 'de';
        }
    } catch (e) {
        console.log('Timezone detection failed:', e);
    }
    
    // For testing - force German if no other detection works
    // Remove this line in production
    console.log('No German detection found, defaulting to English');
    return 'en';
}

// Get translation by key path (e.g., 'hero.title' -> translations.hero.title)
function getTranslation(key) {
    const keys = key.split('.');
    let translation = translations;
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            console.warn(`Translation missing for key: ${key}`);
            return null;
        }
    }
    
    return translation;
}

// Translate all elements with data-translate attribute
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    console.log(`Found ${elements.length} elements to translate for language: ${currentLanguage}`);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
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
            console.warn(`No translation found for key: ${key}`);
            // Keep the original text if no translation is found
            console.log(`Keeping original text for: ${element.textContent}`);
        }
    });
    
    // Update language switcher
    const langSwitcher = document.querySelector('.current-lang');
    if (langSwitcher) {
        langSwitcher.textContent = getTranslation('language.current') || currentLanguage.toUpperCase();
    }
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Update page title and meta description
    if (currentLanguage === 'de') {
        document.title = 'My Quitly - Deine Reise zur Freiheit vom Rauchen';
        document.querySelector('meta[name="description"]').content = 'My Quitly - Eine Begleit-App zum Rauchstopp, die dir hilft, mit progressiver Reduzierung, Gamification und personalisierter Unterstützung mit dem Rauchen aufzuhören.';
        
        // Update privacy and terms links for German
        const privacyLinks = document.querySelectorAll('a[href="privacy.html"]');
        const termsLinks = document.querySelectorAll('a[href="terms.html"]');
        privacyLinks.forEach(link => link.href = 'privacy-de.html');
        termsLinks.forEach(link => link.href = 'terms-de.html');
    } else {
        document.title = 'My Quitly - Your Journey to Freedom from Smoking';
        document.querySelector('meta[name="description"]').content = 'My Quitly - A science-backed quit smoking app that helps you break free from cigarettes through progressive reduction, gamification, and personalized support.';
        
        // Update privacy and terms links for English
        const privacyLinks = document.querySelectorAll('a[href="privacy-de.html"]');
        const termsLinks = document.querySelectorAll('a[href="terms-de.html"]');
        privacyLinks.forEach(link => link.href = 'privacy.html');
        termsLinks.forEach(link => link.href = 'terms.html');
    }
}

// Update page meta information (title, description)
function updatePageMeta() {
    if (currentLanguage === 'de') {
        document.title = 'My Quitly - Deine Reise zur Freiheit vom Rauchen';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = 'My Quitly - Eine Begleit-App zum Rauchstopp, die dir hilft, mit progressiver Reduzierung, Gamification und personalisierter Unterstützung mit dem Rauchen aufzuhören.';
        }
    } else {
        document.title = 'My Quitly - Your Journey to Freedom from Smoking';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = 'My Quitly - A science-backed quit smoking app that helps you break free from cigarettes through progressive reduction, gamification, and personalized support.';
        }
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Language initialization
    currentLanguage = detectUserLanguage();
    console.log('Detected language:', currentLanguage);
    
    // Load translations for the detected language
    translations = await loadTranslations(currentLanguage);
    console.log('Loaded translations:', translations);
    console.log('Available translation keys:', Object.keys(translations));
    
    // Translate the page immediately
    translatePage();
    
    // Force update the page title and meta description
    updatePageMeta();
    
    // Show the page after translation is complete
    document.body.classList.add('translated');
    
    // Set up language switcher
    const languageSwitcher = document.getElementById('language-switcher');
    const forceGermanBtn = document.getElementById('force-german');
    console.log('Language switcher element:', languageSwitcher);
    console.log('Force German button:', forceGermanBtn);
    
    if (languageSwitcher) {
        console.log('Setting up language switcher event listener...');
        
        languageSwitcher.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 LANGUAGE SWITCHER CLICKED!');
            console.log('Current language before switch:', currentLanguage);
            
            // Toggle language
            currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
            console.log('New language after toggle:', currentLanguage);
            
            // Show immediate feedback
            console.log('Loading translations...');
            
            // Load new translations
            translations = await loadTranslations(currentLanguage);
            console.log('Translations loaded:', Object.keys(translations).length, 'sections');
            
            // Translate the page
            console.log('Translating page...');
            translatePage();
            
            // Update page meta
            updatePageMeta();
            
            // Save preference
            localStorage.setItem('myquitly-language', currentLanguage);
            console.log('Language preference saved to localStorage');
            
            // Show notification
            showNotification(
                currentLanguage === 'de' ? 'Sprache zu Deutsch gewechselt' : 'Language switched to English',
                'success'
            );
            
            console.log('✅ Language switch completed!');
        });
        
        // Test if the button is clickable
        console.log('Language switcher setup complete. Button should be clickable now.');
    } else {
        console.error('❌ Language switcher element not found!');
        console.error('Available elements with IDs:', document.querySelectorAll('[id]'));
    }
    
    // Set up force German button for testing
    if (forceGermanBtn) {
        forceGermanBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('🔧 FORCE GERMAN BUTTON CLICKED!');
            
            currentLanguage = 'de';
            translations = await loadTranslations(currentLanguage);
            console.log('Force loaded German translations:', Object.keys(translations));
            
            translatePage();
            updatePageMeta();
            localStorage.setItem('myquitly-language', 'de');
            
            console.log('✅ Forced German language applied!');
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
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Accept all cookies
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            setCookieConsent('all');
            hideCookieBanner();
        });
    }
    
    // Reject all non-essential cookies
    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            setCookieConsent('essential');
            hideCookieBanner();
        });
    }
    
    // Show details modal
    if (cookieDetails) {
        cookieDetails.addEventListener('click', () => {
            cookieModal.classList.add('show');
        });
    }
    
    // Close modal
    if (cookieModalClose) {
        cookieModalClose.addEventListener('click', () => {
            cookieModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (cookieModal) {
        cookieModal.addEventListener('click', (e) => {
            if (e.target === cookieModal) {
                cookieModal.classList.remove('show');
            }
        });
    }
    
    // Save preferences
    if (cookieSavePreferences) {
        cookieSavePreferences.addEventListener('click', () => {
            const analytics = document.getElementById('analytics-cookies');
            const marketing = document.getElementById('marketing-cookies');
            
            let consent = 'essential';
            if (analytics && analytics.checked) consent += ',analytics';
            if (marketing && marketing.checked) consent += ',marketing';
            
            setCookieConsent(consent);
            hideCookieBanner();
            cookieModal.classList.remove('show');
        });
    }
    
    function setCookieConsent(consent) {
        localStorage.setItem('cookieConsent', consent);
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        
        // Here you would typically initialize analytics or other tracking based on consent
        console.log('Cookie consent set to:', consent);
        
        // Example: Initialize Google Analytics only if consent includes analytics
        if (consent.includes('analytics')) {
            // gtag('config', 'GA_MEASUREMENT_ID');
            console.log('Analytics cookies enabled');
        }
        
        if (consent.includes('marketing')) {
            // Initialize marketing tracking
            console.log('Marketing cookies enabled');
        }
    }
    
    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
        }
    }
    
    // Load saved preferences into modal
    if (cookieConsent) {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');
        
        if (analyticsCheckbox && cookieConsent.includes('analytics')) {
            analyticsCheckbox.checked = true;
        }
        if (marketingCheckbox && cookieConsent.includes('marketing')) {
            marketingCheckbox.checked = true;
        }
    }
});

console.log('🚭 My Quitly quit smoking app website loaded successfully!');

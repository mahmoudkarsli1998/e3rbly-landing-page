// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initScrollToTop();
    initActiveNavigation();
});

// Header scroll effect
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = mobileMenuBtn.classList.contains('active');
            
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            backdrop.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Close menu when clicking on backdrop
        backdrop.addEventListener('click', function() {
            closeMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu function
        function closeMenu() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for feature cards
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Get delay from data attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll to Features section
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = featuresSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to Download section
function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = downloadSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Download app function
function downloadApp(platform) {
    if (platform === 'android') {
        // Redirect to Google Play Store
        window.open('https://play.google.com/store/apps/details?id=com.mahmoudkarsli1998.e3rbly', '_blank');
        trackDownloadClick(platform);
    } else if (platform === 'ios') {
        // Show coming soon notification for iOS with Apple logo
        showNotification('قريبًا على App Store!', 'ios');
        trackDownloadClick(platform);
    } else {
        // Fallback message
        showNotification('قريبًا! سيتم إطلاق التطبيق على متاجر التطبيقات');
    }
}

// Show notification
function showNotification(message, platform = null) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification glass-card';
    
    // Create notification content with icon and text
    const notificationContent = document.createElement('div');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
        justify-content: center;
    `;
    
    // Add platform-specific icon
    if (platform === 'ios') {
        const iosIcon = document.createElement('div');
        iosIcon.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="color: #60a5fa;">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
        `;
        notificationContent.appendChild(iosIcon);
    } else if (platform === 'android') {
        const androidIcon = document.createElement('div');
        androidIcon.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="color: #34d399;">
                <path d="M17.523 15.3414c-.5665 0-.9726-.4061-.9726-.9726v-1.7707c0-.5665.4061-.9726.9726-.9726s.9726.4061.9726.9726v1.7707c0 .5665-.4061.9726-.9726.9726zm-11.046 0c-.5665 0-.9726-.4061-.9726-.9726v-1.7707c0-.5665.4061-.9726.9726-.9726s.9726.4061.9726.9726v1.7707c0 .5665-.4061.9726-.9726.9726zm11.405-6.9089L16.4 6.8667c.0424-.0566.0283-.1415-.0283-.1698-.0566-.0283-.1415-.0283-.1698.0283L14.729 8.2832c-.7932-.3679-1.6993-.5948-2.729-.5948s-1.9358.227-2.729.5948L7.7985 6.7252c-.0283-.0566-.1132-.0566-.1698-.0283-.0566.0283-.0707.1132-.0283.1698l1.4823 1.5531C7.6953 9.2387 6.8749 10.637 6.8749 12.2285v.8215h10.2502v-.8215c0-1.5915-.8204-2.9898-2.2278-3.8374zM9.721 11.1405c-.283 0-.5099-.227-.5099-.5099s.227-.5099.5099-.5099.5099.227.5099.5099-.227.5099-.5099.5099zm4.558 0c-.283 0-.5099-.227-.5099-.5099s.227-.5099.5099-.5099.5099.227.5099.5099-.227.5099-.5099.5099z"/>
            </svg>
        `;
        notificationContent.appendChild(androidIcon);
    }
    
    // Add message text
    const messageText = document.createElement('span');
    messageText.textContent = message;
    messageText.style.cssText = `
        font-weight: 500;
        font-size: 16px;
    `;
    notificationContent.appendChild(messageText);
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: rgba(102, 126, 234, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        color: white;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
        max-width: 320px;
        text-align: center;
    `;
    
    // Append content to notification
    notification.appendChild(notificationContent);
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Track download clicks (placeholder for analytics)
function trackDownloadClick(platform) {
    // This is where you would add your analytics code
    console.log(`Download clicked for platform: ${platform}`);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'download_click', {
    //         'platform': platform,
    //         'event_category': 'engagement',
    //         'event_label': 'App Download'
    //     });
    // }
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const phoneHero = document.querySelector('.phone-hero');
    
    if (phoneHero && scrolled < 1000) {
        phoneHero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add mouse move effect for glass cards
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) translateZ(10px)`;
        } else {
            card.style.transform = '';
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

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(function() {
    // Any scroll-heavy operations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload images for better performance
function preloadImages() {
    const images = [
        // Add image URLs here if you have any
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
preloadImages();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in elements
    const elements = document.querySelectorAll('.hero-content, .phone-hero');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Handle form submissions (if you add a contact form later)
function handleFormSubmit(e) {
    e.preventDefault();
    // Add your form handling logic here
    showNotification('شكراً لتواصلك معنا! سنرد عليك قريباً.');
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Add focus visible for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Console welcome message
console.log('%c🎉 مرحباً بك في E3RBLY - اعربلي!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cتطبيق تعلم اللغة العربية بالذكاء الاصطناعي', 'color: #764ba2; font-size: 14px;');
console.log('%cللمزيد من المعلومات: https://e3rbly.com', 'color: #666; font-size: 12px;');
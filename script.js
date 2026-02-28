// Simple Tattooer Landing Page JavaScript
// Mobile-first interactive features with smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove background based on scroll position
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll('.problem-card, .feature-card, .testimonial-card, .solution-text, .solution-visual');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
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
            element.textContent = Math.floor(current) + (target === 100 ? '%' : target === 0 ? '' : '+');
        }, 16);
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const text = statNumber.textContent;
                    
                    if (text.includes('10')) {
                        animateCounter(statNumber, 10);
                    } else if (text.includes('100')) {
                        animateCounter(statNumber, 100);
                    } else if (text.includes('0')) {
                        animateCounter(statNumber, 0);
                    } else if (text.includes('135')) {
                        animateCounter(statNumber, 135);
                    } else if (text.includes('2025')) {
                        animateCounter(statNumber, 2025);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat elements
    document.querySelectorAll('.hero-stats .stat, .cta-stats .cta-stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form handling with better UX
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        const emailInput = waitlistForm.querySelector('input[name="email"]');
        const submitButton = waitlistForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Email validation
        emailInput.addEventListener('input', function() {
            const isValid = this.checkValidity();
            if (isValid) {
                this.style.borderColor = 'var(--success)';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            } else {
                this.style.borderColor = 'var(--border)';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.6';
            }
        });

        waitlistForm.addEventListener('submit', function(e) {
            // Show loading state
            submitButton.textContent = 'Joining...';
            submitButton.disabled = true;
            
            // Add some visual feedback
            submitButton.style.background = 'var(--success)';
            
            // Reset after a delay (FormSubmit will redirect anyway)
            setTimeout(() => {
                submitButton.textContent = 'Joined! 🎉';
            }, 1000);
        });
    }

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-bg-image');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .feature-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title (optional - can be removed if too much)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) { // Only on desktop
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add loading states to external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add visual feedback for external links
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });

    // Progressive enhancement: Add more interactive features for modern browsers
    if ('IntersectionObserver' in window) {
        // Add stagger animation to grid items
        const gridContainers = document.querySelectorAll('.problem-grid, .features-grid, .testimonials-grid');
        gridContainers.forEach(grid => {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    // Handle form success state (if user returns to page)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const waitlistForm = document.querySelector('.waitlist-form');
        if (waitlistForm) {
            waitlistForm.innerHTML = `
                <div style="text-align: center; padding: 2rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); border-radius: var(--radius-lg);">
                    <h3 style="color: var(--success); margin-bottom: 1rem;">🎉 You're on the list!</h3>
                    <p style="color: var(--text-secondary);">We'll notify you as soon as Simple Tattooer launches.</p>
                </div>
            `;
        }
    }

    // Easter egg: Console message for developers
    console.log('%c🎨 Simple Tattooer', 'color: #7c3aed; font-size: 24px; font-weight: bold;');
    console.log('%cJust Tattoo Again.', 'color: #a855f7; font-size: 16px;');
    console.log('%cBuilt with ❤️ by BWS | https://bayouwebstudio.com', 'color: #71717a; font-size: 12px;');
});

// Utility functions
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

// Performance: Debounce scroll events
const debouncedScroll = debounce(() => {
    // Any scroll-intensive operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
}
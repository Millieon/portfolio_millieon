// Custom Cursor System
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update cursor position immediately on mouse move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

// Smooth follower animation with requestAnimationFrame
function animateFollower() {
    const speed = 0.2;
    
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    
    requestAnimationFrame(animateFollower);
}

// Start follower animation
if (cursor && cursorFollower) {
    animateFollower();
}

// Cursor hover effects for interactive elements
const hoverElements = document.querySelectorAll('a, .flex-item, button, .project-image');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'rgba(0, 0, 0, 0.5)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'rgba(0, 0, 0, 0.2)';
        }
    });
});

// Smooth scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply fade-in animations to text elements
document.querySelectorAll('h3, h4, .bio-text p, .project-list').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Enhanced project item interactions
document.querySelectorAll('.flex-item').forEach((item, index) => {
    // Subtle click animation
    item.addEventListener('click', (e) => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    });

    // Enhanced hover effects
    item.addEventListener('mouseenter', () => {
        const yearLabel = item.querySelector('.year-label');
        const title = item.querySelector('h4');
        const image = item.querySelector('img');
        
        if (yearLabel) {
            yearLabel.style.opacity = '1';
            yearLabel.style.transform = 'translateY(-5px)';
        }
        
        if (title) {
            title.style.transform = 'translateY(-5px)';
        }
        
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const yearLabel = item.querySelector('.year-label');
        const title = item.querySelector('h4');
        const image = item.querySelector('img');
        
        if (yearLabel) {
            yearLabel.style.opacity = '0.9';
            yearLabel.style.transform = 'translateY(0)';
        }
        
        if (title) {
            title.style.transform = 'translateY(0)';
        }
        
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Staggered animations for project entries
function animateProjectEntries() {
    const projectEntries = document.querySelectorAll('.project-entry');
    
    projectEntries.forEach((entry, index) => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            entry.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            entry.style.opacity = '0.7';
            entry.style.transform = 'translateX(0)';
        }, index * 100 + 200);
    });
}

// Enhanced loading sequence
window.addEventListener('load', () => {
    // Animate header elements
    const h1 = document.querySelector('h1');
    const bioText = document.querySelector('.bio-text');
    
    if (h1) {
        h1.style.opacity = '0';
        h1.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            h1.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            h1.style.opacity = '1';
            h1.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (bioText) {
        bioText.style.opacity = '0';
        bioText.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            bioText.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            bioText.style.opacity = '1';
            bioText.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // Animate project entries after a delay
    setTimeout(animateProjectEntries, 1200);
});

// Smooth scroll for internal links (if any)
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

// Image loading optimization and error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.project-image, img');
    
    images.forEach(img => {
        // Handle successful image load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        // Handle image load errors
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
            
            // Show the parent container's background as fallback
            const parent = this.closest('.flex-item');
            if (parent) {
                parent.style.background = '#f0f0f0';
            }
        });
        
        // Set initial state for fade-in effect
        if (img.classList.contains('project-image')) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });
});

// Performance optimization: throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Add any scroll-based animations here if needed
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Accessibility: Remove cursor on touch devices
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.style.cursor = 'auto';
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

// Analytics for external links (optional)
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add analytics tracking here if needed
        console.log('External link clicked:', this.href);
    });
});

// Enhanced project grid interactions
document.querySelectorAll('.flex-container').forEach(container => {
    const items = container.querySelectorAll('.flex-item');
    
    container.addEventListener('mouseenter', () => {
        items.forEach(item => {
            item.style.transition = 'all 0.3s ease';
        });
    });
    
    container.addEventListener('mouseleave', () => {
        items.forEach(item => {
            item.style.transform = 'scale(1)';
        });
    });
});

// Add loading states for better UX
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

// Initialize loading state
showLoading();

// Hide loading once everything is ready
window.addEventListener('load', () => {
    setTimeout(hideLoading, 500);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or overlays
    if (e.key === 'Escape') {
        // Close any open overlays
        const overlays = document.querySelectorAll('.overlay, .modal');
        overlays.forEach(overlay => {
            overlay.style.display = 'none';
        });
    }
});

// Error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Add CSS classes for JavaScript-enabled features
document.documentElement.classList.add('js-enabled');
// Auto Background Changer System
class BackgroundChanger {
    constructor() {
        this.backgrounds = [
            { class: 'gradient-1', name: 'Gold Gradient' },
        ];
        
        this.currentIndex = 0;
        this.autoSpeed = 5000; // 5 seconds
        this.timer = null;
        
        this.init();
    }
    
    init() {
        this.startAutoChange();
    }
    
    startAutoChange() {
        this.stopAutoChange(); // Clear existing timer
        
        this.timer = setInterval(() => {
            this.nextBackground();
        }, this.autoSpeed);
    }
    
    stopAutoChange() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    nextBackground() {
        this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
        this.applyBackground(this.backgrounds[this.currentIndex]);
    }
    
    applyBackground(background) {
        const heroSection = document.querySelector('.hero-section');
        
        // Remove all background classes
        const classes = heroSection.className.split(' ').filter(className => 
            !className.startsWith('gradient-')
        );
        
        // Add new background class
        classes.push(background.class);
        heroSection.className = classes.join(' ');
    }
}

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        document.querySelector('.navbar').style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        document.querySelector('.navbar').style.backgroundColor = 'var(--white)';
        document.querySelector('.navbar').style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Background Changer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new BackgroundChanger();
});
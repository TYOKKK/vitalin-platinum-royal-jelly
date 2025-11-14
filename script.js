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

// Video Player Functionality - Auto Play
function initVideoPlayers() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playBtn = container.querySelector('.video-play-btn');
        
        if (video && playBtn) {
            // Set video properties for auto-play
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            
            // Auto play when video can play
            video.addEventListener('canplay', function() {
                video.play().then(() => {
                    container.classList.add('playing');
                }).catch(e => {
                    console.log('Auto-play prevented:', e);
                    container.classList.remove('playing');
                });
            });
            
            // Toggle play/pause on click
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    container.classList.add('playing');
                } else {
                    video.pause();
                    container.classList.remove('playing');
                }
            });
            
            // Also toggle on video click
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    container.classList.add('playing');
                } else {
                    video.pause();
                    container.classList.remove('playing');
                }
            });
            
            // Update playing state
            video.addEventListener('play', function() {
                container.classList.add('playing');
            });
            
            video.addEventListener('pause', function() {
                container.classList.remove('playing');
            });
            
            video.addEventListener('ended', function() {
                container.classList.remove('playing');
                // Auto replay
                setTimeout(() => {
                    video.play();
                }, 1000);
            });
            
            // Handle video errors
            video.addEventListener('error', function() {
                container.classList.remove('playing');
                console.error('Video error:', video.error);
            });
        }
    });
}

// Volume control functionality
function initVolumeControls() {
    const volumeBtns = document.querySelectorAll('.volume-btn');
    
    volumeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const video = this.closest('.video-wrapper').querySelector('video');
            video.muted = !video.muted;
            this.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
    });
}

// Initialize video players when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new BackgroundChanger();
    initVideoPlayers();
    initVolumeControls();
});

// Re-initialize videos when they become visible (for mobile optimization)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const videos = document.querySelectorAll('.video-container video');
        videos.forEach(video => {
            if (video.paused && isElementInViewport(video)) {
                video.play().catch(e => console.log('Re-play prevented:', e));
            }
        });
    }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
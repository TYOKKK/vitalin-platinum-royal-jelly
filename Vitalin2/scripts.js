// script.js – Vitalin Platinum Modern Farm House Edition
document.addEventListener("DOMContentLoaded", function () {

    // 1. Navbar Scroll Effect (Menambahkan class 'scrolled' saat scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Back to Top Button (Menampilkan tombol dan scroll ke atas)
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Smooth Scroll untuk semua link anchor (Perbaikan Bug Klik)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Pastikan bukan link ke '#' atau link kosong
            if (targetId === '#' || targetId === '') return; 

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80; // tinggi navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class pada saat klik
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 4. Auto-play / pause video saat masuk/keluar viewport (untuk 3 video galeri)
    const videos = document.querySelectorAll('video');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // Video akan play/pause jika 60% terlihat
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play dan handle error jika browser melarang autoplay
                entry.target.play().catch(() => {});
            } else {
                // Pause saat keluar viewport
                entry.target.pause();
            }
        });
    }, observerOptions);

    videos.forEach(video => {
        // Set properti yang dibutuhkan untuk autoplay
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        videoObserver.observe(video);
    });

    // 5. Active menu otomatis sesuai section yang lagi dilihat (saat scrolling)
    window.addEventListener('scroll', () => {
        let current = 'home'; // Default ke home
        document.querySelectorAll('section').forEach(section => {
            // Check jika section memiliki ID
            const sectionId = section.getAttribute('id');
            if (!sectionId) return; 

            // Offset 100px agar menu aktif sebelum section mencapai top
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
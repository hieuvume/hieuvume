/* ============================================
   VU TRUNG HIEU - PORTFOLIO INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });

    // Fallback: hide loader after 3s max
    setTimeout(() => {
        if (loader && !loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 500);
        }
    }, 3000);


    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });


    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ---- Parallax on Hero ----
    const heroImage = document.querySelector('.hero-image');
    const heroBlob = document.querySelector('.hero-blob');

    if (heroImage && heroBlob) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const parallaxValue = scrolled * 0.15;
                heroImage.style.transform = `translateY(${parallaxValue}px)`;
                heroBlob.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.08}px) scale(${1 + scrolled * 0.0002})`;
            }
        }, { passive: true });
    }


    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const originalText = el.textContent;
        const numMatch = originalText.match(/[\d,]+/);
        if (!numMatch) return;

        const targetText = numMatch[0].replace(/,/g, '');
        const target = parseInt(targetText);
        const suffix = originalText.replace(numMatch[0], '');
        const duration = 1500;
        const steps = 40;
        const stepTime = duration / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Ease-out curve
            const progress = 1 - Math.pow(1 - step / steps, 3);
            current = Math.floor(target * progress);

            if (current >= target || step >= steps) {
                el.textContent = originalText;
                clearInterval(timer);
            } else {
                // Format with K+ for large numbers
                if (target >= 1000) {
                    el.textContent = Math.floor(current / 1000) + 'K+';
                } else {
                    el.textContent = current + suffix;
                }
            }
        }, stepTime);
    }


    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = 'var(--accent)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }, { passive: true });

});

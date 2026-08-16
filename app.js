document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Navigation
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('nav-open', isOpen);
        });

        // Close nav menu when a link is clicked (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // ==========================================
    // 2. Intersection Observer for Scroll Fade-In
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ==========================================
    // 3. Theme Toggle Logic (Light / Dark)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ==========================================
    // 4. Back To Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            const shouldShow = window.scrollY > 500;
            backToTopBtn.classList.toggle('show', shouldShow);
        };

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
    }

    // ==========================================
    // 5. Custom Cursor Logic
    // ==========================================
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cursorDot = document.createElement('div');
        const cursorRing = document.createElement('div');
        
        cursorDot.classList.add('custom-cursor-dot');
        cursorRing.classList.add('custom-cursor-ring');
        
        // Set initial opacity to 0 to prevent flash before first move
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);
        
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let isMoving = false;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            if (!isMoving) {
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '1';
                isMoving = true;
            }
        });
        
        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(renderCursor);
        };
        renderCursor();
        
        window.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target && (target.closest('a') || target.closest('button') || target.closest('.theme-toggle') || window.getComputedStyle(target).cursor === 'pointer')) {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            }
        });
        
        window.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (target && (target.closest('a') || target.closest('button') || target.closest('.theme-toggle') || window.getComputedStyle(target).cursor === 'pointer')) {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            }
            
            if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
                cursorDot.style.opacity = '0';
                cursorRing.style.opacity = '0';
                isMoving = false;
            }
        });
        
        window.addEventListener('mousedown', () => {
            cursorDot.classList.add('click');
            cursorRing.classList.add('click');
        });
        
        window.addEventListener('mouseup', () => {
            cursorDot.classList.remove('click');
            cursorRing.classList.remove('click');
        });
    }

});

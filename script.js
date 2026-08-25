/**
 * Core Logic for Shlok Kondekar's Personal Portfolio
 * Pure Vanilla JS Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Configuration & Persistence Logic
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;
    
    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('shlok_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('shlok_portfolio_theme', nextTheme);
    });

    // 2. Dynamic Typing Animation Logic
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = [
        "B.Tech IT Student.",
        "Aspiring Data Engineer.",
        "Data Analytics & AI Explorer.",
        "Cloud & Lakehouse Builder.",
        "Open-Source Contributor (SSOC)."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 60; // Faster backspacing
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }
        
        // Handle phrase transition delays
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000);
    }

    // 3. Sticky Navbar & Back to Top Integration
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollProgressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Navbar sticky state
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top visibility
        if (scrollPos > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
        
        // Top scroll progress calculation
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercentage = (scrollPos / totalHeight) * 100;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${progressPercentage}%`;
        }
        
        // Update Active navigation tab based on position
        updateActiveNavSection();
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Mobile Menu Drawer Interactivity
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            // Toggle hamburger icon state smoothly
            const icon = menuBtn.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close Drawer when clicking any link internally
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 5. Scroll Active Navigation Mapping Logic
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavSection() {
        const scrollPosition = window.scrollY + 150; // Offset adjustment
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
    }

    // 6. Scroll Reveal Engine (Intersection Observer API)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after single animation cycle
                // observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic Copyright Year Updater
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// 7. Window Load Handlers (Preloader termination)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Smoothly fade out screen preloader
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// 8. Client-Side Form Simulation Processing
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const feedbackDiv = document.getElementById('form-feedback');
    
    // Lock submit controls temporarily
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
    
    // Simulate API processing delay
    setTimeout(() => {
        // Present Success notification box
        feedbackDiv.className = 'feedback-msg success';
        feedbackDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Communication securely submitted! Shlok will respond shortly.';
        
        // Reset local interface inputs
        form.reset();
        
        // Restore pristine submit trigger controls
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Transmit Communication</span><i class="fa-solid fa-arrow-right-long"></i>';
        
        // Fade notification out cleanly after some seconds
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback-msg';
        }, 6000);
    }, 1500);
    
    return false;
}

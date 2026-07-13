// ==========================================================
// Portfolio JavaScript — Enhanced with Premium Animations
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // DOM Elements
    // --------------------------------------------------
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.getElementById("nav-menu");
    const resumeBtn = document.getElementById("resumeBtn");
    const resumeOptions = document.getElementById("resumeOptions");
    const sections = document.querySelectorAll("section");
    const themeToggle = document.getElementById("theme-toggle");
    const greeting = document.getElementById("greeting");
    const cursorGlow = document.getElementById("cursor-glow");
    const heroSection = document.getElementById("hero-section");

    // --------------------------------------------------
    // Theme Toggle (Dark / Light)
    // --------------------------------------------------
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("aj-theme", next);
            
            // Haptic feedback
            themeToggle.style.transform = 'scale(0.85)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 200);
        });

        if (!localStorage.getItem("aj-theme")) {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
        }

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("aj-theme")) {
                document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
            }
        });
    }

    // --------------------------------------------------
    // Auto Greeting
    // --------------------------------------------------
    if (greeting) {
        const hour = new Date().getHours();
        let text = "Available for work";
        
        if (hour < 5) text = "Up late? Available for work";
        else if (hour < 12) text = "Good morning — available for work";
        else if (hour < 17) text = "Good afternoon — available for work";
        else if (hour < 21) text = "Good evening — available for work";
        
        greeting.textContent = text;
    }

    // --------------------------------------------------
    // Cursor-reactive Hero Glow
    // --------------------------------------------------
    if (cursorGlow && heroSection && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let rafId = null;

        heroSection.addEventListener("mousemove", (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const rect = heroSection.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                heroSection.style.setProperty("--x", `${x}%`);
                heroSection.style.setProperty("--y", `${y}%`);
                
                rafId = null;
            });
        });
    }

    // --------------------------------------------------
    // Mobile Menu
    // --------------------------------------------------
    if (menuIcon && navMenu) {
        menuIcon.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            menuIcon.innerHTML = navMenu.classList.contains("active")
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // --------------------------------------------------
    // Resume Dropdown
    // --------------------------------------------------
    if (resumeBtn && resumeOptions) {
        window.showOptions = () => {
            resumeOptions.classList.add("show");
        };

        window.hideOptions = () => {
            resumeOptions.classList.remove("show");
        };

        document.addEventListener("click", (e) => {
            if (!resumeBtn.contains(e.target) && !resumeOptions.contains(e.target)) {
                resumeOptions.classList.remove("show");
            }
        });
    }

    // --------------------------------------------------
    // Section Scroll Animation
    // --------------------------------------------------
    if (sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        });

        sections.forEach(section => observer.observe(section));
    }

    // --------------------------------------------------
    // Typing Effect
    // --------------------------------------------------
    const typingText = document.querySelector(".typing-text .web");
    
    if (typingText) {
        const roles = [
            "web applications",
            "full stack apps",
            "Python backends",
            "Django + React apps"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId = null;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (!isDeleting && charIndex < currentRole.length) {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                timeoutId = setTimeout(typeEffect, 80 + Math.random() * 40);
            } else if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                timeoutId = setTimeout(typeEffect, 1800 + Math.random() * 400);
            } else if (isDeleting && charIndex > 0) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                timeoutId = setTimeout(typeEffect, 30 + Math.random() * 20);
            } else {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                timeoutId = setTimeout(typeEffect, 400);
            }
        }

        setTimeout(typeEffect, 800);
    }

    // --------------------------------------------------
    // Smooth Scroll
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // --------------------------------------------------
    // Active Navigation
    // --------------------------------------------------
    if (sections.length) {
        let ticking = false;
        
        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let current = "";
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - headerHeight - 50;
                        if (window.pageYOffset >= sectionTop) {
                            current = section.getAttribute("id");
                        }
                    });
                    
                    document.querySelectorAll("nav a").forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${current}`) {
                            link.classList.add("active");
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // --------------------------------------------------
    // Click Ripple
    // --------------------------------------------------
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!reduceMotion) {
        document.addEventListener("click", (e) => {
            const ripple = document.createElement("span");
            ripple.className = "click-ripple";
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            document.body.appendChild(ripple);
            
            ripple.addEventListener("animationend", () => ripple.remove());
            setTimeout(() => ripple.remove(), 700);
        });
    }

    // --------------------------------------------------
    // Contact Form
    // --------------------------------------------------
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            const submitBtn = this.querySelector("#submit");
            if (!submitBtn) return;
            
            submitBtn.disabled = true;
            submitBtn.value = "Sending...";
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.value = "Send message";
            }, 5000);
        });
    }

    // ==========================================================
    // SKILLS MARQUEE - JAVASCRIPT POWERED ANIMATION
    // This bypasses all CSS animation conflicts
    // ==========================================================
    const skillsTrack = document.getElementById("skillsTrack");
    
    if (skillsTrack) {
        console.log("✅ Skills track found!");
        
        // Get all skill items
        let skillItems = skillsTrack.querySelectorAll('.skill');
        console.log("📊 Number of skill items:", skillItems.length);
        
        // Ensure we have enough items for infinite scroll (at least 16)
        if (skillItems.length < 16) {
            const originalItems = [...skillItems];
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                skillsTrack.appendChild(clone);
            });
            skillItems = skillsTrack.querySelectorAll('.skill');
            console.log("🔄 Duplicated skills. Total now:", skillItems.length);
        }
        
        // Get the container
        const marquee = document.querySelector('.skills-marquee');
        
        // Variables for animation
        let position = 0;
        const speed = 5.5; 
        let isPaused = false;
        let animationId = null;
        
        // Function to animate the skills
        function animateSkills() {
            if (!isPaused) {
                position -= speed;
                
                // Get the width of one set of skills
                const trackWidth = skillsTrack.scrollWidth / 2;
                
                // Reset when we've scrolled half the width
                if (Math.abs(position) >= trackWidth) {
                    position = 0;
                }
                
                // Apply transform
                skillsTrack.style.transform = `translateX(${position}px)`;
                skillsTrack.style.WebkitTransform = `translateX(${position}px)`;
            }
            
            // Continue the animation loop
            animationId = requestAnimationFrame(animateSkills);
        }
        
        // Start the animation
        animateSkills();
        console.log("🚀 Skills animation started with JavaScript!");
        
        // Pause on hover
        skillsTrack.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        skillsTrack.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Pause when tab is not visible (performance)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isPaused = true;
            } else {
                isPaused = false;
            }
        });
        
        // Clean up animation on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
        
        // Also handle resize to recalculate
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalculate position to prevent jumps
                const trackWidth = skillsTrack.scrollWidth / 2;
                if (Math.abs(position) >= trackWidth) {
                    position = 0;
                }
            }, 200);
        });
        
    } else {
        console.error("❌ Skills track not found! Check the ID.");
    }
});

// ==========================================================
// Page Fade-in
// ==========================================================
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    
    requestAnimationFrame(() => {
        document.body.style.opacity = "1";
    });
});
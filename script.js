// ==========================================================
// Portfolio JavaScript
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

            if (
                !resumeBtn.contains(e.target) &&
                !resumeOptions.contains(e.target)
            ) {
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
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        sections.forEach(section => observer.observe(section));

    }

    // --------------------------------------------------
    // Typing Effect
    // --------------------------------------------------
    const typingText = document.querySelector(".typing-text .web");

    if (typingText) {

        const roles = [
            "Web Developer",
            "Full Stack Developer",
            "Python Developer",
            "Django Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (!isDeleting && charIndex < currentRole.length) {

                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                setTimeout(typeEffect, 100);

            }

            else if (!isDeleting && charIndex === currentRole.length) {

                isDeleting = true;
                setTimeout(typeEffect, 1500);

            }

            else if (isDeleting && charIndex > 0) {

                typingText.textContent = currentRole.substring(0, charIndex - 1);

                charIndex--;

                setTimeout(typeEffect, 50);

            }

            else {

                isDeleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                setTimeout(typeEffect, 500);

            }

        }

        setTimeout(typeEffect, 1000);

    }

    // --------------------------------------------------
    // Smooth Scroll
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                window.scrollTo({

                    top: target.offsetTop - 80,
                    behavior: "smooth"

                });

            }

        });

    });

    // --------------------------------------------------
    // Active Navigation
    // --------------------------------------------------
    if (sections.length) {

        window.addEventListener("scroll", () => {

            let current = "";

            sections.forEach(section => {

                if (
                    window.pageYOffset >=
                    section.offsetTop - 80
                ) {

                    current = section.getAttribute("id");

                }

            });

            document.querySelectorAll("nav a").forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") === `#${current}`
                ) {

                    link.classList.add("active");

                }

            });

        });

    }

    // --------------------------------------------------
    // Contact Form
    // --------------------------------------------------
    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function () {

            const submitBtn = this.querySelector("#submit");

            if (!submitBtn) return;

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {

                submitBtn.disabled = false;

                submitBtn.innerHTML = "Submit";

            }, 5000);

        });

    }

    // --------------------------------------------------
    // Project Hover Animation
    // --------------------------------------------------
    document.querySelectorAll(".project-item img").forEach(img => {

        img.addEventListener("mouseenter", function () {

            this.style.transform = "scale(1.05) rotate(1deg)";

        });

        img.addEventListener("mouseleave", function () {

            this.style.transform = "scale(1) rotate(0deg)";

        });

    });

    // --------------------------------------------------
    // Skills Infinite Marquee
    // --------------------------------------------------
    const skillsTrack = document.getElementById("skillsTrack");

    if (skillsTrack) {

        const cards = [...skillsTrack.children];

        cards.forEach(card => {

            const clone = card.cloneNode(true);

            clone.setAttribute("aria-hidden", "true");

            skillsTrack.appendChild(clone);

        });

    }

});

// ==========================================================
// Page Fade-in
// ==========================================================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .5s ease";

    requestAnimationFrame(() => {

        document.body.style.opacity = "1";

        const home = document.querySelector(".home");

        if (home) {

            home.classList.add("visible");

        }

    });

});
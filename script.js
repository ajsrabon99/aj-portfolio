// DOM Elements
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll('section');
const resumeBtn = document.getElementById('resumeBtn');
const resumeOptions = document.getElementById('resumeOptions');

// Toggle Mobile Menu
menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuIcon.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Show/Hide Resume Options
function showOptions() {
    resumeOptions.classList.add('show');
}

function hideOptions() {
    resumeOptions.classList.remove('show');
}

// Close resume options when clicking outside
document.addEventListener('click', (e) => {
    if (!resumeBtn.contains(e.target) && !resumeOptions.contains(e.target)) {
        hideOptions();
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Typing Effect
const typingText = document.querySelector('.typing-text .web');
const roles = ['Web Developer', 'Full Stack Developer', 'Python Developer', 'Django Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTyping = true;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isTyping) {
        if (!isDeleting && charIndex < currentRole.length) {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// Start typing effect
setTimeout(typeEffect, 1000);

// Smooth Scrolling for Anchor Links
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

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - headerHeight)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form Submission Animation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('#submit');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Re-enable after 5 seconds in case of error
        setTimeout(() => {
            submitBtn.innerHTML = 'Submit';
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add initial animation to home section
        const homeSection = document.querySelector('.home');
        if (homeSection) {
            homeSection.classList.add('visible');
        }
    }, 100);
});

// Add floating particles to background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(108, 99, 255, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        particlesContainer.appendChild(particle);
        
        // Animate particle
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let xSpeed = (Math.random() - 0.5) * 0.5;
    let ySpeed = (Math.random() - 0.5) * 0.5;
    
    function move() {
        x += xSpeed;
        y += ySpeed;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) xSpeed *= -1;
        if (y <= 0 || y >= 100) ySpeed *= -1;
        
        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        
        requestAnimationFrame(move);
    }
    
    move();
}

// Initialize particles
createParticles();

// Add hover effect to project images
document.querySelectorAll('.project-item img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.querySelector('body::before').style.transform = `translateY(${rate}px)`;
});
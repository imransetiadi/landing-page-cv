// ===== Particle Background =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.width = (Math.random() * 2 + 1) + 'px';
        particle.style.height = particle.style.width;

        // Random neon colors
        const colors = ['#00ff88', '#b000ff', '#00ff88', '#ff00e5'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 6px ${color}`;

        container.appendChild(particle);
    }
}

createParticles();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-up, .rotate-in');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 80) {
            el.classList.add('visible');
        }
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Timeline items slide in from left with stagger
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Skill categories scale up
    document.querySelectorAll('.skill-category').forEach((el, index) => {
        el.classList.add('scale-up');
        el.style.transitionDelay = `${index * 0.15}s`;
    });

    // Stat cards rotate in
    document.querySelectorAll('.stat-card').forEach((el, index) => {
        el.classList.add('rotate-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Contact cards fade in with stagger
    document.querySelectorAll('.contact-card').forEach((el, index) => {
        el.classList.add('scale-up');
        el.style.transitionDelay = `${index * 0.08}s`;
    });

    // Education card slides from right
    document.querySelectorAll('.education-card').forEach(el => {
        el.classList.add('slide-in-right');
    });

    // About text fades in
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('fade-in');
    });

    // Cert content scales up
    document.querySelectorAll('.cert-content').forEach(el => {
        el.classList.add('scale-up');
    });

    // Section titles slide in from left
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('slide-in-left');
    });

    // Trigger once on load
    setTimeout(revealOnScroll, 100);
});

window.addEventListener('scroll', revealOnScroll);

// ===== Smooth Scroll =====
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

// ===== Mouse Glow Effect on Cards =====
document.querySelectorAll('.timeline-content, .skill-category, .contact-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(0, 240, 255, 0.06), transparent), var(--bg-card)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--bg-card)';
    });
});

// ===== Parallax on Hero Glow =====
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.hero-glow');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.5;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Tilt Effect on Hex Container =====
const hexContainer = document.querySelector('.hex-container');
if (hexContainer) {
    hexContainer.addEventListener('mousemove', (e) => {
        const rect = hexContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        hexContainer.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });

    hexContainer.addEventListener('mouseleave', () => {
        hexContainer.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
        hexContainer.style.transition = 'transform 0.5s ease';
    });

    hexContainer.addEventListener('mouseenter', () => {
        hexContainer.style.transition = 'transform 0.1s ease';
    });
}

// ===== Typing Effect for Hero Title =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const titles = ['Cloud Engineer', 'DevOps Engineer', 'SysAdmin', 'Infrastructure'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before typing
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1500);
}

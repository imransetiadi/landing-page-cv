// ===== Electro Waves Animation =====
(function () {
    const canvas = document.getElementById('electro-waves');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const waves = [
        { y: 0.3, amplitude: 30, frequency: 0.02, speed: 0.015, color: 'rgba(0, 255, 136, 0.15)', lineWidth: 1.5 },
        { y: 0.4, amplitude: 20, frequency: 0.03, speed: -0.02, color: 'rgba(0, 255, 136, 0.1)', lineWidth: 1 },
        { y: 0.6, amplitude: 40, frequency: 0.015, speed: 0.01, color: 'rgba(0, 255, 200, 0.12)', lineWidth: 1.5 },
        { y: 0.7, amplitude: 25, frequency: 0.025, speed: -0.018, color: 'rgba(0, 200, 255, 0.08)', lineWidth: 1 },
        { y: 0.5, amplitude: 35, frequency: 0.018, speed: 0.012, color: 'rgba(0, 255, 136, 0.06)', lineWidth: 2 },
    ];

    let time = 0;

    function drawWave(wave) {
        const baseY = height * wave.y;

        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowColor = wave.color.replace(/[\d.]+\)$/, '0.5)');
        ctx.shadowBlur = 8;

        for (let x = 0; x <= width; x += 2) {
            const y = baseY +
                Math.sin(x * wave.frequency + time * wave.speed * 60) * wave.amplitude +
                Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 30) * (wave.amplitude * 0.5);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // Draw electric sparks along waves occasionally
    function drawSpark(wave) {
        if (Math.random() > 0.005) return; // rare sparks

        const sparkX = Math.random() * width;
        const baseY = height * wave.y;
        const sparkY = baseY +
            Math.sin(sparkX * wave.frequency + time * wave.speed * 60) * wave.amplitude;

        ctx.beginPath();
        ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw small branches
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const length = Math.random() * 15 + 5;
            ctx.beginPath();
            ctx.moveTo(sparkX, sparkY);
            ctx.lineTo(
                sparkX + Math.cos(angle) * length,
                sparkY + Math.sin(angle) * length
            );
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
            ctx.lineWidth = 0.5;
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 5;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.016;

        waves.forEach(wave => {
            drawWave(wave);
            drawSpark(wave);
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
})();

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

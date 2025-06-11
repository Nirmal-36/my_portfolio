// Initialize EmailJS
(function () {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
})();

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter');
const words = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeWriter, typingSpeed);
}

setTimeout(typeWriter, 1000);

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 100 ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.95)';
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skills')) animateSkillBars();
            if (entry.target.classList.contains('about')) animateCounters();
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .timeline-item, .cert-item').forEach((element, index) => {
    element.classList.add('fade-in');
    element.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(element);
});

function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width');
        }, index * 200);
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = counter.textContent;
        const number = parseFloat(target);
        let count = 0;
        const increment = number / 100;
        const isFloat = target.includes('.');

        const updateCounter = () => {
            if (count < number) {
                count += increment;
                counter.textContent = isFloat ? count.toFixed(2) : Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const templateParams = { userName: name, userEmail: email, subject, message };

    emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
    )
    .then(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
    })
    .catch((error) => {
        console.error('FAILED...', error);
        alert("Something went wrong. Please try again later.");
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Particle Animation for Hero Section
function createParticles() {
    const container = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute;
            width:${Math.random() * 4 + 1}px;
            height:${Math.random() * 4 + 1}px;
            background:${Math.random() > 0.5 ? '#666' : '#ccc'};
            border-radius:50%;
            opacity:${Math.random() * 0.5 + 0.2};
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay:${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

window.addEventListener('load', () => {
    createParticles();
    document.body.classList.add('loaded');
});

// Hover effects on cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Ripple Button Effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    if (particles) particles.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Lazy load images
document.querySelectorAll('img[data-src]').forEach(img => {
    new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                obs.unobserve(img);
            }
        });
    }).observe(img);
});

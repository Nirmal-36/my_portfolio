    // Initialize EmailJS
    (function () {
        emailjs.init("u-y4pKxEbZxEUr7VP");
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

    // Start typewriter effect after page load
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
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
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
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animate counters when about section is visible
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.classList.add('slide-left');
        item.style.transitionDelay = `${index * 0.3}s`;
        observer.observe(item);
    });

    document.querySelectorAll('.cert-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
    }

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isFloat = target.includes('.');
            const number = parseFloat(target);
            let count = 0;
            const increment = number / 100;
            
            const updateCounter = () => {
                if (count < number) {
                    count += increment;
                    if (isFloat) {
                        counter.textContent = count.toFixed(2);
                    } else {
                        counter.textContent = Math.ceil(count);
                    }
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

        const templateParams = {
            userName: name,
            userEmail: email,
            subject: subject,
            message: message
        };

        emailjs.send("service_e5fiifg", "template_14g40yb", templateParams)
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
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#666666' : '#cccccc';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles when page loads
    window.addEventListener('load', createParticles);

    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

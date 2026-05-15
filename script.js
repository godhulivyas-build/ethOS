// ========== Scroll Animations ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ========== Mobile Menu ==========
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('active');
    });
});

// ========== Nav Scroll Effect ==========
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        nav.style.borderBottomColor = 'rgba(30,30,34,0.8)';
    } else {
        nav.style.borderBottomColor = 'rgba(30,30,34,0.3)';
    }
    lastScroll = currentScroll;
});

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== Waitlist Form ==========
const waitlistForm = document.getElementById('waitlistForm');
waitlistForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('waitlistEmail').value;
    if (email) {
        const btn = waitlistForm.querySelector('button');
        btn.textContent = '✓ You\'re on the list!';
        btn.style.background = '#22C55E';
        btn.disabled = true;
        document.getElementById('waitlistEmail').disabled = true;
        setTimeout(() => {
            btn.textContent = 'Join the Waitlist';
            btn.style.background = '';
            btn.disabled = false;
            document.getElementById('waitlistEmail').disabled = false;
            document.getElementById('waitlistEmail').value = '';
        }, 3000);
    }
});

// ========== Score Ring Animations ==========
const scoreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const rings = entry.target.querySelectorAll('.ring-fill');
            rings.forEach(ring => {
                const score = parseInt(ring.style.getPropertyValue('--score'));
                const circumference = 2 * Math.PI * 35;
                const offset = circumference - (circumference * score / 100);
                ring.style.strokeDasharray = circumference;
                ring.style.strokeDashoffset = circumference;
                setTimeout(() => {
                    ring.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    ring.style.strokeDashoffset = offset;
                }, 200);
            });
        }
    });
}, { threshold: 0.3 });

const scoringSection = document.getElementById('scoring');
if (scoringSection) scoreObserver.observe(scoringSection);

// ========== Typing Animation for Preview ==========
const previewText = document.querySelector('.preview-card .card-text');
if (previewText) {
    const lines = previewText.querySelectorAll('.text-line');
    lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'scaleX(0)';
        line.style.transformOrigin = 'left';
        line.style.transition = `opacity 0.4s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
    });

    const previewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lines.forEach(line => {
                    line.style.opacity = '1';
                    line.style.transform = 'scaleX(1)';
                });
            }
        });
    }, { threshold: 0.5 });

    const heroPreview = document.querySelector('.hero-preview');
    if (heroPreview) previewObserver.observe(heroPreview);
}

// ========== Counter Animation ==========
function animateCounter(element, target, duration = 1500) {
    const isNumber = !isNaN(target);
    if (!isNumber) return;
    
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * eased);
        element.textContent = current + (target > 100 ? '+' : '');
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// Animate problem numbers on scroll
const problemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.problem-number');
            numbers.forEach(num => {
                const text = num.textContent;
                if (text === '200+') animateCounter(num, 200, 1200);
                else if (text === '500+') animateCounter(num, 500, 1500);
            });
            problemObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const problemSection = document.getElementById('problem');
if (problemSection) problemObserver.observe(problemSection);

// ========== Interactive Parallax Effect ==========
const heroPreviewWrapper = document.querySelector('.hero-preview');
const previewWindow = document.querySelector('.preview-window');

if (heroPreviewWrapper && previewWindow) {
    heroPreviewWrapper.addEventListener('mousemove', (e) => {
        const rect = heroPreviewWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        previewWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        previewWindow.style.transition = 'none';
    });
    
    heroPreviewWrapper.addEventListener('mouseleave', () => {
        previewWindow.style.transform = '';
        previewWindow.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
}

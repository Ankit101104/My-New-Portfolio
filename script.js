// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Typed.js initialization
var typed = new Typed('.typed-text', {
    strings: ['Web Developer', 'Full Stack Developer', 'Software Engineer','Java Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true
});

// Navigation functionality
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.getElementById('navLinks');
const body = document.body;

// Open menu only when clicking menu button
function openMenu() {
    navLinks.classList.add('active');
    body.classList.add('sidebar-open');
}

// Close menu
function closeMenu() {
    navLinks.classList.remove('active');
    body.classList.remove('sidebar-open');
}

// Close menu when clicking on nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        closeMenu();
    }
});

// Prevent menu from closing when clicking inside
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGkj-zcmndoz849-COrdjnNTl9InXuFCOAQMqgGSr67dV5oS2_V_6HVaACYn0W8lyl/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    // Update active state of navigation items
    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Update scroll progress bar
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / totalScroll) * 100;
    scrollBar.style.width = `${progress}%`;
});

// Education timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const revealItem = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
};

const timelineObserver = new IntersectionObserver(revealItem, {
    threshold: 0.5
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress-bar';
scrollProgress.appendChild(scrollBar);
document.body.appendChild(scrollProgress);

// Add smooth reveal for elements
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: '50px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--width', `${width}%`);
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => {
        observer.observe(fill);
    });
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
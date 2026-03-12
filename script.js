// Particle Background Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(229, 9, 20, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(229, 9, 20, ${0.2 - distance / 500})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Email Validation
function validateEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailError = document.querySelector('.email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailInput.value)) {
        emailError.classList.add('show');
        emailInput.style.borderColor = '#e87c03';
        
        setTimeout(() => {
            emailError.classList.remove('show');
            emailInput.style.borderColor = 'rgba(246, 238, 238, 0.5)';
        }, 3000);
        
        return false;
    }
    
    // Success animation
    emailInput.style.borderColor = '#46d369';
    alert('Welcome to Netflix! 🎬');
    return true;
}

// FAQ Toggle
function toggleFAQ(element) {
    const allFAQs = document.querySelectorAll('.faqbox');
    
    // Close all other FAQs
    allFAQs.forEach(faq => {
        if (faq !== element && faq.classList.contains('active')) {
            faq.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    element.classList.toggle('active');
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats counter if visible
            if (entry.target.querySelector('.stat-number')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Stats Counter Animation
function animateStats(section) {
    const statNumbers = section.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.secImg img, .secImg video');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Smooth Scroll for Links
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

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Hover Effect for Videos
document.querySelectorAll('.secImg').forEach(section => {
    const video = section.querySelector('video');
    if (video) {
        section.addEventListener('mouseenter', () => {
            video.playbackRate = 1.2;
        });
        
        section.addEventListener('mouseleave', () => {
            video.playbackRate = 1;
        });
    }
});

// Dynamic Typing Effect for Hero Title
const heroTitle = document.querySelector('.hero-title b');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Mouse trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
});

// Real-time clock in footer
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    const clockElement = document.querySelector('.copyright');
    if (clockElement) {
        clockElement.textContent = `© 2024 Netflix Clone | ${timeString}`;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        scrollToTop();
    }
    
    // Press 'Escape' to close all FAQs
    if (e.key === 'Escape') {
        document.querySelectorAll('.faqbox.active').forEach(faq => {
            faq.classList.remove('active');
        });
    }
});

// Add loading state to Get Started button
const getStartedBtn = document.querySelector('.btn-red');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
        if (validateEmail()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                this.innerHTML = 'Get Started <i class="fas fa-chevron-right"></i>';
            }, 2000);
        }
    });
}

// Console Easter Egg
console.log('%c🎬 Welcome to Netflix Clone!', 'color: #e50914; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ by DWARAKACHERLA RAMESH REDDY', 'color: #0071eb; font-size: 14px;');
console.log('%cPress T to scroll to top | Press ESC to close FAQs', 'color: #46d369; font-size: 12px;');

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #ffd700; font-size: 12px;');
    });
}


// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// Cursor Trail Effect
const trailCanvas = document.getElementById('cursorTrail');
const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({
        x: e.clientX,
        y: e.clientY,
        life: 1
    });
});

function animateCursorTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    
    for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const point = cursorTrail[i];
        
        trailCtx.beginPath();
        trailCtx.arc(point.x, point.y, 3 * point.life, 0, Math.PI * 2);
        trailCtx.fillStyle = `rgba(229, 9, 20, ${point.life * 0.5})`;
        trailCtx.fill();
        
        point.life -= 0.05;
        
        if (point.life <= 0) {
            cursorTrail.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();

window.addEventListener('resize', () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
});

// Toast Notification System
function showNotification(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('.theme-toggle i');
    
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        showNotification('Light theme activated! ☀️');
    } else {
        icon.className = 'fas fa-moon';
        showNotification('Dark theme activated! 🌙');
    }
}

// Language Selector
const translations = {
    en: {
        title: 'Unlimited movies, TV shows and more',
        subtitle: 'Watch anywhere. Cancel anytime.',
        description: 'Ready to watch? Enter your email to create or restart your membership.'
    },
    hi: {
        title: 'असीमित फ़िल्में, टीवी शो और बहुत कुछ',
        subtitle: 'कहीं भी देखें। कभी भी रद्द करें।',
        description: 'देखने के लिए तैयार हैं? अपनी सदस्यता बनाने या पुनः आरंभ करने के लिए अपना ईमेल दर्ज करें।'
    },
    es: {
        title: 'Películas y series ilimitadas y mucho más',
        subtitle: 'Disfruta donde quieras. Cancela cuando quieras.',
        description: '¿Quieres ver algo ya? Ingresa tu email para crear o reiniciar tu membresía.'
    }
};

function changeLanguage(lang) {
    const trans = translations[lang];
    if (trans) {
        document.querySelector('.hero-title b').textContent = trans.title;
        document.querySelector('.hero-subtitle').textContent = trans.subtitle;
        document.querySelector('.hero-description').textContent = trans.description;
        showNotification('Language changed! 🌍');
    }
}

// Sticky Navbar
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    lastScroll = currentScroll;
});

// Trending Carousel
let carouselPosition = 0;

function scrollCarousel(direction) {
    const carousel = document.getElementById('trendingCarousel');
    const cardWidth = 300; // 280px + 20px gap
    
    carouselPosition += direction * cardWidth * 2;
    
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    carouselPosition = Math.max(0, Math.min(carouselPosition, maxScroll));
    
    carousel.scrollTo({
        left: carouselPosition,
        behavior: 'smooth'
    });
}

// Auto-scroll carousel
let autoScrollInterval = setInterval(() => {
    const carousel = document.getElementById('trendingCarousel');
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        carouselPosition = 0;
    } else {
        scrollCarousel(1);
    }
}, 5000);

// Pause auto-scroll on hover
document.getElementById('trendingCarousel')?.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
});

document.getElementById('trendingCarousel')?.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
        const carousel = document.getElementById('trendingCarousel');
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
            carouselPosition = 0;
        } else {
            scrollCarousel(1);
        }
    }, 5000);
});

// Newsletter Subscription
let subscriberCount = Math.floor(Math.random() * 10000) + 50000;
document.getElementById('subscriberCount').textContent = subscriberCount.toLocaleString();

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email! ⚠️');
        return;
    }
    
    subscriberCount++;
    document.getElementById('subscriberCount').textContent = subscriberCount.toLocaleString();
    document.getElementById('newsletterEmail').value = '';
    
    showNotification('Successfully subscribed! 🎉');
    
    // Confetti effect
    createConfetti();
}

// Confetti Effect
function createConfetti() {
    const colors = ['#e50914', '#ff0a16', '#ffd700', '#46d369', '#0071eb'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const fall = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        fall.onfinish = () => confetti.remove();
    }
}

// Music Player
let isPlaying = false;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;
let gainNode = null;

function toggleMusic() {
    const playIcon = document.getElementById('playIcon');
    
    if (!isPlaying) {
        startMusic();
        playIcon.className = 'fas fa-pause';
        showNotification('Music playing 🎵');
    } else {
        stopMusic();
        playIcon.className = 'fas fa-play';
        showNotification('Music paused ⏸️');
    }
    
    isPlaying = !isPlaying;
}

function startMusic() {
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.3;
    
    oscillator.start();
}

function stopMusic() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
}

function changeVolume(value) {
    if (gainNode) {
        gainNode.gain.value = value / 100;
    }
}

// Screen Time Tracker
let startTime = Date.now();

function updateScreenTime() {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    document.getElementById('timeSpent').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateScreenTime, 1000);

// Chat Widget
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('open');
    
    if (chatWidget.classList.contains('open')) {
        document.getElementById('chatInput').focus();
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatBody = document.getElementById('chatBody');
    
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Just now</span>
        </div>
        <img src="https://ui-avatars.com/api/?name=You&background=0071eb&color=fff" alt="You">
    `;
    chatBody.appendChild(userMsg);
    
    input.value = '';
    
    // Bot response
    setTimeout(() => {
        const botResponses = [
            "Thanks for your message! Our team will get back to you soon. 😊",
            "That's a great question! Let me help you with that. 🎬",
            "I'm here to help! What else would you like to know? 💬",
            "Awesome! Is there anything else I can assist you with? 🌟",
            "Got it! I'll make sure to pass this along. 👍"
        ];
        
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=Netflix&background=e50914&color=fff" alt="Bot">
            <div class="message-content">
                <p>${botResponses[Math.floor(Math.random() * botResponses.length)]}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Movie Card Click Handler
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        showNotification(`Opening ${title}... 🎬`);
        
        // Add pulse animation
        this.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Easter Eggs
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎮 Konami Code Activated! You found the secret!');
        createConfetti();
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Idle Detection
let idleTime = 0;
const idleInterval = setInterval(() => {
    idleTime++;
    if (idleTime > 5) { // 5 seconds idle
        showNotification('Still there? 👀');
        idleTime = 0;
    }
}, 60000);

document.addEventListener('mousemove', () => { idleTime = 0; });
document.addEventListener('keypress', () => { idleTime = 0; });

// Network Status
window.addEventListener('online', () => {
    showNotification('Back online! 🌐');
});

window.addEventListener('offline', () => {
    showNotification('You are offline! 📡');
});

// Right-click context menu
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showNotification('Image protection enabled! 🔒');
    }
});

// Performance Tips
if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        showNotification('Slow connection detected. Optimizing... ⚡');
    }
}

// Battery Status
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        if (battery.level < 0.2 && !battery.charging) {
            showNotification('Low battery! Consider charging your device. 🔋');
        }
    });
}

console.log('%c🎉 All features loaded successfully!', 'color: #46d369; font-size: 16px; font-weight: bold;');
console.log('%c💡 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #ffd700; font-size: 12px;');


// ==================== AUTHENTICATION SYSTEM ====================

// User Database (LocalStorage)
const USERS_KEY = 'netflix_users';
const CURRENT_USER_KEY = 'netflix_current_user';

// Initialize user database
function initUserDatabase() {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
}

initUserDatabase();

// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

// Save user
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Find user by email
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Clear current user
function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

// ==================== MODAL CONTROLS ====================

function openSignInModal() {
    const modal = document.getElementById('signInModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function openDashboard() {
    const modal = document.getElementById('dashboardModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    loadDashboardData();
}

function closeDashboard() {
    const modal = document.getElementById('dashboardModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ==================== FORM TOGGLE ====================

let isSignUpMode = false;

function toggleAuthForm(e) {
    e.preventDefault();
    
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const authTitle = document.getElementById('authTitle');
    const authSwitch = document.getElementById('authSwitch');
    
    isSignUpMode = !isSignUpMode;
    
    if (isSignUpMode) {
        signInForm.classList.add('hidden');
        signUpForm.classList.remove('hidden');
        authTitle.textContent = 'Sign Up';
        authSwitch.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthForm(event)">Sign in now</a>';
    } else {
        signInForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        authTitle.textContent = 'Sign In';
        authSwitch.innerHTML = 'New to Netflix? <a href="#" onclick="toggleAuthForm(event)">Sign up now</a>';
    }
}

// ==================== PASSWORD TOGGLE ====================

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ==================== PASSWORD STRENGTH ====================

document.getElementById('signUpPassword')?.addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthDiv = document.getElementById('passwordStrength');
    const strengthText = strengthDiv.querySelector('.strength-text');
    
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    strengthDiv.classList.remove('weak', 'medium', 'strong');
    
    if (strength <= 2) {
        strengthDiv.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthDiv.classList.add('medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthDiv.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
});

// ==================== SIGN UP HANDLER ====================

function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;
    
    // Validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters! ⚠️');
        return;
    }
    
    // Check if user exists
    if (findUserByEmail(email)) {
        showNotification('Email already registered! Please sign in. ⚠️');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: btoa(password), // Simple encoding (not secure for production)
        createdAt: new Date().toISOString(),
        stats: {
            moviesWatched: 0,
            seriesWatched: 0,
            totalHours: 0,
            favorites: 0
        }
    };
    
    // Save user
    saveUser(newUser);
    
    // Show loading
    const submitBtn = e.target.querySelector('.btn-auth');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Creating Account...';
    
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Sign Up';
        
        showNotification('Account created successfully! 🎉');
        createConfetti();
        
        // Auto sign in
        setCurrentUser(newUser);
        closeSignInModal();
        updateUIForLoggedInUser();
        
        // Reset form
        e.target.reset();
    }, 1500);
}

// ==================== SIGN IN HANDLER ====================

function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Find user
    const user = findUserByEmail(email);
    
    if (!user) {
        showNotification('User not found! Please sign up. ⚠️');
        return;
    }
    
    // Verify password
    if (atob(user.password) !== password) {
        showNotification('Incorrect password! ❌');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('.btn-auth');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Signing In...';
    
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Sign In';
        
        // Set current user
        setCurrentUser(user);
        
        if (rememberMe) {
            localStorage.setItem('netflix_remember', 'true');
        }
        
        showNotification(`Welcome back, ${user.name}! 🎬`);
        closeSignInModal();
        updateUIForLoggedInUser();
        
        // Reset form
        e.target.reset();
    }, 1500);
}

// ==================== SOCIAL SIGN IN ====================

function socialSignIn(provider) {
    showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-in coming soon! 🚀`);
    
    // Simulate social login
    setTimeout(() => {
        const demoUser = {
            id: Date.now().toString(),
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            email: `user@${provider}.com`,
            password: btoa('demo123'),
            createdAt: new Date().toISOString(),
            stats: {
                moviesWatched: Math.floor(Math.random() * 50),
                seriesWatched: Math.floor(Math.random() * 30),
                totalHours: Math.floor(Math.random() * 200),
                favorites: Math.floor(Math.random() * 20)
            }
        };
        
        setCurrentUser(demoUser);
        closeSignInModal();
        updateUIForLoggedInUser();
        showNotification(`Signed in with ${provider}! 🎉`);
    }, 1000);
}

// ==================== LOGOUT HANDLER ====================

function handleLogout() {
    clearCurrentUser();
    closeDashboard();
    updateUIForLoggedOutUser();
    showNotification('Logged out successfully! 👋');
}

// ==================== UPDATE UI ====================

function updateUIForLoggedInUser() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update navbar
    const signInBtn = document.querySelector('.btn-red-sm');
    if (signInBtn) {
        signInBtn.textContent = user.name.split(' ')[0];
        signInBtn.onclick = openDashboard;
        signInBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}`;
    }
}

function updateUIForLoggedOutUser() {
    const signInBtn = document.querySelector('.btn-red-sm');
    if (signInBtn) {
        signInBtn.textContent = 'Sign in';
        signInBtn.onclick = openSignInModal;
        signInBtn.innerHTML = 'Sign in';
    }
}

// ==================== LOAD DASHBOARD DATA ====================

function loadDashboardData() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update user info
    document.getElementById('userName').textContent = `Welcome, ${user.name}!`;
    document.getElementById('userEmail').textContent = user.email;
    
    // Update stats with animation
    animateValue('moviesWatched', 0, user.stats.moviesWatched, 1000);
    animateValue('seriesWatched', 0, user.stats.seriesWatched, 1000);
    animateValue('totalHours', 0, user.stats.totalHours, 1000, 'h');
    animateValue('favorites', 0, user.stats.favorites, 1000);
}

function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ==================== CHECK LOGIN STATUS ON LOAD ====================

window.addEventListener('load', () => {
    const user = getCurrentUser();
    if (user) {
        updateUIForLoggedInUser();
        
        // Auto-generate some stats if they don't exist
        if (!user.stats || user.stats.moviesWatched === 0) {
            user.stats = {
                moviesWatched: Math.floor(Math.random() * 50) + 10,
                seriesWatched: Math.floor(Math.random() * 30) + 5,
                totalHours: Math.floor(Math.random() * 200) + 50,
                favorites: Math.floor(Math.random() * 20) + 5
            };
            setCurrentUser(user);
        }
    }
});

// ==================== ENHANCED EMAIL VALIDATION ====================

const originalValidateEmail = validateEmail;
validateEmail = function() {
    const emailInput = document.getElementById('emailInput');
    const emailError = document.querySelector('.email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailInput.value)) {
        emailError.classList.add('show');
        emailInput.style.borderColor = '#e87c03';
        
        setTimeout(() => {
            emailError.classList.remove('show');
            emailInput.style.borderColor = 'rgba(246, 238, 238, 0.5)';
        }, 3000);
        
        return false;
    }
    
    // Check if user exists
    const user = findUserByEmail(emailInput.value);
    
    if (user) {
        // User exists, open sign in modal
        openSignInModal();
        document.getElementById('signInEmail').value = emailInput.value;
        showNotification('Welcome back! Please sign in. 👋');
    } else {
        // New user, open sign up modal
        openSignInModal();
        toggleAuthForm({ preventDefault: () => {} });
        document.getElementById('signUpEmail').value = emailInput.value;
        showNotification('Create your account to get started! 🎬');
    }
    
    return true;
};

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open sign in
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (getCurrentUser()) {
            openDashboard();
        } else {
            openSignInModal();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeSignInModal();
        closeDashboard();
    }
});

console.log('%c🔐 Authentication System Loaded!', 'color: #46d369; font-size: 16px; font-weight: bold;');
console.log('%c💡 Press Ctrl/Cmd + K to open sign in', 'color: #ffd700; font-size: 12px;');

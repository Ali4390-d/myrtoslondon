// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});

// ============ MENU TABS ============
function openMenu(evt, menuName) {
  const menuContent = document.querySelectorAll('.tab-pane');
  const menuButtons = document.querySelectorAll('.tab-btn');
  
  menuContent.forEach(c => c.classList.remove('active'));
  menuButtons.forEach(b => b.classList.remove('active'));
  
  evt.target.classList.add('active');
  document.getElementById(menuName).classList.add('active');
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============ PARTICLES (Gold Stars/Leaves) ============
const particlesCanvas = document.getElementById('particles-canvas');
const ctx = particlesCanvas.getContext('2d');
let particles = [];
let particlesActive = false;

function resizeCanvas() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * particlesCanvas.height; // Start anywhere on load
  }
  reset() {
    this.x = Math.random() * particlesCanvas.width;
    this.y = -10;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > particlesCanvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  if (!particlesActive) return;
  ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Start particles after a short delay
setTimeout(() => {
  initParticles();
  particlesActive = true;
  animateParticles();
}, 1000);

// Pause particles when tab is not visible to save resources
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    particlesActive = false;
  } else {
    if (particles.length > 0 && !particlesActive) {
      particlesActive = true;
      animateParticles();
    }
  }
});

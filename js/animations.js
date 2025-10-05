// ===================================
// Inicialización de Animaciones y Partículas
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollAnimations();
  initBadgeHover();
  console.log('✨ Animaciones y partículas inicializadas correctamente');
});

// ===================================
// Generador de Partículas
// ===================================
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;
  const colors = ['#22d3ee', '#a78bfa', '#f472b6'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Posición y tamaño aleatorios
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      opacity: ${Math.random() * 0.8 + 0.2};
      animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 10}s;
    `;

    particlesContainer.appendChild(particle);
  }
}

// ===================================
// Animaciones al Hacer Scroll
// ===================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.section-card, .badge, .icon-circle');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===================================
// Efecto Parallax en el Header
// ===================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;

  const scrolled = window.pageYOffset;
  header.style.transform = `translateY(${scrolled * 0.2}px)`;
  header.style.opacity = Math.max(1 - (scrolled / 400), 0.4);
});

// ===================================
// Efecto Hover en las Badges
// ===================================
function initBadgeHover() {
  const badges = document.querySelectorAll('.badge');

  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'translateY(-3px) scale(1.07)';
      badge.style.transition = 'transform 0.2s ease';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===================================
// Smooth Scroll para Enlaces Internos
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

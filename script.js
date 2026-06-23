// ===========================================
// Mobile nav toggle
// ===========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navResume = document.querySelector('.nav-resume');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navResume.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.classList.toggle('active', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navResume.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================
// Animate hero confidence bar + project bar on load / view
// ===========================================
window.addEventListener('load', () => {
  const heroFill = document.querySelector('.confidence-fill');
  if (heroFill) {
    requestAnimationFrame(() => {
      setTimeout(() => heroFill.classList.add('filled'), 400);
    });
  }
});

const visualFill = document.querySelector('.visual-bar-fill');
if (visualFill) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('filled');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  barObserver.observe(visualFill);
}

// ===========================================
// Scroll reveal for sections
// ===========================================
const revealTargets = document.querySelectorAll(
  '.about-text, .about-stats, .skill-card, .project-card, .timeline-item, .extra-card, .contact-grid'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ===========================================
// Active nav link highlight on scroll
// ===========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

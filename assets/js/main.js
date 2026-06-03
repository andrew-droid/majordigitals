// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
  }, 1800);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (ring) { ring.style.width = '60px'; ring.style.height = '60px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
    if (ring) { ring.style.width = '40px'; ring.style.height = '40px'; }
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// =============================================
// BILINGUAL SYSTEM (FR / EN)
// =============================================
let currentLang = localStorage.getItem('lang') || 'fr';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  // Relance le typewriter avec la bonne langue
  const typewriterEl = document.querySelector('.hero-tag');
  if (typewriterEl) {
    typewriterEl.textContent = '';
    i = 0; // remet à zéro
    type(); // relance
  }
  document.documentElement.lang = lang;

  // Update all elements with data-fr / data-en
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });

  // Update lang button active state
  const btn = document.getElementById('lang-btn');
  if (btn) {
    btn.querySelector('.lang-fr').classList.toggle('lang-active', lang === 'fr');
    btn.querySelector('.lang-en').classList.toggle('lang-active', lang === 'en');
  }
}

// Init on load
applyLanguage(currentLang);

// Toggle on click
document.getElementById('lang-btn')?.addEventListener('click', () => {
  applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
});

// =============================================
// CONTACT FORM — Mobile WhatsApp / Desktop Email
// =============================================
const form = document.getElementById('contact-form');
const whatsappNumber = "233536203006";

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'fr' ? "Envoi..." : "Sending...";
    btn.disabled = true;

    const formData = new FormData(form);
    const name    = formData.get("name");
    const email   = formData.get("email");
    const subject = formData.get("subject") || "No subject";
    const message = formData.get("message");

    const whatsappMessage =
`New Portfolio Message:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // MOBILE → WhatsApp
    if (isMobileDevice()) {
      btn.textContent = currentLang === 'fr' ? "Ouverture WhatsApp..." : "Opening WhatsApp...";
      window.open(whatsappURL, "_blank");
      setTimeout(() => {
        btn.textContent = currentLang === 'fr' ? "Envoyé via WhatsApp ✓" : "Sent via WhatsApp ✓";
        form.reset();
        btn.disabled = false;
      }, 1500);
      return;
    }

    // DESKTOP → Email first, WhatsApp fallback
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        btn.textContent = currentLang === 'fr' ? "Message envoyé ✓" : "Message sent ✓";
        form.reset();
      } else {
        throw new Error("Formspree failed");
      }
    } catch (error) {
      btn.textContent = currentLang === 'fr' ? "Redirection WhatsApp..." : "Redirecting to WhatsApp...";
      window.open(whatsappURL, "_blank");
      btn.textContent = currentLang === 'fr' ? "Envoyé via WhatsApp ✓" : "Sent via WhatsApp ✓";
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// =============================================
// NAV — Burger menu
// =============================================
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = burger.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-close').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// =============================================
// NAV — Scroll highlight (disabled when menu open)
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (navMenu.classList.contains('open')) return;
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.opacity = a.getAttribute('href') === '#' + current ? '1' : '0.7';

// TYPEWRITER — bilingual
const typewriterEl = document.querySelector('.hero-tag');
let twIndex = 0;
let twTimer = null;

function startTypewriter() {
  clearTimeout(twTimer);
  twIndex = 0;
  typewriterEl.textContent = '';
  const text = currentLang === 'en' ? 'Creative Designer' : 'Creative Designer';
  function type() {
    if (twIndex <= text.length) {
      typewriterEl.textContent = text.slice(0, twIndex++);
      twTimer = setTimeout(type, 100);
    }
  }
  type();
}

if (typewriterEl) {
  setTimeout(startTypewriter, 2000);
}
// PARALLAX
const heroImg = document.querySelector('.hero-image-wrap img');
if (heroImg) {
  heroImg.style.willChange = 'transform';
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
  }, { passive: true });
}
    
// COUNTER
function animateCounter(el, target) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = '+' + Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = '+' + target;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targets = [3, 15, 10];
      document.querySelectorAll('.stat-num').forEach((el, i) => {
        animateCounter(el, targets[i]);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

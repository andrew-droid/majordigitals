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
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        btn.textContent = 'Message envoyé ✓';
        btn.style.background = 'var(--accent)';
        btn.style.color = 'var(--black)';
        form.reset();
      } else {
        btn.textContent = 'Erreur envoi ❌';
      }

    } catch (error) {
      btn.textContent = 'Erreur réseau ❌';
    }

    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}
// Smooth nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.opacity = a.getAttribute('href') === '#' + current ? '1' : '0.7';
  });
});

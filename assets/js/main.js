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

const whatsappNumber = "233536203006";

// Detect mobile device
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = "Envoi...";
    btn.disabled = true;

    const formData = new FormData(form);

    // Extract form values
    const name = formData.get("name");
    const email = formData.get("email");
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

    // =========================
    // 📱 MOBILE → WhatsApp FIRST
    // =========================
    if (isMobileDevice()) {
      btn.textContent = "Ouverture WhatsApp...";

      window.open(whatsappURL, "_blank");

      setTimeout(() => {
        btn.textContent = "Envoyé via WhatsApp ✓";
        form.reset();
        btn.disabled = false;
      }, 1500);

      return;
    }

    // =========================
    // 💻 DESKTOP → EMAIL FIRST
    // =========================
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        btn.textContent = "Message envoyé ✓";
        form.reset();
      } else {
        throw new Error("Formspree failed");
      }

    } catch (error) {
      console.log("Email failed → WhatsApp fallback");

      btn.textContent = "Redirection WhatsApp...";

      window.open(whatsappURL, "_blank");

      btn.textContent = "Envoyé via WhatsApp ✓";
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}
// Smooth nav highlight
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
  });
});
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMenu.classList.toggle('open');
  // empêche le scroll quand menu ouvert
  document.body.style.overflow = burger.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.nav-close').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

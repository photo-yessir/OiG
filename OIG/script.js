// ---- Mobile Nav Toggle ----
(function setupNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---- Active Nav Link ----
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#desktop-nav a, #mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- Scroll fade-in ----
(function observeFadeIns() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  // Add animate-start so elements start invisible, then reveal on scroll
  elements.forEach(el => el.classList.add('animate-start'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.classList.remove('animate-start');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => io.observe(el));
})();

// ---- Animated Counter ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start + suffix;
    }, 16);
  });
}

// Trigger counter when hero stats visible
(function setupCounters() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { animateCounters(); io.disconnect(); }
  }, { threshold: 0.5 });
  io.observe(statsSection);
})();

// ---- Gallery Lightbox ----
(function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

// ---- Contact Form ----
(function setupForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      form.reset();
      showToast('✔ Message sent! We\'ll get back to you soon.');
    }, 1200);
  });
})();

// ---- Toast notification ----
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✔</span> <span id="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  document.getElementById('toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ---- Navbar shadow on scroll ----
(function navScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
    else nav.style.boxShadow = '';
  }, { passive: true });
})();

/* ════════════════════════════════════════════════
   UI — nav hamburger (mobile), nav scroll-shrink, whatsapp
   ════════════════════════════════════════════════ */

/* ── NAV HAMBURGER ── */
(function () {
  const btn = document.getElementById('nav-hamburger');
  const mob = document.getElementById('nav-mobile');
  if (!btn || !mob) return;

  function close() {
    btn.classList.remove('open');
    mob.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    mob.setAttribute('aria-hidden', 'true');
  }

  btn.addEventListener('click', () => {
    const opening = !btn.classList.contains('open');
    btn.classList.toggle('open');
    mob.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(opening));
    mob.setAttribute('aria-hidden', String(!opening));
    if (opening) {
      const firstLink = mob.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      btn.focus();
    }
  });

  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mob.classList.contains('open')) close();
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !mob.contains(e.target)) close();
  });

  /* sincronizar estado activo del lang toggle del menú móvil */
  const mobEs = document.getElementById('mob-btn-es');
  const mobEn = document.getElementById('mob-btn-en');
  if (mobEs && mobEn) {
    const syncMob = lang => {
      mobEs.classList.toggle('active', lang === 'es');
      mobEn.classList.toggle('active', lang === 'en');
    };
    mobEs.addEventListener('click', () => syncMob('es'));
    mobEn.addEventListener('click', () => syncMob('en'));
    document.getElementById('btn-es')?.addEventListener('click', () => syncMob('es'));
    document.getElementById('btn-en')?.addEventListener('click', () => syncMob('en'));
  }
})();

/* ── NAV SCROLL SHRINK ── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const nav = document.getElementById('nav');
      if (nav) nav.style.height = window.scrollY > 55 ? '48px' : '56px';
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── SMOOTH SCROLL ──
   Scroll animado y suave (1.1s – 2.4s según distancia) al hacer click
   en cualquier ancla del nav (desktop/mobile) y en los CTAs del hero
   (Contactar / Ver portafolio). Cubre todos los <a href="#..."> de la página. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let controller = null;

  function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function navOffset() {
    const nav = document.getElementById('nav');
    return nav ? nav.offsetHeight + 8 : 0;
  }

  function animateTo(targetY) {
    if (controller) {
      controller.abort();
      controller = null;
    }
    controller = new AbortController();
    const signal = controller.signal;

    const startY = window.scrollY;
    const dist = targetY - startY;
    if (Math.abs(dist) < 2) return;

    const duration = Math.min(2400, Math.max(1100, Math.abs(dist) * 0.6));
    let startT = null;
    let rafId = null;

    function cancel() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    window.addEventListener('wheel', cancel, { passive: true, signal });
    window.addEventListener('touchstart', cancel, { passive: true, signal });

    function step(ts) {
      if (startT === null) startT = ts;
      const p = Math.min(1, (ts - startT) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(p));
      if (p < 1) {
        rafId = requestAnimationFrame(step);
      }
    }
    rafId = requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      let targetY;
      if (href === '#' || href === '#top') {
        targetY = 0;
      } else {
        const target = document.querySelector(href);
        if (!target) return;
        targetY = target.getBoundingClientRect().top + window.scrollY - navOffset();
      }
      e.preventDefault();
      if (reduce) {
        window.scrollTo(0, targetY);
      } else {
        animateTo(targetY);
      }
      if (href !== '#') history.pushState(null, '', href);
    });
  });
})();

/* ── WHATSAPP FLOTANTE: hover reinicia GIF + audio ── */
(function () {
  const btn    = document.getElementById('wa-btn');
  const gif    = document.getElementById('wa-gif');
  let audio = document.getElementById('wa-audio');
  let audioLoaded = false;
  function getAudio() {
    if (!audioLoaded) {
      audio = new Audio('static/media/hi.mp3');
      audio.preload = 'none';
      audioLoaded = true;
    }
    return audio;
  }
  const toggle = document.getElementById('wa-toggle');
  const wrapper= document.getElementById('wa-wrapper');
  if (!btn || !gif || !audio) return;

  const GIF_SRC = gif.src;

  // Desktop: hover reinicia GIF + audio
  btn.addEventListener('mouseenter', () => {
    gif.src = '';
    gif.src = GIF_SRC;
    const a = getAudio();
    a.currentTime = 0;
    a.play().catch(() => {});
  });

  btn.addEventListener('focus', () => {
    gif.src = '';
    gif.src = GIF_SRC;
  });
  btn.addEventListener('blur', () => {
    gif.src = '';
    gif.src = GIF_SRC;
  });

  // Mobile: pestaña abre/cierra el bot
  if (toggle && wrapper) {
    toggle.addEventListener('click', () => {
      const isOpen = wrapper.classList.toggle('open');
      toggle.innerHTML = isOpen ? '&#8250;' : '&#8249;';
      // al abrir, reinicia GIF + audio
      if (isOpen) {
        gif.src = '';
        gif.src = GIF_SRC;
        const a = getAudio();
        a.currentTime = 0;
        a.play().catch(() => {});
      }
    });
  }
})();

(function () {
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(entries => {
    let activeId = '';
    for (const entry of entries) {
      if (entry.isIntersecting) activeId = entry.target.id;
    }
    if (!activeId) return;
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
})();

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
  });

  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

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
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const down = window.scrollY > 55;
  nav.style.height = down ? '48px' : '56px';
}, { passive: true });

/* ── WHATSAPP FLOTANTE: hover reinicia GIF + audio ── */
(function () {
  const btn    = document.getElementById('wa-btn');
  const gif    = document.getElementById('wa-gif');
  const audio  = document.getElementById('wa-audio');
  const toggle = document.getElementById('wa-toggle');
  const wrapper= document.getElementById('wa-wrapper');
  if (!btn || !gif || !audio) return;

  const GIF_SRC = gif.src;

  // Desktop: hover reinicia GIF + audio
  btn.addEventListener('mouseenter', () => {
    gif.src = '';
    gif.src = GIF_SRC;
    audio.currentTime = 0;
    audio.play().catch(() => {});
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
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    });
  }
})();

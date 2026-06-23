/* ════════════════════════════════════════════════
   EFFECTS — typewriter, scroll-reveal, cursor trail
   ════════════════════════════════════════════════ */

/* ── TYPEWRITER ── */
(function () {
  let twRI = 0, twCI = 0, twDel = false;
  function twTick() {
    const roles = window.TW_ROLES;
    const cur = roles[twRI % roles.length];
    const el  = document.getElementById('tw-text');
    if (!el) return;
    if (!twDel) {
      el.textContent = cur.slice(0, twCI);
      twCI++;
      if (twCI > cur.length) { twDel = true; setTimeout(twTick, 1800); return; }
    } else {
      twCI--;
      el.textContent = cur.slice(0, twCI);
      if (twCI === 0) { twDel = false; twRI = (twRI + 1) % roles.length; setTimeout(twTick, 350); return; }
    }
    setTimeout(twTick, twDel ? 38 : 72);
  }
  setTimeout(twTick, 900);
})();

/* ── SCROLL REVEAL ──
   Sólo togglea la clase .revealed; el estado oculto/visible y el
   delay escalonado los define animations.css. Sin estilos inline,
   por lo que el :hover de las cards (transform) ya no queda anulado. */
(function () {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));

  function check() {
    const limit = window.innerHeight * 0.90;
    for (const el of els) {
      if (el._shown) continue;
      if (el.getBoundingClientRect().top < limit) {
        el._shown = true;
        el.classList.add('revealed');
      }
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
  setTimeout(check, 200);
})();

/* ── CURSOR TRAIL ── */
(function () {
  if ('ontouchstart' in window) return;
  const pool = [];
  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    const d = document.createElement('div');
    d.className = 'cursor-dot';
    document.body.appendChild(d);
    pool.push({ el: d, x: 0, y: 0, life: 0 });
  }
  let mx = 0, my = 0, idx = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  let last = 0;
  function tick(ts) {
    if (ts - last > 28) {
      const dot = pool[idx % COUNT];
      dot.x = mx; dot.y = my; dot.life = 1;
      dot.el.style.left = mx + 'px';
      dot.el.style.top  = my + 'px';
      dot.el.style.opacity = '0.55';
      dot.el.style.transform = 'translate(-50%,-50%) scale(1)';
      clearTimeout(dot._t);
      dot._t = setTimeout(() => {
        dot.el.style.opacity = '0';
        dot.el.style.transform = 'translate(-50%,-50%) scale(.3)';
        dot.el.style.transition = 'opacity .45s, transform .45s';
      }, 30);
      idx++;
      last = ts;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

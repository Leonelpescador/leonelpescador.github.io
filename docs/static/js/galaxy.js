/* ════════════════════════════════════════════════
   GALAXY — canvas de partículas del hero (autocontenido)
   ════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('particle-canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Animated galaxy background');
  const ctx    = canvas.getContext('2d');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resize();
    ctx.fillStyle = 'rgba(4,4,13,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  /* paletas */
  const CORE_COLS  = ['#fff8e1','#ffe9a0','#ffd166','#ffffff','#fff3c4','#ffe0b2','#fffde7'];
  const ARM_INNER  = ['#e8e0ff','#c4b2ff','#ffffff','#d4c8ff','#b8a8ff','#ede9fe'];
  const ARM_MID    = ['#a48bff','#8052ff','#b3a0ff','#ffffff','#c084fc','#a78bfa'];
  const ARM_OUTER  = ['#6b4dcc','#8052ff','#c4b2ff','#60a5fa','#93c5fd','#a5b4fc','#818cf8'];
  const HALO_COLS  = ['#ffffff','#e0d8ff','#c4b2ff','#ddd6fe','#ede9fe'];
  const NEB_WARM   = ['rgba(255,80,120,','rgba(255,100,50,','rgba(255,60,160,'];
  const NEB_COOL   = ['rgba(60,100,255,','rgba(80,40,200,','rgba(40,180,255,','rgba(128,82,255,'];

  function rndFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  let stars = [], nebulae = [], rot = 0, clock = 0;

  /* mouse 3D – estado suavizado con lerp */
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    tmx = Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width  * 2 - 1));
    tmy = Math.max(-1, Math.min(1, (e.clientY - rect.top)  / rect.height * 2 - 1));
  }, { passive: true });
  document.addEventListener('mouseleave', () => { tmx = 0; tmy = 0; });

  function buildGalaxy() {
    stars   = [];
    nebulae = [];
    const NUM_ARMS  = 4;
    const TIGHTNESS = 4.4;
    const isMobile = window.innerWidth < 768;
    const particleScale = isMobile ? 0.4 : 1;

    /* ── fondo estelar profundo ── */
    for (let i = 0; i < Math.round(700 * particleScale); i++) {
      stars.push({
        gx: (Math.random() - .5) * 4.5,
        gy: (Math.random() - .5) * 2.5,
        gz: (Math.random() - .5) * 4.5,
        sz: .12 + Math.random() * .55,
        col: '#ffffff',
        al:  .03 + Math.random() * .18,
        tw:  Math.random() * Math.PI * 2,
        bg:  true
      });
    }

    /* ── bulbo central denso ── */
    for (let i = 0; i < Math.round(2200 * particleScale); i++) {
      const r  = Math.pow(Math.random(), 2.2) * .16;
      const th = Math.random() * Math.PI * 2;
      stars.push({
        gx: r * Math.cos(th),
        gy: (Math.random() - .5) * r * .32,
        gz: r * Math.sin(th),
        sz: .5 + Math.random() * 3.0,
        col: rndFrom(CORE_COLS),
        al:  .5  + Math.random() * .5,
        tw:  Math.random() * Math.PI * 2
      });
    }

    /* ── 4 brazos espirales logarítmicos ── */
    for (let arm = 0; arm < NUM_ARMS; arm++) {
      const base = (arm / NUM_ARMS) * Math.PI * 2;
      for (let i = 0; i < Math.round(2600 * particleScale); i++) {
        const t      = i / 2600;
        const r      = .06 + t * .94;
        const spread = .022 + t * .11;
        const th     = base + TIGHTNESS * t + (Math.random() - .5) * spread * 4.2;
        const rr     = r   + (Math.random() - .5) * spread * .85;
        const col    = t < .18 ? rndFrom(ARM_INNER) : t < .48 ? rndFrom(ARM_MID) : rndFrom(ARM_OUTER);
        const bright = 1 - t * .50;
        stars.push({
          gx: rr * Math.cos(th),
          gy: (Math.random() - .5) * .022 * (1 - t * .65),
          gz: rr * Math.sin(th),
          sz: Math.max(.22, (.28 + Math.random() * 2.4) * bright),
          col,
          al: (.18 + Math.random() * .82) * bright,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    /* ── polvo interbrazos ── */
    for (let i = 0; i < Math.round(1100 * particleScale); i++) {
      const r  = .04 + Math.random() * .92;
      const th = Math.random() * Math.PI * 2;
      stars.push({
        gx: r * Math.cos(th),
        gy: (Math.random() - .5) * .014,
        gz: r * Math.sin(th),
        sz: .18 + Math.random() * .75,
        col: rndFrom(ARM_MID),
        al:  .025 + Math.random() * .09,
        tw:  Math.random() * Math.PI * 2
      });
    }

    /* ── halo esférico ── */
    for (let i = 0; i < Math.round(900 * particleScale); i++) {
      const r  = .45 + Math.random() * .85;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - .5) * Math.PI;
      stars.push({
        gx: r * Math.cos(th) * Math.cos(ph),
        gy: r * Math.sin(ph) * .62,
        gz: r * Math.sin(th) * Math.cos(ph),
        sz: .18 + Math.random() * .60,
        col: rndFrom(HALO_COLS),
        al:  .028 + Math.random() * .15,
        tw:  Math.random() * Math.PI * 2
      });
    }

    /* ── superestrellas con destello en cruz ── */
    for (let i = 0; i < Math.round(65 * particleScale); i++) {
      const r  = Math.random() < .35 ? Math.random() * .12 : .05 + Math.random() * .85;
      const th = Math.random() * Math.PI * 2;
      stars.push({
        gx:   r * Math.cos(th),
        gy:   (Math.random() - .5) * .08,
        gz:   r * Math.sin(th),
        sz:   2.0 + Math.random() * 4.0,
        col:  Math.random() > .45 ? '#ffffff' : rndFrom(CORE_COLS),
        al:   .65 + Math.random() * .35,
        tw:   Math.random() * Math.PI * 2,
        giant: true
      });
    }

    /* ── nebulosas en 3D ── */
    for (let i = 0; i < (isMobile ? 4 : 14); i++) {
      const r  = .08 + Math.random() * .78;
      const th = Math.random() * Math.PI * 2;
      const warm = Math.random() > .52;
      nebulae.push({
        gx:  r * Math.cos(th),
        gz:  r * Math.sin(th),
        rad: .035 + Math.random() * .13,
        col: warm ? rndFrom(NEB_WARM) : rndFrom(NEB_COOL),
        al:  .007 + Math.random() * .022
      });
    }
  }

  const BASE_TILT = Math.PI * .19;

  function frame() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    rot   += .01;
    clock += .01;

    /* suavizar posición del mouse con lerp */
    mx += (tmx - mx) * .05;
    my += (tmy - my) * .05;

    /* inclinación e Y-rotación dinámicas impulsadas por el mouse */
    const curRot  = rot + mx * .32;
    const curTilt = BASE_TILT + my * .20;
    const cosTilt = Math.cos(curTilt);
    const sinTilt = Math.sin(curTilt);

    const cosY = Math.cos(curRot), sinY = Math.sin(curRot);
    const R    = Math.min(W, H) * .52;
    const cx   = W * .60, cy = H * .50;
    const fov  = 1300;

    /* proyectar y ordenar */
    const projected = stars.map(s => {
      if (s.bg) {
        /* parallax opuesto al mouse: el fondo se mueve en contra → sensación de profundidad */
        return {
          sx: cx + s.gx * W * .55 - mx * W * .010,
          sy: cy + s.gy * H * .55 - my * H * .006,
          sz_draw: s.sz, col: s.col,
          al: s.al * (.72 + .28 * Math.sin(clock * .6 + s.tw)),
          z: -2, giant: false
        };
      }
      const rx  = s.gx * cosY - s.gz * sinY;
      const rz  = s.gx * sinY + s.gz * cosY;
      const iy  = s.gy * cosTilt - rz * sinTilt;
      const iz  = s.gy * sinTilt + rz * cosTilt;
      const sc  = fov / (fov + iz * R);
      const dep = .28 + .72 * ((iz * R / fov + 1) * .5);
      const twk = s.giant
        ? .84 + .16 * Math.sin(clock * 1.3 + s.tw)
        : 1;
      return {
        sx: cx + rx * R * sc, sy: cy + iy * R * sc,
        sz_draw: s.sz * sc, col: s.col,
        al: Math.min(1, s.al * dep * twk),
        z: iz, giant: s.giant || false
      };
    }).sort((a, b) => a.z - b.z);

    /* dibujar estrellas */
    for (const p of projected) {
      const a = Math.min(1, Math.max(0, p.al));
      if (a < .004) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle   = p.col;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, Math.max(.14, p.sz_draw), 0, Math.PI * 2);
      ctx.fill();

      if (p.giant && p.sz_draw > 1.2) {
        /* halo de brillo suave (glow 3D realista) */
        const glowR = p.sz_draw * 5;
        const gs = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, glowR);
        gs.addColorStop(0,   'rgba(255,255,240,' + (a * .45) + ')');
        gs.addColorStop(.35, 'rgba(200,180,255,' + (a * .15) + ')');
        gs.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = gs;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, glowR, 0, Math.PI * 2);
        ctx.fill();

        /* destello en cruz */
        const len = p.sz_draw * 6;
        ctx.globalAlpha = a * .28;
        ctx.strokeStyle = p.col;
        ctx.lineWidth   = .6;
        ctx.beginPath();
        ctx.moveTo(p.sx - len, p.sy); ctx.lineTo(p.sx + len, p.sy);
        ctx.moveTo(p.sx, p.sy - len); ctx.lineTo(p.sx, p.sy + len);
        ctx.stroke();
        const d = len * .55;
        ctx.globalAlpha = a * .12;
        ctx.beginPath();
        ctx.moveTo(p.sx - d, p.sy - d); ctx.lineTo(p.sx + d, p.sy + d);
        ctx.moveTo(p.sx + d, p.sy - d); ctx.lineTo(p.sx - d, p.sy + d);
        ctx.stroke();
      }
    }

    /* nebulosas proyectadas */
    ctx.globalAlpha = 1;
    for (const n of nebulae) {
      const rx  = n.gx * cosY - n.gz * sinY;
      const rz  = n.gx * sinY + n.gz * cosY;
      const iy  = -rz * sinTilt;
      const iz  =  rz * cosTilt;
      const sc  = fov / (fov + iz * R);
      const sx  = cx + rx * R * sc;
      const sy  = cy + iy * R * sc;
      const nr  = n.rad * R * sc;
      const ng  = ctx.createRadialGradient(sx, sy, 0, sx, sy, nr);
      ng.addColorStop(0,  n.col + (n.al * 2.2) + ')');
      ng.addColorStop(.4, n.col + (n.al * 1.0) + ')');
      ng.addColorStop(1,  n.col + '0)');
      ctx.fillStyle = ng;
      ctx.beginPath();
      ctx.ellipse(sx, sy, nr, nr * cosTilt, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ── núcleo: bloom en 4 capas ── */
    const pulse = 1 + .05 * Math.sin(clock * .65);

    const g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .038 * pulse);
    g0.addColorStop(0,   'rgba(255,255,235,.95)');
    g0.addColorStop(.25, 'rgba(255,220,120,.60)');
    g0.addColorStop(.6,  'rgba(255,150,80,.20)');
    g0.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = g0;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * .038 * pulse, R * .038 * pulse * cosTilt, 0, 0, Math.PI * 2);
    ctx.fill();

    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .16 * pulse);
    g1.addColorStop(0,   'rgba(255,230,130,.22)');
    g1.addColorStop(.35, 'rgba(230,180,255,.10)');
    g1.addColorStop(.7,  'rgba(128,82,255,.04)');
    g1.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * .16 * pulse, R * .16 * pulse * cosTilt, 0, 0, Math.PI * 2);
    ctx.fill();

    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .46);
    g2.addColorStop(0,   'rgba(160,120,255,.08)');
    g2.addColorStop(.45, 'rgba(128,82,255,.04)');
    g2.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    const g3 = ctx.createRadialGradient(cx, cy, R * .38, cx, cy, R * 1.45);
    g3.addColorStop(0,   'rgba(90,60,190,.045)');
    g3.addColorStop(.5,  'rgba(60,40,140,.022)');
    g3.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, W, H);

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize(); buildGalaxy(); requestAnimationFrame(frame);
})();

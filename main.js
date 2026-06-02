document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Social icons: stagger float delays --- */
  document.querySelectorAll('.social-link').forEach((el, i) => {
    const delay = (Math.random() * 2).toFixed(2);
    el.style.animationDelay = `${delay}s`;
  });

  /* --- Copy email with toast --- */
  const toast = document.getElementById('toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> toast.classList.remove('show'), 2200);
  }

  const emailLink = document.getElementById('email-link');
  if(emailLink){
    emailLink.addEventListener('click', async (ev) => {
      ev.preventDefault();
      const email = emailLink.dataset.email || (emailLink.getAttribute('href')||'').replace('mailto:','');
      try{
        if(navigator.clipboard && navigator.clipboard.writeText){
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); ta.remove();
        }
        showToast('Email copied to clipboard');
      }catch(e){
        showToast('Could not copy — please copy manually');
      }
    });
  }

  /* --- Particle background (lightweight) --- */
  const canvas = document.getElementById('bg-canvas');
  if(canvas && !prefersReduced){
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
    let particles = [];
    let running = true;

    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      // particle count scales with area but kept small
      const area = (w*h) / 100000;
      const count = Math.max(20, Math.round(area * 12));
      particles = new Array(count).fill().map(() => createParticle());
    }

    function rand(min, max){ return Math.random()*(max-min)+min; }

    function createParticle(){
      const size = rand(0.6, 2.4);
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.05, 0.05),
        r: size,
        alpha: rand(0.06, 0.22)
      };
    }

    function step(){
      if(!running) return;
      ctx.clearRect(0,0,w,h);
      // subtle background glow
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x < -10) p.x = w + 10;
        if(p.x > w + 10) p.x = -10;
        if(p.y < -10) p.y = h + 10;
        if(p.y > h + 10) p.y = -10;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*6);
        g.addColorStop(0, `rgba(0,209,255,${p.alpha * 0.7})`);
        g.addColorStop(0.4, `rgba(0,209,255,${p.alpha * 0.18})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.r*6, p.y - p.r*6, p.r*12, p.r*12);
        // small core
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize, {passive:true});
    document.addEventListener('visibilitychange', () => { running = document.visibilityState === 'visible'; if(running) requestAnimationFrame(step); });
    requestAnimationFrame(step);
  }

  /* --- Intersection Observer for fade-in sections --- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  /* --- Pointer-tracking border glow on cards --- */
  const glowCards = document.querySelectorAll(
    '.profile-card, .glass-card, .skill-category, .project-card'
  );

  glowCards.forEach((card) => {
    card.classList.add('glow-border');

    if (prefersReduced) return;

    const setGlowPosition = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    };

    card.addEventListener('mouseenter', () => {
      card.classList.add('is-glowing');
    });

    card.addEventListener('mousemove', setGlowPosition);

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-glowing');
    });
  });

});

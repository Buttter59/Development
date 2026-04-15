// ── TyperTester Shared JS ──

// Theme
const savedTheme = localStorage.getItem('tt_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tt_theme', next);
}

// Nav active link
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (ham && navLinks) {
    ham.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.observe').forEach(el => observer.observe(el));
});

// ── AUDIO ENGINE ──
let AC = null;
function getAC() { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); return AC; }
function sfx(t) {
  try {
    const ac = getAC(); if (ac.state === 'suspended') ac.resume(); const n = ac.currentTime;
    if (t === 'btn') {
      const o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.frequency.setValueAtTime(680, n); o.frequency.exponentialRampToValueAtTime(520, n + .06);
      g.gain.setValueAtTime(.05, n); g.gain.exponentialRampToValueAtTime(.001, n + .1);
      o.start(n); o.stop(n + .11);
    } else if (t === 'key') {
      const b = ac.createBuffer(1, ac.sampleRate * .05, ac.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * .008)) * .18;
      const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = 3200; f.Q.value = 1.2;
      s.buffer = b; s.connect(f); f.connect(g); g.connect(ac.destination); g.gain.setValueAtTime(.5, n); s.start(n);
    } else if (t === 'err') {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = 'triangle';
      o.connect(g); g.connect(ac.destination);
      o.frequency.setValueAtTime(160, n); o.frequency.exponentialRampToValueAtTime(90, n + .12);
      g.gain.setValueAtTime(.06, n); g.gain.exponentialRampToValueAtTime(.001, n + .14);
      o.start(n); o.stop(n + .15);
    } else if (t === 'word') {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine';
      o.connect(g); g.connect(ac.destination);
      o.frequency.setValueAtTime(900, n); o.frequency.exponentialRampToValueAtTime(1100, n + .04);
      g.gain.setValueAtTime(.05, n); g.gain.exponentialRampToValueAtTime(.001, n + .12);
      o.start(n); o.stop(n + .13);
    } else if (t === 'wrong') {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square';
      o.connect(g); g.connect(ac.destination);
      o.frequency.setValueAtTime(200, n); g.gain.setValueAtTime(.03, n);
      g.gain.exponentialRampToValueAtTime(.001, n + .07); o.start(n); o.stop(n + .08);
    }
  } catch (e) {}
}

// Button click sounds for nav
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.btn-primary, a.btn-secondary, a.play-nav-btn, button.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => sfx('btn'));
  });
});

// WPM Tier helper
function getWpmTier(wpm) {
  if (wpm < 25) return { label: 'Beginner', color: '#888', pct: 15 };
  if (wpm < 40) return { label: 'Below Average', color: '#888', pct: 30 };
  if (wpm < 55) return { label: 'Average', color: '#42a5f5', pct: 50 };
  if (wpm < 70) return { label: 'Above Average', color: '#42a5f5', pct: 65 };
  if (wpm < 90) return { label: 'Fast', color: '#4caf50', pct: 80 };
  if (wpm < 120) return { label: 'Professional', color: '#f9a825', pct: 90 };
  if (wpm < 150) return { label: 'Elite', color: '#ef5350', pct: 97 };
  return { label: 'World-Class', color: '#ef5350', pct: 99 };
}

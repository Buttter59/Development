// ── TyperTester Features: Achievements, Heatmap, Progress ──

// ── ACHIEVEMENTS ──
const ACHIEVEMENT_DEFS = [
  { id: 'first_test',    icon: '🎯', name: 'First Test',        desc: 'Complete your first typing test',                 check: (s, h) => h.length >= 1 },
  { id: 'wpm_40',        icon: '⚡', name: 'Average Breaker',   desc: 'Type above the global average (40 WPM)',          check: (s) => s.w >= 40 },
  { id: 'wpm_60',        icon: '🚀', name: 'First 60 WPM',      desc: 'Reach 60 words per minute',                       check: (s) => s.w >= 60 },
  { id: 'wpm_80',        icon: '🔥', name: 'Speed Demon',       desc: 'Reach 80 words per minute',                       check: (s) => s.w >= 80 },
  { id: 'wpm_100',       icon: '💯', name: 'Triple Digits',     desc: 'Hit 100 WPM — professional level',                check: (s) => s.w >= 100 },
  { id: 'wpm_120',       icon: '⭐', name: 'Elite Typist',      desc: 'Reach 120 WPM — top 1%',                          check: (s) => s.w >= 120 },
  { id: 'acc_100',       icon: '🎖️', name: 'Flawless',          desc: 'Complete a test with 100% accuracy',              check: (s) => s.a === 100 && s.c >= 20 },
  { id: 'acc_98_fast',   icon: '💎', name: 'Precision & Speed', desc: 'Score 98%+ accuracy at 70+ WPM',                  check: (s) => s.a >= 98 && s.w >= 70 },
  { id: 'streak_5',      icon: '📅', name: 'Dedicated',         desc: 'Complete 5 tests in a single session',            check: (s, h) => h.length >= 5 },
  { id: 'streak_10',     icon: '🏆', name: 'Committed',         desc: 'Complete 10 tests in a single session',           check: (s, h) => h.length >= 10 },
  { id: 'hard_pass',     icon: '📚', name: 'Scholar',           desc: 'Complete a Hard difficulty test',                  check: (s) => s.d === 'hard' && s.c >= 10 },
  { id: 'extreme_pass',  icon: '🧠', name: 'Intellectual',      desc: 'Complete an Extreme difficulty test',              check: (s) => s.d === 'extreme' && s.c >= 10 },
  { id: 'long_test',     icon: '⏱️', name: 'Marathon Typist',   desc: 'Complete a 5-minute test',                        check: (s) => s.dur >= 300 && s.c >= 20 },
  { id: 'improve',       icon: '📈', name: 'Getting Better',    desc: 'Beat your previous best score on the same difficulty', check: (s, h) => { const prev = h.slice(1).filter(r => r.d === s.d); return prev.length > 0 && s.w > Math.max(...prev.map(r => r.w)); } },
  { id: 'consistency',   icon: '🎵', name: 'Consistency King',  desc: 'Score 85%+ consistency on a 60s+ test',           check: (s) => s.cons >= 85 && s.dur >= 60 },
  { id: 'custom_text',   icon: '✍️',  name: 'Own Words',         desc: 'Complete a test using custom text',               check: (s) => s.mode === 'custom' },
  { id: 'multilang',     icon: '🌍', name: 'Polyglot',          desc: 'Complete a test in a non-English language',       check: (s) => s.lang && s.lang !== 'en' },
];

function getUnlocked() {
  try { return JSON.parse(localStorage.getItem('tt_achievements') || '[]'); } catch (e) { return []; }
}
function saveUnlocked(list) {
  try { localStorage.setItem('tt_achievements', JSON.stringify(list)); } catch (e) {}
}

function checkAchievements(currentScore, history) {
  const unlocked = getUnlocked();
  const newlyUnlocked = [];
  for (const def of ACHIEVEMENT_DEFS) {
    if (!unlocked.includes(def.id) && def.check(currentScore, history)) {
      unlocked.push(def.id);
      newlyUnlocked.push(def);
    }
  }
  if (newlyUnlocked.length) saveUnlocked(unlocked);
  return newlyUnlocked;
}

function renderAchievements(containerId) {
  const el = document.getElementById(containerId); if (!el) return;
  const unlocked = getUnlocked();
  el.innerHTML = ACHIEVEMENT_DEFS.map(d => {
    const got = unlocked.includes(d.id);
    return `<div class="badge-card${got ? ' unlocked' : ''}">
      <div class="badge-icon">${got ? d.icon : '🔒'}</div>
      <div class="badge-name">${d.name}</div>
      <div class="badge-desc">${d.desc}</div>
    </div>`;
  }).join('');
}

// ── KEYBOARD HEATMAP ──
function drawHeatmap(canvasId, mistyped) {
  const canvas = document.getElementById(canvasId); if (!canvas) return;
  const ROWS = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','='],
    ['q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['a','s','d','f','g','h','j','k','l',';',"'"],
    ['z','x','c','v','b','n','m',',','.','/',' ']
  ];
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.parentElement.clientWidth;
  const KS = Math.floor(W / 14); // key size
  const H = KS * 4 + KS * 0.6 * 3 + 16;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);

  const maxCount = Math.max(1, ...Object.values(mistyped));
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const bgBase = isDark ? [30, 30, 30] : [240, 238, 232];
  const fgBase = isDark ? [200, 200, 200] : [80, 80, 80];

  ROWS.forEach((row, ri) => {
    const offsets = [0, 0.5, 0.75, 1];
    const off = offsets[ri] * KS;
    row.forEach((key, ki) => {
      const x = off + ki * (KS + 2);
      const y = ri * (KS + 4);
      const count = mistyped[key] || 0;
      const heat = count / maxCount;
      // Color: base → red based on heat
      const r = Math.round(bgBase[0] + heat * (239 - bgBase[0]));
      const g = Math.round(bgBase[1] + heat * (83 - bgBase[1]));
      const b = Math.round(bgBase[2] + heat * (80 - bgBase[2]));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.roundRect(x, y, KS, KS, 3);
      ctx.fill();
      if (count > 0) {
        ctx.strokeStyle = `rgba(239,83,80,${Math.min(0.8, heat + 0.2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.fillStyle = heat > 0.5 ? '#fff' : `rgb(${fgBase[0]},${fgBase[1]},${fgBase[2]})`;
      ctx.font = `${Math.max(9, KS * 0.35)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(key === ' ' ? '⎵' : key.toUpperCase(), x + KS / 2, y + KS / 2);
    });
  });

  // Legend
  const lgW = 120, lgH = 10;
  const lgX = W - lgW - 8, lgY = H - 18;
  const lg = ctx.createLinearGradient(lgX, 0, lgX + lgW, 0);
  lg.addColorStop(0, isDark ? 'rgb(30,30,30)' : 'rgb(240,238,232)');
  lg.addColorStop(1, 'rgb(239,83,80)');
  ctx.fillStyle = lg;
  ctx.beginPath(); ctx.roundRect(lgX, lgY, lgW, lgH, 3); ctx.fill();
  ctx.fillStyle = isDark ? 'rgba(200,200,200,0.5)' : 'rgba(80,80,80,0.5)';
  ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('few errors', lgX, lgY - 3);
  ctx.textAlign = 'right';
  ctx.fillText('most errors', lgX + lgW, lgY - 3);
}

// ── PROGRESS CHART ──
function drawProgressChart(canvasId, records) {
  const canvas = document.getElementById(canvasId); if (!canvas) return;
  const box = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const W = box.clientWidth, H = box.clientHeight || 200;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);

  const data = [...records].reverse().slice(-30); // last 30 sessions
  if (data.length < 2) {
    ctx.fillStyle = 'rgba(128,128,128,0.3)'; ctx.font = '12px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Play more tests to see your progress chart', W / 2, H / 2); return;
  }

  const pad = { t: 20, r: 40, b: 36, l: 8 };
  const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
  const vals = data.map(d => d.w);
  const maxV = Math.max(...vals, 20);
  const yMax = Math.ceil(maxV / 10) * 10 + 10;
  const xS = i => pad.l + (i / (data.length - 1)) * cw;
  const yS = v => pad.t + ch - (v / yMax) * ch;

  // Grid lines
  for (let y = 0; y <= yMax; y += 10) {
    const yp = yS(y);
    ctx.strokeStyle = 'rgba(128,128,128,0.07)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, yp); ctx.lineTo(W - pad.r, yp); ctx.stroke();
    ctx.fillStyle = 'rgba(128,128,128,0.3)'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
    ctx.fillText(y, W - pad.r + 4, yp + 3);
  }

  // Moving average
  const ma = data.map((_, i, a) => {
    const sl = a.slice(Math.max(0, i - 4), i + 1);
    return sl.reduce((s, v) => s + v.w, 0) / sl.length;
  });
  ctx.beginPath(); ctx.strokeStyle = 'rgba(249,168,37,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
  ma.forEach((v, i) => i === 0 ? ctx.moveTo(xS(i), yS(v)) : ctx.lineTo(xS(i), yS(v))); ctx.stroke(); ctx.setLineDash([]);

  // Area fill under WPM line
  const pts = data.map((d, i) => ({ x: xS(i), y: yS(d.w), d }));
  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
  grad.addColorStop(0, 'rgba(249,168,37,0.15)'); grad.addColorStop(1, 'rgba(249,168,37,0)');
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.lineTo(pts[pts.length - 1].x, pad.t + ch); ctx.lineTo(pts[0].x, pad.t + ch);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // WPM line
  ctx.beginPath(); ctx.strokeStyle = '#f9a825'; ctx.lineWidth = 2.5;
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y); ctx.stroke();

  // Dots + labels for each point
  pts.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = p.d.d === 'easy' ? '#4caf50' : p.d.d === 'normal' ? '#42a5f5' : p.d.d === 'hard' ? '#ff9800' : '#ef5350';
    ctx.fill();
    if (i === pts.length - 1 || i === 0) {
      ctx.fillStyle = 'rgba(249,168,37,0.8)'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
      ctx.fillText(p.d.w, p.x, p.y - 8);
    }
  });

  // X-axis dates
  ctx.fillStyle = 'rgba(128,128,128,0.35)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  const dateStep = Math.max(1, Math.floor(data.length / 6));
  data.forEach((d, i) => { if (i % dateStep === 0) ctx.fillText(d.dt || '', xS(i), H - pad.b + 14); });

  // Best score annotation
  const bestIdx = vals.indexOf(Math.max(...vals));
  ctx.fillStyle = 'rgba(249,168,37,0.9)'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
  ctx.fillText('▲ best', xS(bestIdx), yS(vals[bestIdx]) - 16);
}

// ── RECOMMENDATIONS ──
function getRecommendations(score) {
  const recs = [];
  if (score.a < 90) recs.push({ icon: '🎯', title: 'Focus on accuracy first', body: 'Your accuracy is below 90%. Slow down by 20% and prioritize hitting every key correctly. Speed follows accuracy — never the reverse.' });
  if (score.cons < 70) recs.push({ icon: '🎵', title: 'Work on consistency', body: 'Your speed varied a lot during this test. Try to maintain a steady rhythm instead of bursting fast then slowing down. Metronome typing drills help.' });
  if (score.w < 40) recs.push({ icon: '⌨️', title: 'Learn touch typing', body: 'If you\'re not already using all 10 fingers on the home row, this is your biggest unlock. Even 2 weeks of touch typing practice dramatically improves speed.' });
  if (score.w >= 40 && score.w < 60) recs.push({ icon: '📖', title: 'Try Normal difficulty', body: 'You\'re ready to move beyond easy words. Normal difficulty passages will challenge your vocabulary and build real-world typing fluency.' });
  if (score.w >= 60 && score.w < 80) recs.push({ icon: '🔄', title: 'Drill your weak keys', body: 'At your speed, a few problem keys are your bottleneck. Notice where you hesitate or make errors — those are the keys to drill specifically.' });
  if (score.w >= 80 && score.w < 100) recs.push({ icon: '🚀', title: 'Increase difficulty level', body: 'You\'re ready for Hard or Extreme passages. More complex vocabulary will push your fingers into less familiar territory, building new speed.' });
  if (score.w >= 100) recs.push({ icon: '⭐', title: 'Try longer tests', body: 'At 100+ WPM, stamina becomes important. Try the 2-minute or 5-minute tests to ensure your speed holds up over time, not just in short sprints.' });
  if (score.e > 5 && score.a < 95) recs.push({ icon: '👀', title: 'Look ahead while typing', body: 'Many errors come from hesitating at word boundaries. Train yourself to read 1–2 words ahead while your fingers handle the current one.' });
  if (score.dur < 30) recs.push({ icon: '⏱️', title: 'Use longer time limits', body: 'Short tests only measure burst speed. Try 60s or longer — they reveal your real working speed and help build endurance.' });
  if (score.d === 'easy' && score.w > 50) recs.push({ icon: '📚', title: 'Level up your difficulty', body: 'You\'re scoring well on Easy. Challenge yourself with Normal or Hard to ensure your skills transfer to real writing situations.' });
  return recs.slice(0, 3);
}

// Expose
window.TTFeatures = { checkAchievements, renderAchievements, drawHeatmap, drawProgressChart, getRecommendations, ACHIEVEMENT_DEFS, getUnlocked };

// ── TyperTester Game Logic ──

const P = [
  { d: 'easy', t: 'Dogs and Cats', s: `Dogs are one of the best pets in the world. They like to run and play. A dog will wag its tail when it sees you. Some dogs are big and some are very small. Cats are also great pets. They like to sleep in the sun and sit on your lap. Cats can jump very high. Both dogs and cats need food and fresh water each day. If you are kind to them they will be your friend for life. Pets make us happy and help us feel less sad. Take good care of your pet and it will love you back.` },
  { d: 'easy', t: 'The Rain', s: `Rain falls from the sky when clouds get full of water. The drops hit the roof and make a soft sound. After the rain the grass is wet and green. Worms come out of the ground when the soil is wet. Frogs love the rain and jump in the mud. Kids like to put on boots and splash in the rain. Plants need rain to grow tall and strong. Without rain there would be no food to eat. Rain fills the lakes and rivers so fish can swim. The sun comes back out after the rain and the sky turns blue.` },
  { d: 'easy', t: 'The Sun', s: `The sun is a big star in the sky. It gives us light and heat each day. Plants use sunlight to make food and grow. We need the sun to see and stay warm. In the day the sun is high and bright. At dusk it turns red and orange as it goes down. At night the sun is on the other side of the Earth. The moon and stars come out then. In summer the sun stays up for a long time. In winter it goes down early and the days feel short. We could not live without the sun and its warm light.` },
  { d: 'easy', t: 'Bread and Food', s: `Bread is made from wheat flour and water. You mix them and let the dough rise. Then you bake it in a hot oven. The smell of fresh bread is one of the best smells in the world. We eat bread with soup and stew. Rice and pasta are also foods made from plants. Fruit like apples and grapes grow on trees. We eat them raw or use them to make juice. Fish and eggs give us good food too. We need food to have the energy to run and play and think. Eat a mix of foods to stay fit and well.` },
  { d: 'normal', t: 'The Story of Coffee', s: `Legend has it that coffee was first found by a goat herder in Ethiopia around the ninth century. He saw his goats dancing with strange energy after eating berries from a tree. Monks at a nearby monastery tried making a drink from the berries and found it kept them awake during evening prayers. Word traveled east and coffee began to be grown across the Arabian Peninsula. By the fifteenth century coffeehouses had spread across the Middle East and became lively places for people to talk and share ideas. When coffee reached Europe it replaced beer as the common morning drink and changed how people worked and thought. Today coffee is one of the most traded goods in the world.` },
  { d: 'normal', t: 'Honeybees', s: `A single honeybee will visit up to one thousand flowers and fly nearly three miles just to fill a spoonful of honey. Bees talk to each other by doing a waggle dance that tells the hive where the best flowers are. The queen of a healthy colony can lay two thousand eggs in a single day. Worker bees live only six weeks during summer but spend every hour gathering nectar and pollen for the group. Without bees to carry pollen between plants the crops that feed most life on Earth would slowly fail. Scientists and farmers around the world are working to protect bee populations from disease and habitat loss.` },
  { d: 'normal', t: 'Apollo 11', s: `On the sixteenth of July nineteen sixty nine three astronauts began the first human journey to the Moon. Neil Armstrong Buzz Aldrin and Michael Collins launched aboard a Saturn V rocket and traveled for four days. On arrival Armstrong and Aldrin descended to the surface in the lunar lander while Collins orbited above them. As Armstrong stepped onto the gray powder he spoke words heard around the world. The astronauts planted a flag collected rock samples and left a plaque that read we came in peace for all mankind. They had roughly twenty one hours on the surface before returning to the orbiting craft completing one of the most remarkable voyages in human history.` },
  { d: 'normal', t: 'The Silk Road', s: `For over a thousand years the Silk Road connected China Rome Persia and India through an extraordinary network of trade routes spanning more than four thousand miles of mountains deserts and plains. Silk was the most prized commodity traveling west but the routes also carried spices glassware textiles and precious metals in both directions. More important than any goods were the ideas that traveled with merchants and pilgrims. Buddhism spread from India into China along these routes. Islam reached Central Asia the same way. Mathematical concepts paper printing and gunpowder moved gradually westward changing European civilization forever.` },
  { d: 'hard', t: 'Library of Alexandria', s: `At its height the Great Library of Alexandria housed between four hundred thousand and seven hundred thousand scrolls representing a vast collection of ancient knowledge. Founded in the third century before the common era under Ptolemaic patronage it employed scholars who translated texts from dozens of languages and pursued research spanning mathematics medicine poetry and astronomy. Vessels arriving at Alexandria were required to surrender any manuscripts on board for copying with originals sometimes retained and copies returned to the owners. The institution attracted luminaries such as Euclid who systematized geometry within its halls and Eratosthenes who calculated the circumference of Earth with remarkable precision using observations of shadows.` },
  { d: 'hard', t: 'Relativity and Time', s: `When Albert Einstein published his special theory of relativity in nineteen oh five he was a twenty six year old patent clerk with no academic position and no laboratory. Yet the paper contained ideas that would fundamentally transform humanity's understanding of space time matter and energy. Einstein demonstrated that time is not a fixed universal backdrop against which events unfold but is instead relative depending on the observer's velocity and position in a gravitational field. A clock moving at high speed ticks measurably more slowly than one at rest a phenomenon verified experimentally and now accounted for in every GPS satellite system in orbit around the Earth.` },
  { d: 'hard', t: 'Industrial Revolution', s: `The Industrial Revolution originating in Britain during the seventeen sixties constituted perhaps the most consequential transformation of human civilization since the advent of agriculture some ten millennia prior. Within the span of a single century steam powered machinery displaced human and animal labor across textile mills coal mines and iron foundries restructuring the economic foundations of society. Urbanization accelerated dramatically as rural populations migrated toward manufacturing centers in search of wages encountering overcrowded housing and dangerous working conditions that reformers would eventually mobilize to address. The revolution engendered new frameworks for organizing labor time and capital while generating the class tensions that would animate political conflict throughout the following century.` },
  { d: 'extreme', t: 'Consciousness', s: `Consciousness remains perhaps the most intractable problem at the confluence of neuroscience philosophy of mind and theoretical physics. The explanatory challenge concerns not merely the functional architecture by which neural systems integrate and broadcast information but the ontological question of why any physical process should be accompanied by subjective phenomenal experience at all. David Chalmers formalized this distinction as the hard problem of consciousness separating it from the comparatively tractable soft problems concerning attention perception and behavioral control. Integrated Information Theory proposes that consciousness is a fundamental intrinsic property of systems exhibiting high degrees of irreducible causal integration measured by the quantity phi.` },
  { d: 'extreme', t: 'Quantum Entanglement', s: `Quantum entanglement describes a correlational structure between particles that defies classical conceptions of locality and separability such that the measurement of one particle instantaneously determines the quantum state of its partner irrespective of the spatial separation between them. Einstein Podolsky and Rosen identified this phenomenon in their nineteen thirty five paper as evidence for the incompleteness of quantum mechanical description invoking what Einstein characterized as spooky action at a distance. John Bell subsequently derived in nineteen sixty four a set of mathematical inequalities that any locally realistic hidden variable theory must satisfy and demonstrated that quantum mechanical predictions systematically violate these constraints.` },
  { d: 'extreme', t: 'The Nature of Time', s: `Time presents perhaps the most perplexing foundational puzzle in contemporary physics and philosophy of science simultaneously constituting the dimension most intimately familiar to human experience and the one whose fundamental nature remains most obscure. Newtonian mechanics conceived of time as an absolute universal parameter flowing uniformly as a fixed backdrop against which all physical events unfold. Einstein's special and general theories of relativity demolished this conception demonstrating that temporal duration is observer dependent with clocks in relative motion or differing gravitational potentials measuring genuinely different elapsed intervals a phenomenon verified with atomic precision and operationally corrected for in global navigation satellite systems.` }
];

let diff = 'easy', totalTime = 15, timeLeft = 15;
let words = [], wordIdx = 0, statuses = [], typedHistory = [];
let lineMap = [], lineTops = [], curLine = 0;
let tmr = null, going = false, correct = 0, errors = 0;
let wpmData = [], errorSeconds = new Set();
let correctChars = 0, incorrectChars = 0;
let lastErrState = false;
let records = [];
try { records = JSON.parse(localStorage.getItem('tt_v7') || '[]'); } catch (e) { }

function fT(s) { return s >= 60 ? `${Math.floor(s / 60)}m${s % 60 ? ` ${s % 60}s` : ''}` : `${s}s`; }

function selectDiff(d) {
  diff = d;
  document.querySelectorAll('.diff-card').forEach(c => { c.classList.remove('selected'); if (c.dataset.diff === d) c.classList.add('selected'); });
  const b = document.getElementById('start-btn'); b.style.opacity = '1'; b.style.pointerEvents = 'auto';
}
function selDur(d) {
  totalTime = d; timeLeft = d;
  document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.dur-btn[data-dur="${d}"]`).classList.add('active');
}

function showScreen(id) {
  document.querySelectorAll('.g-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'records-screen') renderRecords();
  if (id === 'result-screen') setTimeout(drawChart, 120);
}

function startGame() {
  const pool = P.filter(p => p.d === diff);
  const sh = [...pool].sort(() => Math.random() - .5);
  let all = []; for (let i = 0; i < 14; i++) all = all.concat(sh[i % sh.length].s.split(/\s+/).filter(w => w.trim()));
  words = all; statuses = new Array(words.length).fill('pen'); typedHistory = new Array(words.length).fill('');
  statuses[0] = 'cur'; wordIdx = 0; correct = 0; errors = 0; going = false; timeLeft = totalTime; curLine = 0;
  wpmData = []; errorSeconds = new Set(); correctChars = 0; incorrectChars = 0; lastErrState = false;
  clearInterval(tmr);
  document.getElementById('p-title').textContent = sh[0].t;
  const dp = document.getElementById('d-pill'); dp.textContent = diff.toUpperCase(); dp.className = 'd-pill ' + diff;
  document.getElementById('g-timer').textContent = timeLeft; document.getElementById('g-timer').className = 'timer-num green';
  document.getElementById('g-wpm').textContent = '—'; document.getElementById('g-words').textContent = '0';
  document.getElementById('g-acc').textContent = '—'; document.getElementById('g-err').textContent = '0';
  document.getElementById('g-err').style.color = 'var(--text3)';
  const pf = document.getElementById('prog-fill');
  pf.style.transition = 'none'; pf.style.width = '100%'; pf.style.background = 'var(--green)';
  setTimeout(() => pf.style.transition = 'width .9s linear,background .7s ease', 80);
  showScreen('game-screen'); initDisplay();
  const inp = document.getElementById('ti'); inp.value = ''; inp.disabled = false; inp.classList.remove('err');
  setTimeout(() => inp.focus(), 150);
}

function initDisplay() {
  const wd = document.getElementById('wd');
  wd.style.transition = 'none'; wd.style.transform = 'translateY(0)';
  wd.innerHTML = words.map((w, i) => `<span class="w pen" id="w${i}">${w}</span>`).join(' ');
  document.getElementById('w0').className = 'w cur'; document.getElementById('w0').innerHTML = buildCW('');
  setTimeout(() => { measureLines(); curLine = 0; wd.style.transition = 'transform .3s cubic-bezier(.4,0,.2,1)'; scroll(); }, 60);
}

function measureLines() {
  const spans = document.querySelectorAll('#wd .w'); const tops = []; const map = [];
  spans.forEach((sp, i) => { const t = Math.round(sp.offsetTop); if (!tops.includes(t)) tops.push(t); map[i] = t; });
  tops.sort((a, b) => a - b); lineTops = tops; lineMap = map.map(t => tops.indexOf(t));
}
function scroll() { const sl = Math.max(0, curLine - 1); document.getElementById('wd').style.transform = `translateY(-${lineTops[sl] || 0}px)`; }

function buildCW(typed) {
  const word = words[wordIdx] || ''; let h = '';
  for (let i = 0; i < Math.max(typed.length, word.length); i++) {
    if (i < typed.length && i < word.length) h += `<span class="ch ${typed[i] === word[i] ? 'ok' : 'bad'}">${word[i]}</span>`;
    else if (i < typed.length) h += `<span class="ch ex">${typed[i]}</span>`;
    else h += `<span class="ch dim">${word[i]}</span>`;
  }
  return h + '<span class="caret"></span>';
}

function hasErr(typed) {
  const word = words[wordIdx] || ''; if (typed.length > word.length) return true;
  for (let i = 0; i < typed.length; i++) if (typed[i] !== word[i]) return true; return false;
}

function setInputStyle(typed) {
  const inp = document.getElementById('ti'); const err = typed.length > 0 && hasErr(typed);
  inp.classList.toggle('err', err); if (err && !lastErrState) sfx('err'); lastErrState = err;
}

function countBadChars(typed, word) {
  let b = 0; for (let i = 0; i < Math.max(typed.length, word.length); i++) {
    if (i >= word.length || i >= typed.length || typed[i] !== word[i]) b++;
  } return b;
}

// Key events
document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('ti'); if (!inp) return;
  inp.addEventListener('input', onInput);
  inp.addEventListener('keydown', onKey);
  const wa = document.getElementById('word-area'); if (wa) wa.addEventListener('click', () => inp.focus());

  // Check URL params for diff
  const params = new URLSearchParams(window.location.search);
  const pd = params.get('diff');
  if (pd && ['easy','normal','hard','extreme'].includes(pd)) { selectDiff(pd); }
});

function onKey(e) {
  if (!document.getElementById('game-screen') || !document.getElementById('game-screen').classList.contains('active')) return;
  if (e.key === 'Backspace' && e.target.value === '') {
    if (wordIdx > 0) {
      e.preventDefault();
      const cs = document.getElementById('w' + wordIdx); if (cs) { cs.className = 'w pen'; cs.innerHTML = words[wordIdx] || ''; }
      statuses[wordIdx] = 'pen'; wordIdx--;
      if (statuses[wordIdx] === 'done') { correct--; correctChars -= (words[wordIdx] || '').length; }
      else if (statuses[wordIdx] === 'wf') { errors--; incorrectChars -= countBadChars(typedHistory[wordIdx] || '', words[wordIdx] || ''); }
      statuses[wordIdx] = 'cur';
      const prev = typedHistory[wordIdx] || '';
      const ps = document.getElementById('w' + wordIdx); if (ps) { ps.className = 'w cur'; ps.innerHTML = buildCW(prev); }
      e.target.value = prev; lastErrState = false; setInputStyle(prev);
      const nl = lineMap[wordIdx] || 0; if (nl !== curLine) { curLine = nl; scroll(); }
      updateStats(); sfx('key');
    }
  }
}

function onInput(e) {
  if (!document.getElementById('game-screen') || !document.getElementById('game-screen').classList.contains('active')) return;
  const v = e.target.value;
  if (!going && v.length > 0) { going = true; tmr = setInterval(tick, 1000); }
  if (v.endsWith(' ')) {
    const typed = v.trim(); if (!typed) { e.target.value = ''; return; }
    typedHistory[wordIdx] = typed;
    const ok = typed === words[wordIdx];
    const prevSp = document.getElementById('w' + wordIdx); if (prevSp) { prevSp.className = 'w ' + (ok ? 'done' : 'wf'); prevSp.innerHTML = words[wordIdx]; }
    statuses[wordIdx] = ok ? 'done' : 'wf';
    if (ok) { correct++; correctChars += (words[wordIdx] || '').length; sfx('word'); }
    else { errors++; incorrectChars += countBadChars(typed, words[wordIdx] || ''); errorSeconds.add(wpmData.length); sfx('wrong'); }
    wordIdx++;
    if (wordIdx >= words.length - 10) {
      const pool = P.filter(p => p.d === diff);
      const extra = pool[Math.floor(Math.random() * pool.length)].s.split(/\s+/).filter(w => w.trim());
      const base = words.length;
      extra.forEach((w, i) => {
        words.push(w); statuses.push('pen'); typedHistory.push('');
        const sp = document.createElement('span'); sp.className = 'w pen'; sp.id = 'w' + (base + i); sp.textContent = w;
        document.getElementById('wd').appendChild(document.createTextNode(' ')); document.getElementById('wd').appendChild(sp);
      });
      setTimeout(measureLines, 30);
    }
    statuses[wordIdx] = 'cur';
    const ns = document.getElementById('w' + wordIdx); if (ns) { ns.className = 'w cur'; ns.innerHTML = buildCW(''); }
    const nl = lineMap[wordIdx] || 0; if (nl !== curLine) { curLine = nl; scroll(); }
    e.target.value = ''; lastErrState = false; e.target.classList.remove('err'); updateStats();
  } else {
    sfx('key');
    const cs = document.getElementById('w' + wordIdx); if (cs) cs.innerHTML = buildCW(v);
    setInputStyle(v);
  }
}

function tick() {
  timeLeft--;
  document.getElementById('g-timer').textContent = timeLeft;
  const ratio = timeLeft / totalTime;
  const td = document.getElementById('g-timer');
  td.classList.remove('green', 'orange', 'red', 'pulse');
  if (ratio > 0.6) td.classList.add('green'); else if (ratio > 0.25) td.classList.add('orange');
  else { td.classList.add('red'); if (ratio < 0.15) td.classList.add('pulse'); }
  const pf = document.getElementById('prog-fill');
  pf.style.width = (ratio * 100) + '%';
  pf.style.background = ratio > 0.6 ? 'var(--green)' : ratio > 0.25 ? 'var(--orange)' : 'var(--red)';
  const el = totalTime - timeLeft;
  const wpm = el > 0 ? Math.round((correct / el) * 60) : 0;
  const rawWpm = el > 0 ? Math.round(((correct + errors) / el) * 60) : 0;
  wpmData.push({ wpm, rawWpm });
  updateStats(); if (timeLeft <= 0) endGame(false);
}

function updateStats() {
  const el = totalTime - timeLeft; const wpm = el > 0 ? Math.round((correct / el) * 60) : 0;
  const tot = correct + errors; const acc = tot > 0 ? Math.round((correct / tot) * 100) : null;
  document.getElementById('g-wpm').textContent = el > 0 ? wpm : '—';
  document.getElementById('g-words').textContent = correct;
  document.getElementById('g-acc').textContent = acc !== null ? acc + '%' : '—';
  const ee = document.getElementById('g-err'); ee.textContent = errors;
  ee.style.color = errors > 0 ? 'var(--red)' : 'var(--text3)';
}

function endGame(quit) {
  clearInterval(tmr); document.getElementById('ti').disabled = true;
  if (quit) { showScreen('home-screen'); return; }
  const el = totalTime - timeLeft;
  const wpm = el > 0 ? Math.round((correct / el) * 60) : 0;
  const rawWpm = el > 0 ? Math.round(((correct + errors) / el) * 60) : 0;
  const tot = correct + errors; const acc = tot > 0 ? Math.round((correct / tot) * 100) : 100;
  const vals = wpmData.map(d => d.wpm).filter(v => v > 0);
  const mean = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  const stddev = vals.length ? Math.sqrt(vals.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / vals.length) : 0;
  const cons = mean > 0 ? Math.max(0, Math.round(100 - (stddev / mean * 100))) : 0;

  document.getElementById('res-wpm').textContent = wpm;
  document.getElementById('res-acc').textContent = acc + '%';
  document.getElementById('res-raw').textContent = rawWpm;
  document.getElementById('res-chars').textContent = correctChars + '/' + incorrectChars;
  document.getElementById('res-cons').textContent = cons + '%';
  document.getElementById('res-errs').textContent = errors;
  document.getElementById('res-time').textContent = fT(Math.min(el, totalTime));
  document.getElementById('res-meta').textContent = diff.toUpperCase() + ' · ' + fT(totalTime) + ' test';

  // Tier
  const tier = getWpmTier(wpm);
  const tierEl = document.getElementById('res-tier');
  if (tierEl) {
    tierEl.textContent = tier.label;
    tierEl.style.background = tier.color + '22';
    tierEl.style.color = tier.color;
    tierEl.style.border = `1px solid ${tier.color}44`;
  }

  // Global comparison bars
  const maxBar = Math.max(wpm + 20, 220);
  setTimeout(() => {
    setBar('bar-you', wpm, maxBar, `${wpm} wpm`);
    setBar('bar-avg', 40, maxBar, '~40 wpm');
    setBar('bar-office', 65, maxBar, '~65 wpm');
    setBar('bar-pro', 100, maxBar, '~100 wpm');
    setBar('bar-world', 212, maxBar, '212 wpm');
  }, 400);

  // Comparison summary text
  const compEl = document.getElementById('res-compare-summary');
  if (compEl) {
    let msg = '';
    if (wpm < 25) msg = `Your ${wpm} WPM is below average. With regular practice even 15 minutes a day you can reach the global average of 40 WPM within weeks.`;
    else if (wpm < 40) msg = `Your ${wpm} WPM is close to the global average of 40 WPM. A little more practice and you'll be typing above average!`;
    else if (wpm < 55) msg = `You're typing at ${wpm} WPM — right around the global average. You're in the top 50% of typists worldwide.`;
    else if (wpm < 70) msg = `${wpm} WPM puts you above average! You're faster than roughly 60% of people worldwide. Professional level is within reach.`;
    else if (wpm < 90) msg = `Great result — ${wpm} WPM is a fast typist by any measure. You're in the top 20% globally.`;
    else if (wpm < 120) msg = `Impressive! ${wpm} WPM is professional level. You type faster than roughly 95% of all computer users.`;
    else msg = `Elite performance! ${wpm} WPM puts you in the top 1% of typists worldwide. You're approaching expert territory.`;
    compEl.textContent = msg;
  }

  const prevBest = records.filter(r => r.d === diff).sort((a, b) => b.w - a.w)[0];
  const isHS = wpm > 0 && (!prevBest || wpm > prevBest.w);
  document.getElementById('hs-ann').style.display = isHS ? 'block' : 'none';
  records.unshift({ w: wpm, a: acc, c: correct, e: errors, d: diff, dur: totalTime, dt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
  if (records.length > 500) records = records.slice(0, 500);
  try { localStorage.setItem('tt_v7', JSON.stringify(records)); } catch (e) { }
  showScreen('result-screen');
}

function setBar(id, val, max, label) {
  const el = document.getElementById(id); if (!el) return;
  el.style.width = Math.min(100, (val / max) * 100) + '%';
  const lbl = document.getElementById(id + '-lbl'); if (lbl) lbl.textContent = label;
}

function drawChart() {
  const canvas = document.getElementById('res-chart'); if (!canvas) return;
  const box = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const W = box.clientWidth - 20, H = box.clientHeight - 28;
  if (W <= 0 || H <= 0) return;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  if (wpmData.length < 2) { ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.font = '12px monospace'; ctx.fillText('Not enough data', W / 2 - 60, H / 2); return; }
  const pad = { top: 10, right: 44, bottom: 24, left: 8 };
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom;
  const n = wpmData.length;
  const maxV = Math.max(...wpmData.map(d => Math.max(d.wpm, d.rawWpm)), 10);
  const yMax = Math.ceil(maxV / 10) * 10 + 10;
  const xS = i => pad.left + (i / (n - 1)) * cw;
  const yS = v => pad.top + ch - (v / yMax) * ch;

  // Get CSS vars
  const style = getComputedStyle(document.documentElement);
  const accentColor = style.getPropertyValue('--accent').trim() || '#f9a825';
  const textColor = style.getPropertyValue('--text2').trim() || '#888';

  // Grid
  for (let y = 0; y <= yMax; y += 10) {
    const yp = yS(y);
    ctx.strokeStyle = 'rgba(128,128,128,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, yp); ctx.lineTo(W - pad.right, yp); ctx.stroke();
    ctx.fillStyle = 'rgba(128,128,128,0.3)'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
    ctx.fillText(y, W - pad.right + 4, yp + 3);
  }
  // X labels
  const step = Math.max(1, Math.floor(n / 8));
  ctx.fillStyle = 'rgba(128,128,128,0.3)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  for (let i = 0; i < n; i += step) ctx.fillText(i + 1, xS(i), H - pad.bottom + 14);

  // Raw WPM dashed
  const rawPts = wpmData.map((d, i) => ({ x: xS(i), y: yS(d.rawWpm) }));
  ctx.beginPath(); ctx.strokeStyle = 'rgba(128,128,128,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
  rawPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); ctx.stroke(); ctx.setLineDash([]);

  // Smooth WPM
  const sm = wpmData.map((d, i, a) => { const w = 3; const sl = a.slice(Math.max(0, i - w), i + w + 1); return sl.reduce((s, v) => s + v.wpm, 0) / sl.length; });
  const pts = sm.map((v, i) => ({ x: xS(i), y: yS(v) }));
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
  grad.addColorStop(0, 'rgba(249,168,37,0.2)'); grad.addColorStop(1, 'rgba(249,168,37,0)');
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my); }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.lineTo(pts[pts.length - 1].x, pad.top + ch); ctx.lineTo(pts[0].x, pad.top + ch); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath(); ctx.strokeStyle = accentColor; ctx.lineWidth = 2.5;
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my); }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y); ctx.stroke();
  ctx.fillStyle = accentColor;
  pts.forEach((p, i) => { if (i % Math.max(1, Math.floor(n / 20)) === 0) { ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill(); } });

  // Error markers
  errorSeconds.forEach(t => {
    if (t >= n) return;
    const x = xS(t), ey = yS(sm[t] || 0); const s = 5;
    ctx.strokeStyle = '#ef5350'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x - s, ey - s); ctx.lineTo(x + s, ey + s); ctx.moveTo(x + s, ey - s); ctx.lineTo(x - s, ey + s); ctx.stroke();
  });
}

function renderRecords() {
  const el = document.getElementById('rec-wrap');
  if (!records.length) { el.innerHTML = '<div style="font-family:var(--mono);font-size:12px;color:var(--text3);padding:1.5rem;text-align:center;letter-spacing:2px">No records yet — play a game!</div>'; return; }
  const top = [...records].sort((a, b) => b.w - a.w).slice(0, 5);
  const recent = records.slice(0, 3);
  function row(r, i, isTop) {
    const hs = isTop && i === 0;
    return `<div style="display:flex;align-items:center;padding:11px 12px;border-radius:8px;gap:8px;margin-bottom:4px;background:var(--bg2);border:1.5px solid ${hs ? 'var(--accent)' : 'var(--border)'};position:relative;overflow:hidden">
      ${hs ? '<div style="position:absolute;inset:0;background:rgba(249,168,37,0.025)"></div>' : ''}
      <div style="font-family:var(--mono);font-size:11px;color:${hs ? 'var(--accent)' : 'var(--text3)'};width:18px;text-align:center;font-weight:700">${i + 1}</div>
      <div style="font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:10px;border:1px solid;color:${r.d === 'easy' ? '#4caf50' : r.d === 'normal' ? '#42a5f5' : r.d === 'hard' ? '#ffa726' : '#ef5350'};border-color:${r.d === 'easy' ? '#4caf5033' : r.d === 'normal' ? '#42a5f533' : r.d === 'hard' ? '#ffa72633' : '#ef535033'}">${r.d}</div>
      ${hs ? '<div style="font-family:var(--mono);font-size:9px;padding:2px 8px;border-radius:10px;background:rgba(249,168,37,0.1);border:1px solid rgba(249,168,37,0.3);color:var(--accent);letter-spacing:2px">BEST</div>' : ''}
      <div style="flex:1"></div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--text3);width:32px;text-align:right">${fT(r.dur)}</div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--text2);width:36px;text-align:right">${r.a}%</div>
      <div style="font-family:var(--mono);font-size:18px;font-weight:700;color:var(--text)">${r.w}<span style="font-size:10px;color:var(--text2);font-weight:400"> wpm</span></div>
      <div style="font-family:var(--mono);font-size:9px;color:var(--text3);width:64px;text-align:right">${r.dt}</div>
    </div>`;
  }
  el.innerHTML = `
    <div style="font-size:9px;color:var(--text3);letter-spacing:5px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid var(--border);margin-bottom:8px;font-family:var(--mono)">★ TOP 5 SCORES</div>
    ${top.map((r, i) => row(r, i, true)).join('')}
    <div style="height:1rem"></div>
    <div style="font-size:9px;color:var(--text3);letter-spacing:5px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid var(--border);margin-bottom:8px;font-family:var(--mono)">⟳ RECENT 3 GAMES</div>
    ${recent.map((r, i) => row(r, i, false)).join('')}
    <div style="display:flex;justify-content:center;margin-top:1rem">
      <button onclick="clearRecords()" style="font-family:var(--mono);font-size:11px;letter-spacing:2px;padding:8px 20px;border-radius:8px;border:1.5px solid #3a2020;color:#aa6666;background:#130f0f;cursor:pointer">CLEAR ALL</button>
    </div>`;
}
function clearRecords() {
  if (!confirm('Clear all records?')) return;
  records = []; try { localStorage.removeItem('tt_v7'); } catch (e) { } renderRecords();
}

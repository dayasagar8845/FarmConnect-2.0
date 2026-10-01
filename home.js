/* FarmConnect NEW Home page. Own design, scoped to .home-page / body.on-home.
   Loaded BEFORE app.js; app.js calls homePage() and homeInit(). Text format: 'English|Telugu|Hindi' (other languages fall back to English). */
// Statistics are LIVE: counted from the same data the Admin Dashboard uses (db in app.js). No hard-coded numbers.
const homeStats = () => ({ farmers: db.farmers.length, labourers: db.labourers.length, approvals: db.acceptances.length, mentors: db.mentors.length });
const LANG_NAMES = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil', kn: 'Kannada', ml: 'Malayalam', mr: 'Marathi', bn: 'Bengali', gu: 'Gujarati', pa: 'Punjabi', or: 'Odia', as: 'Assamese' };
const LANG_NATIVE = { en: 'English', te: 'తెలుగు', hi: 'हिन्दी', ta: 'தமிழ்', kn: 'ಕನ್ನಡ', ml: 'മലയാളം', mr: 'मराठी', bn: 'বাংলা', gu: 'ગુજરાતી', pa: 'ਪੰਜਾਬੀ', or: 'ଓଡ଼ିଆ', as: 'অসমীয়া' };
const ABOUT_EN = 'FarmConnect is a digital platform designed to connect farmers who need agricultural labour with labourers who are looking for agricultural employment. The platform helps users discover suitable opportunities using location, crop, work requirements, availability and wage preferences.';
const HT = {
  hero: 'Connecting Farmers to Labourers|రైతులను కూలీలతో కలుపుతున్నాం|किसानों को मजदूरों से जोड़ना',
  sub: 'Connecting farmers who need agricultural workers with labourers looking for reliable agricultural work.|వ్యవసాయ కూలీలు అవసరమైన రైతులను, నమ్మకమైన వ్యవసాయ పని కోసం చూస్తున్న కూలీలతో కలుపుతుంది.|खेतिहर मजदूर चाहने वाले किसानों को भरोसेमंद खेती का काम खोजने वाले मजदूरों से जोड़ता है।',
  quote: 'Connecting the hands that grow our food with the opportunities they need.|ఆహారం పండించే చేతులను వారికి కావలసిన అవకాశాలతో కలుపుతున్నాం.|अन्न उगाने वाले हाथों को उनके अवसरों से जोड़ना।',
  explore: 'Explore Website|వెబ్‌సైట్ చూడండి|वेबसाइट देखें', tag: 'Find • Connect • Work • Grow|వెతుకు • కలుపు • పని • ఎదుగు|खोजें • जुड़ें • काम करें • बढ़ें',
  howT: 'How FarmConnect Works|FarmConnect ఎలా పనిచేస్తుంది|FarmConnect कैसे काम करता है', why: 'Why FarmConnect|ఎందుకు FarmConnect|FarmConnect क्यों', whyT: 'Why Choose FarmConnect?|FarmConnect ఎందుకు ఎంచుకోవాలి?|FarmConnect क्यों चुनें?',
  stats: 'Statistics|గణాంకాలు|आंकड़े', statsT: 'Our Growing FarmConnect Community|మా పెరుగుతున్న FarmConnect సమాజం|हमारा बढ़ता FarmConnect समुदाय', langs: 'Languages|భాషలు|भाषाएँ', aboutT: 'About FarmConnect|FarmConnect గురించి|FarmConnect के बारे में',
  sF: 'Farmers|రైతులు|किसान', sL: 'Labourers|కూలీలు|मजदूर', sA: 'Approvals|ఆమోదాలు|स्वीकृतियाँ', sM: 'Mentors|మెంటార్లు|मेंटर|வழிகாட்டிகள்|ಮಾರ್ಗದರ್ಶಕರು|മെന്റർമാർ|मार्गदर्शक|মেন্টররা|માર્ગદર્શકો|ਮਾਰਗਦਰਸ਼ਕ|ମାର୍ଗଦର୍ଶକ|পথপ্ৰদৰ্শক',
  pT: 'Farming Feeds the World|వ్యవసాయం ప్రపంచానికి అన్నం పెడుతుంది|खेती दुनिया का पेट भरती है',
  pP: 'Farming is the foundation of our food system. Farmers and agricultural workers work together to produce the food we depend on every day.|వ్యవసాయం మన ఆహార వ్యవస్థకు పునాది. రైతులు, వ్యవసాయ కూలీలు కలిసి మనం రోజూ తినే ఆహారాన్ని పండిస్తారు.|खेती हमारी खाद्य व्यवस्था की नींव है। किसान और खेतिहर मजदूर मिलकर वह अन्न उगाते हैं जिस पर हम रोज़ निर्भर हैं।',
  pF: 'FarmConnect helps connect these two important communities.|FarmConnect ఈ రెండు ముఖ్యమైన వర్గాలను కలుపుతుంది.|FarmConnect इन दोनों महत्वपूर्ण समुदायों को जोड़ता है।',
  dev: 'Developer of this website|ఈ వెబ్‌సైట్ డెవలపర్|इस वेबसाइट के डेवलपर'
};
const HSTEPS = [['📝', 'Register|నమోదు|पंजीकरण'], ['🌱', 'Add Requirements / Skills|అవసరాలు / నైపుణ్యాలు చేర్చండి|ज़रूरतें / हुनर जोड़ें'], ['🤖', 'Smart Matching|స్మార్ట్ మ్యాచింగ్|स्मार्ट मैचिंग'], ['🤝', 'Connect|కలవండి|जुड़ें'], ['💼', 'Work|పని|काम']];
const HWHY = [['📍', 'Nearby Workers|దగ్గర కూలీలు|पास के मजदूर'], ['🌾', 'Crop-Based Matching|పంట ఆధారిత మ్యాచింగ్|फसल आधारित मैचिंग'], ['💰', 'Wage Transparency|కూలీ పారదర్శకత|मजदूरी में पारदर्शिता'], ['📱', 'Mobile Friendly|మొబైల్ అనుకూలం|मोबाइल के अनुकूल'], ['🌐', 'Multiple Languages|అనేక భాషలు|कई भाषाएँ'], ['🧑‍🏫', 'Mentor Support|మెంటార్ సహాయం|मेंटर सहायता|வழிகாட்டி ஆதரவு|ಮಾರ್ಗದರ್ಶಕ ಬೆಂಬಲ|മെന്റർ പിന്തുണ|मार्गदर्शक सहाय्य|মেন্টর সহায়তা|માર્ગદર્શક સહાય|ਮਾਰਗਦਰਸ਼ਕ ਸਹਾਇਤਾ|ମାର୍ଗଦର୍ଶକ ସହାୟତା|পথপ্ৰদৰ্শক সহায়তা']];
const hp = s => { const p = s.split('|'); return p[LANGS.indexOf(lang)] || p[0]; };
const hx = k => hp(HT[k]);

function homePage() {
  const poster = !sessionStorage.fc_poster;
  const dots = Array.from({ length: 14 }, (_, i) => `<span class="home-dot" style="--x:${(i * 37) % 100}%;--y:${20 + (i * 53) % 70}%;--t:${4 + i % 5}s;--w:${(i * 0.3).toFixed(1)}s"></span>`).join('');
  const langBtns = Object.keys(LANG_NAMES).map(k => `<button data-hl="${k}" class="${k === lang ? 'on' : ''}">${LANG_NATIVE[k]}</button>`).join('');
  const live = homeStats(), lab = k => (T2[lang] && { sF: T2[lang].farmer, sL: T2[lang].labourer }[k]) || hx(k);
  const stat = [['👨‍🌾', 'sF', 'farmers'], ['👷', 'sL', 'labourers'], ['✅', 'sA', 'approvals'], ['🧑‍🏫', 'sM', 'mentors']];
  return `<div class="home-page" id="home-top">
<header class="home-navbar"><button class="home-logo" data-hs="home-top">🌾 FarmConnect</button><button class="home-btn" data-go="login">${hx('explore')}</button><button class="home-burger" data-hm="menu" aria-label="Menu" aria-expanded="false">☰</button></header>
<div class="home-menu" hidden><div class="home-menu-bg" data-hm="menu"></div><nav class="home-menu-panel" aria-label="Home menu">
<button data-hs="home-top">${t('home')}</button><button data-hs="home-how">${t('how')}</button><button data-hs="home-why">${hx('why')}</button><button data-hs="home-stats">${hx('stats')}</button><button data-hs="home-about">${t('about')}</button>
<button data-hm="langs">${hx('langs')} ▾</button><div class="home-langs" hidden>${langBtns}</div>
<button data-go="login" class="strong">${hx('explore')}</button><button data-go="login">${t('login')}</button></nav></div>
<section class="home-hero"><div class="home-visual" aria-hidden="true">
<div class="home-sun home-layer" style="--d:10"></div><div class="home-hill"></div><div class="home-field"></div>
<span class="home-crop home-layer" style="--d:-8;left:4%">🌾🌾🌾</span><span class="home-crop home-layer" style="--d:-8;right:4%">🌾🌾🌾</span>
<span class="home-person home-layer" style="--d:-14;left:9%">👨‍🌾</span><span class="home-person home-layer" style="--d:-12;right:9%">👷</span><span class="home-person home-layer" style="--d:-10;right:27%">👩‍🌾</span>
<div class="home-chip home-layer" style="--d:24;left:1%;top:15%">🤖 AI Match <b>98%</b></div><div class="home-chip home-layer" style="--d:20;right:1%;top:26%">📍 2 km</div><div class="home-chip home-layer" style="--d:18;left:3%;top:56%">💰 ₹500/day</div>
<div class="home-phone-wrap home-layer" style="--d:16"><div class="home-phone"><div class="home-screen"><div class="hs-top">🌾 FarmConnect</div><div class="hs-hero">${hx('hero')}</div>
<div class="hs-cards"><i>👨‍🌾<small>${t('farmer')}</small></i><i>👷<small>${t('labourer')}</small></i></div>
<div class="hs-feed"><p>🌾 ${lb(CROPS, 'rice')} · ₹500</p><p>🌶️ ${lb(CROPS, 'chilli')} · ₹450</p><p>✅ 2 ${t('km')}</p></div></div></div></div>${dots}</div>
<div class="home-copy"><h1>${hx('hero')}</h1><p class="home-sub">${hx('sub')}</p><blockquote>“${hx('quote')}”</blockquote>
<button class="home-btn lg" data-go="login">${hx('explore')} →</button><p class="home-tag">${hx('tag')}</p></div></section>
<section class="home-how-it-works" id="home-how"><h2>${hx('howT')}</h2><div class="home-steps">${HSTEPS.map(([i, s], n) => `<div class="home-step" tabindex="0"><em>${n + 1}</em><span>${i}</span><h3>${hp(s)}</h3></div>`).join('')}</div></section>
<section class="home-why" id="home-why"><h2>${hx('whyT')}</h2><div class="home-why-grid">${HWHY.map(([i, s]) => `<div class="home-why-card" tabindex="0"><span>${i}</span><h3>${hp(s)}</h3></div>`).join('')}</div></section>
<section class="home-statistics" id="home-stats"><h2>${hx('statsT')}</h2><div class="home-stat-grid">${stat.map(([i, k, d]) => `<div class="home-stat"><span>${i}</span><div><b class="home-count" data-to="${live[d]}">0</b></div><p>${lab(k)}</p></div>`).join('')}</div></section>
<section class="home-about" id="home-about"><h2>${hx('aboutT')}</h2><p>${['te', 'hi'].includes(lang) ? t('aboutT') : ABOUT_EN}</p>
<div class="home-dev"><div class="home-avatar">AD</div><div><b>ANNANGI DAYASAGAR</b><p>${hx('dev')}</p></div></div></section>
<footer class="home-footer"><div class="home-foot-grid"><div><h4>🌾 FarmConnect</h4><p>${hx('hero')}</p></div>
<div><h4>Quick Links</h4><button data-hs="home-top">${t('home')}</button><button data-hs="home-how">${t('how')}</button><button data-hs="home-why">${hx('why')}</button><button data-hs="home-stats">${hx('stats')}</button><button data-hs="home-about">${t('about')}</button><button data-go="login">${t('login')}</button></div>
<div><h4>Services</h4><button data-go="auth" data-a="farmer:login">${t('farmer')}</button><button data-go="auth" data-a="labourer:login">${t('labourer')}</button><button data-go="auth" data-a="mentor:login">${t('mentor')}</button></div>
<div><h4>${hx('langs')}</h4><div class="home-foot-langs">${Object.keys(LANG_NAMES).map(k => `<button data-hl="${k}">${LANG_NAMES[k]}</button>`).join('')}</div></div></div>
<p class="home-copy-r">© 2026 FarmConnect. All Rights Reserved.</p></footer>
${poster ? `<div class="home-poster" role="dialog" aria-modal="true" aria-labelledby="hp-t"><div class="home-poster-card"><button class="home-x" data-hx aria-label="Close">✕</button>
<div class="home-poster-art"><span>👨‍🌾</span><span>🌾</span><span>🌄</span><span>👷</span></div><h2 id="hp-t">${hx('pT')}</h2><p>${hx('pP')}</p><p><b>${hx('pF')}</b></p><div class="home-bar"><i></i></div></div></div>` : ''}
</div>`;
}

function homeInit() {
  const root = document.querySelector('.home-page'); if (!root) return;
  const vis = root.querySelector('.home-visual');
  if (vis && matchMedia('(hover:hover)').matches) {
    vis.addEventListener('mousemove', e => { const r = vis.getBoundingClientRect(); vis.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3)); vis.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3)); });
    vis.addEventListener('mouseleave', () => { vis.style.setProperty('--mx', 0); vis.style.setProperty('--my', 0); });
  }
  const counts = root.querySelectorAll('.home-count'), run = el => {
    const to = +el.dataset.to, t0 = performance.now();
    const tick = n => { const p = Math.min(1, (n - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN'); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }), { threshold: .4 }); counts.forEach(c => io.observe(c)); }
  else counts.forEach(c => c.textContent = (+c.dataset.to).toLocaleString('en-IN'));
  clearTimeout(window._homePoster);
  if (root.querySelector('.home-poster')) { sessionStorage.fc_poster = '1'; window._homePoster = setTimeout(homeClosePoster, 15000); }
}
function homeClosePoster() {
  clearTimeout(window._homePoster); const p = document.querySelector('.home-poster'); if (!p) return;
  p.classList.add('out'); setTimeout(() => p.remove(), 350);
}
function homeMenu(open) {
  const m = document.querySelector('.home-menu'), b = document.querySelector('.home-burger'); if (!m) return;
  m.hidden = !open; b.setAttribute('aria-expanded', open); b.textContent = open ? '✕' : '☰';
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-hs],[data-hl],[data-hm],[data-hx]'); if (!b || !b.closest('.home-page')) return;
  if (b.hasAttribute('data-hx')) return homeClosePoster();
  if (b.dataset.hm === 'menu') return homeMenu(document.querySelector('.home-menu').hidden);
  if (b.dataset.hm === 'langs') { const l = document.querySelector('.home-langs'); l.hidden = !l.hidden; return; }
  if (b.dataset.hl) { lang = b.dataset.hl; localStorage.fc_lang = lang; return render(); }
  if (b.dataset.hs) { homeMenu(false); document.getElementById(b.dataset.hs)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { homeMenu(false); homeClosePoster(); } });

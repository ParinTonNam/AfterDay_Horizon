const signal = document.querySelector('.hero-signal');
const signalWord = signal.querySelector('.signal-word');
const signalIndex = signal.querySelector('.signal-index');
const signalPhrases = [
  { th: 'แบ่งข้อมูล', en: 'Share clues' },
  { th: 'แก้ระบบ', en: 'Restore systems' },
  { th: 'รอดไปด้วยกัน', en: 'Survive together' }
];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Tuning: this interval sets the repeat rate for every visible glitch effect.
const GLITCH_INTERVAL_MS = 5000;
const HERO_FIRST_BURST_DELAY_MS = 1500;
const HERO_BURST_LENGTH_MS = 1200;
const SECTION_BURST_LENGTH_MS = 680;
const hero = document.querySelector('.hero');
const heroCopy = hero.querySelector('.hero-copy');
const heroTitleAccent = hero.querySelector('#hero-title em');
const glitchKeywords = [...document.querySelectorAll('.glitch-keyword')];
function syncGlitchKeywords() {
  glitchKeywords.forEach(keyword => { keyword.dataset.text = keyword.textContent.trim(); });
}
syncGlitchKeywords();
let heroVisible = true;
let heroInterval;
let heroStartTimer;
let heroEndTimer;
let lastHeroBurst = 0;
function stopHeroGlitch() {
  clearInterval(heroInterval);
  clearTimeout(heroStartTimer);
  clearTimeout(heroEndTimer);
  heroCopy.classList.remove('is-glitching');
  heroTitleAccent.classList.remove('is-glitching');
}
function playHeroGlitch() {
  if (reducedMotion.matches || document.hidden || !heroVisible) return;
  if (Date.now() - lastHeroBurst < HERO_BURST_LENGTH_MS) return;
  lastHeroBurst = Date.now();
  heroCopy.classList.remove('is-glitching');
  heroTitleAccent.classList.remove('is-glitching');
  void heroTitleAccent.offsetWidth;
  heroCopy.classList.add('is-glitching');
  heroTitleAccent.classList.add('is-glitching');
  clearTimeout(heroEndTimer);
  heroEndTimer = setTimeout(() => {
    heroCopy.classList.remove('is-glitching');
    heroTitleAccent.classList.remove('is-glitching');
  }, HERO_BURST_LENGTH_MS);
}
heroCopy.addEventListener('pointerenter', () => playHeroGlitch());
heroTitleAccent.addEventListener('pointerdown', () => playHeroGlitch());
function updateHeroActivity() {
  stopHeroGlitch();
  if (!reducedMotion.matches && !document.hidden && heroVisible) {
    heroStartTimer = setTimeout(() => {
      playHeroGlitch();
      heroInterval = setInterval(playHeroGlitch, GLITCH_INTERVAL_MS);
    }, HERO_FIRST_BURST_DELAY_MS);
  }
}
let activeSignal = 0;
let signalVisible = true;
let signalInterval;
let signalSwap;
let signalEnd;
function renderSignal() {
  const language = window.getSiteLanguage?.() === 'en' ? 'en' : 'th';
  const phrase = signalPhrases[activeSignal][language];
  signalWord.textContent = phrase;
  signalWord.dataset.text = phrase;
  signalIndex.textContent = String(activeSignal + 1).padStart(2, '0');
}
function stopSignal() {
  clearInterval(signalInterval);
  clearTimeout(signalSwap);
  clearTimeout(signalEnd);
  signalInterval = undefined;
  signalWord.classList.remove('is-glitching');
}
function cycleSignal() {
  signalWord.classList.remove('is-glitching');
  void signalWord.offsetWidth;
  signalWord.classList.add('is-glitching');
  signalSwap = setTimeout(() => {
    activeSignal = (activeSignal + 1) % signalPhrases.length;
    renderSignal();
  }, 180);
  signalEnd = setTimeout(() => signalWord.classList.remove('is-glitching'), 520);
}
function updateSignalActivity() {
  stopSignal();
  if (!reducedMotion.matches && !document.hidden && signalVisible) {
    signalInterval = setInterval(cycleSignal, GLITCH_INTERVAL_MS);
  }
}
const visibleKeywords = new Set();
const sectionEndTimers = new WeakMap();
const sectionIntervals = new Map();
function playSectionGlitch(keyword) {
  if (reducedMotion.matches || document.hidden || !visibleKeywords.has(keyword)) return;
  const section = keyword.closest('.section');
  clearTimeout(sectionEndTimers.get(section));
  section.classList.remove('is-glitching');
  void section.offsetWidth;
  section.classList.add('is-glitching');
  sectionEndTimers.set(section, setTimeout(() => section.classList.remove('is-glitching'), SECTION_BURST_LENGTH_MS));
}
function updateSectionActivity() {
  sectionIntervals.forEach(interval => clearInterval(interval));
  sectionIntervals.clear();
  document.querySelectorAll('.section.is-glitching').forEach(section => {
    clearTimeout(sectionEndTimers.get(section));
    section.classList.remove('is-glitching');
  });
  if (!reducedMotion.matches && !document.hidden) {
    visibleKeywords.forEach(keyword => {
      playSectionGlitch(keyword);
      sectionIntervals.set(keyword, setInterval(() => playSectionGlitch(keyword), GLITCH_INTERVAL_MS));
    });
  }
}
renderSignal();
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    signalVisible = entries[0].isIntersecting;
    updateSignalActivity();
  }, { threshold: 0.15 }).observe(signal);
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    updateHeroActivity();
  }, { threshold: 0.18 }).observe(hero);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!visibleKeywords.has(entry.target)) {
          visibleKeywords.add(entry.target);
          if (!reducedMotion.matches && !document.hidden) {
            playSectionGlitch(entry.target);
            sectionIntervals.set(entry.target, setInterval(() => playSectionGlitch(entry.target), GLITCH_INTERVAL_MS));
          }
        }
      } else {
        visibleKeywords.delete(entry.target);
        clearInterval(sectionIntervals.get(entry.target));
        sectionIntervals.delete(entry.target);
      }
    });
  }, { threshold: 0.25 });
  glitchKeywords.forEach(keyword => sectionObserver.observe(keyword));
} else {
  updateSignalActivity();
  updateHeroActivity();
  glitchKeywords.forEach(keyword => visibleKeywords.add(keyword));
}
updateSectionActivity();
document.addEventListener('visibilitychange', () => {
  updateSignalActivity();
  updateHeroActivity();
  updateSectionActivity();
});
reducedMotion.addEventListener('change', () => {
  updateSignalActivity();
  updateHeroActivity();
  updateSectionActivity();
});
window.addEventListener('afterday:language-change', () => {
  stopSignal();
  renderSignal();
  updateSignalActivity();
  heroTitleAccent.dataset.text = heroTitleAccent.textContent.trim();
  syncGlitchKeywords();
});

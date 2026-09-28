const gameTransition = document.getElementById('game-transition');
const gameTransitionTitle = gameTransition.querySelector('.game-transition-title');
const gameTransitionMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const GAME_TRANSITION_MS = 1600;
let gameTransitionTimer;
let gameTransitioning = false;

function resetGameTransition() {
  clearTimeout(gameTransitionTimer);
  gameTransitioning = false;
  gameTransition.classList.remove('is-active');
  gameTransition.hidden = true;
  gameTransition.setAttribute('aria-hidden', 'true');
}

function syncGameTransitionLanguage() {
  gameTransitionTitle.dataset.text = gameTransitionTitle.textContent.trim();
}

document.querySelectorAll('.game-entry-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target && link.target !== '_self' || gameTransitionMotion.matches) return;
    event.preventDefault();
    if (gameTransitioning) return;
    gameTransitioning = true;
    gameTransition.hidden = false;
    gameTransition.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => gameTransition.classList.add('is-active'));
    gameTransitionTimer = setTimeout(() => {
      try { sessionStorage.setItem('afterday:hack-shown', String(Date.now())); } catch (_) {}
      location.assign(link.href);
    }, GAME_TRANSITION_MS);
  });
});

window.addEventListener('pageshow', resetGameTransition);
window.addEventListener('pagehide', resetGameTransition);
window.addEventListener('afterday:language-change', syncGameTransitionLanguage);
syncGameTransitionLanguage();

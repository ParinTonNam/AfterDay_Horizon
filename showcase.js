const showcase = document.getElementById('showcase');
const showcaseMenuButton = showcase.querySelector('.mobile-nav-toggle');
const showcaseLinks = showcase.querySelector('.showcase-links');

function closeShowcaseMenu() {
    showcaseLinks.classList.remove('is-open');
    showcaseMenuButton.setAttribute('aria-expanded', 'false');
}

showcaseMenuButton.addEventListener('click', () => {
    const isOpen = showcaseLinks.classList.toggle('is-open');
    showcaseMenuButton.setAttribute('aria-expanded', String(isOpen));
});

showcaseLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeShowcaseMenu);
});

showcase.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeShowcaseMenu();
});

function enterWebsiteGame() {
    closeShowcaseMenu();
    showcase.hidden = true;
    document.body.classList.remove('showcase-mode');
    document.getElementById('menu-page').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showShowcase() {
    document.getElementById('menu-page').classList.add('hidden');
    showcase.hidden = false;
    document.body.classList.add('showcase-mode');
    window.scrollTo(0, 0);
}

function startShowcaseDemo() {
    if (!window.afterdayDataReady || !gameData || !gameData['25']) return;
    seed = '25';
    enterWebsiteGame();
    startGame();
}

showcase.querySelectorAll('[data-action="enter-game"]').forEach(button => {
    button.addEventListener('click', enterWebsiteGame);
});

const showcaseDemoButtons = showcase.querySelectorAll('[data-action="demo"]');
showcaseDemoButtons.forEach(button => button.addEventListener('click', startShowcaseDemo));
function enableShowcaseDemo() {
    showcaseDemoButtons.forEach(button => button.disabled = false);
}
if (window.afterdayDataReady) enableShowcaseDemo();
window.addEventListener('afterday:data-ready', () => {
    enableShowcaseDemo();
});
window.addEventListener('afterday:data-error', () => {
    showcase.querySelector('.hero-help').textContent = 'โหลดข้อมูลเกมไม่สำเร็จ กรุณารีเฟรชหน้าเว็บและลองอีกครั้ง';
});

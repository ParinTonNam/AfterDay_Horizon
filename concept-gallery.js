const conceptGallery = document.querySelector('.concept-gallery');

if (conceptGallery) {
  const items = [...conceptGallery.querySelectorAll('.concept-gallery-item')];
  const count = conceptGallery.querySelector('.concept-gallery-count');
  const previous = conceptGallery.querySelector('.concept-gallery-prev');
  const next = conceptGallery.querySelector('.concept-gallery-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let page = 0;
  let inView = false;
  let keyboardFocus = false;
  let timer;

  const visibleCount = () => window.innerWidth <= 560 ? 1 : window.innerWidth <= 850 ? 2 : 3;
  const pageCount = () => Math.ceil(items.length / visibleCount());

  function showPage(nextPage) {
    page = (nextPage + pageCount()) % pageCount();
    const start = Math.min(page * visibleCount(), Math.max(0, items.length - visibleCount()));
    const end = Math.min(start + visibleCount(), items.length);
    items.forEach((item, index) => { item.hidden = index < start || index >= end; });
    count.textContent = `${String(start + 1).padStart(2, '0')}–${String(end).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    items.slice(start, end).forEach(item => { item.querySelector('img').loading = 'eager'; });
  }

  function schedule() {
    clearTimeout(timer);
    if (!inView || document.hidden || reducedMotion.matches || conceptGallery.matches(':hover') || (keyboardFocus && conceptGallery.contains(document.activeElement)) || document.querySelector('.media-dialog')?.open) return;
    timer = setTimeout(() => {
      showPage(page + 1);
      schedule();
    }, 5000);
  }

  function navigate(direction) {
    showPage(page + direction);
    schedule();
  }

  previous.addEventListener('click', () => navigate(-1));
  next.addEventListener('click', () => navigate(1));
  conceptGallery.addEventListener('mouseenter', schedule);
  conceptGallery.addEventListener('mouseleave', schedule);
  conceptGallery.addEventListener('keydown', () => { keyboardFocus = true; schedule(); });
  conceptGallery.addEventListener('pointerdown', () => { keyboardFocus = false; schedule(); });
  conceptGallery.addEventListener('focusin', schedule);
  conceptGallery.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (!conceptGallery.contains(document.activeElement)) keyboardFocus = false;
    schedule();
  }));
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('resize', () => {
    showPage(Math.min(page, pageCount() - 1));
    schedule();
  });
  document.querySelector('.media-dialog')?.addEventListener('close', schedule);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, { threshold: 0.2 }).observe(conceptGallery);
  } else {
    inView = true;
  }
  showPage(0);
  schedule();
}

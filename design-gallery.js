const designGallery = document.querySelector('.design-gallery');

if (designGallery) {
  const slides = [...designGallery.querySelectorAll('[data-design-slide]')];
  const previous = designGallery.querySelector('#design-gallery-prev');
  const next = designGallery.querySelector('#design-gallery-next');
  const count = designGallery.querySelector('#design-gallery-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 6000;
  let index = 0;
  let inView = false;
  let hoveringImage = false;
  let timer;

  function showDesignSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== index; });
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    // Load the next pair before it becomes visible, keeping automatic changes smooth.
    for (const slide of [slides[index], slides[(index + 1) % slides.length]]) {
      slide.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    }
  }

  function schedule() {
    clearTimeout(timer);
    if (reducedMotion.matches || !inView || hoveringImage || document.hidden || slides.length < 2) return;
    timer = setTimeout(() => {
      showDesignSlide(index + 1);
      schedule();
    }, interval);
  }

  function navigate(direction) {
    showDesignSlide(index + direction);
    schedule();
  }

  previous.addEventListener('click', () => navigate(-1));
  next.addEventListener('click', () => navigate(1));
  designGallery.querySelectorAll('.design-gallery-pair').forEach(pair => {
    pair.addEventListener('mouseenter', () => { hoveringImage = true; schedule(); });
    pair.addEventListener('mouseleave', () => { hoveringImage = false; schedule(); });
  });

  let touchStart;
  designGallery.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  designGallery.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) navigate(dx < 0 ? 1 : -1);
    touchStart = undefined;
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, { threshold: 0.2 }).observe(designGallery);
  } else {
    inView = true;
  }
  document.addEventListener('visibilitychange', schedule);
  showDesignSlide(0);
  schedule();
}

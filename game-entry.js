if (document.documentElement.classList.contains('demo-loading')) {
  const loader = document.getElementById('game-loading');
  const replaying = new URLSearchParams(location.search).get('replay') === '1';
  const showError = () => {
    document.getElementById('game-loading-title').textContent = 'โหลดเกมไม่สำเร็จ';
    document.getElementById('game-loading-detail').textContent = 'ตรวจสอบการเชื่อมต่อแล้วลองเข้าใหม่';
    document.getElementById('game-loading-back').hidden = false;
    loader.querySelector('.game-loading-track').hidden = true;
  };

  const launchDemo = async () => {
    if (!gameData?.['25']) return showError();
    try {
      seed = '25';
      startGame();
      if (document.getElementById('game-page').classList.contains('hidden') || (!replaying && document.getElementById('guided-tutorial').hidden)) {
        throw new Error('Demo screen did not initialize');
      }
      const fonts = document.fonts?.ready || Promise.resolve();
      const logo = document.querySelector('#game-page .logo');
      const image = logo?.decode ? logo.decode().catch(() => {}) : Promise.resolve();
      await Promise.race([Promise.all([fonts, image]), new Promise(resolve => setTimeout(resolve, 2500))]);
      await window.afterdayHackFinished;
      await new Promise(resolve => setTimeout(resolve, Math.max(0, 2000 - (performance.now() - window.afterdayDemoLoadStarted))));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      loader.hidden = true;
      document.documentElement.classList.remove('demo-loading');
      if (replaying) startGameTimer();
      else window.refreshGuidedTutorial?.();
    } catch (error) {
      console.error('Demo initialization failed:', error);
      showError();
    }
  };

  window.addEventListener('afterday:data-error', showError, { once: true });
  if (window.afterdayDataError) showError();
  else if (window.afterdayDataReady) launchDemo();
  else window.addEventListener('afterday:data-ready', launchDemo, { once: true });
}

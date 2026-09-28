// The old image carousel has been replaced with a guide attached to the real game controls.
const guidedRoot = document.getElementById('guided-tutorial');
const guidedSpotlight = document.getElementById('guided-spotlight');
const guidedCallout = document.getElementById('guided-callout');
const guidedEyebrow = document.getElementById('guided-eyebrow');
const guidedTitle = document.getElementById('guided-title');
const guidedDescription = document.getElementById('guided-description');
const guidedAction = document.getElementById('guided-action');
const guidedComplete = document.getElementById('guided-complete');
const guidedFinish = document.getElementById('guided-finish');
const guidedProgress = document.getElementById('guided-progress');

const guidedItems = [
  { id: 'readme', selector: '[data-guide="readme"]', title: 'เริ่มที่ ReadME', description: 'คุณคือผู้นำฝั่งเว็บไซต์ คอยอ่านคู่มือและบอกข้อมูลให้ผู้เล่นใน VR เปิดแฟ้มนี้เพื่อดูวิธีดูแลบังเกอร์', action: 'คลิกแฟ้ม ReadME บนหน้าจอจริง' },
  { id: 'manual', selector: '#folder_readme .folder_readme-body .icon_wrapper:first-child .icon', title: 'เปิดคู่มือจริง', description: 'ไฟล์ใน ReadME บอกวิธีซ่อมระบบต่าง ๆ ลองเปิดเอกสารไฟฟ้าฉบับแรกเพื่อดูว่าต้องสื่อสารอะไรกับคู่เล่น', action: 'คลิกไฟล์คู่มือในหน้าต่าง ReadME' },
  { id: 'folders', selector: '[data-guide="folders"]', title: 'แฟ้มข้อมูลและเบาะแส', description: 'Folder 1–4 เก็บโน้ตและชิ้นส่วน บางไฟล์ล็อกอยู่และต้องใช้กุญแจที่แสดงมุมซ้ายล่าง', action: 'ลองเปิดแฟ้มใดก็ได้' },
  { id: 'electrical', selector: '[data-guide="electrical"]', title: 'ระบบไฟฟ้า', description: 'เปิดแผงไฟฟ้าเมื่อเกิดปัญหา แล้วเทียบข้อมูลจากคู่มือกับสิ่งที่ผู้เล่น VR เห็นก่อนกดแก้ระบบ', action: 'คลิกไอคอน Electrical system' },
  { id: 'water', selector: '[data-guide="water"]', title: 'ระบบน้ำ', description: 'หน้าต่างนี้ใช้เลือกท่อและรหัสซ่อม ค้นเบาะแสใน ReadME แล้วบอกผู้เล่น VR ให้ต่อท่อให้ตรงกัน', action: 'คลิกไอคอน Water Supply System' },
  { id: 'key', selector: '[data-guide="key"]', title: 'ระบบกุญแจ', description: 'เล่นมินิเกมใน Key Unlock System เพื่อหากุญแจเพิ่ม แล้วนำไปปลดล็อกไฟล์ข้อมูลที่จำเป็น', action: 'คลิกไอคอน Key Unlock System' },
  { id: 'virus', selector: '[data-guide="virus"]', title: 'ตัวตรวจไวรัส', description: 'ติดตามเปอร์เซ็นต์ไวรัสและลำดับสัญลักษณ์ที่ต้องรีเซ็ต ความผิดพลาดจะทำให้ไวรัสเพิ่มขึ้น', action: 'คลิกไอคอน Virus Detector' }
];
const guidedById = new Map(guidedItems.map(item => [item.id, item]));
const guidedState = { active: false, visited: new Set(), target: null, onFinish: null, positionTimer: null, awaitingFinalClose: false };

function guidedCurrentItem() {
  return guidedItems.find(item => !guidedState.visited.has(item.id));
}

function guidedSyncLockedControls() {
  const current = guidedCurrentItem();
  guidedRoot.dataset.step = current?.id || '';
  document.querySelectorAll('#game-page .group_file img.icon, #game-page .window-body img.icon').forEach(icon => {
    const allowed = !!current && (icon.matches(current.selector) ||
      (current.id === 'manual' && icon.matches('[data-guide="readme"]')));
    icon.closest('.icon_wrapper')?.classList.toggle('is-guide-locked', !allowed);
    icon.tabIndex = allowed ? 0 : -1;
    icon.setAttribute('aria-disabled', String(!allowed));
  });
}

function guidedVisible(element) {
  if (!element || !element.isConnected) return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && getComputedStyle(element).visibility !== 'hidden';
}

function guidedOpenWindow() {
  return [...document.querySelectorAll('#game-page .window')]
    .filter(win => getComputedStyle(win).display !== 'none')
    .sort((a, b) => (Number(a.style.zIndex) || 0) - (Number(b.style.zIndex) || 0))
    .at(-1);
}

function guidedPosition() {
  const target = guidedState.target;
  if (!guidedState.active || !guidedVisible(target)) return;
  const rect = target.getBoundingClientRect();
  const pad = 7;
  guidedSpotlight.style.left = `${Math.max(2, rect.left - pad)}px`;
  guidedSpotlight.style.top = `${Math.max(2, rect.top - pad)}px`;
  guidedSpotlight.style.width = `${rect.width + pad * 2}px`;
  guidedSpotlight.style.height = `${rect.height + pad * 2}px`;

  const cardWidth = guidedCallout.offsetWidth;
  const cardHeight = guidedCallout.offsetHeight;
  const gap = 24;
  let left, top, side;
  if (innerWidth - rect.right >= cardWidth + gap + 14) {
    side = 'right';
    left = rect.right + gap;
    top = rect.top - 16;
  } else if (rect.left >= cardWidth + gap + 14) {
    side = 'left';
    left = rect.left - cardWidth - gap;
    top = rect.top - 16;
  } else if (innerHeight - rect.bottom >= cardHeight + gap + 14) {
    side = 'below';
    left = rect.left;
    top = rect.bottom + gap;
  } else {
    side = 'above';
    left = rect.left;
    top = rect.top - cardHeight - gap;
  }
  guidedCallout.dataset.side = side;
  guidedCallout.style.left = `${Math.max(12, Math.min(left, innerWidth - cardWidth - 12))}px`;
  guidedCallout.style.top = `${Math.max(100, Math.min(top, innerHeight - cardHeight - 12))}px`;
}

function guidedShow(target, title, description, action, label = 'OPERATOR TRAINING') {
  if (!guidedState.active || !guidedVisible(target)) return false;
  guidedState.target = target;
  guidedEyebrow.textContent = label;
  guidedTitle.textContent = title;
  guidedDescription.textContent = description;
  guidedAction.textContent = action;
  guidedPosition();
  return true;
}

function guidedShowItem(item) {
  const control = document.querySelector(item.selector);
  return guidedShow(control?.closest('.icon_wrapper') || control, item.title, item.description, item.action, `FIELD GUIDE / ${String(guidedItems.indexOf(item) + 1).padStart(2, '0')}`);
}

function guidedShowNext() {
  const next = guidedCurrentItem();
  if (!next) return;
  guidedSyncLockedControls();
  if (next.id === 'manual' && !guidedVisible(document.querySelector(next.selector))) {
    guidedShow(document.querySelector('[data-guide="readme"]'), 'กลับไปที่ ReadME', 'คู่มือฉบับแรกอยู่ในแฟ้ม ReadME เปิดแฟ้มอีกครั้งเพื่อทดลองอ่านไฟล์จริง', 'คลิก ReadME แล้วเลือกไฟล์คู่มือ');
    return;
  }
  guidedShowItem(next);
}

window.refreshGuidedTutorial = () => {
  if (guidedState.active && !guidedState.target) guidedShowNext();
};

function guidedShowClose() {
  const close = guidedOpenWindow()?.querySelector('.window-header .close');
  if (!close) return false;
  return guidedShow(close, 'ปิดหน้าต่างนี้', 'สำรวจเนื้อหาในหน้าต่างได้ตามต้องการ แล้วปิดเพื่อกลับไปดูปุ่มอื่นบนเดสก์ท็อป', 'คลิก X เมื่อพร้อมสำรวจต่อ', 'WINDOW CONTROL');
}

function guidedUpdateProgress() {
  guidedProgress.innerHTML = guidedItems.map(item => `<span class="${guidedState.visited.has(item.id) ? 'is-complete' : ''}" title="${item.title}"></span>`).join('') + `<b>${guidedState.visited.size} / ${guidedItems.length}</b>`;
}

function guidedShowCompletion() {
  guidedState.awaitingFinalClose = false;
  closeAllWindows();
  guidedState.target = null;
  guidedRoot.classList.add('is-complete');
  guidedRoot.dataset.step = 'complete';
  guidedComplete.hidden = false;
  guidedFinish.focus();
}

function finishGuidedTutorial(resumeGame = true) {
  if (!guidedState.active) return;
  guidedState.active = false;
  guidedState.awaitingFinalClose = false;
  clearInterval(guidedState.positionTimer);
  guidedRoot.hidden = true;
  guidedRoot.classList.remove('is-paused');
  guidedRoot.classList.remove('is-complete');
  guidedComplete.hidden = true;
  document.body.classList.remove('guided-active');
  guidedRoot.dataset.step = '';
  document.querySelectorAll('#game-page .icon_wrapper.is-guide-locked').forEach(tile => tile.classList.remove('is-guide-locked'));
  document.querySelectorAll('#game-page img.icon').forEach(icon => {
    icon.tabIndex = 0;
    icon.removeAttribute('aria-disabled');
  });
  closeAllWindows();
  guidedState.target = null;
  const onFinish = guidedState.onFinish;
  guidedState.onFinish = null;
  if (resumeGame) onFinish?.();
}
window.finishGuidedTutorial = finishGuidedTutorial;
window.cancelGuidedTutorial = () => finishGuidedTutorial(false);

function guidedMakeIconsKeyboardAccessible() {
  document.querySelectorAll('#game-page img.icon, #game-page #close').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', img.parentElement?.querySelector('.desktop_text')?.textContent.trim() || (img.id === 'close' ? 'ปิดเกม' : 'เปิดไฟล์'));
  });
}

window.startGuidedTutorial = function (onFinish) {
  if (guidedState.active) return;
  if (innerWidth <= 760 || !document.querySelector('[data-guide="readme"]') || !document.querySelector(guidedById.get('manual').selector)) {
    onFinish?.();
    return;
  }
  guidedState.active = true;
  guidedState.visited.clear();
  guidedState.awaitingFinalClose = false;
  guidedRoot.classList.remove('is-complete');
  guidedComplete.hidden = true;
  guidedState.onFinish = onFinish;
  guidedRoot.hidden = false;
  document.body.classList.add('guided-active');
  guidedMakeIconsKeyboardAccessible();
  guidedUpdateProgress();
  guidedSyncLockedControls();
  guidedShowNext();
  guidedState.positionTimer = setInterval(guidedPosition, 180);
};

document.getElementById('guided-skip').addEventListener('click', () => finishGuidedTutorial());
guidedFinish.addEventListener('click', () => finishGuidedTutorial());
document.addEventListener('click', event => {
  if (!guidedState.active || !(event.target instanceof Element) || !event.target.closest('#game-page')) return;
  const target = event.target;
  if (target.closest('#close')) return;
  const open = guidedOpenWindow();
  if (open?.id === 'close_confirmation' && open.contains(target)) return;
  if (open?.contains(target) && target.closest('.window-header .close, .window-header .button')) return;
  if (open && !open.contains(target)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  const current = guidedCurrentItem();
  const tile = target.closest('.icon_wrapper');
  const matchesCurrent = !!current && (target.matches(current.selector) || !!tile?.querySelector(current.selector));
  const reopenReadme = current?.id === 'manual' && !!target.closest('[data-guide="readme"]');
  if (!matchesCurrent && !reopenReadme) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);
document.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('#game-page img.icon, #game-page #close')) {
    event.preventDefault();
    event.target.click();
  }
});

document.addEventListener('pointerover', event => {
  if (!guidedState.active || !(event.target instanceof Element)) return;
  const current = guidedCurrentItem();
  if (current && (event.target.matches(current.selector) || event.target.closest('.icon_wrapper')?.querySelector(current.selector))) guidedShowItem(current);
});

document.addEventListener('click', event => {
  if (!guidedState.active || !(event.target instanceof Element)) return;
  const itemId = event.target.closest('[data-guide]')?.dataset.guide;
  const item = guidedById.get(itemId) || (event.target.closest(guidedById.get('manual').selector) ? guidedById.get('manual') : null);
  if (item && item === guidedCurrentItem()) {
    guidedState.visited.add(item.id);
    guidedUpdateProgress();
    guidedSyncLockedControls();
    if (guidedState.visited.size === guidedItems.length) {
      guidedState.awaitingFinalClose = true;
      requestAnimationFrame(() => {
        if (guidedState.active && guidedState.awaitingFinalClose) guidedShowClose();
      });
    } else {
      requestAnimationFrame(() => {
        if (item.id === 'readme' && guidedShowItem(guidedById.get('manual'))) return;
        if (!guidedShowClose()) guidedShowNext();
      });
    }
  } else if (guidedState.awaitingFinalClose && event.target.closest('#virus .window-header .close')) {
    guidedShowCompletion();
  } else if (event.target.closest('.window-header .close, .window-header .button')) {
    requestAnimationFrame(() => {
      if (!guidedShowClose()) guidedShowNext();
    });
  }
});
window.addEventListener('resize', guidedPosition);

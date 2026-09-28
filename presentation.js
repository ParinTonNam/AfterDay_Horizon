const t = text => window.translateText ? window.translateText(text) : text;
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const steps = {
  1: { image: 'img_new/img_VR/img_vr_14.png', alt: 'ผู้เล่น VR กำลังจัดการท่อน้ำในบังเกอร์', caption: '01 / สำรวจพื้นที่ใน VR และเตรียมผู้ดูแลฝั่งเว็บไซต์' },
  2: { image: 'img_new/img_Website/img_web_11.png', alt: 'หน้าจอฝั่งเว็บไซต์ที่ใช้ร่วมกับผู้เล่น VR', caption: '02 / เปิดหน้าจอเว็บไซต์เพื่อเข้าร่วมรอบเดียวกัน' },
  3: { image: 'img_new/img_VR/img_vr_12.png', alt: 'ผู้เล่น VR กำลังดูระบบไฟฟ้าที่มีสัญญาณผิดปกติ', caption: '03 / บอกตำแหน่งปัญหาให้ผู้เล่นอีกฝั่งช่วยแก้' },
  4: { image: 'img_new/img_VR/img_vr_16.png', alt: 'พื้นที่บังเกอร์ในโลก VR ของเกม AfterDay Horizon', caption: '04 / แก้ระบบให้ทันเพื่อรักษาบังเกอร์' }
};
const stepButtons = [...document.querySelectorAll('.step-trigger')];
let activeStep = 1;
function selectStep(number) {
  activeStep = number;
  stepButtons.forEach(button => {
    const active = Number(button.dataset.step) === number;
    button.classList.toggle('is-active', active);
    if (active) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  const step = steps[number];
  const image = document.getElementById('step-preview');
  image.src = step.image;
  image.alt = t(step.alt);
  document.getElementById('step-caption').textContent = t(step.caption);
}
stepButtons.forEach(button => {
  const activate = () => selectStep(Number(button.dataset.step));
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') activate();
  });
  button.addEventListener('focus', activate);
  button.addEventListener('click', activate);
});

const systems = {
  power: {
    index: '01 / POWER', title: 'ไฟฟ้าขัดข้อง',
    text: 'ฝั่ง VR เห็นตำแหน่งสวิตช์ ส่วนฝั่งเว็บไซต์เห็นแผงควบคุม ทั้งคู่ต้องบอกตำแหน่งให้ตรงกัน',
    result: 'กดตำแหน่งตรงกันเพื่อคืนระบบไฟฟ้า',
    web: { image: 'img_new/img_Website/img_web_11.png', alt: 'แผงควบคุมระบบไฟฟ้าบนเว็บไซต์', caption: 'ผู้ดูแลดูแผงฟิวส์บนเว็บไซต์' },
    vr: { image: 'img_new/img_VR/img_vr_12.png', alt: 'สวิตช์ไฟฟ้าในโลก VR', caption: 'ผู้เล่น VR เห็นสวิตช์จริงในฉาก' }
  },
  water: {
    index: '02 / WATER', title: 'ต่อท่อให้ถูกทาง',
    text: 'ผู้ดูแลค้นตำแหน่งท่อและรหัสบนเว็บไซต์ แล้วบอกผู้เล่น VR ว่าต้องต่อท่อจุดไหน',
    result: 'ข้อมูลจากเว็บช่วยให้ต่อท่อและปลดล็อกจุดซ่อมได้',
    web: { image: 'img_new/img_Website/img_web_9.png', alt: 'คู่มือตำแหน่งท่อบนเว็บไซต์', caption: 'ผู้ดูแลเห็นตำแหน่งท่อในคู่มือ' },
    vr: { image: 'img_new/img_VR/img_vr_14.png', alt: 'ผู้เล่น VR กำลังต่อท่อน้ำ', caption: 'ผู้เล่น VR หมุนท่อในฉากจริง' }
  },
  virus: {
    index: '03 / VIRUS', title: 'ตรวจจับก่อนลุกลาม',
    text: 'เมื่อระบบแจ้งเหตุผิดปกติ ผู้เล่นเว็บไซต์ติดตามสถานะและช่วยส่งลำดับที่ต้องใช้รีเซ็ตให้คนใน VR',
    result: 'ส่งลำดับรีเซ็ตให้ทันก่อนความผิดปกติลุกลาม',
    web: { image: 'img_new/img_Website/img_web_17.png', alt: 'หน้าจอตรวจจับไวรัสบนเว็บไซต์', caption: 'ผู้ดูแลเห็นสถานะและลำดับรีเซ็ต' },
    vr: { image: 'img_new/img_VR/img_vr_16.png', alt: 'พื้นที่เอาชีวิตรอดของผู้เล่น VR', caption: 'ผู้เล่น VR รับมือเหตุในพื้นที่ของตัวเอง' }
  },
  coop: {
    index: 'CORE MECHANIC', title: 'ข้อมูลคนละส่วน',
    text: 'ผู้เล่นแต่ละฝั่งเห็นข้อมูลไม่เหมือนกัน การอธิบายสิ่งที่พบให้คู่เล่นเข้าใจจึงเป็นเครื่องมือสำคัญที่สุดในการเอาชีวิตรอด',
    result: 'รวมข้อมูลสองมุมมองเพื่อตัดสินใจร่วมกัน',
    web: { image: 'img_new/img_Website/img_web_11.png', alt: 'หน้าจอข้อมูลของผู้ดูแลบนเว็บไซต์', caption: 'เว็บไซต์แสดงข้อมูลและเครื่องมือควบคุม' },
    vr: { image: 'img_new/img_VR/img_vr_16.png', alt: 'มุมมองพื้นที่เอาชีวิตรอดในโลก VR', caption: 'VR แสดงพื้นที่และสิ่งที่ต้องสำรวจ' }
  }
};
const systemButtons = [...document.querySelectorAll('.system-card')];
let activeSystem = 'power';
function selectSystem(key) {
  activeSystem = key;
  systemButtons.forEach(button => {
    const active = button.dataset.system === key;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const system = systems[key];
  document.getElementById('system-detail-index').textContent = system.index;
  document.getElementById('system-detail-title').textContent = t(system.title);
  document.getElementById('system-detail-text').textContent = t(system.text);
  document.getElementById('system-detail-result').textContent = t(system.result);
  for (const side of ['web', 'vr']) {
    const image = document.getElementById(`system-${side}-image`);
    image.src = system[side].image;
    image.alt = t(system[side].alt);
    document.getElementById(`system-${side}-caption`).textContent = t(system[side].caption);
  }
}
systemButtons.forEach(button => button.addEventListener('click', () => selectSystem(button.dataset.system)));

const stageTabs = [...document.querySelectorAll('.stage-tab')];
function selectStage(tab, moveFocus = false) {
  stageTabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (moveFocus) tab.focus();
}
stageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % stageTabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + stageTabs.length) % stageTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stageTabs.length - 1;
    else return;
    event.preventDefault();
    selectStage(stageTabs[next], true);
  });
});

const projectTeam = 'Parin Dechakorn · Pairat Chuenchom';
const advisor = 'Asst. Prof. Dr. Sirion Vittayakorn';
const naprockGallery = document.querySelector('.naprock-gallery');
const naprockItems = [...naprockGallery.querySelectorAll('.gallery-item')];
const galleryPrevious = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryCount = document.querySelector('.gallery-count');
let galleryIndex = 0;
function visibleGalleryItems() {
  return window.innerWidth <= 520 ? 1 : window.innerWidth <= 760 ? 2 : 3;
}
function updateGalleryControls() {
  const visible = visibleGalleryItems();
  const maxIndex = Math.max(0, naprockItems.length - visible);
  galleryIndex = Math.min(maxIndex, Math.max(0, galleryIndex));
  galleryPrevious.disabled = galleryIndex === 0;
  galleryNext.disabled = galleryIndex === maxIndex;
  galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, '0')}–${String(Math.min(naprockItems.length, galleryIndex + visible)).padStart(2, '0')} / ${String(naprockItems.length).padStart(2, '0')}`;
}
function moveGallery(direction) {
  galleryIndex = Math.min(Math.max(0, naprockItems.length - visibleGalleryItems()), Math.max(0, galleryIndex + direction));
  naprockGallery.scrollTo({ left: naprockItems[galleryIndex].offsetLeft - naprockItems[0].offsetLeft, behavior: 'smooth' });
  updateGalleryControls();
}
galleryPrevious.addEventListener('click', () => moveGallery(-1));
galleryNext.addEventListener('click', () => moveGallery(1));
let galleryScrollTimer;
naprockGallery.addEventListener('scroll', () => {
  clearTimeout(galleryScrollTimer);
  galleryScrollTimer = setTimeout(() => {
    const step = naprockItems[1].offsetLeft - naprockItems[0].offsetLeft;
    galleryIndex = Math.round(naprockGallery.scrollLeft / step);
    updateGalleryControls();
  }, 100);
}, { passive: true });
window.addEventListener('resize', () => {
  galleryIndex = Math.min(galleryIndex, Math.max(0, naprockItems.length - visibleGalleryItems()));
  naprockGallery.scrollLeft = naprockItems[galleryIndex].offsetLeft - naprockItems[0].offsetLeft;
  updateGalleryControls();
});
updateGalleryControls();
const galleryDetails = {
  'naprock-presentation': { event: 'NAPROCK PROCON 2024', title: 'นำเสนอเกมต่อกรรมการ', description: 'ทีมสาธิตเกม VR และหน้าจอเว็บไซต์ พร้อมอธิบายว่าผู้เล่นสองคนต้องแบ่งข้อมูลและแก้ปัญหาร่วมกัน', people: projectTeam, advisor },
  'naprock-interview': { event: 'NAPROCK PROCON 2024', title: 'เล่าแนวคิดต่อผู้ชม', description: 'การสัมภาษณ์หน้าโปสเตอร์โครงการเป็นโอกาสให้ทีมอธิบายแนวคิดเกมและวิธีเล่นกับผู้สนใจ', people: projectTeam, advisor },
  'naprock-team': { event: 'NAPROCK PROCON 2024', title: 'ทีมที่บูธจัดแสดง', description: 'ภาพทีม AfterDay Horizon ระหว่างการจัดแสดงผลงานและแลกเปลี่ยนความคิดเห็นในงาน', people: projectTeam, advisor },
  'naprock-prize-certificate': { event: 'NAPROCK PROCON 2024', title: 'ใบประกาศรางวัล Special Prize', description: 'ใบประกาศรางวัล Special Prize ประเภท Original Section มอบให้ทีม AfterDay Horizon ในการแข่งขัน NAPROCK ครั้งที่ 16 ที่ประเทศญี่ปุ่น เมื่อวันที่ 20 ตุลาคม 2024', people: projectTeam, advisor },
  'naprock-attendance-certificate': { event: 'NAPROCK PROCON 2024', title: 'ใบประกาศการเข้าร่วม', description: 'ใบประกาศรับรองการเข้าร่วม NAPROCK ครั้งที่ 16 ของ Parin Dechakorn และ Pairat Chuenchom ณ เมืองนารา ประเทศญี่ปุ่น ระหว่างวันที่ 19–20 ตุลาคม 2024', people: projectTeam, advisor },
  'naprock-award': { event: 'NAPROCK PROCON 2024', title: 'Special Prize', description: 'สรุปการได้รับรางวัลพิเศษจากการแข่งขันที่เมืองนารา ประเทศญี่ปุ่น', people: projectTeam, advisor },
  'cdve-event': { event: 'CDVE 2025', title: 'เวทีวิชาการนานาชาติ', description: 'ภาพบรรยากาศงานประชุม CDVE 2025 ที่กรุงเทพฯ ซึ่ง AfterDay Horizon ได้รับการตอบรับให้นำเสนอผลงาน', people: 'Parin Dechakorn', advisor },
  'cdve-attendee': { event: 'CDVE 2025', title: 'ผู้เข้าร่วมจากทีม', description: 'บัตรผู้เข้าร่วมงานของ Parin Dechakorn หนึ่งในผู้พัฒนา AfterDay Horizon', people: 'Parin Dechakorn', advisor },
  'cdve-proceedings': { event: 'CDVE 2025', title: 'เอกสารการประชุม', description: 'ปกเอกสาร proceedings ของงาน Cooperative Design, Visualization and Engineering ปี 2025', people: projectTeam, advisor },
  'cdve-summary': { event: 'CDVE 2025', title: 'สรุปการนำเสนอผลงาน', description: 'ภาพรวบรวมบรรยากาศงาน บัตรผู้เข้าร่วม และเอกสารการประชุมของ CDVE 2025', people: projectTeam, advisor }
};
const dialog = document.createElement('dialog');
dialog.className = 'media-dialog';
dialog.innerHTML = '<div class="dialog-grid"><div class="dialog-media"><img alt=""></div><div class="dialog-info"><button class="media-dialog-close" type="button" aria-label="ปิดภาพ">×</button><span class="dialog-kicker"></span><h3></h3><p class="dialog-description"></p><dl class="dialog-meta"><dt class="dialog-people-label"></dt><dd class="dialog-people"></dd><dt class="dialog-advisor-label"></dt><dd class="dialog-advisor"></dd></dl></div></div>';
document.body.append(dialog);
let lastGalleryButton = null;
function renderDialog(button) {
  const isConcept = button.hasAttribute('data-concept');
  dialog.classList.toggle('is-concept', isConcept);
  const conceptNumber = isConcept ? button.dataset.concept.padStart(2, '0') : '';
  const detail = isConcept ? {
    event: `EARLY CONCEPT / ${conceptNumber}`,
    title: button.dataset.title || `ภาพคอนเซป ${conceptNumber}`,
    description: button.dataset.description || 'พื้นที่สำหรับภาพคอนเซปช่วงเริ่มออกแบบ รายละเอียดของภาพจะเพิ่มเมื่อใส่รูปจริง'
  } : galleryDetails[button.dataset.detail];
  dialog.querySelector('img').src = button.dataset.fullImage;
  dialog.querySelector('img').alt = isConcept ? t(detail.title) : t(button.dataset.caption);
  dialog.querySelector('.dialog-kicker').textContent = detail.event;
  dialog.querySelector('h3').textContent = t(detail.title);
  dialog.querySelector('.dialog-description').textContent = t(detail.description);
  dialog.querySelector('.dialog-meta').hidden = isConcept;
  dialog.querySelector('.dialog-people-label').textContent = t('ทีมโครงการ / ผู้เข้าร่วม');
  dialog.querySelector('.dialog-people').textContent = detail.people;
  dialog.querySelector('.dialog-advisor-label').textContent = t('อาจารย์ที่ปรึกษาโครงการ');
  dialog.querySelector('.dialog-advisor').textContent = detail.advisor;
  dialog.querySelector('.media-dialog-close').setAttribute('aria-label', t('ปิดภาพ'));
}
document.querySelectorAll('[data-full-image]').forEach(button => {
  button.addEventListener('click', () => {
    lastGalleryButton = button;
    renderDialog(button);
    dialog.showModal();
    dialog.querySelector('.media-dialog-close').focus();
  });
});
dialog.querySelector('.media-dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => lastGalleryButton?.focus());

window.addEventListener('afterday:language-change', () => {
  selectStep(activeStep);
  selectSystem(activeSystem);
  if (dialog.open && lastGalleryButton) renderDialog(lastGalleryButton);
});

const scrollSections = [...document.querySelectorAll('main > section[id]')];
let scrollQueued = false;
function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
  document.querySelector('.site-header').style.setProperty('--scroll-progress', progress + '%');
  const current = [...scrollSections].reverse().find(section => section.getBoundingClientRect().top <= 130);
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    if (current && link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateScrollState);
  }
}, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -25% 0px', threshold: 0.12 });
  document.querySelectorAll('.section').forEach(section => observer.observe(section));
}

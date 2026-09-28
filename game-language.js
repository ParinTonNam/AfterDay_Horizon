// Use the same language preference as the presentation page. Game controls are
// created throughout the session, so translate added nodes as well as the HTML.
const gameLanguage = localStorage.getItem('afterday-language') === 'en' ? 'en' : 'th';
document.documentElement.lang = gameLanguage;

if (gameLanguage === 'en') {
  const english = new Map([
    ['AfterDay Horizon เกมเอาชีวิตรอดสำหรับผู้เล่นสองคน ผ่าน VR และเว็บไซต์ ร่วมมือกันดูแลบังเกอร์ในโลกหลังวิกฤตสภาพภูมิอากาศ', 'AfterDay Horizon is a two-player survival game across VR and the web. Work together to maintain a bunker after a climate crisis.'],
    ['กำลังเข้าระบบบังเกอร์', 'Accessing the bunker system'],
    ['กำลังเตรียมบังเกอร์', 'Preparing the bunker'],
    ['กำลังเชื่อมต่อระบบและข้อมูลเกม', 'Connecting systems and game data'],
    ['โหลดเกมไม่สำเร็จ', 'Could not load the game'],
    ['ตรวจสอบการเชื่อมต่อแล้วลองเข้าใหม่', 'Check your connection and try again'],
    ['กลับหน้าเว็บไซต์', 'Back to website'],
    ['กลับหน้าเว็บไซต์ ↗', 'Back to website ↗'],
    ['เกมฝั่งเว็บไซต์ใช้จอคอมพิวเตอร์', 'The web game requires a computer'],
    ['ส่วนนี้มีหน้าต่างและเครื่องมือหลายชุดที่ต้องใช้พื้นที่บนจอคอมพิวเตอร์ คุณยังดูคลิปการเล่นจริงและข้อมูลโปรเจกต์บนมือถือได้', 'This game uses several windows and tools that need a computer screen. You can still watch the gameplay video and read about the project on mobile.'],
    ['ดูคลิป Showcase', 'Watch the showcase video'],
    ['กลับหน้าโปรเจกต์', 'Back to the project'],
    ['ปิดหน้าต่าง', 'Close window'],
    ['ออกจากบังเกอร์?', 'Leave the bunker?'],
    ['กลับไปหน้าแนะนำ AfterDay Horizon ได้ทันที', 'Return to the AfterDay Horizon introduction.'],
    ['เล่นต่อ', 'Keep playing'],
    ['คู่มือระบบน้ำ', 'Water system guide'],
    ['คู่มือปลดล็อกกุญแจ', 'Key unlock guide'],
    ['คู่มือระบบไฟฟ้า', 'Electrical system guide'],
    ['เครื่องระบบประปา', 'Water supply unit'],
    ['วิธีการค้นหารหัส', 'How to find the code'],
    ['= ถูกตัวเลขและถูกตำแหน่ง', '= Correct digit and position'],
    ['= ถูกตัวเลขแต่ไม่ถูกตำแหน่ง', '= Correct digit, wrong position'],
    ['= ไม่ถูกตัวเลข', '= Incorrect digit'],
    ['ไม่พบไวรัส', 'No virus detected'],
    ['ตรวจพบไวรัสเล็กน้อย', 'Low virus level detected'],
    ['ตรวจพบไวรัสจำนวนหนึ่ง !', 'Virus detected!'],
    ['ตรวจพบไวรัสจำนวนมาก ! ! !', 'High virus level detected!'],
    ['สถานะบังเกอร์', 'Bunker status'],
    ['ออกจากเกม', 'Exit game'],
    ['ปิดเกม', 'Exit game'],
    ['ออกเกม', 'Exit'],
    ['กลับหน้าแนะนำโครงการ', 'Back to project introduction'],
    ['สภาพของบังเกอร์', 'Bunker condition'],
    ['กุญแจสำหรับปลดล็อกไฟล์', 'Keys for unlocking files'],
    ['เกมสำหรับผู้เล่นสองคน · VR + เว็บไซต์', 'Two-player game · VR + web'],
    ['← กลับหน้าแนะนำโครงการ', '← Back to project introduction'],
    ['กรอกรหัสสองตัวที่ได้จากผู้ดูแลเพื่อเริ่มเกม', 'Enter the two-digit code from the operator to start'],
    ['หน้านี้จะมีอยู่ไหม มันคือหน้าอะไรนะ', 'Session summary'],
    ['จบรอบทดลองแล้ว', 'Demo session complete'],
    ['ขอบคุณที่เข้ามาสำรวจบังเกอร์กับเรา', 'Thank you for exploring the bunker with us.'],
    ['นี่คือเดโมฝั่งเว็บไซต์สำหรับทดลองใช้งาน ขอบคุณที่ร่วมเดินทางในโลกของ AfterDay Horizon', 'This is a preview of the web operator experience. Thank you for joining us in the world of AfterDay Horizon.'],
    ['เล่นอีกรอบ', 'Play again'],
    ['กลับหน้าแนะนำ', 'Back to introduction'],
    ['ลองสำรวจปุ่มจริงบนหน้าจอ', 'Explore the controls on screen'],
    ['เวลาหยุดระหว่างฝึก', 'The timer is paused during training'],
    ['หมายเหตุ: นี่คือเดโมฝั่งเว็บไซต์สำหรับทดลองใช้งาน ยังไม่สามารถเล่นเกมจริงได้ในขณะนี้', 'Note: This web demo is for preview only. The full game is not available yet.'],
    ['ข้ามการแนะนำ', 'Skip tutorial'],
    ['ข้ามการแนะนำ ↗', 'Skip tutorial ↗'],
    ['แนะนำครบ 7 ขั้นตอน', 'All 7 tutorial steps complete'],
    ['สำรวจครบแล้ว', 'Training complete'],
    ['คุณรู้จักเครื่องมือฝั่งเว็บไซต์ครบแล้ว ต่อจากนี้จะเป็นการทดลองใช้งานเดโม อีเวนท์จะเริ่มเมื่อคุณกดพร้อมเล่น', 'You have explored the web operator tools. The demo events will begin when you select Ready to play.'],
    ['เดโมนี้เป็นฝั่งเว็บไซต์สำหรับทดลองใช้งาน ยังไม่สามารถเล่นเกมจริงได้ในขณะนี้', 'This web demo is for preview only. The full game is not available yet.'],
    ['พร้อมเล่น', 'Ready to play'],
    ['เริ่มที่ ReadME', 'Start with ReadME'],
    ['คุณคือผู้นำฝั่งเว็บไซต์ คอยอ่านคู่มือและบอกข้อมูลให้ผู้เล่นใน VR เปิดแฟ้มนี้เพื่อดูวิธีดูแลบังเกอร์', 'You are the web operator. Read the guides and share information with the VR player. Open this folder to learn how to maintain the bunker.'],
    ['คลิกแฟ้ม ReadME บนหน้าจอจริง', 'Click the ReadME folder on the screen'],
    ['เปิดคู่มือจริง', 'Open a real guide'],
    ['ไฟล์ใน ReadME บอกวิธีซ่อมระบบต่าง ๆ ลองเปิดเอกสารไฟฟ้าฉบับแรกเพื่อดูว่าต้องสื่อสารอะไรกับคู่เล่น', 'ReadME contains repair guides. Open the first electrical guide to see what you need to tell your partner.'],
    ['คลิกไฟล์คู่มือในหน้าต่าง ReadME', 'Click a guide file in the ReadME window'],
    ['แฟ้มข้อมูลและเบาะแส', 'Files and clues'],
    ['Folder 1–4 เก็บโน้ตและชิ้นส่วน บางไฟล์ล็อกอยู่และต้องใช้กุญแจที่แสดงมุมซ้ายล่าง', 'Folders 1–4 hold notes and parts. Some files are locked and require the keys shown at the bottom left.'],
    ['ลองเปิดแฟ้มใดก็ได้', 'Open any folder'],
    ['ระบบไฟฟ้า', 'Electrical system'],
    ['เปิดแผงไฟฟ้าเมื่อเกิดปัญหา แล้วเทียบข้อมูลจากคู่มือกับสิ่งที่ผู้เล่น VR เห็นก่อนกดแก้ระบบ', 'Open the electrical panel when a fault occurs. Compare the guide with what the VR player sees before repairing the system.'],
    ['คลิกไอคอน Electrical system', 'Click the Electrical system icon'],
    ['ระบบน้ำ', 'Water system'],
    ['หน้าต่างนี้ใช้เลือกท่อและรหัสซ่อม ค้นเบาะแสใน ReadME แล้วบอกผู้เล่น VR ให้ต่อท่อให้ตรงกัน', 'Use this window to select pipes and repair codes. Find clues in ReadME and help the VR player connect the pipes correctly.'],
    ['คลิกไอคอน Water Supply System', 'Click the Water Supply System icon'],
    ['ระบบกุญแจ', 'Key system'],
    ['เล่นมินิเกมใน Key Unlock System เพื่อหากุญแจเพิ่ม แล้วนำไปปลดล็อกไฟล์ข้อมูลที่จำเป็น', 'Play the Key Unlock System minigame to earn keys, then unlock the files you need.'],
    ['คลิกไอคอน Key Unlock System', 'Click the Key Unlock System icon'],
    ['ตัวตรวจไวรัส', 'Virus detector'],
    ['ติดตามเปอร์เซ็นต์ไวรัสและลำดับสัญลักษณ์ที่ต้องรีเซ็ต ความผิดพลาดจะทำให้ไวรัสเพิ่มขึ้น', 'Track the virus level and the symbol sequence needed to reset it. Mistakes increase the virus level.'],
    ['คลิกไอคอน Virus Detector', 'Click the Virus Detector icon'],
    ['กลับไปที่ ReadME', 'Return to ReadME'],
    ['คู่มือฉบับแรกอยู่ในแฟ้ม ReadME เปิดแฟ้มอีกครั้งเพื่อทดลองอ่านไฟล์จริง', 'The first guide is in ReadME. Open the folder again to read the file.'],
    ['คลิก ReadME แล้วเลือกไฟล์คู่มือ', 'Click ReadME, then select a guide file'],
    ['ปิดหน้าต่างนี้', 'Close this window'],
    ['สำรวจเนื้อหาในหน้าต่างได้ตามต้องการ แล้วปิดเพื่อกลับไปดูปุ่มอื่นบนเดสก์ท็อป', 'Explore the contents, then close this window to continue with the desktop controls.'],
    ['คลิก X เมื่อพร้อมสำรวจต่อ', 'Click X when you are ready to continue'],
    ['เปิดไฟล์', 'Open file'],
    ['How to fix electical', 'How to fix electrical'],
    ['How to use electical', 'How to use electrical'],
    ['ขยะไม่ทราบชื่อ', 'Unknown waste'],
    ['ภาวะโลก ละละละเลิฟยู', 'Planet saved!'],
    ['แมวเด้ง', 'Bouncing cat'],
    ['ว้ากกกกกก ! !', 'Aaaah!'],
  ]);

  const attributes = ['alt', 'aria-label', 'title', 'placeholder', 'data-text', 'content'];
  const translate = value => {
    const trimmed = value.trim();
    return english.has(trimmed) ? value.replace(trimmed, english.get(trimmed)) : value;
  };
  const translateNode = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const result = translate(node.textContent);
      if (result !== node.textContent) node.textContent = result;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const elements = [node, ...node.querySelectorAll('*')];
    for (const element of elements) {
      for (const name of attributes) {
        if (!element.hasAttribute(name)) continue;
        const value = element.getAttribute(name);
        const result = translate(value);
        if (result !== value) element.setAttribute(name, result);
      }
    }
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text; text = walker.nextNode()) translateNode(text);
  };

  translateNode(document.head.querySelector('meta[name="description"]'));
  translateNode(document.body);
  new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') translateNode(mutation.target);
      else if (mutation.type === 'attributes') translateNode(mutation.target);
      else for (const node of mutation.addedNodes) translateNode(node);
    }
  }).observe(document.body, { childList: true, characterData: true, attributes: true, attributeFilter: attributes, subtree: true });
}

# AfterDay Horizon — Project Handoff

อัปเดต 28 กันยายน 2026 (Asia/Bangkok) อ่านเอกสารนี้และตรวจไฟล์จริงก่อนเริ่มงานต่อ

## 1. ข้อมูลสำคัญ

- **โฟลเดอร์ล่าสุดที่ผู้ใช้เลือก: `C:\Users\tonkl\AfterDay-website`**
- เครื่องมือบาง session เริ่มที่ `D:\afterday\AfterDayHorizon_Website` ซึ่งเป็นอีกสำเนา อย่าแก้ผิดโฟลเดอร์ ระบุ working directory ทุกครั้ง
- ปัจจุบันเป็น **static HTML/CSS/JavaScript** ไม่มี package.json และไม่ต้อง build ด้วย Vite
- `index.html` คือหน้าแนะนำ; `game.html?demo=1` คือเดโมเครื่องมือบนคอมพิวเตอร์
- เดโมยังไม่ใช่เกมจริงที่เชื่อมเล่นกับ VR อย่าอ้างว่ามี backend/multiplayer ที่ใช้งานได้จาก UI เก่า
- หน้าแนะนำรองรับมือถือ ฝั่งเกมออกแบบสำหรับคอมพิวเตอร์
- ไทย/อังกฤษต้องใช้ภาษาต่อเนื่องกันจากหน้าแนะนำถึงเกม
- ผู้ใช้ใช้ GitHub Desktop และไม่ต้องการส่งงานผ่าน ZIP

## 2. Git และ deployment

ตรวจจากเครื่องก่อนเขียนเอกสาร:

- มี `.git` แล้ว; branch `master`
- HEAD `6c1e2df` — `bug fix`; ก่อนหน้า `2ce30a4` — `first commit 1`
- Origin: https://github.com/ParinTonNam/AfterDay_Horizon.git
- ก่อนเขียนเอกสาร tracked files ไม่มีการแก้ค้าง
- Untracked: `AfterDayHorizon-deploy.zip` และ `img_new/cdve/demo_play.mp4`
- **ไม่ได้ยืนยันว่า HEAD ถูก push แล้ว และไม่ได้ตรวจ production deployment ล่าสุด**
- URL ที่ผู้ใช้ให้: https://afterday-horizon.vercel.app/

ปัญหาเดิม: Vercel เคยแสดง React/Vite รุ่นเก่า จากนั้น deploy ล้มเหลวด้วย `vite: command not found` / exit 127 เพราะยังตั้ง `vite build` อยู่ ส่วน GitHub Desktop เคยหาโฟลเดอร์ไม่พบ แต่ตอนนี้มี `.git` กลับมาแล้ว

ตั้งค่า Vercel สำหรับ source ชุดปัจจุบัน:

| รายการ | ค่า |
|---|---|
| Framework Preset | Other |
| Root Directory | โฟลเดอร์ที่มี index.html, game.html, seed.json; ถ้าอยู่ root repo ให้เว้นว่าง |
| Build Command | Override เป็นค่าว่าง |
| Install Command | Override เป็นค่าว่าง |
| Output Directory | `.` |

ไม่พบ vercel.json ในโฟลเดอร์นี้ ต้องตรวจ Dashboard แยก ก่อนสรุปว่า browser cache ทำให้เห็นหน้าเก่า ให้ตรวจ repository, branch, deployment commit และ root directory ก่อน

## 3. เปิดในเครื่อง

ใช้ HTTP server เพราะเกม fetch `seed.json`; อย่าเปิดด้วย file://

```powershell
Set-Location 'C:\Users\tonkl\AfterDay-website'
py -m http.server 8011 --bind 127.0.0.1
```

ถ้าเครื่องใช้ `python` แทน `py` ให้เปลี่ยนคำสั่ง

- หน้าแรก: http://127.0.0.1:8011/
- Tutorial + เดโม: http://127.0.0.1:8011/game.html?demo=1
- เล่นอีกรอบข้าม Tutorial: http://127.0.0.1:8011/game.html?demo=1&replay=1
- อย่าสมมติว่า server ครั้งก่อนยังรันอยู่ ถ้าพอร์ตถูกใช้ให้ตรวจหรือเปลี่ยนพอร์ต
- หลังแก้ CSS/JS เพิ่ม `?v=` ของไฟล์นั้นใน HTML และตรวจด้วย Ctrl+F5

## 4. แผนที่ไฟล์

| ส่วน | ไฟล์ |
|---|---|
| หน้าแนะนำ | index.html, presentation.js, presentation.css |
| Layout เพิ่มเติม | interactive.css, updates.css, atmosphere.css |
| ภาษาหน้าแนะนำ | i18n.js |
| Visual Record สองฝั่ง | design-gallery.js/css |
| Early Concept | concept-gallery.js/css |
| ทางเข้า/transition | play-launch.css, game-transition.js/css |
| เอฟเฟกต์ | glitch.js/css |
| โครงหน้าต่างเกม | game.html, index.css, menu.css |
| วงจรเกม/หน้าต่าง/จบรอบ | script.js |
| เริ่มเดโม/โหลด | game-entry.js, game-loading.css, game-gate.css |
| UI เกม | game-ui.js/css |
| Tutorial | tutorial.js/css |
| ภาษาเกม | game-language.js |
| ฟอนต์เกม | pixel-font.css, game-typography.css |
| มินิเกม | minigame.js/css |
| ไฟฟ้า | electic.js (สะกดแบบนี้เป็นชื่อจริง) |
| เหตุการณ์ระบบ | event.js |
| ไวรัส | virus.js/css |
| น้ำ | game-water.css; logic ใน script.js/event.js |
| จบรอบ | game-result.css; logic ใน script.js |
| คู่มือ/รูปไฟล์ | game-manuals.js/css, game-file-viewer.css |
| ข้อมูลตัวอย่าง | seed.json |

JavaScript ใช้ global functions และลำดับโหลดใน game.html สำคัญ อย่าสลับ script หรือเปลี่ยนเป็น module โดยไม่ตรวจ dependency

## 5. หน้าแนะนำและรูปภาพ

- Navbar ใช้คำยาว AfterDay Horizon ไม่มีไอคอน A/H เดิม
- มีปุ่ม Behance เปิดแท็บใหม่: https://www.behance.net/gallery/244161853/AfterDay-Horizon-Award-Winning-VR-Web-Co-op-Game
- คลิปใช้ **img_new/cdve/showcase.mp4** ประมาณ 41.4 MiB ไม่ใช่ demo_play.mp4
- Logo: `img_new/logo.PNG`; favicon: `img/afterday-favicon.svg`
- Assets หน้าแนะนำใช้ `img_new/` เป็นหลัก แต่ยังมีไฟล์ใน img/ และ assets เกมที่จำเป็น ห้ามลบโฟลเดอร์เก่าทั้งหมดโดยไม่ตรวจ references
- Assets เกมอยู่ใน Icon/, info/, meme/, Minigame/, part/, pipe/, font/ เป็นต้น ระวังตัวพิมพ์ใหญ่เล็กบน Linux hosting
- Visual Record มีภาพแยก Website / VR และการเลื่อนภาพ
- Early Concept มี 10 รูป กดดูภาพเต็มและรายละเอียดได้ เลื่อนอัตโนมัติทุก 5 วินาทีและเลื่อนเองได้
- เคยจัดโดม/ทดสอบ VR/ท่อก่อน แล้วสลับลำดับ 10 กับ 2 ตามคำสั่งล่าสุด ให้ยึด DOM ปัจจุบัน ไม่คืนลำดับจากข้อความเก่า
- ปุ่ม pause ของ gallery ถูกเอาออกตามคำขอ
- ล่าสุดเอาลูกศร ↗ ออกจากวิธีเล่น 4 จุด การ์ดระบบ 4 จุด และแท็บรางวัล 2 จุดแล้ว การเลือกเนื้อหายังทำงานเดิม
- ลูกศรของลิงก์หรือภาพขยายอื่นไม่ได้อยู่ในคำขอลบ

## 6. Tutorial / การเริ่มเดโม

พฤติกรรมที่ต้องรักษา:

1. Tutorial ชี้ปุ่มจริง 7 ขั้น: ReadME, คู่มือ, แฟ้ม, ไฟฟ้า, น้ำ, กุญแจ, Virus Detector
2. เหตุการณ์เกมหยุดระหว่าง Tutorial
3. ขั้นสุดท้ายต้องให้ผู้ใช้อ่าน Virus Detector แล้วปิดเองก่อนแสดงสรุป
4. **กดข้ามการแนะนำก็แสดงหน้าสรุปเดียวกัน ไม่เริ่มทันที**
5. สรุปใช้ `DEMO / WEBSITE PREVIEW` ไม่ใช้ 07/07 ที่อาจทำให้ผู้กดข้ามเข้าใจว่าทำครบ
6. หัวข้อ `ทดลองใช้งานเดโม` / `Try the website demo`
7. ย้ำว่าเป็นการทดลองเครื่องมือเว็บไซต์ ไม่ใช่เกมจริง และยังเล่นร่วมกับ VR ไม่ได้
8. ต้องกด `เริ่มทดลองใช้งาน` / `Start demo` จึงเรียก callback เริ่มเดโม

ฟังก์ชันหลัก: `guidedShowCompletion()` แสดงสรุป; `finishGuidedTutorial(resumeGame = true)` จบ Tutorial; `cancelGuidedTutorial()` ใช้ false

`replay=1` เป็นเส้นทางเล่นอีกรอบที่ข้าม Tutorial ตามพฤติกรรมเดิม ไม่ได้เปลี่ยนพร้อมงานปุ่มข้ามล่าสุด

ภาษาใช้ localStorage `afterday-language` (`th`/`en`) ร่วมกันทั้งสองหน้า `game-language.js` แปล DOM รวมข้อความเพิ่มภายหลัง เวลาแก้คำไทยต้องแก้ mapping อังกฤษด้วย

## 7. มินิเกม ฟอนต์ และ lifecycle

มินิเกม 4 แบบ: `imageSwapGame()`, `spotTheDifferenceGame()`, `separateTrash()`, `virusGame()`

ปัญหาฟอนต์ล่าสุด:

- กฎรวม `font-size-adjust: .8` บวกหัวข้อ 2em ทำให้ตัวอักษรใหญ่เกิน
- game-typography.css ปิด font-size-adjust เฉพาะเนื้อหาและ timer ใน #minigame
- **ยกเว้น .window-header** เพื่อหัวระบบ/Back/X เท่ากับหน้าต่างอื่น
- หัวข้อเนื้อหา `clamp(20px, 2.2vw, 28px)`; timer `clamp(18px, 1.8vw, 22px)`
- หัวหน้าต่างที่ตรวจใช้ 22px / font-size-adjust .8 เหมือน Virus Detector
- อย่าแก้ global เพื่อแก้หน้าต่างเดียว เพราะเคยกระทบ popup ออกเกมและระบบน้ำ

การหยุดงาน:

- `stoptime_minigame()` ล้าง gameTimer, virusSpawnInterval, minigameTimeouts, minigameFrames และ mouse handlers
- ใช้ `scheduleMinigameTimeout()` / `scheduleMinigameFrame()` สำหรับงานที่ต้อง cleanup
- `minigameCanRun()` ป้องกันงานหลังจบรอบ/ปิดหน้าต่าง
- closeWindow / closeAllWindows / showThank ต้องรักษาการหยุด timer และ animation
- popup จบรอบซ้อนบนหน้าจอเกม ล็อกด้านหลัง ไม่มีเวลาเอาตัวรอด มีเล่นอีกรอบและกลับหน้าแนะนำ
- popup ออกเกมต้องกัก Tab ไม่ให้โฟกัสหลุดไปเครื่องมือด้านหลัง

## 8. ผลตรวจที่มี และขอบเขต

รอบตรวจใหญ่จาก session ก่อนหน้า (ไม่ได้ rerun ทั้งหมดตอนเขียนเอกสาร):

- local references 219 รายการพบไฟล์และตัวพิมพ์ตรง; JS 18 ไฟล์ผ่าน syntax; seed.json parse ได้
- หน้าแนะนำ TH/EN, วิธีเล่น, ระบบ, รางวัล, concept lightbox 10 รูป และ gallery ผ่าน
- viewport 390/768/1024/1440 ไม่พบ horizontal overflow
- Tutorial ครบ, รอปิด Virus Detector, ปุ่มเริ่ม, focus popup, cleanup มินิเกมและจบรอบผ่าน
- ไม่พบ local HTTP errors/pageerrors ในรอบนั้น

งานล่าสุดที่ตรวจ:

- มินิเกมทั้ง 4 หัวข้อไม่ล้นที่ 1136×720; ดู screenshot เกมสลับภาพแล้ว
- แถบหัวมินิเกมเทียบ Virus Detector มี computed font-size/adjust เท่ากัน เนื้อหา/เวลาใช้ none
- ลบลูกศร: แก้ HTML ครบ 10 จุดและ grid วิธีเล่น; ไม่มี full regression หลังงานนี้
- ปุ่มข้าม: ทดสอบ browser ทั้ง th/en ว่าสรุปแสดงและ callback ไม่ทำงานก่อนยืนยัน จากนั้นทำงาน 1 ครั้งเมื่อกดเริ่ม
- ยังไม่ได้ rerun Tutorial ครบ 7 ขั้นหลังเปลี่ยนข้อความล่าสุด
- **ผล local ไม่ยืนยัน production หรือการ push ล่าสุด**

## 9. Checklist ครั้งถัดไป / ก่อน deploy

1. ยืนยัน folder, git status, branch, commit และ origin
2. เปิด HTTP server ตรวจหน้าแรก/เดโมทั้งไทยและอังกฤษ รูปและ Showcase
3. ตรวจ Console/Network: errors, 404, fonts; อย่ารอ networkidle กับ autoplay video
4. ตรวจข้าม → สรุป → รอ → กดเริ่ม และ Tutorial ครบที่รอผู้ใช้ปิดหน้าสุดท้าย
5. เปิด/ปิดมินิเกมหลายครั้ง จบรอบกลางมินิเกม ต้องหยุด timer/spawn/animation
6. Tab ใน popup ต้องไม่ไปด้านหลัง
7. ตรวจคู่มือไม่ล้น ปุ่ม Enter สามระบบ ฟอนต์หลัง refresh และ horizontal overflow
8. Commit/push เฉพาะไฟล์จำเป็น ตรวจ Vercel settings และ deployment commit
9. เปิด production ทดสอบอีกครั้ง อย่าสรุปว่าพร้อมจาก build ผ่านอย่างเดียว

## 10. คำแนะนำงานต่อ — ยังไม่ได้ทำ

1. **กันไฟล์ใหญ่ที่ไม่ใช้เข้า Git**: demo_play.mp4 ประมาณ 136.1 MiB และ ZIP เก่ายัง untracked; .gitignore ยังไม่ครอบคลุม แนะนำเพิ่มพาธสองไฟล์นี้ โดยไม่ลบต้นฉบับ ZIP เก่าไม่ใช่ชุด source ล่าสุด
2. **ลดขนาดภาพสำหรับเว็บ**: ภาพ VR บางรูปละเอียดสูงมาก ควรทำ WebP/AVIF หรือ thumbnail แยกต้นฉบับ ตรวจ lightbox ก่อนเปลี่ยน จะลดเวลาโหลดและหน่วยความจำ
3. **ลด CSS ซ้ำทีละส่วน** โดยเฉพาะ pixel-font.css/game-typography.css อย่า refactor ทั้งหมดพร้อม bug fix เล็ก
4. **เพิ่ม smoke test ที่รันซ้ำได้** สำหรับ Tutorial, popup focus, timer cleanup; การทดสอบล่าสุดเป็นสคริปต์ชั่วคราว ไม่ใช่ suite ที่ commit
5. ตรวจฟอนต์บนเน็ตช้า ยังมี Google Fonts ภายนอก หาก self-host ให้ตรวจสิทธิ์และ glyph ไทย/อังกฤษ
6. ตรวจคำอธิบายภาพ cdve-summary: เปลี่ยนเป็นรูปงานแล้ว คำบางจุดอาจยังอ้าง collage (ยังไม่ได้แก้)

## 11. แนวทางทำงาน

- สื่อสารภาษาไทย อ่านง่าย บอกสิ่งที่ตรวจจริงและสิ่งที่ยังไม่ยืนยัน
- Screenshot ชี้ตำแหน่งไหนให้แก้ตรงนั้นก่อน ไม่ขยาย X หรือ popup โดยไม่เทียบส่วนอื่น
- ผู้ใช้ให้ความสำคัญกับฟอนต์คงที่หลัง refresh และไม่ใหญ่เกิน
- ถ้า sandbox ชี้ D: แต่ต้องแก้ C: ให้ขอสิทธิ์เครื่องมือตามระบบ อย่าย้ายโปรเจกต์เอง
- อัปเดต HANDOFF นี้เมื่อเปลี่ยน flow, โครงสร้าง หรือ deployment

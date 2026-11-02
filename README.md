# 🎬 FB Reel to Watch

> **Bypass Facebook Reels automatically and redirect to the classic Facebook Watch player.**  
> ส่วนขยายเบราว์เซอร์ที่จะเปลี่ยนการเปิด Facebook Reels ให้กลายเป็น Classic Watch Player อัตโนมัติ พร้อมฟังก์ชันควบคุมวิดีโอครบครัน

[![Microsoft Edge Add-ons](https://img.shields.io/badge/Microsoft%20Edge-Get%20it%20on%20Edge%20Add--ons-0078D7?logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/fb-reel-to-watch/ppphbppfbckgioelkphjdickgaaogndk)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📸 ตัวอย่างการทำงาน / Preview

| 🔴 Extension Inactive (โหมดปกติ) | 🟢 Extension Active (เปิดการทำงาน) |
| :---: | :---: |
| <img src="public/DemoImg/Store_Off_mosaic_1280x800.png" alt="Extension Inactive" width="100%" /> | <img src="public/DemoImg/Store_On_mosaic_1280x800.png" alt="Extension Active" width="100%" /> |
| **Reel View (โหมดปกติ):** เปิดคลิปแนวตั้งตามเดิมเมื่อปิดสวิตช์ | **Classic Watch Player:** แปลงลิงก์อัตโนมัติ มีแถบกรอเวลาและปุ่มควบคุมครบ |

---

### 🌐 Select Language / เลือกภาษา
- [🇹🇭 ภาษาไทย](#-ภาษาไทย)
- [🇬🇧 English](#-english)

---

# 🇹🇭 ภาษาไทย

## ✨ จุดเด่น (Features)

- ⏩ **เปิดเป็น Watch Player อัตโนมัติ:** เปลี่ยนวิดีโอ Reel ให้กลายเป็น Classic Watch Player ทันทีที่คลิก
- 🎛️ **มีปุ่มควบคุมวิดีโอครบครัน:** แถบเลื่อนเวลา (Scrubber bar), ปุ่มปรับความเร็ว (Playback Speed), ปรับความละเอียดสูงสุด (Resolution) และปุ่มควบคุมเสียง
- 🚫 **ไม่เปิด Reel Modal:** สกัดหน้าต่าง Reel แนวตั้งเต็มจอ ไม่ให้เด้งขึ้นมาบดบังหน้าจอ
- ⚡ **ประหยัดทรัพยากร (Zero DOM Scanning):** ไม่ใช้ `MutationObserver` สแกน DOM ให้เปลือง CPU แต่ใช้ Event Delegation ใน Capture Phase แทน
- 🌐 **รองรับทุกลิงก์ Reel:** ครอบคลุมทั้ง `/reel/{id}`, `/reels/{id}`, `/share/r/{id}` และลิงก์ที่มีพารามิเตอร์ต่อท้าย
- 🔘 **หน้าต่าง Popup สวยงาม:** เปิด/ปิดการทำงานได้ตลอดเวลาผ่าน Toggle Switch แบบ Real-time

---

## 📥 วิธีการติดตั้งใช้งาน

### 🚀 วิธีที่ 1: ติดตั้งจาก Microsoft Edge Add-ons (แนะนำและง่ายที่สุดใน 1 คลิก)
สำหรับผู้ใช้ **Microsoft Edge**: ผ่านการตรวจสอบและอนุมัติอย่างเป็นทางการแล้ว สามารถกดติดตั้งได้ทันที ไม่ต้องเปิด Developer Mode และรองรับการอัปเดตอัตโนมัติ

👉 **[ดาวน์โหลดและติดตั้งจาก Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/fb-reel-to-watch/ppphbppfbckgioelkphjdickgaaogndk)**

---

### ⚡ วิธีที่ 2: ลากไฟล์วางได้เลย (สำหรับ Chrome, Brave, Opera, Vivaldi ฯลฯ)
1. ดาวน์โหลดไฟล์ **`FB Reel to Watch.zip`** จากหน้า [Releases](https://github.com/KrittinSomb/FB-Reel-to-Watch/releases) หรือจาก Repository นี้
2. ไปที่หน้า **จัดการส่วนขยาย (Manage Extensions)** ในเบราว์เซอร์ของคุณ:
   - **วิธีที่ 1 (ผ่านเมนูเบราว์เซอร์):** คลิกปุ่ม **จุด 3 จุด (⋮)** หรือ **ขีด 3 ขีด (☰)** ที่มุมบนขวาของเบราว์เซอร์ ➔ เลือก **"ส่วนขยาย" (Extensions)** ➔ เลือก **"จัดการส่วนขยาย" (Manage extensions)**
   - **วิธีที่ 2 (ผ่านไอคอนส่วนขยาย):** คลิกไอคอน **จิ๊กซอว์ (🧩 ส่วนขยาย)** ที่แถบด้านบน ➔ เลือก **"จัดการส่วนขยาย" (Manage extensions)**
   - **หรือพิมพ์ URL ในช่องที่อยู่เว็บ:**
     - Chrome / Brave / Vivaldi: `chrome://extensions`
     - Edge: `edge://extensions`
     - Opera: `opera://extensions`
3. เปิดสวิตช์ **Developer mode** (โหมดนักพัฒนา) ที่มุมบนขวา
4. **ลากไฟล์ `FB Reel to Watch.zip` ไปปล่อย (Drag & Drop) ในหน้าต่างนั้นได้เลย!** ส่วนขยายจะถูกติดตั้งและพร้อมทำงานทันที

---

### 📂 วิธีที่ 3: แตกไฟล์แบบปกติ (กรณีเบราว์เซอร์ไม่รองรับการลากวาง)
1. คลิกขวาที่ไฟล์ `FB Reel to Watch.zip` แล้วเลือก **Extract All...** (แยกไฟล์ทั้งหมด)
2. ไปที่หน้า **จัดการส่วนขยาย** (ตามข้อ 2 ด้านบน) แล้วเปิด **Developer mode**
3. คลิกปุ่ม **Load unpacked** (โหลดส่วนขยายที่คลายการบีบอัดแล้ว) ที่มุมซ้ายบน
4. เลือกโฟลเดอร์ที่เพิ่งแตกไฟล์ออกมา ส่วนขยายจะถูกติดตั้งและพร้อมทำงานทันที

---

## 💻 สำหรับนักพัฒนา (Developer Setup & Build from Source)

หากต้องการดูโค้ด แก้ไข หรือ Build ด้วยตนเอง:

```bash
# 1. Clone repository
git clone https://github.com/KrittinSomb/FB-Reel-to-Watch.git
cd FB-Reel-to-Watch

# 2. ติดตั้ง Dependencies (แนะนำให้ใช้ Bun หรือ npm)
bun install

# 3. รันโหมด Development (Hot Module Replacement - HMR)
bun run dev

# 4. รัน Unit Tests
bun run test

# 5. Build สำหรับ Production (ผลลัพธ์จะอยู่ในโฟลเดอร์ dist/)
bun run build
```

---

<br/>

# 🇬🇧 English

## ✨ Features

- ⏩ **Automatic Watch Player Redirect:** Instantly redirects Facebook Reel links to the classic Watch player layout.
- 🎛️ **Full Video Controls:** Restores essential playback controls (timeline scrubber bar, speed adjustments, full resolution picker, and volume slider).
- 🚫 **Blocks Reel Overlay Modal:** Suppresses Facebook's intrusive vertical Reel viewer modal from mounting over your screen.
- ⚡ **Zero DOM Scanning (CPU Efficient):** Does NOT use heavy `MutationObserver` loops. Intercepts events via Capture Phase delegation with near-zero CPU overhead.
- 🌐 **Comprehensive URL Support:** Handles `/reel/{id}`, `/reels/{id}`, `/share/r/{id}`, and URLs with query parameters.
- 🔘 **Clean Popup GUI:** Built with React & Tailwind CSS v4, featuring a real-time enable/disable toggle switch.

---

## 📥 Installation Guide

### 🚀 Method 1: Install from Microsoft Edge Add-ons (Recommended & Easiest)
For **Microsoft Edge** users: Officially reviewed and approved! Install in 1-click with automatic updates and no Developer Mode needed.

👉 **[Get it on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/fb-reel-to-watch/ppphbppfbckgioelkphjdickgaaogndk)**

---

### ⚡ Method 2: Drag & Drop (Fastest for Chrome, Brave, Opera, Vivaldi, etc.)
1. Download **`FB Reel to Watch.zip`** from the [Releases](https://github.com/KrittinSomb/FB-Reel-to-Watch/releases) section or from this repository.
2. Open the **Manage Extensions** page in your browser:
   - **Option 1 (Browser Menu):** Click the **three dots (⋮)** or **hamburger menu (☰)** in the top-right corner ➔ select **"Extensions"** ➔ click **"Manage extensions"**
   - **Option 2 (Toolbar Icon):** Click the **puzzle piece icon (🧩 Extensions)** in your top toolbar ➔ select **"Manage extensions"**
   - **Or via direct URL:**
     - Chrome / Brave / Vivaldi: `chrome://extensions`
     - Edge: `edge://extensions`
     - Opera: `opera://extensions`
3. Toggle on **Developer mode** (top-right corner).
4. **Drag and drop the `FB Reel to Watch.zip` file directly onto the page!** 🎯
5. The extension is installed and active immediately! 🎉

---

### 📂 Method 3: Traditional Unpack (If Drag & Drop is unavailable)
1. Right-click `FB Reel to Watch.zip` and select **Extract All...**
2. Navigate to the **Manage Extensions** page (as described above) and turn on **Developer mode**.
3. Click the **Load unpacked** button (top-left).
4. Select the extracted folder. You're ready to go!

---

## 💻 Developer Setup & Building from Source

To inspect the code, modify components, or build manually:

```bash
# 1. Clone the repository
git clone https://github.com/KrittinSomb/FB-Reel-to-Watch.git
cd FB-Reel-to-Watch

# 2. Install dependencies (Bun or npm recommended)
bun install

# 3. Start development server with HMR
bun run dev

# 4. Run unit tests
bun run test

# 5. Build for production (output generated in dist/)
bun run build
```

---

## 🏗️ Architecture

The extension leverages a dual-world design for optimal performance:

```text
[Facebook Tab]
  ├── MAIN World (src/main-world.iife.ts)
  │     ├── Capture-phase Event Delegation (click, mousedown, mouseover)
  │     ├── History API Hook (history.pushState / replaceState)
  │     └── Immediate Initial Redirect (document_start)
  │
  └── ISOLATED World (src/content.iife.ts)
        └── Syncs isEnabled state with chrome.storage.local via documentElement.dataset

[Popup GUI] (src/App.tsx)
  └── React + Tailwind UI with Instant Toggle Switch
```

---

## 🧪 Unit Tests

```bash
$ bun run test

 ✓ src/__tests__/content.test.ts (11 tests)
 ✓ src/__tests__/App.test.tsx (8 tests)

 Test Files  2 passed (2)
      Tests  19 passed (19)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

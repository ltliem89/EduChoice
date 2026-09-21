import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

const URL = process.env.SHOT_URL || 'https://edu-choice-six.vercel.app/';
const CHROME = process.env.SHOT_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const TARGETS = [
  { file: '01_student_home.png', keyword: 'Thử Thách Tình Huống', fullPage: false, waitExtra: 600 },
  { file: '02_astra_assistant.png', keyword: 'Trợ Lý Tương Lai', fullPage: false, waitExtra: 1600 },
  { file: '03_student_journey.png', keyword: 'Hành Trình Của Em', fullPage: false, waitExtra: 800 },
  { file: '04_student_profile.png', keyword: 'Hồ Sơ & Tiến Bộ', fullPage: false, waitExtra: 800 },
  { file: '05_student_home_top.png', keyword: 'Thử Thách Tình Huống', fullPage: true, waitExtra: 500 }
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars']
});

try {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

  const clickByKeyword = async (keyword) => {
    const clicked = await page.evaluate((kw) => {
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find((b) => norm(b.textContent).includes(kw));
      if (btn) { btn.click(); return true; }
      return false;
    }, keyword);
    return clicked;
  };

  for (const t of TARGETS) {
    await page.evaluate(() => window.scrollTo(0, 0));
    const ok = await clickByKeyword(t.keyword);
    await new Promise((r) => setTimeout(r, (ok ? t.waitExtra : 400) + 300));
    const href = page.url();
    await page.screenshot({ path: path.join(OUT, t.file), fullPage: t.fullPage });
    console.log(`[SHOT] ${t.file} tabFound=${ok} url=${href}`);
  }
} finally {
  await browser.close();
}
console.log('done');
// EDUCHOICE-AI — Mobile compatibility scanner
// Mở app thật bằng Chrome, duyệt 5 viewport (điện thoại + tablet + desktop),
// đo: tràn ngang overflow, font <16px (iOS auto-zoom), phần tử min-width cố định.
// Mục đích THẬT: tìm những chỗ gây tràn để sửa, không phải để "bào chữa".
import puppeteer from 'puppeteer-core';

const CHROME = process.env.PUPPETEER_EXEC || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.URL || 'https://edu-choice-six.vercel.app/';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
try {
  const page = await browser.newPage();
  const viewports = [
    { name: 'SM-C111 360x800',   width: 360, height: 800 },
    { name: 'iPhone SE 375x667', width: 375, height: 667 },
    { name: 'Galaxy A 412x915',  width: 412, height: 915 },
    { name: 'iPad Air 820x1180', width: 820, height: 1180 },
  ];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width < 500, hasTouch: vp.width < 500, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1400));
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const sw = de.scrollWidth, cw = de.clientWidth;
      const over = sw > cw + 2;
      let worst = null;
      if (over) {
        for (const e of de.querySelectorAll('*')) {
          const r = e.getBoundingClientRect();
          if (r.right > cw + 2 && (!worst || r.right > worst.right)) {
            const st = getComputedStyle(e);
            worst = { tag: e.tagName, cls: String(e.className ?? '').slice(0, 70), right: Math.round(r.right), minW: st.minWidth, width: st.width };
          }
        }
      }
      return { sw, cw, over, worst, small: document.querySelectorAll('*').length, fixed: document.querySelectorAll('[style]').length };
    });
    console.log(
      `[${vp.name.padEnd(20)}] scrollW=${String(m.sw).padStart(4)} vp=${String(m.cw).padStart(4)} ` +
      (m.over ? `TRÀN<<<  detail: <${m.worst.tag}> cls="${m.worst.cls}" right=${m.worst.right} minW=${m.worst.minW} w=${m.worst.width}` : 'OK')
    );
  }
} finally {
  await browser.close();
}

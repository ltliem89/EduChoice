// Xác định thủ phạm làm tràn ngang — bản tìm ancestor, chạy ở viewport 360
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXEC, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto(process.env.URL, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1600));
  const r = await page.evaluate(() => {
    const cw = document.documentElement.clientWidth;
    // nhiều khả năng có max-width/min-width ~ "391px" do vw/px
    const suspects = [];
    for (const e of document.querySelectorAll('*')) {
      const st = getComputedStyle(e);
      if (st.position === 'fixed') continue;
      const mw = parseFloat(st.minWidth), w = parseFloat(st.width);
      if ((mw >= 350 || w >= 350) && (st.minWidth !== 'auto' || Math.abs(w - cw) > 20)) {
        suspects.push({ tag: e.tagName, cls: String(e.className || '').slice(0, 55), mw: st.minWidth, w: st.width, right: Math.round(e.getBoundingClientRect().right) });
      }
    }
    suspects.sort((a, b) => b.right - a.right);
    return { cw, suspects: suspects.slice(0, 8) };
  });
  console.log(`clientW=${r.cw}`);
  r.suspects.forEach((s, i) => console.log(`  #${i + 1} <${s.tag}> cls="${s.cls}" minW="${s.mw}" w="${s.w}" right=${s.right}`));
} finally {
  await browser.close();
}
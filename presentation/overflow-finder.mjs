// Finder thực sự: element nào kéo documentElement.scrollWidth lên (tràn ngang) trên viewport 360/375
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { existsSync } from 'node:fs';

const CHROME = process.env.PUPPETEER_EXEC;
const URL = process.env.URL;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
try {
  const page = await browser.newPage();
  for (const vp of [
    { name: '360', width: 360, height: 800 },
    { name: '375', width: 375, height: 667 },
  ]) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1600));
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const cw = de.clientWidth, sw = de.scrollWidth;
      const widthTakers = [];
      for (const e of de.querySelectorAll('*')) {
        const st = getComputedStyle(e);
        if (st.position === 'fixed') continue;
        const r = e.getBoundingClientRect();
        // chính là element quyết định scrollWidth: right sát sw, không nằm trong container overflow-hidden
        if (Math.abs(r.right - sw) < 3) {
          let anc = e.parentElement; let clipped = false;
          while (anc) { if (getComputedStyle(anc).overflowX === 'hidden') { clipped = true; break; } if (anc === de) break; anc = anc.parentElement; }
          if (!clipped) {
            widthTakers.push({ tag: e.tagName, cls: String(e.className || '').slice(0, 56), width: st.width, minW: st.minWidth, ml: st.marginLeft, mr: st.marginRight, pl: st.paddingLeft, pr: st.paddingRight, right: Math.round(r.right), left: Math.round(r.left) });
          }
        }
      }
      return { cw, sw, widthTakers };
    });
    console.log(`=== ${vp.name}px: clientW=${m.cw} scrollW=${m.sw} (${m.sw > m.cw ? 'TRÀN ' + (m.sw - m.cw) + 'px' : 'OK'}) ===`);
    if (m.widthTakers.length === 0) console.log('  (không phân lập: nguyên nhân là margin âm/max-width cha — thử compare với 1280)');
    m.widthTakers.forEach((o, i) => console.log(`  #${i + 1} <${o.tag}> right=${o.right} width="${o.width}" minW="${o.minW}" ml="${o.ml}" mr="${o.mr}" pl="${o.pl}" pr="${o.pr}" cls="${o.cls}"`));
  }
} finally {
  await browser.close();
}

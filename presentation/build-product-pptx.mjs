// EDUCHOICE-AI — PRODUCT PRESENTATION BUILDER (HS lớp 9)
// 15 slides · Font: Times New Roman · MIN fontSize = 16 · icons per unit · colours per section · real screenshots
// Storyline (bám đúng 9 mục yêu cầu): vấn đề → nghiên cứu → ứng dụng đã có → khoảng trống
// → điểm mới/ý tưởng → sơ đồ chức năng cơ bản → sơ đồ chi tiết → công nghệ → hiệu quả → tiềm năng.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PptxGenJS from 'pptxgenjs';
import { PROJECT_VERSION } from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'dist', 'presentation');
const ASSETS = path.resolve(__dirname, 'assets');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 13.333;
const H = 7.5;
const FONT = 'Times New Roman';
const PAD = 0.45;
const MIN_SIZE = 16;
const TOTAL = 15;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: W, height: H });
pptx.layout = 'WIDE';
pptx.author = 'Học sinh lớp 9 — EduChoice-AI';
pptx.title = 'EduChoice-AI v3 — Trợ lý nhìn thấy cách em học, cách em sống';
pptx.subject = 'Bài trình bày sản phẩm — Khoa học Kỹ thuật';

const C = {
  ink: '1E2440', soft: '5A6278', line: 'CFD6F0', bg: 'FFFFFF', bgSoft: 'F5F7FF',
  violet: '6B4EFF', violetDark: '3D2B99', blue: '2E7DE4', teal: '12967F',
  green: '2BB673', orange: 'F5A623', red: 'E4572E', pink: 'E24BA6',
  lavender: 'EDEBFB', mint: 'EAF7F0', cream: 'FFF6E6', blush: 'FDEEF6', ice: 'E8F1FD',
  white: 'FFFFFF'
};
const STEPS = ['#f5a623', '#ffd166', '#06d6a0', '#118ab2', '#2e7de4', '#6b4eff', '#8338ec', '#e4572e', '#e24ba6', '#2bb673'];

let page = 0;

function assertSize(s) { if (s < MIN_SIZE) throw new Error(`Font < 16pt (${s})`); }

// Đậm hoá màu (hệ số <1) để chữ TRẮNG đặt lên đạt tương phản cao (WCAG).
function darken(hex, f = 0.62) {
  const n = parseInt((hex || '').replace('#', ''), 16);
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const tx = (slide, text, x, y, w, h, size, opts = {}) => {
  assertSize(size);
  slide.addText(text, {
    x, y, w, h,
    fontSize: size, bold: opts.bold ?? false, italic: opts.italic ?? false,
    color: opts.color ?? C.ink, fontFace: FONT,
    align: opts.align ?? 'left', valign: opts.valign ?? 'middle',
    charSpacing: opts.cs ?? 0, wrap: opts.wrap ?? true, lineSpacingMultiple: opts.lsm ?? 1.0,
    fit: opts.fit ?? 'shrink'
  });
};

function bg(slide) {
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: C.bgSoft }, line: { type: 'none' } });
  slide.addShape('rect', { x: 0, y: 0, w: W, h: 0.05, fill: { color: C.violet }, line: { type: 'none' } });
}

function sectionChip(slide, label, color, width) {
  slide.addShape('roundRect', { x: PAD, y: 0.3, w: width, h: 0.46, rectRadius: 0.1, fill: { color: darken(color) }, line: { type: 'none' } });
  tx(slide, label, PAD, 0.3, width, 0.46, 16, { bold: true, color: C.white, align: 'center' });
}

function title(slide, text, opts = {}) {
  tx(slide, text, PAD, opts.y ?? 0.9, W - PAD * 2, opts.h ?? 0.72, opts.size ?? 24, { bold: true, color: C.ink, fit: 'shrink', ...opts });
}

function card(slide, x, y, w, h, fill = C.white, line = C.line) {
  slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: line } });
}

function chip(slide, glyph, label, x, y, w, h, color, opts = {}) {
  const gs = opts.glyphSize ?? Math.min(h * 0.55 * 72, 28);
  const fill = opts.fill ?? darken(color);
  const fgN = opts.fg ?? C.white;
  slide.addShape('roundRect', { x, y, w, h, rectRadius: Math.min(0.16, h * 0.18), fill: { color: fill }, line: { type: 'none' } });
  if (glyph) tx(slide, glyph, x + 0.04, y - 0.01, h - 0.04, h, gs, { bold: true, color: fgN, align: 'center', valign: 'middle' });
  if (label) tx(slide, label, x + (glyph ? h + 0.1 : 0.18), y, w - (glyph ? h + 0.14 : 0.3), h, opts.size ?? 16, {
    bold: opts.bold ?? true, color: opts.color ?? C.white, valign: 'middle', align: opts.align ?? 'left', lsm: opts.lsm ?? 1.02
  });
}

function vcard(slide, x, y, w, h, head, color, body) {
  card(slide, x, y, w, h, C.white, color);
  slide.addShape('rect', { x, y, w, h: 0.52, fill: { color: darken(color) }, line: { type: 'none' } });
  tx(slide, head, x + 0.18, y, w - 0.3, 0.52, 17, { bold: true, color: C.white, valign: 'middle' });
  tx(slide, body, x + 0.18, y + 0.62, w - 0.36, h - 0.72, 16, { color: C.ink, valign: 'top', lsm: 1.05 });
}

function arrowR(slide, x, y, w, h, color = C.blue) {
  slide.addShape('rightArrow', { x, y, w, h, fill: { color }, line: { type: 'none' } });
}
function arrowD(slide, x, y, w, h, color = C.blue) {
  slide.addShape('downArrow', { x, y, w, h, fill: { color }, line: { type: 'none' } });
}

function footer(slide, note) {
  slide.addShape('rect', { x: PAD, y: 7.02, w: W - PAD * 2, h: 0.014, fill: { color: C.line }, line: { type: 'none' } });
  tx(slide, note ?? `EduChoice-AI v${PROJECT_VERSION} · mọi số liệu đo trực tiếp từ repo & app online`, PAD, 7.08, 9.6, 0.3, 16, { color: C.soft, valign: 'middle' });
  tx(slide, `${page} / ${TOTAL}`, W - 2.2, 7.08, 1.75, 0.3, 16, { color: C.violet, align: 'right', valign: 'middle', bold: true });
}

// S1 · COVER
{
  const s = pptx.addSlide();
  page += 1;
  s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: C.ink }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: H - 1.15, w: W, h: 1.15, fill: { color: C.violet }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: 0.1, w: W, h: 0.05, fill: { color: C.orange }, line: { type: 'none' } });
  tx(s, 'CUỘC THI KHOA HỌC KỸ THUẬT · HỌC SINH LỚP 9', 8.0, 0.5, 4.9, 0.5, 16, { bold: true, color: C.cream, align: 'right' });
  tx(s, 'EduChoice-AI v3', 0.7, 1.1, 8.5, 0.95, 46, { bold: true, color: C.white });
  tx(s, 'Trợ lý nhìn thấy cách em học — cách em sống', 0.7, 2.25, 11.9, 0.8, 26, { bold: true, italic: true, color: C.white, lsm: 1.1 });
  tx(s, 'Một nền tảng giúp học sinh tự nhận ra thói quen học tập – sinh hoạt của chính mình và cải thiện từng ngày bằng AI thích ứng có kiểm soát.', 0.7, 3.35, 11.9, 0.85, 18, { color: C.cream, italic: true, lsm: 1.12 });
  const pillars = [
    { icon: '★', color: C.teal, head: 'NHÌN THẤY', body: 'Đo hành vi thật khi chơi tình huống — thấy nhịp học, cân bằng, sức khoẻ của mình' },
    { icon: '◉', color: C.violet, head: 'ĐƯỢC TRỢ LÝ AI', body: 'ASTRA-2050 thân thiện: dự báo, gợi ý bước nhỏ — AI chỉ đề xuất, con người quyết định' },
    { icon: '✓', color: C.orange, head: 'AN TOÀN & THẬT', body: 'Không chấm điểm, không phán xét · mọi con số đều thật, demo gắn nhãn rõ ràng' }
  ];
  pillars.forEach((p, i) => {
    const x = 0.7 + i * 4.12, w = 3.92, y = 4.45, h = 1.55;
    card(s, x, y, w, h, '1E2A4A', '2A3766');
    chip(s, p.icon, p.head, x + 0.16, y + 0.16, 1.9, 0.5, p.color, { size: 17 });
    tx(s, p.body, x + 0.22, y + 0.76, w - 0.44, 0.72, 16, { color: C.cream, lsm: 1.06 });
  });
  const chips = [['14', 'kịch bản game'], ['13', 'micro-action hỗ trợ'], ['20', 'kỹ năng theo dõi'], ['09', 'mục trình bày']];
  chips.forEach((c, i) => {
    const x = 0.7 + i * 1.72;
    tx(s, c[0], x, 6.62, 0.62, 0.44, 20, { bold: true, color: C.white, align: 'center' });
    tx(s, c[1], x + 0.55, 6.66, 1.15, 0.4, 16, { color: C.cream });
  });
  tx(s, 'Sản phẩm làm bởi học sinh lớp 9 · code có kiểm soát', 8.2, 6.64, 4.7, 0.42, 16, { color: C.cream, align: 'right' });
  s.addNotes('Chào Hội đồng. Em xin trình bày sản phẩm EduChoice-AI v3 — nền tảng giúp học sinh nhìn thấy cách mình học và sống, rồi tự cải thiện từng ngày.');
}

// S2 · AGENDA — 9 mục (đúng trình tự bài trình bày)
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'LỘ TRÌNH', C.violet, 2.2);
  title(s, 'Chín mục của bài trình bày');
  const items = [
    ['1', 'Phát hiện vấn đề', 'Vì sao cần sản phẩm này', C.teal],
    ['2', 'Nghiên cứu tổng quan', 'Cơ sở khoa học đã đọc', C.blue],
    ['3', 'Ứng dụng đã có', 'Đã có gì trên thị trường', C.violet],
    ['4', 'Khoảng trống khoa học', 'Chỗ trống cần lấp', C.red],
    ['5', 'Điểm mới & ý tưởng', 'Ý tưởng hoàn thiện sản phẩm', C.orange],
    ['6', 'Sơ đồ chức năng cơ bản', 'Cách sản phẩm hoạt động', C.green],
    ['7', 'Sơ đồ chi tiết', 'Từng bộ phận bên trong', C.pink],
    ['8', 'Công nghệ đã dùng', 'Công cụ xây dựng', C.blue],
    ['9', 'Hiệu quả & tiềm năng', 'Kết quả và hướng đi', C.violetDark]
  ];
  const colX = [PAD, PAD + 4.24, PAD + 8.48];
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = colX[col], y = 1.85 + row * 1.3;
    chip(s, it[0], it[1], x, y, 3.95, 0.56, it[3], { size: 18 });
    tx(s, it[2], x + 0.7, y + 0.6, 3.0, 0.5, 16, { color: C.soft });
  });
  card(s, PAD, 6.02, 12.43, 0.78, C.lavender, C.violet);
  tx(s, 'TINH THẦN: mỗi con số trong bài đều đo được, mỗi tính năng đều chạy được — bạn có thể tự mở app để kiểm tra.', PAD + 0.25, 6.02, 11.9, 0.78, 17, { bold: true, color: C.violetDark, valign: 'middle', align: 'center', lsm: 1.06 });
  footer(s);
  s.addNotes('Giới thiệu 9 mục: vấn đề → nghiên cứu → app đã có → khoảng trống → ý tưởng → sơ đồ → công nghệ → hiệu quả → tiềm năng.');
}

// S3 · MỤC 1 — PHÁT HIỆN VẤN ĐỀ
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '1 · PHÁT HIỆN VẤN ĐỀ', C.teal, 2.6);
  title(s, 'Vấn đề thật của học sinh');
  const probs = [
    ['★', 'Biết nhưng khó làm', 'Nhận ra cách nên học — nhưng hành vi đời thực vẫn không đổi. Đó là "khoảng cách ý–hành động".', C.teal],
    ['⚙', 'Lời khuyên chung chung', 'Cùng một lời khuyên cho mọi bạn, không theo dõi tiến bộ của riêng mình.', C.violet],
    ['⏱', 'Lo thi cử và căng thẳng', 'Áp lực học tập tăng cao — cần nơi nhận ra và tự điều chỉnh nhẹ nhàng, không phán xét.', C.blue],
    ['⚠', 'AI thiếu kiểm soát', 'Nhiều ứng dụng tự "chẩn đoán" học sinh — nguy hiểm. Cần AI chỉ đề xuất, con người quyết định.', C.red]
  ];
  probs.forEach((p, i) => {
    const y = 1.82 + i * 1.16, h = 1.02;
    card(s, PAD, y, 6.55, h, 'FFFFFF', p[3]);
    chip(s, p[0], p[1], PAD + 0.16, y + 0.18, 2.55, 0.5, p[3], { size: 17 });
    tx(s, p[2], PAD + 0.22, y + 0.56, 6.1, 0.42, 16, { color: C.soft, lsm: 1.04 });
  });
  card(s, 7.35, 1.82, 5.53, 1.55, C.violetDark, C.violet);
  tx(s, 'CÂU HỎI THIẾT KẾ', 7.55, 1.98, 5.1, 0.4, 16, { bold: true, color: C.orange });
  tx(s, 'Làm sao để học sinh NHÌN THẤY cách mình học & sống — rồi tự cải thiện từng ngày, với dữ liệu thật?', 7.55, 2.42, 5.1, 0.82, 17, { bold: true, color: C.white, lsm: 1.1 });
  vcard(s, 7.35, 3.55, 5.53, 1.0, 'MỤC TIÊU', C.green, 'Không chấm điểm, không phán xét — giúp mỗi bạn tự nhận ra.');
  vcard(s, 7.35, 4.66, 5.53, 1.0, 'CÁCH TIẾP CẬN', C.orange, 'Chơi tình huống → đo hành vi → trợ lý AI gợi ý → làm thật ngoài đời.');
  card(s, 7.35, 5.77, 5.53, 0.85, C.cream, C.orange);
  tx(s, 'Nói thật: sản phẩm để ĐỒNG HÀNH, không để "mách" hay đòi điểm số.', 7.55, 5.77, 5.13, 0.85, 16, { color: C.ink, lsm: 1.05, valign: 'middle' });
  footer(s);
  s.addNotes('Mục 1: nêu 4 vấn đề — biết mà không làm; lời khuyên chung chung; áp lực thi cử; AI thiếu kiểm soát.');
}

// S4 · MỤC 2 — NGHIÊN CỨU TỔNG QUAN: CƠ SỞ KHOA HỌC
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '2 · NGHIÊN CỨU TỔNG QUAN', C.blue, 3.0);
  title(s, 'Cơ sở khoa học em đã đọc');
  const lit = [
    ['1', 'JITAI & MRT — can thiệp đúng lúc', 'Dùng thử nghiệm ngẫu nhiên nhỏ để đo từng phản hồi đúng thời điểm. Nhóm em áp dụng tư duy "hỏi gì, đo nấy".', C.teal],
    ['2', 'CASEL 5 ➜ 20 kỹ năng tâm lý', 'Khung năng lực xã hội–cảm xúc (SEL) quốc tế. Sản phẩm cụ thể hoá thành 20 "construct" theo dõi bằng dữ liệu.', C.violet],
    ['3', 'Đo từ hành vi, không hỏi', 'Rhythm đo phản xạ 90 giây/ngày, so với baseline CỦA CHÍNH mình — vì học sinh 11–14 tuổi hay hạ thấp mức căng thẳng khi tự khai.', C.blue]
  ];
  lit.forEach((l, i) => {
    const y = 1.85 + i * 1.42, h = 1.28;
    card(s, PAD, y, 6.9, h, C.lavender, l[3]);
    chip(s, l[0], l[1], PAD + 0.16, y + 0.16, 4.4, 0.5, l[3], { size: 16 });
    tx(s, l[2], PAD + 0.22, y + 0.66, 6.45, 0.56, 16, { color: C.ink, lsm: 1.05, wrap: true });
  });
  vcard(s, 7.55, 1.85, 5.33, 1.9, 'HÀNH LANG VIỆT NAM (MỚI)', C.orange,
    'Thông tư 18/2025/TT-BGDĐT về sức khoẻ tâm thần học đường: hotline 111, đồng thuận phụ huynh (Mẫu 01/03), quy trình có lộ trình rõ ràng.');
  vcard(s, 7.55, 3.95, 5.33, 1.9, 'CẢNH BÁO 5 MỨC ĐỘ', C.teal,
    'Normal ➜ Watch ➜ Concern ➜ Urgent ➜ Critical. Không bao giờ hiện "điểm số thô" cho học sinh — chỉ là tín hiệu để trò chuyện.');
  tx(s, 'Nguồn: docs/PSYCHOLOGY_SUPPORT_BENCHMARK.md — 24 tài liệu & nền tảng được khảo sát, trích dẫn đầy đủ trong repo.', PAD, 6.35, 12.4, 0.4, 16, { color: C.soft, italic: true, align: 'center' });
  footer(s);
  s.addNotes('Mục 2a: JITAI/MRT, khung CASEL SEL, và nguyên tắc "đo từ hành vi" theo bài học của Rhythm. Kèm hành lang pháp lý Việt Nam — Thông tư 18/2025.');
}

// S5 · MỤC 3 — ỨNG DỤNG ĐÃ CÓ TRÊN THỊ TRƯỜNG
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '3 · ỨNG DỤNG ĐÃ CÓ', C.violet, 2.6);
  title(s, 'Em khảo sát 4 nền tảng hỗ trợ học sinh');
  tx(s, 'Đã benchmark trong repo · thời điểm 2026', PAD, 1.7, 12.4, 0.4, 17, { bold: true, color: C.ink });
  const apps = [
    ['Rhythm Mental Health', 'Task nhận thức 90 giây/ngày, so baseline cá nhân.', 'Còn thiếu: chỉ tiếng Anh, cần thiết bị, không có game tình huống.', C.blue],
    ['Goodin Class', 'Mood check-in 30 giây, AI tìm xu hướng cảm xúc.', 'Còn thiếu: dựa vào tự khai, ít kịch bản tương tác.', C.teal],
    ['Menthra Compass', 'Bạn AI 24/7, phát hiện khủng hoảng gần như thật.', 'Còn thiếu: nặng phần khẩn cấp, ít rèn thói quen hàng ngày.', C.red],
    ['CalmSpace EDU', 'Mood check-in, bộ lọc an toàn 5 mức độ.', 'Còn thiếu: dựa self-report, chưa có phiên bản tiếng Việt.', C.orange]
  ];
  apps.forEach((a, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = PAD + col * 6.3, y = 2.2 + row * 1.72, w = 6.08, h = 1.56;
    card(s, x, y, w, h, C.white, a[3]);
    s.addShape('rect', { x, y, w, h: 0.5, fill: { color: darken(a[3]) }, line: { type: 'none' } });
    tx(s, a[0], x + 0.18, y, w - 0.34, 0.5, 17, { bold: true, color: C.white, valign: 'middle' });
    tx(s, '✓ ' + a[1], x + 0.18, y + 0.58, w - 0.36, 0.44, 16, { color: C.ink, valign: 'middle', lsm: 1.02 });
    tx(s, '✕ ' + a[2], x + 0.18, y + 1.02, w - 0.36, 0.48, 16, { color: C.red, valign: 'middle', lsm: 1.02 });
  });
  card(s, PAD, 5.78, 12.43, 1.02, C.violetDark, C.violet);
  tx(s, 'KẾT LUẬN KHẢO SÁT: chưa có nền tảng nào kết hợp game tiếng Việt + đo hành vi thật + AI có kiểm soát + micro-action ngoài đời — đó là chỗ của EduChoice-AI.', PAD + 0.28, 5.78, 11.9, 1.02, 17, { bold: true, color: C.white, valign: 'middle', lsm: 1.08, align: 'center' });
  footer(s);
  s.addNotes('Mục 3: so sánh 4 nền tảng đã benchmark. Kết luận: chưa ai kết hợp đủ 4 yếu tố mà nhóm chọn làm trọng tâm.');
}

// S6 · MỤC 4 — KHOẢNG TRỐNG KHOA HỌC
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '4 · KHOẢNG TRỐNG KHOA HỌC', C.red, 3.1);
  title(s, 'Tám khoảng trống — tám cơ hội cho sản phẩm');
  const gaps = [
    ['G1', 'Wellness tổng hợp', 'Chưa có chỉ số sức khoẻ tổng — em đã xây WellnessIndex + cờ xanh/vàng/đỏ.', STEPS[0]],
    ['G2', 'Cảm xúc chưa phân tích', 'Reflection lưu thô — em nhận diện cảm xúc và sàng lọc từ khoá an toàn.', STEPS[1]],
    ['G3', 'Không đo vòng can thiệp', 'Không đo "can thiệp → phản hồi → thử lại" — em đo bằng telemetry trong game.', STEPS[2]],
    ['G4', 'Chống "nhờn" lời khuyên', 'Lặp lời khuyên mãi sẽ nhàm — em dùng dose cap khi lặp.', STEPS[3]],
    ['G5', 'Thiếu luồng con người', 'Khi cần có người giúp — em xây leo thang 5 mức: Normal ➜ Critical.', STEPS[4]],
    ['G6', 'Referral chưa đúng luật', 'Đồng thuận phụ huynh + hotline 111 cho trường hợp cần theo TT 18/2025.', STEPS[5]],
    ['G7', 'Số liệu phải THẬT', 'Demo gắn nhãn rõ, không hiển thị như kết quả nghiên cứu thật.', STEPS[6]],
    ['G8', 'Gắn khung chuẩn', 'Map CASEL 5 ↔ 20 kỹ năng để dễ đánh giá và mở rộng.', STEPS[7]]
  ];
  gaps.forEach((g, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = PAD + col * 3.16, y = 1.85 + row * 2.05, w = 2.95, h = 1.85;
    card(s, x, y, w, h, C.white, g[4]);
    s.addShape('rect', { x, y, w, h: 0.54, fill: { color: darken(g[4]) }, line: { type: 'none' } });
    tx(s, `${g[0]} · ${g[1]}`, x + 0.14, y, w - 0.28, 0.54, 16, { bold: true, color: C.white, valign: 'middle', align: 'left', lsm: 1.0 });
    tx(s, g[2], x + 0.15, y + 0.66, w - 0.3, 1.12, 16, { color: C.ink, valign: 'top', lsm: 1.06, wrap: true, fit: 'shrink' });
  });
  card(s, PAD, 5.9, 12.43, 0.9, darken(C.red), C.red);
  tx(s, '8 khoảng trống = 8 cơ hội — nhóm đã bắt tay xử lý từng cái một, ghi rõ trong docs/PSYCHOLOGY_SUPPORT_BENCHMARK.md', PAD + 0.28, 5.9, 11.9, 0.9, 17, { bold: true, color: C.white, valign: 'middle', align: 'center', lsm: 1.06 });
  footer(s);
  s.addNotes('Mục 4: 8 khoảng trống từ ma trận G1-G8 trong benchmark; mỗi cái đối chiếu với việc sản phẩm đã làm.');
}

// S7 · MỤC 5 — ĐIỂM MỚI & Ý TƯỞNG HOÀN THIỆN
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '5 · ĐIỂM MỚI & Ý TƯỞNG', C.orange, 2.9);
  title(s, 'Ba điểm mới — một ý tưởng hoàn thiện');
  const nov = [
    ['●', 'PHÁT HIỆN TỪ HÀNH VI', 'Đo telemetry thật khi chơi; so với baseline CỦA CHÍNH MÌNH, không so với bạn khác.', C.teal],
    ['◉', 'TRỢ LÝ TƯƠNG LAI ASTRA-2050', 'Hội thoại thân thiện, dự báo năng lượng, "bộ giáp chống quá tải" — AI chỉ đề xuất.', C.violet],
    ['✓', 'TRUNG THỰC NHƯ TÍNH NĂNG', 'Mọi số đo từ repo; demo gắn nhãn; không bao giờ "giả vờ thành công".', C.orange]
  ];
  nov.forEach((n, i) => {
    const x = PAD + i * 4.16, w = 3.95, y = 1.85, h = 1.95;
    card(s, x, y, w, h, 'FFFFFF', n[3]);
    s.addShape('rect', { x, y, w, h: 0.5, fill: { color: darken(n[3]) }, line: { type: 'none' } });
    tx(s, n[1], x + 0.18, y, w - 0.34, 0.5, 16, { bold: true, color: C.white, valign: 'middle' });
    tx(s, '• ' + n[2], x + 0.2, y + 0.6, w - 0.4, 1.28, 16, { color: C.ink, valign: 'top', lsm: 1.08, wrap: true });
  });
  card(s, PAD, 4.02, 12.43, 1.55, C.violetDark, C.violet);
  tx(s, 'Ý TƯỞNG HOÀN THIỆN — MỘT VÒNG KHÉP KÍN', PAD + 0.28, 4.14, 11.9, 0.4, 17, { bold: true, color: C.orange });
  tx(s, 'Chơi tình huống → Đo hành vi → Nhận ra bản thân → AI gợi ý bước nhỏ → Làm thật ngoài đời → Nhìn lại tiến bộ → Chơi tiếp.', PAD + 0.28, 4.58, 11.9, 0.88, 19, { bold: true, color: C.white, valign: 'middle', align: 'center', lsm: 1.12 });
  const notes = [
    ['▲', 'Con người quyết định cuối', C.green],
    ['♻', 'Mọi lời khuyên đều có lý do', C.blue],
    ['◈', 'Bạn kiểm chứng được bằng số liệu', C.pink]
  ];
  notes.forEach((n, i) => {
    const x = PAD + i * 4.16;
    chip(s, n[0], n[1], x, 5.82, 3.95, 0.55, n[2], { size: 17 });
  });
  footer(s);
  s.addNotes('Mục 5: 3 điểm mới là phát hiện bằng hành vi, trợ lý ASTRA-2050 và tính trung thực. Ý tưởng: vòng khép kín game–hành vi–cải thiện.');
}

// S8 · MỤC 6 — SƠ ĐỒ CHỨC NĂNG CƠ BẢN
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '6 · SƠ ĐỒ CHỨC NĂNG CƠ BẢN', C.green, 3.2);
  title(s, 'Sáu bước — một vòng lặp hàng ngày');
  const steps = [
    ['1', 'NHẬN DIỆN', 'telemetry hành vi'],
    ['2', 'PHÂN TÍCH', 'analytics cá nhân'],
    ['3', 'ĐỀ XUẤT', 'ASTRA-2050'],
    ['4', 'HÀNH ĐỘNG', 'micro-action'],
    ['5', 'ĐO LƯỜNG', 'phản hồi + transfer'],
    ['6', 'CẢI THIỆN', 'hồ sơ tiến bộ']
  ];
  const bw = 1.95, gap = 0.12, step = bw + gap, by = 1.95, bh = 1.12;
  steps.forEach((st, i) => {
    const x = PAD + i * step;
    card(s, x, by, bw, bh, 'FFFFFF', STEPS[i]);
    s.addShape('rect', { x, y: by, w: bw, h: 0.46, fill: { color: darken(STEPS[i]) }, line: { type: 'none' } });
    tx(s, st[0] + '  ' + st[1], x + 0.1, by, bw - 0.2, 0.46, 16, { bold: true, color: C.white, valign: 'middle', align: 'center' });
    tx(s, st[2], x + 0.1, by + 0.52, bw - 0.2, 0.54, 16, { color: C.ink, valign: 'middle', align: 'center', lsm: 1.0 });
    if (i < 5) arrowR(s, x + bw - 0.06, by + 0.46, 0.08 + gap * 0.9, 0.2, STEPS[i + 1]);
  });
  arrowD(s, PAD + 5 * step + bw - 0.1, by + bh - 0.02, 0.2, 0.22, C.violetDark);
  s.addShape('leftArrow', { x: PAD + 5 * step - 0.35, y: by + bh + 0.22, w: 5 * step + bw - 2.4, h: 0.2, fill: { color: C.violetDark }, line: { type: 'none' } });
  tx(s, '⟲ vòng lặp mỗi ngày — tiến bộ của hôm nay là "chất liệu" của lời khuyên ngày mai', PAD + 0.1, by + bh + 0.5, 8.0, 0.36, 16, { italic: true, color: C.soft });
  const notes = [
    ['◈', 'Không ở một mình', 'Trợ lý luôn bên cạnh', C.violet],
    ['✓', 'AI có kiểm soát', 'allow-list + fallback an toàn', C.green],
    ['▣', 'Số liệu của bạn', 'chỉ bạn & người được phép', C.blue],
    ['★', 'Hướng ra đời thật', 'mỗi ngày một việc nhỏ', C.orange]
  ];
  notes.forEach((n, i) => {
    const x = PAD + i * 3.16, w = 2.95, y = 4.35, h = 1.5;
    card(s, x, y, w, h, C.lavender, n[3]);
    tx(s, n[0], x + 0.16, y + 0.12, 0.5, 0.5, 20, { bold: true, color: n[3] });
    tx(s, n[1], x + 0.16, y + 0.68, w - 0.32, 0.42, 17, { bold: true, color: C.ink });
    tx(s, n[2], x + 0.16, y + 1.14, w - 0.32, 0.34, 16, { color: C.soft, lsm: 1.0 });
  });
  card(s, PAD, 6.12, 12.43, 0.68, C.mint, C.green);
  tx(s, 'Từ sơ đồ cơ bản này, em mở ra từng bộ phận chi tiết bên trong ở mục tiếp theo.', PAD + 0.28, 6.12, 11.9, 0.68, 17, { bold: true, color: C.ink, valign: 'middle', align: 'center', lsm: 1.05 });
  footer(s);
  s.addNotes('Mục 6: sơ đồ chức năng cơ bản — 6 bước trong một vòng lặp; minh hoạ nhắc "⟲" là chu kỳ mỗi ngày.');
}

// S9 · MỤC 7a — SƠ ĐỒ CHI TIẾT: GÓC NHÌN HỌC SINH
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '7 · SƠ ĐỒ CHI TIẾT — HỌC SINH', C.pink, 3.2);
  title(s, 'Năm bộ phận học sinh chạm hàng ngày');
  const mods = [
    ['▶', 'GAME THỬ THÁCH', '14 kịch bản thật, ví dụ "48 phút cuối" trước thi.', C.teal],
    ['◉', 'TRỢ LÝ ASTRA-2050', 'Hội thoại tương lai, dự báo năng lượng, chống quá tải.', C.violet],
    ['▧', 'PHÂN TÍCH HỌC & SỐNG', 'Nhịp học, cân bằng, wellness xanh/vàng/đỏ.', C.blue],
    ['➾', 'HÀNH TRÌNH CỦA EM', 'Khát vọng → vi-hành động → streak theo ngày.', C.orange],
    ['✓', 'HỒ SƠ & TIẾN BỘ', '20 kỹ năng, biểu đồ growth, xuất CSV để tự xem.', C.green]
  ];
  mods.forEach((m, i) => {
    const x = PAD + i * 2.53, w = 2.35, y = 1.95, h = 2.6;
    card(s, x, y, w, h, 'FFFFFF', m[4]);
    s.addShape('rect', { x, y, w, h: 0.5, fill: { color: darken(m[4]) }, line: { type: 'none' } });
    tx(s, m[1], x + 0.1, y, w - 0.2, 0.5, 16, { bold: true, color: C.white, valign: 'middle', align: 'center' });
    tx(s, m[0], x + 0.14, y + 0.66, w - 0.28, 0.6, 24, { bold: true, color: m[4] });
    tx(s, m[2], x + 0.14, y + 1.32, w - 0.28, 1.18, 16, { color: C.ink, valign: 'top', lsm: 1.06, wrap: true });
  });
  card(s, PAD, 4.85, 12.43, 0.78, C.blush, C.pink);
  tx(s, 'SỰ THẬT: mọi con số trên màn hình đều đến từ telemetry thật khi bạn chơi — không vẽ sẵn, không "đẹp cho có".', PAD + 0.28, 4.85, 11.9, 0.78, 17, { bold: true, color: C.ink, valign: 'middle', align: 'center', lsm: 1.05 });
  tx(s, 'Mỗi bộ phận ở trên được minh hoạ bằng ảnh chụp thật ở trang 11 của bài.', PAD, 5.85, 12.4, 0.4, 16, { color: C.soft, align: 'center' });
  footer(s);
  s.addNotes('Mục 7a: 5 bộ phận phía học sinh. Nhấn: tất cả số liệu đều từ hành vi thật, không dựng sẵn.');
}

// S10 · MỤC 7b — SƠ ĐỒ CHI TIẾT: NỀN TẢNG VÀ QUẢN TRỊ
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '7 · SƠ ĐỒ CHI TIẾT — NỀN TẢNG', C.blue, 3.2);
  title(s, 'Hai "phòng máy" giữ sản phẩm chạy đúng và an toàn');
  tx(s, 'NỀN TẢNG THÔNG MINH', PAD, 1.72, 6.1, 0.4, 18, { bold: true, color: C.blue });
  const plat = [
    ['⚙', 'Analytics engine', 'Nhịp học · resilience · cân bằng — từ file studentAnalytics.ts', C.blue],
    ['➾', 'Goal engine', 'Hành trình theo khát vọng, gợi vi-hành động', C.teal],
    ['◉', 'Rule engine + AI Gateway', 'Gemini CHỈ đề xuất: schema · allow-list · range · fallback', C.violet],
    ['▣', 'Data layer', '39 schema chuẩn (V9) · demo in-memory luôn báo đúng trạng thái', C.orange]
  ];
  plat.forEach((p, i) => {
    const y = 2.2 + i * 1.06, h = 0.96;
    card(s, PAD, y, 6.08, h, C.white, p[3]);
    chip(s, p[0], p[1], PAD + 0.14, y + 0.12, 3.0, 0.46, p[3], { size: 16 });
    tx(s, p[2], PAD + 0.2, y + 0.56, 5.68, 0.36, 16, { color: C.soft, lsm: 1.0 });
  });
  tx(s, 'AN TOÀN & QUẢN TRỊ', 6.95, 1.72, 6.0, 0.4, 18, { bold: true, color: C.red });
  const sec = [
    ['▲', 'Xác thực server-side', 'Role allow-list; "giả danh" SUPER_ADMIN → 403', C.red],
    ['✕', 'Chặn IDOR', 'Không thể đọc/ghi dữ liệu của bạn khác (403)', C.orange],
    ['▣', 'Nhật ký đầy đủ', '18_AI_DECISIONS · 31_AUDIT_LOG — truy vết được từng bước', C.violet],
    ['★', 'Leo thang 5 mức', 'Nút "Em cần trợ giúp" → tư vấn viên/gv theo đúng luật', C.green]
  ];
  sec.forEach((p, i) => {
    const y = 2.2 + i * 1.06, h = 0.96;
    card(s, 6.95, y, 6.08, h, C.white, p[3]);
    chip(s, p[0], p[1], 6.95 + 0.14, y + 0.12, 3.0, 0.46, p[3], { size: 16 });
    tx(s, p[2], 6.95 + 0.2, y + 0.56, 5.68, 0.36, 16, { color: C.soft, lsm: 1.0 });
  });
  card(s, PAD, 6.52, 12.43, 0.02 + 0.36, C.violetDark, C.violet);
  tx(s, 'OVERDIGHT — người quyết định cuối cùng là GIÁO VIÊN (con người), không phải AI.', PAD + 0.28, 6.52, 11.9, 0.36, 17, { bold: true, color: C.white, valign: 'middle', align: 'center' });
  footer(s, 'Oversight: giáo viên quyết định cuối · AI chỉ hỗ trợ đề xuất');
  s.addNotes('Mục 7b: nền tảng (analytics, goal, rule engine + AI gateway, data layer) và lớp an toàn/quản trị (xác thực, chống IDOR, nhật ký, leo thang).');
}

// S11 · MINH HOẠ GIAO DIỆN THẬT (ảnh chụp từ app online)
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'MINH HOẠ THẬT', C.violetDark, 2.4);
  title(s, 'Ảnh chụp trực tiếp từ phiên bản online');
  const shots = [
    ['01_student_home.png', 'Trang chủ — thử thách tình huống'],
    ['02_astra_assistant.png', 'Trợ lý tương lai ASTRA-2050'],
    ['03_student_journey.png', 'Hành trình của em'],
    ['04_student_profile.png', 'Hồ sơ & tiến bộ']
  ];
  shots.forEach((sh, i) => {
    const x = PAD + i * 3.06, w = 2.9, y = 1.95, h = 1.81;
    s.addImage({ path: path.join(ASSETS, sh[0]), x, y, w, h, sizing: { type: 'contain', w, h } });
    tx(s, sh[1], x + 0.1, y + h + 0.02, w - 0.2, 0.32, 16, { bold: true, color: C.ink, align: 'center', valign: 'middle' });
  });
  card(s, PAD, 4.45, 12.43, 0.85, C.lavender, C.violet);
  tx(s, 'Mở app thật tại: edu-choice-six.vercel.app — Hội đồng có thể tự kiểm chứng từng màn hình, từng con số ngay trong Q&A.', PAD + 0.28, 4.45, 11.9, 0.85, 17, { bold: true, color: C.violetDark, valign: 'middle', align: 'center', lsm: 1.06 });
  const tips = [
    ['▶', 'Cách dùng: chọn thử thách, chơi như ngày thường'],
    ['◉', 'Trợ lý: mở tab ASTRA-2050, trò chuyện ngay'],
    ['✓', 'Kiểm chứng: so sánh số trong app với lời em nói']
  ];
  tips.forEach((t, i) => {
    const x = PAD + i * 4.16;
    chip(s, t[0], t[1], x, 5.6, 3.95, 0.62, STEPS[i + 1], { size: 16 });
  });
  footer(s, 'Ảnh chụp 2026 bằng Chrome headless · app đang chạy trên Vercel');
  s.addNotes('Trang minh hoạ: 4 ảnh chụp thật. Luôn nhắc Hội đồng có thể tự mở app để kiểm chứng.');
}

// S12 · MỤC 8 — CÔNG NGHỆ ĐÃ DÙNG
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '8 · CÔNG NGHỆ ĐÃ DÙNG', C.blue, 2.8);
  title(s, 'Tám công nghệ cốt lõi');
  const tech = [
    ['◆', 'React + Vite + TypeScript', 'Giao diện nhanh, dễ bảo trì', C.teal],
    ['▤', 'Express API', 'Cổng kết nối dữ liệu', C.blue],
    ['◮', 'Recharts', 'Biểu đồ học & sống', C.violet],
    ['▣', 'IndexedDB · LocalStorage', 'Lưu hồ sơ ngay trên máy', C.orange],
    ['◉', 'Gemini AI (có kiểm soát)', 'Chỉ đề xuất + fallback an toàn', C.pink],
    ['↔', 'Apps Script · Google Sheets', 'Đồng bộ dữ liệu thật — bước kế tiếp', C.green],
    ['▤', 'PptxGenJS', 'Bài trình bày này được tạo bằng code', C.red],
    ['☁', 'Vercel', 'Triển khai online cho cả trường dùng', C.violetDark]
  ];
  tech.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = PAD + col * 3.13, y = 1.95 + row * 1.62, w = 2.95, h = 1.46;
    card(s, x, y, w, h, C.white, t[4]);
    tx(s, t[0], x + 0.14, y + 0.1, 0.5, 0.5, 20, { bold: true, color: t[4] });
    tx(s, t[1], x + 0.14, y + 0.62, w - 0.28, 0.4, 16, { bold: true, color: C.ink, lsm: 1.0, wrap: true });
    tx(s, t[2], x + 0.14, y + 1.05, w - 0.28, 0.38, 16, { color: C.soft, lsm: 1.0, wrap: true });
  });
  card(s, PAD, 5.42, 12.43, 0.86, C.mint, C.green);
  tx(s, 'TẤT CẢ ghi rõ trong package.json của repo — em dùng gì nêu nấy, không thổi phồng, không mượn công nghệ viển vông.', PAD + 0.28, 5.42, 11.9, 0.86, 17, { bold: true, color: C.ink, valign: 'middle', align: 'center', lsm: 1.06 });
  footer(s);
  s.addNotes('Mục 8: 8 công nghệ, mỗi cái có vai trò cụ thể, đều kê khai trong package.json.');
}

// S13 · MỤC 9a — HIỆU QUẢ ỨNG DỤNG
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '9 · HIỆU QUẢ ỨNG DỤNG', C.green, 2.7);
  title(s, 'Điều đo được — và điều chưa dám khẳng định');
  const stats = [
    ['18 / 20', 'bước kiểm thử E2E chạy thật', 'đo trực tiếp từ repo năm 2026', C.green],
    ['403', 'chặn giả danh & IDOR', 'bảo mật phía server', C.red],
    ['●▲■', 'wellness theo dữ liệu thật', 'cờ xanh/vàng/đỏ từ telemetry', C.blue],
    ['24/7', 'trợ lý ASTRA-2050 bên bạn', 'dự báo từ lịch sử của chính bạn', C.violet]
  ];
  stats.forEach((st, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = PAD + col * 3.15, y = 1.95 + row * 1.55, w = 2.95, h = 1.4;
    card(s, x, y, w, h, 'FFFFFF', st[3]);
    tx(s, st[0], x + 0.14, y + 0.08, w - 0.28, 0.5, 20, { bold: true, color: darken(st[3]) });
    tx(s, st[1], x + 0.14, y + 0.6, w - 0.28, 0.4, 16, { bold: true, color: C.ink, lsm: 1.0 });
    tx(s, st[2], x + 0.14, y + 1.0, w - 0.28, 0.36, 16, { color: C.soft, lsm: 1.0 });
  });
  const eff = [
    ['THẤY CHÍNH MÌNH', 'Số liệu riêng giúp chủ động cải thiện, không chờ ai nhắc.', C.green],
    ['AN TOÀN TÂM LÝ', 'Không chấm điểm, không phán xét; luôn có nút trợ giúp.', C.teal],
    ['KHÔNG BỊ LỪA', 'Demo gắn nhãn rõ; chỉ số THẬT mới hiển thị như kết quả.', C.orange]
  ];
  eff.forEach((e, i) => {
    const y = 1.95 + i * 1.55, h = 1.4;
    vcard(s, 7.0, y, 5.9, h, e[0], e[2], e[1]);
  });
  card(s, PAD, 6.5, 12.43, 0.44, C.cream, C.orange);
  tx(s, 'NÓI THẬT: em dám khẳng định "hệ thống vận hành đúng & trung thực". Em TỪ CHỐI khẳng định "tăng điểm" — vì chưa có thực nghiệm với học sinh thật.', PAD + 0.2, 6.5, 12.03, 0.44, 16, { bold: true, color: C.ink, valign: 'middle', lsm: 1.05 });
  footer(s);
  s.addNotes('Mục 9a: nêu con số đo được (E2E 18/20, 403, wellness, ASTRA). Quan trọng nhất là dòng trung thực ở đáy slide.');
}

// S14 · MỤC 9b — TIỀM NĂNG & CẢI TIẾN SẮP TỚI
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, '9 · TIỀM NĂNG & CẢI TIẾN', C.violetDark, 3.0);
  title(s, 'Hướng đi tiếp theo của sản phẩm');
  tx(s, 'TIỀM NĂNG PHÁT TRIỂN', PAD, 1.72, 6.1, 0.4, 18, { bold: true, color: C.green });
  const pot = [
    ['◆', 'Dữ liệu thật dài hạn', 'Nối Google Sheets → phân tích cả năm học.', C.green],
    ['☺', 'Giọng nói thân thiện', 'Trả lời và nhắc nhở bằng giọng nói tự nhiên.', C.blue],
    ['✱', 'Góc phụ huynh & giáo viên', 'Nhìn bức tranh tổng quan, không "mách" chi tiết.', C.violet],
    ['➹', 'Mở rộng THPT · đa ngôn ngữ', 'Tiếng Việt trước, thêm ngôn ngữ sau.', C.orange]
  ];
  pot.forEach((p, i) => {
    const y = 2.2 + i * 1.05, h = 0.92;
    card(s, PAD, y, 6.08, h, C.white, p[3]);
    chip(s, p[0], p[1], PAD + 0.14, y + 0.1, 3.2, 0.44, p[3], { size: 16 });
    tx(s, p[2], PAD + 0.2, y + 0.52, 5.68, 0.36, 16, { color: C.soft, lsm: 1.0 });
  });
  tx(s, 'CẢI TIẾN SẮP TỚI (ROADMAP)', 6.95, 1.72, 6.0, 0.4, 18, { bold: true, color: C.blue });
  const imp = [
    ['★', 'Thực nghiệm A/B/C', 'n ≥ 20 bạn mỗi nhóm để chứng minh hiệu quả.', C.blue],
    ['✓', 'Đồng thuận đúng luật', 'Thông tư 18/2025 + hotline 111 đầy đủ.', C.teal],
    ['⚙', 'Đóng gap kỹ thuật T06/T09', 'Ghi can thiệp + log AI cho mọi phiên.', C.violet],
    ['◈', 'Cảnh báo sớm 3–4 tuần', 'Phát hiện sớm từ telemetry, theo mô hình Rhythm.', C.orange]
  ];
  imp.forEach((p, i) => {
    const y = 2.2 + i * 1.05, h = 0.92;
    card(s, 6.95, y, 6.08, h, C.white, p[3]);
    chip(s, p[0], p[1], 6.95 + 0.14, y + 0.1, 3.2, 0.44, p[3], { size: 16 });
    tx(s, p[2], 6.95 + 0.2, y + 0.52, 5.68, 0.36, 16, { color: C.soft, lsm: 1.0 });
  });
  card(s, PAD, 6.25, 12.43, 0.66, C.violetDark, C.violet);
  tx(s, 'ƯỚC MƠ CỦA NHÓM: mỗi học sinh có một "tấm gương AI" — nhìn thấy chính mình, không phán xét, chỉ đồng hành.', PAD + 0.28, 6.25, 11.9, 0.66, 17, { bold: true, color: C.white, valign: 'middle', align: 'center', lsm: 1.05 });
  footer(s);
  s.addNotes('Mục 9b: tiềm năng phát triển và roadmap cải tiến — kết thúc bằng hình ảnh "tấm gương AI đồng hành".');
}

// S15 · KẾT LUẬN & CẢM ƠN
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'KẾT LUẬN', C.violetDark, 2.2);
  title(s, 'Tóm tắt ba dòng');
  const lines = [
    ['1 · VẤN ĐỀ', 'Biết mà không làm; các app cũ chỉ dạy kỹ năng, không đo hành vi thật của học sinh.', C.teal],
    ['2 · SẢN PHẨM', 'Vòng khép kín: game → hành vi → trợ lý AI có kiểm soát → vi-hành động đời thật; trung thực trong từng con số.', C.violet],
    ['3 · HÀNH TRÌNH TIẾP THEO', 'Dữ liệu thật + thực nghiệm A/B/C + an toàn theo Thông tư 18/2025.', C.orange]
  ];
  lines.forEach((l, i) => {
    const y = 1.9 + i * 1.28, h = 1.1;
    card(s, PAD, y, 12.43, h, C.lavender, l[2]);
    tx(s, l[0], PAD + 0.25, y, 4.9, h, 18, { bold: true, color: darken(l[2]), valign: 'middle' });
    tx(s, l[1], PAD + 2.8, y + 0.08, 9.4, h - 0.16, 16, { color: C.ink, valign: 'middle', lsm: 1.08 });
  });
  card(s, PAD, 5.9, 12.43, 0.6, C.white, C.line);
  tx(s, 'Nguồn: ① mã nguồn v3.0.0 chạy thật ② benchmark G1–G8 trong docs ③ ảnh chụp app online hôm nay.', PAD + 0.2, 5.9, 12.0, 0.6, 16, { color: C.soft, valign: 'middle', align: 'center', lsm: 1.05 });
  tx(s, 'Cảm ơn Hội đồng đã lắng nghe — em sẵn sàng mở app và trả lời mọi câu hỏi!', PAD, 6.66, 12.43, 0.46, 22, { bold: true, color: C.violetDark, align: 'center' });
  footer(s);
  s.addNotes('Kết luận ba dòng và lời cảm ơn. Mời Hội đồng dùng thử app trong Q&A.');
}

pptx.writeFile({ fileName: path.join(OUT_DIR, '02_EduChoice-AI_Product_Presentation_Lop9.pptx') }).then((f) => {
  console.log('[OK] 02_EduChoice-AI_Product_Presentation_Lop9.pptx');
  console.log('Slides generated:', page, '(target', TOTAL + ')');
});
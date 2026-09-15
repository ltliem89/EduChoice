// EDUCHOICE-AI — PPTX SCIENTIFIC PRESENTATION BUILDER (v2 - redesigned)
// 15 slides · Font: Times New Roman · MIN fontSize = 16 · no overlapping · icons per unit · product mockups · evidence tables

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PptxGenJS from 'pptxgenjs';
import {
  PROJECT_VERSION, E2E, AUDIT, SHEETS, CONTENT, QUALITY, V10_HEALTH, SECURITY, AI_CONTROL, FORMULAS, DECK
} from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'dist', 'presentation');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 13.333;
const H = 7.5;
const FONT = 'Times New Roman';
const PAD = 0.45;
const MIN_SIZE = 16;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: W, height: H });
pptx.layout = 'WIDE';
pptx.author = DECK.sender;
pptx.title = DECK.title;
pptx.subject = DECK.audience;

// ---- palette (diverse + lively, unified system) ----
const C = {
  ink: '1E2440', soft: '5A6278', line: 'CFD6F0', bg: 'FFFFFF', bgSoft: 'F5F7FF',
  violet: '6B4EFF', violetDark: '3D2B99', blue: '2E7DE4', teal: '12967F',
  green: '2BB673', orange: 'F5A623', red: 'E4572E', pink: 'E24BA6',
  lavender: 'EDEBFB', mint: 'EAF7F0', cream: 'FFF6E6', blush: 'FDEEF6', ice: 'E8F1FD',
  white: 'FFFFFF'
};
const STEPS = ['#f5a623', '#ffd166', '#06d6a0', '#118ab2', '#2e7de4', '#6b4eff', '#8338ec', '#e4572e', '#e24ba6', '#2bb673'];

let page = 0;

// ---------- helpers ----------
function assertSize(s) { if (s < MIN_SIZE) throw new Error(`Font < 16pt (${s})`); }

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
  const w = width ?? label.length * 0.17 + 0.35;
  slide.addShape('roundRect', { x: PAD, y: 0.3, w, h: 0.46, rectRadius: 0.1, fill: { color }, line: { type: 'none' } });
  tx(slide, label, PAD, 0.3, w, 0.46, 16, { bold: true, color: C.white, align: 'center' });
  return w;
}

function title(slide, text, opts = {}) {
  tx(slide, text, PAD, opts.y ?? 0.9, W - PAD * 2, opts.h ?? 0.72, opts.size ?? 24, { bold: true, color: C.ink, ...opts });
}

function card(slide, x, y, w, h, fill = C.white, line = C.line) {
  slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: line } });
}

function chip(slide, glyph, label, x, y, w, h, color, opts = {}) {
  const gs = opts.glyphSize ?? Math.min(h * 0.52 * 72, 26);
  const fgN = opts.fg ?? C.white;
  slide.addShape('roundRect', { x, y, w, h, rectRadius: Math.min(0.16, h * 0.18), fill: { color }, line: { type: 'none' } });
  if (glyph) tx(slide, glyph, x + 0.04, y - 0.01, h - 0.04, h, gs, { bold: true, color: fgN, align: 'center', valign: 'middle' });
  if (label) tx(slide, label, x + (glyph ? h + 0.1 : 0.18), y, w - (glyph ? h + 0.14 : 0.3), h, opts.size ?? 16, {
    bold: opts.bold ?? true, color: opts.color ?? C.ink, valign: 'middle', align: opts.align ?? 'left', lsm: opts.lsm ?? 1.02
  });
}

function vcard(slide, x, y, w, h, head, color, body) {
  card(slide, x, y, w, h, C.white, color);
  slide.addShape('rect', { x, y, w, h: 0.52, fill: { color }, line: { type: 'none' } });
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
  tx(slide, note ?? `EduChoice-AI v${PROJECT_VERSION} · Dữ liệu đo trực tiếp từ repo (${E2E.measured})`, PAD, 7.08, 9.6, 0.3, 16, { color: C.soft, valign: 'middle' });
  tx(slide, `${page} / 15`, W - 2.2, 7.08, 1.75, 0.3, 16, { color: C.violet, align: 'right', valign: 'middle', bold: true });
}

// ============================================================
// S1 · COVER
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: C.ink }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: H - 1.15, w: W, h: 1.15, fill: { color: C.violet }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: 0.1, w: W, h: 0.05, fill: { color: C.orange }, line: { type: 'none' } });
  tx(s, 'KHOA HỌC KỸ THUẬT · HỘI ĐỒNG GIÁM KHẢO', 8.0, 0.5, 4.9, 0.5, 16, { bold: true, color: C.cream, align: 'right' });
  tx(s, 'EduChoice-AI', 0.7, 1.15, 8.5, 1.0, 46, { bold: true, color: C.white });
  tx(s, 'Nền tảng hỗ trợ tự điều chỉnh hành vi học tập\nbằng AI thích ứng có kiểm soát', 0.7, 2.35, 11.5, 1.25, 24, { bold: true, italic: true, color: C.white, lsm: 1.1 });
  tx(s, 'Từ “bịa số liệu giả” → hệ thống trung thực: kỹ thuật · dữ liệu · thử nghiệm có kiểm soát', 0.7, 3.7, 11.5, 0.55, 18, { color: C.cream, italic: true });
  // 3 pillars
  const pillars = [
    { icon: '▶', color: C.teal, head: 'VẤN ĐỀ', body: 'Biết nhưng khó làm; phản hồi tĩnh; AI thiếu kiểm soát' },
    { icon: '◉', color: C.violet, head: 'GIẢI PHÁP', body: 'Vòng khép kín game → hành vi → can thiệp → đo transfer' },
    { icon: '✓', color: C.orange, head: 'KẾT QUẢ', body: 'E2E 18/20, bảo mật 403, demo báo thật, công thức xác minh' }
  ];
  pillars.forEach((p, i) => {
    const x = 0.7 + i * 4.12, w = 3.92, y = 4.6, h = 1.45;
    card(s, x, y, w, h, '1E2A4A', '2A3766');
    chip(s, p.icon, p.head, x + 0.16, y + 0.16, 1.55, 0.5, p.color, { size: 17 });
    tx(s, p.body, x + 0.22, y + 0.76, w - 0.44, 0.62, 16, { color: C.cream, lsm: 1.05 });
  });
  // bottom strip chips
  const chips = [['14', 'kịch bản game'], ['13', 'toolkit can thiệp'], ['39', 'schema dữ liệu'], ['45', 'endpoint API']];
  chips.forEach((c, i) => {
    const x = 0.7 + i * 1.72;
    tx(s, c[0], x, 6.62, 0.62, 0.44, 20, { bold: true, color: C.white, align: 'center' });
    tx(s, c[1], x + 0.55, 6.66, 1.15, 0.4, 16, { color: C.cream });
  });
  tx(s, 'Học sinh THCS xây dựng · hỗ trợ lập trình AI có kiểm soát (OpenCode)', 8.2, 6.64, 4.7, 0.42, 16, { color: C.cream, align: 'right' });
}

// ============================================================
// S2 · AGENDA
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'NỘI DUNG', C.violet, 2.0);
  title(s, 'Lộ trình trình bày');
  const items = [
    ['Đặt vấn đề', 'Vì sao cần hệ thống này', C.teal],
    ['Bằng chứng', 'Baseline audit: 30 phát hiện', C.red],
    ['Giải pháp', 'Vòng khép kín game–hành vi–transfer', C.violet],
    ['Kiến trúc & AI', 'AI có kiểm soát, fallback an toàn', C.blue],
    ['Sản phẩm & dữ liệu', 'Game, giao diện, 39 schema', C.orange],
    ['Kiểm thử & công thức', 'Bảng bằng chứng số', C.green],
    ['An toàn & kết luận', 'Giới hạn nói rõ', C.pink]
  ];
  const colW = 6.0, colX = [PAD, W - PAD - 6.0];
  items.forEach((it, i) => {
    const col = i >= 4 ? 1 : 0, row = i >= 4 ? i - 4 : i;
    const x = colX[col], y = 1.9 + row * 1.24;
    chip(s, String(i + 1), it[0], x, y, colW, 0.56, it[2], { size: 18 });
    tx(s, it[1], x + 0.7, y + 0.6, colW - 0.95, 0.5, 16, { color: C.soft });
  });
  vcard(s, 6.9, 1.9 + 3 * 1.24, 5.0, 0.95, 'TINH THẦN', C.orange, 'Mỗi con số trên slide đều truy về mã nguồn — không có dữ liệu bịa.');
  footer(s);
}

// ============================================================
// S3 · PROBLEM & RESEARCH QUESTION
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'ĐẶT VẤN ĐỀ', C.teal, 2.5);
  title(s, 'Vấn đề thực tế & câu hỏi nghiên cứu', 24);
  const probs = [
    ['✔', 'Biết nhưng không làm', 'Kỹ năng biết là đúng, hành vi đời thực vẫn không đổi', C.teal],
    ['⚙', 'Phản hồi tĩnh', 'Cùng một lời khuyên cho mọi tình huống của từng học sinh', C.violet],
    ['≡', 'Ứng dụng dạy kỹ năng', 'Nặng nội dung + quiz, thiếu vòng lặp quan sát hành vi', C.blue],
    ['⚠', 'AI thiếu kiểm soát', 'Rủi ro nội dung thoát kiểm soát, tự “chẩn đoán” học sinh', C.red]
  ];
  probs.forEach((p, i) => {
    const y = 1.82 + i * 1.16, h = 1.02;
    card(s, PAD, y, 6.55, h, 'FFFFFF', p[3]);
    chip(s, p[0], p[1], PAD + 0.16, y + 0.18, 2.55, 0.5, p[3], { size: 18 });
    tx(s, p[2], PAD + 0.22, y + 0.56, 6.1, 0.4, 16, { color: C.soft });
  });
  card(s, 7.35, 1.82, 5.53, 1.55, C.violetDark, C.violet);
  tx(s, 'CÂU HỎI NGHIÊN CỨU', 7.55, 1.98, 5.1, 0.4, 16, { bold: true, color: C.orange });
  tx(s, 'Nhận diện tình huống từ hành vi + can thiệp thích ứng + đo transfer có cải thiện hiệu quả so với phản hồi cố định không?', 7.55, 2.42, 5.1, 0.82, 17, { bold: true, color: C.white, lsm: 1.1 });
  vcard(s, 7.35, 3.55, 5.53, 0.95, 'H1 · THÍCH ỨNG > TĨNH', C.green, 'H1: Có khác biệt tích cực về phản ứng & transfer.');
  vcard(s, 7.35, 4.66, 5.53, 0.95, 'H0 · KHÔNG KHÁC BIỆT', C.red, 'H0: Không có khác biệt có ý nghĩa giữa hai điều kiện.');
  card(s, 7.35, 5.77, 5.53, 0.85, C.cream, C.orange);
  tx(s, 'Lưu ý: giả thuyết thiết kế — chưa có thực nghiệm học sinh thật, deck không tuyên bố hiệu quả (spec §171).', 7.55, 5.77, 5.13, 0.85, 16, { color: C.ink, lsm: 1.05, valign: 'middle' });
  footer(s);
}

// ============================================================
// S4 · EVIDENCE — BASELINE AUDIT
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'BẰNG CHỨNG', C.red, 2.2);
  title(s, 'Baseline audit — vì sao phải thiết kế lại');
  // left: verdict + criticals
  card(s, PAD, 1.85, 5.0, 1.1, C.blush, C.red);
  tx(s, '1.1 / 5', PAD + 0.22, 1.95, 1.9, 0.9, 34, { bold: true, color: C.red });
  tx(s, 'Verdict: NO-GO', PAD + 2.2, 1.95, 2.6, 0.5, 18, { bold: true, color: C.ink, valign: 'middle' });
  tx(s, 'Trước cải tiến, đánh giá độc lập', PAD + 2.2, 2.42, 2.6, 0.45, 16, { color: C.soft, valign: 'middle' });
  tx(s, '4 Critical (nguy hiểm nhất)', PAD, 3.15, 5.0, 0.42, 18, { bold: true, color: C.ink });
  tx(s, '✔ Không có xác thực — role do client tự khai\n✕ IDOR — đọc/ghi dữ liệu người khác\n✕ Health/sync/E2E báo giả như thật\n✕ Dữ liệu nghiên cứu bịa hiển thị như kết quả thật', PAD, 3.6, 5.05, 2.55, 16, { color: C.ink, lsm: 1.15, valign: 'top' });
  // right: severity bars (shape-based chart)
  tx(s, '30 phát hiện theo mức độ', 6.6, 1.9, 6.3, 0.5, 18, { bold: true, color: C.ink });
  const sev = [['Critical', AUDIT.findings.CRITICAL, C.red], ['High', AUDIT.findings.HIGH, C.orange], ['Medium', AUDIT.findings.MEDIUM, C.blue], ['Low', AUDIT.findings.LOW, C.teal]];
  const maxV = 10, barW = 3.6;
  sev.forEach((v, i) => {
    const y = 2.5 + i * 0.92;
    tx(s, v[0], 6.6, y, 1.55, 0.5, 17, { bold: true, color: C.ink, valign: 'middle' });
    s.addShape('roundRect', { x: 8.25, y: y + 0.05, w: barW, h: 0.4, rectRadius: 0.08, fill: { color: C.bg }, line: { color: C.line } });
    s.addShape('roundRect', { x: 8.25, y: y + 0.05, w: (v[1] / maxV) * barW, h: 0.4, rectRadius: 0.08, fill: { color: v[2] }, line: { type: 'none' } });
    tx(s, String(v[1]), 8.25 + barW + 0.15, y, 1.2, 0.5, 20, { bold: true, color: v[2], valign: 'middle' });
  });
  tx(s, `Nguồn: ${AUDIT.report} — chuẩn điểm: x/ảnh trong báo cáo audit.\nTái lập: đọc trực tiếp working copy ${E2E.measured}.`, 6.6, 6.15, 6.3, 0.7, 16, { color: C.soft, italic: true, lsm: 1.1 });
  footer(s);
}

// ============================================================
// S5 · SOLUTION — CLOSED LOOP
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'GIẢI PHÁP', C.violet, 2.3);
  title(s, 'Vòng khép kín: Game → Hành vi → Can thiệp → Transfer', 22);
  const r1 = [['▶', 'Game', C.teal], ['≡', 'Hành vi', C.blue], ['★', 'Tình huống', C.orange], ['◉', 'Trạng thái', C.violet]];
  const r2 = [['➤', 'Đề xuất', C.pink], ['✓', 'Kiểm soát', C.red], ['▼', 'Can thiệp', C.green], ['↗', 'Transfer', C.teal]];
  const bw = 2.92, gap = 0.23;
  const drawRow = (arr, y, dir) => {
    arr.forEach((b, i) => {
      const x = PAD + i * (bw + gap);
      card(s, x, y, bw, 1.12, C.lavender, b[2]);
      chip(s, b[0], b[1], x + 0.14, y + 0.14, bw - 0.28, 0.62, b[2], { size: 18, align: 'center' });
      if (dir === 1 && i < 3) arrowR(s, x + bw - 0.08, y + 0.46, 0.3, 0.2, b[2]);
    });
  };
  drawRow(r1, 1.92, 1);
  drawRow(r2, 3.42, -1);
  arrowD(s, PAD + 3 * (bw + gap) + bw - 0.12, 3.04, 0.22, 0.36, C.violet);
  tx(s, 'Luồng 1 → 8 (zigzag): quan sát hành vi → nhận diện tình huống → đề xuất → kiểm soát → can thiệp → đo phản ứng & transfer', PAD + 0.1, 4.75, 12.3, 0.45, 16, { color: C.soft, italic: true });
  const notes = [['⏱', 'Đo thật', 'Telemetry trong game thay vì hằng số', C.blue], ['⚙', 'AI an toàn', 'Allow-list + fallback deterministic', C.violet], ['↗', 'Transfer đo được', 'Kỹ năng game → micro-hành động thật', C.green]];
  notes.forEach((n, i) => {
    const x = PAD + i * 4.16, w = 3.95, y = 5.35, h = 1.1;
    card(s, x, y, w, h, C.white, n[3]);
    chip(s, n[0], n[1], x + 0.15, y + 0.3, 1.7, 0.5, n[3], { size: 16 });
    tx(s, n[2], x + 1.9, y + 0.12, w - 2.05, 0.9, 16, { color: C.ink, lsm: 1.05, valign: 'middle', wrap: true });
  });
  footer(s);
}

// ============================================================
// S6 · ARCHITECTURE
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'KIẾN TRÚC', C.blue, 2.4);
  title(s, 'Kiến trúc 4 tầng — từ giao diện đến dữ liệu', 22);
  const layers = [
    ['≡', 'Tầng giao diện', 'Student UI · Teacher Dashboard', C.teal],
    ['⚙', 'Tầng cổng kết nối', 'Express API + Apps Script gateway · Auth allow-list server-side', C.blue],
    ['◉', 'Tầng thông minh', 'Rule Engine + Student Model + Gemini (trong khuôn khổ)', C.violet],
    ['▣', 'Tầng dữ liệu', '39 schema canonical (V9) — hiện chạy in-memory demo, báo thật', C.orange]
  ];
  const ly = 1.82, lh = 0.9, lgap = 0.22;
  layers.forEach((l, i) => {
    const y = ly + i * (lh + lgap);
    card(s, PAD, y, 12.43, lh, 'FFFFFF', l[3]);
    chip(s, l[0], l[1], PAD + 0.18, y + 0.14, 2.9, 0.58, l[3], { size: 18 });
    tx(s, l[2], PAD + 3.3, y, 8.9, lh, 16, { color: C.ink, valign: 'middle', lsm: 1.05 });
    if (i < 3) arrowD(s, PAD + 1.5, y + lh - 0.04, 0.2, lgap + 0.04, l[3]);
  });
  card(s, PAD, 6.24, 12.43, 0.66, C.blush, C.red);
  chip(s, '▲', 'Teacher oversight + Audit log (31) + AI decision log (18) — con người quyết định cuối cùng', PAD + 0.25, 6.32, 11.6, 0.5, C.red, { size: 16, fg: C.white, glyphSize: 22 });
  footer(s);
}

// ============================================================
// S7 · AI CONTROL PIPELINE
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'AI CÓ KIỂM SOÁT', C.violet, 3.2);
  title(s, 'Gemini chỉ đề xuất — hệ thống quyết định', 22);
  const steps = [
    ['⧉', 'Context + Candidate set', C.blue],
    ['◉', 'Gemini reasoning', C.violet],
    ['✓', 'Kiểm soát: schema · allow-list · range', C.orange],
    ['⚙', 'Fallback an toàn', C.teal],
    ['➤', 'Final action + Log', C.green]
  ];
  const bw = 2.38, gap = 0.2, by = 1.9, bh = 1.5;
  steps.forEach((st, i) => {
    const x = PAD + i * (bw + gap);
    card(s, x, by, bw, bh, C.lavender, st[2]);
    chip(s, st[0], '', x + 0.15, by + 0.16, bh * 0.4, 0.55, st[2], { glyphSize: 24 });
    tx(s, st[1], x + 0.15, by + 0.78, bw - 0.3, 0.66, 16, { bold: true, color: C.ink, valign: 'top', lsm: 1.03, wrap: true });
    if (i < 4) arrowR(s, x + bw - 0.06, by + 0.62, 0.26, 0.22, C.violet);
  });
  card(s, PAD, 3.6, 12.43, 0.72, C.violetDark, C.violet);
  tx(s, '“NO direct Gemini execution” — lựa chọn ra ngoài tập được phép sẽ bị loại hoặc chuyển fallback (gemini-3.8-flash · GA 2026-09-02)', PAD + 0.3, 3.6, 11.9, 0.72, 17, { bold: true, color: C.white, valign: 'middle', align: 'center', lsm: 1.05 });
  vcard(s, PAD, 4.55, 6.05, 1.85, 'NHẬT KÝ QUYẾT ĐỊNH', C.green,
    '18_AI_DECISIONS ghi từng quyết định AI.\nTrạng thái: valid / fallback / not_generated.\n→ Minh bạch, truy vết được từng lời khuyên.');
  vcard(s, 6.85, 4.55, 6.03, 1.85, 'RÀNG BUỘC ÉP CHẶT', C.orange,
    'nextGameId ∈ tập ứng viên (allow-list).\nduration ∈ [1..5]; difficulty ∈ [1..3].\nSanitize: mọi đầu ra AI được hợp lệ hoá trước khi dùng.');
  footer(s);
}

// ============================================================
// S8 · PRODUCT & UI MOCKUPS
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'SẢN PHẨM', C.orange, 2.2);
  title(s, 'Giao diện sản phẩm — trải nghiệm học sinh', 22);
  // phone mockup
  const px = PAD, py = 1.85, pw = 3.35, ph = 4.3;
  s.addShape('roundRect', { x: px, y: py, w: pw, h: ph, rectRadius: 0.14, fill: { color: 'FFFFFF' }, line: { color: C.violet } });
  s.addShape('rect', { x: px, y: py, w: pw, h: 0.56, fill: { color: C.violet }, line: { type: 'none' } });
  tx(s, 'Game 03 · 48 phút cuối', px + 0.16, py + 0.05, pw - 0.3, 0.46, 16, { bold: true, color: C.white, valign: 'middle' });
  tx(s, 'Trì hoãn khởi đầu được nhận diện…', px + 0.16, py + 0.62, pw - 0.3, 0.5, 16, { color: C.violetDark, lsm: 1.05, valign: 'top' });
  const scene = py + 1.15;
  s.addShape('roundRect', { x: px + 0.14, y: scene, w: pw - 0.28, h: 0.98, rectRadius: 0.08, fill: { color: C.mint }, line: { color: C.green } });
  tx(s, 'Tình huống: còn 48 phút, bạn định dành “5 phút” xem video…', px + 0.3, scene + 0.1, pw - 0.6, 0.8, 16, { color: C.ink, lsm: 1.05, valign: 'top' });
  const optY = scene + 1.06;
  tx(s, 'Lựa chọn:', px + 0.16, optY, pw - 0.3, 0.3, 16, { bold: true, color: C.ink });
  s.addShape('roundRect', { x: px + 0.14, y: optY + 0.34, w: pw - 0.28, h: 0.5, rectRadius: 0.08, fill: { color: C.blue }, line: { type: 'none' } });
  tx(s, 'A · Lập kế hoạch 25 phút', px + 0.3, optY + 0.34, pw - 0.55, 0.5, 16, { bold: true, color: C.white, valign: 'middle' });
  s.addShape('roundRect', { x: px + 0.14, y: optY + 0.9, w: pw - 0.28, h: 0.5, rectRadius: 0.08, fill: { color: C.teal }, line: { type: 'none' } });
  tx(s, 'B · Học theo reset 25ph', px + 0.3, optY + 0.9, pw - 0.55, 0.5, 16, { bold: true, color: C.white, valign: 'middle' });
  tx(s, '⏱ 48’ ⏸ Lần dừng: 3 ❓ Trợ giúp: 1', px + 0.16, py + 3.72, pw - 0.3, 0.4, 16, { color: C.soft, valign: 'middle' });
  // right column
  const rx = 4.15, rw = 8.73;
  card(s, rx, py, rw, 2.0, C.lavender, C.violet);
  chip(s, '➤', 'ĐỀ XUẤT THÍCH ỨNG (AI + Rule)', rx + 0.22, py + 0.22, 3.7, 0.56, C.violet, { size: 20 });
  chip(s, '★', 'Tình huống: Trì hoãn khởi đầu', rx + 4.1, py + 0.22, 3.7, 0.56, C.orange, { size: 16, bold: true, color: C.ink, fg: C.white });
  tx(s, 'Vì sao: 2 lần trì hoãn + 1 chuyển tab trong 10 phút đầu. Đề xuất: kế hoạch 25 phút + nhắc giữa giờ.', rx + 0.3, py + 0.92, rw - 0.6, 0.62, 16, { color: C.ink, lsm: 1.08, valign: 'top' });
  tx(s, 'Mức tự tin: 0.87', rx + 0.3, py + 1.56, 1.9, 0.36, 16, { color: C.violetDark, bold: true, valign: 'middle' });
  s.addShape('roundRect', { x: rx + 1.9, y: py + 1.62, w: 4.3, h: 0.24, rectRadius: 0.05, fill: { color: C.bg }, line: { color: C.line } });
  s.addShape('roundRect', { x: rx + 1.9, y: py + 1.62, w: 3.74, h: 0.24, rectRadius: 0.05, fill: { color: C.green }, line: { type: 'none' } });
  tx(s, 'Log: 18_AI_DECISIONS', rx + 6.4, py + 1.56, 2.2, 0.36, 16, { color: C.soft, valign: 'middle', align: 'right' });
  // result chips
  const cy = 4.2;
  const res = [
    ['✓', 'Retry sau can thiệp', 'Phản hồi tích cực, đo được', C.green],
    ['⏱', 'Decision Time Mean', 'Σ thời gian quyết định / N', C.blue],
    ['↗', 'Micro-action transfer', 'Vi hành động đời thực 5 phút', C.orange]
  ];
  res.forEach((r, i) => {
    const x = rx + i * 2.98, w = 2.78, y = cy, h = 1.75;
    card(s, x, y, w, h, C.white, r[3]);
    chip(s, r[0], '', x + 0.14, y + 0.18, 0.5, 0.5, r[3], { glyphSize: 22 });
    tx(s, r[1], x + 0.18, y + 0.74, w - 0.34, 0.5, 17, { bold: true, color: C.ink, lsm: 1.02, valign: 'top', wrap: true });
    tx(s, r[2], x + 0.18, y + 1.14, w - 0.34, 0.55, 16, { color: C.soft, lsm: 1.0, valign: 'top', wrap: true });
  });
  tx(s, `Minh họa giao diện theo component thật: GameRuntime.tsx · StudentApp · ${CONTENT.games} game · ${CONTENT.toolkits} toolkit · ${CONTENT.apis} API`, PAD + 0.1, 6.2, 12.3, 0.45, 16, { color: C.soft, italic: true, align: 'center' });
  footer(s);
}

// ============================================================
// S9 · DATA & HONESTY
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'DỮ LIỆU & TRUNG THỰC', C.green, 3.4);
  title(s, '39 schema theo nhóm — và báo đúng trạng thái');
  tx(s, '39 schema canonical (V9) theo category', PAD, 1.85, 7.5, 0.45, 18, { bold: true, color: C.ink });
  const cats = SHEETS.byCategory;
  const maxC = Math.max(...cats.map(c => c.count));
  const barW = 3.4;
  cats.forEach((c, i) => {
    const y = 2.4 + i * 0.5;
    tx(s, c.category, PAD, y, 1.85, 0.4, 16, { bold: true, color: C.ink, valign: 'middle' });
    s.addShape('roundRect', { x: 2.35, y: y + 0.05, w: barW, h: 0.3, rectRadius: 0.06, fill: { color: C.bg }, line: { color: C.line } });
    s.addShape('roundRect', { x: 2.35, y: y + 0.05, w: (c.count / maxC) * barW, h: 0.3, rectRadius: 0.06, fill: { color: STEPS[i] }, line: { type: 'none' } });
    tx(s, String(c.count), 2.35 + barW + 0.12, y, 0.9, 0.4, 18, { bold: true, color: STEPS[i], valign: 'middle' });
  });
  tx(s, `Nguồn: ${SHEETS.source}`, PAD, 6.5, 7.6, 0.4, 16, { color: C.soft, italic: true });
  // right: honesty status
  tx(s, `Trạng thái thật (đo ${QUALITY.measured})`, 8.1, 1.85, 4.8, 0.45, 18, { bold: true, color: C.ink });
  const status = [
    ['✓', 'dataSource: IN_MEMORY_MOCK', QUALITY.dataSource, C.green],
    ['✓', 'demoMode: true', String(QUALITY.demoMode), C.green],
    ['✓', 'eventIngestionRate: 0', 'chưa có Sheets thật', C.orange],
    ['✓', 'Sync Sheets: 501', 'SHEETS_NOT_CONFIGURED', C.orange],
    ['✓', 'V10 health: appsScript', V10_HEALTH.appsScript, C.orange],
    ['✓', 'writeSuccessRate', `${QUALITY.writeSuccessRate}% (in-memory)`, C.green]
  ];
  status.forEach((st, i) => {
    const y = 2.4 + i * 0.5;
    card(s, 8.1, y, 4.78, 0.42, C.white, C.line);
    tx(s, `${st[0]} ${st[1]} → ${st[2]}`, 8.26, y, 4.5, 0.42, 16, { color: C.ink, valign: 'middle', lsm: 1.0 });
  });
  card(s, 8.1, 5.45, 4.78, 0.95, C.cream, C.orange);
  tx(s, 'Dữ liệu demo gắn nhãn rõ — không hiển thị như kết quả thật. Không bao giờ báo success giả.', 8.3, 5.45, 4.38, 0.95, 16, { color: C.ink, lsm: 1.1, valign: 'middle' });
  footer(s);
}

// ============================================================
// S10 · TESTING & SECURITY (tables)
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'KIỂM THỬ & BẢO MẬT', C.green, 3.2);
  title(s, 'Bảng bằng chứng: E2E thật & an toàn server-side');
  tx(s, 'E2E — 20 bước chạy thật', PAD, 1.78, 6.1, 0.4, 18, { bold: true, color: C.ink });
  const e2eRows = [
    ['Write (ghi dữ liệu)', '7', '2'],
    ['Read (đọc dữ liệu)', '3', '0'],
    ['Validation (ràng buộc)', '3', '0'],
    ['Integrity (toàn vẹn)', '3', '0'],
    ['Research (tra cứu)', '2', '0'],
    ['TỔNG CỘNG', '18', '2']
  ];
  s.addTable(
    [
      [{ text: 'Nhóm bước', options: { bold: true, color: C.white } }, { text: 'PASS', options: { bold: true, color: C.white } }, { text: 'FAIL', options: { bold: true, color: C.white } }],
      ...e2eRows.map(r => [{ text: r[0], options: {} }, { text: r[1], options: { bold: true, color: C.green } }, { text: r[2], options: { bold: true, color: r[2] === '0' ? C.ink : C.red } }])
    ],
    { x: PAD, y: 2.25, w: 6.15, colW: [3.55, 1.3, 1.3], rowH: 0.52, fontSize: 16, fontFace: FONT, fill: { color: C.violet }, firstRow: true, border: { type: 'solid', color: C.line }, margin: 0.08, valign: 'middle' }
  );
  tx(s, '2 FAIL được nêu công khai:', PAD, 6.0, 6.1, 0.4, 17, { bold: true, color: C.red });
  tx(s, 'T06 · chưa có luồng ghi 10_INTERVENTIONS\nT09 · AI decision log chưa tự động cho mọi phiên', PAD, 6.4, 6.2, 0.62, 16, { color: C.ink, lsm: 1.1 });
  tx(s, 'Bảo mật — smoke test server-side', 6.9, 1.78, 6.0, 0.4, 18, { bold: true, color: C.ink });
  const secRows = SECURITY.verified;
  s.addTable(
    [
      [{ text: 'Tình huống', options: { bold: true, color: C.white } }, { text: 'Kết quả', options: { bold: true, color: C.white } }, { text: 'Ý nghĩa', options: { bold: true, color: C.white } }],
      ...secRows.map(v => [
        { text: v.case, options: {} },
        { text: v.outcome, options: { bold: true, color: v.outcome.includes('403') || v.outcome.includes('501') ? C.red : C.green } },
        { text: v.note, options: {} }
      ])
    ],
    { x: 6.9, y: 2.25, w: 5.98, colW: [2.05, 1.63, 2.30], rowH: 0.52, fontSize: 16, fontFace: FONT, fill: { color: C.violet }, firstRow: true, border: { type: 'solid', color: C.line }, margin: 0.08, valign: 'middle' }
  );
  tx(s, 'Trust boundary phía server: allow-list + ruolo từ danh tính xác minh.', 6.9, 6.0, 6.0, 0.78, 16, { color: C.soft, italic: true, lsm: 1.1 });
  footer(s);
}

// ============================================================
// S11 · FORMULAS (evidence table)
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'CÔNG THỨC MINH CHỨNG', C.blue, 3.5);
  title(s, 'Công thức — mỗi công thức có nguồn & ví dụ');
  const fm = FORMULAS.filter(f => f.validation.startsWith('VERIFIED'));
  s.addTable(
    [
      [{ text: 'ID', options: { bold: true, color: C.white } }, { text: 'Metric', options: { bold: true, color: C.white } }, { text: 'Công thức', options: { bold: true, color: C.white } }, { text: 'Ví dụ số', options: { bold: true, color: C.white } }, { text: 'Trạng thái', options: { bold: true, color: C.white } }],
      ...fm.map(f => [
        { text: f.id, options: { bold: true } },
        { text: f.name, options: { bold: true } },
        { text: f.equation, options: { italic: true, align: 'center' } },
        { text: f.example ? Object.values(f.example).join(' → ') + (f.example.expected !== undefined ? ` = ${f.example.expected}` : '') : '—', options: { align: 'center' } },
        { text: 'VERIFIED', options: { bold: true, color: C.green, align: 'center' } }
      ])
    ],
    { x: PAD, y: 1.95, w: 12.43, colW: [0.85, 2.5, 3.9, 3.8, 1.38], rowH: 0.78, fontSize: 16, fontFace: FONT, fill: { color: C.violet }, firstRow: true, border: { type: 'solid', color: C.line }, margin: 0.06, valign: 'middle' }
  );
  card(s, PAD, 6.15, 12.43, 0.78, C.cream, C.orange);
  tx(s, 'F-005 Transfer Index: chưa có công thức tài liệu hóa trong repo (EVIDENCE GAP) → không trưng lên slide chính, chỉ nêu hạn chế.', PAD + 0.25, 6.15, 11.9, 0.78, 16, { color: C.ink, valign: 'middle', lsm: 1.05 });
  footer(s);
}

// ============================================================
// S12 · RESEARCH DESIGN
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'THIẾT KẾ THỬ NGHIỆM', C.pink, 3.4);
  title(s, 'Thiết kế A/B/C — metric định trước, chưa chạy', 21, { h: 0.8 });
  const groups = [
    ['A', 'Phản hồi cố định', 'Đối chứng tĩnh', C.orange],
    ['B', 'Can thiệp thích ứng', 'Điều trị 1', C.teal],
    ['C', 'Thích ứng + Transfer', 'Điều trị 2', C.violet]
  ];
  groups.forEach((g, i) => {
    const x = PAD + i * 4.16, w = 3.95, y = 1.85, h = 1.5;
    card(s, x, y, w, h, C.lavender, g[3]);
    chip(s, g[0], g[1], x + 0.2, y + 0.2, 2.6, 0.55, g[3], { size: 19, color: C.ink });
    tx(s, g[2], x + 0.25, y + 0.86, w - 0.5, 0.5, 16, { color: C.soft });
  });
  // variables
  vcard(s, PAD, 3.6, 6.05, 1.55, 'BIẾN ĐỘC LẬP (IV)', C.blue, 'Điều kiện can thiệp giữa 3 nhóm (cố định / thích ứng / thích ứng + transfer)');
  vcard(s, 6.85, 3.6, 6.03, 1.55, 'BIẾN PHỤ THUỘC (DV)', C.green, 'Transfer execution rate · completion · retry · decision time mean · agency');
  // sample
  vcard(s, PAD, 5.35, 12.43, 1.3, 'MẪU & PHƯƠNG PHÁP', C.orange,
    'n ≥ 20 học sinh/nhóm · đo lặp (repeated measures) · đồng thuận + pseudonym (S001…).\nCHẶT: thiết kế một nhóm pre/post không đủ kết luận nhân quả (CAUSALITY OVERCLAIM guard).');
  footer(s);
}

// ============================================================
// S13 · SAFETY & ETHICS
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'AN TOÀN & ĐẠO ĐỨC', C.teal, 3.2);
  title(s, '8 nguyên tắc AI cho giáo dục THCS');
  const princ = [
    ['★', 'No diagnosis', 'Không dán nhãn, chỉ dùng behavior signal', C.teal],
    ['▼', 'Tối thiểu dữ liệu', 'Chỉ lấy dữ liệu cần cho quyết định', C.blue],
    ['✓', 'Đồng thuận', 'Consent + teacher oversight', C.green],
    ['⚙', 'Phân quyền', 'Server-side RBAC, allow-list', C.violet],
    ['▲', 'Giáo viên kiểm soát', 'Con người quyết định cuối cùng', C.orange],
    ['➤', 'Fallback an toàn', 'AI lỗi → quyết định xác định', C.red],
    ['▣', 'Nhật ký đầy đủ', '31_AUDIT_LOG + 18_AI_DECISIONS', C.pink],
    ['◉', 'Quyền chọn lựa', 'Học sinh giữ agency', C.violetDark]
  ];
  princ.forEach((p, i) => {
    const x = PAD + (i % 4) * 3.16, y = 1.85 + Math.floor(i / 4) * 1.5, w = 2.95, h = 1.3;
    card(s, x, y, w, h, C.white, p[3]);
    chip(s, p[0], p[1], x + 0.12, y + 0.14, 1.85, 0.5, p[3], { size: 16, color: C.ink });
    tx(s, p[2], x + 0.16, y + 0.68, w - 0.3, 0.55, 16, { color: C.soft, lsm: 1.02, wrap: true, valign: 'top' });
  });
  card(s, PAD, 4.95, 12.43, 0.7, C.lavender, C.violet);
  tx(s, 'Trung thực là nguyên tắc số 0: dữ liệu demo gắn nhãn, lỗi kỹ thuật báo công khai, không bịa kết quả.', PAD + 0.3, 4.95, 11.9, 0.7, 17, { bold: true, color: C.violetDark, align: 'center', valign: 'middle' });
  footer(s);
}

// ============================================================
// S14 · LIMITATIONS & NEXT STEP
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'HẠN CHẾ & HƯỚNG PHÁT TRIỂN', C.red, 3.9);
  title(s, 'Nói rõ giới hạn — bước tiếp theo', 22);
  // left: limitations
  tx(s, 'HẠN CHẾ', PAD, 1.8, 6.05, 0.45, 20, { bold: true, color: C.red });
  const lims = [
    ['⚠', 'Data layer đang in-memory demo', 'Chưa nối Google Sheets; health/sync báo đúng trạng thái', C.red],
    ['⚠', 'Gap kỹ thuật T06 / T09', 'Ghi can thiệp & AI decision log chưa tự động cho mọi phiên', C.orange],
    ['⚠', 'Chưa có thực nghiệm thật', 'Mẫu nhỏ, chưa đánh giá dài hạn; không tuyên bố hiệu quả', C.violet]
  ];
  lims.forEach((l, i) => {
    const y = 2.35 + i * 1.4, h = 1.25;
    card(s, PAD, y, 6.05, h, C.white, l[3]);
    chip(s, l[0], l[1], PAD + 0.16, y + 0.16, 3.1, 0.55, l[3], { size: 18 });
    tx(s, l[2], PAD + 0.2, y + 0.72, 5.6, 0.46, 16, { color: C.soft, lsm: 1.04, wrap: true });
  });
  // right: next steps
  tx(s, 'HƯỚNG PHÁT TRIỂN', 6.9, 1.8, 6.05, 0.45, 20, { bold: true, color: C.green });
  const nxt = [
    ['▶', 'Nối dữ liệu thật', 'Google Sheets qua Apps Script: auth + LockService + upsert', C.teal],
    ['✓', 'Đóng gap kỹ thuật', 'T06: ghi can thiệp; T09: log AI mọi phiên', C.green],
    ['★', 'Thực nghiệm A/B/C', 'Consent + pseudonym, n≥20/nhóm, báo CI khi đủ dữ liệu', C.blue]
  ];
  nxt.forEach((n, i) => {
    const y = 2.35 + i * 1.4, h = 1.25;
    card(s, 6.9, y, 5.98, h, C.white, n[3]);
    chip(s, n[0], n[1], 6.9 + 0.16, y + 0.16, 3.1, 0.55, n[3], { size: 18 });
    tx(s, n[2], 6.9 + 0.2, y + 0.72, 5.55, 0.46, 16, { color: C.soft, lsm: 1.04, wrap: true });
  });
  footer(s);
}

// ============================================================
// S15 · CONCLUSION & THANKS
// ============================================================
{
  const s = pptx.addSlide();
  page += 1;
  bg(s);
  sectionChip(s, 'KẾT LUẬN', C.violetDark, 2.4);
  title(s, 'Kết luận — đúng 3 dòng', 24);
  const lines = [
    ['1 · VẤN ĐỀ ĐÃ XỬ LÝ', 'Hỗ trợ tự điều chỉnh hành vi qua vòng lặp game–hành vi–thích ứng có kiểm soát; loại dữ liệu bịa khỏi luồng trình bày.', C.teal],
    ['2 · ĐIỀU ĐÃ CHỨNG MINH', 'Kỹ thuật: E2E 18/20, bảo mật 403, AI gate + fallback + log, telemetry đo thật, demo được báo đúng (audit 1.1/5 → hệ thống trung thực).', C.violet],
    ['3 · ĐIỀU CHƯA THỂ KẾT LUẬN', 'Chưa có bằng chứng can thiệp cải thiện học tập — cần thực nghiệm A/B/C đã định trước với cỡ mẫu hợp lệ.', C.orange]
  ];
  lines.forEach((l, i) => {
    const y = 1.9 + i * 1.28, h = 1.1;
    card(s, PAD, y, 12.43, h, C.lavender, l[2]);
    tx(s, l[0], PAD + 0.25, y, 6.0, h, 18, { bold: true, color: l[2], valign: 'middle' });
    tx(s, l[1], PAD + 2.6, y + 0.08, 9.55, h - 0.16, 16, { color: C.ink, valign: 'middle', lsm: 1.08 });
  });
  card(s, PAD, 5.78, 12.43, 0.6, C.white, C.line);
  tx(s, 'Nguồn: ① Repo v3.0.0 (E2E/health/quality đo trực tiếp 2026-09-15) · ② Audit Report V1.0 · ③ Master Spec trình bày KHKT V2', PAD + 0.2, 5.78, 12.0, 0.6, 16, { color: C.soft, valign: 'middle', align: 'center', lsm: 1.05 });
  tx(s, 'Cảm ơn Hội đồng đã lắng nghe — sẵn sàng trả lời Q&A', PAD, 6.52, 12.43, 0.46, 22, { bold: true, color: C.violetDark, align: 'center' });
  footer(s);
}

// ============================================================
// NOTE: speaker notes (notesMaster) added per slide by generate-docs. Write file.
// ============================================================

pptx.writeFile({ fileName: path.join(OUT_DIR, '01_EduChoice-AI_Presentation.pptx') }).then((f) => {
  console.log('[OK] 01_EduChoice-AI_Presentation.pptx');
  console.log('Slides generated:', page, '(target 15)');
});
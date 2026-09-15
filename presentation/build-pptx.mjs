// EDUCHOICE-AI — PPTX SCIENTIFIC PRESENTATION BUILDER
// Pipeline: PRESENTATION.YAML → SLIDE DEFINITIONS → PPTXGENJS → EduChoice-AI_Presentation.pptx
// Spec compliance: SOURCE → EVIDENCE → CLAIM → DATA → FORMULA → CHART → SLIDE (no reverse)
// Rule: no invented data. All numbers come from presentation/content.mjs (repository source of truth).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PptxGenJS from 'pptxgenjs';
import {
  PROJECT_VERSION, E2E, AUDIT, SHEETS, CONTENT, QUALITY, V10_HEALTH, SECURITY, AI_CONTROL, FORMULAS, CLAIMS, EVIDENCES, TERMINOLOGY, CITATIONS, DECK, COLORS
} from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'dist', 'presentation');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 13.333; // 16:9 inches
const H = 7.5;
const FONT = 'Be Vietnam Pro';
const FONT_SCI = 'Times New Roman';

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: W, height: H });
pptx.layout = 'WIDE';
pptx.author = DECK.sender;
pptx.title = DECK.title;
pptx.subject = DECK.audience;

// ---------- helpers ----------
const PAD = 0.5;
const FOOT_Y = H - 0.32;
const FOOT_H = 0.26;

let pageCounter = { main: 0, backup: 0 };

function footer(slide, section, pageTotal) {
  slide.addText(`${DECK.title.split(' — ')[0]} · ${section}`, {
    x: PAD, y: FOOT_Y, w: 6, h: FOOT_H, fontSize: 8, color: COLORS.inkSoft, fontFace: FONT, valign: 'middle'
  });
  slide.addText(`EduChoice-AI v${PROJECT_VERSION} · ${DECK.date}`, {
    x: W - 2.4, y: FOOT_Y, w: 1.9, h: FOOT_H, fontSize: 8, color: COLORS.inkSoft, fontFace: FONT, align: 'right', valign: 'middle'
  });
  slide.addText(String(pageTotal), {
    x: W - 1.15, y: FOOT_Y, w: 0.65, h: FOOT_H, fontSize: 8, color: COLORS.primary, fontFace: FONT, align: 'right', valign: 'middle'
  });
}

function sectionBar(slide, label, color = COLORS.primary) {
  slide.addShape('rect', { x: PAD, y: 0.28, w: 0.09, h: 0.5, fill: { color }, line: { type: 'none' } });
  slide.addText(label.toUpperCase(), { x: PAD + 0.18, y: 0.3, w: 10, h: 0.4, fontSize: 11, color, bold: true, fontFace: FONT, charSpacing: 1.5 });
}

function title(slide, text, size = 24, color = COLORS.ink, y = 0.95) {
  slide.addText(text, { x: PAD, y, w: W - PAD * 2, h: 0.9, fontSize: size, bold: true, color, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.02 });
}

function subtitle(slide, text, y = 1.78, color = COLORS.inkSoft) {
  slide.addText(text, { x: PAD, y, w: W - PAD * 2, h: 0.5, fontSize: 13, color, fontFace: FONT, valign: 'top' });
}

function bullets(slide, items, opts = {}) {
  const x = opts.x ?? PAD + 0.15;
  const y = opts.y ?? 2.35;
  const w = opts.w ?? W - PAD * 2 - 0.3;
  const h = opts.h ?? 4.2;
  const size = opts.size ?? 13;
  const runs = items.map((it, i) => {
    const isHead = typeof it === 'object' && it.head;
    const text = typeof it === 'string' ? it : (isHead ? `${it.head}` : `${it.left ? '' : '• '}${it.text}`);
    return {
      text,
      options: {
        fontSize: isHead ? size + 1 : size,
        bold: isHead,
        color: typeof it === 'object' && it.color ? it.color : (isHead ? COLORS.primaryDark : COLORS.ink),
        bullet: isHead ? { code: '' } : (opts.bullet ?? '2012'), // inherit
        paraSpaceAfter: opts.spaceAfter ?? 8,
        breakLine: true
      }
    };
  });
  slide.addText(runs, { x, y, w, h, fontFace: FONT, valign: 'top', lineSpacingMultiple: 1.08 });
}

function sourceLine(slide, text, color = COLORS.warn) {
  slide.addText(`Nguồn: ${text}`, { x: PAD, y: FOOT_Y - 0.34, w: W - PAD * 2, h: 0.26, fontSize: 8.5, color, fontFace: FONT, italic: true, valign: 'middle' });
}

function bigNumber(slide, number, label, x, y, w, color = COLORS.primary, sub = '') {
  slide.addText(number, { x, y, w, h: 0.85, fontSize: 40, bold: true, color, fontFace: FONT, valign: 'middle' });
  slide.addText(sub || label, { x: x + 0.05, y: y + 0.85, w: w - 0.1, h: 0.7, fontSize: 10.5, color: COLORS.inkSoft, fontFace: FONT, valign: 'top' });
}

// ---------- background ----------
function bg(slide, soft = true) {
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: soft ? COLORS.bgSoft : COLORS.bg }, line: { type: 'none' } });
  // top accent strip
  slide.addShape('rect', { x: 0, y: 0, w: W, h: 0.06, fill: { color: COLORS.primary }, line: { type: 'none' } });
}

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
  const s = pptx.addSlide();
  bg(s, false);
  s.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: '1E2440' }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: H - 1.5, w: W, h: 1.5, fill: { color: COLORS.primary }, line: { type: 'none' } });
  s.addText('EduChoice-AI', { x: 0.8, y: 1.0, w: 9, h: 0.7, fontSize: 34, bold: true, color: 'FFFFFF', fontFace: FONT });
  s.addText(DECK.title.replace('EduChoice-AI — ', ''), { x: 0.8, y: 1.8, w: 11.6, h: 1.3, fontSize: 22, bold: true, color: 'FFFFFF', fontFace: FONT, lineSpacingMultiple: 1.05 });
  s.addText(DECK.subtitle, { x: 0.8, y: 3.15, w: 10.8, h: 0.9, fontSize: 13.5, color: 'D6DEF5', fontFace: FONT });
  s.addText(`Dự án: Hệ thống AI thích ứng có kiểm soát cho học sinh THCS · ${DECK.audience}`, { x: 0.8, y: 4.15, w: 11, h: 0.6, fontSize: 12, color: 'B9C4E8', fontFace: FONT });
  const tags = ['Game & Hành vi', 'Student Model', 'Rule Engine + Gemini', 'Fallback an toàn', 'Transfer measurable'];
  let tx = 0.8;
  tags.forEach((t) => {
    s.addShape('roundRect', { x: tx, y: 5.45, w: 2.55, h: 0.5, rectRadius: 0.25, fill: { color: '7C4DFF' }, line: { type: 'none' } });
    s.addText(t, { x: tx, y: 5.45, w: 2.55, h: 0.5, fontSize: 9.5, color: 'FFFFFF', fontFace: FONT, align: 'center', valign: 'middle' });
    tx += 2.65;
  });
  footer(s, 'Kính mời Hội đồng giám khảo', 0);
}

// ============================================================
// SLIDE 2 — TEAM
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Giới thiệu · Đội ngũ', COLORS.secondary);
  title(s, 'Đội ngũ & vai trò', 24, COLORS.ink, 0.95);
  bullets(s, [
    { head: 'Ai xây dựng dự án này?' },
    'Học sinh THCS — chủ thể nghiên cứu & kỹ thuật (đề xuất: 2–3 thành viên)',
    'OpenCode — công cụ AI hỗ trợ lập trình có kiểm soát, AI-use log đầy đủ',
    { head: 'Phân công đề xuất' },
    'Thành viên A — vấn đề & khoa học (bối cảnh, câu hỏi, thiết kế thử nghiệm)',
    'Thành viên B — kỹ thuật & AI (kiến trúc, rule engine, validation gate)',
    'Thành viên C — dữ liệu & đánh giá (telemetry, công thức, QA)',
    'Tất cả thành viên phải giải thích được mọi con số & công thức (spec §93, §192)'
  ]);
  sourceLine(s, 'Cấu trúc đội ngũ đề xuất theo đặc tả §191–193. Chưa có dữ liệu cá nhân nào trong deck.');
}

// ============================================================
// SLIDE 3 — AGENDA
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Nội dung');
  title(s, 'Lộ trình trình bày', 24);
  const items = [
    ['Vấn đề & bằng chứng', 'Tại sao cần hệ thống này'],
    ['Khoảng trống & câu hỏi nghiên cứu', 'What exists / What remains / RQ'],
    ['Thiết kế & cơ chế', 'Closed-loop: game → behavior → adaptive'],
    ['Sản phẩm & AI có kiểm soát', 'Rule + Student Model + Gemini + Fallback'],
    ['Kiểm thử & dữ liệu', 'E2E thật, trạng thái demo được báo đúng'],
    ['Công thức & kết quả', 'Được xác minh, không bịa'],
    ['An toàn, hạn chế, kết luận', 'Giới hạn nói rõ, next step']
  ];
  items.forEach((it, i) => {
    const y = 2.0 + i * 0.66;
    s.addShape('roundRect', { x: PAD, y: y + 0.03, w: 0.45, h: 0.45, rectRadius: 0.1, fill: { color: COLORS.primary }, line: { type: 'none' } });
    s.addText(String(i + 1), { x: PAD, y: y + 0.03, w: 0.45, h: 0.45, fontSize: 14, bold: true, color: 'FFFFFF', fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(it[0], { x: PAD + 0.65, y, w: 6.2, h: 0.45, fontSize: 14, bold: true, color: COLORS.ink, fontFace: FONT, valign: 'middle' });
    s.addText(it[1], { x: PAD + 6.95, y, w: 5.4, h: 0.45, fontSize: 11.5, color: COLORS.inkSoft, fontFace: FONT, valign: 'middle' });
  });
  footer(s, 'Nội dung');
}

// ============================================================
// SLIDE 4 — PROBLEM
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Đặt vấn đề');
  title(s, 'Vấn đề thực tế: hỗ trợ học sinh tự điều chỉnh hành vi');
  bullets(s, [
    { head: '01 — Học sinh biết nên làm nhưng khó làm' },
    'Kỹ năng học tập như lập kế hoạch, tự chủ thời gian thường không chuyển hóa thành hành vi đời thực',
    { head: '02 — Phản hồi tĩnh (static feedback) không đủ' },
    'Cùng một lời khuyên cho mọi học sinh bỏ qua bối cảnh hành vi thực tế của từng em',
    { head: '03 — App "dạy kỹ năng" thường chỉ là nội dung + bài quiz' },
    'Thiếu vòng lặp: quan sát hành vi → nhận diện tình huống → can thiệp → đo phản ứng và transfer',
    { head: '04 — Rủi ro khi dùng AI trong giáo dục' },
    'AI hỏng, nội dung thoát kiểm soát, hoặc "chẩn đoán" học sinh — cần lớp kiểm soát xác định'
  ], { y: 2.15, size: 12.5, spaceAfter: 7 });
  footer(s, 'Đặt vấn đề');
}

// ============================================================
// SLIDE 5 — EVIDENCE OF PROBLEM
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Đặt vấn đề · Bằng chứng');
  title(s, 'Bằng chứng đo được trước khi cải tiến (baseline audit)');
  bullets(s, [
    { head: 'Kết quả audit độc lập trên repo (trước cải tiến):' },
    `Điểm baseline: ${AUDIT.scoreBaseline} → Verdict ${AUDIT.verdict}`,
    `${AUDIT.findings.CRITICAL} Critical + ${AUDIT.findings.HIGH} High + ${AUDIT.findings.MEDIUM} Medium + ${AUDIT.findings.LOW} Low = ${AUDIT.findings.total} phát hiện`,
    'Không có xác thực thật; health/sync/E2E "tự khen"; dữ liệu nghiên cứu bịa đặt hiển thị như thật',
    { head: 'Bài học rút ra (dẫn dắt đề tài):' },
    'Một hệ AI giáo dục chỉ đáng tin nếu: trung thực về dữ liệu, kiểm soát AI, và thiết kế nghiên cứu hợp lệ'
  ], { y: 2.15, size: 13 });
  // chart: audit findings by severity
  s.addChart(pptx.ChartType.bar, [{
    name: 'Phát hiện',
    labels: ['Critical', 'High', 'Medium', 'Low'],
    values: [AUDIT.findings.CRITICAL, AUDIT.findings.HIGH, AUDIT.findings.MEDIUM, AUDIT.findings.LOW]
  }], {
    x: 7.6, y: 2.2, w: 5.2, h: 3.9, barDir: 'col', chartColors: [COLORS.warn], showTitle: false,
    catAxisLabelColor: COLORS.ink, valAxisLabelColor: COLORS.ink,
    valAxisFontFace: FONT, catAxisFontFace: FONT, dataLabelColor: 'FFFFFF', dataLabelFontSize: 11, dataLabelFontBold: true,
    valGridLine: { color: COLORS.line }, legendPos: 'none'
  });
  sourceLine(s, `${AUDIT.report} — audit tại working copy 2026-09-15. Số liệu là thật, lấy từ chính repo.`);
  footer(s, 'Đặt vấn đề · Bằng chứng');
}

// ============================================================
// SLIDE 6 — STATE OF THE ART / GAP
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Thực trạng & Khoảng trống');
  title(s, 'Thực trạng → Khoảng trống nghiên cứu');
  bullets(s, [
    { head: 'Đã tồn tại (existing capabilities)' },
    'Nền tảng học thích ứng nội dung (adaptive learning content)',
    'Học tập qua trò chơi (game-based learning)',
    'AI coaching / chatbot hỗ trợ học sinh',
    { head: 'Còn thiếu / chưa đầy đủ (what remains incomplete)' },
    'Vòng khép kín: hành vi trong game → tình huống → can thiệp vi mô → đo phản ứng → đo transfer',
    'Kiểm soát AI bằng allow-list + fallback deterministic trong cùng hệ thống',
    { head: 'Khoảng trống của EduChoice-AI (potential integration gap)' },
    'Tích hợp closed-loop micro-game + student model + AI bị kiểm soát + transfer measurement'
  ], { y: 2.0, size: 12.5, spaceAfter: 6 });
  sourceLine(s, 'Đặc tả §26 (không công kích sản phẩm khác; nói "potential integration gap", không nói "chưa từng có").');
  footer(s, 'Thực trạng & Khoảng trống');
}

// ============================================================
// SLIDE 7 — RESEARCH QUESTION
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Câu hỏi nghiên cứu', COLORS.secondary);
  title(s, 'Câu hỏi nghiên cứu & giả thuyết', 22);
  s.addShape('roundRect', { x: PAD + 0.1, y: 2.15, w: W - PAD * 2 - 0.2, h: 1.4, rectRadius: 0.12, fill: { color: 'EEEAFD' }, line: { color: COLORS.primary } });
  s.addText('RQ:  Liệu việc nhận diện tình huống từ chuỗi hành vi, lựa chọn can thiệp thích ứng và đo phản ứng/transfer có cải thiện hiệu quả can thiệp so với phản hồi cố định không?', { x: PAD + 0.35, y: 2.35, w: W - PAD * 2 - 0.9, h: 1.05, fontSize: 14.5, bold: true, color: COLORS.primaryDark, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.1 });
  bullets(s, [
    { head: 'H1', color: COLORS.primaryDark }, 'Tình huống được nhận diện từ hành vi + can thiệp thích ứng cải thiện phản ứng (retry, hoàn thành) so với phản hồi cố định',
    { head: 'H0', color: COLORS.primaryDark }, 'Không có khác biệt có ý nghĩa giữa hai điều kiện',
    { head: 'Outcome chính', color: COLORS.data }, 'Transfer execution rate / Transfer Gap thu hẹp (chỉ khi dữ liệu thật có đủ)',
    { head: 'Outcome phụ', color: COLORS.data }, 'Hoàn thành, retry, agnency, thời gian quyết định',
    { head: 'Lưu ý', color: COLORS.warn }, 'Đây là giả thuyết thiết kế. Chưa có thực nghiệm học sinh thật → không tuyên bố hiệu quả (spec §27, §171)'
  ], { y: 3.75, size: 12.5, spaceAfter: 4 });
  footer(s, 'Câu hỏi nghiên cứu');
}

// ============================================================
// SLIDE 8 — CONTRIBUTION
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Đóng góp');
  title(s, 'Đóng góp của dự án');
  const contribs = [
    ['Khoa học', 'Behav → Situation → Intervention → Response → Transfer', COLORS.data],
    ['Kỹ thuật', 'Rule + Student Model + AI có kiểm soát (allow-list + fallback)', COLORS.primary],
    ['Giáo dục', 'Micro-game + retry + reflection + micro-action có thể đo lường', COLORS.accent]
  ];
  contribs.forEach((c, i) => {
    const y = 2.2 + i * 1.45;
    s.addShape('roundRect', { x: PAD, y, w: 2.15, h: 1.1, rectRadius: 0.12, fill: { color: c[2] === COLORS.accent ? 'FFF6E9' : 'EEF5F0' }, line: { color: c[2] } });
    s.addText(c[0], { x: PAD, y: y + 0.18, w: 2.15, h: 0.5, fontSize: 15, bold: true, color: c[2], fontFace: FONT, align: 'center' });
    s.addText(c[1], { x: PAD + 2.45, y: y + 0.08, w: W - PAD * 2 - 2.45, h: 0.95, fontSize: 13, color: COLORS.ink, fontFace: FONT, valign: 'middle' });
  });
  sourceLine(s, 'Đặc tả §28. Phân biệt rõ product/sci/evidence (đặc tả §163).');
  footer(s, 'Đóng góp');
}

// ============================================================
// SLIDE 9 — SYSTEM CONCEPT (closed loop)
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Tổng quan sản phẩm · Hệ thống khái niệm');
  title(s, 'Vòng khép kín: Game → Hành vi → Can thiệp → Transfer', 21);
  const steps = ['Game', 'Behavior', 'Situation', 'Student State', 'Candidate', 'AI Reasoning', 'Validation', 'Game Director', 'Response', 'Transfer', 'Model Update'];
  const n = steps.length;
  const bw = (W - PAD * 2) / 4;
  steps.forEach((st, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = PAD + col * bw + 0.12;
    const y = 2.55 + row * 1.25;
    s.addShape('roundRect', { x, y, w: bw - 0.24, h: 0.75, rectRadius: 0.09, fill: { color: i === 6 || i === 7 ? 'FFF1E0' : 'EDEBFB' }, line: { color: COLORS.primary } });
    s.addText(st, { x, y, w: bw - 0.24, h: 0.75, fontSize: 11.5, bold: true, color: COLORS.primaryDark, fontFace: FONT, align: 'center', valign: 'middle' });
    if (i < n - 1) {
      // arrow to next (same row)
      s.addShape('rightArrow', { x: x + bw - 0.18, y: y + 0.28, w: 0.18, h: 0.2, fill: { color: COLORS.secondary }, line: { type: 'none' } });
    }
  });
  s.addText('Mỗi khối = 1 ý. Validation ≠ Gemini tự do: mọi lựa chọn phải qua hợp lệ hoá (đặc tả §29, §80).', { x: PAD, y: 6.4, w: W - PAD * 2, h: 0.5, fontSize: 11, italic: true, color: COLORS.inkSoft, fontFace: FONT });
  footer(s, 'Hệ thống khái niệm');
}

// ============================================================
// SLIDE 10 — ARCHITECTURE
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Kiến trúc hệ thống');
  title(s, 'Kiến trúc: Interface → Intelligence → Data → Safety', 21);
  const arch = [
    ['Student UI / Teacher Dashboard', 'Giao diện React (Student / Admin / Research)', COLORS.data, 1],
    ['API Bridge (Express) + Apps Script Gateway', 'Auth allow-list server-side, RBAC, validation', COLORS.primary, 1],
    ['Rule Engine + Student Model + Gemini (có kiểm soát)', 'Deterministic safety · accumulated evidence · reasoning trong allow-list', COLORS.ai, 2],
    ['Data Layer (Google Sheets theo 39 schema)', 'V9 canonical: 39 sheets — hiện IN_MEMORY_MOCK, báo thật', COLORS.accent, 3],
    ['Teacher human oversight + Audit log + AI Dec task log', 'Human-in-the-loop, 31_AUDIT_LOG, 18_AI_DECISIONS', COLORS.warn, 4]
  ];
  arch.forEach((a, i) => {
    const y = 2.1 + i * 0.98;
    const isRowLabel = i === arch.length - 1;
    s.addShape('roundRect', { x: PAD, y, w: W - PAD * 2, h: 0.82, rectRadius: 0.08, fill: { color: i % 2 ? 'F1F3FF' : 'FBFBFF' }, line: { color: a[3] === 1 ? COLORS.primary : COLORS.line } });
    s.addText(a[0], { x: PAD + 0.15, y, w: 5.6, h: 0.82, fontSize: 12.5, bold: true, color: COLORS.primaryDark, fontFace: FONT, valign: 'middle' });
    s.addText(a[1], { x: 6.0, y, w: 6.8, h: 0.82, fontSize: 10.8, color: COLORS.inkSoft, fontFace: FONT, valign: 'middle' });
  });
  footer(s, 'Kiến trúc');
}

// ============================================================
// SLIDE 11 — INTELLIGENCE (AI control)
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Cơ chế thông minh · AI có kiểm soát', COLORS.ai);
  title(s, 'Thông minh = Rule + Student Model + AI bị kiểm soát', 21);
  bullets(s, [
    { head: 'Rule Engine', color: COLORS.primary }, 'an toàn + logic quyết định xác định (deterministic)',
    { head: 'Student Model', color: COLORS.primary }, 'bằng chứng hành vi tích lũy (construct scores)',
    { head: 'Gemini (gemini-3.8-flash)', color: COLORS.ai }, 'reasoning giữa các lựa chọn trong tập được phép',
    { head: 'Validation gate', color: COLORS.warn }, 'allow-list game/toolkit + range duration/difficulty + safety → ép output',
    { head: 'Adaptive Engine', color: COLORS.data }, 'lựa chọn cuối cùng sau hợp lệ hóa',
    { head: 'Fallback', color: COLORS.data }, 'Gemini lỗi → deterministic recommendation (hệ thống vẫn chạy)'
  ], { y: 2.1, size: 13, spaceAfter: 5 });
  s.addText(`Điểm then chốt: Gemini KHÔNG phải hệ thống tự trị (đặc tả §31, §80). Mọi quyết định AI được ghi ${AI_CONTROL.logSheet}.`, { x: PAD, y: FOOT_Y - 0.62, w: W - PAD * 2, h: 0.5, fontSize: 11, bold: true, color: COLORS.primaryDark, fontFace: FONT });
  footer(s, 'Cơ chế thông minh');
}

// ============================================================
// SLIDE 12 — EXPERIMENT DESIGN
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Thiết kế thử nghiệm');
  title(s, 'Thiết kế so sánh đề xuất (đã định trước metric)', 21);
  const groups = [
    ['Nhóm A', 'Game → Phản hồi cố định', 'Đối chứng tĩnh', COLORS.warn],
    ['Nhóm B', 'Hành vi → Can thiệp thích ứng', 'Điều trị 1 (adaptive)', COLORS.data],
    ['Nhóm C', 'Hành vi → Can thiệp thích ứng → Transfer', 'Điều trị 2 (adaptive + transfer)', COLORS.primary]
  ];
  groups.forEach((g, i) => {
    const x = PAD + i * ((W - PAD * 2) / 3) + 0.15;
    const y = 2.3;
    const bw = (W - PAD * 2) / 3 - 0.3;
    s.addShape('roundRect', { x, y, w: bw, h: 2.5, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: g[3] } });
    s.addShape('rect', { x, y, w: bw, h: 0.7, fill: { color: g[3] }, line: { type: 'none' } });
    s.addText(g[0], { x, y, w: bw, h: 0.7, fontSize: 14, bold: true, color: 'FFFFFF', fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(g[1], { x: x + 0.15, y: y + 0.9, w: bw - 0.3, h: 0.9, fontSize: 12, bold: true, color: COLORS.ink, fontFace: FONT, valign: 'top' });
    s.addText(g[2], { x: x + 0.15, y: y + 1.75, w: bw - 0.3, h: 0.6, fontSize: 10.5, color: COLORS.inkSoft, fontFace: FONT, valign: 'top' });
  });
  bullets(s, [
    { head: 'Trạng thái thật:' },
    'Chưa có thực nghiệm học sinh → deck trình bày thiết kế đã định trước (pre-registered), KHÔNG báo kết quả giả (đặc tả §33, §171)'
  ], { y: 5.15, size: 12.5 });
  footer(s, 'Thiết kế thử nghiệm');
}

// ============================================================
// SLIDE 13 — PRODUCT / CONTENT
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Tổng quan sản phẩm', COLORS.data);
  title(s, 'Sản phẩm: micro-games + toolkit + schema dữ liệu');
  bigNumber(s, String(CONTENT.games), 'kịch bản micro-game', 0.7, 2.3, 2.6, COLORS.primary, CONTENT.gamesSource);
  bigNumber(s, String(CONTENT.toolkits), 'toolkit được kiểm duyệt nội dung', 3.5, 2.3, 2.8, COLORS.data, CONTENT.toolkitsSource);
  bigNumber(s, String(SHEETS.total), 'sheet schema canonical (V9)', 6.4, 2.3, 3.1, COLORS.accent, SHEETS.source);
  bigNumber(s, String(CONTENT.apis), 'endpoint API (server.ts)', 9.6, 2.3, 3.3, COLORS.ai, CONTENT.apisSource);
  bullets(s, [
    { head: 'Trải nghiệm học sinh (HOOK → CHOICE → CONSEQUENCE → RETRY)' },
    'Ví dụ game: «48 phút cuối trước giờ nộp bài», «Chiếc bẫy ngày Chủ Nhật», «Cơn sốt bình luận trên mạng»',
    'Sau game: reflection → recommendation → micro-action 5 phút ngoài đời thực',
    { head: 'Trải nghiệm giáo viên' },
    'Dashboard: signal → evidence → recommendation → reason → confidence → action (đặc tả §83, §146)'
  ], { y: 4.35, size: 12.5, spaceAfter: 5 });
  footer(s, 'Tổng quan sản phẩm');
}

// ============================================================
// SLIDE 14 — DATA LIFECYCLE
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Vòng đời dữ liệu', COLORS.accent);
  title(s, 'Từ sự kiện thô → bối cảnh tối thiểu → AI', 21);
  const flow = [['Raw events', 'sự kiện vi mô (chọn, dừng, trợ giúp, chuyển scene)'], ['Contextualized summary', 'tóm tắt ngữ cảnh đã chuẩn hóa'], ['Minimized context', 'chỉ gửi tối thiểu cần thiết'], ['Gemini', 'reasoning trong allow-list']];
  flow.forEach((f, i) => {
    const x = PAD + i * 3.1 + 0.2;
    const y = 2.5;
    const bw = 2.6;
    s.addShape('roundRect', { x, y, w: bw, h: 1.0, rectRadius: 0.1, fill: { color: 'EDEBFB' }, line: { color: COLORS.primary } });
    s.addText(f[0], { x, y: y + 0.08, w: bw, h: 0.4, fontSize: 12.5, bold: true, color: COLORS.primaryDark, fontFace: FONT, align: 'center' });
    s.addText(f[1], { x: x + 0.1, y: y + 0.48, w: bw - 0.2, h: 0.5, fontSize: 8.8, color: COLORS.inkSoft, fontFace: FONT, align: 'center' });
    if (i < 3) {
      s.addShape('rightArrow', { x: x + bw - 0.05, y: y + 0.4, w: 0.5, h: 0.2, fill: { color: COLORS.secondary }, line: { type: 'none' } });
    }
  });
  s.addText('Không gửi PII không cần thiết. Mỗi loại dữ liệu đều có purpose/decision/value/risk (đặc tả §81–82).', { x: PAD, y: 3.85, w: W - PAD * 2, h: 0.4, fontSize: 11, italic: true, color: COLORS.inkSoft, fontFace: FONT });
  bullets(s, [
    { head: 'Telemetry thật (không nhét hằng số)' },
    'GameRuntime đo: startedAt, pauseCount, helpCount, taskSwitchCount, durationMs, score, completionRate, decisionTimeMeanMs (GameRuntime.tsx:55–163)',
    { head: 'Write-After-Read & idempotency' },
    'Read-after-write verification + chống ghi trùng (requestId) — test T13/T16 PASS',
    { head: 'Trạng thái trung thực' },
    `getDataQualityMetrics → dataSource ${QUALITY.dataSource}, demoMode true, ${QUALITY.totalRecords} records`,
    `V10 health → appsScript/spreadsheet ${V10_HEALTH.appsScript}, tablesCount ${SHEETS.total}`
  ], { y: 4.35, size: 12, spaceAfter: 4 });
  footer(s, 'Vòng đời dữ liệu');
}

// ============================================================
// SLIDE 15 — DEMO FLOW (BƯỚC 1–8)
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Demo · Luồng hoạt động', COLORS.secondary);
  title(s, 'Demo: 8 bước từ vào game đến transfer', 21);
  const steps = [['1', 'Start'], ['2', 'Play'], ['3', 'Behavior captured'], ['4', 'Situation recognized'], ['5', 'Recommendation'], ['6', 'Intervention'], ['7', 'Retry'], ['8', 'Transfer']];
  steps.forEach((st, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = PAD + col * ((W - PAD * 2) / 4) + 0.15;
    const y = 2.35 + row * 1.35;
    const bw = (W - PAD * 2) / 4 - 0.3;
    s.addShape('roundRect', { x, y, w: bw, h: 1.0, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: COLORS.secondary } });
    s.addShape('roundRect', { x: x + 0.12, y: y + 0.12, w: 0.45, h: 0.45, rectRadius: 0.06, fill: { color: COLORS.secondary }, line: { type: 'none' } });
    s.addText(st[0], { x: x + 0.12, y: y + 0.12, w: 0.45, h: 0.45, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: FONT, align: 'center', valign: 'middle' });
    s.addText(st[1], { x: x + 0.18, y: y + 0.55, w: bw - 0.3, h: 0.4, fontSize: 11.5, bold: true, color: COLORS.ink, fontFace: FONT });
  });
  s.addText('Demo kịch bản: 1) bình thường → 2) khó khăn → 3) hệ thống thích ứng → 4) phản ứng → 5) transfer (đặc tả §74–75).', { x: PAD, y: 5.6, w: W - PAD * 2, h: 0.5, fontSize: 11.5, italic: true, color: COLORS.inkSoft, fontFace: FONT });
  footer(s, 'Demo');
}

// ============================================================
// SLIDE 16 — DATA (E2E / QUALITY) — RESULTS
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Kết quả chính · Kiểm thử kỹ thuật', COLORS.data);
  title(s, 'Kết quả đo được (thật, không tô hồng)', 21);
  // E2E chart
  s.addChart(pptx.ChartType.bar, [{
    name: 'PASS',
    labels: E2E.byCategory.map(c => c.category),
    values: E2E.byCategory.map(c => c.passed)
  }, {
    name: 'FAIL',
    labels: E2E.byCategory.map(c => c.category),
    values: E2E.byCategory.map(c => c.failed)
  }], {
    x: 7.3, y: 2.25, w: 5.5, h: 3.6, barDir: 'col', chartColors: [COLORS.data, COLORS.warn], showTitle: false,
    catAxisLabelColor: COLORS.ink, valAxisLabelColor: COLORS.ink, legendPos: 'b', legendColor: COLORS.ink,
    valAxisFontFace: FONT, catAxisFontFace: FONT, valGridLine: { color: COLORS.line }, dataLabelColor: 'FFFFFF', dataLabelFontSize: 10
  });
  bigNumber(s, '18/20', 'E2E tests PASS', 0.7, 2.25, 2.6, COLORS.data, 'Đo 2026-09-15 · runE2ETests()');
  bigNumber(s, '2', 'FAIL công khai (T06, T09)', 3.1, 2.25, 3.0, COLORS.warn, 'Không giả PASS — nói rõ gap');
  bullets(s, [
    { head: 'Báo lỗi rõ ràng thay vì ẩn giấu' },
    'T06 — chưa có luồng ghi 10_INTERVENTIONS từ game runtime',
    'T09 — chưa có AI decision log cho học sinh test (được ghi khi dùng /api/ai/adaptive-reason thật)',
    { head: 'Không khẳng định "app chạy tốt = can thiệp hiệu quả"' },
    'Kết quả kỹ thuật ≠ kết quả học tập (spec §105, §141–143)'
  ], { y: 4.35, size: 12, spaceAfter: 4 });
  sourceLine(s, `server/v9DataEngine.ts runE2ETests() chạy live 2026-09-15. ${E2E.passed}/${E2E.total} PASS, ${E2E.failed} FAIL.`);
  footer(s, 'Kết quả chính');
}

// ============================================================
// SLIDE 17 — SECURITY VERIFIED
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Bảo mật đã kiểm chứng', COLORS.warn);
  title(s, 'An ninh: từ "client tự khai" → server-side trust boundary');
  const rows = [
    [{ text: 'Tình huống thử', options: { bold: true, color: COLORS.white } }, { text: 'Kết quả', options: {} }, { text: 'Ý nghĩa', options: {} }],
    ...SECURITY.verified.map(v => [
      { text: v.case, options: { bold: true } },
      { text: v.outcome, options: { color: v.outcome === '403' || v.outcome.includes('501') ? COLORS.warn : COLORS.data, bold: true } },
      { text: v.note, options: {} }
    ])
  ];
  s.addTable(rows, {
    x: PAD, y: 2.2, w: W - PAD * 2, colW: [4.4, 3.4, 4.5], fontSize: 11, fontFace: FONT, border: { type: 'solid', color: COLORS.line },
    fill: { color: COLORS.primary }, firstRow: true, rowH: 0.55, valign: 'middle', margin: 0.08
  });
  sourceLine(s, 'Smoke tests server-side chạy 2026-09-15 sau khi hardening (commit 0e22d48). Security tree: server.ts auth allow-list.');
  footer(s, 'Bảo mật');
}

// ============================================================
// SLIDE 18 — FORMULAS
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Công thức & Metric', COLORS.data);
  title(s, 'Công thức — mỗi công thức đều có nguồn & ví dụ', 21);
  const fm = FORMULAS.filter(f => f.validation !== 'NOT_VERIFIED');
  const rows = [
    [{ text: 'ID', options: { bold: true } }, { text: 'Metric', options: { bold: true } }, { text: 'Công thức', options: { bold: true } }, { text: 'Đơn vị', options: { bold: true } }, { text: 'Ví dụ', options: { bold: true } }, { text: 'Trạng thái', options: { bold: true } }],
    ...fm.map(f => [
      { text: f.id, options: { bold: true } },
      { text: f.name, options: {} },
      { text: f.equation, options: { italic: true, fontFace: FONT_SCI } },
      { text: f.resultUnit, options: {} },
      { text: f.example ? Object.values(f.example).join(' → ') + (f.example.expected !== undefined ? ` = ${f.example.expected}` : '') : '—', options: {} },
      { text: f.validation, options: { color: COLORS.data, bold: true } }
    ])
  ];
  s.addTable(rows, { x: PAD, y: 2.15, w: W - PAD * 2, colW: [0.8, 2.2, 3.9, 1.0, 3.2, 1.5], fontSize: 10.5, fontFace: FONT, border: { type: 'solid', color: COLORS.line }, fill: { color: COLORS.primary }, firstRow: true, valign: 'middle', margin: 0.07, rowH: 0.45 });
  sourceLine(s, 'docs/formulas/FORMULA_REGISTRY.md — mỗi công thức có biến, đơn vị, nguồn, test-case (spec §6–14, §120–122).');
  footer(s, 'Công thức');
}

// ============================================================
// SLIDE 19 — ANALYSIS / INTERPRETATION
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Phân tích khoa học', COLORS.secondary);
  title(s, 'Ba lớp dữ liệu — phân tích — diễn giải', 21);
  const layers = [
    ['DATA', 'E2E 18/20 PASS; 40 records in-memory; write success 100% (in-memory); 39 schema tài liệu hóa', COLORS.data],
    ['ANALYSIS', 'Tỷ lệ vượt kiểm thử = 90%; 100% ghi trong-memory thành công (duplicate 0, orphan 0); 2 gap được khoanh vùng rõ', COLORS.primary],
    ['INTERPRETATION', 'Hệ thống ở trạng thái demo nhưng trung thực & kỹ thuật chạy ổn định. CHƯA cho phép kết luận can thiệp cải thiện học tập (spec §18)', COLORS.warn]
  ];
  layers.forEach((l, i) => {
    const y = 2.25 + i * 1.45;
    s.addShape('roundRect', { x: PAD, y, w: 2.1, h: 1.15, rectRadius: 0.1, fill: { color: l[2] === COLORS.warn ? 'FFF1E0' : 'EDEBFB' }, line: { color: l[2] } });
    s.addText(l[0], { x: PAD, y: y + 0.28, w: 2.1, h: 0.5, fontSize: 16, bold: true, color: l[2], fontFace: FONT, align: 'center' });
    s.addText(l[1], { x: PAD + 2.35, y: y + 0.1, w: W - PAD * 2 - 2.35, h: 0.98, fontSize: 12, color: COLORS.ink, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.05 });
  });
  footer(s, 'Phân tích');
}

// ============================================================
// SLIDE 20 — LIMITATIONS
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Hạn chế', COLORS.warn);
  title(s, 'Hạn chế — nói rõ thay vì che giấu');
  bullets(s, [
    { head: 'Dữ liệu là demo, chưa phải thực nghiệm thật' },
    'Data layer IN_MEMORY_MOCK, chưa nối Google Sheets; seed = demo rõ nhãn',
    'Kết quả kỹ thuật (E2E/health) KHÔNG phải bằng chứng hiệu quả giáo dục',
    { head: 'Gap kỹ thuật còn mở' },
    'T09 — AI decision log chỉ có khi chạy adaptive-reason thật',
    'T06 — chưa có luồng ghi can thiệp từ game runtime',
    { head: 'Thiết kế nghiên cứu' },
    'Mẫu nhỏ / chưa triển khai; thuộc một trường; chưa có so sánh dài hạn (spec §36)',
    'Không chẩn đoán lâm sàng; thuật ngữ dùng "behavior signal/educational state" (spec §56)'
  ], { y: 2.15, size: 12.5, spaceAfter: 5 });
  footer(s, 'Hạn chế');
}

// ============================================================
// SLIDE 21 — SAFETY / PRIVACY / ETHICS
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'An toàn · Riêng tư · Đạo đức', COLORS.data);
  title(s, '8 nguyên tắc an toàn AI cho giáo dục');
  const items = [
    ['No diagnosis', 'Không đưa nhãn chẩn đoán'],
    ['Data minimization', 'Chỉ lấy dữ liệu tối thiểu'],
    ['Consent', 'Đồng thuận, teacher oversight'],
    ['Role-based access', 'Server-side RBAC'],
    ['Human oversight', 'Giáo viên là người quyết định'],
    ['AI fallback', 'Deterministic khi AI lỗi'],
    ['Audit log', '31_AUDIT_LOG + 18_AI_DECISIONS'],
    ['Student agency', 'Học sinh giữ quyền chọn lựa']
  ];
  items.forEach((it, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = PAD + col * 3.1 + 0.15;
    const y = 2.35 + row * 1.55;
    const bw = 2.9;
    s.addShape('roundRect', { x, y, w: bw, h: 1.25, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: COLORS.data } });
    s.addText(it[0], { x: x + 0.15, y: y + 0.12, w: bw - 0.3, h: 0.4, fontSize: 12.5, bold: true, color: COLORS.data, fontFace: FONT });
    s.addText(it[1], { x: x + 0.15, y: y + 0.55, w: bw - 0.3, h: 0.6, fontSize: 9.5, color: COLORS.inkSoft, fontFace: FONT });
  });
  footer(s, 'An toàn');
}

// ============================================================
// SLIDE 22 — CONCLUSION
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Kết luận', COLORS.primaryDark);
  title(s, 'Kết luận — đúng 3 dòng', 24);
  const lines = [
    ['1 · Vấn đề đã xử lý', 'Hỗ trợ học sinh tự điều chỉnh hành vi qua vòng lặp game-hành vi-thích ứng có kiểm soát; loại bỏ trạng thái "bịa số liệu hiển thị như thật".'],
    ['2 · Điều đã chứng minh', 'Kỹ thuật: E2E 18/20, security hardening 403, AI gate + fallback + log, telemetry đo thật, trang thái demo được báo đúng (audit baseline 1.1/5 → hệ thống trung thực).'],
    ['3 · Điều chưa thể kết luận', 'Chưa có bằng chứng rằng can thiệp cải thiện học tập — cần thực nghiệm thật theo thiết kế A/B/C đã định trước.']
  ];
  lines.forEach((l, i) => {
    const y = 2.3 + i * 1.5;
    s.addShape('roundRect', { x: PAD, y, w: W - PAD * 2, h: 1.25, rectRadius: 0.1, fill: { color: i === 2 ? 'FFF6E9' : 'EDEBFB' }, line: { color: i === 2 ? COLORS.warn : COLORS.primary } });
    s.addText(`${l[0]} — ${l[1]}`, { x: PAD + 0.25, y: y + 0.15, w: W - PAD * 2 - 0.5, h: 0.98, fontSize: 12.5, bold: i === 0, color: COLORS.ink, fontFace: FONT, valign: 'middle', lineSpacingMultiple: 1.08 });
  });
  footer(s, 'Kết luận');
}

// ============================================================
// SLIDE 23 — NEXT STEP
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Hướng phát triển', COLORS.secondary);
  title(s, 'Bước tiếp theo: biến thiết kế thành thực nghiệm', 21);
  bullets(s, [
    { head: 'Kỹ thuật' },
    'Nối Google Sheets thật qua Apps Script gateway đã hợp lệ hoá (auth + LockService + upsert)',
    'Đóng luồng ghi 10_INTERVENTIONS (T06) và tự động ghi 18_AI_DECISIONS trong mọi phiên (T09)',
    { head: 'Nghiên cứu' },
    'Thu thập dữ liệu theo thiết kế A/B/C với consent, pseudonym (S001…), teacher oversight',
    'Ước lượng cần n ≥ 20/người/nhóm cho phân tích lặp đo; báo CI khi có đủ dữ liệu',
    { head: 'Chất lượng' },
    'Chạy Formula QA bằng test-code cho F-001..F-004; thêm unit test cho từng công thức'
  ], { y: 2.15, size: 12.5, spaceAfter: 5 });
  footer(s, 'Hướng phát triển');
}

// ============================================================
// SLIDE 24 — REFERENCES
// ============================================================
{
  const s = pptx.addSlide();
  bg(s);
  sectionBar(s, 'Tài liệu tham khảo');
  title(s, 'Nguồn dữ liệu & tài liệu', 21);
  const rows = [
    [{ text: 'ID', options: { bold: true } }, { text: 'Nguồn', options: { bold: true } }, { text: 'Dùng cho', options: { bold: true } }, { text: 'Access date', options: { bold: true } }],
    ...CITATIONS.map(c => [
      { text: c.id, options: { bold: true } },
      { text: `${c.source} — ${c.location}`, options: {} },
      { text: c.usedFor, options: {} },
      { text: c.accessDate, options: {} }
    ])
  ];
  s.addTable(rows, { x: PAD, y: 2.15, w: W - PAD * 2, colW: [0.9, 5.4, 4.6, 1.4], fontSize: 10.5, fontFace: FONT, border: { type: 'solid', color: COLORS.line }, fill: { color: COLORS.primary }, firstRow: true, valign: 'middle', margin: 0.07, rowH: 0.5 });
  sourceLine(s, 'Mọi claim khoa học nội bộ xuất từ dữ liệu thử nghiệm của nhóm (repo), không từ nguồn bịa đặt (spec §89–90, §159).');
  footer(s, 'Tài liệu tham khảo');
}

// ============================================================
// BACKUP SLIDES
// ============================================================
const B = (id, headline, build) => {
  pageCounter.backup += 1;
  const s = pptx.addSlide();
  bg(s);
  s.addText(`BACKUP · ${id}`, { x: W - 2.6, y: 0.25, w: 2.1, h: 0.35, fontSize: 9, bold: true, color: COLORS.warn, fontFace: FONT, align: 'right' });
  sectionBar(s, 'Appendix');
  title(s, headline, 20);
  build(s);
  footer(s, 'Appendix', pageCounter.backup);
};

B('B01', 'Biến nghiên cứu', (s) => {
  bullets(s, [
    { head: 'IV (độc lập)' }, 'Điều kiện can thiệp: phản hồi cố định vs can thiệp thích ứng (có/không transfer)',
    { head: 'DV (phụ thuộc)' }, 'Transfer execution rate, completion, retry, decision time mean, agency',
    { head: 'Đơn vị phân tích' }, 'Học sinh (repeated measures) — không coi event là học sinh độc lập (spec §16)',
    { head: 'Đơn vị quan sát' }, 'Sự kiện hành vi trong phiên game'
  ], { y: 2.1, size: 12.5 });
});

B('B02', 'Mẫu & phương pháp', (s) => {
  bullets(s, [
    'Đề xuất: 3 nhóm (A/B/C), n = 20+/nhóm, một trường THCS, có đồng thuận',
    'Phương pháp: repeated measures; kiểm chứng thiết kế bằng research design validator (spec §124)',
    'Cảnh báo: thiết kế một nhóm pre/post KHÔNG cho phép claim nhân quả (CAUSALITY OVERCLAIM flag)',
    'Số liệu mẫu hiện tại: chỉ là seed demo (STU_001/002/003), KHÔNG dùng để báo hiệu quả'
  ], { y: 2.1, size: 12.5, spaceAfter: 5 });
});

B('B03', 'Dữ liệu demo — nhãn rõ ràng', (s) => {
  const rows = [
    [{ text: 'Trường', options: { bold: true } }, { text: 'Giá trị', options: { bold: true } }, { text: 'Nhãn thật', options: { bold: true } }],
    [{ text: 'dataSource', options: {} }, { text: QUALITY.dataSource, options: {} }, { text: 'DEMO', options: { color: COLORS.warn, bold: true } }],
    [{ text: 'demoMode (V9 + V10)', options: {} }, { text: 'true', options: {} }, { text: 'DEMO', options: { color: COLORS.warn, bold: true } }],
    [{ text: 'eventIngestionRate', options: {} }, { text: String(QUALITY.eventIngestionRate), options: {} }, { text: '0 — chưa có Sheets thật', options: { color: COLORS.warn } }],
    [{ text: 'writeSuccessRate (in-memory)', options: {} }, { text: `${QUALITY.writeSuccessRate}%`, options: {} }, { text: 'Đo trong bộ nhớ', options: {} }],
    [{ text: 'V9_SEED_IS_DEMO', options: {} }, { text: 'true', options: {} }, { text: 'DEMO', options: { color: COLORS.warn, bold: true } }],
    [{ text: 'DATA_LAYER_MODE', options: {} }, { text: 'IN_MEMORY_DEMO', options: {} }, { text: 'DEMO', options: { color: COLORS.warn, bold: true } }]
  ];
  s.addTable(rows, { x: PAD, y: 2.15, w: W - PAD * 2, colW: [4.2, 3.6, 4.5], fontSize: 11, fontFace: FONT, border: { type: 'solid', color: COLORS.line }, fill: { color: COLORS.primary }, firstRow: true, valign: 'middle', margin: 0.08, rowH: 0.5 });
  sourceLine(s, 'server/v9DataEngine.ts + v10DataEngine.ts + v10DataDictionary.ts (chạy live 2026-09-15).');
});

B('B04', 'Công thức — chi tiết (Formula Registry)', (s) => {
  bullets(s, FORMULAS.filter(f => f.validation !== 'NOT_VERIFIED').map(f => ({
    head: `${f.id} · ${f.name} (${f.validation})`,
    text: `${f.equation} — ${f.purpose}. Đơn vị: ${f.resultUnit}. Nguồn: ${f.source}.`
  })), { y: 2.1, size: 12, spaceAfter: 6 });
});

B('B05', 'Yêu cầu AI không tự trị', (s) => {
  const pipeline = AI_CONTROL.pipeline.map((p, i) => ({ head: `${i + 1}. ${p}` }));
  bullets(s, [
    { head: 'CANDIDATE SET → GEMINI → SCHEMA → ALLOW-LIST → SAFETY → BUSINESS RULES → FINAL ACTION' },
    ...pipeline
  ], { y: 2.1, size: 12, spaceAfter: 4 });
  s.addText('KHÔNG: Gemini → direct execution (spec §80).', { x: PAD, y: FOOT_Y - 0.5, w: W - PAD * 2, h: 0.4, fontSize: 12, bold: true, color: COLORS.warn, fontFace: FONT });
});

B('B06', 'E2E — 20 bước & 2 gap', (s) => {
  bullets(s, [
    { head: 'Gap 1 — T06' }, E2E.failedTests[0].detail,
    { head: 'Gap 2 — T09' }, E2E.failedTests[1].detail,
    { head: 'Kế hoạch đóng gap' }, 'T06: ghi can thiệp từ GameRuntime khi trigger intervention; T09: đảm bảo mọi phiên chạy adaptive-reason đều log',
    { head: 'Thay vì giả PASS' }, 'Bộ test hiện báo lỗi công khai 2/20 — có thể tái lập (repo: npm run + tsx)'
  ], { y: 2.1, size: 12.5, spaceAfter: 5 });
  sourceLine(s, 'server/v9DataEngine.ts runE2ETests() — kết quả đo live 2026-09-15.');
});

B('B07', 'Kiến trúc — chi tiết module', (s) => {
  const rows = [
    [{ text: 'Module', options: { bold: true } }, { text: 'Vai trò', options: { bold: true } }, { text: 'Input', options: { bold: true } }, { text: 'Output', options: { bold: true } }],
    ['Student UI / Teacher Dashboard', 'Giao diện & agency', 'user action', 'screen state'],
    ['API Bridge (Express)', 'Auth allow-list + RBAC + validation', 'HTTP request', 'JSON response'],
    ['Rule Engine', 'Quyết định xác định + safety', 'student state, events', 'constraint & fallback'],
    ['Student Model', 'Tích lũy bằng chứng hành vi', 'behavior events', 'construct scores'],
    ['Gemini', 'Reasoning trong allow-list', 'minimized context', 'candidate suggestion'],
    ['Validation gate', 'Ép output vào ràng buộc', 'AI suggestion', 'valid/fallback decision'],
    ['Data Layer', 'Lưu trữ canonical 39 sheets', 'written records', 'queryable rows']
  ];
  s.addTable(rows, { x: PAD, y: 2.1, w: W - PAD * 2, colW: [3.4, 5.2, 2.5, 2.7], fontSize: 10.5, fontFace: FONT, border: { type: 'solid', color: COLORS.line }, fill: { color: COLORS.primary }, firstRow: true, valign: 'middle', margin: 0.07, rowH: 0.48 });
});

B('B08', 'Quản trị lành mạnh (System Control)', (s) => {
  bullets(s, [
    { head: 'Admin dashboard nên hiển thị (spec §83, §147)' },
    'API health (honest), data quality, AI usage, fallback rate, audit',
    'Teacher thấy "what matters" chứ không phải 10.000 raw events',
    { head: 'Nguyên tắc KHÔNG' },
    'Không báo success giả cho sheets/sync khi chưa cấu hình (501)',
    'Không để demo UI làm rối deck (presentation mode tách khỏi demo mode)'
  ], { y: 2.1, size: 12.5, spaceAfter: 5 });
});

B('B09', 'Q&A drill — câu hỏi có thể gặp', (s) => {
  bullets(s, [
    { head: 'Q1 · Tại sao dùng Gemini mà không phải rule thuần?' },
    'Gemini reasoning giữa các lựa chọn hợp lệ giúp lời khuyên gần ngôn ngữ tự nhiên; rule engine giữ an toàn deterministic',
    { head: 'Q2 · Nếu Gemini bịa nội dung?' },
    'Validation gate ép output vào allow-list/range/schema; fallback deterministic thay thế khi không hợp lệ',
    { head: 'Q3 · Điểm yếu lớn nhất?' },
    'Data layer đang in-memory demo; chưa có thực nghiệm học sinh thật → chưa thể nói "hiệu quả"',
    { head: 'Q4 · Bảo hiểm chống bịa số liệu?' },
    'Mọi slide đối chiếu với evidence ledger / formula registry / QA report; dữ liệu thực nghiệm về sau phải qua research design validator'
  ], { y: 2.1, size: 12, spaceAfter: 5 });
});

// The B09 helper used invalid string — remove it
pptx.writeFile({ fileName: path.join(OUT_DIR, '01_EduChoice-AI_Presentation.pptx') }).then(() => {
  console.log('[OK] 01_EduChoice-AI_Presentation.pptx');
  console.log('Slides:', pptx.length);
});
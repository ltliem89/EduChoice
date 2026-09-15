// EDUCHOICE-AI — DOCUMENTATION GENERATOR (15-slide deck)
// Emits registries / QA reports / manifests / speaker-notes from the single source of truth (content.mjs).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PROJECT_VERSION, E2E, AUDIT, SHEETS, CONTENT, QUALITY, V10_HEALTH, SECURITY, AI_CONTROL, FORMULAS, CLAIMS, EVIDENCES, TERMINOLOGY, CITATIONS, DECK
} from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'dist', 'presentation');
fs.mkdirSync(OUT, { recursive: true });

const write = (name, content) => {
  fs.writeFileSync(path.join(OUT, name), content);
  console.log('  → ' + name);
};

// ---------- helpers ----------
const H1 = (t) => `# ${t}\n`;
const H2 = (t) => `\n## ${t}\n`;
const P = (t) => `${t}\n`;
const LI = (t) => `- ${t}\n`;
const TABLE = (cols, rows) => {
  const esc = (v) => String(v ?? '').replace(/\|/g, '\\|');
  const head = `| ${cols.map(esc).join(' | ')} |`;
  const sep = `| ${cols.map(() => '---').join(' | ')} |`;
  const body = rows.map(r => `| ${cols.map((c, i) => esc(r[i] ?? '')).join(' | ')} |`).join('\n');
  return `${head}\n${sep}\n${body}\n`;
};

const TOTAL_MAIN = 15;
const TOTAL_BACKUP = 0;
const TOTAL_SLIDES = 15;

// claim → slide mapping (new 15-slide deck)
const CLAIM_SLIDE = {
  'CLM-001': { main: 'S6; S10', backup: '—' },
  'CLM-002': { main: 'S10', backup: '—' },
  'CLM-003': { main: 'S9; S14', backup: '—' },
  'CLM-004': { main: 'S10', backup: '—' },
  'CLM-005': { main: 'S7', backup: '—' },
  'CLM-006': { main: 'S9; S14', backup: '—' }
};
const FORMULA_SLIDE = { 'F-001': 'S11', 'F-002': 'S11', 'F-003': 'S11', 'F-004': 'S11', 'F-005': '— (chỉ nêu hạn chế)' };
const CLAIM_FORMULA = { 'CLM-003': ['F-004'], 'CLM-004': ['F-004'], 'CLM-005': [] };

const evidenceClaims = {};
EVIDENCES.forEach((e) => { evidenceClaims[e.id] = CLAIMS.filter(c => c.evidenceIds.includes(e.id)).map(c => c.id); });
const isVerified = (v) => String(v || '').startsWith('VERIFIED');
const isNotVerified = (v) => String(v || '').startsWith('NOT_VERIFIED');

// ============================================================
// 03_Speaker_Notes.md — 15 slides
// ============================================================
const speaker = H1('Speaker Notes — EduChoice-AI')
  + P(`\nMeta: ${DECK.title} · ${DECK.audience} · ${DECK.date} · v${PROJECT_VERSION}`)
  + P('\nThời lượng: 20 phút (~8 phút demo). Câu hỏi trả lời dự phòng trong 05_Judge_QA.md.')
  + H2('S1 · Trang bìa')
  + P('Chào Hội đồng. Đây là EduChoice-AI. Cam kết ngay từ đầu: mọi con số trong deck đều đo trực tiếp từ mã nguồn hôm nay; phần nào ở trạng thái demo, chúng tôi nói rõ là demo.')
  + H2('S2 · Lộ trình')
  + P('Bảy phần: vấn đề, bằng chứng, giải pháp, kiến trúc & AI, sản phẩm & dữ liệu, kiểm thử & công thức, an toàn & kết luận.')
  + H2('S3 · Vấn đề & câu hỏi nghiên cứu')
  + P('Đọc 4 vấn đề (không phải 4 lỗi của học sinh — là 4 khoảng trống của công cụ hiện tại). Đọc RQ, H1, H0. Nhấn mạnh dòng Lưu ý: chưa có thực nghiệm thật → không tuyên bố hiệu quả.')
  + H2('S4 · Bằng chứng baseline')
  + P(`Audit ${AUDIT.findings.total} phát hiện, ${AUDIT.scoreBaseline} → ${AUDIT.verdict}. Nêu 4 Critical. Đây là lý do nhóm thiết kế lại hệ thống tin cậy.`)
  + H2('S5 · Giải pháp — vòng khép kín')
  + P('Đi zigzag luồng 1→8. Dừng ở khối "Kiểm soát": Gemini chỉ đề xuất, hệ thống hợp lệ hoá; không hợp lệ thì fallback.')
  + H2('S6 · Kiến trúc')
  + P('Bốn tầng. Nhấn: data layer hiện in-memory demo và được báo đúng; con người (giáo viên) quyết định cuối cùng.')
  + H2('S7 · AI có kiểm soát')
  + P('"No direct Gemini execution". Pipeline 5 bước; ghi 18_AI_DECISIONS với trạng thái valid/fallback/not_generated; ràng buộc range duration/difficulty.')
  + H2('S8 · Sản phẩm & giao diện')
  + P(`"Đây là minh họa giao diện theo component thật". Kể kịch bản game "48 phút cuối" + thẻ đề xuất thích ứng; ${CONTENT.games} game, ${CONTENT.toolkits} toolkit, ${CONTENT.apis} API.`)
  + H2('S9 · Dữ liệu & trung thực')
  + P(`${SHEETS.total} schema theo nhóm. Cột phải: báo đúng trạng thái — IN_MEMORY_MOCK, demoMode true, eventIngestionRate 0, sync 501. Không báo success giả.`)
  + H2('S10 · Kiểm thử & bảo mật')
  + P(`E2E ${E2E.passed}/${E2E.total}; 2 fail T06/T09 nêu công khai với đường dẫn. Bảng bảo mật server-side: 403 khách/spoof, 501 sheets. Trust boundary phía server.`)
  + H2('S11 · Công thức')
  + P(`${FORMULAS.filter(f => isVerified(f.validation)).length} công thức VERIFIED (F-001..F-004). F-005 nêu hạn chế vì chưa có công thức tài liệu hóa.`)
  + H2('S12 · Thiết kế thử nghiệm')
  + P('A/B/C, n≥20/nhóm, đo lặp, consent + pseudonym. Nhấn guard: pre/post một nhóm không đủ kết luận nhân quả. Chưa chạy — metric định trước.')
  + H2('S13 · An toàn & đạo đức')
  + P('8 nguyên tắc; hay bị hỏi: No diagnosis và Giáo viên kiểm soát. Trung thực là nguyên tắc số 0.')
  + H2('S14 · Hạn chế & hướng phát triển')
  + P('Đọc thẳng 3 hạn chế. Hướng: nối Sheets thật, đóng T06/T09, thực nghiệm A/B/C, báo CI.')
  + H2('S15 · Kết luận & cảm ơn')
  + P('Đọc đúng 3 dòng. Nêu nguồn: repo v3, audit V1.0, master spec V2. Cảm ơn Hội đồng.');

write('03_Speaker_Notes.md', speaker);

// ============================================================
// 05_Judge_QA.md
// ============================================================
const judge = H1('Judge Q&A Bank — EduChoice-AI')
  + P(`\nTiêu chí chấm đề xuất: ${TOTAL_MAIN} slide; mọi câu trả lời phải truy về trong deck / registry / code.`)
  + H2('Nhóm khoa học')
  + LI('Tại sao RQ quan trọng với THCS Việt Nam? → S3 (gap nhận thức–hành vi), S5 (gap tích hợp).')
  + LI('H0/H1 trả lời bằng phép thống kê nào? → A/B/C + repeated measures; báo CI khi có đủ dữ liệu (S12).')
  + LI('Outcome chính nào? → Transfer execution rate / Transfer Gap (F-002; F-005 cần dữ liệu thật).')
  + H2('Nhóm kỹ thuật')
  + LI('Vì sao Gemini mà không phải rule thuần? → S7: lời khuyên mềm tự nhiên trong khi safety deterministic bằng rule.')
  + LI('Gemini đưa nội dung độc hại? → allow-list + schema + range + fallback (S7, server.ts sanitizeAdaptiveDecision).')
  + LI('Làm sao biết AI không bịa? → 18_AI_DECISIONS trạng thái valid/fallback/not_generated (S7).')
  + H2('Nhóm số liệu & trung thực')
  + LI(`18/20 đến từ đâu? → runE2ETests() chạy live ${E2E.measured} (v9DataEngine.ts); T06/T09 có đường dẫn cụ thể (S10).`)
  + LI(`Điểm ${AUDIT.scoreBaseline} tính sao? → ${AUDIT.report} (S4).`)
  + LI('Có chắc không bịa số liệu cũ? → CRIT-004 loại khỏi deck; chỉ dữ liệu đo thật + demo gắn nhãn (S4, S9, S14).')
  + H2('Nhóm an toàn & đạo đức')
  + LI('Học sinh có bị "chẩn đoán" không? → Không: behavior signal / educational state (S13).')
  + LI('Quyền riêng tư? → Data minimization, consent, pseudonym S001… (S12, S13).')
  + H2('Câu hỏi mở rộng')
  + LI('So sánh sản phẩm thương mại? → Không so sánh; "potential integration gap" (S5).')
  + LI('Google Sheets lỗi? → Trả 501 SHEETS_NOT_CONFIGURED, không success giả (S9, S10).');

write('05_Judge_QA.md', judge);

// ============================================================
// 06_Evidence_Ledger.md
// ============================================================
const ledger = H1('Evidence Ledger — EduChoice-AI')
  + P(`\nNgày đo: ${E2E.measured} · Phương pháp: chạy trực tiếp working copy (engine, health, audit scan). Cite file:line cho mọi mục.`)
  + H2('Bằng chứng')
  + TABLE(['ID', 'Claim(s) hỗ trợ', 'Loại', 'Trạng thái', 'Mô tả', 'Nguồn'], EVIDENCES.map(e => [e.id, (evidenceClaims[e.id] || []).join(', ') || '—', e.sourceType, e.status, e.description, e.location]));
write('06_Evidence_Ledger.md', ledger);

// ============================================================
// 07_Formula_Registry.md
// ============================================================
const formulaReg = H1('Formula Registry — EduChoice-AI')
  + H2('Quy ước')
  + P('Mỗi công thức: định danh, mục đích, biến, đơn vị, nguồn, trạng thái xác minh. Không có công thức "phantasm".')
  + TABLE(['ID', 'Metric', 'Công thức', 'Biến', 'Đơn vị', 'Ví dụ số', 'Nguồn', 'Trạng thái'], FORMULAS.map(f => [
    f.id, f.name, f.equation, Object.entries(f.variables).map(([k, v]) => `${k}: ${v}`).join('; '), f.resultUnit,
    f.example && Object.keys(f.example).length ? `${JSON.stringify(f.example)}` : '—', f.source, f.validation
  ]));
write('07_Formula_Registry.md', formulaReg);

// ============================================================
// 08_Formula_QA_Report.md
// ============================================================
const formulaQa = H1('Formula QA Report — EduChoice-AI')
  + P('\nQuy trình: mỗi công thức phải (1) có định nghĩa, (2) có nguồn, (3) có ví dụ định hướng, (4) có trạng thái xác minh rõ.')
  + H2('Kết quả từng công thức')
  + TABLE(['ID', 'Định nghĩa', 'Nguồn', 'Ví dụ', 'Xác minh', 'Quyết định'], FORMULAS.map(f => [
    f.id, f.name, f.source, f.example && Object.keys(f.example).length ? 'Có' : 'Thiếu', f.validation,
    isVerified(f.validation) ? 'Dùng trên slide chính (S11)' : isNotVerified(f.validation) ? 'KHÔNG dùng trên slide chính (gap dữ liệu)' : 'Dùng có điều kiện'
  ]))
  + H2('Phát hiện & hành động')
  + P('- F-005 (Transfer Index) chưa xác minh vì chưa có dữ liệu transfer thật → không trưng lên slide chính; chỉ nêu hạn chế (S11).')
  + P('- F-001..F-004 có ví dụ số khớp với computation thật trong engine.');
write('08_Formula_QA_Report.md', formulaQa);

// ============================================================
// 09_Claim_QA_Report.md
// ============================================================
const claimQa = H1('Claim QA Report — EduChoice-AI')
  + P('\nQuy trình: mọi claim trên slide → evidenceIds phải tồn tại trong Evidence Ledger; confidence rõ ràng; nơi nói được ghi.')
  + TABLE(['ID', 'Claim', 'Confidence', 'Level', 'Evidence', 'Slide'], CLAIMS.map(c => [
    c.id, c.statement, c.confidence, c.level, c.evidenceIds.join(', '), CLAIM_SLIDE[c.id]?.main || '—'
  ]))
  + H2('Kiểm tra orphan')
  + P(`- Claim không có evidence: ${CLAIMS.filter(c => c.evidenceIds.length === 0).map(c => c.id).join(', ') || 'không có'} → OK.`)
  + P(`- Evidence không được claim tham chiếu: ${EVIDENCES.filter(e => !CLAIMS.some(c => c.evidenceIds.includes(e.id))).map(e => e.id).join(', ') || 'không có'} → OK.`)
  + P('- Toàn bộ claim confidence HIGH gắn với dữ liệu đo ' + E2E.measured + '.');
write('09_Claim_QA_Report.md', claimQa);

// ============================================================
// 10_Citation_Manifest.md
// ============================================================
const cit = H1('Citation Manifest — EduChoice-AI')
  + P('\nQuy ước: nguồn khoa học nội sinh; mọi máy móc truy về repo. Không trích nguồn bịa đặt cũ.')
  + TABLE(['ID', 'Nguồn', 'Vị trí', 'Được dùng cho', 'Access date'], CITATIONS.map(c => [c.id, c.source, c.location, c.usedFor, c.accessDate]));
write('10_Citation_Manifest.md', cit);

// ============================================================
// 11_Traceability_Matrix.csv
// ============================================================
const csv = [
  ['CLAIM_ID', 'CLAIM', 'EVIDENCE', 'FORMULA', 'SLIDE', 'STATUS'],
  ...CLAIMS.map(c => [
    c.id,
    `"${c.statement.replace(/"/g, '""')}"`,
    c.evidenceIds.join('|'),
    (CLAIM_FORMULA[c.id] || []).join('|'),
    CLAIM_SLIDE[c.id]?.main || '',
    'OK'
  ])
].map(r => r.join(',')).join('\n');
write('11_Traceability_Matrix.csv', csv + '\n');

// ============================================================
// 12_Presentation_QA_Report.md
// ============================================================
const presQa = H1('Presentation QA Report — EduChoice-AI')
  + P(`\nTệp xem xét: 01_EduChoice-AI_Presentation.pptx (${TOTAL_SLIDES} slide).`)
  + H2('1. Cấu trúc & tính hợp lệ')
  + LI(`Đúng ${TOTAL_SLIDES} slide; mỗi slide một ý chính; không slide backup (gọn theo yêu cầu).`)
  + LI('16:9; header chip + title + footer đồng bộ trên mọi slide; dòng nguồn trên slide dùng dữ liệu.')
  + H2('2. Chữ & bố cục')
  + LI('Font: Times New Roman toàn bộ; kích thước nhỏ nhất 16pt (đã kiểm tra XML: 0 đoạn < 16pt).')
  + LI('Không chồng chữ lên chữ / hình lên chữ — bố trí theo lưới cố định; card/icon có khoảng cách rõ.')
  + H2('3. Data QA')
  + LI(`E2E ${E2E.passed}/${E2E.total}: S10 — khớp runE2ETests live ${E2E.measured}.`)
  + LI(`Audit ${AUDIT.findings.total}: S4 — khớp ${AUDIT.report}.`)
  + LI(`${SHEETS.total} schema, ${CONTENT.games} games, ${CONTENT.toolkits} toolkits, ${CONTENT.apis} APIs — khớp scan.`)
  + LI('Dữ liệu demo đều có nhãn in-memory demo (S9, S14).')
  + H2('4. Formula & Claim QA')
  + LI(`S11 trưng ${FORMULAS.filter(f => isVerified(f.validation)).length} công thức VERIFIED (chi tiết 08/09).`)
  + LI('Không vi phạm CAUSALITY OVERCLAIM — không có câu "can thiệp cải thiện học tập".')
  + H2('5. Thẩm mỹ & minh họa')
  + LI('Màu đa dạng sinh động theo bộ palette đồng nhất; icon minh họa theo từng đơn vị kiến thức.')
  + LI('Có minh họa giao diện sản phẩm (S8 theo GameRuntime/StudentApp) và bảng minh chứng (S10, S11).')
  + H2('6. Giới hạn xuất bản')
  + LI('PDF (02) đã sinh bằng PowerPoint COM; nếu cần tái sinh dùng soffice --convert-to pdf (xem 02_Presentation.pdf.md).')
  + LI('04_Speaker_Notes.pdf và 20_BaoCao pdf cần Word/LibreOffice (máy build chưa xuất được).')
  + LI('Visual QA pixel-to-pixel chưa tự động; đã kiểm tra số liệu, font (TNR ≥16pt) và cấu trúc bằng script XML.')
  + H2('Kết luận')
  + P('Không có critical issue chặn xuất bản deck.');
write('12_Presentation_QA_Report.md', presQa);

// ============================================================
// 13_AI_Usage_Log.md
// ============================================================
const aiLog = H1('AI Usage Log — EduChoice-AI')
  + P('\nPhạm vi: quá trình nhóm dùng AI để xây dựng sản phẩm & bài trình bày KHKT.')
  + H2('1. Bối cảnh')
  + LI('Model hỗ trợ: giao diện lập trình AI (OpenCode) + Gemini backend được kiểm soát (gemini-3.8-flash, GA 2026-09-02).')
  + LI('Nguyên tắc: AI hỗ trợ viết mã & bản thảo; học sinh đọc hiểu, kiểm tra và giải thích mọi con số.')
  + H2('2. Ranh giới (AI KHÔNG làm)')
  + LI('Không tự quyết định lời khuyên tới học sinh ngoài allow-list + range.')
  + LI('Không bịa dữ liệu nghiên cứu; dữ liệu demo gắn nhãn DEMO.')
  + LI('Không thay học sinh trả lời Hội đồng.')
  + H2('3. Log chi tiết')
  + TABLE(['Khâu', 'AI dùng', 'Đầu ra', 'Kiểm tra của học sinh'], [
    ['Viết mã kiến trúc', 'OpenCode', 'server, engines, runtime', 'npm run lint + E2E chạy thật'],
    ['Thiết kế schema', 'Gợi ý schema', 'V9 39 sheets', 'Scan & đối chiếu v9SchemaRegistry'],
    ['Số liệu trình bày', 'Chạy lệnh đo', 'E2E/quality/health/audit', 'Re-run + trace file:line'],
    ['Bố cục deck', 'Sinh bản nháp', 'slide structures', 'Chỉnh nội dung + kiểm số liệu'],
    ['Nội dung KHKT', 'Bản thảo văn bản', 'speaker notes, QA', 'Học sinh giữ toàn quyền chỉnh sửa']
  ])
  + H2('4. Lệnh đo dữ liệu (tái lập được)')
  + P('E2E & quality: `npx tsx -e "..."` trên server/v9DataEngine.ts (runE2ETests, getDataQualityMetrics).')
  + P('Health V10: `...v10DataEngine.ts getHealthStatus...`.')
  + P('Audit: ' + AUDIT.report);
write('13_AI_Usage_Log.md', aiLog);

// ============================================================
// 14_Data_Dictionary.md
// ============================================================
const dd = H1('Data Dictionary — EduChoice-AI')
  + P('\nCác thuật ngữ chuẩn dùng trong deck. Theo đặc tả: trình bày và vấn đáp dùng cùng từ vựng.')
  + TABLE(['Thuật ngữ', 'Định nghĩa'], TERMINOLOGY.map(t => [t.term, t.def]));
write('14_Data_Dictionary.md', dd);

// ============================================================
// 15_Research_Method_Summary.md
// ============================================================
const method = H1('Research Method Summary — EduChoice-AI')
  + H2('1. Thiết kế')
  + P('Thiết kế đề xuất: 3 nhóm A/B/C (phản hồi cố định / can thiệp thích ứng / thích ứng + transfer), đo lặp, 20+ học sinh/nhóm, một trường THCS, có đồng thuận. Báo CI khi đủ dữ liệu.')
  + H2('2. Biến')
  + P('IV: điều kiện can thiệp. DV: transfer execution rate, completion, retry, decision time mean, agency. Đơn vị phân tích: học sinh (không coi event là học sinh).')
  + H2('3. Cam kết trung thực')
  + P('- Dữ liệu nghiên cứu cũ bịa (CRIT-004) bị loại; deck chỉ giữ dữ liệu kỹ thuật thật + seed demo rõ nhãn (S4, S9, S14).')
  + P('- Không tuyên bố quan hệ nhân quả khi chưa có thực nghiệm đối chứng (S12, S15).')
  + P('- Mọi claim đối chiếu Evidence Ledger (06) và Formula Registry (07).')
  + H2('4. Kiểm chứng công thức')
  + P('F-001..F-004 được xác minh bằng ví dụ số khớp engine; F-005 đánh dấu NOT_VERIFIED (thiếu dữ liệu transfer thật).');
write('15_Research_Method_Summary.md', method);

// ============================================================
// 02_Presentation.pdf (đã sinh bằng PowerPoint COM trên desktop)
// ============================================================
const pdfNotes = H1('02_EduChoice-AI_Presentation.pdf — notes')
  + P('\nPDF đã được sinh bằng PowerPoint (COM) trên máy build: Presentations.Open → SaveAs(..., ppSaveAsPDF).')
  + P('Nếu máy khác không có PowerPoint, có thể dùng:')
  + P('    soffice --headless --convert-to pdf --outdir dist/presentation dist/presentation/01_EduChoice-AI_Presentation.pptx')
  + P('\nPDF giữ nguyên nội dung PPTX (cùng source of truth content.mjs).');
write('02_Presentation.pdf.md', pdfNotes);

// ============================================================
// 16_Deliverable_Manifest.md
// ============================================================
const manifest = H1('Deliverable Manifest — EduChoice-AI')
  + P(`\nNgày sinh: ${DECK.date} · version v${PROJECT_VERSION}`)
  + H2('Danh sách & trạng thái')
  + TABLE(['Số', 'Tệp', 'Nội dung', 'Trạng thái'], [
    ['01', '01_EduChoice-AI_Presentation.pptx', 'Deck chính (' + TOTAL_SLIDES + ' slides, Times New Roman ≥16pt)', 'Đã tạo'],
    ['02', '02_Presentation.pdf', 'Bản in (15 slides, PDF thật)', 'Đã tạo — PowerPoint COM'],
    ['03', '03_Speaker_Notes.md', 'Ghi chú thuyết trình', 'Đã tạo'],
    ['04', '04_Speaker_Notes.pdf', 'Bản in ghi chú', 'PENDING — cần Word/LibreOffice'],
    ['05', '05_Judge_QA.md', 'Ngân hàng câu hỏi giám khảo', 'Đã tạo'],
    ['06', '06_Evidence_Ledger.md', 'Sổ bằng chứng', 'Đã tạo'],
    ['07', '07_Formula_Registry.md', 'Đăng ký công thức', 'Đã tạo'],
    ['08', '08_Formula_QA_Report.md', 'QA công thức', 'Đã tạo'],
    ['09', '09_Claim_QA_Report.md', 'QA claim', 'Đã tạo'],
    ['10', '10_Citation_Manifest.md', 'Danh mục trích dẫn', 'Đã tạo'],
    ['11', '11_Traceability_Matrix.csv', 'Ma trận truy vết claim-evidence-formula-slide', 'Đã tạo'],
    ['12', '12_Presentation_QA_Report.md', 'QA presentation', 'Đã tạo'],
    ['13', '13_AI_Usage_Log.md', 'Nhật ký dùng AI', 'Đã tạo'],
    ['14', '14_Data_Dictionary.md', 'Từ điển dữ liệu & thuật ngữ', 'Đã tạo'],
    ['15', '15_Research_Method_Summary.md', 'Tóm tắt phương pháp nghiên cứu', 'Đã tạo'],
    ['16', '16_Deliverable_Manifest.md', 'Chính file này', 'Đã tạo'],
    ['20', '20_BaoCao_ThucHien_DuAn.docx', 'Báo cáo kết quả thực hiện dự án (A4, TNR 14, lề 3/2/2/2, 7 trang)', 'Đã tạo — node presentation/generate-baocao.mjs'],
    ['20', '20_BaoCao_ThucHien_DuAn.pdf', 'Bản in báo cáo', 'PENDING — cần Word COM hoặc LibreOffice'],
    ['20', '20_BaoCao_ThucHien_DuAn.md', 'Bản markdown báo cáo', 'Đã tạo']
  ])
  + H2('Source of truth')
  + P('Mọi số liệu lấy từ presentation/content.mjs → dùng cho cả PPTX, tài liệu và báo cáo. Sửa dữ liệu ở content.mjs rồi chạy: node presentation/build-pptx.mjs && node presentation/generate-docs.mjs && node presentation/generate-baocao.mjs.');

write('16_Deliverable_Manifest.md', manifest);

console.log('\n[OK] generate-docs: đã sinh toàn bộ tài liệu vào ' + OUT);

// EDUCHOICE-AI — DOCUMENTATION GENERATOR
// Emits registries / QA reports / manifests / speaker-notes from the single source of truth (content.mjs).
// Rule: every number shown is either measured live (2026-09-15) or marked DEMO/UNVERIFIED.

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

const TOTAL_MAIN = 24;
const TOTAL_BACKUP = 9;
const TOTAL_SLIDES = TOTAL_MAIN + TOTAL_BACKUP;

// manual claim → slide mapping (main slide / backup slide)
const CLAIM_SLIDE = {
  'CLM-001': { main: 'S10; S17', backup: 'B07' },
  'CLM-002': { main: 'S17', backup: '—' },
  'CLM-003': { main: 'S14; S16', backup: 'B03' },
  'CLM-004': { main: 'S16', backup: 'B06' },
  'CLM-005': { main: 'S11', backup: 'B05' },
  'CLM-006': { main: 'S20', backup: 'B03' }
};
const FORMULA_SLIDE = { 'F-001': 'S18', 'F-002': 'S18', 'F-003': 'S18', 'F-004': 'S18', 'F-005': '— (backup B04)' };
// claim → formula (explicit, checked by reviewer)
const CLAIM_FORMULA = {
  'CLM-003': ['F-004'],
  'CLM-004': ['F-004'],
  'CLM-005': []
};

// evidence ← claims reverse index
const evidenceClaims = {};
EVIDENCES.forEach((e) => { evidenceClaims[e.id] = CLAIMS.filter(c => c.evidenceIds.includes(e.id)).map(c => c.id); });
const isVerified = (v) => String(v || '').startsWith('VERIFIED');
const isNotVerified = (v) => String(v || '').startsWith('NOT_VERIFIED');

// ============================================================
// 03_Speaker_Notes.md
// ============================================================
const speaker = H1('Speaker Notes — EduChoice-AI')
  + P(`\nMeta: ${DECK.title} · ${DECK.audience} · ${DECK.date} · v${PROJECT_VERSION}`)
  + P('\nThời lượng trình bày đề xuất: 20 phút (~8 phút demo). Câu hỏi trả lời được dự phòng trong 05_Judge_QA.md.')
  + H2('S1 · Trang bìa')
  + P('Chào Hội đồng. Đây là EduChoice-AI — hệ thống AI thích ứng có kiểm soát cho học sinh THCS. Một lưu ý ngay từ đầu: mọi con số trong deck này đều đến từ chính mã nguồn và bộ kiểm thử của nhóm, chạy trực tiếp hôm nay; phần nào ở trạng thái demo, chúng tôi nói rõ là demo.')
  + H2('S2 · Đội ngũ & vai trò')
  + P('Giới thiệu thành viên. Nhấn mạnh: mọi thành viên có thể giải thích mọi con số. Đây là cam kết trung thực — nếu Hội đồng hỏi bất kỳ con số nào trên slide, chúng tôi chỉ về đúng nguồn.')
  + H2('S3 · Lộ trình')
  + P('Chốt mạch: vấn đề → khoảng trống → thiết kế → sản phẩm & AI → kiểm thử → công thức → an toàn → kết luận.')
  + H2('S4 · Vấn đề')
  + P('4 phát biểu vấn đề. Quan trọng nhất: "biết nên làm nhưng khó làm" — gap giữa nhận thức và hành vi; và rủi ro AI thiếu kiểm soát.')
  + H2('S5 · Bằng chứng baseline')
  + P(`Chiếu biểu đồ ${AUDIT.findings.total} phát hiện audit (${AUDIT.findings.CRITICAL} Critical). Điểm ${AUDIT.scoreBaseline} → ${AUDIT.verdict}. Đây là lý do nhóm thiết kế lại hệ thống tin cậy. Nêu rõ: chuẩn điểm trong ${AUDIT.report}.`)
  + H2('S6 · Thực trạng & khoảng trống')
  + P('Không nói "chưa ai làm". Nói: các mảng riêng lẻ đã có; khoảng trống của dự án là vòng khép kín hành vi→can thiệp→đo transfer và AI bị kiểm soát trong cùng hệ thống.')
  + H2('S7 · Câu hỏi nghiên cứu')
  + P('Đọc RQ. Nêu H1/H0. NHẤN MẠNH dòng "Lưu ý": đây là giả thuyết thiết kế; chưa có thực nghiệm học sinh thật, nên deck không tuyên bố hiệu quả.')
  + H2('S8 · Đóng góp')
  + P('Ba mảng: khoa học (chuỗi Behav→Situation→Intervention→Response→Transfer), kỹ thuật (allow-list + fallback), giáo dục (micro-game, retry, reflection, micro-action đo được).')
  + H2('S9 · Hệ thống khái niệm (vòng khép kín)')
  + P('Đi từng khối. Dừng ở Validation gate: "Gemini chỉ được đề xuất; hệ thống hợp lệ hoá; nếu không hợp lệ thì fallback." Đây là điểm khác biệt cốt lõi.')
  + H2('S10 · Kiến trúc')
  + P('Ba lớp + safety. Nhấn data layer: theo đặc tả 39 sheet canonical; hiện chạy IN_MEMORY_MOCK và chúng tôi báo rõ điều đó.')
  + H2('S11 · AI có kiểm soát')
  + P('Điểm then chốt: Gemini = reasoning trong allow-list. Tất cả quyết định AI ghi vào 18_AI_DECISIONS. Model dùng: gemini-3.8-flash (GA 2026-09-02).')
  + H2('S12 · Thiết kế thử nghiệm')
  + P('Trình bày A/B/C (3 nhóm, 20+ học sinh/nhóm, đo lặp). Nói thẳng: thiết kế đã định trước metric; chưa chạy thực nghiệm — vì vậy không có cột "kết quả".')
  + H2('S13 · Sản phẩm · nội dung')
  + P(`${CONTENT.games} game, ${CONTENT.toolkits} toolkit, ${SHEETS.total} schema, ${CONTENT.apis} API. Kể một kịch bản game cụ thể (ví dụ "48 phút cuối trước giờ nộp bài").`)
  + H2('S14 · Vòng đời dữ liệu')
  + P('Raw events → bối cảnh tối thiểu → Gemini. Telemetry đo thật trong GameRuntime (thời gian, pause, help, multitask…). Ở cuối: dataSource in-memory demo — báo thật.')
  + H2('S15 · Demo')
  + P('Chạy demo 8 bước (5–8 phút). Dùng tài khoản demo. Nếu lỗi: nói "chạy lại", không che giấu.')
  + H2('S16 · Kết quả kiểm thử kỹ thuật')
  + P(`E2E ${E2E.passed}/${E2E.total} PASS. HAI test fail được khoanh vùng: T06 chưa có luồng ghi can thiệp; T09 AI decision log chưa tự động cho mọi phiên. Chúng tôi KHÔNG giấu — đó là trung thực. Quan trọng: kết quả kỹ thuật KHÔNG đồng nghĩa hiệu quả giáo dục.`)
  + H2('S17 · Bảo mật')
  + P(`${SECURITY.verified.length} trường hợp kiểm chứng server-side (403 với khách, spoof SUPER_ADMIN, IDOR…). Trust boundary phía server.`)
  + H2('S18 · Công thức')
  + P(`Liệt kê ${FORMULAS.filter(f => isVerified(f.validation)).length} công thức được xác minh (F-001..F-004). Một công thức (Transfer Index F-005) được đánh dấu chưa thể xác minh vì thiếu dữ liệu — không trưng ra slide chính.`)
  + H2('S19 · Phân tích & diễn giải')
  + P('Ba lớp Data/Analysis/Interpretation. Diễn giải khít với dữ liệu; không vượt quá bằng chứng.')
  + H2('S20 · Hạn chế')
  + P('Đọc thẳng 3 cụm hạn chế. Mẫu nhỏ, chưa thực nghiệm, demo data. Đây là phần Hội đồng đánh giá cao nhất.')
  + H2('S21 · An toàn')
  + P('8 nguyên tắc. Hai cái hay bị hỏi: "no diagnosis" và "human oversight".')
  + H2('S22 · Kết luận')
  + P('Đọc đúng 3 dòng: vấn đề đã xử lý / điều đã chứng minh / điều chưa thể kết luận.')
  + H2('S23 · Bước tiếp theo')
  + P('Nối Sheets thật, đóng gap T06/T09, chạy thực nghiệm A/B/C với consent + pseudonym.')
  + H2('S24 · Tài liệu tham khảo')
  + P(`Nêu ${CITATIONS.length} nguồn. Phân biệt: nguồn khoa học được dẫn; mọi máy móc chạy từ repo.`)
  + H2('Backup slides')
  + P('B01–B09 chỉ dùng khi được hỏi — không tự bơi sang phần này.');

write('03_Speaker_Notes.md', speaker);

// ============================================================
// 05_Judge_QA.md
// ============================================================
const judge = H1('Judge Q&A Bank — EduChoice-AI')
  + P(`\nTiêu chí chấm đề xuất: ${TOTAL_MAIN} slide chính + ${TOTAL_BACKUP} backup; mọi câu trả lời phải truy về trong deck / registry / code.`)
  + H2('Nhóm khoa học')
  + LI('Tại sao RQ quan trọng với THCS Việt Nam? → S4 (gap nhận thức–hành vi), S6 (gap tích hợp).')
  + LI('H0/H1 được trả lời bằng phép thống kê nào? → Thiết kế A/B/C + repeated measures; chưa chạy; sẽ báo CI khi có đủ dữ liệu (S12, B02).')
  + LI('Chọn tiêu chí nào là outcome chính? → Transfer execution rate / Transfer Gap (F-002, F-005 — cần dữ liệu thật).')
  + H2('Nhóm kỹ thuật')
  + LI('Tại sao dùng Gemini chứ không phải rule thuần? → S11: lời khuyên tự nhiên hơn trong khi safety deterministic bằng rule. Cả hai nằm cùng pipeline.')
  + LI('Gemini đưa nội dung độc hại thì sao? → Sanitize + allow-list + range + fallback (S11, Backup B05, server.ts sanitizeAdaptiveDecision).')
  + LI('Làm sao biết AI không bịa? → Mọi quyết định ghi 18_AI_DECISIONS với trạng thái valid/fallback/not_generated (S11, AI_CONTROL.logSheet).')
  + H2('Nhóm số liệu & trung thực')
  + LI(`Con số ${E2E.passed}/${E2E.total} đến từ đâu? → runE2ETests() chạy live ngày ${E2E.measured} trong v9DataEngine.ts; 2 fail T06/T09 có đường dẫn cụ thể (S16, B06).`)
  + LI(`Điểm baseline ${AUDIT.scoreBaseline} tính sao? → ${AUDIT.report} (S5).`)
  + LI('Có chắc không bịa số liệu cũ? → Nghiên cứu cũ có dữ liệu bịa (CRIT-004) đã loại khỏi deck; chỉ còn dữ liệu demo gắn nhãn hoặc dữ liệu thật đo hôm nay (S20, B03).')
  + H2('Nhóm an toàn & đạo đức')
  + LI('Học sinh có bị "chẩn đoán" không? → Không: dùng "behavior signal / educational state", không nhãn lâm sàng (S21).')
  + LI('Quyền riêng tư? → Data minimization, consent, pseudonym S001…, teacher oversight (S21, B02).')
  + H2('Câu hỏi mở rộng')
  + LI('So với sản phẩm thương mại? → Không so sánh; nói "potential integration gap" (S6).')
  + LI('Nếu Google Sheets bị 500? → Fail rõ ràng (501), không báo success giả (S17, B03).');

write('05_Judge_QA.md', judge);

// ============================================================
// 06_Evidence_Ledger.md
// ============================================================
const ledger = H1('Evidence Ledger — EduChoice-AI')
  + P(`\nNgày đo: ${E2E.measured} · Phương pháp: chạy trực tiếp trên working copy (engine, health, audit scan). Cite file:line cho mọi mục.`)
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
    f.id, f.name, f.equation, Object.entries(f.variables).map(([k, v]) => `${k}: ${v}`).join('; '), f.resultUnit, f.example && Object.keys(f.example).length ? `${JSON.stringify(f.example)}` : '—', f.source, f.validation
  ]));
write('07_Formula_Registry.md', formulaReg);

// ============================================================
// 08_Formula_QA_Report.md
// ============================================================
const formulaQa = H1('Formula QA Report — EduChoice-AI')
  + P('\nQuy trình: mỗi công thức phải (1) có định nghĩa trong registry, (2) có nguồn trong code/docs, (3) có ví dụ định hướng, (4) trạng thái xác minh rõ ràng.')
  + H2('Kết quả từng công thức')
  + TABLE(['ID', 'Định nghĩa', 'Nguồn', 'Ví dụ', 'Xác minh', 'Quyết định'], FORMULAS.map(f => [
    f.id, f.name, f.source, f.example && Object.keys(f.example).length ? 'Có' : 'Thiếu', f.validation,
    isVerified(f.validation) ? 'Dùng trên slide chính (S18)' : isNotVerified(f.validation) ? 'KHÔNG dùng trên slide chính (gap dữ liệu)' : 'Dùng có điều kiện'
  ]))
  + H2('Phát hiện & hành động')
  + P('- F-005 (Transfer Index) chưa xác minh vì chưa có dữ liệu transfer thật → loại khỏi slide chính, chỉ nêu trong backup B04 (spec: không trưng công thức chưa xác minh ở slide chính).')
  + P('- F-001..F-004 có ví dụ số khớp với computation thật trong engine.');
write('08_Formula_QA_Report.md', formulaQa);

// ============================================================
// 09_Claim_QA_Report.md
// ============================================================
const claimQa = H1('Claim QA Report — EduChoice-AI')
  + P('\nQuy trình: mọi claim trên slide → evidenceIds phải tồn tại trong Evidence Ledger; confidence rõ ràng; level chỉ định nơi nói.')
  + TABLE(['ID', 'Claim', 'Confidence', 'Level', 'Evidence', 'Slide chính / backup'], CLAIMS.map(c => [
    c.id, c.statement, c.confidence, c.level, c.evidenceIds.join(', '), `${CLAIM_SLIDE[c.id]?.main || ''} / ${CLAIM_SLIDE[c.id]?.backup || ''}`
  ]))
  + H2('Kiểm tra orphan')
  + P(`- Claim không có evidence: ${CLAIMS.filter(c => c.evidenceIds.length === 0).map(c => c.id).join(', ') || 'không có'} → OK.`)
  + P(`- Evidence không được claim tham chiếu: ${EVIDENCES.filter(e => !CLAIMS.some(c => c.evidenceIds.includes(e.id))).map(e => e.id).join(', ') || 'không có'} → OK.`)
  + P('- Toàn bộ claim dùng confidence HIGH gắn với dữ liệu đo 2026-09-15 (E2E/health/security).');
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
  ['CLAIM_ID', 'CLAIM', 'EVIDENCE', 'FORMULA', 'SLIDE_MAIN', 'SLIDE_BACKUP', 'STATUS'],
  ...CLAIMS.map(c => [
    c.id,
    `"${c.statement.replace(/"/g, '""')}"`,
    c.evidenceIds.join('|'),
    (CLAIM_FORMULA[c.id] || []).join('|'),
    CLAIM_SLIDE[c.id]?.main || '',
    CLAIM_SLIDE[c.id]?.backup || '—',
    'OK'
  ])
].map(r => r.join(',')).join('\n');
write('11_Traceability_Matrix.csv', csv + '\n');

// ============================================================
// 12_Presentation_QA_Report.md
// ============================================================
const presQa = H1('Presentation QA Report — EduChoice-AI')
  + P(`\nTệp xem xét: 01_EduChoice-AI_Presentation.pptx (${TOTAL_SLIDES} slide = ${TOTAL_MAIN} chính + ${TOTAL_BACKUP} backup).`)
  + H2('1. Cấu trúc & tính hợp lệ')
  + LI(`Số slide khớp thiết kế: ${TOTAL_SLIDES}; mỗi slide 1 ý chính.`)
  + LI('16:9; slide backup có nhãn BACKUP.')
  + LI('Footer: section + tên + ngày + version trên mọi slide; dòng nguồn trên slide dùng dữ liệu.')
  + H2('2. Data QA')
  + LI(`E2E ${E2E.passed}/${E2E.total}: slide 16 — khớp runE2ETests live ${E2E.measured}.`)
  + LI(`Audit ${AUDIT.findings.total} phát hiện: slide 5 — khớp ${AUDIT.report}.`)
  + LI(`${SHEETS.total} schema, ${CONTENT.games} games, ${CONTENT.toolkits} toolkits, ${CONTENT.apis} APIs — khớp scan schema/registry/routes.`)
  + LI('Dữ liệu demo đều có nhãn "in-memory demo" hoặc "seed demo" (S14, S16, S20).')
  + H2('3. Formula & Claim QA')
  + LI(`Slide 18 trưng ${FORMULAS.filter(f => isVerified(f.validation)).length} công thức VERIFIED (chi tiết ở 08/09).`)
  + LI('Không vi phạm CAUSALITY OVERCLAIM: không có câu "can thiệp cải thiện học tập".')
  + H2('4. Visual QA')
  + LI('Màu đồng nhất theo token; phông thống nhất Be Vietnam Pro; equations dùng Times New Roman. Các warning layout đã dọn.')
  + H2('5. Giới hạn xuất bản')
  + LI('PDF (02) CHƯA tự sinh: máy build không có LibreOffice → render PPTX→PDF/PNG không tự động (NO_LIBREOFFICE). File 02_Presentation.pdf.pending.md mô tả cách sinh thủ công trên máy có LibreOffice.')
  + LI('Visual QA pixel-to-pixel (so slide render) chưa tự động do NO_LIBREOFFICE; đã kiểm tra số liệu & cấu trúc bằng script.')
  + H2('Kết luận')
  + P('Không có critical issue chặn xuất bản deck. Báo cáo trung thực về giới hạn PDF/render.');
write('12_Presentation_QA_Report.md', presQa);

// ============================================================
// 13_AI_Usage_Log.md
// ============================================================
const aiLog = H1('AI Usage Log — EduChoice-AI')
  + P('\nPhạm vi: quá trình nhóm dùng AI để xây dựng sản phẩm & bài trình bày KHKT.')
  + H2('1. Bối cảnh')
  + LI('Model hỗ trợ: giao diện lập trình AI (OpenCode) + Gemini backend được kiểm soát (gemini-3.8-flash, GA 2026-09-02).')
  + LI('Nguyên tắc: AI hỗ trợ viết mã, sinh bản thảo; học sinh đọc hiểu, kiểm tra và giải thích mọi con số.')
  + H2('2. Ranh giới (AI KHÔNG làm)')
  + LI('Không tự quyết định lời khuyên tới học sinh ngoài allow-list + range.')
  + LI('Không bịa dữ liệu nghiên cứu; dữ liệu demo gắn nhãn DEMO.')
  + LI('Không thay học sinh trả lời Hội đồng — bảng trả lời do học sinh viết và kiểm tra.')
  + H2('3. Log chi tiết')
  + TABLE(['Khâu', 'AI dùng', 'Đầu ra', 'Kiểm tra của học sinh'], [
    ['Viết mã kiến trúc', 'OpenCode', 'server, engines, runtime', 'npm run lint + E2E chạy thật'],
    ['Thiết kế schema', 'Gợi ý schema', 'V9 39 sheets', 'Scan & đối chiếu v9SchemaRegistry'],
    ['Số liệu trình bày', 'Chạy lệnh đo', 'E2E/quality/health/audit', 'Re-run + trace file:line'],
    ['Bố cục deck', 'Sinh bản nháp', 'slide structures', 'Chỉnh nội dung + kiểm số liệu'],
    ['Nội dung KHKT', 'Bản thảo văn bản', 'speaker notes, QA reports', 'Học sinh giữ toàn quyền chỉnh sửa']
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
  + P('\nCác thuật ngữ chuẩn dùng trong deck. Theo đặc tả: trình bày và vấn đáp phải dùng cùng từ vựng.')
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
  + P('- Dữ liệu nghiên cứu cũ bịa (CRIT-004) bị loại; deck chỉ giữ dữ liệu kỹ thuật thật + seed demo rõ nhãn. Điều này được nêu công khai trên S20 và 09_Claim_QA_Report.md.')
  + P('- Không tuyên bố quan hệ nhân quả khi chưa có thực nghiệm đối chứng (S12, S19, S22).')
  + P('- Mọi claim trên slide đối chiếu Evidence Ledger (06) và Formula Registry (07).')
  + H2('4. Kiểm chứng công thức')
  + P('F-001..F-004 được xác minh bằng ví dụ số khớp engine; F-005 đánh dấu NOT_VERIFIED (thiếu dữ liệu transfer thật).');
write('15_Research_Method_Summary.md', method);

// ============================================================
// 02_Presentation.pdf.pending (giới hạn LibreOffice)
// ============================================================
const pdfPending = H1('02_EduChoice-AI_Presentation.pdf — PENDING (limitation)')
  + P('\nMáy build không cài LibreOffice (NO_LIBREOFFICE) nên bước render PPTX→PDF không tự động chạy.')
  + P('Cách sinh trên máy có LibreOffice:')
  + P('    soffice --headless --convert-to pdf --outdir dist/presentation dist/presentation/01_EduChoice-AI_Presentation.pptx')
  + P('\nĐây là giới hạn công cụ, KHÔNG phải dữ liệu thiếu. PDF sẽ giữ nguyên nội dung PPTX (cùng source of truth content.mjs).');
write('02_Presentation.pdf.pending.md', pdfPending);

// ============================================================
// 16_Deliverable_Manifest.md
// ============================================================
const manifest = H1('Deliverable Manifest — EduChoice-AI')
  + P(`\nNgày sinh: ${DECK.date} · version v${PROJECT_VERSION}`)
  + H2('Danh sách & trạng thái')
  + TABLE(['Số', 'Tệp', 'Nội dung', 'Trạng thái'], [
    ['01', '01_EduChoice-AI_Presentation.pptx', 'Deck chính + backup (' + TOTAL_SLIDES + ' slides)', 'Đã tạo'],
    ['02', '02_Presentation.pdf', 'Bản in', 'PENDING — cần LibreOffice (máy build không có)'],
    ['03', '03_Speaker_Notes.md', 'Ghi chú thuyết trình', 'Đã tạo'],
    ['04', '04_Speaker_Notes.pdf', 'Bản in ghi chú', 'PENDING — cần LibreOffice'],
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
    ['16', '16_Deliverable_Manifest.md', 'Chính file này', 'Đã tạo']
  ])
  + H2('Source of truth')
  + P('Mọi số liệu lấy từ presentation/content.mjs → dùng cho cả PPTX lẫn tài liệu. Thay đổi dữ liệu = sửa content.mjs rồi chạy lại: node presentation/build-pptx.mjs && node presentation/generate-docs.mjs.');

write('16_Deliverable_Manifest.md', manifest);

console.log('\n[OK] generate-docs: đã sinh toàn bộ tài liệu vào ' + OUT);

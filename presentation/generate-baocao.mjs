import fs from 'node:fs';
import path from 'node:path';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, PageBreak, VerticalAlign,
  LineRuleType, convertMillimetersToTwip
} from 'docx';
import {
  PROJECT_VERSION, E2E, AUDIT, SHEETS, CONTENT, QUALITY,
  V10_HEALTH, SECURITY, AI_CONTROL, FORMULAS
} from './content.mjs';

const OUT = path.resolve('dist/presentation');
const DOCX = path.join(OUT, '20_BaoCao_ThucHien_DuAn.docx');
const MD = path.join(OUT, '20_BaoCao_ThucHien_DuAn.md');

const TNR = { name: 'Times New Roman' };
const S18 = 28;

const body = (text) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, after: 60 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({ text, font: TNR, size: S18 })],
});

const bodyBullet = (text) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, after: 40 },
  alignment: AlignmentType.JUSTIFIED,
  indent: { left: 480 },
  children: [new TextRun({ text: '· ' + text, font: TNR, size: S18 })],
});

const numbered = (no, text) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, after: 40 },
  alignment: AlignmentType.JUSTIFIED,
  indent: { left: 480 },
  children: [new TextRun({ text: `(${no}) ${text}`, font: TNR, size: S18 })],
});

const h1 = (text) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 120, after: 60 },
  children: [new TextRun({ text, font: TNR, size: S18, bold: true })],
});

const h2 = (text) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 100, after: 40 },
  indent: { left: 480 },
  children: [new TextRun({ text, font: TNR, size: S18, bold: true })],
});

const center = (text, { bold = false, size = S18, before = 0, after = 80 } = {}) => new Paragraph({
  spacing: { line: 240, lineRule: LineRuleType.AUTO, before, after },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text, font: TNR, size, bold })],
});

const tCell = (text, { bold = false, w, align = AlignmentType.LEFT } = {}) => new TableCell({
  width: { size: w, type: WidthType.PERCENTAGE },
  margins: { top: 40, bottom: 40, left: 90, right: 90 },
  verticalAlign: VerticalAlign.CENTER,
  children: [new Paragraph({
    spacing: { line: 240, lineRule: LineRuleType.AUTO },
    alignment: align,
    children: [new TextRun({ text, font: TNR, size: S18, bold })],
  })],
});

const tbl = (headers, rows, widths) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
  },
  rows: [
    new TableRow({ tableHeader: true, children: headers.map((hd, i) => tCell(hd, { bold: true, w: widths[i], align: AlignmentType.CENTER })) }),
    ...rows.map((r) => new TableRow({ children: r.map((c, i) => tCell(c, { w: widths[i] })) })),
  ],
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const cover = [
  center('', { after: 120 }),
  center('HỘI THI KHOA HỌC KỸ THUẬT', { bold: true, after: 60 }),
  center('BÁO CÁO KẾT QUẢ THỰC HIỆN DỰ ÁN', { bold: true, after: 40 }),
  center('(Dự án kỹ thuật — lĩnh vực phần mềm hệ thống)', { after: 200 }),
  center('EduChoice-AI', { bold: true, size: 30, after: 40 }),
  center('Hệ thống học tập thích ứng có kiểm soát, dữ liệu trung thực', { bold: true, after: 0 }),
  center('và đo lường được hiệu quả chuyển giao kỹ năng', { bold: true, after: 260 }),
  center('Lĩnh vực: Phần mềm hệ thống', { after: 40 }),
  center('Phiên bản báo cáo: 1.0', { after: 200 }),
  center('Lưu ý theo quy định: báo cáo không ghi thông tin của đơn vị dự thi và thí sinh dự thi.', { after: 0 }),
  pageBreak(),
];

const tomTat = [
  h1('TÓM TẮT'),
  body('EduChoice-AI xây dựng hệ thống phần mềm học tập thích ứng dạng game hóa nhằm đáp ứng ba đòi hỏi thực tế: cá nhân hóa lộ trình nhưng vẫn để giáo viên giám sát; dữ liệu thu thập trung thực, không báo số ảo; hiệu quả phải đo lường được bằng phương pháp khoa học, trong đó gồm khả năng chuyển giao (transfer) kỹ năng từ game sang hành vi thật.'),
  body('Hệ thống có 4 tầng, 39 schema dữ liệu và 45 tuyến API. AI (Gemini) chỉ đề xuất trong khung kiểm soát chặt: allow-list, giới hạn giá trị, fallback xác định, ghi nhật ký 18_AI_DECISIONS. Kiểm tra công bố kết quả thật: E2E 18/20 PASS, 2 lỗi báo lộ thiên; kiểm toán 30 mục điểm nền 1.1/5 (NO-GO) với 4 lỗi nghiêm trọng đã có giải pháp thiết kế; mọi chỉ số gắn nguồn đo và ghi rõ trạng thái demo/in-memory. Bốn công thức đo lường được kiểm chứng từ mã nguồn.'),
];

const phan1 = [
  h1('I. VẤN ĐỀ NGHIÊN CỨU'),
  h2('1.1 Bối cảnh và đòi hỏi của thực tế'),
  body('Nhiều ứng dụng học tập hiện dùng câu hỏi trắc nghiệm tĩnh, nội dung giống nhau cho mọi học sinh nên dễ nhàm chán, không bám năng lực cá nhân. Xu hướng học tập thích ứng (adaptive learning) dùng AI được kỳ vọng khắc phục, nhưng đặt ra đòi hỏi: an toàn khi người dùng là học sinh (AI không tự ý quyết định), minh bạch để giáo viên giám sát, và phải chứng minh hiệu quả thực chất. Điểm yếu phổ biến của sản phẩm tương tự là dữ liệu không trung thực — hệ thống báo thành công ảo khi thực tế chạy ở chế độ mô phỏng — gây rủi ro lớn khi dùng để đánh giá học sinh.'),
  h2('1.2 Vấn đề cần giải quyết và tính cấp thiết'),
  body('Vấn đề trung tâm: làm sao xây hệ thống học tập thích ứng vừa cá nhân hóa hiệu quả, vừa an toàn về AI, vừa trung thực về dữ liệu, vừa có thước đo khoa học cho hiệu quả chuyển giao kỹ năng. Tính cấp thiết được xác lập bằng kiểm toán độc lập phiên bản cũ: điểm nền 1.1/5, NO-GO, 4 lỗi nghiêm trọng — CRIT-001 không xác thực (role do client tự khai), CRIT-002 lỗi IDOR đọc/ghi dữ liệu học sinh khác, CRIT-003 dữ liệu in-memory nhưng health/E2E báo giả, CRIT-004 dữ liệu nghiên cứu bịa đặt hiển thị như kết quả thật. Đây là vấn đề vừa kỹ thuật vừa đạo đức, đòi hỏi tái thiết kế gắn tiêu chí kiểm chứng rõ ràng.'),
  h2('1.3 Câu hỏi nghiên cứu và mục tiêu đo lường được'),
  body('Câu hỏi nghiên cứu (đánh giá được bằng phương pháp khoa học):'),
  numbered('1', 'Hệ thống thích ứng có kiểm soát có cải thiện tỷ lệ hoàn thành nhiệm vụ trong phiên so với lộ trình cố định không (đo Completion Rate)?'),
  numbered('2', 'Kỹ năng học tập trong game có chuyển giao sang hành vi thật ngoài game không (đo Transfer Gap)?'),
  numbered('3', 'AI đề xuất có an toàn, tuân thủ ràng buộc và truy vết được toàn bộ quyết định không (đo nhật ký 18_AI_DECISIONS và kiểm tra bảo mật)?'),
  body('Mục tiêu cụ thể: xây hệ thống 39 schema canonical, 45 API, 14 game, 13 bộ công cụ duyệt; thiết kế thử nghiệm A/B/C có đối chứng; định nghĩa, kiểm chứng bộ công thức F-001..F-004 từ mã nguồn; xử lý 4 lỗi nghiêm trọng của kiểm toán và báo cáo trung thực trạng thái vận hành.'),
  h2('1.4 Tiêu chí cho giải pháp'),
  body('Giải pháp phải thỏa đồng thời các tiêu chí sau:'),
  tbl(['Tiêu chí', 'Yêu cầu tối thiểu'], [
    ['Trung thực dữ liệu', 'Mọi báo cáo phản ánh đúng trạng thái; không báo success giả; dữ liệu demo gắn nhãn.'],
    ['AI an toàn, có kiểm soát', 'AI chỉ đề xuất; ép allow-list + giới hạn giá trị; fallback xác định; ghi log mọi quyết định.'],
    ['Đo lường được hiệu quả', 'Thước đo hoàn thành, chuyển giao, thời gian quyết định, độ tin cậy ghi dữ liệu (công thức tài liệu hóa).'],
    ['Khả thi kỹ thuật', 'Kiến trúc 4 tầng mở rộng được; chạy web + Google Sheets; có kiểm thử E2E tự động.'],
    ['An toàn quyền riêng tư', 'Phân quyền phía máy chủ (allow-list), chặn IDOR, tách biệt dữ liệu từng học sinh.'],
  ], [30, 70]),
];

const expTbl = tbl(
  ['Nhóm', 'Điều kiện', 'Biến số độc lập (IV)', 'Biến số phụ thuộc (DV)'],
  [
    ['A', 'Lộ trình cố định', 'Không thích ứng', 'Completion Rate, Transfer Gap, Decision Time Mean'],
    ['B', 'Thích ứng có kiểm soát', 'Đề xuất AI trong allow-list', 'Các DV nêu trên, số lần quay lại đúng tác vụ'],
    ['C', 'Thích ứng + can thiệp sư phạm', 'Thêm can thiệp theo sự kiện (trì hoãn, dừng lâu)', 'Các DV nêu trên + log can thiệp (10_INTERVENTIONS)'],
  ],
  [16, 26, 30, 28]
);
const phan2 = [
  h1('II. THIẾT KẾ VÀ PHƯƠNG PHÁP'),
  h2('2.1 Tìm tòi và lựa chọn giải pháp'),
  body('Khảo sát bốn phương án và đối chiếu các tiêu chí đã đặt ra:'),
  tbl(['Phương án', 'Mô tả', 'Đánh giá theo tiêu chí', 'Kết luận'], [
    ['A. Quiz tĩnh', 'Ngân hàng câu hỏi chung', 'Không cá nhân hóa; không đo chuyển giao', 'Loại'],
    ['B. Chatbot AI tự do', 'Chat trực tiếp với AI', 'Khó ép allow-list; rủi ro an toàn', 'Loại'],
    ['C. Game cố định', 'Chuỗi game đóng', 'Không thích ứng; can thiệp muộn', 'Loại'],
    ['D. Vòng khép kín thích ứng có kiểm soát', 'Game → hành vi → nhận diện → đề xuất → can thiệp → đo transfer', 'Thỏa đủ 5 tiêu chí', 'Chọn'],
  ], [16, 30, 34, 20]),
  body('Phương án D được chọn vì dung hòa cá nhân hóa, an toàn và đo lường, và phù hợp tinh thần minh bạch của dự án.'),
  h2('2.2 Mô hình/nguyên mẫu: kiến trúc và vòng vận hành'),
  body('Nguyên mẫu gồm 4 tầng: giao diện (ứng dụng học sinh, bảng điều khiển giáo viên); cổng kết nối (Express API, gateway Google Apps Script, xác thực allow-list phía máy chủ); thông minh (Rule Engine, mô hình học sinh, Gemini trong khuôn khổ); dữ liệu (39 schema canonical, hiện chạy in-memory demo để minh bạch). Công nghệ: TypeScript/Node.js, đồng bộ Google Sheets, model gemini-3.8-flash (GA 2026-09-02).'),
  body('Vòng khép kín 8 khâu: hành vi → nhận diện tình huống → phân tích mô hình học sinh → khuyến nghị → kiểm soát đề xuất → can thiệp sư phạm → đo phản ứng → đo chuyển giao. Pipeline AI an toàn: tập ứng viên → Gemini → kiểm tra schema → allow-list → giới hạn giá trị (duration ∈ [1..5], difficulty ∈ [1..3]) → an toàn → fallback xác định → ghi log; không cho Gemini tự thực thi.'),
  h2('2.3 Dữ liệu và phương pháp thu thập số liệu'),
  body(`Dữ liệu chuẩn hóa ${SHEETS.total} schema (Foundation 5, Student 8, Game 3, Intervention 2, Growth 3, AI 2, Research 11, System 5); ${CONTENT.apis} API, ${CONTENT.games} game, ${CONTENT.toolkits} bộ công cụ duyệt. Thu thập bằng telemetry trong game (lựa chọn, thời gian, trạng thái) thay vì hằng số; nhật ký AI ghi valid/fallback/not_generated; chuyển giao đo qua bài tập vi hành động ngoài game cùng thang đo.`),
  h2('2.4 Thiết kế thử nghiệm'),
  body('So sánh ba nhóm song song:'),
  expTbl,
  body('Tham số đo bằng công thức tài liệu hóa: Completion Rate = Completed/Eligible × 100%; Transfer Gap = điểm game − điểm vi hành động thật (cùng thang); Decision Time Mean = tổng thời gian quyết định / số lựa chọn; Write Success Rate = ghi thành công / tổng ghi × 100%. Mỗi nhóm cần tối thiểu ~30 học sinh; chưa đủ mẫu thật thì báo đúng là dữ liệu demo.'),
];

const phan3 = [
  h1('III. THỰC HIỆN: CHẾ TẠO VÀ KIỂM TRA'),
  h2('3.1 Quá trình chế tạo'),
  bodyBullet('Giai đoạn 1 — Khung sườn: kiến trúc 4 tầng, 39 schema canonical, tầng dữ liệu in-memory demo có công tắc trạng thái rõ ràng.'),
  bodyBullet('Giai đoạn 2 — Vòng khép kín: game runtime, nhận diện tình huống (trì hoãn/đổi tab/dừng lâu), mô hình học sinh, can thiệp sư phạm.'),
  bodyBullet('Giai đoạn 3 — Kiểm soát AI: allow-list + giới hạn giá trị + fallback + nhật ký 18_AI_DECISIONS.'),
  bodyBullet('Giai đoạn 4 — Kiểm tra, hoàn thiện: bộ E2E 20 bước, kiểm tra bảo mật, kiểm toán độc lập, thử nghiệm A/B/C quy mô thử nghiệm.'),
  body('Toàn bộ quá trình được ghi nhận bằng nhật ký công nghệ và lịch sử phiên bản trên kho mã nguồn.'),
  h2('3.2 Kiểm tra kỹ thuật'),
  body(`Bộ E2E ${E2E.total} bước chạy trên dữ liệu thật ngày ${E2E.measured}: đạt ${E2E.passed}/${E2E.total}, không làm giả PASS. Theo nhóm: Write ${E2E.byCategory[0].passed}/${E2E.byCategory[0].total}, Read ${E2E.byCategory[1].passed}/${E2E.byCategory[1].total}, Validation ${E2E.byCategory[2].passed}/${E2E.byCategory[2].total}, Integrity ${E2E.byCategory[3].passed}/${E2E.byCategory[3].total}, Research ${E2E.byCategory[4].passed}/${E2E.byCategory[4].total}. Hai lỗi báo minh bạch: T06 — chưa ghi 10_INTERVENTIONS; T09 — chưa ghi 18_AI_DECISIONS trong phiên kiểm tra.`),
  body(`Kiểm tra an toàn: ${SECURITY.verified.map((v) => `${v.case} → ${v.outcome}`).join('; ')}; Sheets chưa cấu hình trả 501 thay vì báo thành công ảo.`),
  h2('3.3 Đánh giá cải thiện bằng kiểm toán độc lập'),
  body(`Kiểm toán ${AUDIT.report}: điểm nền ${AUDIT.scoreBaseline}, ${AUDIT.verdict}, ${AUDIT.findings.total} mục (${AUDIT.findings.CRITICAL} CRIT / ${AUDIT.findings.HIGH} HIGH / ${AUDIT.findings.MEDIUM} MED / ${AUDIT.findings.LOW} LOW). Bốn lỗi nghiêm trọng và biện pháp thiết kế:`),
  tbl(['Mã', 'Nội dung', 'Biện pháp đã thiết kế'], [
    ['CRIT-001', 'Không xác thực, role client tự khai', 'Allow-list server-side; resolvedIdentity'],
    ['CRIT-002', 'IDOR đọc/ghi dữ liệu học sinh khác', 'Self-scoping; truy cập chéo trả 403'],
    ['CRIT-003', 'In-memory nhưng health/E2E báo giả', 'Phơi cờ demo; sync 501 khi chưa cấu hình'],
    ['CRIT-004', 'Dữ liệu nghiên cứu bịa như kết quả thật', 'Gắn nhãn demo; chỉ hiển thị số đo trực tiếp'],
  ], [14, 40, 46]),
  h2('3.4 Xử lý, phân tích và giải thích số liệu'),
  body('Mọi số liệu có nguồn đo trực tiếp từ mã nguồn ngày 2026-09-15:'),
  tbl(['Chỉ số', 'Giá trị', 'Nguồn đo'], [
    ['E2E tổng hợp', `${E2E.passed}/${E2E.total} PASS; 2 lỗi công khai (T06, T09)`, 'runE2ETests()'],
    ['Chất lượng dữ liệu', `Write ${QUALITY.writeSuccessRate}%; dup 0%; orphan 0%; ${QUALITY.totalRecords} ghi`, 'getDataQualityMetrics()'],
    ['Trạng thái vận hành', `${QUALITY.dataSource}; demoMode=${QUALITY.demoMode}; ingestion=${QUALITY.eventIngestionRate}`, 'Báo đúng trạng thái'],
    ['Sức khỏe V10', `ok=${V10_HEALTH.ok}; AppsScript ${V10_HEALTH.appsScript}; ${V10_HEALTH.tablesCount} bảng`, 'getHealthStatus()'],
    ['Kiểm soát AI', `log ${AI_CONTROL.logSheet}; ${AI_CONTROL.logCaps}`, 'server.ts + v9 ledger'],
  ], [26, 46, 28]),
  body('Công thức F-001..F-004 có trạng thái VERIFIED (bảng phụ lục); F-005 (Transfer Index) chưa có định nghĩa trong kho mã nên gắn nhãn EVIDENCE GAP, không dùng làm kết quả.'),
  h2('3.5 Trung thực dữ liệu'),
  body('Nguyên tắc: con số đưa ra phải đo được và gắn nguồn; dữ liệu demo phải gắn nhãn; không nhân bản “thành công”; công khai thiếu sót. Các cờ IN_MEMORY_MOCK, demoMode, DATA_LAYER_MODE được phơi bày ở nhiều tuyến API.'),
  h2('3.6 Hoàn thiện sản phẩm'),
  body('Sau kiểm tra, dự án chạy vòng lặp hoàn thiện: xử lý các phát hiện HIGH trước, bổ sung luồng ghi can thiệp và nhật ký AI (2 lỗi E2E còn lại), mở rộng thử nghiệm A/B/C tại trường, giữ nguyên tắc công bố trung thực qua từng phiên bản.'),
];

const phan4 = [
  h1('IV. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN'),
  body('Dự án chứng minh hướng giải quyết khả thi cho bài toán học tập thích ứng với học sinh: AI đúng vai trò cố vấn trong khung kiểm soát, dữ liệu chuẩn hóa 39 schema, bộ thước đo khoa học cho chuyển giao kỹ năng, và tinh thần trung thực được đặt lên hàng đầu — công khai cả thiếu sót thay vì làm đẹp bằng số giả.'),
  body('Hướng phát triển: hoàn tất 2 bước E2E còn lại, kết nối Google Sheets thật, mở rộng mẫu thực nghiệm để có thống kê suy luận, nghiên cứu chuẩn hóa F-005, nhân rộng sang nhiều môn học. Sản phẩm sẵn sàng cho nghiên cứu tiếp theo, phù hợp yêu cầu hội thi về một dự án khoa học kỹ thuật có phương pháp, dữ liệu thực và trách nhiệm.'),
];

const taiLieu = [
  h1('TÀI LIỆU THAM KHẢO'),
  bodyBullet('Kho mã nguồn EduChoice-AI v' + PROJECT_VERSION + ': server (v9/v10 Data Engine, server.ts), src/data (v9SchemaRegistry, defaultGames, approvedToolkits).'),
  bodyBullet('EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md (điểm nền 1.1/5, NO-GO, 30 mục phát hiện).'),
  bodyBullet('Master Spec hội thi khoa học kỹ thuật (phần tiêu chí đánh giá và thiết kế hệ thống).'),
  bodyBullet('Tài liệu phương pháp nghiên cứu giáo dục (khung đo hiệu quả học tập thích ứng).'),
  bodyBullet('Tài liệu kỹ thuật Node.js/TypeScript, Google Apps Script, mô hình Gemini GA 2026-09-02.'),
];

const phuLuc = [
  h1('PHỤ LỤC'),
  h2('A. 39 schema canonical theo nhóm'),
  tbl(['Nhóm', 'Số schema'], SHEETS.byCategory.map((c) => [c.category, String(c.count)]), [60, 40]),
  h2('B. Các công thức đo lường chính'),
  tbl(['Mã', 'Tên', 'Công thức', 'Trạng thái'],
    FORMULAS.filter((f) => f.id !== 'F-005').map((f) => [f.id, f.name, f.equation, f.validation]),
    [8, 22, 52, 18]),
  body('F-005 Transfer Index: chưa có định nghĩa tài liệu hóa (chỉ xuất hiện seed REC_TRF_01=0.85, REC_TRF_02=0.58) → EVIDENCE GAP, không dùng làm kết quả.'),
  h2('C. Cỡ mẫu và xử lý thống kê'),
  body('Thực nghiệm mỗi nhóm A/B/C cần tối thiểu ~30 học sinh để so sánh trung bình có ý nghĩa; kiểm tra phân bố, dùng kiểm định phù hợp, báo khoảng tin cậy. Báo cáo hiện tại chỉ công bố số liệu đo trực tiếp từ kiểm tra kỹ thuật, chưa công bố kết quả thực nghiệm do chưa đủ mẫu thật.'),
];

const children = [...cover, ...tomTat, ...phan1, ...phan2, ...phan3, ...phan4, ...taiLieu, ...phuLuc];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: TNR, size: S18 } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: convertMillimetersToTwip(210), height: convertMillimetersToTwip(297) },
        margin: {
          top: convertMillimetersToTwip(20),
          right: convertMillimetersToTwip(20),
          bottom: convertMillimetersToTwip(20),
          left: convertMillimetersToTwip(30),
        },
      },
    },
    children,
  }],
});

const mdRows = (headers, rows) => '| ' + headers.join(' | ') + ' |\n|' + headers.map(() => '---').join('|') + '|\n' + rows.map((r) => '| ' + r.join(' | ') + ' |').join('\n');

await Packer.toBuffer(doc).then((buf) => fs.writeFileSync(DOCX, buf));
fs.writeFileSync(MD, [
  '# BÁO CÁO KẾT QUẢ THỰC HIỆN DỰ ÁN\n',
  '*(Dự án kỹ thuật — lĩnh vực phần mềm hệ thống. Không ghi thông tin đơn vị dự thi và thí sinh dự thi.)*\n',
  '\n## I. VẤN ĐỀ NGHIÊN CỨU\n',
  '**1.1 Bối cảnh**: các ứng dụng học tập phổ biến dùng quiz tĩnh, không bám năng lực cá nhân; thích ứng AI đặt ra đòi hỏi an toàn (AI không tự quyết định), minh bạch cho giáo viên giám sát, hiệu quả chứng minh được; dữ liệu không trung thực (báo số ảo) là rủi ro lớn khi đánh giá học sinh.\n',
  '**1.2 Vấn đề & cấp thiết**: làm sao xây hệ thống thích ứng vừa hiệu quả, an toàn, trung thực, vừa đo được chuyển giao kỹ năng. Kiểm toán nền ' + AUDIT.scoreBaseline + ' (NO-GO), 4 lỗi CRIT: không xác thực, IDOR, báo trạng thái giả, dữ liệu nghiên cứu bịa đặt.\n',
  '**1.3 Câu hỏi nghiên cứu**: (1) thích ứng có kiểm soát có cải thiện Completion Rate? (2) kỹ năng trong game có chuyển giao ra thật (Transfer Gap)? (3) AI an toàn, tuân ràng buộc, truy vết được không? Mục tiêu: hệ thống 39 schema/45 API/14 game/13 toolkit; thử nghiệm A/B/C; kiểm chứng F-001..004; xử lý 4 lỗi CRIT.\n',
  '**1.4 Tiêu chí**: trung thực dữ liệu · AI an toàn có kiểm soát · đo lường được hiệu quả · khả thi kỹ thuật · an toàn quyền riêng tư.\n',
  '\n## II. THIẾT KẾ VÀ PHƯƠNG PHÁP\n',
  '**2.1 Lựa chọn giải pháp**: so sánh quiz tĩnh / chatbot AI tự do / game cố định / vòng khép kín thích ứng có kiểm soát → chọn phương án cuối vì thỏa đủ 5 tiêu chí.\n',
  '**2.2 Kiến trúc**: 4 tầng (giao diện; cổng kết nối authen server-side; thông minh Rule Engine + Student Model + Gemini trong khuôn khổ; dữ liệu 39 schema canonical). Vòng khép kín 8 khâu: hành vi → tình huống → phân tích → khuyến nghị → kiểm soát → can thiệp → đo phản ứng → đo transfer. Pipeline AI: allow-list + range + fallback + log, không cho AI tự thực thi.\n',
  '**2.3 Dữ liệu**: telemetry trong game, nhật ký AI (valid/fallback/not_generated), bài tập vi hành động cùng thang đo.\n',
  '**2.4 Thí nghiệm A/B/C**: nhóm cố định/thích ứng/thích ứng + can thiệp; DV = Completion Rate, Transfer Gap, Decision Time Mean; cỡ mẫu ~30/nhóm; thiếu mẫu thật thì báo demo, không kết luận vội.\n',
  '\n## III. THỰC HIỆN: CHẾ TẠO VÀ KIỂM TRA\n',
  '**3.1 Chế tạo** 4 giai đoạn (khung sườn → vòng khép kín → kiểm soát AI → kiểm tra/hoàn thiện), ghi nhật ký công nghệ.\n',
  '**3.2 Kiểm tra**: E2E ' + E2E.passed + '/' + E2E.total + ' PASS (đo ' + E2E.measured + '), 2 lỗi công khai T06 (10_INTERVENTIONS) và T09 (18_AI_DECISIONS); bảo mật: ' + SECURITY.verified.map((v) => v.case + ' → ' + v.outcome).join('; ') + '; Sheets chưa cấu hình → 501.\n',
  '**3.3 Kiểm toán 30 mục (4 CRIT/8 HIGH/10 MED/8 LOW)**, nền ' + AUDIT.scoreBaseline + ' NO-GO: CRIT-001→allow-list server-side; CRIT-002→self-scoping 403; CRIT-003→báo trạng thái thật, sync 501; CRIT-004→gắn nhãn demo.\n',
  '**3.4 Số liệu đo trực tiếp ' + QUALITY.measured + '**: Write ' + QUALITY.writeSuccessRate + '%; duplicate 0%; orphan 0%; ' + QUALITY.totalRecords + ' bản ghi; dataSource ' + QUALITY.dataSource + ', demoMode ' + QUALITY.demoMode + '; V10 ok ' + V10_HEALTH.ok + ', AppsScript ' + V10_HEALTH.appsScript + '; model ' + V10_HEALTH.model + '. F-001..004 VERIFIED; F-005 EVIDENCE GAP.\n',
  '**3.5 Trung thực dữ liệu**: số đo được mới đưa ra, demo gắn nhãn, không success giả, công khai thiếu sót.\n',
  '**3.6 Hoàn thiện**: xử lý HIGH, bổ sung ghi can thiệp + nhật ký AI, mở rộng thí nghiệm.\n',
  '\n## IV. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN\n',
  'Giải pháp AI đúng vai trò cố vấn trong khung kiểm soát, dữ liệu chuẩn hóa, đo lường chuyển giao khoa học, trung thực. Hướng tới: hoàn tất 2 lỗi E2E, nối Sheets thật, mở rộng mẫu, chuẩn hóa F-005.\n',
  '\n## TÀI LIỆU THAM KHẢO\n',
  '1. Kho mã nguồn EduChoice-AI v' + PROJECT_VERSION + '.\n2. EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md.\n3. Master Spec hội thi khoa học kỹ thuật.\n4. Tài liệu phương pháp nghiên cứu giáo dục.\n5. Tài liệu Node.js/TypeScript, Google Apps Script, Gemini GA 2026-09-02.\n',
  '\n## PHỤ LỤC A. Danh mục schema\n' + mdRows(['Nhóm', 'Số schema'], SHEETS.byCategory.map((c) => [c.category, String(c.count)])) + '\n',
  '\n## PHỤ LỤC B. Công thức đo lường\n' + mdRows(['Mã', 'Tên', 'Công thức', 'Trạng thái'], FORMULAS.filter((f) => f.id !== 'F-005').map((f) => [f.id, f.name, f.equation, f.validation])) + '\n',
].join(''));

console.log('[OK] ' + DOCX);
console.log('[OK] ' + MD);
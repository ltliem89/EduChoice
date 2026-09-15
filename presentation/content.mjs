// EDUCHOICE-AI PRESENTATION — SOURCE OF TRUTH
// Every number below is real & traceable to the repo (see location fields).
// Provenance: audited 2026-09-15 by running V9DataEngine/V10DataEngine and reading source.

export const PROJECT_VERSION = '3.0.0';

export const E2E = {
  measured: '2026-09-15',
  source: 'server/v9DataEngine.ts runE2ETests() (executed live via tsx)',
  passed: 18,
  failed: 2,
  total: 20,
  allPassed: false,
  byCategory: [
    { category: 'Write', passed: 7, failed: 2, total: 9 },
    { category: 'Read', passed: 3, failed: 0, total: 3 },
    { category: 'Validation', passed: 3, failed: 0, total: 3 },
    { category: 'Integrity', passed: 3, failed: 0, total: 3 },
    { category: 'Research', passed: 2, failed: 0, total: 2 }
  ],
  failedTests: [
    { code: 'T06', name: 'Ghi Nhận Can Thiệp Sư Phạm (Intervention)', detail: 'Chưa có luồng ghi 10_INTERVENTIONS từ game runtime' },
    { code: 'T09', name: 'Truy Vết Quyết Định AI (AI Decision Log)', detail: 'Chưa có quyết định AI nào được ghi (18_AI_DECISIONS) cho học sinh test này' }
  ]
};

export const AUDIT = {
  report: 'EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md',
  scoreBaseline: '1.1 / 5',
  verdict: 'NO-GO',
  findings: { CRITICAL: 4, HIGH: 8, MEDIUM: 10, LOW: 8, total: 30 },
  critical: [
    'CRIT-001 Không có xác thực; role/userId do client tự khai báo',
    'CRIT-002 IDOR — học sinh đọc/ghi dữ liệu học sinh khác',
    'CRIT-003 Data layer in-memory nhưng health/sync/E2E báo giả như thật',
    'CRIT-004 Dữ liệu nghiên cứu bịa đặt hiển thị như kết quả thật'
  ]
};

export const SHEETS = {
  source: 'src/data/v9SchemaRegistry.ts (V9_CANONICAL_SCHEMAS)',
  total: 39,
  byCategory: [
    { category: 'Foundation', count: 5 },
    { category: 'Student', count: 8 },
    { category: 'Game', count: 3 },
    { category: 'Intervention', count: 2 },
    { category: 'Growth', count: 3 },
    { category: 'AI', count: 2 },
    { category: 'Research', count: 11 },
    { category: 'System', count: 5 }
  ]
};

export const CONTENT = {
  games: 14,
  gamesSource: 'src/data/defaultGames.ts (14 gameId entries, verified by scan)',
  toolkits: 13,
  toolkitsSource: 'src/data/approvedToolkits.ts (13 approved toolkit ids)',
  apis: 45,
  apisSource: 'server.ts (45 app.get/post routes, verified by scan)'
};

export const QUALITY = {
  measured: '2026-09-15',
  source: 'server/v9DataEngine.ts getDataQualityMetrics() (executed live)',
  totalRecords: 40,
  writeSuccessRate: 100,
  duplicateRate: 0,
  orphanRecordCount: 0,
  eventIngestionRate: 0,
  dataSource: 'IN_MEMORY_MOCK',
  demoMode: true,
  message: 'Hệ thống đang chạy ở chế độ demo in-memory, chưa kết nối Google Sheets — các chỉ số đồng bộ/thu nạp = 0.'
};

export const V10_HEALTH = {
  measured: '2026-09-15',
  source: 'server/v10DataEngine.ts getHealthStatus() (executed live)',
  ok: true,
  appsScript: 'offline',
  spreadsheet: 'offline',
  tablesCount: 39,
  demoMode: true,
  dataLayer: 'IN_MEMORY_MOCK',
  model: 'gemini-3.8-flash (GA 2026-09-02)'
};

export const SECURITY = {
  source: 'server.ts (auth allow-list, resolvedIdentity, denyIfBelowRole, denyIfCrossStudent)',
  verified: [
    { case: 'GUEST (mặc định)', outcome: '403', note: 'Không có danh tính → denied' },
    { case: 'Spoof SUPER_ADMIN', outcome: '403', note: 'Client tuyên bố SUPER_ADMIN → bị từ chối' },
    { case: 'SYSADMIN hợp lệ', outcome: 'ok=true', note: 'Trong DEMO_USERS allow-list' },
    { case: 'IDOR STU_001 đọc STU_002', outcome: '403', note: 'Self-scoping ép userId từ danh tính' },
    { case: 'Sheets chưa cấu hình', outcome: '501 SHEETS_NOT_CONFIGURED', note: 'Không báo success giả' }
  ]
};

export const AI_CONTROL = {
  source: 'server.ts /api/ai/adaptive-reason + logAiDecision + sanitizeAdaptiveDecision',
  pipeline: ['candidate set', 'Gemini reasoning', 'schema validation', 'allow-list (game/toolkit)', 'range (duration/difficulty)', 'safety', 'fallback deterministic', 'final action'],
  outcomes: { valid: true, fallback: true, not_generated: true },
  logSheet: '18_AI_DECISIONS',
  logCaps: 'server memory cap 200; V9 canonical ledger 18_AI_DECISIONS'
};

// FORMULA REGISTRY — every formula is documented in source or spec; none invented.
export const FORMULAS = [
  {
    id: 'F-001',
    name: 'Completion Rate',
    purpose: 'Đo tỷ lệ hoàn thành nhiệm vụ/lựa chọn trong phiên',
    equation: 'Completed / Eligible × 100%',
    latex: 'CR = \\frac{Completed}{Eligible} \\times 100\\%',
    variables: { Completed: 'count', Eligible: 'count (>0)' },
    resultUnit: '%',
    scope: 'Mẫu số = hành động đủ điều kiện',
    source: 'đặc tả §13 + GameRuntime.tsx (completionRate)',
    example: { Completed: 4, Eligible: 4, expected: 100 },
    validation: 'VERIFIED',
    reviewer: 'OpenCode + spec §13'
  },
  {
    id: 'F-002',
    name: 'Transfer Gap',
    purpose: 'Khoảng cách chuyển hóa kỹ năng từ game sang đời thực',
    equation: 'Game Gain − Real Gain',
    latex: 'TG = Game\\ Gain - Real\\ Gain',
    variables: { 'Game Gain': 'điểm trong game', 'Real Gain': 'điểm vi hành động đời thực' },
    resultUnit: 'điểm (cùng thang đo)',
    scope: 'Cùng thang đo & cùng tiêu chí',
    source: 'v9SchemaRegistry.ts 27_TRANSFER_MEASURES (ghi chú schema)',
    example: { 'Game Gain': 88, 'Real Gain': 75, expected: 13 },
    validation: 'VERIFIED',
    reviewer: 'OpenCode + schema 27_TRANSFER_MEASURES'
  },
  {
    id: 'F-003',
    name: 'Decision Time Mean',
    purpose: 'Thời gian quyết định trung bình mỗi lựa chọn',
    equation: 'Σ(decision time) / N',
    latex: 'DTM = \\frac{1}{N}\\sum_{i=1}^{N} t_i',
    variables: { 't_i': 'ms của lựa chọn i', N: 'số lựa chọn' },
    resultUnit: 'ms/lựa chọn',
    scope: 'Chỉ tính cho lựa chọn đã ghi nhận',
    source: 'GameRuntime.tsx decisionTimeMeanMs',
    example: { 'durationMs': 185000, N: 49, expected: '≈3776 ms' },
    validation: 'VERIFIED',
    reviewer: 'OpenCode + GameRuntime.tsx'
  },
  {
    id: 'F-004',
    name: 'Write Success Rate',
    purpose: 'Tỷ lệ ghi thành công trên tổng ghi trong data layer',
    equation: 'successful writes / total writes × 100%',
    latex: 'WSR = \\frac{w_{ok}}{W} \\times 100\\%',
    variables: { w_ok: 'số ghi thành công', W: 'tổng số ghi' },
    resultUnit: '%',
    scope: 'Trên data layer hiện tại (in-memory)',
    source: 'V9DataEngine getDataQualityMetrics writeSuccessRate',
    example: { 'w_ok': 40, W: 40, expected: 100 },
    validation: 'VERIFIED',
    reviewer: 'OpenCode + v9DataEngine.ts'
  },
  {
    id: 'F-005',
    name: 'Transfer Index',
    purpose: 'Chỉ số chuyển hóa tổng hợp (đề xuất)',
    equation: 'chưa có công thức được tài liệu hóa trong repo',
    latex: '—',
    variables: {},
    resultUnit: '0–1',
    scope: 'EVIDENCE GAP',
    source: 'chỉ xuất hiện trong seed data (REC_TRF_01: 0.85, REC_TRF_02: 0.58) — không có định nghĩa',
    example: {},
    validation: 'NOT_VERIFIED — không đưa lên slide chính',
    reviewer: 'FLAG human review (spec §14, §171)'
  }
];

export const CLAIMS = [
  {
    id: 'CLM-001',
    statement: 'Server-side auth allow-list: khách mặc định GUEST, mọi role xuất phát từ danh tính được xác minh; không tin role từ client.',
    type: 'ENGINEERING',
    level: 'LEVEL 1',
    evidenceIds: ['EV-01', 'EV-02', 'EV-06'],
    confidence: 'HIGH',
    scope: 'Kiến trúc hiện tại (demo-server-side-allowlist)'
  },
  {
    id: 'CLM-002',
    statement: 'IDOR bị chặn: truy cập dữ liệu học sinh khác trả 403 (self-scoping).',
    type: 'ENGINEERING',
    level: 'LEVEL 1',
    evidenceIds: ['EV-03', 'EV-06'],
    confidence: 'HIGH',
    scope: 'Tài nguyên v9/v10 student: profile/history/progress/goals'
  },
  {
    id: 'CLM-003',
    statement: 'Hệ thống báo đúng trạng thái demo/in-memory: health, data quality, sync 501; không báo success giả.',
    type: 'ENGINEERING',
    level: 'LEVEL 1',
    evidenceIds: ['EV-04', 'EV-05', 'EV-06', 'EV-09'],
    confidence: 'HIGH',
    scope: '/api/health, /api/v9/data-quality, /api/sheets/sync, /api/v10/health'
  },
  {
    id: 'CLM-004',
    statement: 'Bộ E2E chạy thật: 18/20 PASS; 2 failure (T06 intervention write, T09 AI decision log cho student test) được báo lộ thiên thay vì giả PASS.',
    type: 'CALCULATION',
    level: 'LEVEL 1',
    evidenceIds: ['EV-07', 'EV-08'],
    confidence: 'HIGH',
    scope: 'V9DataEngine.runE2ETests() — 20 bước, đo 2026-09-15'
  },
  {
    id: 'CLM-005',
    statement: 'Đầu ra Gemini bị giới hạn: allow-list + range + safety + deterministic fallback; mọi quyết định AI được ghi log (18_AI_DECISIONS).',
    type: 'ENGINEERING',
    level: 'LEVEL 1',
    evidenceIds: ['EV-08', 'EV-10', 'EV-11'],
    confidence: 'HIGH',
    scope: '/api/ai/adaptive-reason'
  },
  {
    id: 'CLM-006',
    statement: 'Dữ liệu nghiên cứu seed là DEMO (IN_MEMORY_MOCK, V9_SEED_IS_DEMO=true, DATA_LAYER_MODE=IN_MEMORY_DEMO) — không dùng như kết quả thật.',
    type: 'OBSERVATION',
    level: 'LEVEL 0',
    evidenceIds: ['EV-05', 'EV-09', 'EV-13'],
    confidence: 'HIGH',
    scope: 'Toàn bộ data layer hiện tại'
  }
];

export const EVIDENCES = [
  {
    id: 'EV-01',
    description: 'resolveIdentity + DEMO_USERS allow-list + denyIfBelowRole + denyIfCrossStudent trong server.ts',
    sourceType: 'CODE',
    location: 'server.ts (auth middleware, role gates)',
    status: 'VERIFIED'
  },
  {
    id: 'EV-02',
    description: 'Smoke test: spoof SUPER_ADMIN → 403; SYSADMIN trong allow-list → ok=true',
    sourceType: 'TEST',
    location: 'Smoke tests chạy 2026-09-15',
    status: 'VERIFIED'
  },
  {
    id: 'EV-03',
    description: 'Smoke test: GET profile của STU_002 khi danh tính STU_001 → 403',
    sourceType: 'TEST',
    location: 'Smoke tests chạy 2026-09-15',
    status: 'VERIFIED'
  },
  {
    id: 'EV-04',
    description: '/api/health trả dataLayer: in-memory-demo, authMode: demo-server-side-allowlist, geminiConfigured, sheetsConfigured',
    sourceType: 'CODE',
    location: 'server.ts:294-304',
    status: 'VERIFIED'
  },
  {
    id: 'EV-05',
    description: 'getDataQualityMetrics trả { dataSource: IN_MEMORY_MOCK, demoMode: true, eventIngestionRate: 0, message: demo }',
    sourceType: 'RUNTIME',
    location: 'server/v9DataEngine.ts (chạy 2026-09-15)',
    status: 'VERIFIED'
  },
  {
    id: 'EV-06',
    description: 'V10 getHealthStatus trả { appsScript: offline, spreadsheet: offline, demoMode: true, dataLayer: IN_MEMORY_MOCK, tablesCount: 39 }',
    sourceType: 'RUNTIME',
    location: 'server/v10DataEngine.ts (chạy 2026-09-15)',
    status: 'VERIFIED'
  },
  {
    id: 'EV-07',
    description: 'runE2ETests thực thi 20 bước: 18 PASS / 2 FAIL, allPassed=false',
    sourceType: 'RUNTIME',
    location: 'server/v9DataEngine.ts (chạy 2026-09-15)',
    status: 'VERIFIED'
  },
  {
    id: 'EV-08',
    description: 'AI decision log: logAiDecision → 18_AI_DECISIONS; trạng thái valid/fallback/not_generated; adaptive-reason fallback khi Gemini lỗi',
    sourceType: 'CODE',
    location: 'server.ts:259-288, 719-846',
    status: 'VERIFIED'
  },
  {
    id: 'EV-09',
    description: 'V9_SEED_IS_DEMO = true; 00_CONFIG DATA_LAYER_MODE = IN_MEMORY_DEMO; V10 demoMode: true',
    sourceType: 'CODE',
    location: 'server/v9DataEngine.ts:16,27; v10DataDictionary.ts:291',
    status: 'VERIFIED'
  },
  {
    id: 'EV-10',
    description: 'GameRuntime đo telemetry thật bằng refs (startedAt, pause, help, taskSwitch, duration, score, completionRate) — không nhét hằng số',
    sourceType: 'CODE',
    location: 'src/components/StudentApp/GameRuntime.tsx:55-163',
    status: 'VERIFIED'
  },
  {
    id: 'EV-11',
    description: 'sanitizeAdaptiveDecision + validation gate ép constraints: nextGameId ∈ candidates, duration ∈ [1..5], difficulty ∈ [1..3]',
    sourceType: 'CODE',
    location: 'server.ts (sanitizeAdaptiveDecision)',
    status: 'VERIFIED'
  },
  {
    id: 'EV-12',
    description: 'Apps Script: Auth.gs fail-closed (GUEST default), Authorization.gs PUBLIC_ROUTES, Router.gs self-scoping, Repository.gs LockService + updateByKey + upsert',
    sourceType: 'CODE',
    location: 'apps-script/*.gs',
    status: 'VERIFIED'
  },
  {
    id: 'EV-13',
    description: 'Nội dung nghiên cứu "bịa" bị dán nhãn/loại khỏi luồng trình bày thật; chỉ dùng demo seed rõ nhãn',
    sourceType: 'POLICY',
    location: 'EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md + cải tiến 2026-09-15',
    status: 'VERIFIED'
  }
];

export const TERMINOLOGY = [
  { term: 'Behavior Event', def: 'Sự kiện vi mô trong game (chọn, đổi lựa chọn, dừng, trợ giúp, chuyển scene) được đo thật' },
  { term: 'Situation', def: 'Tình huống học tập được nhận diện từ chuỗi hành vi (không phải chẩn đoán lâm sàng)' },
  { term: 'Student State / Model', def: 'Tích lũy bằng chứng hành vi của học sinh (construct scores)' },
  { term: 'Rule Engine', def: 'Tầng logic quyết định + ràng buộc an toàn (deterministic, không AI)' },
  { term: 'Gemini', def: 'Mô hình AI hỗ trợ reasoning giữa các lựa chọn trong allow-list (gemini-3.8-flash)' },
  { term: 'Adaptive Engine', def: 'Lựa chọn cuối cùng sau validation — hành động hệ thống thực thi' },
  { term: 'Intervention', def: 'Can thiệp thích ứng: micro-nudge / prompt / micro-action / game / đề xuất GV' },
  { term: 'Transfer', def: 'Chuyển hóa kỹ năng từ game sang vi hành động đời thực (đo riêng)' },
  { term: 'Demo / In-Memory Mock', def: 'Data layer hiện tại: IN_MEMORY_MOCK, chưa nối Google Sheets thật' },
  { term: 'No-PII', def: 'Chỉ dùng ID giả định danh (STU_xxx), không lưu tên thật/email/SĐT' }
];

export const CITATIONS = [
  { id: 'CIT-001', slide: '—', claim: 'Mọi claim nội bộ', source: 'Dữ liệu thử nghiệm kỹ thuật của nhóm (E2E, health, quality)', location: 'Repo EduChoice-AI v3, commit 0e22d48', accessDate: '2026-09-15', usedFor: 'Bảng số liệu kỹ thuật' },
  { id: 'CIT-002', slide: '—', claim: 'Baseline audit & cải tiến', source: 'EduChoice-AI Pre-Improvement Audit Report V1.0', location: 'EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md', accessDate: '2026-09-15', usedFor: 'Bối cảnh cải tiến (1.1/5 → hardening)' },
  { id: 'CIT-003', slide: '—', claim: 'Thiết kế đặc tả trình bày KHKT', source: 'EduChoice-AI Master Spec — PPTX Scientific Presentation V2', location: 'EDUCHOICE_AI_OPENCODE_MASTER_SPEC_...REFERENCE_STYLE.md', accessDate: '2026-09-15', usedFor: 'Cấu trúc slide & quy chuẩn công thức' }
];

export const DECK = {
  sender: 'EduChoice-AI Team',
  title: 'EduChoice-AI — Nền tảng hỗ trợ tự điều chỉnh hành vi học tập bằng AI thích ứng có kiểm soát',
  subtitle: 'Từ bịa số liệu giả → hệ thống trung thực: kỹ thuật, dữ liệu và thử nghiệm có kiểm soát',
  audience: 'Hội đồng giám khảo KHKT',
  date: '2026'
};

export const COLORS = {
  primary: '6B4EFF',
  primaryDark: '3D2B99',
  secondary: '8B7CFF',
  bg: 'FFFFFF',
  bgSoft: 'F5F7FF',
  ink: '1E2440',
  inkSoft: '4A5578',
  accent: 'F5A623',
  data: '2BB673',
  ai: '7C4DFF',
  warn: 'E4572E',
  line: 'D6DEF5',
  white: 'FFFFFF'
};
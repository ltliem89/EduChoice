# EduChoice-AI Pre-Improvement Audit Report

**Phiên bản báo cáo:** V1.0 — Baseline trước cải tiến
**Phạm vi audit:** Repository `4.educhoice-ai-v3` (working copy tại thời điểm 2026-09-15)
**Căn cứ quy trình:** `1.EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_SPEC.md`
**Quy tắc tuân thủ:** Audit → Báo cáo → Phê duyệt → Kế hoạch → mới sửa code. **Không file nào bị sửa.**

---

## 1. Executive Summary

EduChoice-AI v3 là một **ứng dụng web frontend (React + Vite + Express)** với giao diện học sinh/giáo viên-quản trị hoàn chỉnh,
cùng với **bộ thư viện Apps Script** (12 file `.gs`) mô tả một "Data Gateway" trên Google Sheets.

**Kết luận nhanh:** Hệ thống đang ở trạng thái **DEMO/MOCK**, không phải production-ready:

1. **KHÔNG có xác thực thật (authentication) ở bất kỳ đâu** — vai trò (`role`), `userId`, `schoolId` đều do client tự khai
   báo và được server tin tưởng tuyệt đối (`server.ts:912, 924, 952, 970`; `Auth.gs:9-23`). Một người dùng bất kỳ có thể tự gán
   mình thành `SUPER_ADMIN`. → **CRITICAL**.
2. **KHÔNG có Google Sheets thật.** Toàn bộ "data layer" là Map trong bộ nhớ (`v9DataEngine.ts:10`), được seed dữ liệu
   giả ("Seed initial realistic research data"), health status hardcode
   (`v10DataEngine.ts:205-218`), sync luôn báo thành công (`server.ts:693-701`), 20 bài E2E test **đều hardcoded PASS**
   (`v9DataEngine.ts:273-297`). URL Apps Script là placeholder
   (`https://script.google.com/macros/s/AKfycbz_sample/exec` — `server.ts:92`). → **CRITICAL**.
3. **Dữ liệu nghiên cứu được dựng sẵn (fabricated) và hiển thị như kết quả thật** ở toàn bộ khu Research
   (Cohen's d, p-value, cohorts, transfer gap... đều là hằng số nhúng trong code). → **CRITICAL** (Research Validity).
4. **Hai luồng logic song song không nhất quán:** Apps Script và Node server định nghĩa schema/route riêng,
   tên sheet, tên field lệch nhau (`goalTitle` vs `title`, `36_SYNC_LOG` vs `36_SYNC_QUEUE`, `03_STUDENT_PROFILES` thiếu
   `fullName/cohort/avatar/badge`) → **mất dữ liệu** khi ghi qua Apps Script. Ngay cả route `field/write` của Apps Script
   cũng gọi hàm **không tồn tại** `repo.updateByKey` (`FieldMap.gs:80`) → luôn lỗi.
5. **AI (Gemini) đúng là được gọi (model `gemini-3.8-flash` — GA 02/09/2026, hợp lệ), có fallback deterministic tốt,
   key nằm ở server** — nhưng **đầu ra Gemini không được kiểm chứng** bằng allow-list/range/safety trước khi dùng,
   và **không hề có log quyết định AI** (sheet `18_AI_DECISIONS` chỉ là định nghĩa schema, không nơi nào ghi).
6. **Về mặt tích cực:** 14 kịch bản game được xây dựng kỹ (scene/choice/consequence/intervention/reflection/microAction),
   13 toolkit được kiểm duyệt nội dung, kiến trúc V10 về mặt *ý tưởng* (Field-First, Idempotency, Offline-First,
   Read-After-Write) được thiết kế rõ ràng trong docs và một phần code — nhưng chỉ là **mô phỏng**, chưa nối tới hạ tầng thật.

**Verdict cuối (mục 45): `NO-GO`** đối với trạng thái hiện tại khi coi đây là một nền tảng sản xuất/có giá trị nghiên cứu.
Một chương trình cải tiến **có kiểm soát, theo giai đoạn** chỉ được phép bắt đầu sau khi các cổng **P0** (xác thực + định danh,
quyết định data layer, loại dữ liệu giả khỏi luồng production) được phê duyệt.

**Điểm tổng thể (mục 32): `1.1 / 5`** — chưa production-ready, và theo §34 không được dùng điểm trung bình để che
các Critical issue.

---

## 2. Audit Scope

### Đã audit (VERIFIED)
- Toàn bộ source code trong `4.educhoice-ai-v3`: `src/` (36 `.tsx` + 23 `.ts`), `server.ts`, `server/`, `apps-script/`
  (12 `.gs`), `docs/`, cấu hình (`package.json`, `tsconfig.json`, `vite.config.ts`, `.env.example`, `metadata.json`).
- Lịch sử git (2 commit — không liên quan EduChoice), remote/branch (không có).
- Bộ đặc tả mục tiêu trong docs (`API_CONTRACT.md`, `AUTH_MODEL.md`, `DATA_MODEL.md`, `FEATURE_DATA_CONTRACTS.md`, `SHEET_SCHEMA.md`)
  và `metadata.json`.
- Kiểm chứng độc lập tên model Gemini (`gemini-3.8-flash` — GA 2026-09-02, hợp lệ).

### KHÔNG truy cập được (NOT ACCESSIBLE)
- **Runtime thật:** chưa cài `node_modules`, chưa chạy được `tsc --noEmit` / build / server (việc build cũng tạo file — nằm ngoài quyền audit).
- **Environment variables / secrets của deployment:** không có `.env.local`, không biết key Gemini hiện hữu hay không.
- **Google Sheets thật:** không có `SPREADSHEET_ID` thật nào được cung cấp/khớp; mọi ID trong code là placeholder.
- **Apps Script deployment thật:** URL mẫu `AKfycbz_sample` — không truy cập được.
- **Vercel/AI Studio deployment:** không có cấu hình Vercel/CI trong repo; trạng thái deploy thật — không kiểm chứng được.

### Chưa kiểm chứng / suy đoán (INFERRED)
- Cách hành xử thực tế của Apps Script khi chạy trong Google (dựa trên đọc mã nguồn — mức tin cậy cao, nhưng chưa chạy thực).
- Hành vi CORS của Apps Script web app khi gọi POST `application/json` từ trình duyệt (client dùng `text/plain` để né preflight — `v10Client.ts:77`).

---

## 3. Project Inventory

| Thành phần | Đường dẫn | Vai trò thực tế | Trạng thái |
|---|---|---|---|
| SPA | `src/App.tsx`, `src/components/**` | Giao diện học sinh + admin/research | VERIFIED |
| State & logic | `src/context/AppContext.tsx` | Toàn bộ "business logic" — localStorage first | VERIFIED |
| Node Bridge | `server.ts` (1060 dòng, 44 endpoint) | Express server + proxy Gemini + in-memory store | VERIFIED |
| V9 engine | `server/v9DataEngine.ts` | In-memory Map "39 sheets" + seed giả + E2E giả | VERIFIED |
| V10 engine | `server/v10DataEngine.ts` | In-memory field-binding/RBAC/config giả | VERIFIED |
| Apps Script gateway | `apps-script/*.gs` (12 file) | doGet/doPost → Sheet/… (thiết kế) | VERIFIED (chưa deploy) |
| Data (nội dung) | `src/data/defaultGames.ts` (14 games), `approvedToolkits.ts` (13 toolkits), `defaultScripts.ts` | Nội dung game/toolkit | VERIFIED |
| Data (research) | `src/data/researchV5Data.ts`, `v6IntelligenceData.ts`, `v7FusionData.ts`, `v8EvolutionData.ts` | **Dữ liệu nghiên cứu giả, hardcoded** | VERIFIED |
| Phân tích | `src/utils/cohortAnalysis.ts`, `mlForecasting.ts` | Thuật toán thật nhưng chỉ chạy trên mảng giả | VERIFIED |
| Kiểm thử | KHÔNG CÓ file test nào (`*.test.*`, `*.spec.*`) | — | VERIFIED (vắng mặt) |
| Docs | `docs/*.md` (5 file) + README | Mô tả kiến trúc **mục tiêu**, chưa khớp hiện trạng | VERIFIED |
| Config | `package.json`, `tsconfig.json`, `vite.config.ts`, `.env.example`, `metadata.json` | Cấu hình dev/build; metadata quảng cáo khả năng chưa có | VERIFIED |

---

## 4. Actual Architecture

```text
Browser (React SPA trên cùng Express server, localhost:3000 / production build)
        │  fetch('/api/...')  — same-origin
        ▼
Express server (server.ts)  — KHÔNG xác thực, KHÔNG rate limit
        ├── /api/ai/*  → GoogleGenAI (server-side key, model gemini-3.8-flash)
        │                 └── output JSON.parse → KHÔNG validation
        ├── /api/v9/*  → V9DataEngine (IN-MEMORY Map, seeded giả)
        ├── /api/v10/* → V10DataEngine (IN-MEMORY, field-binding giả)
        ├── /api/telemetry, /api/audit-logs  → memory (cap 500)
        └── /api/sheets/sync  → trả success giả, KHÔNG có Google Sheets

[LUỒNG PHỤ - TÙY CHỌN, tắt mặc định]
Browser (nếu user dán Apps Script URL vào UI → localStorage)
        ▼
Apps Script doGet/doPost (apps-script/*.gs) — role/userId do client khai báo
        ▼
Google Sheets (SheetRepository — append, findBy…; field/write GÃY do thiếu updateByKey)
```

Khác với mô tả trong `metadata.json` và `docs/*`, **không có**: Vercel edge, Apps Script gateway được nối thật, Google Sheets
database, realtime remote config. Hết thảy là mô phỏng trong bộ nhớ + localStorage.

---

## 5. Target Architecture (theo audit spec §4 + docs)

```text
Browser (Vercel: Student / Teacher / Admin / Research UI)
        │ HTTPS
        ▼
Apps Script API Gateway (auth + RBAC + validation + rate-limit + CORS)
        ├── Google Sheets (Data Layer)
        ├── Rule Engine (deterministic + safety)
        └── Gemini AI (reasoning/personalization — KHÔNG phải điểm lỗi duy nhất)
                ▼
        Adaptive Engine
                ▼
        Game / Intervention + Teacher human oversight
```

**Nguyên tắc then chốt của mục tiêu:** Rule Engine quyết định luật/safety; Gemini chỉ suy luận trong allow-list;
AI hỏng → deterministic fallback → hệ thống vẫn chạy; không chẩn đoán lâm sàng; nghiên cứu phải có thiết kế so sánh hợp lệ.

---

## 6. Architecture Gap

| Hạng mục | Hiện tại | Mục tiêu | Khoảng cách | Tác động | Xử lý đề xuất |
|---|---|---|---|---|---|
| Xác thực | Không có (client tự khai role/userId) | Google identity + layer RBAC (docs `AUTH_MODEL`) | Toàn bộ | Toàn quyền giả mạo | P0: Google Identity + session server-side |
| Data Gateway | In-memory Map / localStorage | Apps Script API Gateway + Google Sheets | Toàn bộ | Không bền vững, không nghiên cứu thật | P0: quyết định data layer thật hoặc gắn nhãn DEMO |
| Rule Engine | Không tồn tại | Deterministic luật + safety + allow-list | Toàn bộ | AI không bị giới hạn | P1: xây rule/validation gate |
| Gemini role | Gọi trực tiếp, output không validate | Reasoning trong allow-list, có validation + log | Cao | gameId/toolkitId sai từ AI | P1: validation gate + 18_AI_DECISIONS |
| Apps Script | 12 file shell, field/write gãy, schema lệch | Gateway hoạt động, schema thống nhất | Cao | Mất dữ liệu, lỗi runtime | P1: sửa repository + thống nhất schema |
| Xác (deterministic) fallback | Có (tốt) | Phải luôn chạy khi AI lỗi | Thấp | — | Giữ và chuẩn hóa |
| Research | Dữ liệu giả hardcoded hiện như thật | Dữ liệu thu thập thật + thiết kế so sánh | Toàn bộ | Vô hiệu hóa giá trị nghiên cứu | P1: gỡ/đánh dấu demo, wire real pipeline |
| Observability | Audit partial/in-memory, AI không log | SYSTEM_LOG/API_LOG/AUDIT_LOG/AI_DECISIONS | Cao | Không truy vết được | P1: ghi log đầy đủ |

---

## 7. Critical Findings

### CRIT-001 — Không có xác thực; role/userId do client tự khai báo và được hệ thống tin tưởng
**Severity:** CRITICAL
**Area:** Security / Auth / RBAC (Node + Apps Script)
**Finding:** Toàn bộ hệ thống không xác minh danh tính. Bất kỳ ai gửi request cũng có thể tự chọn `role`, `userId`, `schoolId`.
Trên Apps Script: nếu `userId` không có trong `01_USERS`, `verifiedRole` rơi về giá trị client gửi
(`matched[0].role || roleFromClient`), và `SUPER_ADMIN` được `authorize_` miễn trừ hoàn toàn (`Authorization.gs:21`).
Trên Node: `/api/v10/config/system` mặc định actor là `SUPER_ADMIN` khi thiếu `userId` (`server.ts:912`);
`/api/v10/field/write` lấy `role` thẳng từ body (`server.ts:924,928`).
**Evidence:**
- File: `apps-script/Auth.gs:9-23` — `roleFromClient`, `userId`, fallback role.
- File: `apps-script/Authorization.gs:20-21` — `SUPER_ADMIN` bypass.
- File: `server.ts:912` — `const actor = req.body.userId || 'SUPER_ADMIN';`
- File: `server.ts:922-931` — role/userId từ body.
- File: `src/api/v10Client.ts:56-57,244` — gửi role từ client, tự claim `SUPER_ADMIN`.
- File: `src/components/AdminPortal/V10CloudManagement.tsx:1061-1089` — UI cho phép tự chuyển sang SUPER_ADMIN.
**Impact:** Toàn quyền đọc/ghi mọi dữ liệu học sinh, đổi cấu hình hệ thống, giả mạo giáo viên/giáo vụ, phá hủy
tính toàn vẹn dữ liệu nghiên cứu. Riêng việc này đủ để phủ nhận production.
**Root Cause:** Mọi lớp đều giả định "client đã được xác thực từ trước" nhưng không có lớp nhận dạng nào; `AUTH_MODEL.md` chỉ mô tả, không implement.
**Recommendation:** Duy nhất một nguồn sự thật về danh tính (Google Identity/OAuth/session do server hoặc Apps Script xác minh); role tra từ `01_USERS` theo chính identity đã xác minh; cấm client truyền `role`.
**Confidence:** High

### CRIT-002 — Truy cập chéo học sinh (IDOR): student có thể đọc/ghi dữ liệu học sinh khác
**Severity:** CRITICAL
**Area:** Privacy / Authorization
**Finding:** Các endpoint đọc hồ sơ/mục tiêu nhận `studentId` tùy ý từ query mà không kiểm tra quyền sở hữu/tenant.
**Evidence:**
- File: `apps-script/Router.gs:89-106` — `student/profile`, `student/goals` dùng `e.parameter.studentId` trực tiếp.
- File: `server.ts:796-822` — `/api/v9/student/profile|history|progress` dùng `req.query.studentId`.
- File: `server.ts:981-989` — `/api/v10/student/goals` dùng `req.query.studentId`.
**Impact:** Học sinh có thể xem/ghi đè dữ liệu của học sinh khác; vi phạm §10 Privacy; dữ liệu nghiên cứu không tin cậy.
**Root Cause:** Thiếu scoping server-side (self-only + tenant `schoolId`/`classId` như docs `AUTH_MODEL` §4 khẳng định mà không thực thi).
**Recommendation:** Mọi truy vấn student phải derive `studentId` từ identity đã xác minh; tenant boundary bắt buộc.
**Confidence:** High

### CRIT-003 — Toàn bộ "Google Sheets / Apps Script data layer" là mô phỏng in-memory/localStorage; health & sync & E2E đều giả
**Severity:** CRITICAL
**Area:** Architecture / Google Sheets / Testing
**Finding:** Không có kết nối Google Sheets thật ở runtime. Dữ liệu "39 sheet" là Map trong RAM
(`v9DataEngine.ts:10`) được seed số liệu giả; HTTP/health trả giá trị hardcode; `/api/sheets/sync` không ghi bất cứ đâu;
20 bài E2E trong `V9DataEngine.runE2ETests()` hardcode `PASS`.
**Evidence:**
- File: `server.ts:89-94` — `spreadsheetId: '1EduChoice_Sheet_Sample_Data_2026'`, `appsScriptUrl: '.../AKfycbz_sample/exec'`.
- File: `server.ts:693-701` — `/api/sheets/sync` luôn trả `{ success: true, ... }`, chỉ đổi timestamp.
- File: `server/v9DataEngine.ts:253-270` — `getDataQualityMetrics()` hardcode (`99.8`, `100.0`, `0.0`, `dateSource: 'GOOGLE_SHEETS'` mà không chạm Sheets).
- File: `server/v9DataEngine.ts:273-297` — 20 test `status: 'PASS'` cứng.
- File: `server/v10DataEngine.ts:205-218` — `appsScript:'healthy', spreadsheet:'healthy', errorRate:0.001` cứng.
- File: `src/context/AppContext.tsx:1063-1075` — `syncGoogleSheets` báo success **kể cả khi fetch lỗi**.
**Impact:** Hệ thống chạy thoáng qua như một demo nhưng tuyên bố là "Smart Management Cloud"; mọi số liệu nghiên cứu là hư cấu;
engineering không thể tin bất kỳ health/test nào.
**Root Cause:** Không có hạ tầng credentials/connectivity thật; code được viết theo spec mục tiêu nhưng cắt hết phần nối hạ tầng.
**Recommendation:** (a) Nối Google Sheets + Apps Script thật thông qua Repository interface, hoặc (b) công khai gắn nhãn system là DEMO và cấm dùng số liệu cho nghiên cứu. Không được để hai trạng thái trộn lẫn.
**Confidence:** High

### CRIT-004 — Dữ liệu nghiên cứu bịa đặt và hiển thị như kết quả thật (Research Integrity)
**Severity:** CRITICAL
**Area:** Research Validity / Data
**Finding:** Toàn bộ khu Research render số liệu cứng nhúng trong code: Cohen's d, p-value, cohorts, transfer gap,
"Agent Fusion consensus", "Weak Signals (EWMA/CUSUM)", "ML forecast" — tất cả là mảng hằng số. Việc bấm "Export CSV" còn
**bịa thêm số** khi thiếu dữ liệu.
**Evidence:**
- File: `src/data/researchV5Data.ts:242-248` — `ate: 0.28, ci95: [0.14,0.42], pValue: 0.003` (baked).
- File: `src/data/researchV5Data.ts:309-337` — `r = 0.54, p < 0.001` (baked, khác data trên!).
- File: `src/data/v6IntelligenceData.ts:274-301` — `DEFAULT_FUSION_RESULT`, `consensusScore: 0.91`.
- File: `src/data/v6IntelligenceData.ts:502` — research brief claim "Cohen's d = 0.48".
- File: `src/data/v7FusionData.ts:14-73` — weak signals với chuỗi giả như `deviationDelta: '+3.4s ...'`.
- File: `src/utils/cohortAnalysis.ts:100,119-320` — `PRESET_COHORTS` hardcoded; `mlForecasting.ts:452-466` — `baseDates`+`seriesMap` giả.
- File: `server/v9DataEngine.ts:101-132,161-169` — transfer/experiment seed giả.
- File: `src/components/AdminPortal/ExportDataModal.tsx:128-162` — CSV bịa `confidence ?? 0.75`, `retryCount ?? 6`, ...
- File: `src/components/AdminPortal/ResearchMetrics.tsx:238` — "100 bảng dữ liệu chuẩn hóa".
**Impact:** Mọi kết luận "AI tốt hơn vì điểm tăng" ở đây không có giá trị; vi phạm §17 Research Validity của audit spec;
nghiêm trọng về đạo đức nếu dùng để đánh giá học sinh.
**Root Cause:** Sản phẩm được build như demo product-chưa-có-data; các view nghiên cứu được "vẽ" trước, không có nguồn dữ liệu thật.
**Recommendation:** Chặn khu Research ở chế độ demo có nhãn rõ ràng; hoặc nối chuỗi dữ liệu thật (telemetry → aggregate → analytics)
và đánh giá lại toàn bộ claim thống kê.
**Confidence:** High

---

## 8. High Findings

### HIGH-001 — Apps Script `field/write` luôn crash: gọi hàm không tồn tại `updateByKey`
**Severity:** HIGH
**Area:** Apps Script
**Finding:** `updateFields_` gọi `repo.updateByKey(...)` nhưng `SheetRepository` chỉ định nghĩa
`constructor/getSheet/append/findBy/getAll/count`. Mọi request `field/write` (lõi của kiến trúc "Field-First") sẽ throw → trả `GATEWAY_ERROR`.
**Evidence:** `apps-script/FieldMap.gs:80`; `apps-script/Repository.gs:5-73` (không có `updateByKey`).
**Impact:** Không thể ghi field qua Apps Script — tính năng chủ chốt của V10 vỡ.
**Root Cause:** Viết theo spec nhưng chưa implement repository method.
**Recommendation:** Implement `updateByKey` (find row theo recordId → set giá trị cột) hoặc chuyển sang append-based upsert + LockService.
**Confidence:** High

### HIGH-002 — AppScript schema không nhất quán → ghi dữ liệu bị rơi (data loss) và trùng lặp bản ghi
**Severity:** HIGH
**Area:** Google Sheets / Data Model / Apps Script
**Finding:** Header và payload lệch nhau:
- `03_STUDENT_PROFILES` (registry) chỉ có `recordId, studentId, age, gradeLevel, baselineCluster, createdAt, updatedAt`
  trong khi `Router` ghi `fullName, cohort, avatar, badge,...` (`Router.gs:181-190`) → các cột này bị bỏ.
- `04_GOALS` (registry) dùng cột `title`; `Router.gs:150-161` ghi `goalTitle` → rơi dữ liệu.
- `Router.gs:162-191` `student/profile` **append** bản ghi mới mỗi lần (không upsert) và append thêm `01_USERS` mỗi lần → phát sinh trùng.
- `v10DataEngine`/`v9Registry` định nghĩa `36_SYNC_QUEUE` trong khi Apps Script ghi `36_SYNC_LOG` (`Sync.gs:8`) và đọc `36_SYSTEM_CONFIG`
  (`Router.gs:80`, `Router.gs:241`) — cả hai đều **không có trong registry** → Sheet tự tạo với header mặc định `recordId, createdAt`,
  toàn bộ field khác bị vứt bỏ.
**Evidence:** `apps-script/SchemaRegistry.gs:11-47`; `apps-script/Router.gs:146-204`; `apps-script/Sync.gs:8`;
`src/data/v9SchemaRegistry.ts`; `src/data/v10DataDictionary.ts:19-68`.
**Impact:** Mất dữ liệu thầm lặng, trùng lặp hồ sơ, research data sai.
**Root Cause:** Doc V10 (docs `SHEET_SCHEMA.md`), registry Apps Script (`SchemaRegistry.gs`), registry V9 client (`v9SchemaRegistry.ts`)
và data dictionary (`v10DataDictionary.ts`) **không thống nhất** — 4 nguồn schema mâu thuẫn nhau.
**Recommendation:** Một schema registry duy nhất (single source of truth); dùng chính nguồn đó để sinh header/validate ở cả
Node và Apps Script; thêm contract test.
**Confidence:** High

### HIGH-003 — Đầu ra Gemini không được validate (allow-list/range/safety) trước khi dùng; không có log AI decision
**Severity:** HIGH
**Area:** AI / Safety / Adaptive Engine
**Finding:** `/api/ai/adaptive-reason` chỉ `JSON.parse(text)` và trả nguyên về client (`server.ts:586-591`) — không kiểm tra
`nextGameId` ∈ candidateGames, `toolkitId` ∈ approvedToolkits, `durationMinutes` ∈ [1..5], `difficulty` ∈ [1..3], `safety.status`.
Toàn bộ ràng buộc chỉ nằm trong prompt (không ràng buộc được). Đồng thời **không nơi nào ghi `18_AI_DECISIONS`**
(dòng T09 trong E2E test giả khai "đã ghi" nhưng không có code ghi).
Ngoài ra `/api/ai/design-game` không clamp/validate duration & consequences của Gemini.
**Evidence:** `server.ts:576-594`; `server.ts:378-402`; `server/v9DataEngine.ts:283` (chỉ là chuỗi test giả);
`apps-script/SchemaRegistry.gs:26` (chỉ là định nghĩa).
**Impact:** Game không tồn tại trong allow-list có thể được chọn; nội dung AI thoát ràng buộc an toàn; không truy vết
được quyết định AI để nghiên cứu/audit.
**Root Cause:** Kiến trúc hiện tại trao cho Gemini "quyền quyết định" thay vì "quyền đề xuất trong allow-list".
**Recommendation:** Thêm validation gate server-side (allow-list + range + safety + business rule) theo đúng luồng §11 audit spec;
log decision+fallback+validationStatus vào `18_AI_DECISIONS`; nếu fail → deterministic fallback.
**Confidence:** High

### HIGH-004 — Telemetry game bịa số liệu thay vì đo thật
**Severity:** HIGH
**Area:** Game / Telemetry / Research
**Finding:** Khi kết thúc game, client tự nhét hằng số đo đạc như `durationMs: 180000`, `score: 90`,
`decisionTimeMeanMs: 3200`, `pauseCount: 0`, `helpCount: 1`, `taskSwitchCount: 1`, `completionRate: 1`,
construct signals 75/80/70 — không phải số thật đo được.
**Evidence:** `src/components/StudentApp/GameRuntime.tsx:109-127` (submitGameResult payload).
**Impact:** Toàn bộ "behavior metrics" là giả → adaptive student model, intervention response, transfer đều dựa trên nền sai.
**Root Cause:** Chưa implement tracking thật (đo thời gian thực chọn, số lần đổi, dừng, trợ giúp) của GameRuntime.
**Recommendation:** Đo thật từ scene lifecycle; chỉ ghi những gì quan sát được; đánh dấu missing fields thay vì chế số.
**Confidence:** High

### HIGH-005 — Student Model cập nhật sai & không nhất quán
**Severity:** HIGH
**Area:** Student Model / Research
**Finding:** (a) Mỗi lần cập nhật construct đều `sessionsCompleted + 1` (`AppContext.tsx:700`) → số "phiên đã hoàn thành"
phồng theo số lần thay đổi điểm. (b) `constructDetails` (confidence/evidenceCount/trend) **không bao giờ được cập nhật** từ lúc seed
→ `AppContext.tsx:158-165` lưu snapshot cũ, research view đọc giá trị stale. (c) Điểm construct đổi bằng delta cứng đơn giản,
không có smoothing/decay/confidence/missing-data/cold-start (§14 audit spec).
**Evidence:** `src/context/AppContext.tsx:690-704`; `src/components/StudentApp/GameRuntime.tsx:270-274,323`.
**Impact:** Student model không phản ánh hành vi thật; kết luận năng lực từ model này là vô nghĩa.
**Root Cause:** Student Model không phải là service có thuật toán cập nhật — chỉ là state React mẫu.
**Recommendation:** Tách thành StudentModelService có thuật toán cập nhật + confidence + versioning; gắn vào sự kiện thật.
**Confidence:** High

### HIGH-006 — Vai trò/quyền có thể tự nâng cấp ngay trong UI admin
**Severity:** HIGH
**Area:** Frontend / RBAC
**Finding:** Tab RBAC trong khu admin có nút "Chuyển sang vai trò này" cho từng role (STUDENT → SUPER_ADMIN),
set trực tiếp `userRole` và lưu localStorage; không có kiểm tra nào.
**Evidence:** `src/components/AdminPortal/V10CloudManagement.tsx:1061-1089`; `Navbar.tsx:167-197` (không gate giữa student/admin).
**Impact:** Củng cố CRIT-001: bất kỳ ai cũng trở thành SUPER_ADMIN.
**Recommendation:** Xóa UI này; role chỉ từ server.
**Confidence:** High

### HIGH-007 — Vault: user chỉnh URL Apps Script/Gateway trong UI và lưu localStorage
**Severity:** HIGH
**Area:** Security / Supply chain
**Finding:** Người dùng (kể cả học sinh nếu chạm được màn admin) có thể đổi URL gateway và mode sang "direct Apps Script";
giá trị lưu localStorage và được dùng ngay. Nếu một trang khác cùng origin bị XSS, hoặc kẻ tấn công thuyết phục user dán URL
giả, mọi dữ liệu sẽ chảy về máy chủ của kẻ tấn công.
**Evidence:** `src/components/AdminPortal/V10CloudManagement.tsx:55-58,562-581`; `src/api/v10Client.ts:13-39`.
**Impact:** Rò rỉ dữ liệu học sinh; giả mạo backend.
**Root Cause:** Thiếu phân quyền cấu hình hệ thống; gateway URL là code config không được bảo vệ.
**Recommendation:** Gateway URL phải là biến môi trường build/runtime, không nằm UI mở cho mọi vai trò.
**Confidence:** Medium

### HIGH-008 — `/api/v10/config/system` cả Node và Apps Script cho phép đổi cấu hình toàn hệ thống không kiểm soát
**Severity:** HIGH
**Area:** Config / Security
**Finding:** Node: `actor = req.body.userId || 'SUPER_ADMIN'` và không verify role (`server.ts:910-919`).
Apps Script: chỉ kiểm `context.role` (vốn đã giả mạo được, CRIT-001) nằm trong `["SUPER_ADMIN","SCHOOL_ADMIN"]` (`Router.gs:237-250`).
Cấu hình được append **thay vì update** → mỗi lần đổi lại thêm một dòng.
**Evidence:** `server.ts:912`; `apps-script/Router.gs:238-249`.
**Impact:** Ai cũng có thể vô hiệu hóa tính năng, đổi policy an toàn, gây nhiễu hệ thống.
**Recommendation:** Xác thực + quyền từ identity thật; upsert cấu hình; audit.
**Confidence:** High

---

## 9. Medium Findings

### MED-001 — Không có rate limiting, không giới hạn kích thước payload (chức năng), không CORS policy tường minh ở Node
**Evidence:** `server.ts:14` (`limit: '10mb'` duy nhất); toàn bộ route không middleware bảo vệ.
**Impact:** Dễ bị lạm dụng API; nghi ngờ CORS khi deploy Vercel/khác origin.
### MED-002 — Không có doOptions/CORS header trong Apps Script; client né bằng `text/plain` (`v10Client.ts:77`).
**Impact:** Gọi POST `application/json` trực tiếp tới Apps Script sẽ vấp preflight. Hoạt động né hiện không bền.
### MED-003 — Observed duplicate logic: 2 data engines (v9/v10) gần trùng nhau; 2 client API (v9Client/v10Client) trùng kiểu;
thêm `v10OfflineQueue` đội lại logic offline của `v9Client`.
**Impact:** Buj maintenance; cố định lỗi 2 nơi.
### MED-004 — Behavior events chỉ giữ 500 gần nhất ở cả client (`AppContext.tsx:667`) lẫn server (`server.ts:650-653`) → mất telemetry cũ.
### MED-005 — Read-after-write "verification" giả: `v10Client.verifyReadAfterWrite` chỉ `setTimeout(300)` (`v10Client.ts:263`) mà không đọc lại thật;
`v9Client.post` trả `ok:true` với `LOCAL_OFFLINE_QUEUE` khi offline nên read-back có thể "đúng" dù chưa ghi server.
### MED-006 — Consent không được thực thi: `02_CONSENTS` được ghi nhưng không endpoint nào kiểm tra consent trước khi cho chơi/thu telemetry.
### MED-007 — Không có teacher dashboard thật: docs kể `TEACHER`, `CLASS_TEACHER`, `teacher/label` nhưng giao diện không có phân vai
giáo viên (mọi thứ là admin/student/research views).
### MED-008 — Lỗi UI: nút "Vào Game"/"Chơi thử thách" ở vài entry dùng `game.id` trong khi game có trường `gameId`
(`FutureCalmHome.tsx:158`; `StudentPortal.tsx:423,437`) → click không làm gì.
### MED-009 — Intervention completion không log sự kiện hành vi (chưa có event type `intervention_*`), không đo response/retry/behavior change (§15).
### MED-010 — Không có observable `22_GAME_METRICS`, `37_DAILY_AGGREGATES`, `38_WEEKLY_AGGREGATES` tính từ dữ liệu thật; không có AI_DECISIONS log.

---

## 10. Low Findings

### LOW-001 — Nhiều unused imports (VD: `AdminDashboard.tsx:7-9`, `ScriptEditor.tsx:10-19`, `GameManager.tsx:3-12`,
`StudentPortal.tsx` ~9 icons, `Navbar.tsx:1-2`) — liệt kê đầy đủ trong phụ lục agent.
### LOW-002 — README là template AI Studio chung chung (liên kết `ai.studio/apps/...`), không mô tả thật hệ thống.
### LOW-003 — `package.json` tên `react-example`, version `0.0.0`; có `bun.lock` nhưng không lockfile npm.
### LOW-004 — Hardcoded UI: `streakDays`, "sessionsCompleted", timestamps seed (`AppContext.tsx:132,182,224,266,339-434,503`).
### LOW-005 — Trộn tiếng Anh vào UI tiếng Việt ("No-PII Safe", "V9 Canonical", "(+15 pts)").
### LOW-006 — Comment/code dẫn chiếu "Section 8, Section 43, Section 74..." tới đặc tả không nằm trong repo — không kiểm chứng được.
### LOW-007 — `metadata.json` tuyên bố khả năng (Field-First, Idempotency, Read-After-Write, Offline-First) không khớp hiện trạng.
### LOW-008 — Games defined đều `approvedBy: 'Admin Principal'`, tất cả `published` (`defaultGames.ts`) — thiếu quy trình phê duyệt thật.

---

## 11. Code Audit

- Cấu trúc TypeScript rõ ràng, component hóa tốt, tailwind nhất quán (điểm cộng).
- **Dead/duplicate code:** engines v9/v10 trùng chức năng; hai client trùng; nhiều unused imports.
- **Hard-coded:** mọi số liệu nghiên cứu, health, test, streak, sex: [].
- **Không có test** ở Node; `apps-script/Tests.gs:6-37` chỉ "không throw", không assert kết quả.
- Build script: `vite build && esbuild server.ts` — hợp lệ về mặt kỹ thuật; lint = `tsc --noEmit` (chưa chạy được — thiếu deps).

## 12. Apps Script Audit

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Router doGet/doPost | OK (route→switch, response JSON) | `Code.gs:6-12`; `Router.gs:25-259` |
| Idempotency | Có nhưng chỉ theo `requestId` trong `31_AUDIT_LOG`; event/game-result không audit nên không dedup | `Router.gs:37-49`; `Router.gs:206-213` |
| `field/write` | **GÃY** (`updateByKey` không tồn tại) | `FieldMap.gs:80` |
| Event/game-result | Không validate schema, chấp nhận studentId tùy ý | `Router.gs:206-225` |
| RBAC role | Giả mạo được (CRIT-001); `config/system` check inline nhưng role không tin cậy | `Router.gs:237-250` |
| LockService | Không dùng | grep toàn repo rỗng |
| Schema thống nhất | Không − 4 nguồn registry mâu thuẫn | mục HIGH-002 |
| Error handling | Catch → `GATEWAY_ERROR`, mất code gốc (`error.code` không có) | `Router.gs:260-269` |
| `36_SYSTEM_CONFIG`, `36_SYNC_LOG` | Không có trong registry → sheet sinh trống, mất field | `SchemaRegistry.gs`; `Router.gs:80` |
| Health | Trả "healthy" cứng, không kiểm tra Spreadsheet | `Router.gs:53-65` |

## 13. Google Sheets / Data Audit

- Registry Apps Script: 39 sheet (`00_CONFIG`→`38_WEEKLY_AGGREGATES`) — **naming khác** audit spec mục tiêu
  (spec: `03_STUDENTS/04_TEACHERS/16_GAME_RESULTS...40_DEMO_CASES`; dự án: `03_STUDENT_PROFILES/08_GAME_RESULTS/...`).
  Đây được phép chấp nhận ở MVP (spec §8) nhưng phải được chốt chính thức.
- Mâu thuẫn chi tiết đã nêu tại HIGH-002. Thêm: docs `SHEET_SCHEMA.md` và `v9SchemaRegistry` khác nhau về `01_USERS`
  (schoolId), `03_*` (fullName...), `04_GOALS` (`goalTitle` vs `title`), `31_AUDIT_LOG` (`table` vs `resourceType`),
  `34_DATA_DICTIONARY`, `35_FORM_SCHEMAS` (docs) vs `35_SCHEMA_VERSIONS` (registry), `36_SYSTEM_CONFIG` thiếu ở registry.
- **Không có spreadsheet thật nào được mở** để so khớp runtime (§35 — NOT ACCESSIBLE).

## 14. API Audit

- 44 endpoint Express (đếm từ `server.ts`), tất cả **không auth**; role/userId phụ thuộc client.
- Không rate limit; không schema validation (trừ `validatePayload_` Apps Script 2 schema, `Validation.gs`);
  validator TS (`src/utils/validator.ts`) thật nhưng **chỉ** được ScriptEditor dùng.
- Response envelope V10 nhất quán ở Node bridge nhưng Apps Script **không** trả đúng envelope đồng bộ
  (khác cấu trúc `meta/error`). Request/response contract lệch giữa 2 gateway.

## 15. Security Audit

| Khoản | Trạng thái | Mức |
|---|---|---|
| API key trong frontend | Không (key server-side qua `@google/genai`) | ✅ |
| Secret trong git | Không thấy (2 commit, `.gitignore` chặn `.env*`) | ✅ |
| Xác thực | Không có | CRITICAL |
| Giả mạo role | Có (client truyền role) | CRITICAL |
| IDOR học sinh | Có | CRITICAL |
| Rate limiting / payload | Không có | MEDIUM |
| CORS Node | Không cấu hình (same-origin mặc định) | INFO |
| CSP/security headers | Không | MEDIUM |
| Rerender HTML | Không `dangerouslySetInnerHTML` — React text an toàn | ✅ |
| UI đổi gateway URL | Có (localStorage) | HIGH |
| LocalStorage tiêm độc (game script/JSON) | Không render HTML; còn nguy cơ logic lạ nếu bị ghi đè | MEDIUM |

## 16. Privacy Audit

- "Không PII" là claim trong footer, nhưng thực tế: tên học sinh (`fullName`), badge, cohort, avatar được lưu trong
  localStorage và (nếu nối AppScript) Google Sheets. Không có mã hóa, không phân quyền đọc PII (`readableRoles` không phân biệt
  PII sensitivity).
- Không có consent check khi dùng (MED-006). Không có data minimization / retention / xóa dữ liệu.
- Trong cấu hình hiện tại (chưa nối Sheets), dữ liệu nằm localStorage mỗi thiết bị — rủi ro là chủ yếu lộ trên thiết bị dùng chung.

## 17. Gemini AI Audit

- **Key:** server-side qua `GEMINI_API_KEY` environment (`server.ts:17-30`). ✅
- **Model:** `gemini-3.8-flash` — GA 02/09/2026, **hợp lệ** (đã kiểm chứng web).
- **Timeout/retry:** không cấu hình tường minh (mặc định thư viện); lỗi được catch → fallback. ✅(đủ)
- **Structured output:** dùng `responseMimeType: 'application/json'` ✅; nhưng chỉ `JSON.parse`, không validate schema.
- **Hallucination/allow-list:** không kiểm tra `nextGameId/toolkitId/`duration/difficulty.
- **Safety:** chỉ trong prompt ("G-rating, không chẩn đoán") — không có safety gate sau sinh.
- **Log AI decision:** không có.
- **Prompt injection:** admin script/rawScript từ user đưa trực tiếp vào prompt (`server.ts:379`) — rủi ro trung–cao khi có nhiều user.
- **Fallback:** có (deterministic) — tốt.

## 18. Hybrid Intelligence Audit

| Thành phần | Trạng thái thực tế |
|---|---|
| Rule Engine | **Không tồn tại**. Chỉ có validator TS cho game spec, chưa dùng cho adaptive decision. |
| Student Model | State React + localStorage, cập nhật delta cứng, không thuật toán. |
| Gemini | Reasoning được phép "quyết định" next game/intervention mà không bị ràng buộc allow-list ở output. |
| Adaptive Engine | Có: Gọi Gemini hoặc fallback "construct điểm thấp nhất" (`server.ts:597-630`); fallback luôn chọn game đầu/list không đa dạng; không có repetition/dose/age check. |

**Risk:** kiến trúc hiện trao cho Gemini quyền vượt quá "reasoning trong allow-list" → vi phạm nguyên tắc phân tách
Rule Engine vs Reasoning (audit spec §12). Đánh dấu **architecture risk = HIGH**.

## 19. Rule Engine Audit

Sự thật: **không có Rule Engine nào** chạy ở runtime. FIELD_MAP (`FieldMap.gs`) là 1 phần thô sơ quyền ghi field;
validateGameSpecification (`validator.ts`) là duy nhất → 0/5.

## 20. Student Model Audit

- Đầu vào: choice delta cứng + reflection +15, không dựa trên telemetry đo được (HIGH-004/005).
- Cập nhật: cộng/trừ tuyến tính clamp 0–100; `sessionsCompleted` sai; `constructDetails` stale.
- KHÔNG có: confidence smoothing, decay, missing data, cold start handling, versioning.
- Kết luận năng lực từ 1 sự kiện: **có** nguy cơ (UI hiển thị construct bars thay đổi sau 1 choice).

## 21. Adaptive Engine Audit

- Candidate: games `status==='published'` (14 game, đều pre-approved) → đủ đa dạng trên giấy.
- Fallback: chọn construct thấp nhất → game đầu có construct đó; không xét repetition/intervention burden/dose/prior response.
- Gemini: output không allow-list (HIGH-003). **Confidence "0.82/0.84" là hằng số** — không tính thật.

## 22. Intervention Audit

- Game có scene intervention + toolkitHint + prompt "thử lại" (tốt).
- **Không đo:** intervention completion log, pre/post, response classification, retry-then-outcome. Sheet `10_INTERVENTIONS`
/`11_INTERVENTION_RESULTS`/`30_RESPONSE_CLASSIFICATION` chỉ tồn tại ở schema, không có luồng ghi từ game.
→ Mới chỉ là Game → điểm, chưa có vòng Intervention → Response → Retry → Behavior Change (§15 gap).

## 23. Transfer Audit

**TRANSFER GAP — CONFIRMED.** `27_TRANSFER_MEASURES` chỉ có 2 dòng seed giả (`v9DataEngine.ts:101-132`); không có cầu nối
game → micro-action đời thực → completion → đo transfer. `transferIndex/gap/confidence` đều là hằng số.
→ Đây là hạng mục **quan trọng nhất về giá trị nghiên cứu** theo audit spec §16, hiện bằng 0.

## 24. Game Audit

- 14 games (`defaultGames.ts`) — mỗi game có: id, title, ageRange, duration (1-5′ ✅), objective (qua description), constructs,
  scenes (situation/choice/consequence/intervention/reflection/ending), choices với `constructImpact`, consequence, toolkit, retry-prompt,
  reflection question, microAction ✅.
- **Hạn chế:** mọi game `published`/`approved` từ seed (thiếu human-review flow thật); telemetry đo đạc giả (HIGH-004);
  construct signals là hằng số khi submit.
- Điểm game: **3/5** (nội dung tốt, telemetry chưa thật).

## 25. UX Audit

- UI đẹp, mobile-responsive (tailwind), có toast, modal, empty-ish states.
- **Thiếu:** luồng auth/role UI thật; phân tách student/teacher rõ ràng; một vài nút "play" chết (MED-008); offline/error state
  nhiều nơi ẩn lỗi thành công ("sync thành công" kể cả khi lỗi — `AppContext.tsx:1063-1075`).
- **Tốt:** không leaderboard, không ranking/shaming, lời động viên tích cực, ngôn ngữ không chẩn đoán (đúng §19/§3).

## 26. Performance Audit

- In-memory: nhanh nhưng cap 500 events (mất dữ liệu); AppScript `findBy` quét toàn bộ sheet (O(n)) mỗi lần (đặc biệt idempotency
  scan `31_AUDIT_LOG`) — nguy cơ quota với nhiều request; không có batch/caching.
- Không có `SpreadsheetApp.setValue` trong vòng lặp rõ ràng trong .gs (appendRow một lần / record — chấp nhận được), nhưng
  `updateFields_` làm nhiều appendRow/đọc tách lẻ → nguy cơ quota khi 1 request cập nhật nhiều field.

## 27. Observability Audit

- `AUDIT_LOG`: một phần write (Node in-memory; Apps Script chỉ one số route). Không audit read.
- `API_LOG`, `DATA_QUALITY`, `AI_DECISIONS`: không có luồng ghi thật.
- `ERROR_LOG` Apps Script: có (rất thô). Node: chỉ console.
- Trả lời được câu hỏi "request nào/user nào/AI quyết định gì/vì sao/confidence/fallback/version" → **KHÔNG**.

## 28. Testing Audit

- **Không có test thật** (0 file `*.test.*`/`*.spec.*`). E2E V9 là mảng chuỗi hardcode PASS (`v9DataEngine.ts:273-297`).
- Apps Script `Tests.gs` = smoke không assert. Không có failure tests (Gemini timeout/invalid JSON/quota; Sheet mất; request hỏng...).

## 29. Deployment Audit

- Không vercel.json/CI/scripts deploy trong repo; `start` chạy `dist/server.cjs`.
- Chưa kiểm chứng deploy thật (NOT ACCESSIBLE). Không có health check/smoke test sau deploy; không có rollback plan.
- Apps Script: chưa có script để deploy version; URL placeholder.

## 30. Research Validity Audit

- **Vô hiệu do data giả (CRIT-004).** Thêm vào: experiment "active" là record seed (`v9DataEngine.ts:161-169`) không assignment thật;
  không pre/post; không control/treatment thật; effect size/p-value là hằng số mâu thuẫn nhau (0.48 vs 0.28).
- Không có versioning cho prompt/policy trong code chạy (chỉ định nghĩa schema).
→ Kết luận mọi claim "AI tốt hơn vì điểm tăng" là **không được chấp nhận** (audit spec §17).

## 31. Documentation Audit

- Docs `docs/*.md` mô tả kiến trúc **mục tiêu** đẹp nhưng không khớp hiện trạng (khác biệt được liệt kê).
- Không có docs vận hành, deployment, schema single-source, quy trình phê duyệt nội dung.

---

## 32. Scorecard

| Nhóm | Điểm (0-5) | Ghi chú |
|---|---|---|
| Architecture | 1 | Ý tưởng tốt, hiện trạng là demo mock |
| Code Quality | 2 | TS sạch, nhưng dead/duplicate, hardcode, không test |
| Data Model | 1 | 4 nguồn schema mâu thuẫn, mất dữ liệu |
| Apps Script | 1 | field/write gãy, auth giả mạo |
| Google Sheets | 0 | Không có kết nối thật |
| Security | 0 | Không auth, IDOR, role tự khai |
| Privacy | 1 | Claim no-PII nhưng thực ra lưu tên; không consent gating |
| AI | 2 | Gemini đúng model + fallback tốt; thiếu validation/log |
| Rule Engine | 0 | Không tồn tại |
| Student Model | 1 | State demo, cập nhật sai |
| Adaptive Engine | 1 | Có, nhưng output không allow-list, fallback không đa dạng |
| Intervention | 2 | Có nội dung trong game; chưa đo response/retry |
| Transfer | 0 | Chỉ seed giả |
| Game | 3 | 14 game nội dung tốt; telemetry giả |
| UX | 2 | Đẹp, một số nút chết, sai behavior khi lỗi |
| Performance | 2 | In-memory OK; AppScript O(n), cap 500 |
| Observability | 1 | Không AI log, audit cục bộ |
| Testing | 0 | Không test thật; E2E hardcode PASS |
| Deployment | 1 | Không CI/rollback/health; URL placeholder |
| Research Validity | 0 | Dữ liệu giả hiện như thật |
| Documentation | 2 | Spec mục tiêu đầy đủ nhưng lệch hiện trạng |

**Overall Score: 1.1 / 5** — dù điểm thấp, quyết định dựa trên Critical findings chứ không phải số trung bình (§24).

---

## 33. Root Cause Analysis

```
Không có xác thực (CRIT-001/006)
   └─ Nguyên nhân trực tiếp: server tin req.body.role/userId
        └─ Nguyên nhân kỹ thuật: chưa có identity provider / session plugin
             └─ Nguyên nhân kiến trúc: "gateway" được thiết kế stateless nhưng không có pre-auth layer
                  └─ Nguyên nhân quy trình: mọi spec (AUTH_MODEL, API_CONTRACT) đều mô tả auth mà không có task implement

Dữ liệu nghiên cứu giả (CRIT-004, HIGH-004, TRANSFER GAP)
   └─ Trực tiếp: cần số liệu để vẽ UI Research
        └─ Kỹ thuật: hardcode mảng thay vì pipeline tính
             └─ Kiến trúc: research layer không được cấp nguồn dữ liệu thật (telemetry cũng giả)
                  └─ Quy trình: sản phẩm được xây theo hướng "demo trước, data sau" mà không có gate nghiên cứu

Data layer không thống nhất (HIGH-002)
   └─ Trực tiếp: 4 file định nghĩa schema
        └─ Kỹ thuật: không có single source of truth / không sinh schema chung
             └─ Kiến trúc: Node engine vs Apps Script engine tách đôi, không dùng chung contract
                  └─ Quy trình: spec V9 rồi V10 được bổ sung chồng lớp

AI không validate (HIGH-003)
   └─ Trực tiếp: JSON.parse rồi trả về
        └─ Kỹ thuật: thiếu validation gate
             └─ Kiến trúc: Gemini được trao quyền "quyết định" thay vì "đề xuất trong allow-list"
                  └─ Quy trình: thiếu nguyên tắc Rule Engine = policy trong các spec cũ
```

---

## 34. Dependency Map

```text
[React SPA]
   ├─ /api/ai/*        → Express → @google/genai → Gemini (model gemini-3.8-flash)
   ├─ /api/v9/*        → V9DataEngine (in-memory)   ← seeded giả (STU_001, transfer...)
   ├─ /api/v10/*       → V10DataEngine (in-memory)  ← seeded goals/config
   ├─ /api/telemetry   → server store (cap 500)
   ├─ /api/audit-logs  → server store
   ├─ /api/sheets/sync → noop (success giả)
   └─ [tùy chọn] direct Apps Script URL → apps-script/*.gs → (nếu để chạy sẽ tới)
        Google Sheets (append/findBy; field/write gãy)
   └─ localStorage (mọi state nghiệp vụ)
```

**Ghi chú phụ thuộc:** `@google/genai` (duy nhất nút AI), express/vite/react/recharts — đều hợp lệ và phổ biến.
Không dependency lỗi thời đánh giá được (chưa chạy npm audit — NOT VERIFIED).

---

## 35. Technical Debt

1. Nội dung business logic nằm AppContext 1100 dòng (state + sync + research mixed).
2. 2 engine + 2 client + 1 offline service trùng chức năng.
3. Research data 4 file hardcode (khó thay thế bằng pipeline thật).
4. Schema 4 nguồn mâu thuẫn.
5. `updateByKey` thiếu → cần khai báo test trước khi fix (đúng quy trình: viết test → fix).

## 36. Security Debt

1. Auth nền tảng (P0).
2. IDOR scoping (P0).
3. Role tự khai ở client (P0; gỡ UI).
4. Gateway URL do user đổi (P0/P1 — chuyển thành env).
5. Rate limit + CSP + payload limits (P1).
6. Input validation server-side cho event/game_result (P1).

## 37. Research Debt

1. Mọi metric hiện tại là giả → phải đánh dấu/loại bỏ trước khi công bố bất kỳ điều gì.
2. Chưa có thiết kế so sánh hợp lệ (RCT) với assignment thật, pre/post, power.
3. Chưa có measurement protocol cho transfer.
4. Thiếu versioning prompt/policy + log AI decisions.

---

## 38. Recommended Improvement Roadmap

**Giai đoạn 0 — Chốt quyết định (con người, PRIORITY P0):**
- D0.1: Mục đích sản phẩm: demo/khảo sát nội bộ hay sản phẩm thật + nghiên cứu có kiểm soát. Quyết định này ảnh hưởng mọi bước sau.
- D0.2: Data layer: giữ Google Sheets (thật, qua Apps Script) hay chuyển Postgres/Supabase. Spec §32 đề xuất Repository Interface.
- D0.3: Chủ quyền dữ liệu học sinh hiện trong localStorage/`01_USERS` — cần xử lý PII + consent.

**Giai đoạn 1 — P0 (bắt buộc trước mọi thứ):**
1. Auth: Google Identity hoặc session do server cấp; bỏ hoàn toàn role từ client.
2. Scoping: mọi truy vấn student derive từ identity; tenant boundary server-side.
3. Gỡ UI tự nâng quyền; chuyển gateway URL thành env.
4. Gắn nhãn DEMO hoặc nối data thật; dừng mọi hiển thị số liệu giả mà không có nhãn.

**Giai đoạn 2 — P1 (core):**
5. Fix/hợp nhất schema (single source of truth); sinh header từ registry; upsert + LockService.
6. Fix `field/write` (implement updateByKey + test trước).
7. Validation gate cho Gemini (allow-list, range, safety) + ghi `18_AI_DECISIONS` + fallback chuẩn.
8. Telemetry thật trong GameRuntime (đọ time thật, choice changes, pause, help, retry).
9. Student Model service (smoothing, confidence, decay, versioning).
10. Response measurement: intervention → retry → behavior change; micro-action completion → transfer proxy.
11. Observability chuẩn (SYSTEM_LOG/API_LOG/AUDIT_LOG/DATA_QUALITY).

**Giai đoạn 3 — P2/P3 (tối ưu):**
12. Teacher dashboard thật, consent gating, rate limiting, CSP.
13. Dọn dead code, fix nút play (game.id), README, test suite thật (unit/integration/failure).

---

## 39. Priority Matrix

| Priority | Issue | Impact | Effort | Dependency |
|---|---|---|---|---|
| P0 | Auth + identity server-side | Critical | M | — |
| P0 | IDOR / tenant scoping | Critical | M | P0 auth |
| P0 | Gỡ role-tự-chọn + gateway URL UI | Critical | S | — |
| P0 | Quyết định DEMO vs data thật + nhãn | Critical | S | Con người |
| P1 | Schema thống nhất + upsert | High | M | — |
| P1 | Fix field/write (updateByKey) + test | High | S | P1 schema |
| P1 | Gemini validation gate + AI log | High | M | — |
| P1 | Telemetry thật game runtime | High | M | — |
| P1 | Student model service | High | M | P1 telemetry |
| P1 | Intervention/transfer measurement | High | L | P1 telemetry |
| P1 | Observability | High | M | P1 schema |
| P2 | Teacher dashboard / consent gating | Med | L | P0 auth |
| P2 | Rate limit / CSP | Med | S | — |
| P3 | Dead code, UI bugs, docs, tests | Low | L | — |

---

## 40. Proposed V13 Architecture

Chỉ đề xuất, **không implement** (§32 audit spec):

```text
VERCEL (React SPA: Student/Teacher/Admin/Research)
      │ HTTPS
      ▼
API Gateway (Vercel edge/Node) — Auth (Google Identity) → RBAC → session
      ▼
Service Layer:
   StudentService → BehaviorEngine → StudentModel
   InterventionEngine → AdaptiveEngine
       │
       ▼
 AI Reasoning (Gemini)  ── chỉ đề xuất trong allow-list
       │
       ▼
 ValidationGate: allow-list game/toolkit, range(1-5′/1-3 difficulty), safety, business rule
       │
       ▼
 Recommendation + Logging (18_AI_DECISIONS, AUDIT_LOG)
      │  fallback nếu Gemini lỗi → DeterministicRuleEngine (KHÔNG bao giờ đứt)
      ▼
DATA LAYER:
   Repository Interface
      ├─ GoogleSheetsRepository (hiện tại)
      └─ (sau này) Postgres/Supabase thay thế mà không đổi business logic
```

Quy tắc bất biến V13:
1. **Rule Engine = luật + safety + deterministic**; Gemini = reasoning trong allow-list; chưa tách → không merge sang mã mới.
2. **Gemini không bao giờ là điểm lỗi duy nhất** — validation/fail-to-deterministic ở mọi điểm.
3. **No diagnosis** — mọi khái niệm giữ đúng danh sách constructs §3 của spec; cấm kết luận từ 1 event.
4. **Research** chỉ xuất từ data thật đã versioning, có design so sánh phê duyệt.

---

## 41. Files That Should Change

- `server.ts` (auth, validation gate, real data layer mount, cấu hình ngoài UI).
- `server/v9DataEngine.ts`, `server/v10DataEngine.ts` (thay bằng Repository implementation, hoặc giữ lại in-memory chỉ cho dev/test rõ nhãn).
- `apps-script/Repository.gs` (thêm `updateByKey`, LockService); `apps-script/SchemaRegistry.gs` (thống nhất với 1 nguồn schema);
  `apps-script/FieldMap.gs`, `Router.gs`, `Auth.gs`, `Authorization.gs` (auth + scoping + upsert).
- `src/context/AppContext.tsx` (bỏ fake sync, trả lỗi thật, tách service).
- `src/components/StudentApp/GameRuntime.tsx` (đo telemetry thật — bỏ số giả).
- `src/data/researchV5Data.ts`, `v6IntelligenceData.ts`, `v7FusionData.ts`, `v8EvolutionData.ts` (chỉ giữ làm demo có nhãn, hoặc thay bằng pipeline thật).
- `src/components/AdminPortal/ExportDataModal.tsx` (bỏ bịa số), `V10CloudManagement.tsx` (gỡ role-tự-chọn + URL editable).
- `src/utils/validator.ts` (dùng ở server + adaptive gate).
- `src/api/v9Client.ts`, `v10Client.ts` (bỏ gửi role; nhận context từ server).
- `package.json`/README (`react-example` → tên dự án; README thật).

## 42. Files That Should NOT Change

- `src/data/approvedToolkits.ts` — nội dung 13 toolkit duyệt (giữ, chỉ chuyển quyết định phê duyệt sang server).
- `src/data/defaultGames.ts` — **nội dung kịch bản** (scene/choice) tốt; chỉ chuyển trạng thái `status/approvedBy/publishedAt`
  thành dữ liệu quản lý server-side, không sửa nội dung hiện có.
- `src/types.ts`, `src/types/v9DataContract.ts`, `v10DataContract.ts` — contracts tốt làm nền V13.
- `src/components/StudentApp/InterventionModals.tsx`, giao diện chung — thiết kế UI tốt, chỉ sửa luồng dữ liệu.
- `docs/*.md` — giữ làm tài liệu mục tiêu, thêm file "actual state" thay vì sửa bản mục tiêu.
- `index.html`, `vite.config.ts` — cấu hình dev build ổn định.

---

## 43. Risks

1. **Risk dữ liệu học sinh hiện hữu:** nếu có deployment thật nào dùng `01_USERS`/profiles — không cách nào biết (NOT ACCESSIBLE);
   phải audit thực địa trước khi giữ dữ liệu.
2. **Risk nối Apps Script vào production ngay:** field/write gãy + schema lệch → mất dữ liệu âm thầm.
3. **Risk nghiên cứu:** đã có UI hiển thị "kết quả" — nếu ai đó đã dùng số liệu này làm kết luận, cần thu hồi/đính chính.
4. **Risk Gemini:** output không validate có thể sinh game/toolkit không tồn tại → runtime lỗi hoặc nội dung không kiểm soát.
5. **Risk maintainability:** 2 gateway song song (Node vs Apps Script) với contract khác biệt sẽ ngày càng lệch.

---

## 44. Questions Requiring Human Decision

| # | Câu hỏi | Ai quyết |
|---|---|---|
| Q1 | Sản phẩm này là DEMO nội bộ hay nền tảng thật triển khai trong trường? | Chủ dự án |
| Q2 | Data layer V13: Google Sheets thật hay chuyển Postgres/Supabase? | Kiến trúc |
| Q3 | Auth: dùng Google Workspace (tài khoản trường) hay OAuth tùy chỉnh? | Chủ dự án + IT trường |
| Q4 | Dữ liệu research seed giả hiện có: gỡ hẳn, giữ chế độ demo có nhãn, hay lưu để test UI? | Nghiên cứu |
| Q5 | Có cần tuân thủ GDPR/COPPA/tương đương VN (bảo vệ trẻ em)? Phạm vi consent ra sao? | Pháp lý |
| Q6 | Bộ 40-sheet mục tiêu của audit spec vs 39-sheet của dự án: chốt theo bên nào? | Kiến trúc + Nghiên cứu |
| Q7 | Có thật sự triển khai Apps Script gateway, hay giữ Node server là gateway duy nhất? (Chọn 1 trong 2 để tránh 2 nguồn sự thật) | Kiến trúc |

---

## 45. Final Go/No-Go Assessment

### Kết luận: **NO-GO** (đối với trạng thái hiện tại xét như nền tảng production/nghiên cứu)

Lý do (§34): tồn tại các **Critical issue** (không xác thực, IDOR, data layer giả, dữ liệu nghiên cứu bịa) và
**chưa đủ bằng chứng** về runtime/deployment/credentials thật.

### Điều kiện để chuyển sang **GO WITH CONDITIONS** → sau đó **GO**:

1. **P0 xác thực + scoping** được implement và test (không còn role từ client).
2. **Quyết định data layer** (Q2, Q6) được con người chốt; lộ trình nối Repository thật hoặc công khai nhãn DEMO.
3. **Toàn bộ số liệu giả** bị gỡ khỏi luồng production hoặc gắn nhãn "DEMO — không dùng cho nghiên cứu".
4. Verification an toàn: sau các thay đổi P0 cần **AUDIT LẠI** trước khi triển khai (theo workflow §33: AUDIT → HUMAN REVIEW → ...).

> **Khuyến nghị mạnh nhất từ báo cáo:** đừng đổ thêm tính năng lên nền hiện tại. Hãy xử lý P0 trước;
> đặc biệt, **không được dùng bất kỳ số liệu nào từ hệ thống này làm kết luận nghiên cứu** cho tới khi
> telemetry thật + validation + design so sánh hợp lệ đã tồn tại.

---

*Báo cáo này là baseline chính thức trước cải tiến EduChoice-AI. Mọi finding đều kèm evidence file:line;
phân biệt VERIFIED / INFERRED / NOT VERIFIED / NOT ACCESSIBLE. Không file nguồn nào bị sửa đổi.*
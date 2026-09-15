# Evidence Ledger — EduChoice-AI

Ngày đo: 2026-09-15 · Phương pháp: chạy trực tiếp working copy (engine, health, audit scan). Cite file:line cho mọi mục.

## Bằng chứng
| ID | Claim(s) hỗ trợ | Loại | Trạng thái | Mô tả | Nguồn |
| --- | --- | --- | --- | --- | --- |
| EV-01 | CLM-001 | CODE | VERIFIED | resolveIdentity + DEMO_USERS allow-list + denyIfBelowRole + denyIfCrossStudent trong server.ts | server.ts (auth middleware, role gates) |
| EV-02 | CLM-001 | TEST | VERIFIED | Smoke test: spoof SUPER_ADMIN → 403; SYSADMIN trong allow-list → ok=true | Smoke tests chạy 2026-09-15 |
| EV-03 | CLM-002 | TEST | VERIFIED | Smoke test: GET profile của STU_002 khi danh tính STU_001 → 403 | Smoke tests chạy 2026-09-15 |
| EV-04 | CLM-003 | CODE | VERIFIED | /api/health trả dataLayer: in-memory-demo, authMode: demo-server-side-allowlist, geminiConfigured, sheetsConfigured | server.ts:294-304 |
| EV-05 | CLM-003, CLM-006 | RUNTIME | VERIFIED | getDataQualityMetrics trả { dataSource: IN_MEMORY_MOCK, demoMode: true, eventIngestionRate: 0, message: demo } | server/v9DataEngine.ts (chạy 2026-09-15) |
| EV-06 | CLM-001, CLM-002, CLM-003 | RUNTIME | VERIFIED | V10 getHealthStatus trả { appsScript: offline, spreadsheet: offline, demoMode: true, dataLayer: IN_MEMORY_MOCK, tablesCount: 39 } | server/v10DataEngine.ts (chạy 2026-09-15) |
| EV-07 | CLM-004 | RUNTIME | VERIFIED | runE2ETests thực thi 20 bước: 18 PASS / 2 FAIL, allPassed=false | server/v9DataEngine.ts (chạy 2026-09-15) |
| EV-08 | CLM-004, CLM-005 | CODE | VERIFIED | AI decision log: logAiDecision → 18_AI_DECISIONS; trạng thái valid/fallback/not_generated; adaptive-reason fallback khi Gemini lỗi | server.ts:259-288, 719-846 |
| EV-09 | CLM-003, CLM-006 | CODE | VERIFIED | V9_SEED_IS_DEMO = true; 00_CONFIG DATA_LAYER_MODE = IN_MEMORY_DEMO; V10 demoMode: true | server/v9DataEngine.ts:16,27; v10DataDictionary.ts:291 |
| EV-10 | CLM-005 | CODE | VERIFIED | GameRuntime đo telemetry thật bằng refs (startedAt, pause, help, taskSwitch, duration, score, completionRate) — không nhét hằng số | src/components/StudentApp/GameRuntime.tsx:55-163 |
| EV-11 | CLM-005 | CODE | VERIFIED | sanitizeAdaptiveDecision + validation gate ép constraints: nextGameId ∈ candidates, duration ∈ [1..5], difficulty ∈ [1..3] | server.ts (sanitizeAdaptiveDecision) |
| EV-12 | — | CODE | VERIFIED | Apps Script: Auth.gs fail-closed (GUEST default), Authorization.gs PUBLIC_ROUTES, Router.gs self-scoping, Repository.gs LockService + updateByKey + upsert | apps-script/*.gs |
| EV-13 | CLM-006 | POLICY | VERIFIED | Nội dung nghiên cứu "bịa" bị dán nhãn/loại khỏi luồng trình bày thật; chỉ dùng demo seed rõ nhãn | EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md + cải tiến 2026-09-15 |

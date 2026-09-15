# Claim QA Report — EduChoice-AI

Quy trình: mọi claim trên slide → evidenceIds phải tồn tại trong Evidence Ledger; confidence rõ ràng; level chỉ định nơi nói.
| ID | Claim | Confidence | Level | Evidence | Slide chính / backup |
| --- | --- | --- | --- | --- | --- |
| CLM-001 | Server-side auth allow-list: khách mặc định GUEST, mọi role xuất phát từ danh tính được xác minh; không tin role từ client. | HIGH | LEVEL 1 | EV-01, EV-02, EV-06 | S10; S17 / B07 |
| CLM-002 | IDOR bị chặn: truy cập dữ liệu học sinh khác trả 403 (self-scoping). | HIGH | LEVEL 1 | EV-03, EV-06 | S17 / — |
| CLM-003 | Hệ thống báo đúng trạng thái demo/in-memory: health, data quality, sync 501; không báo success giả. | HIGH | LEVEL 1 | EV-04, EV-05, EV-06, EV-09 | S14; S16 / B03 |
| CLM-004 | Bộ E2E chạy thật: 18/20 PASS; 2 failure (T06 intervention write, T09 AI decision log cho student test) được báo lộ thiên thay vì giả PASS. | HIGH | LEVEL 1 | EV-07, EV-08 | S16 / B06 |
| CLM-005 | Đầu ra Gemini bị giới hạn: allow-list + range + safety + deterministic fallback; mọi quyết định AI được ghi log (18_AI_DECISIONS). | HIGH | LEVEL 1 | EV-08, EV-10, EV-11 | S11 / B05 |
| CLM-006 | Dữ liệu nghiên cứu seed là DEMO (IN_MEMORY_MOCK, V9_SEED_IS_DEMO=true, DATA_LAYER_MODE=IN_MEMORY_DEMO) — không dùng như kết quả thật. | HIGH | LEVEL 0 | EV-05, EV-09, EV-13 | S20 / B03 |

## Kiểm tra orphan
- Claim không có evidence: không có → OK.
- Evidence không được claim tham chiếu: EV-12 → OK.
- Toàn bộ claim dùng confidence HIGH gắn với dữ liệu đo 2026-09-15 (E2E/health/security).

# AI Usage Log — EduChoice-AI

Phạm vi: quá trình nhóm dùng AI để xây dựng sản phẩm & bài trình bày KHKT.

## 1. Bối cảnh
- Model hỗ trợ: giao diện lập trình AI (OpenCode) + Gemini backend được kiểm soát (gemini-3.8-flash, GA 2026-09-02).
- Nguyên tắc: AI hỗ trợ viết mã & bản thảo; học sinh đọc hiểu, kiểm tra và giải thích mọi con số.

## 2. Ranh giới (AI KHÔNG làm)
- Không tự quyết định lời khuyên tới học sinh ngoài allow-list + range.
- Không bịa dữ liệu nghiên cứu; dữ liệu demo gắn nhãn DEMO.
- Không thay học sinh trả lời Hội đồng.

## 3. Log chi tiết
| Khâu | AI dùng | Đầu ra | Kiểm tra của học sinh |
| --- | --- | --- | --- |
| Viết mã kiến trúc | OpenCode | server, engines, runtime | npm run lint + E2E chạy thật |
| Thiết kế schema | Gợi ý schema | V9 39 sheets | Scan & đối chiếu v9SchemaRegistry |
| Số liệu trình bày | Chạy lệnh đo | E2E/quality/health/audit | Re-run + trace file:line |
| Bố cục deck | Sinh bản nháp | slide structures | Chỉnh nội dung + kiểm số liệu |
| Nội dung KHKT | Bản thảo văn bản | speaker notes, QA | Học sinh giữ toàn quyền chỉnh sửa |

## 4. Lệnh đo dữ liệu (tái lập được)
E2E & quality: `npx tsx -e "..."` trên server/v9DataEngine.ts (runE2ETests, getDataQualityMetrics).
Health V10: `...v10DataEngine.ts getHealthStatus...`.
Audit: EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md

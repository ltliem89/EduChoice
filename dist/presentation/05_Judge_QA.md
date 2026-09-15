# Judge Q&A Bank — EduChoice-AI

Tiêu chí chấm đề xuất: 15 slide; mọi câu trả lời phải truy về trong deck / registry / code.

## Nhóm khoa học
- Tại sao RQ quan trọng với THCS Việt Nam? → S3 (gap nhận thức–hành vi), S5 (gap tích hợp).
- H0/H1 trả lời bằng phép thống kê nào? → A/B/C + repeated measures; báo CI khi có đủ dữ liệu (S12).
- Outcome chính nào? → Transfer execution rate / Transfer Gap (F-002; F-005 cần dữ liệu thật).

## Nhóm kỹ thuật
- Vì sao Gemini mà không phải rule thuần? → S7: lời khuyên mềm tự nhiên trong khi safety deterministic bằng rule.
- Gemini đưa nội dung độc hại? → allow-list + schema + range + fallback (S7, server.ts sanitizeAdaptiveDecision).
- Làm sao biết AI không bịa? → 18_AI_DECISIONS trạng thái valid/fallback/not_generated (S7).

## Nhóm số liệu & trung thực
- 18/20 đến từ đâu? → runE2ETests() chạy live 2026-09-15 (v9DataEngine.ts); T06/T09 có đường dẫn cụ thể (S10).
- Điểm 1.1 / 5 tính sao? → EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md (S4).
- Có chắc không bịa số liệu cũ? → CRIT-004 loại khỏi deck; chỉ dữ liệu đo thật + demo gắn nhãn (S4, S9, S14).

## Nhóm an toàn & đạo đức
- Học sinh có bị "chẩn đoán" không? → Không: behavior signal / educational state (S13).
- Quyền riêng tư? → Data minimization, consent, pseudonym S001… (S12, S13).

## Câu hỏi mở rộng
- So sánh sản phẩm thương mại? → Không so sánh; "potential integration gap" (S5).
- Google Sheets lỗi? → Trả 501 SHEETS_NOT_CONFIGURED, không success giả (S9, S10).

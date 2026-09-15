# Judge Q&A Bank — EduChoice-AI

Tiêu chí chấm đề xuất: 24 slide chính + 9 backup; mọi câu trả lời phải truy về trong deck / registry / code.

## Nhóm khoa học
- Tại sao RQ quan trọng với THCS Việt Nam? → S4 (gap nhận thức–hành vi), S6 (gap tích hợp).
- H0/H1 được trả lời bằng phép thống kê nào? → Thiết kế A/B/C + repeated measures; chưa chạy; sẽ báo CI khi có đủ dữ liệu (S12, B02).
- Chọn tiêu chí nào là outcome chính? → Transfer execution rate / Transfer Gap (F-002, F-005 — cần dữ liệu thật).

## Nhóm kỹ thuật
- Tại sao dùng Gemini chứ không phải rule thuần? → S11: lời khuyên tự nhiên hơn trong khi safety deterministic bằng rule. Cả hai nằm cùng pipeline.
- Gemini đưa nội dung độc hại thì sao? → Sanitize + allow-list + range + fallback (S11, Backup B05, server.ts sanitizeAdaptiveDecision).
- Làm sao biết AI không bịa? → Mọi quyết định ghi 18_AI_DECISIONS với trạng thái valid/fallback/not_generated (S11, AI_CONTROL.logSheet).

## Nhóm số liệu & trung thực
- Con số 18/20 đến từ đâu? → runE2ETests() chạy live ngày 2026-09-15 trong v9DataEngine.ts; 2 fail T06/T09 có đường dẫn cụ thể (S16, B06).
- Điểm baseline 1.1 / 5 tính sao? → EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md (S5).
- Có chắc không bịa số liệu cũ? → Nghiên cứu cũ có dữ liệu bịa (CRIT-004) đã loại khỏi deck; chỉ còn dữ liệu demo gắn nhãn hoặc dữ liệu thật đo hôm nay (S20, B03).

## Nhóm an toàn & đạo đức
- Học sinh có bị "chẩn đoán" không? → Không: dùng "behavior signal / educational state", không nhãn lâm sàng (S21).
- Quyền riêng tư? → Data minimization, consent, pseudonym S001…, teacher oversight (S21, B02).

## Câu hỏi mở rộng
- So với sản phẩm thương mại? → Không so sánh; nói "potential integration gap" (S6).
- Nếu Google Sheets bị 500? → Fail rõ ràng (501), không báo success giả (S17, B03).

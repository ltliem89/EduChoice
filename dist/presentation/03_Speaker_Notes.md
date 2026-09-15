# Speaker Notes — EduChoice-AI

Meta: EduChoice-AI — Nền tảng hỗ trợ tự điều chỉnh hành vi học tập bằng AI thích ứng có kiểm soát · Hội đồng giám khảo KHKT · 2026 · v3.0.0

Thời lượng: 20 phút (~8 phút demo). Câu hỏi trả lời dự phòng trong 05_Judge_QA.md.

## S1 · Trang bìa
Chào Hội đồng. Đây là EduChoice-AI. Cam kết ngay từ đầu: mọi con số trong deck đều đo trực tiếp từ mã nguồn hôm nay; phần nào ở trạng thái demo, chúng tôi nói rõ là demo.

## S2 · Lộ trình
Bảy phần: vấn đề, bằng chứng, giải pháp, kiến trúc & AI, sản phẩm & dữ liệu, kiểm thử & công thức, an toàn & kết luận.

## S3 · Vấn đề & câu hỏi nghiên cứu
Đọc 4 vấn đề (không phải 4 lỗi của học sinh — là 4 khoảng trống của công cụ hiện tại). Đọc RQ, H1, H0. Nhấn mạnh dòng Lưu ý: chưa có thực nghiệm thật → không tuyên bố hiệu quả.

## S4 · Bằng chứng baseline
Audit 30 phát hiện, 1.1 / 5 → NO-GO. Nêu 4 Critical. Đây là lý do nhóm thiết kế lại hệ thống tin cậy.

## S5 · Giải pháp — vòng khép kín
Đi zigzag luồng 1→8. Dừng ở khối "Kiểm soát": Gemini chỉ đề xuất, hệ thống hợp lệ hoá; không hợp lệ thì fallback.

## S6 · Kiến trúc
Bốn tầng. Nhấn: data layer hiện in-memory demo và được báo đúng; con người (giáo viên) quyết định cuối cùng.

## S7 · AI có kiểm soát
"No direct Gemini execution". Pipeline 5 bước; ghi 18_AI_DECISIONS với trạng thái valid/fallback/not_generated; ràng buộc range duration/difficulty.

## S8 · Sản phẩm & giao diện
"Đây là minh họa giao diện theo component thật". Kể kịch bản game "48 phút cuối" + thẻ đề xuất thích ứng; 14 game, 13 toolkit, 45 API.

## S9 · Dữ liệu & trung thực
39 schema theo nhóm. Cột phải: báo đúng trạng thái — IN_MEMORY_MOCK, demoMode true, eventIngestionRate 0, sync 501. Không báo success giả.

## S10 · Kiểm thử & bảo mật
E2E 18/20; 2 fail T06/T09 nêu công khai với đường dẫn. Bảng bảo mật server-side: 403 khách/spoof, 501 sheets. Trust boundary phía server.

## S11 · Công thức
4 công thức VERIFIED (F-001..F-004). F-005 nêu hạn chế vì chưa có công thức tài liệu hóa.

## S12 · Thiết kế thử nghiệm
A/B/C, n≥20/nhóm, đo lặp, consent + pseudonym. Nhấn guard: pre/post một nhóm không đủ kết luận nhân quả. Chưa chạy — metric định trước.

## S13 · An toàn & đạo đức
8 nguyên tắc; hay bị hỏi: No diagnosis và Giáo viên kiểm soát. Trung thực là nguyên tắc số 0.

## S14 · Hạn chế & hướng phát triển
Đọc thẳng 3 hạn chế. Hướng: nối Sheets thật, đóng T06/T09, thực nghiệm A/B/C, báo CI.

## S15 · Kết luận & cảm ơn
Đọc đúng 3 dòng. Nêu nguồn: repo v3, audit V1.0, master spec V2. Cảm ơn Hội đồng.

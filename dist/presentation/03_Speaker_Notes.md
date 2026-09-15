# Speaker Notes — EduChoice-AI

Meta: EduChoice-AI — Nền tảng hỗ trợ tự điều chỉnh hành vi học tập bằng AI thích ứng có kiểm soát · Hội đồng giám khảo KHKT · 2026 · v3.0.0

Thời lượng trình bày đề xuất: 20 phút (~8 phút demo). Câu hỏi trả lời được dự phòng trong 05_Judge_QA.md.

## S1 · Trang bìa
Chào Hội đồng. Đây là EduChoice-AI — hệ thống AI thích ứng có kiểm soát cho học sinh THCS. Một lưu ý ngay từ đầu: mọi con số trong deck này đều đến từ chính mã nguồn và bộ kiểm thử của nhóm, chạy trực tiếp hôm nay; phần nào ở trạng thái demo, chúng tôi nói rõ là demo.

## S2 · Đội ngũ & vai trò
Giới thiệu thành viên. Nhấn mạnh: mọi thành viên có thể giải thích mọi con số. Đây là cam kết trung thực — nếu Hội đồng hỏi bất kỳ con số nào trên slide, chúng tôi chỉ về đúng nguồn.

## S3 · Lộ trình
Chốt mạch: vấn đề → khoảng trống → thiết kế → sản phẩm & AI → kiểm thử → công thức → an toàn → kết luận.

## S4 · Vấn đề
4 phát biểu vấn đề. Quan trọng nhất: "biết nên làm nhưng khó làm" — gap giữa nhận thức và hành vi; và rủi ro AI thiếu kiểm soát.

## S5 · Bằng chứng baseline
Chiếu biểu đồ 30 phát hiện audit (4 Critical). Điểm 1.1 / 5 → NO-GO. Đây là lý do nhóm thiết kế lại hệ thống tin cậy. Nêu rõ: chuẩn điểm trong EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md.

## S6 · Thực trạng & khoảng trống
Không nói "chưa ai làm". Nói: các mảng riêng lẻ đã có; khoảng trống của dự án là vòng khép kín hành vi→can thiệp→đo transfer và AI bị kiểm soát trong cùng hệ thống.

## S7 · Câu hỏi nghiên cứu
Đọc RQ. Nêu H1/H0. NHẤN MẠNH dòng "Lưu ý": đây là giả thuyết thiết kế; chưa có thực nghiệm học sinh thật, nên deck không tuyên bố hiệu quả.

## S8 · Đóng góp
Ba mảng: khoa học (chuỗi Behav→Situation→Intervention→Response→Transfer), kỹ thuật (allow-list + fallback), giáo dục (micro-game, retry, reflection, micro-action đo được).

## S9 · Hệ thống khái niệm (vòng khép kín)
Đi từng khối. Dừng ở Validation gate: "Gemini chỉ được đề xuất; hệ thống hợp lệ hoá; nếu không hợp lệ thì fallback." Đây là điểm khác biệt cốt lõi.

## S10 · Kiến trúc
Ba lớp + safety. Nhấn data layer: theo đặc tả 39 sheet canonical; hiện chạy IN_MEMORY_MOCK và chúng tôi báo rõ điều đó.

## S11 · AI có kiểm soát
Điểm then chốt: Gemini = reasoning trong allow-list. Tất cả quyết định AI ghi vào 18_AI_DECISIONS. Model dùng: gemini-3.8-flash (GA 2026-09-02).

## S12 · Thiết kế thử nghiệm
Trình bày A/B/C (3 nhóm, 20+ học sinh/nhóm, đo lặp). Nói thẳng: thiết kế đã định trước metric; chưa chạy thực nghiệm — vì vậy không có cột "kết quả".

## S13 · Sản phẩm · nội dung
14 game, 13 toolkit, 39 schema, 45 API. Kể một kịch bản game cụ thể (ví dụ "48 phút cuối trước giờ nộp bài").

## S14 · Vòng đời dữ liệu
Raw events → bối cảnh tối thiểu → Gemini. Telemetry đo thật trong GameRuntime (thời gian, pause, help, multitask…). Ở cuối: dataSource in-memory demo — báo thật.

## S15 · Demo
Chạy demo 8 bước (5–8 phút). Dùng tài khoản demo. Nếu lỗi: nói "chạy lại", không che giấu.

## S16 · Kết quả kiểm thử kỹ thuật
E2E 18/20 PASS. HAI test fail được khoanh vùng: T06 chưa có luồng ghi can thiệp; T09 AI decision log chưa tự động cho mọi phiên. Chúng tôi KHÔNG giấu — đó là trung thực. Quan trọng: kết quả kỹ thuật KHÔNG đồng nghĩa hiệu quả giáo dục.

## S17 · Bảo mật
5 trường hợp kiểm chứng server-side (403 với khách, spoof SUPER_ADMIN, IDOR…). Trust boundary phía server.

## S18 · Công thức
Liệt kê 4 công thức được xác minh (F-001..F-004). Một công thức (Transfer Index F-005) được đánh dấu chưa thể xác minh vì thiếu dữ liệu — không trưng ra slide chính.

## S19 · Phân tích & diễn giải
Ba lớp Data/Analysis/Interpretation. Diễn giải khít với dữ liệu; không vượt quá bằng chứng.

## S20 · Hạn chế
Đọc thẳng 3 cụm hạn chế. Mẫu nhỏ, chưa thực nghiệm, demo data. Đây là phần Hội đồng đánh giá cao nhất.

## S21 · An toàn
8 nguyên tắc. Hai cái hay bị hỏi: "no diagnosis" và "human oversight".

## S22 · Kết luận
Đọc đúng 3 dòng: vấn đề đã xử lý / điều đã chứng minh / điều chưa thể kết luận.

## S23 · Bước tiếp theo
Nối Sheets thật, đóng gap T06/T09, chạy thực nghiệm A/B/C với consent + pseudonym.

## S24 · Tài liệu tham khảo
Nêu 3 nguồn. Phân biệt: nguồn khoa học được dẫn; mọi máy móc chạy từ repo.

## Backup slides
B01–B09 chỉ dùng khi được hỏi — không tự bơi sang phần này.

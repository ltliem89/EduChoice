# BÁO CÁO KẾT QUẢ THỰC HIỆN DỰ ÁN
*(Dự án kỹ thuật — lĩnh vực phần mềm hệ thống. Không ghi thông tin đơn vị dự thi và thí sinh dự thi.)*

## I. VẤN ĐỀ NGHIÊN CỨU
**1.1 Bối cảnh**: các ứng dụng học tập phổ biến dùng quiz tĩnh, không bám năng lực cá nhân; thích ứng AI đặt ra đòi hỏi an toàn (AI không tự quyết định), minh bạch cho giáo viên giám sát, hiệu quả chứng minh được; dữ liệu không trung thực (báo số ảo) là rủi ro lớn khi đánh giá học sinh.
**1.2 Vấn đề & cấp thiết**: làm sao xây hệ thống thích ứng vừa hiệu quả, an toàn, trung thực, vừa đo được chuyển giao kỹ năng. Kiểm toán nền 1.1 / 5 (NO-GO), 4 lỗi CRIT: không xác thực, IDOR, báo trạng thái giả, dữ liệu nghiên cứu bịa đặt.
**1.3 Câu hỏi nghiên cứu**: (1) thích ứng có kiểm soát có cải thiện Completion Rate? (2) kỹ năng trong game có chuyển giao ra thật (Transfer Gap)? (3) AI an toàn, tuân ràng buộc, truy vết được không? Mục tiêu: hệ thống 39 schema/45 API/14 game/13 toolkit; thử nghiệm A/B/C; kiểm chứng F-001..004; xử lý 4 lỗi CRIT.
**1.4 Tiêu chí**: trung thực dữ liệu · AI an toàn có kiểm soát · đo lường được hiệu quả · khả thi kỹ thuật · an toàn quyền riêng tư.

## II. THIẾT KẾ VÀ PHƯƠNG PHÁP
**2.1 Lựa chọn giải pháp**: so sánh quiz tĩnh / chatbot AI tự do / game cố định / vòng khép kín thích ứng có kiểm soát → chọn phương án cuối vì thỏa đủ 5 tiêu chí.
**2.2 Kiến trúc**: 4 tầng (giao diện; cổng kết nối authen server-side; thông minh Rule Engine + Student Model + Gemini trong khuôn khổ; dữ liệu 39 schema canonical). Vòng khép kín 8 khâu: hành vi → tình huống → phân tích → khuyến nghị → kiểm soát → can thiệp → đo phản ứng → đo transfer. Pipeline AI: allow-list + range + fallback + log, không cho AI tự thực thi.
**2.3 Dữ liệu**: telemetry trong game, nhật ký AI (valid/fallback/not_generated), bài tập vi hành động cùng thang đo.
**2.4 Thí nghiệm A/B/C**: nhóm cố định/thích ứng/thích ứng + can thiệp; DV = Completion Rate, Transfer Gap, Decision Time Mean; cỡ mẫu ~30/nhóm; thiếu mẫu thật thì báo demo, không kết luận vội.

## III. THỰC HIỆN: CHẾ TẠO VÀ KIỂM TRA
**3.1 Chế tạo** 4 giai đoạn (khung sườn → vòng khép kín → kiểm soát AI → kiểm tra/hoàn thiện), ghi nhật ký công nghệ.
**3.2 Kiểm tra**: E2E 18/20 PASS (đo 2026-09-15), 2 lỗi công khai T06 (10_INTERVENTIONS) và T09 (18_AI_DECISIONS); bảo mật: GUEST (mặc định) → 403; Spoof SUPER_ADMIN → 403; SYSADMIN hợp lệ → ok=true; IDOR STU_001 đọc STU_002 → 403; Sheets chưa cấu hình → 501 SHEETS_NOT_CONFIGURED; Sheets chưa cấu hình → 501.
**3.3 Kiểm toán 30 mục (4 CRIT/8 HIGH/10 MED/8 LOW)**, nền 1.1 / 5 NO-GO: CRIT-001→allow-list server-side; CRIT-002→self-scoping 403; CRIT-003→báo trạng thái thật, sync 501; CRIT-004→gắn nhãn demo.
**3.4 Số liệu đo trực tiếp 2026-09-15**: Write 100%; duplicate 0%; orphan 0%; 40 bản ghi; dataSource IN_MEMORY_MOCK, demoMode true; V10 ok true, AppsScript offline; model gemini-3.8-flash (GA 2026-09-02). F-001..004 VERIFIED; F-005 EVIDENCE GAP.
**3.5 Trung thực dữ liệu**: số đo được mới đưa ra, demo gắn nhãn, không success giả, công khai thiếu sót.
**3.6 Hoàn thiện**: xử lý HIGH, bổ sung ghi can thiệp + nhật ký AI, mở rộng thí nghiệm.

## IV. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
Giải pháp AI đúng vai trò cố vấn trong khung kiểm soát, dữ liệu chuẩn hóa, đo lường chuyển giao khoa học, trung thực. Hướng tới: hoàn tất 2 lỗi E2E, nối Sheets thật, mở rộng mẫu, chuẩn hóa F-005.

## TÀI LIỆU THAM KHẢO
1. Kho mã nguồn EduChoice-AI v3.0.0.
2. EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md.
3. Master Spec hội thi khoa học kỹ thuật.
4. Tài liệu phương pháp nghiên cứu giáo dục.
5. Tài liệu Node.js/TypeScript, Google Apps Script, Gemini GA 2026-09-02.

## PHỤ LỤC A. Danh mục schema
| Nhóm | Số schema |
|---|---|
| Foundation | 5 |
| Student | 8 |
| Game | 3 |
| Intervention | 2 |
| Growth | 3 |
| AI | 2 |
| Research | 11 |
| System | 5 |

## PHỤ LỤC B. Công thức đo lường
| Mã | Tên | Công thức | Trạng thái |
|---|---|---|---|
| F-001 | Completion Rate | Completed / Eligible × 100% | VERIFIED |
| F-002 | Transfer Gap | Game Gain − Real Gain | VERIFIED |
| F-003 | Decision Time Mean | Σ(decision time) / N | VERIFIED |
| F-004 | Write Success Rate | successful writes / total writes × 100% | VERIFIED |

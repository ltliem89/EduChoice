---
id: tool-qti-gift
category: api
official_url: "https://www.1edtech.org/standards/qti"
source: "https://www.1edtech.org/standards/qti; https://docs.moodle.org/en/GIFT_format"
tags: [qti, gift, dinh-dang-cau-hoi, chuan-noi-dung, moodle, import-export]
---

# QTI & GIFT — Chuẩn trao đổi câu hỏi, đề kiểm tra

## Giới thiệu

Hai chuẩn cho phép EduChoice-AI **xuất/nhập câu hỏi, đề kiểm tra** sang hệ thống LMS và ngược lại:

**1. IMS/1EdTech Question & Test Interoperability (QTI)**
- Tiêu chuẩn quốc tế (đang duy trì bởi **1EdTech Consortium**) để trao đổi dữ liệu item/test giữa các công cụ soạn đề, kho ngân hàng câu hỏi, LMS và công cụ chấm điểm.
- **QTI 3.0** ban hành chính thức tháng **05/2022** (Final Release), kế thừa QTI 2.x và APIP; định dạng **XML** với package (Content Packaging).
- Hỗ trợ: presentation nhất quán, scoring logic, results reporting/usage data, hỗ trợ WCAG/ARIA, CAT (computer adaptive testing), Port Custom Interactions.
- Có chương trình **conformance certification** và online validator cho member.

**2. GIFT (Moodle)**
- Định dạng **văn bản thuần** của **Moodle** để nhập/xuất ngân hàng câu hỏi.
- Hỗ trợ dạng: trắc nghiệm nhiều lựa chọn, đúng/sai, câu hỏi ngắn, matching, missing word, câu hỏi số.
- Cú pháp ví dụ:
  - Tiêu đề: `::title::`
  - Trắc nghiệm: `Who is buried in Grant's tomb?{=Grant ~no one ~Napoleon}`
  - Đúng/sai: `{T}` / `{F}`
  - Câu số (khoảng): `{#1..5}` hoặc `{#1822:5}`
  - Comment: `// ...`
  - Bắt buộc **UTF-8**; không dùng Unicode UTF-16 hoặc ANSI với ký tự đặc biệt (tiếng Việt).

## Nội dung & đối tượng

- QTI: dành cho sản phẩm đánh giá cần **tương tác tối đa** với hệ sinh thái 1EdTech (Smarter Balanced, các nhà cung cấp đánh giá).
- GIFT: phù hợp khi xuất câu hỏi vào **Moodle** (kho đề nhà trường) hoặc trao đổi nhanh bằng văn bản.
- GIFT với media (plugin `giftmedia`) hỗ trợ đóng gói hình ảnh/âm thanh kèm đề.

## Bản quyền & điều kiện sử dụng

- QTI là chuẩn mở (spec miễn phí đọc); conformance thì dành cho thành viên 1EdTech.
- GIFT là định dạng tài liệu mở của Moodle (GPL) — dùng tự do khi import/export.

## Cơ hội tích hợp vào EduChoice-AI

- **Xuất khối lượng đề KHTN tự sinh** sang GIFT để giáo viên nhập thẳng vào Moodle trường — kênh kéo người dùng mạnh với chi phí gần như 0.
- **Hướng QTI 3** khi cần tương tác với các nền tảng đánh giá chuẩn quốc tế nhà trường dùng (sau MVP).
- **Kiến trúc**: viết module converter `bank→GIFT` (dạng text) và `bank→QTI XML` (tương lai) trong repository hiện có; đầu ra đổ file vào Drive và đẩy link vào ledger sheet 00_CONFIG/đề thi.

## Rủi ro & lưu ý pháp lý/đạo đức

- Định dạng chỉ là "vỏ bọc"; **bản quyền nội dung câu hỏi** vẫn thuộc người tạo — câu hỏi đưa sang Moodle của HS/giáo viên phải được phép chia sẻ (nhà trường đồng ý).
- Khi xuất đề do AI sinh, cần chú thích nguồn AI và kiểm tra câu hỏi không chứa dữ liệu cá nhân của học sinh (pseudonymous only).
- Phải tuân thủ Nghị định 147/2024/NĐ-CP khi trao đổi tài liệu có chứa thông tin trẻ em (không gắn tên thật HS vào file đề).

## Nguồn tham khảo

- QTI overview (1EdTech): https://www.1edtech.org/standards/qti
- QTI v3.0 spec: https://www.imsglobal.org/spec/qti/v3p0/oview
- GIFT format (MoodleDocs): https://docs.moodle.org/en/GIFT_format
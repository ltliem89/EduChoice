---
id: tool-google-classroom
category: platform
official_url: "https://classroom.google.com/"
source: "https://developers.google.com/workspace/classroom/reference/rest; https://support.google.com/edu/classroom"
tags: [google-classroom, giao-vien, lms, api, add-ons, to-chuc-lop]
---

# Google Classroom — Nền tảng quản lý lớp học

## Giới thiệu

**Google Classroom** là dịch vụ quản lý lớp học (LMS) của Google thuộc **Google Workspace for Education**, cho phép tạo lớp, giao bài tập, chấm điểm và trao đổi giữa giáo viên–học sinh.

- Có gói miễn phí **Google Workspace for Education Fundamentals** (dùng được với email trường hợp lệ) và các gói trả phí (Education Plus...).
- Cung cấp **API chính thức** (Google Classroom API) cho phép tích hợp: quản lý khóa học (courses), học sinh/giáo viên (students, teachers), bài tập (courseWork), rubric, và **add-ons** (công cụ bên thứ ba nhúng vào bài tập).
- Add-ons đã chuyển sang **General Availability (GA)** — mô hình phân phối tích hợp lý tưởng cho sản phẩm EdTech.

## Nội dung & đối tượng

- Đối tượng: trường học K-12 và đại học, giáo viên, học sinh, nhà phát triển EdTech.
- Nội dung:
  - Tạo lớp học ảo, đăng bài, thời hạn & chấm điểm.
  - Giao bài tập Hình ảnh/video/PDF; trả lời trực tiếp.
  - Kết nối Google Drive, Gmail, Lịch.
  - API resource: `courses`, `courseWork`, `students`, `teachers`, `invitations`, `topics`, `rubrics`, `addOns`.
- Cơ chế: miễn phí theo gói Fundamentals; API miễn phí trong giới hạn quota Google Workspace.

## Bản quyền & điều kiện sử dụng

- API bị ràng buộc bởi **Chính sách dữ liệu Google Workspace** và yêu cầu xác minh OAuth; không được bán lại dữ liệu người dùng Classroom.
- Ứng dụng add-on phải được Google phê duyệt theo **Google Workspace Marketplace** policies.
> ⚠️ CẦN XÁC MINH: điều kiện mới nhất của chương trình add-ons và quota API hiện hành.

## Cơ hội tích hợp vào EduChoice-AI

- **Kênh phân phối chính**: triển khai EduChoice-AI như **Classroom add-on** để giáo viên giao các phiếu ôn tập KHTN tự sinh ngay trong bài tập Classroom.
- **Hợp nhất dữ liệu**: dùng Classroom API lấy danh sách lớp/học sinh hợp lệ (chỉ khi trường/giám hộ đồng thuận) để seed dữ liệu chuẩn hóa vào Google Sheets ledger.
- **SSO**: tận dụng Google OAuth (đã có body thư viện) — phù hợp kiến trúc OAuth trong v9Client/Auth.gs.
- **Phù hợp kiến trúc Apps Script hiện tại**: mọi xử lý có thể chạy phía Apps Script (thay vì server riêng) để gọi Classroom API.

## Rủi ro & lưu ý pháp lý/đạo đức

- Phải xin **đồng thuận của trường và giám hộ** trước khi đồng bộ điểm số/hồ sơ học sinh THCS (dưới 16 tuổi) theo Nghị định 147/2024/NĐ-CP.
- Dữ liệu trường học thuộc quyền kiểm soát của cơ sở giáo dục; hợp đồng DPA khi cần.
- OAuth scope tối thiểu; kết hợp sheet 02_CONSENTS và 31_AUDIT_LOG để ghi lại mọi truy cập.

## Nguồn tham khảo

- Google Classroom API (REST reference): https://developers.google.com/workspace/classroom/reference/rest
- Trung tâm trợ giúp Google Classroom: https://support.google.com/edu/classroom
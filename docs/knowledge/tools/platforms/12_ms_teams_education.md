---
id: tool-ms-teams-education
category: platform
official_url: "https://www.microsoft.com/en/education/products/teams"
source: "https://www.microsoft.com/en/education/products/teams"
tags: [microsoft-teams, lms, giao-vien, lop-hoc, nha-truong, assignment]
---

# Microsoft Teams for Education — Nền tảng lớp học của Microsoft

## Giới thiệu

**Microsoft Teams for Education** là trung tâm giao tiếp và cộng tác của Microsoft dành cho trường học, cho phép tạo **lớp học Teams** với nhóm, kênh, bài giảng, cuộc họp video và module **Assignments** (giao bài tập, chấm điểm).

- Miễn phí cho tổ chức giáo dục sở hữu **email hợp lệ của trường** (đăng ký theo Microsoft 365/Office 365 Education).
- Phân biệt với Teams doanh nghiệp: bản Education bổ sung tính năng lớp học (Assignments, Insights, Class Notebook).
- Hỗ trợ dạy học từ xa qua cuộc họp/Meet và lưu trữ qua OneDrive/SharePoint.

## Nội dung & đối tượng

- Đối tượng: trường K-12 và đại học, giáo viên, học sinh, nhà quản trị CNTT trường học.
- Nội dung:
  - Teams lớp học với kênh môn học; giao bài Assignments, chấm điểm, theo dõi nộp bài.
  - Class Notebook (sổ tay lớp học tích hợp OneNote).
  - Insights: phân tích mức độ tham gia của học sinh.
  - Ứng dụng/lệnh ghép dạy học từ Marketplace.
- Cơ chế: miễn phí theo giấy phép Education; API công khai (Microsoft Graph) dành cho nhà phát triển.

## Bản quyền & điều kiện sử dụng

- Quyền sử dụng theo hợp đồng giấy phép Microsoft; dữ liệu thuộc trường học/đơn vị giáo dục.
- Microsoft Graph thực thi **Chính sách bảo vệ dữ liệu học sinh M365 Education** — không được dùng dữ liệu học sinh để quảng cáo.
> ⚠️ CẦN XÁC MINH: điều kiện cấp giấy phép Education miễn phí hiện hành cho trường ở Việt Nam.

## Cơ hội tích hợp vào EduChoice-AI

- **Kênh phân phối thay thế**: cung cấp EduChoice-AI qua **Microsoft Teams app / LTI tool** cho trường dùng hệ sinh thái Microsoft; tích hợp qua **Graph API** (classes, assignments, submissions).
- **Đồng bộ lớp học**: đọc Teams classes đã được trường đồng ý để seed vào ledger Google Sheets.
- **Lưu ý song song**: với trường dùng Google → tích hợp Classroom; với trường dùng Microsoft → tích hợp Teams; giữ giao diện đầu cuối thống nhất của EduChoice-AI (React) độc lập với backend lựa chọn.

## Rủi ro & lưu ý pháp lý/đạo đức

- Hồ sơ học sinh thuộc trường; mọi tích hợp cần thoả thuận + đăng ký ứng dụng Azure AD và scopes tối thiểu.
- Người dùng dưới 16 tuổi: tuân thủ Nghị định 147/2024/NĐ-CP; không cross-border gửi dữ liệu học sinh ngoài phạm vi đã đồng thuận.
- Tránh phụ thuộc nền tảng duy nhất — thiết kế lớp "LMS connector" (tương tự mô hình gateway `bridge | direct_apps_script` trong v10Client) để hỗ trợ nhiều nền tảng.

## Nguồn tham khảo

- Microsoft Teams for Education: https://www.microsoft.com/en/education/products/teams
---
id: tool-lms-moodle-canvas
category: api
official_url: "https://moodledev.io/"
source: "https://moodledev.io/docs/5.0/apis; https://canvas.instructure.com/doc/api/index.html"
tags: [lms, moodle, canvas, api, lti, rest, giao-vien]
---

# LMS: Moodle & Canvas — API tích hợp hệ thống quản lý học tập

## Giới thiệu

Hai LMS phổ biến quốc tế mà EduChoice-AI có thể kết nối để triển khai trong trường học:

**1. Moodle**
- LMS mã nguồn mở (GPL) được dùng rộng rãi tại ĐH/CĐ và trường phổ thông thế giới (kể cả nhiều trường VN).
- Cung cấp **Web services API**: REST (non-RESTful, trả XML/JSON), SOAP, XML-RPC — endpoint `https://site/webservice/rest/server.php?wstoken=...&wsfunction=...&moodlewsrestformat=json`.
- Hàng trăm hàm `core_*` (course, enrolment, grade, files, question, ...) và khả năng tự đăng ký function qua plugin.
- Hỗ trợ **LTI 1.1/1.3 + LTI Advantage** (tool consumer/provider) để nhúng công cụ bên ngoài vào khóa học.

**2. Canvas LMS (Instructure)**
- LMS thương mại phổ biến tại Mỹ (K-12 & ĐH).
- **REST API chính thức** (`/api/v1/...`) với **OAuth2** (Bearer token); có OpenAPI 3.0 spec tạo từ code.
- Resources chính: `courses`, `enrollments`, `users`, `assignments`, `submissions`, `quiz`, LTI integration.
- Đang chuyển tài liệu sang **Instructure Developer Documentation Portal** (canvas.instructure.com/doc/api chuyển hướng sau 01/07/2026).

## Nội dung & đối tượng

- Moodle: quản lý khóa học, tuyển sinh, điểm, ngân hàng câu hỏi (GIFT/Aiken/QTI import), Python/Node client có sẵn.
- Canvas: quản lý khóa học/tuyển sinh/điểm, LTI tools, SIS import.
- Cả hai hỗ trợ SSO phổ biến (SAML/OIDC) — phụ thuộc cấu hình từng trường.

## Bản quyền & điều kiện sử dụng

- Moodle core: GPLv3 — tự do sử dụng/tích hợp (không thu phí hạ tầng).
- Canvas: sản phẩm thương mại có giấy phép; API dùng theo điều khoản của trường sở hữu deployment.
- Mọi API cần quyền admin/teacher cấp token; **không được lạm dụng quyền đọc dữ liệu HS** trái hợp đồng.

## Cơ hội tích hợp vào EduChoice-AI

- **Kênh triển khai LTI** (cả Moodle & Canvas): đăng ký EduChoice-AI như **LTI 1.3 tool** → giáo viên thêm "hoạt động EduChoice" vào môn KHTN ngay trong LMS; điểm/tiến độ học trả về LMS qua grades services.
- **Đồng bộ danh sách lớp**: đọc `core_course_get_courses`/`GET /api/v1/courses` (có đồng thuận trường) để seed ledger Google Sheets — giữ một nguồn dữ liệu.
- **Xuất đề vào ngân hàng câu hỏi** của Moodle qua GIFT (xem apis/05_qti_gift.md).
- **Phù hợp mô hình connector hiện tại**: mở rộng `v10Client` gateway thành nhiều backend (apps-script bridge cho Sheets + LMS connector) mà không đổi UI React.

## Rủi ro & lưu ý pháp lý/đạo đức

- Quyền admin cấp token là tài sản nhạy cảm — lưu token dạng bí mật (không commit; dùng biến môi trường/environment mật), audit mọi gọi API.
- Dữ liệu học sinh dưới 16 tuổi: phải có hợp đồng xử lý dữ liệu với trường và tuân thủ Nghị định 147/2024/NĐ-CP, COPPA nếu phục vụ HS Mỹ.
- Không tự ý tạo/sửa điểm số HS trong LMS; chỉ ghi điểm khi giáo viên yêu cầu và ghi nhật ký audit (31_AUDIT_LOG).

## Nguồn tham khảo

- Moodle Web services API: https://moodledev.io/docs/5.0/apis
- Moodle Web service functions: https://moodledev.io/docs/5.0/apis/subsystems/external
- Canvas LMS API: https://canvas.instructure.com/doc/api/index.html
- Canvas developer portal: https://developerdocs.instructure.com/services/canvas
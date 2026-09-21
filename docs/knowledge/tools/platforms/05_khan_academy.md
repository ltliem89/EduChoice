---
id: tool-khan-academy
category: platform
official_url: "https://vi.khanacademy.org/"
source: "https://vi.khanacademy.org/; https://vpfoundation.org/en/quang-ich-group-vnf-and-khan-academy-are-joining-hands-to-promote-khan-academy-to-vietnamese-users"
tags: [khan-academy, phi-loi-nhuan, mien-phi, toan, tieng-viet, viet-nam-foundation]
---

# Khan Academy — Nền tảng học tập phi lợi nhuận

## Giới thiệu

**Khan Academy** là tổ chức giáo dục **phi lợi nhuận** (501(c)(3)) của Mỹ, cung cấp khóa học miễn phí cho mọi người trên toàn thế giới.

- Được tài trợ bởi Gates Foundation, Google và nhiều tổ chức; nội dung chia theo "lộ trình kỹ năng" (skill mastery) với video, bài tập tự luyện có hệ thống chấm điểm thích ứng.
- Có bản **tiếng Việt chính thức tại vi.khanacademy.org** do cộng đồng/cộng tác dịch, phổ biến nhất với môn **Toán** (Đại số, Hình học, các lớp toán 3–12).
- Tại Việt Nam, **The Vietnam Foundation (VNF)** được ghi nhận là đơn vị quảng bá chính thức (thông cáo năm 2023 cùng Quang Ich Group).
- Không có nội dung môn **KHTN lớp 6–9 theo CT GDPT 2018**; có phân mảng khoa học (Biology, Chemistry, Physics) bằng tiếng Anh.

## Nội dung & đối tượng

- Đối tượng: học sinh mọi lứa tuổi, giáo viên (lớp học Khan Academy = giao bài & báo cáo), phụ huynh.
- Nội dung chính:
  - Video giảng + bài tập tương tác + bài kiểm tra kỹ năng (mastery challenges).
  - Dashboard học sinh/giáo viên chi tiết.
  - **Khanmigo** (AI tutor) là tính năng trả phí, không nằm trong nền tảng miễn phí.
- Cơ chế: đăng ký miễn phí bằng email/Google; nội dung đăng tải cộng đồng theo giấy phép của Khan.

## Bản quyền & điều kiện sử dụng

- Nội dung Khan Academy phát hành dưới giấy phép **CC BY-NC-SA** (phi thương mại).
- **Không được nhúng video/bài tập Khan vào sản phẩm mang tính thương mại**; chỉ dùng trong sản phẩm phi lợi nhuận hoặc với thoả thuận riêng.
- API chính thức cấp cho đối tác; truy cập cào tự động trái điều khoản.
> ⚠️ CẦN XÁC MINH: điều kiện hợp tác API/white-label hiện tại của Khan Academy.

## Cơ hội tích hợp vào EduChoice-AI

- **Nguyên tắc "lộ trình kỹ năng + mastery"**: thiết kế lộ trình học KHTN theo chuẩn mạch nội dung (xem curriculum/01_khtn_2018.md) có thể vay mượn mô hình mastery set kỹ năng.
- **Tham chiếu UI dashboard** để thiết kế trang "tiến độ học sinh" trên giao diện React hiện tại (Recharts để vẽ biểu đồ).
- **Không nhúng nội dung** vì bản quyền CC BY-NC-SA mâu thuẫn với định hướng thương mại của EduChoice-AI; chỉ tham chiếu cấu trúc.

## Rủi ro & lưu ý pháp lý/đạo đức

- Giấy phép CC BY-NC-SA cấm khai thác thương mại — rủi ro pháp lý nếu tính phí người dùng.
- Dữ liệu học sinh Việt Nam phải đáp ứng Nghị định 147/2024/NĐ-CP; không chuyển dữ liệu học sinh sang tài khoản Khan.
- Cạnh tranh "free" từ Khan gây áp lực định giá; khác biệt bằng tiếng Việt + KHTN + AI sinh nội dung bám SGK.

## Nguồn tham khảo

- Khan Academy tiếng Việt: https://vi.khanacademy.org/
- Khan Academy toàn cầu: https://www.khanacademy.org/
- Thông cáo VNF + Khan Academy (15/05/2023): https://vnfoundation.org/en/quang-ich-group-vnf-and-khan-academy-are-joining-hands-to-promote-khan-academy-to-vietnamese-users
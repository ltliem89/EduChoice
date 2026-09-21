---
id: tool-phet
category: platform
official_url: "https://phet.colorado.edu/"
source: "https://phet.colorado.edu/en/licensing"
tags: [phet, mô-phỏng, thuc-hanh, vat-li, hoa-hoc, html5, cc-by-nc, giong-nghiem]
---

# PhET Interactive Simulations — Mô phỏng khoa học miễn phí

## Giới thiệu

**PhET Interactive Simulations** là dự án của **Đại học Colorado Boulder (UC Boulder, Hoa Kỳ)**, được sáng lập bởi GS **Carl Wieman** (Nobel Vật lý), cung cấp các **simulation (mô phỏng) tương tác** cho dạy-học Vật lý, Hóa học, Sinh học, Toán và Khoa học Trái Đất.

- Hơn **170+ simulation HTML5** chạy trên trình duyệt, không cần cài đặt, chạy được trên máy tính và thiết bị di động.
- Hỗ trợ nhúng qua **iframe** vào trang web/LMS.
- Hầu hết sim có bản dịch tham khảo (trong đó có tiếng Việt do cộng đồng dịch).
- Nổi bật với các sim KHTN: *Bunsen burner*, *Balancing Chemical Equations*, *Circuit Construction Kit*, *States of Matter*, *Energy Skate Park*, *Molecule Shapes*, *Diffusion*...

## Nội dung & đối tượng

- Đối tượng: học sinh từ tiểu học đến phổ thông, giáo viên, sinh viên.
- Nội dung:
  - Mô phỏng hỗ trợ thí nghiệm ảo khi trường không đủ thiết bị thực tế.
  - Hoạt động đi kèm (teacher-submitted activities), hướng dẫn dạy học.
  - Phù hợp các mạch nội dung Vật lý – Hóa học trong chương trình KHTN 2018 lớp 6–9.
- Cơ chế: truy cập miễn phí; không cần tài khoản khi người dùng chạy sim trực tiếp.

## Bản quyền & điều kiện sử dụng

- Theo trang giấy phép chính thức của PhET: các simulation HTML5 thông thường phát hành dưới **CC BY-NC 4.0** (phi thương mại).
  - Nhúng trong lớp học/môi trường giáo dục phi lợi nhuận: được phép.
  - **Khai thác thương mại** (trong sản phẩm thu phí) cần giấy phép rõ ràng từ UC Boulder.
- Logo tên "PhET" là thương hiệu có điều kiện sử dụng.
> ⚠️ CẦN XÁC MINH trước khi tích hợp: bản quyền hiện hành của từng sim (một số sim/phiên bản tài trợ có giấy phép khác) và quy trình xin phép thương mại từ UC Boulder.

## Cơ hội tích hợp vào EduChoice-AI

- **Kho nội dung thực hành KHTN**: liên kết (deep-link/iframe) một số sim HTML5 phù hợp chủ đề KHTN lớp 6–9 để bổ sung hoạt động thực hành bên cạnh lý thuyết do AI sinh.
- **Cách tiếp cận**: dùng chế độ **phi lợi nhuận/giáo dục** ban đầu; khi EduChoice-AI mở rộng mô hình trả phí phải đánh giá lại giấy phép hoặc thay sim bằng thí nghiệm mô phỏng tự xây bằng Three.js/Canvas.
- **Tích hợp kỹ thuật**: thêm sim vào giao diện qua iframe; ghi nhận sự kiện tương tác vào sheet telemetry (07_BEHAVIOR_EVENTS) để phân tích mức độ dùng thử thực hành.

## Rủi ro & lưu ý pháp lý/đạo đức

- **Bản quyền CC BY-NC**: rủi ro cao nhất nếu EduChoice-AI thu phí — cần thay bản sim tự làm cho đúng giấy phép.
- Không phụ thuộc hoàn toàn vào hạ tầng PhET (uptime, thay đổi API) — đóng khung nội dung/liên kết dự phòng.
- Cần thu thập đồng thuận theo 02_CONSENTS trước khi theo dõi hành vi học sinh trong sim nhúng.

## Nguồn tham khảo

- Trang chủ PhET: https://phet.colorado.edu/
- Giấy phép PhET: https://phet.colorado.edu/en/licensing
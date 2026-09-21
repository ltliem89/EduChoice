---
id: tool-analytics-ga4-looker
category: api
official_url: "https://developers.google.com/analytics"
source: "https://docs.cloud.google.com/looker/docs/studio/connect-to-google-sheets; https://docs.cloud.google.com/looker/docs/studio/connect-to-google-analytics"
tags: [analytics, ga4, looker-studio, dashboard, bao-cao, google-sheets]
---

# Google Analytics 4 & Looker Studio — Báo cáo và dashboard cho EduChoice-AI

## Giới thiệu

Hai công cụ phân tích miễn phí của Google bổ trợ cho hệ "Sổ cái" Google Sheets:

**1. Google Analytics 4 (GA4)**
- Nền tảng đo lường web/app của Google, theo dõi người dùng, phiên làm bài, sự kiện.
- Free ở gói tiêu chuẩn; trả phí theo nấc cho analytics 360.
- Có **Data API (GA4)** để kéo dữ liệu theo chương trình (quota riêng cho API).

**2. Looker Studio (trước là Google Data Studio)**
- Công cụ **báo cáo/dashboard miễn phí**, kéo dữ liệu từ nhiều nguồn: Google Sheets, GA4, BigQuery, Google Ads...
- Có **connector Google Sheets** chuyên dùng: kết nối thẳng một worksheet làm nguồn dữ liệu — rất hợp với ledger hiện tại của EduChoice-AI.
- Có **connector Google Analytics** kết nối thẳng GA4; quota của giao diện báo cáo theo GA4 Data API.
- Hạn chế: không tự động xuất full report sang Sheets (chỉ từng chart, thủ công); schedule report xuất PDF qua email (miễn phí).

## Nội dung & đối tượng

- GA4: đo sự kiện, conversion, retention; cho phép custom events (đếm lần sinh câu hỏi, số phiên làm bài...).
- Looker Studio: xây dashboard cho giáo viên/phụ huynh mà không cần viết code; chia sẻ link hoặc nhúng.
- Yêu cầu khi kết nối Sheets vào Looker Studio: **header 1 dòng, dữ liệu cột đồng nhất, dòng 2 không rỗng** — phải đảm bảo schema sheet đạt chuẩn này.

## Bản quyền & điều kiện sử dụng

- Cả hai đều miễn phí (bản standard); dữ liệu báo cáo thuộc chủ tài khoản Google.
- Quota: GA4 Data API giới hạn request/phút; Looker Studio chịu ràng buộc quota GA4 khi dùng connector Analytics.

## Cơ hội tích hợp vào EduChoice-AI

- **Dashboard không code cho phụ huynh/giáo viên**: kết nối trực tiếp sheet 07_BEHAVIOR_EVENTS / 08...(tiến độ) vào Looker Studio để tạo báo cáo tiến độ học KHTN.
- **Bổ sung GA4 cho web**: nếu muốn phân tích marketing/nhật ký truy cập ngoài phạm vi ledger; events custom có thể đồng bộ cả sang sheet telemetry.
- **Job báo cáo định kỳ**: dùng schedule báo cáo (PDF) email cho trường; lưu audit.
- **Kiến trúc**: giữ ledger Sheets là nguồn chuẩn → Looker Studio chỉ đọc; không để dashboard đồng thời ghi vào nguồn dữ liệu (bảo toàn toàn vẹn dữ liệu schema registry).

## Rủi ro & lưu ý pháp lý/đạo đức

- Dashboard chứa dữ liệu học sinh: chia sẻ theo đúng phạm vi (giáo viên lớp/tổ), tránh dùng owner credentials cho người xem bên ngoài; tuân thủ Nghị định 147/2024/NĐ-CP về xác thực người xem.
- Không hiển thị tên thật/ID nhận dạng học sinh trong dashboard công khai — dùng pseudonymous labels.
- Quota GA4 có thể làm báo cáo gián đoạn giờ cao điểm — dự phòng báo cáo tĩnh (csv) từ sheet.

## Nguồn tham khảo

- Kết nối Google Sheets với Looker Studio: https://docs.cloud.google.com/looker/docs/studio/connect-to-google-sheets
- Kết nối GA4 với Looker Studio: https://docs.cloud.google.com/looker/docs/studio/connect-to-google-analytics
- GA4 (Google Marketing Platform): https://developers.google.com/analytics
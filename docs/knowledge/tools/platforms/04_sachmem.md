---
id: tool-sachmem
category: platform
official_url: "https://sachmem.net/"
source: "https://sachmem.vn/; https://sachmem.net/"
tags: [sachmem, sgk, tieng-anh, global-success, giao-vien, hoc-lieu-dien-tu]
---

# Sách mềm (Sachmem) — Học liệu điện tử SGK

## Giới thiệu

**Sách mềm** (sachmem.vn cho học sinh, sachmem.net cho giáo viên) là nền tảng học liệu điện tử do **Công ty Cổ phần Đầu tư và Phát triển Giáo dục Hà Nội** phát triển, phục vụ việc dạy-học kèm theo các bộ **sách giáo khoa** chính thức.

- Nguyên bản phục vụ **Sách giáo khoa Tiếng Anh** theo chương trình mới (bộ *Global Success*, *i-Learn Smart Start*, *Family and Friends*, *Tiếng Anh 1-5*…), mở rộng sang một số môn học khác.
- Cung cấp bản PDF SGK, hệ thống **nghe/đọc theo bài** (audio script kèm SGK), bài tập tương tác và tài nguyên dành cho giáo viên (sachmem.net) như **giáo án mẫu, phân phối chương trình**.
- Có liên hệ nghiên cứu/hợp tác với các trường đại học (ghi nhận mối quan hệ gắn với **ĐH Quốc gia Hà Nội / Khoa Sư phạm** trong lịch sử phát triển).

## Nội dung & đối tượng

- Đối tượng: học sinh phổ thông, **giáo viên** (đăng ký tài khoản dùng học liệu nguồn mở cho dạy học), phụ huynh.
- Nội dung chính:
  - SGK điện tử kèm nội dung âm thanh bản quyền gốc.
  - Bài tập tương tác, phòng luyện nghe nói.
  - Hệ thống quản lý lớp học, giao bài cho giáo viên.
- **Lưu ý quan trọng**: thế mạnh là môn **Tiếng Anh** và SGK ngoại ngữ; **không tập trung môn KHTN** nên mức độ liên quan tới EduChoice-AI hạn chế, chỉ dùng làm tham chiếu mô hình "học liệu kèm SGK".

## Bản quyền & điều kiện sử dụng

- Nội dung SGK thuộc bản quyền nhà xuất bản; chỉ lưu hành qua hệ thống Sách mềm.
- Không có API công khai cho bên thứ ba sao chép nội dung bài nghe/bài tập.
> ⚠️ CẦN XÁC MINH: điều khoản sử dụng nguồn mở cho giáo viên và giới hạn xuất dữ liệu hiện hành.

## Cơ hội tích hợp vào EduChoice-AI

- **Tham chiếu mô hình "một tài khoản giáo viên có quyền kéo học liệu"**: đối chiếu với mô hình phân quyền hiện tại của EduChoice-AI (xem AUTH_MODEL.md và Authorization.gs trong apps-script).
- **Bài học về nội dung bám SGK từng bài/tiết** — pattern hữu ích khi mapping nội dung KHTN theo từng bài SGK của 3 bộ sách (xem curriculum/03_sgk_bo_sach.md).
- **Không phù hợp** để nhúng học liệu Tiếng Anh vào sản phẩm KHTN.

## Rủi ro & lưu ý pháp lý/đạo đức

- Bản quyền SGK và audio là đối tượng quản lý chặt của NXB; không tải/đăng tải lại.
- Người dùng dưới 16 tuổi phải tuân thủ quy định xác thực và đồng thuận giám hộ theo Nghị định 147/2024/NĐ-CP.
- Nếu EduChoice-AI cần audio bài KHTN tiếng Việt, dùng TTS theo giấy phép rõ ràng (xem apis/03_google_cloud_tts_stt.md) thay vì mượn audio từ Sách mềm.

## Nguồn tham khảo

- Sách mềm cho giáo viên: https://sachmem.net/
- Sách mềm cho học sinh: https://sachmem.vn/
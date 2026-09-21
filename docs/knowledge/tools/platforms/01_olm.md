---
id: tool-olm
category: platform
official_url: "https://olm.vn/"
source: "https://olm.vn/; https://olm.vn/about-us"
tags: [olm, viet-nam, hoc-lieu, bam-sgk, khtn, he-thong-quan-ly-lop]
---

# OLM.vn — Nền tảng học tập trực tuyến Việt Nam

## Giới thiệu

OLM (Online Learning Management) là nền tảng học tập trực tuyến của **Công ty Cổ phần Khoa học và Công nghệ Giáo dục** (Educa Corporation), một trong những nền tảng e-learning phổ biến nhất tại Việt Nam dành cho bậc Tiểu học, THCS và THPT.

- Người sáng lập: **PGS.TS Phạm Thọ Hoàn** (giảng viên, nhà nghiên cứu giáo dục), khởi đầu phát triển OLM từ khoảng **năm 2011**.
- Hệ sinh thái sản phẩm: **OLM** (học và luyện tập), **OLM Class** (quản lý lớp học, họp lớp trực tuyến), **OLM TKB** (thời khóa biểu), **OLM Marker** (chấm bài tự động), OLM Quiz (trắc nghiệm trực tuyến).
- Nội dung bám theo **Chương trình GDPT 2018** và **sách giáo khoa mới** (Kết nối tri thức, Cánh Diều, Chân trời sáng tạo), bao gồm cả môn **Khoa học tự nhiên (KHTN)** lớp 6–9.

## Nội dung & đối tượng

- Đối tượng: học sinh lớp 1–12, giáo viên và phụ huynh Việt Nam.
- Nội dung chính:
  - Video bài giảng theo từng bài học SGK, bài tập tự luyện, đề kiểm tra, đề thi thử.
  - Hệ thống giao bài, chấm điểm tự động và báo cáo kết quả cho giáo viên.
  - Kho đề trắc nghiệm lớn, phân theo môn, lớp, chủ đề.
- Cơ chế hoạt động: học sinh tự luyện tại nhà; giáo viên tạo lớp ảo (OLM Class), giao bài và theo dõi tiến độ. Một phần nội dung miễn phí, một phần trả phí theo gói.

## Bản quyền & điều kiện sử dụng

- Là nền tảng thương mại; việc mượn/đối chiếu lại nội dung bài giảng, đề thi của OLM cho EduChoice-AI sẽ **vi phạm bản quyền** nếu không có thoả thuận hợp tác.
- Không công bố chính thức về giấy phép API công khai cho bên thứ ba.
> ⚠️ CẦN XÁC MINH: chi tiết gói giá và điều khoản API hiện tại của OLM (website thay đổi thường xuyên).

## Cơ hội tích hợp vào EduChoice-AI

- **Tham chiếu môn KHTN theo bài SGK**: dùng cấu trúc bài/khái niệm để đối chiếu mapping độ khó chuẩn kiến thức KHTN trong nội dung tự sinh của EduChoice-AI.
- **Giao/thu bài qua cơ chế giáo viên**: kiến trúc Google Sheets + Apps Script proxy hiện tại phù hợp để triển khai mô hình "kho bài + bảng giao bài" tương tự, không cần hạ tầng LMS riêng.
- **Đối thủ tham khảo UX**: nghiên cứu luồng làm bài/chấm tự động của OLM để cải thiện FEATURE_DATA_CONTRACTS.md (phiên làm bài, kết quả, sai sót).
- **Không khuyến nghị** nhúng nội dung OLM vào sản phẩm khi chưa có hợp đồng.

## Rủi ro & lưu ý pháp lý/đạo đức

- Bản quyền nội dung: không phê chuẩn sao chép đề/bài giảng; chỉ dùng làm tài liệu tham khảo cấu trúc.
- Với đối tượng học sinh **dưới 16 tuổi**, mọi tài khoản/ứng dụng phải tuân thủ Nghị định 147/2024/NĐ-CP (xác thực tài khoản, đồng ý người giám hộ) và nguyên tắc thu thập tối thiểu theo Luật Bảo vệ trẻ em — không chia sẻ hồ sơ học sinh từ EduChoice-AI sang OLM mà chưa có đồng thuận.
- Cạnh tranh: OLM là sản phẩm cùng phân khúc KHTN THCS; cần positioning khác biệt rõ trong tài liệu chiến lược.

## Nguồn tham khảo

- Trang chủ OLM: https://olm.vn/
- Trang giới thiệu công ty: https://olm.vn/about-us
- Luật/NĐ liên quan: https://vnnic.vn/vi/van-ban-so-lieu/van-ban-qppl/nghi-dinh-so-1472024nd-cp-ngay-09112024-ve-quan-ly-cung-cap-su-dung
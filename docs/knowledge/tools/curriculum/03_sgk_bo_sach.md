---
id: tool-sgk-bo-sach
category: curriculum
official_url: "https://moet.gov.vn/"
source: "https://www.sachgiaokhoapdf.com/; https://moet.gov.vn/"
tags: [sgk, bo-sach, canh-dieu, ket-noi-tri-thuc, chan-troi-sang-tao, khtn]
---

# Các bộ sách giáo khoa (SGK) theo Chương trình GDPT 2018

## Giới thiệu

Từ năm học 2021–2022, cấp THCS dùng bộ SGK mới theo 3 bộ sách chính được phê duyệt song song, chia sẻ cùng khung chương trình GDPT 2018:

1. **Kết nối tri thức với cuộc sống** — NXB Giáo dục Việt Nam
2. **Chân trời sáng tạo** — NXB Giáo dục Việt Nam
3. **Cánh Diều** — NXB Đại học Sư phạm (phối hợp ĐHSP và NXB ĐH Sư phạm)

- Mỗi bộ có đội ngũ tác giả riêng; cùng một môn KHTN lớp 6–9 sẽ có **3 phiên bản SGK KHTN khác nhau về cách trình bày, ví dụ minh họa, thứ tự bài** dù cùng chuẩn nội dung (mạch nội dung đã thống nhất theo CT 2018).
- Trang tham khảo trực tuyến phổ biến: sachgiaokhoapdf.com (nơi nhiều người tải bản PDF/đọc online SGK các bộ).

## Nội dung & đối tượng

- Đối tượng: học sinh, giáo viên, phụ huynh; các nhà phát triển học liệu.
- Ý nghĩa với dự án: mức độ bám từng bộ sách của nội dung EduChoice-AI quyết định trải nghiệm "đúng bài học giáo viên đang dạy".

## Bản quyền & điều kiện sử dụng

- SGK là sản phẩm có bản quyền của các NXB; **không được tải lên/đăng lại PDF SGK** trên sản phẩm thương mại.
- Bản PDF/SGK online trên các trang mạng thường vi phạm bản quyền hoặc là bản miễn phí của NXB cho mục đích giáo dục — cần xác minh nguồn trước khi dẫn.

## Cơ hội tích hợp vào EduChoice-AI

- **Chọn bộ sách làm chuẩn mapping**: nên hỗ trợ người dùng (giáo viên) chọn bộ SGK đang dạy trong cấu hình lớp (00_CONFIG) → AI sinh câu hỏi/bài giảng theo đúng tiến độ bài của bộ đó.
- **Trích dẫn bài theo sách**: metadata schema các câu hỏi bổ sung trường `bo_sach` + `bai_sgk` để filter khi giao bài.
- **Cảnh báo cạnh tranh**: Sách mềm (sachmem) và OLM đã bám sâu theo SGK — lợi thế của EduChoice-AI là AI sinh **nội dung mới theo bài** thay vì lưu sẵn kho bài vi phạm bản quyền.

## Rủi ro & lưu ý pháp lý/đạo đức

- Không nhúng/sao chép nội dung SGK; xây câu hỏi **dựa trên chuẩn kiến thức** (kiến thức là công khai) không dựa vào bản văn sách.
- Đảm bảo không lưu PDF SGK trên Drive của dự án (rủi ro bản quyền khi kiểm tra ở trường).
- Với trẻ dưới 16 tuổi tránh thu thập thông tin cá nhân không cần thiết khi mapping bài học (chỉ dùng mã lớp/ID ẩn danh).

## Nguồn tham khảo

- Tham khảo danh mục bộ SGK (sachgiaokhoapdf.com): https://www.sachgiaokhoapdf.com/
- Phê duyệt SGK theo lớp của Bộ GD&ĐT: https://moet.gov.vn/
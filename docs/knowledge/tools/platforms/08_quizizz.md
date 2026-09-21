---
id: tool-quizizz
category: platform
official_url: "https://quizizz.com/"
source: "https://quizizz.com/home/en/plans"
tags: [quizizz, tro-choi-hoc-tap, bai-tap, ai, kiem-tra, ly-thuyet]
---

# Quizizz — Nền tảng học tập qua trò chơi

## Giới thiệu

**Quizizz** là nền tảng học tập qua "quizzing" (trắc nghiệm tương tác) từ Ấn Độ/Mỹ, được dùng rộng rãi trong lớp học phổ thông để ôn tập và kiểm tra nhanh.

- Cơ chế: giáo viên tạo hoặc chọn câu hỏi trắc nghiệm; học sinh tham gia bằng mã trò chơi (game code) trên thiết bị bất kỳ; có chế độ **Homework** (làm ở nhà, tự nhịp).
- Tích hợp **Quizizz AI** (sinh câu hỏi từ tài liệu, chỉnh mức độ) — công cụ target đối thủ của EduChoice-AI về mảng AI sinh đề.
- Hệ sinh thái thương hiệu gần đây tách phần doanh nghiệp thành **Wayground** (AI copilot cho đội ngũ); phần giáo dục vẫn là Quizizz.

## Nội dung & đối tượng

- Đối tượng: học sinh K-12 đến đại học, giáo viên, doanh nghiệp (mảng mới).
- Nội dung:
  - Thư viện hàng triệu câu hỏi cộng đồng chia theo môn/lớp/chủ đề (có cả KHTN).
  - Bài giảng (Lessons), báo cáo kết quả chi tiết cho giáo viên.
  - Paper Mode (chấm bài bằng máy scan) cho lớp không đủ thiết bị.
- Cơ chế: **gói Basic miễn phí** (giới hạn ~20 hoạt động, lưu trữ hạn chế), gói **School/Plus** trả phí.

## Bản quyền & điều kiện sử dụng

- Nội dung cộng đồng chia sẻ thuộc người tạo; Quizizz không cấp API công khai dùng lại thư viện cho sản phẩm cạnh tranh.
- Câu hỏi của người dùng khác không được tải về toàn bộ để re-package.
> ⚠️ CẦN XÁC MINH: mức giá gói School hiện hành và chính sách API/api token cho trường học.

## Cơ hội tích hợp vào EduChoice-AI

- **Chuẩn trải nghiệm "game code"**: design luồng làm bài theo mã lớp cho các buổi ôn tập KHTN trên lớp; EduChoice-AI có thể nhúng chế độ live quiz nhẹ bằng Socket/WebRTC (hoặc đơn giản hoá = cùng đề, so điểm cuối).
- **Đối thủ trong nhóm AI sinh câu hỏi**: benchmark chất lượng đề KHTN tự sinh của Quizizz AI với pipeline Gemini của EduChoice-AI (so khớp chuẩn mạch nội dung KHTN 2018).
- **Học hỏi báo cáo giáo viên**: sheet TELEMETRY + báo cáo ghi nhận theo câu hỏi độ khó để tái tạo báo cáo tương tự.

## Rủi ro & lưu ý pháp lý/đạo đức

- Không sao chép bộ câu hỏi có bản quyền từ Quizizz.
- Dữ liệu trẻ em: tuân thủ Nghị định 147/2024/NĐ-CP và COPPA; không yêu cầu thông tin nhận dạng khi học sinh tham gia.
- Phụ thuộc vào giấy phép nếu nhúng phần mềm của họ vào sản phẩm; tự xây trình chơi là hướng an toàn.

## Nguồn tham khảo

- Quizizz: https://quizizz.com/
- Bảng gói trả phí: https://quizizz.com/home/en/plans
---
id: psy-213
category: toolkit
target_age: "11-15"
source: "Dweck (2006) Mindset; Ohlsson (2011) Deep Learning; APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.1.0)"
tags: [thu-nghiem-lai, retry, gia-thuyet, mot-nha-khoa-hoc, thu-sai]
---

# Toolkit: Thử nghiệm lại với giả thuyết mới (Retry & Experiment)

## Vai trò trong hệ thống
Toolkit chuẩn (id `retry_experiment`, version 1.1.0) khuyến khích tâm thế nhà khoa học: mỗi lần thử lại không phải là thất bại mà là một **phép thử có biến số mới**. Được gợi ý khi học sinh thử lại nhưng lặp nguyên chiến lược cũ (retry không đổi) hoặc bỏ cuộc quá sớm.

## Thông tin căn bản
- **Độ tuổi**: 10-18.
- **Mục đích**: chuyển "thử lại vì ấm ức" thành "thử lại có giả thuyết mới".
- **Kịch bản điển hình**: chơi game đưa ra lựa chọn chưa tối ưu; giải bài toán hóc búa; luyện tập một kỹ năng mới.

## Cơ chế chính: Vòng lặp thử nghiệm giả thuyết
"Giả thuyết mới → Hành động thử → Quan sát kết quả mới"
- Trước khi retry, yêu cầu xác định 1 biến số thay đổi (khác với lần thất bại trước).
- Môi trường giả lập an toàn cho phép thử sai vô hạn — đúng thế mạnh của game thử thách.
- Phần thưởng là **thông tin mới**, không phải "thắng/đúng".

## Vi can thiệp
- "Hãy chọn lại một nhánh quyết định khác để xem kết cục thay đổi ra sao!"
- "Trước khi thử lại, em thay đổi điều gì so với lần trước? Đó là giả thuyết của em."

## Cụm từ an toàn
- "Trong môi trường giả lập này, em được phép thử sai không giới hạn để khám phá các kết quả."

## Cụm từ cần tránh
- "Lại sai rồi, thử mãi không xong." (ngắt tinh thần thí nghiệm)

## Chống chỉ định
Không khuyến khích lặp lại cùng một sai lầm mà không có sự thay đổi trong chiến lược — đó là "lì", không phải kiên trì có giả thuyết.

## Gắn với khung năng lực
- Construct: Persistence, Adaptability, ProblemSolving.
- Liên quan: Reflection, ConsequencePrediction.
- Sự kiện: retry, choice_changed, completed.

## Hướng dẫn triển khai
1. Phát hiện retry lặp chiến lược cũ > 2 lần → nhắc "đổi biến số".
2. Khi học sinh muốn bỏ: gợi ý thử 1 nhánh khác thay vì phải tiếp tục nhánh gây bế tắc.
3. Sau retry thành công: khen "đã tìm giả thuyết đúng" (tập trung tư duy, không chỉ kết quả).
4. Đối chiếu retry + choice_changed để phân biệt kiên trì có chiến lược.
5. Không tạo áp lực "bắt buộc thắng": thử lại phải là lựa chọn tự do.

## Căn cứ lý thuyết (nguồn thật)
- Dweck, C. S. (2006). *Mindset: The New Psychology of Success.* Random House.
- Ohlsson, S. (2011). *Deep Learning: How the Mind Overrides Experience.* Cambridge University Press (học từ sai lầm, chuyển hướng chiến lược).
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `retry_experiment`).
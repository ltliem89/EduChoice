---
id: psy-202
category: toolkit
target_age: "11-15"
source: "Ohno, Taiichi (Toyota Production System, 5 Whys); Ishikawa, Kaoru (fishbone diagram, 1982); APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.1.0)"
tags: [nhan-dien-van-de, 5-whys, xua-ca, fishbone, nguyen-nhan-goc-re]
---

# Toolkit: Nhận diện vấn đề cốt lõi (Problem Identification)

## Vai trò trong hệ thống
Toolkit chuẩn (id `problem_identification`, version 1.1.0) giúp học sinh **tách triệu chứng bề mặt khỏi gốc rễ** của xung đột hay khó khăn trong học tập và quan hệ bạn bè — trước khi hành động. Được gợi ý khi học sinh phản ứng với "bề nổi" của vấn đề lặp đi lặp lại.

## Thông tin căn bản
- **Độ tuổi**: 11-18.
- **Mục đích**: phân tích nguyên nhân gốc rễ của vấn đề, tránh xử lý sai triệu chứng.
- **Kịch bản điển hình**: xích mích nhóm làm việc; điểm số tụt dốc bất thường; mất động lực học tập.

## Cơ chế chính
### 5 Whys (5 Câu hỏi Tại sao)
Đặt câu hỏi "Tại sao?" lặp lại (tối đa 5 lần) cho mỗi câu trả lời để đi từ triệu chứng đến nguyên nhân; dừng khi đạt đến yếu tố có thể thay đổi được:
1. "Vì sao điểm mình tụt?" → "vì mình không làm bài".
2. "Vì sao không làm bài?" → "vì không biết bắt đầu từ đâu".
3. "Vì sao không biết bắt đầu?" → "vì bài quá dài chưa chia nhỏ".
→ hành động: chia nhỏ (chuyển problem_decomposition) thay vì "chăm học hơn".

### Sơ đồ Xương cá (Ishikawa)
Nhóm nguyên nhân theo 6 khía cạnh (phương pháp, môi trường, nhân sự, vật chất, đo lường, thông tin) để không bỏ sót lớp nguyên nhân.

## Vi can thiệp
- "Liệt kê 3 điều đang thực sự xảy ra thay vì suy diễn cảm xúc."
- Khi đứa trẻ bắt đầu đổ lỗi/tự trách: quay về câu hỏi "chuyện gì đã thực sự diễn ra?".

## Cụm từ an toàn
- "Hãy cùng nhìn vào sự thật khách quan đang diễn ra."

## Cụm từ cần tránh
- "Tại em nghĩ nhiều quá thôi." (phủ định cảm xúc → đóng đường phân tích)

## Chống chỉ định
Không ép học sinh phân tích khi đang chịu tổn thương tâm lý chưa được sơ cứu: ưu tiên an toàn và ổn định cảm xúc trước (self_regulation), phân tích sau.

## Gắn với khung năng lực
- Construct: ProblemSolving (giải quyết vấn đề), Reflection (phản tư).
- Liên quan: Adaptability, ConsequencePrediction.
- Sự kiện: choice_made, hint_requested, reflection_submitted.

## Hướng dẫn triển khai
1. Áp dụng khi lặp lại cùng vấn đề (điểm thấp nhiều kỳ, xích mích tái diễn).
2. Bắt đầu bằng câu hỏi hiện thực: "điều gì đang thực sự xảy ra?".
3. Dẫn dắt 3-5 vòng "tại sao", dừng ở nguyên nhân có thể hành động.
4. Tổng kết 1 câu "gốc rễ" + 1 hành động micro-step đầu tiên.
5. Tránh 2 sai lầm: dừng ở "tại tính nết nó" và tự buộc tội quá sớm.

## Căn cứ lý thuyết (nguồn thật)
- Ohno, T. — *Toyota Production System* (phương pháp 5 Whys).
- Ishikawa, K. (1982). *Guide to Quality Control.* Asian Productivity Organization.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `problem_identification`).
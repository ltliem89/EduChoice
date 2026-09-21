---
id: psy-206
category: toolkit
target_age: "11-15"
source: "Steinberg (2008) Developmental Review (discounting); McClure et al. (2004) Science; APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.0.0)"
tags: [du-doan-he-qua, and-then-what, cau-hau-qua, quyet-dinh, tam-xa]
---

# Toolkit: Dự đoán hệ quả đa bước (Consequence Prediction)

## Vai trò trong hệ thống
Toolkit chuẩn (id `consequence_prediction`, version 1.0.0) kích hoạt tư duy não trước (prefrontal cortex) để nhìn thấy tác động của lựa chọn ở **cấp độ 1, 2 và 3**. Được gợi ý khi học sinh chuẩn bị ra quyết định nóng, rủi ro hoặc thỏa mãn tức thì.

## Thông tin căn bản
- **Độ tuổi**: 11-18.
- **Mục đích**: kéo dài tầm nhìn thời gian; giảm hành động bốc đồng.
- **Kịch bản điển hình**: gian lận trong bài kiểm tra; tham gia thử thách mạo hiểm theo bạn bè; bỏ buổi học ôn.

## Cơ chế chính: "Sau đó thì sao?" (And Then What?)
Mô hình cây hệ quả 3 cấp độ:
- **Cấp 1**: hệ quả trực tiếp trong 1-2 giờ (cảm giác, tình huống).
- **Cấp 2**: hệ quả ngày mai/tuần này (sức khỏe, bài vở, quan hệ).
- **Cấp 3**: hệ quả dài hạn (mục tiêu, uy tín, ảnh hưởng người khác, hình ảnh bản thân).
Ví dụ (bỏ buổi học ôn): cấp 1 = tự do buổi chiều; cấp 2 = không nắm bài → điểm kém; cấp 3 = điểm chuẩn lớp 10 bị ảnh hưởng, tự trách.

## Vi can thiệp
- "Nếu em chọn phương án này, 2 tiếng nữa và ngày mai em sẽ cảm thấy thế nào?"
- "Sau đó thì sao? Và sau đó nữa?" (dẫn dắt cấp 2, cấp 3)

## Cụm từ an toàn
- "Lựa chọn hôm nay định hình cảm giác nhẹ nhõm của em ngày mai."

## Cụm từ cần tránh
- "Em làm thế là tự hủy hoại tương lai đấy." (dọa dẫm -> lo âu bệnh lý, phản tác dụng)

## Chống chỉ định
Không sử dụng dọa dẫm (catastrophizing) gây lo âu bệnh lý. Mô phỏng hệ quả khách quan, kết thúc bằng hướng phục hồi, không kết thúc bằng nỗi sợ.

## Gắn với khung năng lực
- Construct: ConsequencePrediction, SelfRegulation.
- Liên quan: Adaptability, Planning, GoalSetting.
- Sự kiện: choice_made, choice_changed, micro_action_offered.

## Hướng dẫn triển khai
1. Kích hoạt khi phát hiện lựa chọn "thưởng ngay trước mắt, hại lâu dài".
2. Dẫn dắt đủ 3 cấp độ, không chỉ cấp 1.
3. Yêu cầu trả lời bằng lời của học sinh (không chỉ chọn đáp án có sẵn) để buộc tư duy tổ chức.
4. Kết thúc luôn bằng 1 phương án thay thế tốt hơn (không chỉ "đừng làm").
5. Ghi nhận tự điều chỉnh nếu học sinh đổi quyết định sau phân tích.

## Căn cứ lý thuyết (nguồn thật)
- Steinberg, L. (2008). *A social neuroscience perspective on adolescent risk-taking.* Developmental Review, 28(1), 78-106.
- McClure, S. M., et al. (2004). *Separate neural systems value immediate and delayed monetary rewards.* Science, 306, 503-507.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `consequence_prediction`).
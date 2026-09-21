---
id: psy-sit-13
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §20,§45; WHO 2025"
tags: [tư-vấn-nhanh, sợ-giáo-viên, quan-hệ-thầy-trò, lớp-học]
---

# Quick Consultation Card — Sợ giáo viên / lớp học không an toàn tâm lý

> Tâm lý lớp học (§45): class climate, teacher-student relationship, fairness, belonging, psychological safety. Cần phân biệt sợ cụ thể (giáo viên) với lo âu xã hội chung.

## situation
```yaml
situation:
  id: "student-psych-013"
  domain: "school"
  topic: "fear-of-teacher"
  ageRange: "11-18"
  context: ["school"]
```

## observable_signs
```yaml
observable_signs:
  - né trung hỏi, né phát biểu/trả lời khi có mặt giáo viên
  - căng thẳng rõ, lo sợ khi giáo viên gọi tên
  - tránh môn học của giáo viên đó, ngại học
  - mô tả sợ bị trách/chê/hạ nhục trước lớp
  - cảm giác không được công bằng/thiên vị
```

## possible_explanations
```yaml
possible_explanations:
  - trải nghiệm trách mắng/công khai hạ mệt từng xảy ra
  - thiếu an toàn tâm lý của cả lớp; bị so sánh
  - nhút nhát, xấu hổ khi phát biểu (tính cách + kỹ năng)
  - lo âu xã hội lan rộng (card 09)
  - đã từng bị trêu khi trả lời sai bởi bạn
  - phong cách quản lý lớp strict khiến học sinh sợ
```

## questions
```yaml
questions:
  - "Môn/giờ nào em thấy khó chịu nhất? Điều gì xảy ra ở đó?"
  - "Khi giáo viên hỏi bài, em nghĩ điều gì có thể xảy ra?"
  - "Em có bị trách mắng trước lớp bao giờ chưa? Vì chuyện gì?"
  - "Có môn nào em cảm thấy an toàn hơn không? Vì sao?"
```

## first_response
```yaml
first_response:
  - tạo lựa chọn an toàn khi phát biểu: ghi giấy, thảo luận nhóm nhỏ, trả lời bằng viết
  - tăng giao tiếp 1-1 với giáo viên (hỏi mức độ tiếp thu), giảm áp lực đánh giá
  - xem lại class climate: có hiện tượng chê trách trước lớp, so sánh, hạ nhục không
  - khuyến khích học sinh từng bước tham gia (bắt đầu từ ngữ cảnh ít rủi ro)
  - giáo viên dùng ngôn ngữ động viên quá trình (advice/05)
```

## avoid
```yaml
avoid:
  - gán "nó sợ cô/thầy X" trước lớp / lấn ảnh hưởng mối quan hệ
  - ép phát biểu trước lớp khi chưa sẵn sàng
  - suy diễn "con hư/không tôn trọng thầy cô"
  - công khai phân tích học sinh trước nhau
```

## protective_factors
```yaml
protective_factors:
  - ít nhất 1 môn/buổi học cảm thấy an toàn
  - 1 người lớn tin cậy ở trường
  - bạn thân cùng lớp
  - giáo viên phản hồi tích cực quá trình
  - kỹ năng giao tiếp & phản hồi nhẹ nhàng (constructs/10)
```

## monitoring
```yaml
monitoring:
  - mức tham gia phát biểu theo tuần; mức lo khi gặp giờ học khó
  - đánh giá lại sau 2 tuần điều chỉnh class climate
  - nếu kéo dài kèm trốn tiết/tự hại → nâng tầng 4
```

## referral
```yaml
referral:
  - sợ lan rộng, trốn tiết cụ thể lặp lại
  - kèm lo âu xã hội nặng, khí sắc thấp
  - nghi bị giáo viên vi phạm ranh giới/bạo hành → SAFEGUARDING (§36)
```

## emergency
```yaml
emergency: "Bị bạo hành thể chất/nghi ngờ xâm hại bởi giáo viên → SAFEGUARDING ngay (§36)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Môi trường nhà trường có tính bảo vệ khi an toàn và hỗ trợ."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §20, §45, §36.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `constructs/10` (communication), `wellness/06` (bạn bè), `advice/05` (khen/feedback).
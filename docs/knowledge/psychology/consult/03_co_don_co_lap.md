---
id: psy-sit-03
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §20,§28(quan hệ); WHO adolescent mental health (2025); CDC school connectedness (2024)"
tags: [tư-vấn-nhanh, cô-đơn, cô-lập, thuộc-về]
---

# Quick Consultation Card — Cô đơn / cảm giác bị cô lập

> Không đánh giá sức khỏe tâm lý chỉ dựa vào số lượng bạn bè (§20). "Thích ở một mình" ≠ cô lập bệnh lý.

## situation
```yaml
situation:
  id: "student-psych-003"
  domain: "emotion"
  topic: "loneliness"
  ageRange: "11-18"
  context: ["school", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - ít tương tác, cảm thấy không có ai để chia sẻ
  - than "không có bạn", "mình lạc lõng"
  - ăn trưa / giờ ra chơi một mình thường xuyên
  - bị loại khỏi nhóm, ít được mời tham gia
  - miễn cưỡng đến trường, từ chối hoạt động nhóm
  - kiểm tra: có bạn / có bạn thân / có nhóm / thuộc về nhóm / có thể chia sẻ / bị loại trừ
```

## possible_explanations
```yaml
possible_explanations:
  - xã hội hóa & nhu cầu đồng trang lứa thay đổi ở tuổi THCS (§7)
  - cảm giác thuộc về thấp (school connectedness)
  - mới chuyển trường / lớp, khó hòa nhập
  - nhút nhát, xấu hổ, tự ti
  - bị cô lập có chủ đích (loại trừ nhóm — xem card 08)
  - ưu tiên thời gian một mình lành mạnh (không phải vấn đề)
  - sức khỏe tâm lý / khí sắc thấp (dùng card 02 nếu kèm dấu hiệu buồn kéo dài)
```

## questions
```yaml
questions:
  - "Ở trường em thường chơi/ngồi cùng ai?"
  - "Em có cảm thấy mình thuộc về lớp không?"
  - "Có ai ở trường em tin tưởng để nói chuyện?"
  - "Em có bạn để chia sẻ khi khó khăn không?"
  - "Em cảm thấy an toàn ở trường không?" [CDC connectedness]
```

## first_response
```yaml
first_response:
  - bình thường hóa "nhiều bạn giai đoạn này đôi khi thấy một mình"
  - hỗ trợ kết nối: ghép nhóm nhỏ, giao nhiệm vụ hợp tác
  - tạo cơ hội thuộc về: hoạt động lớp, câu lạc bộ
  - tìm người lớn tin cậy để học sinh dựa dẫm khi cần
  - theo dõi thay đổi mức hòa nhập theo tuần
```

## avoid
```yaml
avoid:
  - phán xét "do em không chịu hòa đồng"
  - ép kết bạn gượng gạo ngay
  - gán "em thích ở một mình nên tự tách biệt" mà không tìm hiểu
  - so sánh bạn bè, công khai chê
```

## protective_factors
```yaml
protective_factors:
  - 1 người lớn tin cậy (GVCN, gia đình)
  - ấp cảm giác thuộc về lớp/trường
  - 1-2 bạn thân dù nhóm nhỏ
  - sở thích cá nhân, hoạt động CLB
  - thói quen thể chất
```

## monitoring
```yaml
monitoring:
  - mốc: 2 tuần theo dõi mức tham gia lớp, tự báo cảm giác thuộc về
  - nếu kèm buồn kéo dài, trốn học, tự hại → nâng tầng, chuyển tuyến
  - bắt nạt/cô lập có chủ đích → quy trình chống BULLYING (card 08 + SAFETY)
```

## referral
```yaml
referral:
  - cảm giác cô đơn kéo dài + ảnh hưởng chức năng học tập/quan hệ
  - kèm khí sắc thấp, lo âu, tự hại
  - kèm dấu hiệu bị bắt nạt/cô lập nghiêm trọng
```

## emergency
```yaml
emergency: "Có dấu hiệu tự hại/tự sát → SAFETY MODE (§35)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: CDC
    title: School Connectedness
    year: 2024
    claim: "Học sinh được quan tâm và kết nối với trường ít gặp vấn đề sức khỏe tâm thần hơn."
    population: "adolescent"
    region: "US"
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Quan hệ bạn bè và yếu tố xã hội ảnh hưởng sức khỏe tâm thần vị thành niên."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §7, §11, §20, §37.
- CDC (2024). *School connectedness / adolescent mental health.* — cdc.gov.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/05` (xã hội hóa), `wellness/06` (bạn bè & bắt nạt).
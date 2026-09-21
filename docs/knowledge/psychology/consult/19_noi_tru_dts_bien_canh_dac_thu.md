---
id: psy-sit-19
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §43,§44,§53; WHO 2025"
tags: [tư-vấn-nhanh, nội-trú, dân-tộc-thiểu-số, homesickness, bối-cảnh-đặc-thù]
---

# Quick Consultation Card — Học sinh nội trú / DTTS / bối cảnh đặc thù

> Không mặc định "khác văn hóa = vấn đề tâm lý" (§43). Xét ngôn ngữ, khoảng cách gia đình, nội trú, thay đổi môi trường, thuộc về, khác biệt văn hóa, hỗ trợ bạn bè, tiếp cận dịch vụ.

## situation
```yaml
situation:
  id: "student-psych-019"
  domain: "development"
  topic: "boarding-ethnic-minority"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - nhớ nhà (homesickness), nỗi buồn cuối tuần giảm khi được về
  - khó thích nghi phòng ở, cảm giác nhà mất quyền riêng tư
  - xung đột với bạn cùng phòng
  - căng thẳng ban đêm (night-time distress), khó ngủ
  - xa lánh, ít kết bạn do khác biệt ngôn ngữ/văn hóa
  - thu hẹp nói chuyện (khả năng tiếng phổ thông yếu) bị hiểu nhầm là "im lặng"
  - giảm ăn uống do khẩu phần khác
```

## possible_explanations
```yaml
possible_explanations:
  - nhớ nhà + thay đổi môi trường (bình thường giai đoạn đầu)
  - rào cản ngôn ngữ, giao tiếp
  - xung đột nội trú (lịch sinh hoạt, không gian, thói quen gia đình)
  - cảm giác không thuộc về (school connectedness thấp)
  - lo lắng về gia đình ở xa (family separation)
  - thiếu tiếp cận hình thức hỗ trợ quen thuộc
  - kỳ vọng phải "nói giọng khác" gây áp lực bản sắc
```

## questions
```yaml
questions:
  - "Kể từ khi vào nội trú/trường mới, điều gì khó nhất?"
  - "Em nhớ nhà lúc nào nhất?"
  - "Ở phòng, chuyện nào hay căng thẳng nhất?"
  - "Em có cảm thấy mình thuộc về lớp/trường không?"
  - "Em có cách nào giữ liên lạc với gia đình không?"
```

## first_response
```yaml
first_response:
  - bình thường hóa nhớ nhà; giữ nhịp liên lạc gia đình định kỳ
  - hỗ trợ kết nối: ghép hoạt động nhóm, người bạn "đồng hành" đầu kỳ
  - tôn trọng ngôn ngữ/văn hóa; không biến khác biệt thành vấn đề
  - xử lý xung đột phòng theo restorative (§47), không ép
  - tạo lịch sinh hoạt ổn định, người lớn gần gũi ban đêm
  - theo dõi ăn uống, ngủ, mức tham gia
```

## avoid
```yaml
avoid:
  - "em quê mùa, chậm" / "chắc do dân tộc xyz"
  - bắt ép hòa hợp văn hóa ngay
  - bỏ qua dấu hiệu căng thẳng ban đêm
  - giảm nhẹ nỗi nhớ nhà làm đồng nghĩa "yếu đuối"
```

## protective_factors
```yaml
protective_factors:
  - giáo viên nội trú gần gũi, coi sóc
  - bạn cùng phòng/trường tốt bụng
  - liên lạc gia đình đều đặn
  - sinh hoạt ngoại khóa
  - cảm giác thuộc về lớp/trường
```

## monitoring
```yaml
monitoring:
  - tuần đầu: theo dõi mức thích nghi, ngủ, ăn, tâm trạng
  - mốc: 2 tuần, 1 tháng; nếu homesickness kéo dài + khí sắc thấp → TẦNG 4
  - bắt nạt do khác biệt văn hóa → card 08
```

## referral
```yaml
referral:
  - khí sắc thấp kéo dài, khó thích nghi > 1 tháng
  - kèm tự hại, trốn trường
  - cần hỗ trợ ngôn ngữ/kỹ năng xã hội chuyên sâu
```

## emergency
```yaml
emergency: "Tự hại/tuyệt vọng liên quan cô lập nội trú → SAFETY MODE. Nghi bạo lực/xâm hại trong ký túc → SAFEGUARDING."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Môi trường gia đình, nhà trường, cộng đồng có tính bảo vệ; chuyển môi trường cần hỗ trợ."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §43, §44, §53.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/05,10`, `wellness/07` (giao tiếp gia đình), `wellness/08`.
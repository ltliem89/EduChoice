---
id: psy-sit-15
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §20,§25,§28(cô lập),§43; CDC connectedness (2024); development/05"
tags: [tư-vấn-nhanh, cô-lập-xã-hội, loại-trừ, thuộc-về]
---

# Quick Consultation Card — Cô lập xã hội / bị loại trừ nhóm bạn

> Không chỉ dựa vào số lượng bạn (§20). Phân biệt "cảm giác không thuộc về" với bị "loại trừ có chủ đích" (gần với bắt nạt nếu lặp lại — card 08).

## situation
```yaml
situation:
  id: "student-psych-015"
  domain: "social"
  topic: "social-exclusion"
  ageRange: "11-18"
  context: ["peer", "school"]
```

## observable_signs
```yaml
observable_signs:
  - không được mời vào trò chơi/nhóm, bị lờ đi
  - ăn trưa một mình thường xuyên
  - bị loại khỏi nhóm chat, không được nói trong nhóm
  - người khác nói thầm (whisper) khi nhìn mình
  - buồn/lo khi nghĩ về bạn bè (kèm card 02,03)
  - tự nghi ngờ giá trị bản thân
```

## possible_explanations
```yaml
possible_explanations:
  - xung đột/từ chối ngắn hạn của nhóm (có thể tự hết)
  - bị loại trừ có chủ đích lặp lại → bắt nạt kiểu social (§12)
  - chênh lệch văn hóa/ngôn ngữ (học sinh DTTS, mới chuyển — §43)
  - nhút nhát, ít kỹ năng khởi tạo quan hệ
  - chênh lệch sở thích (game/nhạc/môn học)
  - tự ái: mặc cảm là "người ngoài" trong khi thực tế chưa rõ
```

## questions
```yaml
questions:
  - "Chuyện bị tách nhóm diễn ra từ khi nào, thường xuyên không?"
  - "Có bạn nào trong lớp vẫn nói chuyện với em bình thường không?"
  - "Em nghĩ vì sao nhóm đó lại như vậy?"
  - "Em có muốn tham gia hoạt động nào của lớp không?"
  - "Em có ai ở nhà hoặc ở trường để chia sẻ không?"
```

## first_response
```yaml
first_response:
  - an ủi cảm giác bị loại — validation, không biến thành "em nhạy cảm"
  - hỗ trợ tiếp cận nhóm xã hội khác (CLB, nhóm nhỏ)
  - giao nhiệm vụ hợp tác để tạo kết nối (constructs/16)
  - nếu lặp lại/ có chủ đích → bảo vệ theo quy trình bắt nạt (card 08)
  - theo dõi mức tham gia và tự nhận diện "có nhóm riêng chưa"
```

## avoid
```yaml
avoid:
  - "em tự kỷ, làm sao không hòa đồng" / "em cần bạn hơn"
  - ép học sinh đó vào nhóm đang loại trừ
  - bỏ qua nếu lặp lại (lẫn giữa bắt nạt xã hội)
  - gán nhãn "cô đơn bệnh lý" khi chỉ muốn yên tĩnh (card 03)
```

## protective_factors
```yaml
protective_factors:
  - ít nhất 1 bạn thân
  - 1 người lớn tin cậy
  - sự tham gia hoạt động ngoài lớp (CLB, thể thao)
  - cảm giác thuộc về 1 nhóm bất kỳ (school connectedness)
  - gia đình giao tiếp mở
```

## monitoring
```yaml
monitoring:
  - theo dõi mức tham gia hoạt động, tự báo cảm giác thuộc về (0-10)
  - mốc 2 tuần; nếu loại trừ lặp lại → chuyển quy trình BULLYING (§12)
  - kèm buồn/lo âu/trốn học → TẦNG 4
```

## referral
```yaml
referral:
  - loại trừ lặp lại kéo dài, ảnh hưởng chức năng
  - kèm khí sắc thấp, tự hại
  - học sinh cần hỗ trợ kỹ năng xã hội sâu hơn
```

## emergency
```yaml
emergency: "Kèm dấu hiệu tự hại/tuyệt vọng → SAFETY MODE (§35)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: CDC
    title: School Connectedness
    year: 2024
    claim: "Kết nối trường học và bạn bè là yếu tố bảo vệ."
    population: "adolescent"
    region: "US"
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Quan hệ bạn bè, bạo lực và bắt nạt ảnh hưởng sức khỏe tâm thần."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §12, §20, §28-ish, §43.
- CDC (2024). *School connectedness.* — cdc.gov.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/05` (xã hội hóa), `wellness/06` (bạn bè & bắt nạt), `constructs/16,17`.
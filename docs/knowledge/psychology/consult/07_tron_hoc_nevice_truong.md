---
id: psy-sit-07
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §15 (school avoidance), §17; WHO 2025; development/11"
tags: [tư-vấn-nhanh, trốn-học, school-avoidance, lo-âu]
---

# Quick Consultation Card — Trốn học / né tránh trường học

> Phân biệt trốn học (cố ý lảng tránh) với né tránh trường do lo âu / bị bắt nạt / khó khăn. Trốn học lặp lại là dấu hiệu cần tìm hiểu, không chỉ kỷ luật.

## situation
```yaml
situation:
  id: "student-psych-007"
  domain: "school"
  topic: "school-avoidance"
  ageRange: "11-18"
  context: ["school", "home", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - nghỉ học không phép, lặp lại
  - đi học muộn cố ý, lảng tránh giờ học nhất định
  - xin về nhà giữa giờ
  - kêu đau bụng/đau đầu vào sáng sớm các ngày học
  - lo âu rõ khi chuẩn bị đến trường
```

## possible_explanations
```yaml
possible_explanations:
  - lo âu đến trường/school avoidance (sợ đánh giá, sợ giáo viên — card 13)
  - bị bắt nạt, bị đe dọa, cô lập (card 08)
  - khó khăn học tập, mất động lực (card 05,06)
  - vấn đề gia đình (ly thân, bệnh người thân, kỳ vọng cao — card 15-17)
  - môi trường lớp không an toàn (stress/lớp khó thích nghi)
  - mệt mỏi, thiếu ngủ lặp lại (card 18)
  - hậu quả một sự kiện (bị kỷ luật, bị chê trước lớp)
```

## questions
```yaml
questions:
  - "Sáng đến giờ đi học, em thấy thế nào?"
  - "Ngày nào em thấy khó đến nhất? Vì sao?"
  - "Ở trường có điều gì làm em thấy lo/sợ không?"
  - "Có ai làm em thấy không an toàn ở trường không?"
  - "Điều gì em mong muốn là khá hơn ở trường?"
```

## first_response
```yaml
first_response:
  - không phạt trước; tìm nguyên nhân bằng hỏi (§26 behavior pattern)
  - nếu nghi bắt nạt: đảm bảo an toàn, không ép đối chất (§12)
  - nếu nghi lo âu school avoidance: giảm tải dần, hỗ trợ hòa nhập từng bước
  - phối hợp gia đình sớm (đưa/đón, theo dõi giờ đến lớp)
  - theo dõi tần suất + hoàn cảnh nghỉ học
```

## avoid
```yaml
avoid:
  - gán "lười, hư, chống đối"
  - đe dọa đuổi học / dán nhãn trước lớp
  - bỏ qua dấu hiệu lo âu/bắt nạt vì "chỉ nông nổi"
  - ép về lớp ngay khi đang hoảng sợ cấp tính
```

## protective_factors
```yaml
protective_factors:
  - 1 người lớn tin cậy ở trường
  - cảm giác thuộc về lớp (school connectedness)
  - bạn thân hỗ trợ
  - gia đình phối hợp, không trừng phạt
  - kế hoạch tái hòa nhập từng bước
```

## monitoring
```yaml
monitoring:
  - log: ngày nghỉ, hoàn cảnh, dấu hiệu thể chất, báo với ai
  - mốc đánh giá sau 1-2 tuần; nếu kéo dài >2 tuần → tầng 4
  - trốn học để tụ tập chơi game → xử lý môi trường + kết nối lớp
```

## referral
```yaml
referral:
  - nghỉ học phổ biến >3 ngày/tháng kéo dài
  - lo âu nghiêm trọng khi đi học, hoảng sợ
  - kèm tự hại/tuyệt vọng
  - nghi bị bạo lực/xâm hại → SAFEGUARDING (SAFETY_PROTOCOL §S3)
```

## emergency
```yaml
emergency: "Nói không muốn sống / tự làm đau → SAFETY MODE (§35). Nghi bạo lực/xâm hại → SAFEGUARDING §36."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Lo âu có thể ảnh hưởng việc đến trường và kết quả học tập."
    population: "10-19"
    region: "global"
  - source: CDC
    title: School Connectedness
    year: 2024
    claim: "Kết nối trường học là yếu tố bảo vệ."
    population: "adolescent"
    region: "US"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §12, §15, §17, §26.
- WHO (2025). *Mental health of adolescents.* — who.int.
- CDC (2024). *School connectedness.* — cdc.gov.
- Kế thừa `wellness/02` (căng thẳng học tập), `wellness/03` (lo âu), `development/11`.
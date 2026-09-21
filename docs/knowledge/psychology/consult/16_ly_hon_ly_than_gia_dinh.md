---
id: psy-sit-16
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §34 (hội gia đình), §5 E; WHO 2025; UNICEF 2021"
tags: [tư-vấn-nhanh, ly-hôn, ly-thân, gia-đình, chuyển-biến-gia-đình]
---

# Quick Consultation Card — Gia đình ly thân / ly hôn / biến chuyển gia đình

> Không phán xét bố mẹ. Hỗ trợ học sinh thể hiện cảm xúc với thay đổi lớn trong gia đình (§34, §5E). Cẩn thận hơn: không đổ lỗi, không ép học sinh chọn phe.

## situation
```yaml
situation:
  id: "student-psych-016"
  domain: "family"
  topic: "parental-separation-divorce"
  ageRange: "11-18"
  context: ["home", "school"]
```

## observable_signs
```yaml
observable_signs:
  - thay đổi tâm trạng kể từ khi gia đình biến chuyển: buồn, giận, lo lắng
  - lo sợ bị bỏ lại, mất gia đình
  - suy giảm học tập, kém tập trung
  - né nhắc chuyện gia đình, ngại bạn bè hỏi
  - nhu cầu "ổn định" tăng: muốn ở yên nhà, không muốn thay đổi
  - có thể kèm khí sắc thấp, lo âu (card 02,09)
```

## possible_explanations
```yaml
possible_explanations:
  - phản ứng bình thường với mất mát/thay đổi (giai đoạn điều chỉnh)
  - lo về tương lai, tài chính, nơi ở (kèm card 17 nếu căng thẳng)
  - cảm giác phải chọn phe, trung thành với bố hoặc mẹ
  - mất đi một hình mẫu/hiện diện hàng ngày
  - xen kẽ xung đột cha mẹ tiếp diễn (căng thẳng môi trường sống)
  - nếu kéo dài + ảnh hưởng chức năng → cần hỗ trợ thêm
```

## questions
```yaml
questions:
  - "Từ khi gia đình có thay đổi, em cảm thấy thế nào nhất?"
  - "Điều gì làm em lo nhất hiện tại?"
  - "Em có nói chuyện việc này với ai được không?"
  - "Em thấy áp lực phải đứng về phía ai không?"
  - "Cuối tuần/ngày thường ở nhà giờ ra sao?"
```

## first_response
```yaml
first_response:
  - lắng nghe và cho phép cảm xúc (buồn/giận là bình thường)
  - trấn an về điều ổn định: việc học, sinh hoạt, quan hệ với cô/thầy không đổi
  - không khuyến khích đứng về phe cha hay mẹ
  - hỗ trợ giữ thói quen ổn định (ngủ, học, bạn bè)
  - nói chuyện với người lớn có trách nhiệm nếu cần phối hợp gia đình
  - theo dõi khí sắc, học tập, ảnh hưởng qua các tuần
```

## avoid
```yaml
avoid:
  - phán xét bố mẹ / "bố mẹ em sai"
  - ép học sinh chọn phe, tiết lộ thông tin gia đình cho lớp
  - gán "con ly hôn sẽ hư"
  - coi mọi khó khăn đều do ly hôn — giữ nhiều khả năng (§2)
  - hứa giữ bí mật về nguy cơ an toàn (§35)
```

## protective_factors
```yaml
protective_factors:
  - ít nhất 1 người lớn ổn định, đáng tin (kể cả thầy cô)
  - duy trì quan hệ đủ với cả bố và mẹ (an toàn)
  - bạn thân, hoạt động ngoại khóa
  - thói quen sinh hoạt ổn định ở trường
  - khả năng gọi tên cảm xúc
```

## monitoring
```yaml
monitoring:
  - theo dõi khí sắc, học tập, giấc ngủ, mức lo hàng tuần
  - mốc 2 tuần; nếu khí sắc thấp kéo dài, học giảm rõ, trốn học → TẦNG 4
  - luôn để ý dấu hiệu tự hại khi học sinh mất người thân/tổn thương
```

## referral
```yaml
referral:
  - khí sắc thấp kéo dài + ảnh hưởng chức năng
  - học sinh cần hỗ trợ tâm lý do biến chuyển gia đình → tham vấn học sinh / chuyên môn
  - kèm tự hại → khẩn cấp
```

## emergency
```yaml
emergency: "Nói muốn chết/không muốn sống, tự làm đau → SAFETY MODE (§35). Nghi bạo lực gia đình → SAFEGUARDING (§36)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Môi trường gia đình và quan hệ hỗ trợ có tính bảo vệ."
    population: "10-19"
    region: "global"
  - source: UNICEF
    title: State of the World's Children 2021
    year: 2021
    claim: "Gia đình ảnh hưởng sức khỏe tâm thần vị thành niên."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §5E, §34, §44.
- WHO (2025). *Mental health of adolescents.* — who.int.
- UNICEF (2021). *The State of the World's Children 2021.*
- Kế thừa `wellness/07` (giao tiếp gia đình), `wellness/08` (leo thang).
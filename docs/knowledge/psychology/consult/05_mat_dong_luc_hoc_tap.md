---
id: psy-sit-05
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §17; SDT2009; development/08; advice/03"
tags: [tư-vấn-nhanh, mất-động-lực, học-tập, động-lực]
---

# Quick Consultation Card — Mất động lực học tập

> Không nói "em lười". Phân tích đủ yếu tố trước khi kết luận (§17).

## situation
```yaml
situation:
  id: "student-psych-005"
  domain: "emotion"
  topic: "motivation-loss"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - bỏ bê bài vở, không hoàn thành nhiệm vụ
  - than "chán", "học để làm gì"
  - giảm nỗ lực rõ rệt so với trước
  - chỉ làm tối thiểu, làm cho xong
  - tránh nhắc về việc học, miễn cưỡng đến lớp
```

## possible_explanations
```yaml
possible_explanations:
  - thiếu mục tiêu rõ ràng hoặc không thấy ý nghĩa
  - nhiệm vụ quá khó / quá dễ / không phù hợp năng lực
  - thiếu thành công gần đây (cảm giác "học cũng fails")
  - phản hồi tiêu cực lặp lại (điểm thấp, chê bai)
  - mệt mỏi, thiếu ngủ
  - áp lực gia đình / kỳ vọng thành tích (§29, development/11)
  - lo âu, khí sắc thấp (dùng card 02)
  - quan hệ bạn bè, bị cô lập
  - nghiện màn hình/game (môi trường số)
```

## questions
```yaml
questions:
  - "Điều gì thấy khó nhất trong việc học bây giờ?"
  - "Môn/nhiệm vụ nào làm em thấy mệt nhất, vì sao?"
  - "Gần đây em có được khen/nhận phản hồi tốt không?"
  - "Em thấy mình làm được điều gì tốt?"
  - "Ngoài học, em còn thấy hứng thú với điều gì?"
  - "Em ngủ thế nào, có mệt không?"
```

## first_response
```yaml
first_response:
  - tách biệt "vấn đề năng lực" vs "vấn đề động lực"; hỏi trước khi quy
  - chia nhỏ nhiệm vụ (toolkits/03), tạo success nhỏ nhanh
  - phản hồi động viên quá trình (advice/01,05), không chỉ điểm
  - đặt mục tiêu nhỏ thực tế (toolkits/11)
  - xử lý gốc rễ theo yếu tố tìm được (ngủ → advice/07, áp lực → hỗ trợ)
```

## avoid
```yaml
avoid:
  - "em lười" / "em hư"
  - so sánh công khai với bạn giỏi
  - đe dọa điểm số, trừng phạt
  - kết luận "do dùng điện thoại" mà không xét đủ bối cảnh
```

## protective_factors
```yaml
protective_factors:
  - 1-2 môn/hoạt động em thấy hứng thú
  - cảm giác thành công nhỏ gần đây
  - giáo viên động viên quá trình
  - gia đình hỗ trợ, không chỉ chú ý điểm
  - giấc ngủ phù hợp, bạn bè hỗ trợ
```

## monitoring
```yaml
monitoring:
  - ghi nhận thay đổi mức độ hoàn thành bài theo tuần
  - mốc đánh giá lại sau 2 tuần can thiệp
  - nếu mất động lực kéo dài kèm buồn/lo âu/trốn học → nâng tầng 4
```

## referral
```yaml
referral:
  - mất động lực kéo dài + ảnh hưởng rõ hầu hết các môn
  - kèm khí sắc thấp, lo âu, tự hại
  - trốn học lặp lại → phối hợp gia đình + nhà trường
```

## emergency
```yaml
emergency: "Kèm dấu hiệu tự hại/tự sát → SAFETY MODE (§35)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Kỹ năng giải quyết vấn đề, đối phó và môi trường hỗ trợ ảnh hưởng sức khỏe tâm thần."
    population: "10-19"
    region: "global"
  - source: SDT
    title: Self-Determination Theory
    year: 2009
    claim: "Động lực gắn với tự chủ, năng lực, gắn kết."
    population: "adolescent"
    region: "theory"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §17, §27-28.
- WHO (2025). *Mental health of adolescents.* — who.int.
- SDT (Deci & Ryan) — nguồn trong `development/08` và `advice/00`.
- Kế thừa `development/08` (động lực học tập), `advice/01,03,09`, `toolkits/03,11`.
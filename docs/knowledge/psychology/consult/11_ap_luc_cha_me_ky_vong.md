---
id: psy-sit-11
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §29,§33; development/11; advice/04"
tags: [tư-vấn-nhanh, cha-mẹ, kỳ-vọng, áp-lực, gia-đình]
---

# Quick Consultation Card — Áp lực từ cha mẹ / kỳ vọng thành tích

> AI KHÔNG phán xét phụ huynh (§29). Tránh nói "cha mẹ em gây áp lực"; dùng "có vẻ kỳ vọng thành tích đang tạo áp lực cho em. Mình có thể tìm cách trao đổi để kỳ vọng được diễn đạt rõ và khả thi hơn."

## situation
```yaml
situation:
  id: "student-psych-011"
  domain: "family"
  topic: "parental-expectations"
  ageRange: "11-18"
  context: ["home", "school"]
```

## observable_signs
```yaml
observable_signs:
  - lo sợ điểm thấp vì sợ bố mẹ thất vọng
  - căng thẳng khi nhắc chuyện học, tránh nói chuyện điểm
  - học quá sức hoặc bỏ cuộc vì "không bao giờ đủ"
  - tự trách "mình vô dụng"
  - cảm giác mọi giá trị gắn điểm số
  - biểu hiện lo âu/khí sắc thấp khi có kỳ vọng cao (card 09,02)
```

## possible_explanations
```yaml
possible_explanations:
  - kỳ vọng cao + cách diễn đạt khắc nghiệt (harsh criticism)
  - so sánh anh chị em/bạn bè
  - học thêm dày đặc, ít thời gian nghỉ (ngữ cảnh VN — development/11)
  - mong muốn "chuẩn bị tương lai" của cha mẹ được diễn đạt chưa khả thi
  - thiếu giao tiếp gia đình (card 17, wellness/07)
  - không phải lúc nào cũng là "lỗi" áp lực từ gia đình — có thể có yếu tố khác
```

## questions
```yaml
questions:
  - "Trong gia đình, chuyện học tập được nói đến như thế nào?"
  - "Bố mẹ em thường phản ứng ra sao với kết quả?"
  - "Em nghĩ bố mẹ mong em điều gì nhất?"
  - "Em có thể nói với ai trong nhà về áp lực này?"
  - "Có lúc nào em thấy được khen/được công nhận không?"
```

## first_response
```yaml
first_response:
  - thấu cảm với học sinh, không hạ thấp cha mẹ
  - giúp học sinh diễn đạt áp lực bằng ngôn ngữ xây dựng (vd "con muốn trao đổi với bố mẹ về...")
  - phối hợp với GVCN trao đổi phụ huynh về mục tiêu thực tế (kỳ vọng rõ + khả thi)
  - công nhận nỗ lực quá trình, tách giá trị bản thân khỏi điểm số
  - khuyến khích chia sẻ với người lớn tin cậy
```

## avoid
```yaml
avoid:
  - "bố mẹ em gây áp lực" (§29 cấm)
  - đổ lỗi phụ huynh trước mặt học sinh
  - gán nhãn "con của bố mẹ khó tính"
  - hứa hẹn điểm cao để nguôi chuyện
```

## protective_factors
```yaml
protective_factors:
  - ít nhất 1 người lớn lắng nghe (thầy cô, người thân)
  - 1-2 bạn thân
  - sở thích/hoạt động ngoài học tập
  - cha mẹ có khoảnh khắc khích lệ quá trình (nếu có)
  - cảm giác thuộc về lớp/trường
```

## monitoring
```yaml
monitoring:
  - theo dõi tinh thần sau các kỳ kiểm tra, mức lo âu
  - mốc đánh giá qua phản hồi của học sinh 2-4 tuần
  - nếu kèm tự hại/trốn học → tầng 4-5
```

## referral
```yaml
referral:
  - kỳ vọng cao + học sinh tự trách nặng nề kéo dài
  - kèm khí sắc thấp, lo âu, tự hại
  - gia đình cần hỗ trợ truyền thông → cán bộ tâm lý học đường/PGH
```

## emergency
```yaml
emergency: "Nếu học sinh nói muốn chết/không muốn sống do áp lực → SAFETY MODE (§35). Nghi bạo lực gia đình → SAFEGUARDING (§36)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Môi trường gia đình có tính bảo vệ; quan hệ gia đình ảnh hưởng sức khỏe tâm thần."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §29, §33, §44(gia đình), §53 (VN).
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/11` (ngữ cảnh VN: học thêm, thi cử, kỳ vọng), `wellness/07` (giao tiếp gia đình).
---
id: psy-sit-06
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §24; ABC model §8"
tags: [tư-vấn-nhanh, không-làm-bài, bài-vở, kỷ-luật]
---

# Quick Consultation Card — Học sinh không làm bài

> Trước khi kỷ luật, kiểm tra 10 nguyên nhân khả dĩ (§24).

## situation
```yaml
situation:
  id: "student-psych-006"
  domain: "school"
  topic: "not-doing-homework"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - không nộp bài lặp lại
  - làm dở, làm qua loa
  - quên bài thường xuyên
  - xin hoãn, né tránh nhắc bài
  - chỉ không làm một vài môn (gợi ý vướng cụ thể)
```

## possible_explanations
```yaml
possible_explanations:
  - không hiểu bài (ngôn ngữ, kiến thức nền yếu)
  - không biết bắt đầu từ đâu (kỹ năng lập kế hoạch)
  - bài quá khó hoặc quá dễ
  - quá tải bài tập nhiều môn
  - quên / tổ chức kém
  - thiếu tài liệu, sách vở
  - không có thời gian/không gian học ở nhà
  - mất động lực (card 05)
  - tránh vì sợ sai, sợ bị chê (cầu toàn — card 10)
  - có vấn đề gia đình (card 15,17)
```

## questions
```yaml
questions:
  - "Phần nào em không hiểu nhất?"
  - "Em biết bắt đầu bài này như thế nào không?"
  - "Ở nhà em có chỗ nào ngồi học không?"
  - "Em thường làm bài lúc mấy giờ, có ai hỗ trợ không?"
  - "Làm xong em lo bị chê đúng không?"
```

## first_response
```yaml
first_response:
  - phân loại nguyên nhân bằng hỏi, KHÔNG phạt trước
  - chia nhỏ bài (toolkits/03), giảm tải cho học sinh quá tải
  - hỗ trợ lập kế hoạch (toolkits/04), chỗ ngồi học
  - theo dõi pattern riêng lẻ, không gộp thành "lười"
  - với sợ sai: khuyến khích "nộp bản nháp là đã tốt" (advice/05)
```

## avoid
```yaml
avoid:
  - chê trước lớp, so sánh
  - phạt gấp nhiều khi chưa rõ nguyên nhân ($24)
  - gọi "lười/hư/mất gốc"
  - suy diễn "chắc do gia đình" khi chưa rõ
```

## protective_factors
```yaml
protective_factors:
  - 1 giáo viên/người lớn hỗ trợ bắt đầu bài
  - bạn học kèm hỗ trợ
  - không gian học nhỏ ổn định
  - phản hồi động viên quá trình
  - thói quen lên kế hoạch bài về nhà
```

## monitoring
```yaml
monitoring:
  - behavior log tần suất nộp/không nộp theo môn
  - đánh giá lại sau 2 tuần điều chỉnh
  - nếu trốn học/theo học giảm sút rõ → nâng tầng 4
```

## referral
```yaml
referral:
  - không làm bài + trốn học lặp lại + ảnh hưởng nhiều môn
  - kèm lo âu/khí sắc thấp/tự hại
  - nghi khó khăn học tập đặc thù → đánh giá chuyên môn (không gia nhãn)
```

## emergency
```yaml
emergency: "Kèm dấu hiệu tuyệt vọng/tự hại → SAFETY MODE (§35)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "green"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Phát hiện sớm và tiếp cận hỗ trợ phù hợp là cần thiết."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §8, §24, §26.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `constructs/01` (planning), `toolkits/03,04`, `advice/05`.
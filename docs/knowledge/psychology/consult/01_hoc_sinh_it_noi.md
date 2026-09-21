---
id: psy-sit-01
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §22,§39,§54; WHO adolescent mental health (2025); CDC School Connectedness (2024)"
tags: [tư-vấn-nhanh, im-lặng, quan-sát, học-sinh]
---

# Quick Consultation Card — Học sinh đột nhiên ít nói

> Card tư vấn nhanh theo OS V2. Dùng cùng `STUDENT_PSYCHOLOGY_QUICK_CONSULTATION.md`
> (khung RAPID + 5 tầng) và `SAFETY_PROTOCOL.md` khi có dấu hiệu nguy cơ.

## situation
```yaml
situation:
  id: "student-psych-001"
  domain: "development"        # A2 cảm xúc / A5 tự chủ
  topic: "silence-change"
  ageRange: "11-18"
  context: ["school", "home", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - ít tương tác với bạn bè, giáo viên
  - giảm tham gia hoạt động lớp so với trước
  - ngắn câu trả lời hoặc né trả lời
  - thay đổi rõ rệt so với 2-3 tuần trước
  - có thể kèm: ngồi một mình trong giờ ra chơi, tránh ánh mắt
```

## possible_explanations
> ⚠️ KHÔNG chọn một nguyên nhân duy nhất khi chưa đủ dữ kiện (§7).
```yaml
possible_explanations:
  - mệt / thiếu ngủ
  - xấu hổ / tự ti
  - xung đột bạn bè
  - lo lắng (bài vở, thi cử)
  - bị bắt nạt hoặc cô lập
  - áp lực hoặc khó khăn gia đình
  - khó thích nghi lớp mới / giai đoạn phát triển
  - nhu cầu riêng tư, không phải vấn đề
```

## questions
```yaml
questions:
  - "Gần đây có chuyện gì khác so với trước không?"
  - "Ở lớp điều gì làm em khó chịu nhất?"
  - "Em có ai để nói chuyện không?"
  - "Nếu em chưa muốn nói ngay, khi sẵn sàng cô/thầy có thể nghe."
```

## first_response
```yaml
first_response:
  - lắng nghe, không ép buộc
  - không hỏi "tại sao em không nói?"
  - ổn định, cho không gian, xác nhận cảm xúc (§23)
  - theo dõi thay đổi theo thời gian
  - kiểm tra an toàn nếu có dấu hiệu đáng lo (§35)
```

## avoid
```yaml
avoid:
  - gán nhãn ("em trầm cảm / hư / hư hỏng")
  - ép nói trước lớp
  - so sánh với bạn khác
  - kết luận một nguyên nhân khi thiếu dữ kiện
```

## protective_factors
```yaml
protective_factors:
  - một người lớn đáng tin ở trường hoặc gia đình
  - bạn bè hỗ trợ
  - cảm giác thuộc về lớp
  - sở thích lành mạnh, mục tiêu cá nhân
  - từng giao tiếp/tương tác tốt ở một giai đoạn trước đây
```

## monitoring
```yaml
monitoring:
  - ghi behavior log: ngày, bối cảnh, hành vi, kiểm tra lại sau 1-2 tuần
  - nếu kéo dài hoặc ảnh hưởng rõ học tập/quan hệ → nâng TẦNG 3-4
```

## referral
```yaml
referral:
  - khi dấu hiệu kéo dài > 2 tuần
  - ảnh hưởng rõ chức năng (bỏ bài, trốn học)
  - có dấu hiệu tự hại / "không muốn sống" → SAFETY MODE ngay
```

## emergency
```yaml
emergency:
  - học sinh nói muốn chết / tự làm đau / có kế hoạch → SAFETY MODE (§35)
  - không hứa giữ bí mật, gọi người lớn có trách nhiệm ngay
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    type: official-guidance
    claim: "Môi trường gia đình, nhà trường, cộng đồng có tính bảo vệ."
    population: "10-19"
    region: "global"
  - source: CDC
    title: School Connectedness
    year: 2024
    type: resource
    claim: "Cảm giác thuộc về trường là yếu tố bảo vệ."
    population: "adolescent"
    region: "US"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §2, §7, §22, §23, §39, §54.
- WHO (2025). *Mental health of adolescents.* — who.int.
- CDC (2024). *School connectedness / adolescent mental health.* — cdc.gov.
- Kế thừa `psychology/wellness/08` (leo thang) và `development/00` (tổng quan THCS).
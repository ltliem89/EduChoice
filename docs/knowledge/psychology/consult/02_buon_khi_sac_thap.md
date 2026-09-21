---
id: psy-sit-02
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §16; WHO adolescent mental health (2025); UNITY child helplines"
tags: [tư-vấn-nhanh, buồn, khi-sắc-thấp, quan-sát]
---

# Quick Consultation Card — Buồn / khí sắc thấp

> ⚠️ Tài liệu giáo dục, KHÔNG chẩn đoán. "Buồn" không đồng nghĩa "trầm cảm".
> Khi có dấu hiệu tự hại/tự sát → bỏ qua mọi bước dưới, vào `SAFETY_PROTOCOL.md` ngay.

## situation
```yaml
situation:
  id: "student-psych-002"
  domain: "emotion"
  topic: "sadness-low-mood"
  ageRange: "11-18"
  context: ["school", "home", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - buồn/kém vui kéo dài, rõ rệt so với trước
  - giảm hứng thú các việc từng thích
  - thay đổi ăn/ngủ/năng lượng
  - rút lui khỏi bạn bè, hoạt động
  - than về "chán", "vô vọng", "không muốn làm gì"
  - ⚠️ phân biệt: buồn ngắn sau một sự kiện (bình thường) vs. kéo dài + ảnh hưởng chức năng (cần hỗ trợ)
```

## possible_explanations
```yaml
possible_explanations:
  - phản ứng với mất mát, thất bại, xung đột (buồn phản ứng)
  - khí sắc thấp kéo dài + ảnh hưởng chức năng → cần tìm hiểu thêm, theo dõi
  - khó khăn học tập / thi cử
  - cô đơn, bị cô lập
  - áp lực gia đình
  - vấn đề sức khỏe thể chất, giấc ngủ
  - ≥2 tuần kéo dài, nhiều dấu hiệu → nâng mức hỗ trợ 3-4, liên hệ người lớn
```

## questions
```yaml
questions:
  - "Dạo này điều gì làm em thấy nặng nề nhất?"
  - "Chuyện đó bắt đầu từ khi nào?"
  - "Em còn thấy thích việc gì không?"
  - "Giấc ngủ và ăn uống của em dạo này thế nào?"
  - "Có ai em tin tưởng để nói chuyện không?"
```

## first_response
```yaml
first_response:
  - lắng nghe, thấu cảm, không phán xét
  - xác nhận cảm xúc ("cô hiểu những ngày này khó với em")
  - không vội đưa giải pháp / khuyên "hãy vui lên"
  - theo dõi thời lượng & mức ảnh hưởng đến học tập, quan hệ
  - nếu kéo dài > 2 tuần + ảnh hưởng rõ → phối hợp gia đình, nhà trường, chuyên môn
```

## avoid
```yaml
avoid:
  - gán nhãn "trầm cảm"
  - so sánh "bạn khác còn khổ hơn"
  - nói "em nghĩ quá nhiều / mạnh mẽ lên"
  - đảm bảo hết buồn ngay
  - tự chẩn đoán từ vài biểu hiện đơn lẻ [WHO 2025]
```

## protective_factors
```yaml
protective_factors:
  - người lớn đáng tin
  - bạn bè hỗ trợ
  - cảm giác thuộc về trường/lớp
  - thói quen thể chất, giấc ngủ phù hợp
  - kỹ năng gọi tên cảm xúc, giải quyết vấn đề
  - sở thích lành mạnh, mục tiêu cá nhân
```

## monitoring
```yaml
monitoring:
  - ghi log: mức độ buồn (thang 0-10 tự báo), thời lượng, ảnh hưởng chức năng, ăn-ngủ
  - mốc: sau 1 tuần đánh giá lại
  - TEEN báo "không còn hứng thú gì" + "không muốn sống" → SAFETY MODE
```

## referral
```yaml
referral:
  - buồn kéo dài > 2 tuần, ảnh hưởng rõ học tập/quan hệ
  - kèm tự hại, ý tưởng tự sát → chuyển tuyến khẩn cấp
  - có tiền sử chấn thương, bạo lực, mất mát đáng kể
  - rối loạn giấc ngủ/ăn uống nặng nề
```

## emergency
```yaml
emergency:
  - nói muốn chết / tự làm đau / có kế hoạch → SAFETY MODE (§35), không hứa giữ bí mật
  - nguy cơ tức thời → dịch vụ khẩn cấp/y tế địa phương
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Trầm cảm và lo âu có thể ảnh hưởng đi học và kết quả; giáo viên không nên tự chẩn đoán từ vài biểu hiện."
    population: "10-19"
    region: "global"
  - source: WHO
    title: Service guidance for MH of children & young people
    year: 2024
    claim: "Nhu cầu tổ chức theo bối cảnh, tăng cường hệ thống dịch vụ."
    population: "0-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §16, §37, §52.
- WHO (2025). *Mental health of adolescents.* — who.int.
- WHO (2024). *Service guidance.* — who.int/publications/i/item/9789240100374.
- Kế thừa `wellness/08` (leo thang) và `development/00`.
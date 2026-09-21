---
id: psy-sit-09
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §15; WHO 2025; wellness/03"
tags: [tư-vấn-nhanh, lo-âu, lo-lắng, tránh-ne]
---

# Quick Consultation Card — Lo âu / lo lắng quá mức

> Dấu hiệu cần tìm hiểu: worry + avoidance + physical symptoms + sleep + concentration + school avoidance + reassurance seeking (§15).

## situation
```yaml
situation:
  id: "student-psych-009"
  domain: "emotion"
  topic: "anxiety"
  ageRange: "11-18"
  context: ["school", "home", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - lo lắng quá mức, khó trấn an (reassurance seeking)
  - né tránh: sợ kiểm tra, sợ phát biểu, sợ sai (avoidance)
  - đau đầu, đau bụng, hồi hộp khi gặp áp lực (physical)
  - khó ngủ, thức giấc giữa đêm, khó tập trung
  - tránh trường, xin nghỉ học (school avoidance — card 07)
  - hỏi lặp "chắc chắn không sao chứ?" nhiều lần
```

## possible_explanations
```yaml
possible_explanations:
  - phản ứng lo âu có tính thích ứng (bình thường, có giới hạn)
  - lo âu học tập/kiểm tra cụ thể (card 10)
  - khó chịu về xã hội, sợ bị đánh giá (performance)
  - lo âu lan tỏa kéo dài → cần tìm hiểu thêm, theo dõi
  - bối cảnh: áp lực học tập, gia đình, bắt nạt, thay đổi lớn
  - vấn đề sức khỏe thể chất / tác dụng phụ → chuyên môn y tế
```

## questions
```yaml
questions:
  - "Điều gì làm em lo nhất?"
  - "Điều đó xảy ra khi nào?"
  - "Khi lo, cơ thể em có cảm giác gì?"
  - "Em thường làm gì để tránh cảm giác đó?"
  - "Lo lắng này đã kéo dài bao lâu, có ảnh hưởng gì không?"
```

## first_response
```yaml
first_response:
  - bình thường hóa: "Lo lắng là phản ứng tự nhiên; nhiều bạn cũng thấy vậy"
  - dạy kỹ thuật điều hòa: hít thở 4-4-4, 5-4-3-2-1 (toolkits/08)
  - giúp phân rã nỗi lo cụ thể → nhiệm vụ nhỏ (toolkits/03)
  - tránh "trấn an" tuyệt đối liên tục; thay bằng "mình cùng nhìn cách vượt"
  - sắp xếp kiểm tra/trình bày dần dần để tăng tự tin (exposure nhẹ)
  - kiểm tra giấc ngủ, caffein, thiết bị trước ngủ
```

## avoid
```yaml
avoid:
  - "em nghĩ quá nhiều" (§34 cấm)
  - "chuyện nhỏ mà" / so sánh
  - ép làm ngay việc đang sợ khi hoảng cấp tính
  - gán nhãn "rối loạn lo âu"
  - tự chẩn đoán từ vài dấu hiệu [WHO 2025]
```

## protective_factors
```yaml
protective_factors:
  - người lớn tin cậy, lắng nghe
  - kỹ năng thư giãn + nhận diện cảm xúc
  - thói quen ngủ đủ, vận động
  - 1-2 bạn thân
  - tiến bộ từng bước nhỏ được ghi nhận
```

## monitoring
```yaml
monitoring:
  - mức lo tự báo (0-10), tần suất tránh né theo tuần
  - mốc đánh giá sau 2 tuần can thiệp
  - nếu lo âu ảnh hưởng rõ học tập/quan hệ, trốn học lặp lại → tầng 4
```

## referral
```yaml
referral:
  - lo âu lan tỏa kéo dài, hoảng sợ cấp tính lặp lại
  - trốn học do lo âu kéo dài
  - kèm khí sắc thấp hoặc tự hại
  - mất ngủ nặng kéo dài
```

## emergency
```yaml
emergency: "Cơn hoảng loạn nghiêm trọng/tự hại → gọi người lớn, theo SAFETY PROTOCOL."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Lo âu và trầm cảm ảnh hưởng việc đi học và kết quả; không tự chẩn đoán từ vài biểu hiện."
    population: "10-19"
    region: "global"
  - source: WHO
    title: Service guidance (2024)
    year: 2024
    claim: "Tổ chức hỗ trợ theo bối cảnh."
    population: "0-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §15, §30-34.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `wellness/03` (lo âu & lo lắng), `wellness/02` (căng thẳng học tập), `toolkits/08` (tự điều hòa).
---
id: psy-sit-10
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §27,§18; O'Driscoll (test anxiety); advice/09"
tags: [tư-vấn-nhanh, thi-cử, kiểm-tra, lo-âu-thi, cầu-toàn]
---

# Quick Consultation Card — Áp lực thi cử / sợ kiểm tra / cầu toàn

> Hỗ trợ: planning, chunking, practice, sleep, breaks, realistic goals, error review, coping, help-seeking. KHÔNG khuyến khích thức trắng/học liên tục/so sánh/đe dọa (§27).

## situation
```yaml
situation:
  id: "student-psych-010"
  domain: "school"
  topic: "exam-stress-perfectionism"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - căng thẳng rõ vào kỳ thi/kiểm tra, mệt mỏi kéo dài
  - trì hoãn dù muốn học tốt (cầu toàn gây tránh né)
  - sửa bài quá nhiều, sợ nộp bài
  - khó chấp nhận lỗi/làm sai nhỏ
  - phụ thuộc điểm số, tự phê bình mạnh
  - ăn/ngủ rối loạn trước kỳ thi
  - kiểm tra vật lý: hồi hộp, run, đau bụng khi thi
```

## possible_explanations
```yaml
possible_explanations:
  - lo âu kiểm tra cụ thể (performance anxiety)
  - cầu toàn: "tất cả hoặc không gì" (perfectionism) → né tránh + tự phê bình
  - kỳ vọng thành tích gia đình cao (card 17, development/11)
  - thiếu kỹ năng ôn tập (planning/chunking)
  - thiếu ngủ trước thi do ôn muộn
  - tự trọng gắn liền điểm số (card 16)
```

## questions
```yaml
questions:
  - "Kỳ thi này em lo điều gì nhất?"
  - "Em tin rằng điều gì sẽ xảy ra nếu điểm không cao?"
  - "Em thường ôn như thế nào trong tuần trước thi?"
  - "Em thấy cơ thể thế nào khi ngồi trong phòng thi?"
  - "Mọi người trong nhà nói gì về điểm số của em?"
```

## first_response
```yaml
first_response:
  - chia nhỏ lượng ôn (chunking), lập kế hoạch theo ngày (toolkits/04)
  - thực hành dạng bài / mô phỏng thi ngắn (practice)
  - mục tiêu thực tế theo năng lực (toolkits/11), tách "điểm" với "giá trị bản thân"
  - xử lý lo âu: kỹ thuật thư giãn, hít thở, kịch bản phòng thi (toolkits/08)
  - giấc ngủ trước thi: không thức trắng (advice/07)
  - xem sai sót làm dữ liệu cải thiện (error review), Process > Perfection (§18)
```

## avoid
```yaml
avoid:
  - "em hồi hộp là em yếu"
  - so sánh với bạn giỏi
  - đe dọa "không đỗ là..."; kỳ vọng phải đạt tuyệt đối
  - gán nhãn "rối loạn lo âu"
  - khuyến khích thức trắng ôn thi
```

## protective_factors
```yaml
protective_factors:
  - feedback động viên quá trình (advice/05)
  - kỹ năng ôn tập + lập kế hoạch
  - 1 người lớn tin cậy chia sẻ áp lực
  - giấc ngủ + vận động điều độ
  - xem học là phát triển, không chỉ điểm
```

## monitoring
```yaml
monitoring:
  - self-report mức căng thẳng trước/sau kiểm tra
  - đánh giá kế hoạch ôn: có đủ ngủ, không trì hoãn tột độ
  - theo dõi sau mỗi kỳ thi 1 tuần
  - nếu lo âu kéo dài quanh năm học → tầng 4
```

## referral
```yaml
referral:
  - hoảng sợ/lo âu kéo dài ảnh hưởng nhiều kỳ thi
  - trốn né hoàn toàn chuyện kiểm tra
  - kèm khí sắc thấp, tự hại
```

## emergency
```yaml
emergency: "Kèm tuyệt vọng/tự hại trước thi → SAFETY MODE (§35)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Áp lực học tập ảnh hưởng sức khỏe tâm thần vị thành niên."
    population: "10-19"
    region: "global"
  - source: O'Driscoll
    title: Test anxiety guidance
    year: (trong ADVICE_BASIS_LINKS, advice/00)
    type: peer-reviewed-guidance
    claim: "Lo âu thi cử liên quan planning/practice/sleep/coping."
    population: "adolescent"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §18, §27.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Nguồn O'Driscoll test anxiety — `psychology/advice/00` (`ADVICE_BASIS_LINKS`).
- Kế thừa `advice/09` (tuần thi & lo âu thi cử), `toolkits/04,08,11`.
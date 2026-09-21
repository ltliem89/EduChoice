---
id: psy-sit-17
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §14; Carskadon; development/09; advice/07"
tags: [tư-vấn-nhanh, giấc-ngủ, thiếu-ngủ, nhịp-sinh-học]
---

# Quick Consultation Card — Vấn đề giấc ngủ

> Kiểm tra giấc ngủ trước khi kết luận các vấn đề khác (§14). Không dùng một biểu hiện mệt mỏi để kết luận vấn đề tâm lý.

## situation
```yaml
situation:
  id: "student-psych-017"
  domain: "wellness"
  topic: "sleep"
  ageRange: "11-18"
  context: ["home", "school"]
```

## observable_signs
```yaml
observable_signs:
  - giờ đi ngủ/thức dậy muộn, khó dậy buổi sáng
  - ngủ cuối tuần "bù" rất nhiều (rối loạn nhịp)
  - dùng thiết bị trước khi ngủ
  - ngủ gật trong lớp ban ngày
  - ảnh hưởng học tập: kém tập trung, quên bài
  - mệt mỏi, cáu gắt ban ngày
  - khó ngủ/thức giấc giữa đêm kéo dài
```

## possible_explanations
```yaml
possible_explanations:
  - nhịp sinh học THCS dịch chuyển trễ (Carskadon) — bình thường sinh học
  - thói quen thiết bị màn hình trước ngủ (ánh sáng + kích thích)
  - học khuya/thức trắng giai đoạn thi cử (advice/07)
  - caffein (trà sữa, nước tăng lực)
  - lo âu, căng thẳng, khí sắc thấp (card 02,09) — mất ngủ có thể là dấu hiệu
  - bận tâm mạng xã hội/game đêm (card 12)
```

## questions
```yaml
questions:
  - "Em thường đi ngủ lúc mấy giờ, thức dậy lúc mấy giờ?"
  - "Cuối tuần em ngủ bao nhiêu giờ mỗi đêm?"
  - "Trước khi ngủ em thường làm gì (điện thoại/game/xem phim)?"
  - "Trong ngày em có buồn ngủ không? Ở lớp lúc nào?"
  - "Có điều gì khiến em khó ngủ không? Em có hay lo lắng khi nằm không?"
```

## first_response
```yaml
first_response:
  - thiết lập giờ ngủ cố định kể cả cuối tuần (gần với giờ đi học)
  - không thiết bị 1 giờ trước ngủ
  - giảm caffein chiều/tối
  - nếu lo âu khi nằm: nhật ký lo lắng trước ngủ + kỹ thuật thư giãn
  - sử dụng ánh sáng buổi sáng để điều chỉnh nhịp
  - tránh "bù ngủ quá mức" cuối tuần
```

## avoid
```yaml
avoid:
  - lơ lửng vì mệt mỏi rồi gán cho "lười"
  - bỏ qua dấu hiệu mất ngủ nếu kéo dài (có thể liên quan khí sắc thấp)
  - khuyên thức trắng học bài
  - tự chẩn đoán rối loạn giấc ngủ
```

## protective_factors
```yaml
protective_factors:
  - giờ ngủ ổn định, phòng ngủ tối
  - giảm màn hình buổi tối
  - hoạt động thể chất ban ngày
  - người lớn quản lý thời gian màn hình
```

## monitoring
```yaml
monitoring:
  - log giờ ngủ dậy 1 tuần
  - mốc đánh giá sau 2 tuần thực hành
  - nếu kéo dài + lo âu/khí sắc thấp → điều tra hướng tâm lý
```

## referral
```yaml
referral:
  - mất ngủ kéo dài nhiều tuần, ảnh hưởng rõ học tập
  - kèm lo âu, khí sắc thấp, tự hại
  - nghi ngủ ngừng thở/daymares nghiêm trọng → chuyên môn y tế
```

## emergency
```yaml
emergency: "Mất ngủ kéo dài kèm tuyệt vọng → SAFETY MODE. Ngoài ra không khẩn cấp chuyển tuyến."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "green"
evidence:
  - source: Carskadon
    title: Sleep in adolescents
    year: 2011
    type: peer-reviewed
    claim: "Nhịp sinh học thiếu niên dịch trễ; giấc ngủ cần cho học tập và tâm trạng."
    population: "adolescent"
    region: "global"
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Thói quen lành mạnh và giấc ngủ có tính bảo vệ."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §14, §10 (protective factors).
- Carskadon (2011) — `development/09`.
- Kế thừa `development/09` (giấc ngủ thiếu niên), `wellness/04` (vệ sinh giấc ngủ), `advice/07`.
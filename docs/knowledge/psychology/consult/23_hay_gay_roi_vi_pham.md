---
id: psy-sit-23
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §25,§26,§46; development/04"
tags: [tư-vấn-nhanh, gây-rối, vi-phạm, hành-vi, kỷ-luật]
---

# Quick Consultation Card — Học sinh hay gây rối / thường xuyên vi phạm

> KHÔNG gán "cá biệt/lười/hư" (§25). Phân tích Trigger+Function+Peer context+Academic difficulty+Attention+Family+Reinforcement+Protective. Tạo behavior log trước khi kết luận (§26).

## situation
```yaml
situation:
  id: "student-psych-023"
  domain: "school"
  topic: "disruptive-behavior"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - mất trật tự lớp lặp lại, chọc phá bạn
  - vi phạm nội quy (đi muộn, nghịch điện thoại, cãi lại)
  - hành vi "tìm sự chú ý" hoặc né tránh để không phải làm bài
  - xung đột với giáo viên/bạn thường xuyên
  - có thể kèm khó khăn học tập, chán nản, bối cảnh gia đình
```

## possible_explanations (function-based)
```yaml
possible_explanations:
  - attention: hành vi hút sự chú ý (kể cả tiêu cực)
  - escape: né tránh nhiệm vụ khó/đánh giá (card 06,10)
  - peer context: hành vi theo nhóm, uy tín trước bạn bè
  - academic difficulty: bài quá khó gây bất lực
  - family: áp lực/xung đột gia đình (card 11,16)
  - reinforcement: từng "thắng" bằng hành vi đó
  - protective: có kỹ năng/điểm mạnh chưa được tận dụng
```

## questions
```yaml
questions:
  - "Giờ/buổi nào em hay gặp chuyện nhất, vì sao?"
  - "Khi cô/thầy nhắc bài, việc đó ra sao với em?"
  - "Ở nhà có ai hay mắng/áp lực em không?"
  - "Em thấy mình giỏi điều gì?"
  - "Điều gì làm em thấy công bằng/không công bằng ở lớp?"
```

## first_response
```yaml
first_response:
  - behavior log theo §26: date/context/trigger/behavior/consequence/response/outcome → tìm pattern
  - Prevent→Teach→Prompt→Reinforce→Review (§46): dự phòng môi trường trước khi phạt
  - củng cố hành vi tích cực thay vì chỉ phạt
  - tìm chức năng hành vi (attention/escape) để can thiệp đúng gốc
  - phối hợp gia đình nếu có rối loạn môi trường
  - tránh đối đầu công khai; xử lý sau/bên cạnh
```

## avoid
```yaml
avoid:
  - gọi "cá biệt/lười/hư" trước lớp
  - trừng phạt gây xấu hổ công khai (shame)
  - đe dọa, so sánh
  - kết luận "hư từ nhỏ" không kiểm chứng
  - dùng hình phạt đơn lẻ khi chưa phân tích chức năng
```

## protective_factors
```yaml
protective_factors:
  - giáo viên xây quan hệ, công nhận điểm mạnh
  - nhiệm vụ phù hợp năng lực → cảm giác thành công
  - kỹ năng điều hòa cảm xúc
  - bạn bè tích cực
  - gia đình phối hợp (nếu mở lòng)
  - môi trường lớp công bằng, dự đoán được
```

## monitoring
```yaml
monitoring:
  - behavior log tần suất hành vi theo tuần
  - mốc đánh giá sau 2-4 tuần can thiệp chức năng
  - nếu hành vi bạo lực/đe dọa → card 08/SAFETY
  - nếu kèm khí sắc thấp, trốn học → thêm card 02,07
```

## referral
```yaml
referral:
  - hành vi dai dẳng dù đã can thiệp, ảnh hưởng người khác
  - nghi vấn vấn đề phát triển/thần kinh → chuyên môn đánh giá (không tự nhãn)
  - kèm tự hại, bạo lực, gia đình bạo lực
```

## emergency
```yaml
emergency: "Hành vi gây thương tích/đe dọa an toàn → can thiệp người lớn ngay (§12,§36)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Kỹ năng điều chỉnh cảm xúc, giải quyết vấn đề có tính bảo vệ; môi trường lớp an toàn quan trọng."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §25, §26, §46.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/04` (cảm xúc & xung động), `constructs/04` (tự điều hòa), `toolkits/08`, `wellness/08`.
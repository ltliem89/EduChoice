---
id: psy-sit-04
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §21,§25,§26,§46; ABC model; development/04"
tags: [tư-vấn-nhanh, tức-giận, hành-vi, giận-dữ]
---

# Quick Consultation Card — Tức giận / cơn giận bộc phát

> Giận là cảm xúc bình thường; cần phân tích bằng ABC (§8) và trigger đúng, không gán "cá biệt/lười/hư" (§25).

## situation
```yaml
situation:
  id: "student-psych-004"
  domain: "emotion"
  topic: "anger"
  ageRange: "11-18"
  context: ["school", "home", "peer"]
```

## observable_signs
```yaml
observable_signs:
  - cáu gắt, to tiếng, đập bàn, quăng đồ
  - xung đột thể chất/lời nói với bạn, giáo viên
  - căng cứng, mặt đỏ, giọng gắt
  - giận nhịn sau đó bùng nổ
  - lặp lại trong nhiều bối cảnh (không chỉ 1 lần)
```

## possible_explanations (ABC)
```yaml
possible_explanations:
  - trigger: bị trêu, bị bất công, bị hiểu lầm, bị ép, thất bại bài vở
  - interpretation: "người kia đang xem thường mình"
  - emotion/body: giận, nóng, cơ thể căng
  - action: quát/đánh/ném (được củng cố nếu đạt mục tiêu)
  - bối cảnh: áp lực gia đình, khó khăn học tập, xung đột bạn bè
```

## questions
```yaml
questions:
  - "Điều gì xảy ra ngay trước lúc em tức?"
  - "Em nghĩ người kia đang làm gì với em?"
  - "Lúc đó em muốn điều gì?"
  - "Cơ thể em lúc đó cảm giác ra sao?"
  - "Có điều gì ở nhà/ở lớp đang khiến em căng thẳng không?"
```

## first_response
```yaml
first_response:
  - tách học sinh ra khỏi kích thích, cho không gian bình tĩnh
  - không đối đầu gay gắt trong lúc cơn giận đang cao
  - sau khi dịu: cùng phân tích ABC, gọi tên cảm xúc (§34-36)
  - dạy kỹ năng điều hòa: hít thở 4-4-4 (toolkits/08), nói "cô/thầy thấy em đang rất tức…"
  - Prevent→Teach→Prompt→Reinforce→Review (§46)
```

## avoid
```yaml
avoid:
  - la mắng "em hư/quá cá biệt"
  - trừng phạt gây xấu hổ trước lớp
  - đe dọa, so sánh
  - làm phiên tòa khi xử lý sau xung đột (§47 restorative)
```

## protective_factors
```yaml
protective_factors:
  - người lớn biết lắng nghe
  - kỹ năng điều hòa cảm xúc (đang được rèn)
  - bạn bè hỗ trợ
  - môi trường lớp an toàn, công bằng
  - sở thích giải tỏa lành mạnh (thể thao, âm nhạc)
```

## monitoring
```yaml
monitoring:
  - behavior log: date/context/trigger/behavior/consequence/response/outcome (§26)
  - tìm pattern trước khi kết luận; theo dõi tần suất giảm sau can thiệp
  - nếu giận dẫn tới bạo lực với người khác → quy trình bạo lực học đường (card 08)
```

## referral
```yaml
referral:
  - cơn giận gây tổn thương thể chất/đe dọa nghiêm trọng
  - giận dữ kéo dài + ảnh hưởng rõ học tập, quan hệ
  - kèm lo âu/khí sắc thấp/tự hại
  - nghi vấn vấn đề sức khỏe/thần kinh → chuyên môn y tế
```

## emergency
```yaml
emergency: "Hành vi gây thương tích nghiêm trọng/đe dọa an toàn bản thân hay người khác → can thiệp người lớn ngay (§12, §36)."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Kỹ năng điều chỉnh cảm xúc và giải quyết vấn đề là năng lực quan trọng."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §8 (ABC), §21 (giận), §25 (gây rối), §26 (behavior log), §46-47.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `constructs/04` (Self-Regulation), `toolkits/08` (tự điều hòa), `development/04`, `wellness/06`.
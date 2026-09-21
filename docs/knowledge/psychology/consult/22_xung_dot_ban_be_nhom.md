---
id: psy-sit-22
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §20,§47; development/05; constructs/16"
tags: [tư-vấn-nhanh, xung-đột, bạn-bè, nhóm, restorative]
---

# Quick Consultation Card — Xung đột bạn bè / nhóm

> Không gộp "mâu thuẫn" với "bắt nạt" (§12). Xung đột giữa các bên có thể là cơ hội học kỹ năng; nếu lặp lại/có chênh lệch quyền lực → nghi bắt nạt (card 08).

## situation
```yaml
situation:
  id: "student-psych-022"
  domain: "social"
  topic: "friendship-conflict"
  ageRange: "11-18"
  context: ["peer", "school"]
```

## observable_signs
```yaml
observable_signs:
  - tranh cãi, giận dỗi, "chơi riêng" giữa bạn bè
  - hiểu lầm lan truyền trong nhóm
  - chia bè phái, nói xấu sau lưng
  - học sinh đau khổ/ảnh hưởng học tập vì xung đột
  - cảm thấy bị bạn "bỏ rơi" dù không bị cô lập có chủ đích
  - phân biệt: hai chiều, không lặp lại, có thể hòa giải (conflict) vs. chênh lệch quyền lực lặp lại (bullying → card 08)
```

## possible_explanations
```yaml
possible_explanations:
  - khác biệt quan điểm/sở thích/giá trị
  - hiểu lầm giao tiếp (đặc biệt lứa tuổi nhạy cảm đánh giá)
  - áp lực đồng trang lứa, cần thuộc về (development/05)
  - đang phát triển kỹ năng giao tiếp quyết đoán (constructs/10)
  - tranh giành vị trí trong nhóm
  - tức giận chưa quản lý (card 04)
```

## questions
```yaml
questions:
  - "Chuyện gì xảy ra trước khi hai bạn xung đột?"
  - "Mỗi bên đã nói gì/không nói gì?"
  - "Em nghĩ bạn ấy đang cảm thấy gì?"
  - "Nếu làm lại, em muốn thay đổi điều gì?"
```

## first_response
```yaml
first_response:
  - restorative (§47): what happened → ai bị ảnh hưởng → cảm xúc → nhu cầu → sửa chữa → bước tiếp
  - không lấy một bên làm "thủ phạm" vội; lắng nghe hai chiều
  - dạy kỹ năng: nói "mình khó chịu khi..." (I-message), lắng nghe phản hồi
  - tách cá nhân với vị trí/hành vi
  - giúp tìm giải pháp cùng nhau, không biến thành phiên tòa (§47)
```

## avoid
```yaml
avoid:
  - "em phải xin lỗi vì..." (ép một chiều)
  - phân xử như tòa án, buộc công khai xin lỗi gây xấu hổ
  - gán nhãn "hư/bắt nạt" khi chỉ là xung đột
  - để mặc tự giải quyết khi ảnh hưởng học tập/cảm xúc
  - lẫn với bắt nạt: nếu lặp lại/có quyền lực chênh → card 08
```

## protective_factors
```yaml
protective_factors:
  - kỹ năng giao tiếp & phản hồi
  - bạn bè ngoài nhóm xung đột
  - người lớn làm trung gian công bằng
  - cảm giác thuộc về lớp
  - hoạt động chung tái kết nối (thể thao, dự án)
```

## monitoring
```yaml
monitoring:
  - ghi nhận xung đột bùng phát lại 2 tuần
  - nếu leo thang → bạo lực → card 08/quy trình
  - nếu học sinh đau khổ kéo dài → theo dõi khí sắc (card 02)
```

## referral
```yaml
referral:
  - xung đột kéo dài, ảnh hưởng chức năng
  - leo thang thành bạo lực/bắt nạt
  - kèm khí sắc thấp, lo âu, tự hại
```

## emergency
```yaml
emergency: "Leo thang bạo lực thể chất → can thiệp người lớn ngay (§12). Tự hại → SAFETY MODE."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "green"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Quan hệ bạn bè ảnh hưởng sức khỏe tâm thần; kỹ năng quan hệ xã hội là năng lực quan trọng."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §12, §20, §47.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/05`, `constructs/10,16,17`, `toolkits/10` (giao tiếp quyết đoán).
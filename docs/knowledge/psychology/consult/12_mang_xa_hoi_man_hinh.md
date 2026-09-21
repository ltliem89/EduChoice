---
id: psy-sit-12
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §13,§53; CDC 2023 YRBS (2024); development/10; wellness/05"
tags: [tư-vấn-nhanh, mạng-xã-hội, màn-hình, đời-sống-số]
---

# Quick Consultation Card — Mạng xã hội & màn hình (cân bằng, không mặc định "xấu")

> Không mặc định social media = xấu (§13). Phân tích đủ 8 chiều trước khi kết luận.

## situation
```yaml
situation:
  id: "student-psych-012"
  domain: "digital"
  topic: "social-media-screen"
  ageRange: "11-18"
  context: ["home", "school", "online"]
```

## observable_signs
```yaml
observable_signs:
  - dùng màn hình rất nhiều giờ (game/mạng xã hội) — (không tự nói = nghiện)
  - ngủ muộn vì online, ngủ gật ban ngày, ảnh hưởng học tập
  - sao nhãng bài vở, so sánh bản thân với mạng
  - lo ảnh hưởng quan hệ bạn bè ngoài đời
  - cảm giác khó chịu/cáu khi không được online
  - trải nghiệm bắt nạt/tiêu cực khi online (kèm card 08)
```

## possible_explanations
```yaml
possible_explanations:
  - nhu cầu giải trí, kết nối, thuộc về (nhiều khi lành mạnh)
  - thói quen chưa tự quản (kỹ năng tự kiểm soát còn yếu)
  - né tránh khó khăn học tập/cảm xúc (dùng như "thoát ly" — card 05,09)
  - sleep disruption do ánh sáng màn hình/game phấn khích (advice/07)
  - nội dung tiêu cực, cyberbullying (card 08)
  - vấn đề nền: lo âu, khí sắc thấp (card 02,09)
```

## questions
```yaml
questions:
  - "Em thường dùng điện thoại để làm gì nhất?"
  - "Trung bình một ngày em online khoảng mấy giờ?"
  - "Giấc ngủ của em dạo này thế nào?"
  - "Có lúc nào em không muốn dùng nhưng khó dừng không?"
  - "Online có giúp em kết nối bạn bè hay làm em khó chịu hơn?"
  - "Em có thấy nội dung làm em lo/sợ/bị bêu xấu không?"
```

## first_response
```yaml
first_response:
  - KHÔNG cấm tiệt; cùng lập giới hạn hợp lý (time-blocking, toolkit/05)
  - cải thiện giấc ngủ trước tiên: không thiết bị 1h trước ngủ (advice/07)
  - xen kẽ vận động, hoạt động ngoại khóa
  - thay lệnh "tắt ngay" bằng thỏa thuận giờ sử dụng
  - nếu nghi cyberbullying → bảo vệ + lưu vật chứng (card 08, §12)
  - giáo dục nhận diện nội dung có hại, báo cáo an toàn
```

## avoid
```yaml
avoid:
  - gán "nghiện điện thoại/trầm cảm/ADHD"
  - tịch thu toàn bộ thiết bị làm xung đột bùng nổ
  - so sánh "hồi xưa không có điện thoại"
  - coi mọi việc online là xấu
  - áp nguyên xi dữ liệu CDC YRBS cho học sinh VN (§53)
```

## protective_factors
```yaml
protective_factors:
  - thói quen vận động, sở thích ngoài màn hình
  - giấc ngủ đủ
  - bạn bè ngoài đời, gia đình giao tiếp tích cực
  - khả năng tự kiểm soát thời gian
  - quy tắc màn hình rõ ràng trong gia đình
```

## monitoring
```yaml
monitoring:
  - ghi nhận thời lượng màn hình + giờ ngủ theo tuần
  - đánh giá sau 2 tuần thỏa thuận giới hạn
  - nếu không cải thiện giấc ngủ/học tập → điều chỉnh plan, tầng 4
```

## referral
```yaml
referral:
  - sleep disruption nặng nề kéo dài
  - kèm lo âu/khí sắc thấp/trốn học
  - nghi nội dung xâm hại/bóc lột online → SAFEGUARDING (§36)
```

## emergency
```yaml
emergency: "Tiếp xúc nội dung tự sát tự hại/share khiêu dâm của trẻ → SAFEGUARDING, giữ vật chứng, không để trẻ một mình nếu nguy cơ."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "yellow"
evidence:
  - source: CDC
    title: 2023 YRBS Results
    year: 2024
    claim: "Sử dụng mạng xã hội thường xuyên liên hệ với chỉ báo sức khỏe tâm thần và trải nghiệm bắt nạt (học sinh trung học Mỹ)."
    population: "14-18"
    region: "US"
    limitations: "Không áp nguyên xi cho học sinh Việt Nam"
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Môi trường số là một phần đời sống vị thành niên; cần kỹ năng và môi trường hỗ trợ."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §13, §14, §53.
- CDC (2024). *2023 YRBS Results.* — cdc.gov.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/10` (đời sống số), `wellness/05` (màn hình & game), `advice/06,07`.
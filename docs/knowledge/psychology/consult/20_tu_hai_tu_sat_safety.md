---
id: psy-sit-20
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §35,§41; WHO 2025; wellness/08"
tags: [tư-vấn-nhanh, tự-hại, tự-sát, safety-mode, an-toàn, khẩn-cấp]
---

# Quick Consultation Card — Tự hại / ý tưởng tự sát — NHÁNH AN TOÀN CAO NHẤT

> ⚠️ Nhánh ưu tiên cao nhất (§35). Nếu học sinh nói/thể hiện dấu hiệu bên dưới → **SAFETY MODE**, KHÔNG tư vấn kiểu thông thường. Đọc kỹ `SAFETY_PROTOCOL.md` §1 trước khi dùng card này.

## situation
```yaml
situation:
  id: "student-psych-020"
  domain: "safety"
  topic: "self-harm-suicide-risk"
  ageRange: "11-18"
  context: ["school", "home", "online"]
```

## observable_signs — KÍCH HOẠT SAFETY MODE
```yaml
observable_signs:
  - nói "muốn chết", "không muốn sống nữa", "muốn biến mất"
  - có kế hoạch tự sát (phương thức, thời điểm)
  - tự làm đau bản thân (rạch tay, đập đầu, tự bỏng...)
  - có ý định gây thương tích nghiêm trọng
  - chia sẻ hình ảnh/nội dung tự hại lên mạng
  - buồn tuyệt vọng kéo dài + ít nhất 1 dấu hiệu trên
```

## QUY TRÌNH — SAFETY MODE (§35)
```yaml
procedure:
  - 1. KHÔNG để học sinh ở một mình nếu có nguy cơ cấp tính
  - 2. Gọi người lớn có trách nhiệm / nhân sự được chỉ định của nhà trường
  - 3. Đánh giá mức độ khẩn cấp theo quy trình chuyên môn của cơ sở
  - 4. NẾU nguy cơ tức thời → liên hệ dịch vụ khẩn cấp/y tế địa phương
  - 5. Giảm khả năng tiếp cận phương tiện gây hại (nếu an toàn & phù hợp)
  - 6. KHÔNG hứa giữ bí mật tuyệt đối về nguy cơ an toàn
  - 7. Ghi nhận + chuyển tuyến
```

## questions
```yaml
questions:
  - (chỉ để đánh giá an toàn, KHÔNG để "trị liệu")
  - "Em có nghĩ đến việc làm hại bản thân không?"
  - "Em đã nghĩ bằng cách nào, khi nào chưa?"
  - "Ở đâu/gần em có thứ gì có thể dùng để làm hại không?"
  - "Ai là người lớn em có thể gọi ngay lúc này?"
  - "Trước đây em đã từng làm hại bản thân chưa?"
```

## first_response
```yaml
first_response:
  - ưu tiên an toàn tuyệt đối trên hết
  - giữ thái độ bình tĩnh, không hoảng loạn, không trách móc
  - thông báo đúng: "Cô/thầy rất lo cho em. Em không cần giải quyết một mình."
  - chuyển người lớn có trách nhiệm NGAY
  - không để học sinh về nhà một mình khi nguy cơ cấp tính
```

## avoid
```yaml
avoid:
  - nói "em làm vậy hổ thẹn" / "em nghĩ gì mà tự tử"
  - hứa giữ bí mật
  - cố "thuyết phục" không tự sát bằng lý lẽ
  - để học sinh một mình
  - tự đánh giá "chỉ là nói chơi"
  - bỏ qua vì cho là "gây chú ý"
```

## protective_factors (đánh giá thêm, sau khi ổn định)
```yaml
protective_factors:
  - người lớn đáng tin có mặt
  - gia đình hỗ trợ
  - bạn bè biết cách báo cáo
  - dịch vụ hỗ trợ khẩn cấp tiếp cận được
  - kế hoạch an toàn (danh sách số khẩn cấp, biết tìm người lớn đáng tin, rời khỏi nơi cô lập)
```

## monitoring
```yaml
monitoring:
  - sau ổn định: theo dõi theo quy trình chuyên môn của cơ sở
  - mốc: ngay, 24h, 72h, 1 tuần — luôn có người lớn đánh giá
  - chuyển tuyến bắt buộc; trường ghi nhận và phối hợp gia đình
```

## referral
```yaml
referral: "Chuyển tuyến khẩn cấp đến dịch vụ y tế/tâm lý chuyên môn; phối hợp gia đình theo quy trình trường."
```

## emergency
```yaml
emergency: "Nguy cơ tức thời → gọi dịch vụ khẩn cấp/y tế địa phương ngay; không để một mình."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "red"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Tự hại và tự sát là vấn đề quan trọng; cần phát hiện, hỗ trợ và tiếp cận dịch vụ."
    population: "10-19"
    region: "global"
  - source: CDC
    title: Mental Health and Suicide Risk… Proto-factors (YRBS 2023, MMWR 2024)
    year: 2024
    claim: "Yếu tố bảo vệ và phát hiện sớm quan trọng cho học sinh có nguy cơ."
    population: "14-18"
    region: "US"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §35, §41, §37 (RED).
- WHO (2025). *Mental health of adolescents.* — who.int.
- CDC (2024). *Mental Health & Suicide Risk Among High School Students and Protective Factors — YRBS 2023 (MMWR).*
- Kế thừa `wellness/08` (leo thang) — bản đầy đủ: `SAFETY_PROTOCOL.md`.
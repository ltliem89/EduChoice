---
id: psy-sit-08
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §12, §36; CDC YRBS 2023 (2024); wellness/06"
tags: [tư-vấn-nhanh, bắt-nạt, bạo-lực-học-đường, cyberbullying, an-toàn]
---

# Quick Consultation Card — Bắt nạt / bạo lực học đường / cyberbullying

> KHÔNG gộp tất cả vào "mâu thuẫn". Phân biệt CONFLICT / BULLYING / VIOLENCE / CYBERBULLYING (§12). Ưu tiên an toàn trước tiên.

## situation
```yaml
situation:
  id: "student-psych-008"
  domain: "social"
  topic: "bullying-school-violence"
  ageRange: "11-18"
  context: ["school", "peer", "online"]
```

## observable_signs
```yaml
observable_signs:
  - bị trêu chọc, chê bai, làm nhục lặp lại
  - bị đẩy, đánh, đe dọa thể chất/tinh thần
  - bị đuổi khỏi mạng xã hội, bị bêu xấu, tin nhắn độc
  - bị "cô lập" lặp lại có chủ đích
  - nạn nhân: né trường, lo âu, buồn (kèm card 02,07)
  - người gây: hành vi lặp lại, chênh lệch quyền lực
```

## phân biệt NHANH (§12)
```yaml
conflict: "xung đột giữa các bên, không lặp lại, vai trò đổi chiều"
bullying: "hành vi gây hại/làm nhục/lấn át, LẶP LẠI HOẶC CHÊNH LỆCH QUYỀN LỰC"
violence: "gây tổn hại thể chất/tâm lý hoặc đe dọa"
cyberbullying: "qua môi trường số (tin nhắn, mạng xã hội, nội dung lộ/reup)"
```

## questions (với người bị / người chứng kiến)
```yaml
questions:
  - "Chuyện đó xảy ra nhiều lần chưa? Ở đâu?"
  - "Có ai khác chứng kiến/biết không?"
  - "Em có giữ tin nhắn/ảnh không?"
  - "Em cảm thấy thế nào khi về nhà/khi đến trường?"
  - "Đã ai ở trường biết và giúp gì chưa?"
```

## first_response (KHI PHÁT HIỆN — theo §12)
```yaml
first_response:
  - 1. đảm bảo an toàn ngay cho người bị
  - 2. không ép người bị đối chất trực tiếp ngay
  - 3. ghi nhận sự kiện (người, thời điểm, nội dung, vật chứng online)
  - 4. tìm người lớn có trách nhiệm (GVCN, BGH, phụ huynh)
  - 5. xử lý theo quy định nhà trường (không tự phán xét/làm tòa án)
  - 6. theo dõi sau can thiệp
```

## avoid
```yaml
avoid:
  - "lại mâu thuẫn thôi, về hòa đê" (xem nhẹ bắt nạt)
  - bắt nạn nhân và người gây ngồi "hòa giải" ngay
  - công khai tố cáo gây xấu hổ thêm
  - đổ lỗi nạn nhân ("do em nhạy cảm")
  - AI không điều tra như điều tra viên (§36)
```

## protective_factors
```yaml
protective_factors:
  - bạn bè đứng về phía nạn nhân
  - người lớn phản hồi đúng quy trình, công bằng
  - cảm giác thuộc về lớp/trường
  - quy định chống bắt nạt được thực thi rõ
  - kỹ năng nói "không" + ghi hình/báo cáo an toàn (cyber)
```

## monitoring
```yaml
monitoring:
  - theo dõi nạn nhân: lo âu, đi học, sức khỏe, tự cảm nhận an toàn
  - theo dõi người gây: hành vi sau xử lý (behavior log §26)
  - mốc: 1 tuần, 1 tháng sau can thiệp
  - cyberbullying: chụp màn hình, chặn/ẩn, báo nền tảng, lưu vật chứng
```

## referral
```yaml
referral:
  - có hành vi VIOLENCE nghiêm trọng, đe dọa tính mạng
  - nạn nhân có dấu hiệu tự hại/tự sát (kèm card 02 + SAFETY)
  - cần chuyển tuyến hỗ trợ tâm lý học đường khi lo âu nặng
```

## emergency
```yaml
emergency:
  - bạo lực nghiêm trọng/tấn công thể chất → can thiệp người lớn ngay, y tế nếu cần
  - nạn nhân nói muốn chết/tự làm đau → SAFETY MODE (§35)
  - nghi xâm hại → SAFEGUARDING (§36)
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "orange"
evidence:
  - source: CDC
    title: 2023 YRBS Results
    year: 2024
    claim: "Bắt nạt và sử dụng mạng xã hội thường xuyên liên hệ với chỉ báo sức khỏe tâm thần (học sinh trung học Mỹ)."
    population: "14-18"
    region: "US"
    limitations: "Không áp nguyên xi cho học sinh Việt Nam"
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Bạo lực và bắt nạt ảnh hưởng sức khỏe tâm thần vị thành niên."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §12, §36, §37.
- CDC (2024). *2023 YRBS Results.* — cdc.gov.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `wellness/06` (bạn bè & bắt nạt), `wellness/08` (leo thang).
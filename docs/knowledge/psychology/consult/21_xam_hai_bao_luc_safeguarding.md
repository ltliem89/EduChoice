---
id: psy-sit-21
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §36,§36 (safeguarding), §35; WHO 2025; UNICEF 2021"
tags: [tư-vấn-nhanh, xâm-hại, bạo-lực-gia-đình, safeguarding, bảo-vệ-trẻ-em]
---

# Quick Consultation Card — Dấu hiệu xâm hại / bạo lực / ép buộc (SAFEGUARDING)

> ⚠️ Khi nghi ngờ xâm hại/bạo lực/bóc lột: AI KHÔNG điều tra như điều tra viên (§36). Quy trình bắt buộc SAFETY→LISTEN→DO NOT BLAME→DO NOT PROMISE SECRECY→FOLLOW PROCEDURE→REFER. Đọc kỹ `SAFETY_PROTOCOL.md` §2.

## situation
```yaml
situation:
  id: "student-psych-021"
  domain: "safety"
  topic: "abuse-safeguarding"
  ageRange: "11-18"
  context: ["home", "school", "community"]
```

## observable_signs (chỉ nghi ngờ → tìm hiểu, KHÔNG kết luận)
```yaml
observable_signs:
  - kể/ngụ ý bị đánh, bị đụng chạm không mong muốn, bị ép giữ bí mật
  - vết bầm/bỏng/thương tích không giải thích hợp lý
  - thay đổi hành vi đột ngột: rút lui, sợ ánh mắt, đề phòng quá mức
  - sợ người lớn cụ thể, né về nhà, trốn học
  - kiến thức tình dục không phù hợp tuổi / nói về người lớn theo cách đáng ngại
  - nước mắt/hoảng sợ khi được cho về nhà
  - bị ép làm điều gì đó lên mạng (chia sẻ ảnh, hẹn gặp)
```

## QUY TRÌNH — SAFEGUARDING (§36)
```yaml
procedure:
  - SAFETY: đảm bảo học sinh an toàn ngay bây giờ
  - LISTEN: lắng nghe khi trẻ kể, không cắt ngang, không hỏi như điều tra
  - DO NOT BLAME: không đổ lỗi/không chất vấn "sao em để vậy"
  - DO NOT PROMISE SECRECY: nói rõ "cô/thầy cần nói với người lớn có trách nhiệm để bảo vệ em"
  - FOLLOW PROCEDURE: theo quy trình bảo vệ trẻ em của nhà trường/dịch vụ xã hội địa phương
  - REFER: chuyển người có thẩm quyền (cơ quan bảo vệ trẻ em, công an nếu xâm hại)
```

## questions (mở, không điều tra)
```yaml
questions:
  - "Em có muốn kể cho cô/thầy điều gì không?"
  - "Có ai làm em thấy không an toàn không?"
  - "Em ngủ/ăn/đi học dạo này ra sao?"
  - (KHÔNG hỏi chi tiết hành vi xâm hại lặp lại, KHÔNG ép khai thác)
```

## first_response
```yaml
first_response:
  - ưu tiên an toàn tuyệt đối
  - lắng nghe, tin lời kể ban đầu, không phán xét
  - không hứa giữ bí mật
  - ghi chép trung thực những gì trẻ nói (không thêm suy diễn)
  - báo cáo đúng cơ chế: người phụ trách bảo vệ trẻ em của trường → cơ quan chức năng
  - tiếp tục quan sát theo dõi sau chuyển; không để trẻ cô lập
```

## avoid
```yaml
avoid:
  - điều tra, truy vấn lặp chi tiết chấn thương
  - đối chất trực tiếp người bị tố cáo trước mặt trẻ
  - giữ bí mật, trì hoãn báo cáo
  - đổ lỗi trẻ / gia đình trước
  - hủy vật chứng (ảnh, tin nhắn nếu có)
```

## protective_factors
```yaml
protective_factors:
  - người lớn tin cậy liên hệ được
  - nhà trường tuân thủ quy trình bảo vệ trẻ em
  - tiếp cận dịch vụ hỗ trợ xã hội
  - môi trường trường học an toàn
```

## monitoring
```yaml
monitoring:
  - sau chuyển: theo dõi học sinh (sát, an toàn, không cô lập) theo mốc của cơ chế bảo vệ
  - ghi nhận diễn biến, phối hợp cán bộ biết về bảo vệ trẻ em
  - không tự xử lý kín trong lớp
```

## referral
```yaml
referral: "Chuyển NGAY đến cơ quan bảo vệ trẻ em / công an / tư vấn chuyên môn theo quy định pháp luật và quy trình trường."
```

## emergency
```yaml
emergency: "Nguy cơ tức thời về thể chất/an toàn → gọi cảnh sát/y tế ngay; không để trẻ một mình."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "red"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Bạo lực, xâm hại và bóc lột ảnh hưởng nghiêm trọng sức khỏe tâm thần vị thành niên."
    population: "10-19"
    region: "global"
  - source: UNICEF
    title: State of the World's Children 2021
    year: 2021
    claim: "Bảo vệ trẻ em khỏi bạo lực là nền tảng sức khỏe tâm thần."
    population: "0-18"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §36, §35.
- WHO (2025). *Mental health of adolescents.* — who.int.
- UNICEF (2021). *The State of the World's Children 2021.*
- Bản đầy đủ: `SAFETY_PROTOCOL.md` §2 (safeguarding).